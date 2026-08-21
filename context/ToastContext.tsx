"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  FiCheck,
  FiHeart,
  FiInfo,
  FiX,
} from "react-icons/fi";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
};

type ToastContextType = {
  showToast: (
    type: ToastType,
    title: string,
    message?: string
  ) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<
  ToastContextType | undefined
>(undefined);

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id)
    );
  }, []);

  const showToast = useCallback(
    (
      type: ToastType,
      title: string,
      message?: string
    ) => {
      const id = Date.now() + Math.random();

      setToasts((current) => [
        ...current.slice(-2),
        {
          id,
          type,
          title,
          message,
        },
      ]);

      window.setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        removeToast,
      }}
    >
      {children}

      <div
        className="pointer-events-none fixed bottom-5 left-1/2 z-[200] flex w-[calc(100%-32px)] max-w-[420px] -translate-x-1/2 flex-col gap-3 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[380px] sm:translate-x-0"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => {
          const config = {
            success: {
              icon: FiCheck,
              iconWrapper:
                "border-[#c9e5d2] bg-[#edf8f0] text-[#43845a]",
              title: "text-[#315b40]",
            },
            error: {
              icon: FiX,
              iconWrapper:
                "border-[#ead0d0] bg-[#fcf1f1] text-[#955555]",
              title: "text-[#704343]",
            },
            info: {
              icon: FiInfo,
              iconWrapper:
                "border-[#c8e2e7] bg-[#eef8fa] text-[#397d89]",
              title: "text-[#315f68]",
            },
          }[toast.type];

          const Icon = config.icon;

          return (
            <div
              key={toast.id}
              className="pointer-events-auto animate-[toastIn_0.3s_ease-out] overflow-hidden rounded-2xl border border-[#e2e5e3] bg-white p-4 shadow-[0_18px_50px_rgba(25,35,37,0.14)]"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${config.iconWrapper}`}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.7}
                  />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <p
                    className={`text-[12px] font-semibold ${config.title}`}
                  >
                    {toast.title}
                  </p>

                  {toast.message && (
                    <p className="mt-1 text-[10px] leading-5 text-[#7f898b]">
                      {toast.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  aria-label="Close notification"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#9aa2a4] transition-colors hover:bg-[#f4f6f5] hover:text-[#30383c]"
                >
                  <FiX
                    size={14}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider"
    );
  }

  return context;
}