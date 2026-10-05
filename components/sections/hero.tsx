"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { videos } from "@/lib/config";
import { ScrambleIn, useEntrance } from "@/components/motion";

const SCRUB_SENSITIVITY = 0.8;
// Rolar a altura inteira do hero percorre esta fração do vídeo.
const SCROLL_SENSITIVITY = 1;
const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const;

/** Movimento horizontal do mouse (ou do dedo) avança/volta o vídeo. Em telas de toque,
 *  a rolagem enquanto o hero está visível também o move. As buscas são encadeadas
 *  pelo evento `seeked` para não descartar quadros. */
function useVideoScrub() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    let target = 0;
    let lastX: number | null = null;
    let lastScroll = 0;
    let seeking = false;

    const seek = () => {
      if (Math.abs(video.currentTime - target) < 0.01) {
        seeking = false;
        return;
      }
      seeking = true;
      video.currentTime = target;
    };

    const scrubBy = (fraction: number) => {
      if (!video.duration) return;
      target = Math.min(video.duration, Math.max(0, target + fraction * video.duration));
      if (!seeking) seek();
    };

    const move = (clientX: number) => {
      if (lastX !== null) scrubBy(((clientX - lastX) / window.innerWidth) * SCRUB_SENSITIVITY);
      lastX = clientX;
    };

    const heroHeight = () => video.parentElement?.clientHeight || window.innerHeight;
    const onScroll = () => {
      // Só conta a rolagem dentro do hero, para o vídeo não andar fora da tela.
      const y = Math.min(window.scrollY, heroHeight());
      scrubBy(((y - lastScroll) / heroHeight()) * SCROLL_SENSITIVITY);
      lastScroll = y;
    };

    const onMouseMove = (event: MouseEvent) => move(event.clientX);
    const onTouchMove = (event: TouchEvent) => move(event.touches[0].clientX);
    const onTouchEnd = () => (lastX = null);

    // O iOS não carrega quadros de um vídeo que nunca tocou: toca mudo e pausa em
    // seguida. Se o autoplay for bloqueado (ex.: modo de pouca energia), tenta no primeiro toque.
    const unlock = () => {
      video.muted = true;
      video
        .play()
        .then(() => {
          video.pause();
          video.currentTime = target;
          window.removeEventListener("touchstart", unlock);
        })
        .catch(() => {});
    };

    video.pause();
    video.addEventListener("seeked", seek);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    if (isTouch) {
      lastScroll = Math.min(window.scrollY, heroHeight());
      unlock();
      window.addEventListener("touchstart", unlock, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      video.removeEventListener("seeked", seek);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return videoRef;
}

const headingClass =
  "font-light leading-[0.95] tracking-[-0.03em] text-white text-[clamp(40px,10vw,100px)]";

export function Hero() {
  const videoRef = useVideoScrub();
  const entranceComplete = useEntrance();

  return (
    <section
      id="top"
      className="relative h-dvh w-full touch-pan-y overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={videos.hero}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-5 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
      />
      <div aria-hidden="true" className="edge-fade edge-fade-bottom" />

      <motion.div
        className="relative z-10 flex h-full flex-col px-4 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 flex translate-y-[calc(-50%+50px)] select-none justify-center"
        >
          <span className="whitespace-nowrap bg-[radial-gradient(circle,rgba(142,127,148,0)_0%,#8E7F94_70%)] bg-clip-text font-display text-[clamp(120px,30vw,521px)] uppercase leading-none tracking-[-4px] text-transparent opacity-10">
            Vértice
          </span>
        </div>

        <div className="flex-1" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className={headingClass} aria-label="Seu digital começa aqui">
              <ScrambleIn text="Seu digital" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="começa aqui" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="max-w-sm text-[13px] leading-relaxed text-white/60 sm:text-[15px]"
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE_OUT_CUBIC, delay: 0.2 }}
            >
              Criamos websites modernos, rápidos e profissionais para transformar visitantes em clientes.
              Estratégia, design e tecnologia em uma única entrega.
            </motion.p>
          </div>

          <p className={`${headingClass} text-left md:text-right`} aria-label="Sites que convertem">
            <ScrambleIn text="Sites que" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="convertem" delay={1000} triggered={entranceComplete} />
          </p>
        </div>
      </motion.div>
    </section>
  );
}
