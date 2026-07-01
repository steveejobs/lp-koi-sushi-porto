"use client";

import { type CSSProperties, useState } from "react";
import { InstagramCircularMenuGallery } from "@/components/InstagramCircularMenuGallery";
import { MenuFullViewer } from "@/components/MenuFullViewer";
import { koiMenuPages } from "@/data/koi-menu-pages";
import { getWhatsappUrl } from "@/lib/site";

function pageLabel(index: number, total: number) {
  return `Página ${index + 1} de ${total}`;
}

export function InstagramMenuTakeAwaySection() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const whatsappUrl = getWhatsappUrl("instagram");
  const totalPages = koiMenuPages.length;

  const openFirstPage = () => {
    setActivePageIndex(0);
    setModalOpen(true);
  };

  return (
    <section
      className="ig-rise mx-auto mt-5 max-w-[720px] overflow-x-clip px-5 py-4"
      style={{ "--ig-delay": "500ms" } as CSSProperties}
      aria-labelledby="instagram-menu-title"
    >
      <div className="text-center">
        <h2
          id="instagram-menu-title"
          className="text-2xl font-black leading-tight text-neutral-950"
        >
          Menu Take Away
        </h2>
        <p className="mx-auto mt-2 max-w-[22rem] text-sm font-bold leading-6 text-neutral-600">
          Arraste para ver o menu, toque para ampliar e peça pelo WhatsApp.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2 min-[380px]:flex-row">
        <button
          type="button"
          className="btn btn-primary min-h-11 flex-1 px-4 text-sm"
          onClick={openFirstPage}
        >
          Ver menu completo
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline min-h-11 flex-1 px-4 text-sm"
        >
          Pedir pelo WhatsApp
        </a>
      </div>

      <div className="mt-5 text-center" aria-live="polite">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-[var(--chambar-red)]">
          {pageLabel(activeGalleryIndex, totalPages)}
        </p>
      </div>

      <div className="mt-4">
        <InstagramCircularMenuGallery
          pages={koiMenuPages}
          onActiveIndexChange={setActiveGalleryIndex}
          paused={modalOpen}
          onPageClick={(index) => {
            setActivePageIndex(index);
            setModalOpen(true);
          }}
        />
      </div>

      <MenuFullViewer
        open={modalOpen}
        activeIndex={activePageIndex}
        whatsappUrl={whatsappUrl}
        onActiveIndexChange={setActivePageIndex}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
