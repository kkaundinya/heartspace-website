"use client";

import { useState, useEffect } from "react";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { FloatingBlob } from "@/components/ui/floating-blob";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RegistrationModal } from "@/components/RegistrationModal";
import { trackEvent, trackWorkshopView, trackMetaViewContent, trackMetaInitiateCheckout } from "@/lib/analytics";

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
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function WorkshopPage({ workshop }: { workshop: WorkshopData }) {
  const [showModal, setShowModal] = useState(false);

  const priceInRupees = workshop.discounted_price ?? workshop.regular_price;
  const regularPriceInRupees = workshop.regular_price;
  const hasDiscount =
    workshop.discounted_price !== null &&
    workshop.discounted_price < workshop.regular_price;

  const openBooking = () => {
    trackEvent("begin_checkout", { currency: "INR", value: priceInRupees });
    trackMetaInitiateCheckout(priceInRupees);
    setShowModal(true);
  };

  useEffect(() => {
    trackWorkshopView(workshop.name);
    trackMetaViewContent();
    // Open modal when Navigation dispatches the event (user is already on this page)
    const handler = () => openBooking();
    window.addEventListener("open-booking-modal", handler);

    // Open modal if navigated here with #book hash (from other pages)
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
    <div className="max-[900px]:pb-20">
      {showModal && (
        <RegistrationModal
          workshop={{
            id: workshop.id,
            name: workshop.name,
            regular_price: workshop.regular_price,
            discounted_price: workshop.discounted_price,
          }}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Sticky mobile CTA — only visible below 900px */}
      <div
        className="hidden max-[900px]:flex fixed bottom-0 left-0 right-0 z-40 items-center gap-3 px-5 py-5"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid var(--border)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold uppercase tracking-wide truncate" style={{ color: "var(--ink-soft)" }}>
            {dateRange}
          </p>
          <p className="text-[16px] font-bold" style={{ color: "var(--ink)" }}>
            {hasDiscount && (
              <span className="line-through opacity-40 font-normal mr-1">₹{regularPriceInRupees}</span>
            )}
            ₹{priceInRupees} · All-in
          </p>
        </div>
        <button
          onClick={openBooking}
          className="shrink-0 px-6 py-3.5 rounded-full text-base font-bold text-white"
          style={{ background: "var(--coral)", boxShadow: "0 4px 14px rgba(255,127,92,0.4)" }}
        >
          Register →
        </button>
      </div>

      <HeroSection
        workshop={workshop}
        priceInRupees={priceInRupees}
        regularPriceInRupees={regularPriceInRupees}
        hasDiscount={hasDiscount}
        dateRange={dateRange}
        onBookClick={openBooking}
      />
      <ThemeSection />
      <WhatsIncludedSection
        priceInRupees={priceInRupees}
        regularPriceInRupees={regularPriceInRupees}
        hasDiscount={hasDiscount}
      />
      <ExperienceFlowSection workshop={workshop} />
      <TwoSessionsSection workshop={workshop} />
      <PricingSection
        workshop={workshop}
        priceInRupees={priceInRupees}
        regularPriceInRupees={regularPriceInRupees}
        hasDiscount={hasDiscount}
        dateRange={dateRange}
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
    </div>
  );
}

function HeroSection({
  workshop,
  priceInRupees,
  regularPriceInRupees,
  hasDiscount,
  dateRange,
  onBookClick,
}: {
  workshop: WorkshopData;
  priceInRupees: number;
  regularPriceInRupees: number;
  hasDiscount: boolean;
  dateRange: string;
  onBookClick: () => void;
}) {
  return (
    <section className="relative py-[100px] px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#FFD4B8"
        opacity={0.35}
        size={{ width: 480, height: 380 }}
        position={{ top: "5%", right: "-10%" }}
      />
      <FloatingBlob
        color="#DDD4F8"
        opacity={0.3}
        size={{ width: 360, height: 300 }}
        position={{ bottom: "10%", left: "-8%" }}
        delay={2}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-[1.3fr_1fr] max-[900px]:grid-cols-1 gap-[72px]">
          {/* Left */}
          <div>
            <p
              className="text-[11px] font-bold uppercase mb-4"
              style={{ color: "var(--ink-soft)" }}
            >
              Workshop — Now Open
            </p>

            <h1 style={{ fontSize: "clamp(38px, 5.5vw, 68px)" }}>
              Surfacing <em style={{ color: "var(--coral)" }}>Difficult</em>{" "}
              Conversations.
            </h1>

            <p
              className="text-lg mt-6 mb-10 max-w-[520px]"
              style={{ color: "var(--ink-soft)" }}
            >
              Two live sessions with Shashi. A workbook before you arrive. A manual and
              full recording to keep. Everything you need to finally have the conversation
              you've been avoiding.
            </p>

            <div className="mb-4">
              <Button variant="large-coral" onClick={onBookClick}>
                Book Your Spot ·{" "}
                {hasDiscount && (
                  <span className="line-through opacity-50 mr-1">₹{regularPriceInRupees}</span>
                )}
                ₹{priceInRupees}
              </Button>
            </div>

            <p className="text-[13px]" style={{ color: "var(--ink-faint)" }}>
              🔒 Secure payment · Instant confirmation
            </p>
          </div>

          {/* Right - Fast Facts Card (Sticky) */}
          <div className="max-[900px]:static">
            <div
              className="bg-white rounded-2xl p-8 sticky top-20"
              style={{ boxShadow: "var(--shadow)" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-6"
                style={{ color: "var(--ink-soft)" }}
              >
                Workshop at a glance
              </p>

              <div className="space-y-4 mb-6">
                {[
                  { emoji: "📅", label: "Dates", value: dateRange },
                  { emoji: "🕖", label: "Time", value: `${workshop.session_time} both days` },
                  { emoji: "⏱️", label: "Format", value: "60 minutes × 2 live sessions" },
                  { emoji: "💻", label: "Platform", value: "Live on Zoom" },
                  { emoji: "🌍", label: "Open to", value: "Anyone, anywhere" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="pb-4 border-b flex gap-3"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <div className="flex-1">
                      <span className="font-semibold text-sm">{item.label}</span>
                      <span className="mx-2 text-sm opacity-30">/</span>
                      <span className="text-sm" style={{ color: "var(--ink-soft)" }}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex gap-3">
                  <span className="text-lg">💰</span>
                  <div className="flex-1">
                    <span className="font-semibold text-sm">Investment</span>
                    <span className="mx-2 text-sm opacity-30">/</span>
                    <span className="text-lg font-bold" style={{ color: "var(--purple)" }}>
                      {hasDiscount && (
                        <span className="line-through opacity-50 font-normal text-base mr-1.5">
                          ₹{regularPriceInRupees}
                        </span>
                      )}
                      ₹{priceInRupees} · All-in
                    </span>
                  </div>
                </div>
              </div>

              <CountdownTimer targetDate={workshop.date_1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountdownTimer({ targetDate: targetDateStr }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    // Parse the date robustly — avoids any string format ambiguity.
    // new Date(str) handles "2026-03-28", ISO strings, and Date objects.
    const d = new Date(String(targetDateStr));
    // Target: 11:00 AM IST = 05:30 UTC
    const targetDate = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 5, 30, 0);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        expired: false,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Dot Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10">
        <p
          className="text-[11px] font-bold uppercase tracking-wider mb-4"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Starts in
        </p>

        {timeLeft.expired ? (
          <p className="text-white text-lg font-bold">🎉 The workshop has started!</p>
        ) : (
          <div className="flex items-center justify-between gap-2">
            {[
              { value: timeLeft.days, label: "DD" },
              { value: timeLeft.hours, label: "HH" },
              { value: timeLeft.minutes, label: "MM" },
              { value: timeLeft.seconds, label: "SS" },
            ].map((unit, i) => (
              <div key={i} className="flex-1 text-center">
                <div
                  className="text-[30px] font-black text-white tabular-nums leading-none mb-1"
                >
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {unit.label}
                </div>
                {i < 3 && (
                  <span
                    className="absolute text-white text-xl"
                    style={{
                      opacity: 0.2,
                      left: `${((i + 1) * 25) - 1}%`,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ThemeSection() {
  return (
    <section className="relative py-24 px-16 max-[900px]:px-6 overflow-hidden" id="theme">
      <FloatingBlob
        color="#B8E8D4"
        opacity={0.3}
        size={{ width: 400, height: 350 }}
        position={{ top: "0", left: "-12%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="max-w-[640px] mb-14">
            <Pill variant="sage">The theme</Pill>
            <h2 className="mt-6" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
              Why this conversation? Because you've been avoiding it.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-14">
          {/* Left */}
          <ScrollReveal>
            <div>
              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                Most of us carry at least one conversation we haven't had. With a parent. A
                partner. A manager. Ourselves. We know it needs to happen. We keep finding
                reasons why now isn't the right time.
              </p>

              <blockquote
                className="border-l-4 pl-6 mb-6 italic font-bold"
                style={{
                  borderColor: "var(--coral)",
                  fontSize: "clamp(18px, 2.2vw, 24px)",
                }}
              >
                "The conversation you avoid most is usually the one that matters most."
              </blockquote>

              <p className="text-base" style={{ color: "var(--ink-soft)" }}>
                This workshop is built around that gap — between what needs to be said and
                what actually gets said. Shashi will guide you through{" "}
                <strong>seeing why those conversations feel impossible</strong>, and what
                actually shifts when you stop avoiding them. You won't leave with a script.
                You'll leave with clarity — about what you're actually trying to say, and
                why you've been holding back.
              </p>
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={160}>
            <div>
              <Pill variant="lavender">What you'll explore</Pill>

              <div className="mt-6 space-y-3">
                {[
                  "Why the same difficult conversations keep repeating in your life",
                  "The images and assumptions that make honest conversation feel dangerous",
                  "What you're actually protecting when you hold back",
                  "How to enter a difficult conversation without losing yourself — or the relationship",
                  "What happens when you finally say the thing that needed saying",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="px-5 py-4 rounded-2xl border flex gap-3 items-start"
                    style={{
                      background: "var(--lavender-light)",
                      borderColor: "var(--lavender)",
                    }}
                  >
                    <span className="text-lg flex-shrink-0">
                      {["🪞", "🖼️", "🛡️", "💬", "🌱"][i]}
                    </span>
                    <span className="text-sm" style={{ color: "var(--ink)" }}>
                      {item}
                    </span>
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

function WhatsIncludedSection({
  priceInRupees,
  regularPriceInRupees,
  hasDiscount,
}: {
  priceInRupees: number;
  regularPriceInRupees: number;
  hasDiscount: boolean;
}) {
  return (
    <section className="relative py-24 px-16 max-[900px]:px-6 overflow-hidden" id="included">
      <FloatingBlob
        color="#FFD4B8"
        opacity={0.35}
        size={{ width: 420, height: 360 }}
        position={{ top: "10%", right: "-10%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Pill variant="peach">What's included</Pill>
            <h2 className="mt-6 mb-4" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-[17px]" style={{ color: "var(--ink-soft)" }}>
              For{" "}
              {hasDiscount && (
                <span className="line-through opacity-50 mr-1">₹{regularPriceInRupees}</span>
              )}
              ₹{priceInRupees}, here is everything you walk away with.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-5">
          {[
            {
              badge: "Before",
              badgeColor: "#FF7F5C",
              emoji: "📓",
              title: "The RELATE Workbook",
              text: "Sent to you before the first session. Gentle prompts to help you notice patterns and prepare emotionally.",
              tag: "Pre-session prep",
              tagBg: "#FFF0B8",
            },
            {
              emoji: "🎙️",
              title: "2 Live Guided Sessions",
              text: "60 minutes each, live on Zoom with Shashi. Small group, real conversation, guided exercises.",
              tag: "Live · Interactive",
              tagBg: "#DDD4F8",
            },
            {
              badge: "After",
              badgeColor: "#7C5CBF",
              emoji: "📖",
              title: "The RELATE Manual",
              text: "Sent after the sessions. The complete framework, tools, and insights to revisit anytime.",
              tag: "Post-session reference",
              tagBg: "#B8E8D4",
            },
            {
              emoji: "🎥",
              title: "Full Session Recording",
              text: "Both sessions recorded in full. Yours to keep forever. Rewatch, share, or return to when needed.",
              tag: "Lifetime access",
              tagBg: "#FFD4B8",
            },
            {
              emoji: "👥",
              title: "Small Group Experience",
              text: "This isn't a mass webinar. Limited spots. Real faces. Actual conversation.",
              tag: "Intimate setting",
              tagBg: "#DDD4F8",
            },
            {
              emoji: "🧰",
              title: "Practical Tools That Stay",
              text: "Not frameworks you'll forget by Tuesday. Real, usable tools you can apply immediately.",
              tag: "Immediately usable",
              tagBg: "#B8E8D4",
            },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className="relative bg-white rounded-2xl p-9 text-center h-full flex flex-col"
                style={{ boxShadow: "var(--shadow)" }}
              >
                {item.badge && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-white"
                    style={{ background: item.badgeColor }}
                  >
                    {item.badge}
                  </div>
                )}

                <div className="text-5xl mb-4">{item.emoji}</div>
                <h4 className="font-black text-lg mb-3">{item.title}</h4>
                <p
                  className="text-sm mb-6 flex-1"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {item.text}
                </p>
                <div
                  className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold uppercase mx-auto"
                  style={{ background: item.tagBg, color: "var(--ink)" }}
                >
                  {item.tag}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceFlowSection({ workshop }: { workshop: WorkshopData }) {
  const date1Short = formatShortDate(workshop.date_1);
  const date2Short = formatShortDate(workshop.date_2);
  const sessionLabel = `${date1Short} & ${date2Short}`;
  const sessionTime = workshop.session_time;
  return (
    <section className="py-20 px-16 max-[900px]:px-6">
      <div className="max-w-[900px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Pill variant="lavender">What happens, from start to finish.</Pill>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting Line */}
          <div
            className="absolute top-8 left-[10%] right-[10%] h-0.5 max-[900px]:hidden"
            style={{
              background:
                "linear-gradient(to right, #DDD4F8 0%, #FFD4B8 100%)",
            }}
          />

          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-10">
            {[
              {
                emoji: "📓",
                bg: "#FFF0B8",
                label: "Before",
                title: "You receive the Workbook",
                text: "Reflection prompts to prepare you emotionally. No homework, no pressure — just gentle noticing.",
              },
              {
                emoji: "🎙️",
                bg: "#DDD4F8",
                label: sessionLabel,
                title: "Two live sessions",
                text: `60 minutes each with Shashi. Guided exercises. Real conversation. Small group. ${sessionTime}.`,
              },
              {
                emoji: "📖",
                bg: "#B8E8D4",
                label: "After",
                title: "Manual + Recording delivered",
                text: "Everything from both sessions — to revisit, share, and continue the work in your own time.",
              },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 160}>
                <div className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl border-2 border-white"
                    style={{
                      background: step.bg,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    }}
                  >
                    {step.emoji}
                  </div>
                  <p
                    className="text-xs font-bold uppercase tracking-wide mb-2"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {step.label}
                  </p>
                  <h4 className="font-bold mb-2">{step.title}</h4>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                    {step.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TwoSessionsSection({ workshop }: { workshop: WorkshopData }) {
  const date1Short = formatShortDate(workshop.date_1);
  const date2Short = formatShortDate(workshop.date_2);
  const sessionTime = workshop.session_time;
  return (
    <section className="relative py-24 px-16 max-[900px]:px-6 overflow-hidden" id="sessions">
      <FloatingBlob
        color="#DDD4F8"
        opacity={0.3}
        size={{ width: 380, height: 340 }}
        position={{ top: "5%", left: "-10%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Pill variant="lavender">What happens inside the two sessions.</Pill>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-8">
          {/* Session 1 */}
          <ScrollReveal>
            <div
              className="rounded-3xl p-10 border-[1.5px]"
              style={{
                background: "linear-gradient(135deg, #F0ECFF 0%, #FFFFFF 100%)",
                borderColor: "#DDD4F8",
              }}
            >
              <p className="text-sm font-bold mb-3" style={{ color: "var(--ink-soft)" }}>
                Session 1 · {date1Short}
              </p>
              <h3 className="mb-4" style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}>
                Relationship as a Mirror
              </h3>

              <div className="flex gap-2 mb-6">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "#DDD4F8", color: "var(--purple-dark)" }}
                >
                  60 mins · Live
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "#DDD4F8", color: "var(--purple-dark)" }}
                >
                  {sessionTime}
                </span>
              </div>

              <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
                We start by looking at something most of us have never really examined: the
                patterns we repeat across relationships. Not to judge them — to see them.
              </p>

              <div
                className="rounded-xl p-4 mb-6 italic text-sm"
                style={{
                  background: "rgba(124, 92, 191, 0.07)",
                  color: "var(--purple-dark)",
                }}
              >
                "Am I responding to the person — or to my image of them?"
              </div>

              <div className="space-y-3">
                {[
                  "Grounding — arrive present, not running",
                  "The mirror exercise — noticing your reactions without justifying them",
                  "Small group sharing — what others name often names what you couldn't",
                  "Closing reflection — one thing you're taking into the week",
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: "var(--purple)" }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm pt-0.5" style={{ color: "var(--ink)" }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Session 2 */}
          <ScrollReveal delay={160}>
            <div
              className="rounded-3xl p-10 border-[1.5px]"
              style={{
                background: "linear-gradient(135deg, #FFF0E8 0%, #FFFFFF 100%)",
                borderColor: "#FFD4B8",
              }}
            >
              <p className="text-sm font-bold mb-3" style={{ color: "var(--ink-soft)" }}>
                Session 2 · {date2Short}
              </p>
              <h3 className="mb-4" style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}>
                Relating Without Images
              </h3>

              <div className="flex gap-2 mb-6">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "#FFD4B8", color: "#8B4513" }}
                >
                  60 mins · Live
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "#FFD4B8", color: "#8B4513" }}
                >
                  {sessionTime}
                </span>
              </div>

              <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
                The second session goes deeper: why we rarely meet the actual person in
                front of us. And what it feels like when we do.
              </p>

              <div
                className="rounded-xl p-4 mb-6 italic text-sm"
                style={{ background: "rgba(255, 127, 92, 0.1)", color: "var(--coral)" }}
              >
                "Can I meet someone without knowing them?"
              </div>

              <div className="space-y-3">
                {[
                  "Check-in — what shifted between the sessions?",
                  "The image experiment — seeing the assumptions we bring before someone speaks",
                  "Real-world application — work, family, romance, friendship",
                  "Final check-out — one sentence you're taking into your relationships",
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: "var(--coral)" }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm pt-0.5" style={{ color: "var(--ink)" }}>
                      {step}
                    </span>
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

function PricingSection({
  workshop,
  priceInRupees,
  regularPriceInRupees,
  hasDiscount,
  dateRange,
  onBookClick,
}: {
  workshop: WorkshopData;
  priceInRupees: number;
  regularPriceInRupees: number;
  hasDiscount: boolean;
  dateRange: string;
  onBookClick: () => void;
}) {
  return (
    <section className="py-24 px-16 max-[900px]:px-6">
      <div className="max-w-[680px] mx-auto">
        <ScrollReveal>
          <div
            className="relative rounded-[32px] p-14 max-[900px]:p-10 text-center overflow-hidden"
            style={{ background: "var(--ink)" }}
          >
            {/* Dot Grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.05) 1.2px, transparent 1.2px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Blobs */}
            <FloatingBlob
              color="#5E3FA3"
              opacity={1}
              size={{ width: 280, height: 260 }}
              position={{ top: "-30%", right: "5%" }}
            />
            <FloatingBlob
              color="#E8603A"
              opacity={1}
              size={{ width: 240, height: 220 }}
              position={{ bottom: "-25%", left: "10%" }}
              delay={2}
            />

            <div className="relative z-10">
              <p
                className="text-xs font-bold uppercase tracking-wider mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                ✦ Workshop · All-in price
              </p>

              <div className="mb-2">
                {hasDiscount && (
                  <div className="text-2xl text-white/40 line-through mb-1">
                    ₹{regularPriceInRupees}
                  </div>
                )}
                <sup className="text-4xl text-white align-super mr-1">₹</sup>
                <span
                  className="text-white"
                  style={{ fontSize: "clamp(72px, 9vw, 104px)" }}
                >
                  {priceInRupees}
                </span>
              </div>

              <p
                className="text-sm mb-8"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                One payment. Everything included.
              </p>

              <div className="space-y-2 mb-8">
                {[
                  "RELATE Workbook (pre-session)",
                  "2 live guided sessions with Shashi (60 min each)",
                  "RELATE Manual (post-session)",
                  "Full session recording · Lifetime access",
                  "Small group experience — not a webinar",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.07] rounded-xl px-5 py-3 text-white text-sm text-left"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <Button variant="large-coral" onClick={onBookClick}>
                Book My Spot ·{" "}
                {hasDiscount && (
                  <span className="line-through opacity-50 mr-1">₹{regularPriceInRupees}</span>
                )}
                ₹{priceInRupees}
              </Button>

              <p
                className="text-[13px] mt-6"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {dateRange} · {workshop.session_time} · Live on Zoom
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function IsThisForYouSection() {
  return (
    <section className="py-24 px-16 max-[900px]:px-6">
      <div className="max-w-[880px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Pill variant="sage">This workshop is for some people. Not everyone.</Pill>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-6">
          <ScrollReveal>
            <div
              className="rounded-2xl p-8 border-t-[3px]"
              style={{
                background: "#FFFFFF",
                borderTopColor: "#B8E8D4",
                boxShadow: "var(--shadow)",
              }}
            >
              <h4 className="font-bold text-base mb-5">✓ This is for you if…</h4>
              <div className="space-y-2.5">
                {[
                  "You have a specific difficult conversation on your mind",
                  "You're tired of advice that tells you what to say",
                  "You want to understand your part in the pattern",
                  "You're willing to sit with discomfort",
                  "You're functioning well but want to go deeper",
                  "You value small groups over mass events",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2.5 text-sm">
                    <span style={{ color: "#1a5c3a" }}>✓</span>
                    <span style={{ color: "var(--ink)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div
              className="rounded-2xl p-8 border-t-[3px]"
              style={{
                background: "#FFFFFF",
                borderTopColor: "#FFD4B8",
                boxShadow: "var(--shadow)",
              }}
            >
              <h4 className="font-bold text-base mb-5">○ This might not be for you if…</h4>
              <div className="space-y-2.5">
                {[
                  "You're in crisis or need clinical support",
                  "You want step-by-step scripts and formulas",
                  "You're looking for someone to blame or fix",
                  "You prefer solo reflection over group spaces",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2.5 text-sm">
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
    <section className="py-20 px-16 max-[900px]:px-6">
      <div className="max-w-[700px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Pill variant="butter">What people usually ask.</Pill>
          </div>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className="border-b py-5"
                style={{ borderColor: "var(--border)" }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="font-bold pr-4">{faq.question}</span>
                  <span
                    className={`text-2xl transition-transform flex-shrink-0 ${openIndex === i ? "rotate-45" : ""
                      }`}
                    style={{ color: "var(--purple)" }}
                  >
                    +
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openIndex === i ? "200px" : "0",
                  }}
                >
                  <p
                    className="pt-4 text-sm leading-relaxed"
                    style={{ color: "var(--ink-soft)" }}
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
    <section className="relative py-[120px] px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#FFD4B8"
        opacity={0.45}
        size={{ width: 500, height: 450 }}
        position={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />

      <div className="relative z-10 max-w-[620px] mx-auto text-center">
        <ScrollReveal>
          <Pill variant="coral">
            {dateRange} ·{" "}
            {hasDiscount && (
              <span className="line-through opacity-70 mr-1">₹{regularPriceInRupees}</span>
            )}
            ₹{priceInRupees}
          </Pill>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <h2
            className="mt-8 mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 66px)" }}
          >
            The conversation that{" "}
            <em style={{ color: "var(--coral)" }}>needs to happen.</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <p className="text-lg mb-10" style={{ color: "var(--ink-soft)" }}>
            Two mornings. A small group. A guided space where the difficult conversation
            finally gets to happen.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <div className="mb-4">
            <Button variant="large-coral" onClick={onBookClick}>
              Book My Spot ·{" "}
              {hasDiscount && (
                <span className="line-through opacity-50 mr-1">₹{regularPriceInRupees}</span>
              )}
              ₹{priceInRupees}
            </Button>
          </div>
          <p className="text-sm" style={{ color: "var(--ink-faint)" }}>
            🔒 Secure payment · Instant confirmation
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}