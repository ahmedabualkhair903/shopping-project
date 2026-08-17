"use client";

import {
  FiBox,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

type AdminStat = {
  title: string;
  value: string;
  description?: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

type AdminStatsProps = {
  stats: AdminStat[];
};

const AdminStats = ({ stats }: AdminStatsProps) => {
  return (
    <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group bg-white p-5 transition-colors duration-200 hover:bg-neutral-50 sm:p-6"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center border border-neutral-200 bg-neutral-50 transition-colors duration-200 group-hover:border-neutral-300 group-hover:bg-white">
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className="text-neutral-500 transition-colors duration-200 group-hover:text-neutral-950"
                />
              </div>

              <span className="mt-1 h-px w-5 bg-neutral-200 transition-all duration-300 group-hover:w-8 group-hover:bg-neutral-400" />
            </div>

            {/* Content */}
            <div className="mt-7">
              <p className="text-[9px] font-medium uppercase tracking-[0.17em] text-neutral-400">
                {stat.title}
              </p>

              <p className="mt-3 text-[28px] font-medium tracking-[-0.045em] text-neutral-950 sm:text-3xl">
                {stat.value}
              </p>

              {stat.description && (
                <p className="mt-2 max-w-[220px] text-[11px] leading-5 text-neutral-400">
                  {stat.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStats;

export {
  FiBox,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
};