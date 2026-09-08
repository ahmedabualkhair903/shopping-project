"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiHeart,
  FiHome,
  FiMenu,
  FiPackage,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiUser,
  FiX,
} from "react-icons/fi";

import {
  getCurrentUser,
  logoutUser,
  type AuthUser,
} from "@/lib/auth";

import { getOrders } from "@/lib/order";

import { useWishlist } from "@/context/WishlistContext";

export default function Header() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);

  const { wishlist } = useWishlist();

  /* =========================
      LOAD USER + ORDERS
  ========================== */

  useEffect(() => {
    const updateUser = () => {
      setUser(getCurrentUser());
    };

    const updateOrders = () => {
      try {
        const orders = getOrders();
        setOrdersCount(orders.length);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setOrdersCount(0);
      }
    };

    updateUser();
    updateOrders();

    window.addEventListener("storage", updateUser);
    window.addEventListener("auth-change", updateUser);
    window.addEventListener("orders-change", updateOrders);

    const interval = window.setInterval(() => {
      updateOrders();
    }, 1000);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("auth-change", updateUser);
      window.removeEventListener("orders-change", updateOrders);

      window.clearInterval(interval);
    };
  }, []);

  /* =========================
      LOCK BODY WHEN SIDEBAR
      IS OPEN
  ========================== */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =========================
      CLOSE MENU
  ========================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =========================
      LOGOUT
  ========================== */

  const handleLogout = () => {
    logoutUser();

    window.dispatchEvent(new Event("auth-change"));

    setUser(null);

    closeMenu();
  };

  /* =========================
      DESKTOP NAV STYLE
  ========================== */

  const navLinkClass =
    "group relative flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#30383c] transition-all duration-300 hover:bg-[#edfafd] hover:text-[#2794aa]";

  /* =========================
      ICON BUTTON STYLE
  ========================== */

  const iconButtonClass =
    "group relative flex h-10 w-10 items-center justify-center rounded-full text-[#30383c] transition-all duration-300 hover:bg-[#edfafd] hover:text-[#2794aa]";

  /* =========================
      MOBILE SIDEBAR LINK
  ========================== */

  const mobileLinkClass =
    "group flex items-center justify-between border-b border-[#e7ebea] py-4 text-[16px] font-semibold tracking-[-0.02em] text-[#30383c] transition-all duration-300 hover:text-[#2794aa]";

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* =========================
          MAIN HEADER
      ========================== */}

      <div className="border-b border-[#e5eaeb] bg-white">
        <div className="mx-auto flex h-[82px] max-w-[1440px] items-center px-5 sm:px-8 lg:px-10">
          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dfe6e8] text-[#30383c] transition-all duration-300 hover:border-[#9fd7df] hover:bg-[#edfafd] hover:text-[#2794aa] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-sidebar"
          >
            {menuOpen ? (
              <FiX
                size={19}
                strokeWidth={1.5}
              />
            ) : (
              <FiMenu
                size={19}
                strokeWidth={1.5}
              />
            )}
          </button>

          {/* =========================
              LOGO
          ========================== */}

          <Link
            href="/"
            onClick={closeMenu}
            className="shrink-0"
            aria-label="LUXORA Home"
          >
            <div className="flex flex-col">
              <div className="text-[30px] font-black leading-[0.9] tracking-[-0.085em] text-[#252c30] sm:text-[33px]">
                LUX<span className="text-[#56adbf]">O</span>RA
              </div>

              <div className="mt-1.5 text-[6px] font-semibold uppercase tracking-[0.38em] text-[#8c989d] sm:text-[7px]">
                Everyday essentials
              </div>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}

          <nav className="ml-8 hidden items-center gap-0.5 lg:flex">
            {/* Home */}

            <Link
              href="/"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <FiHome
                size={14}
                strokeWidth={1.45}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              <span>Home</span>

              <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Shop */}

            <Link
              href="/products"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <FiShoppingBag
                size={14}
                strokeWidth={1.45}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              <span>Shop</span>

              <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* New Arrivals */}

            <Link
              href="/products?sort=new"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <FiStar
                size={14}
                strokeWidth={1.45}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              <span>New Arrivals</span>

              <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <FiHeart
                size={14}
                strokeWidth={1.45}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              <span>Wishlist</span>

              <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Orders */}

            <Link
              href="/orders"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <span className="relative">
                <FiPackage
                  size={14}
                  strokeWidth={1.45}
                  className="transition-transform duration-300 group-hover:-translate-y-px"
                />

                {ordersCount > 0 && (
                  <span className="absolute -right-2.5 -top-2.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#56adbf] px-1 text-[6px] font-bold text-white">
                    {ordersCount > 99
                      ? "99+"
                      : ordersCount}
                  </span>
                )}
              </span>

              <span>Orders</span>

              <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Admin */}

            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <FiSettings
                  size={14}
                  strokeWidth={1.45}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />

                <span>Admin</span>

                <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            )}
          </nav>

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="ml-auto flex items-center gap-0.5">
            {/* Search */}

            <Link
              href="/search"
              onClick={closeMenu}
              aria-label="Search products"
              className={iconButtonClass}
            >
              <FiSearch
                size={19}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />
            </Link>

            {/* Account */}

            <Link
              href={user ? "/profile" : "/login"}
              onClick={closeMenu}
              aria-label="Account"
              className={`${iconButtonClass} hidden sm:flex`}
            >
              {user ? (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#30383c] text-[9px] font-semibold text-white transition-colors duration-300 group-hover:bg-[#56adbf]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <FiUser
                  size={19}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:-translate-y-px"
                />
              )}
            </Link>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              onClick={closeMenu}
              aria-label="Wishlist"
              className={`${iconButtonClass} hidden sm:flex`}
            >
              <FiHeart
                size={19}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              {wishlist.length > 0 && (
                <span className="absolute right-0 top-0 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#56adbf] px-1 text-[6px] font-bold text-white">
                  {wishlist.length > 99
                    ? "99+"
                    : wishlist.length}
                </span>
              )}
            </Link>

            {/* Orders */}

            <Link
              href="/orders"
              onClick={closeMenu}
              aria-label="Orders"
              className={`${iconButtonClass} hidden sm:flex`}
            >
              <FiPackage
                size={19}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              {ordersCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#56adbf] px-1 text-[6px] font-bold text-white">
                  {ordersCount > 99
                    ? "99+"
                    : ordersCount}
                </span>
              )}
            </Link>

            {/* Cart */}

            <Link
              href="/cart"
              onClick={closeMenu}
              aria-label="Cart"
              className={iconButtonClass}
            >
              <FiShoppingBag
                size={19}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE SIDEBAR
      ========================== */}

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          menuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* =========================
            OVERLAY
        ========================== */}

        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close menu"
          className={`absolute inset-0 bg-[#172024]/40 backdrop-blur-[3px] transition-opacity duration-500 ${
            menuOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        {/* =========================
            SIDEBAR
        ========================== */}

        <aside
          id="mobile-sidebar"
          className={`absolute right-0 top-0 flex h-full w-[min(360px,88vw)] flex-col bg-[#fbfaf7] shadow-[-24px_0_70px_rgba(37,44,48,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          {/* =========================
              SIDEBAR HEADER
          ========================== */}

          <div className="flex h-[82px] shrink-0 items-center justify-between border-b border-[#e4e8e7] px-5 sm:px-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="group"
              aria-label="LUXORA Home"
            >
              <div className="text-[25px] font-black leading-none tracking-[-0.08em] text-[#252c30]">
                LUX<span className="text-[#56adbf]">O</span>RA
              </div>

              <div className="mt-1.5 text-[6px] font-semibold uppercase tracking-[0.32em] text-[#8d989b]">
                Everyday essentials
              </div>
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe5e5] bg-white text-[#30383c] transition-all duration-300 hover:border-[#a8dce3] hover:bg-[#edfafd] hover:text-[#2794aa]"
            >
              <FiX
                size={18}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* =========================
              SIDEBAR CONTENT
          ========================== */}

          <div className="flex-1 overflow-y-auto px-5 sm:px-6">
            {/* Navigation Label */}

            <div className="pb-1 pt-5">
              <p className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#929b9d]">
                Navigation
              </p>
            </div>

            <nav>
              {/* Home */}

              <Link
                href="/"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                <span className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef9fa] text-[#2794aa] transition-all duration-300 group-hover:bg-[#2794aa] group-hover:text-white">
                    <FiHome
                      size={17}
                      strokeWidth={1.4}
                    />
                  </span>

                  <span>Home</span>
                </span>

                <FiArrowRight
                  size={17}
                  strokeWidth={1.3}
                  className="text-[#a2abad] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2794aa]"
                />
              </Link>

              {/* Shop */}

              <Link
                href="/products"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                <span className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f1e9] text-[#806d50] transition-all duration-300 group-hover:bg-[#806d50] group-hover:text-white">
                    <FiShoppingBag
                      size={17}
                      strokeWidth={1.4}
                    />
                  </span>

                  <span>Shop</span>
                </span>

                <FiArrowRight
                  size={17}
                  strokeWidth={1.3}
                  className="text-[#a2abad] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2794aa]"
                />
              </Link>

              {/* New Arrivals */}

              <Link
                href="/products?sort=new"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                <span className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f3] text-[#607171] transition-all duration-300 group-hover:bg-[#607171] group-hover:text-white">
                    <FiStar
                      size={17}
                      strokeWidth={1.4}
                    />
                  </span>

                  <span>New Arrivals</span>
                </span>

                <FiArrowRight
                  size={17}
                  strokeWidth={1.3}
                  className="text-[#a2abad] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2794aa]"
                />
              </Link>

              {/* Wishlist */}

              <Link
                href="/wishlist"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                <span className="flex items-center gap-3.5">
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#eef9fa] text-[#2794aa] transition-all duration-300 group-hover:bg-[#2794aa] group-hover:text-white">
                    <FiHeart
                      size={17}
                      strokeWidth={1.4}
                    />

                    {wishlist.length > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#56adbf] px-1 text-[7px] font-bold text-white">
                        {wishlist.length > 99
                          ? "99+"
                          : wishlist.length}
                      </span>
                    )}
                  </span>

                  <span>Wishlist</span>
                </span>

                <FiArrowRight
                  size={17}
                  strokeWidth={1.3}
                  className="text-[#a2abad] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2794aa]"
                />
              </Link>

              {/* Orders */}

              <Link
                href="/orders"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                <span className="flex items-center gap-3.5">
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f1e9] text-[#806d50] transition-all duration-300 group-hover:bg-[#806d50] group-hover:text-white">
                    <FiPackage
                      size={17}
                      strokeWidth={1.4}
                    />

                    {ordersCount > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#56adbf] px-1 text-[7px] font-bold text-white">
                        {ordersCount > 99
                          ? "99+"
                          : ordersCount}
                      </span>
                    )}
                  </span>

                  <span>Orders</span>
                </span>

                <FiArrowRight
                  size={17}
                  strokeWidth={1.3}
                  className="text-[#a2abad] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2794aa]"
                />
              </Link>

              {/* Admin */}

              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <span className="flex items-center gap-3.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f3] text-[#607171] transition-all duration-300 group-hover:bg-[#607171] group-hover:text-white">
                      <FiSettings
                        size={17}
                        strokeWidth={1.4}
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    </span>

                    <span>Admin</span>
                  </span>

                  <FiArrowRight
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#a2abad] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2794aa]"
                  />
                </Link>
              )}
            </nav>

            {/* =========================
                QUICK ACCESS
            ========================== */}

            <div className="mt-6 rounded-[20px] border border-[#e4e8e7] bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-[7px] font-semibold uppercase tracking-[0.22em] text-[#919a9c]">
                  Quick access
                </p>

                <span className="h-1.5 w-1.5 rounded-full bg-[#56b7c9]" />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/search"
                  onClick={closeMenu}
                  className="group flex items-center gap-2.5 rounded-[14px] bg-[#f5f8f7] px-3 py-3 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#566164] transition-all duration-300 hover:bg-[#edfafd] hover:text-[#2794aa]"
                >
                  <FiSearch
                    size={14}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:-translate-y-px"
                  />

                  Search
                </Link>

                <Link
                  href="/cart"
                  onClick={closeMenu}
                  className="group flex items-center gap-2.5 rounded-[14px] bg-[#f5f8f7] px-3 py-3 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#566164] transition-all duration-300 hover:bg-[#edfafd] hover:text-[#2794aa]"
                >
                  <FiShoppingBag
                    size={14}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:-translate-y-px"
                  />

                  Cart
                </Link>
              </div>
            </div>

            {/* Small promo */}

            <div className="mb-6 mt-3 rounded-[20px] bg-[#30383c] px-4 py-4 text-white">
              <p className="text-[7px] font-semibold uppercase tracking-[0.2em] text-[#9edce5]">
                LUXORA
              </p>

              <p className="mt-1.5 text-[12px] font-medium tracking-[-0.02em]">
                Free shipping over $50
              </p>

              <p className="mt-1 text-[8px] leading-4 text-[#b9c2c4]">
                Discover carefully selected
                everyday essentials.
              </p>
            </div>
          </div>

          {/* =========================
              SIDEBAR FOOTER
          ========================== */}

          <div className="shrink-0 border-t border-[#e4e8e7] bg-white px-5 py-4 sm:px-6">
            {user ? (
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="group flex min-w-0 items-center gap-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#30383c] text-[10px] font-semibold text-white transition-colors duration-300 group-hover:bg-[#56adbf]">
                    {user.name.charAt(0).toUpperCase()}
                  </span>

                  <div className="min-w-0">
                    <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.11em] text-[#4a5357]">
                      {user.name}
                    </span>

                    <span className="mt-1 block text-[7px] uppercase tracking-[0.11em] text-[#919a9c]">
                      {user.role === "admin"
                        ? "Administrator"
                        : "My account"}
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="shrink-0 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#8c989d] underline underline-offset-4 transition-colors duration-300 hover:text-[#2794aa]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex h-11 items-center justify-center rounded-full bg-[#30383c] text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#2794aa]"
              >
                Login / Register
              </Link>
            )}
          </div>
        </aside>
      </div>
    </header>
  );
}