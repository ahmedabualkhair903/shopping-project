import type { Review } from "@/types/review";

const REVIEWS_KEY = "ecommerce-reviews";

const isBrowser = () => typeof window !== "undefined";

export const getReviews = (): Review[] => {
  if (!isBrowser()) {
    return [];
  }

  try {
    const storedReviews = window.localStorage.getItem(REVIEWS_KEY);

    if (!storedReviews) {
      return [];
    }

    const parsedReviews: unknown = JSON.parse(storedReviews);

    if (!Array.isArray(parsedReviews)) {
      return [];
    }

    return parsedReviews as Review[];
  } catch (error) {
    console.error("Failed to load reviews:", error);

    return [];
  }
};

export const getProductReviews = (
  productId: number
): Review[] => {
  return getReviews().filter(
    (review) => review.productId === productId
  );
};

export const createReview = (
  review: Review
): Review => {
  if (!isBrowser()) {
    return review;
  }

  try {
    const reviews = getReviews();

    const updatedReviews = [
      review,
      ...reviews.filter(
        (existingReview) => existingReview.id !== review.id
      ),
    ];

    window.localStorage.setItem(
      REVIEWS_KEY,
      JSON.stringify(updatedReviews)
    );

    return review;
  } catch (error) {
    console.error("Failed to create review:", error);

    return review;
  }
};

export const deleteReview = (
  reviewId: string
): boolean => {
  if (!isBrowser()) {
    return false;
  }

  try {
    const reviews = getReviews();

    const updatedReviews = reviews.filter(
      (review) => review.id !== reviewId
    );

    if (updatedReviews.length === reviews.length) {
      return false;
    }

    window.localStorage.setItem(
      REVIEWS_KEY,
      JSON.stringify(updatedReviews)
    );

    return true;
  } catch (error) {
    console.error("Failed to delete review:", error);

    return false;
  }
};

export const getAverageRating = (
  productId: number
): number => {
  const reviews = getProductReviews(productId);

  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  return totalRating / reviews.length;
};

export const getReviewCount = (
  productId: number
): number => {
  return getProductReviews(productId).length;
};