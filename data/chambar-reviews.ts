import { chambarTestimonials } from "@/src/data/chambar-testimonials";

export type KoiReview = {
  name: string;
  source: string;
  text: string;
};

export const chambarReviews = chambarTestimonials.map(
  ({ name, quote, context }) => ({
    name,
    source: context ?? "Google",
    text: quote,
  }),
) satisfies KoiReview[];
