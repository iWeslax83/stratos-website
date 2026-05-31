import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/data/site";

export const metadata = {
  title: "Topluma Açılan Kanatlar",
  description:
    "Stratos İHA Takımı'nın atölye, okul ziyareti ve tanıtım çalışmaları.",
};

export default function ToplulukPage() {
  return (
    <>
      <PageHeader
        eyebrow="Topluma Açılan Kanatlar"
        title="Bildiğimizi paylaşıyoruz."
        description="İHA'yı yalnızca yarışmak için değil, anlatmak için de yapıyoruz. Atölyelerimiz, okul ziyaretlerimiz ve tanıtım çalışmalarımız burada."
      />
      <Container size="wide">
        <div className="py-16">
          {site.outreach.length === 0 ? (
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
              <GraduationCap
                size={36}
                className="mx-auto text-[var(--color-brand-300)]/80"
              />
              <p className="mt-6 font-display text-xl font-bold text-ink-50">
                Atölyeden topluma.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-300">
                Genç öğrencilere yönelik atölyelerimizi, okul ziyaretlerimizi ve
                tanıtım çalışmalarımızı yakında karelerle ve sayılarla burada
                paylaşacağız.
              </p>
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.3em] text-ink-500">
                Yakında
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {site.outreach.map((o) => (
                <article
                  key={o.slug}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-[var(--color-brand-400)]/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(150deg,var(--color-sky-deep),var(--color-brand-800))]">
                    {o.image && (
                      <Image
                        src={o.image}
                        alt={o.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    {o.stat && (
                      <div className="absolute left-3 top-3 rounded-full bg-[color-mix(in_oklab,var(--color-ink-950)_70%,transparent)] px-3 py-1 backdrop-blur">
                        <span className="font-display text-sm font-black text-ink-50">
                          {o.stat}
                        </span>
                        {o.statLabel && (
                          <span className="ml-1.5 text-[0.6rem] uppercase tracking-[0.15em] text-ink-200">
                            {o.statLabel}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-400">
                      {o.period}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold text-ink-50">
                      {o.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-300">
                      {o.blurb}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
