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
  alt: "Logótipo do Koi Sushi Porto",
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
    alt: "Detalhe gastronómico do Koi Sushi Porto",
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
    alt: "Detalhe gastronómico do Koi Sushi Porto",
  },
  {
    src: "/assets/gallery/koi-sushi-porto-gallery-09.png",
    alt: "Pratos asiáticos do Koi Sushi Porto",
  },
]) satisfies ChambarMediaAsset[];

export const genericGalleryImages = uniqueBySrc([
  {
    src: "/galeria/gallery-food-10.jpg",
    alt: "Detalhe gastronómico do Koi Sushi Porto",
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
    alt: "Detalhe gastronómico do Koi Sushi Porto",
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
