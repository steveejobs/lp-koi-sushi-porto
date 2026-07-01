"use client";

import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import type { KoiMenuPage } from "@/data/koi-menu-pages";

type InstagramCircularMenuGalleryProps = {
  pages: KoiMenuPage[];
  onActiveIndexChange: (index: number) => void;
  onPageClick: (index: number) => void;
};

type CircularMenuConfig = {
  perspective: number;
  radius: number;
  cardWidth: string;
  cardHeight: string;
  stageHeight: string;
  stageMinHeight: number;
  autoRotateSpeed: number;
};

const RESUME_AUTOPLAY_MS = 1000;
const TAP_THRESHOLD_PX = 6;

const MOBILE_CONFIG: CircularMenuConfig = {
  perspective: 1100,
  radius: 260,
  cardWidth: "min(74vw, 280px)",
  cardHeight: "min(54svh, 410px)",
  stageHeight: "min(62svh, 480px)",
  stageMinHeight: 390,
  autoRotateSpeed: 0.014,
};

const TABLET_CONFIG: CircularMenuConfig = {
  perspective: 1300,
  radius: 370,
  cardWidth: "320px",
  cardHeight: "470px",
  stageHeight: "560px",
  stageMinHeight: 500,
  autoRotateSpeed: 0.012,
};

const DESKTOP_CONFIG: CircularMenuConfig = {
  perspective: 1500,
  radius: 470,
  cardWidth: "340px",
  cardHeight: "530px",
  stageHeight: "640px",
  stageMinHeight: 560,
  autoRotateSpeed: 0.011,
};

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function normalizeAngle(angle: number) {
  const wrapped = ((angle % 360) + 360) % 360;
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

function getOpacity(normalizedAngle: number) {
  if (normalizedAngle < 18) return 1;
  if (normalizedAngle < 55) {
    const progress = (normalizedAngle - 18) / 37;
    return 0.38 - progress * 0.16;
  }
  if (normalizedAngle < 90) {
    const progress = (normalizedAngle - 55) / 35;
    return 0.16 - progress * 0.08;
  }
  return 0;
}

function useCircularMenuConfig() {
  const [config, setConfig] = useState<CircularMenuConfig>(MOBILE_CONFIG);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) {
        setConfig(DESKTOP_CONFIG);
      } else if (window.innerWidth >= 768) {
        setConfig(TABLET_CONFIG);
      } else {
        setConfig(MOBILE_CONFIG);
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
}

export function InstagramCircularMenuGallery({
  pages,
  onActiveIndexChange,
  onPageClick,
}: InstagramCircularMenuGalleryProps) {
  const config = useCircularMenuConfig();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const frameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const maxMoveXRef = useRef(0);
  const suppressClickRef = useRef(false);
  const lastActiveIndexRef = useRef(0);
  const pageCount = pages.length;
  const anglePerItem = pageCount > 0 ? 360 / pageCount : 0;
  const computedActiveIndex = pageCount
    ? wrapIndex(Math.round(-rotation / anglePerItem), pageCount)
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
    }, RESUME_AUTOPLAY_MS);
  };

  useEffect(() => {
    if (lastActiveIndexRef.current === computedActiveIndex) return;

    lastActiveIndexRef.current = computedActiveIndex;
    onActiveIndexChange(computedActiveIndex);
  }, [computedActiveIndex, onActiveIndexChange]);

  useEffect(() => {
    if (isPaused || isDragging || pageCount < 2) return;

    const rotate = () => {
      setRotation(
        (currentRotation) => currentRotation - config.autoRotateSpeed,
      );
      frameRef.current = requestAnimationFrame(rotate);
    };

    frameRef.current = requestAnimationFrame(rotate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [config.autoRotateSpeed, isDragging, isPaused, pageCount]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
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
    maxMoveXRef.current = Math.max(maxMoveXRef.current, Math.abs(deltaX));
    setRotation(startRotationRef.current + deltaX * 0.2);
  };

  const finishPointerGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    suppressClickRef.current = maxMoveXRef.current >= TAP_THRESHOLD_PX;
    pointerIdRef.current = null;
    setIsDragging(false);
    resumeAutoplaySoon();
  };

  if (pageCount === 0) return null;

  return (
    <div
      className="relative mx-auto flex w-full touch-pan-y items-center justify-center overflow-hidden"
      style={
        {
          height: config.stageHeight,
          minHeight: `${config.stageMinHeight}px`,
          perspective: `${config.perspective}px`,
          perspectiveOrigin: "50% 50%",
          "--instagram-menu-card-width": config.cardWidth,
          "--instagram-menu-card-height": config.cardHeight,
        } as CSSProperties
      }
      role="region"
      aria-label="Menu Take Away em galeria circular 3D"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointerGesture}
      onPointerCancel={finishPointerGesture}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: "preserve-3d",
          transition: isDragging ? "none" : "transform 80ms linear",
          willChange: "transform",
        }}
      >
        {pages.map((page, index) => {
          const itemAngle = index * anglePerItem;
          const relativeAngle = normalizeAngle(rotation + itemAngle);
          const normalizedAngle = Math.abs(relativeAngle);
          const isFront = index === computedActiveIndex && normalizedAngle < 18;
          const opacity = getOpacity(normalizedAngle);
          const visible = opacity > 0;

          return (
            <button
              key={page.id}
              type="button"
              className="absolute left-1/2 top-1/2 block overflow-visible rounded-[8px] bg-transparent p-0 text-left outline-none"
              style={{
                width: "var(--instagram-menu-card-width)",
                height: "var(--instagram-menu-card-height)",
                border: "none",
                boxShadow: isFront ? "0 18px 42px rgba(0, 0, 0, 0.16)" : "none",
                opacity,
                pointerEvents: isFront ? "auto" : "none",
                transform: `translate3d(-50%, -50%, 0) rotateY(${itemAngle}deg) translateZ(${config.radius}px)`,
                transformStyle: "preserve-3d",
                visibility: visible ? "visible" : "hidden",
                zIndex: Math.max(0, 1000 - Math.round(normalizedAngle * 10)),
              }}
              aria-hidden={!isFront}
              aria-label={`Abrir ${page.title}`}
              tabIndex={isFront ? 0 : -1}
              onClick={() => {
                if (suppressClickRef.current) {
                  suppressClickRef.current = false;
                  return;
                }

                onPageClick(index);
                pauseAutoplay();
                resumeAutoplaySoon();
              }}
            >
              <img
                src={page.src}
                alt={isFront ? page.alt : ""}
                className="h-full w-full select-none rounded-[8px] object-contain"
                loading={isFront ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
