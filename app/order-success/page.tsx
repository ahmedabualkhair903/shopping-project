"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FiArrowRight,
  FiCheck,
  FiCreditCard,
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

import { getOrder } from "@/lib/order";
import type { Order } from "@/types/order";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false);
      return;
    }

    const storedOrder = getOrder(orderId);

    setOrder(storedOrder);
    setIsLoading(false);
  }, [orderId]);

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#fbfcfb]">
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef9fa]">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#ccecef] border-t-[#56adbf]" />
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f898c]">
              LUXORA
            </p>

            <p className="mt-2 text-xs text-[#9aa3a6]">
              Preparing your order...
            </p>
          </div>
        </section>
      </main>
    );
  }

  /*
   * Order Not Found
   */
  if (!order) {
    return (
      <main className="min-h-screen bg-[#fbfcfb]">
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-16">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f2f6f5]">
              <FiShoppingBag
                size={28}
                strokeWidth={1.25}
                className="text-[#718083]"
              />
            </div>

            <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8d989b]">
              LUXORA / Order
            </p>

            <h1 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#252c30] sm:text-4xl">
              Order not found
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#7f898c]">
              We couldn&apos;t find the order you&apos;re looking
              for. Please check the order number and try again.
            </p>

            <Link
              href="/products"
              className="group mx-auto mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#30383c] px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#56adbf]"
            >
              Continue shopping

              <FiArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const isCashPayment = order.paymentMethod === "cash";

  const createdAt = new Date(order.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <main className="min-h-screen bg-[#fbfcfb]">
      {/* =====================================================
          SUCCESS HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-[#e5ebeb] bg-white">
        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#eef9fa]" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#f4f1e9]" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            {/* Success Icon */}

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#ccecef] bg-[#f5fcfc]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#56adbf] text-white shadow-[0_12px_35px_rgba(86,173,191,0.25)]">
                <FiCheck
                  size={30}
                  strokeWidth={1.8}
                />
              </div>

              <span className="absolute right-0 top-2 h-2.5 w-2.5 rounded-full bg-[#e6c98f]" />
              <span className="absolute bottom-1 left-1 h-2 w-2 rounded-full bg-[#b9dfe4]" />
            </div>

            {/* Eyebrow */}

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-[#a9dfe6]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#7f8b8e]">
                LUXORA / Order Confirmed
              </p>

              <span className="h-px w-7 bg-[#a9dfe6]" />
            </div>

            {/* Heading */}

            <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.065em] text-[#252c30] sm:text-5xl lg:text-6xl">
              Thank you for
              <span className="block text-[#56adbf]">
                your order.
              </span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#7b8689]">
              Your order has been successfully placed. We&apos;re
              getting everything ready and will take care of the
              rest.
            </p>

            {/* Order Number */}

            <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-[#e1e8e8] bg-[#fbfcfc] px-5 py-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef9fa] text-[#56adbf]">
                <FiPackage
                  size={12}
                  strokeWidth={1.5}
                />
              </span>

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#929c9f]">
                Order
              </span>

              <span className="max-w-[180px] truncate text-xs font-semibold text-[#30383c]">
                {order.id}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* =================================================
            ORDER STATUS CARDS
        ================================================== */}

        <div className="grid overflow-hidden rounded-[24px] border border-[#e2e9e9] bg-white shadow-[0_10px_40px_rgba(37,44,48,0.04)] sm:grid-cols-3">
          {/* Order */}

          <div className="border-b border-[#e8eded] p-5 sm:border-b-0 sm:border-r sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef9fa] text-[#56adbf]">
                <FiPackage
                  size={17}
                  strokeWidth={1.4}
                />
              </span>

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#9aa3a6]">
                  Order
                </p>

                <p className="mt-1 text-xs font-semibold text-[#30383c]">
                  #{order.id.slice(0, 8)}
                </p>
              </div>
            </div>
          </div>

          {/* Date */}

          <div className="border-b border-[#e8eded] p-5 sm:border-b-0 sm:border-r sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f1e9] text-[#806d50]">
                <FiShoppingBag
                  size={17}
                  strokeWidth={1.4}
                />
              </span>

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#9aa3a6]">
                  Placed on
                </p>

                <p className="mt-1 text-xs font-semibold text-[#30383c]">
                  {createdAt}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}

          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef5f1] text-[#648072]">
                <FiCheck
                  size={17}
                  strokeWidth={1.5}
                />
              </span>

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#9aa3a6]">
                  Status
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#56adbf]" />

                  <p className="text-xs font-semibold capitalize text-[#30383c]">
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            PROGRESS
        ================================================== */}

        <div className="mt-10 rounded-[24px] border border-[#e2e9e9] bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#919c9f]">
                Order progress
              </p>

              <h2 className="mt-2 text-lg font-medium tracking-[-0.035em] text-[#30383c]">
                Your order is being prepared
              </h2>
            </div>

            <span className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#eef9fa] text-[#56adbf] sm:flex">
              <FiTruck
                size={19}
                strokeWidth={1.4}
              />
            </span>
          </div>

          <div className="mt-8">
            <div className="relative">
              {/* Line */}

              <div className="absolute left-[8%] right-[8%] top-4 h-px bg-[#dfe8e8]" />

              <div className="absolute left-[8%] top-4 h-px w-[42%] bg-[#56adbf]" />

              <div className="relative grid grid-cols-3">
                {/* Confirmed */}

                <div className="text-left">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#56adbf] text-white ring-4 ring-[#eef9fa]">
                    <FiCheck
                      size={13}
                      strokeWidth={2}
                    />
                  </div>

                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#30383c]">
                    Confirmed
                  </p>

                  <p className="mt-1 text-[9px] text-[#919c9f]">
                    Order placed
                  </p>
                </div>

                {/* Preparing */}

                <div className="text-center">
                  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#30383c] text-white ring-4 ring-[#f0f2f2]">
                    <FiPackage
                      size={13}
                      strokeWidth={1.6}
                    />
                  </div>

                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#30383c]">
                    Preparing
                  </p>

                  <p className="mt-1 text-[9px] text-[#919c9f]">
                    Getting it ready
                  </p>
                </div>

                {/* Delivered */}

                <div className="text-right">
                  <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-[#dce5e5] bg-white text-[#a1abad]">
                    <FiTruck
                      size={13}
                      strokeWidth={1.4}
                    />
                  </div>

                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a1abad]">
                    Delivery
                  </p>

                  <p className="mt-1 text-[9px] text-[#b0b8ba]">
                    On the way
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            ORDER ITEMS
        ================================================== */}

        <div className="mt-10 overflow-hidden rounded-[24px] border border-[#e2e9e9] bg-white shadow-[0_10px_40px_rgba(37,44,48,0.035)]">
          <div className="flex items-end justify-between border-b border-[#e5ebeb] px-5 py-5 sm:px-7">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#919c9f]">
                Your purchase
              </p>

              <h2 className="mt-1 text-lg font-medium tracking-[-0.035em] text-[#30383c]">
                Order Items
              </h2>
            </div>

            <span className="rounded-full bg-[#f3f6f5] px-3 py-1.5 text-[9px] font-semibold text-[#707b7e]">
              {order.items.length}{" "}
              {order.items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="px-5 sm:px-7">
            {order.items.map((item, index) => (
              <div
                key={item.id}
                className={`group flex gap-4 py-5 sm:gap-6 sm:py-6 ${
                  index !== order.items.length - 1
                    ? "border-b border-[#e8eded]"
                    : ""
                }`}
              >
                {/* Image */}

                <Link
                  href={`/products/${item.id}`}
                  className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-[#f5f6f3] p-3 sm:h-28 sm:w-28"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={140}
                    height={140}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute right-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#30383c] px-1.5 text-[8px] font-semibold text-white shadow-sm">
                    {item.quantity}
                  </span>
                </Link>

                {/* Info */}

                <div className="min-w-0 flex-1 py-1">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#9aa3a6]">
                    LUXORA Collection
                  </p>

                  <Link href={`/products/${item.id}`}>
                    <h3 className="mt-1.5 line-clamp-2 text-sm font-medium leading-6 tracking-[-0.02em] text-[#30383c] transition-colors hover:text-[#56adbf] sm:text-[15px]">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs text-[#8a9598]">
                    ${item.price.toFixed(2)} each
                  </p>

                  <p className="mt-1 text-[10px] text-[#a3acae]">
                    Quantity: {item.quantity}
                  </p>
                </div>

                {/* Total */}

                <div className="shrink-0 py-1 text-right">
                  <p className="text-sm font-semibold tracking-[-0.02em] text-[#30383c]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================
            CUSTOMER + SHIPPING
        ================================================== */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* Customer */}

          <div className="rounded-[24px] border border-[#e2e9e9] bg-white p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#56adbf]" />

              <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#30383c]">
                Customer details
              </h2>
            </div>

            <div className="mt-6 space-y-2 text-sm text-[#7b8689]">
              <p className="font-semibold text-[#30383c]">
                {order.customer.firstName}{" "}
                {order.customer.lastName}
              </p>

              <p>{order.customer.email}</p>

              <p>{order.customer.phone}</p>
            </div>
          </div>

          {/* Shipping */}

          <div className="rounded-[24px] border border-[#e2e9e9] bg-white p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6c98f]" />

              <h2 className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#30383c]">
                Shipping address
              </h2>
            </div>

            <div className="mt-6 space-y-2 text-sm leading-6 text-[#7b8689]">
              <p>{order.shippingAddress.address}</p>

              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.country}
              </p>

              {order.shippingAddress.postalCode && (
                <p>{order.shippingAddress.postalCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            PAYMENT
        ================================================== */}

        <div className="mt-5 flex items-start gap-4 rounded-[24px] border border-[#e2e9e9] bg-white p-6 sm:p-7">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef9fa] text-[#56adbf]">
            {isCashPayment ? (
              <FiTruck
                size={18}
                strokeWidth={1.4}
              />
            ) : (
              <FiCreditCard
                size={18}
                strokeWidth={1.4}
              />
            )}
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#919c9f]">
              Payment method
            </p>

            <p className="mt-1.5 text-sm font-semibold text-[#30383c]">
              {isCashPayment
                ? "Cash on Delivery"
                : "Card Payment"}
            </p>

            <p className="mt-1 text-xs leading-5 text-[#899497]">
              {isCashPayment
                ? "Pay when your order arrives."
                : "Your payment has been securely processed."}
            </p>
          </div>
        </div>

        {/* =================================================
            ORDER SUMMARY
        ================================================== */}

        <div className="mt-10 overflow-hidden rounded-[24px] bg-[#30383c] text-white shadow-[0_18px_50px_rgba(37,44,48,0.12)]">
          <div className="grid lg:grid-cols-[1fr_360px]">
            {/* Left */}

            <div className="p-7 sm:p-9">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">
                LUXORA / Order summary
              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.045em] sm:text-3xl">
                Everything looks good.
              </h2>

              <p className="mt-3 max-w-md text-xs leading-6 text-white/55">
                Your order is confirmed and will be prepared
                carefully for delivery.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <FiTruck
                    size={15}
                    strokeWidth={1.4}
                  />
                </span>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">
                    Delivery
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/40">
                    We&apos;ll keep you updated
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="border-t border-white/10 bg-white/[0.035] p-7 sm:p-9 lg:border-l lg:border-t-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">
                    Subtotal
                  </span>

                  <span className="font-medium text-white">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">
                    Shipping
                  </span>

                  <span className="font-medium text-white">
                    {order.shipping === 0
                      ? "Free"
                      : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-end justify-between">
                  <span className="text-xs font-medium text-white/70">
                    Total
                  </span>

                  <span className="text-3xl font-semibold tracking-[-0.04em] text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            DELIVERY NOTE
        ================================================== */}

        <div className="mt-5 rounded-[20px] border border-[#dfe9e9] bg-[#f5fbfb] px-5 py-5 sm:px-6">
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#56adbf]">
              <FiTruck
                size={15}
                strokeWidth={1.4}
              />
            </span>

            <div>
              <p className="text-xs font-semibold text-[#30383c]">
                Your order is being prepared.
              </p>

              <p className="mt-1 text-xs leading-5 text-[#7d898c]">
                We&apos;ll make sure everything is packed
                carefully and delivered to the address you
                provided.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================== */}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#30383c] px-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#56adbf]"
          >
            Continue Shopping

            <FiArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/"
            className="group inline-flex h-13 items-center justify-center gap-3 rounded-full border border-[#dce4e4] bg-white px-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#30383c] transition-all duration-300 hover:border-[#a9dfe6] hover:bg-[#eef9fa] hover:text-[#2794aa]"
          >
            <FiHome
              size={15}
              strokeWidth={1.4}
            />

            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

/*
 * Loading Fallback
 */
function OrderSuccessLoading() {
  return (
    <main className="min-h-screen bg-[#fbfcfb]">
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef9fa]">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#ccecef] border-t-[#56adbf]" />
          </div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f898c]">
            LUXORA
          </p>

          <p className="mt-2 text-xs text-[#9aa3a6]">
            Preparing your order...
          </p>
        </div>
      </section>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}