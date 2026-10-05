/** Marca da Vértice em cor única (herda `currentColor`). */
export function VerticeLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="7 28 98 80" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 28 L56 92 L88 28 H105 L62 108 H50 L7 28 H24 Z" />
    </svg>
  );
}
