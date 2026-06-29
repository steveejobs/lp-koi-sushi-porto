import {
  CHAMBAR_CONFIG,
  createChambarWhatsAppLink,
} from "@/data/chambar-config";
import {
  koiEstablishmentGallery,
  koiFoodGallery,
  koiHeroImages,
  koiTableVisualMedia,
  logoMedia,
} from "@/data/chambar-media";

export const WHATSAPP_NUMBER = CHAMBAR_CONFIG.whatsappNumber;
export const FULL_SITE_URL = "https://koi-sushi-porto.vercel.app";
export const ADDRESS = CHAMBAR_CONFIG.address;
export const GOOGLE_MAPS_URL = CHAMBAR_CONFIG.googleMapsUrl;
export const INSTAGRAM_URL = CHAMBAR_CONFIG.instagramUrl;
export const DELIVERY_URL = createChambarWhatsAppLink();
export const OPENING_HOURS = CHAMBAR_CONFIG.openingHours;

export const createWhatsAppLink = createChambarWhatsAppLink;
export const buildWhatsappLink = createChambarWhatsAppLink;

export const navLinks = [
  { label: "Início", href: "#topo" },
  { label: "Menu", href: "#menu" },
  { label: "Localização", href: "#localizacao" },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Pedir Take Away", href: buildWhatsappLink() },
];

export const images = {
  logo: logoMedia.src,
  ambienteInterno: koiEstablishmentGallery[0].src,
  fachada: koiEstablishmentGallery[0].src,
  heroIntro: koiHeroImages[0].src,
  foodGallery: koiFoodGallery.map((item) => item.src),
  scrollExperienceBg: koiTableVisualMedia.image.src,
  scrollMainImage: koiTableVisualMedia.image.src,
  locationFacade: koiEstablishmentGallery[1].src,
};
