export const CHAMBAR_CONFIG = {
  name: "Koi Sushi Porto",
  shortName: "Koi Sushi",
  instagramHandle: "@koisushi_porto",
  instagramUrl: "https://www.instagram.com/koisushi_porto/",
  phoneRaw: "+351 961 176 188",
  whatsappNumber: "351961176188",
  googleRating: "4,9",
  googleReviews: "48",
  city: "Porto, Portugal",
  openingHours: "12h–15h | 19h–23h",
  address:
    "Estrada Exterior da Circunvalação, 7824-F, Porto, Portugal 4200-162",
  googleMapsUrl: "https://maps.app.goo.gl/BWotay8Vg5dZYrJ36",
} as const;

const phone = "351961176188";

export const getWhatsappUrl = (source = "site") => {
  const message =
    source === "instagram"
      ? "Olá! Vim pelo Instagram e quero fazer um pedido de take-away. O meu pedido é:"
      : "Olá! Vim pelo site e quero fazer um pedido de take-away. O meu pedido é:";

  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
};

export const createChambarWhatsAppLink = getWhatsappUrl;

export const chambarGoogleProof = `★★★★★ ${CHAMBAR_CONFIG.googleRating} no Google · ${CHAMBAR_CONFIG.googleReviews} avaliações`;
