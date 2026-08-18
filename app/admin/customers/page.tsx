"use client";

import { useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiSearch,
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
  FiUserCheck,
  FiX,
} from "react-icons/fi";

import { getOrders } from "@/lib/order";
import type { Order } from "@/types/order";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
};

const AdminCustomersPage = () => {
  const [search, setSearch] = useState("");

  const customers = useMemo<Customer[]>(() => {
    const orders = getOrders();

    const customerMap = new Map<string, Customer>();

    orders.forEach((order: Order) => {
      const customerId = order.customer.email.toLowerCase();
      const existingCustomer = customerMap.get(customerId);

      if (existingCustomer) {
        existingCustomer.orders += 1;
        existingCustomer.totalSpent += order.total;
      } else {
        customerMap.set(customerId, {
          id: customerId,
          name: `${order.customer.firstName} ${order.customer.lastName}`,
          email: order.customer.email,
          phone: order.customer.phone,
          orders: 1,
          totalSpent: order.total,
        });
      }
    });

    return Array.from(customerMap.values()).sort(
      (a, b) => b.totalSpent - a.totalSpent
    );
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return customers;

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query)
    );
  }, [customers, search]);

  const totalCustomers = customers.length;

  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.orders,
    0
  );

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  const averageOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-neutral-950">
      {/* Decorative Top */}
      <div className="h-1 w-full bg-neutral-950" />

      {/* Header */}
      <section className="border-b border-[#DDD8CE] bg-[#FBFAF7]">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-11">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                  LUXORA / Management
                </p>
              </div>

              <h1 className="mt-4 text-4xl font-medium tracking-[-0.06em] text-neutral-950 sm:text-5xl lg:text-[52px]">
                Customers
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
                Understand your customers, track their activity,
                and monitor the value they bring to your store.
              </p>
            </div>

            {/* Header Summary */}
            <div className="grid grid-cols-2 overflow-hidden border border-[#DDD8CE] bg-[#DDD8CE] sm:w-fit">
              <div className="min-w-[130px] bg-white px-5 py-4">
                <div className="flex items-center gap-2">
                  <FiUserCheck
                    size={14}
                    strokeWidth={1.4}
                    className="text-neutral-400"
                  />

                  <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                    Customers
                  </p>
                </div>

                <p className="mt-2 text-xl font-semibold tracking-[-0.04em]">
                  {totalCustomers}
                </p>
              </div>

              <div className="min-w-[130px] bg-[#F7F4EE] px-5 py-4">
                <div className="flex items-center gap-2">
                  <FiTrendingUp
                    size={14}
                    strokeWidth={1.4}
                    className="text-neutral-400"
                  />

                  <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                    Avg. Order
                  </p>
                </div>

                <p className="mt-2 text-xl font-semibold tracking-[-0.04em]">
                  ${averageOrderValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Customers */}
          <div className="group relative overflow-hidden border border-[#DDD8CE] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
            <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-[#F1ECE3]" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center border border-[#DDD8CE] bg-[#F7F4EE]">
                <FiUsers
                  size={18}
                  strokeWidth={1.3}
                  className="text-neutral-700"
                />
              </div>

              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-300">
                01
              </span>
            </div>

            <div className="relative mt-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Total Customers
              </p>

              <div className="mt-2 flex items-end justify-between gap-4">
                <p className="text-4xl font-medium tracking-[-0.06em]">
                  {totalCustomers}
                </p>

                <span className="mb-1 text-xs text-neutral-400">
                  Active buyers
                </span>
              </div>
            </div>

            <div className="relative mt-6 h-px bg-[#ECE8E0]" />

            <p className="relative mt-4 text-xs leading-5 text-neutral-400">
              Customers who have placed at least one order.
            </p>
          </div>

          {/* Orders */}
          <div className="group relative overflow-hidden border border-[#DDD8CE] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
            <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-[#E9EEE9]" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center border border-[#D9E0D9] bg-[#F3F6F2]">
                <FiShoppingBag
                  size={18}
                  strokeWidth={1.3}
                  className="text-neutral-700"
                />
              </div>

              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-300">
                02
              </span>
            </div>

            <div className="relative mt-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Total Orders
              </p>

              <div className="mt-2 flex items-end justify-between gap-4">
                <p className="text-4xl font-medium tracking-[-0.06em]">
                  {totalOrders}
                </p>

                <span className="mb-1 text-xs text-neutral-400">
                  Completed activity
                </span>
              </div>
            </div>

            <div className="relative mt-6 h-px bg-[#ECE8E0]" />

            <p className="relative mt-4 text-xs leading-5 text-neutral-400">
              Total orders generated by all customers.
            </p>
          </div>

          {/* Revenue */}
          <div className="group relative overflow-hidden border border-[#DDD8CE] bg-neutral-950 p-6 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:col-span-2 xl:col-span-1">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full border border-white/10" />

            <div className="absolute bottom-0 left-0 h-20 w-20 -translate-x-8 translate-y-8 rounded-full border border-white/5" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/10">
                <FiTrendingUp
                  size={18}
                  strokeWidth={1.3}
                  className="text-white"
                />
              </div>

              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/30">
                03
              </span>
            </div>

            <div className="relative mt-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Customer Revenue
              </p>

              <div className="mt-2 flex items-end justify-between gap-4">
                <p className="text-4xl font-medium tracking-[-0.06em]">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="relative mt-6 h-px bg-white/10" />

            <p className="relative mt-4 text-xs leading-5 text-white/45">
              Total revenue generated from customer orders.
            </p>
          </div>
        </div>

        {/* Customer List */}
        <div className="mt-8 overflow-hidden border border-[#DDD8CE] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.025)]">
          {/* Toolbar */}
          <div className="border-b border-[#E5E1D9] bg-[#FBFAF7] px-5 py-6 sm:px-6 lg:px-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1 w-5 bg-neutral-950" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Customer Directory
                  </p>
                </div>

                <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em]">
                  Customer List
                </h2>

                <p className="mt-1.5 text-xs text-neutral-400">
                  Showing {filteredCustomers.length} of{" "}
                  {totalCustomers} customers
                </p>
              </div>

              <div className="flex w-full items-center gap-3 lg:max-w-md">
                <div className="relative flex-1">
                  <FiSearch
                    size={16}
                    strokeWidth={1.4}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search name, email or phone..."
                    className="h-11 w-full border-b border-neutral-300 bg-transparent pl-7 pr-8 text-xs text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="absolute right-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-neutral-400 transition-colors hover:text-neutral-950"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </div>

                <div className="hidden h-11 items-center border border-[#DDD8CE] bg-white px-4 sm:flex">
                  <FiUsers
                    size={15}
                    className="text-neutral-400"
                  />

                  <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                    {filteredCustomers.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Empty */}
          {filteredCustomers.length === 0 ? (
            <div className="px-6 py-28 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#DDD8CE] bg-[#F7F4EE]">
                <FiUsers
                  size={24}
                  strokeWidth={1.2}
                  className="text-neutral-400"
                />
              </div>

              <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Customer Directory
              </p>

              <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                {customers.length === 0
                  ? "No customers yet"
                  : "No customers found"}
              </h3>

              <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-neutral-500">
                {customers.length === 0
                  ? "Customers will automatically appear here after they place their first order."
                  : "Try searching with a different name, email, or phone number."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-7 inline-flex items-center gap-2 border border-neutral-950 bg-neutral-950 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E5E1D9] bg-[#F7F4EE]">
                      <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400 lg:px-7">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                        Orders
                      </th>

                      <th className="px-6 py-4 text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400 lg:px-7">
                        Total Spent
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E8E4DC]">
                    {filteredCustomers.map(
                      (customer, index) => (
                        <tr
                          key={customer.id}
                          className="group transition-colors hover:bg-[#FCFBF8]"
                        >
                          {/* Customer */}
                          <td className="px-6 py-5 lg:px-7">
                            <div className="flex items-center gap-4">
                              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-[#DDD8CE] bg-[#F3EFE7] text-xs font-semibold text-neutral-700">
                                <span>
                                  {customer.name
                                    .charAt(0)
                                    .toUpperCase()}
                                </span>

                                <div className="absolute bottom-0 right-0 h-2 w-2 border-2 border-[#F3EFE7] bg-emerald-500" />
                              </div>

                              <div className="min-w-0">
                                <p className="text-sm font-medium text-neutral-950">
                                  {customer.name}
                                </p>

                                <div className="mt-1.5 flex items-center gap-2">
                                  <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-neutral-400">
                                    Customer
                                  </span>

                                  <span className="h-1 w-1 rounded-full bg-neutral-300" />

                                  <span className="text-[9px] uppercase tracking-[0.08em] text-neutral-400">
                                    #{String(
                                      index + 1
                                    ).padStart(2, "0")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-6 py-5">
                            <div className="space-y-2">
                              <div className="flex max-w-xs items-center gap-2 text-xs text-neutral-500">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#F5F2EC]">
                                  <FiMail
                                    size={12}
                                    strokeWidth={1.4}
                                    className="text-neutral-400"
                                  />
                                </div>

                                <span className="truncate">
                                  {customer.email}
                                </span>
                              </div>

                              {customer.phone && (
                                <div className="flex items-center gap-2 text-xs text-neutral-500">
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#F5F2EC]">
                                    <FiPhone
                                      size={12}
                                      strokeWidth={1.4}
                                      className="text-neutral-400"
                                    />
                                  </div>

                                  <span>
                                    {customer.phone}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Orders */}
                          <td className="px-6 py-5 text-center">
                            <span className="inline-flex min-w-10 items-center justify-center border border-[#DDD8CE] bg-[#F8F5EF] px-3 py-1.5 text-xs font-semibold text-neutral-700">
                              {customer.orders}
                            </span>
                          </td>

                          {/* Total */}
                          <td className="px-6 py-5 text-right lg:px-7">
                            <div className="inline-flex items-center gap-4">
                              <div>
                                <p className="text-sm font-semibold text-neutral-950">
                                  $
                                  {customer.totalSpent.toFixed(
                                    2
                                  )}
                                </p>

                                <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-neutral-400">
                                  Lifetime value
                                </p>
                              </div>

                              <div className="flex h-8 w-8 items-center justify-center border border-[#DDD8CE] bg-white transition-all duration-300 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
                                <FiArrowUpRight
                                  size={14}
                                  strokeWidth={1.4}
                                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-[#E5E1D9] md:hidden">
                {filteredCustomers.map(
                  (customer, index) => (
                    <article
                      key={customer.id}
                      className="p-5 transition-colors hover:bg-[#FCFBF8]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-[#DDD8CE] bg-[#F3EFE7] text-xs font-semibold text-neutral-700">
                          {customer.name
                            .charAt(0)
                            .toUpperCase()}

                          <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-[#F3EFE7] bg-emerald-500" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-medium text-neutral-950">
                                {customer.name}
                              </h3>

                              <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-neutral-400">
                                Customer #{String(
                                  index + 1
                                ).padStart(2, "0")}
                              </p>
                            </div>

                            <FiArrowUpRight
                              size={15}
                              className="shrink-0 text-neutral-300"
                            />
                          </div>

                          <div className="mt-5 space-y-2.5">
                            <div className="flex min-w-0 items-center gap-2 text-xs text-neutral-500">
                              <FiMail
                                size={13}
                                strokeWidth={1.4}
                                className="shrink-0 text-neutral-400"
                              />

                              <span className="truncate">
                                {customer.email}
                              </span>
                            </div>

                            {customer.phone && (
                              <div className="flex items-center gap-2 text-xs text-neutral-500">
                                <FiPhone
                                  size={13}
                                  strokeWidth={1.4}
                                  className="shrink-0 text-neutral-400"
                                />

                                <span>
                                  {customer.phone}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 overflow-hidden border border-[#DDD8CE] bg-[#DDD8CE]">
                        <div className="bg-[#F8F5EF] p-4">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                            Orders
                          </p>

                          <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-neutral-950">
                            {customer.orders}
                          </p>
                        </div>

                        <div className="bg-white p-4 text-right">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                            Total Spent
                          </p>

                          <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-neutral-950">
                            ${customer.totalSpent.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-3 border-t border-[#DDD8CE] bg-[#F7F4EE] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-7">
                <p className="text-[10px] uppercase tracking-[0.08em] text-neutral-400">
                  Showing{" "}
                  <span className="font-semibold text-neutral-950">
                    {filteredCustomers.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-neutral-950">
                    {totalCustomers}
                  </span>{" "}
                  customers
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="flex w-fit items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500 transition-colors hover:text-neutral-950"
                  >
                    Clear Search
                    <FiX size={12} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminCustomersPage;