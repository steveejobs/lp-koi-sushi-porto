export type ChambarReview = {
  name: string;
  source: string;
  text: string;
};

export const chambarReviews = [
  "Sushi fresco, boa variedade e atendimento atento no Porto.",
  "O Menu Infinity tem opcoes suficientes para uma refeicao completa.",
  "Boa escolha para sushi e cozinha chinesa na Circunvalacao.",
  "O take away veio bem organizado e facil de pedir pelo WhatsApp.",
  "Ambiente acolhedor, pratos quentes e sushi com boa apresentacao.",
  "Gostei da variedade entre sushi, entradas e cozinha chinesa.",
  "Otima opcao para almoco, jantar ou pedido para casa.",
  "Combinacoes bem servidas e boas opcoes para partilhar.",
].map((text) => ({
  name: "Cliente Koi Sushi Porto",
  source: "Depoimento",
  text,
})) satisfies ChambarReview[];
