import {
  type ChambarTestimonial,
  chambarTestimonials,
} from "@/data/chambar-testimonials";

const proofBadge = "★★★★★ 4,9 no Google · 48 avaliações";

function RatingStars({ rating }: { rating: ChambarTestimonial["rating"] }) {
  return (
    <div
      aria-label={`${rating} de 5 estrelas no Google`}
      className="flex items-center gap-0.5 text-[0.92rem] leading-none text-[#b8924a]"
    >
      {Array.from({ length: rating }).map((_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: ChambarTestimonial }) {
  return (
    <article className="chambar-testimonial-card">
      <div className="flex items-center justify-between gap-3">
        <RatingStars rating={testimonial.rating} />
        <span
          className="chambar-testimonial-tag rounded-full border border-[#a91f24]/35 bg-[#a91f24]/12 px-2.5 py-1 text-[0.68rem] font-black uppercase text-[#d7b978]"
          title={testimonial.tag}
        >
          {testimonial.tag}
        </span>
      </div>
      <p className="mt-4 line-clamp-5 text-sm font-bold leading-6 text-[#fff8ed]/92">
        “{testimonial.text}”
      </p>
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#efe2c8]/10 pt-4">
        <p className="text-sm font-black text-white">{testimonial.name}</p>
        <span className="text-xs font-black uppercase tracking-[0.08em] text-[#efe2c8]/56">
          Google
        </span>
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
          key={`${testimonial.name}-${testimonial.tag}`}
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
    <section
      id="depoimentos"
      className="section-pad chambar-testimonials-section bg-[#0f0d0a] text-[#fff8ed]"
      aria-labelledby="testimonials-title"
    >
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-[#b8924a]/20 bg-[#16110d]/90 px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#b8924a]">
            {proofBadge}
          </p>
          <h2
            id="testimonials-title"
            className="mt-5 text-4xl font-black leading-[1.04] text-[#fff8ed] md:text-6xl"
          >
            O que dizem sobre o Koi Sushi
          </h2>
          <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-[#efe2c8]/76 md:text-lg">
            Sushi fresco, cozinha chinesa, rodízio e atendimento elogiados por
            quem já veio ao Koi Sushi Porto.
          </p>
        </div>
      </div>

      <div className="mt-9 space-y-4 overflow-hidden md:mt-12 md:space-y-5">
        <TestimonialsRow testimonials={rowOne} direction="left" />
        <TestimonialsRow testimonials={rowTwo} direction="right" />
      </div>
    </section>
  );
}
