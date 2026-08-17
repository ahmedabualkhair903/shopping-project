import ProductCard from "@/components/ProductCard/ProductCard";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
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
          Try adjusting your filters or exploring another
          collection.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white">
      {/* =========================
          PRODUCTS GRID
      ========================== */}

      <div className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4 xl:gap-x-10">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="min-w-0 motion-safe:animate-[fadeIn_0.55s_ease-out_both]"
            style={{
              animationDelay: `${Math.min(index, 7) * 55}ms`,
            }}
          >
            <div className="group">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;