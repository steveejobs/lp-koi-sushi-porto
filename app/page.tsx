import Image from "next/image";
import { CinematicGallerySection } from "@/components/CinematicGallerySection";
import { ChambarEstablishmentSection } from "@/components/chambar/ChambarEstablishmentSection";
import { ChambarTestimonialsMarquee } from "@/components/chambar/ChambarTestimonialsMarquee";
import { FoodGallerySection } from "@/components/FoodGallerySection";
import { Header } from "@/components/Header";
import { HeroInteractiveIntro } from "@/components/HeroInteractiveIntro";
import { MenuTakeAwaySection } from "@/components/MenuTakeAwaySection";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import { TableVisualSection } from "@/components/TableVisualSection";
import { CHAMBAR_CONFIG, chambarGoogleProof } from "@/data/chambar-config";
import {
  foodGallery,
  heroImages,
  locationImage,
} from "@/data/chambar-media";
import {
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  buildWhatsappLink,
  images,
  navLinks,
} from "@/lib/site";

const highlights = [
  {
    title: "Menu Infinity",
    text: "Coma à vontade no restaurante com sushi, pratos quentes e opções para partilhar.",
  },
  {
    title: "Take Away",
    text: "Escolha as opções do menu, confirme os números e envie o pedido pelo WhatsApp.",
  },
  {
    title: "Cozinha chinesa",
    text: "Pratos quentes preparados na hora para acompanhar o sushi ou completar a refeição.",
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="topo" className="overflow-hidden bg-[#0f0d0a] pt-16 md:pt-20">
        <HeroInteractiveIntro />

        <section className="relative border-b border-[#b8924a]/12 bg-[#0f0d0a] py-10 text-[#fff8ed] md:min-h-[calc(100svh-80px)] md:py-16">
          <div className="absolute left-[-72px] top-20 hidden h-40 w-40 rounded-full border border-[#a91f24]/14 md:left-10 md:block md:h-64 md:w-64" />
          <div className="absolute right-[-80px] top-24 hidden h-44 w-44 rounded-full bg-[#a91f24]/6 md:right-12 md:block md:h-72 md:w-72" />

          <div className="container-page grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative z-10 animate-[riseIn_700ms_ease_both]">
              <Image
                src={images.logo}
                alt="Koi Sushi Porto"
                width={168}
                height={72}
                priority
                className="mb-6 hidden h-auto w-[118px] object-contain md:block md:w-[142px]"
              />
              <span className="eyebrow text-[#b8924a]">{CHAMBAR_CONFIG.city}</span>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.04] text-[#fff8ed] sm:text-5xl md:text-7xl">
                Sushi e cozinha chinesa no Porto
              </h1>
              <p className="mt-5 max-w-[20rem] text-base leading-7 text-[#efe2c8]/82 sm:max-w-lg md:text-xl md:leading-8">
                Menu Infinity, All You Can Eat e Take Away com peças frescas,
                pratos quentes e combinações para partilhar.
              </p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-[#b8924a]">
                Koi Sushi Porto · {CHAMBAR_CONFIG.openingHours}
              </p>
              <p className="mt-4 text-sm font-black text-[#efe2c8]/78">
                {chambarGoogleProof}
              </p>
              <div className="mt-8 grid gap-3 sm:flex">
                <a
                  href={buildWhatsappLink()}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pedir Take Away
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver localização
                </a>
              </div>
            </div>

            <div className="relative hidden min-h-[520px] overflow-hidden rounded-lg border border-[#b8924a]/16 bg-[#16110d] md:block">
              <Image
                src={heroImages[1].src}
                alt={heroImages[1].alt}
                fill
                sizes="(max-width: 1280px) 48vw, 560px"
                quality={86}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/8 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-[#b8924a]/16 bg-[#0f0d0a]/84 p-5">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#b8924a]">
                  Restaurante · Take Away
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {CHAMBAR_CONFIG.openingHours}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-[#16110d] py-5 text-[#fff8ed]"
          aria-label="Instagram do Koi Sushi Porto"
        >
          <div className="container-page grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-[#b8924a]/16 bg-[#0f0d0a] px-4 py-3 text-sm font-black">
              Segue-nos no Instagram
            </div>
            <div className="rounded-lg border border-[#b8924a]/16 bg-[#0f0d0a] px-4 py-3 text-sm font-bold text-[#efe2c8]/80">
              Novidades, pratos e bastidores do Koi Sushi Porto
            </div>
            <div className="rounded-lg border border-[#b8924a]/16 bg-[#0f0d0a] px-4 py-3 text-sm font-black text-[#b8924a]">
              @koisushi_porto
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#b8924a]/24 bg-[#a91f24] px-4 py-3 text-center text-sm font-black text-white transition-colors hover:bg-[#8f1a1f]"
            >
              Ver Instagram
            </a>
          </div>
        </section>

        <section className="section-pad bg-[#0f0d0a] text-[#fff8ed]">
          <div className="container-page grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <Reveal threshold={0.42}>
              <span className="eyebrow text-[#b8924a]">Sobre</span>
              <h2 className="mt-5 text-4xl font-black leading-[1.04] md:text-6xl">
                Koi Sushi Porto
              </h2>
            </Reveal>
            <Reveal threshold={0.36} delay={80}>
              <p className="text-lg font-semibold leading-8 text-[#efe2c8]/84">
                No Koi Sushi Porto, o sushi japonês encontra a cozinha chinesa
                num menu pensado para quem procura variedade, frescura e uma
                refeição completa. Escolha o Menu Infinity para comer à vontade
                no restaurante ou peça Take Away para levar o sabor do Koi para
                casa.
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {highlights.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-lg border border-[#b8924a]/14 bg-[#16110d] p-5"
                  >
                    <div className="mb-5 h-1.5 w-10 rounded-full bg-[#a91f24]" />
                    <h3 className="text-xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-[#efe2c8]/72">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <MenuTakeAwaySection />

        <TableVisualSection />

        <FoodGallerySection
          id="galeria"
          eyebrow="Galeria"
          title="Pratos do Koi"
          copy="Sushi fresco, peças especiais e pratos quentes preparados na hora."
          images={foodGallery}
          categories={["Sushi", "Peças especiais", "Cozinha chinesa", "Pratos quentes"]}
          backgroundClassName="bg-[#efe2c8]"
        />

        <ChambarEstablishmentSection />

        <CinematicGallerySection />

        <ChambarTestimonialsMarquee />

        <section id="localizacao" className="section-pad bg-[#0f0d0a] text-[#fff8ed]">
          <Reveal
            threshold={0.42}
            className="container-page grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center"
          >
            <div>
              <SectionIntro
                eyebrow="Localização"
                title="Estamos no Porto."
                copy="Venha ao restaurante, veja a rota no Google Maps ou envie o seu pedido de Take Away pelo WhatsApp."
                light
              />
              <div className="mt-7 space-y-4 text-base leading-7 text-[#efe2c8]/82">
                <p>
                  <strong className="text-[#fff8ed]">Endereço:</strong>{" "}
                  {CHAMBAR_CONFIG.address}
                </p>
                <p>
                  <strong className="text-[#fff8ed]">Horário:</strong>{" "}
                  {CHAMBAR_CONFIG.openingHours}
                </p>
                <p>
                  <strong className="text-[#fff8ed]">WhatsApp:</strong>{" "}
                  {CHAMBAR_CONFIG.phoneRaw}
                </p>
                <p>
                  <strong className="text-[#fff8ed]">Instagram:</strong>{" "}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#b8924a]"
                  >
                    {CHAMBAR_CONFIG.instagramHandle}
                  </a>
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:flex">
                <a
                  href={buildWhatsappLink()}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pedir pelo WhatsApp
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver rota
                </a>
                <a
                  href={INSTAGRAM_URL}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="relative h-[300px] w-full overflow-hidden rounded-lg border border-[#b8924a]/16 bg-neutral-900 shadow-[0_22px_60px_rgba(0,0,0,0.24)] md:h-auto md:min-h-[460px]">
              <Image
                src={locationImage.src}
                alt={locationImage.alt}
                fill
                sizes="(max-width: 768px) 92vw, 48vw"
                loading="lazy"
                quality={86}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/56 via-black/6 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-[#b8924a]/16 bg-[#0f0d0a]/88 p-4 shadow-lg">
                <p className="text-sm font-black text-white">Koi Sushi Porto</p>
                <p className="mt-1 text-xs font-bold text-[#efe2c8]/72">
                  Estrada Exterior da Circunvalação · {CHAMBAR_CONFIG.openingHours}
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-[#b8924a]/14 bg-[#0b0907] py-10 text-[#fff8ed]">
        <Reveal
          threshold={0.35}
          className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-4">
            <Image
              src={images.logo}
              alt=""
              width={170}
              height={76}
              className="h-auto w-[104px] object-contain md:w-[122px]"
            />
            <div className="text-sm font-bold leading-6 text-[#efe2c8]/76">
              <p className="font-black text-[#fff8ed]">Koi Sushi Porto</p>
              <p>{CHAMBAR_CONFIG.address}</p>
              <p>Horário: {CHAMBAR_CONFIG.openingHours}</p>
              <p>WhatsApp: {CHAMBAR_CONFIG.phoneRaw}</p>
              <p>Instagram: {CHAMBAR_CONFIG.instagramHandle}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-[#efe2c8]/72">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#b8924a]"
                target={isExternalLink(link.href) ? "_blank" : undefined}
                rel={isExternalLink(link.href) ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
            <SocialIconLinks />
          </div>
        </Reveal>
      </footer>
    </>
  );
}
