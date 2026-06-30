"use client";

import { useEffect, useRef } from "react";
import type { KoiMenuCategory, KoiMenuItem } from "@/data/koi-menu";

type MenuFullModalProps = {
  open: boolean;
  categories: KoiMenuCategory[];
  selectedItems: KoiMenuItem[];
  maxItems: number;
  limitReached: boolean;
  onClose: () => void;
  onToggleItem: (item: KoiMenuItem) => void;
};

function itemKey(item: KoiMenuItem) {
  return `${item.code}-${item.name}`;
}

export function MenuFullModal({
  open,
  categories,
  selectedItems,
  maxItems,
  limitReached,
  onClose,
  onToggleItem,
}: MenuFullModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, open]);

  if (!open) return null;

  const selectedKeys = new Set(selectedItems.map(itemKey));

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/62 px-3 py-4 backdrop-blur-sm md:items-center md:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-completo-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[88svh] w-full max-w-5xl overflow-hidden rounded-[28px] bg-[#fffdf9] shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
        <div className="flex items-start justify-between gap-4 border-b border-black/10 p-5 md:p-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--chambar-red)]">
              Menu Take Away
            </p>
            <h2 id="menu-completo-title" className="mt-2 text-3xl font-black text-neutral-950">
              Menu completo
            </h2>
            <p className="mt-2 text-sm font-bold leading-6 text-neutral-600">
              Escolha at&eacute; 4 tipos para a sua caixa. Pode remover e trocar antes de enviar.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black text-neutral-950"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        {limitReached ? (
          <p className="mx-5 mt-4 rounded-2xl bg-[#fff4ec] px-4 py-3 text-sm font-black text-[var(--chambar-red)] md:mx-7">
            J&aacute; escolheu {maxItems} tipos. Remova um item para escolher outro.
          </p>
        ) : null}

        <div className="max-h-[66svh] overflow-y-auto p-5 md:p-7">
          <div className="grid gap-5 md:grid-cols-2">
            {categories.map((category) => (
              <section key={category.id} className="rounded-[24px] border border-black/10 bg-white p-4">
                <h3 className="text-xl font-black text-neutral-950">{category.title}</h3>
                {category.description ? (
                  <p className="mt-1 text-sm font-bold leading-6 text-neutral-600">
                    {category.description}
                  </p>
                ) : null}
                <div className="mt-4 grid gap-2">
                  {category.items.map((item) => {
                    const selected = selectedKeys.has(itemKey(item));
                    const disabled = !selected && selectedItems.length >= maxItems;

                    return (
                      <div
                        key={itemKey(item)}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-black/8 bg-[#fffdf9] p-3"
                      >
                        <div>
                          <p className="text-sm font-black text-neutral-950">
                            <span className="text-[var(--chambar-red)]">{item.code}</span> {item.name}
                          </p>
                          {item.description ? (
                            <p className="mt-1 text-xs font-bold text-neutral-500">{item.description}</p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          className="shrink-0 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-black text-neutral-950 disabled:cursor-not-allowed disabled:opacity-45"
                          aria-label={selected ? `Remover ${item.code} ${item.name}` : `Escolher ${item.code} ${item.name}`}
                          disabled={disabled}
                          onClick={() => onToggleItem(item)}
                        >
                          {selected ? "Remover" : "Escolher"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
