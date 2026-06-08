import Link from "next/link";
import { ArrowRight, Plane, Cpu, Wrench, Trophy, Gauge, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CinematicHero } from "@/components/home/cinematic-hero";
import { RevealBand } from "@/components/home/reveal-band";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <TechStatsBar />
      </Reveal>
      <Reveal>
        <FpvStatsBar />
      </Reveal>
      <Reveal>
        <Manifesto />
      </Reveal>
      <RevealBand
        image={site.media.revealBand}
        eyebrow="Otonom Döner Kanat · TEKNOFEST 2026"
        title="Tasarladık, ürettik, uçurduk."
        description="Pixhawk uçuş kontrolcüsü ve kendi yazdığımız otonom yazılımla, kalkıştan hassas inişe kadar her aşamayı sahada doğruladık."
        accent="brand"
        align="left"
        stats={[
          { value: "19.76", unit: "dk", label: "Hover" },
          { value: "59.4", unit: "km/h", label: "Maks. Hız" },
          { value: "12", unit: "km", label: "Menzil" },
        ]}
      />
      <Reveal>
        <Pillars />
      </Reveal>
      <Reveal>
        <AchievementsStrip />
      </Reveal>
      <Reveal>
        <ProjectPreview />
      </Reveal>
      <RevealBand
        image="/images/projects/fpv-doner-kanat.jpg"
        eyebrow="Yarış FPV Drone'u · MEB Robot"
        title="Sahanın en hızlısı olmak için ayarlandı."
        description="409 gramlık karbon gövde, 1960Kv motorlar ve 8 ms gecikmeli analog video; sürücüyle drone arasında neredeyse hiç bekleme yok."
        accent="dawn"
        align="right"
        stats={[
          { value: "~170", unit: "km/h", label: "Maks. Hız" },
          { value: "409", unit: "g", label: "Ağırlık" },
          { value: "8", unit: "ms", label: "Video Gecikmesi" },
        ]}
      />
      <Reveal>
        <Roadmap />
      </Reveal>
      <Reveal>
        <TeamTeaser />
      </Reveal>
      <Reveal>
        <SponsorCta />
      </Reveal>
    </>
  );
}

type Spec = { label: string; value: string; unit: string };

function SpecStrip({
  name,
  eyebrow,
  href,
  accentVar,
  specs,
  components,
  reverse = false,
}: {
  name: string;
  eyebrow: string;
  href: string;
  accentVar: string;
  specs: Spec[];
  components: string;
  reverse?: boolean;
}) {
  return (
    <section className="relative border-b border-white/5">
      <Container size="wide">
        <div className="grid gap-x-12 gap-y-10 py-14 sm:py-16 lg:grid-cols-12 lg:items-center">
          {/* Aircraft label + spec sheet link */}
          <div
            className={cn(
              "lg:col-span-4",
              reverse && "lg:order-2 lg:text-right",
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2.5",
                reverse && "lg:flex-row-reverse",
              )}
            >
              <Gauge size={14} className="shrink-0" style={{ color: accentVar }} />
              <p
                className="text-[0.62rem] font-semibold uppercase tracking-[0.3em]"
                style={{ color: accentVar }}
              >
                {eyebrow}
              </p>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink-50">
              {name}
            </h3>
            <p className="mt-3 text-[0.7rem] leading-relaxed tracking-wide text-ink-500">
              {components}
            </p>
            <Link
              href={href}
              className={cn(
                "mt-5 inline-flex items-center gap-1.5 text-[0.65rem] font-display font-semibold uppercase tracking-[0.25em] text-ink-300 transition-colors hover:text-white",
                reverse && "lg:flex-row-reverse",
              )}
            >
              Teknik Detay <ArrowRight size={11} />
            </Link>
          </div>

          {/* Readout: featured lead stat + supporting figures, hairline separated */}
          <dl
            className={cn(
              "grid grid-cols-2 sm:grid-cols-4 lg:col-span-8",
              reverse && "lg:order-1",
            )}
          >
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "border-t border-white/10 py-5 sm:border-t-0 sm:px-6 sm:py-1",
                  i > 0 && "sm:border-l sm:border-white/10",
                  i === 0 && "sm:pl-0",
                )}
              >
                <dd className="font-data font-bold leading-none tracking-tight text-ink-50">
                  <span className={i === 0 ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}>
                    {s.value}
                  </span>
                  <span
                    className="ml-1.5 text-sm font-bold"
                    style={{ color: accentVar }}
                  >
                    {s.unit}
                  </span>
                </dd>
                <dt className="mt-3 text-[0.58rem] uppercase tracking-[0.28em] text-ink-400">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function TechStatsBar() {
  return (
    <SpecStrip
      name="Otonom Döner Kanat"
      eyebrow="Otonom İHA · Teknik Özellikler"
      href="/projeler/otonom-doner-kanat"
      accentVar="var(--color-brand-300)"
      components="Pixhawk 6C · Raspberry Pi 5 · ArduPilot · OpenCV · 3K Karbon Fiber"
      specs={[
        { label: "Hover Süresi", value: "19.76", unit: "dk" },
        { label: "Maks. Hız", value: "59.4", unit: "km/h" },
        { label: "Maks. Menzil", value: "~12", unit: "km" },
        { label: "Taşıma Kapasitesi", value: "11.8", unit: "kg" },
      ]}
    />
  );
}

