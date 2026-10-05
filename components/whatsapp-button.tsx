"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { whatsappHref } from "@/lib/config";
import { trackWhatsappClick } from "@/lib/tracking";

export function WhatsAppButton() {
  return (
    <Link
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={() => trackWhatsappClick()}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition hover:scale-110 hover:bg-[#e2e2e6]"
    >
      <MessageCircleMore size={24} />
    </Link>
  );
}
