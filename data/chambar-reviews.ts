export type ChambarReview = {
  name: string;
  source: string;
  text: string;
};

export const chambarReviews = [
  "Gostei muito da variedade e da apresentação dos pratos.",
  "Ambiente bonito, comida gostosa e experiência acima do comum.",
  "Fui com amigos e a noite foi muito boa. Comida bonita e bem servida.",
  "Ótima opção para pedir ou sair para jantar.",
  "Gostei da apresentação dos combinados. Dá vontade de pedir de novo.",
  "Comida bonita, saborosa e com uma proposta mais caprichada.",
  "O pedido chegou organizado e com ótima apresentação.",
  "Sushi bem montado, atendimento bom e visual dos pratos muito bonito.",
].map((text) => ({
  name: "Cliente",
  source: "Google",
  text,
})) satisfies ChambarReview[];
