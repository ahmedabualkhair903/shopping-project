"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";

import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    const result = loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f8f6] text-[#252c30]">
      {/* Decorative Background */}

      <div className="pointer-events-none fixed -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#dff4f5]/70 blur-3xl" />

      <div className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#eee6d8]/60 blur-3xl" />

      <div className="pointer-events-none fixed right-[20%] top-[28%] h-24 w-24 rounded-full border border-[#d7e9e8]" />

      <section className="relative mx-auto flex min-h-screen max-w-[1440px] items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
        <div className="w-full max-w-[520px]">
          {/* Top */}

          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7b898d] transition-colors hover:text-[#252c30]"
            >
              <FiArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to store
            </Link>

            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#30383c] text-[10px] font-bold text-white">
                L
              </span>

              <span className="text-sm font-semibold tracking-[0.2em] text-[#30383c]">
                LUXORA
              </span>
            </Link>
          </div>

          {/* Card */}

          <div className="relative overflow-hidden rounded-[28px] border border-[#e2e4df] bg-white shadow-[0_25px_80px_rgba(37,44,48,0.07)]">
            {/* Card Accent */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#dff4f5] via-[#aee1e5] to-[#eee6d8]" />

            <div className="px-6 py-9 sm:px-10 sm:py-11">
              {/* Header */}

              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#56b7c9]" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#718086]">
                    Your account
                  </p>
                </div>

                <h1 className="mt-4 text-3xl font-medium tracking-[-0.06em] text-[#252c30] sm:text-4xl">
                  Welcome back.
                </h1>

                <p className="mt-3 max-w-sm text-[13px] leading-6 text-[#7b898d]">
                  Sign in to continue your LUXORA shopping experience.
                </p>
              </div>

              {/* Error */}

              {error && (
                <div
                  role="alert"
                  className="mt-7 rounded-2xl border border-[#f0d2cc] bg-[#fff7f5] px-4 py-3 text-xs leading-5 text-[#a95147]"
                >
                  {error}
                </div>
              )}

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526166]"
                  >
                    Email Address
                  </label>

                  <div className="group relative">
                    <FiMail
                      size={16}
                      strokeWidth={1.4}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa6a9] transition-colors group-focus-within:text-[#56aebe]"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      className="h-13 w-full rounded-2xl border border-[#e0e4e1] bg-[#fafbf9] pl-11 pr-4 text-sm text-[#252c30] outline-none transition-all placeholder:text-[#a7b0b2] hover:border-[#cdd8d7] focus:border-[#8bcbd3] focus:bg-white focus:ring-4 focus:ring-[#dff4f5]"
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526166]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setError(
                          "Password reset will be available in a future update."
                        )
                      }
                      className="text-[10px] font-medium text-[#899598] transition-colors hover:text-[#2794aa]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="group relative">
                    <FiLock
                      size={16}
                      strokeWidth={1.4}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa6a9] transition-colors group-focus-within:text-[#56aebe]"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Enter your password"
                      className="h-13 w-full rounded-2xl border border-[#e0e4e1] bg-[#fafbf9] pl-11 pr-12 text-sm text-[#252c30] outline-none transition-all placeholder:text-[#a7b0b2] hover:border-[#cdd8d7] focus:border-[#8bcbd3] focus:bg-white focus:ring-4 focus:ring-[#dff4f5]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98a4a7] transition-colors hover:text-[#2794aa]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff size={17} />
                      ) : (
                        <FiEye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-13 w-full items-center justify-center gap-3 rounded-2xl bg-[#30383c] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(48,56,60,0.13)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2794aa] hover:shadow-[0_16px_35px_rgba(39,148,170,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dff4f5] text-[#30383c] transition-transform duration-300 group-hover:translate-x-1">
                        <FiArrowRight size={14} />
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e7e9e5]" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#a0aaac]">
                  New to LUXORA?
                </span>

                <div className="h-px flex-1 bg-[#e7e9e5]" />
              </div>

              {/* Register */}

              <Link
                href="/register"
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#d9e1df] bg-[#fbfcfa] text-sm font-semibold text-[#526166] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a8dce3] hover:bg-[#effafb] hover:text-[#2794aa]"
              >
                Create an account

                <FiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Security */}

              <div className="mt-7 flex items-center justify-center gap-2 text-[10px] text-[#9aa4a6]">
                <FiShield size={13} />

                <span>
                  Your account information stays on your device.
                </span>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <p className="mt-6 text-center text-[8px] font-medium uppercase tracking-[0.22em] text-[#a0a8aa]">
            LUXORA essentials
          </p>
        </div>
      </section>
    </main>
  );
}