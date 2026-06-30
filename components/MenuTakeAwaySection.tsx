"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MenuFullModal } from "@/components/MenuFullModal";
import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery";
import {
  KOI_MENU_CATEGORIES,
  KOI_TAKE_AWAY_OFFER,
  type KoiMenuItem,
} from "@/data/koi-menu";
import { koiMenuPages, type KoiMenuPage } from "@/data/koi-menu-pages";

const MAX_SELECTED_ITEMS = 4;
const WHATSAPP_PHONE = "351961176188";
const WHATSAPP_BASE_MESSAGE =
  "Olá! Vim pelo site e quero fazer um pedido de take-away. O meu pedido é:";

function itemKey(item: KoiMenuItem) {
  return `${item.code}-${item.name}`;
}

function selectionLabel(count: number) {
  return count === 1 ? "1/4 tipo escolhido" : `${count}/4 tipos escolhidos`;
}

function buildWhatsappUrl(selectedItems: KoiMenuItem[]) {
  const lines = selectedItems.map((item) => `- ${item.code} ${item.name}`);
  const message =
    selectedItems.length > 0
      ? [WHATSAPP_BASE_MESSAGE, "", "Caixa Take Away 8€:", ...lines].join("\n")
      : WHATSAPP_BASE_MESSAGE;

  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}

