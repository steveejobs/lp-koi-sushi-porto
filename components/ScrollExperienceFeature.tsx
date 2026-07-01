"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { scrollExperienceMedia } from "@/data/chambar-media";

export function ScrollExperienceFeature() {
  return (
    <ScrollExpandMedia
      mediaSrc={scrollExperienceMedia.mobileVideo}
      mobileMediaSrc={scrollExperienceMedia.mobileVideo}
      posterSrc={scrollExperienceMedia.background.src}
      mobilePosterSrc={scrollExperienceMedia.background.src}
      bgImageSrc={scrollExperienceMedia.background.src}
      title="Sushi e cozinha chinesa servidos à mesa."
      date="À MESA"
      scrollToExpand="Sushi, pratos chineses e opções quentes preparados na hora."
    />
  );
}
