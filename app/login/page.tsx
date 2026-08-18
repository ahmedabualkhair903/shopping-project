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
    <main className="min-h-screen bg-[#f5f8f9]">
      <section className="mx-auto flex min-h-screen max-w-[1440px] items-center px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="grid w-full overflow-hidden rounded-[4px] border border-[#dce5e7] bg-white shadow-[0_25px_80px_rgba(38,54,59,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Brand Panel */}
          <div className="relative hidden min-h-[680px] overflow-hidden bg-[#26363b] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            {/* Decorative Shapes */}
            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#aee8f2]/15" />

            <div className="absolute right-10 top-28 h-48 w-48 rounded-full bg-[#aee8f2]/10 blur-3xl" />

            <div className="absolute -bottom-44 -left-32 h-96 w-96 rounded-full border border-[#aee8f2]/10" />

            <div className="absolute bottom-20 right-20 h-36 w-36 rounded-full bg-[#aee8f2]/10 blur-3xl" />

            <div className="relative z-10">
              {/* Logo */}
              <Link
                href="/"
                className="inline-flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-[#aee8f2] text-sm font-bold text-[#26363b]">
                  L
                </span>

                <span className="text-xl font-semibold tracking-[0.16em]">
                  LUXORA
                </span>
              </Link>

              {/* Intro */}
              <div className="mt-32 max-w-md">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#aee8f2]" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#aee8f2]">
                    Welcome back
                  </p>
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] xl:text-5xl">
                  Everything you love,
                  <br />
                  <span className="text-[#aee8f2]">in one place.</span>
                </h1>

                <p className="mt-7 max-w-sm text-sm leading-7 text-white/60">
                  Sign in to your LUXORA account and continue your shopping
                  experience exactly where you left off.
                </p>
              </div>
            </div>

            {/* Security Note */}
            <div className="relative z-10 flex items-center gap-3 border-t border-white/10 pt-6 text-xs text-white/55">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#aee8f2]/10">
                <FiShield
                  size={15}
                  strokeWidth={1.4}
                  className="text-[#aee8f2]"
                />
              </span>

              Your account information stays on your device.
            </div>
          </div>

          {/* Login */}
          <div className="flex min-h-[680px] items-center px-5 py-10 sm:px-10 lg:px-14 xl:px-20">
            <div className="mx-auto w-full max-w-md">
              {/* Back */}
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#78878c] transition-colors hover:text-[#26363b]"
              >
                <FiArrowLeft
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                Back to store
              </Link>

              {/* Heading */}
              <div className="mt-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6c9da6]">
                  Your account
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#26363b] sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#78878c]">
                  Sign in to your account and continue shopping.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mt-7 rounded-[3px] border border-[#f0c9c3] bg-[#fff5f3] px-4 py-3 text-xs font-medium leading-5 text-[#a95147]"
                >
                  {error}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-[#34454a]"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail
                      size={16}
                      strokeWidth={1.5}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9ba0]"
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
                      className="h-12 w-full rounded-[3px] border border-[#dce5e7] bg-[#f9fbfb] pl-11 pr-4 text-sm text-[#26363b] outline-none transition-all placeholder:text-[#9aa8ac] hover:border-[#c8d5d8] focus:border-[#86cbd6] focus:bg-white focus:ring-4 focus:ring-[#aee8f2]/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold text-[#34454a]"
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
                      className="text-[11px] font-medium text-[#829297] transition-colors hover:text-[#527b83]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <FiLock
                      size={16}
                      strokeWidth={1.5}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9ba0]"
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
                      className="h-12 w-full rounded-[3px] border border-[#dce5e7] bg-[#f9fbfb] pl-11 pr-11 text-sm text-[#26363b] outline-none transition-all placeholder:text-[#9aa8ac] hover:border-[#c8d5d8] focus:border-[#86cbd6] focus:bg-white focus:ring-4 focus:ring-[#aee8f2]/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b9ba0] transition-colors hover:text-[#527b83]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff
                          size={17}
                          strokeWidth={1.5}
                        />
                      ) : (
                        <FiEye
                          size={17}
                          strokeWidth={1.5}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-12 w-full items-center justify-center gap-3 rounded-[3px] bg-[#26363b] px-6 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(38,54,59,0.12)] transition-all duration-300 hover:bg-[#334a50] hover:shadow-[0_14px_30px_rgba(38,54,59,0.16)] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-[#aee8f2]/40"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#aee8f2] text-[#26363b] transition-transform duration-300 group-hover:translate-x-1">
                        <FiArrowRight size={14} />
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e3eaec]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#94a2a6]">
                  New to LUXORA?
                </span>

                <div className="h-px flex-1 bg-[#e3eaec]" />
              </div>

              <Link
                href="/register"
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-[3px] border border-[#ccdadd] bg-white px-6 text-sm font-semibold text-[#34454a] transition-all duration-300 hover:border-[#86cbd6] hover:bg-[#f5fcfd] hover:text-[#527b83]"
              >
                Create an account

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Footer Note */}
              <p className="mt-7 text-center text-[11px] leading-5 text-[#9aa8ac]">
                By continuing, you agree to the LUXORA terms and privacy
                policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}