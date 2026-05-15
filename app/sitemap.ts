import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { posts } from "@/data/blog";

const BASE = "https://stratosiha.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = site.nav.map((n) => ({
    url: `${BASE}${n.href === "/" ? "" : n.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: n.href === "/" ? 1 : 0.7,
  }));
  const projectRoutes = site.projects.map((p) => ({
    url: `${BASE}/projeler/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const blogRoutes = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  const en = {
    url: `${BASE}/en`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  };
  return [...staticRoutes, ...projectRoutes, ...blogRoutes, en];
}
