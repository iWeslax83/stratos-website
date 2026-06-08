import { Container } from "@/components/ui/container";
import { DroneSilhouette } from "@/components/brand/drone-silhouette";
import { cn } from "@/lib/cn";

type Stat = { value: string; unit?: string; label: string };
type Accent = "brand" | "dawn";
type Align = "left" | "right";

// Cinematic feature band. The background photo stays pinned
// (background-attachment: fixed) while the page scrolls over it, so it reads
// like a window cut into the page. Instead of flattening the photo under an
// even dark wash, a *directional* scrim keeps one side legible and lets the
// aircraft show through on the other — so the band actually reveals something.
// On mobile it degrades to a normal scrolling cover image (bg-scroll), since
// fixed attachment is janky/unsupported there.
export function RevealBand({
  image,
  eyebrow,
  title,
  description,
  stats,
  accent = "brand",
  align = "left",
}: {
  image?: string | null;
  eyebrow: string;
  title: string;
  description?: string;
  stats?: Stat[];
  accent?: Accent;
  align?: Align;
}) {
  const accentVar =
    accent === "dawn" ? "var(--color-sky-dawn)" : "var(--color-brand-300)";

  // Scrim heaviest on the text side, fading to near-clear on the photo side.
  const scrimDir = align === "left" ? 95 : 265;
  const scrim =
    `linear-gradient(${scrimDir}deg,` +
    " color-mix(in oklab, var(--color-ink-950) 92%, transparent) 0%," +
    " color-mix(in oklab, var(--color-ink-950) 72%, transparent) 38%," +
    " color-mix(in oklab, var(--color-ink-950) 30%, transparent) 72%," +
    " color-mix(in oklab, var(--color-ink-950) 12%, transparent) 100%)";
  // A touch of bottom darkening anchors the band to the sections around it.
  const vignette =
    "linear-gradient(to bottom, color-mix(in oklab, var(--color-ink-950) 35%, transparent), transparent 22%, transparent 70%, color-mix(in oklab, var(--color-ink-950) 55%, transparent))";

  return (
    <section
      className="relative isolate flex min-h-[64vh] items-center overflow-hidden border-y border-white/10 bg-cover bg-center bg-scroll md:bg-fixed"
      style={
        image
          ? { backgroundImage: `${vignette}, ${scrim}, url(${image})` }
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
        </div>
      )}

      <Container size="wide">
        <div
          className={cn(
            "max-w-xl py-20 sm:py-28",
            align === "right" && "ml-auto text-right",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              align === "right" && "flex-row-reverse",
            )}
          >
            <span
              className="h-px w-10"
              style={{ backgroundColor: accentVar }}
              aria-hidden="true"
            />
            <p
              className="text-[0.7rem] font-display font-semibold uppercase tracking-[0.3em]"
              style={{ color: accentVar }}
            >
              {eyebrow}
            </p>
          </div>

          <h2 className="mt-6 font-display text-3xl font-black leading-[1.04] sm:text-5xl">
            {title}
          </h2>

          {description && (
            <p
              className={cn(
                "mt-5 max-w-md text-base leading-relaxed text-ink-200",
                align === "right" && "ml-auto",
              )}
            >
              {description}
            </p>
          )}

          {stats && stats.length > 0 && (
            <dl
              className={cn(
                "mt-10 flex flex-wrap gap-y-6",
                align === "right" ? "justify-end" : "justify-start",
              )}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "px-6 first:pl-0 last:pr-0",
                    i > 0 && "border-l border-white/15",
                  )}
                >
                  <dd className="font-data text-3xl font-bold leading-none text-ink-50 sm:text-4xl">
                    {s.value}
                    {s.unit && (
                      <span
                        className="ml-1 text-sm font-bold"
                        style={{ color: accentVar }}
                      >
                        {s.unit}
                      </span>
                    )}
                  </dd>
                  <dt className="mt-2.5 text-[0.6rem] uppercase tracking-[0.25em] text-ink-300">
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
