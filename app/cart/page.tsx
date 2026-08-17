"use client";

import Link from "next/link";
import {
  FiArrowRight,
  FiCheck,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";

import CartItem from "@/components/CartItem/CartItem";
import { useCart } from "@/context/CartContext";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 7.99;

const CartPage = () => {
  const {
    items,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const shipping =
    totalPrice >= FREE_SHIPPING_THRESHOLD ||
    totalPrice === 0
      ? 0
      : SHIPPING_COST;

  const total = totalPrice + shipping;

  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - totalPrice,
    0
  );

  const shippingProgress = Math.min(
    (totalPrice / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );

  const handleClearCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove all items from your cart?"
    );

    if (!confirmed) {
      return;
    }

    clearCart();
  };

  /* =========================
     EMPTY CART
  ========================== */

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F0FAFC] text-[#252c30]">
        <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-5 py-20 sm:px-8 lg:px-10">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#dff4f5]/60 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#eee6d8]/45 blur-3xl" />

          <div className="relative w-full max-w-[560px] text-center">
            {/* Icon */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#dce8e8] bg-white shadow-[0_18px_50px_rgba(48,56,60,0.06)]">
              <FiShoppingBag
                size={30}
                strokeWidth={1.2}
                className="text-[#56adbf]"
              />

              <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-[#73d8e8]" />
            </div>

            <p className="mt-9 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#718086]">
              LUXORA / Shopping Bag
            </p>

            <h1 className="mt-4 text-[42px] font-medium leading-[0.95] tracking-[-0.065em] text-[#252c30] sm:text-[58px]">
              Your bag is empty.
            </h1>

            <p className="mx-auto mt-6 max-w-[400px] text-[12px] leading-6 text-[#7a878b]">
              Nothing has been added to your shopping bag yet.
              Explore our collection and discover something worth
              bringing home.
            </p>

            <Link
              href="/products"
              className="group mx-auto mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-[#30383c] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(48,56,60,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#56adbf] hover:shadow-[0_15px_32px_rgba(86,173,191,0.2)]"
            >
              Explore collection

              <FiArrowRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0FAFC] text-[#252c30]">
      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="relative overflow-hidden border-b border-black/[0.07] bg-[#F0FAFC]">
        {/* Decorative Shapes */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#dff4f5]/55 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-36 left-[15%] h-72 w-72 rounded-full bg-[#eee7dc]/35 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[5px] w-[5px] rounded-full bg-[#56b7c9]" />

                <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#718086]">
                  LUXORA / Shopping Bag
                </p>
              </div>

              <h1 className="mt-5 text-[46px] font-medium leading-[0.9] tracking-[-0.07em] text-[#252c30] sm:text-[62px]">
                Your bag.
              </h1>

              <p className="mt-5 text-[11px] text-[#7b898d]">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"} selected
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearCart}
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#d8e1e2] bg-white/70 px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#7b898d] transition-all duration-300 hover:border-[#e6b5b5] hover:bg-[#fff8f8] hover:text-[#c66b6b]"
            >
              <FiTrash2
                size={13}
                strokeWidth={1.3}
              />

              Clear bag
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          CONTENT
      ========================== */}

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_370px] lg:gap-14 xl:grid-cols-[1fr_400px] xl:gap-20">
          {/* =========================
              ITEMS
          ========================== */}

          <div>
            <div className="flex items-center justify-between border-b border-[#d9e9ec] px-1 pb-4">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.23em] text-[#52656b]">
                  Selected items
                </p>

                <p className="mt-1.5 text-[10px] text-[#8a9699]">
                  Review your selection before checkout
                </p>
              </div>

              <span className="rounded-full bg-[#edfafd] px-3 py-1.5 text-[8px] font-semibold text-[#4c8f9d]">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="mt-2 overflow-hidden rounded-2xl border border-[#dce5e6] bg-white/80 px-4 shadow-[0_12px_40px_rgba(48,56,60,0.025)] sm:px-6">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                />
              ))}
            </div>

            {/* =========================
                SHIPPING PROGRESS
            ========================== */}

            <div className="mt-8 rounded-2xl border border-[#dce5e6] bg-white/80 p-5 shadow-[0_10px_35px_rgba(48,56,60,0.025)] sm:p-6">
              {totalPrice < FREE_SHIPPING_THRESHOLD ? (
                <>
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edfafd] text-[#56adbf]">
                        <FiTruck
                          size={16}
                          strokeWidth={1.3}
                        />
                      </span>

                      <div>
                        <p className="text-[11px] font-semibold text-[#30383c]">
                          ${remainingForFreeShipping.toFixed(2)}{" "}
                          away from free delivery
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-[#879397]">
                          Add another product to unlock free
                          shipping.
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#f2f6f6] px-2.5 py-1 text-[8px] font-medium text-[#718086]">
                      ${totalPrice.toFixed(2)} / $50
                    </span>
                  </div>

                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#e7eeee]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#73d8e8] to-[#56adbf] transition-all duration-500"
                      style={{
                        width: `${shippingProgress}%`,
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f7ef] text-[#4ca879]">
                    <FiCheck
                      size={17}
                      strokeWidth={1.4}
                    />
                  </span>

                  <div>
                    <p className="text-[11px] font-semibold text-[#30383c]">
                      Free shipping unlocked.
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-[#879397]">
                      Your order qualifies for free delivery.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <aside className="h-fit rounded-2xl border border-[#d8e2e3] bg-white p-6 shadow-[0_18px_55px_rgba(48,56,60,0.065)] lg:sticky lg:top-28 sm:p-7">
            <div className="flex items-center justify-between border-b border-[#e5ebec] pb-5">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#52656b]">
                  Order summary
                </p>

                <p className="mt-1.5 text-[9px] text-[#909a9d]">
                  Your order total
                </p>
              </div>

              <span className="rounded-full bg-[#edfafd] px-3 py-1 text-[8px] font-semibold text-[#4c8f9d]">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#7b898d]">
                  Subtotal
                </span>

                <span className="text-[11px] font-semibold text-[#30383c]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#7b898d]">
                  Shipping
                </span>

                <span
                  className={`text-[11px] font-semibold ${
                    shipping === 0
                      ? "text-[#4ca879]"
                      : "text-[#30383c]"
                  }`}
                >
                  {shipping === 0
                    ? "Free"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="my-6 h-px bg-[#e5ebec]" />

              <div className="flex items-end justify-between">
                <span className="text-[11px] font-semibold text-[#30383c]">
                  Total
                </span>

                <span className="text-[26px] font-semibold tracking-[-0.05em] text-[#252c30]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout */}

            <Link
              href="/checkout"
              className="group mt-8 flex h-13 items-center justify-center gap-3 rounded-full bg-[#30383c] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_25px_rgba(48,56,60,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#56adbf] hover:shadow-[0_14px_30px_rgba(86,173,191,0.2)]"
            >
              Proceed to checkout

              <FiArrowRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Continue Shopping */}

            <Link
              href="/products"
              className="mt-3 flex h-11 items-center justify-center rounded-full border border-[#d6e0e2] bg-[#fafcfc] text-[9px] font-semibold uppercase tracking-[0.18em] text-[#59696e] transition-all duration-300 hover:border-[#8bcbd5] hover:bg-[#edfafd] hover:text-[#3f8e9d]"
            >
              Continue shopping
            </Link>

            {/* =========================
                SHIPPING MESSAGE
            ========================== */}

            <div className="mt-7 border-t border-[#e5ebec] pt-6">
              {shipping === 0 ? (
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f7ef] text-[#4ca879]">
                    <FiCheck
                      size={15}
                      strokeWidth={1.3}
                    />
                  </span>

                  <div>
                    <p className="text-[10px] font-semibold text-[#30383c]">
                      Free shipping applied
                    </p>

                    <p className="mt-1 text-[9px] leading-5 text-[#899599]">
                      Your order qualifies for free delivery.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edfafd] text-[#56adbf]">
                    <FiTruck
                      size={15}
                      strokeWidth={1.3}
                    />
                  </span>

                  <div>
                    <p className="text-[10px] font-semibold text-[#30383c]">
                      Free shipping over $50
                    </p>

                    <p className="mt-1 text-[9px] leading-5 text-[#899599]">
                      Add ${remainingForFreeShipping.toFixed(2)}{" "}
                      more to your order.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* =========================
                TRUST
            ========================== */}

            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#e5ebec] pt-5">
              <div className="rounded-xl bg-[#f6f9f9] p-3">
                <FiCheck
                  size={14}
                  strokeWidth={1.3}
                  className="text-[#56adbf]"
                />

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#718086]">
                  Secure checkout
                </p>
              </div>

              <div className="rounded-xl bg-[#f6f9f9] p-3">
                <FiTruck
                  size={14}
                  strokeWidth={1.3}
                  className="text-[#56adbf]"
                />

                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#718086]">
                  Fast delivery
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CartPage;