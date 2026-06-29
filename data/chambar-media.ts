export type ChambarMediaAsset = {
  src: string;
  alt: string;
  type?: "image" | "video";
  mobileSrc?: string;
  poster?: string;
  role?: "feature-base" | "feature-video" | "gallery";
};

function uniqueBySrc<T extends ChambarMediaAsset>(items: T[]) {
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

export const heroImages = uniqueBySrc([
  {
    src: "/assets/hero/koi-sushi-porto-hero.png",
    alt: "Sushi fresco servido no Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-08.png",
    alt: "Seleção de sushi do Koi Sushi Porto",
  },
]) satisfies ChambarMediaAsset[];

export const foodGallery = uniqueBySrc([
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
]) satisfies ChambarMediaAsset[];

export const establishmentGallery = uniqueBySrc([
  {
    src: "/assets/establishment/koi-sushi-porto-interior-01.png",
    alt: "Interior acolhedor do Koi Sushi Porto",
  },
  {
    src: "/assets/establishment/koi-sushi-porto-interior-02.png",
    alt: "Sala do Koi Sushi Porto com mesas e decoração asiática",
  },
]) satisfies ChambarMediaAsset[];

export const cinematicGallery = uniqueBySrc([
  {
    src: "/galeria/imagem hero.jpg",
    alt: "Pratos do Koi Sushi Porto servidos à mesa",
    role: "feature-base",
  },
  {
    src: "/galeria/scroll-main-video.mp4",
    mobileSrc: "/galeria/scroll-main-video-mobile.mp4",
    poster: "/galeria/gallery-food-18.jpg",
    alt: "Preparação e apresentação de sushi no Koi Sushi Porto",
    type: "video",
    role: "feature-video",
  },
  {
    src: "/galeria/gallery-food-10.jpg",
    alt: "Close-up de peças de sushi com molho no Koi Sushi Porto",
    role: "gallery",
  },
  {
    src: "/galeria/gallery-food-11.jpg",
    alt: "Rolos de sushi finalizados com molho à mesa",
    role: "gallery",
  },
  {
    src: "/galeria/gallery-food-13.jpg",
    alt: "Peça de sushi segura com pauzinhos",
    role: "gallery",
  },
  {
    src: "/galeria/gallery-food-15.jpg",
    alt: "Nigiri de salmão em detalhe com vapor",
    role: "gallery",
  },
  {
    src: "/galeria/gallery-food-17.jpg",
    alt: "Peças de sushi apresentadas sobre madeira",
    role: "gallery",
  },
  {
    src: "/galeria/gallery-food-19.jpg",
    alt: "Rolos de sushi com salmão, abacate e sésamo",
    role: "gallery",
  },
]) satisfies ChambarMediaAsset[];

export const menuImages = [
  {
    id: "caixa-1",
    title: "Caixa 1",
    description: "Sashimi, temaki, gunkan, rolos grandes e sushi frito.",
    src: "/koi sushi cardapio/take way (1).png",
    alt: "Cardapio take away Koi Sushi Porto com opcoes de sushi, sashimi, temaki e gunkan",
  },
  {
    id: "caixa-2",
    title: "Caixa 2",
    description: "Mais opcoes para completar o seu pedido take away.",
    src: "/koi sushi cardapio/take way (2).png",
    alt: "Cardapio take away Koi Sushi Porto com combinacoes de sushi para escolher",
  },
  {
    id: "caixa-3",
    title: "Caixa 3",
    description: "Combinacoes extra para caixas de sushi e promocoes.",
    src: "/koi sushi cardapio/take way (3).png",
    alt: "Cardapio take away Koi Sushi Porto com promocoes e caixas de sushi",
  },
  {
    id: "sushi-1",
    title: "Sushi 1",
    description: "Sushi, sashimi e pecas especiais para partilhar.",
    src: "/koi sushi cardapio/sushi 01.png",
    alt: "Cardapio Koi Sushi Porto com sushi, sashimi e pecas especiais",
  },
  {
    id: "sushi-2",
    title: "Sushi 2",
    description: "Mais escolhas de sushi para completar a refeicao.",
    src: "/koi sushi cardapio/sushi 02.png",
    alt: "Cardapio Koi Sushi Porto com mais opcoes de sushi",
  },
  {
    id: "combos-1",
    title: "Combos 1",
    description: "Combinacoes prontas para pedidos individuais ou em grupo.",
    src: "/koi sushi cardapio/sushi combos 01 (1).png",
    alt: "Cardapio Koi Sushi Porto com combos de sushi",
  },
  {
    id: "combos-2",
    title: "Combos 2",
    description: "Opcoes adicionais de combos de sushi.",
    src: "/koi sushi cardapio/sushi combos 01 (2).png",
    alt: "Cardapio Koi Sushi Porto com opcoes adicionais de combos",
  },
  {
    id: "chinesa-1",
    title: "Cozinha chinesa 1",
    description: "Pratos quentes de cozinha chinesa preparados na hora.",
    src: "/koi sushi cardapio/cozinha chinesa (1).png",
    alt: "Cardapio Koi Sushi Porto com pratos de cozinha chinesa",
  },
  {
    id: "chinesa-2",
    title: "Cozinha chinesa 2",
    description: "Mais pratos chineses para acompanhar sushi e caixas.",
    src: "/koi sushi cardapio/cozinha chinesa (2).png",
    alt: "Cardapio Koi Sushi Porto com mais pratos de cozinha chinesa",
  },
  {
    id: "quentes-1",
    title: "Quentes 1",
    description: "Crepes, tempuras, fritos e cremes.",
    src: "/koi sushi cardapio/crepes, tempura, fritas e cremes (1).png",
    alt: "Cardapio Koi Sushi Porto com crepes, tempuras, fritos e cremes",
  },
  {
    id: "quentes-2",
    title: "Quentes 2",
    description: "Entradas e acompanhamentos quentes.",
    src: "/koi sushi cardapio/crepes, tempura, fritas e cremes (2).png",
    alt: "Cardapio Koi Sushi Porto com entradas e acompanhamentos quentes",
  },
] satisfies (ChambarMediaAsset & {
  id: string;
  title: string;
  description: string;
})[];

// Aliases mantidos para os componentes existentes sem alterar a secção de Menu.
export const heroImage = heroImages[0];
export const locationImage = establishmentGallery[1];
export const facadeMedia = establishmentGallery[0];
export const takeAwayMenuImages = menuImages;
export const foodGalleryImages = foodGallery;
export const galleryImages = foodGallery;
export const genericGalleryImages = foodGallery;
export const localDishGalleryImages = foodGallery;
export const homeHeroImage = heroImages[0];
export const internalEnvironmentMedia = establishmentGallery[0];
export const locationMedia = [establishmentGallery[1]];
export const instagramFoodGalleryMedia = foodGallery.slice(0, 6);

export const scrollExperienceMedia = {
  background: heroImages[0],
  feature: foodGallery[foodGallery.length - 1],
} as const;

export const chambarMedia = {
  heroImages,
  foodGallery,
  establishmentGallery,
  cinematicGallery,
  menuImages,
} as const;
