import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Heart Space",
  description: "How Heart Space collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-20 px-6" style={{ background: "#F4F1FF" }}>
      <div className="max-w-[720px] mx-auto">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#ffffff", boxShadow: "0 4px 32px rgba(124,92,191,0.08)" }}
        >
          <div
            className="px-10 py-10"
            style={{ background: "linear-gradient(135deg,#7C5CBF,#5E3FA3)" }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-white/70 text-sm">Last Updated: April 2, 2026</p>
          </div>

          <div className="px-10 py-10 space-y-8 text-sm leading-relaxed" style={{ color: "#1A1A2E" }}>
            <p style={{ color: "#6B6B8A" }}>
              Heart Spaces ("we," "our," or "us"), owned and operated by Buntikki, is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, and safeguard your information
              when you visit www.heart-spaces.com.
            </p>

            <Section title="A. Information We Collect">
              <p><strong>Voluntary Information:</strong> We collect your email address (required) and phone number (optional) when you sign up to receive our free e-book, newsletters, or register for a workshop.</p>
              <p><strong>Automated Information:</strong> Like most websites, we collect basic usage data such as IP addresses, browser types, and cookies to improve site performance. This includes data collected via:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Google Analytics 4:</strong> Collects page views, events (e.g. workshop registrations), device and browser information, and approximate location based on IP address.</li>
                <li><strong>Meta Pixel:</strong> Collects browsing behaviour on our site and purchase events (e.g. workshop bookings), which may be used to show you relevant ads on Instagram and Facebook.</li>
                <li><strong>Cookies:</strong> Both tools use cookies to recognise returning visitors and measure the effectiveness of our content and advertising.</li>
              </ul>
              <p className="mt-2"><strong>Payment Data:</strong> For live workshops, payments are processed via Cashfree. We do not store your credit card or UPI details on our servers.</p>
            </Section>

            <Section title="B. How We Use Your Data">
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Deliver the free e-book to your inbox.</li>
                <li>Send you updates, marketing materials, and newsletters (you may opt out at any time).</li>
                <li>Respond to inquiries or provide customer support.</li>
                <li>Measure the performance of our advertising campaigns (e.g. how many people registered after seeing an Instagram ad).</li>
                <li>Retarget visitors on Instagram and Facebook via Meta Pixel to show relevant ads to people who have visited our site.</li>
              </ul>
            </Section>

            <Section title="C. Consent and Data Storage">
              <p>
                By providing your email and/or phone number, you consent to Buntikki processing this data to
                fulfil your request. Your data is stored on secure servers and is never sold to third-party
                data brokers.
              </p>
            </Section>

            <Section title="D. Third-Party Analytics &amp; Advertising Tools">
              <p>We use the following third-party tools. By using our site, you acknowledge that data may be transmitted to these services under their respective privacy policies:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong>Google Analytics 4</strong> — operated by Google LLC. Data is processed on Google&apos;s servers.{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#7C5CBF" }}>Google&apos;s Privacy Policy</a>.
                  You may opt out using the{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "#7C5CBF" }}>Google Analytics Opt-out Browser Add-on</a>.
                </li>
                <li>
                  <strong>Meta Pixel</strong> — operated by Meta Platforms, Inc. Data is processed by Meta and may be used to show you ads on Instagram and Facebook.{" "}
                  <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" style={{ color: "#7C5CBF" }}>Meta&apos;s Privacy Policy</a>.
                  You may manage your ad preferences via{" "}
                  <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" style={{ color: "#7C5CBF" }}>Facebook Ad Preferences</a>.
                </li>
              </ul>
            </Section>

            <Section title="E. Your Rights (DPDP Act Compliance)">
              <p>Under Indian law, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Access &amp; Correct:</strong> Request a copy of your data or ask us to update it.</li>
                <li><strong>Withdraw Consent:</strong> Request that we stop sending you emails or delete your data entirely.</li>
                <li><strong>Grievance Redressal:</strong> If you have concerns, you can contact our Grievance Officer at{" "}
                  <a href="mailto:hello@heart-spaces.com" style={{ color: "#7C5CBF" }}>hello@heart-spaces.com</a>.
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-bold text-base mb-3" style={{ color: "#5E3FA3" }}>{title}</h2>
      <div className="space-y-2" style={{ color: "#1A1A2E" }}>{children}</div>
    </div>
  );
}
