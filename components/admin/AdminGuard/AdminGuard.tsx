"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

type AdminGuardProps = {
  children: ReactNode;
};

const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAccess = () => {
      try {
        const currentUser = getCurrentUser();

        if (!currentUser) {
          router.replace(
            `/login?redirect=${encodeURIComponent(pathname)}`
          );
          return;
        }

        if (currentUser.role !== "admin") {
          router.replace("/");
          return;
        }

        if (isMounted) {
          setHasAccess(true);
          setIsChecking(false);
        }
      } catch (error) {
        console.error("Admin access check failed:", error);

        if (isMounted) {
          setHasAccess(false);
          setIsChecking(false);
        }

        router.replace(
          `/login?redirect=${encodeURIComponent(pathname)}`
        );
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (isChecking || !hasAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-5">
        <div className="w-full max-w-xs text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center border border-neutral-200 bg-white">
            <span className="block h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />
          </div>

          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            Checking Access
          </p>

          <p className="mt-2 text-xs leading-5 text-neutral-400">
            Please wait while we verify your account.
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;