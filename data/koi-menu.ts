export type KoiMenuItem = {
  code: string;
  name: string;
  category: string;
  description?: string;
};

export type KoiMenuCategory = {
  id: string;
  title: string;
  description?: string;
  items: KoiMenuItem[];
};

const item = (
  code: string,
  name: string,
  category: string,
  description?: string,
): KoiMenuItem => ({ code, name, category, description });

export const KOI_TAKE_AWAY_OFFER =
  "8€ · 1 caixa com 4 tipos de sushi à sua escolha";

export const KOI_MENU_CATEGORIES = [
  {
    id: "sashimi",
    title: "Sashimi",
    description: "Cortes frescos para uma caixa leve e directa.",
    items: [
      item("31", "Sashimi Salmão", "Sashimi"),
      item("32", "Sashimi Atum", "Sashimi"),
      item("33", "Sashimi Peixe Manteiga", "Sashimi"),
    ],
  },
  {
    id: "braseado",
    title: "Braseado",
    description: "Sushi com acabamento tostado e sabor mais intenso.",
    items: [
      item("34", "Salmão", "Braseado"),
      item("35", "Atum", "Braseado"),
      item("36", "Peixe Manteiga", "Braseado"),
    ],
  },
  {
    id: "temaki",
    title: "Temaki",
    description: "Cones de sushi para quem quer uma escolha prática.",
    items: [
      item("37", "Salmão", "Temaki"),
      item("38", "Atum", "Temaki"),
      item("39", "Gambas Panadas", "Temaki"),
      item("40", "Vegetais", "Temaki"),
    ],
  },
  {
    id: "ovo-temaki",
    title: "Ovo Temaki",
    description: "Temaki com ovo e recheios clássicos.",
    items: [
      item("41", "Salmão", "Ovo Temaki"),
      item("42", "Gambas Panadas", "Ovo Temaki"),
    ],
  },
  {
    id: "gunkan",
    title: "Gunkan",
    description: "Peças especiais com combinações cremosas e frescas.",
    items: [
      item("B1", "Salmão com morangos", "Gunkan"),
      item("B2", "Salmão com abacate", "Gunkan"),
      item("B3", "Salmão com camarão frito", "Gunkan"),
      item("B4", "Pepino com pasta de salmão", "Gunkan"),
      item("B5", "Salmão", "Gunkan"),
      item("B6", "Salmão Braseado", "Gunkan"),
    ],
  },
  {
    id: "rolo-grande",
    title: "Rolo Grande",
    description: "Rolos maiores para uma caixa mais composta.",
    items: [
      item("43", "Futomaki", "Rolo Grande"),
      item("44", "Rolo Grande com Gambas", "Rolo Grande"),
    ],
  },
  {
    id: "sushi-frito",
    title: "Sushi Frito",
    description: "Opções crocantes para contrastar com as peças frescas.",
    items: [
      item("F1", "Maki Frito", "Sushi Frito"),
      item("F2", "Maki Frito com Queijo", "Sushi Frito"),
      item("F3", "California Frito", "Sushi Frito"),
      item("F4", "Futomaki Frito", "Sushi Frito"),
    ],
  },
] satisfies KoiMenuCategory[];
