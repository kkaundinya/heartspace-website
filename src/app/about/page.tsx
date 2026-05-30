import type { Metadata } from "next";
import { AboutPage } from "@/app/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Shashi Velath",
  description:
    "Former war correspondent and investigative journalist who built Heart Space to help people relate better — to themselves and to others.",
  openGraph: {
    title: "About Shashi Velath | Heart Space",
    description:
      "The story behind Heart Space — from war zones to boardrooms to guided conversations.",
    images: [
      {
        url: "/heart-space-og-image.png",
        width: 1200,
        height: 630,
        alt: "Heart Space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/heart-space-og-image.png"],
  },
};

export default function About() {
  return <AboutPage />;
}
