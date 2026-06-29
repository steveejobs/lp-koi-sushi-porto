export const CHAMBAR_CONFIG = {
  name: "Koi Sushi Porto",
  shortName: "Koi Sushi",
  instagramHandle: "@koisushi_porto",
  instagramUrl: "https://www.instagram.com/koisushi_porto/",
  deliveryUrl: "https://api.whatsapp.com/send?phone=351961176188",
  phoneRaw: "+351 961 176 188",
  whatsappNumber: "351961176188",
  city: "Porto, Portugal",
  openingHours: "12h-15h | 19h-23h",
  address:
    "Estrada Exterior da Circunvalacao, 7824-F, Porto, Portugal 4200-162",
  googleMapsUrl: "https://maps.app.goo.gl/BWotay8Vg5dZYrJ36",
} as const;

export const chambarWhatsAppMessages = {
  order:
    "Ola! Vim pelo site e quero fazer um pedido de take-away. O meu pedido e:",
  reservation:
    "Ola! Vim pelo site e quero reservar uma mesa no Koi Sushi Porto.",
  information:
    "Ola! Vim pelo site e quero saber mais sobre o Koi Sushi Porto.",
} as const;

export function createChambarWhatsAppLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${CHAMBAR_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
}

export const chambarGoogleProof = "Menu Infinity - All You Can Eat - Take Away";
