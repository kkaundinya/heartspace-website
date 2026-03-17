"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Script from "next/script";

interface WorkshopData {
  id: number;
  name: string;
  regular_price: number;
  discounted_price: number | null;
}

interface RegistrationModalProps {
  workshop: WorkshopData;
  onClose: () => void;
}

interface FormValues {
  full_name: string;
  email: string;
  phone: string;
}

export function RegistrationModal({ workshop, onClose }: RegistrationModalProps) {
  const [step, setStep] = useState<"form" | "processing" | "error">("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [sdkLoaded, setSdkLoaded] = useState(false);

  const priceInRupees = workshop.discounted_price ?? workshop.regular_price;
  const regularPriceInRupees = workshop.regular_price;
  const hasDiscount =
    workshop.discounted_price !== null && workshop.discounted_price < workshop.regular_price;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!sdkLoaded) {
      setErrorMessage("Payment system is loading. Please try again in a moment.");
      setStep("error");
      return;
    }

    setStep("processing");
    setErrorMessage("");

    try {
      // Step 1: Create registration + Cashfree order
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          workshop_id: workshop.id,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Registration failed");
      }

      const { payment_session_id } = await res.json();

      // Step 2: Initiate Cashfree checkout
      if (!window.Cashfree) {
        throw new Error("Payment system not loaded. Please refresh and try again.");
      }

      const cashfree = window.Cashfree({
        mode: (process.env.NEXT_PUBLIC_CASHFREE_ENV === "PROD" || process.env.NEXT_PUBLIC_CASHFREE_ENV === "production") ? "production" : "sandbox",
      });

      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_self",
      });
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setStep("error");
    }
  };

  return (
    <>
      {/* Cashfree SDK */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
        onLoad={() => setSdkLoaded(true)}
      />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(26,26,46,0.75)", backdropFilter: "blur(4px)" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className="relative w-full max-w-[480px] rounded-2xl overflow-hidden"
          style={{ background: "#ffffff", boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}
        >
          {/* Header */}
          <div
            className="px-8 py-7 border-b"
            style={{
              background: "linear-gradient(135deg, #7C5CBF, #5E3FA3)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <h2 className="text-white font-bold text-xl mb-1">Reserve your spot</h2>
            <p className="text-white/70 text-sm">{workshop.name}</p>
          </div>

          {/* Price badge */}
          <div
            className="px-8 py-4 border-b flex items-center justify-between"
            style={{ borderColor: "var(--border)", background: "#FAFAFA" }}
          >
            <span className="text-sm" style={{ color: "var(--ink-soft)" }}>
              Workshop registration
            </span>
            <span className="font-bold text-lg" style={{ color: "var(--purple)" }}>
              {hasDiscount && (
                <span className="line-through opacity-50 font-normal text-base mr-1.5">
                  ₹{regularPriceInRupees}
                </span>
              )}
              ₹{priceInRupees} · All-in
            </span>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            {step === "form" && (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--ink)" }}
                    >
                      Full Name
                    </label>
                    <input
                      {...register("full_name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name is too short" },
                      })}
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                      style={{
                        borderColor: errors.full_name ? "#ef4444" : "var(--border)",
                        color: "var(--ink)",
                      }}
                    />
                    {errors.full_name && (
                      <p className="mt-1 text-xs text-red-500">{errors.full_name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--ink)" }}
                    >
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                      style={{
                        borderColor: errors.email ? "#ef4444" : "var(--border)",
                        color: "var(--ink)",
                      }}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--ink)" }}
                    >
                      WhatsApp / Phone Number
                    </label>
                    <input
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\+?[0-9]{10,13}$/,
                          message: "Enter a valid 10-digit number",
                        },
                      })}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                      style={{
                        borderColor: errors.phone ? "#ef4444" : "var(--border)",
                        color: "var(--ink)",
                      }}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background: "var(--coral)",
                    boxShadow: "0 4px 20px rgba(255,127,92,0.35)",
                  }}
                >
                  Continue to payment ·{" "}
                  {hasDiscount && (
                    <span className="line-through opacity-60 mr-1">₹{regularPriceInRupees}</span>
                  )}
                  ₹{priceInRupees}
                </button>

                <p className="text-center mt-3 text-xs" style={{ color: "var(--ink-faint)" }}>
                  🔒 Secure payment via Cashfree
                </p>
              </form>
            )}

            {step === "processing" && (
              <div className="py-8 text-center">
                <div
                  className="w-12 h-12 rounded-full border-4 border-t-transparent mx-auto mb-4 animate-spin"
                  style={{ borderColor: "var(--purple)", borderTopColor: "transparent" }}
                />
                <p className="font-semibold" style={{ color: "var(--ink)" }}>
                  Setting up your payment...
                </p>
                <p className="text-sm mt-2" style={{ color: "var(--ink-soft)" }}>
                  You'll be redirected to the payment page shortly.
                </p>
              </div>
            )}

            {step === "error" && (
              <div className="py-6 text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <p className="font-semibold mb-2" style={{ color: "var(--ink)" }}>
                  Something went wrong
                </p>
                <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
                  {errorMessage}
                </p>
                <button
                  onClick={() => setStep("form")}
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: "var(--purple)" }}
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
