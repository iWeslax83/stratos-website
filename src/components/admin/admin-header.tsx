"use client";
import Link from "next/link";
import { useAdminLang } from "@/components/admin/lang-context";

const SECTIONS: { slug: string; label: string }[] = [
  { slug: "genel", label: "Genel" },
  { slug: "takim", label: "Takım" },
  { slug: "sponsorlar", label: "Sponsorlar" },
  { slug: "basarilar", label: "Başarılar" },
  { slug: "topluluk", label: "Topluluk" },
  { slug: "projeler", label: "Projeler" },
  { slug: "blog", label: "Blog" },
];

export function AdminHeader() {
  const { lang, setLang } = useAdminLang();

  return (
    <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
      <Link href="/admin" className="font-bold">Stratos Admin</Link>
      <nav className="flex flex-wrap items-center gap-3 text-sm">
        {SECTIONS.map((s) => (
          <Link key={s.slug} href={`/admin/${s.slug}`} className="text-neutral-400 hover:text-neutral-100">
            {s.label}
          </Link>
        ))}
        <div className="flex items-center rounded-md overflow-hidden border border-neutral-700 text-xs font-semibold">
          <button
            onClick={() => setLang("tr")}
            className={`px-3 py-1.5 transition-colors ${
              lang === "tr"
                ? "bg-sky-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-neutral-100"
            }`}
          >
            TR
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 transition-colors ${
              lang === "en"
                ? "bg-sky-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-neutral-100"
            }`}
          >
            EN
          </button>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="text-neutral-500 hover:text-red-400">Çıkış</button>
        </form>
      </nav>
    </header>
  );
}
