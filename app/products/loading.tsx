export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-white text-[#252c30]">
      {/* =========================
          PAGE HEADER SKELETON
      ========================== */}
      <section className="border-b border-[#ecebe6] bg-[#fbfaf7]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b8dfe4]" />

            <div className="h-2.5 w-28 animate-pulse rounded-full bg-[#e2e7e5]" />
          </div>

          {/* Title */}
          <div className="mt-5 h-12 w-64 animate-pulse rounded-lg bg-[#e3e8e6] sm:h-14 sm:w-80 lg:h-16 lg:w-96" />

          {/* Description */}
          <div className="mt-5 space-y-2.5">
            <div className="h-3 w-full max-w-xl animate-pulse rounded-full bg-[#edf0ee]" />

            <div className="h-3 w-4/5 max-w-lg animate-pulse rounded-full bg-[#f0f2f1]" />
          </div>
        </div>
      </section>

      {/* =========================
          PRODUCTS SECTION
      ========================== */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* =========================
            EXPLORER CONTROLS
        ========================== */}
        <div className="border-b border-[#e7e6e1] pb-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="h-11 w-full max-w-sm animate-pulse rounded-xl border border-[#e7e9e7] bg-[#fafbfa]" />

            {/* Sort */}
            <div className="h-11 w-full animate-pulse rounded-xl bg-[#f0f3f1] sm:w-36" />
          </div>

          {/* Categories */}
          <div className="mt-6 flex gap-5 overflow-hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`h-3 shrink-0 animate-pulse rounded-full ${
                  index === 0 ? "w-20 bg-[#dfe9e7]" : "w-16 bg-[#eef1ef]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* =========================
            RESULT COUNT
        ========================== */}
        <div className="flex items-center justify-between py-6">
          <div className="h-2.5 w-24 animate-pulse rounded-full bg-[#e8edeb]" />

          <div className="h-2.5 w-20 animate-pulse rounded-full bg-[#eef1ef]" />
        </div>

        {/* =========================
            PRODUCT GRID
        ========================== */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="group">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#f4f7f5]">
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#d7f1f2]/40 blur-2xl" />

                <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#eee4d4]/35 blur-2xl" />

                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="h-[62%] w-[62%] animate-pulse rounded-[18px] bg-white/65" />
                </div>

                {/* Wishlist placeholder */}
                <div className="absolute right-3 top-3">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-white/75" />
                </div>
              </div>

              {/* Category */}
              <div className="mt-4 h-2.5 w-20 animate-pulse rounded-full bg-[#e8edeb]" />

              {/* Title */}
              <div className="mt-2 space-y-2">
                <div className="h-4 w-[88%] animate-pulse rounded-full bg-[#e2e7e5]" />

                <div className="h-3.5 w-[62%] animate-pulse rounded-full bg-[#edf0ee]" />
              </div>

              {/* Price */}
              <div className="mt-3 h-3 w-16 animate-pulse rounded-full bg-[#e8edeb]" />
            </div>
          ))}
        </div>

        {/* =========================
            MOBILE LOAD MORE AREA
        ========================== */}
        <div className="mt-12 flex justify-center lg:hidden">
          <div className="h-10 w-32 animate-pulse rounded-full bg-[#eef2f0]" />
        </div>
      </section>
    </main>
  );
}