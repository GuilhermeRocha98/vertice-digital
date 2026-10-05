"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { videos } from "@/lib/config";
import { BackgroundVideo } from "@/components/background-video";

const MANIFESTO =
  "Seu site é o primeiro contato de muitos clientes com a sua empresa. Por isso, cada página que criamos une design, velocidade e estratégia. Nada é genérico: estrutura, textos e chamadas são pensados para o seu negócio. O resultado é uma presença digital que trabalha por você, todos os dias.";

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 });
  const y = useTransform(smooth, [0, 1], [60, -120]);
  const opacity = useTransform(smooth, [0.3, 0.5], [0, 1]);
  const transform = useMotionTemplate`rotateX(24deg) translateY(${y}px) translateZ(15px)`;

  return (
    <section ref={sectionRef} className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-black">
      <BackgroundVideo src={videos.manifesto} />
      <div aria-hidden="true" className="edge-fade" />

      <div className="relative z-10 mx-auto max-w-5xl [perspective:400px]">
        <motion.p
          style={{ transform, opacity }}
          className="select-none px-6 text-center text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white sm:px-12 sm:text-[30px] md:text-[36px] lg:text-[42px]"
        >
          {MANIFESTO}
        </motion.p>
      </div>
    </section>
  );
}
