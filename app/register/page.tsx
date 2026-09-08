"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";

import { registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all required fields.");
      return;
    }

    if (name.length < 2) {
      setError("Please enter a valid name.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const result = registerUser(name, email, password);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    setSuccess(
      "Account created successfully. Redirecting to login..."
    );

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f8f6] text-[#252c30]">
      {/* Decorative Background */}

      <div className="pointer-events-none fixed -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#dff4f5]/70 blur-3xl" />

      <div className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#eee6d8]/60 blur-3xl" />

      <div className="pointer-events-none fixed right-[20%] top-[28%] h-24 w-24 rounded-full border border-[#d7e9e8]" />

      <section className="relative mx-auto flex min-h-screen max-w-[1440px] items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
        <div className="w-full max-w-[560px]">
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
            {/* Accent */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#eee6d8] via-[#aee1e5] to-[#dff4f5]" />

            <div className="px-6 py-9 sm:px-10 sm:py-11">
              {/* Header */}

              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#56b7c9]" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#718086]">
                    Create account
                  </p>
                </div>

                <h1 className="mt-4 text-3xl font-medium tracking-[-0.06em] text-[#252c30] sm:text-4xl">
                  Make it yours.
                </h1>

                <p className="mt-3 max-w-md text-[13px] leading-6 text-[#7b898d]">
                  Create your LUXORA account for faster checkout,
                  easier order tracking, and a more personal shopping
                  experience.
                </p>
              </div>

              {/* Benefits */}

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Faster checkout",
                  "Order tracking",
                  "Personal experience",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e1e7e4] bg-[#fafbf9] px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#718086]"
                  >
                    <FiCheck
                      size={11}
                      className="text-[#56aebe]"
                    />

                    {item}
                  </span>
                ))}
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

              {/* Success */}

              {success && (
                <div
                  role="status"
                  className="mt-7 rounded-2xl border border-[#c4e3e5] bg-[#f1fbfc] px-4 py-3 text-xs leading-5 text-[#42727b]"
                >
                  {success}
                </div>
              )}

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526166]"
                  >
                    Full Name
                  </label>

                  <div className="group relative">
                    <FiUser
                      size={16}
                      strokeWidth={1.4}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa6a9] transition-colors group-focus-within:text-[#56aebe]"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder="Your full name"
                      className="h-13 w-full rounded-2xl border border-[#e0e4e1] bg-[#fafbf9] pl-11 pr-4 text-sm text-[#252c30] outline-none transition-all placeholder:text-[#a7b0b2] hover:border-[#cdd8d7] focus:border-[#8bcbd3] focus:bg-white focus:ring-4 focus:ring-[#dff4f5]"
                    />
                  </div>
                </div>

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
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526166]"
                  >
                    Password
                  </label>

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
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="At least 6 characters"
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

                {/* Confirm Password */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526166]"
                  >
                    Confirm Password
                  </label>

                  <div className="group relative">
                    <FiLock
                      size={16}
                      strokeWidth={1.4}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa6a9] transition-colors group-focus-within:text-[#56aebe]"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          confirmPassword: event.target.value,
                        }))
                      }
                      placeholder="Repeat your password"
                      className="h-13 w-full rounded-2xl border border-[#e0e4e1] bg-[#fafbf9] pl-11 pr-12 text-sm text-[#252c30] outline-none transition-all placeholder:text-[#a7b0b2] hover:border-[#cdd8d7] focus:border-[#8bcbd3] focus:bg-white focus:ring-4 focus:ring-[#dff4f5]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98a4a7] transition-colors hover:text-[#2794aa]"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
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
                  className="group mt-1 flex h-13 w-full items-center justify-center gap-3 rounded-2xl bg-[#30383c] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(48,56,60,0.13)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2794aa] hover:shadow-[0_16px_35px_rgba(39,148,170,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dff4f5] text-[#30383c] transition-transform duration-300 group-hover:translate-x-1">
                        <FiArrowRight size={14} />
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Login */}

              <div className="mt-8 border-t border-[#e7e9e5] pt-7 text-center">
                <p className="text-sm text-[#7b898d]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#527b83] underline decoration-[#aee8f2] decoration-2 underline-offset-4 transition-colors hover:text-[#2794aa]"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Terms */}

              <p className="mt-6 text-center text-[10px] leading-5 text-[#9aa4a6]">
                By creating an account, you agree to the LUXORA
                terms and privacy policy.
              </p>
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