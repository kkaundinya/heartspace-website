import { Pill } from "../components/ui/Pill";
import { Button } from "../components/ui/Button";
import { FloatingBlob } from "../components/ui/FloatingBlob";
import { ScrollReveal } from "../components/ui/ScrollReveal";

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <WhatIsHeartSpaceSection />
      <RelationshipsSection />
      <ShashiTeaserSection />
      <WorkshopCardSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <IsThisForYouSection />
      <FinalCTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-10 py-[100px] max-[900px]:px-6 overflow-hidden">
      {/* Blobs */}
      <FloatingBlob
        color="#FFD4B8"
        opacity={0.35}
        size={{ width: 520, height: 400 }}
        position={{ top: "5%", right: "-10%" }}
      />
      <FloatingBlob
        color="#DDD4F8"
        opacity={0.3}
        size={{ width: 380, height: 320 }}
        position={{ bottom: "10%", left: "-8%" }}
        delay={2}
      />
      <FloatingBlob
        color="#B8E8D4"
        opacity={0.28}
        size={{ width: 250, height: 220 }}
        position={{ top: "40%", left: "10%" }}
        delay={4}
      />

      <div className="relative z-10 max-w-[860px] mx-auto text-center">
        <div className="animate-hero-enter opacity-0" style={{ animationDelay: "0.1s" }}>
          <Pill variant="peach">✦ Guided conversations for better relationships</Pill>
        </div>

        <h1
          className="mt-8 mb-6 animate-hero-enter opacity-0"
          style={{
            fontSize: "clamp(46px, 7vw, 84px)",
            animationDelay: "0.25s",
          }}
        >
          For anyone who wants to{" "}
          <span className="relative inline-block" style={{ color: "var(--coral)" }}>
            relate better
            <WavyUnderline />
          </span>{" "}
        </h1>

        <p
          className="mx-auto mb-10 max-w-[720px] animate-hero-enter opacity-0"
          style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            color: "var(--ink-soft)",
            animationDelay: "0.42s",
          }}
        >
          Heart Space creates guided conversations that help you relate better — to yourself, to others, and to life. Not therapy. Not advice. Something rarer: a space to actually see what's happening. 
        </p>

        <div
          className="flex items-center justify-center gap-4 mb-12 flex-wrap animate-hero-enter opacity-0"
          style={{ animationDelay: "0.58s" }}
        >
          <Button variant="primary" href="/workshop">
            Join Workshop 1
          </Button>
          <Button variant="outline" href="/about">
            Meet Shashi
          </Button>
        </div>

        {/* Strip Card */}
        <div
          className="bg-white rounded-2xl p-6 grid grid-cols-4 max-[900px]:grid-cols-2 gap-6 animate-hero-enter opacity-0"
          style={{
            boxShadow: "var(--shadow)",
            animationDelay: "0.74s",
          }}
        >
          {[
            { emoji: "🪞", text: "Awareness" },
            { emoji: "💡", text: "Clarity" },
            { emoji: "🌱", text: "Action" },
            { emoji: "❤️", text: "Better Relationships" },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-center gap-2 text-[13px] font-semibold ${
                i < 3 && i !== 1
                  ? "border-r max-[900px]:border-r-0"
                  : i === 1
                  ? "border-r max-[900px]:border-r"
                  : ""
              }`}
              style={{ borderColor: "var(--border)", color: "var(--ink)" }}
            >
              <span className="text-base">{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WavyUnderline() {
  return (
    <svg
      className="absolute left-0 right-0 -bottom-2 w-full h-3"
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0 6 Q 15 0, 30 6 T 60 6 T 90 6 T 120 6 T 150 6 T 180 6 T 210 6 T 240 6 T 270 6 T 300 6"
        stroke="#FF7F5C"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatIsHeartSpaceSection() {
  return (
    <section className="relative py-[100px] px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#B8E8D4"
        opacity={0.3}
        size={{ width: 400, height: 350 }}
        position={{ top: "0", left: "-15%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-[1fr_1.1fr] max-[900px]:grid-cols-1 gap-[72px] items-center">
          {/* Left */}
          <ScrollReveal>
            <div>
              <Pill variant="sage">What is Heart Space?</Pill>
              <h2
                className="mt-6 mb-6"
                style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
              >
                A place for the conversations you keep postponing.
              </h2>
              <p className="text-[17px] mb-8 max-w-[480px]" style={{ color: "var(--ink-soft)" }}>
                Heart Space creates the conditions where you can hear yourself clearly
                and then act differently. Not therapy. Not advice. Guided conversation
                that changes how you see — and therefore how you relate.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary" href="/workshop">
                  See Workshop 1
                </Button>
                <Button variant="outline" href="/about">
                  Our Story
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Cards */}
          <div className="flex flex-col gap-5">
            {[
              {
                emoji: "👁️",
                bg: "#FFF0E8",
                title: "Awareness",
                text: "Notice what's actually happening — not the story you've been telling yourself about it.",
              },
              {
                emoji: "💡",
                bg: "#F4F1FF",
                title: "Clarity",
                text: "Understand what you want to say and why — before you say it. Or before you stay silent again.",
              },
              {
                emoji: "🌱",
                bg: "#E8F8F2",
                title: "Action",
                text: "Move from circling to speaking. From reaction to conscious response. From effort to ease.",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div
                  className="bg-white rounded-2xl p-6 flex gap-4"
                  style={{ boxShadow: "var(--shadow)" }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: card.bg }}
                  >
                    {card.emoji}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{card.title}</h4>
                    <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                      {card.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RelationshipsSection() {
  return (
    <section className="relative py-[100px] px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#FFF0B8"
        opacity={0.35}
        size={{ width: 450, height: 380 }}
        position={{ top: "0", right: "-12%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <Pill variant="butter">Relationships we support</Pill>
            <h2 className="mt-6 mb-4" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
              Every relationship in your life.
            </h2>
            <p className="text-[17px]" style={{ color: "var(--ink-soft)" }}>
              No relationship type is prioritised over another. Heart Space works wherever
              connection matters.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-5">
          {[
            {
              emoji: "🪞",
              title: "Yourself",
              text: "Figure out what's really going on inside. The hardest conversation is often the one with yourself.",
            },
            {
              emoji: "👨‍👩‍👧",
              title: "Family",
              text: "Work through family dynamics without losing yourself. Say the thing that needs to be said.",
            },
            {
              emoji: "💼",
              title: "Work",
              text: "Talk to colleagues and managers in ways that build real trust — not just compliance.",
            },
            {
              emoji: "💛",
              title: "Friends",
              text: "Keep friendships strong and be the friend you want to be, even when life gets in the way.",
            },
            {
              emoji: "❤️",
              title: "Romantic Partners",
              text: "Love honestly and with ownership of your part. Stop the same patterns from returning.",
            },
            {
              emoji: "🤝",
              title: "New Connections",
              text: "Start things right. First impressions that create real foundations, not just small talk.",
            },
          ].map((card, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className="bg-white rounded-2xl p-7 hover:-translate-y-1 transition-all"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <div className="text-[28px] mb-3">{card.emoji}</div>
                <h4 className="font-bold mb-2">{card.title}</h4>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                  {card.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShashiTeaserSection() {
  return (
    <section className="relative py-[100px] px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#FFD4B8"
        opacity={0.32}
        size={{ width: 420, height: 360 }}
        position={{ top: "10%", right: "-10%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-[1fr_1.4fr] max-[900px]:grid-cols-1 gap-[72px] items-center">
          {/* Left - Photo Placeholder */}
          <ScrollReveal>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                aspectRatio: "4/5",
                background: "linear-gradient(135deg, #221a36 0%, #1a1a2e 100%)",
              }}
            >
              {/* Glows */}
              <div
                className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(124,92,191,0.3) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <div
                className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,127,92,0.25) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              {/* SV Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/shashi-velath.jpg" alt="Shashi Velath" className="w-full h-full object-cover" />
              </div>

              {/* Bottom Bar */}
              <div
                className="absolute bottom-0 left-0 right-0 py-3 px-5 text-center text-white text-xs font-bold tracking-wide"
                style={{ background: "#FF7F5C" }}
              >
                WAR CORRESPONDENT → COACH
              </div>
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={160}>
            <div>
              <Pill variant="peach">The person behind Heart Space</Pill>

              <div
                className="mt-6 mb-6 inline-block px-4 py-2.5 rounded-xl border text-sm font-bold"
                style={{
                  background: "#FFF0E8",
                  borderColor: "#FFD4B8",
                  color: "var(--ink)",
                }}
              >
                📰 Former investigative journalist & war correspondent
              </div>

              <h2
                className="mb-6 italic"
                style={{
                  fontSize: "clamp(22px, 2.8vw, 34px)",
                  lineHeight: "1.4",
                }}
              >
                "Relationship-building was never a soft skill for me. It was a matter of{" "}
                <span style={{ color: "var(--coral)" }}>survival.</span>"
              </h2>

              <p className="text-base mb-8" style={{ color: "var(--ink-soft)" }}>
                Shashi Velath spent years building trust in some of the world's most hostile
                environments. He learned — the hard way — what real listening, real
                connection, and real trust look like. Heart Space is what he built from
                those lessons.
              </p>

              <Button variant="outline"href="/about">
                Read Shashi's Story
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function WorkshopCardSection() {
  return (
    <section className="px-16 pb-[100px] max-[900px]:px-6">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div
            className="relative rounded-[28px] p-16 max-[900px]:p-8 overflow-hidden"
            style={{ background: "var(--purple)" }}
          >
            {/* Dot Grid Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.07) 1.2px, transparent 1.2px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Blobs */}
            <FloatingBlob
              color="rgba(255,255,255,0.08)"
              opacity={1}
              size={{ width: 300, height: 280 }}
              position={{ top: "-20%", right: "5%" }}
            />
            <FloatingBlob
              color="rgba(94,63,163,0.4)"
              opacity={1}
              size={{ width: 250, height: 220 }}
              position={{ bottom: "-15%", left: "10%" }}
              delay={3}
            />

            <div className="relative z-10 grid grid-cols-[1.3fr_1fr] max-[900px]:grid-cols-1 gap-12">
              {/* Left */}
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-wider mb-4"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  ✦ Now open — first workshop
                </p>
                <h2 className="text-white mb-6">
                  Workshop 1: Surfacing Difficult Conversations
                </h2>
                <p
                  className="text-base mb-8 max-w-[520px]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Two live guided sessions with Shashi. A workbook before. A manual after. A
                  recording you keep forever. Built around the conversations most of us spend
                  years avoiding.
                </p>
                <Button variant="white" href="/workshop">
                  See Full Details
                </Button>
              </div>

              {/* Right - Details */}
              <div className="flex flex-col gap-3">
                {[
                  { emoji: "📅", label: "When", value: "March 28 & 29, 2026" },
                  { emoji: "⏱️", label: "Duration", value: "90 minutes × 2 sessions" },
                  { emoji: "💻", label: "Format", value: "Live on Zoom" },
                  {
                    emoji: "📦",
                    label: "Includes",
                    value: "Workbook + Manual + Recording",
                  },
                  { emoji: "💰", label: "Investment", value: "₹499 · All-in" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-2xl px-5 py-4 flex gap-3 items-center text-white"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <div className="flex-1">
                      <span className="font-semibold">{item.label}</span>
                      <span className="mx-2 opacity-40">/</span>
                      <span className="opacity-90">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="relative py-[100px] px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#DDD4F8"
        opacity={0.3}
        size={{ width: 380, height: 340 }}
        position={{ top: "5%", left: "-10%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-20">
            <Pill variant="lavender">How it works</Pill>
            <h2 className="mt-6" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
              Three moments. One complete experience.
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting Line */}
          <div
            className="absolute top-10 left-[10%] right-[10%] h-0.5 max-[900px]:hidden"
            style={{
              background:
                "linear-gradient(to right, #DDD4F8 0%, #7C5CBF 50%, #DDD4F8 100%)",
            }}
          />

          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-12">
            {[
              {
                emoji: "📓",
                title: "Before: Your Workbook",
                text: "Receive the RELATE.LIVE workbook before the sessions. Use it to notice what's happening in your relationships — no writing required, just gentle observation.",
              },
              {
                emoji: "💬",
                title: "During: Two Live Sessions",
                text: "Two 90-minute guided conversations with Shashi on Zoom. Session 1: Relationship as a Mirror. Session 2: Relating Without Images.",
              },
              {
                emoji: "📘",
                title: "After: Manual + Recording",
                text: "Receive the full session manual to keep and return to whenever needed. Full recording of both sessions. The tools stay with you forever.",
              },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 160}>
                <div className="text-center">
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-white border-2 flex items-center justify-center text-3xl"
                    style={{
                      borderColor: "var(--lavender)",
                      boxShadow: "var(--shadow)",
                    }}
                  >
                    {step.emoji}
                  </div>
                  <h4 className="font-bold mb-3 text-[17px]">{step.title}</h4>
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

function TestimonialsSection() {
  return (
    <section className="py-[100px] px-16 max-[900px]:px-6">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Pill variant="peach">Words from the Heart</Pill>
            <h2 className="mt-6 mb-3" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
              From people who've walked this path
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-6">
          {[
            {
              avatar: "P",
              avatarBg: "#FF7F5C",
              name: "Priya",
              context: "After a 3-year situationship",
              quote:
                "I finally feel like someone understands what I'm going through. Not judged. Not rushed. Just… heard.",
            },
            {
              avatar: "A",
              avatarBg: "#3db88a",
              name: "Aisha",
              context: "Navigating family expectations",
              quote:
                "For the first time, I didn't feel like I was 'too much.' This space reminded me that my feelings are valid.",
            },
            {
              avatar: "R",
              avatarBg: "#7C5CBF",
              name: "Rohan",
              context: "Finding his voice in relationships",
              quote:
                "I came looking for dating advice. I left with something deeper — clarity about what I actually need.",
            },
          ].map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 160}>
              <div
                className="relative bg-white rounded-2xl p-8 h-full"
                style={{ boxShadow: "var(--shadow)" }}
              >
                {/* Giant Quote Mark */}
                <div
                  className="absolute top-6 right-6 text-[130px] leading-none pointer-events-none"
                  style={{ color: "var(--purple)", opacity: 0.05 }}
                >
                  "
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: testimonial.avatarBg }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{testimonial.name}</div>
                      <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
                        {testimonial.context}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4" style={{ color: "var(--coral)" }}>
                    ★★★★★
                  </div>

                  <p
                    className="italic leading-relaxed"
                    style={{ color: "var(--ink)" }}
                  >
                    "{testimonial.quote}"
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

function IsThisForYouSection() {
  return (
    <section className="py-[100px] px-16 max-[900px]:px-6">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Pill variant="sage">This might be for you.</Pill>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-7 max-w-[900px] mx-auto">
          {/* Yes Card */}
          <ScrollReveal>
            <div
              className="rounded-3xl p-9 border-[1.5px]"
              style={{
                background: "var(--sage-light)",
                borderColor: "var(--sage)",
              }}
            >
              <h4 className="font-bold text-lg mb-6">✅ This is for you if…</h4>
              <div className="flex flex-col gap-3">
                {[
                  `You feel deeply and sometimes wonder if you're "too much"`,
                  `You're tired of surface-level relationship advice that doesn't get it`,
                  "You want clarity, not quick fixes",
                  "You're navigating difficult conversations you've been avoiding",
                  "You just need a quiet space to actually hear yourself",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span style={{ color: "#1a5c3a" }}>✓</span>
                    <span style={{ color: "var(--ink)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* No Card */}
          <ScrollReveal delay={160}>
            <div
              className="rounded-3xl p-9 border-[1.5px]"
              style={{
                background: "var(--peach-light)",
                borderColor: "var(--peach)",
              }}
            >
              <h4 className="font-bold text-lg mb-6">○ This might not be for you if…</h4>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  "You're looking for therapy or clinical support",
                  "You want someone to tell you exactly what to do",
                  "You're not ready to sit with uncomfortable feelings",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span style={{ color: "var(--ink-soft)" }}>○</span>
                    <span style={{ color: "var(--ink)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm italic" style={{ color: "var(--ink-soft)" }}>
                And that's completely fine. We hope you find what fits you.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="relative py-[120px] px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#FFD4B8"
        opacity={0.4}
        size={{ width: 500, height: 450 }}
        position={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />

      <div className="relative z-10 max-w-[620px] mx-auto text-center">
        <ScrollReveal>
          <Pill variant="peach">You don't need fixing. You just need space.</Pill>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <h2
            className="mt-8 mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 66px)" }}
          >
            You don't need <em style={{ color: "var(--coral)" }}>fixing</em>. You just
            need <em style={{ color: "var(--coral)" }}>space.</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <p
            className="text-lg mb-10"
            style={{ color: "var(--ink-soft)" }}
          >
            Heart Space is open now. Join Workshop 1 and give yourself permission to hear
            yourself clearly.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary" href="/workshop">
              Join Workshop 1
            </Button>
            <Button variant="outline" href="/workshop">
              Learn More
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}