import { chambarTestimonials } from "@/src/data/chambar-testimonials";

export type ChambarReview = {
  name: string;
  source: string;
  text: string;
};

const instagramReviewIndexes = [1, 2, 7, 10, 16, 17, 18, 19];

export const chambarReviews = instagramReviewIndexes.map((index) => {
  const review = chambarTestimonials[index];

  return {
    name: review.name,
    source: "Google",
    text: review.quote,
  };
}) satisfies ChambarReview[];
