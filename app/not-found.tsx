import Link from "next/link";
import {
  FiArrowLeft,
  FiHome,
  FiSearch,
} from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] bg-[#f8f8f6] text-[#252c30]">
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-5 py-16 sm:px-8 lg:px-10">
        {/* =====================================================
            DECORATIVE BACKGROUND
        ====================================================== */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d7f1f2]/70 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#eee4d4]/50 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(48,56,60,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(48,56,60,0.025) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="relative z-10 w-full max-w-xl text-center">
          {/* Icon */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#e5e9e8] bg-white text-[#2794aa] shadow-[0_15px_45px_rgba(37,44,48,0.06)]">
            <FiSearch
              size={30}
              strokeWidth={1.25}
            />
          </div>

          {/* Label */}

          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#56b7c9]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#7d888b]">
              LUXORA / 404
            </p>
          </div>

          {/* Heading */}

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.055em] text-[#252c30] sm:text-5xl">
            Page not found.
          </h1>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-md text-[13px] leading-7 text-[#727d80]">
            The page you&apos;re looking for doesn&apos;t exist,
            may have been moved, or is no longer available.
          </p>

          {/* Accent */}

          <div className="mx-auto mt-7 h-px w-16 bg-[#aee8f2]" />

          {/* Actions */}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#252c30] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2794aa] hover:shadow-[0_10px_25px_rgba(39,148,170,0.16)] sm:w-auto"
            >
              <FiHome
                size={13}
                strokeWidth={1.5}
              />

              Back Home
            </Link>

            <Link
              href="/products"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#dfe3df] bg-white px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#697477] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a8dce3] hover:bg-[#eef9fa] hover:text-[#2794aa] sm:w-auto"
            >
              Browse Collection

              <FiArrowLeft
                size={13}
                strokeWidth={1.5}
                className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Status */}

          <div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-2 rounded-full border border-[#eceeea] bg-white/70 px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#56b7c9]" />

            <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#9aa3a5]">
              Nothing to see here
            </p>
          </div>

          {/* Brand */}

          <p className="mt-8 text-[8px] font-medium uppercase tracking-[0.2em] text-[#a0a8aa]">
            LUXORA essentials
          </p>
        </div>
      </section>
    </main>
  );
}