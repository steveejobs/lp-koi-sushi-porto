import {
  type ChambarTestimonial,
  chambarTestimonials,
} from "@/src/data/chambar-testimonials";
import { chambarGoogleProof } from "@/data/chambar-config";

function formatRating(rating: ChambarTestimonial["rating"]) {
  return rating.toString().replace(".", ",");
}

function RatingStars({ rating }: { rating: ChambarTestimonial["rating"] }) {
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

function TestimonialCard({ testimonial }: { testimonial: ChambarTestimonial }) {
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
  hidden,
}: {
  testimonials: ChambarTestimonial[];
  hidden?: boolean;
}) {
  return (
    <div className="chambar-testimonials-set" aria-hidden={hidden}>
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
  direction,
}: {
  testimonials: ChambarTestimonial[];
  direction: "left" | "right";
}) {
  return (
    <div className="chambar-testimonials-row">
      <div
        className={`chambar-testimonials-track chambar-testimonials-track-${direction}`}
      >
        <TestimonialsSet testimonials={testimonials} />
        <TestimonialsSet testimonials={testimonials} hidden />
      </div>
    </div>
  );
}

export function ChambarTestimonialsMarquee() {
  const midpoint = Math.ceil(chambarTestimonials.length / 2);
  const rowOne = chambarTestimonials.slice(0, midpoint);
  const rowTwo = chambarTestimonials.slice(midpoint);

  return (
    <section className="section-pad chambar-testimonials-section bg-[#fffdf9]">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="text-sm font-black text-[var(--chambar-red)]">
            {chambarGoogleProof}
          </p>
          <h2 className="mt-4 text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl">
            Quem conhece, recomenda.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-neutral-600 md:text-lg">
            Comentários sobre a experiência Chambar — apresentação, sabor e uma
            noite acima do comum.
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-4 overflow-hidden md:mt-12 md:space-y-5">
        <TestimonialsRow testimonials={rowOne} direction="left" />
        <TestimonialsRow testimonials={rowTwo} direction="right" />
      </div>
    </section>
  );
}
