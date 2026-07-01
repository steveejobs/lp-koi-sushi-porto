"use client";

import {
  type HTMLAttributes,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export type CircularGalleryItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
};

type CircularGalleryProps = Omit<HTMLAttributes<HTMLDivElement>, "onClick"> & {
  items: CircularGalleryItem[];
  autoRotateSpeed?: number;
  desktopConfig?: DesktopGalleryConfig;
  variant?: "default" | "instagram-lite";
  onItemClick?: (item: CircularGalleryItem, index: number) => void;
  onActiveIndexChange?: (index: number) => void;
};

type GalleryBreakpoint = "mobile" | "tablet" | "desktop";

type GalleryConfig = {
  breakpoint: GalleryBreakpoint;
  perspective: number;
  stageHeight: string;
  stageMinHeight: number;
  cardWidth: string;
  cardHeight: string;
  cardMinHeight: number;
  sideTranslate: number;
  sideRotate: number;
  sideDepth: number;
  sideScale: number;
  sideOpacity: number;
  farScale: number;
  farOpacity: number;
  radius: number;
  visibleSideCount: number;
};

type DesktopGalleryConfig = Partial<
  Pick<
    GalleryConfig,
    | "perspective"
    | "radius"
    | "visibleSideCount"
    | "sideScale"
    | "sideOpacity"
    | "farScale"
    | "farOpacity"
  >
> & {
  autoRotateSpeed?: number;
};

const GALLERY_CONFIG: Record<GalleryBreakpoint, GalleryConfig> = {
  mobile: {
    breakpoint: "mobile",
    perspective: 1100,
    stageHeight: "min(68svh, 520px)",
    stageMinHeight: 360,
    cardWidth: "min(88vw, 340px)",
    cardHeight: "min(62svh, 500px)",
    cardMinHeight: 330,
    sideTranslate: 30,
    sideRotate: 28,
    sideDepth: -120,
    sideScale: 0.76,
    sideOpacity: 0.16,
    farScale: 0.68,
    farOpacity: 0,
    radius: 0,
    visibleSideCount: 1,
  },
  tablet: {
    breakpoint: "tablet",
    perspective: 1350,
    stageHeight: "min(70svh, 560px)",
    stageMinHeight: 390,
    cardWidth: "min(74vw, 360px)",
    cardHeight: "min(66svh, 520px)",
    cardMinHeight: 360,
    sideTranslate: 44,
    sideRotate: 30,
    sideDepth: -150,
    sideScale: 0.78,
    sideOpacity: 0.2,
    farScale: 0.68,
    farOpacity: 0,
    radius: 0,
    visibleSideCount: 1,
  },
  desktop: {
    breakpoint: "desktop",
    perspective: 1900,
    stageHeight: "680px",
    stageMinHeight: 520,
    cardWidth: "390px",
    cardHeight: "585px",
    cardMinHeight: 520,
    sideTranslate: 0,
    sideRotate: 0,
    sideDepth: 0,
    sideScale: 0.78,
    sideOpacity: 0.2,
    farScale: 0.62,
    farOpacity: 0.06,
    radius: 520,
    visibleSideCount: 2,
  },
};

