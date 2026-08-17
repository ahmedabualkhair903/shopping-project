export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10">
          <div className="h-3 w-24 animate-pulse bg-neutral-200" />
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 xl:gap-28">
          {/* Image */}
          <div className="aspect-square animate-pulse bg-neutral-100 lg:aspect-[4/5]" />

          {/* Information */}
          <div className="flex flex-col justify-center">
            <div className="h-3 w-24 animate-pulse bg-neutral-100" />

            <div className="mt-5 h-10 w-full max-w-lg animate-pulse bg-neutral-200 sm:h-12" />

            <div className="mt-3 h-10 w-3/4 max-w-md animate-pulse bg-neutral-100 sm:h-12" />

            {/* Rating */}
            <div className="mt-6 h-4 w-32 animate-pulse bg-neutral-100" />

            {/* Price */}
            <div className="mt-8 h-8 w-24 animate-pulse bg-neutral-200" />

            <div className="my-8 h-px bg-neutral-200" />

            {/* Description */}
            <div className="h-3 w-20 animate-pulse bg-neutral-100" />

            <div className="mt-5 space-y-2">
              <div className="h-3 w-full animate-pulse bg-neutral-100" />
              <div className="h-3 w-full animate-pulse bg-neutral-100" />
              <div className="h-3 w-4/5 animate-pulse bg-neutral-100" />
            </div>

            {/* Cart */}
            <div className="mt-8 h-12 w-full animate-pulse bg-neutral-200" />

            {/* Benefits */}
            <div className="mt-10 grid gap-6 border-t border-neutral-200 pt-7 sm:grid-cols-2">
              <div>
                <div className="h-4 w-28 animate-pulse bg-neutral-200" />
                <div className="mt-2 h-3 w-32 animate-pulse bg-neutral-100" />
              </div>

              <div>
                <div className="h-4 w-28 animate-pulse bg-neutral-200" />
                <div className="mt-2 h-3 w-32 animate-pulse bg-neutral-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="mt-12 border-t border-neutral-200 pt-10">
          <div className="h-8 w-56 animate-pulse bg-neutral-200" />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="h-32 animate-pulse bg-neutral-100" />
            <div className="h-32 animate-pulse bg-neutral-100" />
          </div>
        </div>
      </section>
    </main>
  );
}