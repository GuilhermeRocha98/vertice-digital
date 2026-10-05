import { Reveal } from "@/components/reveal";
import { FillText, WordReveal } from "@/components/motion";

const audience = [
  "Pequenas empresas",
  "Prestadores de serviços",
  "Comércio",
  "Profissionais autônomos",
  "Clínicas",
  "Escritórios",
  "Empresas industriais",
  "Empresas em modernização digital",
];

export function Audience() {
  return (
    <section className="aurora">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:px-12 md:px-16">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal direction="left">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">Para quem é</p>
            <WordReveal
              as="h2"
              lines={["Sua empresa precisa de uma presença digital que converte."]}
              className="mt-8 text-[clamp(28px,5vw,52px)] font-light leading-[1.1] tracking-[-0.03em] text-white"
            />
          </Reveal>

          <div>
            <FillText
              className="text-[20px] leading-[1.5] tracking-[-0.01em] sm:text-[26px]"
              text="Se sua empresa precisa ser encontrada, apresentar seus serviços e gerar novas oportunidades, nós podemos construir essa presença digital."
            />

            <Reveal delay={120} className="mt-12 flex flex-wrap gap-2">
              {audience.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-4 py-2 text-[13px] text-white/60 transition hover:border-accent hover:text-white"
                >
                  {item}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
