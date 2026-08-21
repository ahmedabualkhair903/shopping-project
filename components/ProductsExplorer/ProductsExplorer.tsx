"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FiChevronDown,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";

import ProductGrid from "@/components/ProductGrid/ProductGrid";
import type { Product } from "@/types/product";

type ProductsExplorerProps = {
  products: Product[];
  categories: string[];
};

const ProductsExplorer = ({
  products,
  categories,
}: ProductsExplorerProps) => {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    {
      value: "all",
      label: "All prices",
    },
    {
      value: "under-25",
      label: "Under $25",
    },
    {
      value: "25-50",
      label: "$25 – $50",
    },
    {
      value: "50-100",
      label: "$50 – $100",
    },
    {
      value: "over-100",
      label: "Over $100",
    },
  ];

  /*
   * Read filters from URL
   *
   * Examples:
   * /products?sort=new
   * /products?sort=price-low
   * /products?category=electronics
   */

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    const categoryParam = searchParams.get("category");

    const validSortValues = [
      "featured",
      "new",
      "price-low",
      "price-high",
      "rating",
      "name",
    ];

    if (sortParam && validSortValues.includes(sortParam)) {
      setSort(sortParam);
    } else {
      setSort("featured");
    }

    if (
      categoryParam &&
      categories.includes(categoryParam)
    ) {
      setCategory(categoryParam);
    } else if (!categoryParam) {
      setCategory("all");
    }
  }, [searchParams, categories]);

  /*
   * Filter + Sort Products
   */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /*
     * Search
     */

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    /*
     * Category
     */

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    /*
     * Price
     */

    switch (priceFilter) {
      case "under-25":
        result = result.filter(
          (product) => product.price < 25
        );
        break;

      case "25-50":
        result = result.filter(
          (product) =>
            product.price >= 25 &&
            product.price <= 50
        );
        break;

      case "50-100":
        result = result.filter(
          (product) =>
            product.price > 50 &&
            product.price <= 100
        );
        break;

      case "over-100":
        result = result.filter(
          (product) => product.price > 100
        );
        break;

      default:
        break;
    }

    /*
     * Sort
     */

    switch (sort) {
      case "new":
        /*
         * Fake Store API does not provide
         * a real createdAt field.
         *
         * Reverse API order to create
         * a New Arrivals presentation.
         */

        result.reverse();
        break;

      case "price-low":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        result.sort(
          (a, b) =>
            b.rating.rate - a.rating.rate
        );
        break;

      case "name":
        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    products,
    search,
    category,
    priceFilter,
    sort,
  ]);

  /*
   * Clear Filters
   */

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setPriceFilter("all");
    setSort("featured");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "all" ||
    priceFilter !== "all" ||
    sort !== "featured";

  return (
    <div className="space-y-8">
      {/* =========================
          SEARCH + CONTROLS
      ========================== */}

      <section className="overflow-hidden rounded-[28px] border border-[#e7e5df] bg-[#fbfaf7]">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Search */}

          <div className="relative flex min-h-[68px] flex-1 items-center">
            <FiSearch
              size={18}
              strokeWidth={1.4}
              className="absolute left-6 text-[#8b9294]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products"
              className="h-full w-full bg-transparent pl-14 pr-14 text-[13px] font-medium text-[#252a2c] outline-none placeholder:text-[#9da3a4]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-5 flex h-8 w-8 items-center justify-center rounded-full text-[#777f81] transition-all duration-300 hover:bg-[#eef9fa] hover:text-[#2794aa]"
              >
                <FiX
                  size={15}
                  strokeWidth={1.4}
                />
              </button>
            )}
          </div>

          {/* Controls */}

          <div className="flex border-t border-[#e7e5df] lg:border-l lg:border-t-0">
            {/* Filters */}

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  (value) => !value
                )
              }
              className={`flex min-h-[68px] items-center gap-2 border-r border-[#e7e5df] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                showFilters ||
                priceFilter !== "all"
                  ? "bg-[#eef9fa] text-[#2794aa]"
                  : "text-[#555e60] hover:bg-white hover:text-[#2794aa]"
              }`}
            >
              <FiSliders
                size={15}
                strokeWidth={1.4}
              />

              <span>Filters</span>

              {priceFilter !== "all" && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2794aa] px-1.5 text-[8px] text-white">
                  1
                </span>
              )}
            </button>

            {/* Sort */}

            <div className="flex min-h-[68px] items-center gap-3 px-5 sm:px-7">
              <span className="hidden text-[8px] font-semibold uppercase tracking-[0.18em] text-[#92999b] sm:block">
                Sort by
              </span>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                  className="h-10 cursor-pointer appearance-none rounded-full border border-[#dedfda] bg-white pl-4 pr-10 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#343b3d] outline-none transition-all duration-300 hover:border-[#a8dce3] focus:border-[#2794aa]"
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="new">
                    New Arrivals
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>

                  <option value="name">
                    Name: A-Z
                  </option>
                </select>

                <FiChevronDown
                  size={13}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737b7d]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Price Filters */}

        {showFilters && (
          <div className="border-t border-[#e7e5df] bg-[#f4f8f7] px-5 py-6 sm:px-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#555f61]">
                  Price range
                </p>

                <p className="mt-1 text-[10px] text-[#969d9f]">
                  Refine the products you want to see
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {priceRanges.map(
                  (range) => (
                    <button
                      key={range.value}
                      type="button"
                      onClick={() =>
                        setPriceFilter(
                          range.value
                        )
                      }
                      className={`rounded-full border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                        priceFilter ===
                        range.value
                          ? "border-[#30383c] bg-[#30383c] text-white"
                          : "border-[#dfe3df] bg-white text-[#626b6d] hover:border-[#9ed7df] hover:text-[#2794aa]"
                      }`}
                    >
                      {range.label}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================
          CATEGORIES
      ========================== */}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8a9294]">
            Browse categories
          </p>

          {category !== "all" && (
            <button
              type="button"
              onClick={() =>
                setCategory("all")
              }
              className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#2794aa] transition-colors hover:text-[#30383c]"
            >
              View all
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {/* All */}

          <button
            type="button"
            onClick={() =>
              setCategory("all")
            }
            className={`shrink-0 rounded-full border px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
              category === "all"
                ? "border-[#30383c] bg-[#30383c] text-white"
                : "border-[#e1e3de] bg-white text-[#687174] hover:border-[#a8dce3] hover:text-[#2794aa]"
            }`}
          >
            All products
          </button>

          {/* Categories */}

          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() =>
                setCategory(item)
              }
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] capitalize transition-all duration-300 ${
                category === item
                  ? "border-[#2794aa] bg-[#2794aa] text-white"
                  : "border-[#e1e3de] bg-white text-[#687174] hover:border-[#a8dce3] hover:bg-[#f5fbfb] hover:text-[#2794aa]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* =========================
          RESULTS HEADER
      ========================== */}

      <section className="flex flex-col gap-4 border-y border-[#e5e5df] py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#30383c]">
            LUXORA collection
          </p>

          <p className="mt-1 text-[11px] text-[#92999b]">
            Showing{" "}
            <span className="font-semibold text-[#2794aa]">
              {filteredProducts.length}
            </span>{" "}
            of {products.length} products
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e0e3df] px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#697275] transition-all duration-300 hover:border-[#a8dce3] hover:bg-[#eef9fa] hover:text-[#2794aa]"
          >
            <FiX size={12} />

            Clear filters
          </button>
        )}
      </section>

      {/* =========================
          ACTIVE FILTERS
      ========================== */}

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {/* Search */}

          {search.trim() && (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef8f8] px-3.5 py-2 text-[9px] font-medium text-[#397c85]">
              Search: &quot;{search}&quot;

              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Remove search filter"
                className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#d8eff1]"
              >
                <FiX size={10} />
              </button>
            </span>
          )}

          {/* Category */}

          {category !== "all" && (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f1e9] px-3.5 py-2 text-[9px] font-medium capitalize text-[#806d50]">
              Category: {category}

              <button
                type="button"
                onClick={() =>
                  setCategory("all")
                }
                aria-label="Remove category filter"
                className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#ebe2d2]"
              >
                <FiX size={10} />
              </button>
            </span>
          )}

          {/* Price */}

          {priceFilter !== "all" && (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f1f5f3] px-3.5 py-2 text-[9px] font-medium text-[#5f7070]">
              Price:{" "}
              {
                priceRanges.find(
                  (range) =>
                    range.value ===
                    priceFilter
                )?.label
              }

              <button
                type="button"
                onClick={() =>
                  setPriceFilter("all")
                }
                aria-label="Remove price filter"
                className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#e0e9e6]"
              >
                <FiX size={10} />
              </button>
            </span>
          )}

          {/* New Arrivals */}

          {sort === "new" && (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf9fb] px-3.5 py-2 text-[9px] font-medium text-[#2794aa]">
              New arrivals

              <button
                type="button"
                onClick={() =>
                  setSort("featured")
                }
                aria-label="Remove new arrivals filter"
                className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#d5f0f3]"
              >
                <FiX size={10} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* =========================
          PRODUCTS
      ========================== */}

      {filteredProducts.length > 0 ? (
        <div
          className={
            hasActiveFilters
              ? "pt-0"
              : "pt-1"
          }
        >
          <ProductGrid
            products={filteredProducts}
          />
        </div>
      ) : (
        <div className="rounded-[28px] border border-[#e5e5df] bg-[#fbfaf7] px-5 py-24 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef8f8] text-[#2794aa]">
            <FiSearch
              size={22}
              strokeWidth={1.2}
            />
          </div>

          <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8b9395]">
            LUXORA search
          </p>

          <h2 className="mt-2 text-[25px] font-medium tracking-[-0.045em] text-[#30383c]">
            Nothing found.
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-[12px] leading-6 text-[#7d8688]">
            Try another search term, category,
            or price range to discover
            something new.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-7 rounded-full bg-[#30383c] px-7 py-3.5 text-[9px] font-semibold uppercase tracking-[0.17em] text-white transition-all duration-300 hover:bg-[#2794aa]"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsExplorer;