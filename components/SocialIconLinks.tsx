import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { INSTAGRAM_URL, buildWhatsappLink, whatsappMessages } from "@/lib/site";

type SocialIconLinksProps = {
  className?: string;
};

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
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

export function SocialIconLinks({ className = "" }: SocialIconLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Instagram do Chambar"
        title="Instagram"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 transition hover:-translate-y-0.5 hover:border-[var(--chambar-red)] hover:text-[var(--chambar-red)]"
      >
        <InstagramIcon />
      </a>
      <a
        href={buildWhatsappLink(whatsappMessages.footer)}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com o Chambar pelo WhatsApp"
        title="WhatsApp"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 transition hover:-translate-y-0.5 hover:border-[#25d366]/45 hover:text-[#188f45]"
      >
        <WhatsAppIcon className="h-[18px] w-[18px]" />
      </a>
    </div>
  );
}