function FpvStatsBar() {
  return (
    <SpecStrip
      name="Yarış FPV Drone"
      eyebrow="Yarış FPV · Teknik Özellikler"
      href="/projeler/fpv-doner-kanat"
      accentVar="var(--color-sky-dawn)"
      reverse
      components="GEPRC SpeedX2 2207E 1960Kv · Gemfan 5136 · F722-HD V2 · TAKER H60 60A · MATEN 1.6W VTX · Caddx Ratel 2 · ELRS 2.4GHz"
      specs={[
        { label: "Maks. Hız", value: "~170", unit: "km/h" },
        { label: "Ağırlık", value: "409", unit: "g" },
        { label: "Uçuş Süresi", value: "14-19", unit: "dk" },
        { label: "Video Gecikmesi", value: "8", unit: "ms" },
      ]}
    />
  );
}

function Hero() {
  return (
    <CinematicHero image="/images/projects/otonom-doner-kanat.jpg">
      <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.3em] text-ink-200 backdrop-blur animate-rise">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-300)] shadow-[0_0_12px_var(--color-brand-300)]" />
        TEKNOFEST 2026 · Döner Kanat
      </p>
      <h1 className="mt-8 font-display text-[2.7rem] sm:text-[5rem] lg:text-[6.2rem] font-black leading-[0.92] tracking-tight break-words [overflow-wrap:anywhere] hyphens-auto sm:break-normal sm:[overflow-wrap:normal] sm:hyphens-none">
        <span className="block text-ink-50 animate-rise delay-100">Stratosferi</span>
        <span className="wordmark-stratos block animate-rise delay-200">HEDEFLİYORUZ</span>
      </h1>
      <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-ink-200 animate-rise delay-300">
        {site.brand.longTagline}
      </p>
      <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center animate-rise delay-400">
        <Button as="link" href="/sponsorlar" size="lg">
          Sponsor Ol <ArrowRight size={16} />
        </Button>
        <Button as="link" href="/iletisim#uyelik" variant="secondary" size="lg">
          <Users size={16} /> Bize Katıl
        </Button>
        <Button as="link" href="/projeler" variant="ghost" size="lg">
          Projeleri gör <ArrowRight size={16} />
        </Button>
      </div>
      <p className="mt-12 text-[0.65rem] uppercase tracking-[0.4em] text-ink-400 animate-rise delay-500">
        {site.brand.school} · {site.brand.city}
      </p>
    </CinematicHero>
  );
}

