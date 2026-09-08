"use client";

import { ReactNode, useState } from "react";

import AdminGuard from "@/components/admin/AdminGuard/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f5f7fb]">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-0 h-screen">
              <AdminSidebar />
            </div>
          </aside>

          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                aria-label="Close admin menu"
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
              />

              <aside className="relative z-10 h-full w-[280px] max-w-[85vw] shadow-2xl">
                <AdminSidebar
                  onNavigate={() => setIsSidebarOpen(false)}
                />
              </aside>
            </div>
          )}

          {/* Main */}
          <div className="min-w-0 flex-1">
            <AdminHeader
              onMenuClick={() => setIsSidebarOpen(true)}
            />

            <div className="min-h-[calc(100vh-64px)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}