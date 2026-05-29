import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { site } from "@/data/site";

export const metadata = {
  title: "Projeler",
  description: "Stratos İHA Takımı'nın sezon projeleri ve yarışma araçları.",
};

export default function ProjelerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projeler"
        title="Tasarladık, ürettik, uçurduk."
        description="Her sezon yeni bir görev kümesi için sıfırdan tasarladığımız araçlar, yarışma yönetmelikleri ışığında ama kendi mühendislik tercihlerimizle."
      />
      <Container size="wide">
        <div className="grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {site.projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