const INSTAGRAM_LITE_CONFIG: GalleryConfig = {
  breakpoint: "mobile",
  perspective: 1100,
  stageHeight: "min(66svh, 520px)",
  stageMinHeight: 350,
  cardWidth: "min(88vw, 340px)",
  cardHeight: "min(62svh, 500px)",
  cardMinHeight: 330,
  sideTranslate: 32,
  sideRotate: 28,
  sideDepth: -120,
  sideScale: 0.76,
  sideOpacity: 0.16,
  farScale: 0.68,
  farOpacity: 0,
  radius: 0,
  visibleSideCount: 1,
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function wrapIndex(index: number, length: number) {
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

function useResponsiveGallery() {
  const [config, setConfig] = useState<GalleryConfig>(GALLERY_CONFIG.desktop);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setConfig(GALLERY_CONFIG.mobile);
      } else if (width < 1024) {
        setConfig(GALLERY_CONFIG.tablet);
      } else {
        setConfig(GALLERY_CONFIG.desktop);
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
}

export function CircularGallery({
  items,
  className,
  autoRotateSpeed = 0.005,
  desktopConfig,
  variant = "default",
  onItemClick,
  onActiveIndexChange,
  style,
  ...props
}: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const responsiveGallery = useResponsiveGallery();
  const frameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startRotationRef = useRef(0);
  const maxMoveXRef = useRef(0);
  const suppressClickRef = useRef(false);
  const lastActiveIndexRef = useRef<number | null>(null);
  const itemCount = items.length;
  const anglePerItem = itemCount > 0 ? 360 / itemCount : 0;
  const rawActivePosition =
    itemCount && anglePerItem ? -rotation / anglePerItem : 0;
  const activeIndex = itemCount
    ? wrapIndex(Math.round(rawActivePosition), itemCount)
    : 0;
  const activePositionDelta = rawActivePosition - Math.round(rawActivePosition);
  const isInstagramLite = variant === "instagram-lite";
  const isDesktop =
    !isInstagramLite && responsiveGallery.breakpoint === "desktop";
  const gallery = isInstagramLite
    ? INSTAGRAM_LITE_CONFIG
    : isDesktop && desktopConfig
      ? { ...responsiveGallery, ...desktopConfig }
      : responsiveGallery;
  const effectiveAutoRotateSpeed = isDesktop
    ? (desktopConfig?.autoRotateSpeed ?? autoRotateSpeed)
    : autoRotateSpeed;

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
    if (!onActiveIndexChange || lastActiveIndexRef.current === activeIndex) {
      return;
    }

    lastActiveIndexRef.current = activeIndex;
    onActiveIndexChange(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  useEffect(() => {
    if (reducedMotion || isPaused || isDragging || itemCount < 2) return;

    const rotate = () => {
      setRotation((current) => current - effectiveAutoRotateSpeed);
      frameRef.current = requestAnimationFrame(rotate);
    };

    frameRef.current = requestAnimationFrame(rotate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [
    effectiveAutoRotateSpeed,
    isDragging,
    isPaused,
    itemCount,
    reducedMotion,
  ]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    startRotationRef.current = rotation;
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
      setRotation(startRotationRef.current + deltaX * (isDesktop ? 0.24 : 0.2));
    }
  };

  const finishPointerGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    suppressClickRef.current = maxMoveXRef.current >= 6;
    pointerIdRef.current = null;
    setIsDragging(false);
    resumeAutoplaySoon();
  };

  const handleItemClick = (item: CircularGalleryItem, index: number) => {
    pauseAutoplay();
    resumeAutoplaySoon();

    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    onItemClick?.(item, index);
  };

  if (itemCount === 0) return null;

  return (
    <div
      role="region"
      aria-label={"Menu Take Away em galeria 3D"}
      className={cn(
        "relative mx-auto flex w-full max-w-[1280px] touch-pan-y items-center justify-center overflow-hidden lg:overflow-visible",
        className,
      )}
      style={{
        height: gallery.stageHeight,
        minHeight: `${gallery.stageMinHeight}px`,
        perspective: `${gallery.perspective}px`,
        perspectiveOrigin: "50% 50%",
        ...style,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerGesture}
      onPointerCancel={finishPointerGesture}
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden transition-transform duration-150 ease-linear lg:overflow-visible",
          isDragging && "transition-none",
        )}
        style={{
          transform: "translateZ(0)",
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, index) => {
          const offset = shortestOffset(index, activeIndex, itemCount);
          const visualOffset = offset - activePositionDelta;
          const discreteDistance = Math.abs(offset);
          const coverflowDistance = Math.abs(visualOffset);
          const isActive = discreteDistance === 0;
          const isNeighbor =
            discreteDistance === 1 && coverflowDistance <= 1.18;
          const desktopSafeZoneThreshold = 0.68;
          const desktopVisible =
            isActive ||
            (discreteDistance === 1 &&
              Math.abs(visualOffset) >= desktopSafeZoneThreshold &&
              Math.abs(visualOffset) <= 1.25);
          const isVisible = isDesktop ? desktopVisible : isActive || isNeighbor;
          const clampedOffset = Math.max(-1, Math.min(1, visualOffset));
          const desktopScale = isActive
            ? 1
            : discreteDistance === 1
              ? gallery.sideScale
              : gallery.farScale;
          const transform = isDesktop
            ? `translate3d(-50%, -50%, 0) translateX(${clampedOffset * 84}%) rotateY(${clampedOffset * -34}deg) translateZ(${isActive ? 40 : -180}px) scale(${desktopScale})`
            : `translate3d(-50%, -50%, 0) translateX(${clampedOffset * gallery.sideTranslate}%) rotateY(${clampedOffset * -gallery.sideRotate}deg) translateZ(${isActive ? 0 : gallery.sideDepth}px) scale(${isActive ? 1 : gallery.sideScale})`;
          const opacity = !isVisible
            ? 0
            : isActive
              ? 1
              : discreteDistance === 1
                ? gallery.sideOpacity
                : gallery.farOpacity;
          const zIndex = isActive ? 100 : 1;
          const cleanCard = isInstagramLite;

          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                "absolute left-1/2 top-1/2 block overflow-hidden text-left outline-none ring-offset-2 transition-[opacity,transform,visibility] duration-300 focus-visible:ring-4 focus-visible:ring-white/60",
                cleanCard ? "rounded-[8px]" : "rounded-[12px]",
              )}
              style={{
                width: gallery.cardWidth,
                height: gallery.cardHeight,
                minHeight: `${gallery.cardMinHeight}px`,
                border:
                  isActive && !cleanCard
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "none",
                background: isActive && !cleanCard ? "#101010" : "transparent",
                boxShadow:
                  isActive && !cleanCard
                    ? "0 20px 48px rgba(0,0,0,0.24)"
                    : "none",
                opacity,
                visibility: isVisible ? "visible" : "hidden",
                zIndex,
                transform,
                transformStyle: "preserve-3d",
                pointerEvents: isActive ? "auto" : "none",
                padding: isActive && !cleanCard ? "6px" : 0,
              }}
              aria-hidden={!isActive}
              aria-label={`Abrir zoom: ${item.title}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleItemClick(item, index)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full select-none object-contain"
                sizes="(max-width: 767px) 88vw, (max-width: 1023px) 74vw, 390px"
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
              <span className="sr-only">{item.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
