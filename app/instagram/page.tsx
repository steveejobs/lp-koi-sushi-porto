import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CHAMBAR_CONFIG, getWhatsappUrl } from "@/data/chambar-config";
import { logoMedia } from "@/data/chambar-media";
import { chambarTestimonials } from "@/data/chambar-testimonials";
import styles from "./instagram.module.css";

export const metadata: Metadata = {
  title: "Koi Sushi Porto | Links",
  description:
    "Peça Take Away, veja o menu, localização e Instagram do Koi Sushi Porto.",
};

const whatsappUrl = getWhatsappUrl("instagram");
const instagramUrl = CHAMBAR_CONFIG.instagramUrl;
const mapsUrl = CHAMBAR_CONFIG.googleMapsUrl;

const links = [
  {
    label: "Pedir Take Away",
    description: "Enviar o pedido pelo WhatsApp",
    href: whatsappUrl,
    external: true,
    primary: true,
  },
  {
    label: "Ver Menu",
    description: "Consultar o menu do Koi Sushi Porto",
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
            className={styles.brandMark}
            aria-label="Ir para o site do Koi Sushi Porto"
          >
            <Image
              src={logoMedia.src}
              alt="Koi Sushi Porto"
              width={116}
              height={116}
              priority
              className={styles.brandLogo}
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
            <span aria-hidden="true">★★★★★</span>
            4,9 no Google · 48 avaliações
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
          <figure className={styles.galleryItem}>
            <Image
              src="/assets/gallery/koi-sushi-porto-gallery-07.png"
              alt="Sushi fresco do Koi Sushi Porto"
              fill
              priority
              sizes="(max-width: 720px) calc(50vw - 24px), 314px"
              className={styles.galleryImage}
            />
          </figure>
          <figure className={styles.galleryItem}>
            <Image
              src="/assets/gallery/koi-sushi-porto-gallery-09.png"
              alt="Pratos do Koi Sushi Porto servidos à mesa"
              fill
              sizes="(max-width: 720px) calc(50vw - 24px), 314px"
              className={styles.galleryImage}
            />
          </figure>
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
              src="/assets/gallery/koi-sushi-porto-gallery-07.png"
              alt="Sushi fresco do Koi Sushi Porto"
              fill
              sizes="(max-width: 720px) calc(100vw - 48px), 632px"
              className={styles.coverImage}
            />
          </div>
        </section>

        <section
          className={styles.testimonials}
          aria-labelledby="testimonials-title"
        >
          <p className={styles.eyebrow}>Opiniões</p>
          <h2 id="testimonials-title">Conheça a experiência Koi.</h2>
          <p className={styles.reviewNote}>
            Avaliações reais de clientes do Koi Sushi Porto.
          </p>
          <div className={styles.reviewGrid}>
            {chambarTestimonials.slice(0, 3).map((testimonial) => (
              <article
                key={`${testimonial.name}-${testimonial.tag}`}
                className={styles.reviewCard}
              >
                <p aria-label="5 de 5 estrelas">★★★★★</p>
                <blockquote>“{testimonial.text}”</blockquote>
                <strong>{testimonial.name}</strong>
              </article>
            ))}
          </div>
          <div className={styles.reviewLinks}>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Avaliações no Google
              <ArrowIcon />
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Ver Instagram
              <ArrowIcon />
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          <strong>Koi Sushi Porto</strong>
          <address>
            {CHAMBAR_CONFIG.address}
          </address>
          <p>{CHAMBAR_CONFIG.openingHours}</p>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            @koisushi_porto
          </a>
        </footer>
      </div>
    </main>
  );
}
