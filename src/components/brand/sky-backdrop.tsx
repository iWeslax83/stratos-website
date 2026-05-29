/**
 * Site-wide cinematic sky backdrop.
 * Fixed behind all content; combines a deep-night gradient, three twinkling
 * starfields and two slowly drifting aurora blobs. Pure CSS, no JS.
 * Honors prefers-reduced-motion (animations disabled in globals.css).
 */
export function SkyBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base atmospheric gradient: night sky → deep sky → ground */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-[var(--color-ink-900)]" />

      {/* Twinkling stars — three layers at different sizes and tempos */}
      <div className="absolute inset-0 sky-stars sky-stars--sm sky-twinkle-slow opacity-90" />
      <div className="absolute inset-0 sky-stars sky-stars--mid sky-twinkle-mid opacity-80" />
      <div className="absolute inset-0 sky-stars sky-stars--lg sky-twinkle-fast opacity-70" />

      {/* Drifting aurora blobs — teal (top right) + sunset orange (bottom left).
          Kept restrained so the dark sky reads as atmosphere, not an "AI glow". */}
      <div className="absolute -right-[15%] -top-[20%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_60%)] opacity-[0.16] blur-3xl sky-drift-a" />
      <div className="absolute -bottom-[20%] -left-[15%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,var(--color-sky-dawn)_0%,transparent_60%)] opacity-[0.09] blur-3xl sky-drift-b" />

      {/* Atmospheric ground haze — softens the bottom into the page */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[color-mix(in_oklab,var(--color-sky-steel)_25%,transparent)] to-transparent" />
    </div>
  );
}
