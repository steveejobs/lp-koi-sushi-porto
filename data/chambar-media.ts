export type KoiMediaAsset = {
  src: string;
  alt: string;
};

function uniqueBySrc<T extends KoiMediaAsset>(items: T[]) {
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
} satisfies KoiMediaAsset;

export const heroImage = {
  src: "/koi/hero/koi-sushi-porto-hero.webp",
  alt: "Sushi e pratos chineses do Koi Sushi Porto",
} satisfies KoiMediaAsset;

export const facadeMedia = {
  src: "/koi/establishment/koi-sushi-porto-interior-01.webp",
  alt: "Ambiente do Koi Sushi Porto",
} satisfies KoiMediaAsset;

export const locationImage = {
  src: "/koi/establishment/koi-sushi-porto-interior-02.webp",
  alt: "Ambiente do Koi Sushi Porto",
} satisfies KoiMediaAsset;

export const genericGalleryImages = uniqueBySrc([
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-10.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-09.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-08.webp",
    alt: "Pratos quentes do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-07.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-06.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-05.webp",
    alt: "Pratos quentes do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-04.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-03.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-02.webp",
    alt: "Pratos quentes do Koi Sushi Porto",
  },
  {
    src: "/koi/gallery/koi-sushi-porto-gallery-01.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
]) satisfies KoiMediaAsset[];

export const localDishGalleryImages = uniqueBySrc([
  {
    src: "/koi/galeria/gallery-food-10.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-09.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-08.webp",
    alt: "Pratos quentes do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-07.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-06.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-05.webp",
    alt: "Pratos quentes do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-04.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-03.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-02.webp",
    alt: "Pratos quentes do Koi Sushi Porto",
  },
  {
    src: "/koi/galeria/gallery-food-01.webp",
    alt: "Sushi e pratos chineses do Koi Sushi Porto",
  },
]) satisfies KoiMediaAsset[];

export const establishmentImages = uniqueBySrc([
  facadeMedia,
]) satisfies KoiMediaAsset[];

export const scrollExperienceMedia = {
  background: {
    src: "/koi/galeria/scroll-experience-bg.webp",
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
]) satisfies KoiMediaAsset[];

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
]) satisfies KoiMediaAsset[];
