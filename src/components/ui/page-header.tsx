import { Container } from "@/components/ui/container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-transparent" />
        <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_60%)] opacity-20 blur-3xl" />
      </div>
      <Container size="wide">
        <div
          className={
            align === "center"
              ? "mx-auto max-w-3xl py-20 text-center sm:py-28"
              : "max-w-3xl py-20 sm:py-28"
          }
        >
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-ink-200">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
