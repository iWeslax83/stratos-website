import Link from "next/link";

const CARDS = [
  { slug: "genel", label: "Genel", desc: "Marka, iletişim, sezon, sosyal, medya" },
  { slug: "takim", label: "Takım", desc: "Üyeler, departmanlar, danışman" },
  { slug: "sponsorlar", label: "Sponsorlar", desc: "Sponsorlar ve tier'lar" },
  { slug: "basarilar", label: "Başarılar", desc: "Ödüller ve dereceler" },
  { slug: "topluluk", label: "Topluluk", desc: "Etkinlikler" },
  { slug: "projeler", label: "Projeler", desc: "İHA'lar, specs, görseller" },
  { slug: "blog", label: "Blog", desc: "Yazılar" },
];

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CARDS.map((c) => (
        <Link key={c.slug} href={`/admin/${c.slug}`}
          className="rounded-xl border border-neutral-800 p-5 hover:border-sky-600">
          <p className="font-semibold">{c.label}</p>
          <p className="mt-1 text-sm text-neutral-400">{c.desc}</p>
        </Link>
      ))}
    </div>
  );
}
