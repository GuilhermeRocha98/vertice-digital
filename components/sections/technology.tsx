"use client";

import { motion } from "framer-motion";
import { videos } from "@/lib/config";
import { BackgroundVideo } from "@/components/background-video";

const features = [
  { title: "Performance", description: "Páginas leves que carregam rápido em qualquer conexão." },
  { title: "SEO", description: "Estrutura preparada para ser encontrada no Google." },
  { title: "Conversão", description: "Cada seção conduz o visitante até o contato." },
  { title: "Segurança", description: "Boas práticas de proteção, organização e manutenção." },
];

const fadeUp = (y: number, delay = 0) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1, delay },
});

export function Technology() {
  return (
    <section id="tecnologia" className="relative h-dvh min-h-[640px] w-full overflow-hidden bg-black">
      <BackgroundVideo src={videos.technology} />
      <div aria-hidden="true" className="edge-fade" />

      <div className="relative z-10 flex h-full flex-col px-8 py-12 sm:px-12 sm:py-16 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <motion.h2
            className="text-[clamp(36px,8vw,72px)] font-light leading-[0.95] tracking-[-0.03em] text-white"
            {...fadeUp(40)}
          >
            Tecnologia
            <br />
            que converte
          </motion.h2>
          <motion.p
            className="max-w-xs text-[13px] leading-relaxed text-white/50 sm:text-[15px] md:pt-2 md:text-right"
            {...fadeUp(20, 0.2)}
          >
            Código moderno, otimizado para buscadores e pensado para transformar visitas em contatos reais.
          </motion.p>
        </div>

        <div className="flex-1" />

        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <h3 className="mb-2 text-[14px] font-normal text-white sm:text-[16px]">{feature.title}</h3>
              <p className="text-[12px] leading-relaxed text-white/40 sm:text-[14px]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
