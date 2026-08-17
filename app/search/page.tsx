"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiHeart,
  FiSearch,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

import { getProducts } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/product";

const popularSearches = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function SearchPage() {
  const { addToCart } = useCart();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /* =========================
     READ SEARCH QUERY
  ========================== */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    setSearch(params.get("q") || "");
  }, []);

  /* =========================
     LOAD PRODUCTS
  ========================== */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* =========================
     FILTER PRODUCTS
  ========================== */

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return products.filter((product) => {
      const title =
        product.title.toLowerCase();

      const category =
        product.category.toLowerCase();

      const description =
        product.description?.toLowerCase() || "";

      return (
        title.includes(query) ||
        category.includes(query) ||
        description.includes(query)
      );
    });
  }, [products, search]);

  /* =========================
     SEARCH
  ========================== */

  const handleSearch = (value: string) => {
    setSearch(value);

    const query = value.trim();

    const url = query
      ? `/search?q=${encodeURIComponent(query)}`
      : "/search";

    window.history.replaceState(
      null,
      "",
      url
    );
  };

  const clearSearch = () => {
    setSearch("");

    window.history.replaceState(
      null,
      "",
      "/search"
    );
  };

  const handlePopularSearch = (
    value: string
  ) => {
    setSearch(value);

    window.history.replaceState(
      null,
      "",
      `/search?q=${encodeURIComponent(value)}`
    );
  };

  /* =========================
     WISHLIST
  ========================== */

  const isInWishlist = (
    productId: number
  ) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  const handleWishlist = (
    product: Product
  ) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const hasSearch =
    search.trim().length > 0;

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#252c30]">

      {/* =================================================
          SEARCH HEADER
      ================================================== */}

      <section className="border-b border-[#e5e5df] bg-white">

        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

          {/* Top */}

          <div className="flex items-center gap-3">

            <span className="h-[5px] w-[5px] rounded-full bg-[#56b7c9]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#718086]">
              LUXORA / Search
            </p>

          </div>

          {/* Heading */}

          <div className="mt-7 max-w-[850px]">

            <h1 className="text-[44px] font-medium leading-[0.95] tracking-[-0.065em] text-[#252c30] sm:text-[58px] lg:text-[72px]">
              What are you
              <br />
              looking for?
            </h1>

            <p className="mt-5 max-w-[500px] text-[13px] leading-6 text-[#7b898d] sm:text-[14px]">
              Search the LUXORA collection and
              discover products that fit what you
              have in mind.
            </p>

          </div>

          {/* Search */}

          <div className="mt-10 max-w-[850px]">

            <div className="relative">

              <FiSearch
                size={21}
                strokeWidth={1.4}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[#8b989b]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  handleSearch(
                    event.target.value
                  )
                }
                placeholder="Search products or categories..."
                autoFocus
                className="h-[68px] w-full border-b-2 border-[#dfe4e3] bg-transparent pl-9 pr-12 text-[18px] font-medium tracking-[-0.025em] text-[#252c30] outline-none transition-colors duration-300 placeholder:text-[#a3abad] focus:border-[#56adbf] sm:h-[76px] sm:text-[21px]"
              />

              {hasSearch && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#8b989b] transition-all duration-300 hover:bg-[#edf8f9] hover:text-[#2794aa]"
                >
                  <FiX
                    size={17}
                    strokeWidth={1.4}
                  />
                </button>
              )}

            </div>

            <div className="mt-4 flex items-center justify-between">

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9aa5a8]">

                {isLoading
                  ? "Loading..."
                  : hasSearch
                  ? `${filteredProducts.length} ${
                      filteredProducts.length ===
                      1
                        ? "result"
                        : "results"
                    } found`
                  : "Start typing to search"}

              </p>

              {hasSearch && (
                <p className="hidden text-[10px] text-[#9aa5a8] sm:block">
                  Search results for "
                  {search}"
                </p>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          NO SEARCH
      ================================================== */}

      {!hasSearch && !isLoading && (
        <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#899497]">
                Popular searches
              </p>

              <h2 className="mt-3 max-w-[400px] text-[30px] font-medium leading-tight tracking-[-0.045em] text-[#30383c] sm:text-[38px]">
                Start with
                something popular.
              </h2>

              <p className="mt-4 max-w-[380px] text-[12px] leading-6 text-[#899497]">
                Browse one of the popular categories
                or type your own search above.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {popularSearches.map(
                (item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      handlePopularSearch(
                        item
                      )
                    }
                    className="group flex items-center justify-between rounded-[18px] border border-[#e3e6e4] bg-white px-5 py-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a8dce3] hover:bg-[#f5fbfb]"
                  >

                    <div>

                      <span className="text-[9px] font-semibold tracking-[0.16em] text-[#a1abad]">
                        0{index + 1}
                      </span>

                      <p className="mt-2 text-[14px] font-medium capitalize text-[#30383c] transition-colors group-hover:text-[#2794aa]">
                        {item}
                      </p>

                    </div>

                    <FiArrowRight
                      size={17}
                      strokeWidth={1.3}
                      className="text-[#8d999c] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#2794aa]"
                    />

                  </button>
                )
              )}

            </div>

          </div>

        </section>
      )}

      {/* =================================================
          LOADING
      ================================================== */}

      {hasSearch && isLoading && (
        <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">

            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse"
              >

                <div className="aspect-[4/5] rounded-[18px] bg-[#e9ebe8]" />

                <div className="mt-4 h-2.5 w-20 rounded-full bg-[#e1e5e3]" />

                <div className="mt-3 h-4 w-4/5 rounded-full bg-[#e1e5e3]" />

                <div className="mt-3 h-3 w-16 rounded-full bg-[#e9ebe8]" />

              </div>
            ))}

          </div>

        </section>
      )}

      {/* =================================================
          RESULTS
      ================================================== */}

      {hasSearch &&
        !isLoading &&
        filteredProducts.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">

            {/* Results Header */}

            <div className="mb-8 flex items-end justify-between border-b border-[#e1e5e3] pb-5">

              <div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#899497]">
                  Search results
                </p>

                <h2 className="mt-2 text-[28px] font-medium tracking-[-0.045em] text-[#30383c] sm:text-[34px]">
                  Results for "{search}"
                </h2>

              </div>

              <p className="hidden text-[9px] font-semibold uppercase tracking-[0.15em] text-[#899497] sm:block">
                {filteredProducts.length}{" "}
                {filteredProducts.length ===
                1
                  ? "Product"
                  : "Products"}
              </p>

            </div>

            {/* Products Grid */}

            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">

              {filteredProducts.map(
                (product) => {

                  const saved =
                    isInWishlist(
                      product.id
                    );

                  return (
                    <article
                      key={product.id}
                      className="group min-w-0"
                    >

                      {/* Image */}

                      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#eeefeb]">

                        <Link
                          href={`/products/${product.id}`}
                          className="block h-full w-full"
                        >

                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.045] sm:p-8"
                          />

                        </Link>

                        {/* Wishlist */}

                        <button
                          type="button"
                          onClick={() =>
                            handleWishlist(
                              product
                            )
                          }
                          aria-label={
                            saved
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${
                            saved
                              ? "border-[#30383c] bg-[#30383c] text-white"
                              : "border-[#dfe4e2] bg-white/95 text-[#718086] hover:border-[#56adbf] hover:text-[#2794aa]"
                          }`}
                        >

                          <FiHeart
                            size={16}
                            strokeWidth={1.4}
                            className={
                              saved
                                ? "fill-current"
                                : ""
                            }
                          />

                        </button>

                        {/* Add Cart */}

                        <button
                          type="button"
                          onClick={() =>
                            addToCart(
                              product
                            )
                          }
                          className="absolute bottom-3 left-3 right-3 flex h-10 items-center justify-center gap-2 rounded-full bg-[#30383c] text-[9px] font-semibold uppercase tracking-[0.1em] text-white opacity-100 transition-all duration-300 hover:bg-[#2794aa] sm:bottom-4 sm:left-4 sm:right-4 sm:h-11 sm:opacity-0 sm:group-hover:opacity-100"
                        >

                          <FiShoppingBag
                            size={14}
                            strokeWidth={1.4}
                          />

                          Add to cart

                        </button>

                      </div>

                      {/* Product Info */}

                      <div className="pt-4">

                        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#929da0]">
                          {product.category}
                        </p>

                        <Link
                          href={`/products/${product.id}`}
                        >

                          <h3 className="mt-2 line-clamp-2 min-h-[44px] text-[14px] font-medium leading-6 tracking-[-0.015em] text-[#30383c] transition-colors hover:text-[#2794aa] sm:text-[15px]">
                            {product.title}
                          </h3>

                        </Link>

                        <div className="mt-3 flex items-center justify-between gap-3">

                          <p className="text-[14px] font-semibold text-[#30383c]">
                            $
                            {product.price.toFixed(
                              2
                            )}
                          </p>

                          <span className="text-[10px] text-[#929da0]">
                            ★{" "}
                            {product.rating.rate.toFixed(
                              1
                            )}
                          </span>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          </section>
        )}

      {/* =================================================
          NO RESULTS
      ================================================== */}

      {hasSearch &&
        !isLoading &&
        filteredProducts.length === 0 && (
          <section className="flex min-h-[500px] items-center justify-center px-5 py-20">

            <div className="max-w-[520px] text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf8f9] text-[#2794aa]">
                <FiSearch
                  size={25}
                  strokeWidth={1.3}
                />
              </div>

              <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9aa5a8]">
                No results
              </p>

              <h2 className="mt-3 text-[34px] font-medium tracking-[-0.05em] text-[#30383c] sm:text-[42px]">
                Nothing matched
                your search.
              </h2>

              <p className="mx-auto mt-4 max-w-[420px] text-[13px] leading-7 text-[#899497]">
                We couldn&apos;t find anything
                matching &quot;{search}&quot;.
                Try another keyword or choose
                one of the popular searches.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-2">

                {popularSearches
                  .slice(0, 3)
                  .map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        handlePopularSearch(
                          item
                        )
                      }
                      className="rounded-full border border-[#dce3e2] bg-white px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#687477] transition-all duration-300 hover:border-[#56adbf] hover:bg-[#edf8f9] hover:text-[#2794aa]"
                    >
                      {item}
                    </button>
                  ))}

              </div>

              <Link
                href="/products"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#30383c] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#2794aa]"
              >
                Browse products

                <FiArrowRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>

          </section>
        )}

    </main>
  );
}