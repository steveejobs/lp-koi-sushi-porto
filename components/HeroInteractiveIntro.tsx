import Image from "next/image";
import { heroImage } from "@/data/chambar-media";
import { images } from "@/lib/site";

import { HeroImageReveal } from "@/components/HeroImageReveal";

export function HeroInteractiveIntro() {
  return (
    <section
      className="bg-[#050505] pt-4 md:pt-6"
      aria-label="Abertura Koi Sushi Porto"
    >
      <div className="container-page">
        <div className="intro-stage relative isolate mx-auto h-[64svh] min-h-[430px] overflow-hidden rounded-lg border border-white/10 bg-[#050505] shadow-[0_28px_76px_rgba(16,16,16,0.1)] sm:h-[68svh] sm:min-h-[470px] md:h-[76vh] md:min-h-[576px] lg:w-[90%]">
          <div
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_35%,rgba(196,30,47,0.2),transparent_38%),linear-gradient(135deg,#050505_0%,#121212_58%,#1c080b_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-10 flex items-center justify-center"
            aria-hidden="true"
          >
            <Image
              src={images.logo}
              alt=""
              width={190}
              height={82}
              quality={90}
              className="h-auto w-[150px] object-contain opacity-90 drop-shadow-[0_14px_34px_rgba(0,0,0,0.32)] md:w-[190px]"
            />
          </div>
          <div className="absolute inset-0 z-20">
            <HeroImageReveal className="h-full w-full">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                quality={82}
                fetchPriority="high"
                sizes="(max-width: 768px) calc(100vw - 24px), (max-width: 1280px) calc(100vw - 32px), 1180px"
                className="absolute inset-0 z-0 object-cover object-[60%_50%] md:object-[58%_50%] lg:object-[60%_50%]"
              />
            </HeroImageReveal>
          </div>
          <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.42)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.2)_38%,rgba(0,0,0,0.05)_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_68%_48%,rgba(196,30,47,0.12),transparent_44%)]" />

          <div className="hero-intro-copy pointer-events-none relative z-40 flex h-full max-w-[520px] flex-col justify-end p-6 md:p-10">
            <Image
              src={images.logo}
              alt="Logo Koi Sushi Porto"
              width={170}
              height={74}
              className="mb-5 h-auto w-[128px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.2)] md:w-[170px]"
            />
            <p className="max-w-sm text-sm font-black uppercase tracking-[0.08em] text-white/82">
              Menu Infinity · All You Can Eat · Take Away
            </p>
            <p className="mt-3 max-w-md text-2xl font-black leading-[1.05] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.28)] md:text-4xl">
              Sushi e cozinha chinesa no Porto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
