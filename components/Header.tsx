import Image from "next/image";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  buildWhatsappLink,
  images,
  navLinks,
  whatsappMessages,
} from "@/lib/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/86 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20 md:gap-6">
        <a
          href="#topo"
          className="flex shrink-0 items-center gap-3"
          aria-label="Chambar Sushi & Frutos do Mar"
        >
          <Image
            src={images.logo}
            alt="Logo Koi Sushi Porto"
            width={190}
            height={64}
            priority
            className="h-auto max-h-11 w-[128px] max-w-[38vw] object-contain md:max-h-14 md:w-[164px] lg:w-[172px]"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm font-bold text-neutral-700 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-red-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <SocialIconLinks className="hidden xl:flex" />

        <a
          href={buildWhatsappLink(whatsappMessages.headerReservation)}
          className="btn btn-primary hidden md:inline-flex"
          target="_blank"
          rel="noreferrer"
        >
          Reservar
        </a>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <a
            href={buildWhatsappLink(whatsappMessages.headerReservation)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-900 shadow-[0_10px_24px_rgba(16,16,16,0.06)] transition hover:text-[#188f45]"
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com o Chambar pelo WhatsApp"
            title="WhatsApp"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={buildWhatsappLink(whatsappMessages.headerReservation)}
            className="btn btn-primary min-h-10 w-auto px-4 text-xs"
            target="_blank"
            rel="noreferrer"
          >
            Reservar
          </a>
        </div>
      </div>
    </header>
  );
}
