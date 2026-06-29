export type KoiMediaAsset = {
  src: string;
  alt: string;
  type?: "image" | "video";
  mobileSrc?: string;
  poster?: string;
  role?: "feature-base" | "feature-video" | "gallery";
};

// Compatibilidade temporária para consumidores que ainda usam o nome antigo.
export type ChambarMediaAsset = KoiMediaAsset;

function uniqueBySrc<T extends KoiMediaAsset>(items: T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

export const logoMedia = {
  src: "/assets/logo/koi-sushi-porto-logo.png",
  alt: "Logótipo oficial do Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const koiHeroImages = uniqueBySrc([
  {
    src: "/assets/hero/koi-sushi-porto-hero.png",
    alt: "Sushi fresco servido no Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-08.png",
    alt: "Seleção de sushi do Koi Sushi Porto",
  },
]) satisfies KoiMediaAsset[];

export const koiFoodGallery = uniqueBySrc([
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-01.jpg",
    alt: "Sushi fresco servido no Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-02.jpg",
    alt: "Combinado de sushi Take Away do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-03.png",
    alt: "Gunkan e peças especiais de sushi",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-04.png",
    alt: "Prato de camarão e legumes preparado na hora",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-05.png",
    alt: "Seleção de sushi e sashimi do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-06.png",
    alt: "Barca com sushi, sashimi e peças especiais",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-07.png",
    alt: "Temaki e peças de sushi do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-09.png",
    alt: "Combinado de sushi variado do Koi Sushi Porto",
  },
]) satisfies KoiMediaAsset[];

export const koiEstablishmentGallery = uniqueBySrc([
  {
    src: "/assets/establishment/koi-sushi-porto-interior-01.png",
    alt: "Interior acolhedor do Koi Sushi Porto",
  },
  {
    src: "/assets/establishment/koi-sushi-porto-interior-02.png",
    alt: "Sala do Koi Sushi Porto com mesas e decoração asiática",
  },
]) satisfies KoiMediaAsset[];

export const koiTableVisualMedia = {
  image: {
    src: "/galeria/imagem hero.jpg",
    alt: "Pratos do Koi Sushi Porto servidos à mesa",
  },
  videoDesktop: "/galeria/scroll-main-video.mp4",
  videoMobile: "/galeria/scroll-main-video-mobile.mp4",
  poster: "/galeria/gallery-food-18.jpg",
  videoAlt: "Preparação e apresentação de sushi no Koi Sushi Porto",
} as const;

export const koiFinalGallery = uniqueBySrc([
  {
    src: "/galeria/gallery-food-10.jpg",
    alt: "Close-up de peças de sushi com molho no Koi Sushi Porto",
  },
  {
    src: "/galeria/gallery-food-11.jpg",
    alt: "Rolos de sushi finalizados com molho à mesa",
  },
  {
    src: "/galeria/gallery-food-13.jpg",
    alt: "Peça de sushi segura com pauzinhos",
  },
  {
    src: "/galeria/gallery-food-15.jpg",
    alt: "Nigiri de salmão em detalhe com vapor",
  },
  {
    src: "/galeria/gallery-food-17.jpg",
    alt: "Peças de sushi apresentadas sobre madeira",
  },
  {
    src: "/galeria/gallery-food-19.jpg",
    alt: "Rolos de sushi com salmão, abacate e sésamo",
  },
]) satisfies KoiMediaAsset[];

