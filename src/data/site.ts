// Single source of truth for site content. Editable content lives in
// src/content/site.json (managed by /admin). nav stays here (structural).
import content from "@/content/site.json";
import type {
  Site, SiteContent, Project, Member, Department, Achievement, Tier, Sponsor,
  OutreachItem,
} from "./types";

const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/projeler", label: "Projeler" },
  { href: "/takim", label: "Takım" },
  { href: "/basarilar", label: "Başarılar" },
  { href: "/galeri", label: "Galeri" },
  { href: "/topluluk", label: "Topluluk" },
  { href: "/blog", label: "Blog" },
  { href: "/sponsorlar", label: "Sponsorlar" },
  { href: "/iletisim", label: "İletişim" },
];

export const site: Site = { ...(content as SiteContent), nav };

export type {
  Site, SiteContent, Project, Member, Department, Achievement, Tier, Sponsor,
  OutreachItem, NavItem, Spec,
} from "./types";
