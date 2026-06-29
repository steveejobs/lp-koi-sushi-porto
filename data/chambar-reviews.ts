export type ChambarReview = {
  name: string;
  source: string;
  text: string;
};

export const chambarReviews = [
  "O Chambar tem aquele clima de noite especial. Sushi bem apresentado e atendimento muito bom.",
  "Gostei muito da variedade e da apresentação dos pratos.",
  "Uma ótima opção para comer sushi em Araguaína à noite.",
  "O delivery veio bem organizado e os combinados estavam caprichados.",
  "Ambiente bonito, comida gostosa e experiência acima do comum.",
  "Não é só sushi mesmo. A apresentação faz diferença.",
  "Fui com amigos e a noite foi muito boa. Comida bonita e bem servida.",
  "Os frutos do mar estavam muito bons e os pratos vieram bem montados.",
  "Ótima opção para pedir ou sair para jantar.",
  "O Chambar entrega uma experiência diferente em Araguaína.",
].map((text) => ({
  name: "Cliente Chambar",
  source: "Depoimento",
  text,
})) satisfies ChambarReview[];
