"use client";

import { chambarReviews, type KoiReview } from "@/data/chambar-reviews";

const instagramTestimonialNames = [
  "Anny",
  "Carolina Castanho",
  "Giovana Naiff",
  "Eduardo",
  "Sheila Freire",
  "Leticia Pi",
  "Teresa Sousa",
  "Ná",
] as const;
const instagramTestimonials = instagramTestimonialNames.flatMap((name) => {
  const review = chambarReviews.find((item) => item.name === name);

  return review ? [review] : [];
});

function ReviewCard({ review }: { review: KoiReview }) {
  return (
    <article className="h-[136px] w-[280px] shrink-0 rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(16,16,16,0.055)]">
      <span className="block h-1.5 w-8 rounded-full bg-[var(--chambar-red)]" />
      <p className="mt-3 line-clamp-3 text-sm font-bold leading-6 text-neutral-700">
        {review.text}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs font-black text-neutral-950">
        <span>{review.name}</span>
        <span className="rounded-full bg-[#fff4ec] px-2.5 py-1 text-[var(--chambar-red)]">
          {review.source}
        </span>
      </div>
    </article>
  );
}

function ReviewRow({ reviews }: { reviews: KoiReview[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {reviews.map((review) => (
        <ReviewCard key={review.name} review={review} />
      ))}
    </div>
  );
}

export function InstagramTestimonialsMarquee() {
  const midpoint = Math.ceil(instagramTestimonials.length / 2);
  const firstRow = instagramTestimonials.slice(0, midpoint);
  const secondRow = instagramTestimonials.slice(midpoint);

  return (
    <section className="ig-rise mt-6 overflow-hidden">
      <div className="px-1">
        <h2 className="text-2xl font-black leading-tight text-neutral-950">
          Quem já veio, recomenda.
        </h2>
        <p className="mt-1 text-sm font-bold leading-6 text-neutral-600">
          Avaliações reais sobre qualidade, atendimento, preço justo e
          apresentação.
        </p>
      </div>
      <div className="mt-4 grid gap-3">
        <ReviewRow reviews={firstRow} />
        <ReviewRow reviews={secondRow} />
      </div>
    </section>
  );
}
