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

import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

import AdminStats from "@/components/admin/AdminStats/AdminStats";

const AdminPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* =========================================================
     Load Dashboard Data
  ========================================================= */

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
    return orders.slice(0, 5);
  }, [orders]);

  /* =========================================================
     Dashboard Stats
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
     Date
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
    <main className="min-h-screen bg-[#f8f8f6] text-[#252c30]">
      <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1440px]">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[5px] w-[5px] rounded-full bg-[#56adbf]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#7d8b8f]">
                  LUXORA / Admin
                </p>
              </div>

              <h1 className="mt-4 text-[38px] font-medium leading-none tracking-[-0.06em] text-[#252c30] sm:text-[48px]">
                Store overview.
              </h1>

              <p className="mt-3 max-w-xl text-[12px] leading-6 text-[#7c898d] sm:text-[13px]">
                Keep track of your store, orders, customers
                and product collection from one place.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#dce3e3] bg-white px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#4e5b5f] shadow-sm transition-all duration-300 hover:border-[#a9dbe2] hover:bg-[#eef9fa] hover:text-[#2794aa]"
            >
              Browse Store

              <FiArrowRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <AdminStats stats={adminStats} />

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section className="mt-12">
            <div className="mb-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#7d8b8f]">
                Management
              </p>

              <h2 className="mt-2 text-[22px] font-medium tracking-[-0.04em] text-[#30383c]">
                Quick actions
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  href: "/admin/products",
                  icon: FiBox,
                  number: "01",
                  title: "Manage Products",
                  description:
                    "Browse and manage your store catalog.",
                },
                {
                  href: "/admin/orders",
                  icon: FiShoppingBag,
                  number: "02",
                  title: "Manage Orders",
                  description:
                    "Review orders and update their status.",
                },
                {
                  href: "/admin/customers",
                  icon: FiUsers,
                  number: "03",
                  title: "View Customers",
                  description:
                    "Review customer activity and spending.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative overflow-hidden rounded-[22px] border border-[#e2e6e5] bg-white p-6 shadow-[0_8px_30px_rgba(30,40,40,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8dfe4] hover:shadow-[0_14px_40px_rgba(30,40,40,0.07)]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#eef8f9] text-[#3f96a5] transition-colors duration-300 group-hover:bg-[#dff2f4]">
                        <Icon
                          size={20}
                          strokeWidth={1.4}
                        />
                      </div>

                      <span className="text-[9px] font-semibold tracking-[0.15em] text-[#a1abad]">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-[16px] font-medium tracking-[-0.025em] text-[#30383c]">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-[270px] text-[11px] leading-5 text-[#879397]">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#718084] transition-colors duration-300 group-hover:text-[#2794aa]">
                      Open section

                      <FiArrowRight
                        size={13}
                        strokeWidth={1.4}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* =================================================
              RECENT ORDERS
          ================================================= */}

          <section className="mt-12 overflow-hidden rounded-[22px] border border-[#e2e6e5] bg-white shadow-[0_8px_30px_rgba(30,40,40,0.03)]">
            <div className="flex flex-col gap-3 border-b border-[#e8ebea] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#7d8b8f]">
                  Activity
                </p>

                <h2 className="mt-2 text-[17px] font-medium tracking-[-0.025em] text-[#30383c]">
                  Recent orders
                </h2>
              </div>

              <Link
                href="/admin/orders"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#e1e6e5] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#687578] transition-all duration-300 hover:border-[#b8dfe4] hover:bg-[#eef8f9] hover:text-[#2794aa]"
              >
                View all

                <FiArrowRight
                  size={13}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {isLoading ? (
              <div className="px-6 py-20 text-center">
                <span className="mx-auto block h-7 w-7 animate-spin rounded-full border-2 border-[#e2e7e6] border-t-[#56adbf]" />

                <p className="mt-4 text-[11px] text-[#7d898d]">
                  Loading orders...
                </p>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef8f9] text-[#56adbf]">
                  <FiShoppingBag
                    size={22}
                    strokeWidth={1.3}
                  />
                </div>

                <p className="mt-5 text-[14px] font-medium text-[#30383c]">
                  No orders yet
                </p>

                <p className="mt-2 text-[11px] text-[#879397]">
                  Orders will appear here after checkout.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#edf0ef]">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-4 px-5 py-5 transition-colors duration-300 hover:bg-[#fafcfc] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#f1f8f9] text-[#479aaa]">
                        <FiShoppingBag
                          size={17}
                          strokeWidth={1.4}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-[#30383c]">
                          {order.id}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-[#8a9699]">
                          {order.customer.firstName}{" "}
                          {order.customer.lastName}
                          {" · "}
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] ${
                          statusStyles[order.status] ??
                          "border-[#e1e5e5] bg-[#f7f8f8] text-[#687477]"
                        }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>

                      <p className="min-w-[70px] text-right text-[13px] font-semibold text-[#30383c]">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* =================================================
              SYSTEM STATUS
          ================================================= */}

          <section className="mt-6 grid gap-4 pb-8 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-[20px] border border-[#d9e9df] bg-[#f2faf5] p-5 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-white shadow-sm">
                <FiCheckCircle
                  size={19}
                  strokeWidth={1.4}
                  className="text-[#4b9668]"
                />
              </div>

              <div>
                <p className="text-[13px] font-medium text-[#315b40]">
                  Store is operational
                </p>

                <p className="mt-1 text-[10px] text-[#5f8870]">
                  Everything is running normally.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-[20px] border border-[#e8dfc6] bg-[#fcf8ed] p-5 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-white shadow-sm">
                <FiClock
                  size={19}
                  strokeWidth={1.4}
                  className="text-[#b18b42]"
                />
              </div>

              <div>
                <p className="text-[13px] font-medium text-[#6e5728]">
                  System status
                </p>

                <p className="mt-1 text-[10px] text-[#927a49]">
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