"use client";

import { useEffect, useRef, useState } from "react";
import type { ChambarReview } from "@/data/chambar-reviews";

type InstagramTestimonialsMarqueeProps = {
  reviews: ChambarReview[];
};

function ReviewCard({ review }: { review: ChambarReview }) {
  return (
    <article
      className="h-[136px] w-[280px] shrink-0 rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_10px_24px_rgba(16,16,16,0.055)]"
      role="listitem"
    >
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

function ReviewRow({
  reviews,
  direction,
  playState,
}: {
  reviews: ChambarReview[];
  direction: "left" | "right";
  playState: "running" | "paused";
}) {
  return (
    <div
      className={`ig-marquee ${
        direction === "left" ? "ig-testimonials-left" : "ig-testimonials-right"
      } flex w-max gap-3`}
      style={{ animationPlayState: playState }}
    >
      <div className="flex gap-3">
        {reviews.map((review, index) => (
          <ReviewCard
            key={`${review.text}-${index}-${direction}`}
            review={review}
          />
        ))}
      </div>
      <div className="flex gap-3" aria-hidden="true">
        {reviews.map((review, index) => (
          <ReviewCard
            key={`${review.text}-${index}-${direction}-loop`}
            review={review}
          />
        ))}
      </div>
    </div>
  );
}

export function InstagramTestimonialsMarquee({
  reviews,
}: InstagramTestimonialsMarqueeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setReducedMotion(reducedQuery.matches);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    reducedQuery.addEventListener("change", syncReducedMotion);
    syncReducedMotion();

    return () => {
      observer.disconnect();
      reducedQuery.removeEventListener("change", syncReducedMotion);
    };
  }, []);

  const midpoint = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, midpoint);
  const secondRow = reviews.slice(midpoint);
  const playState = isVisible && !reducedMotion ? "running" : "paused";

  return (
    <section ref={sectionRef} className="ig-rise mt-6 overflow-hidden">
      <div className="px-1">
        <h2 className="text-2xl font-black leading-tight text-neutral-950">
          Quem já veio, recomenda.
        </h2>
        <p className="mt-1 text-sm font-bold leading-6 text-neutral-600">
          Avaliações reais sobre frescura, atendimento, preço justo e
          apresentação.
        </p>
      </div>
      <div
        className="mt-4 grid gap-3"
        role="list"
        aria-label="Avaliações reais do Koi Sushi Porto"
      >
        <ReviewRow reviews={firstRow} direction="left" playState={playState} />
        <ReviewRow
          reviews={secondRow}
          direction="right"
          playState={playState}
        />
      </div>
    </section>
  );
}
