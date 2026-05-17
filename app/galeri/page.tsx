import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata = {
  title: "Galeri",
  description: "Atölyeden sahaya, Stratos İHA Takımı çalışma kareleri.",
};

const gallery = [
  { src: "/images/gallery/01.png", alt: "Atölyede çalışma anı", category: "Atölye" },
  { src: "/images/gallery/02.png", alt: "İHA tasarım çalışması", category: "Tasarım" },
  { src: "/images/gallery/03.jpeg", alt: "Üretim süreci", category: "Üretim" },
  { src: "/images/gallery/04.jpeg", alt: "Saha hazırlığı", category: "Saha" },
  { src: "/images/gallery/05.png", alt: "CAD ortamında model", category: "Tasarım" },
  { src: "/images/gallery/06.png", alt: "Elektronik montaj", category: "Üretim" },
  { src: "/images/gallery/07.png", alt: "Yarışma hazırlığı", category: "Saha" },
  { src: "/images/gallery/08.jpeg", alt: "FPV uçuş hazırlığı", category: "Saha" },
  { src: "/images/gallery/09.png", alt: "Ekip çalışması", category: "Atölye" },
  { src: "/images/gallery/10.png", alt: "Prototip testi", category: "Test" },
  { src: "/images/gallery/11.png", alt: "Atölye genel görünüm", category: "Atölye" },
  { src: "/images/gallery/12.jpeg", alt: "Saha ekip portresi", category: "Saha" },
];

export default function GaleriPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galeri"
        title="Atölyeden sahaya."
        description="Tasarım ekranından üretim tezgâhına, uçuş alanından yarışma sahnesine: Stratos'un çalışma günleri."
      />
      <Container size="wide">
        <div className="py-16">
          <GalleryGrid items={gallery} />
          <p className="mt-12 text-center text-xs uppercase tracking-[0.3em] text-ink-500">
            Yüksek çözünürlüklü kareler · Sezon ilerledikçe güncellenir
          </p>
        </div>
      </Container>
    </>
  );
}
