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

function ReviewCard({
  review,
  isHidden = false,
}: {
  review: KoiReview;
  isHidden?: boolean;
}) {
  return (
    <article
      className="h-[156px] w-[280px] shrink-0 rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(16,16,16,0.055)]"
      aria-hidden={isHidden || undefined}
    >
      <span className="block text-sm leading-none text-[#c9a45c]" aria-label="5 estrelas">
        ★★★★★
      </span>
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

function ReviewSet({
  reviews,
  isHidden = false,
}: {
  reviews: KoiReview[];
  isHidden?: boolean;
}) {
  return (
    <div
      className="ig-testimonials-set flex gap-3"
      aria-hidden={isHidden || undefined}
    >
      {reviews.map((review) => (
        <ReviewCard
          key={`${review.name}-${isHidden ? "loop" : "original"}`}
          review={review}
          isHidden={isHidden}
        />
      ))}
    </div>
  );
}

function ReviewRow({
  reviews,
  direction,
}: {
  reviews: KoiReview[];
  direction: "left" | "right";
}) {
  return (
    <div className="ig-testimonials-row overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={`ig-testimonials-track ig-testimonials-${direction} flex w-max gap-3 will-change-transform`}
      >
        <ReviewSet reviews={reviews} />
        <ReviewSet reviews={reviews} isHidden />
      </div>
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
        <ReviewRow reviews={firstRow} direction="left" />
        <ReviewRow reviews={secondRow} direction="right" />
      </div>
    </section>
  );
}