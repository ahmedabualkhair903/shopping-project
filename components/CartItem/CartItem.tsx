"use client";

import Link from "next/link";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import { useCart } from "@/context/CartContext";

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

const CartItem = ({
  id,
  title,
  price,
  image,
  quantity,
}: CartItemProps) => {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart();

  const itemTotal = price * quantity;

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeFromCart(id);
      return;
    }

    updateQuantity(id, quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  return (
    <article className="group relative border-b border-[#e8e6e0] py-6 first:pt-5 last:border-b-0 sm:py-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* =========================
            PRODUCT IMAGE
        ========================== */}
        <Link
          href={`/products/${id}`}
          aria-label={`View ${title}`}
          className="relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-[#f4f7f5] transition-all duration-500 hover:bg-[#eef3f1] sm:h-28 sm:w-28"
        >
          {/* Decorative glow */}
          <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#d7f1f2]/60 blur-2xl" />

          <span className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[#eee4d4]/45 blur-2xl" />

          {/* Brand badge */}
          <span className="absolute left-3 top-3 z-10 rounded-full border border-white/70 bg-white/75 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.14em] text-[#718083] shadow-sm backdrop-blur-md">
            LUXORA
          </span>

          <img
            src={image}
            alt={title}
            className="relative z-[1] h-full w-full object-contain p-6 drop-shadow-[0_10px_18px_rgba(35,48,50,0.07)] transition-transform duration-700 group-hover:scale-[1.06] sm:p-5"
          />
        </Link>

        {/* =========================
            PRODUCT INFORMATION
        ========================== */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
          <div className="min-w-0">
            <p className="mb-2 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#a09f99]">
              LUXORA / Product
            </p>

            <Link
              href={`/products/${id}`}
              className="inline-block max-w-full"
            >
              <h2 className="line-clamp-2 text-[14px] font-medium leading-5 tracking-[-0.02em] text-[#292b29] transition-colors duration-300 hover:text-[#2794aa]">
                {title}
              </h2>
            </Link>

            <p className="mt-2 text-[10px] text-[#8d918c]">
              ${price.toFixed(2)} each
            </p>
          </div>

          {/* =========================
              QUANTITY + REMOVE
          ========================== */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="flex h-9 items-center overflow-hidden rounded-full border border-[#dfe5e3] bg-[#fafcfa]"
              aria-label={`Quantity: ${quantity}`}
            >
              <button
                type="button"
                onClick={handleDecrease}
                aria-label={
                  quantity === 1
                    ? "Remove item"
                    : "Decrease quantity"
                }
                className="flex h-full w-9 items-center justify-center text-[#858984] transition-all duration-200 hover:bg-[#edf7f8] hover:text-[#2794aa] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a8dce3]"
              >
                <FiMinus
                  size={12}
                  strokeWidth={1.5}
                />
              </button>

              <span
                className="flex min-w-8 justify-center text-[10px] font-semibold text-[#292b29]"
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                aria-label="Increase quantity"
                className="flex h-full w-9 items-center justify-center text-[#858984] transition-all duration-200 hover:bg-[#edf7f8] hover:text-[#2794aa] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a8dce3]"
              >
                <FiPlus
                  size={12}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(id)}
              aria-label={`Remove ${title} from cart`}
              className="group/remove inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#a19f99] transition-all duration-300 hover:bg-[#fff4f4] hover:text-[#bc7070] focus:outline-none focus:ring-2 focus:ring-[#e5b6b6]"
            >
              <FiTrash2
                size={12}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover/remove:scale-110"
              />

              <span>Remove</span>
            </button>
          </div>
        </div>

        {/* =========================
            ITEM TOTAL
        ========================== */}
        <div className="flex items-center justify-between border-t border-[#ebe9e3] pt-4 sm:min-w-[120px] sm:border-0 sm:pt-0 sm:text-right">
          <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#aaa9a3] sm:hidden">
            Item total
          </p>

          <div className="sm:ml-auto">
            <p className="mb-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-[#aaa9a3]">
              Total
            </p>

            <p className="text-[16px] font-semibold tracking-[-0.025em] text-[#292b29]">
              ${itemTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;