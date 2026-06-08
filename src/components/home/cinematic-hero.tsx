import Image from "next/image";
import { Container } from "@/components/ui/container";

// Cinematic landing hero: a real drone-in-flight photo bleeds off the right
// edge and dissolves into the dark sky gradient, with content held on the left
// (asymmetric, not centered). The only motion is a slow GPU ken-burns drift on
// the image wrapper (transform/opacity only) — no mix-blend animation, so it
// stays smooth. All overlays are static, so there are no continuous repaints.
export function CinematicHero({
  image,
  children,
}: {
  image: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Base sky */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-[var(--color-ink-900)]" />
        <div className="absolute inset-0 starfield opacity-60" />
      </div>

      {/* Photo, bleeding off the right and dissolving into the dark.
          overflow-hidden clips the ken-burns scale so its raw edge never
          spills past the grading overlays. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-[60%]">
        <div className="hero-kenburns absolute inset-0">
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-[55%_40%] [filter:saturate(0.75)_brightness(0.92)_contrast(1.04)]"
          />
        </div>
        {/* Cool and settle the bright daylight sky into the night palette */}
        <div className="absolute inset-0 bg-[var(--color-sky-deep)]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[var(--color-ink-950)]/25" />
        {/* Dissolve the left edge under the text; keep a residual wash on the
            right so the bright sky never reads as a hard, lit panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink-900)] from-22% via-[var(--color-ink-900)]/70 via-62% to-[var(--color-ink-900)]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-900)] via-transparent to-[var(--color-ink-900)]/55" />
      </div>

      {/* A single restrained brand glow (replaces the old twin AI blobs) */}
      <div className="pointer-events-none absolute -z-10 right-[24%] top-1/3 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_60%)] opacity-[0.10] blur-3xl" />

      <Container size="wide">
        <div className="grid min-h-[88dvh] items-center py-24 sm:py-32">
          <div className="max-w-2xl lg:max-w-4xl">{children}</div>
        </div>
      </Container>

      {/* Seam into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-[var(--color-ink-900)]" />
    </section>
  );
}
