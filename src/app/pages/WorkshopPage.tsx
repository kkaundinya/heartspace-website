"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RegistrationModal } from "@/components/RegistrationModal";
import {
  trackEvent,
  trackWorkshopView,
  trackMetaViewContent,
  trackMetaInitiateCheckout,
} from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WorkshopData {
  id: number;
  name: string;
  date_1: string;
  date_2: string;
  session_time: string;
  regular_price: number;
  discounted_price: number | null;
  is_active: boolean;
  zoom_link: string | null;
  seats_taken?: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_SEATS = 20;
const SEATS_DISPLAY_OFFSET = 8;
const CORAL = "#E85D3A";
const GREEN = "#1C3D2E";
const CHECKOUT_URL = "YOUR_CASHFREE_PAYMENT_LINK_HERE";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const VIDEOS = [
  {
    file: "/reel1.mp4",
    thumbnail: "/thumbnail2.jpeg",
    title: "What is Heart Space",
    runtime: "2 min",
    teaser: "Shashi explains what this community is really about",
  },
  {
    file: "/reel2.mp4",
    thumbnail: "/thumbnail3.jpeg",
    title: "Why was this created",
    runtime: "2 min",
    teaser: "The moment that made Shashi build this",
  },
  {
    file: "/reel3.mp4",
    thumbnail: "/thumbnail4.jpeg",
    title: "What relationships need",
    runtime: "2 min",
    teaser: "The one thing most relationships are missing",
  },
  {
    file: "/reel4.mp4",
    thumbnail: "/thumbnail1.jpeg",
    title: "How to build relationships",
    runtime: "2 min",
    teaser: "Practical tools you can use immediately",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I'd been avoiding a conversation with my sister for two years. After session one, I finally had it.",
    name: "Priya S.",
    role: "Product Manager, Bengaluru",
  },
  {
    quote:
      "I thought this would be soft and vague. It was the most practical thing I've attended. The RELATE method is something I use every week.",
    name: "Rahul K.",
    role: "Engineering Lead, Mumbai",
  },
  {
    quote:
      "The small group made all the difference. You're not a face in a crowd. You're actually heard.",
    name: "Ananya M.",
    role: "Therapist, Delhi",
  },
];

// ─── Root ─────────────────────────────────────────────────────────────────────

export function WorkshopPage({ workshop }: { workshop: WorkshopData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const priceInRupees = workshop.discounted_price ?? workshop.regular_price;
  const regularPriceInRupees = workshop.regular_price;
  const hasDiscount =
    workshop.discounted_price !== null &&
    workshop.discounted_price < workshop.regular_price;

  const seatsTaken = workshop.seats_taken ?? 0;
  const displayedTaken = Math.min(MAX_SEATS, seatsTaken + SEATS_DISPLAY_OFFSET);
  const seatsRemaining = Math.max(0, MAX_SEATS - displayedTaken);
  const occupancyPct = Math.min(100, Math.round((displayedTaken / MAX_SEATS) * 100));

  const openBooking = () => {
    trackEvent("begin_checkout", { currency: "INR", value: priceInRupees });
    trackMetaInitiateCheckout(priceInRupees);
    setIsModalOpen(true);
  };

  useEffect(() => {
    trackWorkshopView(workshop.name);
    trackMetaViewContent();
    const handler = () => openBooking();
    window.addEventListener("open-booking-modal", handler);
    if (window.location.hash === "#book") {
      openBooking();
      window.history.replaceState(null, "", window.location.pathname);
    }
    return () => window.removeEventListener("open-booking-modal", handler);
  }, []);

  const date1Short = formatShortDate(workshop.date_1);
  const date2Short = formatShortDate(workshop.date_2);
  const dateRange = `${date1Short} & ${date2Short}`;

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Sticky mobile CTA */}
      <div
        className="hidden max-[900px]:flex fixed bottom-0 left-0 right-0 z-40 items-center gap-3 px-5 py-4"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid var(--border)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex-1 min-w-0">
          <p
            className="text-[12px] font-semibold uppercase tracking-wide truncate"
            style={{ color: "var(--ink-soft)" }}
          >
            {dateRange}
          </p>
          <p className="text-[16px] font-bold" style={{ color: "var(--ink)" }}>
            {hasDiscount && (
              <span className="line-through opacity-40 font-normal mr-1">
                ₹{regularPriceInRupees}
              </span>
            )}
            ₹{priceInRupees} · All-in
          </p>
        </div>
        <button
          onClick={openBooking}
          className="shrink-0 px-6 rounded-full font-bold text-white"
          style={{
            background: CORAL,
            boxShadow: `0 4px 14px ${CORAL}55`,
            height: "44px",
            fontSize: "15px",
          }}
        >
          Register →
        </button>
      </div>

      <HeroSection
        workshop={workshop}
        priceInRupees={priceInRupees}
        regularPriceInRupees={regularPriceInRupees}
        hasDiscount={hasDiscount}
        seatsRemaining={seatsRemaining}
        onBookClick={openBooking}
      />
      <MeetShashiSection />
      <ShashiQuoteSection />
      <TestimonialsSection />
      <PricingSection
        workshop={workshop}
        priceInRupees={priceInRupees}
        regularPriceInRupees={regularPriceInRupees}
        hasDiscount={hasDiscount}
        dateRange={dateRange}
        displayedTaken={displayedTaken}
        seatsRemaining={seatsRemaining}
        occupancyPct={occupancyPct}
        onBookClick={openBooking}
      />
      <IsThisForYouSection />
      <FAQSection />
      <FinalBookingCTA
        priceInRupees={priceInRupees}
        regularPriceInRupees={regularPriceInRupees}
        hasDiscount={hasDiscount}
        dateRange={dateRange}
        onBookClick={openBooking}
      />
      {isModalOpen && (
        <RegistrationModal
          workshop={workshop}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({
  workshop,
  priceInRupees,
  regularPriceInRupees,
  hasDiscount,
  seatsRemaining,
  onBookClick,
}: {
  workshop: WorkshopData;
  priceInRupees: number;
  regularPriceInRupees: number;
  hasDiscount: boolean;
  seatsRemaining: number;
  onBookClick: () => void;
}) {
  const d1 = new Date(workshop.date_1);
  const d2 = new Date(workshop.date_2);
  const badgeMonth = d1
    .toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" })
    .toUpperCase();
  const badgeDateStr = `${badgeMonth} ${d1.getUTCDate()} & ${d2.getUTCDate()}`;

  return (
    <section className="py-[60px] max-[900px]:py-[60px] px-16 max-[900px]:px-5">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-[1.15fr_1fr] max-[900px]:grid-cols-1 gap-16 max-[900px]:gap-8 items-center">

          {/* RIGHT — Shashi photo. Mobile: order-1 (first) */}
          <div className="max-[900px]:order-1 max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center">
            <div
              className="w-full max-[900px]:max-w-[320px] overflow-hidden"
              style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#E8E4DE" }}
            >
              <img
                src="/shashi-velath.webp"
                alt="Shashi Velath"
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="text-center mt-3 text-sm font-semibold max-[900px]:text-[15px]"
              style={{ color: GREEN }}
            >
              Shashi Velath · Conflict Facilitator
            </p>

          </div>

          {/* LEFT — text. Mobile: order-2 (second) */}
          <div className="max-[900px]:order-2">
            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7"
              style={{ background: "#FDE8E3", color: CORAL }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: CORAL, boxShadow: `0 0 0 3px ${CORAL}33` }}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                Live Online Workshop · {badgeDateStr}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4vw, 60px)" }}>
              Stop Avoiding the
              <em style={{ color: CORAL, fontStyle: "italic" }}> Conversations</em>{" "}
              That Matter Most.
            </h1>

            <p
              className="mt-5 mb-8 max-w-[500px] leading-relaxed"
              style={{ color: "var(--ink-soft)", fontSize: "clamp(16px, 1.8vw, 18px)" }}
            >
              A 2-session live workshop for people who want to stop freezing,
              fading, or blowing up — and finally say what needs to be said.
              With skill. With care. Without regret.
            </p>

            {/* Stats row */}
            <div
              className="flex items-center gap-8 max-[500px]:gap-5 pt-7 mb-8 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              {[
                { value: "340+", label: "People helped" },
                { value: "4.9★", label: "Average rating" },
                { value: "2 Hrs", label: "Per session" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black" style={{ color: "var(--ink)" }}>
                    {value}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-wider font-bold mt-0.5"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onBookClick}
              className="max-[900px]:w-full inline-flex items-center justify-center gap-2 px-8 rounded-full font-bold text-white transition-opacity hover:opacity-90 mb-4"
              style={{
                background: CORAL,
                boxShadow: `0 6px 24px ${CORAL}44`,
                height: "56px",
                fontSize: "17px",
              }}
            >
              Reserve My Spot →
            </button>

            {/* Fine print */}
            <div className="flex flex-wrap items-center gap-3">
              {seatsRemaining > 0 && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{ background: "#E3F0E8", color: GREEN }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: GREEN }}
                  />
                  {seatsRemaining} seats left
                </span>
              )}
              <p style={{ color: "var(--ink-faint)", fontSize: "13px" }}>
                🔒 Secure payment · Instant confirmation
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Video card ───────────────────────────────────────────────────────────────

function VideoCard({
  file,
  thumbnail,
  title,
  runtime,
  teaser,
}: {
  file: string;
  thumbnail: string;
  title: string;
  runtime: string;
  teaser: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) {
      vid.pause();
      setIsPlaying(false);
    } else {
      vid.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer select-none"
      style={{
        aspectRatio: "9/16",
        borderRadius: "20px",
        background: `linear-gradient(180deg, ${GREEN} 0%, #2D5C45 100%)`,
      }}
      onClick={togglePlay}
    >
      {/* ── Background Thumbnail ── */}
      <img
        src={thumbnail}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isPlaying ? 0 : 1 }}
      />

      {/* ── Bottom half overlay ── */}
      <div
        className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-start pt-7 pb-6 px-4 transition-opacity duration-300"
        style={{
          height: "58%",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 40%)",
          opacity: isPlaying ? 0 : 1,
          pointerEvents: isPlaying ? "none" : "auto",
        }}
      >
        {/* 72px play button with ring */}
        <div className="relative mb-4 flex-shrink-0">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid rgba(255,255,255,0.35)",
              margin: "-6px",
              borderRadius: "50%",
            }}
          />
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M7 4.5L18 11L7 17.5V4.5Z" fill={CORAL} />
            </svg>
          </div>
        </div>

        {/* Title */}
        <p
          className="text-center leading-snug mb-1"
          style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 600 }}
        >
          {title}
        </p>
        {/* Duration */}
        <p
          className="mb-1.5"
          style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", fontWeight: 300 }}
        >
          {runtime}
        </p>
        {/* Teaser */}
        <p
          className="text-center"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "12px",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.45,
          }}
        >
          {teaser}
        </p>
      </div>

      {/* ── Real video (plays inline) ── */}
      <video
        ref={videoRef}
        src={file}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        playsInline
        webkit-playsinline="true" // eslint-disable-line
        onEnded={() => setIsPlaying(false)}
        style={{
          opacity: isPlaying ? 1 : 0,
          zIndex: isPlaying ? 10 : -1,
        }}
      />
    </div>
  );
}

