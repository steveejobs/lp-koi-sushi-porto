import Image from "next/image";
import { heroImage } from "@/data/chambar-media";
import { images } from "@/lib/site";

export function HeroInteractiveIntro() {
  return (
    <section className="bg-[#0f0d0a] pt-4 md:pt-6" aria-label="Abertura Koi Sushi Porto">
      <div className="container-page">
        <div className="intro-stage relative isolate mx-auto h-[62svh] min-h-[420px] overflow-hidden rounded-lg border border-[#c9a45c]/18 bg-[#050505] shadow-[0_28px_76px_rgba(0,0,0,0.3)] sm:h-[68svh] sm:min-h-[470px] md:h-[76vh] md:min-h-[576px]">
          <div
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_68%_36%,rgba(201,164,92,0.18),transparent_34%),linear-gradient(135deg,#050505_0%,#16110d_55%,#25080a_100%)]"
            aria-hidden="true"
          />
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            quality={88}
            fetchPriority="high"
            sizes="(max-width: 768px) calc(100vw - 24px), (max-width: 1280px) calc(100vw - 32px), 1180px"
            className="absolute inset-0 z-20 object-cover object-[52%_50%] md:object-center"
          />
          <div className="absolute inset-0 z-30 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.16)_48%,rgba(0,0,0,0.74)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.32)_46%,rgba(0,0,0,0.06)_100%)]" />
          <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_70%_42%,rgba(201,164,92,0.12),transparent_38%)]" />

          <div className="hero-intro-copy relative z-40 flex h-full max-w-[560px] flex-col justify-end p-6 md:p-10">
            <Image
              src={images.logo}
              alt="Koi Sushi Porto"
              width={180}
              height={80}
              priority
              className="mb-5 h-auto w-[118px] object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.38)] md:w-[150px]"
            />
            <p className="max-w-sm text-sm font-black uppercase tracking-[0.08em] text-[#c9a45c]">
              Menu Infinity · Take Away
            </p>
            <p className="mt-3 max-w-[19rem] text-[1.42rem] font-black leading-[1.08] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.28)] sm:max-w-md sm:text-2xl md:text-4xl">
              Sushi e cozinha chinesa feitos na hora.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
