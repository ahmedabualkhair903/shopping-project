"use client";

import { useEffect } from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

type ProductsErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ProductsError({
  error,
  reset,
}: ProductsErrorProps) {
  useEffect(() => {
    console.error("Products page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-5">
      <section className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
          <FiAlertCircle size={24} strokeWidth={1.5} />
        </div>

        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          Something went wrong
        </p>

        <h1 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-neutral-950 sm:text-4xl">
          We couldn&apos;t load the products
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-500">
          We&apos;re having trouble connecting to our product
          service. Please try again in a moment.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex items-center gap-2 bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          <FiRefreshCw size={15} />
          Try again
        </button>
      </section>
    </main>
  );
}