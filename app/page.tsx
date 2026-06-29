import Image from "next/image";
import { KoiEstablishmentSection } from "@/components/chambar/KoiEstablishmentSection";
import { KoiTestimonialsMarquee } from "@/components/chambar/KoiTestimonialsMarquee";
import { FoodGallerySection } from "@/components/FoodGallerySection";
import { Header } from "@/components/Header";
import { HeroInteractiveIntro } from "@/components/HeroInteractiveIntro";
import { HeroMotionPlaceholder } from "@/components/HeroMotionPlaceholder";
import { Reveal } from "@/components/Reveal";
import { ScrollExperienceFeature } from "@/components/ScrollExperienceFeature";
import { SectionIntro } from "@/components/SectionIntro";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import { CHAMBAR_CONFIG, chambarGoogleProof } from "@/data/chambar-config";
import {
  genericGalleryImages,
  localDishGalleryImages,
  locationImage,
} from "@/data/chambar-media";
import {
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  TAKE_AWAY_URL,
  getWhatsappUrl,
  images,
  navLinks,
} from "@/lib/site";

const experiences = [
  {
    title: "Take Away",
    text: "Envie o pedido pelo WhatsApp e confirme as opções disponíveis.",
    cta: "Pedir Take Away",
    href: TAKE_AWAY_URL,
  },
  {
    title: "Instagram",
    text: "Acompanhe novidades, pratos e bastidores do Koi Sushi Porto.",
    cta: "Ver Instagram",
    href: INSTAGRAM_URL,
  },
  {
    title: "No restaurante",
    text: "Estamos na Estrada Exterior da Circunvalação, no Porto.",
    cta: "Ver localização",
    href: GOOGLE_MAPS_URL,
  },
];

