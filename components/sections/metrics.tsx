"use client";

import { motion } from "framer-motion";
import { videos } from "@/lib/config";
import { BackgroundVideo } from "@/components/background-video";

// Ajuste estes números para refletirem compromissos reais da Vértice.
const metrics = [
  { value: "100%", label: "Responsivo em qualquer tela" },
  { value: "90+", label: "Meta de nota no PageSpeed" },
  { value: "24h", label: "Para responder seu orçamento" },
];

export function Metrics() {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-black">
      <BackgroundVideo src={videos.metrics} />
      <div aria-hidden="true" className="edge-fade" />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-6 pb-32 pt-32">
        <motion.p
          className="mb-20 text-center text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          Nossos compromissos
        </motion.p>

        <div className="grid grid-cols-1 gap-16 text-center md:grid-cols-3 md:gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <div className="text-[clamp(48px,10vw,96px)] font-light leading-none tracking-[-0.04em] text-white">
                {metric.value}
              </div>
              <div className="mt-4 text-[13px] tracking-wide text-white/40 sm:text-[15px]">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
