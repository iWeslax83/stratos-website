import { Trophy, Award, FileCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/data/site";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Tasarım: Award,
  Hackathon: Trophy,
  TEKNOFEST: FileCheck,
};

export const metadata = {
  title: "Başarılar",
  description:
    "Stratos İHA Takımı'nın yarışmalardaki dereceleri ve organizasyon başarıları.",
};

export default function BasarilarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Başarılar"
        title="Sahada olduğumuz her organizasyon bir adım."
        description="Yarışmalar, hackathon'lar ve resmî değerlendirmelerde aldığımız sonuçlar — her biri ekip içi tecrübemizi büyüten birer adım."
      />

      <Container size="default">
        <ol className="relative space-y-12 py-16 pl-8 sm:pl-12">
          <span className="absolute bottom-0 left-2 top-0 w-px bg-gradient-to-b from-transparent via-[var(--color-brand-500)]/40 to-transparent sm:left-4" />
          {site.achievements.map((a) => {
            const Icon = iconMap[a.category] ?? Trophy;
            return (
              <li key={a.id} className="relative">
                <span className="absolute -left-8 top-1.5 grid h-8 w-8 place-items-center rounded-full border border-[var(--color-brand-400)]/40 bg-[var(--color-ink-900)] sm:-left-12 sm:h-10 sm:w-10">
                  <Icon size={16} className="text-[var(--color-brand-300)]" />
                </span>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                  {a.category} · {a.year}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-ink-50">
                  {a.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-300">
                  {a.blurb}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