function Manifesto() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container size="default">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Hakkımızda
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              Sıfırdan tasarlayıp uçuran lise takımı.
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg leading-relaxed text-ink-200">
              Stratos, Tofaş Fen Lisesi&apos;nde insansız hava araçlarına ilgi
              duyan öğrencilerin kurduğu bir takım. Drone&apos;u tasarlıyor,
              kontrol yazılımını yazıyor ve uçuş testlerini kendimiz yapıyoruz.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-300">
              Her sezon yarışma şartnamesine göre yeni bir İHA tasarlayıp
              üretiyor, sahada test ediyoruz. Bir önceki araçtan öğrendiğimiz
              her şey bir sonrakine giriyor.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      icon: Wrench,
      title: "Tasarım & Üretim",
      blurb:
        "CAD ortamında 3 boyutlu model, ardından CNC kesim ve 3D baskı ile karbon fiber gövde üretimi.",
    },
    {
      icon: Cpu,
      title: "Otonom Yazılım",
      blurb:
        "ArduPilot + OpenCV ile gerçek zamanlı hedef tespiti, otonom navigasyon ve hassas iniş.",
    },
    {
      icon: Plane,
      title: "Uçuş Testi",
      blurb:
        "SITL simülasyonu ve gerçek saha testleriyle PID optimizasyonu, sertifikalı pilot kadrosu.",
    },
    {
      icon: Trophy,
      title: "Yarışma",
      blurb:
        "TEKNOFEST, MEB Robot, NASA SpaceApps ve VEX Robotics'te sahada olduğumuz organizasyonlar.",
    },
  ];

  return (
    <section className="relative border-y border-white/5 py-24">
      <Container size="wide">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Disiplinler
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              Tasarımdan uçuşa, dört koldan.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
              Her araç dört ekibin ortak işi: çizimden üretime, otonom
              yazılımdan saha testine kadar.
            </p>
          </div>
          <ol className="md:col-span-8">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-t border-white/10 py-7 first:border-t-0 first:pt-0 sm:grid-cols-[auto_auto_1fr] sm:items-baseline"
              >
                <span className="font-data text-sm font-bold tabular-nums text-[var(--color-brand-300)]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-ink-50 transition-colors group-hover:text-[var(--color-brand-200)]">
                  <p.icon size={18} className="text-[var(--color-brand-300)]" />
                  {p.title}
                </h3>
                <p className="col-start-2 max-w-md text-sm leading-relaxed text-ink-300 sm:col-start-3">
                  {p.blurb}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function AchievementsStrip() {
  return (
    <section className="relative py-24">
      <Container size="default">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Başarılar
            </p>
            <h2 className="mt-4 max-w-md font-display text-3xl sm:text-4xl font-bold leading-tight">
              Sahada olduğumuz organizasyonlar.
            </h2>
          </div>
          <Button as="link" href="/basarilar" variant="ghost" size="sm">
            Tüm başarılar <ArrowRight size={14} />
          </Button>
        </div>
        {(() => {
          const [featured, ...rest] = site.achievements;
          return (
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] lg:grid-cols-5">
              {/* Featured achievement — spans the full height of the two stacked cells */}
              <article className="group relative flex flex-col justify-between gap-12 bg-[var(--color-ink-900)] p-9 transition-colors hover:bg-[var(--color-ink-800)] lg:col-span-3 lg:row-span-2">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--color-brand-300)]" aria-hidden="true" />
                  <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
                    {featured.category} · Öne çıkan
                  </p>
                </div>
                <div>
                  <span className="font-data text-5xl font-bold tabular-nums leading-none text-ink-700 transition-colors group-hover:text-[var(--color-brand-300)]/60">
                    {featured.year}
                  </span>
                  <h3 className="mt-4 max-w-md font-display text-2xl font-bold leading-snug text-ink-50 sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300">
                    {featured.blurb}
                  </p>
                </div>
              </article>
              {rest.map((a) => (
                <article
                  key={a.id}
                  className="group relative flex flex-col bg-[var(--color-ink-900)] p-7 transition-colors hover:bg-[var(--color-ink-800)] lg:col-span-2"
                >
                  <div className="flex items-baseline justify-between">
                    <p className="text-[0.62rem] uppercase tracking-[0.3em] text-ink-400">
                      {a.category}
                    </p>
                    <span className="font-data text-sm font-bold tabular-nums text-ink-600 transition-colors group-hover:text-[var(--color-brand-300)]">
                      {a.year}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink-50">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{a.blurb}</p>
                </article>
              ))}
            </div>
          );
        })()}
      </Container>
    </section>
  );
}

