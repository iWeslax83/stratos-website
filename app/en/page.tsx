import {
  ArrowRight,
  Languages,
  Plane,
  Cpu,
  Wrench,
  Trophy,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DroneSilhouette } from "@/components/brand/drone-silhouette";
import { site } from "@/data/site";
import { siteEn } from "@/data/site-en";
import { cn } from "@/lib/cn";

export const metadata = {
  title: "English · Stratos UAV Team",
  description:
    "Stratos is the UAV team of Tofaş Fen Lisesi in Bursa, Turkey. Students design, build, program and fly autonomous and FPV rotary-wing aircraft, and compete with them at national level. Sponsorship and partnership inquiries welcome.",
};

const tierAccent: Record<string, string> = {
  altin: "from-[#FFD27A] via-[#F5B042] to-[#C28A1B]",
  gumus: "from-[#D9DEE3] via-[#A2ACB7] to-[#6C7785]",
  bronz: "from-[#E8A87C] via-[#C77B4A] to-[#8B4E23]",
  destekci:
    "from-[var(--color-brand-300)] via-[var(--color-brand-500)] to-[var(--color-brand-700)]",
};


const credibilityEn = [
  { label: "All-up mass", value: "2.4 kg" },
  { label: "Hover endurance", value: "19.76 min" },
  { label: "Max speed", value: "59.4 km/h" },
  { label: "Max range", value: "~12 km" },
  { label: "Flight controller", value: "Pixhawk 6C" },
  { label: "Companion computer", value: "Raspberry Pi 5 (8 GB)" },
  { label: "Software stack", value: "ArduPilot · OpenCV" },
  { label: "Airframe", value: "3K carbon fiber" },
];

const pillarsEn = [
  {
    icon: Wrench,
    title: "Design & Manufacture",
    blurb:
      "Full 3D CAD design, CNC-cut carbon fiber, 3D-printed structural parts, all fabricated in-house.",
  },
  {
    icon: Cpu,
    title: "Autonomous Software",
    blurb:
      "ArduPilot + OpenCV pipeline for real-time target detection, autonomous navigation, and precision landing.",
  },
  {
    icon: Plane,
    title: "Flight Testing",
    blurb:
      "SITL simulation plus real-world flight testing, certified pilots, iterative PID tuning.",
  },
  {
    icon: Trophy,
    title: "Competition",
    blurb:
      "Active in TEKNOFEST, MEB Robot, NASA SpaceApps, and VEX Robotics events.",
  },
];


