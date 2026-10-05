import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WordRotator } from "@/components/motion";

const services = [
  "Landing Pages",
  "Sites institucionais",
  "Sites comerciais",
  "Páginas de serviços",
  "Sites responsivos",
  "SEO básico",
  "Automações",
  "Soluções personalizadas",
];

export function Services() {
  return (
    <section id="servicos" className="aurora aurora-right px-6 py-32 sm:px-12 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">Serviços</p>
            <h2 className="mt-8 max-w-3xl text-[clamp(32px,6vw,72px)] font-light leading-[1] tracking-[-0.03em] text-white">
              Websites para empresas que querem{" "}
              <WordRotator words={["crescer.", "vender mais.", "ser encontradas."]} className="text-accent-light" />
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-white/50 sm:text-[15px] md:text-right">
            Sites profissionais desenvolvidos para apresentar sua empresa, fortalecer sua marca e gerar novas oportunidades.
          </p>
        </Reveal>

        <Reveal delay={100} className="grid border-t border-white/10 sm:grid-cols-2">
          {services.map((item, index) => (
            <div
              key={item}
              className="spotlight-card group relative flex min-h-20 items-center justify-between overflow-hidden border-b border-white/10 px-2 py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
            >
              <span className="flex items-baseline gap-4 text-[15px] text-white/85 sm:text-[17px]">
                <span className="text-[11px] text-white/30">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </span>
              <ArrowUpRight
                size={16}
                className="text-white/25 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-light"
              />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-light transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
