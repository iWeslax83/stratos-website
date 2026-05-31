import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Hanken_Grotesk,
  Space_Mono,
  Saira_Stencil_One,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkyBackdrop } from "@/components/brand/sky-backdrop";
import { LogoLightbox } from "@/components/brand/logo-lightbox";
import { site } from "@/data/site";

const body = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body",
});
const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-numeric",
});
const sairaStencil = Saira_Stencil_One({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
  variable: "--font-wordmark",
});

export const metadata: Metadata = {
  title: {
    default: `${site.brand.name} · ${site.brand.descriptor}`,
    template: `%s · ${site.brand.name}`,
  },
  description: site.brand.longTagline,
  applicationName: site.brand.name,
  authors: [{ name: site.brand.name }],
  keywords: [
    "Stratos",
    "İHA",
    "UAV",
    "TEKNOFEST",
    "Bursa Fen Lisesi",
    "Tofaş Fen Lisesi",
    "Drone",
    "Otonom",
    "Lise Takımı",
  ],
  metadataBase: new URL("https://stratosiha.vercel.app"),
  openGraph: {
    title: `${site.brand.name} · ${site.brand.descriptor}`,
    description: site.brand.longTagline,
    type: "website",
    locale: "tr_TR",
    siteName: site.brand.name,
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: site.brand.name,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand.name,
    alternateName: site.brand.descriptor,
    url: "https://stratosiha.vercel.app",
    logo: "https://stratosiha.vercel.app/brand/logo-mark.png",
    description: site.brand.longTagline,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.brand.school,
      addressLocality: site.brand.city,
      addressCountry: "TR",
    },
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: site.brand.school,
      addressLocality: site.brand.city,
      addressCountry: "TR",
    },
  };

  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${mono.variable} ${sairaStencil.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body" suppressHydrationWarning>
        <SkyBackdrop />
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <LogoLightbox />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
