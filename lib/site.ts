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
export const FULL_SITE_URL = "https://lp-chambar.vercel.app";
export const ADDRESS = CHAMBAR_CONFIG.address;
export const GOOGLE_MAPS_URL = CHAMBAR_CONFIG.googleMapsUrl;
export const INSTAGRAM_URL = CHAMBAR_CONFIG.instagramUrl;
export const DELIVERY_URL = CHAMBAR_CONFIG.deliveryUrl;
export const OPENING_HOURS = CHAMBAR_CONFIG.openingHours;

export const createWhatsAppLink = createChambarWhatsAppLink;
export const buildWhatsappLink = createChambarWhatsAppLink;

export const whatsappMessages = {
  headerReservation: chambarWhatsAppMessages.reservation,
  heroReservation: chambarWhatsAppMessages.reservation,
  order: chambarWhatsAppMessages.order,
  delivery: chambarWhatsAppMessages.order,
  reservation: chambarWhatsAppMessages.reservation,
  information: chambarWhatsAppMessages.information,
  locationReservation: chambarWhatsAppMessages.reservation,
  location: chambarWhatsAppMessages.information,
  footer: chambarWhatsAppMessages.information,
};

export const navLinks = [
  { label: "Pedir", href: "#experiencias" },
  { label: "Galerias", href: "#galeria-generica" },
  { label: "Ambiente", href: "#ambiente" },
  { label: "Localização", href: "#localizacao" },
];

export const images = {
  logo: logoMedia.src,
  ambienteInterno: internalEnvironmentMedia.src,
  fachada: facadeMedia.src,
  heroIntro: heroImage.src,
  foodGallery: foodGalleryImages.map((item) => item.src),
  scrollExperienceBg: scrollExperienceMedia.background.src,
  scrollMainVideo: scrollExperienceMedia.video,
  scrollMainVideoMobile: scrollExperienceMedia.mobileVideo,
  locationFacade: locationMedia[0].src,
};
