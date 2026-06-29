export type ChambarMediaAsset = {
  src: string;
  alt: string;
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
  alt: "Logo oficial do Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const heroImage = {
  src: "/assets/hero/koi-sushi-porto-hero.png",
  alt: "Sushi fresco e pratos asiáticos do Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const facadeMedia = {
  src: "/assets/establishment/koi-sushi-porto-interior-01.png",
  alt: "Ambiente interno do Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const locationImage = {
  src: "/assets/establishment/koi-sushi-porto-interior-02.png",
  alt: "Salão do Koi Sushi Porto com mesas e decoração asiática",
} satisfies ChambarMediaAsset;

export const localDishGalleryImages = uniqueBySrc([
  {
    src: "/assets/hero/koi-sushi-porto-hero.png",
    alt: "Combinado de sushi com fumaça servido no Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-01.jpg",
    alt: "Sushi fresco servido no Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-02.jpg",
    alt: "Combinado de sushi take away do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-03.png",
    alt: "Gunkan e peças especiais de sushi",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-05.png",
    alt: "Barca de sushi e sashimi do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-07.png",
    alt: "Temaki e peças de sushi do Koi Sushi Porto",
  },
]) satisfies ChambarMediaAsset[];

export const genericGalleryImages = uniqueBySrc([
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-04.png",
    alt: "Pratos de cozinha chinesa preparados na hora",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-06.png",
    alt: "Barca com sushi, sashimi e peças especiais",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-08.png",
    alt: "Sushi fresco em mesa do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-09.png",
    alt: "Combinado de sushi variado do Koi Sushi Porto",
  },
  {
    src: "/assets/establishment/koi-sushi-porto-interior-01.png",
    alt: "Interior do restaurante Koi Sushi Porto",
  },
  {
    src: "/assets/establishment/koi-sushi-porto-interior-02.png",
    alt: "Mesas e ambiente do Koi Sushi Porto",
  },
]) satisfies ChambarMediaAsset[];

export const establishmentImages = uniqueBySrc([
  facadeMedia,
  locationImage,
]) satisfies ChambarMediaAsset[];

export const scrollExperienceMedia = {
  background: heroImage,
  feature: {
    src: "/assets/gallery/koi-sushi-porto-gallery-09.png",
    alt: "Combinado de sushi variado do Koi Sushi Porto",
  },
} as const;

export const takeAwayMenuImages = [
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

export const instagramFoodGalleryMedia = uniqueBySrc([
  localDishGalleryImages[0],
  localDishGalleryImages[1],
  localDishGalleryImages[2],
  localDishGalleryImages[3],
  localDishGalleryImages[4],
  localDishGalleryImages[5],
]) satisfies ChambarMediaAsset[];

export const chambarMedia = {
  heroImage,
  genericGalleryImages,
  localDishGalleryImages,
  establishmentImages,
  locationImage,
} as const;

export const foodGalleryImages = genericGalleryImages;
export const homeHeroImage = heroImage;
export const internalEnvironmentMedia = facadeMedia;
export const locationMedia = uniqueBySrc([
  locationImage,
]) satisfies ChambarMediaAsset[];
