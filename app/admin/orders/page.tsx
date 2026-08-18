"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiEye,
  FiPackage,
  FiSearch,
  FiTruck,
  FiX,
} from "react-icons/fi";

import { getOrders, updateOrderStatus } from "@/lib/order";
import type { Order } from "@/types/order";

type OrderStatus = Order["status"];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setOrders(getOrders());
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const customerName =
        `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase();

      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        customerName.includes(query) ||
        order.customer.email.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  const stats = useMemo(() => {
    const revenue = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const averageOrder =
      orders.length > 0 ? revenue / orders.length : 0;

    return {
      revenue,
      processing: orders.filter(
        (order) => order.status === "processing"
      ).length,
      shipped: orders.filter(
        (order) => order.status === "shipped"
      ).length,
      delivered: orders.filter(
        (order) => order.status === "delivered"
      ).length,
      cancelled: orders.filter(
        (order) => order.status === "cancelled"
      ).length,
      averageOrder,
    };
  }, [orders]);

  const handleStatusChange = (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    const updated = updateOrderStatus(
      orderId,
      newStatus
    );

    if (!updated) return;

    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    setSelectedOrder((current) =>
      current?.id === orderId
        ? { ...current, status: newStatus }
        : current
    );
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  const getStatusLabel = (value: OrderStatus) => {
    switch (value) {
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return value;
    }
  };

  const getStatusClass = (value: OrderStatus) => {
    switch (value) {
      case "processing":
        return "border-amber-200 bg-amber-50 text-amber-700";
      case "shipped":
        return "border-sky-200 bg-sky-50 text-sky-700";
      case "delivered":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";
      case "cancelled":
        return "border-rose-200 bg-rose-50 text-rose-700";
      default:
        return "border-neutral-200 bg-neutral-50 text-neutral-600";
    }
  };

  const statusFilters: Array<
    ["all" | OrderStatus, string]
  > = [
    ["all", "All Orders"],
    ["processing", "Processing"],
    ["shipped", "Shipped"],
    ["delivered", "Delivered"],
    ["cancelled", "Cancelled"],
  ];

  return (
    <main className="min-h-screen bg-[#F4F1EC] text-neutral-950">
      {/* =====================================================
          PAGE HEADER
         ===================================================== */}
      <section className="relative overflow-hidden border-b border-[#DDD8D0] bg-[#FBFAF7]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-[#E5E0D8]" />

        <div className="pointer-events-none absolute bottom-[-100px] right-[18%] h-52 w-52 rounded-full bg-[#EFEAE2]" />

        <div className="relative mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 rounded-full border border-[#DDD8D0] bg-white px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-500 transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
          >
            <FiArrowLeft
              size={12}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Dashboard
          </Link>

          <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DED8CF] bg-[#F3EFE8] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  LUXORA / Management
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-medium tracking-[-0.06em] text-neutral-950 sm:text-5xl lg:text-[56px]">
                Orders
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
                Manage customer orders, monitor fulfillment,
                and keep your store operations organized.
              </p>
            </div>

            <Link
              href="/products"
              className="group flex w-fit items-center gap-3 rounded-full border border-neutral-950 bg-neutral-950 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-neutral-800"
            >
              View Store

              <FiArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
         ===================================================== */}
      <section className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Overview
            </p>

            <h2 className="mt-1.5 text-xl font-medium tracking-[-0.04em]">
              Store performance
            </h2>
          </div>

          <p className="hidden text-[9px] uppercase tracking-[0.12em] text-neutral-400 sm:block">
            {orders.length} total orders
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Revenue */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#DDD8D0] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.05)] sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2EEE7] text-sm font-medium text-neutral-600">
                $
              </div>

              <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                Revenue
              </span>
            </div>

            <p className="mt-7 text-2xl font-semibold tracking-[-0.05em]">
              ${stats.revenue.toFixed(2)}
            </p>

            <p className="mt-1.5 text-[10px] text-neutral-400">
              From all placed orders
            </p>

            <div className="mt-5 h-px bg-[#EEEAE4]" />

            <p className="mt-3 text-[9px] uppercase tracking-[0.1em] text-neutral-400">
              Avg. order{" "}
              <span className="font-semibold text-neutral-700">
                ${stats.averageOrder.toFixed(2)}
              </span>
            </p>
          </div>

          {/* Processing */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#DDD8D0] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.05)] sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <FiClock size={17} strokeWidth={1.4} />
              </div>

              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-amber-700">
                Active
              </span>
            </div>

            <p className="mt-7 text-3xl font-semibold tracking-[-0.05em]">
              {stats.processing}
            </p>

            <p className="mt-1.5 text-[10px] text-neutral-400">
              Orders awaiting shipment
            </p>

            <div className="mt-5 h-px bg-[#EEEAE4]" />

            <p className="mt-3 text-[9px] uppercase tracking-[0.1em] text-neutral-400">
              Processing queue
            </p>
          </div>

          {/* Shipped */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#DDD8D0] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.05)] sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <FiTruck size={17} strokeWidth={1.4} />
              </div>

              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-sky-700">
                Transit
              </span>
            </div>

            <p className="mt-7 text-3xl font-semibold tracking-[-0.05em]">
              {stats.shipped}
            </p>

            <p className="mt-1.5 text-[10px] text-neutral-400">
              Orders currently in transit
            </p>

            <div className="mt-5 h-px bg-[#EEEAE4]" />

            <p className="mt-3 text-[9px] uppercase tracking-[0.1em] text-neutral-400">
              Shipped orders
            </p>
          </div>

          {/* Delivered */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#DDD8D0] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.05)] sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FiCheck size={17} strokeWidth={1.5} />
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
                Complete
              </span>
            </div>

            <p className="mt-7 text-3xl font-semibold tracking-[-0.05em]">
              {stats.delivered}
            </p>

            <p className="mt-1.5 text-[10px] text-neutral-400">
              Successfully completed orders
            </p>

            <div className="mt-5 h-px bg-[#EEEAE4]" />

            <p className="mt-3 text-[9px] uppercase tracking-[0.1em] text-neutral-400">
              Delivered orders
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTERS
         ===================================================== */}
      <section className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-[#DDD8D0] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.025)]">
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Order Management
              </p>

              <h2 className="mt-1.5 text-lg font-medium tracking-[-0.035em]">
                All Orders
              </h2>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <FiSearch
                size={15}
                strokeWidth={1.5}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search order or customer..."
                className="h-10 w-full border-b border-[#D8D3CB] bg-transparent pl-7 pr-2 text-xs text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-[#EEEAE4] bg-[#FBFAF7] px-5 py-4 sm:px-6">
            {statusFilters.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatus(value)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.07em] transition-all ${
                  status === value
                    ? "border-neutral-950 bg-neutral-950 text-white shadow-sm"
                    : "border-[#DDD8D0] bg-white text-neutral-500 hover:border-neutral-950 hover:text-neutral-950"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {(search || status !== "all") && (
            <div className="flex items-center justify-between border-t border-[#EEEAE4] px-5 py-3.5 sm:px-6">
              <p className="text-[10px] text-neutral-400">
                Showing{" "}
                <span className="font-semibold text-neutral-950">
                  {filteredOrders.length}
                </span>{" "}
                results
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatus("all");
                }}
                className="text-[9px] font-semibold uppercase tracking-[0.1em] text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-950"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ORDERS LIST
         ===================================================== */}
      <section className="mx-auto max-w-[1500px] px-5 pb-12 pt-5 sm:px-8 lg:px-10 lg:pb-16">
        {isLoading ? (
          <div className="rounded-2xl border border-[#DDD8D0] bg-white py-28 text-center">
            <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-[#D8D3CB] border-t-neutral-950" />

            <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Loading orders...
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-[#DDD8D0] bg-white px-5 py-28 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3EFE8]">
              <FiPackage
                size={25}
                strokeWidth={1.2}
                className="text-neutral-400"
              />
            </div>

            <p className="mt-6 text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Orders
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.04em]">
              No orders found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-neutral-500">
              There are no orders matching your current
              search or status filter.
            </p>

            {(search || status !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatus("all");
                }}
                className="mt-6 rounded-full border border-neutral-950 bg-neutral-950 px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#DDD8D0] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.025)]">
            {/* Desktop Header */}
            <div className="hidden border-b border-[#E7E2DB] bg-[#F8F6F2] px-6 py-4 lg:grid lg:grid-cols-[150px_minmax(0,1fr)_125px_110px_130px_60px] lg:items-center lg:gap-5">
              {[
                "Order",
                "Customer",
                "Date",
                "Total",
                "Status",
                "",
              ].map((label, index) => (
                <p
                  key={`${label}-${index}`}
                  className={`text-[8px] font-semibold uppercase tracking-[0.15em] text-neutral-400 ${
                    index === 5 ? "text-right" : ""
                  }`}
                >
                  {label}
                </p>
              ))}
            </div>

            <div className="divide-y divide-[#E7E2DB]">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="group px-5 py-5 transition-all hover:bg-[#FCFBF8] sm:px-6 lg:grid lg:grid-cols-[150px_minmax(0,1fr)_125px_110px_130px_60px] lg:items-center lg:gap-5"
                >
                  {/* Order */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3EFE8]">
                        <FiPackage
                          size={14}
                          strokeWidth={1.3}
                          className="text-neutral-500"
                        />
                      </span>

                      <div>
                        <p className="text-xs font-semibold text-neutral-950">
                          {order.id}
                        </p>

                        <p className="mt-0.5 text-[9px] text-neutral-400">
                          {order.items.length}{" "}
                          {order.items.length === 1
                            ? "product"
                            : "products"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer */}
                  <div className="mt-5 lg:mt-0">
                    <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-400 lg:hidden">
                      Customer
                    </p>

                    <p className="text-xs font-medium text-neutral-950">
                      {order.customer.firstName}{" "}
                      {order.customer.lastName}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-neutral-400">
                      {order.customer.email}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="mt-5 lg:mt-0">
                    <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-400 lg:hidden">
                      Date
                    </p>

                    <p className="text-[11px] text-neutral-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="mt-5 lg:mt-0">
                    <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-400 lg:hidden">
                      Total
                    </p>

                    <p className="text-xs font-semibold text-neutral-950">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="mt-5 lg:mt-0">
                    <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-400 lg:hidden">
                      Status
                    </p>

                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          handleStatusChange(
                            order.id,
                            event.target
                              .value as OrderStatus
                          )
                        }
                        className={`h-9 w-full appearance-none rounded-lg border px-3 pr-8 text-[9px] font-semibold uppercase tracking-[0.04em] outline-none transition-all ${getStatusClass(
                          order.status
                        )}`}
                      >
                        <option value="processing">
                          Processing
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>
                      </select>

                      <FiChevronDown
                        size={12}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                      />
                    </div>
                  </div>

                  {/* View */}
                  <div className="mt-5 flex justify-end lg:mt-0">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                      aria-label={`View ${order.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD8D0] bg-white text-neutral-400 transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                    >
                      <FiEye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#E7E2DB] bg-[#F8F6F2] px-5 py-4 sm:px-6">
              <p className="text-[9px] uppercase tracking-[0.08em] text-neutral-400">
                Showing{" "}
                <span className="font-semibold text-neutral-950">
                  {filteredOrders.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-neutral-950">
                  {orders.length}
                </span>{" "}
                orders
              </p>

              {stats.cancelled > 0 && (
                <p className="hidden text-[9px] uppercase tracking-[0.08em] text-neutral-400 sm:block">
                  Cancelled{" "}
                  <span className="font-semibold text-rose-600">
                    {stats.cancelled}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          ORDER DETAILS MODAL
         ===================================================== */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/45 px-4 py-5 backdrop-blur-[4px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedOrder(null);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#FBFAF7] shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#DDD8D0] bg-[#FBFAF7]/95 px-5 py-5 backdrop-blur-md sm:px-7">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-neutral-950" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Order Details
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-neutral-950">
                  {selectedOrder.id}
                </h2>

                <p className="mt-1 text-[10px] text-neutral-400">
                  {formatDate(selectedOrder.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD8D0] bg-white text-neutral-400 transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="px-5 py-6 sm:px-7">
              {/* Overview */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#DDD8D0] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      Status
                    </p>

                    <FiClock
                      size={14}
                      className="text-neutral-300"
                    />
                  </div>

                  <span
                    className={`mt-4 inline-flex rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.06em] ${getStatusClass(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusLabel(
                      selectedOrder.status
                    )}
                  </span>
                </div>

                <div className="rounded-xl border border-[#DDD8D0] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      Payment
                    </p>

                    <span className="text-sm text-neutral-300">
                      $
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-semibold text-neutral-950">
                    {selectedOrder.paymentMethod ===
                    "cash"
                      ? "Cash on Delivery"
                      : "Card Payment"}
                  </p>
                </div>
              </div>

              {/* Customer */}
              <div className="mt-8 rounded-xl border border-[#DDD8D0] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-[#E7E2DB] pb-4">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Customer
                    </p>

                    <h3 className="mt-1.5 text-base font-medium tracking-[-0.03em]">
                      Customer information
                    </h3>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3EFE8] text-xs font-semibold">
                    {selectedOrder.customer.firstName
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <DetailItem
                    label="Name"
                    value={`${selectedOrder.customer.firstName} ${selectedOrder.customer.lastName}`}
                  />

                  <DetailItem
                    label="Email"
                    value={
                      selectedOrder.customer.email
                    }
                    breakAll
                  />

                  <DetailItem
                    label="Phone"
                    value={
                      selectedOrder.customer.phone
                    }
                  />
                </div>
              </div>

              {/* Shipping */}
              <div className="mt-4 rounded-xl border border-[#DDD8D0] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3 border-b border-[#E7E2DB] pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3EFE8]">
                    <FiTruck
                      size={15}
                      className="text-neutral-500"
                    />
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Shipping
                    </p>

                    <h3 className="mt-1 text-sm font-medium">
                      Delivery address
                    </h3>
                  </div>
                </div>

                <div className="mt-5 text-xs leading-6 text-neutral-600">
                  <p className="font-medium text-neutral-950">
                    {selectedOrder.shippingAddress.address}
                  </p>

                  <p>
                    {selectedOrder.shippingAddress.city},{" "}
                    {
                      selectedOrder.shippingAddress
                        .country
                    }
                  </p>

                  {selectedOrder.shippingAddress
                    .postalCode && (
                    <p>
                      {
                        selectedOrder.shippingAddress
                          .postalCode
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="mt-4 rounded-xl border border-[#DDD8D0] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-[#E7E2DB] pb-4">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Order Items
                    </p>

                    <h3 className="mt-1 text-sm font-medium">
                      Products
                    </h3>
                  </div>

                  <span className="rounded-full bg-[#F3EFE8] px-3 py-1 text-[9px] font-semibold text-neutral-500">
                    {selectedOrder.items.length}
                  </span>
                </div>

                <div className="divide-y divide-[#E7E2DB]">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4"
                    >
                      <OrderItemImage
                        src={item.image}
                        alt={item.title}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-xs font-semibold leading-5 text-neutral-950">
                          {item.title}
                        </p>

                        <p className="mt-1 text-[10px] text-neutral-400">
                          ${item.price.toFixed(2)} ×{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-xs font-semibold text-neutral-950">
                        $
                        {(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="mt-4 rounded-xl border border-[#DDD8D0] bg-white p-5 sm:p-6">
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Order Summary
                </p>

                <div className="mt-5 ml-auto max-w-sm space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-neutral-950">
                      $
                      {selectedOrder.subtotal.toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">
                      Shipping
                    </span>

                    <span className="font-medium text-neutral-950">
                      {selectedOrder.shipping === 0
                        ? "Free"
                        : `$${selectedOrder.shipping.toFixed(
                            2
                          )}`}
                    </span>
                  </div>

                  <div className="h-px bg-[#DDD8D0]" />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-neutral-950">
                      Total
                    </span>

                    <span className="text-lg font-semibold tracking-[-0.03em] text-neutral-950">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div className="mt-4 rounded-xl border border-[#DDD8D0] bg-white p-5 sm:p-6">
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Update Status
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      [
                        "processing",
                        "Processing",
                        FiClock,
                      ],
                      ["shipped", "Shipped", FiTruck],
                      [
                        "delivered",
                        "Delivered",
                        FiCheck,
                      ],
                      ["cancelled", "Cancelled", FiX],
                    ] as const
                  ).map(([value, label, Icon]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        handleStatusChange(
                          selectedOrder.id,
                          value
                        )
                      }
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3.5 text-[8px] font-semibold uppercase tracking-[0.05em] transition-all ${
                        selectedOrder.status === value
                          ? "border-neutral-950 bg-neutral-950 text-white shadow-sm"
                          : "border-[#DDD8D0] bg-white text-neutral-500 hover:border-neutral-950 hover:text-neutral-950"
                      }`}
                    >
                      <Icon size={15} />

                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#DDD8D0] bg-[#F3F0EB] px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full rounded-xl bg-neutral-950 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-neutral-800"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminOrdersPage;

/* =========================================================
   Detail Item
   ========================================================= */

type DetailItemProps = {
  label: string;
  value: string;
  breakAll?: boolean;
};

const DetailItem = ({
  label,
  value,
  breakAll = false,
}: DetailItemProps) => {
  return (
    <div>
      <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
        {label}
      </p>

      <p
        className={`mt-1.5 text-xs text-neutral-950 ${
          breakAll ? "break-all" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   Order Item Image
   ========================================================= */

type OrderItemImageProps = {
  src?: string;
  alt: string;
};

const OrderItemImage = ({
  src,
  alt,
}: OrderItemImageProps) => {
  const [hasError, setHasError] = useState(false);

  const validSrc =
    typeof src === "string" && src.trim().length > 0
      ? src.trim()
      : "";

  if (!validSrc || hasError) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F3EFE8]">
        <FiPackage
          size={21}
          strokeWidth={1.2}
          className="text-neutral-300"
        />
      </div>
    );
  }

  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F3EFE8] p-2">
      <Image
        src={validSrc}
        alt={alt}
        width={80}
        height={80}
        className="h-full w-full object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
};