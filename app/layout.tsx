import type { Metadata } from "next";
import { Anton_SC, Space_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const antonSC = Anton_SC({
  variable: "--font-anton-sc",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verticedigital.com.br"),
  title: "Vértice Digital | Websites profissionais para empresas",
  description:
    "Criamos websites modernos, rápidos e estratégicos para empresas que querem fortalecer sua presença digital e gerar novas oportunidades.",
  keywords: [
    "criação de websites",
    "site institucional",
    "landing page",
    "Vértice Digital",
    "agência digital",
  ],
  openGraph: {
    title: "Vértice Digital | Websites profissionais para empresas",
    description:
      "Criamos websites modernos, rápidos e estratégicos para empresas que querem fortalecer sua presença digital e gerar novas oportunidades.",
    url: "https://verticedigital.com.br",
    siteName: "Vértice Digital",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vértice Digital",
    description:
      "Websites modernos e estratégicos para empresas que querem gerar mais oportunidades.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${spaceMono.variable} ${antonSC.variable} h-full`}>
      <body className="min-h-full bg-black font-sans text-white">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
