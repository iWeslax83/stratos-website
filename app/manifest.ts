import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand.name} · ${site.brand.descriptor}`,
    short_name: site.brand.name,
    description: site.brand.longTagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0A0E1A",
    theme_color: "#0A0E1A",
    orientation: "portrait-primary",
    lang: "tr",
    icons: [
      {
        src: "/brand/logo-mark.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/logo-mark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/logo-mark.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["education", "productivity", "technology"],
  };
}
