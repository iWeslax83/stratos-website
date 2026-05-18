"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/brand/logo-mark";
import { Wordmark } from "@/components/brand/wordmark";
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/brand/social-icons";
import { site } from "@/data/site";

// Mirrors the in-page anchors used by the English single-page site.
const enNav = [
  { href: "/en#about", label: "About" },
  { href: "/en#project", label: "Project" },
  { href: "/en#team", label: "Team" },
  { href: "/en#achievements", label: "Achievements" },
  { href: "/en#sponsor", label: "Sponsors" },
  { href: "/en#contact", label: "Contact" },
];

const t = {
  tr: {
    tagline: site.brand.longTagline,
    explore: "Keşfet",
    contact: "İletişim",
    socialSoon: "Sosyal medya yakında",
    rights: "Tüm hakları saklıdır.",
    motto: "Stratosferi hedefliyoruz.",
    comingSoon: "yakında",
  },
  en: {
    tagline:
      "Students design, build, program and fly our UAV, and we compete with it at national level.",
    explore: "Explore",
    contact: "Contact",
    socialSoon: "Social media coming soon",
    rights: "All rights reserved.",
    motto: "Aiming for the stratosphere.",
    comingSoon: "coming soon",
  },
};

export function Footer() {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const c = isEn ? t.en : t.tr;
  const links = isEn ? enNav : site.nav.slice(1);
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[color-mix(in_oklab,var(--color-ink-950)_55%,transparent)] backdrop-blur-sm">
      <Container size="wide">
        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <LogoMark size={48} />
              <Wordmark withDescriptor />
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-300">
              {c.tagline}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-ink-400">
              {site.brand.school} · {site.brand.city}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.25em] text-ink-400">
              {c.explore}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-200 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-ink-400">
              {c.contact}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-300)]" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-ink-100 hover:text-white"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-300)]" />
                <a
                  href={site.contact.phoneHref}
                  className="text-ink-100 hover:text-white"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-300)]" />
                <span className="text-ink-200">{site.contact.address}</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2">
              <SocialBadge icon={InstagramIcon} label="Instagram" soon={c.comingSoon} />
              <SocialBadge icon={LinkedinIcon} label="LinkedIn" soon={c.comingSoon} />
              <SocialBadge icon={YoutubeIcon} label="YouTube" soon={c.comingSoon} />
            </div>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-ink-500">
              {c.socialSoon}
            </p>
          </div>
        </div>
        <div className="edge-divider" />
        <div className="flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p>
            © {year} {site.brand.name}. {c.rights}
          </p>
          <p className="uppercase tracking-[0.2em]">
            {c.motto}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function SocialBadge({
  icon: Icon,
  label,
  soon,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  soon: string;
}) {
  return (
    <span
      aria-label={`${label} (${soon})`}
      title={`${label} (${soon})`}
      className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full border border-white/10 text-ink-400 opacity-60"
    >
      <Icon size={16} />
    </span>
  );
}
