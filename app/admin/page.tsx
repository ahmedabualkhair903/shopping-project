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
} from "react-icons/fi";

import { getOrders } from "@/lib/order";
import type { Order } from "@/types/order";

import AdminStats from "@/components/admin/AdminStats/AdminStats";

const AdminPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedOrders = getOrders();
      setOrders(storedOrders);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    };
  }, [orders]);

  const recentOrders = useMemo(
    () => orders.slice(0, 5),
    [orders]
  );

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
      value: "—",
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

  const statusStyles: Record<string, string> = {
    processing:
      "bg-amber-50 text-amber-700 border-amber-200",
    shipped:
      "bg-sky-50 text-sky-700 border-sky-200",
    delivered:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled:
      "bg-rose-50 text-rose-700 border-rose-200",
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

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1440px]">
          {/* Welcome */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Store Overview
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">
                Welcome back.
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Here&apos;s what&apos;s happening with your
                store today.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-indigo-50 hover:text-indigo-600 hover:ring-indigo-200"
            >
              Browse Store

              <FiArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Stats */}
          <AdminStats stats={adminStats} />

          {/* Quick Actions */}
          <section className="mt-10">
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-500">
                Management
              </p>

              <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                Quick Actions
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  href: "/admin/products",
                  icon: FiBox,
                  title: "Manage Products",
                  description:
                    "Browse and manage your store catalog.",
                  iconBg: "bg-violet-50",
                  iconColor: "text-violet-600",
                  hoverBorder: "hover:border-violet-300",
                  hoverBg: "hover:bg-violet-50/40",
                },
                {
                  href: "/admin/orders",
                  icon: FiShoppingBag,
                  title: "Manage Orders",
                  description:
                    "Review orders and update their status.",
                  iconBg: "bg-sky-50",
                  iconColor: "text-sky-600",
                  hoverBorder: "hover:border-sky-300",
                  hoverBg: "hover:bg-sky-50/40",
                },
                {
                  href: "/admin/customers",
                  icon: FiUsers,
                  title: "View Customers",
                  description:
                    "Review customer activity and spending.",
                  iconBg: "bg-emerald-50",
                  iconColor: "text-emerald-600",
                  hoverBorder: "hover:border-emerald-300",
                  hoverBg: "hover:bg-emerald-50/40",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 ${item.hoverBorder} ${item.hoverBg}`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg}`}
                      >
                        <Icon
                          size={19}
                          strokeWidth={1.6}
                          className={item.iconColor}
                        />
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-colors group-hover:bg-white">
                        <FiArrowRight
                          size={15}
                          className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-slate-950"
                        />
                      </div>
                    </div>

                    <h3 className="mt-6 text-sm font-semibold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Recent Orders */}
          <section className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-500">
                  Activity
                </p>

                <h2 className="mt-2 text-sm font-semibold text-slate-950">
                  Recent Orders
                </h2>
              </div>

              <Link
                href="/admin/orders"
                className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
              >
                View all

                <FiArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {isLoading ? (
              <div className="px-6 py-20 text-center">
                <span className="mx-auto block h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading orders...
                </p>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                  <FiShoppingBag
                    size={22}
                    strokeWidth={1.3}
                    className="text-indigo-500"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-950">
                  No orders yet
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Orders will appear here after checkout.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                        <FiShoppingBag
                          size={17}
                          strokeWidth={1.5}
                          className="text-indigo-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-950">
                          {order.id}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {order.customer.firstName}{" "}
                          {order.customer.lastName}{" "}
                          · {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${
                          statusStyles[order.status]
                        }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>

                      <p className="min-w-[70px] text-right text-sm font-semibold text-slate-950">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Status */}
          <section className="mt-10 grid gap-4 pb-8 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <FiCheckCircle
                  size={19}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-emerald-950">
                  Store is operational
                </p>

                <p className="mt-1 text-xs text-emerald-700/70">
                  Everything is running normally.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <FiClock
                  size={19}
                  className="text-amber-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-950">
                  System status
                </p>

                <p className="mt-1 text-xs text-amber-700/70">
                  Admin dashboard is connected.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;