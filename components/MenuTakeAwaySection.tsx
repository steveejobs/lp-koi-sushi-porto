"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  takeAwayMenuImages,
  type ChambarMediaAsset,
} from "@/data/chambar-media";
import { buildWhatsappLink, whatsappMessages } from "@/lib/site";
import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery";

type TakeAwayMenuItem = ChambarMediaAsset & {
  id: string;
  title: string;
  description: string;
};

const menuImages = takeAwayMenuImages satisfies TakeAwayMenuItem[];

function useDesktopGallery() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const update = () => setEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return enabled;
}

export function MenuTakeAwaySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const showDesktopGallery = useDesktopGallery();
  const activeItem = menuImages[activeIndex];

  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      menuImages.slice(0, 8).map((item) => ({
        common: item.title,
        binomial: item.description,
        photo: {
          url: item.src,
          text: item.alt,
          by: "Koi Sushi Porto",
        },
      })),
    [],
  );

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % menuImages.length);
  };

  const goToPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + menuImages.length) % menuImages.length,
    );
  };

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[#0f0d0a] py-14 text-[#fff8ed] md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a45c]/50 to-transparent" />
        <div className="absolute -right-24 top-20 h-56 w-56 rounded-full border border-[#c92127]/25" />
        <div className="absolute -left-28 bottom-24 h-64 w-64 rounded-full border border-[#c9a45c]/18" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid gap-5 md:grid-cols-[0.82fr_1.18fr] md:items-end">
          <div>
            <span className="eyebrow text-[#c9a45c]">Cardapio Take Away</span>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] md:text-6xl">
              Monte o seu Take Away
            </h2>
          </div>
          <p className="max-w-xl text-base font-semibold leading-7 text-[#efe2c8]/82 md:justify-self-end md:text-lg">
            Cada caixa tem combinacoes de sushi a sua escolha. Veja as opcoes,
            escolha os numeros e envie o pedido pelo WhatsApp.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-[#c9a45c]/18 bg-[#16110d]/78 p-4 md:p-5">
          <p className="text-sm font-bold leading-6 text-[#efe2c8]">
            Escolha a sua caixa, veja as opcoes e envie o pedido pelo WhatsApp.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide text-[#fff8ed]">
            {[
              "1 caixa - 8 EUR",
              "Com 4 tipos de sushi a sua escolha",
              "2 caixas: oferta de 1 bebida",
              "4 caixas: pague 3",
              "Promocoes nao acumulaveis",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#c9a45c]/22 bg-black/24 px-3 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[0.68fr_1.02fr_0.74fr] xl:items-center">
          <div className="order-2 grid gap-2 xl:order-1">
            {menuImages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-lg border p-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c] ${
                  activeIndex === index
                    ? "border-[#c9a45c] bg-[#c92127]/18 text-white"
                    : "border-[#efe2c8]/12 bg-white/[0.04] text-[#efe2c8]/78 hover:border-[#c9a45c]/55 hover:text-white"
                }`}
                aria-current={activeIndex === index ? "true" : undefined}
              >
                <span className="block text-sm font-black">{item.title}</span>
                <span className="mt-1 block text-xs font-semibold leading-5 opacity-80">
                  {item.description}
                </span>
              </button>
            ))}
          </div>

          <div className="order-1 xl:order-2">
            <div
              className="relative mx-auto max-w-[520px] touch-pan-y overflow-hidden rounded-lg border border-[#c9a45c]/25 bg-[#efe2c8] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.34)]"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return;
                const delta =
                  (event.changedTouches[0]?.clientX ?? touchStartX.current) -
                  touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(delta) < 42) return;
                if (delta < 0) goToNext();
                else goToPrevious();
              }}
            >
              <Image
                key={activeItem.src}
                src={activeItem.src}
                alt={activeItem.alt}
                width={1055}
                height={1491}
                sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) 520px, 460px"
                priority={activeIndex === 0}
                loading={activeIndex === 0 ? "eager" : "lazy"}
                className="h-auto w-full rounded-md object-contain"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={buildWhatsappLink(whatsappMessages.order)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Pedir pelo WhatsApp
              </a>
              <button
                type="button"
                onClick={goToNext}
                className="btn btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c]"
              >
                Ver proximo cardapio
              </button>
            </div>

            <div
              className="mt-4 flex justify-center gap-2"
              aria-label="Selecionar cardapio"
            >
              {menuImages.map((item, index) => (
                <button
                  key={`${item.id}-dot`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c] ${
                    activeIndex === index
                      ? "w-7 bg-[#c9a45c]"
                      : "w-2.5 bg-[#efe2c8]/32 hover:bg-[#efe2c8]/64"
                  }`}
                  aria-label={`Ver ${item.title}`}
                />
              ))}
            </div>
          </div>

          <aside className="order-3 rounded-lg border border-[#c9a45c]/18 bg-[#16110d]/86 p-5">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#c9a45c]">
              Cardapio ativo
            </p>
            <h3 className="mt-3 text-2xl font-black">{activeItem.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#efe2c8]/78">
              {activeItem.description}
            </p>
            <div className="mt-6 space-y-3 border-t border-[#efe2c8]/12 pt-5 text-sm font-bold leading-6 text-[#efe2c8]/86">
              <p>Menu Infinity e All You Can Eat no restaurante.</p>
              <p>Take Away com sushi fresco e pratos quentes.</p>
              <p>Horario: 12h-15h | 19h-23h.</p>
            </div>
          </aside>
        </div>

        {showDesktopGallery ? (
          <div className="mt-12 hidden h-[460px] overflow-hidden rounded-lg border border-[#c9a45c]/14 bg-black/20 xl:block">
            <CircularGallery
              items={galleryItems}
              radius={440}
              autoRotateSpeed={0.015}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
