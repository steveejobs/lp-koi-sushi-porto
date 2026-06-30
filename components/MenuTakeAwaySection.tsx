"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CircularGallery,
  type CircularGalleryItem,
} from "@/components/ui/circular-gallery";
import { koiMenuPages, type KoiMenuPage } from "@/data/koi-menu-pages";

const WHATSAPP_PHONE = "351961176188";
const WHATSAPP_BASE_MESSAGE =
  "Olá! Vim pelo site e quero fazer um pedido de take-away. O meu pedido é:";

function buildWhatsappUrl() {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(WHATSAPP_BASE_MESSAGE)}`;
}

type MenuPagesLightboxProps = {
  open: boolean;
  pages: KoiMenuPage[];
  activeIndex: number;
  whatsappUrl: string;
  onActiveIndexChange: (index: number) => void;
  onClose: () => void;
};

function wrapPageIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function MenuPagesLightbox({
  open,
  pages,
  activeIndex,
  whatsappUrl,
  onActiveIndexChange,
  onClose,
}: MenuPagesLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const activePage = pages[activeIndex] ?? pages[0];

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onActiveIndexChange(wrapPageIndex(activeIndex - 1, pages.length));
      }
      if (event.key === "ArrowRight") {
        onActiveIndexChange(wrapPageIndex(activeIndex + 1, pages.length));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, onActiveIndexChange, onClose, open, pages.length]);

  if (!open || !activePage) return null;

  const goToPage = (index: number) => {
    onActiveIndexChange(wrapPageIndex(index, pages.length));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/86 px-3 py-3 backdrop-blur-sm md:px-6 md:py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-page-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="grid max-h-[96svh] w-full max-w-6xl grid-rows-[auto_1fr_auto] overflow-hidden rounded-[22px] bg-[#0d0b0b] text-white shadow-[0_30px_90px_rgba(0,0,0,0.46)] md:rounded-[28px]">
        <header className="flex items-start justify-between gap-3 border-b border-white/10 p-4 md:p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-white/55">
              Cardápio Take Away
            </p>
            <h2
              id="menu-page-title"
              className="mt-1 text-xl font-black leading-tight md:text-2xl"
            >
              {activePage.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="shrink-0 rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-black text-neutral-950"
            onClick={onClose}
          >
            Fechar
          </button>
        </header>

        <div className="grid min-h-0 gap-4 overflow-y-auto p-3 md:grid-cols-[minmax(0,1fr)_230px] md:p-5">
          <div className="flex min-h-0 items-center justify-center rounded-[18px] bg-black/35 p-2 md:p-4">
            <img
              src={activePage.src}
              alt={activePage.alt}
              className="max-h-[72svh] w-full max-w-[95vw] object-contain md:max-h-[72vh]"
              loading="eager"
              decoding="async"
            />
          </div>

          <aside className="min-h-0 rounded-[18px] border border-white/10 bg-white/6 p-3 md:overflow-y-auto">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-white/55">
              Páginas
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2 md:grid-cols-1">
              {pages.map((page, index) => (
                <button
                  key={page.id}
                  type="button"
                  className={`grid items-center gap-2 rounded-2xl border p-2 text-left transition md:grid-cols-[48px_1fr] ${
                    index === activeIndex
                      ? "border-white bg-white text-neutral-950"
                      : "border-white/10 bg-black/20 text-white hover:border-white/35"
                  }`}
                  onClick={() => goToPage(index)}
                >
                  <span className="flex aspect-[0.72] w-full items-center justify-center overflow-hidden rounded-xl bg-white md:w-12">
                    <img
                      src={page.src}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="hidden text-xs font-black leading-tight md:block">
                    Página {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <footer className="grid grid-cols-1 items-center gap-2 border-t border-white/10 p-3 sm:grid-cols-[auto_1fr_auto] md:gap-3 md:p-5">
          <button
            type="button"
            className="flex min-h-12 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black text-white"
            onClick={() => goToPage(activeIndex - 1)}
          >
            Anterior
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary min-h-12 w-full"
          >
            Pedir pelo WhatsApp
          </a>
          <button
            type="button"
            className="flex min-h-12 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black text-white"
            onClick={() => goToPage(activeIndex + 1)}
          >
            Seguinte
          </button>
        </footer>
      </div>
    </div>
  );
}

export function MenuTakeAwaySection() {
  const [pagesModalOpen, setPagesModalOpen] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const galleryItems = useMemo<CircularGalleryItem[]>(
    () =>
      koiMenuPages.map((page) => ({
        id: page.id,
        title: page.title,
        src: page.src,
        alt: page.alt,
      })),
    [],
  );

  const whatsappUrl = buildWhatsappUrl();

  const openMenuPage = (_item: CircularGalleryItem, index: number) => {
    setActivePageIndex(index);
    setPagesModalOpen(true);
  };

  const openFirstPage = () => {
    setActivePageIndex(0);
    setPagesModalOpen(true);
  };

  return (
    <section id="menu-take-away" className="section-pad bg-[#fffdf9]">
      <div className="container-page">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex rounded-full bg-[var(--chambar-red)] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white shadow-sm">
            1 caixa &middot; 4 tipos &agrave; escolha &middot; 8&euro;
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl">
            Monte o seu Take Away
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-7 text-neutral-600 md:text-lg">
            Veja o cardápio completo, escolha a sua caixa de sushi ou peça
            pratos chineses e Take Away pelo WhatsApp.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={openFirstPage}
          >
            Ver cardápio completo
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            Pedir pelo WhatsApp
          </a>
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl justify-center md:mt-9">
          {galleryItems.length > 0 ? (
            <CircularGallery items={galleryItems} onItemClick={openMenuPage} />
          ) : (
            <p className="rounded-lg border border-black/10 bg-white p-6 text-center text-sm font-bold text-neutral-600">
              As imagens do cardápio Take Away ainda não foram encontradas.
            </p>
          )}
        </div>
      </div>

      <MenuPagesLightbox
        open={pagesModalOpen}
        pages={koiMenuPages}
        activeIndex={activePageIndex}
        whatsappUrl={whatsappUrl}
        onActiveIndexChange={setActivePageIndex}
        onClose={() => setPagesModalOpen(false)}
      />
    </section>
  );
}
