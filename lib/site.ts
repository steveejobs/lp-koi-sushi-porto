import {
  CHAMBAR_CONFIG,
  chambarWhatsAppMessages,
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
export const DELIVERY_URL = createChambarWhatsAppLink(chambarWhatsAppMessages.order);
export const OPENING_HOURS = CHAMBAR_CONFIG.openingHours;

export const createWhatsAppLink = createChambarWhatsAppLink;
export const buildWhatsappLink = createChambarWhatsAppLink;

export const whatsappMessages = {
  headerReservation: chambarWhatsAppMessages.order,
  heroReservation: chambarWhatsAppMessages.order,
  order: chambarWhatsAppMessages.order,
  delivery: chambarWhatsAppMessages.order,
  reservation: chambarWhatsAppMessages.reservation,
  information: chambarWhatsAppMessages.information,
  locationReservation: chambarWhatsAppMessages.reservation,
  location: chambarWhatsAppMessages.information,
  footer: chambarWhatsAppMessages.information,
};

export const navLinks = [
  { label: "Inicio", href: "#topo" },
  { label: "Menu", href: "#menu" },
  { label: "Localizacao", href: "#localizacao" },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Pedir agora", href: buildWhatsappLink(whatsappMessages.order) },
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
