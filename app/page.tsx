import Hero from "@/components/Hero/Hero";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      {/* =========================
          HERO
      ========================== */}
      <Hero />

      {/* =========================
          PRODUCTS
      ========================== */}
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="mb-8 flex items-center justify-between border-y border-black/[0.09] py-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
              Featured products
            </span>

            <span className="text-[9px] text-black/35">
              {products.length}
            </span>
          </div>

          <a
            href="/products"
            className="text-[9px] font-medium uppercase tracking-[0.2em] text-black/45 transition-colors duration-300 hover:text-[#73D8E8]"
          >
            View all
          </a>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}