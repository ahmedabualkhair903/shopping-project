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
  FiStar,
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

  const averageRating = useMemo(() => {
    if (!products.length) return "0.0";

    const total = products.reduce(
      (sum, product) => sum + product.rating.rate,
      0
    );

    return (total / products.length).toFixed(1);
  }, [products]);

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
    <main className="min-h-screen bg-[#F3F1EC] text-[#171715]">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[#DEDAD1] bg-[#F8F6F1]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#E7E0D3] opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#EDE7DC] opacity-70 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-11">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 rounded-full border border-[#DEDAD1] bg-white/70 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#77736B] backdrop-blur-sm transition-all hover:border-[#1B1A18] hover:bg-white hover:text-[#171715]"
          >
            <FiArrowLeft
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Dashboard
          </Link>

          <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A58A61]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9A958B]">
                  LUXORA / Management
                </p>
              </div>

              <h1 className="mt-3 text-4xl font-medium tracking-[-0.055em] text-[#171715] sm:text-5xl lg:text-[50px]">
                Products
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#77736B]">
                Manage your catalog, review product details,
                and keep your store collection organized.
              </p>
            </div>

            <Link
              href="/admin/products/new"
              className="group inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-[#1C1B18] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_25px_rgba(28,27,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34322D] hover:shadow-[0_12px_30px_rgba(28,27,24,0.18)]"
            >
              <FiPlus
                size={15}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              Add Product
            </Link>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
        {/* Overview Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Products */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] p-5 shadow-[0_4px_20px_rgba(40,36,30,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(40,36,30,0.07)] sm:p-6">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E9E2D5] opacity-50 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E1DCD2] bg-white text-[#817A6D]">
                <FiBox
                  size={17}
                  strokeWidth={1.4}
                />
              </div>

              <span className="rounded-full bg-[#EEEAE2] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#817A6D]">
                Catalog
              </span>
            </div>

            <div className="relative mt-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#99948A]">
                Total Products
              </p>

              <p className="mt-2 text-3xl font-medium tracking-[-0.05em] text-[#171715]">
                {products.length}
              </p>

              <p className="mt-2 text-[11px] text-[#918C82]">
                Products in your catalog
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] p-5 shadow-[0_4px_20px_rgba(40,36,30,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(40,36,30,0.07)] sm:p-6">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E5E8E2] opacity-60 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DDE1D9] bg-white text-[#697261]">
                <span className="text-sm font-medium">
                  #
                </span>
              </div>

              <span className="rounded-full bg-[#E9ECE5] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#687160]">
                Active
              </span>
            </div>

            <div className="relative mt-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#99948A]">
                Categories
              </p>

              <p className="mt-2 text-3xl font-medium tracking-[-0.05em] text-[#171715]">
                {categories.length}
              </p>

              <p className="mt-2 text-[11px] text-[#918C82]">
                Active product categories
              </p>
            </div>
          </div>

          {/* Current View */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] p-5 shadow-[0_4px_20px_rgba(40,36,30,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(40,36,30,0.07)] sm:p-6">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E7E1D8] opacity-60 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DEDAD1] bg-white text-[#77736B]">
                <FiSearch
                  size={16}
                  strokeWidth={1.4}
                />
              </div>

              <span className="rounded-full bg-[#EEEAE2] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#817A6D]">
                Filtered
              </span>
            </div>

            <div className="relative mt-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#99948A]">
                Current View
              </p>

              <p className="mt-2 text-3xl font-medium tracking-[-0.05em] text-[#171715]">
                {filteredProducts.length}
              </p>

              <p className="mt-2 text-[11px] text-[#918C82]">
                Products matching your filters
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] p-5 shadow-[0_4px_20px_rgba(40,36,30,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(40,36,30,0.07)] sm:p-6">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E8E1D2] opacity-60 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2DBCB] bg-white text-[#9A815A]">
                <FiStar
                  size={16}
                  strokeWidth={1.4}
                />
              </div>

              <span className="rounded-full bg-[#F0EADF] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#927A54]">
                Rating
              </span>
            </div>

            <div className="relative mt-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#99948A]">
                Average Rating
              </p>

              <p className="mt-2 text-3xl font-medium tracking-[-0.05em] text-[#171715]">
                {averageRating}
                <span className="ml-1 text-sm text-[#A39B8D]">
                  / 5
                </span>
              </p>

              <p className="mt-2 text-[11px] text-[#918C82]">
                Across the product catalog
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-7 overflow-hidden rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] shadow-[0_4px_25px_rgba(40,36,30,0.035)]">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              {/* Search */}
              <div className="w-full xl:max-w-xl">
                <label
                  htmlFor="product-search"
                  className="mb-2.5 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#99948A]"
                >
                  Search Catalog
                </label>

                <div className="relative">
                  <FiSearch
                    size={16}
                    strokeWidth={1.5}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A29D93]"
                  />

                  <input
                    id="product-search"
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search by product name, category or ID..."
                    className="h-11 w-full rounded-xl border border-[#DEDAD1] bg-white pl-10 pr-10 text-xs text-[#171715] shadow-sm outline-none transition-all placeholder:text-[#AAA59C] focus:border-[#AFA79A] focus:ring-4 focus:ring-[#E9E4DA]"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#9C978D] transition-colors hover:bg-[#F1EEE8] hover:text-[#171715]"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="flex w-full flex-col gap-4 sm:flex-row xl:w-auto">
                <div className="w-full sm:w-[190px]">
                  <label
                    htmlFor="category"
                    className="mb-2.5 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#99948A]"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-[#DEDAD1] bg-white px-3 text-xs text-[#34322D] outline-none transition-all hover:border-[#BDB7AC] focus:border-[#AFA79A] focus:ring-4 focus:ring-[#E9E4DA]"
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

                <div className="w-full sm:w-[190px]">
                  <label
                    htmlFor="sort"
                    className="mb-2.5 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#99948A]"
                  >
                    Sort By
                  </label>

                  <select
                    id="sort"
                    value={sort}
                    onChange={(event) =>
                      setSort(event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-[#DEDAD1] bg-white px-3 text-xs text-[#34322D] outline-none transition-all hover:border-[#BDB7AC] focus:border-[#AFA79A] focus:ring-4 focus:ring-[#E9E4DA]"
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
              <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#E6E1D8] bg-[#F5F2EC] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-[#858077]">
                  Showing{" "}
                  <span className="font-semibold text-[#34322D]">
                    {filteredProducts.length}
                  </span>{" "}
                  filtered product
                  {filteredProducts.length !== 1
                    ? "s"
                    : ""}
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-fit rounded-full border border-[#D7D0C4] bg-white px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#706A60] transition-all hover:border-[#292722] hover:text-[#171715]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-[#E2D7C7] bg-[#FBF7EF] px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9B896C]">
                  Catalog Error
                </p>

                <p className="mt-1 text-sm text-[#6F685D]">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-fit rounded-full bg-[#292722] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#45423B]"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading ? (
          <div className="mt-7 rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] py-28 text-center shadow-[0_4px_25px_rgba(40,36,30,0.03)]">
            <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-[#DDD8CF] border-t-[#292722]" />

            <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#99948A]">
              Loading Catalog
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] px-5 py-24 text-center shadow-[0_4px_25px_rgba(40,36,30,0.03)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#DDD8CF] bg-[#F1EEE8]">
              <FiBox
                size={23}
                strokeWidth={1.2}
                className="text-[#A29C91]"
              />
            </div>

            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A958B]">
              Catalog
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.035em] text-[#171715]">
              {products.length === 0
                ? "No products available"
                : "No products found"}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77736B]">
              {products.length === 0
                ? "Your product catalog is currently empty."
                : "Try changing your search or category filters to find what you're looking for."}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full border border-[#D7D0C4] bg-white px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#706A60] transition-all hover:border-[#292722] hover:text-[#171715]"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] shadow-[0_4px_25px_rgba(40,36,30,0.035)]">
            {/* Desktop Header */}
            <div className="hidden border-b border-[#E1DDD5] bg-[#F2EFE9] px-6 py-4 lg:grid lg:grid-cols-[minmax(0,1fr)_150px_120px_110px_88px] lg:items-center lg:gap-6">
              {[
                "Product",
                "Category",
                "Price",
                "Rating",
                "Actions",
              ].map((label, index) => (
                <p
                  key={label}
                  className={`text-[9px] font-semibold uppercase tracking-[0.16em] text-[#938E84] ${
                    index === 4 ? "text-right" : ""
                  }`}
                >
                  {label}
                </p>
              ))}
            </div>

            {/* Product Rows */}
            <div className="divide-y divide-[#E4E0D8]">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group px-5 py-5 transition-colors hover:bg-[#F8F6F1] sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_150px_120px_110px_88px] lg:items-center lg:gap-6"
                >
                  {/* Product */}
                  <div className="flex min-w-0 items-center gap-4">
                    <Link
                      href={`/products/${product.id}`}
                      className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E4E0D8] bg-white p-2.5 transition-all duration-300 group-hover:border-[#CEC7BA] group-hover:shadow-sm"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={76}
                        height={76}
                        unoptimized
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <div className="min-w-0">
                      <Link
                        href={`/products/${product.id}`}
                        className="line-clamp-2 max-w-xl text-sm font-semibold leading-5 text-[#272520] transition-colors hover:text-[#8A7557]"
                      >
                        {product.title}
                      </Link>

                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#F0ECE5] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#8B857A]">
                          ID #{product.id}
                        </span>

                        <span className="text-[9px] text-[#A39D92]">
                          Product
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mt-5 lg:mt-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9A958B] lg:hidden">
                      Category
                    </p>

                    <span className="mt-1 inline-flex rounded-full border border-[#E0DBD1] bg-[#F5F2EC] px-2.5 py-1 text-[10px] capitalize text-[#68635A] lg:mt-0">
                      {product.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-5 lg:mt-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9A958B] lg:hidden">
                      Price
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#292722] lg:mt-0">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="mt-5 lg:mt-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9A958B] lg:hidden">
                      Rating
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 lg:mt-0">
                      <FiStar
                        size={12}
                        className="fill-[#B09264] text-[#B09264]"
                      />

                      <span className="text-sm font-medium text-[#292722]">
                        {product.rating.rate.toFixed(1)}
                      </span>

                      <span className="text-[10px] text-[#A09A90]">
                        ({product.rating.count})
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center justify-end gap-2 lg:mt-0">
                    <Link
                      href={`/admin/products/${product.id}`}
                      aria-label={`Edit ${product.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DDD8CF] bg-white text-[#777168] transition-all duration-200 hover:border-[#292722] hover:bg-[#292722] hover:text-white"
                    >
                      <FiEdit3
                        size={14}
                        strokeWidth={1.5}
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      aria-label={`Delete ${product.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E1DDD5] bg-white text-[#9A948A] transition-all duration-200 hover:border-[#E1CFCB] hover:bg-[#FBF0EE] hover:text-[#B65C51]"
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
            <div className="border-t border-[#E1DDD5] bg-[#F2EFE9] px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#969087]">
                  Showing{" "}
                  <span className="text-[#292722]">
                    {filteredProducts.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-[#292722]">
                    {products.length}
                  </span>{" "}
                  products
                </p>

                <Link
                  href="/products"
                  className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#D7D0C4] bg-white px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#706A60] transition-all hover:border-[#292722] hover:text-[#171715]"
                >
                  View Store

                  <FiArrowRight
                    size={12}
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