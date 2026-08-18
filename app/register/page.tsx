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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    setSuccess("Account created successfully. Redirecting to login...");

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
    <main className="min-h-screen bg-[#f5f8f9]">
      <section className="mx-auto flex min-h-screen max-w-[1440px] items-center px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="grid w-full overflow-hidden rounded-[4px] border border-[#dce5e7] bg-white shadow-[0_25px_80px_rgba(38,54,59,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Brand Panel */}
          <div className="relative hidden min-h-[720px] overflow-hidden bg-[#26363b] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
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
                    Join LUXORA
                  </p>
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] xl:text-5xl">
                  Your style.
                  <br />
                  Your space.
                  <br />
                  <span className="text-[#aee8f2]">Your LUXORA.</span>
                </h1>

                <p className="mt-7 max-w-sm text-sm leading-7 text-white/60">
                  Create your account and enjoy a simpler, more personal
                  shopping experience built around what you love.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="relative z-10 space-y-4">
              {[
                "Faster checkout",
                "Easy order tracking",
                "Personalized shopping experience",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#aee8f2]/25 bg-[#aee8f2]/10">
                    <FiCheck
                      size={13}
                      strokeWidth={1.8}
                      className="text-[#aee8f2]"
                    />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="flex items-center px-5 py-10 sm:px-10 sm:py-12 lg:px-14 xl:px-20">
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
                  Create account
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#26363b] sm:text-4xl">
                  Welcome to LUXORA
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#78878c]">
                  Create your account and make every shopping experience
                  easier.
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

              {/* Success */}
              {success && (
                <div
                  role="status"
                  className="mt-7 rounded-[3px] border border-[#b9dfe5] bg-[#effafd] px-4 py-3 text-xs font-medium leading-5 text-[#42727b]"
                >
                  {success}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-semibold text-[#34454a]"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <FiUser
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9ba0]"
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
                      className="h-12 w-full rounded-[3px] border border-[#dce5e7] bg-[#f9fbfb] pl-11 pr-4 text-sm text-[#26363b] outline-none transition-all placeholder:text-[#9aa8ac] hover:border-[#c8d5d8] focus:border-[#86cbd6] focus:bg-white focus:ring-4 focus:ring-[#aee8f2]/20"
                    />
                  </div>
                </div>

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
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9ba0]"
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
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-semibold text-[#34454a]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <FiLock
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9ba0]"
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
                    className="mb-2 block text-xs font-semibold text-[#34454a]"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <FiLock
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9ba0]"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
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
                      className="h-12 w-full rounded-[3px] border border-[#dce5e7] bg-[#f9fbfb] pl-11 pr-11 text-sm text-[#26363b] outline-none transition-all placeholder:text-[#9aa8ac] hover:border-[#c8d5d8] focus:border-[#86cbd6] focus:bg-white focus:ring-4 focus:ring-[#aee8f2]/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b9ba0] transition-colors hover:text-[#527b83]"
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
                  className="group mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-[3px] bg-[#26363b] px-6 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(38,54,59,0.12)] transition-all duration-300 hover:bg-[#334a50] hover:shadow-[0_14px_30px_rgba(38,54,59,0.16)] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-[#aee8f2]/40"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#aee8f2] text-[#26363b] transition-transform duration-300 group-hover:translate-x-1">
                        <FiArrowRight size={14} />
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Login */}
              <div className="mt-8 border-t border-[#e3eaec] pt-7 text-center">
                <p className="text-sm text-[#78878c]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#527b83] underline decoration-[#aee8f2] decoration-2 underline-offset-4 transition-colors hover:text-[#26363b]"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <p className="mt-6 text-center text-[11px] leading-5 text-[#9aa8ac]">
                By creating an account, you agree to the LUXORA terms and
                privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}