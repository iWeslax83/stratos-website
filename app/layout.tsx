import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/data/site";

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
  metadataBase: new URL("https://bursafeniha.com"),
  openGraph: {
    title: `${site.brand.name} · ${site.brand.descriptor}`,
    description: site.brand.longTagline,
    type: "website",
    locale: "tr_TR",
    siteName: site.brand.name,
  },
  icons: {
    icon: "/brand/logo-mark.png",
    apple: "/brand/logo-mark.png",
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
    url: "https://bursafeniha.com",
    logo: "https://bursafeniha.com/brand/logo-mark.png",
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
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Saira+Condensed:wght@500;600;700;800;900&family=Saira+Stencil+One&display=swap"
        />
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
      </body>
    </html>
  );
}
