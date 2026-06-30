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
  radius?: number;
  autoRotateSpeed?: number;
  onItemClick?: (item: CircularGalleryItem, index: number) => void;
  onActiveIndexChange?: (index: number) => void;
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

function useResponsiveGallery(radius?: number) {
  const [config, setConfig] = useState({
    radius: radius ?? 520,
    visibleSideCount: 2,
    perspective: 1800,
    mode: "desktop" as "mobile" | "tablet" | "desktop",
  });

  useEffect(() => {
    if (typeof radius === "number") {
      setConfig({
        radius,
        visibleSideCount: 2,
        perspective: 1800,
        mode: "desktop",
      });
      return;
    }

    const update = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setConfig({
          radius: 175,
          visibleSideCount: 1,
          perspective: 1100,
          mode: "mobile",
        });
      } else if (width < 1024) {
        setConfig({
          radius: 300,
          visibleSideCount: 1,
          perspective: 1400,
          mode: "tablet",
        });
      } else if (width < 1280) {
        setConfig({
          radius: 460,
          visibleSideCount: 2,
          perspective: 1800,
          mode: "desktop",
        });
      } else {
        setConfig({
          radius: 520,
          visibleSideCount: 2,
          perspective: 1900,
          mode: "desktop",
        });
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, [radius]);

  return config;
}
export function CircularGallery({
  items,
  className,
  radius,
  autoRotateSpeed = 0.035,
  onItemClick,
  onActiveIndexChange,
  style,
  ...props
}: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const {
    radius: resolvedRadius,
    visibleSideCount,
    perspective,
    mode,
  } = useResponsiveGallery(radius);
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
  const activeIndex = itemCount
    ? wrapIndex(Math.round(-rotation / anglePerItem), itemCount)
    : 0;

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
      setRotation((current) => current - autoRotateSpeed);
      frameRef.current = requestAnimationFrame(rotate);
    };

    frameRef.current = requestAnimationFrame(rotate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [autoRotateSpeed, isDragging, isPaused, itemCount, reducedMotion]);

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
      setRotation(startRotationRef.current + deltaX * 0.24);
    }
  };

  const finishPointerGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    suppressClickRef.current = maxMoveXRef.current > 6;
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
      aria-label="Cardápio Take Away em galeria circular"
      className={cn(
        "relative mx-auto flex h-[min(68svh,500px)] min-h-[380px] w-full max-w-[1280px] touch-pan-y items-center justify-center overflow-hidden sm:h-[min(72svh,560px)] md:h-[600px] lg:h-[680px] lg:overflow-visible",
        className,
      )}
      style={{ perspective: `${perspective}px`, ...style }}
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
          transform: `rotateY(${rotation}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, index) => {
          const itemAngle = index * anglePerItem;
          const offset = shortestOffset(index, activeIndex, itemCount);
          const distance = Math.abs(offset);
          const isVisible = distance <= visibleSideCount;
          const isActive = distance === 0;
          const sideOpacity = mode === "mobile" ? 0.28 : mode === "tablet" ? 0.34 : 0.58;
          const sideScale = mode === "mobile" ? 0.76 : mode === "tablet" ? 0.8 : 0.76;
          const farScale = mode === "desktop" ? 0.6 : 0.72;
          const opacity = !isVisible
            ? 0
            : isActive
              ? 1
              : distance === 1
                ? sideOpacity
                : mode === "desktop"
                  ? 0.2
                  : 0;
          const scale = isActive ? 1 : distance === 1 ? sideScale : farScale;
          const transform = `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${resolvedRadius}px) scale(${scale})`;
          const sideCard = !isActive && mode !== "desktop";

          return (
            <button
              key={item.id}
              type="button"
              className="absolute left-1/2 top-1/2 block h-[min(62svh,480px)] min-h-[340px] w-[min(82vw,330px)] overflow-hidden rounded-[12px] text-left outline-none ring-offset-2 transition-opacity duration-300 focus-visible:ring-4 focus-visible:ring-white/60 sm:h-[min(68svh,500px)] sm:w-[min(84vw,350px)] md:h-[500px] md:w-[340px] lg:h-[470px] lg:w-[336px]"
              style={{
                border: sideCard
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(255,255,255,0.18)",
                background: sideCard ? "rgba(17,17,17,0.28)" : "#111",
                boxShadow: sideCard
                  ? "0 8px 18px rgba(0,0,0,0.12)"
                  : "0 24px 58px rgba(0,0,0,0.28)",
                opacity,
                zIndex: isActive ? 100 : Math.max(1, 30 - distance),
                transform,
                transformStyle: "preserve-3d",
                pointerEvents: isActive ? "auto" : "none",
              }}
              aria-hidden={!isActive}
              aria-label={`Abrir zoom: ${item.title}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleItemClick(item, index)}
            >
              <span
                className="flex h-full w-full items-center justify-center rounded-[8px] p-2"
                style={{ background: sideCard ? "rgba(245,245,245,0.16)" : "#f5f5f5" }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full select-none object-contain"
                  sizes="(max-width: 767px) 82vw, (max-width: 1023px) 340px, 336px"
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </span>
              <span className="sr-only">{item.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
