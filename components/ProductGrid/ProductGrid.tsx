"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/ProductCard/ProductCard";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

const PRODUCTS_PER_BATCH = 12;
const LOADING_DELAY = 1200;

const ProductGrid = ({
  products,
}: ProductGridProps) => {
  const [visibleCount, setVisibleCount] = useState(
    PRODUCTS_PER_BATCH
  );

  const [isLoading, setIsLoading] = useState(false);

  /*
   * Reset visible products whenever
   * the products list changes.
   *
   * This is important for:
   * - Search
   * - Category filters
   * - Sorting
   */
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_BATCH);
    setIsLoading(false);
  }, [products]);

  /*
   * Infinite loading
   *
   * When the user gets close to the bottom
   * of the currently visible products,
   * automatically load the next batch.
   */
  useEffect(() => {
    if (visibleCount >= products.length) {
      setIsLoading(false);
      return;
    }

    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + window.scrollY;

      const pageHeight =
        document.documentElement.scrollHeight;

      /*
       * Start loading when the user is
       * around 500px from the bottom.
       */
      if (
        scrollPosition >= pageHeight - 500 &&
        !isLoading
      ) {
        setIsLoading(true);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [visibleCount, products.length, isLoading]);

  /*
   * Add the next 9 products
   * after the loading animation.
   */
  useEffect(() => {
    if (!isLoading) return;

    const timer = window.setTimeout(() => {
      setVisibleCount((current) =>
        Math.min(
          current + PRODUCTS_PER_BATCH,
          products.length
        )
      );

      setIsLoading(false);
    }, LOADING_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isLoading, products.length]);

  /*
   * No products
   */

  if (products.length === 0) {
    return (
      <section className="border-t border-[#e7e7e4] bg-white py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#e4e4e1]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#56adbf]" />
        </div>

        <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8d9698]">
          LUXORA / Collection
        </p>

        <h2 className="mt-4 text-[28px] font-medium tracking-[-0.05em] text-[#252c30] sm:text-[34px]">
          No products found.
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-[12px] leading-6 text-[#7f898c]">
          Try adjusting your filters or exploring
          another collection.
        </p>
      </section>
    );
  }

  /*
   * Currently visible products
   */

  const visibleProducts = products.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < products.length;

  return (
    <section className="bg-white">
      {/* =========================
          PRODUCTS GRID
      ========================== */}

      <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4 xl:gap-x-10">
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            className="min-w-0 animate-[productReveal_0.55s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{
              animationDelay: `${
                Math.min(index % PRODUCTS_PER_BATCH, 8) *
                55
              }ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* =========================
          INFINITE LOADING
      ========================== */}

      {hasMore && isLoading && (
        <div
          className="flex items-center justify-center py-16"
          aria-label="Loading more products"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-[luxoraDot_1.2s_ease-in-out_infinite] rounded-full bg-[#56adbf]" />

            <span
              className="h-2 w-2 animate-[luxoraDot_1.2s_ease-in-out_0.15s_infinite] rounded-full bg-[#56adbf]"
            />

            <span
              className="h-2 w-2 animate-[luxoraDot_1.2s_ease-in-out_0.3s_infinite] rounded-full bg-[#56adbf]"
            />
          </div>
        </div>
      )}

      {/* =========================
          END OF PRODUCTS
      ========================== */}

      {!hasMore && visibleProducts.length > 0 && (
        <div className="flex flex-col items-center py-16">
          <div className="h-px w-10 bg-[#dfe5e5]" />

          <p className="mt-5 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#a0a8aa]">
            End of collection
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
