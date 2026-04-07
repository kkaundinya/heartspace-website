import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center max-w-[480px]">
        <p
          className="text-[80px] font-bold leading-none mb-4"
          style={{ color: "var(--lavender)" }}
        >
          404
        </p>
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: "var(--ink)" }}
        >
          This page doesn&apos;t exist.
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--ink-soft)" }}>
          But the conversations that matter still do. Head back and find what
          you&apos;re looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: "var(--purple)" }}
          >
            Go home
          </Link>
          <Link
            href="/workshop"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold"
            style={{ border: "1.5px solid var(--border)", color: "var(--ink)" }}
          >
            View workshop
          </Link>
        </div>
      </div>
    </div>
  );
}
