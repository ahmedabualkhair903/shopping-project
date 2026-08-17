"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FiArrowRight,
  FiCheck,
  FiCreditCard,
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
      <main className="min-h-screen bg-white">
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5">
          <div className="text-center">
            <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />

            <p className="mt-5 text-xs text-neutral-500">
              Loading your order...
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
      <main className="min-h-screen bg-white">
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-16">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-neutral-200">
              <FiShoppingBag
                size={25}
                strokeWidth={1.2}
                className="text-neutral-400"
              />
            </div>

            <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-400">
              Order
            </p>

            <h1 className="mt-3 text-3xl font-medium tracking-[-0.045em] text-neutral-950 sm:text-4xl">
              Order not found
            </h1>

            <p className="mt-4 text-sm leading-7 text-neutral-500">
              We couldn&apos;t find the order you&apos;re looking
              for. It may have expired or the order number may
              be incorrect.
            </p>

            <Link
              href="/products"
              className="group mx-auto mt-8 inline-flex h-12 items-center justify-center gap-3 bg-neutral-950 px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Continue shopping

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const isCashPayment = order.paymentMethod === "cash";

  const createdAt = new Date(
    order.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-white">
      {/* =====================================================
          Confirmation Header
      ====================================================== */}

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            {/* Success Mark */}

            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-neutral-200">
              <div className="flex h-11 w-11 items-center justify-center bg-neutral-950 text-white">
                <FiCheck
                  size={23}
                  strokeWidth={2}
                />
              </div>
            </div>

            <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-400">
              LUXORA / Order Confirmed
            </p>

            <h1 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-neutral-950 sm:text-4xl lg:text-5xl">
              Thank you for your order
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-neutral-500">
              Your order has been successfully placed.
              We&apos;re now preparing everything for delivery.
            </p>

            {/* Order Number */}

            <div className="mx-auto mt-8 inline-flex items-center gap-3 border border-neutral-200 px-4 py-2.5">
              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Order
              </span>

              <span className="text-xs font-medium text-neutral-950">
                {order.id}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Order Content
      ====================================================== */}

      <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* =================================================
            Order Overview
        ================================================== */}

        <div className="grid border-t border-neutral-950 sm:grid-cols-3">
          {/* Order Number */}

          <div className="border-b border-neutral-200 py-6 sm:border-r sm:pr-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              Order Number
            </p>

            <p className="mt-2 break-all text-sm font-medium text-neutral-950">
              {order.id}
            </p>
          </div>

          {/* Date */}

          <div className="border-b border-neutral-200 py-6 sm:border-r sm:px-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              Order Date
            </p>

            <p className="mt-2 text-sm font-medium text-neutral-950">
              {createdAt}
            </p>
          </div>

          {/* Status */}

          <div className="border-b border-neutral-200 py-6 sm:pl-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />

              <p className="text-sm font-medium capitalize text-neutral-950">
                {order.status}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            Status / Payment
        ================================================== */}

        <div className="grid border-b border-neutral-200 sm:grid-cols-2">
          {/* Order Status */}

          <div className="flex gap-4 py-8 sm:border-r sm:pr-10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-neutral-100">
              <FiPackage
                size={18}
                strokeWidth={1.4}
                className="text-neutral-950"
              />
            </div>

            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Order Status
              </p>

              <p className="mt-2 text-sm font-medium capitalize text-neutral-950">
                {order.status}
              </p>

              <p className="mt-1.5 text-xs leading-5 text-neutral-500">
                We&apos;ll keep you updated about your order.
              </p>
            </div>
          </div>

          {/* Payment */}

          <div className="flex gap-4 border-t border-neutral-200 py-8 sm:border-t-0 sm:pl-10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-neutral-100">
              {isCashPayment ? (
                <FiTruck
                  size={18}
                  strokeWidth={1.4}
                  className="text-neutral-950"
                />
              ) : (
                <FiCreditCard
                  size={18}
                  strokeWidth={1.4}
                  className="text-neutral-950"
                />
              )}
            </div>

            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Payment Method
              </p>

              <p className="mt-2 text-sm font-medium text-neutral-950">
                {isCashPayment
                  ? "Cash on Delivery"
                  : "Card Payment"}
              </p>

              <p className="mt-1.5 text-xs leading-5 text-neutral-500">
                {isCashPayment
                  ? "Pay when your order arrives."
                  : "Your payment has been securely processed."}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            Order Items
        ================================================== */}

        <div className="mt-14">
          <div className="flex items-end justify-between border-b border-neutral-950 pb-4">
            <div>
              <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Purchase
              </p>

              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-950">
                Order Items
              </h2>
            </div>

            <span className="text-xs text-neutral-400">
              {order.items.length}{" "}
              {order.items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="group flex gap-4 border-b border-neutral-200 py-6 sm:gap-6"
              >
                {/* Image */}

                <Link
                  href={`/products/${item.id}`}
                  className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden bg-neutral-100 p-3 sm:h-24 sm:w-24"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center bg-neutral-950 px-1 text-[9px] font-medium text-white">
                    {item.quantity}
                  </span>
                </Link>

                {/* Info */}

                <div className="min-w-0 flex-1 py-1">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="line-clamp-2 text-sm font-medium leading-6 text-neutral-950 transition-colors hover:text-neutral-500">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs text-neutral-500">
                    ${item.price.toFixed(2)} each
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    Quantity: {item.quantity}
                  </p>
                </div>

                {/* Total */}

                <div className="shrink-0 py-1 text-right">
                  <p className="text-sm font-medium text-neutral-950">
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================
            Customer + Shipping
        ================================================== */}

        <div className="mt-14 grid gap-10 border-t border-neutral-200 pt-9 sm:grid-cols-2 sm:gap-20">
          {/* Customer */}

          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-neutral-950" />

              <h2 className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-950">
                Customer
              </h2>
            </div>

            <div className="mt-5 space-y-1.5 text-sm text-neutral-500">
              <p className="font-medium text-neutral-950">
                {order.customer.firstName}{" "}
                {order.customer.lastName}
              </p>

              <p>{order.customer.email}</p>

              <p>{order.customer.phone}</p>
            </div>
          </div>

          {/* Shipping */}

          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-neutral-950" />

              <h2 className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-950">
                Shipping Address
              </h2>
            </div>

            <div className="mt-5 space-y-1.5 text-sm leading-6 text-neutral-500">
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
            Order Summary
        ================================================== */}

        <div className="mt-14 border-t border-neutral-950 pt-6">
          <div className="ml-auto w-full max-w-sm">
            <div className="space-y-4">
              {/* Subtotal */}

              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">
                  Subtotal
                </span>

                <span className="font-medium text-neutral-950">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>

              {/* Shipping */}

              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">
                  Shipping
                </span>

                <span className="font-medium text-neutral-950">
                  {order.shipping === 0
                    ? "Free"
                    : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="h-px bg-neutral-200" />

              {/* Total */}

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-950">
                  Total
                </span>

                <span className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            Delivery Note
        ================================================== */}

        <div className="mt-12 border border-neutral-200 px-5 py-5 sm:px-6">
          <div className="flex gap-3">
            <FiTruck
              size={17}
              strokeWidth={1.4}
              className="mt-0.5 shrink-0 text-neutral-950"
            />

            <div>
              <p className="text-xs font-medium text-neutral-950">
                Your order is being prepared.
              </p>

              <p className="mt-1 text-xs leading-5 text-neutral-500">
                We&apos;ll make sure your order is packed
                carefully and delivered to the address
                provided above.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            Actions
        ================================================== */}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="group inline-flex h-12 items-center justify-center gap-3 bg-neutral-950 px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Continue Shopping

            <FiArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center border border-neutral-300 px-8 text-sm font-medium text-neutral-950 transition-colors hover:border-neutral-950"
          >
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
    <main className="min-h-screen bg-white">
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5">
        <div className="text-center">
          <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />

          <p className="mt-5 text-xs text-neutral-500">
            Loading your order...
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