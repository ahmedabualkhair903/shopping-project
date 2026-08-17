import Link from "next/link";
import {
  FiArrowUpRight,
  FiInstagram,
  FiMail,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-[#e4e7e5] bg-white text-[#252c30]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[1.8fr_0.8fr_0.8fr_1.15fr] lg:gap-16 lg:py-20">

          {/* ===================================================
              BRAND
          ==================================================== */}

          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-block"
            >
              <div className="text-[38px] font-black leading-[0.85] tracking-[-0.09em] text-[#252c30] transition-colors duration-300 group-hover:text-[#2794aa] sm:text-[44px]">
                LUX<span className="text-[#56b7c9]">O</span>RA
              </div>

              <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.34em] text-[#879397]">
                Everyday essentials
              </p>
            </Link>

            <p className="mt-7 max-w-[330px] text-[13px] leading-6 text-[#7d898d] sm:text-[14px] sm:leading-7">
              Thoughtfully selected essentials designed
              for modern everyday living. Simple pieces,
              timeless style, and things worth keeping.
            </p>

            {/* Small decorative line */}

            <div className="mt-7 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#56b7c9]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a0aaad]">
                LUXORA / 2026
              </span>
            </div>
          </div>

          {/* ===================================================
              SHOP
          ==================================================== */}

          <div>
            <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.24em] text-[#899598]">
              Shop
            </p>

            <div className="flex flex-col items-start gap-4">

              <Link
                href="/products"
                className="group flex items-center gap-2 text-[13px] font-medium text-[#4c585c] transition-colors duration-300 hover:text-[#2794aa]"
              >
                All Products

                <FiArrowUpRight
                  size={12}
                  strokeWidth={1.4}
                  className="translate-y-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                href="/products?sort=new"
                className="group flex items-center gap-2 text-[13px] font-medium text-[#4c585c] transition-colors duration-300 hover:text-[#2794aa]"
              >
                New Arrivals

                <FiArrowUpRight
                  size={12}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                href="/wishlist"
                className="group flex items-center gap-2 text-[13px] font-medium text-[#4c585c] transition-colors duration-300 hover:text-[#2794aa]"
              >
                Wishlist

                <FiArrowUpRight
                  size={12}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>

              <Link
                href="/cart"
                className="group flex items-center gap-2 text-[13px] font-medium text-[#4c585c] transition-colors duration-300 hover:text-[#2794aa]"
              >
                Shopping Bag

                <FiArrowUpRight
                  size={12}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>

            </div>
          </div>

          {/* ===================================================
              ACCOUNT
          ==================================================== */}

          <div>
            <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.24em] text-[#899598]">
              Account
            </p>

            <div className="flex flex-col items-start gap-4">

              <Link
                href="/profile"
                className="text-[13px] font-medium text-[#4c585c] transition-colors duration-300 hover:text-[#2794aa]"
              >
                My Account
              </Link>

              <Link
                href="/orders"
                className="text-[13px] font-medium text-[#4c585c] transition-colors duration-300 hover:text-[#2794aa]"
              >
                My Orders
              </Link>

              <Link
                href="/checkout"
                className="text-[13px] font-medium text-[#4c585c] transition-colors duration-300 hover:text-[#2794aa]"
              >
                Checkout
              </Link>

              <Link
                href="/login"
                className="text-[13px] font-medium text-[#4c585c] transition-colors duration-300 hover:text-[#2794aa]"
              >
                Login
              </Link>

            </div>
          </div>

          {/* ===================================================
              DISCOVER
          ==================================================== */}

          <div>
            <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.24em] text-[#899598]">
              Discover
            </p>

            <p className="max-w-[280px] text-[13px] leading-6 text-[#7d898d]">
              Explore our carefully curated collection
              of everyday pieces made to fit naturally
              into your life.
            </p>

            <Link
              href="/products"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#30383c] px-5 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#2794aa]"
            >
              Explore collection

              <FiArrowUpRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {/* Social / Contact */}

            <div className="mt-7 flex items-center gap-2">

              <button
                type="button"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e1e6e5] text-[#697578] transition-all duration-300 hover:border-[#b6e0e5] hover:bg-[#edfafd] hover:text-[#2794aa]"
              >
                <FiInstagram
                  size={15}
                  strokeWidth={1.4}
                />
              </button>

              <button
                type="button"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e1e6e5] text-[#697578] transition-all duration-300 hover:border-[#b6e0e5] hover:bg-[#edfafd] hover:text-[#2794aa]"
              >
                <FiMail
                  size={15}
                  strokeWidth={1.4}
                />
              </button>

            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div className="border-t border-[#e5e9e8] py-5 sm:py-6">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#929da0]">
              © 2026 LUXORA. All rights reserved.
            </p>

            <div className="flex items-center gap-5">

              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#a0aaad]">
                Free shipping over $50
              </span>

              <span className="hidden h-3 w-px bg-[#dfe4e3] sm:block" />

              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#a0aaad]">
                Designed with simplicity
              </span>

            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}