"use client";

import { useEffect } from "react";

export function CursorSpotlight() {
  useEffect(() => {
    const updateSpotlight = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);

      // Luz que segue o mouse dentro de cada .spotlight-card
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".spotlight-card");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--y", `${event.clientY - rect.top}px`);
      }
    };

    window.addEventListener("pointermove", updateSpotlight, { passive: true });
    return () => window.removeEventListener("pointermove", updateSpotlight);
  }, []);

  return <div aria-hidden="true" className="pointer-spotlight" />;
}