"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/order";
import type { PaymentMethod } from "@/types/order";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 7.99;

const inputClassName =
  "h-12 w-full rounded-xl border border-[#e2e6e5] bg-[#fafbfb] px-4 text-sm text-[#252c30] outline-none transition-all duration-200 placeholder:text-[#a2abad] focus:border-[#6bb8c5] focus:bg-white focus:ring-4 focus:ring-[#eaf7f8]";

const CheckoutPage = () => {
  const {
    items,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("card");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const shipping =
    totalPrice >= FREE_SHIPPING_THRESHOLD ||
    totalPrice === 0
      ? 0
      : SHIPPING_COST;

  const total = totalPrice + shipping;

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const firstName = String(
      formData.get("firstName") ?? ""
    ).trim();

    const lastName = String(
      formData.get("lastName") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).trim();

    const address = String(
      formData.get("address") ?? ""
    ).trim();

    const city = String(
      formData.get("city") ?? ""
    ).trim();

    const country = String(
      formData.get("country") ?? ""
    ).trim();

    const postalCode = String(
      formData.get("postalCode") ?? ""
    ).trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !country
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (paymentMethod === "card") {
      const cardNumber = String(
        formData.get("cardNumber") ?? ""
      )
        .replace(/\s/g, "")
        .trim();

      const expiry = String(
        formData.get("expiry") ?? ""
      ).trim();

      const cvv = String(
        formData.get("cvv") ?? ""
      ).trim();

      if (!cardNumber || !expiry || !cvv) {
        setError(
          "Please complete your card information."
        );
        return;
      }

      if (
        cardNumber.length < 13 ||
        cardNumber.length > 19
      ) {
        setError(
          "Please enter a valid card number."
        );
        return;
      }

      if (!/^\d+$/.test(cardNumber)) {
        setError(
          "Card number can only contain numbers."
        );
        return;
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setError(
          "Please enter the expiry date in MM/YY format."
        );
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        setError(
          "Please enter a valid CVV."
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const orderId = `ORD-${Date.now()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      createOrder({
        id: orderId,

        customer: {
          firstName,
          lastName,
          email,
          phone,
        },

        shippingAddress: {
          address,
          city,
          country,
          postalCode,
        },

        items: items.map((item) => ({
          ...item,
          quantity: item.quantity,
        })),

        subtotal: totalPrice,
        shipping,
        total,

        paymentMethod,

        status: "processing",

        createdAt: new Date().toISOString(),
      });

      clearCart();

      window.location.href =
        `/order-success?orderId=${encodeURIComponent(
          orderId
        )}`;
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      setError(
        "Something went wrong while placing your order. Please try again."
      );

      setIsSubmitting(false);
    }
  };

  /* =========================================================
     Empty Cart
  ========================================================= */

  if (items.length === 0) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#f7f9f8]">
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="w-full max-w-lg rounded-[28px] border border-[#e2e7e5] bg-white px-6 py-14 text-center shadow-[0_20px_60px_rgba(30,40,40,0.05)] sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] bg-[#edf8f9] text-[#4b9dac]">
              <FiShoppingBag
                size={30}
                strokeWidth={1.2}
              />
            </div>

            <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#819093]">
              LUXORA / Checkout
            </p>

            <h1 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-[#252c30] sm:text-4xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#7f8b8e]">
              There&apos;s nothing to checkout yet.
              Explore our collection and find
              something you love.
            </p>

            <Link
              href="/products"
              className="group mx-auto mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-[#252c30] px-7 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#397d89]"
            >
              <FiArrowLeft
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Continue shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9f8] text-[#252c30]">
      {/* =========================================================
          Header
      ========================================================= */}

      <section className="border-b border-[#e3e8e6] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <Link
            href="/cart"
            className="group inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#859194] transition-colors duration-200 hover:text-[#2794aa]"
          >
            <FiArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to cart
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#56adbf]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#7e8c8f]">
                  LUXORA / Secure Checkout
                </p>
              </div>

              <h1 className="mt-4 text-[36px] font-medium leading-[1.05] tracking-[-0.055em] text-[#252c30] sm:text-[46px]">
                Complete your order.
              </h1>

              <p className="mt-3 max-w-xl text-[12px] leading-6 text-[#7c898d] sm:text-[13px]">
                Enter your details below and
                complete your purchase securely.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[#dfe6e4] bg-[#fafcfc] px-4 py-2.5">
              <FiLock
                size={13}
                className="text-[#4d9aa9]"
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#6d7b7e]">
                Secure checkout
              </span>
            </div>
          </div>

          {/* Steps */}

          <div className="mt-9 flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#252c30] text-[9px] font-semibold text-white">
                1
              </span>

              <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#252c30]">
                Details
              </span>
            </div>

            <span className="h-px w-8 bg-[#dce3e1] sm:w-16" />

            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d5ddda] bg-white text-[9px] font-semibold text-[#7d898c]">
                2
              </span>

              <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#7d898c]">
                Payment
              </span>
            </div>

            <span className="h-px w-8 bg-[#dce3e1] sm:w-16" />

            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d5ddda] bg-white text-[9px] font-semibold text-[#7d898c]">
                3
              </span>

              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.1em] text-[#7d898c] sm:block">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Content
      ========================================================= */}

      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-14"
        >
          {/* =====================================================
              LEFT
          ===================================================== */}

          <div className="min-w-0 space-y-5">
            {/* Contact */}

            <section className="overflow-hidden rounded-[24px] border border-[#e1e7e5] bg-white shadow-[0_10px_35px_rgba(30,40,40,0.035)]">
              <div className="border-b border-[#e8eceb] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#edf8f9] text-[#3f94a3]">
                    <FiCreditCard
                      size={17}
                      strokeWidth={1.4}
                    />
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8b9799]">
                      Step 01
                    </p>

                    <h2 className="mt-1 text-[15px] font-medium text-[#30383c]">
                      Contact Information
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-6 text-[11px] leading-5 text-[#7e8b8e]">
                  We&apos;ll use this information to
                  contact you about your order.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-[10px] font-semibold text-[#596568]"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      placeholder="Ahmed"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-[10px] font-semibold text-[#596568]"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      placeholder="Abu Al-Khair"
                      className={inputClassName}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[10px] font-semibold text-[#596568]"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      className={inputClassName}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-[10px] font-semibold text-[#596568]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+20 100 000 0000"
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping */}

            <section className="overflow-hidden rounded-[24px] border border-[#e1e7e5] bg-white shadow-[0_10px_35px_rgba(30,40,40,0.035)]">
              <div className="border-b border-[#e8eceb] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-[#e2e8e6] bg-[#fafcfc] text-[#557075]">
                    <FiMapPin
                      size={17}
                      strokeWidth={1.4}
                    />
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8b9799]">
                      Step 02
                    </p>

                    <h2 className="mt-1 text-[15px] font-medium text-[#30383c]">
                      Shipping Address
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-6 text-[11px] leading-5 text-[#7e8b8e]">
                  Where should we deliver your order?
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-[10px] font-semibold text-[#596568]"
                    >
                      Street Address
                    </label>

                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      required
                      placeholder="Street address"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-[10px] font-semibold text-[#596568]"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      required
                      placeholder="Cairo"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="mb-2 block text-[10px] font-semibold text-[#596568]"
                    >
                      Country
                    </label>

                    <input
                      id="country"
                      name="country"
                      type="text"
                      autoComplete="country-name"
                      required
                      placeholder="Egypt"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="mb-2 block text-[10px] font-semibold text-[#596568]"
                    >
                      Postal Code
                    </label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      autoComplete="postal-code"
                      placeholder="11511"
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}

            <section className="overflow-hidden rounded-[24px] border border-[#e1e7e5] bg-white shadow-[0_10px_35px_rgba(30,40,40,0.035)]">
              <div className="border-b border-[#e8eceb] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-[#e2e8e6] bg-[#fafcfc] text-[#557075]">
                    <FiCreditCard
                      size={17}
                      strokeWidth={1.4}
                    />
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8b9799]">
                      Step 03
                    </p>

                    <h2 className="mt-1 text-[15px] font-medium text-[#30383c]">
                      Payment Method
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-6 text-[11px] leading-5 text-[#7e8b8e]">
                  Choose how you&apos;d like to pay.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("card")
                    }
                    aria-pressed={
                      paymentMethod === "card"
                    }
                    className={`group relative rounded-[18px] border p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6bb8c5] focus:ring-offset-2 ${
                      paymentMethod === "card"
                        ? "border-[#5faeba] bg-[#f2fafb] shadow-[0_8px_25px_rgba(80,160,175,0.08)]"
                        : "border-[#e1e7e5] bg-white hover:border-[#b9d9dd] hover:bg-[#fafcfc]"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#397d89] text-white">
                        <FiCheck
                          size={11}
                          strokeWidth={2}
                        />
                      </span>
                    )}

                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#edf8f9] text-[#3f94a3]">
                      <FiCreditCard
                        size={19}
                        strokeWidth={1.3}
                      />
                    </div>

                    <p className="mt-5 text-[13px] font-medium text-[#30383c]">
                      Credit / Debit Card
                    </p>

                    <p className="mt-1.5 text-[10px] text-[#849093]">
                      Visa, Mastercard and more
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("cash")
                    }
                    aria-pressed={
                      paymentMethod === "cash"
                    }
                    className={`group relative rounded-[18px] border p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6bb8c5] focus:ring-offset-2 ${
                      paymentMethod === "cash"
                        ? "border-[#5faeba] bg-[#f2fafb] shadow-[0_8px_25px_rgba(80,160,175,0.08)]"
                        : "border-[#e1e7e5] bg-white hover:border-[#b9d9dd] hover:bg-[#fafcfc]"
                    }`}
                  >
                    {paymentMethod === "cash" && (
                      <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#397d89] text-white">
                        <FiCheck
                          size={11}
                          strokeWidth={2}
                        />
                      </span>
                    )}

                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f4f7f6] text-[#607073]">
                      <FiTruck
                        size={19}
                        strokeWidth={1.3}
                      />
                    </div>

                    <p className="mt-5 text-[13px] font-medium text-[#30383c]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1.5 text-[10px] text-[#849093]">
                      Pay when your order arrives
                    </p>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-7 rounded-[18px] border border-[#e6ebea] bg-[#fafcfc] p-5 sm:p-6">
                    <div className="grid gap-5">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="mb-2 block text-[10px] font-semibold text-[#596568]"
                        >
                          Card Number
                        </label>

                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          required
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={inputClassName}
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="expiry"
                            className="mb-2 block text-[10px] font-semibold text-[#596568]"
                          >
                            Expiry Date
                          </label>

                          <input
                            id="expiry"
                            name="expiry"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            required
                            placeholder="MM/YY"
                            maxLength={5}
                            className={inputClassName}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cvv"
                            className="mb-2 block text-[10px] font-semibold text-[#596568]"
                          >
                            CVV
                          </label>

                          <input
                            id="cvv"
                            name="cvv"
                            type="password"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            required
                            placeholder="123"
                            maxLength={4}
                            className={inputClassName}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[9px] text-[#8b9799]">
                        <FiLock
                          size={12}
                          strokeWidth={1.5}
                        />

                        Your payment information is
                        encrypted and secure.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* =====================================================
              ORDER SUMMARY
          ===================================================== */}

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[24px] border border-[#dfe6e4] bg-white shadow-[0_15px_45px_rgba(30,40,40,0.06)]">
              <div className="border-b border-[#e7eceb] bg-[#fbfcfc] px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#849194]">
                      Your order
                    </p>

                    <h2 className="mt-1 text-[16px] font-medium text-[#30383c]">
                      Order Summary
                    </h2>
                  </div>

                  <span className="rounded-full bg-[#edf8f9] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#397d89]">
                    {totalItems}{" "}
                    {totalItems === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>
              </div>

              {/* Product list */}

              <div className="px-5 py-5 sm:px-6">
                <div className="max-h-[330px] space-y-4 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex gap-3.5 rounded-[16px] border border-[#edf0ef] bg-[#fafcfc] p-3 transition-all duration-200 hover:border-[#d7e5e3]"
                    >
                      <Link
                        href={`/products/${item.id}`}
                        className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[#e6ebe9] bg-white"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="72px"
                          className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-110"
                        />

                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#252c30] px-1.5 text-[8px] font-semibold text-white shadow-sm">
                          {item.quantity}
                        </span>
                      </Link>

                      <div className="min-w-0 flex-1 py-1">
                        <Link
                          href={`/products/${item.id}`}
                          className="line-clamp-2 text-[11px] font-medium leading-5 text-[#30383c] transition-colors hover:text-[#2794aa]"
                        >
                          {item.title}
                        </Link>

                        <p className="mt-1 text-[9px] text-[#8b9799]">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <p className="shrink-0 self-center text-[11px] font-semibold text-[#30383c]">
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="my-6 h-px bg-[#e8edeb]" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#7e8b8e]">
                      Subtotal
                    </span>

                    <span className="font-medium text-[#30383c]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#7e8b8e]">
                      Shipping
                    </span>

                    <span
                      className={
                        shipping === 0
                          ? "font-semibold text-[#4b9668]"
                          : "font-medium text-[#30383c]"
                      }
                    >
                      {shipping === 0
                        ? "Free"
                        : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="my-5 h-px bg-[#e8edeb]" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[12px] font-medium text-[#30383c]">
                      Total
                    </p>

                    <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#929d9f]">
                      USD
                    </p>
                  </div>

                  <span className="text-[27px] font-semibold tracking-[-0.045em] text-[#252c30]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Shipping notice */}

                <div
                  className={`mt-6 rounded-[16px] border px-4 py-4 ${
                    shipping === 0
                      ? "border-[#d7e9dc] bg-[#f2faf5]"
                      : "border-[#e2e8e6] bg-[#f8faf9]"
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        shipping === 0
                          ? "bg-white text-[#4b9668]"
                          : "bg-white text-[#557075]"
                      }`}
                    >
                      {shipping === 0 ? (
                        <FiCheck
                          size={13}
                          strokeWidth={1.7}
                        />
                      ) : (
                        <FiTruck
                          size={13}
                          strokeWidth={1.5}
                        />
                      )}
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-[#39474a]">
                        {shipping === 0
                          ? "Free shipping applied"
                          : "Free shipping over $50"}
                      </p>

                      <p className="mt-1 text-[9px] leading-4 text-[#7f8b8e]">
                        {shipping === 0
                          ? "Your order qualifies for free delivery."
                          : `Add $${Math.max(
                              FREE_SHIPPING_THRESHOLD -
                                totalPrice,
                              0
                            ).toFixed(
                              2
                            )} more to get free shipping.`}
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="mt-5 rounded-[14px] border border-[#f0cccc] bg-[#fff5f5] px-4 py-3 text-[10px] font-medium leading-5 text-[#bd5555]"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-5 flex h-13 w-full items-center justify-center gap-3 rounded-full bg-[#252c30] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_25px_rgba(37,44,48,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#397d89] hover:shadow-[0_12px_30px_rgba(57,125,137,0.2)] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#397d89] focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order

                      <FiArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[9px] text-[#909b9e]">
                  <FiLock
                    size={11}
                    strokeWidth={1.5}
                  />

                  Secure checkout
                </div>
              </div>

              {/* Trust footer */}

              <div className="grid grid-cols-2 border-t border-[#e5eae8] bg-[#fbfcfc]">
                <div className="flex items-center gap-2 px-4 py-4 text-[9px] font-medium text-[#697679] sm:px-6">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#4b9668] shadow-sm">
                    <FiCheck
                      size={12}
                      strokeWidth={1.6}
                    />
                  </span>

                  Secure payment
                </div>

                <div className="flex items-center justify-end gap-2 border-l border-[#e5eae8] px-4 py-4 text-[9px] font-medium text-[#697679] sm:px-6">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#557075] shadow-sm">
                    <FiTruck
                      size={12}
                      strokeWidth={1.5}
                    />
                  </span>

                  Fast delivery
                </div>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
};

export default CheckoutPage;