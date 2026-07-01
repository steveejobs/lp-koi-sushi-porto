import Image from "next/image";
import { HeroImageReveal } from "@/components/HeroImageReveal";
import { CHAMBAR_CONFIG, chambarGoogleProof } from "@/data/chambar-config";
import { heroImage } from "@/data/chambar-media";
import { GOOGLE_MAPS_URL, TAKE_AWAY_URL, images } from "@/lib/site";

const heroChips = ["Sushi", "Cozinha chinesa", "Pratos quentes", "Take Away"];

export function HeroInteractiveIntro() {
  return (
    <section
      className="bg-[#050505] pt-4 md:pt-6"
      aria-label="Abertura Koi Sushi Porto"
    >
      <div className="container-page">
        <div className="intro-stage relative isolate mx-auto h-[72svh] min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-[#050505] shadow-[0_28px_76px_rgba(16,16,16,0.1)] sm:h-[76svh] md:h-[calc(100svh-112px)] md:min-h-[640px] lg:w-[90%]">
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
          <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.68)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.36)_42%,rgba(0,0,0,0.08)_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_68%_48%,rgba(196,30,47,0.12),transparent_44%)]" />

          <div className="hero-intro-copy pointer-events-none relative z-40 flex h-full max-w-[720px] flex-col justify-end p-6 md:p-10 lg:p-12">
            <Image
              src={images.logo}
              alt="Logo do Koi Sushi Porto"
              width={170}
              height={170}
              className="mb-5 h-[78px] w-[128px] object-contain object-left p-1 drop-shadow-[0_8px_20px_rgba(0,0,0,0.2)] md:h-[104px] md:w-[170px]"
            />
            <span className="eyebrow text-[#c9a45c]">Koi Sushi Porto</span>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.28)] md:text-7xl">
              Sushi e cozinha chinesa no Porto
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/82 md:text-xl">
              Menu Infinity, All You Can Eat e Take Away com sushi, pratos
              chineses e tudo preparado na hora.
            </p>
            <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-[#c9a45c]">
              Koi Sushi Porto &middot; {CHAMBAR_CONFIG.openingHours}
            </p>
            <p className="mt-4 text-sm font-black text-white/82">
              {chambarGoogleProof}
            </p>
            <div className="pointer-events-auto mt-8 grid gap-3 sm:flex">
              <a
                href={TAKE_AWAY_URL}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Pedir Take Away
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                className="btn btn-outline border-white/35 text-white hover:bg-white hover:text-neutral-950"
                target="_blank"
                rel="noreferrer"
              >
                Ver localiza&ccedil;&atilde;o
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {heroChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/18 bg-black/22 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-sm backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
