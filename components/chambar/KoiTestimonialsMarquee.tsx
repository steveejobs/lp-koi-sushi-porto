"use client";

import {
  type KoiTestimonial,
  chambarTestimonials,
} from "@/src/data/chambar-testimonials";
import { chambarGoogleProof } from "@/data/chambar-config";

function formatRating(rating: KoiTestimonial["rating"]) {
  return rating.toString().replace(".", ",");
}

function RatingStars({ rating }: { rating: KoiTestimonial["rating"] }) {
  return (
    <div
      aria-label={`Avaliação ${formatRating(rating)} de 5`}
      className="flex items-center gap-0.5 text-[1rem] leading-none text-[#f59e0b]"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={rating === 4.5 && index === 4 ? "opacity-45" : undefined}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: KoiTestimonial }) {
  return (
    <article className="chambar-testimonial-card">
      <span className="chambar-testimonial-accent" aria-hidden="true" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <RatingStars rating={testimonial.rating} />
          <span className="text-xs font-black text-neutral-800">
            {formatRating(testimonial.rating)}
          </span>
        </div>
        {testimonial.context ? (
          <span className="rounded-full border border-black/10 bg-[#fff7ed] px-2.5 py-1 text-[0.68rem] font-black uppercase text-[var(--chambar-red)]">
            {testimonial.context}
          </span>
        ) : null}
      </div>
      <p className="mt-5 text-base font-black leading-7 text-neutral-900">
        “{testimonial.quote}”
      </p>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
        <p className="text-sm font-black text-neutral-950">
          {testimonial.name}
        </p>
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-[var(--chambar-red)]"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

function TestimonialsSet({
  testimonials,
}: {
  testimonials: KoiTestimonial[];
}) {
  return (
    <div className="chambar-testimonials-set">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={`${testimonial.quote}-${testimonial.context}`}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

function TestimonialsRow({
  testimonials,
}: {
  testimonials: KoiTestimonial[];
}) {
  return (
    <div className="chambar-testimonials-row">
      <div
        className="chambar-testimonials-track"
      >
        <TestimonialsSet testimonials={testimonials} />
      </div>
    </div>
  );
}

export function KoiTestimonialsMarquee() {
  const midpoint = Math.ceil(chambarTestimonials.length / 2);
  const rowOne = chambarTestimonials.slice(0, midpoint);
  const rowTwo = chambarTestimonials.slice(midpoint);

  return (
    <section
      id="avaliacoes"
      className="section-pad chambar-testimonials-section bg-[#fffdf9]"
    >
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="text-sm font-black text-[var(--chambar-red)]">
            {chambarGoogleProof}
          </p>
          <h2 className="mt-4 text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl">
            Quem já veio, recomenda.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-neutral-600 md:text-lg">
            Avaliações reais sobre frescura, atendimento, preço justo e
            apresentação.
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-4 overflow-hidden md:mt-12 md:space-y-5">
        <TestimonialsRow testimonials={rowOne} />
        <TestimonialsRow testimonials={rowTwo} />
      </div>
    </section>
  );
}
