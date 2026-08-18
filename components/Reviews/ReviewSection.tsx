"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiCheck,
  FiEdit3,
  FiMessageCircle,
  FiSend,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

import {
  createReview,
  deleteReview,
  getProductReviews,
} from "@/lib/reviews";

import {
  getCurrentUser,
  type AuthUser,
} from "@/lib/auth";

import type { Review } from "@/types/review";

type ReviewSectionProps = {
  productId: number;
};

export default function ReviewSection({
  productId,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);

  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReviews = () => {
      setReviews(getProductReviews(productId));
    };

    loadReviews();
    setUser(getCurrentUser());

    window.addEventListener("reviews-updated", loadReviews);

    return () => {
      window.removeEventListener(
        "reviews-updated",
        loadReviews
      );
    };
  }, [productId]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return total / reviews.length;
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter(
        (review) => review.rating === star
      ).length;

      const percentage =
        reviews.length > 0
          ? Math.round((count / reviews.length) * 100)
          : 0;

      return {
        star,
        count,
        percentage,
      };
    });
  }, [reviews]);

  const userReview = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      reviews.find(
        (review) => review.userId === user.id
      ) ?? null
    );
  }, [reviews, user]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setError("Please sign in to leave a review.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a review before submitting.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const newReview: Review = {
      id: `review-${Date.now()}`,
      productId,
      userId: user.id,
      userName: user.name,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    createReview(newReview);

    setReviews(getProductReviews(productId));

    window.dispatchEvent(new Event("reviews-updated"));

    setComment("");
    setRating(5);
    setHoveredRating(0);
    setIsSubmitting(false);
  };

  const handleDelete = (reviewId: string) => {
    const deleted = deleteReview(reviewId);

    if (!deleted) {
      return;
    }

    setReviews(getProductReviews(productId));

    window.dispatchEvent(new Event("reviews-updated"));
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(new Date(date));
  };

  return (
    <section className="mt-14 sm:mt-16">
      {/* =====================================================
          SECTION HEADER
      ====================================================== */}
      <div className="relative overflow-hidden rounded-[28px] border border-[#e3e9e7] bg-[#f5f9f7] px-6 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#d8f1f2]/70 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-[12%] h-64 w-64 rounded-full bg-[#eee5d6]/50 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#56b7c9]" />

                <p className="text-[8px] font-semibold uppercase tracking-[0.26em] text-[#718086]">
                  LUXORA / Customer feedback
                </p>
              </div>

              <h2 className="mt-4 text-[30px] font-medium leading-none tracking-[-0.055em] text-[#252c30] sm:text-[38px]">
                What customers say
              </h2>

              <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#7b898d] sm:text-[13px]">
                Real experiences from customers who purchased
                and experienced this product.
              </p>
            </div>

            <div className="flex w-full items-center gap-5 rounded-[22px] border border-white/80 bg-white/80 px-5 py-5 shadow-[0_10px_30px_rgba(37,44,48,0.04)] backdrop-blur-sm sm:w-fit">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#30383c]">
                <div className="text-center">
                  <p className="text-[21px] font-semibold tracking-[-0.04em] text-white">
                    {averageRating > 0
                      ? averageRating.toFixed(1)
                      : "—"}
                  </p>

                  <p className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.12em] text-white/60">
                    Rating
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      size={15}
                      strokeWidth={1.4}
                      className={
                        star <= Math.round(averageRating)
                          ? "fill-[#98754d] text-[#98754d]"
                          : "text-[#d7dcda]"
                      }
                    />
                  ))}
                </div>

                <p className="mt-2 text-[10px] font-medium text-[#687376]">
                  {reviews.length}{" "}
                  {reviews.length === 1
                    ? "customer review"
                    : "customer reviews"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RATING OVERVIEW
      ====================================================== */}
      <div className="mt-5 rounded-[24px] border border-[#e7e6e1] bg-white p-6 sm:p-7">
        <div className="grid gap-8 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
          <div className="flex items-center gap-5 md:border-r md:border-[#e8e7e2] md:pr-8">
            <div>
              <p className="text-[42px] font-medium leading-none tracking-[-0.07em] text-[#252c30]">
                {averageRating > 0
                  ? averageRating.toFixed(1)
                  : "0.0"}
              </p>

              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={13}
                    strokeWidth={1.4}
                    className={
                      star <= Math.round(averageRating)
                        ? "fill-[#98754d] text-[#98754d]"
                        : "text-[#d7dcda]"
                    }
                  />
                ))}
              </div>

              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#9aa2a4]">
                Average rating
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {ratingDistribution.map(
              ({ star, count, percentage }) => (
                <div
                  key={star}
                  className="flex items-center gap-3"
                >
                  <div className="flex w-8 items-center gap-1">
                    <span className="text-[9px] font-medium text-[#697477]">
                      {star}
                    </span>

                    <FiStar
                      size={9}
                      className="fill-[#98754d] text-[#98754d]"
                    />
                  </div>

                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#edf0ee]">
                    <div
                      className="h-full rounded-full bg-[#56b7c9] transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right text-[9px] text-[#9aa2a4]">
                    {count}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start">
        {/* ===================================================
            REVIEWS LIST
        ==================================================== */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#899294]">
                Customer experiences
              </p>

              <h3 className="mt-1 text-[19px] font-medium tracking-[-0.04em] text-[#252c30]">
                Customer Reviews
              </h3>
            </div>

            {reviews.length > 0 && (
              <span className="rounded-full bg-[#f3f8f7] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#668086]">
                {reviews.length}{" "}
                {reviews.length === 1
                  ? "Review"
                  : "Reviews"}
              </span>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="relative overflow-hidden rounded-[24px] border border-[#e5e7e4] bg-[#fafbf9] px-6 py-14 text-center sm:px-10 sm:py-16">
              <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#dff4f5]/60 blur-3xl" />

              <div className="relative">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_25px_rgba(37,44,48,0.05)]">
                  <FiMessageCircle
                    size={24}
                    strokeWidth={1.25}
                    className="text-[#7c969b]"
                  />
                </div>

                <p className="mt-6 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#899294]">
                  Be the first
                </p>

                <h3 className="mt-2 text-[21px] font-medium tracking-[-0.04em] text-[#252c30]">
                  No reviews yet
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-[12px] leading-6 text-[#7b898d]">
                  This product does not have any customer
                  reviews yet. Share your experience and help
                  the next shopper make a confident choice.
                </p>

                <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-[#f1f6f4] px-4 py-2">
                  <FiStar
                    size={12}
                    className="fill-[#98754d] text-[#98754d]"
                  />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#718086]">
                    Your opinion matters
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => {
                const isOwner = user?.id === review.userId;

                return (
                  <article
                    key={review.id}
                    className="rounded-[22px] border border-[#e7e6e1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(37,44,48,0.05)] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#30383c] text-[12px] font-semibold uppercase text-white">
                          {review.userName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="truncate text-[12px] font-semibold text-[#30383c]">
                              {review.userName}
                            </h4>

                            <span className="inline-flex items-center gap-1 rounded-full bg-[#eef7f4] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#5f8580]">
                              <FiCheck size={8} />
                              Verified
                            </span>
                          </div>

                          <p className="mt-1 text-[9px] text-[#9aa2a4]">
                            {formatDate(review.createdAt)}
                          </p>
                        </div>
                      </div>

                      {isOwner && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(review.id)
                          }
                          aria-label="Delete your review"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-transparent text-[#9aa2a4] transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <FiTrash2
                            size={13}
                            strokeWidth={1.5}
                          />
                        </button>
                      )}
                    </div>

                    <div className="mt-5 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar
                          key={star}
                          size={13}
                          strokeWidth={1.4}
                          className={
                            star <= review.rating
                              ? "fill-[#98754d] text-[#98754d]"
                              : "text-[#d8dddb]"
                          }
                        />
                      ))}

                      <span className="ml-2 text-[9px] font-medium text-[#8b9597]">
                        {review.rating}.0
                      </span>
                    </div>

                    <p className="mt-4 max-w-3xl text-[12px] leading-7 text-[#697477]">
                      {review.comment}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* ===================================================
            WRITE REVIEW
        ==================================================== */}
        <div className="overflow-hidden rounded-[24px] border border-[#e4e7e4] bg-white lg:sticky lg:top-24">
          <div className="relative overflow-hidden border-b border-[#e7e6e1] bg-[#f5f9f7] px-5 py-6 sm:px-6">
            <div className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-[#dff4f5]/70 blur-2xl" />

            <div className="relative flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#30383c] text-white">
                <FiEdit3
                  size={16}
                  strokeWidth={1.4}
                />
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#30383c]">
                  Write a review
                </h3>

                <p className="mt-1 text-[9px] text-[#7d888b]">
                  Share your experience
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {userReview ? (
              <div className="rounded-2xl border border-[#dfe8e4] bg-[#f5f9f7] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#56a092]">
                  <FiCheck
                    size={17}
                    strokeWidth={1.5}
                  />
                </div>

                <h4 className="mt-4 text-[12px] font-semibold text-[#30383c]">
                  Your review is already here
                </h4>

                <p className="mt-2 text-[10px] leading-5 text-[#7b898d]">
                  You have already reviewed this product.
                  Delete your current review if you want to
                  submit a new one.
                </p>
              </div>
            ) : user ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#7d888b]">
                      Your Rating
                    </label>

                    <span className="text-[9px] font-medium text-[#98754d]">
                      {hoveredRating || rating}/5
                    </span>
                  </div>

                  <div className="flex w-fit items-center gap-1 rounded-xl bg-[#faf7f1] px-3 py-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active =
                        star <=
                        (hoveredRating || rating);

                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() =>
                            setHoveredRating(star)
                          }
                          onMouseLeave={() =>
                            setHoveredRating(0)
                          }
                          aria-label={`${star} star${
                            star > 1 ? "s" : ""
                          }`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 hover:bg-white"
                        >
                          <FiStar
                            size={17}
                            strokeWidth={1.4}
                            className={
                              active
                                ? "fill-[#98754d] text-[#98754d]"
                                : "text-[#d4d8d5]"
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label
                      htmlFor={`review-${productId}`}
                      className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#7d888b]"
                    >
                      Your Review
                    </label>

                    <span className="text-[9px] text-[#9aa2a4]">
                      {comment.length}/500
                    </span>
                  </div>

                  <textarea
                    id={`review-${productId}`}
                    value={comment}
                    onChange={(event) =>
                      setComment(event.target.value)
                    }
                    rows={6}
                    maxLength={500}
                    placeholder="Tell other customers what you think..."
                    className="w-full resize-none rounded-2xl border border-[#e1e5e3] bg-[#fbfcfb] px-4 py-3.5 text-[12px] leading-6 text-[#30383c] outline-none transition-all placeholder:text-[#a1aaac] focus:border-[#56b7c9] focus:bg-white focus:ring-4 focus:ring-[#dff4f5]/50"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[10px] leading-5 text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#30383c] px-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#2794aa] hover:shadow-[0_10px_25px_rgba(39,148,170,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiSend
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />

                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="rounded-2xl border border-[#e2e7e4] bg-[#f6faf8] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2794aa]">
                  <FiMessageCircle
                    size={17}
                    strokeWidth={1.4}
                  />
                </div>

                <h4 className="mt-4 text-[12px] font-semibold text-[#30383c]">
                  Sign in to share your experience
                </h4>

                <p className="mt-2 text-[10px] leading-5 text-[#7b898d]">
                  You need an account before you can rate and
                  review this product.
                </p>

                <Link
                  href="/login"
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-[#30383c] px-5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#2794aa]"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}