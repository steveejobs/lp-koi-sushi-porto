"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  takeAwayMenuImages,
  type ChambarMediaAsset,
} from "@/data/chambar-media";
import { buildWhatsappLink } from "@/lib/site";

type TakeAwayMenuItem = ChambarMediaAsset & {
  id: string;
  title: string;
  description: string;
};

const takeawayMenus = takeAwayMenuImages satisfies TakeAwayMenuItem[];

const offerDetails = [
  "1 caixa · 8 €",
  "4 tipos de sushi à sua escolha",
  "2 caixas: oferta de 1 bebida",
  "4 caixas: pague 3",
  "Promoções não acumuláveis.",
];

export function MenuTakeAwaySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const lightboxTrigger = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const activeItem = takeawayMenus[activeIndex];

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % takeawayMenus.length);
  };

  const goToPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + takeawayMenus.length) % takeawayMenus.length,
    );
  };

  const openLightbox = (trigger: HTMLElement) => {
    lightboxTrigger.current = trigger;
    setIsZoomed(false);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
    window.requestAnimationFrame(() => lightboxTrigger.current?.focus());
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  const whatsappUrl = buildWhatsappLink(activeItem.title);

  const lightbox = isLightboxOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex bg-black/90 p-2 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="takeaway-lightbox-title"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-[#b8924a]/35 bg-[#0f0d0a] shadow-2xl">
            <div className="flex min-h-14 items-center justify-between gap-3 border-b border-white/10 px-3 py-2 sm:px-5">
              <div className="min-w-0">
                <p
                  id="takeaway-lightbox-title"
                  className="truncate text-sm font-black text-[#fff8ed] sm:text-base"
                >
                  {activeItem.title}
                </p>
                <p className="text-xs font-semibold text-[#efe2c8]/60">
                  Imagem completa · {activeIndex + 1} de {takeawayMenus.length}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed((current) => !current)}
                  className="rounded-md border border-[#b8924a]/30 px-3 py-2 text-xs font-black text-[#fff8ed] transition hover:border-[#b8924a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8924a]"
                  aria-pressed={isZoomed}
                >
                  {isZoomed ? "Ajustar" : "Ampliar"}
                </button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xl text-white transition hover:border-[#b8924a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8924a]"
                  aria-label="Fechar imagem completa"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-2 sm:p-4">
              <div className="flex min-h-full min-w-full items-center justify-center">
                <Image
                  key={`${activeItem.src}-${isZoomed ? "zoom" : "fit"}`}
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={1055}
                  height={1491}
                  sizes={isZoomed ? "1055px" : "95vw"}
                  unoptimized
                  className={`takeaway-lightbox-image h-auto object-contain ${
                    isZoomed
                      ? "w-[1055px] max-w-none"
                      : "max-h-[calc(100dvh-7.5rem)] w-auto max-w-full"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-2 sm:px-5 sm:py-3">
              <button
                type="button"
                onClick={goToPrevious}
                className="btn btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8924a]"
                aria-label="Menu anterior"
              >
                Menu anterior
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="btn btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8924a]"
                aria-label="Próximo menu"
              >
                Próximo menu
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <section
        id="menu"
        className="relative overflow-hidden bg-[#0f0d0a] py-14 text-[#fff8ed] md:py-20"
        aria-labelledby="takeaway-title"
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
              <span className="eyebrow text-[#c9a45c]">Ementa para levar</span>
              <h2
                id="takeaway-title"
                className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] md:text-6xl"
              >
                Menu Take Away
              </h2>
            </div>
            <p className="max-w-xl text-base font-semibold leading-7 text-[#efe2c8]/82 md:justify-self-end md:text-lg">
              Escolha a caixa, veja os números e envie o pedido pelo WhatsApp.
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-[#c9a45c]/18 bg-[#16110d]/78 p-4 md:p-5">
            <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide text-[#fff8ed]">
              {offerDetails.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#c9a45c]/22 bg-black/24 px-3 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-6 xl:grid-cols-[0.72fr_1.16fr_0.72fr] xl:items-center">
            <div className="order-2 -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2 xl:order-1 xl:mx-0 xl:grid xl:overflow-visible xl:px-0 xl:pb-0">
              {takeawayMenus.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`min-w-[220px] snap-start rounded-lg border p-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c] xl:min-w-0 ${
                    activeIndex === index
                      ? "border-[#c9a45c] bg-[#a91f24]/18 text-white"
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
              <button
                type="button"
                className="relative mx-auto block w-full max-w-[620px] touch-pan-y overflow-hidden rounded-lg border border-[#c9a45c]/25 bg-[#efe2c8] p-2 text-left shadow-[0_30px_80px_rgba(0,0,0,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c]"
                onPointerDown={(event) => {
                  if (!event.isPrimary || event.button > 0) return;
                  pointerStart.current = {
                    x: event.clientX,
                    y: event.clientY,
                  };
                  suppressClick.current = false;
                }}
                onPointerUp={(event) => {
                  if (!pointerStart.current || !event.isPrimary) return;
                  const deltaX = event.clientX - pointerStart.current.x;
                  const deltaY = event.clientY - pointerStart.current.y;
                  pointerStart.current = null;

                  if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
                    return;
                  }

                  suppressClick.current = true;
                  if (deltaX < 0) goToNext();
                  else goToPrevious();
                }}
                onPointerCancel={() => {
                  pointerStart.current = null;
                }}
                onClick={(event) => {
                  if (suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  openLightbox(event.currentTarget);
                }}
                aria-label={`Ver imagem completa: ${activeItem.title}`}
              >
                <Image
                  key={activeItem.src}
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={1055}
                  height={1491}
                  sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) 620px, 520px"
                  priority={activeIndex === 0}
                  draggable={false}
                  className="takeaway-menu-image h-auto w-full rounded-md object-contain"
                />
              </button>

              <div
                className="mt-4 flex justify-center gap-2"
                aria-label="Selecionar menu"
              >
                {takeawayMenus.map((item, index) => (
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
                    aria-current={activeIndex === index ? "true" : undefined}
                  />
                ))}
              </div>
            </div>

            <aside
              className="order-3 rounded-lg border border-[#c9a45c]/18 bg-[#16110d]/86 p-5"
              aria-live="polite"
            >
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#c9a45c]">
                Menu {activeIndex + 1} de {takeawayMenus.length}
              </p>
              <h3 className="mt-3 text-2xl font-black">{activeItem.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#efe2c8]/78">
                {activeItem.description}
              </p>
            </aside>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Pedir pelo WhatsApp
            </a>
            <button
              type="button"
              onClick={(event) => openLightbox(event.currentTarget)}
              className="btn btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c]"
            >
              Ver imagem completa
            </button>
            <button
              type="button"
              onClick={goToPrevious}
              className="btn btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c]"
              aria-label="Menu anterior"
            >
              Menu anterior
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="btn btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c]"
              aria-label="Próximo menu"
            >
              Próximo menu
            </button>
          </div>
        </div>
      </section>
      {lightbox}
    </>
  );
}
