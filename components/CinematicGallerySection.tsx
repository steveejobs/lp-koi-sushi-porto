import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { koiFinalGallery } from "@/data/chambar-media";

export function CinematicGallerySection() {
  return (
    <section
      id="detalhes"
      className="section-pad overflow-hidden border-y border-[#b8924a]/12 bg-[#0f0d0a] text-[#fff8ed]"
      aria-labelledby="cinematic-gallery-title"
    >
      <div className="container-page">
        <Reveal
          threshold={0.3}
          className="grid gap-7 md:grid-cols-[0.82fr_1.18fr] md:items-end"
        >
          <div>
            <span className="eyebrow text-[#b8924a]">Galeria</span>
            <h2
              id="cinematic-gallery-title"
              className="mt-5 max-w-2xl text-4xl font-black leading-[1.02] md:text-6xl"
            >
              Detalhes que abrem o apetite
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-7 text-[#efe2c8]/78 md:justify-self-end md:text-lg">
            Cortes, brilho, textura e apresentação para escolher antes do
            primeiro pedido.
          </p>
        </Reveal>

        <div className="no-scrollbar -mr-3 mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto pr-3 md:mr-0 md:grid md:grid-cols-12 md:gap-4 md:overflow-visible md:pr-0">
          {koiFinalGallery.map((item, index) => (
            <Reveal
              key={item.src}
              threshold={0.12}
              delay={(index % 3) * 45}
              className={`relative aspect-[4/5] min-w-[86%] snap-center overflow-hidden rounded-lg border border-[#b8924a]/12 bg-[#16110d] md:min-w-0 ${
                index === 0 || index === 5
                  ? "md:col-span-5 md:aspect-[5/4]"
                  : "md:col-span-3 md:aspect-[3/4]"
              } ${index === 2 ? "md:col-span-4 md:aspect-[4/3]" : ""} ${
                index === 3 ? "md:col-span-4 md:aspect-[4/3]" : ""
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 767px) 86vw, (max-width: 1180px) 42vw, 470px"
                quality={82}
                loading="lazy"
                className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:scale-[1.025]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
