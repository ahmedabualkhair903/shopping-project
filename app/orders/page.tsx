"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiPackage,
  FiTruck,
  FiX,
} from "react-icons/fi";

import EmptyState from "@/components/EmptyState/EmptyState";
import { getOrders } from "@/lib/order";
import type { Order } from "@/types/order";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      try {
        const storedOrders = getOrders();

        setOrders(storedOrders);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const totalSpent = useMemo(() => {
    return orders.reduce(
      (total, order) => total + order.total,
      0
    );
  }, [orders]);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <FiCheck
            size={14}
            strokeWidth={1.7}
          />
        );

      case "shipped":
        return (
          <FiTruck
            size={14}
            strokeWidth={1.7}
          />
        );

      case "cancelled":
        return (
          <FiX
            size={14}
            strokeWidth={1.7}
          />
        );

      default:
        return (
          <FiClock
            size={14}
            strokeWidth={1.7}
          />
        );
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "Delivered";

      case "shipped":
        return "Shipped";

      case "cancelled":
        return "Cancelled";

      case "processing":
      default:
        return "Processing";
    }
  };

  const getStatusStyles = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "border-[#c9e3d3] bg-[#eff9f2] text-[#397451]";

      case "shipped":
        return "border-[#c8e2e7] bg-[#eef8fa] text-[#397d89]";

      case "cancelled":
        return "border-[#ead0d0] bg-[#fcf1f1] text-[#955555]";

      case "processing":
      default:
        return "border-[#ead9ad] bg-[#fcf7e9] text-[#8a6b25]";
    }
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown date";
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(parsedDate);
  };

  /* Loading */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f7f7f4] text-[#252c30]">
        <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="animate-pulse">
            <div className="h-2 w-28 rounded-full bg-[#dfe4e2]" />

            <div className="mt-5 h-10 w-52 rounded bg-[#dfe4e2] sm:h-12 sm:w-64" />

            <div className="mt-4 h-4 w-full max-w-md rounded bg-[#e9ecea]" />

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="h-24 rounded-[18px] bg-white" />
              <div className="h-24 rounded-[18px] bg-white" />
              <div className="h-24 rounded-[18px] bg-white" />
            </div>

            <div className="mt-8 space-y-5">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="h-72 rounded-[22px] border border-[#e2e6e4] bg-white"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* Empty Orders */

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f7f4] text-[#252c30]">
        <EmptyState
          icon={FiPackage}
          eyebrow="LUXORA / Orders"
          title="No orders yet."
          description="You haven't placed any orders yet. Explore our collection and find something you love."
          actionLabel="Start shopping"
          actionHref="/products"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#252c30]">
      {/* HEADER */}

      <section className="border-b border-[#e2e6e4] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-[5px] w-[5px] rounded-full bg-[#56adbf]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d8b8f]">
                  LUXORA / Account
                </p>
              </div>

              <h1 className="mt-4 text-3xl font-medium tracking-[-0.055em] text-[#252c30] sm:text-4xl lg:text-[44px]">
                Your Orders
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#7c898d]">
                View your order history, track purchases,
                and review your order details.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="min-w-[115px] rounded-[17px] border border-[#e1e6e5] bg-[#fafcfb] px-4 py-3.5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#909a9b]">
                  Orders
                </p>

                <p className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#30383c]">
                  {orders.length}
                </p>
              </div>

              <div className="min-w-[115px] rounded-[17px] border border-[#e1e6e5] bg-[#fafcfb] px-4 py-3.5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#909a9b]">
                  Spent
                </p>

                <p className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#30383c]">
                  ${totalSpent.toFixed(2)}
                </p>
              </div>

              <div className="col-span-2 min-w-[115px] rounded-[17px] border border-[#dcebed] bg-[#f2fafb] px-4 py-3.5 sm:col-span-1">
                <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6f898e]">
                  Status
                </p>

                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#397d89]">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORDERS */}

      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#899395]">
              Order history
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.035em] text-[#30383c]">
              Recent purchases
            </h2>
          </div>

          <Link
            href="/products"
            className="group hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#687477] transition-colors hover:text-[#25899b] sm:inline-flex"
          >
            Continue shopping

            <FiArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-[22px] border border-[#e0e4e2] bg-white shadow-[0_8px_30px_rgba(30,40,40,0.035)]"
            >
              {/* Order Header */}

              <div className="border-b border-[#e7eae8] bg-[#fcfdfd] px-5 py-5 sm:px-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <p className="max-w-full truncate text-[13px] font-semibold text-[#30383c]">
                        Order #{order.id}
                      </p>

                      <span className="hidden h-1 w-1 rounded-full bg-[#c5ccca] sm:block" />

                      <p className="text-[10px] text-[#899395]">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <p className="mt-2 text-[10px] text-[#9aa3a4]">
                      {order.items.length}{" "}
                      {order.items.length === 1
                        ? "product"
                        : "products"}
                    </p>
                  </div>

                  <div
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] ${getStatusStyles(
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
                    className="group flex gap-4 border-b border-[#e8eae8] py-5 sm:gap-6 sm:py-6"
                  >
                    <Link
                      href={`/products/${item.id}`}
                      className="flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#edf0ef] bg-white p-2.5 sm:h-[88px] sm:w-[88px]"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={100}
                        sizes="(max-width: 640px) 76px, 88px"
                        unoptimized
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <div className="min-w-0 flex-1 py-0.5">
                      <Link
                        href={`/products/${item.id}`}
                        className="block"
                      >
                        <h3 className="line-clamp-2 text-xs font-medium leading-5 text-[#30383c] transition-colors hover:text-[#2794aa] sm:text-sm">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="mt-1.5 text-[10px] capitalize text-[#4b9aa8]">
                        {item.category}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-[#8a9495]">
                        <span>
                          Qty: {item.quantity}
                        </span>

                        <span>
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 py-0.5 text-right">
                      <p className="text-xs font-semibold text-[#30383c] sm:text-sm">
                        $
                        {(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Information */}

              <div className="border-b border-[#e7eae8] bg-[#fafcfb] px-5 py-6 sm:px-7">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#929b9c]">
                      Customer
                    </p>

                    <p className="mt-2 text-xs text-[#30383c]">
                      {order.customer.firstName}{" "}
                      {order.customer.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#929b9c]">
                      Payment
                    </p>

                    <p className="mt-2 text-xs capitalize text-[#30383c]">
                      {order.paymentMethod === "card"
                        ? "Credit / Debit Card"
                        : "Cash on Delivery"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#929b9c]">
                      Shipping
                    </p>

                    <p className="mt-2 text-xs text-[#30383c]">
                      {order.shipping === 0
                        ? "Free"
                        : `$${order.shipping.toFixed(2)}`}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#929b9c]">
                      Total
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#397d89]">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}

              <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="flex items-center gap-2 text-[10px] text-[#8a9495]">
                  <FiPackage
                    size={14}
                    strokeWidth={1.5}
                  />

                  <span>
                    Order #{order.id}
                  </span>
                </div>

                <Link
                  href={`/order-success?orderId=${encodeURIComponent(
                    order.id
                  )}`}
                  className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#252c30] px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#397d89] sm:w-fit"
                >
                  View order

                  <FiArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-[#d9dfdd] bg-white px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#596366] transition-all duration-300 hover:border-[#8dcbd4] hover:bg-[#eef8f9] hover:text-[#25899b]"
          >
            Continue shopping

            <FiArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default OrdersPage;