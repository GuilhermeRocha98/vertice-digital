import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Metrics } from "@/components/sections/metrics";
import { Audience } from "@/components/sections/audience";
import { Services } from "@/components/sections/services";
import { Technology } from "@/components/sections/technology";
import { Process } from "@/components/sections/process";
import { Architecture } from "@/components/sections/architecture";
import { CtaBanner } from "@/components/sections/cta-banner";
import { LeadForm } from "@/components/sections/lead-form";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CursorSpotlight } from "@/components/cursor-spotlight";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <CursorSpotlight />
      <Header />
      <Hero />
      <Manifesto />
      <Metrics />
      <Audience />
      <Services />
      <Technology />
      <Process />
      <Architecture />
      <CtaBanner />
      <LeadForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
