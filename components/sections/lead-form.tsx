"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { submitLead } from "@/services/lead.service";
import { siteConfig, whatsappHref } from "@/lib/config";
import { trackLeadStart, trackLeadSubmitted } from "@/lib/tracking";
import type { LeadSubmissionStatus } from "@/types/lead";

const labelClass = "space-y-2 text-[13px] text-white/50";
const fieldClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-[14px] text-white outline-none transition placeholder:text-white/25 focus:border-accent focus:bg-white/[0.06]";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  company: "",
  businessType: "",
  websiteType: "",
  message: "",
};

function getUtmValue(key: string) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get(key) ?? "";
}

export function LeadForm() {
  const [form, setForm] = useState(initialValues);
  const [status, setStatus] = useState<LeadSubmissionStatus>("idle");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const websiteOptions = useMemo(
    () => [
      "Landing Page",
      "Site institucional",
      "Site comercial",
      "Loja virtual",
      "Ainda não sei",
    ],
    [],
  );

  useEffect(() => {
    trackLeadStart();
  }, []);

  const handleChange = (field: keyof typeof initialValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let masked = digits;

    if (digits.length > 2 && digits.length <= 7) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length > 7) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    setForm((prev) => ({ ...prev, phone: masked }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.company || !form.businessType || !form.websiteType) {
      setStatus("error");
      setError("Preencha todos os campos obrigatórios antes de enviar.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const payload = {
        ...form,
        source: getUtmValue("utm_source"),
        medium: getUtmValue("utm_medium"),
        campaign: getUtmValue("utm_campaign"),
        content: getUtmValue("utm_content"),
        term: getUtmValue("utm_term"),
        landingPage: window.location.href,
        referrer: document.referrer || "",
        createdAt: new Date().toISOString(),
      };

      await submitLead(payload);
      setStatus("success");
      setSubmitted(true);
      setForm(initialValues);
      trackLeadSubmitted();
    } catch (errorSubmission) {
      setStatus("error");
      setError("Não foi possível enviar sua mensagem. Tente novamente em instantes.");
      console.error(errorSubmission);
    }
  };

  return (
    <section id="contato" className="aurora aurora-center px-6 py-32 sm:px-12 md:px-16">
      <Reveal className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/40 sm:text-[14px]">Contato</p>
            <h2 className="mt-8 text-[clamp(28px,5vw,52px)] font-light leading-[1.1] tracking-[-0.03em] text-white">
              Vamos criar seu próximo site?
            </h2>
            <p className="mt-6 max-w-md text-[13px] leading-relaxed text-white/50 sm:text-[15px]">
              Conte um pouco sobre seu negócio e receba uma proposta pensada para sua realidade.
            </p>

            <div className="mt-12 text-[14px] text-white/50">
              <span className="block text-[12px] uppercase tracking-[0.15em] text-white/30">WhatsApp</span>
              <a href={whatsappHref} className="mt-2 inline-block text-accent-light transition hover:text-white">
                {siteConfig.whatsappDisplay}
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-surface p-5 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                <span>Nome</span>
                <input
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={fieldClass}
                  placeholder="Seu nome"
                />
              </label>

              <label className={labelClass}>
                <span>WhatsApp</span>
                <input
                  value={form.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={fieldClass}
                  placeholder="(41) 99999-9999"
                />
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                <span>E-mail</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={fieldClass}
                  placeholder="seuemail@empresa.com"
                />
              </label>

              <label className={labelClass}>
                <span>Empresa</span>
                <input
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className={fieldClass}
                  placeholder="Nome da empresa"
                />
              </label>

              <label className={labelClass}>
                <span>Segmento</span>
                <input
                  value={form.businessType}
                  onChange={(e) => handleChange("businessType", e.target.value)}
                  className={fieldClass}
                  placeholder="Ex: Serviços, comércio..."
                />
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                <span>O que você precisa?</span>
                <select
                  value={form.websiteType}
                  onChange={(e) => handleChange("websiteType", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" className="bg-black text-white">Selecione</option>
                  {websiteOptions.map((option) => (
                    <option key={option} value={option} className="bg-black text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                <span>Conte um pouco sobre seu projeto</span>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={`min-h-[130px] ${fieldClass}`}
                  placeholder="Descreva suas necessidades e objetivos..."
                />
              </label>
            </div>

            {status === "error" && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {status === "success" && submitted && (
              <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-200">
                <p>Recebemos sua solicitação!</p>
                <p>Em breve entraremos em contato para entender melhor seu projeto.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] text-black transition hover:bg-[#e2e2e6] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Quero receber uma proposta"
              )}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
