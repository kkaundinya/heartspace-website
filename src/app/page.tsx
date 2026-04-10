import type { Metadata } from "next";
import { HomePage } from "@/app/pages/HomePage";
import { sql } from "@/lib/db";
import { type WorkshopData } from "@/app/pages/WorkshopPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Heart Space — Guided Conversations for Better Relationships",
  description:
    "Heart Space creates guided conversations that help you relate better — to yourself, to others, and to life.",
  openGraph: {
    title: "Heart Space — Guided Conversations for Better Relationships",
    description:
      "Guided conversations that help you relate better. Join Workshop 1: Surfacing Difficult Conversations.",
    images: ["/shashi-velath.webp"],
  },
};

export default async function Home() {
  let workshop: WorkshopData | null = null;
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
    console.warn("DB not available, using fallback workshop data:", e);
  }

  return <HomePage workshop={workshop} />;
}
