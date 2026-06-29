import { CHAMBAR_CONFIG, getWhatsappUrl } from "@/data/chambar-config";
import {
  genericGalleryImages,
  heroImage,
  internalEnvironmentMedia,
  localDishGalleryImages,
  locationMedia,
  logoMedia,
  scrollExperienceMedia,
} from "@/data/chambar-media";

export const WHATSAPP_NUMBER = CHAMBAR_CONFIG.whatsappNumber;
export const FULL_SITE_URL = "https://koisushiporto.xyz";
export const ADDRESS = CHAMBAR_CONFIG.address;
export const GOOGLE_MAPS_URL = CHAMBAR_CONFIG.googleMapsUrl;
export const INSTAGRAM_URL = CHAMBAR_CONFIG.instagramUrl;
export const DELIVERY_URL = getWhatsappUrl();
export const OPENING_HOURS = CHAMBAR_CONFIG.openingHours;

export const createWhatsAppLink = getWhatsappUrl;
export const buildWhatsappLink = getWhatsappUrl;

export const navLinks = [
  { label: "Início", href: "#topo" },
  { label: "Pratos", href: "#pratos-local" },
  { label: "Ambiente", href: "#ambiente" },
  { label: "Localização", href: "#localizacao" },
];

export const images = {
  logo: logoMedia.src,
  ambienteInterno: internalEnvironmentMedia.src,
  fachada: internalEnvironmentMedia.src,
  heroIntro: heroImage.src,
  foodGallery: localDishGalleryImages.map((item) => item.src),
  finalGallery: genericGalleryImages.map((item) => item.src),
  scrollExperienceBg: scrollExperienceMedia.background.src,
  scrollMainVideo: scrollExperienceMedia.video,
  scrollMainVideoMobile: scrollExperienceMedia.mobileVideo,
  locationFacade: locationMedia[1].src,
};
