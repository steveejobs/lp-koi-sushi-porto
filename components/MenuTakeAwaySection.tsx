"use client";

import { useMemo, useState } from "react";
import { MenuFullViewer } from "@/components/MenuFullViewer";
import {
  CircularGallery,
  type CircularGalleryItem,
} from "@/components/ui/circular-gallery";
import { koiMenuPages } from "@/data/koi-menu-pages";
import { getWhatsappUrl } from "@/lib/site";

function pageLabel(index: number, total: number) {
  return `Página ${index + 1} de ${total}`;
}

export function MenuTakeAwaySection() {
  const [pagesModalOpen, setPagesModalOpen] = useState(false);
  const [initialViewerPage, setInitialViewerPage] = useState(0);
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

  const whatsappUrl = getWhatsappUrl("site");
  const totalPages = koiMenuPages.length;

  const openMenuPage = (_item: CircularGalleryItem, index: number) => {
    setInitialViewerPage(index);
    setPagesModalOpen(true);
  };

  const openFirstPage = () => {
    setInitialViewerPage(0);
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
            Veja o menu completo, escolha a sua caixa de sushi ou peça pratos
            chineses pelo WhatsApp.
          </p>
        </div>

        <div className="relative z-30 mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={openFirstPage}
          >
            Ver menu completo
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
              autoRotateSpeed={0.025}
              desktopConfig={{
                autoRotateSpeed: 0.03,
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
              As imagens do menu Take Away ainda não foram encontradas.
            </p>
          )}
        </div>
      </div>

      <MenuFullViewer
        open={pagesModalOpen}
        onOpenChange={setPagesModalOpen}
        pages={koiMenuPages}
        initialPage={initialViewerPage}
        whatsappUrl={whatsappUrl}
        source="site"
      />
    </section>
  );
}
