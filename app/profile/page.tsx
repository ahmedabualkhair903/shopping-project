"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiLogOut,
  FiMail,
  FiPackage,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

import {
  getCurrentUser,
  logoutUser,
  type AuthUser,
} from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    setUser(currentUser);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    logoutUser();

    window.dispatchEvent(new Event("auth-change"));

    router.push("/");
    router.refresh();
  };

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-white">
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="text-center">
            <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-[#D9DED2] border-t-[#68705A]" />

            <p className="mt-5 text-sm text-[#77736D]">
              Loading your account...
            </p>
          </div>
        </section>
      </main>
    );
  }

  const firstLetter = user.name.charAt(0).toUpperCase();
  const firstName = user.name.split(" ")[0];

  return (
    <main className="min-h-screen bg-white text-[#262521]">
      {/* =====================================================
          Page Header
      ====================================================== */}

      <section className="border-b border-[#E8E6E1] bg-[#FAFAF8]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#85827B] transition-colors duration-300 hover:text-[#68705A]"
          >
            <FiArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to store
          </Link>

          <div className="mt-9 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#A96852]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A96852]">
                  LUXORA / Account
                </p>
              </div>

              <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em] text-[#262521] sm:text-5xl lg:text-6xl">
                Welcome, {firstName}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#77736D] sm:text-base">
                Manage your personal details, explore your orders,
                and keep everything related to your LUXORA account
                in one place.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-[#DDE2D5] bg-[#F1F4EC] px-4 py-2.5 text-xs font-medium text-[#68705A]">
              <FiUser
                size={15}
                strokeWidth={1.5}
              />

              <span>Personal Account</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Main Content
      ====================================================== */}

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-16">
          {/* =================================================
              Left Column
          ================================================== */}

          <div className="space-y-10">
            {/* Profile Card */}

            <section className="overflow-hidden rounded-2xl border border-[#E7E5E0] bg-white shadow-[0_12px_40px_rgba(38,37,33,0.05)]">
              <div className="h-2 bg-gradient-to-r from-[#68705A] via-[#8A9278] to-[#A96852]" />

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                  {/* Avatar */}

                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#68705A] text-3xl font-medium text-white shadow-[0_10px_25px_rgba(104,112,90,0.22)] sm:h-28 sm:w-28 sm:text-4xl">
                      {firstLetter}
                    </div>

                    <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-[#A96852]">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A96852]">
                      Account Holder
                    </p>

                    <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em] text-[#262521] sm:text-3xl">
                      {user.name}
                    </h2>

                    <div className="mt-3 flex min-w-0 items-center gap-2 text-sm text-[#77736D]">
                      <FiMail
                        size={15}
                        strokeWidth={1.5}
                        className="shrink-0 text-[#68705A]"
                      />

                      <span className="break-all">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="my-8 h-px bg-[#ECEAE5]" />

                {/* Account Details */}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="group rounded-xl border border-[#E7E5E0] bg-[#FAFAF8] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDD4C4] hover:shadow-[0_8px_25px_rgba(38,37,33,0.04)] sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9EEE3] text-[#68705A]">
                        <FiUser
                          size={17}
                          strokeWidth={1.5}
                        />
                      </div>

                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#403D38]">
                        Full Name
                      </p>
                    </div>

                    <p className="mt-5 text-sm font-medium text-[#77736D]">
                      {user.name}
                    </p>
                  </div>

                  <div className="group rounded-xl border border-[#E7E5E0] bg-[#FAFAF8] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E1CFC6] hover:shadow-[0_8px_25px_rgba(38,37,33,0.04)] sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5E9E4] text-[#A96852]">
                        <FiMail
                          size={17}
                          strokeWidth={1.5}
                        />
                      </div>

                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#403D38]">
                        Email Address
                      </p>
                    </div>

                    <p className="mt-5 break-all text-sm font-medium text-[#77736D]">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Account Information */}

            <section className="rounded-2xl border border-[#E7E5E0] bg-white p-6 shadow-[0_10px_35px_rgba(38,37,33,0.035)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF1E9] text-[#68705A]">
                  <FiCalendar
                    size={17}
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A96852]">
                    Account
                  </p>

                  <h2 className="mt-1 text-base font-medium text-[#262521]">
                    Account Information
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-[#85827B]">
                    Your LUXORA account details and identification.
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-xl border border-[#E7E5E0] bg-[#FAFAF8] px-5 py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A96852]">
                  Account ID
                </p>

                <p className="mt-2 break-all font-mono text-xs leading-5 text-[#77736D]">
                  {user.id}
                </p>
              </div>
            </section>
          </div>

          {/* =================================================
              Right Column
          ================================================== */}

          <aside className="h-fit lg:sticky lg:top-28">
            <div className="rounded-2xl border border-[#E7E5E0] bg-white p-5 shadow-[0_12px_40px_rgba(38,37,33,0.05)] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A96852]">
                    Explore
                  </p>

                  <h2 className="mt-1 text-lg font-medium tracking-[-0.02em] text-[#262521]">
                    Quick Actions
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F2EC] text-[#68705A]">
                  <FiShoppingBag
                    size={16}
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#85827B]">
                Everything you need to continue your LUXORA experience.
              </p>

              <div className="mt-6 space-y-3">
                {/* Products */}

                <Link
                  href="/products"
                  className="group flex items-center gap-4 rounded-xl border border-[#E7E5E0] bg-[#FAFAF8] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDD4C4] hover:bg-[#F5F7F1] hover:shadow-[0_8px_22px_rgba(38,37,33,0.05)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#68705A] text-white">
                    <FiShoppingBag
                      size={17}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#262521]">
                      Continue shopping
                    </p>

                    <p className="mt-1 text-xs text-[#85827B]">
                      Browse our products
                    </p>
                  </div>

                  <FiArrowRight
                    size={17}
                    className="shrink-0 text-[#AAA59D] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#68705A]"
                  />
                </Link>

                {/* Orders */}

                <Link
                  href="/orders"
                  className="group flex items-center gap-4 rounded-xl border border-[#E7E5E0] bg-[#FAFAF8] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E1CFC6] hover:bg-[#FCF7F4] hover:shadow-[0_8px_22px_rgba(38,37,33,0.05)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3E4DE] text-[#A96852]">
                    <FiPackage
                      size={17}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#262521]">
                      My orders
                    </p>

                    <p className="mt-1 text-xs text-[#85827B]">
                      View your purchases
                    </p>
                  </div>

                  <FiArrowRight
                    size={17}
                    className="shrink-0 text-[#AAA59D] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#A96852]"
                  />
                </Link>
              </div>

              {/* Divider */}

              <div className="my-6 h-px bg-[#ECEAE5]" />

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#DDD9D2] bg-white text-xs font-medium uppercase tracking-[0.1em] text-[#77736D] transition-all duration-300 hover:border-[#D5B5A7] hover:bg-[#FCF7F4] hover:text-[#A96852] focus:outline-none focus:ring-2 focus:ring-[#68705A] focus:ring-offset-2"
              >
                <FiLogOut
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />

                Logout
              </button>
            </div>

            {/* Small Brand Card */}

            <div className="mt-4 overflow-hidden rounded-2xl bg-[#68705A] p-6 text-white">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E9EEE3]">
                  LUXORA
                </p>

                <span className="h-2 w-2 rounded-full bg-[#D8B8AA]" />
              </div>

              <p className="mt-5 text-lg font-medium tracking-[-0.02em]">
                Designed for your everyday style.
              </p>

              <p className="mt-2 text-xs leading-5 text-[#E2E6DC]">
                Discover a curated shopping experience built around
                simplicity and elegance.
              </p>

              <Link
                href="/products"
                className="group mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-white"
              >
                Explore collection

                <FiArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          Bottom Accent
      ====================================================== */}

      <div className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-10">
        <div className="flex h-1 overflow-hidden rounded-full">
          <div className="w-1/2 bg-[#68705A]" />
          <div className="w-1/4 bg-[#A96852]" />
          <div className="w-1/4 bg-[#D9DED2]" />
        </div>
      </div>
    </main>
  );
}