export const koiMenuImages = [
  {
    id: "caixa-sushi",
    title: "Caixa Sushi",
    description: "Sashimi, temaki, gunkan, rolos grandes e sushi frito.",
    src: "/koi sushi cardapio/take way (1).png",
    alt: "Menu Take Away Koi Sushi Porto com opções de sushi, sashimi, temaki e gunkan",
  },
  {
    id: "caixa-especial",
    title: "Caixa Especial",
    description: "Peças especiais para completar o seu pedido Take Away.",
    src: "/koi sushi cardapio/take way (2).png",
    alt: "Menu Take Away Koi Sushi Porto com peças especiais para escolher",
  },
  {
    id: "caixa-combinada",
    title: "Caixa Combinada",
    description: "Combinações para caixas de sushi e promoções Take Away.",
    src: "/koi sushi cardapio/take way (3).png",
    alt: "Menu Take Away Koi Sushi Porto com promoções e caixas de sushi",
  },
  {
    id: "sushi-sashimi",
    title: "Sushi e sashimi",
    description: "Sushi, sashimi e peças especiais para partilhar.",
    src: "/koi sushi cardapio/sushi 01.png",
    alt: "Menu Take Away Koi Sushi Porto com sushi, sashimi e peças especiais",
  },
  {
    id: "pecas-especiais",
    title: "Peças especiais",
    description: "Mais escolhas de sushi para completar a refeição.",
    src: "/koi sushi cardapio/sushi 02.png",
    alt: "Menu Take Away Koi Sushi Porto com peças especiais e mais opções de sushi",
  },
  {
    id: "combinados-classicos",
    title: "Combinados clássicos",
    description: "Combinações prontas para pedidos individuais ou em grupo.",
    src: "/koi sushi cardapio/sushi combos 01 (1).png",
    alt: "Menu Take Away Koi Sushi Porto com combinados clássicos de sushi",
  },
  {
    id: "combinados-especiais",
    title: "Combinados especiais",
    description: "Opções adicionais de combinados de sushi para partilhar.",
    src: "/koi sushi cardapio/sushi combos 01 (2).png",
    alt: "Menu Take Away Koi Sushi Porto com combinados especiais para partilhar",
  },
  {
    id: "cozinha-chinesa",
    title: "Cozinha chinesa",
    description: "Pratos quentes de cozinha chinesa preparados na hora.",
    src: "/koi sushi cardapio/cozinha chinesa (1).png",
    alt: "Menu Take Away Koi Sushi Porto com pratos de cozinha chinesa",
  },
  {
    id: "massas-e-arroz",
    title: "Massas e arroz",
    description: "Mais pratos chineses para acompanhar sushi e caixas.",
    src: "/koi sushi cardapio/cozinha chinesa (2).png",
    alt: "Menu Take Away Koi Sushi Porto com massas, arroz e pratos de cozinha chinesa",
  },
  {
    id: "entradas-e-tempuras",
    title: "Entradas e tempurás",
    description: "Crepes, tempurás, fritos e cremes.",
    src: "/koi sushi cardapio/crepes, tempura, fritas e cremes (1).png",
    alt: "Menu Take Away Koi Sushi Porto com crepes, tempurás, fritos e cremes",
  },
  {
    id: "entradas-e-acompanhamentos",
    title: "Entradas e acompanhamentos",
    description: "Entradas e acompanhamentos quentes.",
    src: "/koi sushi cardapio/crepes, tempura, fritas e cremes (2).png",
    alt: "Menu Take Away Koi Sushi Porto com entradas e acompanhamentos quentes",
  },
] satisfies (KoiMediaAsset & {
  id: string;
  title: string;
  description: string;
})[];

// Aliases mantidos para os componentes existentes sem alterar a secção de Menu.
export const heroImages = koiHeroImages;
export const foodGallery = koiFoodGallery;
export const establishmentGallery = koiEstablishmentGallery;
export const cinematicGallery = koiFinalGallery;
export const menuImages = koiMenuImages;
export const heroImage = koiHeroImages[0];
export const locationImage = koiEstablishmentGallery[1];
export const facadeMedia = koiEstablishmentGallery[0];
export const takeAwayMenuImages = koiMenuImages;
export const foodGalleryImages = koiFoodGallery;
export const galleryImages = koiFinalGallery;
export const genericGalleryImages = koiFoodGallery;
export const localDishGalleryImages = koiFoodGallery;
export const homeHeroImage = koiHeroImages[0];
export const internalEnvironmentMedia = koiEstablishmentGallery[0];
export const locationMedia = [koiEstablishmentGallery[1]];
export const instagramFoodGalleryMedia = koiFoodGallery.slice(0, 6);

export const scrollExperienceMedia = {
  background: koiTableVisualMedia.image,
  feature: {
    src: koiTableVisualMedia.poster,
    alt: koiTableVisualMedia.videoAlt,
  },
} as const;

export const koiMedia = {
  heroImages: koiHeroImages,
  foodGallery: koiFoodGallery,
  establishmentGallery: koiEstablishmentGallery,
  tableVisualMedia: koiTableVisualMedia,
  finalGallery: koiFinalGallery,
  menuImages: koiMenuImages,
} as const;

export const chambarMedia = {
  ...koiMedia,
  cinematicGallery: koiFinalGallery,
} as const;
