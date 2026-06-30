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

function wrapPageIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function shortestOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex;
  const half = length / 2;

  if (offset > half) offset -= length;
  if (offset < -half) offset += length;

  return offset;
}

function pageLabel(index: number, total: number) {
  return `Página ${index + 1} de ${total}`;
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

type InstagramMenu3DMode = "mobile" | "tablet";

type InstagramMenu3DConfig = {
  mode: InstagramMenu3DMode;
  perspective: number;
  stageHeight: string;
  cardWidth: string;
  cardHeight: string;
  sideTranslate: number;
  sideRotate: number;
  sideDepth: number;
  sideScale: number;
  sideOpacity: number;
};

const INSTAGRAM_MENU_3D_CONFIG: Record<
  InstagramMenu3DMode,
  InstagramMenu3DConfig
> = {
  mobile: {
    mode: "mobile",
    perspective: 1050,
    stageHeight: "min(68svh, 500px)",
    cardWidth: "min(84vw, 330px)",
    cardHeight: "min(62svh, 470px)",
    sideTranslate: 34,
    sideRotate: 30,
    sideDepth: -120,
    sideScale: 0.78,
    sideOpacity: 0.34,
  },
  tablet: {
    mode: "tablet",
    perspective: 1400,
    stageHeight: "min(72svh, 560px)",
    cardWidth: "min(74vw, 340px)",
    cardHeight: "min(66svh, 500px)",
    sideTranslate: 40,
    sideRotate: 28,
    sideDepth: -140,
    sideScale: 0.82,
    sideOpacity: 0.42,
  },
};

function useInstagramMenu3DConfig() {
  const [config, setConfig] = useState<InstagramMenu3DConfig>(
    INSTAGRAM_MENU_3D_CONFIG.mobile,
  );

  useEffect(() => {
    const update = () => {
      setConfig(
        window.innerWidth >= 768
          ? INSTAGRAM_MENU_3D_CONFIG.tablet
          : INSTAGRAM_MENU_3D_CONFIG.mobile,
      );
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
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
              CARDÁPIO TAKE AWAY
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
            aria-label="Fechar cardápio"
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const reducedMotion = useReducedMotion();
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const maxMoveXRef = useRef(0);
  const suppressClickRef = useRef(false);
  const whatsappUrl = getWhatsappUrl("instagram");
  const totalPages = koiMenuPages.length;
  const menu3d = useInstagramMenu3DConfig();

  const pauseAutoplay = () => {
    setIsPaused(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const resumeAutoplaySoon = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      resumeTimeoutRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    if (reducedMotion || isPaused || modalOpen || totalPages < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => wrapPageIndex(current + 1, totalPages));
    }, 5200);

    return () => window.clearInterval(interval);
  }, [isPaused, modalOpen, reducedMotion, totalPages]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const openPage = (index: number) => {
    pauseAutoplay();
    setActiveIndex(wrapPageIndex(index, totalPages));
    setModalOpen(true);
  };

  const openFirstPage = () => {
    openPage(0);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    maxMoveXRef.current = 0;
    suppressClickRef.current = false;
    setIsDragging(true);
    pauseAutoplay();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;
    maxMoveXRef.current = Math.max(maxMoveXRef.current, Math.abs(deltaX));

    if (Math.abs(deltaX) > Math.abs(deltaY) * 0.75) {
      setDragOffset(Math.max(-86, Math.min(86, deltaX)));
    }
  };

  const finishPointerGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;
    const isHorizontalSwipe =
      Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY);

    suppressClickRef.current = maxMoveXRef.current >= 6;
    pointerIdRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (isHorizontalSwipe) {
      setActiveIndex((current) =>
        wrapPageIndex(current + (deltaX < 0 ? 1 : -1), totalPages),
      );
    }

    resumeAutoplaySoon();
  };

  const handleCardClick = (index: number) => {
    pauseAutoplay();
    resumeAutoplaySoon();

    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    openPage(index);
  };

  return (
    <section
      className="ig-rise mt-5 rounded-[22px] border border-black/10 bg-white/86 p-4 shadow-[0_14px_34px_rgba(16,16,16,0.07)]"
      style={{ "--ig-delay": "500ms" } as CSSProperties}
      aria-labelledby="instagram-menu-title"
    >
      <div className="text-center">
        <h2
          id="instagram-menu-title"
          className="text-2xl font-black leading-tight text-neutral-950"
        >
          Cardápio Take Away
        </h2>
        <p className="mx-auto mt-2 max-w-[22rem] text-sm font-bold leading-6 text-neutral-600">
          Arraste para ver as páginas, toque para ampliar e peça pelo WhatsApp.
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="btn btn-primary min-h-11 flex-1 px-4 text-sm"
          onClick={openFirstPage}
        >
          Ver cardápio completo
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
          {pageLabel(activeIndex, totalPages)}
        </p>
      </div>

      <div
        className="relative mx-auto mt-2 h-[min(68svh,480px)] min-h-[360px] w-full touch-pan-y overflow-hidden"
        style={{
          height: menu3d.stageHeight,
          perspective: `${menu3d.perspective}px`,
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
        role="region"
        aria-label="Cardápio Take Away animado"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerGesture}
        onPointerCancel={finishPointerGesture}
      >
        {koiMenuPages.map((page, index) => {
          const offset = shortestOffset(index, activeIndex, totalPages);
          const dragProgress =
            dragOffset / (menu3d.mode === "mobile" ? 260 : 300);
          const visualOffset = offset + dragProgress;
          const distance = Math.abs(visualOffset);
          const discreteDistance = Math.abs(offset);
          const isActive = discreteDistance === 0;
          const isVisible = distance <= 1.16;
          const scale = isActive && distance < 0.52 ? 1 : menu3d.sideScale;
          const opacity = !isVisible
            ? 0
            : isActive && distance < 0.52
              ? 1
              : menu3d.sideOpacity;
          const coverflowOffset = Math.max(-1, Math.min(1, visualOffset));
          const transform = `translate3d(-50%, -50%, 0) translateX(${coverflowOffset * menu3d.sideTranslate}%) rotateY(${coverflowOffset * -menu3d.sideRotate}deg) translateZ(${isActive && distance < 0.52 ? 0 : menu3d.sideDepth}px) scale(${scale})`;

          return (
            <button
              key={page.id}
              type="button"
              className={`absolute left-1/2 top-1/2 min-h-[340px] overflow-hidden rounded-[14px] transition-[opacity,transform] duration-500 ${
                isDragging ? "transition-none" : ""
              }`}
              style={{
                width: menu3d.cardWidth,
                height: menu3d.cardHeight,
                padding: isActive ? "8px" : "3px",
                border: isActive
                  ? "1px solid rgba(255,255,255,0.16)"
                  : "1px solid rgba(255,255,255,0.05)",
                background: isActive ? "#101010" : "rgba(12,12,12,0.34)",
                boxShadow: isActive
                  ? "0 18px 42px rgba(16,16,16,0.18)"
                  : "0 10px 22px rgba(16,16,16,0.1)",
                opacity,
                zIndex: isActive ? 40 : Math.max(1, 20 - distance * 10),
                transform,
                transformStyle: "preserve-3d",
                pointerEvents: isActive ? "auto" : "none",
              }}
              aria-hidden={!isActive}
              aria-label={`Ampliar ${pageLabel(index, totalPages)}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleCardClick(index)}
            >
              {isVisible ? (
                <img
                  src={page.src}
                  alt={page.alt}
                  className="h-full w-full select-none object-contain"
                  sizes="(max-width: 767px) 84vw, 340px"
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <InstagramMenuLightbox
        open={modalOpen}
        activeIndex={activeIndex}
        whatsappUrl={whatsappUrl}
        onActiveIndexChange={setActiveIndex}
        onClose={() => {
          setModalOpen(false);
          resumeAutoplaySoon();
        }}
      />
    </section>
  );
}
