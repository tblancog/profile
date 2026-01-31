import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
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
  metadataBase: new URL('https://tonyblanco.dev'), // Update with your actual domain
  title: {
    default: "Tony Blanco - Full Stack Engineer | React, Node.js & AI Development",
    template: "%s | Tony Blanco - Full Stack Engineer",
  },
  description:
    "Experienced Full Stack Engineer with 10+ years building scalable web applications. Specialized in React, Node.js, TypeScript, AWS, and AI integration. Based in Buenos Aires, Argentina with US-friendly hours.",
  keywords: [
    "Full Stack Engineer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "Next.js",
    "AWS",
    "AI Development",
    "AWS Bedrock",
    "Remote Developer",
    "Argentina Developer",
    "Full Stack Developer",
    "Web Development",
    "Enterprise Applications",
    "Mapbox GL",
    "PostgreSQL",
    "GraphQL",
    "React Native",
    "Freelance Developer",
  ],
  authors: [{ name: "Tony Blanco", url: "https://tonyblanco.dev" }],
  creator: "Tony Blanco",
  publisher: "Tony Blanco",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tonyblanco.dev",
    siteName: "Tony Blanco - Full Stack Engineer",
    title: "Tony Blanco - Full Stack Engineer | React, Node.js & AI Development",
    description:
      "Experienced Full Stack Engineer with 10+ years building scalable web applications. Specialized in React, Node.js, TypeScript, AWS, and AI integration.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Tony Blanco - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tony Blanco - Full Stack Engineer | React, Node.js & AI Development",
    description:
      "Experienced Full Stack Engineer with 10+ years building scalable web applications. Specialized in React, Node.js, TypeScript, AWS, and AI integration.",
    images: ["/og-image.jpg"], // Same image as OpenGraph
    creator: "@tblancog", // Update with your actual Twitter handle if different
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
  verification: {
    // Add these when you verify with search engines
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tony Blanco",
    jobTitle: "Full Stack Engineer",
    description: "Experienced Full Stack Engineer with 10+ years building scalable web applications",
    url: "https://tonyblanco.dev",
    sameAs: [
      "https://linkedin.com/in/tblancog",
      "https://github.com/tblancog",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "Argentina",
    },
    knowsAbout: [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "AWS",
      "PostgreSQL",
      "GraphQL",
      "Full Stack Development",
      "AI Development",
      "AWS Bedrock",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universidad Bicentenaria de Aragua",
    },
  };

  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-inter antialiased bg-[var(--bg-primary)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
