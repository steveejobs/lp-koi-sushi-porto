"use client";

import {
  type HTMLAttributes,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type GalleryImage = {
  src: string;
  alt: string;
  position?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: GalleryImage;
  meta?: string;
};

type CircularGalleryProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  items: GalleryItem[];
  autoRotateSpeed?: number;
  onSelect?: (item: GalleryItem, index: number) => void;
  onViewItems?: (item: GalleryItem, index: number) => void;
  selectLabel?: string;
  viewLabel?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function relativeIndex(index: number, activeIndex: number, length: number) {
  const raw = index - activeIndex;
  const half = length / 2;

  if (raw > half) return raw - length;
  if (raw < -half) return raw + length;

  return raw;
}

export function CircularGallery({
  items,
  className,
  autoRotateSpeed = 4200,
  onSelect,
  onViewItems,
  selectLabel = "Abrir zoom",
  viewLabel = "Ver menu completo",
  ...props
}: CircularGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const reducedMotion = useReducedMotion();
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const activeItem = items[activeIndex] ?? items[0];
  const itemCount = items.length;

  const goTo = (nextIndex: number) => {
    setActiveIndex(wrapIndex(nextIndex, itemCount));
  };

  const pauseAutoplayBriefly = () => {
    setAutoplayPaused(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setAutoplayPaused(false);
      resumeTimeoutRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    if (reducedMotion || autoplayPaused || isDragging || itemCount < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, itemCount));
    }, autoRotateSpeed);

    return () => window.clearInterval(interval);
  }, [autoRotateSpeed, autoplayPaused, isDragging, itemCount, reducedMotion]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    dragDistanceRef.current = 0;
    setIsDragging(true);
    setAutoplayPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;
    dragDistanceRef.current = Math.max(
      dragDistanceRef.current,
      Math.abs(deltaX),
    );

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset(deltaX);
    }
  };

  const finishPointerGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const deltaX = event.clientX - startXRef.current;
    const moved = Math.abs(deltaX);
    suppressClickRef.current = moved > 8;

    if (moved > 52) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }

    pointerIdRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
    pauseAutoplayBriefly();
  };

  const handleCardClick = (item: GalleryItem, index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    onSelect?.(item, index);
  };

  const orderedItems = useMemo(
    () =>
      items.map((item, index) => ({
        item,
        index,
        relative: relativeIndex(index, activeIndex, itemCount),
      })),
    [activeIndex, itemCount, items],
  );

  return (
    <div
      role="region"
      aria-label="Páginas do menu Take Away"
      className={cn("relative mx-auto w-full max-w-5xl", className)}
      {...props}
    >
      <div
        className="relative mx-auto h-[520px] max-w-[980px] touch-pan-y overflow-hidden rounded-[30px] border border-black/10 bg-[radial-gradient(circle_at_center,rgba(196,30,47,0.12),transparent_42%),#130f0f] shadow-[0_24px_70px_rgba(16,16,16,0.12)] md:h-[620px] md:rounded-[34px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerGesture}
        onPointerCancel={finishPointerGesture}
      >
        <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between gap-3 text-white md:inset-x-6 md:top-6">
          <p className="rounded-full bg-black/42 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] backdrop-blur">
            {activeItem?.meta}
          </p>
          {activeItem ? (
            <button
              type="button"
              className="rounded-full border border-white/25 bg-white/12 px-3 py-2 text-xs font-black text-white backdrop-blur transition hover:bg-white/20"
              onClick={() => onViewItems?.(activeItem, activeIndex)}
            >
              {viewLabel}
            </button>
          ) : null}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {orderedItems.map(({ item, index, relative }) => {
            const distance = Math.abs(relative);
            const isActive = index === activeIndex;
            const translateX = relative * 190 + dragOffset;
            const scale = Math.max(0.72, 1 - distance * 0.13);
            const opacity =
              distance > 3 ? 0 : Math.max(0.32, 1 - distance * 0.24);

            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "absolute left-1/2 top-1/2 block w-[78vw] max-w-[330px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] border bg-white text-left shadow-[0_28px_70px_rgba(0,0,0,0.34)] transition-[opacity,transform] duration-500 ease-out focus:outline-none focus:ring-4 focus:ring-white/55 md:w-[355px] md:max-w-none",
                  isDragging && "transition-none",
                  isActive ? "border-white/70" : "border-white/20",
                )}
                style={{
                  opacity,
                  zIndex: 20 - distance,
                  transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale})`,
                  pointerEvents: distance > 2 ? "none" : "auto",
                }}
                aria-label={`${selectLabel}: ${item.title}`}
                onClick={() => handleCardClick(item, index)}
              >
                <span className="block aspect-[0.72] w-full bg-neutral-100 p-2 md:p-3">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    loading={isActive ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full select-none object-contain"
                    draggable={false}
                    style={{ objectPosition: item.image.position ?? "center" }}
                  />
                </span>
                <span className="block border-t border-black/10 bg-white px-4 py-3">
                  <span className="block text-sm font-black leading-tight text-neutral-950">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs font-bold text-neutral-500">
                    Toque para ampliar
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="absolute inset-x-5 bottom-5 z-20 flex items-center justify-between gap-3 md:inset-x-6 md:bottom-6">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/12 text-xl font-black text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Página anterior do menu"
            onClick={() => {
              goTo(activeIndex - 1);
              pauseAutoplayBriefly();
            }}
          >
            ‹
          </button>
          <div className="flex gap-1.5" aria-hidden="true">
            {items.map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === activeIndex ? "w-7 bg-white" : "w-2 bg-white/42",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/12 text-xl font-black text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Página seguinte do menu"
            onClick={() => {
              goTo(activeIndex + 1);
              pauseAutoplayBriefly();
            }}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
