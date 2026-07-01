"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { KoiMenuPage } from "@/data/koi-menu-pages";

type MenuFullViewerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pages: KoiMenuPage[];
  initialPage?: number;
  whatsappUrl: string;
  source: "site" | "instagram";
};

function wrapPageIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function pageLabel(index: number, total: number) {
  return `Página ${index + 1} de ${total}`;
}

function pageAlt(index: number, total: number) {
  return `Página ${index + 1} de ${total} do menu Take Away do Koi Sushi Porto`;
}

function pageTitle(index: number, total: number) {
  return `Menu Take Away · Página ${index + 1} de ${total}`;
}

export function MenuFullViewer({
  open,
  onOpenChange,
  pages,
  initialPage = 0,
  whatsappUrl,
  source,
}: MenuFullViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const totalPages = pages.length;
  const activePage = pages[currentIndex] ?? pages[0];

  const closeViewer = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const goToPage = useCallback(
    (index: number) => {
      setCurrentIndex(wrapPageIndex(index, totalPages));
    },
    [totalPages],
  );

  useEffect(() => {
    if (!open) return;
    setCurrentIndex(wrapPageIndex(initialPage, totalPages));
  }, [initialPage, open, totalPages]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") goToPage(currentIndex - 1);
      if (event.key === "ArrowRight") goToPage(currentIndex + 1);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      document.body.style.overflow = previousOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [closeViewer, currentIndex, goToPage, open]);

  if (!mounted || !open || !activePage || totalPages === 0) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] w-screen items-stretch justify-center bg-[#080707] text-white md:items-center md:bg-black/78 md:px-6 md:py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-full-viewer-title"
      data-menu-source={source}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeViewer();
      }}
    >
      <div className="grid h-[100dvh] w-screen grid-rows-[auto_minmax(0,1fr)_auto_auto] overflow-hidden bg-[#100d0c] shadow-[0_24px_70px_rgba(0,0,0,0.42)] md:h-[90vh] md:max-h-[90vh] md:w-full md:max-w-[1120px] md:grid-rows-[auto_minmax(0,1fr)_auto] md:rounded-[18px]">
        <header className="z-10 flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 pb-3 pt-[calc(12px+env(safe-area-inset-top))] md:px-5 md:py-4">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#c9a45c]">
              Menu Take Away
            </p>
            <h2
              id="menu-full-viewer-title"
              className="mt-1 text-base font-black leading-tight text-white md:text-xl"
            >
              {pageLabel(currentIndex, totalPages)}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-black text-neutral-950 transition hover:bg-[#f5e7cf]"
            onClick={closeViewer}
            aria-label="Fechar menu completo"
          >
            Fechar
          </button>
        </header>

        <div className="grid min-h-0 grid-rows-[minmax(0,1fr)] overflow-hidden px-3 py-3 md:grid-cols-[minmax(0,1fr)_188px] md:grid-rows-1 md:gap-4 md:p-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div
            className="flex min-h-0 touch-pan-y items-center justify-center overflow-hidden bg-[#070606] px-1 py-2 md:rounded-[12px] md:p-4"
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchStartXRef.current = touch.clientX;
              touchStartYRef.current = touch.clientY;
            }}
            onTouchEnd={(event) => {
              if (
                touchStartXRef.current === null ||
                touchStartYRef.current === null
              ) {
                return;
              }

              const touch = event.changedTouches[0];
              const deltaX = touch.clientX - touchStartXRef.current;
              const deltaY = touch.clientY - touchStartYRef.current;
              touchStartXRef.current = null;
              touchStartYRef.current = null;

              if (
                Math.abs(deltaX) < 44 ||
                Math.abs(deltaX) < Math.abs(deltaY) * 1.2
              ) {
                return;
              }

              goToPage(deltaX < 0 ? currentIndex + 1 : currentIndex - 1);
            }}
          >
            <Image
              key={activePage.id}
              src={activePage.src}
              alt={pageAlt(currentIndex, totalPages)}
              title={pageTitle(currentIndex, totalPages)}
              width={1055}
              height={1491}
              quality={100}
              sizes="(max-width: 768px) 100vw, 900px"
              className="h-auto max-h-full w-auto max-w-full object-contain md:max-w-[1055px]"
              priority
            />
          </div>

          <aside className="hidden min-h-0 md:flex md:flex-col">
            <p className="mb-2 hidden text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/48 md:block">
              Páginas
            </p>
            <div className="koi-menu-scroll flex gap-2 overflow-x-auto pb-1 md:min-h-0 md:flex-1 md:grid md:grid-cols-2 md:content-start md:overflow-x-hidden md:overflow-y-auto md:pr-1">
              {pages.map((page, index) => (
                <button
                  key={page.id}
                  type="button"
                  className={`grid h-[82px] w-[58px] shrink-0 place-items-center overflow-hidden rounded-[9px] bg-white p-1 transition md:h-[98px] md:w-full ${
                    index === currentIndex
                      ? "opacity-100 ring-2 ring-[#c9a45c] ring-offset-2 ring-offset-[#100d0c]"
                      : "opacity-58 hover:opacity-88"
                  }`}
                  onClick={() => goToPage(index)}
                  aria-label={`Abrir ${pageTitle(index, totalPages)}`}
                  aria-current={index === currentIndex ? "page" : undefined}
                >
                  <Image
                    src={page.src}
                    alt=""
                    aria-hidden="true"
                    width={1055}
                    height={1491}
                    quality={85}
                    sizes="110px"
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </aside>
        </div>

        <div className="koi-menu-scroll flex shrink-0 gap-2 overflow-x-auto border-t border-white/10 bg-white/[0.04] px-3 py-2 md:hidden">
          {pages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              className={`grid h-[68px] w-[48px] shrink-0 place-items-center overflow-hidden rounded-[8px] bg-white p-1 transition ${
                index === currentIndex
                  ? "opacity-100 ring-2 ring-[#c9a45c] ring-offset-2 ring-offset-[#100d0c]"
                  : "opacity-58"
              }`}
              onClick={() => goToPage(index)}
              aria-label={`Abrir ${pageTitle(index, totalPages)}`}
              aria-current={index === currentIndex ? "page" : undefined}
            >
              <Image
                src={page.src}
                alt=""
                aria-hidden="true"
                width={1055}
                height={1491}
                quality={85}
                sizes="48px"
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>

        <footer className="grid shrink-0 grid-cols-2 items-center gap-2 border-t border-white/10 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 md:grid-cols-[140px_minmax(220px,420px)_140px] md:justify-center md:gap-3 md:px-5 md:py-4">
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
            onClick={() => goToPage(currentIndex - 1)}
            aria-label="Ver página anterior do menu"
          >
            Anterior
          </button>
          <button
            type="button"
            className="flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black text-white transition hover:border-white/45 md:col-start-3 md:row-start-1"
            onClick={() => goToPage(currentIndex + 1)}
            aria-label="Ver página seguinte do menu"
          >
            Seguinte
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
