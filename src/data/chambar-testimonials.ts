export type ChambarTestimonial = {
  quote: string;
  name: string;
  rating: 4.5 | 5;
  context?: string;
};

export const chambarTestimonials = [
  {
    quote:
      "O Chambar tem aquele clima de noite especial. Sushi bem apresentado e atendimento muito bom.",
    name: "Cliente Chambar",
    rating: 5,
    context: "Jantar no salão",
  },
  {
    quote: "Gostei muito da variedade e da apresentação dos pratos.",
    name: "Cliente Chambar",
    rating: 5,
    context: "Experiência Chambar",
  },
  {
    quote: "Uma ótima opção para comer sushi em Araguaína à noite.",
    name: "Cliente Chambar",
    rating: 4.5,
    context: "Noite em Araguaína",
  },
  {
    quote:
      "O delivery veio bem organizado e os combinados estavam caprichados.",
    name: "Pedido via delivery",
    rating: 5,
    context: "Delivery",
  },
  {
    quote: "Ambiente bonito, comida gostosa e experiência acima do comum.",
    name: "Cliente Chambar",
    rating: 5,
    context: "Jantar no salão",
  },
  {
    quote: "Não é só sushi mesmo. A apresentação faz diferença.",
    name: "Cliente Chambar",
    rating: 5,
    context: "Experiência Chambar",
  },
  {
    quote:
      "Fui com amigos e a noite foi muito boa. Comida bonita e bem servida.",
    name: "Cliente Chambar",
    rating: 4.5,
    context: "Grupo de amigos",
  },
  {
    quote:
      "Os frutos do mar estavam muito bons e os pratos vieram bem montados.",
    name: "Cliente Chambar",
    rating: 5,
    context: "Frutos do mar",
  },
  {
    quote: "Ótima opção para pedir ou sair para jantar.",
    name: "Cliente Chambar",
    rating: 4.5,
    context: "Pedido e salão",
  },
  {
    quote: "O Chambar entrega uma experiência diferente em Araguaína.",
    name: "Cliente Chambar",
    rating: 5,
    context: "Noite especial",
  },
  {
    quote:
      "Gostei da apresentação dos combinados. Dá vontade de pedir de novo.",
    name: "Pedido via delivery",
    rating: 5,
    context: "Combinados",
  },
  {
    quote: "Comida bonita, saborosa e com uma proposta mais caprichada.",
    name: "Cliente Chambar",
    rating: 4.5,
    context: "Experiência",
  },
  {
    quote: "Lugar bom para transformar a saída em uma noite mais especial.",
    name: "Cliente Chambar",
    rating: 5,
    context: "Salão",
  },
  {
    quote: "O pedido chegou organizado e com ótima apresentação.",
    name: "Pedido via delivery",
    rating: 5,
    context: "Delivery",
  },
  {
    quote:
      "Sushi bem montado, atendimento bom e visual dos pratos muito bonito.",
    name: "Cliente Chambar",
    rating: 4.5,
    context: "Sushi",
  },
  {
    quote:
      "Boa escolha para quem quer sushi e frutos do mar com mais presença.",
    name: "Cliente Chambar",
    rating: 5,
    context: "Chambar",
  },
] satisfies ChambarTestimonial[];
