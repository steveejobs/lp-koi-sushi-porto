import type { Metadata } from "next";
import Image from "next/image";
import { InstagramMediaMarquee } from "@/components/InstagramMediaMarquee";
import { InstagramTestimonialsMarquee } from "@/components/InstagramTestimonialsMarquee";
import { InstagramVideoMoment } from "@/components/InstagramVideoMoment";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  CHAMBAR_CONFIG,
  chambarGoogleProof,
  chambarWhatsAppMessages,
} from "@/data/chambar-config";
import { chambarReviews } from "@/data/chambar-reviews";
import {
  instagramFoodGalleryMedia,
  logoMedia,
  scrollExperienceMedia,
} from "@/data/chambar-media";
import {
  DELIVERY_URL,
  FULL_SITE_URL,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  OPENING_HOURS,
  createWhatsAppLink,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(FULL_SITE_URL),
  title: "Chambar Sushi & Frutos do Mar | Links",
  description:
    "Peça delivery, fale pelo WhatsApp e acompanhe o Chambar Sushi & Frutos do Mar em Araguaína.",
  openGraph: {
    title: "Chambar Sushi & Frutos do Mar | Links",
    description:
      "Delivery, WhatsApp, Instagram e site completo do Chambar em Araguaína.",
    url: "/instagram",
    images: [
      {
        url: "/chambar/og-chambar.jpg",
        width: 1600,
        height: 900,
        alt: "Chambar Sushi & Frutos do Mar",
      },
    ],
  },
};

const whatsappLinks = {
  reservation: createWhatsAppLink(chambarWhatsAppMessages.reservation),
  information: createWhatsAppLink(chambarWhatsAppMessages.information),
};

const nightOptions = ["Sushi", "Frutos do mar", "18h às 23h"];
const instagramTestimonials = chambarReviews.slice(0, 8);

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M13.2 5.25 20 12l-6.8 6.75-1.35-1.35 4.45-4.45H4v-1.9h12.3L11.85 6.6l1.35-1.35Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconBag() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M7.2 8V6.9a4.8 4.8 0 0 1 9.6 0V8h2.05l.85 12H4.3l.85-12H7.2Zm1.9 0h5.8V6.9a2.9 2.9 0 0 0-5.8 0V8Zm-2.18 1.8-.59 8.4h11.34l-.59-8.4H16.8v2.05h-1.9V9.8H9.1v2.05H7.2V9.8h-.28Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkButton({
  href,
  children,
  icon,
  primary = false,
  delay,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  primary?: boolean;
  delay: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`ig-rise flex min-h-[56px] items-center justify-between gap-4 rounded-[18px] border px-5 text-[0.95rem] font-black transition active:scale-[0.985] ${
        primary
          ? "border-neutral-950 bg-neutral-950 text-white shadow-[0_16px_34px_rgba(16,16,16,0.16)]"
          : "border-black/10 bg-white text-neutral-950 shadow-[0_10px_26px_rgba(16,16,16,0.05)]"
      }`}
      style={{ "--ig-delay": `${delay}ms` } as React.CSSProperties}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            primary
              ? "bg-white/12 text-white"
              : "bg-[#fff4ec] text-[var(--chambar-red)]"
          }`}
        >
          {icon}
        </span>
        {children}
      </span>
      <IconArrow />
    </a>
  );
}

export default function InstagramLinksPage() {
  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top,rgba(196,30,47,0.08),transparent_30%),linear-gradient(180deg,#fffdf9,#f8f0e7)] px-4 py-5 text-neutral-950 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[460px] overflow-hidden rounded-[28px] border border-black/8 bg-[#fffdf9]/92 px-4 py-5 shadow-[0_24px_70px_rgba(16,16,16,0.1)] backdrop-blur sm:px-5">
        <header className="ig-rise text-center">
          <Image
            src={logoMedia.src}
            alt={logoMedia.alt}
            width={210}
            height={82}
            className="mx-auto h-auto w-[172px] object-contain"
          />
          <h1 className="mt-4 text-2xl font-black leading-tight">
            Chambar Sushi & Frutos do Mar
          </h1>
          <p className="mx-auto mt-2 max-w-[19rem] text-[1.68rem] font-black leading-[1.04]">
            Não é só sushi. É nível Chambar.
          </p>
          <p className="mx-auto mt-3 max-w-[20rem] text-sm font-bold leading-6 text-neutral-600">
            Sushi, frutos do mar e uma noite feita para virar experiência em
            Araguaína.
          </p>
          <p className="mt-4 inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-black text-neutral-900 shadow-[0_10px_22px_rgba(16,16,16,0.04)]">
            <span className="mr-2 text-[var(--chambar-red)]">★★★★★</span>
            {CHAMBAR_CONFIG.googleRating} no Google ·{" "}
            {CHAMBAR_CONFIG.googleReviews} avaliações
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {nightOptions.map((option) => (
              <span
                key={option}
                className="rounded-full border border-black/10 bg-white/78 px-3 py-1.5 text-[0.68rem] font-black uppercase text-neutral-700"
              >
                {option}
              </span>
            ))}
          </div>
        </header>

        <InstagramMediaMarquee media={instagramFoodGalleryMedia} />

        <nav className="mt-5 grid gap-3" aria-label="Links principais">
          <LinkButton
            href={DELIVERY_URL}
            icon={<IconBag />}
            primary
            delay={150}
          >
            Pedir delivery
          </LinkButton>
          <LinkButton
            href={whatsappLinks.reservation}
            icon={<WhatsAppIcon className="h-5 w-5" />}
            delay={220}
          >
            Chamar no WhatsApp
          </LinkButton>
          <LinkButton href={INSTAGRAM_URL} icon={<IconInstagram />} delay={290}>
            Instagram
          </LinkButton>
          <LinkButton href={FULL_SITE_URL} icon={<IconArrow />} delay={360}>
            Site completo
          </LinkButton>
        </nav>

        <InstagramVideoMoment
          videoSrc={scrollExperienceMedia.mobileVideo}
          posterSrc={scrollExperienceMedia.background.src}
        />

        <InstagramTestimonialsMarquee reviews={instagramTestimonials} />

        <section
          className="ig-rise mt-5 rounded-[24px] bg-[var(--chambar-black)] p-4 text-white shadow-[0_14px_34px_rgba(16,16,16,0.12)]"
          style={{ "--ig-delay": "640ms" } as React.CSSProperties}
        >
          <h2 className="text-2xl font-black leading-tight">
            Estamos em Araguaína.
          </h2>
          <div className="mt-3 space-y-2 text-sm font-bold leading-6 text-white/72">
            <p>{chambarGoogleProof}</p>
            <p>{OPENING_HOURS}</p>
            <p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="text-white underline decoration-[var(--chambar-red)] decoration-2 underline-offset-4"
              >
                {CHAMBAR_CONFIG.address}
              </a>
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={DELIVERY_URL}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white text-sm font-black text-neutral-950 active:scale-[0.985]"
            >
              <IconBag />
              Delivery
            </a>
            <a
              href={whatsappLinks.information}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--chambar-red)] text-sm font-black text-white active:scale-[0.985]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </section>

        <footer className="ig-rise mt-5 pb-1 text-center text-xs font-black text-neutral-500">
          <p>Chambar Sushi & Frutos do Mar · Araguaína - TO</p>
        </footer>
      </div>
    </main>
  );
}
