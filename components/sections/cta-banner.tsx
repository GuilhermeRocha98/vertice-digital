import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ElasticLink, WordReveal } from "@/components/motion";

export function CtaBanner() {
  return (
    <section className="aurora aurora-right px-6 py-32 sm:px-12 md:px-16">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_15%_0%,rgba(142,127,148,0.18),transparent_45%)] p-8 sm:p-12 lg:p-16">
        <div className="scan-line pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent-light/50 to-transparent" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">Pronto para crescer?</p>
            <WordReveal
              as="h2"
              lines={["Pronto para transformar sua presença digital?"]}
              className="mt-8 text-[clamp(28px,5vw,52px)] font-light leading-[1.1] tracking-[-0.03em] text-white"
            />
            <p className="mt-6 text-[13px] leading-relaxed text-white/50 sm:text-[15px]">
              Conte um pouco sobre sua empresa e descubra como podemos criar um site pensado para o seu negócio.
            </p>
          </div>

          <ElasticLink
            href="#contato"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] text-black transition-colors hover:bg-[#e2e2e6]"
          >
            Solicitar orçamento
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </ElasticLink>
        </div>
      </Reveal>
    </section>
  );
}
