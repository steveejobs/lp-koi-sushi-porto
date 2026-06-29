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
  src: "/logo sem fundo.png",
  alt: "Logo do Chambar Sushi & Frutos do Mar",
} satisfies ChambarMediaAsset;

export const heroImage = {
  src: "/chambar/hero/chambar-hero-optimized.webp",
  alt: "Sushi sendo finalizado no Chambar",
} satisfies ChambarMediaAsset;

export const facadeMedia = {
  src: "/chambar/fachada-chambar.png",
  alt: "Fachada do Chambar Sushi & Frutos do Mar à noite",
} satisfies ChambarMediaAsset;

export const locationImage = {
  ...facadeMedia,
  alt: "Fachada do Chambar em Araguaína",
} satisfies ChambarMediaAsset;

export const genericGalleryImages = uniqueBySrc([
  { src: "/galeria/gallery-food-01.png", alt: "Sushi em composição premium" },
  { src: "/galeria/gallery-food-02.png", alt: "Peças de sushi em close-up" },
  { src: "/galeria/gallery-food-03.png", alt: "Seleção de sashimis" },
  {
    src: "/galeria/gallery-food-04.png",
    alt: "Prato japonês com apresentação elegante",
  },
  { src: "/galeria/gallery-food-05.png", alt: "Sushi especial em detalhe" },
  { src: "/galeria/gallery-food-06.png", alt: "Combinado japonês em mesa" },
  { src: "/galeria/gallery-food-07.png", alt: "Peças de sushi finalizadas" },
  {
    src: "/galeria/gallery-food-08.png",
    alt: "Prato de sushi com acabamento premium",
  },
  {
    src: "/galeria/gallery-food-09.png",
    alt: "Seleção japonesa para delivery",
  },
  {
    src: "/galeria/gallery-food-10.jpg",
    alt: "Sushi com brilho e corte preciso",
  },
  { src: "/galeria/gallery-food-11.jpg", alt: "Detalhe de prato japonês" },
  { src: "/galeria/gallery-food-12.jpg", alt: "Combinado de sushi e sashimi" },
]) satisfies ChambarMediaAsset[];

export const localDishGalleryImages = uniqueBySrc([
  { src: "/chambar/dish-01.jpg", alt: "Combinado de sushi servido no Chambar" },
  {
    src: "/chambar/dish-02.jpg",
    alt: "Prato real do Chambar com peças variadas",
  },
  { src: "/chambar/dish-03.jpg", alt: "Sushi do Chambar servido à mesa" },
  {
    src: "/chambar/dish-04.jpg",
    alt: "Combinado do Chambar com salmão e peças especiais",
  },
  { src: "/chambar/dish-05.jpg", alt: "Prato de sushi preparado pelo Chambar" },
  { src: "/chambar/dish-06.jpg", alt: "Peças de sushi reais do Chambar" },
  {
    src: "/chambar/dish-07.webp",
    alt: "Combinado de sushi e frutos do mar do Chambar",
  },
  { src: "/chambar/dish-08.jpg", alt: "Combinado de vinte peças do Chambar" },
  { src: "/chambar/dish-09.webp", alt: "Combinado de trinta peças do Chambar" },
  { src: "/chambar/dish-10.jpg", alt: "Hot Philadelphia servido no Chambar" },
]) satisfies ChambarMediaAsset[];

export const establishmentImages = uniqueBySrc([
  facadeMedia,
]) satisfies ChambarMediaAsset[];

export const scrollExperienceMedia = {
  background: {
    src: "/galeria/scroll-experience-bg.jpg",
    alt: "",
  },
  video: "/galeria/scroll-main-video-mobile.mp4",
  mobileVideo: "/galeria/scroll-main-video-mobile.mp4",
} as const;

export const instagramFoodGalleryMedia = uniqueBySrc([
  localDishGalleryImages[0],
  localDishGalleryImages[1],
  localDishGalleryImages[2],
  localDishGalleryImages[3],
  localDishGalleryImages[7],
  localDishGalleryImages[9],
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
