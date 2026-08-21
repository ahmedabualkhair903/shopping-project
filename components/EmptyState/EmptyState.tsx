"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { FiArrowRight } from "react-icons/fi";

type EmptyStateProps = {
  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  variant?: "empty" | "error";
};

export default function EmptyState({
  icon: Icon,
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  variant = "empty",
}: EmptyStateProps) {
  const isError = variant === "error";

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-5 py-20 sm:px-8 lg:px-10">
      {/* Decorative Background */}

      <div
        className={`pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full blur-3xl ${
          isError
            ? "bg-[#f5e2e2]/60"
            : "bg-[#dff4f5]/60"
        }`}
      />

      <div
        className={`pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full blur-3xl ${
          isError
            ? "bg-[#eee1d8]/45"
            : "bg-[#eee6d8]/45"
        }`}
      />

      <div className="relative w-full max-w-[560px] text-center">
        {/* Icon */}

        <div
          className={`relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border bg-white shadow-[0_18px_50px_rgba(48,56,60,0.06)] ${
            isError
              ? "border-[#eadada]"
              : "border-[#dce8e8]"
          }`}
        >
          <Icon
            size={30}
            strokeWidth={1.2}
            className={
              isError
                ? "text-[#c87878]"
                : "text-[#56adbf]"
            }
          />

          <span
            className={`absolute right-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white ${
              isError
                ? "bg-[#e39a9a]"
                : "bg-[#73d8e8]"
            }`}
          />
        </div>

        {/* Eyebrow */}

        <p
          className={`mt-9 text-[8px] font-semibold uppercase tracking-[0.3em] ${
            isError
              ? "text-[#8d7777]"
              : "text-[#718086]"
          }`}
        >
          {eyebrow}
        </p>

        {/* Title */}

        <h1 className="mt-4 text-[42px] font-medium leading-[0.95] tracking-[-0.065em] text-[#252c30] sm:text-[58px]">
          {title}
        </h1>

        {/* Description */}

        <p className="mx-auto mt-6 max-w-[420px] text-[12px] leading-6 text-[#7a878b]">
          {description}
        </p>

        {/* Action */}

        {actionLabel &&
          (actionHref ? (
            <Link
              href={actionHref}
              className={`group mx-auto mt-9 inline-flex h-12 items-center gap-3 rounded-full px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(48,56,60,0.12)] transition-all duration-300 hover:-translate-y-0.5 ${
                isError
                  ? "bg-[#30383c] hover:bg-[#c87878] hover:shadow-[0_15px_32px_rgba(200,120,120,0.2)]"
                  : "bg-[#30383c] hover:bg-[#56adbf] hover:shadow-[0_15px_32px_rgba(86,173,191,0.2)]"
              }`}
            >
              {actionLabel}

              <FiArrowRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          ) : onAction ? (
            <button
              type="button"
              onClick={onAction}
              className={`group mx-auto mt-9 inline-flex h-12 items-center gap-3 rounded-full px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(48,56,60,0.12)] transition-all duration-300 hover:-translate-y-0.5 ${
                isError
                  ? "bg-[#30383c] hover:bg-[#c87878] hover:shadow-[0_15px_32px_rgba(200,120,120,0.2)]"
                  : "bg-[#30383c] hover:bg-[#56adbf] hover:shadow-[0_15px_32px_rgba(86,173,191,0.2)]"
              }`}
            >
              {actionLabel}

              <FiArrowRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          ) : null)}
      </div>
    </section>
  );
}