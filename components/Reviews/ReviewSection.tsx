"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
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
    setReviews(getProductReviews(productId));
    setUser(getCurrentUser());
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
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(new Date(date));
  };

  return (
    <section className="mt-14 border-t border-neutral-200 pt-10 sm:mt-16 sm:pt-12">
      {/* Header */}
      <div className="flex flex-col gap-6 border-b border-neutral-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            LUXORA / Reviews
          </p>

          <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-neutral-950 sm:text-3xl">
            What customers say
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
            Real experiences from customers who purchased this
            product.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex w-fit items-center gap-5 border border-neutral-200 bg-white px-5 py-4">
          <div>
            <p className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950">
              {averageRating > 0
                ? averageRating.toFixed(1)
                : "—"}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-neutral-400">
              {reviews.length}{" "}
              {reviews.length === 1 ? "Review" : "Reviews"}
            </p>
          </div>

          <div className="h-9 w-px bg-neutral-200" />

          <div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  size={15}
                  strokeWidth={1.5}
                  className={
                    star <= Math.round(averageRating)
                      ? "fill-current text-neutral-950"
                      : "text-neutral-300"
                  }
                />
              ))}
            </div>

            <p className="mt-1 text-[10px] text-neutral-400">
              Average rating
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Reviews */}
        <div>
          {reviews.length === 0 ? (
            <div className="border border-neutral-200 bg-[#FAFAF8] px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-neutral-200 bg-white">
                <FiMessageCircle
                  size={21}
                  strokeWidth={1.3}
                  className="text-neutral-300"
                />
              </div>

              <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Customer Reviews
              </p>

              <h3 className="mt-2 text-lg font-medium tracking-[-0.02em] text-neutral-950">
                No reviews yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                Be the first customer to share your experience
                with this product.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {reviews.map((review) => {
                const isOwner = user?.id === review.userId;

                return (
                  <article
                    key={review.id}
                    className="py-6"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-neutral-950 text-xs font-medium text-white">
                          {review.userName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-medium text-neutral-950">
                            {review.userName}
                          </h3>

                          <p className="mt-1 text-[10px] text-neutral-400">
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
                          className="flex h-8 w-8 shrink-0 items-center justify-center border border-transparent text-neutral-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <FiTrash2
                            size={14}
                            strokeWidth={1.5}
                          />
                        </button>
                      )}
                    </div>

                    <div className="mt-4 flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar
                          key={star}
                          size={14}
                          strokeWidth={1.5}
                          className={
                            star <= review.rating
                              ? "fill-current text-neutral-950"
                              : "text-neutral-300"
                          }
                        />
                      ))}
                    </div>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
                      {review.comment}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Review */}
        <div className="h-fit border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-neutral-100">
                <FiEdit3
                  size={16}
                  strokeWidth={1.5}
                  className="text-neutral-700"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-950">
                  Write a review
                </h3>

                <p className="mt-0.5 text-[10px] text-neutral-400">
                  Share your experience
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {userReview ? (
              <div className="border border-neutral-200 bg-[#FAFAF8] p-4">
                <p className="text-xs font-medium text-neutral-950">
                  You already reviewed this product.
                </p>

                <p className="mt-2 text-xs leading-5 text-neutral-500">
                  Delete your current review if you want to
                  submit a new one.
                </p>
              </div>
            ) : user ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Rating */}
                <div>
                  <label className="mb-3 block text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                    Your Rating
                  </label>

                  <div className="flex gap-1">
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
                          className="flex h-8 w-8 items-center justify-center transition-transform hover:scale-110"
                        >
                          <FiStar
                            size={18}
                            strokeWidth={1.5}
                            className={
                              active
                                ? "fill-current text-neutral-950"
                                : "text-neutral-300"
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label
                    htmlFor={`review-${productId}`}
                    className="mb-3 block text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400"
                  >
                    Your Review
                  </label>

                  <textarea
                    id={`review-${productId}`}
                    value={comment}
                    onChange={(event) =>
                      setComment(event.target.value)
                    }
                    rows={6}
                    maxLength={500}
                    placeholder="Tell other customers what you think..."
                    className="w-full resize-none border border-neutral-200 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
                  />

                  <p className="mt-2 text-right text-[10px] text-neutral-400">
                    {comment.length}/500
                  </p>
                </div>

                {error && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-11 w-full items-center justify-center gap-2 bg-neutral-950 px-5 text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiSend
                    size={14}
                    strokeWidth={1.5}
                  />

                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="bg-[#FAFAF8] p-5">
                <p className="text-sm font-medium text-neutral-950">
                  Sign in to leave a review.
                </p>

                <p className="mt-2 text-xs leading-5 text-neutral-500">
                  You need an account before you can rate this
                  product.
                </p>

                <Link
                  href="/login"
                  className="mt-5 inline-flex h-10 items-center justify-center bg-neutral-950 px-5 text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-neutral-800"
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