
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiCheck,
  FiStar,
  FiTruck,
} from "react-icons/fi";

import { getProduct } from "@/lib/api";
import ProductActions from "@/components/ProductActions/ProductActions";
import ProductWishlistButton from "@/components/ProductWishlistButton/ProductWishlistButton";
import ReviewSection from "@/components/Reviews/ReviewSection";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[#252c30]">
      {/* =========================
          BACK NAVIGATION
      ========================== */}
      <div className="border-b border-[#ecebe6] bg-[#fbfaf7]">
        <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7c8587] transition-colors duration-300 hover:text-[#2794aa]"
          >
            <FiArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to shop
          </Link>
        </div>
      </div>

      {/* =========================
          PRODUCT SECTION
      ========================== */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-24">
          {/* =========================
              PRODUCT IMAGE
          ========================== */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#f4f7f5]">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d7f1f2]/70 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#eee4d4]/55 blur-3xl" />

            {/* Subtle Grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(48,56,60,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(48,56,60,0.025) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            {/* Top Label */}
            <div className="absolute left-5 top-5 z-20">
              <span className="rounded-full border border-white/80 bg-white/80 px-3.5 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#527d84] shadow-sm backdrop-blur-md">
                New arrival
              </span>
            </div>

            {/* Wishlist */}
            <div className="absolute right-5 top-5 z-20">
              <ProductWishlistButton product={product} />
            </div>

            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-14 lg:p-16">
             <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-8 sm:p-12 lg:p-16 drop-shadow-[0_18px_30px_rgba(35,48,50,0.08)] transition-transform duration-700 hover:scale-[1.035]"
              />
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
              <span className="rounded-full bg-white/75 px-3 py-2 text-[8px] font-medium uppercase tracking-[0.16em] text-[#6c7779] backdrop-blur-md">
                LUXORA essentials
              </span>

              <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#899294]">
                Product {product.id}
              </span>
            </div>
          </div>

          {/* =========================
              PRODUCT INFORMATION
          ========================== */}
          <div className="flex flex-col justify-center lg:max-w-[550px]">
            {/* Category */}
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#56b7c9]" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#7d888b]">
                LUXORA / {product.category}
              </p>
            </div>

            {/* Title */}
            <h1 className="mt-5 max-w-[600px] text-[38px] font-medium leading-[0.98] tracking-[-0.055em] text-[#252c30] sm:text-[48px] lg:text-[56px]">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-[#f7f3eb] px-3.5 py-2">
                <FiStar
                  size={13}
                  className="fill-[#98754d] text-[#98754d]"
                  strokeWidth={1.3}
                />

                <span className="text-[10px] font-semibold text-[#806a4d]">
                  {product.rating.rate.toFixed(1)}
                </span>
              </div>

              <span className="text-[10px] text-[#8b9597]">
                {product.rating.count} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-[25px] font-semibold tracking-[-0.03em] text-[#2794aa]">
                ${product.price.toFixed(2)}
              </span>

              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#9aa2a4]">
                USD
              </span>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-[#e7e6e1]" />

            {/* Description */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#687376]">
                About this product
              </p>

              <p className="mt-4 max-w-[510px] text-[13px] leading-7 text-[#697477]">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8">
              <ProductActions product={product} />
            </div>

            {/* Benefits */}
            <div className="mt-10 grid gap-3 border-t border-[#e7e6e1] pt-7 sm:grid-cols-2">
              {/* Delivery */}
              <div className="rounded-2xl bg-[#f3f8f7] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#2794aa]">
                    <FiTruck
                      size={16}
                      strokeWidth={1.35}
                    />
                  </span>

                  <div>
                    <p className="text-[10px] font-semibold text-[#30383c]">
                      Free delivery
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#7d888b]">
                      On orders over $50
                    </p>
                  </div>
                </div>
              </div>

              {/* Secure Checkout */}
              <div className="rounded-2xl bg-[#faf6ef] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#98754d]">
                    <FiCheck
                      size={16}
                      strokeWidth={1.35}
                    />
                  </span>

                  <div>
                    <p className="text-[10px] font-semibold text-[#30383c]">
                      Secure checkout
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#7d888b]">
                      Safe and trusted payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            REVIEWS
        ========================== */}
        <div className="mt-20 border-t border-[#e7e6e1] pt-14 sm:mt-28 sm:pt-20">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#899294]">
                Customer feedback
              </p>

              <div className="mt-2 flex items-center gap-4">
                <h2 className="text-[28px] font-medium tracking-[-0.045em] text-[#252c30] sm:text-[34px]">
                  Reviews
                </h2>

                <span className="hidden text-[10px] text-[#9aa2a4] sm:block">
                  {product.rating.count} customer reviews
                </span>
              </div>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3f8f7] text-[#2794aa]">
              <FiStar
                size={17}
                className="fill-current"
                strokeWidth={1.2}
              />
            </div>
          </div>

          <ReviewSection productId={product.id} />
        </div>
      </section>
    </main>
  );
}

