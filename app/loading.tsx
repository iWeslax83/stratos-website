import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="relative isolate flex min-h-[60dvh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-transparent" />
      <div className="absolute inset-0 -z-10 starfield opacity-50" />
      <Container size="default">
        <div className="text-center">
          <p className="wordmark-stratos text-2xl tracking-[0.5em]">STRATOS</p>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-ink-400">
            Telemetri yükleniyor…
          </p>
          <div className="mx-auto mt-8 h-px w-48 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-1/3 animate-[fade-in_1.2s_ease-in-out_infinite_alternate] bg-gradient-to-r from-transparent via-[var(--color-brand-300)] to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
