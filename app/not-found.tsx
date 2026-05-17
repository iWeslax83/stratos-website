import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Bulunamadı",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-transparent" />
        <div className="absolute inset-0 starfield opacity-60" />
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,transparent_60%)] opacity-25 blur-3xl" />
      </div>
      <Container size="default">
        <div className="text-center">
          <p className="font-display text-[0.7rem] uppercase tracking-[0.4em] text-[var(--color-brand-300)]">
            Sinyal kaybı
          </p>
          <h1 className="mt-6 wordmark-stratos text-[6rem] sm:text-[10rem] leading-none">
            404
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base text-ink-200">
            Aradığınız sayfa stratosferin ötesinde, telemetri bu noktayı
            görmüyor. Anasayfaya dönelim.
          </p>
          <div className="mt-10 flex justify-center">
            <Button as="link" href="/" size="lg">
              <ArrowLeft size={16} /> Anasayfaya Dön
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
