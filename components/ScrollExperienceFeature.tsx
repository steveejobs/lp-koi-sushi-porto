"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { scrollExperienceMedia } from "@/data/chambar-media";

export function ScrollExperienceFeature() {
  return (
    <ScrollExpandMedia
      mediaSrc={scrollExperienceMedia.feature.src}
      mobileMediaSrc={scrollExperienceMedia.feature.src}
      bgImageSrc={scrollExperienceMedia.background.src}
      title="Do primeiro olhar ao primeiro prato."
      date="KOI SUSHI PORTO"
      scrollToExpand="Sushi japonês, cozinha chinesa e pratos asiáticos com presença à mesa."
    />
  );
}
