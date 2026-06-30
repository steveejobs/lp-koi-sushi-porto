import Image from "next/image";
import { CHAMBAR_CONFIG } from "@/data/chambar-config";
import { establishmentImages } from "@/data/chambar-media";

const presencePoints = [
  {
    title: "Menu Infinity",
    text: "Coma à vontade no restaurante com sushi, pratos quentes e opções para partilhar.",
  },
  {
    title: "Cozinha chinesa",
    text: "Massas, arroz, entradas e pratos quentes preparados na hora.",
  },
  {
    title: "Take Away",
    text: "Escolha o menu, confirme as opções e envie o pedido pelo WhatsApp.",
  },
];

export function KoiEstablishmentSection() {
  const mainImage = establishmentImages[0];

  return (
    <section id="ambiente" className="section-pad koi-rice-paper">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-end">
          <div>
            <span className="eyebrow">Ambiente</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.02] text-neutral-950 md:text-6xl">
              Um espaço acolhedor no Porto.
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-7 text-neutral-600 md:justify-self-end md:text-lg">
            Restaurante preparado para Menu Infinity, All You Can Eat, sushi,
            pratos chineses, convívio e Take Away.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <figure className="image-soft relative min-h-[320px] overflow-hidden rounded-lg bg-neutral-950 md:min-h-[560px]">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              sizes="(max-width: 1024px) calc(100vw - 32px), 760px"
              quality={75}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/8 to-transparent" />
            <figcaption className="absolute bottom-5 left-5 right-5 max-w-md text-white">
              <span className="block h-1.5 w-10 rounded-full bg-[var(--chambar-red)]" />
              <p className="mt-4 text-2xl font-black leading-tight md:text-3xl">
                Sushi, cozinha chinesa e momentos para partilhar no Porto.
              </p>
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {presencePoints.map((point) => (
              <article
                key={point.title}
                className="fine-border rounded-lg bg-white p-5 shadow-sm"
              >
                <div className="mb-6 h-1.5 w-10 rounded-full bg-[var(--chambar-red)]" />
                <h3 className="text-xl font-black text-neutral-950">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm font-bold leading-6 text-neutral-600">
                  {point.text}
                </p>
              </article>
            ))}

            <article className="rounded-lg bg-[var(--chambar-black)] p-5 text-white shadow-[0_20px_42px_rgba(16,16,16,0.16)] sm:col-span-3 lg:col-span-1">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-white/58">
                Endereço
              </p>
              <p className="mt-3 text-base font-black leading-6">
                {CHAMBAR_CONFIG.address}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
