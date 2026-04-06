import type { Metadata } from "next";
import { sql } from "@/lib/db";
import { verifyCashfreePayment } from "@/lib/cashfree";
import { sendConfirmationEmail } from "@/lib/email";
import { AddToCalendar } from "@/components/AddToCalendar";
import { TrackPurchase, TrackPaymentFailed } from "@/components/analytics/TrackPageEvent";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false },
};

interface PageProps {
  searchParams: Promise<{ order_id?: string }>;
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const orderId = params.order_id;

  if (!orderId) {
    return <InvalidState />;
  }

  let registration = null;
  let workshop: WorkshopDetails | null = null;

  try {
    const rows = await sql`
      SELECT
        r.id, r.full_name, r.email, r.payment_status,
        w.name AS workshop_name, w.date_1, w.date_2, w.session_time, w.zoom_link,
        w.regular_price, w.discounted_price
      FROM registrations r
      JOIN workshops w ON r.workshop_id = w.id
      WHERE r.cashfree_order_id = ${orderId}
      LIMIT 1
    `;
    if (rows.length > 0) {
      const row = rows[0] as {
        id: number;
        full_name: string;
        email: string;
        payment_status: string;
        workshop_name: string;
        date_1: string;
        date_2: string;
        session_time: string;
        zoom_link: string | null;
        regular_price: number;
        discounted_price: number | null;
      };
      registration = row;
      workshop = {
        name: row.workshop_name,
        date_1: row.date_1,
        date_2: row.date_2,
        session_time: row.session_time,
        zoom_link: row.zoom_link,
        price: row.discounted_price ?? row.regular_price,
      };
    }
  } catch (e) {
    console.error("DB error on thank-you page:", e);
  }

  if (!registration || !workshop) {
    return <InvalidState />;
  }

  const { payment_status, full_name } = registration;
  const firstName = full_name.split(" ")[0];

  if (payment_status === "success") {
    return (
      <>
        <TrackPurchase orderId={orderId} amount={workshop.price} />
        <SuccessState firstName={firstName} email={registration.email} workshop={workshop} />
      </>
    );
  }

  if (payment_status === "failed") {
    return (
      <>
        <TrackPaymentFailed orderId={orderId} />
        <FailedState />
      </>
    );
  }

  // For pending status, check actual payment status from Cashfree
  if (payment_status === "pending") {
    try {
      const cashfreeStatus = await verifyCashfreePayment(orderId);
      if (cashfreeStatus.order_status === "PAID") {
        // Update DB and send email (webhook may be delayed or already fired)
        const updated = await sql`
          UPDATE registrations SET payment_status = 'success', updated_at = NOW()
          WHERE cashfree_order_id = ${orderId} AND payment_status != 'success'
          RETURNING id
        `;
        // Only send email if this is the first time we're marking success
        if (updated.length > 0) {
          await sendConfirmationEmail({ to: registration.email, name: registration.full_name, workshop }).catch(() => { });
        }
        return <SuccessState firstName={firstName} email={registration.email} workshop={workshop} />;
      }
      if (cashfreeStatus.order_status === "FAILED" || cashfreeStatus.order_status === "ACTIVE") {
        // ACTIVE = no payment attempted (user clicked back)
        return <FailedState />;
      }
    } catch {
      // Cashfree verification failed — show processing as fallback
    }
  }

