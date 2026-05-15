"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Flag, Megaphone } from "lucide-react";
import { site } from "@/data/site";

function daysUntil(iso: string): number | null {
  const target = new Date(iso + "T00:00:00").getTime();
  if (Number.isNaN(target)) return null;
  const now = Date.now();
  const diff = target - now;
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export function CompetitionPulse() {
  const [comp, setComp] = useState<number | null>(null);
  const [sponsor, setSponsor] = useState<number | null>(null);

  useEffect(() => {
    setComp(daysUntil(site.season.competitionDate));
    setSponsor(daysUntil(site.season.sponsorshipDeadline));
  }, []);

  return (
    <div
      className="mx-auto mt-12 max-w-3xl animate-rise delay-500"
      role="region"
      aria-label="Sezon durumu"
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-3">
        <PulseCell
          icon={<Calendar size={14} />}
          eyebrow="Yarışma haftası"
          value={comp != null ? `${comp}` : "—"}
          unit="gün"
          hint={site.season.competition}
        />
        <PulseCell
          icon={<Flag size={14} />}
          eyebrow="Şu anki faz"
          value={site.season.currentPhase}
          hint={`Sırada · ${site.season.nextMilestone}`}
        />
        <Link
          href="/sponsorlar"
          className="group block bg-[var(--color-ink-900)] px-5 py-5 text-left transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
        >
          <div className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-sky-dawn)]">
            <Megaphone size={14} /> Sponsor penceresi
          </div>
          <p className="mt-2 font-display text-2xl font-black leading-none text-ink-50 group-hover:text-white">
            {sponsor != null ? sponsor : "—"}
            <span className="ml-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-sky-dawn)]">
              gün
            </span>
          </p>
          <p className="mt-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-ink-400">
            Sezona katılmak için son tarih
          </p>
        </Link>
      </div>
    </div>
  );
}

function PulseCell({
  icon,
  eyebrow,
  value,
  unit,
  hint,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  value: string;
  unit?: string;
  hint: string;
}) {
  return (
    <div className="bg-[var(--color-ink-900)] px-5 py-5">
      <div className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
        {icon} {eyebrow}
      </div>
      <p className="mt-2 font-display text-2xl font-black leading-none text-ink-50">
        {value}
        {unit && (
          <span className="ml-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-300)]">
            {unit}
          </span>
        )}
      </p>
      <p className="mt-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-ink-400">
        {hint}
      </p>
    </div>
  );
}
