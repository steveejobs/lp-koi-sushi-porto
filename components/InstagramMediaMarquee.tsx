import Image from "next/image";
import type { ChambarMediaAsset } from "@/data/chambar-media";

type InstagramMediaMarqueeProps = {
  media: ChambarMediaAsset[];
};

export function InstagramMediaMarquee({ media }: InstagramMediaMarqueeProps) {
  return (
    <section
      className="ig-rise mt-5 overflow-hidden"
      aria-label="Galeria do Koi Sushi Porto"
    >
      <div className="ig-marquee ig-marquee-left flex w-max gap-3">
        <div className="flex gap-3">
          {media.map((item, index) => (
            <figure
              key={item.src}
              className="relative h-[214px] w-[166px] shrink-0 overflow-hidden rounded-[24px] bg-neutral-950 shadow-[0_14px_30px_rgba(16,16,16,0.1)]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index === 0}
                quality={86}
                sizes="166px"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </figure>
          ))}
        </div>
        <div className="flex gap-3" aria-hidden="true">
          {media.map((item) => (
            <figure
              key={`${item.src}-loop`}
              className="relative h-[214px] w-[166px] shrink-0 overflow-hidden rounded-[24px] bg-neutral-950 shadow-[0_14px_30px_rgba(16,16,16,0.1)]"
            >
              <Image
                src={item.src}
                alt=""
                fill
                quality={86}
                sizes="166px"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
