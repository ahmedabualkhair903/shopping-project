"use client";

import { useState } from "react";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

type ProductActionsProps = {
  product: Product;
};

const ProductActions = ({
  product,
}: ProductActionsProps) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <div className="space-y-7">
      {/* Quantity */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#596467]">
            Quantity
          </p>

          <span className="text-[9px] uppercase tracking-[0.12em] text-[#9aa2a4]">
            Select amount
          </span>
        </div>

        <div className="flex h-12 w-fit items-center overflow-hidden rounded-full border border-[#dedfdb] bg-[#fafaf8]">
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label="Decrease quantity"
            className="flex h-full w-12 items-center justify-center text-[#7b8385] transition-all duration-300 hover:bg-[#eef8f8] hover:text-[#2794aa]"
          >
            <FiMinus
              size={14}
              strokeWidth={1.5}
            />
          </button>

          <span className="flex w-10 justify-center text-[12px] font-semibold text-[#30383c]">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="Increase quantity"
            className="flex h-full w-12 items-center justify-center text-[#7b8385] transition-all duration-300 hover:bg-[#eef8f8] hover:text-[#2794aa]"
          >
            <FiPlus
              size={14}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`group flex h-13 flex-1 items-center justify-center gap-3 rounded-full px-7 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
            added
              ? "bg-[#2794aa] text-white shadow-[0_10px_25px_rgba(39,148,170,0.16)]"
              : "bg-[#30383c] text-white hover:bg-[#2794aa] hover:shadow-[0_10px_25px_rgba(39,148,170,0.14)]"
          }`}
        >
          <FiShoppingBag
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />

          {added ? "Added to cart" : "Add to cart"}
        </button>

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="group flex h-13 items-center justify-center gap-3 rounded-full border border-[#dedfdb] bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#30383c] transition-all duration-300 hover:border-[#a9dce4] hover:bg-[#eef8f8] hover:text-[#2794aa]"
        >
          <FiHeart
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:scale-105"
          />

          <span>Wishlist</span>
        </button>
      </div>

      {/* Small reassurance */}
      <div className="flex items-center gap-3 border-t border-[#e8e7e2] pt-5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#56b7c9]" />

        <p className="text-[9px] leading-5 text-[#8a9294]">
          Secure checkout · Easy returns · Everyday essentials
        </p>
      </div>
    </div>
  );
};

export default ProductActions;