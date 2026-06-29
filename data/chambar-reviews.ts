export type ChambarReview = {
  name: string;
  source: string;
  text: string;
};

export const chambarReviews = [
  "Sushi fresco, boa variedade e atendimento atento no Porto.",
  "O Menu Infinity tem opções suficientes para uma refeição completa.",
  "Boa escolha para sushi e cozinha chinesa na Circunvalação.",
  "O Take Away veio bem organizado e foi fácil de pedir pelo WhatsApp.",
  "Ambiente acolhedor, pratos quentes e sushi com boa apresentação.",
  "Gostei da variedade entre sushi, entradas e cozinha chinesa.",
  "Ótima opção para almoço, jantar ou pedido para casa.",
  "Combinações bem servidas e boas opções para partilhar.",
].map((text) => ({
  name: "Cliente Koi Sushi Porto",
  source: "Depoimento",
  text,
})) satisfies ChambarReview[];
