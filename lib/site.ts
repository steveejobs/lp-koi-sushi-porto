import {
  CHAMBAR_CONFIG,
  createChambarWhatsAppLink,
} from "@/data/chambar-config";
import {
  facadeMedia,
  foodGalleryImages,
  heroImage,
  internalEnvironmentMedia,
  locationMedia,
  logoMedia,
  scrollExperienceMedia,
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
  ambienteInterno: internalEnvironmentMedia.src,
  fachada: facadeMedia.src,
  heroIntro: heroImage.src,
  foodGallery: foodGalleryImages.map((item) => item.src),
  scrollExperienceBg: scrollExperienceMedia.background.src,
  scrollMainImage: scrollExperienceMedia.feature.src,
  locationFacade: locationMedia[0].src,
};
