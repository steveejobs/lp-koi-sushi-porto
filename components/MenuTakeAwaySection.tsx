"use client";

import { useMemo, useRef, useState } from "react";
import { MenuFullModal } from "@/components/MenuFullModal";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import {
  KOI_MENU_CATEGORIES,
  KOI_TAKE_AWAY_OFFER,
  type KoiMenuCategory,
  type KoiMenuItem,
} from "@/data/koi-menu";

const MAX_SELECTED_ITEMS = 4;
const WHATSAPP_PHONE = "351961176188";

const categoryImages: Record<string, GalleryItem["image"]> = {
  sashimi: {
    src: "/koi/galeria/gallery-food-01.webp",
    alt: "Sushi do Koi Sushi Porto",
    position: "center",
  },
  braseado: {
    src: "/koi/galeria/gallery-food-02.webp",
    alt: "Sushi do Koi Sushi Porto",
    position: "center",
  },
  temaki: {
    src: "/koi/galeria/gallery-food-03.webp",
    alt: "Temaki do Koi Sushi Porto",
    position: "center",
  },
  "ovo-temaki": {
    src: "/koi/galeria/gallery-food-04.webp",
    alt: "Temaki do Koi Sushi Porto",
    position: "center",
  },
  gunkan: {
    src: "/koi/galeria/gallery-food-05.webp",
    alt: "Gunkan do Koi Sushi Porto",
    position: "center",
  },
  "rolo-grande": {
    src: "/koi/galeria/gallery-food-06.webp",
    alt: "Sushi do Koi Sushi Porto",
    position: "center",
  },
  "sushi-frito": {
    src: "/koi/galeria/gallery-food-07.webp",
    alt: "Sushi do Koi Sushi Porto",
    position: "center",
  },
};

function itemKey(item: KoiMenuItem) {
  return `${item.code}-${item.name}`;
}

function selectionLabel(count: number) {
  return count === 1 ? "1/4 tipo escolhido" : `${count}/4 tipos escolhidos`;
}

function buildWhatsappUrl(selectedItems: KoiMenuItem[]) {
  const lines = selectedItems.map((item) => `- ${item.code} ${item.name}`);
  const message = [
    "Olá! Vim pelo site e quero fazer um pedido de take-away. O meu pedido é:",
    "",
    "Caixa Take Away 8€:",
    ...lines,
  ].join("\n");

  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}

export function MenuTakeAwaySection() {
  const [selectedItems, setSelectedItems] = useState<KoiMenuItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [limitWarning, setLimitWarning] = useState(false);
  const menuActionsRef = useRef<HTMLDivElement | null>(null);

  const selectedKeys = useMemo(() => new Set(selectedItems.map(itemKey)), [selectedItems]);
  const limitReached = selectedItems.length >= MAX_SELECTED_ITEMS;

  const galleryItems = useMemo(
    () =>
      KOI_MENU_CATEGORIES.map((category) => ({
        id: category.id,
        title: category.title,
        description: category.description ?? "Escolha uma categoria para ver os itens.",
        image: categoryImages[category.id],
        meta: `${category.items.length} opções`,
      })),
    [],
  );

  const toggleItem = (item: KoiMenuItem) => {
    setSelectedItems((current) => {
      const exists = current.some((selected) => itemKey(selected) === itemKey(item));

      if (exists) {
        setLimitWarning(false);
        return current.filter((selected) => itemKey(selected) !== itemKey(item));
      }

      if (current.length >= MAX_SELECTED_ITEMS) {
        setLimitWarning(true);
        return current;
      }

      setLimitWarning(false);
      return [...current, item];
    });
  };

  const chooseFromCategory = (category: KoiMenuCategory) => {
    const nextItem = category.items.find((item) => !selectedKeys.has(itemKey(item)));

    if (!nextItem) {
      setMenuOpen(true);
      return;
    }

    if (limitReached) {
      setLimitWarning(true);
      return;
    }

    toggleItem(nextItem);
    menuActionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const chooseFromGallery = (galleryItem: GalleryItem) => {
    const category = KOI_MENU_CATEGORIES.find((item) => item.id === galleryItem.id);
    if (category) chooseFromCategory(category);
  };

  const openCategoryItems = () => setMenuOpen(true);
  const whatsappUrl = buildWhatsappUrl(selectedItems);

  return (
    <section id="menu-take-away" className="section-pad bg-[#fffdf9]">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full bg-[var(--chambar-red)] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                1 caixa &middot; 4 tipos &agrave; escolha &middot; 8&euro;
              </p>
              <h2 className="mt-5 text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl">
                Monte o seu Take Away
              </h2>
              <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-neutral-600 md:text-lg">
                Escolha at&eacute; 4 tipos de sushi para a sua caixa ou consulte o menu completo antes de pedir.
              </p>
            </div>

            <div ref={menuActionsRef} className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setMenuOpen(true)}
              >
                Ver menu completo
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setMenuOpen(true);
                  setLimitWarning(false);
                }}
              >
                Come&ccedil;ar escolha
              </button>
            </div>

            <div className="mt-9">
              <CircularGallery
                items={galleryItems}
                onSelect={chooseFromGallery}
                onViewItems={openCategoryItems}
              />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_44px_rgba(16,16,16,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--chambar-red)]">
                A sua caixa
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black text-neutral-950">Take Away</h3>
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
                        <span className="text-[var(--chambar-red)]">{item.code}</span> {item.name}
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

              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  className="btn btn-outline w-full"
                  onClick={() => setMenuOpen(true)}
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
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <MenuFullModal
        open={menuOpen}
        categories={KOI_MENU_CATEGORIES}
        selectedItems={selectedItems}
        maxItems={MAX_SELECTED_ITEMS}
        limitReached={limitWarning || limitReached}
        onClose={() => setMenuOpen(false)}
        onToggleItem={toggleItem}
      />
    </section>
  );
}
