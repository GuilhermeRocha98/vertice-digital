export const siteConfig = {
  brand: "Vértice Digital",
  tagline: "Websites profissionais para empresas que querem crescer.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5542998628774",
  whatsappDisplay: "(42) 99862-8774",
  whatsappMessage: "Olá! Gostaria de saber mais sobre criação de sites.",
  leadApiUrl: process.env.NEXT_PUBLIC_LEAD_API_URL ?? "http://localhost:8080/api/leads",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
};

const videoBase = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P";

export const videos = {
  // O do hero fica pausado e é controlado pelo movimento horizontal do mouse (no celular, pelo arrasto e pela rolagem).
  hero: `${videoBase}/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4`,
  manifesto: `${videoBase}/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4`,
  metrics: `${videoBase}/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4`,
  technology: `${videoBase}/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4`,
  footer: `${videoBase}/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4`,
};

export const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`;