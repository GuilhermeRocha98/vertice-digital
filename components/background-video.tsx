/** Vídeo decorativo em loop, sem som, cobrindo o contêiner pai. */
export function BackgroundVideo({ src, className = "absolute inset-0 h-full w-full" }: { src: string; className?: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={`pointer-events-none object-cover ${className}`}
    />
  );
}
