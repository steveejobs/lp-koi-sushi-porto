import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { chambarTestimonials } from "@/data/chambar-testimonials";
import styles from "./instagram.module.css";

export const metadata: Metadata = {
  title: "Koi Sushi Porto | Links",
  description:
    "Peça Take Away, veja o menu, localização e Instagram do Koi Sushi Porto.",
};

const phone = "351961176188";
const message =
  "Olá! Vim pelo Instagram e quero fazer um pedido de take-away. O meu pedido é:";
const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

const instagramUrl = "https://www.instagram.com/koisushi_porto/";
const mapsUrl = "https://maps.app.goo.gl/BWotay8Vg5dZYrJ36";

const gallery = [
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-08.png",
    alt: "Sushi fresco do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-03.png",
    alt: "Peças de sushi preparadas no Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-04.png",
    alt: "Pratos chineses preparados no Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-07.png",
    alt: "Seleção de sushi fresco do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-09.png",
    alt: "Combinado de sushi do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-05.png",
    alt: "Sushi e sashimi apresentados no Koi Sushi Porto",
  },
  {
    src: "/assets/establishment/koi-sushi-porto-interior-01.png",
    alt: "Ambiente do restaurante Koi Sushi Porto",
  },
  {
    src: "/assets/establishment/koi-sushi-porto-interior-02.png",
    alt: "Sala do restaurante Koi Sushi Porto",
  },
] as const;

const selectedNames = new Set([
  "Anny",
  "Carolina Castanho",
  "Teresa Sousa",
  "Daniela Andrade",
  "Diogo Silva",
  "Ane",
]);

const testimonials = chambarTestimonials.filter(({ name }) =>
  selectedNames.has(name),
);

const links = [
  {
    label: "Pedir Take Away",
    description: "Enviar o pedido pelo WhatsApp",
    href: whatsappUrl,
    external: true,
    primary: true,
  },
  {
    label: "Ver menu completo",
    description: "Consultar sushi, caixas e pratos quentes",
    href: "/#menu",
    external: false,
  },
  {
    label: "Ver localização",
    description: "Abrir a rota no Google Maps",
    href: mapsUrl,
    external: true,
  },
  {
    label: "Instagram",
    description: "Seguir @koisushi_porto",
    href: instagramUrl,
    external: true,
  },
  {
    label: "Site completo",
    description: "Conhecer o Koi Sushi Porto",
    href: "/",
    external: false,
  },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function InstagramPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Ir para o site do Koi Sushi Porto"
          >
            <Image
              src="/assets/logo/koi-sushi-porto-logo.png"
              alt="Logótipo oficial do Koi Sushi Porto"
              width={1254}
              height={1254}
              priority
              sizes="132px"
              className={styles.logo}
            />
          </Link>
          <p className={styles.kicker}>Porto · Portugal</p>
          <h1>Koi Sushi Porto</h1>
          <p className={styles.lead}>
            Sushi, cozinha chinesa e Take Away no Porto.
          </p>
          <p className={styles.supporting}>
            Menu Infinity, All You Can Eat e pratos preparados na hora.
          </p>
          <p
            className={styles.rating}
            aria-label="4,9 em 5 no Google, com 48 avaliações"
          >
            <span aria-hidden="true">★★★★★</span> 4,9 no Google · 48 avaliações
          </p>
          <ul className={styles.tags} aria-label="Especialidades e horário">
            <li>Sushi</li>
            <li>Cozinha chinesa</li>
            <li>Take Away</li>
            <li>12h–15h | 19h–23h</li>
          </ul>
        </header>

        <section
          className={styles.gallery}
          aria-label="Galeria do Koi Sushi Porto"
        >
          {gallery.map((item, index) => (
            <figure key={item.src} className={styles.galleryItem}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes={
                  index === 0
                    ? "(max-width: 720px) calc(100vw - 32px), 648px"
                    : "(max-width: 720px) calc(50vw - 20px), 320px"
                }
                quality={index === 0 ? 82 : 75}
                className={styles.galleryImage}
              />
            </figure>
          ))}
        </section>

        <nav className={styles.linkList} aria-label="Links principais">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.linkCard} ${"primary" in link && link.primary ? styles.primaryLink : ""}`}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              <span>
                <strong>{link.label}</strong>
                <small>{link.description}</small>
              </span>
              <ArrowIcon />
            </a>
          ))}
        </nav>

        <section className={styles.moment} aria-labelledby="moment-title">
          <div className={styles.momentCopy}>
            <p className={styles.eyebrow}>Koi Sushi Porto</p>
            <h2 id="moment-title">Antes de escolher o pedido.</h2>
            <p>
              Veja os pratos, confirme o menu e fale connosco pelo WhatsApp.
            </p>
          </div>
          <div className={styles.momentImage}>
            <Image
              src="/assets/hero/koi-sushi-porto-hero.png"
              alt="Sushi fresco apresentado no Koi Sushi Porto"
              fill
              loading="lazy"
              sizes="(max-width: 720px) calc(100vw - 56px), 620px"
              quality={82}
              className={styles.coverImage}
            />
          </div>
        </section>

        <section
          className={styles.testimonials}
          aria-labelledby="testimonials-title"
        >
          <p className={styles.eyebrow}>Avaliações Google</p>
          <h2 id="testimonials-title">Quem já veio, recomenda.</h2>
          <p className={styles.sectionIntro}>
            Avaliações reais sobre frescura, atendimento, preço justo e
            apresentação.
          </p>
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className={styles.testimonialCard}
              >
                <span className={styles.stars} aria-label="5 em 5 estrelas">
                  ★★★★★
                </span>
                <blockquote>“{testimonial.text}”</blockquote>
                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.tag}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <Image
            src="/assets/logo/koi-sushi-porto-logo.png"
            alt=""
            width={1254}
            height={1254}
            loading="lazy"
            sizes="72px"
          />
          <div>
            <strong>Koi Sushi Porto</strong>
            <address>Estrada Exterior da Circunvalação, 7824-F, Porto</address>
            <p>12h–15h | 19h–23h</p>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              @koisushi_porto
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
