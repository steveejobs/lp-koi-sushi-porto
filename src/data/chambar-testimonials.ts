export type ChambarTestimonial = {
  quote: string;
  name: string;
  rating: 4.5 | 5;
  context?: string;
};

export const chambarTestimonials = [
  {
    quote: "Gostei muito da variedade e da apresentação dos pratos.",
    name: "Cliente",
    rating: 5,
    context: "Google",
  },
  {
    quote: "Ambiente bonito, comida gostosa e experiência acima do comum.",
    name: "Cliente",
    rating: 5,
    context: "Ambiente",
  },
  {
    quote:
      "Fui com amigos e a noite foi muito boa. Comida bonita e bem servida.",
    name: "Cliente",
    rating: 4.5,
    context: "À mesa",
  },
  {
    quote: "Ótima opção para pedir ou sair para jantar.",
    name: "Cliente",
    rating: 4.5,
    context: "Restaurante",
  },
  {
    quote:
      "Gostei da apresentação dos combinados. Dá vontade de pedir de novo.",
    name: "Cliente",
    rating: 5,
    context: "Sushi",
  },
  {
    quote: "Comida bonita, saborosa e com uma proposta mais caprichada.",
    name: "Cliente",
    rating: 4.5,
    context: "Apresentação",
  },
  {
    quote: "O pedido chegou organizado e com ótima apresentação.",
    name: "Cliente",
    rating: 5,
    context: "Take Away",
  },
  {
    quote:
      "Sushi bem montado, atendimento bom e visual dos pratos muito bonito.",
    name: "Cliente",
    rating: 4.5,
    context: "Sushi",
  },
] satisfies ChambarTestimonial[];