const differentials = [
  {
    title: "Menu Infinity",
    text: "Coma à vontade no restaurante com sushi, pratos quentes e opções para partilhar.",
  },
  {
    title: "Cozinha chinesa",
    text: "Pratos quentes, entradas, massas e arroz para completar a refeição.",
  },
  {
    title: "Take Away",
    text: "Escolha as opções do menu e envie o pedido directamente pelo WhatsApp.",
  },
  {
    title: "Almoço e jantar",
    text: "Estamos abertos das 12h às 15h e das 19h às 23h.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="topo" className="overflow-hidden pt-16 md:pt-20">
        <HeroInteractiveIntro />

        <section className="relative border-b border-black/10 bg-[#fffdf9] py-10 md:min-h-[calc(100svh-80px)] md:py-16">
          <div className="absolute left-[-72px] top-20 h-40 w-40 rounded-full border border-red-700/15 md:left-10 md:h-64 md:w-64" />
          <div className="absolute right-[-80px] top-24 h-44 w-44 rounded-full bg-[var(--chambar-red)]/8 md:right-12 md:h-72 md:w-72" />

          <div className="container-page grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative z-10 animate-[riseIn_700ms_ease_both]">
              <Image
                src={images.logo}
                alt="Logo Koi Sushi Porto"
                width={168}
                height={72}
                loading="lazy"
                decoding="async"
                className="mb-6 hidden h-auto w-[132px] object-contain md:block md:w-[160px]"
              />
              <span className="eyebrow">Koi Sushi Porto</span>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] text-neutral-950 md:text-7xl">
                Sushi e cozinha chinesa no Porto
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600 md:text-xl">
                Menu Infinity, All You Can Eat e Take Away com peças frescas,
                pratos quentes e combinações para partilhar.
              </p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-neutral-700">
                Koi Sushi Porto · {CHAMBAR_CONFIG.openingHours}
              </p>
              <p className="mt-4 text-sm font-black text-[var(--chambar-red)]">
                {chambarGoogleProof}
              </p>
              <div className="mt-8 grid gap-3 sm:flex">
                <a
                  href={TAKE_AWAY_URL}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pedir Take Away
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver localização
                </a>
              </div>
              <div className="mt-9 flex items-center gap-4 border-l-2 border-[var(--chambar-red)] pl-4 text-sm font-bold text-neutral-700">
                <span className="h-3 w-3 rounded-full bg-[var(--chambar-red)]" />
                <span>Menu Infinity · All You Can Eat · Take Away</span>
              </div>
            </div>

            <div className="hidden md:block">
              <HeroMotionPlaceholder />
            </div>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="container-page">
            <Reveal threshold={0.42} className="max-w-3xl">
              <p className="text-sm font-black text-[var(--chambar-red)]">
                KOI SUSHI PORTO
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl">
                Sushi japonês e cozinha chinesa à mesa.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-neutral-600 md:text-lg">
                No Koi Sushi Porto, encontra sushi fresco, pratos quentes e
                opções para partilhar. Escolha o Menu Infinity para comer à
                vontade no restaurante ou peça Take Away pelo WhatsApp.
              </p>
            </Reveal>
          </div>
        </section>

        <ScrollExperienceFeature />

        <FoodGallerySection
          id="pratos-local"
          eyebrow="À mesa"
          title="Pratos do Koi"
          copy="Sushi fresco, peças especiais e pratos quentes preparados na hora."
          images={localDishGalleryImages}
          categories={[
            "Sushi",
            "Peças especiais",
            "Pratos quentes",
            "Mesa Koi",
          ]}
          backgroundClassName="bg-white"
        />

        <KoiEstablishmentSection />

        <section id="experiencias" className="section-pad bg-[#fffdf9]">
          <div className="container-page">
            <Reveal threshold={0.45}>
              <SectionIntro
                eyebrow="Pedidos"
                title="O seu pedido começa aqui."
                copy="Menu Infinity no restaurante, Take Away pelo WhatsApp ou uma visita ao Koi Sushi Porto."
              />
            </Reveal>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {experiences.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 90}
                  threshold={0.22}
                  className="h-full"
                >
                  <article className="fine-border group h-full rounded-lg bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-8 h-px w-16 bg-[var(--chambar-red)] transition-all duration-500 group-hover:w-24" />
                    <h3 className="text-2xl font-black text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 min-h-14 text-base leading-7 text-neutral-600">
                      {item.text}
                    </p>
                    <a
                      href={item.href}
                      className="btn btn-dark mt-6 w-full"
                      target={item.href.startsWith("#") ? undefined : "_blank"}
                      rel={item.href.startsWith("#") ? undefined : "noreferrer"}
                    >
                      {item.cta}
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container-page">
            <div className="fine-border rounded-lg bg-[#fffdf9] p-6 md:flex md:items-center md:justify-between md:gap-8">
              <p className="max-w-2xl text-2xl font-black leading-tight text-neutral-950">
                Sushi fresco, peças especiais e pratos quentes preparados na
                hora.
              </p>
              <p className="mt-4 max-w-md text-sm font-bold leading-6 text-neutral-600 md:mt-0">
                Escolha o que lhe apetece e faça o seu pedido de Take Away pelo
                WhatsApp.
              </p>
            </div>
          </div>
        </section>

        <FoodGallerySection
          id="galeria-generica"
          eyebrow="Galeria"
          title="Cortes, brilho e apetite."
          copy="Imagens para escolher antes do primeiro pedido."
          images={genericGalleryImages}
          categories={[
            "Sushi",
            "Cozinha chinesa",
            "Pratos quentes",
            "Peças especiais",
          ]}
          backgroundClassName="bg-[#f7f2ec]"
        />

        <section className="section-pad bg-white">
          <div className="container-page">
            <Reveal threshold={0.45}>
              <SectionIntro
                eyebrow="Diferenciais"
                title="Porquê escolher o Koi."
                copy="Sushi, cozinha chinesa e Take Away com variedade, frescura e preço justo."
              />
            </Reveal>
            <div className="mt-9 grid gap-4 md:grid-cols-4">
              {differentials.map((item, index) => (
                <Reveal key={item.title} delay={index * 80} threshold={0.2}>
                  <article className="fine-border h-full rounded-lg bg-[#fffdf9] p-5">
                    <div className="mb-6 h-2 w-10 rounded-full bg-[var(--chambar-red)]" />
                    <h3 className="text-xl font-black text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-neutral-600">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <KoiTestimonialsMarquee />

        <section id="localizacao" className="section-pad bg-white">
          <Reveal
            threshold={0.42}
            className="container-page grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center"
          >
            <div>
              <SectionIntro
                eyebrow="Localização"
                title="Estamos no Porto."
                copy="Peça Take Away, fale pelo WhatsApp ou acompanhe o Koi Sushi Porto no Instagram."
              />
              <div className="mt-7 space-y-4 text-base leading-7 text-neutral-700">
                <p>
                  <strong className="text-neutral-950">Endereço:</strong>{" "}
                  {CHAMBAR_CONFIG.address}
                </p>
                <p>
                  <strong className="text-neutral-950">Horário:</strong>{" "}
                  {CHAMBAR_CONFIG.openingHours}
                </p>
                <p>
                  <strong className="text-neutral-950">WhatsApp:</strong>{" "}
                  <a
                    href={getWhatsappUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[var(--chambar-red)]"
                  >
                    {CHAMBAR_CONFIG.phoneRaw}
                  </a>
                </p>
                <p>
                  <strong className="text-neutral-950">Instagram:</strong>{" "}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[var(--chambar-red)]"
                  >
                    {CHAMBAR_CONFIG.instagramHandle}
                  </a>
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:flex">
                <a
                  href={TAKE_AWAY_URL}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pedir Take Away
                </a>
                <a
                  href={INSTAGRAM_URL}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver Instagram
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver localização
                </a>
              </div>
            </div>

            <div className="relative h-[250px] w-full overflow-hidden rounded-[24px] border border-black/10 bg-neutral-900 shadow-[0_22px_60px_rgba(16,16,16,0.1)] md:h-auto md:min-h-[430px] md:rounded-lg">
              <Image
                src={locationImage.src}
                alt={locationImage.alt}
                fill
                sizes="(max-width: 768px) calc(100vw - 24px), 560px"
                loading="lazy"
                decoding="async"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/10 to-transparent" />
              <div className="absolute right-5 top-5 h-16 w-16 rounded-full bg-[var(--chambar-red)] shadow-[0_14px_40px_rgba(196,30,47,.26)] md:h-20 md:w-20" />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/92 p-4 shadow-lg backdrop-blur">
                <p className="text-sm font-black text-neutral-950">
                  Koi Sushi Porto
                </p>
                <p className="mt-1 text-xs font-bold text-neutral-600">
                  Porto · {CHAMBAR_CONFIG.openingHours}
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[var(--chambar-black)] py-10">
        <Reveal
          threshold={0.35}
          className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-4">
            <Image
              src={images.logo}
              alt="Logo Koi Sushi Porto"
              width={190}
              height={82}
              loading="lazy"
              decoding="async"
              className="h-auto w-[142px] object-contain md:w-[156px]"
            />
            <p className="text-sm font-black text-white/88">
              Koi Sushi Porto · Sushi, cozinha chinesa, Menu Infinity e Take
              Away no Porto. · Estrada Exterior da Circunvalação, 7824-F, Porto
              · 12h–15h | 19h–23h · @koisushi_porto
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-white/72">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[var(--chambar-red)]"
              >
                {link.label}
              </a>
            ))}
            <SocialIconLinks />
            <a
              href={TAKE_AWAY_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--chambar-red)]"
            >
              Pedir Take Away
            </a>
          </div>
        </Reveal>
      </footer>
    </>
  );
}