export default function EnglishLanding() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <About />
      <Pillars />
      <Achievements />
      <FlagshipProject />
      <TechSpecs />
      <Team />
      <SponsorTiers />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-[var(--color-ink-900)]" />
        <div className="absolute inset-0 starfield opacity-70" />
        <div className="absolute -top-32 right-[-10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_60%)] opacity-25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,var(--color-sky-dawn)_0%,transparent_60%)] opacity-15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-ink-900)]" />
      </div>

      <div className="pointer-events-none absolute right-[-8%] top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 text-[var(--color-brand-300)]/15 lg:block animate-fade">
        <DroneSilhouette className="h-full w-full spin-slow" />
      </div>

      <Container size="wide">
        <div className="grid min-h-[78dvh] place-items-center py-24 sm:py-32">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.3em] text-ink-200 backdrop-blur animate-rise">
              <Languages size={12} /> English · TEKNOFEST 2026 · Rotary Wing
            </p>
            <h1 className="mt-8 font-display text-[2.4rem] sm:text-[5rem] lg:text-[6.4rem] font-black leading-[0.95] tracking-tight break-words [overflow-wrap:anywhere] hyphens-auto">
              <span className="block text-ink-50 animate-rise delay-100">
                Aiming for the
              </span>
              <span className="wordmark-stratos block animate-rise delay-200">
                STRATOSPHERE
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-200 animate-rise delay-300">
              Stratos is the UAV team at {site.brand.school} in {site.brand.city}.
              Students design our aircraft, build it, write its software and
              fly it themselves, and we compete with it at national level.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-rise delay-400">
              <Button as="link" href="#sponsor" size="lg">
                Become a Sponsor <ArrowRight size={16} />
              </Button>
              <Button as="link" href="/" variant="outline" size="lg">
                Continue in Türkçe
              </Button>
            </div>
            <p className="mt-12 text-[0.65rem] uppercase tracking-[0.4em] text-ink-400 animate-rise delay-500">
              {site.brand.school} · {site.brand.city}, Türkiye
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function QuickFacts() {
  const stats = [
    { label: "Active Members", value: String(site.team.members.length) },
    { label: "Departments", value: "4" },
    { label: "Competition Projects", value: "3" },
    { label: "1st-Place Wins", value: "1" },
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

function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container size="default">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              About
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              A high-school team that designs, builds, and flies its own UAVs.
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg leading-relaxed text-ink-200">
              Stratos is a team of {site.brand.school} students interested in
              unmanned aerial vehicles. We design the drone, write its control
              software and run the flight tests ourselves. What we learn from
              one aircraft goes into the next.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-300">
              Every season we design a new aircraft from scratch, manufacture
              it in-house, validate it in simulation and on the field, and
              enter it into the country&apos;s leading aerospace and robotics
              competitions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pillars() {
  return (
    <section className="relative border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent py-24">
      <Container size="wide">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillarsEn.map((p) => (
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

function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-24 py-24">
      <Container size="default">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Achievements
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
            Where we&apos;ve competed, and won.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {siteEn.achievements.map((a) => (
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
      </Container>
    </section>
  );
}

function FlagshipProject() {
  return (
    <section id="project" className="relative scroll-mt-24 border-t border-white/5 py-24">
      <Container size="wide">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Flagship Project
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              Autonomous Rotary-Wing UAV · TEKNOFEST 2026
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-200">
              An X-quadrotor purpose-built for the TEKNOFEST 2026
              Rotary-Wing competition. Onboard vision pipeline detects ground
              targets, executes precision landing, and triggers the mission
              payload, autonomously.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-200">
              <li className="flex items-start gap-2.5">
                <Check size={14} className="mt-1 shrink-0 text-[var(--color-brand-300)]" />
                Pixhawk 6C flight controller + Raspberry Pi 5 (8 GB) companion
              </li>
              <li className="flex items-start gap-2.5">
                <Check size={14} className="mt-1 shrink-0 text-[var(--color-brand-300)]" />
                Pi Camera Module 3 + OpenCV for real-time target detection
              </li>
              <li className="flex items-start gap-2.5">
                <Check size={14} className="mt-1 shrink-0 text-[var(--color-brand-300)]" />
                3K carbon-fiber airframe, CNC-cut to ±0.1 mm tolerance
              </li>
              <li className="flex items-start gap-2.5">
                <Check size={14} className="mt-1 shrink-0 text-[var(--color-brand-300)]" />
                2.4 kg AUW · 19.76 min hover · 16.5 m/s max speed
              </li>
            </ul>
          </div>
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                Other Active Project
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                    MEB Robot FPV UAV · Rotary Wing
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink-50">
                    FPV Rotary-Wing UAV
                  </h3>
                  <p className="mt-2 text-sm text-ink-300">
                    Low-latency analog FPV, lightweight race-tuned airframe,
                    flown by certified pilots.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TechSpecs() {
  return (
    <section className="relative border-t border-white/5 py-24">
      <Container size="wide">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              Technical Credibility
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              Sponsorship is an engineering investment.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-200">
              Our flagship UAV passed{" "}
              <strong className="text-ink-50">TEKNOFEST 2026</strong>{" "}
              project-report review. Configuration, manufacturing, and
              software choices are documented in detail. The numbers below
              are measured, not advertised.
            </p>
          </div>

          <div className="md:col-span-7">
            <dl className="grid grid-cols-2 gap-4">
              {credibilityEn.map((item) => (
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
      </Container>
    </section>
  );
}

function Team() {
  const captains = siteEn.team.members.filter((m) => m.captain);
  return (
    <section id="team" className="relative scroll-mt-24 border-t border-white/5 py-24">
      <Container size="wide">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Team
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
            The leads running the season.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-300">
            Faculty advisor:{" "}
            <strong className="text-ink-50">
              {site.team.advisor.name}
            </strong>{" "}
            at {site.brand.school}.
          </p>
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

function SponsorTiers() {
  return (
    <section id="sponsor" className="relative scroll-mt-24 border-t border-white/5 py-24">
      <Container size="wide">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Sponsorship
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold">
            Your name flies with every mission.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-200">
            Stratos is a newly formed team aiming to compete seriously at the
            national level. Our sponsors&apos; names appear on the aircraft
            body and in the content we share.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteEn.sponsorship.tiers.map((tier, idx) => (
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
                Tier
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
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent(
                  `Sponsorship inquiry: ${tier.name} tier`,
                )}`}
                external
                variant={idx === 0 ? "primary" : "outline"}
                size="sm"
                className="mt-7"
              >
                Talk to us <ArrowRight size={14} />
              </Button>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-ink-300">
          Considering a custom partnership? We&apos;re open to packages outside
          these tiers: media sponsorships, equipment in-kind, training
          collaborations.
        </p>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24">
      <Container size="default">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-sky-deep)] p-10 sm:p-16">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-brand-300)_0%,transparent_60%)] opacity-40 blur-3xl" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-200)]">
              Get in touch
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl sm:text-5xl font-bold leading-tight">
              Let&apos;s talk, in English, anytime.
            </h2>
            <p className="mt-5 max-w-xl text-base text-ink-100/90">
              Whether you&apos;re reaching out as a potential sponsor,
              partner, or media contact, email us in English and we&apos;ll
              respond in English. Same address, same team.
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Stratos inquiry (EN)")}`}
                className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                <Mail size={20} className="mt-0.5 shrink-0 text-[var(--color-brand-200)]" />
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-200">
                    Email
                  </dt>
                  <dd className="mt-1 font-display text-base font-semibold text-ink-50">
                    {site.contact.email}
                  </dd>
                </div>
              </a>
              <a
                href={site.contact.phoneHref}
                className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                <Phone size={20} className="mt-0.5 shrink-0 text-[var(--color-brand-200)]" />
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-200">
                    Phone
                  </dt>
                  <dd className="mt-1 font-display text-base font-semibold text-ink-50">
                    {site.contact.phone}
                  </dd>
                </div>
              </a>
            </dl>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
              <Button
                as="link"
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Sponsorship inquiry (EN)")}`}
                external
                size="lg"
              >
                Email about sponsorship <ArrowRight size={16} />
              </Button>
              <Button as="link" href="/iletisim" variant="ghost" size="lg">
                Open contact form
              </Button>
            </div>

            <p className="mt-10 text-[0.65rem] uppercase tracking-[0.4em] text-ink-200/80">
              {site.brand.school} · {site.brand.city}, Türkiye
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

