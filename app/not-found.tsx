import Link from "next/link";
import {
  FiArrowLeft,
  FiCompass,
} from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex min-h-[75vh] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
        <div className="w-full max-w-xl text-center">
          <p className="text-8xl font-medium tracking-[-0.08em] text-neutral-100 sm:text-9xl">
            404
          </p>

          <div className="-mt-4 sm:-mt-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
              <FiCompass
                size={24}
                strokeWidth={1.4}
              />
            </div>

            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              LUXORA
            </p>

            <h1 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-neutral-950 sm:text-4xl">
              Page not found
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-500">
              The page you&apos;re looking for doesn&apos;t exist
              or may have been moved.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <FiArrowLeft size={15} />
                Back home
              </Link>

              <Link
                href="/products"
                className="px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
              >
                Browse products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}