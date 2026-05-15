import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { posts, type BlogBlock } from "@/data/blog";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="relative">
      <section className="relative isolate overflow-hidden border-b border-white/5 py-20 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-sky-night)] via-[var(--color-sky-deep)] to-transparent" />
        <Container size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-300 hover:text-white"
          >
            <ArrowLeft size={14} /> Tüm Yazılar
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[var(--color-brand-300)]">
            {post.category}
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-black leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-300">
            {post.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} /> {post.readTimeMin} dk okuma
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User size={12} /> {post.author}
            </span>
          </div>
        </Container>
      </section>

      <Container size="narrow">
        <div className="prose-stratos py-16">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mb-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
          <p className="text-sm text-ink-300">
            Bu yazıyla ilgili sorularını veya iş birliği önerini bize ilet.
          </p>
          <Link
            href="/iletisim"
            className="mt-3 inline-block text-sm font-display uppercase tracking-[0.2em] text-[var(--color-brand-300)] hover:text-white"
          >
            İletişime Geç →
          </Link>
        </div>
      </Container>
    </article>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-display text-2xl sm:text-3xl font-bold text-ink-50">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-5 text-base leading-relaxed text-ink-100">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mt-5 space-y-2 text-base text-ink-100">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-300)]" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-8 border-l-2 border-[var(--color-brand-400)] bg-white/[0.02] px-6 py-5 font-display text-lg italic text-ink-100">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-[var(--color-ink-950)] p-5 text-xs text-ink-100">
          <code>{block.code}</code>
        </pre>
      );
    case "metric":
      return (
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {block.items.map((m, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <dt className="text-[0.6rem] uppercase tracking-[0.25em] text-ink-400">
                {m.label}
              </dt>
              <dd className="mt-2 font-display text-lg font-bold text-ink-50">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}
