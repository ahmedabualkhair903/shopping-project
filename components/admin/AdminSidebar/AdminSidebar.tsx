
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiArrowRight,
  FiBox,
  FiHome,
  FiLogOut,
  FiShoppingBag,
  FiUsers,
  FiX,
} from "react-icons/fi";

type AdminSidebarProps = {
  onNavigate?: () => void;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: FiHome,
    iconBg: "bg-[#E9EEE3]",
    iconColor: "text-[#68705A]",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: FiBox,
    iconBg: "bg-[#F2ECE7]",
    iconColor: "text-[#8A6958]",
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: FiShoppingBag,
    iconBg: "bg-[#F3E4DE]",
    iconColor: "text-[#A96852]",
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: FiUsers,
    iconBg: "bg-[#EDEBE6]",
    iconColor: "text-[#716E66]",
  },
];

const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-[#E6E5E0] bg-white">
      {/* =====================================================
          Brand
      ====================================================== */}

      <div className="border-b border-[#E6E5E0] px-5 py-6 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <Link
            href="/admin"
            onClick={onNavigate}
            className="group block min-w-0"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#A96852] transition-transform duration-300 group-hover:scale-125" />

              <p className="text-[22px] font-semibold tracking-[-0.055em] text-[#262521] transition-colors duration-300 group-hover:text-[#68705A]">
                LUXORA
              </p>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-px w-5 bg-[#68705A]" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close admin menu"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-[#96938C] transition-all duration-200 hover:border-[#E4E2DC] hover:bg-[#F8F8F5] hover:text-[#262521] lg:hidden"
          >
            <FiX
              size={17}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* =====================================================
          Navigation
      ====================================================== */}

      <nav className="flex-1 overflow-y-auto px-4 py-7">
        <div className="flex items-center gap-2 px-3">
          <span className="h-px w-4 bg-[#CDD2C6]" />

          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#96938C]">
            Management
          </p>
        </div>

        <div className="mt-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group relative flex min-h-[52px] items-center justify-between overflow-hidden rounded-xl px-3 transition-all duration-300 ${
                  isActive
                    ? "bg-[#68705A] text-white shadow-[0_8px_24px_rgba(104,112,90,0.18)]"
                    : "text-[#77756F] hover:bg-[#F7F8F5] hover:text-[#262521]"
                }`}
              >
                {/* Active Accent */}

                {isActive && (
                  <span className="absolute left-0 top-2.5 h-7 w-[3px] rounded-r-full bg-[#D9DED2]" />
                )}

                <span className="flex items-center gap-3">
                  {/* Icon Container */}

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white ring-1 ring-white/10"
                        : `${item.iconBg} ${item.iconColor} group-hover:scale-[1.04] group-hover:shadow-sm`
                    }`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.45}
                    />
                  </span>

                  <span className="text-xs font-medium tracking-[-0.01em]">
                    {item.label}
                  </span>
                </span>

                {/* Arrow */}

                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-[#B0ADA6] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  <FiArrowRight
                    size={14}
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* =====================================================
          Bottom
      ====================================================== */}

      <div className="border-t border-[#E6E5E0] p-4">
        <div className="mb-3 flex items-center gap-2 px-3">
          <span className="h-px w-3 bg-[#D8D6D0]" />

          <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#AAA7A0]">
            Store
          </p>
        </div>

        <Link
          href="/"
          onClick={onNavigate}
          className="group flex min-h-[52px] items-center gap-3 rounded-xl px-3 text-[#77756F] transition-all duration-300 hover:bg-[#FCF7F4] hover:text-[#A96852]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F3F0] text-[#8A7D73] transition-all duration-300 group-hover:bg-[#F3E4DE] group-hover:text-[#A96852]">
            <FiLogOut
              size={18}
              strokeWidth={1.45}
            />
          </span>

          <span className="text-xs font-medium">
            Back to Store
          </span>

          <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-[#B0ADA6] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:bg-[#F3E4DE] group-hover:text-[#A96852] group-hover:opacity-100">
            <FiArrowRight
              size={14}
              strokeWidth={1.5}
            />
          </span>
        </Link>

        {/* Brand Accent */}

        <div className="mt-4 flex h-1 overflow-hidden rounded-full">
          <div className="w-1/2 bg-[#68705A]" />
          <div className="w-1/4 bg-[#A96852]" />
          <div className="w-1/4 bg-[#D9DED2]" />
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;

