import { Suspense } from "react";

import ProductsExplorer from "@/components/ProductsExplorer/ProductsExplorer";
import { getCategories, getProducts } from "@/lib/api";

/* =====================================================
   PRODUCTS PAGE SKELETON
===================================================== */

function ProductsPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search skeleton */}

      <div className="overflow-hidden rounded-[28px] border border-[#e7e5df] bg-[#fbfaf7]">
        <div className="flex min-h-[68px] animate-pulse items-center px-6">
          <div className="h-4 w-40 rounded-full bg-[#e8e7e2]" />
        </div>
      </div>

      {/* Categories skeleton */}

      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-[#e8e7e2]"
          />
        ))}
      </div>

      {/* Products skeleton */}

      <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[4/5] animate-pulse rounded-[18px] bg-[#eeeeeb]" />

            <div className="mt-4 h-3 w-20 animate-pulse rounded-full bg-[#e8e7e2]" />

            <div className="mt-2 h-5 w-4/5 animate-pulse rounded-full bg-[#e8e7e2]" />

            <div className="mt-3 h-4 w-16 animate-pulse rounded-full bg-[#eeeeeb]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   PRODUCTS DATA
===================================================== */

async function ProductsData() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* =================================================
          PAGE STATS
      ================================================= */}

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#30383c] px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white">
          {products.length}{" "}
          {products.length === 1 ? "Product" : "Products"}
        </span>

        <span className="rounded-full border border-[#dce3e3] bg-white/70 px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#718086]">
          Free shipping over $50
        </span>
      </div>

      {/* Products Explorer */}

      <ProductsExplorer
        products={products}
        categories={categories}
      />
    </>
  );
}

/* =====================================================
   PRODUCTS PAGE
===================================================== */

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#252c30]">
      {/* =================================================
          PAGE INTRO
      ================================================= */}

      <section className="relative overflow-hidden border-b border-[#e5e5df] bg-[#f8f8f6]">
        {/* Decorative shapes */}

        <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-[#dff4f5]/70 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-[8%] h-80 w-80 rounded-full bg-[#eee6d8]/45 blur-3xl" />

        <div className="pointer-events-none absolute right-[18%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-[#dceceb]/70" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            {/* Eyebrow */}

            <div className="flex items-center gap-3">
              <span className="h-[5px] w-[5px] rounded-full bg-[#56b7c9]" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#718086]">
                LUXORA / Collection
              </p>
            </div>

            {/* Heading */}

            <h1 className="mt-6 text-[50px] font-medium leading-[0.9] tracking-[-0.075em] text-[#252c30] sm:text-[70px] lg:text-[88px]">
              Find something
              <br />
              worth keeping.
            </h1>

            {/* Description */}

            <p className="mt-7 max-w-xl text-[12px] leading-6 text-[#7b898d] sm:text-[13px]">
              Explore the LUXORA collection and discover carefully
              selected essentials made for everyday living.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          PRODUCTS EXPLORER
      ================================================= */}

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-18">
        <Suspense fallback={<ProductsPageSkeleton />}>
          <ProductsData />
        </Suspense>
      </section>
    </main>
  );
}