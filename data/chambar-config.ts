export const CHAMBAR_CONFIG = {
  name: "Chambar Sushi & Frutos do Mar",
  shortName: "Chambar",
  instagramHandle: "@chambar_araguaina",
  instagramUrl: "https://www.instagram.com/chambar_araguaina",
  deliveryUrl: "https://delivery.yooga.app/CHAMBAR-SUSHI/tabs/home",
  phoneRaw: "063992888468",
  whatsappNumber: "5563992888468",
  googleRating: "4,2",
  googleReviews: "108",
  city: "Araguaína - TO",
  openingHours: "18h às 23h",
  address: "R. Dois de Julho, 366 - St. Central, Araguaína - TO, 77805-020",
  googleMapsUrl: "https://maps.app.goo.gl/UYnZBzU1mufmzSim7",
} as const;

export const chambarWhatsAppMessages = {
  order: "Olá, vim pelo site e quero fazer um pedido no Chambar.",
  reservation: "Olá, vim pelo site e quero reservar uma mesa no Chambar.",
  information: "Olá, vim pelo site e quero saber mais sobre o Chambar.",
} as const;

export function createChambarWhatsAppLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${CHAMBAR_CONFIG.whatsappNumber}&text=${encodeURIComponent(message)}`;
}

export const chambarGoogleProof = `★★★★★ ${CHAMBAR_CONFIG.googleRating} no Google · ${CHAMBAR_CONFIG.googleReviews} avaliações`;
