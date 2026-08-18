import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <div className="relative h-[calc(100vw*0.72)] min-h-[420px] max-h-[560px] overflow-hidden rounded-[3px] bg-[#e9eef0] sm:h-[640px] sm:min-h-0 sm:max-h-none lg:h-[700px]">
          {/* Hero Image */}
          <Image
            src="/images/luxora-hero.jpg"
            alt="LUXORA fashion collection"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1440px"
            className="object-cover object-center"
          />

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-6 sm:p-10 lg:p-14">
              <div className="max-w-[570px]">
                {/* Eyebrow */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#aee8f2]" />

                  <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/80">
                    LUXORA / New Collection
                  </p>
                </div>

                {/* Heading */}
                <h1 className="text-5xl font-semibold leading-[0.92] tracking-[-0.065em] text-white sm:text-6xl md:text-7xl lg:text-[86px]">
                  Elevate
                  <span className="block text-[#aee8f2]">
                    the everyday.
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-5 max-w-[390px] text-[13px] leading-6 text-white/80 sm:text-sm">
                  Discover effortless style and carefully selected
                  essentials designed for the way you live.
                </p>

                {/* CTA */}
                <Link
                  href="/products"
                  className="group mt-7 inline-flex items-center gap-4 rounded-full bg-white px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#293236] transition-all duration-300 hover:bg-[#aee8f2] hover:text-[#1f3338]"
                >
                  Shop collection

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef2f3] transition-colors duration-300 group-hover:bg-white/70">
                    <FiArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Small Label */}
          <div className="absolute right-6 top-6 hidden sm:block lg:right-10 lg:top-10">
            <div className="flex items-center gap-3 text-[8px] font-medium uppercase tracking-[0.22em] text-white/70">
              <span className="h-px w-7 bg-white/50" />
              Everyday essentials
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-7 right-6 hidden md:block lg:bottom-10 lg:right-10">
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-[7px] font-medium uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
                Discover
              </span>

              <span className="h-10 w-px bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}