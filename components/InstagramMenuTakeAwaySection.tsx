"use client";

import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { koiMenuPages } from "@/data/koi-menu-pages";
import { getWhatsappUrl } from "@/lib/site";

const AUTO_ADVANCE_MS = 2800;
const TRANSITION_MS = 720;
const AUTOPLAY_RESUME_MS = 1000;
const SWIPE_THRESHOLD_PX = 40;
const TAP_THRESHOLD_PX = 6;

function wrapPageIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function pageLabel(index: number, total: number) {
  return `Página ${index + 1} de ${total}`;
}

type InstagramMenuLightboxProps = {
  open: boolean;
  activeIndex: number;
  whatsappUrl: string;
  onActiveIndexChange: (index: number) => void;
  onClose: () => void;
};

function InstagramMenuLightbox({
  open,
  activeIndex,
  whatsappUrl,
  onActiveIndexChange,
  onClose,
}: InstagramMenuLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const totalPages = koiMenuPages.length;
  const activePage = koiMenuPages[activeIndex] ?? koiMenuPages[0];

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/84 px-2 py-2 text-white backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instagram-menu-page-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="grid h-[96svh] max-h-[96svh] w-full max-w-[96vw] grid-rows-[auto_minmax(0,1fr)_auto_auto] overflow-hidden rounded-[16px] border border-white/10 bg-[#100d0c] shadow-[0_28px_80px_rgba(0,0,0,0.52)] sm:max-w-[620px]">
        <header className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-[#c9a45c]">
              MENU TAKE AWAY
            </p>
            <h2
              id="instagram-menu-page-title"
              className="mt-1 text-base font-black leading-tight text-white"
            >
              {pageLabel(activeIndex, totalPages)}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="shrink-0 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-black text-neutral-950"
            onClick={onClose}
            aria-label={"Fechar menu"}
          >
            Fechar
          </button>
        </header>

        <div className="flex min-h-0 items-center justify-center overflow-hidden bg-[#070606] p-2">
          <img
            src={activePage.src}
            alt={activePage.alt}
            className="max-h-[68svh] w-full max-w-full object-contain"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-white/[0.04] px-3 py-2">
          {koiMenuPages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              className={`h-[76px] w-[54px] shrink-0 overflow-hidden rounded-[8px] border bg-white p-1 transition ${
                index === activeIndex
                  ? "border-[#c9a45c] ring-2 ring-[#c9a45c]/35"
                  : "border-white/12 opacity-72"
              }`}
              onClick={() => goToPage(index)}
              aria-label={`Abrir ${pageLabel(index, totalPages)}`}
            >
              <img
                src={page.src}
                alt=""
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>

        <footer className="grid grid-cols-2 gap-2 border-t border-white/10 px-3 py-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary col-span-2 min-h-11 w-full"
          >
            Pedir pelo WhatsApp
          </a>
          <button
            type="button"
            className="flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black text-white"
            onClick={() => goToPage(activeIndex - 1)}
          >
            Anterior
          </button>
          <button
            type="button"
            className="flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black text-white"
            onClick={() => goToPage(activeIndex + 1)}
          >
            Seguinte
          </button>
        </footer>
      </div>
    </div>
  );
}

export function InstagramMenuTakeAwaySection() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const dragStartXRef = useRef<number | null>(null);
  const dragDeltaXRef = useRef(0);
  const suppressClickRef = useRef(false);
  const resumeAutoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const autoplayPausedRef = useRef(false);
  const whatsappUrl = getWhatsappUrl("instagram");
  const totalPages = koiMenuPages.length;

  const openFirstPage = () => {
    setActivePageIndex(0);
    setModalOpen(true);
  };

  const openActivePage = () => {
    setActivePageIndex(activeGalleryIndex);
    setModalOpen(true);
  };

  const pauseAutoplayBriefly = () => {
    autoplayPausedRef.current = true;

    if (resumeAutoplayTimeoutRef.current) {
      clearTimeout(resumeAutoplayTimeoutRef.current);
    }

    resumeAutoplayTimeoutRef.current = setTimeout(() => {
      autoplayPausedRef.current = false;
      resumeAutoplayTimeoutRef.current = null;
    }, AUTOPLAY_RESUME_MS);
  };

  const goToGalleryPage = (index: number) => {
    setActiveGalleryIndex(wrapPageIndex(index, totalPages));
  };

  const previousIndex = wrapPageIndex(activeGalleryIndex - 1, totalPages);
  const nextIndex = wrapPageIndex(activeGalleryIndex + 1, totalPages);

  useEffect(() => {
    if (modalOpen || totalPages <= 1) return undefined;

    const interval = setInterval(() => {
      if (!autoplayPausedRef.current) {
        setActiveGalleryIndex((currentIndex) =>
          wrapPageIndex(currentIndex + 1, totalPages),
        );
      }
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [modalOpen, totalPages]);

  useEffect(() => {
    return () => {
      if (resumeAutoplayTimeoutRef.current) {
        clearTimeout(resumeAutoplayTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = event.clientX;
    dragDeltaXRef.current = 0;
    suppressClickRef.current = false;
    autoplayPausedRef.current = true;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    dragDeltaXRef.current = event.clientX - dragStartXRef.current;
  };

  const finishDrag = () => {
    if (dragStartXRef.current === null) return;

    const deltaX = dragDeltaXRef.current;
    const absDeltaX = Math.abs(deltaX);

    suppressClickRef.current = absDeltaX >= TAP_THRESHOLD_PX;

    if (deltaX <= -SWIPE_THRESHOLD_PX) {
      goToGalleryPage(activeGalleryIndex + 1);
    } else if (deltaX >= SWIPE_THRESHOLD_PX) {
      goToGalleryPage(activeGalleryIndex - 1);
    }

    dragStartXRef.current = null;
    dragDeltaXRef.current = 0;
    pauseAutoplayBriefly();
  };

  const getCardStyle = (index: number): CSSProperties => {
    const shared: CSSProperties = {
      transition: `transform ${TRANSITION_MS}ms cubic-bezier(.22,.61,.36,1), opacity ${TRANSITION_MS}ms ease`,
      transformStyle: "preserve-3d",
      willChange: "transform, opacity",
    };

    if (index === activeGalleryIndex) {
      return {
        ...shared,
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
        transform: "translateX(0) rotateY(0deg) scale(1)",
        zIndex: 30,
      };
    }

    if (index === previousIndex) {
      return {
        ...shared,
        opacity: 0.18,
        visibility: "visible",
        pointerEvents: "none",
        transform: "translateX(-34%) rotateY(28deg) scale(0.78)",
        zIndex: 5,
      };
    }

    if (index === nextIndex) {
      return {
        ...shared,
        opacity: 0.18,
        visibility: "visible",
        pointerEvents: "none",
        transform: "translateX(34%) rotateY(-28deg) scale(0.78)",
        zIndex: 5,
      };
    }

    return {
      ...shared,
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
      transform: "translateX(0) rotateY(0deg) scale(0.72)",
      zIndex: 0,
    };
  };

  return (
    <section
      className="ig-rise mt-5 overflow-x-clip rounded-[22px] border border-black/10 bg-white/86 p-4 shadow-[0_14px_34px_rgba(16,16,16,0.07)]"
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

      <div className="mt-4 flex gap-2">
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

      <div className="mt-3 text-center" aria-live="polite">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-[var(--chambar-red)]">
          {pageLabel(activeGalleryIndex, totalPages)}
        </p>
      </div>

      <div
        className="mx-auto mt-3 flex w-full justify-center overflow-visible py-2"
        style={{ perspective: "1100px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div
          className="relative touch-pan-y overflow-visible"
          style={{
            width: "min(86vw, 330px)",
            height: "min(58vh, 470px)",
            transformStyle: "preserve-3d",
          }}
        >
          {koiMenuPages.map((page, index) => {
            const isActive = index === activeGalleryIndex;

            return (
              <button
                key={page.id}
                type="button"
                className={`absolute inset-0 overflow-hidden rounded-[12px] bg-[#070606] ${
                  isActive
                    ? "border border-[#c9a45c]/45 shadow-[0_22px_52px_rgba(0,0,0,0.24)]"
                    : "border-0 shadow-none"
                }`}
                style={getCardStyle(index)}
                onClick={() => {
                  if (suppressClickRef.current) {
                    suppressClickRef.current = false;
                    return;
                  }

                  if (isActive) openActivePage();
                }}
                aria-label={`Abrir ${pageLabel(index, totalPages)}`}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
              >
                <img
                  src={page.src}
                  alt={isActive ? page.alt : ""}
                  className="h-full w-full object-contain"
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </div>

      <InstagramMenuLightbox
        open={modalOpen}
        activeIndex={activePageIndex}
        whatsappUrl={whatsappUrl}
        onActiveIndexChange={setActivePageIndex}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
