import { Container } from "@/components/ui/container";
import { DroneSilhouette } from "@/components/brand/drone-silhouette";

type Stat = { value: string; unit?: string; label: string };

// "A" reveal effect: a full-width band whose background photo stays pinned
// (background-attachment: fixed) while the page scrolls over it, so it reads
// like a window cut into the page. On mobile it degrades to a normal scrolling
// cover image (bg-scroll), since fixed attachment is janky/unsupported there.
// Until a real photo lands in `image`, a cinematic gradient stands in.
export function RevealBand({
  image,
  eyebrow,
  title,
  stats,
}: {
  image?: string | null;
  eyebrow: string;
  title: string;
  stats?: Stat[];
}) {
  return (
    <section
      className="relative isolate flex min-h-[68vh] items-center justify-center overflow-hidden border-y border-white/10 bg-cover bg-center bg-scroll md:bg-fixed"
      style={
        image
          ? {
              backgroundImage: `linear-gradient(color-mix(in oklab, var(--color-ink-950) 55%, transparent), color-mix(in oklab, var(--color-ink-950) 78%, transparent)), url(${image})`,
            }
          : undefined
      }
    >
      {!image && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sky-deep)] via-[var(--color-brand-800)] to-[var(--color-ink-900)]" />
          <div className="absolute inset-0 starfield opacity-50" />
          <div className="absolute -right-[8%] top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 text-[var(--color-brand-300)]/10 lg:block">
            <DroneSilhouette className="h-full w-full" />
          </div>
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_60%)] opacity-20 blur-3xl" />
        </div>
      )}

      <Container size="default">
        <div className="py-20 text-center sm:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            {eyebrow}
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-black leading-[1.05] sm:text-5xl">
            {title}
          </h2>
          {stats && stats.length > 0 && (
            <dl className="mx-auto mt-10 flex max-w-xl flex-wrap items-start justify-center gap-x-10 gap-y-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-3xl font-black leading-none text-ink-50 sm:text-4xl">
                    {s.value}
                    {s.unit && (
                      <span className="ml-1 text-sm font-bold text-[var(--color-brand-300)]">
                        {s.unit}
                      </span>
                    )}
                  </dd>
                  <dt className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-ink-200">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Container>
    </section>
  );
}
