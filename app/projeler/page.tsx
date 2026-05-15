import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/data/site";

export const metadata = {
  title: "Projeler",
  description: "Stratos İHA Takımı'nın sezon projeleri ve yarışma araçları.",
};

export default function ProjelerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projeler"
        title="Tasarladık, ürettik, uçurduk."
        description="Her sezon yeni bir görev kümesi için sıfırdan tasarladığımız araçlar — yarışma yönetmelikleri ışığında ama kendi mühendislik tercihlerimizle."
      />
      <Container size="wide">
        <div className="grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
          {site.projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projeler/${p.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all hover:border-[var(--color-brand-400)]/50 hover:bg-white/[0.04]"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                {p.competition} · {p.year}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-ink-50 group-hover:text-[var(--color-brand-300)]">
                {p.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-300">
                {p.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-ink-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-7 inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-[0.2em] text-[var(--color-brand-300)]">
                Detay <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
