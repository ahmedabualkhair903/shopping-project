export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-white text-[#252c30]">
      {/* =========================
          BACK NAVIGATION
      ========================== */}
      <div className="border-b border-[#ecebe6] bg-[#fbfaf7]">
        <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10">
          <div className="h-3 w-24 animate-pulse rounded-full bg-[#e3e8e6]" />
        </div>
      </div>

      {/* =========================
          PRODUCT SECTION
      ========================== */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-24">
          {/* =========================
              PRODUCT IMAGE SKELETON
          ========================== */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#f4f7f5]">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d7f1f2]/60 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#eee4d4]/50 blur-3xl" />

            {/* Grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(48,56,60,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(48,56,60,0.025) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            {/* Badge */}
            <div className="absolute left-5 top-5 z-10">
              <div className="h-7 w-24 animate-pulse rounded-full bg-white/70" />
            </div>

            {/* Wishlist */}
            <div className="absolute right-5 top-5 z-10">
              <div className="h-10 w-10 animate-pulse rounded-full bg-white/75" />
            </div>

            {/* Product image placeholder */}
            <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
              <div className="h-[72%] w-[72%] animate-pulse rounded-[24px] bg-white/65" />
            </div>

            {/* Bottom labels */}
            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
              <div className="h-7 w-28 animate-pulse rounded-full bg-white/65" />

              <div className="h-2.5 w-20 animate-pulse rounded-full bg-[#d9dfdc]" />
            </div>
          </div>

          {/* =========================
              PRODUCT INFORMATION
          ========================== */}
          <div className="flex flex-col justify-center lg:max-w-[550px]">
            {/* Category */}
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b8dfe4]" />

              <div className="h-2.5 w-32 animate-pulse rounded-full bg-[#e2e7e5]" />
            </div>

            {/* Title */}
            <div className="mt-5 space-y-3">
              <div className="h-10 w-full max-w-[520px] animate-pulse rounded-lg bg-[#e4e9e7] sm:h-12 lg:h-14" />

              <div className="h-10 w-[72%] max-w-[390px] animate-pulse rounded-lg bg-[#edf0ee] sm:h-12 lg:h-14" />
            </div>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-4 w-24 animate-pulse rounded-full bg-[#e9edeb]" />

              <div className="h-2.5 w-20 animate-pulse rounded-full bg-[#f0f2f1]" />
            </div>

            {/* Price */}
            <div className="mt-7 flex items-center gap-3">
              <div className="h-8 w-24 animate-pulse rounded-lg bg-[#dfe9e7]" />

              <div className="h-2.5 w-7 animate-pulse rounded-full bg-[#ecefed]" />
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-[#e7e6e1]" />

            {/* Description */}
            <div>
              <div className="h-2.5 w-28 animate-pulse rounded-full bg-[#e1e6e4]" />

              <div className="mt-5 space-y-2.5">
                <div className="h-3 w-full max-w-[510px] animate-pulse rounded-full bg-[#eef1ef]" />

                <div className="h-3 w-full max-w-[490px] animate-pulse rounded-full bg-[#eef1ef]" />

                <div className="h-3 w-[82%] max-w-[410px] animate-pulse rounded-full bg-[#f1f3f2]" />

                <div className="h-3 w-[65%] max-w-[330px] animate-pulse rounded-full bg-[#f3f4f3]" />
              </div>
            </div>

            {/* Product Actions */}
            <div className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="h-12 w-full animate-pulse rounded-xl bg-[#e2e8e6]" />

                <div className="h-12 w-full animate-pulse rounded-xl bg-[#edf1ef] sm:max-w-[150px]" />
              </div>
            </div>

            {/* =========================
                SHOPPING BENEFITS
            ========================== */}
            <div className="mt-10 grid gap-3 border-t border-[#e7e6e1] pt-7 sm:grid-cols-3">
              {/* Delivery */}
              <div className="rounded-2xl bg-[#f3f8f7] p-4">
                <div className="h-9 w-9 animate-pulse rounded-full bg-white" />

                <div className="mt-3 h-2.5 w-20 animate-pulse rounded-full bg-[#dce6e3]" />

                <div className="mt-2 h-2 w-24 animate-pulse rounded-full bg-[#e8eeec]" />
              </div>

              {/* Returns */}
              <div className="rounded-2xl bg-[#faf6ef] p-4">
                <div className="h-9 w-9 animate-pulse rounded-full bg-white" />

                <div className="mt-3 h-2.5 w-20 animate-pulse rounded-full bg-[#e8dfd2]" />

                <div className="mt-2 h-2 w-24 animate-pulse rounded-full bg-[#eee9e1]" />
              </div>

              {/* Secure checkout */}
              <div className="rounded-2xl bg-[#f2f7fa] p-4">
                <div className="h-9 w-9 animate-pulse rounded-full bg-white" />

                <div className="mt-3 h-2.5 w-24 animate-pulse rounded-full bg-[#dce6eb]" />

                <div className="mt-2 h-2 w-28 animate-pulse rounded-full bg-[#e8eef1]" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            REVIEWS SKELETON
        ========================== */}
        <div className="mt-20 border-t border-[#e7e6e1] pt-14 sm:mt-28 sm:pt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="h-2.5 w-24 animate-pulse rounded-full bg-[#e2e7e5]" />

              <div className="mt-4 h-9 w-48 animate-pulse rounded-lg bg-[#e4e9e7] sm:h-10 sm:w-56" />
            </div>

            <div className="h-8 w-28 animate-pulse rounded-full bg-[#eef1ef]" />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#eceeea] bg-[#fbfcfb] p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-[#e4e9e7]" />

                  <div className="h-3 w-16 animate-pulse rounded-full bg-[#edf0ef]" />
                </div>

                <div className="mt-5 space-y-2.5">
                  <div className="h-2.5 w-full animate-pulse rounded-full bg-[#eef1ef]" />

                  <div className="h-2.5 w-[90%] animate-pulse rounded-full bg-[#eef1ef]" />

                  <div className="h-2.5 w-[70%] animate-pulse rounded-full bg-[#f2f4f3]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            RELATED PRODUCTS SKELETON
        ========================== */}
        <div className="mt-20 border-t border-[#e7e6e1] pt-14 sm:mt-28 sm:pt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b8dfe4]" />

                <div className="h-2.5 w-32 animate-pulse rounded-full bg-[#e2e7e5]" />
              </div>

              <div className="mt-4 h-9 w-72 animate-pulse rounded-lg bg-[#e4e9e7] sm:h-10 sm:w-80" />

              <div className="mt-3 h-2.5 w-full max-w-md animate-pulse rounded-full bg-[#eef1ef]" />
            </div>

            <div className="h-10 w-32 animate-pulse rounded-full bg-[#eef4f3]" />
          </div>

          {/* Related cards */}
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-[4/5] animate-pulse rounded-[20px] bg-[#f4f7f5]" />

                <div className="mt-4 h-2.5 w-20 animate-pulse rounded-full bg-[#e8edeb]" />

                <div className="mt-2 h-4 w-[85%] animate-pulse rounded-full bg-[#e2e7e5]" />

                <div className="mt-3 h-3 w-16 animate-pulse rounded-full bg-[#edf0ee]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}