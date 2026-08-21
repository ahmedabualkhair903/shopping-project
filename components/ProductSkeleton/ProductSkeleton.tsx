const ProductSkeleton = () => {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#e5e7e4] bg-white"
      aria-hidden="true"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#f3f5f2]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-4 p-5 sm:p-6">
        {/* Category */}
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-[#e8ebe8]" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-3.5 w-[85%] animate-pulse rounded-full bg-[#e3e6e3]" />
          <div className="h-3.5 w-[60%] animate-pulse rounded-full bg-[#e8ebe8]" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 animate-pulse rounded-full bg-[#e8ebe8]" />
          <div className="h-2.5 w-8 animate-pulse rounded-full bg-[#eef0ee]" />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-20 animate-pulse rounded-full bg-[#dde2df]" />

          <div className="h-9 w-9 animate-pulse rounded-full bg-[#e9ecea]" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;