export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="h-3 w-28 animate-pulse bg-neutral-200" />

          <div className="mt-5 h-12 w-64 animate-pulse bg-neutral-200 sm:h-14 sm:w-80 lg:h-16 lg:w-96" />

          <div className="mt-5 h-4 w-full max-w-xl animate-pulse bg-neutral-100" />

          <div className="mt-2 h-4 w-4/5 max-w-lg animate-pulse bg-neutral-100" />
        </div>
      </section>

      {/* Products Skeleton */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* Explorer Controls */}
        <div className="border-b border-neutral-200 pb-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-10 w-full max-w-sm animate-pulse border-b border-neutral-200 bg-neutral-50" />

            <div className="h-10 w-36 animate-pulse bg-neutral-100" />
          </div>

          <div className="mt-6 flex gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-16 animate-pulse bg-neutral-100"
              />
            ))}
          </div>
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between py-6">
          <div className="h-3 w-24 animate-pulse bg-neutral-100" />

          <div className="h-3 w-20 animate-pulse bg-neutral-100" />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <div className="aspect-[4/5] animate-pulse bg-neutral-100" />

              <div className="mt-4 h-3 w-20 animate-pulse bg-neutral-100" />

              <div className="mt-2 h-5 w-4/5 animate-pulse bg-neutral-200" />

              <div className="mt-3 h-4 w-16 animate-pulse bg-neutral-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}