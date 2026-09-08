"use client";

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
      {/* Product Image */}

      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#f6f6f3]">

        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
          className="absolute inset-0 z-[1]"
        >
          {/* Image */}

          <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-7">
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </div>

          {/* Soft bottom gradient */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:from-black/70" />
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
          className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 sm:h-11 sm:w-11 ${
            liked
              ? "border-[#30383c] bg-[#30383c] text-white"
              : "border-white/70 bg-white/90 text-[#30383c] hover:border-white hover:bg-white hover:text-[#2794aa]"
          }`}
        >
          <FiHeart
            size={17}
            strokeWidth={1.35}
            className={`transition-transform duration-300 ${
              liked
                ? "fill-current"
                : "group-hover:scale-105"
            }`}
          />
        </button>

        {/* View button */}

        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
          className="absolute bottom-5 right-5 z-10 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-[#30383c] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#56adbf] hover:text-white sm:h-11 sm:w-11"
        >
          <FiArrowUpRight
            size={18}
            strokeWidth={1.35}
            className="transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
          />
        </Link>

        {/* Product Information */}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">
          {/* Category */}

          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-[9px]">
            {product.category}
          </p>

          {/* Title */}

          <Link
            href={`/products/${product.id}`}
            className="pointer-events-auto block"
          >
            <h3 className="mt-1.5 line-clamp-2 max-w-[88%] text-[15px] font-medium leading-[1.25] tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-white/85 sm:text-[18px]">
              {product.title}
            </h3>
          </Link>

          {/* Price + Rating */}

          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-[14px] font-semibold tracking-[-0.02em] text-white sm:text-[16px]">
              ${product.price.toFixed(2)}
            </p>

            {product.rating && (
              <div className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 backdrop-blur-md">
                <FiStar
                  size={10}
                  strokeWidth={1.3}
                  className="fill-current text-white"
                />

                <span className="text-[9px] font-medium text-white">
                  {product.rating.rate.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Small details underneath */}

      <div className="mt-3 flex items-center justify-between px-1">
        <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#9aa3a5]">
          LUXORA
        </span>

        <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-[#b0b7b8]">
          View product
        </span>
      </div>
    </article>
  );
}