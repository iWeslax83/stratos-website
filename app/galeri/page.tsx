import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Galeri",
  description: "Atölyeden sahaya — Stratos İHA Takımı çalışma kareleri.",
};

const gallery = [
  { src: "/images/gallery/01.png", alt: "Atölyede çalışma anı" },
  { src: "/images/gallery/02.png", alt: "İHA tasarım çalışması" },
  { src: "/images/gallery/03.jpeg", alt: "Üretim süreci" },
  { src: "/images/gallery/04.jpeg", alt: "Saha hazırlığı" },
  { src: "/images/gallery/05.png", alt: "CAD ortamında model" },
  { src: "/images/gallery/06.png", alt: "Elektronik montaj" },
  { src: "/images/gallery/07.png", alt: "Yarışma hazırlığı" },
  { src: "/images/gallery/08.jpeg", alt: "FPV uçuş hazırlığı" },
  { src: "/images/gallery/09.png", alt: "Ekip çalışması" },
  { src: "/images/gallery/10.png", alt: "Prototip testi" },
  { src: "/images/gallery/11.png", alt: "Atölye genel görünüm" },
  { src: "/images/gallery/12.jpeg", alt: "Saha ekip portresi" },
];

export default function GaleriPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galeri"
        title="Atölyeden sahaya."
        description="Tasarım ekranından üretim tezgâhına, uçuş alanından yarışma sahnesine — Stratos'un çalışma günleri."
      />
      <Container size="wide">
        <div className="grid gap-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((img, i) => (
            <figure
              key={img.src}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
              style={{
                gridRow: i % 5 === 0 ? "span 2" : undefined,
              }}
            >
              <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-950)]/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
              </div>
              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-xs uppercase tracking-[0.2em] text-ink-100 opacity-0 transition-opacity group-hover:opacity-100">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="pb-16 text-center text-sm text-ink-400">
          Daha yüksek çözünürlüklü çalışma kareleri yakında eklenecek.
        </p>
      </Container>
    </>
  );
}
