"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiTrendingUp,
} from "react-icons/fi";

import { getOrders } from "@/lib/order";
import type { Order } from "@/types/order";

import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

import AdminStats from "@/components/admin/AdminStats/AdminStats";

const AdminPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        const [storedOrders, storedProducts] =
          await Promise.all([
            Promise.resolve(getOrders()),
            getProducts(),
          ]);

        setOrders(storedOrders);
        setProducts(storedProducts);
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );

        setOrders([]);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  /* =========================================================
     Statistics
  ========================================================= */

  const stats = useMemo(() => {
    const revenue = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const customers = new Set(
      orders.map((order) =>
        order.customer.email.toLowerCase()
      )
    );

    return {
      revenue,
      orders: orders.length,
      customers: customers.size,
      products: products.length,
    };
  }, [orders, products]);

  /* =========================================================
     Recent Orders
  ========================================================= */

  const recentOrders = useMemo(() => {
    return orders
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [orders]);

  /* =========================================================
     Sales Chart
  ========================================================= */

  const salesData = useMemo(() => {
    const days = [];

    const today = new Date();

    for (let index = 6; index >= 0; index -= 1) {
      const date = new Date(today);

      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - index);

      const dayKey = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);

        if (Number.isNaN(orderDate.getTime())) {
          return false;
        }

        const orderKey = [
          orderDate.getFullYear(),
          String(orderDate.getMonth() + 1).padStart(2, "0"),
          String(orderDate.getDate()).padStart(2, "0"),
        ].join("-");

        return orderKey === dayKey;
      });

      const revenue = dayOrders.reduce(
        (sum, order) => sum + order.total,
        0
      );

      days.push({
        key: dayKey,
        label: new Intl.DateTimeFormat("en-US", {
          weekday: "short",
        }).format(date),
        dateLabel: new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
        }).format(date),
        revenue,
        orders: dayOrders.length,
      });
    }

    return days;
  }, [orders]);

  const chartMax = useMemo(() => {
    const maxRevenue = Math.max(
      ...salesData.map((day) => day.revenue),
      0
    );

    if (maxRevenue === 0) {
      return 100;
    }

    return Math.ceil(maxRevenue / 10) * 10;
  }, [salesData]);

  const chartTotal = useMemo(() => {
    return salesData.reduce(
      (sum, day) => sum + day.revenue,
      0
    );
  }, [salesData]);

  const chartOrders = useMemo(() => {
    return salesData.reduce(
      (sum, day) => sum + day.orders,
      0
    );
  }, [salesData]);

  const highestSalesDay = useMemo(() => {
    return salesData.reduce(
      (highest, day) =>
        day.revenue > highest.revenue
          ? day
          : highest,
      salesData[0] ?? {
        key: "",
        label: "-",
        dateLabel: "-",
        revenue: 0,
        orders: 0,
      }
    );
  }, [salesData]);

  /* =========================================================
     Admin Stats
  ========================================================= */

  const adminStats = [
    {
      title: "Total Revenue",
      value: isLoading
        ? "..."
        : `$${stats.revenue.toFixed(2)}`,
      description: "Revenue from all orders",
      icon: FiDollarSign,
    },
    {
      title: "Total Orders",
      value: isLoading
        ? "..."
        : String(stats.orders),
      description: "Orders placed in your store",
      icon: FiShoppingBag,
    },
    {
      title: "Products",
      value: isLoading
        ? "..."
        : String(stats.products),
      description: "Available in the store",
      icon: FiBox,
    },
    {
      title: "Customers",
      value: isLoading
        ? "..."
        : String(stats.customers),
      description: "Customers from placed orders",
      icon: FiUsers,
    },
  ];

  /* =========================================================
     Order Status
  ========================================================= */

  const statusStyles: Record<string, string> = {
    processing:
      "border-[#ead9ad] bg-[#fcf7e9] text-[#8a6b25]",

    shipped:
      "border-[#c8e2e7] bg-[#eef8fa] text-[#397d89]",

    delivered:
      "border-[#c9e3d3] bg-[#eff9f2] text-[#397451]",

    cancelled:
      "border-[#ead0d0] bg-[#fcf1f1] text-[#955555]",
  };

  const getStatusLabel = (
    status: Order["status"]
  ) => {
    switch (status) {
      case "processing":
        return "Processing";

      case "shipped":
        return "Shipped";

      case "delivered":
        return "Delivered";

      case "cancelled":
        return "Cancelled";

      default:
        return status;
    }
  };

  /* =========================================================
     Date Formatter
  ========================================================= */

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

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#252c30]">
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="border-b border-[#e3e5e2] pb-8 lg:pb-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#55aebe]" />

                <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#8a9495]">
                  LUXORA / Admin
                </p>
              </div>

              <h1 className="mt-4 text-3xl font-medium tracking-[-0.055em] text-[#252c30] sm:text-4xl lg:text-[42px]">
                Store overview.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#7d8789]">
                Monitor your store performance, orders,
                customers and product catalog from one place.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex h-11 w-fit items-center justify-center gap-2 border border-[#d9dfdd] bg-white px-5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#596366] transition-all duration-300 hover:border-[#8dcbd4] hover:bg-[#eef8f9] hover:text-[#25899b]"
            >
              Browse Store

              <FiArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </header>

        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="mt-8">
          <AdminStats stats={adminStats} />
        </section>

        {/* =====================================================
            SALES OVERVIEW
        ===================================================== */}

        <section className="mt-10 overflow-hidden border border-[#e0e3e1] bg-white">
          {/* Chart Header */}

          <div className="flex flex-col gap-5 border-b border-[#e5e7e5] bg-[#fafaf8] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FiTrendingUp
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#55aebe]"
                />

                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#899395]">
                  Performance
                </p>
              </div>

              <h2 className="mt-2 text-[18px] font-medium tracking-[-0.03em] text-[#30383c]">
                Sales overview
              </h2>

              <p className="mt-1.5 text-[10px] text-[#899395]">
                Revenue performance over the last 7 days
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="border border-[#dfe5e3] bg-white px-4 py-3">
                <p className="text-[8px] font-medium uppercase tracking-[0.13em] text-[#9aa2a2]">
                  7 Day Revenue
                </p>

                <p className="mt-1.5 text-[17px] font-semibold tracking-[-0.03em] text-[#30383c]">
                  {isLoading
                    ? "..."
                    : `$${chartTotal.toFixed(2)}`}
                </p>
              </div>

              <div className="hidden border border-[#dfe5e3] bg-white px-4 py-3 sm:block">
                <p className="text-[8px] font-medium uppercase tracking-[0.13em] text-[#9aa2a2]">
                  Orders
                </p>

                <p className="mt-1.5 text-[17px] font-semibold tracking-[-0.03em] text-[#30383c]">
                  {isLoading ? "..." : chartOrders}
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}

          {isLoading ? (
            <div className="px-5 py-24 sm:px-8">
              <div className="h-[260px] animate-pulse bg-[#f5f6f4]" />
            </div>
          ) : (
            <div className="p-5 sm:p-7">
              {chartTotal === 0 ? (
                <div className="flex min-h-[310px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center border border-[#dcebea] bg-[#f1f8f8] text-[#55aebe]">
                    <FiTrendingUp
                      size={22}
                      strokeWidth={1.3}
                    />
                  </div>

                  <p className="mt-5 text-[14px] font-medium text-[#30383c]">
                    No sales data yet
                  </p>

                  <p className="mt-2 max-w-sm text-[11px] leading-5 text-[#879193]">
                    Revenue from your orders will appear
                    here as customers complete purchases.
                  </p>
                </div>
              ) : (
                <>
                  {/* Chart */}

                  <div className="relative h-[300px] w-full">
                    {/* Horizontal guide lines */}

                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[100, 75, 50, 25, 0].map(
                        (percentage) => (
                          <div
                            key={percentage}
                            className="flex items-center gap-3"
                          >
                            <span className="w-10 shrink-0 text-right text-[8px] text-[#a1a9a9]">
                              $
                              {(
                                (chartMax *
                                  percentage) /
                                100
                              ).toFixed(0)}
                            </span>

                            <div className="h-px flex-1 bg-[#edf0ee]" />
                          </div>
                        )
                      )}
                    </div>

                    {/* Bars */}

                    <div className="absolute bottom-0 left-[52px] right-0 top-0 flex items-end justify-between gap-2 sm:gap-4">
                      {salesData.map((day) => {
                        const height =
                          chartMax > 0
                            ? (day.revenue /
                                chartMax) *
                              100
                            : 0;

                        return (
                          <div
                            key={day.key}
                            className="group relative flex h-full flex-1 flex-col justify-end"
                          >
                            {/* Tooltip */}

                            <div className="pointer-events-none absolute bottom-[calc(100%-10px)] left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-[10px] bg-[#252c30] px-3 py-2 text-white shadow-lg group-hover:block">
                              <p className="text-[9px] font-medium">
                                {day.dateLabel}
                              </p>

                              <p className="mt-1 text-[11px] font-semibold">
                                ${day.revenue.toFixed(2)}
                              </p>

                              <p className="mt-0.5 text-[8px] text-[#b9c4c6]">
                                {day.orders}{" "}
                                {day.orders === 1
                                  ? "order"
                                  : "orders"}
                              </p>
                            </div>

                            {/* Bar */}

                            <div
                              className="relative mx-auto w-full max-w-[54px] overflow-hidden rounded-t-[7px] bg-[#e8f4f5] transition-all duration-300 group-hover:bg-[#b9dfe4]"
                              style={{
                                height: `${Math.max(
                                  height,
                                  day.revenue > 0
                                    ? 4
                                    : 0
                                )}%`,
                              }}
                            >
                              {day.revenue > 0 && (
                                <div className="absolute inset-x-0 bottom-0 h-full bg-[#55aebe] opacity-80 transition-all duration-300 group-hover:opacity-100" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Day labels */}

                  <div className="ml-[52px] mt-3 flex justify-between gap-2 sm:gap-4">
                    {salesData.map((day) => (
                      <div
                        key={day.key}
                        className="flex-1 text-center"
                      >
                        <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#687477]">
                          {day.label}
                        </p>

                        <p className="mt-1 text-[8px] text-[#a1a9a9]">
                          {day.dateLabel}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chart Footer */}

                  <div className="mt-7 grid gap-px overflow-hidden border border-[#e2e6e4] bg-[#e2e6e4] sm:grid-cols-3">
                    <div className="bg-[#fafcfb] px-4 py-4">
                      <p className="text-[8px] font-medium uppercase tracking-[0.13em] text-[#9aa2a2]">
                        Revenue
                      </p>

                      <p className="mt-1.5 text-sm font-semibold text-[#30383c]">
                        ${chartTotal.toFixed(2)}
                      </p>
                    </div>

                    <div className="bg-[#fafcfb] px-4 py-4">
                      <p className="text-[8px] font-medium uppercase tracking-[0.13em] text-[#9aa2a2]">
                        Orders
                      </p>

                      <p className="mt-1.5 text-sm font-semibold text-[#30383c]">
                        {chartOrders}
                      </p>
                    </div>

                    <div className="bg-[#fafcfb] px-4 py-4">
                      <p className="text-[8px] font-medium uppercase tracking-[0.13em] text-[#9aa2a2]">
                        Best Day
                      </p>

                      <p className="mt-1.5 text-sm font-semibold text-[#30383c]">
                        {highestSalesDay.revenue > 0
                          ? `$${highestSalesDay.revenue.toFixed(
                              2
                            )}`
                          : "—"}
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#8a9495]">
                        {highestSalesDay.revenue > 0
                          ? highestSalesDay.dateLabel
                          : "No sales"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#899395]">
                Management
              </p>

              <h2 className="mt-2 text-xl font-medium tracking-[-0.035em] text-[#30383c]">
                Quick actions
              </h2>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.14em] text-[#a0a8a8] sm:block">
              Store controls
            </span>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#e0e3e1] bg-[#e0e3e1] md:grid-cols-3">
            {[
              {
                href: "/admin/products",
                icon: FiBox,
                number: "01",
                title: "Manage Products",
                description:
                  "Browse and manage your complete product catalog.",
              },
              {
                href: "/admin/orders",
                icon: FiShoppingBag,
                number: "02",
                title: "Manage Orders",
                description:
                  "Review orders and update their current status.",
              },
              {
                href: "/admin/customers",
                icon: FiUsers,
                number: "03",
                title: "View Customers",
                description:
                  "Review customer activity and purchase history.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative bg-white p-6 transition-colors duration-300 hover:bg-[#fbfcfa] sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-[#dcebea] bg-[#f0f8f8] text-[#4b9aa8] transition-all duration-300 group-hover:border-[#b8dce1] group-hover:bg-[#e5f4f5]">
                      <Icon
                        size={19}
                        strokeWidth={1.4}
                      />
                    </div>

                    <span className="text-[9px] font-medium tracking-[0.14em] text-[#a6aeae]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-[15px] font-medium tracking-[-0.025em] text-[#30383c]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[290px] text-[11px] leading-5 text-[#879193]">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.13em] text-[#697578] transition-colors duration-300 group-hover:text-[#25899b]">
                    Open section

                    <FiArrowRight
                      size={13}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            RECENT ORDERS
        ===================================================== */}

        <section className="mt-10 overflow-hidden border border-[#e0e3e1] bg-white">
          <div className="flex flex-col gap-4 border-b border-[#e5e7e5] bg-[#fafaf8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <FiActivity
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#55aebe]"
                />

                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#899395]">
                  Activity
                </p>
              </div>

              <h2 className="mt-2 text-[18px] font-medium tracking-[-0.03em] text-[#30383c]">
                Recent orders
              </h2>
            </div>

            <Link
              href="/admin/orders"
              className="group inline-flex w-fit items-center gap-2 border-b border-transparent pb-1 text-[9px] font-medium uppercase tracking-[0.13em] text-[#687477] transition-colors hover:border-[#25899b] hover:text-[#25899b]"
            >
              View all

              <FiArrowRight
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {isLoading ? (
            <div className="px-6 py-24 text-center">
              <span className="mx-auto block h-7 w-7 animate-spin rounded-full border-2 border-[#e2e5e3] border-t-[#55aebe]" />

              <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.16em] text-[#929b9c]">
                Loading Orders
              </p>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="px-6 py-24 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#dcebea] bg-[#f1f8f8] text-[#55aebe]">
                <FiShoppingBag
                  size={22}
                  strokeWidth={1.3}
                />
              </div>

              <p className="mt-5 text-[14px] font-medium text-[#30383c]">
                No orders yet
              </p>

              <p className="mt-2 text-[11px] text-[#879193]">
                Orders will appear here after checkout.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden border-b border-[#e7e9e7] bg-white px-6 py-3.5 lg:grid lg:grid-cols-[minmax(0,1fr)_150px_120px] lg:items-center lg:gap-6">
                <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#9aa2a2]">
                  Order
                </p>

                <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#9aa2a2]">
                  Status
                </p>

                <p className="text-right text-[9px] font-medium uppercase tracking-[0.15em] text-[#9aa2a2]">
                  Total
                </p>
              </div>

              <div className="divide-y divide-[#e8eae8]">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="group px-5 py-5 transition-colors duration-200 hover:bg-[#fcfcfa] sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_150px_120px] lg:items-center lg:gap-6"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#dcebea] bg-[#f2f8f8] text-[#4b9aa8]">
                        <FiShoppingBag
                          size={16}
                          strokeWidth={1.4}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-[#30383c]">
                          {order.id}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-[#8a9495]">
                          {order.customer.firstName}{" "}
                          {order.customer.lastName}
                          {" · "}
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0">
                      <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.12em] text-[#9ba3a3] lg:hidden">
                        Status
                      </p>

                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] ${
                          statusStyles[order.status] ??
                          "border-[#e1e5e5] bg-[#f7f8f8] text-[#687477]"
                        }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between lg:mt-0 lg:block">
                      <p className="text-[8px] font-medium uppercase tracking-[0.12em] text-[#9ba3a3] lg:hidden">
                        Total
                      </p>

                      <p className="text-[13px] font-semibold text-[#30383c] lg:text-right">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="border-t border-[#e4e6e4] bg-[#fafaf8] px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[9px] uppercase tracking-[0.1em] text-[#929b9c]">
                Showing{" "}
                <span className="font-medium text-[#30383c]">
                  {recentOrders.length}
                </span>{" "}
                recent orders
              </p>

              <Link
                href="/admin/orders"
                className="group inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.12em] text-[#687477] transition-colors hover:text-[#25899b]"
              >
                Manage orders

                <FiArrowRight
                  size={12}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            SYSTEM STATUS
        ===================================================== */}

        <section className="mt-6 grid gap-px overflow-hidden border border-[#e0e3e1] bg-[#e0e3e1] pb-0 sm:grid-cols-2">
          <div className="flex items-center gap-4 bg-[#f3faf5] p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#d9eadf] bg-white text-[#4b9668]">
              <FiCheckCircle
                size={19}
                strokeWidth={1.4}
              />
            </div>

            <div>
              <p className="text-[12px] font-medium text-[#315b40]">
                Store is operational
              </p>

              <p className="mt-1 text-[10px] text-[#648572]">
                Everything is running normally.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#fcf8ed] p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#eadfca] bg-white text-[#b18b42]">
              <FiClock
                size={19}
                strokeWidth={1.4}
              />
            </div>

            <div>
              <p className="text-[12px] font-medium text-[#6e5728]">
                System status
              </p>

              <p className="mt-1 text-[10px] text-[#927a49]">
                Admin dashboard is connected.
              </p>
            </div>
          </div>
        </section>

        <div className="h-4" />
      </section>
    </main>
  );
};

export default AdminPage;