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
    radius: radius ?? 500,
    visibleSideCount: 2,
  });

  useEffect(() => {
    if (typeof radius === "number") {
      setConfig({ radius, visibleSideCount: 2 });
      return;
    }

    const update = () => {
      const width = window.innerWidth;

      if (width < 480) setConfig({ radius: 215, visibleSideCount: 1 });
      else if (width < 768) setConfig({ radius: 250, visibleSideCount: 1 });
      else if (width < 1024) setConfig({ radius: 380, visibleSideCount: 2 });
      else if (width < 1280) setConfig({ radius: 460, visibleSideCount: 2 });
      else setConfig({ radius: 520, visibleSideCount: 2 });
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
  const { radius: resolvedRadius, visibleSideCount } =
    useResponsiveGallery(radius);
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
        "relative mx-auto flex h-[440px] w-full max-w-[1280px] touch-pan-y items-center justify-center overflow-visible sm:h-[520px] md:h-[640px] lg:h-[680px]",
        className,
      )}
      style={{ perspective: "1800px", ...style }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerGesture}
      onPointerCancel={finishPointerGesture}
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-visible transition-transform duration-150 ease-linear",
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
          const opacity = !isVisible
            ? 0
            : isActive
              ? 1
              : distance === 1
                ? 0.58
                : 0.2;
          const scale = isActive ? 1 : distance === 1 ? 0.76 : 0.6;

          return (
            <button
              key={item.id}
              type="button"
              className="absolute left-1/2 top-1/2 block h-[320px] w-[228px] overflow-hidden rounded-[12px] border border-white/18 bg-[#111] p-2 text-left shadow-[0_28px_70px_rgba(0,0,0,0.3)] outline-none ring-offset-2 transition-opacity duration-300 focus-visible:ring-4 focus-visible:ring-white/60 sm:h-[390px] sm:w-[278px] md:h-[470px] md:w-[336px]"
              style={{
                opacity,
                zIndex: Math.round(100 - distance),
                transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(${resolvedRadius}px) scale(${scale})`,
                transformStyle: "preserve-3d",
                pointerEvents: isVisible ? "auto" : "none",
              }}
              aria-hidden={!isVisible}
              aria-label={`Abrir zoom: ${item.title}`}
              tabIndex={isVisible ? 0 : -1}
              onClick={() => handleItemClick(item, index)}
            >
              <span className="flex h-full w-full items-center justify-center rounded-[8px] bg-neutral-100 p-2">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full select-none object-contain"
                  sizes="(max-width: 640px) 228px, (max-width: 768px) 278px, 336px"
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
