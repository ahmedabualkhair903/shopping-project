"use client";

import { useMemo, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiSearch,
  FiShoppingBag,
  FiUsers,
  FiArrowUpRight,
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

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-500">
                <span>Administration</span>
                <span className="h-px w-5 bg-indigo-200" />
                <span>Customers</span>
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">
                Customers
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Manage customer information and monitor shopping
                activity across your store.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                <FiUsers
                  size={16}
                  strokeWidth={1.5}
                  className="text-indigo-600"
                />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-400">
                  Customers
                </p>

                <p className="mt-0.5 text-sm font-semibold text-indigo-950">
                  {totalCustomers}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Customers */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-500">
                  Customers
                </p>

                <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  {totalCustomers}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <FiUsers
                  size={17}
                  strokeWidth={1.5}
                  className="text-indigo-600"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Customers who placed an order
            </p>
          </div>

          {/* Orders */}
          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-500">
                  Orders
                </p>

                <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  {totalOrders}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <FiShoppingBag
                  size={17}
                  strokeWidth={1.5}
                  className="text-sky-600"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Total orders from customers
            </p>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-500">
                  Revenue
                </p>

                <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <span className="text-sm font-semibold text-emerald-600">
                  $
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Revenue generated by customers
            </p>
          </div>
        </div>
      </section>

      {/* Customer List */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col gap-5 border-b border-slate-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-950">
                Customer List
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {filteredCustomers.length} of {totalCustomers} customers
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <FiSearch
                size={15}
                strokeWidth={1.5}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search name, email or phone..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-50"
              />
            </div>
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 ? (
            <div className="px-6 py-24 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
                <FiUsers
                  size={22}
                  strokeWidth={1.4}
                  className="text-indigo-400"
                />
              </div>

              <h3 className="mt-5 text-sm font-semibold text-slate-950">
                {customers.length === 0
                  ? "No customers yet"
                  : "No customers found"}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-400">
                {customers.length === 0
                  ? "Customers will appear here after they place their first order."
                  : "Try searching with a different name, email, or phone number."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-full bg-indigo-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-600 transition-colors hover:bg-indigo-100"
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
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        Orders
                      </th>

                      <th className="px-6 py-4 text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        Total Spent
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="group transition-colors hover:bg-indigo-50/30"
                      >
                        {/* Customer */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm">
                              {customer.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-950">
                                {customer.name}
                              </p>

                              <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-indigo-400">
                                Customer
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <FiMail
                                size={13}
                                strokeWidth={1.5}
                                className="shrink-0 text-indigo-400"
                              />

                              <span className="truncate">
                                {customer.email}
                              </span>
                            </div>

                            {customer.phone && (
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <FiPhone
                                  size={13}
                                  strokeWidth={1.5}
                                  className="shrink-0 text-sky-400"
                                />

                                <span>{customer.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Orders */}
                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                            {customer.orders}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-5 text-right">
                          <div className="inline-flex items-center gap-3">
                            <p className="text-sm font-semibold text-slate-950">
                              ${customer.totalSpent.toFixed(2)}
                            </p>

                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
                              <FiArrowUpRight
                                size={14}
                                strokeWidth={1.5}
                                className="text-emerald-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-slate-200 md:hidden">
                {filteredCustomers.map((customer) => (
                  <article
                    key={customer.id}
                    className="p-5 transition-colors hover:bg-indigo-50/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-semibold text-white shadow-sm">
                        {customer.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-slate-950">
                          {customer.name}
                        </h3>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-indigo-400">
                          Customer
                        </p>

                        <div className="mt-4 space-y-2.5">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <FiMail
                              size={13}
                              strokeWidth={1.5}
                              className="shrink-0 text-indigo-400"
                            />

                            <span className="truncate">
                              {customer.email}
                            </span>
                          </div>

                          {customer.phone && (
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <FiPhone
                                size={13}
                                strokeWidth={1.5}
                                className="shrink-0 text-sky-400"
                              />

                              <span>{customer.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-50 p-4">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          Orders
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-slate-950">
                          {customer.orders}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          Total Spent
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-emerald-600">
                          ${customer.totalSpent.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
                <p className="text-[10px] uppercase tracking-[0.08em] text-slate-400">
                  Showing{" "}
                  <span className="font-semibold text-indigo-600">
                    {filteredCustomers.length}
                  </span>{" "}
                  customers
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminCustomersPage;