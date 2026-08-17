"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiPackage,
  FiTruck,
} from "react-icons/fi";

import type { Order } from "@/types/order";

const ORDERS_KEY = "orders";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem(ORDERS_KEY);

      if (storedOrders) {
        const parsedOrders: Order[] = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <FiCheck size={15} strokeWidth={1.7} />;

      case "shipped":
        return <FiTruck size={15} strokeWidth={1.7} />;

      default:
        return <FiClock size={15} strokeWidth={1.7} />;
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "Delivered";

      case "shipped":
        return "Shipped";

      default:
        return "Processing";
    }
  };

  const getStatusStyles = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "shipped":
        return "border-blue-200 bg-blue-50 text-blue-700";

      default:
        return "border-amber-200 bg-amber-50 text-amber-700";
    }
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">
        <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="animate-pulse">
            <div className="h-2.5 w-24 bg-stone-200" />
            <div className="mt-5 h-10 w-48 bg-stone-200 sm:h-12 sm:w-56" />
            <div className="mt-4 h-4 w-64 bg-stone-100" />
          </div>
        </section>
      </main>
    );
  }

  /*
   * Empty Orders
   */
  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <FiPackage
                size={28}
                strokeWidth={1.2}
                className="text-amber-600"
              />
            </div>

            <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.2em] text-amber-600">
              Orders
            </p>

            <h1 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-stone-950 sm:text-4xl">
              No orders yet
            </h1>

            <p className="mt-4 text-sm leading-7 text-stone-500">
              You haven&apos;t placed any orders yet.
              Start shopping and your orders will appear
              here.
            </p>

            <Link
              href="/products"
              className="group mx-auto mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-sm bg-stone-950 px-7 text-sm font-medium text-white transition-all hover:bg-amber-700"
            >
              Start shopping

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

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <section className="border-b border-stone-200 bg-[#F3EFE7]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-700">
                Account / Orders
              </p>

              <h1 className="mt-3 text-3xl font-medium tracking-[-0.045em] text-stone-950 sm:text-4xl lg:text-5xl">
                Your Orders
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
                View your order history and keep track of
                your purchases.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-stone-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-500" />

              {orders.length}{" "}
              {orders.length === 1 ? "Order" : "Orders"}
            </div>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="space-y-10">
          {orders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-[0_8px_30px_rgba(28,25,23,0.04)]"
            >
              {/* Order Header */}
              <div className="border-b border-stone-200 bg-white px-5 py-6 sm:px-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold text-stone-950">
                        Order #{order.id}
                      </p>

                      <span className="h-1 w-1 rounded-full bg-stone-300" />

                      <p className="text-xs text-stone-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <p className="mt-2 text-xs text-stone-400">
                      {order.items.length}{" "}
                      {order.items.length === 1
                        ? "product"
                        : "products"}
                    </p>
                  </div>

                  {/* Status */}
                  <div
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium ${getStatusStyles(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}

                    {getStatusLabel(order.status)}
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="px-5 sm:px-7">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.id}`}
                    className="group flex gap-4 border-b border-stone-200 py-6 sm:gap-6"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.id}`}
                      className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-[#F4F0E8] p-3 sm:h-24 sm:w-24"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={120}
                        height={120}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="min-w-0 flex-1 py-1">
                      <Link
                        href={`/products/${item.id}`}
                      >
                        <h2 className="line-clamp-2 text-sm font-medium leading-6 text-stone-950 transition-colors hover:text-amber-700">
                          {item.title}
                        </h2>
                      </Link>

                      <p className="mt-1 text-xs capitalize text-amber-700">
                        {item.category}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                        <span>Qty: {item.quantity}</span>

                        <span>
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="shrink-0 py-1 text-right">
                      <p className="text-sm font-semibold text-stone-950">
                        $
                        {(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="border-b border-stone-200 bg-[#FCFBF8] px-5 py-7 sm:px-7">
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Customer */}
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                      Customer
                    </p>

                    <p className="mt-2 text-sm text-stone-950">
                      {order.customer.firstName}{" "}
                      {order.customer.lastName}
                    </p>
                  </div>

                  {/* Payment */}
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                      Payment
                    </p>

                    <p className="mt-2 text-sm capitalize text-stone-950">
                      {order.paymentMethod === "card"
                        ? "Card"
                        : "Cash on delivery"}
                    </p>
                  </div>

                  {/* Shipping */}
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                      Shipping
                    </p>

                    <p className="mt-2 text-sm text-stone-950">
                      {order.shipping === 0
                        ? "Free"
                        : `$${order.shipping.toFixed(2)}`}
                    </p>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                      Total
                    </p>

                    <p className="mt-2 text-base font-semibold tracking-tight text-amber-700">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <FiPackage
                    size={14}
                    strokeWidth={1.5}
                  />

                  <span>Order #{order.id}</span>
                </div>

                <Link
                  href={`/order-success?orderId=${encodeURIComponent(
                    order.id
                  )}`}
                  className="group inline-flex w-fit items-center gap-2 rounded-sm bg-stone-950 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-white transition-all hover:bg-amber-700"
                >
                  View order

                  <FiArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default OrdersPage;