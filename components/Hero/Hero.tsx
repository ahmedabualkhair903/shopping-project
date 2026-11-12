import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiCheck,
  FiTruck,
} from "react-icons/fi";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <div className="group relative min-h-[540px] overflow-hidden rounded-[18px] bg-[#dfe6e8] sm:h-[610px] sm:min-h-0 lg:h-[680px]">

          {/* =========================
              HERO IMAGE
          ========================== */}

          <Image
            src="/images/luxora-hero.jpg"
            alt="LUXORA fashion collection"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1440px"
            className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
          />

          {/* =========================
              MAIN OVERLAY
          ========================== */}

          <div className="absolute inset-0 bg-gradient-to-r from-[#11191c]/70 via-[#182124]/35 to-transparent" />

          {/* Mobile overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#11191c]/55 via-transparent to-transparent sm:hidden" />

          {/* Bottom fade */}

          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* =========================
              TOP LABEL
          ========================== */}

          <div className="absolute left-6 top-6 sm:left-10 sm:top-10 lg:left-12 lg:top-12">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#aee8f2] sm:w-9" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-white/80">
                LUXORA / 2026
              </p>
            </div>
          </div>

          {/* =========================
              TOP RIGHT BADGE
          ========================== */}

          <div className="absolute right-6 top-6 sm:right-10 sm:top-10 lg:right-12 lg:top-12">
            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#aee8f2]" />

                <span className="text-[7px] font-semibold uppercase tracking-[0.2em] text-white/85">
                  Everyday essentials
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              HERO CONTENT
          ========================== */}

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 pb-8 sm:px-10 sm:pb-11 lg:px-14 lg:pb-14">

              <div className="max-w-[650px]">

                {/* Eyebrow */}

                <div className="mb-4 flex items-center gap-3 sm:mb-5">
                  <span className="h-px w-8 bg-[#aee8f2]" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/70">
                    Curated for everyday
                  </p>
                </div>

                {/* Heading */}

                <h1 className="max-w-[620px] text-[52px] font-semibold leading-[0.88] tracking-[-0.065em] text-white sm:text-[70px] md:text-[78px] lg:text-[86px]">
                  Elevate
                  <span className="block text-[#aee8f2]">
                    the everyday.
                  </span>
                </h1>

                {/* Description */}

                <p className="mt-5 max-w-[430px] text-[12px] leading-[1.8] text-white/75 sm:mt-6 sm:text-[13px]">
                  Discover effortless style and carefully selected
                  essentials designed for the way you live.
                </p>

                {/* =========================
                    CTA BUTTONS
                ========================== */}

                <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">

                  {/* Shop */}

                  <Link
                    href="/products"
                    className="group/button inline-flex items-center gap-4 rounded-full bg-white px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#293236] transition-all duration-300 hover:bg-[#aee8f2] hover:text-[#1f3338] sm:px-6"
                  >
                    Shop collection

                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef2f3] transition-all duration-300 group-hover/button:bg-white/70">
                      <FiArrowUpRight
                        size={13}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                      />
                    </span>
                  </Link>

                  {/* New Arrivals */}

                  <Link
                    href="/products?sort=new"
                    className="group/button inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:px-6"
                  >
                    New arrivals

                    <FiArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                    />
                  </Link>
                </div>

                {/* =========================
                    TRUST POINTS
                ========================== */}

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8 sm:gap-x-6">

                  <div className="flex items-center gap-2 text-white/65">
                    <FiTruck
                      size={13}
                      strokeWidth={1.35}
                    />

                    <span className="text-[8px] font-medium uppercase tracking-[0.12em]">
                      Free shipping
                    </span>
                  </div>

                  <span className="hidden h-3 w-px bg-white/20 sm:block" />

                  <div className="flex items-center gap-2 text-white/65">
                    <FiCheck
                      size={13}
                      strokeWidth={1.35}
                    />

                    <span className="text-[8px] font-medium uppercase tracking-[0.12em]">
                      Easy returns
                    </span>
                  </div>

                  <span className="hidden h-3 w-px bg-white/20 sm:block" />

                  <div className="flex items-center gap-2 text-white/65">
                    <FiCheck
                      size={13}
                      strokeWidth={1.35}
                    />

                    <span className="text-[8px] font-medium uppercase tracking-[0.12em]">
                      Secure checkout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              DESKTOP DISCOVER INDICATOR
          ========================== */}

          <div className="absolute bottom-9 right-7 hidden md:block lg:bottom-11 lg:right-12">
            <div className="flex flex-col items-center gap-2.5 text-white/55">

              <span className="text-[7px] font-medium uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
                Discover
              </span>

              <span className="relative h-12 w-px overflow-hidden bg-white/25">
                <span className="absolute left-0 top-0 h-5 w-px bg-[#aee8f2] animate-pulse" />
              </span>
            </div>
          </div>

          {/* =========================
              SMALL CORNER MARK
          ========================== */}

          <div className="absolute bottom-6 right-6 hidden sm:block lg:bottom-10 lg:right-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
              <span className="text-[8px] font-semibold tracking-[0.12em] text-white/60">
                LX
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}