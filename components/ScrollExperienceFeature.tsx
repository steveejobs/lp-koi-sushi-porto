"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { scrollExperienceMedia } from "@/data/chambar-media";

export function ScrollExperienceFeature() {
  return (
    <ScrollExpandMedia
      mediaSrc={scrollExperienceMedia.video}
      mobileMediaSrc={scrollExperienceMedia.mobileVideo}
      posterSrc={scrollExperienceMedia.background.src}
      mobilePosterSrc={scrollExperienceMedia.background.src}
      bgImageSrc={scrollExperienceMedia.background.src}
      title="O Koi servido à mesa."
      date="À MESA"
      scrollToExpand="Sushi, cozinha chinesa e pratos preparados na hora."
    />
  );
}
