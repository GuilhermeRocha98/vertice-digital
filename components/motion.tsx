"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ElementType,
} from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Vira `true` depois de `delay` ms: dispara a entrada do hero e da navbar juntos. */
export function useEntrance(delay = 800) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setComplete(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return complete;
}

/** Chama `step` a cada rolagem/redimensionamento, no máximo uma vez por quadro. */
export function useScrollFrame(step: () => void) {
  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  });

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        stepRef.current();
      });
    };

    stepRef.current();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
}

/* ── Revelar palavra por palavra ─────────────────────────────────
   Cada palavra entra com 70ms de atraso em relação à anterior.   */
type WordRevealProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
};

export function WordReveal({ lines, as: Tag = "span", className = "", delay = 0, stagger = 70 }: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  let index = 0;

  return (
    <Tag ref={ref} className={`word-reveal ${isIn ? "is-in" : ""} ${className}`}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(/\s+/).map((word, wordIndex, words) => (
            <span key={wordIndex}>
              <span className="word" style={{ "--word-delay": `${delay + index++ * stagger}ms` } as CSSProperties}>
                {word}
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/* ── Palavras que se alternam ────────────────────────────────────
   A lista sobe numa janela da altura de uma linha. O primeiro item
   se repete no fim para o laço fechar sem que se perceba o pulo.  */
type WordRotatorProps = {
  words: string[];
  interval?: number;
  className?: string;
};

export function WordRotator({ words, interval = 2200, className = "" }: WordRotatorProps) {
  const trackRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const total = words.length + 1;
    let index = 0;
    let resetTimer: ReturnType<typeof setTimeout>;

    const id = setInterval(() => {
      index++;
      track.style.transition = "transform 0.6s var(--ease-out-expo)";
      track.style.transform = `translateY(${(-index * 100) / total}%)`;

      if (index === total - 1) {
        resetTimer = setTimeout(() => {
          track.style.transition = "none";
          track.style.transform = "translateY(0)";
          index = 0;
        }, 620);
      }
    }, interval);

    return () => {
      clearInterval(id);
      clearTimeout(resetTimer);
    };
  }, [words.length, interval]);

  return (
    <span className={`word-rotator ${className}`}>
      <span ref={trackRef} className="word-rotator-track">
        {[...words, words[0]].map((word, i) => (
          <span key={i} aria-hidden={i > 0}>
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ── Embaralhar letras ───────────────────────────────────────────
   As letras giram como painel de aeroporto e travam da esquerda
   para a direita.                                                */
const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

const randomChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

/** Entrada: revela 0,5 caractere por quadro, com até 3 caracteres aleatórios à frente. */
export function ScrambleIn({ text, delay = 0, triggered }: { text: string; delay?: number; triggered: boolean }) {
  const [output, setOutput] = useState(" ");

  useEffect(() => {
    if (!triggered) return;

    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      if (prefersReducedMotion()) {
        setOutput(text);
        return;
      }

      let cursor = 0;
      interval = setInterval(() => {
        cursor += 0.5;
        let next = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") next += " ";
          else if (i < cursor) next += text[i];
          else if (i < cursor + 3) next += randomChar();
        }
        setOutput(next || " ");
        if (cursor >= text.length) clearInterval(interval);
      }, 25);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, triggered]);

  return <span aria-hidden="true">{output}</span>;
}

/** Hover: embaralha tudo e revela da esquerda para a direita, 4 quadros por caractere. */
export function ScrambleHover({ text, isHovered, className = "" }: { text: string; isHovered: boolean; className?: string }) {
  const [scrambled, setScrambled] = useState(text);

  useEffect(() => {
    if (!isHovered || prefersReducedMotion()) return;

    let frame = 0;
    const interval = setInterval(() => {
      const revealed = Math.floor(frame / 4);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        next += text[i] === " " || i < revealed ? text[i] : randomChar();
      }
      setScrambled(next);
      frame++;
      if (revealed >= text.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [text, isHovered]);

  // Ao tirar o mouse, volta na hora para o texto original.
  return <span className={className}>{isHovered ? scrambled : text}</span>;
}

/* ── Botão elástico ──────────────────────────────────────────────
   Mola com velocidade e amortecimento calculados a cada quadro. O
   laço só roda enquanto a mola não assentou.                     */
export function ElasticLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const spring = useRef({ scale: 1, velocity: 0, target: 1, frame: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const s = spring.current;

    const tick = () => {
      const force = (s.target - s.scale) * 0.22; // rigidez da mola
      s.velocity = (s.velocity + force) * 0.72; // amortecimento
      s.scale += s.velocity;

      if (Math.abs(s.velocity) < 0.0005 && Math.abs(s.target - s.scale) < 0.0005) {
        s.scale = s.target;
        s.frame = 0;
      } else {
        s.frame = requestAnimationFrame(tick);
      }
      element.style.transform = `scale(${s.scale})`;
    };

    const setTarget = (target: number) => () => {
      if (prefersReducedMotion()) return;
      s.target = target;
      if (!s.frame) s.frame = requestAnimationFrame(tick);
    };

    const onEnter = setTarget(1.08);
    const onLeave = setTarget(1);
    const onDown = setTarget(0.92);
    const onUp = setTarget(1.08);

    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    element.addEventListener("pointerdown", onDown);
    element.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(s.frame);
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
      element.removeEventListener("pointerdown", onDown);
      element.removeEventListener("pointerup", onUp);
    };
  }, []);

  return <Link ref={ref} className={`will-transform ${className}`} {...props} />;
}

/* ── Texto que se preenche ───────────────────────────────────────
   As palavras ganham cor conforme a rolagem passa por elas, com
   uma zona de degradê de três palavras.                          */
export function FillText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.trim().split(/\s+/);

  useScrollFrame(() => {
    const element = ref.current;
    if (!element) return;

    const spans = element.querySelectorAll<HTMLSpanElement>(".word");
    const { top, height } = element.getBoundingClientRect();
    const viewport = window.innerHeight;
    // Começa quando o topo cruza 85% da tela e termina quando o fim passa de 45%.
    const start = viewport * 0.85;
    const end = viewport * 0.45 - height;
    const progress = prefersReducedMotion() ? 1 : clamp((start - top) / (start - end), 0, 1);
    const cursor = progress * (spans.length + 6) - 3;

    spans.forEach((span, i) => {
      const lit = clamp((cursor - i) / 3, 0, 1);
      span.style.color = `rgba(255,255,255,${(0.16 + lit * 0.84).toFixed(3)})`;
    });
  });

  return (
    <p ref={ref} className={`fill-text ${className}`}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="word">{word}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
