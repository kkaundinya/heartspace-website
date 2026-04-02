import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: {
    default: "Heart Space — Guided Conversations for Better Relationships",
    template: "%s | Heart Space",
  },
  description:
    "Heart Space creates guided conversations that help you relate better — to yourself, to others, and to life.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://heart-spaces.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Heart Space",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Heart Space",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://heart-spaces.com",
  description:
    "Heart Space creates guided conversations that help you relate better — to yourself, to others, and to life.",
  founder: { "@type": "Person", name: "Shashi Velath" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <MetaPixel />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
