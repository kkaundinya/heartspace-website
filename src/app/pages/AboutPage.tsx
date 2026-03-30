"use client";

import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { FloatingBlob } from "@/components/ui/floating-blob";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ImageWithFallback } from "@/components/figma/image-with-fallback";

export function AboutPage() {
  return (
    <div>
      <HeroSection />
      <PullQuote1Section />
      <Chapter01Section />
      <Chapter02Section />
      <Chapter03Section />
      <PullQuote2Section />
      <PrinciplesSection />
      <NotTherapySection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[92dvh] items-center flex px-16 max-[900px]:px-6 overflow-hidden">
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
        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-16 items-center">
          {/* Left */}
          <div>
            <Pill variant="peach">The person behind Heart Space</Pill>

            <h1 className="mt-6 mb-2" style={{ fontSize: "clamp(42px, 6vw, 72px)" }}>
              Shashi Velath.
            </h1>

            <p className="text-sm font-semibold mb-6" style={{ color: "var(--ink-soft)" }}>
              Founder, Heart Space
            </p>

            <p className="text-lg mb-4" style={{ color: "var(--ink-soft)" }}>
              Relationship coach trained in practices built on awareness, humble inquiry,
              and inside-out personal transformation.
            </p>

            <p className="text-base mb-8" style={{ color: "var(--ink-soft)" }}>
              He has spent 20+ years working with people in all kinds of situations — from
              conflict zones to boardrooms, young changemakers to communities finding their
              footing. He works with anyone ready to bring more clarity, honesty, and love
              into how they relate.
            </p>

            <div className="flex gap-3 mb-8 flex-wrap">
              <div
                className="inline-block px-4 py-2 rounded-xl text-sm font-bold"
                style={{ background: "#FFF0E8", color: "var(--ink)" }}
              >
                🌍 20+ Years Field Experience
              </div>
              <div
                className="inline-block px-4 py-2 rounded-xl text-sm font-bold"
                style={{ background: "#F4F1FF", color: "var(--ink)" }}
              >
                🎙️ Relationship Coach
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button variant="default" href="#story">
                Read the full story
              </Button>
              <Button variant="outline" href="/workshop">
                Join Workshop
              </Button>
            </div>
          </div>

          {/* Right - Shashi Photo */}
          <ScrollReveal delay={160}>
            <div className="flex justify-center max-[900px]:justify-start">
              <div
                className="relative rounded-3xl overflow-hidden w-[85%] max-w-[420px]"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src="/shashi-velath.jpg"
                  alt="Shashi Velath"
                  className="w-full h-full object-cover"
                />
                {/* Bottom Bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 py-3 px-5 text-center text-white text-xs font-bold tracking-wide"
                  style={{ background: "#FF7F5C" }}
                >
                  AWARENESS · INQUIRY · TRANSFORMATION
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function PullQuote1Section() {
  return (
    <section
      className="py-[72px] px-16 max-[900px]:px-6 text-center"
      style={{ background: "var(--ink)" }}
    >
      <div className="max-w-[800px] mx-auto relative">
        {/* Giant Quote Mark */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] leading-none pointer-events-none"
          style={{ color: "rgba(255,255,255,0.04)" }}
        >
          ❝
        </div>

        <ScrollReveal>
          <blockquote
            className="relative z-10 italic text-white mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}
          >
            "Relationship-building was never a soft skill for me. It was a matter of
            Thriving."
          </blockquote>

          <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
            — Shashi Velath
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Chapter01Section() {
  return (
    <section className="relative py-24 px-16 max-[900px]:px-6 overflow-hidden" id="story">
      <FloatingBlob
        color="#FFD4B8"
        opacity={0.32}
        size={{ width: 420, height: 360 }}
        position={{ top: "10%", right: "-10%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-[1fr_1.1fr] max-[900px]:grid-cols-1 gap-[72px]">
          {/* Left */}
          <ScrollReveal>
            <div className="relative">

              <h2 style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
                Learning to relate when it really matters
              </h2>

              {/* Decorative 01 */}

            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={160}>
            <div>
              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                For over two decades, Shashi worked with people navigating high-stakes
                situations — conflict zones, crisis communities, organisations under
                pressure, young leaders finding their way.
              </p>

              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                The settings were different. The dynamic was always the same.
              </p>

              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                People were struggling not because they lacked skill or intelligence, but
                because something in how they were relating — to others, to themselves —
                kept getting in the way. Real listening. Full presence. Seeing who's actually
                in front of you instead of the story you've built about them. These weren't
                soft skills in the places Shashi worked. They were the difference between
                things moving and things breaking down.
              </p>

              <div
                className="border-l-4 pl-6 py-4 rounded-r-lg"
                style={{
                  borderColor: "var(--sage)",
                  background: "var(--sage-light)",
                }}
              >
                <p className="text-sm italic" style={{ color: "var(--ink)" }}>
                  "In conflict zones, the difference between getting the story and getting
                  out safely often came down to one thing: whether the person across from
                  you felt genuinely seen."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Chapter 01 Image */}
        <ScrollReveal delay={240}>
          <div className="mt-16 ">
            <div className="relative rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="/about-us-shashi-talk.png"
                alt="Journalism and reporting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Chapter02Section() {
  return (
    <section className="relative py-24 px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#DDD4F8"
        opacity={0.3}
        size={{ width: 380, height: 340 }}
        position={{ top: "5%", left: "-10%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        {/* Chapter 02 Image */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "21/9" }}>
              <ImageWithFallback
                src="/aboutUs_Corporate_Image.webp"
                alt="Boardroom discussions"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-[1.1fr_1fr] max-[900px]:grid-cols-1 gap-[72px]">
          {/* Left */}
          <ScrollReveal>
            <div>
              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                After years in the field, Shashi moved into working with organisations and
                leaders. Same pattern, different context.
              </p>

              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                Boards that couldn't have honest conversations. Teams that had learned to
                perform trust rather than build it. Leaders who were responding to their
                image of the person across the table — not the actual person.
              </p>

              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                The mechanism was identical. The cost was just measured in different units.
              </p>

              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                Heart Space is built on a simple observation: nothing moves in an
                organisation — or a family, or a friendship — until the conversations that
                need to happen actually happen.
              </p>

              <div
                className="border-l-4 pl-6 py-4 rounded-r-lg"
                style={{
                  borderColor: "var(--lavender)",
                  background: "var(--lavender-light)",
                }}
              >
                <p className="text-sm italic" style={{ color: "var(--ink)" }}>
                  "Nothing moves in an organisation until the conversations that need to
                  happen actually happen."
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={160}>
            <div className="relative">

              <h2 style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
                What relationships look like at scale
              </h2>

              {/* Decorative 02 */}
              <div
                className="absolute -top-4 -right-8 text-[120px] font-black pointer-events-none max-[900px]:hidden"
                style={{ color: "var(--lavender)", opacity: 0.06 }}
              >
                02
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Chapter03Section() {
  return (
    <section className="relative py-24 px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#B8E8D4"
        opacity={0.3}
        size={{ width: 400, height: 350 }}
        position={{ top: "10%", right: "-12%" }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-[1fr_1.1fr] max-[900px]:grid-cols-1 gap-[72px]">
          {/* Left */}
          <ScrollReveal>
            <div className="relative">

              <h2 style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
                Why Heart Space. The honest version.
              </h2>

              {/* Decorative 03 */}
              <div
                className="absolute -top-4 -left-8 text-[120px] font-black pointer-events-none max-[900px]:hidden"
                style={{ color: "var(--sage)", opacity: 0.06 }}
              >
                03
              </div>
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={160}>
            <div>
              <p className="text-base mb-6" style={{ color: "var(--ink-soft)" }}>
                None of what Shashi learned over two decades made his own relationships
                easy. He avoided conversations, repeated patterns, and found himself responding to an image of the person rather than the person.
              </p>


              <p className="text-base" style={{ color: "var(--ink-soft)" }}>
                Heart Space is a place crafted with experiences learnt from his life journey. It is a space where the conversation that didn’t ever start could finally begin. Where clarity, honesty, and love could show up together — not as ideals, but as practice.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Chapter 03 Images */}
        <ScrollReveal delay={240}>
          <div className="mt-16 grid grid-cols-[2fr_1fr] max-[900px]:grid-cols-1 gap-6 h-[500px] max-[900px]:h-auto">
            <div className="relative rounded-2xl overflow-hidden max-[900px]:aspect-[3/4]">
              <ImageWithFallback
                src="/aboutus_sunset.webp"
                alt="Thoughtful portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden max-[900px]:aspect-[3/4]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562255510-81104e9a3ea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FjaGluZyUyMGNvbnZlcnNhdGlvbiUyMGxpc3RlbmluZyUyMGNvbm5lY3Rpb258ZW58MXx8fHwxNzczMTE3MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Coaching conversation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PullQuote2Section() {
  return (
    <section
      className="py-16 px-16 max-[900px]:px-6 text-center"
      style={{ background: "var(--lavender-light)" }}
    >
      <div className="max-w-[760px] mx-auto relative">
        {/* Giant Quote Mark */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[160px] leading-none pointer-events-none"
          style={{ color: "var(--coral)", opacity: 0.15 }}
        >
          ❝
        </div>

        <ScrollReveal>
          <blockquote
            className="relative z-10 italic mb-6"
            style={{
              fontSize: "clamp(22px, 3vw, 38px)",
              color: "var(--ink)",
            }}
          >
            "Building great relationships has very little to do with what's outside us. It
            begins with how we see ourselves."
          </blockquote>

          <p className="text-base" style={{ color: "var(--ink-soft)" }}>
            — Shashi Velath
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="py-24 px-16 max-[900px]:px-6">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <Pill variant="lavender">What Heart Space is built on</Pill>
            <h2 className="mt-6" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
              Not principles. Observations.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-5">
          {[
            {
              emoji: "🪞",
              bg: "#FFF0E8",
              title: "Relationship as a mirror",
              text: "Every relationship reveals something about us — not just about the other person. When the same conflicts repeat, the common factor is always you. That's not blame. That's leverage.",
            },
            {
              emoji: "🖼️",
              bg: "#F4F1FF",
              title: "We rarely meet people directly",
              text: "Most of the time we're relating to our image of someone — built from memory, expectation, and assumption. Relating without those images is rarer than it sounds. And more powerful.",
            },
            {
              emoji: "👁️",
              bg: "#E8F8F2",
              title: "Seeing clearly changes everything",
              text: "When you actually see what's happening — in you, in the other person — the need to defend, attack, or withdraw starts to dissolve. Not because you try. Because clarity has entered.",
            },
            {
              emoji: "🔥",
              bg: "#FFF0B8",
              title: "Built on lived experiences",
              text: "Heart Space wasn't designed in a workshop or borrowed from a book. It emerged from Shashi's own lived experiences — in the field, in boardrooms, in his own life.",
            },
            {
              emoji: "💫",
              bg: "#F0ECFF",
              title: "Connection begins within",
              text: "The quality of your relationships reflects the quality of your relationship with yourself. That's where Heart Space begins.",
            },
            {
              emoji: "🚫",
              bg: "#FFE8E8",
              title: "Not therapy",
              text: "Heart Space is not counselling, therapy, or clinical support. It's a guided conversation space for people who are functioning well and want to go deeper.",
            },
          ].map((principle, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className="bg-white rounded-2xl p-7"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background: principle.bg }}
                >
                  {principle.emoji}
                </div>
                <h4 className="font-bold mb-3">{principle.title}</h4>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                  {principle.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotTherapySection() {
  return (
    <section className="py-20 px-16 max-[900px]:px-6">
      <div className="max-w-[700px] mx-auto">
        <ScrollReveal>
          <div
            className="rounded-3xl p-12 max-[900px]:p-8"
            style={{ background: "var(--ink)" }}
          >
            <div className="text-[32px] mb-6">🚫</div>
            <h3 className="text-white text-xl font-bold mb-5">
              An important clarification
            </h3>
            <p
              className="leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Heart Space is not therapy, counselling, or clinical mental health support. If you are in crisis or need clinical
              support, please seek that through a qualified professional. Heart Space is for
              people who are navigating life's relational complexity and want a guided space
              to see more clearly.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-[120px] px-16 max-[900px]:px-6 overflow-hidden">
      <FloatingBlob
        color="#FFD4B8"
        opacity={0.4}
        size={{ width: 500, height: 450 }}
        position={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />

      <div className="relative z-10 max-w-[620px] mx-auto text-center">


        <ScrollReveal delay={160}>
          <h2
            className="mt-8 mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 66px)" }}
          >
            This is where the real conversation finally begins.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <p className="text-lg mb-10" style={{ color: "var(--ink-soft)" }}>
            Workshop is open now. Join Shashi for two evenings of guided conversation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <Button variant="default" href="/workshop">
            Join Workshop
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}