"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
  FiArrowRight,
  FiStar,
  FiSettings,
} from "react-icons/fi";

import {
  getCurrentUser,
  logoutUser,
  type AuthUser,
} from "@/lib/auth";

import { useWishlist } from "@/context/WishlistContext";

export default function Header() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { wishlist } = useWishlist();

  useEffect(() => {
    const updateUser = () => {
      setUser(getCurrentUser());
    };

    updateUser();

    window.addEventListener("storage", updateUser);
    window.addEventListener("auth-change", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("auth-change", updateUser);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();

    window.dispatchEvent(new Event("auth-change"));

    setUser(null);

    closeMenu();
  };

  const navLinkClass =
    "group relative flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#30383c] transition-all duration-300 hover:bg-[#edfafd] hover:text-[#2794aa]";

  const iconButtonClass =
    "group relative flex h-11 w-11 items-center justify-center rounded-full text-[#30383c] transition-all duration-300 hover:bg-[#edfafd] hover:text-[#2794aa]";

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* =========================
          MAIN HEADER
      ========================== */}

      <div className="border-b border-[#e5eaeb] bg-white">
        <div className="mx-auto flex h-[86px] max-w-[1440px] items-center px-5 sm:px-8 lg:px-10">

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="mr-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe6e8] text-[#30383c] transition-all duration-300 hover:border-[#9fd7df] hover:bg-[#edfafd] hover:text-[#2794aa] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <FiX size={20} strokeWidth={1.5} />
            ) : (
              <FiMenu size={20} strokeWidth={1.5} />
            )}
          </button>

          {/* Logo */}

          <Link
            href="/"
            onClick={closeMenu}
            className="shrink-0"
          >
            <div className="flex flex-col">
              <div className="text-[32px] font-black leading-[0.9] tracking-[-0.085em] text-[#252c30] sm:text-[35px]">
                LUX<span className="text-[#56adbf]">O</span>RA
              </div>

              <div className="mt-2 text-[7px] font-semibold uppercase tracking-[0.38em] text-[#8c989d]">
                Everyday essentials
              </div>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}

          <nav className="ml-12 hidden items-center gap-1 lg:flex">

            {/* Shop */}

            <Link
              href="/products"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <FiShoppingBag
                size={15}
                strokeWidth={1.45}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              <span>Shop</span>

              <span className="absolute bottom-1.5 left-5 right-5 h-[2px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* New Arrivals */}

            <Link
              href="/products?sort=new"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <FiStar
                size={15}
                strokeWidth={1.45}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              <span>New Arrivals</span>

              <span className="absolute bottom-1.5 left-5 right-5 h-[2px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              onClick={closeMenu}
              className={navLinkClass}
            >
              <FiHeart
                size={15}
                strokeWidth={1.45}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              <span>Wishlist</span>

              <span className="absolute bottom-1.5 left-5 right-5 h-[2px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Admin */}

            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <FiSettings
                  size={15}
                  strokeWidth={1.45}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />

                <span>Admin</span>

                <span className="absolute bottom-1.5 left-5 right-5 h-[2px] origin-left scale-x-0 rounded-full bg-[#56b7c9] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            )}
          </nav>

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="ml-auto flex items-center gap-1">

            {/* Search */}

            <Link
              href="/search"
              onClick={closeMenu}
              aria-label="Search products"
              className={iconButtonClass}
            >
              <FiSearch
                size={20}
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
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#30383c] text-[10px] font-semibold text-white transition-colors duration-300 group-hover:bg-[#56adbf]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <FiUser
                  size={20}
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
                size={20}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              {wishlist.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#56adbf] px-1 text-[7px] font-bold text-white">
                  {wishlist.length > 99
                    ? "99+"
                    : wishlist.length}
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
                size={20}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-y-px"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}

      <div
        className={`overflow-hidden bg-white transition-all duration-500 ease-in-out lg:hidden ${
          menuOpen
            ? "max-h-[720px] border-b border-[#e5eaeb]"
            : "max-h-0"
        }`}
      >
        <nav className="px-5 pb-7 pt-2">

          {/* Shop */}

          <Link
            href="/products"
            onClick={closeMenu}
            className="group flex items-center justify-between border-b border-[#e9edef] py-5 text-[25px] font-medium tracking-[-0.045em] text-[#30383c] transition-colors duration-300 hover:text-[#2794aa]"
          >
            <span className="flex items-center gap-3">
              <FiShoppingBag
                size={21}
                strokeWidth={1.35}
              />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Shop
              </span>
            </span>

            <FiArrowRight
              size={20}
              strokeWidth={1.3}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* New Arrivals */}

          <Link
            href="/products?sort=new"
            onClick={closeMenu}
            className="group flex items-center justify-between border-b border-[#e9edef] py-5 text-[25px] font-medium tracking-[-0.045em] text-[#30383c] transition-colors duration-300 hover:text-[#2794aa]"
          >
            <span className="flex items-center gap-3">
              <FiStar
                size={21}
                strokeWidth={1.35}
              />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                New Arrivals
              </span>
            </span>

            <FiArrowRight
              size={20}
              strokeWidth={1.3}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Wishlist */}

          <Link
            href="/wishlist"
            onClick={closeMenu}
            className="group flex items-center justify-between border-b border-[#e9edef] py-5 text-[25px] font-medium tracking-[-0.045em] text-[#30383c] transition-colors duration-300 hover:text-[#2794aa]"
          >
            <span className="flex items-center gap-3">
              <FiHeart
                size={21}
                strokeWidth={1.35}
              />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Wishlist
              </span>

              {wishlist.length > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#56adbf] px-1.5 text-[8px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </span>

            <FiArrowRight
              size={20}
              strokeWidth={1.3}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Admin */}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              onClick={closeMenu}
              className="group flex items-center justify-between border-b border-[#e9edef] py-5 text-[25px] font-medium tracking-[-0.045em] text-[#30383c] transition-colors duration-300 hover:text-[#2794aa]"
            >
              <span className="flex items-center gap-3">
                <FiSettings
                  size={21}
                  strokeWidth={1.35}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  Admin
                </span>
              </span>

              <FiArrowRight
                size={20}
                strokeWidth={1.3}
                className="transition-all duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}

          {/* User */}

          {user ? (
            <div className="flex items-center justify-between pt-7">
              <Link
                href="/profile"
                onClick={closeMenu}
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#30383c] text-[11px] font-semibold text-white transition-colors duration-300 group-hover:bg-[#56adbf]">
                  {user.name.charAt(0).toUpperCase()}
                </span>

                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4a5357]">
                    {user.name}
                  </span>

                  {user.role === "admin" && (
                    <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.15em] text-[#56adbf]">
                      Administrator
                    </span>
                  )}
                </div>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#8c989d] underline underline-offset-4 transition-colors duration-300 hover:text-[#2794aa]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={closeMenu}
              className="mt-7 flex h-13 items-center justify-center rounded-full bg-[#30383c] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#56adbf]"
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}