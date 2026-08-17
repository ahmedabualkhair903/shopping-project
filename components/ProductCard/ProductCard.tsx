
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiHeart,
  FiStar,
} from "react-icons/fi";

import type { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const liked = isInWishlist(product.id);

  const handleWishlistClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);
  };

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#f5f5f2]">
        {/* Product Link */}

        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
          className="absolute inset-0 z-[1]"
        >
          {/* Product Image */}

          <div className="flex h-full w-full items-center justify-center p-3 sm:p-5">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={750}
              priority={product.id <= 8}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.055]"
            />
          </div>

          {/* Soft Overlay */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:from-black/75" />
        </Link>

        {/* Wishlist */}

        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={
            liked
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          aria-pressed={liked}
          className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            liked
              ? "border-[#30383c] bg-[#30383c] text-white"
              : "border-white/50 bg-white/90 text-[#30383c] hover:border-white hover:bg-white"
          }`}
        >
          <FiHeart
            size={18}
            strokeWidth={1.35}
            className={liked ? "fill-current" : ""}
          />
        </button>

        {/* View Product */}

        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
          className="absolute bottom-5 right-5 z-10 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-[#30383c] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#56adbf] hover:text-white"
        >
          <FiArrowUpRight
            size={19}
            strokeWidth={1.35}
          />
        </Link>

        {/* Product Information */}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-5 sm:p-6">
          {/* Category */}

          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65">
            {product.category}
          </p>

          {/* Title */}

          <Link
            href={`/products/${product.id}`}
            className="pointer-events-auto block"
          >
            <h3 className="mt-2 max-w-[90%] text-[18px] font-medium leading-[1.25] tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-white/85 sm:text-[21px]">
              {product.title}
            </h3>
          </Link>

          {/* Price + Rating */}

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-[16px] font-semibold tracking-[-0.02em] text-white sm:text-[17px]">
              ${product.price.toFixed(2)}
            </p>

            {product.rating && (
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1.5 backdrop-blur-md">
                <FiStar
                  size={11}
                  strokeWidth={1.3}
                  className="fill-current text-white"
                />

                <span className="text-[10px] font-medium text-white">
                  {product.rating.rate.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

