"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface EarlyBirdBannerProps {
  targetDate: string; // ISO UTC date string e.g. "2026-04-25T05:30:00Z"
  price: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function EarlyBirdBanner({ targetDate, price }: EarlyBirdBannerProps) {
  const pathname = usePathname();
  const isWorkshopPage = pathname === "/workshop";
  const target = new Date(targetDate);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!timeLeft) return null;

  const handleCtaClick = (e: React.MouseEvent) => {
    if (isWorkshopPage) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-booking-modal"));
    }
  };

  const units = [
    { val: pad(timeLeft.days), label: "Days" },
    { val: pad(timeLeft.hours), label: "Hrs" },
    { val: pad(timeLeft.minutes), label: "Min" },
    { val: pad(timeLeft.seconds), label: "Sec" },
  ];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-16 flex items-center justify-center gap-5 px-6 max-[900px]:gap-3 max-[900px]:px-4"
      style={{ background: "#1A1A1A" }}
    >
      {/* Label — hidden below 640px */}
      <span className="hidden min-[640px]:flex items-center gap-2 text-white/70 text-sm font-medium whitespace-nowrap">
        <span>⚡</span>
        <span>Early bird price ends in</span>
      </span>

      {/* Countdown blocks */}
      <div className="flex items-center gap-1.5">
        {units.map(({ val, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center rounded-xl w-[54px] py-2"
            style={{ background: "#1C3D2E" }}
          >
            <span className="text-white text-[18px] font-bold leading-none">{val}</span>
            <span
              className="text-[10px] uppercase tracking-wider mt-1"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={isWorkshopPage ? "#" : "/workshop#book"}
        onClick={handleCtaClick}
        className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 group whitespace-nowrap"
        style={{
          background: "#E85D3A",
          boxShadow: "0 2px 12px rgba(232,93,58,0.35)",
        }}
      >
        Lock in ₹{price}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </div>
  );
}
