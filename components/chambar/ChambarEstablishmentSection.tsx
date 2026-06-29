import Image from "next/image";
import { CHAMBAR_CONFIG } from "@/data/chambar-config";
import { koiEstablishmentGallery } from "@/data/chambar-media";
import { GOOGLE_MAPS_URL } from "@/lib/site";

const presencePoints = [
  {
    title: "Menu completo",
    text: "Sushi, cozinha chinesa, pratos quentes e combinações para partilhar.",
  },
  {
    title: "Sala acolhedora",
    text: "Madeira escura, luz quente e detalhes vermelhos para uma refeição sem pressa.",
  },
  {
    title: "Take Away direto",
    text: "Escolha as opções da ementa e envie o pedido pelo WhatsApp.",
  },
];

export function ChambarEstablishmentSection() {
  const mainImage = koiEstablishmentGallery[0];

  return (
    <section id="ambiente" className="section-pad bg-[#16110d] text-[#fff8ed]">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-end">
          <div>
            <span className="eyebrow text-[#c9a45c]">Ambiente</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.02] md:text-6xl">
              Koi Sushi Porto
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-7 text-[#efe2c8]/78 md:justify-self-end md:text-lg">
            Um restaurante para comer no local, escolher o Menu Infinity ou levar
            sushi e pratos chineses para casa.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <figure className="image-soft relative min-h-[320px] overflow-hidden rounded-lg bg-neutral-950 md:min-h-[560px]">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 64vw"
              quality={86}
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <figcaption className="absolute bottom-5 left-5 right-5 max-w-md text-white">
              <span className="block h-1.5 w-10 rounded-full bg-[#c92127]" />
              <p className="mt-4 text-2xl font-black leading-tight md:text-3xl">
                Sushi japonês e cozinha chinesa num ambiente escuro, quente e
                gastronómico.
              </p>
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {presencePoints.map((point) => (
              <article
                key={point.title}
                className="rounded-lg border border-[#c9a45c]/16 bg-[#0f0d0a] p-5 shadow-sm"
              >
                <div className="mb-6 h-1.5 w-10 rounded-full bg-[#c92127]" />
                <h3 className="text-xl font-black">{point.title}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-[#efe2c8]/76">
                  {point.text}
                </p>
              </article>
            ))}

            <article className="rounded-lg bg-[#c92127] p-5 text-white shadow-[0_20px_42px_rgba(0,0,0,0.22)] sm:col-span-3 lg:col-span-1">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-white/70">
                Endereço
              </p>
              <p className="mt-3 text-base font-black leading-6">
                {CHAMBAR_CONFIG.address}
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex text-sm font-black underline underline-offset-4"
              >
                Ver rota
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
