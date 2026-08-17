"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBox,
  FiEdit3,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProducts();

        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);

        if (isMounted) {
          setError(
            "We couldn't load the products. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((product) => {
        const title = product.title.toLowerCase();
        const productCategory =
          product.category.toLowerCase();
        const productId = String(product.id).toLowerCase();

        return (
          title.includes(query) ||
          productCategory.includes(query) ||
          productId.includes(query)
        );
      });
    }

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort(
          (a, b) => b.rating.rate - a.rating.rate
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
  }, [products, search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("featured");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "all" ||
    sort !== "featured";

  const handleDelete = (id: number) => {
    const product = products.find(
      (item) => item.id === id
    );

    if (!product) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#F7F6F3] text-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-neutral-950"
          >
            <FiArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Dashboard
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-neutral-400">
                LUXORA / Management
              </p>

              <h1 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-neutral-950 sm:text-4xl lg:text-[42px]">
                Products
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500">
                Manage your catalog, review product details,
                and keep your store inventory organized.
              </p>
            </div>

            <Link
              href="/admin/products/new"
              className="group inline-flex h-11 w-fit items-center justify-center gap-2 bg-neutral-950 px-5 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-neutral-800"
            >
              <FiPlus
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              Add Product
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* Overview */}
        <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
          <div className="bg-white px-5 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Total Products
              </p>

              <FiBox
                size={16}
                strokeWidth={1.4}
                className="text-neutral-300"
              />
            </div>

            <p className="mt-5 text-3xl font-medium tracking-[-0.04em] text-neutral-950">
              {products.length}
            </p>

            <p className="mt-2 text-xs text-neutral-400">
              Products in your catalog
            </p>
          </div>

          <div className="bg-white px-5 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Categories
              </p>

              <span className="text-xs text-neutral-300">
                {categories.length}
              </span>
            </div>

            <p className="mt-5 text-3xl font-medium tracking-[-0.04em] text-neutral-950">
              {categories.length}
            </p>

            <p className="mt-2 text-xs text-neutral-400">
              Active product categories
            </p>
          </div>

          <div className="bg-white px-5 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Current View
              </p>

              <span className="text-xs text-neutral-300">
                {filteredProducts.length}
              </span>
            </div>

            <p className="mt-5 text-3xl font-medium tracking-[-0.04em] text-neutral-950">
              {filteredProducts.length}
            </p>

            <p className="mt-2 text-xs text-neutral-400">
              Products matching your filters
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-8 border border-neutral-200 bg-white">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              {/* Search */}
              <div className="w-full xl:max-w-lg">
                <label
                  htmlFor="product-search"
                  className="mb-3 block text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400"
                >
                  Search Catalog
                </label>

                <div className="relative">
                  <FiSearch
                    size={17}
                    strokeWidth={1.5}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="product-search"
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search by product name, category or ID..."
                    className="h-11 w-full border-b border-neutral-300 bg-transparent pl-7 pr-9 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="absolute right-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-neutral-400 transition-colors hover:text-neutral-950"
                    >
                      <FiX
                        size={15}
                        strokeWidth={1.5}
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end xl:w-auto">
                <div className="w-full sm:w-auto">
                  <label
                    htmlFor="category"
                    className="mb-3 block text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    className="h-11 w-full min-w-0 border border-neutral-200 bg-white px-3 text-xs text-neutral-950 outline-none transition-colors hover:border-neutral-400 focus:border-neutral-950 sm:min-w-[190px]"
                  >
                    <option value="all">
                      All categories
                    </option>

                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:w-auto">
                  <label
                    htmlFor="sort"
                    className="mb-3 block text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400"
                  >
                    Sort By
                  </label>

                  <select
                    id="sort"
                    value={sort}
                    onChange={(event) =>
                      setSort(event.target.value)
                    }
                    className="h-11 w-full min-w-0 border border-neutral-200 bg-white px-3 text-xs text-neutral-950 outline-none transition-colors hover:border-neutral-400 focus:border-neutral-950 sm:min-w-[190px]"
                  >
                    <option value="featured">
                      Featured
                    </option>

                    <option value="name">
                      Name
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
                  </select>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-neutral-400">
                  Showing {filteredProducts.length} filtered
                  product
                  {filteredProducts.length !== 1
                    ? "s"
                    : ""}
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-fit text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-950"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 border border-neutral-200 bg-white px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                  Catalog Error
                </p>

                <p className="mt-1 text-sm text-neutral-600">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-fit border-b border-neutral-950 pb-1 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-950"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading ? (
          <div className="mt-8 border border-neutral-200 bg-white py-28 text-center">
            <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />

            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
              Loading Catalog
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="mt-8 border border-neutral-200 bg-white px-5 py-24 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-neutral-200">
              <FiBox
                size={24}
                strokeWidth={1.2}
                className="text-neutral-300"
              />
            </div>

            <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              Catalog
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.03em] text-neutral-950">
              {products.length === 0
                ? "No products available"
                : "No products found"}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              {products.length === 0
                ? "Your product catalog is currently empty."
                : "Try changing your search or category filters to find what you're looking for."}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 border-b border-neutral-950 pb-1 text-xs font-medium uppercase tracking-[0.1em] text-neutral-950"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8 overflow-hidden border border-neutral-200 bg-white">
            {/* Desktop Header */}
            <div className="hidden border-b border-neutral-200 bg-[#FAFAF8] px-6 py-4 lg:grid lg:grid-cols-[minmax(0,1fr)_150px_120px_110px_88px] lg:items-center lg:gap-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Product
              </p>

              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Category
              </p>

              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Price
              </p>

              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Rating
              </p>

              <p className="text-right text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Actions
              </p>
            </div>

            {/* Product Rows */}
            <div className="divide-y divide-neutral-200">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group px-5 py-5 transition-colors hover:bg-[#FCFCFA] sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_150px_120px_110px_88px] lg:items-center lg:gap-6"
                >
                  {/* Product */}
                  <div className="flex min-w-0 items-center gap-4">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex h-[72px] w-[72px] shrink-0 items-center justify-center bg-[#F5F5F3] p-2.5 transition-colors group-hover:bg-neutral-100"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={72}
                        height={72}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    <div className="min-w-0">
                      <Link
                        href={`/products/${product.id}`}
                        className="line-clamp-2 max-w-xl text-sm font-medium leading-5 text-neutral-950 transition-colors hover:text-neutral-500"
                      >
                        {product.title}
                      </Link>

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.08em] text-neutral-400">
                          ID #{product.id}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-neutral-300" />

                        <span className="text-[10px] uppercase tracking-[0.08em] text-neutral-400">
                          Product
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mt-5 lg:mt-0">
                    <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400 lg:hidden">
                      Category
                    </p>

                    <p className="mt-1 text-xs capitalize text-neutral-600 lg:mt-0">
                      {product.category}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-5 lg:mt-0">
                    <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400 lg:hidden">
                      Price
                    </p>

                    <p className="mt-1 text-sm font-medium text-neutral-950 lg:mt-0">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="mt-5 lg:mt-0">
                    <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400 lg:hidden">
                      Rating
                    </p>

                    <div className="mt-1 flex items-center gap-2 lg:mt-0">
                      <span className="text-sm text-neutral-950">
                        {product.rating.rate.toFixed(1)}
                      </span>

                      <span className="text-[10px] text-neutral-400">
                        / 5
                      </span>

                      <span className="hidden text-[10px] text-neutral-400 xl:inline">
                        ({product.rating.count})
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center justify-end gap-2 lg:mt-0">
                    <Link
                      href={`/admin/products/${product.id}`}
                      aria-label={`Edit ${product.title}`}
                      className="group/action flex h-9 w-9 items-center justify-center border border-neutral-200 text-neutral-500 transition-all duration-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                    >
                      <FiEdit3
                        size={14}
                        strokeWidth={1.5}
                        className="transition-transform duration-200 group-hover/action:scale-90"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      aria-label={`Delete ${product.title}`}
                      className="flex h-9 w-9 items-center justify-center border border-neutral-200 text-neutral-400 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <FiTrash2
                        size={14}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-200 bg-[#FAFAF8] px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] uppercase tracking-[0.1em] text-neutral-400">
                  Showing{" "}
                  <span className="font-medium text-neutral-950">
                    {filteredProducts.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-neutral-950">
                    {products.length}
                  </span>{" "}
                  products
                </p>

                <Link
                  href="/products"
                  className="group inline-flex w-fit items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 transition-colors hover:text-neutral-950"
                >
                  View Store

                  <FiArrowRight
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminProductsPage;