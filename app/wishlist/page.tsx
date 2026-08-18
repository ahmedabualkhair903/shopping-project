"use client";


import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiHeart,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (
    product: (typeof wishlist)[number]
  ) => {
    addToCart(product);
  };

  /* =====================================================
     EMPTY WISHLIST
  ===================================================== */

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#f8fbfb] text-[#20282b]">
        <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-5 py-16 sm:px-8">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#dff6f8] blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#f1e8dc] blur-3xl" />

          <div className="relative w-full max-w-[520px] text-center">
            {/* Icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#d8e8e9] bg-white shadow-[0_20px_60px_rgba(50,80,85,0.08)]">
              <FiHeart
                size={32}
                strokeWidth={1.2}
                className="text-[#58b8c6]"
              />
            </div>

            <p className="mt-9 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#6f8589]">
              LUXORA / Saved Items
            </p>

            <h1 className="mt-4 text-[42px] font-medium leading-[0.95] tracking-[-0.065em] text-[#20282b] sm:text-[56px]">
              Your wishlist is empty.
            </h1>

            <p className="mx-auto mt-6 max-w-[400px] text-[12px] leading-6 text-[#7c898d]">
              Save the pieces you love and come back whenever
              you&apos;re ready to make them yours.
            </p>

            <Link
              href="/products"
              className="group mx-auto mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-[#293337] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(41,51,55,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#58b8c6] hover:shadow-[0_15px_32px_rgba(88,184,198,0.22)]"
            >
              Explore collection

              <FiArrowRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fbfb] text-[#20282b]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-[#dfe9e9] bg-[#f8fbfb]">
        {/* Decorative Shapes */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#dff6f8] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-[8%] h-80 w-80 rounded-full bg-[#f1e8dc] blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          {/* Back */}

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7a898d] transition-colors hover:text-[#58aebb]"
          >
            <FiArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Continue shopping
          </Link>

          {/* Heading */}

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[5px] w-[5px] rounded-full bg-[#58b8c6]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#718286]">
                  LUXORA / Saved Items
                </p>
              </div>

              <h1 className="mt-5 text-[46px] font-medium leading-[0.9] tracking-[-0.07em] text-[#20282b] sm:text-[62px] lg:text-[76px]">
                My Wishlist.
              </h1>

              <p className="mt-5 text-[11px] text-[#7c898d]">
                {wishlist.length}{" "}
                {wishlist.length === 1 ? "item" : "items"} saved
                for later.
              </p>
            </div>

            {/* Wishlist Count */}

            <div className="flex items-center gap-5 lg:pb-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d7e8e9] bg-white">
                <FiHeart
                  size={20}
                  strokeWidth={1.3}
                  className="text-[#58b8c6]"
                />
              </div>

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9aa5a8]">
                  Saved
                </p>

                <p className="mt-1 text-xl font-medium tracking-[-0.04em] text-[#293337]">
                  {wishlist.length}
                </p>
              </div>
            </div>
          </div>

          {/* Header Bottom */}

          <div className="mt-10 flex flex-col gap-4 border-t border-[#dfe9e9] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#68787c]">
                Your selection
              </span>

              <span className="h-[3px] w-[3px] rounded-full bg-[#58b8c6]" />

              <span className="text-[9px] text-[#9aa5a8]">
                Curated just for you
              </span>
            </div>

            <button
              type="button"
              onClick={clearWishlist}
              className="group inline-flex w-fit items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#899699] transition-colors hover:text-[#c66b6b]"
            >
              <FiTrash2
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:scale-95"
              />

              Clear wishlist
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-18">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6e7e82]">
              Saved collection
            </p>

            <p className="mt-1.5 text-[10px] text-[#9aa5a8]">
              Products you&apos;ve chosen to keep close.
            </p>
          </div>

          <span className="rounded-full border border-[#d8e8e9] bg-[#eaf8fa] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#4c929e]">
            {wishlist.length}{" "}
            {wishlist.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <article
              key={product.id}
              className="group min-w-0"
            >
              {/* =================================================
                  Product Image
              ================================================== */}

              <div className="relative aspect-[0.92] overflow-hidden border border-[#dfe7e7] bg-[#f1f6f6]">
                <Link
                  href={`/products/${product.id}`}
                  aria-label={`View ${product.title}`}
                  className="block h-full w-full"
                >
                  <div className="flex h-full w-full items-center justify-center p-8 sm:p-10">
               <img
                 src={product.image}
                 alt={product.title}
                 className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                 />
                  </div>
                </Link>

                {/* Soft Overlay */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#dceff0]/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Remove */}

                <button
                  type="button"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                  aria-label={`Remove ${product.title} from wishlist`}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#dbe5e6] bg-white/95 text-[#6e7c80] shadow-sm transition-all hover:border-[#efcaca] hover:bg-[#fff8f8] hover:text-[#c66b6b] focus:outline-none focus:ring-2 focus:ring-[#58b8c6] focus:ring-offset-2"
                >
                  <FiTrash2
                    size={14}
                    strokeWidth={1.4}
                  />
                </button>

                {/* Saved Label */}

                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white px-3 py-2 shadow-sm">
                  <FiHeart
                    size={12}
                    strokeWidth={1.4}
                    className="fill-current text-[#58b8c6]"
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#293337]">
                    Saved
                  </span>
                </div>
              </div>

              {/* =================================================
                  Product Info
              ================================================== */}

              <div className="pt-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#98a4a7]">
                    {product.category}
                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#98a4a7] transition-colors hover:text-[#58aebb]"
                  >
                    View
                  </Link>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  className="mt-2 block"
                >
                  <h2 className="line-clamp-2 min-h-[3rem] text-sm font-medium leading-6 text-[#20282b] transition-colors hover:text-[#58aebb]">
                    {product.title}
                  </h2>
                </Link>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="text-base font-semibold tracking-[-0.02em] text-[#20282b]">
                    ${product.price.toFixed(2)}
                  </p>

                  <span className="text-[9px] uppercase tracking-[0.12em] text-[#9aa5a8]">
                    Saved
                  </span>
                </div>

                {/* Add To Cart */}

                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                  className="group/button mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#293337] px-4 text-[9px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_8px_20px_rgba(41,51,55,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#58b8c6] hover:shadow-[0_12px_25px_rgba(88,184,198,0.2)] focus:outline-none focus:ring-2 focus:ring-[#58b8c6] focus:ring-offset-2"
                >
                  <FiShoppingBag
                    size={15}
                    strokeWidth={1.4}
                  />

                  Add to cart

                  <FiArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover/button:translate-x-1"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="border-t border-[#dfe9e9] bg-[#f1e8dc]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-10 sm:px-8 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8b8175]">
              Keep exploring
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-[#293337]">
              Find your next favorite piece.
            </h2>
          </div>

          <Link
            href="/products"
            className="group inline-flex h-11 w-fit items-center gap-3 rounded-full bg-[#293337] px-6 text-[9px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#58b8c6]"
          >
            Browse products

            <FiArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}