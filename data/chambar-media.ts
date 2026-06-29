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
  src: "/koi/logo/koi-sushi-porto-logo.png",
  alt: "Logo Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const heroImage = {
  src: "/koi/hero/koi-sushi-porto-hero.jpg",
  alt: "Sushi fresco do Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const facadeMedia = {
  src: "/koi/establishment/koi-sushi-porto-interior-01.png",
  alt: "Ambiente do Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const locationImage = {
  src: "/koi/establishment/koi-sushi-porto-interior-02.png",
  alt: "Ambiente do Koi Sushi Porto",
} satisfies ChambarMediaAsset;

export const genericGalleryImages = uniqueBySrc([
  { src: "/koi/gallery/koi-sushi-porto-gallery-01.jpg", alt: "Sushi fresco do Koi Sushi Porto" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-02.jpg", alt: "Pratos do Koi Sushi Porto" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-03.png", alt: "Peças de sushi preparadas na hora" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-04.png", alt: "Sushi fresco do Koi Sushi Porto" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-05.png", alt: "Pratos do Koi Sushi Porto" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-06.png", alt: "Peças de sushi preparadas na hora" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-07.png", alt: "Sushi fresco do Koi Sushi Porto" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-08.png", alt: "Pratos do Koi Sushi Porto" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-09.png", alt: "Peças de sushi preparadas na hora" },
  { src: "/koi/gallery/koi-sushi-porto-gallery-10.png", alt: "Sushi fresco do Koi Sushi Porto" },
]) satisfies ChambarMediaAsset[];

export const localDishGalleryImages = uniqueBySrc([
  { src: "/koi/galeria/gallery-food-01.png", alt: "Sushi fresco do Koi Sushi Porto" },
  { src: "/koi/galeria/gallery-food-02.png", alt: "Pratos do Koi Sushi Porto" },
  { src: "/koi/galeria/gallery-food-03.png", alt: "Peças de sushi preparadas na hora" },
  { src: "/koi/galeria/gallery-food-04.png", alt: "Sushi fresco do Koi Sushi Porto" },
  { src: "/koi/galeria/gallery-food-05.png", alt: "Pratos do Koi Sushi Porto" },
  { src: "/koi/galeria/gallery-food-06.png", alt: "Peças de sushi preparadas na hora" },
  { src: "/koi/galeria/gallery-food-07.png", alt: "Sushi fresco do Koi Sushi Porto" },
  { src: "/koi/galeria/gallery-food-08.png", alt: "Pratos do Koi Sushi Porto" },
  { src: "/koi/galeria/gallery-food-09.png", alt: "Peças de sushi preparadas na hora" },
  { src: "/koi/galeria/gallery-food-10.jpg", alt: "Sushi fresco do Koi Sushi Porto" },
]) satisfies ChambarMediaAsset[];

export const establishmentImages = uniqueBySrc([
  facadeMedia,
]) satisfies ChambarMediaAsset[];

export const scrollExperienceMedia = {
  background: {
    src: "/koi/galeria/scroll-experience-bg.jpg",
    alt: "",
  },
  video: "/koi/galeria/scroll-main-video.mp4",
  mobileVideo: "/koi/galeria/scroll-main-video-mobile.mp4",
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
