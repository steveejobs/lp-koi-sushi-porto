"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CircularGallery,
  type CircularGalleryItem,
} from "@/components/ui/circular-gallery";
import { koiMenuPages, type KoiMenuPage } from "@/data/koi-menu-pages";

const WHATSAPP_PHONE = "351961176188";
const WHATSAPP_BASE_MESSAGE =
  "OlÃ¡! Vim pelo site e quero fazer um pedido de take-away. O meu pedido Ã©:";

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

function pageLabel(index: number, total: number) {
  return `PÃ¡gina ${index + 1} de ${total}`;
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
  const totalPages = pages.length;

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onActiveIndexChange(wrapPageIndex(activeIndex - 1, totalPages));
      }
      if (event.key === "ArrowRight") {
        onActiveIndexChange(wrapPageIndex(activeIndex + 1, totalPages));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, onActiveIndexChange, onClose, open, totalPages]);

  if (!open || !activePage) return null;

  const goToPage = (index: number) => {
    onActiveIndexChange(wrapPageIndex(index, totalPages));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 px-2 py-2 backdrop-blur-sm md:px-6 md:py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-page-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="grid h-[96svh] max-h-[94vh] w-full max-w-[min(1480px,96vw)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[16px] border border-white/10 bg-[#100d0c] text-white shadow-[0_30px_90px_rgba(0,0,0,0.5)] md:h-[94vh] md:rounded-[18px]">
        <header className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-5 md:py-4">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#c9a45c]">
              CARDÃPIO TAKE AWAY
            </p>
            <h2
              id="menu-page-title"
              className="mt-1 text-base font-black leading-tight text-white md:text-xl"
            >
              Menu Take Away Â· {pageLabel(activeIndex, totalPages)}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="shrink-0 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-black text-neutral-950 transition hover:bg-[#f5e7cf]"
            onClick={onClose}
            aria-label="Fechar cardÃ¡pio"
          >
            Fechar
          </button>
        </header>

        <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-3 overflow-hidden p-3 md:grid-cols-[minmax(0,1fr)_320px] md:grid-rows-1 md:gap-4 md:p-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-[12px] border border-white/8 bg-[#070606]/88 p-2 md:p-4">
            <img
              src={activePage.src}
              alt={activePage.alt}
              className="max-h-[68svh] w-full max-w-full object-contain sm:max-h-[72svh] md:max-h-[calc(94vh-210px)]"
              loading="eager"
              decoding="async"
            />
          </div>

          <aside className="min-h-0 rounded-[12px] border border-white/10 bg-white/[0.045] p-2 md:flex md:flex-col md:p-3">
            <p className="mb-2 hidden text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/50 md:block">
              PÃ¡ginas
            </p>
            <div className="koi-menu-scroll flex gap-2 overflow-x-auto pb-1 md:min-h-0 md:flex-1 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pr-1">
              {pages.map((page, index) => (
                <button
                  key={page.id}
                  type="button"
                  className={`flex w-[88px] shrink-0 items-center gap-2 rounded-[10px] border p-2 text-left transition md:w-full ${
                    index === activeIndex
                      ? "border-[#c9a45c] bg-[#c9a45c]/18 text-white"
                      : "border-white/10 bg-black/18 text-white hover:border-white/30 hover:bg-white/8"
                  }`}
                  onClick={() => goToPage(index)}
                  aria-label={`Abrir pÃ¡gina ${index + 1} de ${totalPages}`}
                >
                  <span className="flex h-[72px] w-14 shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-white md:h-20 md:w-16">
                    <img
                      src={page.src}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="block min-w-0 text-xs font-black leading-tight">
                    PÃ¡gina {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <footer className="grid grid-cols-2 items-center gap-2 border-t border-white/10 px-3 py-3 md:grid-cols-[132px_minmax(220px,520px)_132px] md:justify-center md:gap-3 md:px-5 md:py-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary col-span-2 min-h-11 w-full md:col-span-1 md:col-start-2"
          >
            Pedir pelo WhatsApp
          </a>
          <button
            type="button"
            className="flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black text-white transition hover:border-white/45 md:col-start-1 md:row-start-1"
            onClick={() => goToPage(activeIndex - 1)}
          >
            Anterior
          </button>
          <button
            type="button"
            className="flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black text-white transition hover:border-white/45 md:col-start-3 md:row-start-1"
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
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

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
  const totalPages = koiMenuPages.length;

  const openMenuPage = (_item: CircularGalleryItem, index: number) => {
    setActivePageIndex(index);
    setPagesModalOpen(true);
  };

  const openFirstPage = () => {
    setActivePageIndex(0);
    setPagesModalOpen(true);
  };

  return (
    <section
      id="menu-take-away"
      className="section-pad overflow-x-clip bg-[#fffdf9]"
    >
      <div className="mx-auto w-full max-w-[1480px] px-[clamp(24px,5vw,88px)] max-[480px]:px-3">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex rounded-full bg-[var(--chambar-red)] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white shadow-sm">
            1 caixa &middot; 4 tipos &agrave; escolha &middot; 8&euro;
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl">
            Monte o seu Take Away
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-7 text-neutral-600 md:text-lg">
            Veja o cardÃ¡pio completo, escolha a sua caixa de sushi ou peÃ§a
            pratos chineses e Take Away pelo WhatsApp.
          </p>
        </div>

        <div className="relative z-30 mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={openFirstPage}
          >
            Ver cardÃ¡pio completo
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

        <div
          className="relative z-20 mx-auto mt-5 text-center"
          aria-live="polite"
        >
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--chambar-red)]">
            {pageLabel(activeGalleryIndex, totalPages)}
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-3 flex w-full max-w-[1280px] justify-center overflow-visible md:mt-5 lg:mt-[clamp(48px,5vw,88px)]">
          {galleryItems.length > 0 ? (
            <CircularGallery
              items={galleryItems}
              desktopConfig={{
                autoRotateSpeed: 0.011,
                radius: 460,
                visibleSideCount: 1,
                sideOpacity: 0.12,
                sideScale: 0.76,
                farOpacity: 0,
              }}
              onItemClick={openMenuPage}
              onActiveIndexChange={setActiveGalleryIndex}
            />
          ) : (
            <p className="rounded-lg border border-black/10 bg-white p-6 text-center text-sm font-bold text-neutral-600">
              As imagens do cardÃ¡pio Take Away ainda nÃ£o foram encontradas.
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
