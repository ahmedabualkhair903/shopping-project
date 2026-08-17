"use client";

import Image from "next/image";
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
        {/* PRODUCT IMAGE */}
        <Link
          href={`/products/${id}`}
          aria-label={`View ${title}`}
          className="relative flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f3f1eb] transition-all duration-500 hover:bg-[#eeece5] sm:h-28 sm:w-28"
        >
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/80 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.14em] text-[#7c807c] backdrop-blur-sm">
            LUXORA
          </span>

          <Image
            src={image}
            alt={title}
            width={180}
            height={180}
            sizes="(max-width: 640px) 100vw, 112px"
            className="h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </Link>

        {/* PRODUCT INFORMATION */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="min-w-0">
            <p className="mb-2 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#a09f99]">
              Product
            </p>

            <Link
              href={`/products/${id}`}
              className="inline-block max-w-full"
            >
              <h2 className="line-clamp-2 text-[14px] font-medium leading-5 tracking-[-0.02em] text-[#292b29] transition-colors duration-300 hover:text-[#5b9ca6]">
                {title}
              </h2>
            </Link>

            <p className="mt-2 text-[10px] text-[#8d918c]">
              ${price.toFixed(2)} each
            </p>
          </div>

          {/* QUANTITY + REMOVE */}
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="flex h-9 items-center overflow-hidden rounded-full border border-[#deddd6] bg-[#faf9f6]"
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
                className="flex h-full w-9 items-center justify-center text-[#858984] transition-all duration-200 hover:bg-[#eeece5] hover:text-[#292b29] focus:outline-none focus:ring-1 focus:ring-[#aeb9b5]"
              >
                <FiMinus
                  size={12}
                  strokeWidth={1.5}
                />
              </button>

              <span
                className="flex w-8 justify-center text-[10px] font-semibold text-[#292b29]"
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                aria-label="Increase quantity"
                className="flex h-full w-9 items-center justify-center text-[#858984] transition-all duration-200 hover:bg-[#eeece5] hover:text-[#292b29] focus:outline-none focus:ring-1 focus:ring-[#aeb9b5]"
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
              className="inline-flex items-center gap-2 rounded-full px-2 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#a19f99] transition-all duration-300 hover:bg-[#f8eeee] hover:text-[#b96d6d] focus:outline-none focus:ring-1 focus:ring-[#d8a3a3]"
            >
              <FiTrash2
                size={12}
                strokeWidth={1.4}
              />

              <span>Remove</span>
            </button>
          </div>
        </div>

        {/* ITEM TOTAL */}
        <div className="flex items-center justify-between border-t border-[#ebe9e3] pt-4 sm:min-w-[120px] sm:border-0 sm:pt-0 sm:text-right">
          <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#aaa9a3] sm:hidden">
            Item total
          </p>

          <div className="sm:ml-auto">
            <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#aaa9a3] sm:mb-1">
              Total
            </p>

            <p className="text-[15px] font-medium tracking-[-0.025em] text-[#292b29]">
              ${itemTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;