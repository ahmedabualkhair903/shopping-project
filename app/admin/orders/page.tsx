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
    return {
      revenue: orders.reduce((sum, order) => sum + order.total, 0),
      processing: orders.filter(
        (order) => order.status === "processing"
      ).length,
      shipped: orders.filter(
        (order) => order.status === "shipped"
      ).length,
      delivered: orders.filter(
        (order) => order.status === "delivered"
      ).length,
    };
  }, [orders]);

  const handleStatusChange = (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    const updated = updateOrderStatus(orderId, newStatus);

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
        return "border-blue-200 bg-blue-50 text-blue-700";
      case "delivered":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";
      case "cancelled":
        return "border-red-200 bg-red-50 text-red-700";
      default:
        return "border-neutral-200 bg-neutral-50 text-neutral-600";
    }
  };

  const statusFilters: Array<
    ["all" | OrderStatus, string]
  > = [
    ["all", "All"],
    ["processing", "Processing"],
    ["shipped", "Shipped"],
    ["delivered", "Delivered"],
    ["cancelled", "Cancelled"],
  ];

  return (
    <main className="min-h-screen bg-[#F7F6F3]">
      {/* Header */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-neutral-950"
          >
            <FiArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Dashboard
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-neutral-400">
                Store Management
              </p>

              <h1 className="mt-2 text-3xl font-medium tracking-[-0.05em] text-neutral-950 sm:text-4xl lg:text-[42px]">
                Orders
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                Manage customer orders and keep track of
                fulfillment across your store.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-2 border-b border-neutral-300 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:border-neutral-950 hover:text-neutral-950"
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

      {/* Content */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* Stats */}
        <div className="grid overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-5 transition-colors hover:bg-neutral-50 sm:p-6">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
              Total Revenue
            </p>

            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
              ${stats.revenue.toFixed(2)}
            </p>

            <p className="mt-2 text-[11px] text-neutral-400">
              From all placed orders
            </p>
          </div>

          <div className="bg-white p-5 transition-colors hover:bg-neutral-50 sm:p-6">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
              Processing
            </p>

            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
              {stats.processing}
            </p>

            <p className="mt-2 text-[11px] text-neutral-400">
              Awaiting shipment
            </p>
          </div>

          <div className="bg-white p-5 transition-colors hover:bg-neutral-50 sm:p-6">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
              Shipped
            </p>

            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
              {stats.shipped}
            </p>

            <p className="mt-2 text-[11px] text-neutral-400">
              Currently in transit
            </p>
          </div>

          <div className="bg-white p-5 transition-colors hover:bg-neutral-50 sm:p-6">
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
              Delivered
            </p>

            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
              {stats.delivered}
            </p>

            <p className="mt-2 text-[11px] text-neutral-400">
              Successfully completed
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-8 border border-neutral-200 bg-white">
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <FiSearch
                size={16}
                strokeWidth={1.5}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search orders or customers..."
                className="h-10 w-full border-b border-neutral-300 bg-transparent pl-7 pr-2 text-xs text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {statusFilters.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={`border px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.06em] transition-all ${
                    status === value
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-950 hover:text-neutral-950"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {(search || status !== "all") && (
            <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-3 sm:px-6">
              <p className="text-[11px] text-neutral-400">
                {filteredOrders.length}{" "}
                {filteredOrders.length === 1
                  ? "result"
                  : "results"}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatus("all");
                }}
                className="text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-400 underline underline-offset-4 transition-colors hover:text-neutral-950"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Orders */}
        {isLoading ? (
          <div className="mt-6 border border-neutral-200 bg-white py-24 text-center">
            <span className="mx-auto block h-7 w-7 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-950" />

            <p className="mt-4 text-[10px] uppercase tracking-[0.12em] text-neutral-400">
              Loading orders...
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="mt-6 border border-neutral-200 bg-white px-5 py-24 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-neutral-200">
              <FiPackage
                size={23}
                strokeWidth={1.2}
                className="text-neutral-300"
              />
            </div>

            <h2 className="mt-5 text-base font-medium text-neutral-950">
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
                className="mt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 underline underline-offset-4 hover:text-neutral-950"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div className="mt-6 overflow-hidden border border-neutral-200 bg-white">
            {/* Desktop Header */}
            <div className="hidden border-b border-neutral-200 bg-[#FAFAF8] px-6 py-3.5 lg:grid lg:grid-cols-[145px_minmax(0,1fr)_125px_110px_125px_70px] lg:items-center lg:gap-4">
              {[
                "Order",
                "Customer",
                "Date",
                "Total",
                "Status",
                "View",
              ].map((label, index) => (
                <p
                  key={label}
                  className={`text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400 ${
                    index === 5 ? "text-right" : ""
                  }`}
                >
                  {label}
                </p>
              ))}
            </div>

            <div className="divide-y divide-neutral-200">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="px-5 py-5 transition-colors hover:bg-[#FCFCFA] sm:px-6 lg:grid lg:grid-cols-[145px_minmax(0,1fr)_125px_110px_125px_70px] lg:items-center lg:gap-4"
                >
                  {/* Order */}
                  <div>
                    <p className="text-xs font-semibold text-neutral-950">
                      {order.id}
                    </p>

                    <p className="mt-1 text-[10px] text-neutral-400">
                      {order.items.length}{" "}
                      {order.items.length === 1
                        ? "product"
                        : "products"}
                    </p>
                  </div>

                  {/* Customer */}
                  <div className="mt-4 lg:mt-0">
                    <p className="mb-1 text-[9px] uppercase tracking-[0.1em] text-neutral-400 lg:hidden">
                      Customer
                    </p>

                    <p className="text-xs font-medium text-neutral-950">
                      {order.customer.firstName}{" "}
                      {order.customer.lastName}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-neutral-400">
                      {order.customer.email}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="mt-4 lg:mt-0">
                    <p className="mb-1 text-[9px] uppercase tracking-[0.1em] text-neutral-400 lg:hidden">
                      Date
                    </p>

                    <p className="text-[11px] text-neutral-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="mt-4 lg:mt-0">
                    <p className="mb-1 text-[9px] uppercase tracking-[0.1em] text-neutral-400 lg:hidden">
                      Total
                    </p>

                    <p className="text-xs font-semibold text-neutral-950">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="mt-4 lg:mt-0">
                    <p className="mb-2 text-[9px] uppercase tracking-[0.1em] text-neutral-400 lg:hidden">
                      Status
                    </p>

                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          handleStatusChange(
                            order.id,
                            event.target.value as OrderStatus
                          )
                        }
                        className={`h-8 w-full appearance-none border px-2.5 pr-7 text-[9px] font-medium uppercase tracking-[0.05em] outline-none transition-colors ${getStatusClass(
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
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                      />
                    </div>
                  </div>

                  {/* View */}
                  <div className="mt-5 flex justify-end lg:mt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      aria-label={`View ${order.id}`}
                      className="flex h-8 w-8 items-center justify-center border border-neutral-200 text-neutral-400 transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                    >
                      <FiEye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200 bg-[#FAFAF8] px-5 py-3.5 sm:px-6">
              <p className="text-[10px] text-neutral-400">
                Showing{" "}
                <span className="font-medium text-neutral-950">
                  {filteredOrders.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-neutral-950">
                  {orders.length}
                </span>{" "}
                orders
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedOrder(null);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-neutral-200 bg-white px-5 py-5 sm:px-7">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                  Order Details
                </p>

                <h2 className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
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
                className="flex h-8 w-8 items-center justify-center border border-transparent text-neutral-400 transition-colors hover:border-neutral-200 hover:text-neutral-950"
              >
                <FiX size={17} />
              </button>
            </div>

            <div className="px-5 py-6 sm:px-7">
              {/* Overview */}
              <div className="grid overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
                <div className="bg-white p-4">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-neutral-400">
                    Status
                  </p>

                  <span
                    className={`mt-3 inline-flex border px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.06em] ${getStatusClass(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>

                <div className="bg-white p-4">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-neutral-400">
                    Payment
                  </p>

                  <p className="mt-3 text-xs font-medium text-neutral-950">
                    {selectedOrder.paymentMethod === "cash"
                      ? "Cash on Delivery"
                      : "Card Payment"}
                  </p>
                </div>
              </div>

              {/* Customer */}
              <div className="mt-8">
                <h3 className="border-b border-neutral-950 pb-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-950">
                  Customer
                </h3>

                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-neutral-400">
                      Name
                    </p>

                    <p className="mt-1 text-xs text-neutral-950">
                      {selectedOrder.customer.firstName}{" "}
                      {selectedOrder.customer.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-neutral-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-xs text-neutral-950">
                      {selectedOrder.customer.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-neutral-400">
                      Phone
                    </p>

                    <p className="mt-1 text-xs text-neutral-950">
                      {selectedOrder.customer.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="mt-8">
                <h3 className="border-b border-neutral-950 pb-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-950">
                  Shipping Address
                </h3>

                <div className="mt-4 text-xs leading-6 text-neutral-600">
                  <p>
                    {selectedOrder.shippingAddress.address}
                  </p>

                  <p>
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.country}
                  </p>

                  {selectedOrder.shippingAddress.postalCode && (
                    <p>
                      {selectedOrder.shippingAddress.postalCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="mt-8">
                <h3 className="border-b border-neutral-950 pb-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-950">
                  Items
                </h3>

                <div className="divide-y divide-neutral-200">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden bg-neutral-100 p-2">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-xs font-medium leading-5 text-neutral-950">
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
              <div className="mt-8 border-t border-neutral-950 pt-5">
                <div className="ml-auto max-w-xs space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-neutral-950">
                      ${selectedOrder.subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">
                      Shipping
                    </span>

                    <span className="font-medium text-neutral-950">
                      {selectedOrder.shipping === 0
                        ? "Free"
                        : `$${selectedOrder.shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="h-px bg-neutral-200" />

                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-neutral-950">
                      Total
                    </span>

                    <span className="text-base font-semibold text-neutral-950">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mt-8 border-t border-neutral-200 pt-6">
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                  Update Status
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      ["processing", "Processing", FiClock],
                      ["shipped", "Shipped", FiTruck],
                      ["delivered", "Delivered", FiCheck],
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
                      className={`flex flex-col items-center justify-center gap-2 border px-2 py-3 text-[9px] font-medium uppercase tracking-[0.04em] transition-all ${
                        selectedOrder.status === value
                          ? "border-neutral-950 bg-neutral-950 text-white"
                          : "border-neutral-200 text-neutral-500 hover:border-neutral-950 hover:text-neutral-950"
                      }`}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-neutral-200 bg-neutral-50 px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full border border-neutral-950 bg-neutral-950 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800"
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