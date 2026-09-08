
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiArrowRight,
  FiMenu,
} from "react-icons/fi";

type AdminHeaderProps = {
  onMenuClick?: () => void;
};

const pageInfo: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "/admin": {
    title: "Dashboard",
    description:
      "Overview of your store performance and activity.",
  },
  "/admin/products": {
    title: "Products",
    description:
      "Manage the products available in your store.",
  },
  "/admin/orders": {
    title: "Orders",
    description:
      "View and manage customer orders.",
  },
  "/admin/customers": {
    title: "Customers",
    description:
      "View customer information and shopping activity.",
  },
};

const AdminHeader = ({
  onMenuClick,
}: AdminHeaderProps) => {
  const pathname = usePathname();

  const current =
    pageInfo[pathname] ?? pageInfo["/admin"];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E6E5E0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:min-h-[76px] sm:px-6 lg:px-8 xl:px-10">
        {/* =====================================================
            Left
        ====================================================== */}

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {/* Mobile Menu */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open admin menu"
            className="group relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E2E4DE] bg-white text-[#68705A] shadow-[0_3px_12px_rgba(38,37,33,0.04)] transition-all duration-300 hover:border-[#68705A] hover:bg-[#68705A] hover:text-white hover:shadow-[0_6px_18px_rgba(104,112,90,0.16)] active:scale-95 lg:hidden"
          >
            {/* Decorative background */}

            <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-[#EEF1E9] transition-all duration-300 group-hover:scale-[2] group-hover:bg-white/10" />

            <FiMenu
              size={20}
              strokeWidth={1.6}
              className="relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Page Info */}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="hidden h-px w-5 bg-[#68705A] sm:block" />

              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.2em] text-[#96938C]">
                LUXORA Admin
              </p>
            </div>

            <h1 className="mt-1 text-lg font-medium tracking-[-0.035em] text-[#262521] sm:text-xl lg:text-[22px]">
              {current.title}
            </h1>

            <p className="mt-1 hidden max-w-lg text-xs leading-5 text-[#85827B] md:block">
              {current.description}
            </p>
          </div>
        </div>

        {/* =====================================================
            Right
        ====================================================== */}

        <div className="flex shrink-0 items-center gap-3">
          {/* Store Link */}

          <Link
            href="/"
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-[#E3E1DC] bg-[#FAFAF8] px-3.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#77756F] transition-all duration-300 hover:border-[#D8C9C0] hover:bg-[#FCF7F4] hover:text-[#A96852] sm:px-4"
          >
            <span className="hidden xs:inline">
              View Store
            </span>

            <span className="xs:hidden">
              Store
            </span>

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-[#F3E4DE]">
              <FiArrowRight
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

