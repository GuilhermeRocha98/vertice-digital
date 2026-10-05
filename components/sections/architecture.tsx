"use client";

import { motion } from "framer-motion";

const layers = [
  { label: "Camada 1", name: "Design" },
  { label: "Camada 2", name: "Tecnologia" },
  { label: "Camada 3", name: "Conversão" },
];

export function Architecture() {
  return (
    <section className="flex min-h-dvh w-full items-center justify-center aurora aurora-center">
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
        >
          <p className="mb-8 text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">Arquitetura</p>
          <h2 className="mb-10 text-[clamp(28px,6vw,56px)] font-light leading-[1.15] tracking-[-0.02em] text-white">
            Três camadas. Zero atrito.
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/45 sm:text-[17px]">
            O design apresenta sua marca. A tecnologia garante velocidade e segurança. A estratégia transforma
            visitantes em clientes.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {layers.map((layer) => (
            <div
              key={layer.label}
              className="spotlight-card flex h-[72px] w-full max-w-md items-center justify-between rounded-lg border border-white/10 px-6"
            >
              <span className="text-[12px] uppercase tracking-[0.15em] text-white/30">{layer.label}</span>
              <span className="text-[16px] font-light text-white sm:text-[18px]">{layer.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
