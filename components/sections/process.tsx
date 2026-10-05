"use client";

import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { WordReveal, useScrollFrame } from "@/components/motion";

const steps = [
  {
    number: "01",
    title: "Entendemos seu negócio",
    description: "Analisamos seus objetivos, público e desafios para criar a base certa do projeto.",
  },
  {
    number: "02",
    title: "Planejamos a estrutura",
    description: "Definimos a arquitetura da informação, mensagens e elementos que vão gerar conversão.",
  },
  {
    number: "03",
    title: "Desenvolvemos seu site",
    description: "Construímos a experiência com design premium, performance e boa usabilidade.",
  },
  {
    number: "04",
    title: "Publicamos e acompanhamos",
    description: "Você recebe o site pronto para vender e o suporte para evoluir no futuro.",
  },
];

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Linha do tempo que se desenha: o traço cresce até 55% da altura da tela
  // e cada etapa acende quando a linha chega nela.
  useScrollFrame(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    const line = window.innerHeight * 0.55;
    const { top, height } = track.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (line - top) / height));
    fill.style.transform = `scaleY(${progress})`;

    stepRefs.current.forEach((step) => {
      if (step) step.classList.toggle("is-lit", step.getBoundingClientRect().top + 10 < line);
    });
  });

  return (
    <section id="como-funciona" className="aurora">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 sm:px-12 md:px-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal direction="left" className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">Como funciona</p>
          <WordReveal
            as="h2"
            lines={["Um processo simples e pensado para resultados."]}
            className="mt-8 text-[clamp(28px,5vw,52px)] font-light leading-[1.1] tracking-[-0.03em] text-white"
          />
          <p className="mt-6 max-w-md text-[13px] leading-relaxed text-white/50 sm:text-[15px]">
            Do primeiro contato à publicação, você acompanha cada etapa do projeto.
          </p>
        </Reveal>

        <div ref={trackRef} className="relative pl-12">
          <div className="absolute bottom-2 left-[15px] top-2 w-px bg-white/10" aria-hidden="true">
            <div
              ref={fillRef}
              className="will-transform h-full w-full origin-top bg-gradient-to-b from-accent to-white"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="space-y-14">
            {steps.map((step, index) => (
              <li
                key={step.number}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="timeline-step relative"
              >
                <span className="timeline-dot absolute -left-[41px] top-1.5 h-[15px] w-[15px] rounded-full border-2" />
                <div className="text-[12px] tracking-[0.15em] text-white/30">{step.number}</div>
                <h3 className="timeline-title mt-2 text-[20px] font-light tracking-[-0.02em] sm:text-[24px]">{step.title}</h3>
                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/40 sm:text-[14px]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
