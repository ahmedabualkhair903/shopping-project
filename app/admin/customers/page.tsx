"use client";

import { useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiSearch,
  FiShoppingBag,
  FiUsers,
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
    <main className="min-h-screen bg-[#F7F6F3] text-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-neutral-400">
                LUXORA / Management
              </p>

              <h1 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-neutral-950 sm:text-4xl lg:text-[42px]">
                Customers
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500">
                Manage customer information and monitor shopping
                activity across your store.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 border border-neutral-200 bg-[#FAFAF8] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center border border-neutral-200 bg-white">
                <FiUsers
                  size={16}
                  strokeWidth={1.4}
                  className="text-neutral-500"
                />
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                  Customers
                </p>

                <p className="mt-0.5 text-sm font-semibold text-neutral-950">
                  {totalCustomers}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
          {/* Customers */}
          <div className="bg-white p-5 transition-colors hover:bg-[#FCFCFA] sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Customers
                </p>

                <p className="mt-5 text-3xl font-medium tracking-[-0.04em] text-neutral-950">
                  {totalCustomers}
                </p>
              </div>

              <FiUsers
                size={17}
                strokeWidth={1.3}
                className="text-neutral-300"
              />
            </div>

            <p className="mt-3 text-xs text-neutral-400">
              Customers who placed an order
            </p>
          </div>

          {/* Orders */}
          <div className="bg-white p-5 transition-colors hover:bg-[#FCFCFA] sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Orders
                </p>

                <p className="mt-5 text-3xl font-medium tracking-[-0.04em] text-neutral-950">
                  {totalOrders}
                </p>
              </div>

              <FiShoppingBag
                size={17}
                strokeWidth={1.3}
                className="text-neutral-300"
              />
            </div>

            <p className="mt-3 text-xs text-neutral-400">
              Total orders from customers
            </p>
          </div>

          {/* Revenue */}
          <div className="bg-white p-5 transition-colors hover:bg-[#FCFCFA] sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Revenue
                </p>

                <p className="mt-5 text-3xl font-medium tracking-[-0.04em] text-neutral-950">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>

              <span className="text-base font-medium text-neutral-300">
                $
              </span>
            </div>

            <p className="mt-3 text-xs text-neutral-400">
              Revenue generated by customers
            </p>
          </div>
        </div>
      </section>

      {/* Customer List */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10">
        <div className="overflow-hidden border border-neutral-200 bg-white">
          {/* Toolbar */}
          <div className="flex flex-col gap-5 border-b border-neutral-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Store Management
              </p>

              <h2 className="mt-2 text-lg font-medium tracking-[-0.03em] text-neutral-950">
                Customer List
              </h2>

              <p className="mt-1 text-[11px] text-neutral-400">
                {filteredCustomers.length} of {totalCustomers}{" "}
                customers
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <FiSearch
                size={15}
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
                className="h-10 w-full border-b border-neutral-300 bg-transparent pl-7 pr-3 text-xs text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
              />
            </div>
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 ? (
            <div className="px-6 py-24 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-neutral-200">
                <FiUsers
                  size={22}
                  strokeWidth={1.2}
                  className="text-neutral-300"
                />
              </div>

              <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Customers
              </p>

              <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-neutral-950">
                {customers.length === 0
                  ? "No customers yet"
                  : "No customers found"}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-neutral-500">
                {customers.length === 0
                  ? "Customers will appear here after they place their first order."
                  : "Try searching with a different name, email, or phone number."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 border-b border-neutral-950 pb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 transition-colors hover:text-neutral-950"
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
                    <tr className="border-b border-neutral-200 bg-[#FAFAF8]">
                      <th className="px-6 py-4 text-left text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                        Orders
                      </th>

                      <th className="px-6 py-4 text-right text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                        Total Spent
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-200">
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="group transition-colors hover:bg-[#FCFCFA]"
                      >
                        {/* Customer */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-200 bg-[#F7F6F3] text-xs font-medium text-neutral-700">
                              {customer.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-medium text-neutral-950">
                                {customer.name}
                              </p>

                              <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-neutral-400">
                                Customer
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
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

                                <span>{customer.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Orders */}
                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex min-w-8 items-center justify-center border border-neutral-200 bg-[#FAFAF8] px-3 py-1 text-xs font-medium text-neutral-700">
                            {customer.orders}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-5 text-right">
                          <div className="inline-flex items-center gap-3">
                            <p className="text-sm font-semibold text-neutral-950">
                              ${customer.totalSpent.toFixed(2)}
                            </p>

                            <div className="flex h-7 w-7 items-center justify-center border border-neutral-200 bg-white">
                              <FiArrowUpRight
                                size={14}
                                strokeWidth={1.4}
                                className="text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
              <div className="divide-y divide-neutral-200 md:hidden">
                {filteredCustomers.map((customer) => (
                  <article
                    key={customer.id}
                    className="p-5 transition-colors hover:bg-[#FCFCFA]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-200 bg-[#F7F6F3] text-xs font-medium text-neutral-700">
                        {customer.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-neutral-950">
                          {customer.name}
                        </h3>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-neutral-400">
                          Customer
                        </p>

                        <div className="mt-4 space-y-2.5">
                          <div className="flex items-center gap-2 text-xs text-neutral-500">
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

                              <span>{customer.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 border border-neutral-200 bg-[#FAFAF8] p-4">
                      <div>
                        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                          Orders
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-neutral-950">
                          {customer.orders}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                          Total Spent
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-neutral-950">
                          ${customer.totalSpent.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-neutral-200 bg-[#FAFAF8] px-5 py-4 sm:px-6">
                <p className="text-[10px] uppercase tracking-[0.08em] text-neutral-400">
                  Showing{" "}
                  <span className="font-medium text-neutral-950">
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