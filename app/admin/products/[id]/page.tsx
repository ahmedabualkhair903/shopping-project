"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiBox,
} from "react-icons/fi";

import ProductForm from "@/components/ProductForm/ProductForm";
import { useToast } from "@/context/ToastContext";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "@/lib/api";
import type { Product } from "@/types/product";

const EditProductPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { showToast } = useToast();

  const productId = Number(params.id);
  const isInvalidId = Number.isNaN(productId);

  const [product, setProduct] = useState<Product | null>(
    null
  );
  const [categories, setCategories] = useState<string[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isInvalidId) {
      return;
    }

    let isMounted = true;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProduct(String(productId));

        if (!isMounted) {
          return;
        }

        if (!data) {
          setIsNotFound(true);
          return;
        }

        setProduct(data);
      } catch (loadError) {
        console.error(
          "Failed to load product:",
          loadError
        );

        if (isMounted) {
          setError(
            "We couldn't load this product. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId, isInvalidId]);

  useEffect(() => {
    let isMounted = true;

    getCategories().then((data) => {
      if (isMounted) {
        setCategories(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F3F1EC] text-[#171715]">
      {/* Loading */}
      {isLoading && (
        <section className="flex min-h-[60vh] items-center justify-center px-5">
          <div className="text-center">
            <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-[#DDD8CF] border-t-[#292722]" />

            <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#99948A]">
              Loading Product
            </p>
          </div>
        </section>
      )}

      {/* Not found */}
      {(isInvalidId ||
        (!isLoading && isNotFound)) && (
        <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-5 py-16">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#E7E0D3] opacity-60 blur-3xl" />

          <div className="relative z-10 w-full max-w-xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E4E0D8] bg-white text-[#A29C91]">
              <FiBox
                size={26}
                strokeWidth={1.2}
              />
            </div>

            <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9A958B]">
              LUXORA / Product Management
            </p>

            <h1 className="mt-3 text-3xl font-medium tracking-[-0.045em] text-[#171715] sm:text-4xl">
              Product not found.
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#77736B]">
              The product you&apos;re trying to edit doesn&apos;t
              exist or was removed from the catalog.
            </p>

            <Link
              href="/admin/products"
              className="group mx-auto mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#1C1B18] px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34322D]"
            >
              <FiArrowLeft
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to Products
            </Link>
          </div>
        </section>
      )}

      {/* Error */}
      {!isLoading && !isNotFound && error && (
        <section className="mx-auto max-w-[900px] px-5 py-10 sm:px-8 lg:px-10">
          <div className="rounded-2xl border border-[#E2D7C7] bg-[#FBF7EF] px-5 py-6 sm:px-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9B896C]">
              Catalog Error
            </p>

            <p className="mt-1 text-sm text-[#6F685D]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#292722] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#45423B]"
            >
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* Form */}
      {!isLoading && !isNotFound && !error && product && (
        <ProductForm
          mode="edit"
          productId={product.id}
          product={product}
          categories={categories}
          onSubmit={(updatedProduct) => {
            updateProduct(product.id, updatedProduct);

            showToast(
              "success",
              "Product updated",
              `"${updatedProduct.title}" has been saved.`
            );

            router.push("/admin/products");
          }}
          onCancel={() => router.push("/admin/products")}
        />
      )}
    </main>
  );
};

export default EditProductPage;