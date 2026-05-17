import Link from "next/link";
import { ArrowRight, FileText, Cpu, Wrench, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { posts } from "@/data/blog";

export const metadata = {
  title: "Blog",
  description: "Build log'lar, teknik yazılar ve haberler.",
};

const upcomingTopics = [
  {
    icon: Cpu,
    title: "Raspberry Pi 5 üzerinde gerçek zamanlı görüntü işleme",
    blurb:
      "OpenCV ile hedef tespiti: Pi 5'in performans sınırları, jello etkisi ve optimizasyon notları.",
  },
  {
    icon: Wrench,
    title: "Karbon fiber CNC kesimde 0.1 mm tolerans nasıl yakalanır?",
    blurb: "Üretim sürecinin ardındaki teknik kararlar ve testler.",
  },
  {
    icon: Rocket,
    title: "Otonom iniş algoritması: SITL'den sahaya",
    blurb: "Hedef merkezi hesabı, PID ayarı, MAVLink komutları.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog & Haberler"
        title="Build log'lar ve teknik yazılar."
        description="Sezon boyunca öğrendiklerimizi paylaşıyoruz: donanım tercihleri, yazılım kararları, saha notları."
      />

      <Container size="default">
        <section className="py-16">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Yayında
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all hover:border-[var(--color-brand-400)]/50 hover:bg-white/[0.04]"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-400">
                  {post.category} ·{" "}
                  {new Date(post.date).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {post.readTimeMin} dk okuma
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-ink-50 group-hover:text-[var(--color-brand-300)]">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-[0.2em] text-[var(--color-brand-300)]">
                  Yazıyı oku <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            Yakında
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {upcomingTopics.map((t) => (
              <article
                key={t.title}
                className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6"
              >
                <t.icon size={24} className="text-[var(--color-brand-300)]" />
                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink-50">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {t.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-ink-400">
                  <FileText size={12} /> Hazırlanıyor
                </span>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