function ProjectPreview() {
  return (
    <section className="relative border-t border-white/5 py-24">
      <Container size="wide">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Projeler
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
              Bu sezon sahadaki araçlarımız.
            </h2>
          </div>
          <Button as="link" href="/projeler" variant="outline" size="sm">
            Tümünü Gör <ArrowRight size={14} />
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
          {site.projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Roadmap() {
  const phases = [
    {
      tag: "Şubat 2026",
      title: "Detay Tasarım",
      blurb:
        "Kavramsal aşama bitti, şimdi CAD üzerinde son detaylar ve malzeme onayları.",
      status: "active",
    },
    {
      tag: "Mart - Mayıs 2026",
      title: "Üretim & Entegrasyon",
      blurb:
        "Karbon fiber CNC kesim, 3D baskı, elektronik montaj. Üretim hatları paralel ilerliyor.",
      status: "next",
    },
    {
      tag: "Haziran - Ağustos 2026",
      title: "Test & Optimizasyon",
      blurb:
        "PID ayarı, otonom hedef tespiti testleri, saha uçuşları.",
      status: "next",
    },
    {
      tag: "Eylül 2026",
      title: "TEKNOFEST Yarışması",
      blurb:
        "Liseler Arası İHA · Döner Kanat kategorisinde sahada olacağız.",
      status: "final",
    },
  ];
  return (
    <section className="relative border-y border-white/5 py-24">
      <Container size="default">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Yol Haritası
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            TEKNOFEST 2026 sezon planı.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">
            Şubat&apos;tan Eylül&apos;e, her aşama ölçülebilir bir hedefle bağlı.
          </p>
        </div>
        <ol className="mt-12 max-w-2xl">
          {phases.map((p, i) => (
            <li key={p.title} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full font-data text-xs font-bold",
                    p.status === "active"
                      ? "bg-[var(--color-brand-400)] text-ink-950"
                      : p.status === "final"
                        ? "bg-[var(--color-sky-dawn)] text-ink-950"
                        : "border border-white/15 text-ink-300",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < phases.length - 1 && (
                  <span className="my-1 w-px flex-1 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </div>
              <div className={i < phases.length - 1 ? "pb-9" : ""}>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                  {p.tag}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-bold text-ink-50">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-300">
                  {p.blurb}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function TeamTeaser() {
  const captains = site.team.members.filter((m) => m.captain).slice(0, 4);
  return (
    <section className="relative py-24">
      <Container size="wide">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Takım
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              Sezonu yürüten kaptanlar.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
              Dört departman, dört kaptan. Sezon planını ve teknik kararları
              onlar taşıyor.
            </p>
            <Button
              as="link"
              href="/takim"
              variant="outline"
              size="sm"
              className="mt-6"
            >
              Tam Kadro <ArrowRight size={14} />
            </Button>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-white/5 border-y border-white/5">
              {captains.map((c) => (
                <li key={c.name} className="flex items-center gap-4 py-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-brand-600)] font-display text-sm font-bold text-[var(--color-brand-100)]">
                    {c.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-ink-50">
                      {c.name}
                    </p>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-400">
                      {c.department}
                    </p>
                  </div>
                  <p className="ml-auto max-w-[45%] text-right text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-brand-200)]">
                    {c.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SponsorCta() {
  return (
    <section className="relative py-24">
      <Container size="default">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--color-brand-800)] via-[var(--color-sky-deep)] to-[var(--color-ink-900)] p-10 sm:p-16">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-300)]/50 to-transparent" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-200)]">
              Sponsor Ol
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl sm:text-5xl font-bold leading-tight">
              Adınız uçtuğumuz her görevde taşınır.
            </h2>
            <p className="mt-5 max-w-xl text-base text-ink-100/90">
              {site.sponsorship.intro}
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button as="link" href="/sponsorlar" size="lg">
                Sponsor Paketleri <ArrowRight size={16} />
              </Button>
              <Button as="link" href="/iletisim" variant="ghost" size="lg">
                Bizimle İletişime Geç
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
