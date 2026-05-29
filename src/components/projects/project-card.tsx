import Image from "next/image";
import Link from "next/link";
import { DroneSilhouette } from "@/components/brand/drone-silhouette";
import { cn } from "@/lib/cn";
import type { Project } from "@/data/site";

// C1 layout: vertical card, photo fills the frame, dark scrim, and the title +
// a four-stat strip sit over the bottom. Falls back to a gradient + silhouette
// texture until a real photo lands in `project.image`.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projeler/${project.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-[var(--color-brand-400)]/55"
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-sky-deep)_0%,var(--color-brand-800)_55%,var(--color-ink-900)_100%)]">
          <div className="absolute inset-0 grid place-items-center opacity-[0.10]">
            <DroneSilhouette className="h-40 w-40 text-[var(--color-brand-300)]" />
          </div>
        </div>
      )}

      {/* Brand glow + readability scrim */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_70%)] opacity-25 blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--color-ink-950)_45%,transparent)] to-[var(--color-ink-950)]" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[var(--color-brand-300)]">
          {project.competition}
        </p>
        <h3 className="mt-2 font-display text-xl font-black leading-tight text-ink-50 group-hover:text-white">
          {project.title}
        </h3>
        <dl className="mt-4 flex border-t border-white/15 pt-3.5">
          {project.specs.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex-1 px-1",
                i < project.specs.length - 1 && "border-r border-white/10",
              )}
            >
              <dd className="font-display text-2xl font-black leading-none tracking-tight text-ink-50">
                {s.value}
                <span className="ml-0.5 text-[0.7rem] font-bold text-[var(--color-brand-300)]">
                  {s.unit}
                </span>
              </dd>
              <dt className="mt-1.5 text-[0.55rem] uppercase tracking-[0.16em] text-ink-300">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}
