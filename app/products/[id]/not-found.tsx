"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";

type ProductsErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ProductsError({
  error,
  reset,
}: ProductsErrorProps) {
  useEffect(() => {
    console.error("Products page error:", error);
  }, [error]);

  return (
    <main className="min-h-[75vh] bg-white text-[#252c30]">
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-5 py-16 sm:px-8 lg:px-10">
        {/* =========================
            DECORATIVE BACKGROUND
        ========================== */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d7f1f2]/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#eee4d4]/50 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(48,56,60,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(48,56,60,0.025) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* =========================
            CONTENT
        ========================== */}
        <div className="relative z-10 w-full max-w-xl text-center">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/80 bg-white/80 text-[#b27a58] shadow-[0_15px_45px_rgba(178,122,88,0.08)] backdrop-blur-md">
            <FiAlertCircle
              size={30}
              strokeWidth={1.25}
            />
          </div>

          {/* Label */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d39a72]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#7d888b]">
              LUXORA / Shop
            </p>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-4xl font-medium tracking-[-0.055em] text-[#252c30] sm:text-5xl">
            We couldn&apos;t load the products.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-md text-[13px] leading-7 text-[#727d80]">
            Something interrupted the connection to our product
            service. Please try again, or return to the shop and
            continue browsing.
          </p>

          {/* Accent */}
          <div className="mx-auto mt-7 h-px w-16 bg-[#e1c2ac]" />

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#252c30] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2794aa] hover:shadow-[0_10px_25px_rgba(39,148,170,0.16)] sm:w-auto"
            >
              <FiRefreshCw
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:rotate-180"
              />

              Try again
            </button>

            <Link
              href="/"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#dfe3df] bg-white/80 px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#697477] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a8dce3] hover:bg-[#eef9fa] hover:text-[#2794aa] sm:w-auto"
            >
              <FiArrowLeft
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back home
            </Link>
          </div>

          {/* Status hint */}
          <div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-2 rounded-full border border-[#eceeea] bg-[#fbfcfb] px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d39a72]" />

            <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#9aa3a5]">
              Product service temporarily unavailable
            </p>
          </div>

          {/* Bottom label */}
          <p className="mt-8 text-[8px] font-medium uppercase tracking-[0.2em] text-[#a0a8aa]">
            LUXORA essentials
          </p>
        </div>
      </section>
    </main>
  );
}