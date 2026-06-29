import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ViewportVideo } from "@/components/ViewportVideo";
import { koiTableVisualMedia } from "@/data/chambar-media";

export function TableVisualSection() {
  return (
    <section
      id="a-mesa"
      className="section-pad overflow-hidden bg-[#16110d] text-[#fff8ed]"
    >
      <div className="container-page">
        <Reveal
          threshold={0.3}
          className="grid gap-7 md:grid-cols-[0.82fr_1.18fr] md:items-end"
        >
          <div>
            <span className="eyebrow text-[#b8924a]">À mesa</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.02] md:text-6xl">
              O Koi servido à mesa.
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-7 text-[#efe2c8]/78 md:justify-self-end md:text-lg">
            Sushi, pratos quentes e detalhes preparados na hora.
          </p>
        </Reveal>

        <Reveal
          threshold={0.16}
          delay={80}
          className="relative isolate mt-9 aspect-[4/5] w-full touch-pan-y overflow-hidden rounded-lg border border-[#b8924a]/16 bg-[#0f0d0a] shadow-[0_22px_54px_rgba(0,0,0,0.2)] md:aspect-[16/8]"
        >
          <Image
            src={koiTableVisualMedia.image.src}
            alt={koiTableVisualMedia.image.alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 24px), 1180px"
            quality={86}
            loading="lazy"
            className="z-0 object-cover object-[54%_50%]"
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/42 via-transparent to-black/8" />

          <div className="pointer-events-none absolute bottom-[4%] right-[4%] z-20 aspect-[4/5] w-[44%] max-w-[390px] overflow-hidden rounded-[18px] border border-[#efe2c8]/20 bg-[#0b0907] shadow-[0_16px_34px_rgba(0,0,0,0.26)] sm:w-[42%] md:bottom-[6%] md:right-[5%] md:w-[32%] md:rounded-[22px]">
            <ViewportVideo
              src={koiTableVisualMedia.videoDesktop}
              mobileSrc={koiTableVisualMedia.videoMobile}
              poster={koiTableVisualMedia.poster}
              label={koiTableVisualMedia.videoAlt}
              className="absolute inset-0 z-20 h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
