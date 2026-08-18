"use client";

import { useEffect, useMemo, useState } from "react";
import { FiStar } from "react-icons/fi";

import { getProductReviews } from "@/lib/reviews";

type ProductRatingProps = {
  productId: number;
};

export default function ProductRating({
  productId,
}: ProductRatingProps) {
  const [reviews, setReviews] = useState<
    ReturnType<typeof getProductReviews>
  >([]);

  useEffect(() => {
    const loadReviews = () => {
      setReviews(getProductReviews(productId));
    };

    loadReviews();

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

  const roundedRating = Math.round(averageRating);

  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full bg-[#f7f3eb] px-3.5 py-2">
        <FiStar
          size={13}
          className={
            averageRating > 0
              ? "fill-[#98754d] text-[#98754d]"
              : "text-[#b9c0bf]"
          }
          strokeWidth={1.3}
        />

        <span className="text-[10px] font-semibold text-[#806a4d]">
          {averageRating > 0
            ? averageRating.toFixed(1)
            : "No rating"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={11}
              strokeWidth={1.3}
              className={
                star <= roundedRating
                  ? "fill-[#98754d] text-[#98754d]"
                  : "text-[#d8dddb]"
              }
            />
          ))}
        </div>

        <span className="text-[10px] text-[#8b9597]">
          {reviews.length}{" "}
          {reviews.length === 1 ? "review" : "reviews"}
        </span>
      </div>
    </div>
  );
}