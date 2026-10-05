"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Rolagem suave com Lenis; os links "#ancora" também deslizam até a seção. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
