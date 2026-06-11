import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export const metadata = {
  title: "Sponsorlar",
  description:
    "Stratos İHA Takımı sponsorluk paketleri ve teknik kabiliyetlerimiz.",
};

const tierAccent: Record<string, string> = {
  altin: "from-[#FFD27A] via-[#F5B042] to-[#C28A1B]",
  gumus: "from-[#D9DEE3] via-[#A2ACB7] to-[#6C7785]",
  bronz: "from-[#E2A878] via-[#C17A45] to-[#8A4F26]",
  destekci: "from-[var(--color-brand-300)] via-[var(--color-brand-500)] to-[var(--color-brand-700)]",
};

export default function SponsorlarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsorluk"
        title="Adınız uçtuğumuz her görevde taşınır."
        description={site.sponsorship.intro}
      />

      <Container size="wide">
        <section className="py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.sponsorship.tiers
              .filter((t) => !("hidden" in t && t.hidden))
              .map((tier, idx) => (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]",
                  idx === 0
                    ? "border-[var(--color-brand-400)]/40"
                    : "border-white/10",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80",
                    tierAccent[tier.id],
                  )}
                />
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                  Paket
                </p>
                <h3 className="mt-2 font-display text-2xl font-black uppercase tracking-wide text-ink-50">
                  {tier.name}
                </h3>
                {site.sponsorship.showPrices !== false && (
                  <p className="mt-3 font-data text-lg font-bold tracking-tight text-[var(--color-brand-300)]">
                    {tier.amount}
                  </p>
                )}
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className="mt-1 shrink-0 text-[var(--color-brand-300)]"
                      />
                      <span className="text-sm leading-relaxed text-ink-200">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Sponsorlarımız
            </p>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold">
              Stratos'a güvenenler.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-300">
              İlk destekçimiz yanımızda. Kalan yerler bir sonraki
              sponsorlarımıza ayrıldı.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {site.sponsorship.sponsors.map((s) => {
              const tierName = site.sponsorship.tiers.find(
                (t) => t.id === s.tier,
              )?.name;
              const tile = (
                <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-5 transition-transform hover:scale-[1.03]">
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={200}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                  {tierName && (
                    <span
                      className={cn(
                        "absolute left-0 top-0 rounded-br-lg bg-gradient-to-r px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink-950",
                        tierAccent[s.tier],
                      )}
                    >
                      {tierName}
                    </span>
                  )}
                </div>
              );
              return s.url ? (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-300)]"
                >
                  {tile}
                </a>
              ) : (
                <div key={s.name}>{tile}</div>
              );
            })}
            {Array.from({
              length: Math.max(0, 5 - site.sponsorship.sponsors.length),
            }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[3/2] items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02]"
              >
                <span className="font-display text-[0.7rem] uppercase tracking-[0.25em] text-ink-500">
                  Sizin Logonuz
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-50">
            Özelleştirilmiş bir iş birliği mi düşünüyorsunuz?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-300">
            Standart paketlerin dışında da konuşmaya açığız. Görüşelim.
          </p>
          <div className="mt-7">
            <Button as="link" href="/iletisim" size="lg">
              Bizimle İletişime Geç <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
