"use client";

import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KoiMenuPage } from "@/data/koi-menu-pages";

type InstagramCircularMenuGalleryProps = {
  pages: KoiMenuPage[];
  onActiveIndexChange: (index: number) => void;
  onPageClick: (index: number) => void;
  paused?: boolean;
};

type CircularMenuConfig = {
  perspective: number;
  radius: number;
  cardWidth: string;
  cardHeight: string;
  stageHeight: string;
  stageMinHeight: number;
};

const RESUME_AUTOPLAY_MS = 1000;
const TAP_THRESHOLD_PX = 6;
const STEP_PAUSE_MS = 2800;
const STEP_DURATION_MS = 860;

const MOBILE_CONFIG: CircularMenuConfig = {
  perspective: 1100,
  radius: 128,
  cardWidth: "clamp(132px, 46vw, 178px)",
  cardHeight: "clamp(194px, 65vw, 268px)",
  stageHeight: "clamp(270px, 42svh, 340px)",
  stageMinHeight: 270,
};

const TABLET_CONFIG: CircularMenuConfig = {
  perspective: 1100,
  radius: 218,
  cardWidth: "218px",
  cardHeight: "328px",
  stageHeight: "420px",
  stageMinHeight: 390,
};

const DESKTOP_CONFIG: CircularMenuConfig = {
  perspective: 1250,
  radius: 310,
  cardWidth: "248px",
  cardHeight: "372px",
  stageHeight: "470px",
  stageMinHeight: 430,
};

function normalizeAngle(angle: number) {
  const wrapped = ((angle % 360) + 360) % 360;
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function isLateralVisible(normalizedAngle: number) {
  return normalizedAngle >= 30 && normalizedAngle <= 52;
}

function getFrontIndex(
  rotation: number,
  itemCount: number,
  anglePerItem: number,
) {
  if (!itemCount) return 0;

  let frontIndex = 0;
  let smallestAngle = Number.POSITIVE_INFINITY;

  for (let index = 0; index < itemCount; index += 1) {
    const relativeAngle = normalizeAngle(rotation + index * anglePerItem);
    const absAngle = Math.abs(relativeAngle);

    if (absAngle < smallestAngle) {
      smallestAngle = absAngle;
      frontIndex = index;
    }
  }

  return frontIndex;
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
  paused = false,
}: InstagramCircularMenuGalleryProps) {
  const config = useCircularMenuConfig();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const frameRef = useRef<number | null>(null);
  const stepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const maxMoveXRef = useRef(0);
  const suppressClickRef = useRef(false);
  const lastActiveIndexRef = useRef(0);
  const rotationRef = useRef(0);
  const pageCount = pages.length;
  const anglePerItem = pageCount > 0 ? 360 / pageCount : 0;
  const frontIndex = useMemo(
    () => getFrontIndex(rotation, pageCount, anglePerItem),
    [anglePerItem, pageCount, rotation],
  );

  const setGalleryRotation = (nextRotation: number) => {
    rotationRef.current = nextRotation;
    setRotation(nextRotation);
  };

  const clearStepAutoplay = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current);
      stepTimeoutRef.current = null;
    }
  };

  const pauseAutoplay = () => {
    clearStepAutoplay();
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
    if (lastActiveIndexRef.current === frontIndex) return;

    lastActiveIndexRef.current = frontIndex;
    onActiveIndexChange(frontIndex);
  }, [frontIndex, onActiveIndexChange]);

  useEffect(() => {
    if (paused || isPaused || isDragging || pageCount < 2 || !anglePerItem) {
      clearStepAutoplay();
      return undefined;
    }

    const animateToNextPage = () => {
      const startRotation = rotationRef.current;
      const targetRotation = startRotation - anglePerItem;
      const startedAt = performance.now();

      const animate = (timestamp: number) => {
        const progress = Math.min(
          1,
          (timestamp - startedAt) / STEP_DURATION_MS,
        );
        const easedProgress = easeInOutCubic(progress);
        setGalleryRotation(
          startRotation + (targetRotation - startRotation) * easedProgress,
        );

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
          return;
        }

        setGalleryRotation(targetRotation);
        frameRef.current = null;
        stepTimeoutRef.current = setTimeout(animateToNextPage, STEP_PAUSE_MS);
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    stepTimeoutRef.current = setTimeout(animateToNextPage, STEP_PAUSE_MS);

    return clearStepAutoplay;
  }, [anglePerItem, isDragging, isPaused, pageCount, paused]);

  useEffect(() => clearStepAutoplay, []);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startRotationRef.current = rotationRef.current;
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
    setGalleryRotation(startRotationRef.current + deltaX * 0.2);
  };

  const finishPointerGesture = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    suppressClickRef.current = maxMoveXRef.current >= TAP_THRESHOLD_PX;
    pointerIdRef.current = null;
    setIsDragging(false);

    if (anglePerItem) {
      const nearestIndex = getFrontIndex(
        rotationRef.current,
        pageCount,
        anglePerItem,
      );
      setGalleryRotation(-nearestIndex * anglePerItem);
    }

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
          willChange: "transform",
        }}
      >
        {pages.map((page, index) => {
          const itemAngle = index * anglePerItem;
          const relativeAngle = normalizeAngle(rotation + itemAngle);
          const normalizedAngle = Math.abs(relativeAngle);
          const isFront = index === frontIndex;
          const isLateral = !isFront && isLateralVisible(normalizedAngle);
          const opacity = isFront ? 1 : isLateral ? 0.12 : 0;
          const visible = isFront || isLateral;

          return (
            <button
              key={page.id}
              type="button"
              className="absolute left-1/2 top-1/2 block overflow-visible rounded-[8px] bg-transparent p-0 text-left outline-none"
              style={{
                width: "var(--instagram-menu-card-width)",
                height: "var(--instagram-menu-card-height)",
                border: "none",
                boxShadow: "none",
                filter: "none",
                opacity,
                pointerEvents: isFront ? "auto" : "none",
                transform: `translate3d(-50%, -50%, 0) rotateY(${itemAngle}deg) translateZ(${config.radius}px)`,
                transformStyle: "preserve-3d",
                visibility: visible ? "visible" : "hidden",
                zIndex: isFront ? 60 : isLateral ? 5 : 0,
              }}
              aria-hidden={!isFront}
              aria-label={`Abrir Menu Take Away · Página ${index + 1} de ${pageCount}`}
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
                alt={
                  isFront
                    ? `Página ${index + 1} de ${pageCount} do menu Take Away do Koi Sushi Porto`
                    : ""
                }
                className="h-full w-full select-none rounded-[6px] object-contain"
                loading={isFront ? "eager" : "lazy"}
                decoding="async"
                style={{ opacity: 1, filter: "none", mixBlendMode: "normal" }}
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