// ─── Meet Shashi ──────────────────────────────────────────────────────────────

function MeetShashiSection() {
  return (
    <section
      className="py-[60px] max-[900px]:py-[60px] px-16 max-[900px]:px-5"
      style={{ background: "#FFFDF9" }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p
              className="text-[11px] font-semibold uppercase tracking-[2px] mb-4"
              style={{ color: CORAL }}
            >
              Meet Shashi
            </p>
            <h2
              className="mb-5"
              style={{ fontSize: "clamp(28px, 4.5vw, 44px)", color: GREEN }}
            >
              Hi, I'm Shashi.
            </h2>
            <p
              className="mx-auto leading-relaxed"
              style={{
                maxWidth: "520px",
                fontSize: "17px",
                color: "#6B6B6B",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              I built Heart Space because I kept meeting people stuck in the same
              patterns — not because they lacked courage, but because no one had ever
              shown them how. This workshop is what I wish had existed for me.
            </p>
          </div>
        </ScrollReveal>

        {/* 2×2 video grid — 2 cols always, single col stack on mobile (max-w 320 centered) */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 gap-4 max-[500px]:grid-cols-1 max-[500px]:max-w-[320px] max-[500px]:mx-auto mb-12">
            {VIDEOS.map((v) => (
              <VideoCard
                key={v.file}
                file={v.file}
                thumbnail={v.thumbnail}
                title={v.title}
                runtime={v.runtime}
                teaser={v.teaser}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Credentials bar */}
        <ScrollReveal delay={160}>
          <div
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 pt-8 border-t"
            style={{ borderColor: "#E8E4DC" }}
          >
            {[
              "340+ people facilitated",
              "Trained in NVC",
              "Founder, Heart Space 5,000+",
            ].map((item, i) => (
              <span key={item} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span style={{ color: "#C0BCB6", fontSize: "14px" }}>·</span>
                )}
                <span style={{ fontSize: "14px", color: "#3D3D3D", fontWeight: 400 }}>
                  {item}
                </span>
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Shashi Quote ─────────────────────────────────────────────────────────────

function ShashiQuoteSection() {
  return (
    <section
      className="py-[60px] max-[900px]:py-[60px] px-16 max-[900px]:px-6"
      style={{ background: "#FAF8F3" }}
    >
      <div className="max-w-[860px] mx-auto">
        <div className="grid grid-cols-[auto_1fr] max-[700px]:grid-cols-1 gap-14 max-[700px]:gap-8 items-center">

          {/* Photo placeholder */}
          <div className="max-[700px]:flex max-[700px]:justify-center">
            <div
              className="overflow-hidden flex-shrink-0"
              style={{
                width: "clamp(220px, 25vw, 320px)",
                aspectRatio: "4/5",
                borderRadius: "20px",
                background: "#C8C4BC",
                border: `2px solid ${CORAL}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/shashi2.jpeg"
                alt="Shashi Velath"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span
                className="absolute"
                style={{ color: "#6B6B6B", fontSize: "13px", display: "none" }}
              >
                Shashi photo
              </span>
            </div>
          </div>

          {/* Quote */}
          <div className="max-[700px]:text-center">
            <blockquote
              className="mb-5 leading-snug"
              style={{
                fontSize: "clamp(20px, 2.5vw, 26px)",
                color: GREEN,
                fontStyle: "italic",
                lineHeight: 1.45,
              }}
            >
              "Most people think they're bad at difficult conversations. They're not.
              They just never learned how."
            </blockquote>
            <p style={{ color: "#6B6B6B", fontSize: "14px", fontWeight: 400 }}>
              — Shashi Velath
            </p>
            <a
              href="/about"
              className="inline-block mt-4 font-semibold transition-opacity hover:opacity-70"
              style={{ color: CORAL, fontSize: "14px" }}
            >
              Read more about Shashi →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section
      className="py-[60px] max-[900px]:py-[60px] px-16 max-[900px]:px-5"
    >
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p
              className="text-[11px] font-semibold uppercase tracking-[2px] mb-4"
              style={{ color: CORAL }}
            >
              What people say
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", color: GREEN }}>
              From people who've been in the room.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className="flex flex-col h-full"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8E4DE",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <span key={si} style={{ color: "#D4963A", fontSize: "14px" }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  className="flex-1 mb-6 leading-relaxed"
                  style={{ color: GREEN, fontSize: "16px", fontStyle: "italic", lineHeight: 1.6 }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p style={{ color: "var(--ink)", fontSize: "14px", fontWeight: 600 }}>
                    {t.name}
                  </p>
                  <p style={{ color: "#6B6B6B", fontSize: "13px", fontWeight: 400 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PricingSection({
  workshop,
  priceInRupees,
  regularPriceInRupees,
  hasDiscount,
  dateRange,
  displayedTaken,
  seatsRemaining,
  occupancyPct,
  onBookClick,
}: {
  workshop: WorkshopData;
  priceInRupees: number;
  regularPriceInRupees: number;
  hasDiscount: boolean;
  dateRange: string;
  displayedTaken: number;
  seatsRemaining: number;
  occupancyPct: number;
  onBookClick: () => void;
}) {
  return (
    <section
      className="py-[60px] max-[900px]:py-[60px] px-16 max-[900px]:px-5"
      style={{ background: GREEN }}
    >
      <div className="max-w-[540px] mx-auto">
        <ScrollReveal>
          <p
            className="text-center text-[11px] font-bold uppercase tracking-[2px] mb-7"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            ✦ Workshop · All-in price
          </p>

          <div
            className="bg-white overflow-hidden"
            style={{ borderRadius: "28px", boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}
          >
            <div className="px-9 pt-9 pb-8 max-[500px]:px-6 max-[500px]:pt-7">

              {/* Price */}
              <div className="mb-1">
                {hasDiscount && (
                  <p className="text-lg line-through mb-1" style={{ color: "#BBBBBB" }}>
                    ₹{regularPriceInRupees}
                  </p>
                )}
                <div className="flex items-start gap-1 leading-none">
                  <span
                    className="font-black mt-2"
                    style={{ fontSize: "clamp(22px, 4vw, 28px)", color: GREEN }}
                  >
                    ₹
                  </span>
                  <span
                    className="font-black"
                    style={{
                      fontSize: "clamp(68px, 14vw, 96px)",
                      color: GREEN,
                      lineHeight: 1,
                    }}
                  >
                    {priceInRupees}
                  </span>
                </div>
              </div>
              <p className="text-sm mb-7" style={{ color: "#999999" }}>
                One payment. Everything included.
              </p>

              {/* Included items */}
              <div className="space-y-3 mb-7">
                {[
                  "RELATE Workbook — sent before session 1",
                  `2 live sessions with Shashi · ${dateRange}`,
                  "RELATE Manual — sent after sessions",
                  "Full session recording · Lifetime access",
                  `Small group · Max ${MAX_SEATS} people · Live on Zoom`,
                ].map((item, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <span className="flex-shrink-0 mt-0.5 font-bold text-sm" style={{ color: GREEN }}>
                      ✓
                    </span>
                    <span className="text-sm" style={{ color: "var(--ink)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p
                className="text-xs pb-7 mb-7 border-b"
                style={{ color: "#BBBBBB", borderColor: "#F0F0F0" }}
              >
                {workshop.session_time} IST both days
              </p>

              {/* Seats bar */}
              <div className="mb-4">
                <div
                  className="flex items-center justify-between mb-2"
                  style={{ fontSize: "13px" }}
                >
                  <span style={{ color: "#666666" }}>Seats filled</span>
                  <span style={{ color: CORAL, fontWeight: 700 }}>
                    {displayedTaken} / {MAX_SEATS} taken
                  </span>
                </div>
                <div
                  className="w-full h-[6px] rounded-full overflow-hidden"
                  style={{ background: "#E8E4DE" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${occupancyPct}%`, background: CORAL }}
                  />
                </div>
              </div>

              {/* Urgency */}
              {seatsRemaining > 0 && (
                <p
                  className="text-center mb-5"
                  style={{ color: CORAL, fontSize: "13px", fontWeight: 600 }}
                >
                  ⚡ Only {seatsRemaining} spots remaining at this price
                </p>
              )}

              {/* CTA */}
              <button
                onClick={onBookClick}
                className="w-full rounded-xl font-bold text-white mb-5 transition-opacity hover:opacity-90"
                style={{
                  background: CORAL,
                  boxShadow: `0 6px 24px ${CORAL}44`,
                  height: "56px",
                  fontSize: "17px",
                }}
              >
                Book My Spot · ₹{priceInRupees} →
              </button>

              {/* Trust signals */}
              <div className="space-y-2">
                {["Instant confirmation", "Full refund if you can't attend"].map((text) => (
                  <p
                    key={text}
                    className="text-xs flex items-center gap-1.5"
                    style={{ color: "#999999" }}
                  >
                    <span style={{ color: GREEN }}>✓</span>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Is This For You ──────────────────────────────────────────────────────────

function IsThisForYouSection() {
  return (
    <section className="py-[60px] max-[900px]:py-[60px] px-16 max-[900px]:px-5">
      <div className="max-w-[880px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p
              className="text-[11px] font-bold uppercase tracking-[2px] mb-4"
              style={{ color: CORAL }}
            >
              Is this for you?
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
              This workshop is for some people. Not everyone.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-6">
          <ScrollReveal>
            <div
              className="rounded-2xl p-8 border-t-[3px] h-full"
              style={{ background: "#FFFFFF", borderTopColor: GREEN, boxShadow: "var(--shadow)" }}
            >
              <h4 className="font-bold text-base mb-5">✓ This is for you if…</h4>
              <div className="space-y-3">
                {[
                  "You have a specific difficult conversation on your mind",
                  "You're tired of advice that tells you what to say",
                  "You want to understand your part in the pattern",
                  "You're willing to sit with discomfort",
                  "You're functioning well but want to go deeper",
                  "You value small groups over mass events",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2.5" style={{ fontSize: "15px" }}>
                    <span style={{ color: GREEN }}>✓</span>
                    <span style={{ color: "var(--ink)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div
              className="rounded-2xl p-8 border-t-[3px] h-full"
              style={{ background: "#FFFFFF", borderTopColor: "#FFD4B8", boxShadow: "var(--shadow)" }}
            >
              <h4 className="font-bold text-base mb-5">○ This might not be for you if…</h4>
              <div className="space-y-3">
                {[
                  "You're in crisis or need clinical support",
                  "You want step-by-step scripts and formulas",
                  "You're looking for someone to blame or fix",
                  "You prefer solo reflection over group spaces",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2.5" style={{ fontSize: "15px" }}>
                    <span style={{ color: "var(--ink-soft)" }}>○</span>
                    <span style={{ color: "var(--ink)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is this therapy?",
      answer:
        "No. Heart Space is not therapy, counselling, or clinical mental health support. It's guided conversation for people who are functioning well and want to deepen their relationships. If you're in crisis or need clinical support, please seek that through a qualified professional.",
    },
    {
      question: "Do I have to share personal things in the group?",
      answer:
        "You share what feels right. Shashi creates a space where sharing happens naturally, but there's never pressure. Many people find that hearing others name something helps them name it too — but your participation is always your choice.",
    },
    {
      question: "What if I miss one of the sessions?",
      answer:
        "Both sessions are recorded and sent to you. That said, the live experience is where the real work happens — the exercises, the group energy, the real-time guidance. We strongly recommend attending live if possible.",
    },
    {
      question: "How is this different from a webinar or online course?",
      answer:
        "This isn't content delivery. It's live, guided conversation. You're not watching someone teach — you're participating in a shared experience with a small group. Shashi responds to what's actually happening in the room, not a script.",
    },
    {
      question: "What's the refund policy?",
      answer:
        "Full refund available up to 48 hours before the first session. After that, no refunds — but you'll still receive the workbook, manual, and full recordings even if you can't attend live.",
    },
    {
      question: "Will there be more workshops after this one?",
      answer:
        "Maybe. This is the first. If it lands well, there will be others. But each workshop stands alone — you don't need to wait for the next one to start.",
    },
  ];

  return (
    <section className="py-[60px] max-[900px]:py-[60px] px-16 max-[900px]:px-5">
      <div className="max-w-[700px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p
              className="text-[11px] font-bold uppercase tracking-[2px] mb-4"
              style={{ color: CORAL }}
            >
              Questions
            </p>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)" }}>
              What people usually ask.
            </h2>
          </div>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="border-b py-5" style={{ borderColor: "var(--border)" }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{ minHeight: "44px" }}
                >
                  <span className="font-bold pr-4" style={{ fontSize: "15px" }}>
                    {faq.question}
                  </span>
                  <span
                    className={`text-2xl transition-transform flex-shrink-0 ${openIndex === i ? "rotate-45" : ""
                      }`}
                    style={{ color: CORAL }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openIndex === i ? "300px" : "0" }}
                >
                  <p
                    className="pt-4 leading-relaxed"
                    style={{ color: "var(--ink-soft)", fontSize: "15px" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalBookingCTA({
  priceInRupees,
  regularPriceInRupees,
  hasDiscount,
  dateRange,
  onBookClick,
}: {
  priceInRupees: number;
  regularPriceInRupees: number;
  hasDiscount: boolean;
  dateRange: string;
  onBookClick: () => void;
}) {
  return (
    <section className="py-[60px] max-[900px]:py-[60px] px-16 max-[900px]:px-5">
      <div className="max-w-[980px] mx-auto">
        <div className="grid grid-cols-[auto_1fr] max-[700px]:grid-cols-1 gap-14 max-[700px]:gap-8 items-center">

          {/* Shashi photo — desktop left / mobile top */}
          <div className="max-[700px]:flex max-[700px]:justify-center">
            <div
              className="overflow-hidden flex-shrink-0"
              style={{
                width: "clamp(200px, 22vw, 280px)",
                aspectRatio: "4/5",
                borderRadius: "20px",
                background: "#C8C4BC",
                border: `2px solid ${CORAL}`,
              }}
            >
              <img
                src="/shashi-velath.webp"
                alt="Shashi Velath"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text + CTA */}
          <div className="max-[700px]:text-center">
            <ScrollReveal>
              <span
                className="inline-block text-[11px] font-bold uppercase tracking-[2px] px-4 py-2 rounded-full mb-7"
                style={{ background: "#FDE8E3", color: CORAL }}
              >
                {dateRange} ·{" "}
                {hasDiscount && (
                  <span className="line-through opacity-70 mr-1">₹{regularPriceInRupees}</span>
                )}
                ₹{priceInRupees}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h2 className="mb-5" style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}>
                The conversation that{" "}
                <em style={{ color: CORAL }}>needs to happen.</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p
                className="mb-8 max-[700px]:mx-auto"
                style={{
                  color: "var(--ink-soft)",
                  fontSize: "clamp(16px, 1.8vw, 18px)",
                  maxWidth: "480px",
                  lineHeight: 1.6,
                }}
              >
                Two mornings. A small group. A guided space where the difficult
                conversation finally gets to happen.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <button
                onClick={onBookClick}
                className="max-[700px]:w-full max-[700px]:max-w-[320px] inline-flex items-center justify-center gap-2 px-10 rounded-full font-bold text-white transition-opacity hover:opacity-90 mb-4"
                style={{
                  background: CORAL,
                  boxShadow: `0 6px 28px ${CORAL}44`,
                  height: "56px",
                  fontSize: "17px",
                }}
              >
                Book My Spot ·{" "}
                {hasDiscount && (
                  <span className="line-through opacity-50 mr-1">₹{regularPriceInRupees}</span>
                )}
                ₹{priceInRupees}
              </button>
              <p
                className="mt-3 block"
                style={{ color: "var(--ink-faint)", fontSize: "13px" }}
              >
                25 & 26 April · Registration closes soon
              </p>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
