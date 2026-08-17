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
    <main className="min-h-screen bg-[#F7F3EC]">
      <section className="mx-auto flex min-h-screen max-w-[1440px] items-center px-4 py-6 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid w-full overflow-hidden border border-[#DED2C4] bg-[#FFFDFC] shadow-[0_20px_60px_rgba(72,52,40,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Brand Panel */}
          <div className="relative hidden min-h-[720px] overflow-hidden bg-[#59463B] p-10 text-[#FFFDFC] lg:flex lg:flex-col lg:justify-between xl:p-14">
            {/* Decorative shapes */}
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#D9B49F]/20" />
            <div className="absolute -right-12 top-24 h-40 w-40 rounded-full bg-[#B86B4B]/20 blur-2xl" />
            <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-[#D9B49F]/15" />
            <div className="absolute bottom-24 right-20 h-32 w-32 rounded-full bg-[#9AA58C]/15 blur-2xl" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-3 text-lg font-semibold tracking-[0.18em]"
              >
                <span className="flex h-10 w-10 items-center justify-center border border-[#E8DED0]/30 bg-[#E8DED0]/10 text-sm font-semibold tracking-normal">
                  L
                </span>

                LUXORA
              </Link>

              <div className="mt-32 max-w-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D9B49F]">
                  Join LUXORA
                </p>

                <h1 className="mt-5 text-4xl font-medium leading-[1.08] tracking-[-0.045em] xl:text-5xl">
                  A better way to shop starts here.
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-7 text-[#E8DED0]/70">
                  Create your account and keep everything
                  you need in one simple place.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              {[
                "Faster checkout",
                "Easy order tracking",
                "Personalized shopping experience",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#F2E8DE]"
                >
                  <span className="flex h-7 w-7 items-center justify-center border border-[#E8DED0]/20 bg-[#E8DED0]/5">
                    <FiCheck
                      size={13}
                      strokeWidth={1.7}
                      className="text-[#D9B49F]"
                    />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="flex items-center px-4 py-8 sm:px-10 sm:py-12 lg:px-14 xl:px-20">
            <div className="mx-auto w-full max-w-md">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[#918177] transition-colors hover:text-[#B86B4B]"
              >
                <FiArrowLeft
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                Back to store
              </Link>

              <div className="mt-10">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B86B4B]">
                  Create account
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#352B26] sm:text-4xl">
                  Welcome to LUXORA
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#766A61]">
                  Create an account to make your shopping
                  experience easier.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-7 border border-[#E8B8A8] bg-[#FCF0EC] px-4 py-3 text-xs font-medium leading-5 text-[#A94F38]"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="mt-7 border border-[#C5D0BD] bg-[#F0F3EC] px-4 py-3 text-xs font-medium leading-5 text-[#637356]"
                >
                  {success}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium text-[#352B26]"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <FiUser
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-[#B09F91]"
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
                      className="h-12 w-full border-b border-[#D8CCC0] bg-transparent pl-7 pr-0 text-sm text-[#352B26] outline-none transition-colors placeholder:text-[#B09F91] focus:border-[#B86B4B]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium text-[#352B26]"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-[#B09F91]"
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
                      className="h-12 w-full border-b border-[#D8CCC0] bg-transparent pl-7 pr-0 text-sm text-[#352B26] outline-none transition-colors placeholder:text-[#B09F91] focus:border-[#B86B4B]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-medium text-[#352B26]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <FiLock
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-[#B09F91]"
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
                      className="h-12 w-full border-b border-[#D8CCC0] bg-transparent pl-7 pr-10 text-sm text-[#352B26] outline-none transition-colors placeholder:text-[#B09F91] focus:border-[#B86B4B]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#B09F91] transition-colors hover:text-[#B86B4B]"
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
                    className="mb-2 block text-xs font-medium text-[#352B26]"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <FiLock
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-[#B09F91]"
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
                          confirmPassword:
                            event.target.value,
                        }))
                      }
                      placeholder="Repeat your password"
                      className="h-12 w-full border-b border-[#D8CCC0] bg-transparent pl-7 pr-10 text-sm text-[#352B26] outline-none transition-colors placeholder:text-[#B09F91] focus:border-[#B86B4B]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value
                        )
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#B09F91] transition-colors hover:text-[#B86B4B]"
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
                  className="group flex h-12 w-full items-center justify-center gap-3 bg-[#B86B4B] px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-[#9F593D] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#B86B4B] focus:ring-offset-2"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account

                      <FiArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-[#E3D9CF] pt-7 text-center">
                <p className="text-sm text-[#766A61]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-[#8F4F38] underline underline-offset-4 transition-colors hover:text-[#B86B4B]"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <p className="mt-6 text-center text-[11px] leading-5 text-[#A99B90]">
                By creating an account, you agree to the
                LUXORA terms and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}