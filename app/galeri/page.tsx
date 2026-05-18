import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata = {
  title: "Galeri",
  description: "Atölyeden sahaya, Stratos İHA Takımı çalışma kareleri.",
};

const gallery = [
  { src: "/images/gallery/uretim-kesim.jpg", alt: "Kıvılcımlar arasında parça kesimi", category: "Üretim" },
  { src: "/images/gallery/ekip-tasarim-eskiz.jpg", alt: "Tasarımı birlikte çiziyoruz", category: "Ekip" },
  { src: "/images/gallery/cad-modelleme.jpg", alt: "CAD ortamında gövde modelleme", category: "Tasarım" },
  { src: "/images/gallery/uretim-tezgah.jpg", alt: "Tezgahta montaj", category: "Üretim" },
  { src: "/images/gallery/fpv-drone.jpg", alt: "Eski Drone Modelimiz", category: "Tasarım" },
  { src: "/images/gallery/atolye-genel.jpg", alt: "Atölyemizden genel görünüm", category: "Atölye" },
  { src: "/images/gallery/astro-hackathon.jpg", alt: "ASTRO Hackathon'da Stratos", category: "Ekip" },
  { src: "/images/gallery/ekip-vex.jpg", alt: "VEX robotu üzerinde çalışırken", category: "Ekip" },
  { src: "/images/gallery/cad-model-ekran.png", alt: "Gövde CAD modeli", category: "Tasarım" },
  { src: "/images/gallery/uretim-elektronik.jpg", alt: "Elektronik ve yazılım masası", category: "Üretim" },
  { src: "/images/gallery/atolye-pencere.jpg", alt: "Pencere ışığında atölye", category: "Atölye" },
  { src: "/images/gallery/saha-okul-onu.jpg", alt: "Okul önünde saha hazırlığı", category: "Saha" },
  { src: "/images/gallery/fpv-drone-masa.jpg", alt: "FPV drone'lar ve uçuş ekipmanı", category: "Tasarım" },
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
