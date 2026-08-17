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
    setIsLoading(true);

    const result = loginUser(
      formData.email,
      formData.password
    );

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <section className="mx-auto flex min-h-screen max-w-[1440px] items-center px-4 py-6 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid w-full overflow-hidden border border-[#DED2C4] bg-[#FFFDFC] shadow-[0_20px_60px_rgba(72,52,40,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Brand Panel */}
          <div className="relative hidden min-h-[680px] overflow-hidden bg-[#59463B] p-10 text-[#FFFDFC] lg:flex lg:flex-col lg:justify-between xl:p-14">
            {/* Decorative Shapes */}
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#E8DED0]/20" />

            <div className="absolute right-10 top-28 h-44 w-44 rounded-full bg-[#B86B4B]/20 blur-2xl" />

            <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-[#E8DED0]/15" />

            <div className="absolute bottom-24 right-24 h-32 w-32 rounded-full bg-[#9AA58C]/15 blur-2xl" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <span className="flex h-9 w-9 items-center justify-center bg-[#F7F3EC] text-sm font-semibold text-[#59463B]">
                  L
                </span>

                <span className="text-xl font-semibold tracking-[-0.03em]">
                  LUXORA
                </span>
              </Link>

              <div className="mt-28 max-w-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D9B49F]">
                  Welcome back
                </p>

                <h1 className="mt-5 text-4xl font-medium leading-[1.08] tracking-[-0.045em] text-[#FFFDFC] xl:text-5xl">
                  Your essentials,
                  <br />
                  all in one place.
                </h1>

                <p className="mt-7 max-w-sm text-sm leading-7 text-[#E8DED0]/75">
                  Sign in to your LUXORA account and
                  continue your shopping experience
                  exactly where you left off.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 border-t border-[#E8DED0]/15 pt-6 text-xs text-[#E8DED0]/65">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#E8DED0]/10 text-[#D9B49F]">
                <FiShield
                  size={15}
                  strokeWidth={1.4}
                />
              </span>

              Your account information stays on your
              device.
            </div>
          </div>

          {/* Login */}
          <div className="flex min-h-[680px] items-center px-5 py-10 sm:px-10 lg:px-14 xl:px-20">
            <div className="mx-auto w-full max-w-md">
              {/* Back */}
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[#918177] transition-colors hover:text-[#B86B4B]"
              >
                <FiArrowLeft
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                Back to store
              </Link>

              {/* Heading */}
              <div className="mt-12">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B86B4B]">
                  Account
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.045em] text-[#352B26] sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#766A61]">
                  Sign in to your account to continue
                  shopping.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mt-7 border border-[#E8B8A8] bg-[#FCF0EC] px-4 py-3 text-xs font-medium leading-5 text-[#A94F38]"
                >
                  {error}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-7"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium text-[#352B26]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <FiMail
                      size={16}
                      strokeWidth={1.5}
                      className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#B09F91]"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          email: event.target.value,
                        })
                      }
                      placeholder="you@example.com"
                      className="h-12 w-full border-b border-[#D8CCC0] bg-transparent pl-7 pr-0 text-sm text-[#352B26] outline-none transition-colors placeholder:text-[#B09F91] focus:border-[#B86B4B]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-[#352B26]"
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
                      className="text-[11px] font-medium text-[#A08F83] transition-colors hover:text-[#B86B4B]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <FiLock
                      size={16}
                      strokeWidth={1.5}
                      className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#B09F91]"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          password: event.target.value,
                        })
                      }
                      placeholder="Enter your password"
                      className="h-12 w-full border-b border-[#D8CCC0] bg-transparent pl-7 pr-10 text-sm text-[#352B26] outline-none transition-colors placeholder:text-[#B09F91] focus:border-[#B86B4B]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#B09F91] transition-colors hover:text-[#B86B4B]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff
                          size={16}
                          strokeWidth={1.5}
                        />
                      ) : (
                        <FiEye
                          size={16}
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
                  className="group flex h-12 w-full items-center justify-center gap-3 bg-[#B86B4B] px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-[#9F593D] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#B86B4B] focus:ring-offset-2"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in

                      <FiArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E3D9CF]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#A08F83]">
                  New to LUXORA?
                </span>

                <div className="h-px flex-1 bg-[#E3D9CF]" />
              </div>

              <Link
                href="/register"
                className="group flex h-12 w-full items-center justify-center gap-3 border border-[#CFC1B4] bg-[#FFFDFC] px-6 text-sm font-medium text-[#59463B] transition-all duration-300 hover:border-[#B86B4B] hover:bg-[#FCF6F0] hover:text-[#B86B4B]"
              >
                Create an account

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Footer Note */}
              <p className="mt-7 text-center text-[11px] leading-5 text-[#A99B90]">
                By continuing, you agree to the LUXORA
                terms and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}