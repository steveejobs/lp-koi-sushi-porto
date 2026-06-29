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
  alt: "Logo Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const heroImage = {
  src: "/assets/hero/koi-sushi-porto-hero.png",
  alt: "Sushi fresco do Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const localDishGalleryImages = uniqueBySrc([
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-01.jpg",
    alt: "Sushi fresco do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-02.jpg",
    alt: "Peças de sushi preparadas na hora",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-03.png",
    alt: "Peças de sushi preparadas na hora",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-04.png",
    alt: "Pratos asiáticos do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-05.png",
    alt: "Sushi fresco do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-06.png",
    alt: "Peças de sushi preparadas na hora",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-07.png",
    alt: "Sushi fresco do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-09.png",
    alt: "Pratos asiáticos do Koi Sushi Porto",
  },
]) satisfies ChambarMediaAsset[];

export const genericGalleryImages = uniqueBySrc([
  {
    src: "/galeria/gallery-food-10.jpg",
    alt: "Sushi fresco do Koi Sushi Porto",
  },
  {
    src: "/galeria/gallery-food-11.jpg",
    alt: "Peças de sushi preparadas na hora",
  },
  {
    src: "/galeria/gallery-food-13.jpg",
    alt: "Sushi fresco do Koi Sushi Porto",
  },
  {
    src: "/galeria/gallery-food-15.jpg",
    alt: "Peças de sushi preparadas na hora",
  },
  {
    src: "/galeria/gallery-food-17.jpg",
    alt: "Pratos asiáticos do Koi Sushi Porto",
  },
  {
    src: "/galeria/gallery-food-19.jpg",
    alt: "Peças de sushi preparadas na hora",
  },
]) satisfies ChambarMediaAsset[];

export const takeAwayMenuImages = [
  {
    id: "take-away-sushi",
    title: "Take Away",
    description: "Sashimi, temaki, gunkan, rolos grandes e sushi frito.",
    src: "/koi sushi cardapio/take way (1).png",
    alt: "Menu Take Away do Koi Sushi Porto com opções de sushi",
  },
  {
    id: "take-away-especial",
    title: "Take Away",
    description: "Peças especiais para completar o seu pedido.",
    src: "/koi sushi cardapio/take way (2).png",
    alt: "Menu Take Away do Koi Sushi Porto com peças especiais",
  },
  {
    id: "take-away-combinado",
    title: "Take Away",
    description: "Combinações e promoções para pedidos Take Away.",
    src: "/koi sushi cardapio/take way (3).png",
    alt: "Menu Take Away do Koi Sushi Porto com combinações",
  },
] satisfies (ChambarMediaAsset & {
  id: string;
  title: string;
  description: string;
})[];

export const establishmentImages = uniqueBySrc([
  {
    src: "/assets/establishment/koi-sushi-porto-interior-01.png",
    alt: "Ambiente do restaurante Koi Sushi Porto",
  },
  {
    src: "/assets/establishment/koi-sushi-porto-interior-02.png",
    alt: "Ambiente do restaurante Koi Sushi Porto",
  },
]) satisfies ChambarMediaAsset[];

export const locationImage = {
  ...establishmentImages[1],
  alt: "Ambiente do restaurante Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const koiTableVisualMedia = {
  image: {
    src: "/galeria/imagem hero.jpg",
    alt: "Pratos asiáticos do Koi Sushi Porto",
  },
  videoDesktop: "/galeria/scroll-main-video.mp4",
  videoMobile: "/galeria/scroll-main-video-mobile.mp4",
  poster: "/galeria/gallery-food-18.jpg",
  videoAlt: "Peças de sushi preparadas na hora",
} as const;

export const scrollExperienceMedia = {
  background: {
    src: "/galeria/scroll-experience-bg.jpg",
    alt: "",
  },
  video: "/galeria/scroll-main-video.mp4",
  mobileVideo: "/galeria/scroll-main-video-mobile.mp4",
} as const;

export const instagramFoodGalleryMedia = uniqueBySrc([
  localDishGalleryImages[2],
  localDishGalleryImages[3],
  localDishGalleryImages[4],
  localDishGalleryImages[5],
  localDishGalleryImages[6],
  localDishGalleryImages[7],
]) satisfies ChambarMediaAsset[];

export const foodGalleryImages = localDishGalleryImages;
export const homeHeroImage = heroImage;
export const facadeMedia = establishmentImages[0];
export const internalEnvironmentMedia = establishmentImages[0];
export const locationMedia = establishmentImages;

export const chambarMedia = {
  heroImage,
  genericGalleryImages,
  localDishGalleryImages,
  establishmentImages,
  locationImage,
} as const;
