import Image from "next/image";
import { SocialIconLinks } from "@/components/SocialIconLinks";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  buildWhatsappLink,
  images,
  navLinks,
  whatsappMessages,
} from "@/lib/site";

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#c9a45c]/16 bg-[#0f0d0a]/90 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20 md:gap-6">
        <a
          href="#topo"
          className="flex shrink-0 items-center gap-3"
          aria-label="Koi Sushi Porto"
        >
          <Image
            src={images.logo}
            alt="Koi Sushi Porto"
            width={180}
            height={80}
            priority
            className="h-auto max-h-12 w-[96px] max-w-[30vw] object-contain md:max-h-14 md:w-[120px]"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm font-bold text-[#efe2c8]/78 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#c9a45c]"
              target={isExternalLink(link.href) ? "_blank" : undefined}
              rel={isExternalLink(link.href) ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <SocialIconLinks className="hidden xl:flex" />

        <a
          href={buildWhatsappLink(whatsappMessages.order)}
          className="btn btn-primary hidden md:inline-flex"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pedir agora
        </a>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <a
            href={buildWhatsappLink(whatsappMessages.order)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/22 bg-[#16110d] text-[#fff8ed] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:text-[#25d366]"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com o Koi Sushi Porto pelo WhatsApp"
            title="WhatsApp"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={buildWhatsappLink(whatsappMessages.order)}
            className="btn btn-primary hidden min-h-10 w-auto px-4 text-xs sm:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir
          </a>
        </div>
      </div>
    </header>
  );
}
