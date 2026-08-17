"use client";

import { FiHeart } from "react-icons/fi";

import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/product";

type ProductWishlistButtonProps = {
  product: Product;
};

export default function ProductWishlistButton({
  product,
}: ProductWishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const liked = isInWishlist(product.id);

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(product)}
      aria-label={
        liked
          ? `Remove ${product.title} from wishlist`
          : `Add ${product.title} to wishlist`
      }
      aria-pressed={liked}
      className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border transition-all duration-300 ${
        liked
          ? "border-neutral-950 bg-neutral-950 text-white"
          : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
      }`}
    >
      <FiHeart
        size={17}
        strokeWidth={1.5}
        className={`transition-transform duration-300 ${
          liked ? "scale-105 fill-current" : ""
        }`}
      />
    </button>
  );
}