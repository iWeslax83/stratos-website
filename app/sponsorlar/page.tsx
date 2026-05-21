import Image from "next/image";
import { Check, ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

const testimonials: Testimonial[] = [];

export const metadata = {
  title: "Sponsorlar",
  description:
    "Stratos İHA Takımı sponsorluk paketleri ve teknik kabiliyetlerimiz.",
};

const tierAccent: Record<string, string> = {
  platin: "from-[#E5E4E2] via-[#CFCFCF] to-[#A8A8A8]",
  altin: "from-[#FFD27A] via-[#F5B042] to-[#C28A1B]",
  gumus: "from-[#D9DEE3] via-[#A2ACB7] to-[#6C7785]",
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
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {site.sponsorship.tiers
              .filter((t) => !("hidden" in t && t.hidden))
              .map((tier, idx) => (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.02] p-7 transition-all hover:bg-white/[0.04]",
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
                <p className="mt-2 font-display text-sm font-semibold text-[var(--color-brand-300)]">
                  {tier.amount}
                </p>
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
                <Button
                  as="link"
                  href="/iletisim"
                  variant={idx === 0 ? "primary" : "outline"}
                  size="sm"
                  className="mt-7"
                >
                  Bu Paketi Konuş <ArrowRight size={14} />
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
                Teknik Kanıt
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
                Sponsorluk bir mühendislik yatırımıdır.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-200">
                Sahaya çıkan İHA'mız <strong className="text-ink-50">TEKNOFEST 2026</strong> sunum
                raporunu başarıyla geçti. Konfigürasyon, üretim ve yazılım
                tercihlerimiz raporda detaylı şekilde belgelendi.
              </p>
              <p className="mt-4 text-sm text-ink-300">
                Aşağıdaki özet, sponsor olduğunuzda destek vereceğiniz aracın
                ölçülen performans ve donanım seçimini özetliyor.
              </p>
              <Button
                as="link"
                href="/projeler/otonom-doner-kanat"
                variant="ghost"
                size="sm"
                className="mt-6"
              >
                Detaylı Proje Sayfası <ArrowRight size={14} />
              </Button>
            </div>

            <div className="md:col-span-7">
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                {site.sponsorship.credibility.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                  >
                    <dt className="text-[0.65rem] uppercase tracking-[0.25em] text-ink-400">
                      {item.label}
                    </dt>
                    <dd className="mt-2 font-display text-xl font-bold text-ink-50">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Sponsorlardan
            </p>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold">
              İş birliği yapanların kendi sözleriyle.
            </h2>
          </div>

          {testimonials.length === 0 ? (
            <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-dashed border-white/15 bg-gradient-to-br from-white/[0.03] to-transparent p-10 sm:p-14">
              <Quote
                size={36}
                className="text-[var(--color-brand-300)]/70"
              />
              <p className="mt-5 font-display text-2xl sm:text-3xl font-bold leading-snug text-ink-50">
                İlk sponsor sözlerimizi yakında burada paylaşacağız.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-300">
                Sponsorlarımızdan aldığımız geri dönüşler, neden Stratos&apos;u
                desteklediklerini ve birlikte ne ürettiğimizi, bu bölümde yer
                alacak. İlk iş birliğimizden ses çıktığında, doğrudan onların
                ağzından duyacaksınız.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-ink-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-400)]" />
                Sponsor olun, sözünüz buradan duyulsun
              </div>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <figure
                  key={t.author}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8"
                >
                  <Quote
                    size={32}
                    className="text-[var(--color-brand-300)]/70"
                  />
                  <blockquote className="mt-5 font-display text-lg leading-relaxed text-ink-100">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-white/5 pt-5">
                    <p className="font-display text-base font-bold text-ink-50">
                      {t.author}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-400">
                      {t.role} · {t.company}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
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
