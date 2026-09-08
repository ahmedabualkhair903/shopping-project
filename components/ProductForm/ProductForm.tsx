"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheck,
  FiImage,
  FiX,
} from "react-icons/fi";

import type { Product } from "@/types/product";

const DEFAULT_PRODUCT_IMAGE = "/products/product-01.jfif";

type ProductFormProps = {
  mode: "create" | "edit";
  productId: number;
  product?: Product;
  categories: string[];
  onSubmit: (product: Product) => void;
  onCancel: () => void;
};

const fieldLabelClassName =
  "mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#99948A]";

const inputClassName =
  "h-11 w-full rounded-xl border border-[#DEDAD1] bg-white px-4 text-sm text-[#171715] shadow-sm outline-none transition-all placeholder:text-[#AAA59C] focus:border-[#AFA79A] focus:ring-4 focus:ring-[#E9E4DA]";

const textareaClassName =
  "w-full rounded-xl border border-[#DEDAD1] bg-white px-4 py-3 text-sm text-[#171715] shadow-sm outline-none transition-all placeholder:text-[#AAA59C] focus:border-[#AFA79A] focus:ring-4 focus:ring-[#E9E4DA]";

export default function ProductForm({
  mode,
  productId,
  product,
  categories,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [title, setTitle] = useState(
    product?.title ?? ""
  );
  const [category, setCategory] = useState(
    product?.category ?? "all"
  );
  const [isCustomCategory, setIsCustomCategory] =
    useState(false);
  const [customCategory, setCustomCategory] = useState(
    initialCustomCategory(
      product?.category ?? "",
      categories
    )
  );
  const [price, setPrice] = useState(
    product ? String(product.price) : ""
  );
  const [description, setDescription] = useState(
    product?.description ?? ""
  );
  const [image, setImage] = useState(
    product?.image ?? ""
  );
  const [error, setError] = useState("");

  const handleCategoryChange = (value: string) => {
    setError("");

    if (value === "__new__") {
      setIsCustomCategory(true);
      setCustomCategory("");
      return;
    }

    setIsCustomCategory(false);
    setCategory(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedTitle = title.trim();

    if (trimmedTitle.length < 3) {
      setError(
        "Product name is required (min 3 characters)."
      );
      return;
    }

    const priceValue = Number(price);

    if (
      !price ||
      !Number.isFinite(priceValue) ||
      priceValue <= 0
    ) {
      setError(
        "Please enter a valid price greater than zero."
      );
      return;
    }

    const finalCategory = isCustomCategory
      ? customCategory.trim()
      : category;

    if (!finalCategory || finalCategory === "all") {
      setError("Please choose a category for this product.");
      return;
    }

    onSubmit({
      id: productId,
      title: trimmedTitle,
      price: Number(priceValue.toFixed(2)),
      description: description.trim(),
      category: finalCategory,
      image:
        image.trim() || DEFAULT_PRODUCT_IMAGE,
      rating:
        product?.rating ?? {
          rate: 0,
          count: 0,
        },
    });
  };

  return (
    <main className="min-h-screen bg-[#F3F1EC] text-[#171715]">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[#DEDAD1] bg-[#F8F6F1]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#E7E0D3] opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#EDE7DC] opacity-70 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-11">
          <Link
            href="/admin/products"
            className="group inline-flex items-center gap-2 rounded-full border border-[#DEDAD1] bg-white/70 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#77736B] backdrop-blur-sm transition-all hover:border-[#1B1A18] hover:bg-white hover:text-[#171715]"
          >
            <FiArrowLeft
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Products
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
                {mode === "create"
                  ? "Add Product"
                  : "Edit Product"}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#77736B]">
                {mode === "create"
                  ? "Add a new product to your catalog. Changes are stored on this device."
                  : "Update the product details and save your changes."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-[900px] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-[#DEDAD1] bg-[#FBFAF7] shadow-[0_4px_25px_rgba(40,36,30,0.035)]"
        >
          {/* Preview */}
          <div className="border-b border-[#E4E0D8] bg-[#F5F2EC] px-6 py-6">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E4E0D8] bg-white p-3">
                {image.trim() ? (
                  <Image
                    src={image.trim()}
                    alt="Product preview"
                    width={112}
                    height={112}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-[#B0AA9F]">
                    <FiImage
                      size={22}
                      strokeWidth={1.3}
                    />

                    <span className="text-[8px] font-semibold uppercase tracking-[0.14em]">
                      Preview
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#99948A]">
                  {mode === "create"
                    ? "New Product"
                    : productId > 0
                      ? `Editing Product #${productId}`
                      : "Editing Product"}
                </p>

                <h2 className="mt-1.5 max-w-md text-lg font-medium leading-6 tracking-[-0.02em] text-[#292722]">
                  {title.trim() || "Untitled product"}
                </h2>

                <p className="mt-1 text-xs text-[#918C82]">
                  {price
                    ? `$${Number(price).toFixed(2)}`
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-6 px-6 py-6">
            {/* Title */}
            <div>
              <label
                htmlFor="product-title"
                className={fieldLabelClassName}
              >
                Product Name
              </label>

              <input
                id="product-title"
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setError("");
                }}
                placeholder="e.g. Minimalist Canvas Tote"
                className={inputClassName}
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="product-category"
                className={fieldLabelClassName}
              >
                Category
              </label>

              {isCustomCategory ? (
                <div className="flex gap-2">
                  <input
                    id="product-category"
                    type="text"
                    value={customCategory}
                    onChange={(event) => {
                      setCustomCategory(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter a new category..."
                    className={inputClassName}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCategory(false);
                      setCategory("all");
                    }}
                    aria-label="Cancel new category"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DDD8CF] bg-white text-[#9A948A] transition-colors hover:bg-[#F1EEE8] hover:text-[#171715]"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <select
                  id="product-category"
                  value={category}
                  onChange={(event) =>
                    handleCategoryChange(event.target.value)
                  }
                  className="h-11 w-full cursor-pointer rounded-xl border border-[#DEDAD1] bg-white px-3 text-sm text-[#34322D] shadow-sm outline-none transition-all hover:border-[#BDB7AC] focus:border-[#AFA79A] focus:ring-4 focus:ring-[#E9E4DA]"
                >
                  <option value="all">
                    Select a category
                  </option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                  <option value="__new__">
                    + New category...
                  </option>
                </select>
              )}

              {!isCustomCategory &&
                customCategory.trim() && (
                  <p className="mt-2 text-[11px] text-[#928A7C]">
                    Using category &quot;{customCategory.trim()}
                    &quot;
                  </p>
                )}
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="product-price"
                className={fieldLabelClassName}
              >
                Price (USD)
              </label>

              <input
                id="product-price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                  setError("");
                }}
                placeholder="0.00"
                className={inputClassName}
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="product-description"
                className={fieldLabelClassName}
              >
                Description
              </label>

              <textarea
                id="product-description"
                rows={5}
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe the product, its materials, and what makes it special..."
                className={textareaClassName}
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="product-image"
                className={fieldLabelClassName}
              >
                Image URL
              </label>

              <input
                id="product-image"
                type="text"
                value={image}
                onChange={(event) =>
                  setImage(event.target.value)
                }
                placeholder="/products/product-01.jfif"
                className={inputClassName}
              />

              <p className="mt-2 text-[11px] text-[#928A7C]">
                Leave empty to use the default product image.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-[#E2D7C7] bg-[#FBF7EF] px-4 py-3">
                <p className="text-xs text-[#8A6D4A]">
                  {error}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#E4E0D8] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D7D0C4] bg-white px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#706A60] transition-all hover:border-[#292722] hover:text-[#171715] sm:w-auto"
              >
                <FiArrowLeft
                  size={13}
                  strokeWidth={1.5}
                />

                Cancel
              </button>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1B18] px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_25px_rgba(28,27,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34322D] hover:shadow-[0_12px_30px_rgba(28,27,24,0.18)] sm:w-auto"
              >
                <FiCheck
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                {mode === "create"
                  ? "Create Product"
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </form>

        <p className="mt-5 text-center text-[9px] font-medium uppercase tracking-[0.16em] text-[#A09A90]">
          {mode === "create"
            ? "New products appear in the store on this device"
            : "Product saved to the store on this device"}
        </p>
      </section>
    </main>
  );
}

function initialCustomCategory(
  currentCategory: string,
  categories: string[]
): string {
  return categories.includes(currentCategory)
    ? ""
    : currentCategory;
}