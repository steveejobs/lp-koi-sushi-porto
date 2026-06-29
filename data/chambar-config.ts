export const CHAMBAR_CONFIG = {
  name: "Koi Sushi Porto",
  shortName: "Koi Sushi",
  instagramHandle: "@koisushi_porto",
  instagramUrl: "https://www.instagram.com/koisushi_porto/",
  phoneRaw: "+351 961 176 188",
  whatsappNumber: "351961176188",
  city: "Porto, Portugal",
  openingHours: "12h–15h | 19h–23h",
  address:
    "Estrada Exterior da Circunvalação, 7824-F, Porto, Portugal 4200-162",
  googleMapsUrl: "https://maps.app.goo.gl/BWotay8Vg5dZYrJ36",
} as const;

export function createChambarWhatsAppLink(activeMenuTitle?: string) {
  const phone = CHAMBAR_CONFIG.whatsappNumber;
  const message = activeMenuTitle
    ? `Olá! Vim pelo site e quero fazer um pedido de take-away. Estou a ver: ${activeMenuTitle}. O meu pedido é:`
    : "Olá! Vim pelo site e quero fazer um pedido de take-away. O meu pedido é:";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

  return whatsappUrl;
}

export const chambarGoogleProof = "Menu Infinity · All You Can Eat · Take Away";
