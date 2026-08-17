import Link from "next/link";
import {
  FiArrowLeft,
  FiPackage,
} from "react-icons/fi";

export default function ProductNotFound() {
  return (
    <main className="min-h-[70vh] bg-white">
      <section className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
            <FiPackage
              size={27}
              strokeWidth={1.4}
            />
          </div>

          <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            LUXORA / Product
          </p>

          <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em] text-neutral-950 sm:text-5xl">
            Product not found
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-neutral-500">
            Sorry, we couldn&apos;t find the product you&apos;re
            looking for. It may have been removed or the link
            may be incorrect.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              <FiArrowLeft size={15} />
              Back to shop
            </Link>

            <Link
              href="/"
              className="px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
            >
              Go home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}