import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EarlyBirdBanner } from "@/components/EarlyBirdBanner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { sql } from "@/lib/db";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch active workshop for the early-bird banner
  let workshopDate = "2026-04-25";
  let workshopPrice = 499;
  try {
    const rows = await sql`
      SELECT date_1, discounted_price, regular_price
      FROM workshops
      WHERE is_active = true
      ORDER BY created_at DESC
      LIMIT 1
    `;
    if (rows.length > 0) {
      const rawDate = rows[0].date_1;
      if (rawDate instanceof Date) {
        workshopDate = `${rawDate.getFullYear()}-${String(rawDate.getMonth() + 1).padStart(2, '0')}-${String(rawDate.getDate()).padStart(2, '0')}`;
      } else if (typeof rawDate === "string") {
        workshopDate = rawDate.split("T")[0];
      }
      workshopPrice = (rows[0].discounted_price ?? rows[0].regular_price) as number;
    }
  } catch {
    // DB not configured — use fallback values
  }

  // Target: workshop start day at 11 AM IST (05:30 UTC)
  const bannerTarget = `${workshopDate}T05:30:00Z`;

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
        <MicrosoftClarity />
        <div className="min-h-screen flex flex-col">
          <EarlyBirdBanner targetDate={bannerTarget} price={workshopPrice} />
          <Navigation />
          {/* pt = banner(64px) + nav(64px) = 128px */}
          <main className="flex-1 pt-[128px]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
