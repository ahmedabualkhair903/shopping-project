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
  "h-12 w-full rounded-none border border-neutral-200 bg-neutral-50/40 px-4 text-sm text-neutral-950 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white";

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

    // Validate email
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    // Validate card payment
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

  /* =========================
     Empty Cart
  ========================= */

  if (items.length === 0) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#f8f8f6]">
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8 lg:px-10">
          <div className="w-full max-w-lg text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#e2e6e5] bg-white shadow-[0_12px_35px_rgba(30,40,40,0.04)]">
              <FiShoppingBag
                size={30}
                strokeWidth={1.1}
                className="text-[#56adbf]"
              />
            </div>

            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7d8b8f]">
              LUXORA / Checkout
            </p>

            <h1 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-[#252c30] sm:text-4xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#7c898d]">
              There&apos;s nothing to checkout yet.
              Explore our collection and find
              something you love.
            </p>

            <Link
              href="/products"
              className="group mx-auto mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-[#252c30] px-7 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#397d89]"
            >
              <FiArrowLeft
                size={16}
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
    <main className="min-h-screen bg-[#f8f8f6] text-[#252c30]">
      {/* =========================
          Page Header
      ========================= */}

      <section className="border-b border-[#e2e6e5] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <Link
            href="/cart"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8a9699] transition-colors duration-200 hover:text-[#2794aa]"
          >
            <FiArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to cart
          </Link>

          <div className="mt-7">
            <div className="flex items-center gap-3">
              <span className="h-[5px] w-[5px] rounded-full bg-[#56adbf]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d8b8f]">
                LUXORA / Secure Checkout
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-[#252c30] sm:text-4xl lg:text-[44px]">
              Complete your order
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#7c898d]">
              Enter your details below and
              complete your purchase securely.
            </p>
          </div>

          {/* Checkout Steps */}

          <div className="mt-8 flex max-w-2xl items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#252c30] text-[10px] font-medium text-white">
                1
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#252c30]">
                Details
              </span>
            </div>

            <span className="h-px w-8 bg-[#dfe5e4] sm:w-14" />

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d7dedd] text-[10px] font-medium text-[#7d898d]">
                2
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#7d898d]">
                Payment
              </span>
            </div>

            <span className="h-px w-8 bg-[#dfe5e4] sm:w-14" />

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d7dedd] text-[10px] font-medium text-[#7d898d]">
                3
              </span>

              <span className="hidden text-[10px] font-medium uppercase tracking-[0.1em] text-[#7d898d] sm:block">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Checkout Content
      ========================= */}

      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_410px] xl:gap-16"
        >
          {/* =========================
              Left Side
          ========================= */}

          <div className="min-w-0">
            {/* Contact Information */}

            <section className="overflow-hidden rounded-[22px] border border-[#e1e6e5] bg-white shadow-[0_8px_30px_rgba(30,40,40,0.03)]">
              <div className="border-b border-[#e8ebea] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#eef8f9] text-[#3f96a5]">
                    <FiCreditCard
                      size={16}
                      strokeWidth={1.4}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7d8b8f]">
                      Step 01
                    </p>

                    <h2 className="mt-1 text-sm font-medium text-[#30383c]">
                      Contact Information
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-6 text-xs leading-5 text-[#7c898d]">
                  We&apos;ll use this information to
                  contact you about your order.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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
                      className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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
                      className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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
                      className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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

            {/* Shipping Address */}

            <section className="mt-5 overflow-hidden rounded-[22px] border border-[#e1e6e5] bg-white shadow-[0_8px_30px_rgba(30,40,40,0.03)]">
              <div className="border-b border-[#e8ebea] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#f5f8f8] text-[#526064]">
                    <FiMapPin
                      size={16}
                      strokeWidth={1.4}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7d8b8f]">
                      Step 02
                    </p>

                    <h2 className="mt-1 text-sm font-medium text-[#30383c]">
                      Shipping Address
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-6 text-xs leading-5 text-[#7c898d]">
                  Where should we deliver your order?
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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
                      className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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
                      className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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
                      className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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

            <section className="mt-5 overflow-hidden rounded-[22px] border border-[#e1e6e5] bg-white shadow-[0_8px_30px_rgba(30,40,40,0.03)]">
              <div className="border-b border-[#e8ebea] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#f5f8f8] text-[#526064]">
                    <FiCreditCard
                      size={16}
                      strokeWidth={1.4}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7d8b8f]">
                      Step 03
                    </p>

                    <h2 className="mt-1 text-sm font-medium text-[#30383c]">
                      Payment Method
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-6 text-xs leading-5 text-[#7c898d]">
                  Choose how you&apos;d like to pay.
                </p>

                {/* Payment Options */}

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("card")
                    }
                    aria-pressed={
                      paymentMethod === "card"
                    }
                    className={`group relative rounded-[17px] border p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#252c30] focus:ring-offset-2 ${
                      paymentMethod === "card"
                        ? "border-[#252c30] bg-[#f5f9f9]"
                        : "border-[#e1e6e5] bg-white hover:border-[#aebaba]"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#252c30] text-white">
                        <FiCheck
                          size={11}
                          strokeWidth={2}
                        />
                      </span>
                    )}

                    <FiCreditCard
                      size={20}
                      strokeWidth={1.3}
                      className="text-[#30383c]"
                    />

                    <p className="mt-6 text-sm font-medium text-[#30383c]">
                      Credit / Debit Card
                    </p>

                    <p className="mt-1.5 text-xs text-[#7c898d]">
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
                    className={`group relative rounded-[17px] border p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#252c30] focus:ring-offset-2 ${
                      paymentMethod === "cash"
                        ? "border-[#252c30] bg-[#f5f9f9]"
                        : "border-[#e1e6e5] bg-white hover:border-[#aebaba]"
                    }`}
                  >
                    {paymentMethod === "cash" && (
                      <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#252c30] text-white">
                        <FiCheck
                          size={11}
                          strokeWidth={2}
                        />
                      </span>
                    )}

                    <FiTruck
                      size={20}
                      strokeWidth={1.3}
                      className="text-[#30383c]"
                    />

                    <p className="mt-6 text-sm font-medium text-[#30383c]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1.5 text-xs text-[#7c898d]">
                      Pay when your order arrives
                    </p>
                  </button>
                </div>

                {/* Card Details */}

                {paymentMethod === "card" && (
                  <div className="mt-7 border-t border-[#edf0ef] pt-7">
                    <div className="grid gap-5">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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
                            className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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
                            className="mb-2 block text-[11px] font-medium text-[#4e5b5f]"
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

                      <div className="flex items-center gap-2 text-[10px] text-[#8a9699]">
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

          {/* =========================
              Order Summary
          ========================= */}

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[22px] border border-[#e1e6e5] bg-white shadow-[0_10px_35px_rgba(30,40,40,0.05)]">
              {/* Summary Header */}

              <div className="border-b border-[#e8ebea] bg-[#fcfdfd] px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7d8b8f]">
                      Your order
                    </p>

                    <h2 className="mt-1 text-sm font-medium text-[#30383c]">
                      Order Summary
                    </h2>
                  </div>

                  <span className="rounded-full bg-[#eef8f9] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#397d89]">
                    {totalItems}{" "}
                    {totalItems === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>
              </div>

              {/* Items */}

              <div className="px-5 py-5 sm:px-6">
                <div className="max-h-80 space-y-4 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-[15px] border border-[#edf0ef] bg-[#fcfdfd] p-3"
                    >
                      <Link
                        href={`/products/${item.id}`}
                        className="group relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-white p-2"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={72}
                          height={72}
                          sizes="72px"
                          unoptimized
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />

                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#252c30] px-1 text-[9px] font-medium text-white shadow-sm">
                          {item.quantity}
                        </span>
                      </Link>

                      <div className="min-w-0 flex-1 py-0.5">
                        <Link
                          href={`/products/${item.id}`}
                          className="line-clamp-2 text-xs font-medium leading-5 text-[#30383c] transition-colors hover:text-[#2794aa]"
                        >
                          {item.title}
                        </Link>

                        <p className="mt-1 text-[10px] text-[#8a9699]">
                          ${item.price.toFixed(2)} each
                        </p>

                        <p className="mt-2 text-[11px] font-semibold text-[#30383c]">
                          $
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}

                <div className="my-6 border-t border-[#e8ebea]" />

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7c898d]">
                      Subtotal
                    </span>

                    <span className="font-medium text-[#30383c]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7c898d]">
                      Shipping
                    </span>

                    <span className="font-medium text-[#30383c]">
                      {shipping === 0
                        ? "Free"
                        : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="my-5 border-t border-[#e8ebea]" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#30383c]">
                      Total
                    </p>

                    <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-[#8a9699]">
                      USD
                    </p>
                  </div>

                  <span className="text-2xl font-semibold tracking-[-0.04em] text-[#252c30]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Shipping Notice */}

                <div className="mt-6 rounded-[16px] border border-[#dcebed] bg-[#f3fafb] px-4 py-4">
                  <div className="flex gap-3">
                    {shipping === 0 ? (
                      <FiCheck
                        size={15}
                        strokeWidth={1.5}
                        className="mt-0.5 shrink-0 text-[#397d89]"
                      />
                    ) : (
                      <FiTruck
                        size={15}
                        strokeWidth={1.5}
                        className="mt-0.5 shrink-0 text-[#397d89]"
                      />
                    )}

                    <div>
                      <p className="text-[10px] font-semibold text-[#397d89]">
                        {shipping === 0
                          ? "Free shipping applied"
                          : "Free shipping over $50"}
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-[#688286]">
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

                {/* Error */}

                {error && (
                  <div
                    role="alert"
                    className="mt-5 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-[11px] font-medium leading-5 text-red-600"
                  >
                    {error}
                  </div>
                )}

                {/* Place Order */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-5 flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-[#252c30] px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#397d89] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#252c30] focus:ring-offset-2"
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
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                {/* Security */}

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#8a9699]">
                  <FiLock
                    size={12}
                    strokeWidth={1.5}
                  />

                  Secure checkout
                </div>
              </div>

              {/* Trust Footer */}

              <div className="grid grid-cols-2 border-t border-[#e8ebea] bg-[#fcfdfd]">
                <div className="flex items-center gap-2 px-5 py-4 text-[10px] text-[#687578] sm:px-6">
                  <FiCheck
                    size={13}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#397d89]"
                  />

                  Secure payment
                </div>

                <div className="flex items-center justify-end gap-2 border-l border-[#e8ebea] px-5 py-4 text-[10px] text-[#687578] sm:px-6">
                  <FiTruck
                    size={13}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#397d89]"
                  />

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