type MenuPagesModalProps = {
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

function MenuPagesModal({
  open,
  pages,
  activeIndex,
  whatsappUrl,
  onActiveIndexChange,
  onClose,
}: MenuPagesModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 px-3 py-3 backdrop-blur-sm md:px-6 md:py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-page-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[96svh] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] bg-[#0d0b0b] text-white shadow-[0_30px_90px_rgba(0,0,0,0.42)] md:rounded-[28px]">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-4 md:p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-white/55">
              Menu completo
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
        </div>

        <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-3 md:grid-cols-[1fr_250px] md:p-5">
          <div className="flex min-h-0 flex-col gap-3">
            <div className="flex min-h-0 flex-1 items-center justify-center rounded-[18px] bg-black/35 p-2 md:p-4">
              <img
                src={activePage.src}
                alt={activePage.alt}
                className="max-h-[85svh] w-full max-w-full object-contain md:max-h-[72vh]"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
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
            </div>
          </div>

          <div className="min-h-0 rounded-[18px] border border-white/10 bg-white/6 p-3 md:overflow-y-auto">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-white/55">
              Páginas
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-1">
              {pages.map((page, index) => (
                <button
                  key={page.id}
                  type="button"
                  className={`grid grid-cols-[54px_1fr] items-center gap-3 rounded-2xl border p-2 text-left transition ${
                    index === activeIndex
                      ? "border-white bg-white text-neutral-950"
                      : "border-white/10 bg-black/20 text-white hover:border-white/35"
                  }`}
                  onClick={() => goToPage(index)}
                >
                  <span className="flex h-16 w-[54px] items-center justify-center overflow-hidden rounded-xl bg-white">
                    <img
                      src={page.src}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="text-xs font-black leading-tight">
                    {page.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MenuTakeAwaySection() {
  const [selectedItems, setSelectedItems] = useState<KoiMenuItem[]>([]);
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [pagesModalOpen, setPagesModalOpen] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [limitWarning, setLimitWarning] = useState(false);
  const menuActionsRef = useRef<HTMLDivElement | null>(null);

  const limitReached = selectedItems.length >= MAX_SELECTED_ITEMS;

  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      koiMenuPages.map((page, index) => ({
        id: page.id,
        title: page.title,
        description: page.alt,
        image: {
          src: page.src,
          alt: page.alt,
          position: "center",
        },
        meta: `Página ${index + 1}/${koiMenuPages.length}`,
      })),
    [],
  );

  const toggleItem = (item: KoiMenuItem) => {
    setSelectedItems((current) => {
      const exists = current.some(
        (selected) => itemKey(selected) === itemKey(item),
      );

      if (exists) {
        setLimitWarning(false);
        return current.filter(
          (selected) => itemKey(selected) !== itemKey(item),
        );
      }

      if (current.length >= MAX_SELECTED_ITEMS) {
        setLimitWarning(true);
        return current;
      }

      setLimitWarning(false);
      return [...current, item];
    });
  };

  const openMenuPage = (_item: GalleryItem, index: number) => {
    setActivePageIndex(index);
    setPagesModalOpen(true);
  };

  const openPagesList = (_item?: GalleryItem, index = activePageIndex) => {
    setActivePageIndex(index);
    setPagesModalOpen(true);
  };

  const openSelectionModal = () => {
    setSelectionModalOpen(true);
    setLimitWarning(false);
  };

  const whatsappUrl = buildWhatsappUrl(selectedItems);

  return (
    <section id="menu-take-away" className="section-pad bg-[#fffdf9]">
      <div className="container-page">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex rounded-full border border-[var(--koi-gold)]/45 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--chambar-red)] shadow-sm">
            1 caixa &middot; 4 tipos &agrave; escolha &middot; 8&euro;
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl">
            Monte o seu Take Away
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-7 text-neutral-600 md:text-lg">
            Veja o cardápio completo, escolha a sua caixa de sushi ou peça
            pratos chineses e Take Away pelo WhatsApp.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-black leading-6 text-neutral-700">
            Também há pratos chineses, entradas, massas e arroz no menu.
          </p>
        </div>

        <div
          ref={menuActionsRef}
          className="mt-7 flex flex-wrap justify-center gap-3"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openPagesList()}
          >
            Ver menu completo
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={openSelectionModal}
          >
            Come&ccedil;ar escolha
          </button>
        </div>

        <div className="mx-auto mt-9 max-w-5xl">
          <CircularGallery
            items={galleryItems}
            onSelect={openMenuPage}
            onViewItems={openPagesList}
          />
        </div>

        <aside className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-[28px] border border-black/10 bg-white p-5 text-left shadow-[0_18px_44px_rgba(16,16,16,0.08)] md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--chambar-red)]">
              A sua caixa
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-black text-neutral-950">
                Take Away
              </h3>
              <span className="rounded-full bg-[#fff4ec] px-3 py-1 text-xs font-black text-[var(--chambar-red)]">
                {selectionLabel(selectedItems.length)}
              </span>
            </div>
            <p className="mt-2 text-sm font-bold leading-6 text-neutral-600">
              {selectedItems.length === 0
                ? "Escolha até 4 tipos para preparar o pedido."
                : KOI_TAKE_AWAY_OFFER}
            </p>

            {limitWarning ? (
              <p className="mt-4 rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm font-black text-[var(--chambar-red)]">
                J&aacute; escolheu 4 tipos. Remova um item para escolher outro.
              </p>
            ) : null}

            {selectedItems.length > 0 ? (
              <ul className="mt-5 grid gap-2">
                {selectedItems.map((item) => (
                  <li
                    key={itemKey(item)}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-black/8 bg-[#fffdf9] px-3 py-2"
                  >
                    <span className="text-sm font-black text-neutral-950">
                      <span className="text-[var(--chambar-red)]">
                        {item.code}
                      </span>{" "}
                      {item.name}
                    </span>
                    <button
                      type="button"
                      className="text-xs font-black text-neutral-500 underline decoration-[var(--chambar-red)] decoration-2 underline-offset-4"
                      aria-label={`Remover ${item.code} ${item.name}`}
                      onClick={() => toggleItem(item)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="btn btn-outline w-full"
                onClick={() => openPagesList()}
              >
                Ver menu completo
              </button>
              {selectedItems.length > 0 ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full"
                >
                  Enviar pedido pelo WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={openSelectionModal}
                >
                  Escolher itens
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>

      <MenuFullModal
        open={selectionModalOpen}
        categories={KOI_MENU_CATEGORIES}
        selectedItems={selectedItems}
        maxItems={MAX_SELECTED_ITEMS}
        limitReached={limitWarning || limitReached}
        onClose={() => setSelectionModalOpen(false)}
        onToggleItem={toggleItem}
      />

      <MenuPagesModal
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
