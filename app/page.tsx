import Link from "next/link";
import { ArrowRight, Plane, Cpu, Wrench, Trophy, Gauge, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DroneSilhouette } from "@/components/brand/drone-silhouette";
import { CompetitionPulse } from "@/components/home/competition-pulse";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <TechStatsBar />
      <FpvStatsBar />
      <Manifesto />
      <Pillars />
      <AchievementsStrip />
      <ProjectPreview />
      <Roadmap />
      <TeamTeaser />
      <SponsorCta />
    </>
  );
}

function TechStatsBar() {
  const specs = [
    { label: "Hover Süresi", value: "19.76", unit: "dk" },
    { label: "Maks. Hız", value: "59.4", unit: "km/h" },
    { label: "Maks. Menzil", value: "~12", unit: "km" },
    { label: "Total Ağırlık", value: "2.4", unit: "kg" },
  ];
  return (
    <section className="relative border-b border-white/5 bg-[color-mix(in_oklab,var(--color-ink-900)_55%,transparent)]">
      <Container size="wide">
        <div className="flex items-center gap-3 py-6">
          <Gauge size={14} className="shrink-0 text-[var(--color-brand-300)]" />
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[var(--color-brand-300)]">
            Sahadaki Aracın Ölçülen Performansı
          </p>
          <span className="hidden h-px flex-1 bg-gradient-to-r from-[var(--color-brand-400)]/40 to-transparent sm:block" />
          <Link
            href="/projeler/otonom-doner-kanat"
            className="hidden text-[0.65rem] font-display font-semibold uppercase tracking-[0.25em] text-ink-300 hover:text-white sm:inline-flex items-center gap-1.5"
          >
            Teknik Detay <ArrowRight size={11} />
          </Link>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] pb-px sm:grid-cols-4">
          {specs.map((s) => (
            <div
              key={s.label}
              className="bg-[color-mix(in_oklab,var(--color-ink-900)_70%,transparent)] px-5 py-7 text-center"
            >
              <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-400">
                {s.label}
              </dt>
              <dd className="mt-3 font-display font-black leading-none tracking-tight text-ink-50">
                <span className="text-3xl sm:text-4xl">{s.value}</span>
                <span className="ml-1.5 text-sm font-bold text-[var(--color-brand-300)]">
                  {s.unit}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.3em] text-ink-500 sm:text-left">
          Pixhawk 6C · Raspberry Pi 5 · ArduPilot · OpenCV · 3K Karbon Fiber
        </p>
        <div className="pb-12" />
      </Container>
    </section>
  );
}

function FpvStatsBar() {
  const specs = [
    { label: "Maks. Hız", value: "~170", unit: "km/h" },
    { label: "Ağırlık", value: "409", unit: "g" },
    { label: "Uçuş Süresi", value: "14-19", unit: "dk" },
    { label: "Video Gecikmesi", value: "8", unit: "ms" },
  ];
  return (
    <section className="relative border-b border-white/5 bg-[color-mix(in_oklab,var(--color-ink-900)_45%,transparent)]">
      <Container size="wide">
        <div className="flex items-center gap-3 py-6">
          <Gauge size={14} className="shrink-0 text-[var(--color-sky-dawn)]" />
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[var(--color-sky-dawn)]">
            FPV Yarış Drone&apos;u Teknik Özellikleri
          </p>
          <span className="hidden h-px flex-1 bg-gradient-to-r from-[var(--color-sky-dawn)]/40 to-transparent sm:block" />
          <Link
            href="/projeler/fpv-doner-kanat"
            className="hidden text-[0.65rem] font-display font-semibold uppercase tracking-[0.25em] text-ink-300 hover:text-white sm:inline-flex items-center gap-1.5"
          >
            Teknik Detay <ArrowRight size={11} />
          </Link>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] pb-px sm:grid-cols-4">
          {specs.map((s) => (
            <div
              key={s.label}
              className="bg-[color-mix(in_oklab,var(--color-ink-900)_70%,transparent)] px-5 py-7 text-center"
            >
              <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-400">
                {s.label}
              </dt>
              <dd className="mt-3 font-display font-black leading-none tracking-tight text-ink-50">
                <span className="text-3xl sm:text-4xl">{s.value}</span>
                <span className="ml-1.5 text-sm font-bold text-[var(--color-sky-dawn)]">
                  {s.unit}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.3em] text-ink-500 sm:text-left">
          GEPRC SpeedX2 2207E 1960Kv · Gemfan 5136 · F722-HD V2 · TAKER H60 60A · MATEN 1.6W VTX · Caddx Ratel 2 · ELRS 2.4GHz · GPS
        </p>
        <div className="pb-12" />
      </Container>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { label: "Aktif Üye", value: "7" },
    { label: "Departman", value: "4" },
    { label: "Yarışma Projesi", value: "3" },
    { label: "Birincilik", value: "1" },
  ];
  return (
    <section className="relative border-y border-white/5 bg-[color-mix(in_oklab,var(--color-ink-900)_70%,transparent)]">
      <Container size="wide">
        <dl className="grid grid-cols-2 divide-x divide-white/5 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                {s.label}
              </dt>
              <dd className="mt-3 font-display text-3xl sm:text-4xl font-black text-ink-50">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Layered cinematic background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-[var(--color-ink-900)]" />
        <div className="absolute inset-0 starfield opacity-70" />
        <div className="absolute -top-32 right-[-10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_60%)] opacity-25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,var(--color-sky-dawn)_0%,transparent_60%)] opacity-15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-ink-900)]" />
      </div>

      {/* Floating decorative drone silhouette */}
      <div className="pointer-events-none absolute right-[-8%] top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 text-[var(--color-brand-300)]/15 lg:block animate-fade">
        <DroneSilhouette className="h-full w-full spin-slow" />
      </div>

      <Container size="wide">
        <div className="grid min-h-[80dvh] place-items-center py-24 sm:py-32">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.3em] text-ink-200 backdrop-blur animate-rise">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-300)] shadow-[0_0_12px_var(--color-brand-300)]" />
              TEKNOFEST 2026 · Döner Kanat
            </p>
            <h1 className="mt-8 font-display text-[2.6rem] sm:text-[5rem] lg:text-[6.8rem] font-black leading-[0.95] tracking-tight break-words [overflow-wrap:anywhere] hyphens-auto">
              <span className="block text-ink-50 animate-rise delay-100">Stratosferi</span>
              <span className="wordmark-stratos block animate-rise delay-200">HEDEFLİYORUZ</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-200 animate-rise delay-300">
              {site.brand.longTagline}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-rise delay-400">
              <Button as="link" href="/sponsorlar" size="lg">
                Sponsor Ol <ArrowRight size={16} />
              </Button>
              <Button as="link" href="/iletisim#uyelik" variant="secondary" size="lg">
                <Users size={16} /> Bize Katıl
              </Button>
              <Button as="link" href="/projeler" variant="outline" size="lg">
                Projeleri Gör
              </Button>
            </div>
            <CompetitionPulse />
            <p className="mt-12 text-[0.65rem] uppercase tracking-[0.4em] text-ink-400 animate-rise delay-500">
              {site.brand.school} · {site.brand.city}
            </p>
          </div>
        </div>
      </Container>
    </section>
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
    <section className="relative border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent py-24">
      <Container size="wide">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[var(--color-brand-400)]/40 hover:bg-white/[0.04]"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_70%)] opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
              <p.icon size={28} className="text-[var(--color-brand-300)]" />
              <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                {p.blurb}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AchievementsStrip() {
  return (
    <section className="relative py-24">
      <Container size="default">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Başarılar
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
            Sahada olduğumuz organizasyonlar.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {site.achievements.map((a) => (
            <div
              key={a.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                {a.category} · {a.year}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink-50">
                {a.title}
              </h3>
              <p className="mt-3 text-sm text-ink-300">{a.blurb}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as="link" href="/basarilar" variant="ghost" size="sm">
            Tüm başarılar <ArrowRight size={14} />
          </Button>
        </div>
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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {site.projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projeler/${p.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[var(--color-brand-400)]/50 hover:bg-white/[0.04]"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                {p.competition}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-ink-50 group-hover:text-[var(--color-brand-300)]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-ink-300 line-clamp-3">
                {p.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-[0.2em] text-[var(--color-brand-300)]">
                İncele <ArrowRight size={14} />
              </span>
            </Link>
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
      <Container size="wide">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Yol Haritası
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
            TEKNOFEST 2026 sezon planı.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-300">
            Şubat'tan Eylül'e, her aşama ölçülebilir bir hedefle bağlı.
          </p>
        </div>
        <ol className="mt-14 grid gap-4 md:grid-cols-4">
          {phases.map((p, i) => (
            <li key={p.title} className="relative">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full font-display text-xs font-bold ${
                    p.status === "active"
                      ? "bg-[var(--color-brand-400)] text-ink-950"
                      : p.status === "final"
                        ? "bg-[var(--color-sky-dawn)] text-ink-950"
                        : "border border-white/15 text-ink-300"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < phases.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent md:block" />
                )}
              </div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                {p.tag}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-bold text-ink-50">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                {p.blurb}
              </p>
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
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Takım
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
              Sezonu yürüten kaptanlar.
            </h2>
          </div>
          <Button as="link" href="/takim" variant="outline" size="sm">
            Tam Kadro <ArrowRight size={14} />
          </Button>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {captains.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-[var(--color-brand-400)]/30 bg-white/[0.02] p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-brand-600)] font-display text-sm font-bold text-[var(--color-brand-100)]">
                {c.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <p className="mt-4 font-display text-base font-bold text-ink-50">
                {c.name}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-200)]">
                {c.role}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SponsorCta() {
  return (
    <section className="relative py-24">
      <Container size="default">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-sky-deep)] p-10 sm:p-16">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-brand-300)_0%,transparent_60%)] opacity-40 blur-3xl" />
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