  return <ProcessingState orderId={orderId} />;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

interface WorkshopDetails {
  name: string;
  date_1: string;
  date_2: string;
  session_time: string;
  zoom_link: string | null;
  price: number;
}

function SuccessState({
  firstName,
  email,
  workshop,
}: {
  firstName: string;
  email: string;
  workshop: WorkshopDetails;
}) {
  const date1 = formatDate(workshop.date_1);
  const date2 = formatDate(workshop.date_2);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24" style={{ background: "#F4F1FF" }}>
      <div
        className="w-full max-w-[600px] rounded-2xl overflow-hidden"
        style={{ background: "#ffffff", boxShadow: "0 4px 32px rgba(124,92,191,0.12)" }}
      >
        {/* Header */}
        <div
          className="px-8 py-10 text-center"
          style={{ background: "linear-gradient(135deg,#7C5CBF,#5E3FA3)" }}
        >
          <div className="text-5xl mb-3">❤️</div>
          <h1 className="text-2xl font-bold text-white mb-2">You're in!</h1>
          <p className="text-white/80 text-sm">{workshop.name}</p>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <p className="text-base mb-6" style={{ color: "#1A1A2E" }}>
            Hi {firstName}, your spot is confirmed. A confirmation email has been sent to{" "}
            <strong>{email}</strong>.
          </p>

          {/* Session details */}
          <div className="rounded-xl p-6 mb-6" style={{ background: "#F4F1FF" }}>
            <h2 className="font-bold text-sm mb-4" style={{ color: "#5E3FA3" }}>
              YOUR SESSION DETAILS
            </h2>
            <div className="space-y-3 text-sm" style={{ color: "#1A1A2E" }}>
              <div className="flex gap-3">
                <span>📅</span>
                <span><strong>Session 1:</strong> {date1}</span>
              </div>
              <div className="flex gap-3">
                <span>📅</span>
                <span><strong>Session 2:</strong> {date2}</span>
              </div>
              <div className="flex gap-3">
                <span>⏱️</span>
                <span><strong>Time:</strong> {workshop.session_time} both days</span>
              </div>
              <div className="flex gap-3">
                <span>💻</span>
                <span><strong>Platform:</strong> Zoom (live, small group)</span>
              </div>
            </div>
          </div>

          {/* Zoom link or coming soon */}
          {workshop.zoom_link ? (
            <div className="rounded-xl p-5 mb-6" style={{ background: "#E8F8F2" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "#1a5c3a" }}>ZOOM LINK</h3>
              <a
                href={workshop.zoom_link}
                className="text-sm break-all"
                style={{ color: "#7C5CBF" }}
              >
                {workshop.zoom_link}
              </a>
              <p className="text-xs mt-2" style={{ color: "#6B6B8A" }}>
                Use the same link for both sessions.
              </p>
            </div>
          ) : (
            <div
              className="rounded-xl p-5 mb-6"
              style={{ background: "#FFF0E8", borderLeft: "4px solid #FF7F5C" }}
            >
              <p className="text-sm" style={{ color: "#1A1A2E" }}>
                📧 Your Zoom link will be emailed to you <strong>24 hours before Session 1</strong>.
              </p>
            </div>
          )}

          {/* Add to calendar */}
          <AddToCalendar workshop={workshop} />

          {/* Next steps */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(124,92,191,0.15)" }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: "#1A1A2E" }}>WHAT'S NEXT</h3>
            <ul className="text-sm space-y-2" style={{ color: "#6B6B8A" }}>
              <li>• You'll receive the RELATE Workbook 48 hours before Session 1</li>
              <li>• Both sessions are 60 minutes each, live on Zoom</li>
              <li>• The RELATE Manual and full recording will be sent after Session 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function FailedState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-[480px] text-center">
        <div className="text-5xl mb-4">😔</div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
          Payment unsuccessful
        </h1>
        <p className="text-base mb-8" style={{ color: "#6B6B8A" }}>
          Your payment was not completed. You have not been charged. Please try again.
        </p>
        <a
          href="/workshop#book"
          className="inline-block px-8 py-3 rounded-full font-semibold text-white text-sm"
          style={{ background: "#7C5CBF" }}
        >
          Try Again
        </a>
        <p className="text-xs mt-4" style={{ color: "#6B6B8A" }}>
          If you were charged, please email us and we will refund you promptly.
        </p>
      </div>
    </div>
  );
}

function ProcessingState({ orderId }: { orderId: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-[480px] text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
          Payment processing
        </h1>
        <p className="text-base mb-4" style={{ color: "#6B6B8A" }}>
          Your payment is being confirmed. This usually takes a few seconds. Please refresh this
          page in a moment.
        </p>
        <p className="text-xs" style={{ color: "#6B6B8A" }}>
          Order ID: {orderId}
        </p>
        <a
          href={`/thank-you?order_id=${orderId}`}
          className="inline-block mt-6 px-8 py-3 rounded-full font-semibold text-white text-sm"
          style={{ background: "#7C5CBF" }}
        >
          Refresh Status
        </a>
      </div>
    </div>
  );
}

function InvalidState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-[480px] text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
          Page not found
        </h1>
        <p className="text-base mb-8" style={{ color: "#6B6B8A" }}>
          We couldn't find your booking. If you completed a payment, please check your email for
          confirmation.
        </p>
        <a
          href="/workshop"
          className="inline-block px-8 py-3 rounded-full font-semibold text-white text-sm"
          style={{ background: "#7C5CBF" }}
        >
          View Workshop
        </a>
      </div>
    </div>
  );
}
