import Link from "next/link";

export const metadata = { title: "Admin · Stratos", robots: { index: false, follow: false } };

const SECTIONS: { slug: string; label: string }[] = [
  { slug: "genel", label: "Genel" },
  { slug: "takim", label: "Takım" },
  { slug: "sponsorlar", label: "Sponsorlar" },
  { slug: "basarilar", label: "Başarılar" },
  { slug: "topluluk", label: "Topluluk" },
  { slug: "projeler", label: "Projeler" },
  { slug: "blog", label: "Blog" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100">
      <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
        <Link href="/admin" className="font-bold">Stratos Admin</Link>
        <nav className="flex flex-wrap gap-3 text-sm">
          {SECTIONS.map((s) => (
            <Link key={s.slug} href={`/admin/${s.slug}`} className="text-neutral-400 hover:text-neutral-100">
              {s.label}
            </Link>
          ))}
          <form action="/api/admin/logout" method="post">
            <button className="text-neutral-500 hover:text-red-400">Çıkış</button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  );
}
