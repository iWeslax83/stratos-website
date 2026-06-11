import { z } from "zod";

const nullableStr = z.string().nullable();

export const brand = z.object({
  name: z.string(), descriptor: z.string(), descriptorShort: z.string(),
  school: z.string(), city: z.string(), tagline: z.string(), longTagline: z.string(),
});
export const contact = z.object({
  email: z.string(), phone: z.string(), phoneHref: z.string(), address: z.string(),
});
export const season = z.object({
  label: z.string(), competition: z.string(), competitionDate: z.string(),
  sponsorshipDeadline: z.string(), currentPhase: z.string(), nextMilestone: z.string(),
});
export const social = z.object({
  instagram: nullableStr, linkedin: nullableStr, youtube: nullableStr,
});
export const achievements = z.array(z.object({
  id: z.string(), title: z.string(), year: z.string(), category: z.string(), blurb: z.string(),
}));
export const projects = z.array(z.object({
  slug: z.string(), title: z.string(), competition: z.string(), year: z.string(),
  summary: z.string(), highlights: z.array(z.string()), tech: z.array(z.string()),
  image: nullableStr,
  specs: z.array(z.object({ value: z.string(), unit: z.string(), label: z.string() })),
}));
export const team = z.object({
  advisor: z.object({ name: z.string(), role: z.string(), photo: nullableStr }),
  members: z.array(z.object({
    name: z.string(), role: z.string(), department: z.string(),
    captain: z.boolean(), photo: nullableStr.optional(),
  })),
  departments: z.array(z.object({ id: z.string(), name: z.string(), blurb: z.string() })),
});
export const sponsorship = z.object({
  intro: z.string(),
  showPrices: z.boolean().optional(),
  tiers: z.array(z.object({
    id: z.string(), name: z.string(), amount: z.string(), benefits: z.array(z.string()),
  })),
  sponsors: z.array(z.object({
    name: z.string(), logo: z.string(), url: nullableStr, tier: z.string(),
  })),
});
export const outreach = z.array(z.object({
  slug: z.string(), title: z.string(), period: z.string(), blurb: z.string(),
  stat: z.string().optional(), statLabel: z.string().optional(), image: nullableStr.optional(),
}));
export const media = z.object({ revealBand: nullableStr });

const blogBlock = z.union([
  z.object({ type: z.literal("p"), text: z.string() }),
  z.object({ type: z.literal("h2"), text: z.string() }),
  z.object({ type: z.literal("list"), items: z.array(z.string()) }),
  z.object({ type: z.literal("code"), lang: z.string().optional(), code: z.string() }),
  z.object({ type: z.literal("quote"), text: z.string() }),
  z.object({ type: z.literal("metric"), items: z.array(z.object({ label: z.string(), value: z.string() })) }),
]);
export const blog = z.object({ posts: z.array(z.object({
  slug: z.string(), title: z.string(), excerpt: z.string(), date: z.string(),
  readTimeMin: z.number(),
  category: z.enum(["Build Log", "Donanım", "Yazılım", "Saha", "Takım"]),
  author: z.string(), content: z.array(blogBlock),
})) });

export const sectionSchemas = {
  brand, contact, season, social, achievements, projects, team, sponsorship, outreach, media,
} as const;

export type Section = keyof typeof sectionSchemas;
export const SECTIONS = Object.keys(sectionSchemas) as Section[];
