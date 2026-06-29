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
      title="Do primeiro olhar ao primeiro prato."
      date="CHAMBAR À NOITE"
      scrollToExpand="Sushi, frutos do mar e uma experiência pensada para a noite."
    />
  );
}
