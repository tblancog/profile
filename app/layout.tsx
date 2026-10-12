import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { connection } from "next/server";
import { headers } from "next/headers";
import Script from "next/script";
import { Providers } from "./providers";
import { site } from "@/content/site";
import { certifications, education } from "@/content/education";
import { serializeJsonLd } from "@/lib/html-escape";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.metaTitle,
    template: `%s | ${site.name}`,
  },
  description: site.metaDescription,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.positioning,
    title: site.metaTitle,
    description: site.metaDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} – ${site.positioning}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription,
    images: ["/og-image.jpg"],
    creator: "@tblancog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const degrees = education.filter((entry) => entry.dates);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.positioning,
    description: site.metaDescription,
    url: site.url,
    worksFor: {
      "@type": "Organization",
      name: site.employer,
    },
    sameAs: [site.linkedin, site.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "Argentina",
    },
    knowsAbout: [...site.knowsAbout],
    knowsLanguage: ["Spanish", "English"],
    alumniOf: degrees.map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.school,
    })),
    hasCredential: certifications.map((item) => ({
      "@type": "EducationalOccupationalCredential",
      name: item.name,
      recognizedBy: {
        "@type": "Organization",
        name: item.issuer,
      },
    })),
  };

  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-inter antialiased bg-[var(--bg-primary)]">
        {turnstileSiteKey ? (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            nonce={nonce}
          />
        ) : null}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
