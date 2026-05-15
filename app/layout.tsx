import type { Metadata, Viewport } from "next";
import { Inter, Saira_Condensed, Saira_Stencil_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body",
});
const sairaCondensed = Saira_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-display",
});
const sairaStencil = Saira_Stencil_One({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
  variable: "--font-wordmark",
});

export const metadata: Metadata = {
  title: {
    default: `${site.brand.name} — ${site.brand.descriptor}`,
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
  metadataBase: new URL("https://stratosiha.com"),
  openGraph: {
    title: `${site.brand.name} · ${site.brand.descriptor}`,
    description: site.brand.longTagline,
    type: "website",
    locale: "tr_TR",
    siteName: site.brand.name,
  },
  icons: {
    icon: [
      { url: "/brand/logo-mark.png", type: "image/png" },
    ],
    apple: [
      { url: "/brand/logo-mark.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/brand/logo-mark.png",
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
    url: "https://stratosiha.com",
    logo: "https://stratosiha.com/brand/logo-mark.png",
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
      className={`${inter.variable} ${sairaCondensed.variable} ${sairaStencil.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body">
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
