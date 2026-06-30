import Image from "next/image";
import { KoiEstablishmentSection } from "@/components/chambar/KoiEstablishmentSection";
import { KoiTestimonialsMarquee } from "@/components/chambar/KoiTestimonialsMarquee";
import { MenuTakeAwaySection } from "@/components/MenuTakeAwaySection";
import { FoodGallerySection } from "@/components/FoodGallerySection";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { ScrollExperienceFeature } from "@/components/ScrollExperienceFeature";
import { SectionIntro } from "@/components/SectionIntro";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import { CHAMBAR_CONFIG, chambarGoogleProof } from "@/data/chambar-config";
import {
  genericGalleryImages,
  heroImage,
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

const introCards = [
  {
    title: "Menu Infinity",
    text: "Coma à vontade no restaurante.",
  },
  {
    title: "Cozinha chinesa",
    text: "Pratos quentes, massas, arroz e entradas.",
  },
  {
    title: "Take Away",
    text: "Veja o menu completo e peça pelo WhatsApp.",
  },
];

const chineseCuisineCards = [
  {
    title: "Entradas",
    text: "Opções para começar a refeição e partilhar à mesa.",
  },
  {
    title: "Massas",
    text: "Pratos quentes preparados na hora.",
  },
  {
    title: "Arroz",
    text: "Acompanhamentos e combinações para completar o pedido.",
  },
  {
    title: "Pratos quentes",
    text: "Sabores de cozinha chinesa para comer no restaurante ou levar.",
  },
];

const heroChips = ["Menu Infinity", "Cozinha chinesa", "Take Away"];

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
        <section className="relative isolate border-b border-black/10 bg-[#fffdf9] py-8 md:py-12">
          <div className="absolute inset-y-0 right-0 hidden w-[46%] overflow-hidden md:block">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              quality={82}
              fetchPriority="high"
              sizes="46vw"
              className="object-cover object-[58%_50%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#fffdf9_0%,rgba(255,253,249,0.82)_25%,rgba(255,253,249,0.22)_58%,rgba(255,253,249,0.02)_100%)]" />
          </div>

          <div className="container-page grid items-center gap-8 md:min-h-[calc(78svh-80px)] md:grid-cols-[0.72fr_0.28fr]">
            <div className="relative z-10 animate-[riseIn_700ms_ease_both]">
              <Image
                src={images.logo}
                alt="Logo Koi Sushi Porto"
                width={168}
                height={72}
                loading="eager"
                decoding="async"
                className="mb-6 h-auto w-[132px] object-contain md:w-[160px]"
              />
              <span className="eyebrow">Koi Sushi Porto</span>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] text-neutral-950 md:text-7xl">
                Sushi e cozinha chinesa no Porto
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600 md:text-xl">
                Menu Infinity, All You Can Eat e Take Away com sushi, pratos
                chineses e tudo preparado na hora.
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
              <div className="mt-7 flex flex-wrap items-center gap-2">
                {heroChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-black/10 bg-white/82 px-4 py-2 text-xs font-black uppercase tracking-wide text-neutral-800 shadow-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="koi-rice-paper border-b border-black/8 py-8 md:py-10">
          <div className="container-page">
            <Reveal threshold={0.42} className="max-w-3xl">
              <p className="text-sm font-black text-[var(--chambar-red)]">
                KOI SUSHI PORTO
              </p>
              <h2 className="mt-3 text-3xl font-black leading-[1.04] text-neutral-950 md:text-5xl">
                Sushi, cozinha chinesa e momentos à mesa.
              </h2>
              <p className="mt-4 max-w-2xl text-base font-bold leading-7 text-neutral-600 md:text-lg">
                No Koi Sushi Porto, pode comer à vontade com Menu Infinity,
                escolher pratos chineses preparados na hora ou pedir Take Away
                pelo WhatsApp.
              </p>
            </Reveal>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {introCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 90} threshold={0.24}>
                  <article className="koi-chinese-panel koi-lattice-bg h-full rounded-lg p-5">
                    <div className="koi-gold-divider mb-6" />
                    <h3 className="relative z-10 text-xl font-black">
                      {card.title}
                    </h3>
                    <p className="relative z-10 mt-3 text-sm font-bold leading-6 text-white/72">
                      {card.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <MenuTakeAwaySection />

        <section className="section-pad koi-chinese-panel koi-lattice-bg">
          <div className="container-page relative z-10">
            <Reveal threshold={0.42} className="max-w-3xl">
              <span className="eyebrow text-[var(--koi-gold)]">
                Cozinha chinesa
              </span>
              <h2 className="mt-5 text-4xl font-black leading-[1.04] text-white md:text-6xl">
                Cozinha chinesa preparada na hora.
              </h2>
              <div className="koi-gold-divider my-6" />
              <p className="max-w-2xl text-base font-bold leading-7 text-white/72 md:text-lg">
                Pratos quentes, entradas, massas e arroz para completar a
                refeição no restaurante ou no Take Away.
              </p>
            </Reveal>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {chineseCuisineCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 80} threshold={0.22}>
                  <article className="h-full rounded-lg border border-white/12 bg-white/7 p-5 backdrop-blur">
                    <span className="koi-red-seal h-8 px-3 text-[0.68rem] font-black uppercase tracking-wide">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-xl font-black text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-white/68">
                      {card.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FoodGallerySection
          id="galeria-generica"
          eyebrow="Galeria"
          title="Sushi, wok e pratos para partilhar."
          copy="Veja sushi, pratos chineses e detalhes do Koi antes de pedir."
          images={genericGalleryImages}
          categories={[
            "Sushi",
            "Cozinha chinesa",
            "Pratos quentes",
            "Take Away",
          ]}
          backgroundClassName="bg-[#f7f2ec]"
        />

        <ScrollExperienceFeature />

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
                Peças de sushi e pratos chineses preparados na hora.
              </p>
              <p className="mt-4 max-w-md text-sm font-bold leading-6 text-neutral-600 md:mt-0">
                Escolha o que lhe apetece e faça o seu pedido de Take Away pelo
                WhatsApp.
              </p>
            </div>
          </div>
        </section>

        <FoodGallerySection
          id="pratos-local"
          eyebrow="À mesa"
          title="Da cozinha para a mesa."
          copy="Peças de sushi e pratos chineses preparados na hora."
          images={localDishGalleryImages}
          categories={[
            "Sushi",
            "Pratos chineses",
            "Pratos quentes",
            "Mesa Koi",
          ]}
          backgroundClassName="bg-white"
        />

        <section className="section-pad koi-rice-paper">
          <div className="container-page">
            <Reveal threshold={0.45}>
              <SectionIntro
                eyebrow="Diferenciais"
                title="Porquê escolher o Koi."
                copy="Sushi, cozinha chinesa, pratos quentes e Take Away com variedade, sabor e preço justo."
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
