import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DroneSilhouette } from "@/components/brand/drone-silhouette";
import { site } from "@/data/site";

export async function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = site.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = site.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="relative">
      <section className="relative isolate overflow-hidden border-b border-white/5 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-transparent" />
        <div className="absolute inset-0 -z-10 starfield opacity-50" />
        <div className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[360px] w-[360px] -translate-y-1/2 text-[var(--color-brand-300)]/15 lg:block">
          <DroneSilhouette className="h-full w-full spin-slow" />
        </div>
        <Container size="default">
          <Link
            href="/projeler"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-300 hover:text-white"
          >
            <ArrowLeft size={14} /> Tüm Projeler
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            {project.competition} · {project.year}
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
            {project.summary}
          </p>
        </Container>
      </section>

      <Container size="default">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              Öne çıkan özellikler
            </h2>
            <ul className="mt-6 space-y-4">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--color-brand-300)]"
                  />
                  <span className="text-base leading-relaxed text-ink-100">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="md:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                Kullanılan teknolojiler
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ink-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-7 border-t border-white/5 pt-6">
                <p className="text-sm text-ink-300">
                  Bu projeyle ilgili daha fazla bilgi veya iş birliği için bizimle iletişime geçin.
                </p>
                <div className="mt-4">
                  <Button as="link" href="/iletisim" size="sm">
                    İletişime Geç
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
