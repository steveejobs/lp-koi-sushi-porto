import { CHAMBAR_CONFIG, getWhatsappUrl } from "@/data/chambar-config";
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
export const FULL_SITE_URL = "https://lp-koi-sushi-porto.vercel.app";
export const ADDRESS = CHAMBAR_CONFIG.address;
export const GOOGLE_MAPS_URL = CHAMBAR_CONFIG.googleMapsUrl;
export const INSTAGRAM_URL = CHAMBAR_CONFIG.instagramUrl;
export const TAKE_AWAY_URL = getWhatsappUrl("site");
export const OPENING_HOURS = CHAMBAR_CONFIG.openingHours;

export { getWhatsappUrl };

export const navLinks = [
  { label: "Início", href: "#topo" },
  { label: "Pratos", href: "#pratos-local" },
  { label: "Ambiente", href: "#ambiente" },
  { label: "Avaliações", href: "#avaliacoes" },
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
