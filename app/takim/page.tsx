import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type Alumnus = {
  name: string;
  cohort: string;
  university: string;
  major: string;
};

const alumni: Alumnus[] = [];

export const metadata = {
  title: "Takım",
  description:
    "Stratos İHA Takımı'nın yapısı, departmanlar, kaptanlar ve aktif üyeler.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TakimPage() {
  const captains = site.team.members.filter((m) => m.captain);
  const members = site.team.members.filter((m) => !m.captain);

  return (
    <>
      <PageHeader
        eyebrow="Takım"
        title="Stratos'un ardındaki yedi öğrenci."
        description="Dört departman, ortak hedef. Her ekip kendi uzmanlık alanında çalışırken, koordineli toplantılarla bilgi paylaşımı sağlanır."
      />

      <Container size="wide">
        <section className="py-16">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Danışman
          </h2>
          <div className="mt-6 max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--color-brand-700)] font-display text-base font-bold text-[var(--color-brand-100)]">
                {initials(site.team.advisor.name)}
              </div>
              <div>
                <p className="font-display text-lg font-bold text-ink-50">
                  {site.team.advisor.name}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
                  {site.team.advisor.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Kaptanlar
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-300">
            Departmanlarını yöneten, sezon planını ve teknik kararları taşıyan
            kaptanlar.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {captains.map((c) => (
              <MemberCard key={c.name} member={c} variant="captain" />
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Aktif Üyeler
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <MemberCard key={m.name} member={m} variant="member" />
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
                Mezunlar
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-300">
                Stratos&apos;tan mezun olup havacılık, mühendislik ya da bilim
                yolculuğuna devam eden eski üyelerimiz. Uzun vadeli takım
                çıktımız buradan ölçülecek.
              </p>
            </div>
          </div>

          {alumni.length === 0 ? (
            <div className="mt-8 relative overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
              <GraduationCap
                size={36}
                className="mx-auto text-[var(--color-brand-300)]/80"
              />
              <p className="mt-6 font-display text-xl font-bold text-ink-50">
                İlk mezun sezonumuz henüz gelmedi.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-300">
                Stratos&apos;un aktif kadrosu hâlâ lise sıralarında. Bu bölüm,
                mezunlarımızın gittiği üniversiteleri ve seçtikleri mühendislik
                dallarını zamanla yayımlamak için ayrıldı — takımın uzun vadeli
                etkisinin somut kaydı.
              </p>
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.3em] text-ink-500">
                Yakında · 2027 itibarıyla
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alumni.map((a) => (
                <div
                  key={a.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                    {a.cohort}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink-50">
                    {a.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-200">
                    {a.university}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-brand-300)]">
                    {a.major}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-white/5 py-16">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Departmanlar
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-300">
            Stratos disiplinler arası iş birliği ile çalışan dört ana ekipten
            oluşmaktadır.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {site.team.departments.map((d) => (
              <div
                key={d.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-ink-50">
                  {d.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {d.blurb}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

function MemberCard({
  member,
  variant,
}: {
  member: (typeof site.team.members)[number];
  variant: "captain" | "member";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/[0.02] p-6 transition-all",
        variant === "captain"
          ? "border-[var(--color-brand-400)]/30 hover:border-[var(--color-brand-300)]/60"
          : "border-white/10 hover:border-white/20",
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-sm font-bold",
            variant === "captain"
              ? "bg-[var(--color-brand-600)] text-[var(--color-brand-100)]"
              : "bg-white/5 text-ink-200",
          )}
        >
          {initials(member.name)}
        </div>
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-ink-50 leading-tight">
            {member.name}
          </p>
          <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-ink-400">
            {member.department}
          </p>
        </div>
      </div>
      <p
        className={cn(
          "mt-4 text-xs",
          variant === "captain" ? "text-[var(--color-brand-200)]" : "text-ink-300",
        )}
      >
        {member.role}
      </p>
    </div>
  );
}
