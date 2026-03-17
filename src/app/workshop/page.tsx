import type { Metadata } from "next";
import { sql } from "@/lib/db";
import { WorkshopPage, type WorkshopData } from "@/app/pages/WorkshopPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Workshop 1: Surfacing Difficult Conversations",
  description:
    "Two live sessions with Shashi. A workbook before. A manual after. Join Workshop 1 for ₹499 — March 28 & 29, 2026.",
  openGraph: {
    title: "Workshop 1: Surfacing Difficult Conversations | Heart Space",
    description:
      "Two live Zoom sessions with Shashi Velath. March 28 & 29, 2026. ₹499 all-inclusive.",
    images: ["/shashi-velath.jpg"],
  },
};

export default async function Workshop() {
  let workshop = null;
  try {
    const rows = await sql`
      SELECT id, name, date_1, date_2, session_time, regular_price, discounted_price, is_active, zoom_link
      FROM workshops
      WHERE is_active = true
      ORDER BY created_at DESC
      LIMIT 1
    `;
    if (rows.length > 0) workshop = rows[0] as WorkshopData;
  } catch (e) {
    // DB not configured yet — use fallback
    console.warn("DB not available, using fallback workshop data:", e);
  }

  // Fallback for local dev without DB
  const workshopData = workshop ?? {
    id: 1,
    name: "Workshop 1: Surfacing Difficult Conversations",
    date_1: "2026-03-28",
    date_2: "2026-03-29",
    session_time: "11:00 AM – 12:30 PM IST",
    regular_price: 999,
    discounted_price: 499,
    is_active: true,
    zoom_link: null,
  };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://heart-spaces.com";
  const priceInRupees = workshopData.discounted_price ?? workshopData.regular_price;

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: workshopData.name,
    startDate: `${workshopData.date_1}T05:30:00Z`,
    endDate: `${workshopData.date_2}T07:00:00Z`,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description:
      "Two live Zoom sessions with Shashi Velath. A workbook before. A manual after. A small group space for difficult conversations.",
    organizer: {
      "@type": "Organization",
      name: "Heart Space",
      url: appUrl,
    },
    offers: {
      "@type": "Offer",
      price: priceInRupees,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${appUrl}/workshop`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <WorkshopPage workshop={workshopData} />
    </>
  );
}
