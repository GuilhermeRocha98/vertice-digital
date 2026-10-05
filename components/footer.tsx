import { siteConfig, contactEmail, videos, whatsappHref } from "@/lib/config";
import { BackgroundVideo } from "@/components/background-video";
import { VerticeLogo } from "@/components/logo";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
];

const contacts = [
  { label: "WhatsApp", href: whatsappHref },
  { label: "Instagram", href: siteConfig.instagramUrl },
  { label: contactEmail, href: `mailto:${contactEmail}` },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-black">
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="flex min-h-[400px] flex-col md:flex-row">
        <div className="relative h-[300px] md:h-auto md:w-1/2">
          <BackgroundVideo src={videos.footer} />
        </div>

        <div className="flex flex-col justify-between p-10 sm:p-16 md:w-1/2">
          <div>
            <div className="mb-8 flex items-center gap-2.5 text-white/70">
              <VerticeLogo className="h-[18px] w-[18px]" />
              <span className="text-[15px] font-medium tracking-tight">Vértice Digital</span>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-white/40 sm:text-[15px]">
              Websites profissionais para empresas que querem fortalecer sua presença digital e gerar novas
              oportunidades.
            </p>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <nav className="flex flex-col gap-3 text-[13px]" aria-label="Rodapé">
                <span className="mb-1 text-[12px] uppercase tracking-[0.15em] text-white/30">Links</span>
                {links.map((link) => (
                  <a key={link.href} href={link.href} className="text-white/60 transition hover:text-white">
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 text-[13px]">
                <span className="mb-1 text-[12px] uppercase tracking-[0.15em] text-white/30">Contato</span>
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="break-all text-white/60 transition hover:text-accent-light"
                  >
                    {contact.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-12 text-[12px] text-white/25">© 2026 Vértice Digital. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
