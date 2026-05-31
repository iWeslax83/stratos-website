export interface Brand {
  name: string; descriptor: string; descriptorShort: string;
  school: string; city: string; tagline: string; longTagline: string;
}
export interface Contact {
  email: string; phone: string; phoneHref: string; address: string;
}
export interface Season {
  label: string; competition: string; competitionDate: string;
  sponsorshipDeadline: string; currentPhase: string; nextMilestone: string;
}
export interface Social {
  instagram: string | null; linkedin: string | null; youtube: string | null;
}
export interface NavItem { href: string; label: string; }

export interface Achievement {
  id: string; title: string; year: string; category: string; blurb: string;
}
export interface Spec { value: string; unit: string; label: string; }
export interface Project {
  slug: string; title: string; competition: string; year: string;
  summary: string; highlights: string[]; tech: string[];
  image: string | null; specs: Spec[];
}
export interface Member {
  name: string; role: string; department: string; captain: boolean;
  photo?: string | null;
}
export interface Advisor { name: string; role: string; photo: string | null; }
export interface Department { id: string; name: string; blurb: string; }
export interface Team {
  advisor: Advisor; members: Member[]; departments: Department[];
}
export interface Tier {
  id: string; name: string; amount: string; benefits: string[];
}
export interface Sponsor {
  name: string; logo: string; url: string | null; tier: string;
}
export interface Sponsorship {
  intro: string; tiers: Tier[]; sponsors: Sponsor[];
}
export interface OutreachItem {
  slug: string; title: string; period: string; blurb: string;
  stat?: string; statLabel?: string; image?: string | null;
}
export interface Media { revealBand: string | null; }

/** Editable content (everything in site.json — i.e. site minus nav). */
export interface SiteContent {
  brand: Brand; contact: Contact; season: Season; social: Social;
  achievements: Achievement[]; projects: Project[]; team: Team;
  sponsorship: Sponsorship; outreach: OutreachItem[]; media: Media;
}
/** Full runtime site object (content + code-owned nav). */
export interface Site extends SiteContent { nav: NavItem[]; }

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang?: string; code: string }
  | { type: "quote"; text: string }
  | { type: "metric"; items: { label: string; value: string }[] };
export interface BlogPost {
  slug: string; title: string; excerpt: string; date: string;
  readTimeMin: number;
  category: "Build Log" | "Donanım" | "Yazılım" | "Saha" | "Takım";
  author: string; content: BlogBlock[];
}
