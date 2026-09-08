"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiX,
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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowConfirmation(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
  };

  const totalPrice = product.price * quantity;

  useEffect(() => {
    if (!showConfirmation) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowConfirmation(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showConfirmation]);

  useEffect(() => {
    if (!showConfirmation) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showConfirmation]);

  return (
    <>
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
            className="group flex h-13 flex-1 items-center justify-center gap-3 rounded-full bg-[#b8e3c5] px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#244c31] shadow-[0_8px_24px_rgba(110,170,125,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9fd6ad] hover:shadow-[0_12px_28px_rgba(110,170,125,0.18)]"
          >
            <FiShoppingBag
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />

            Add to cart
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

      {/* =====================================================
          ADD TO CART CONFIRMATION MODAL
      ====================================================== */}
      {showConfirmation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#182124]/55 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Product added to cart"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowConfirmation(false);
            }
          }}
        >
          <div
            className="relative w-full max-w-[500px] overflow-hidden rounded-[30px] bg-white shadow-[0_30px_90px_rgba(20,30,32,0.22)] animate-[modalIn_0.28s_ease-out]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#687376] shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-[#f3f7f5] hover:text-[#30383c]"
            >
              <FiX
                size={17}
                strokeWidth={1.5}
              />
            </button>

            {/* Product Image */}
            <div className="relative flex h-[270px] items-center justify-center overflow-hidden bg-[#f3f8f5] sm:h-[310px]">
              <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#d7f1df]/70 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-[#eee4d4]/50 blur-3xl" />

              <img
                src={product.image}
                alt={product.title}
                className="relative z-10 h-[220px] w-[220px] object-contain drop-shadow-[0_20px_28px_rgba(35,48,50,0.13)] sm:h-[260px] sm:w-[260px]"
              />

              {/* Added Badge */}
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-md">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b8e3c5] text-[#244c31]">
                  <FiCheck
                    size={12}
                    strokeWidth={2}
                  />
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#52605d]">
                  Added to cart
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="text-center">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#7f898b]">
                  Your selection
                </p>

                <h2 className="mt-2 text-[21px] font-medium leading-[1.2] tracking-[-0.035em] text-[#252c30] sm:text-[24px]">
                  {product.title}
                </h2>
              </div>

              {/* Order Details */}
              <div className="mt-6 rounded-2xl bg-[#f7f9f7] p-4">
                <div className="flex items-center justify-between border-b border-[#e7ebe8] pb-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#7d888b]">
                    Quantity
                  </span>

                  <span className="text-[11px] font-semibold text-[#30383c]">
                    {quantity}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#7d888b]">
                    Total
                  </span>

                  <span className="text-[17px] font-semibold tracking-[-0.02em] text-[#30383c]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Buy Now */}
              <Link
                href="/checkout"
                onClick={handleBuyNow}
                className="mt-5 flex h-13 w-full items-center justify-center gap-3 rounded-full bg-[#9fd6ad] px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#244c31] shadow-[0_10px_25px_rgba(110,170,125,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8acb9b] hover:shadow-[0_14px_30px_rgba(110,170,125,0.2)]"
              >
                <FiShoppingBag
                  size={16}
                  strokeWidth={1.5}
                />

                Buy now
              </Link>

              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="mt-3 w-full py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8b9496] transition-colors duration-300 hover:text-[#30383c]"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Animation */}
      <style jsx global>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ProductActions;