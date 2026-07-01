"use client";

import { useEffect, useRef, type ReactNode } from "react";

type HeroImageRevealProps = {
  children: ReactNode;
  className?: string;
};

type RevealMark = {
  x: number;
  y: number;
  radius: number;
  seed: number;
};

const TAU = Math.PI * 2;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function createRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function paintPaperTexture(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const random = createRandom(2087);

  context.clearRect(0, 0, width, height);

  const base = context.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#26180f");
  base.addColorStop(0.42, "#3a2417");
  base.addColorStop(1, "#2a1b12");
  context.fillStyle = base;
  context.fillRect(0, 0, width, height);

  const stainCount = clamp(Math.round((width * height) / 42000), 10, 28);
  for (let index = 0; index < stainCount; index += 1) {
    const x = random() * width;
    const y = random() * height;
    const radius = (0.1 + random() * 0.24) * Math.min(width, height);
    const stain = context.createRadialGradient(x, y, 0, x, y, radius);
    const warm = random() > 0.45;
    stain.addColorStop(
      0,
      warm ? "rgba(124, 79, 43, 0.14)" : "rgba(12, 7, 4, 0.13)",
    );
    stain.addColorStop(1, "rgba(35, 20, 12, 0)");
    context.fillStyle = stain;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const grainCount = clamp(Math.round((width * height) / 95), 1200, 9000);
  for (let index = 0; index < grainCount; index += 1) {
    const alpha = 0.018 + random() * 0.035;
    context.fillStyle =
      random() > 0.48
        ? `rgba(224, 188, 135, ${alpha})`
        : `rgba(8, 5, 3, ${alpha})`;
    const size = 0.35 + random() * 1.1;
    context.fillRect(random() * width, random() * height, size, size * 0.55);
  }

  context.save();
  context.globalAlpha = 0.12;
  context.lineWidth = 0.45;
  for (let index = 0; index < 15; index += 1) {
    const y = random() * height;
    context.beginPath();
    context.moveTo(-20, y);
    context.bezierCurveTo(
      width * 0.28,
      y + (random() - 0.5) * 24,
      width * 0.68,
      y + (random() - 0.5) * 32,
      width + 20,
      y + (random() - 0.5) * 18,
    );
    context.strokeStyle =
      index % 3 === 0 ? "rgba(7, 4, 2, 0.5)" : "rgba(213, 165, 105, 0.34)";
    context.stroke();
  }
  context.restore();

  const vignetteRadius = Math.hypot(width, height) * 0.58;
  const vignette = context.createRadialGradient(
    width * 0.5,
    height * 0.48,
    Math.min(width, height) * 0.18,
    width * 0.5,
    height * 0.48,
    vignetteRadius,
  );
  vignette.addColorStop(0.48, "rgba(10, 5, 3, 0)");
  vignette.addColorStop(0.82, "rgba(10, 5, 3, 0.22)");
  vignette.addColorStop(1, "rgba(5, 3, 2, 0.62)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function drawRevealMark(
  context: CanvasRenderingContext2D,
  mark: RevealMark,
  width: number,
  height: number,
) {
  const random = createRandom(mark.seed);
  const x = mark.x * width;
  const y = mark.y * height;
  const radius = mark.radius * Math.min(width, height);

  context.save();
  context.globalCompositeOperation = "source-atop";

  for (let index = 0; index < 7; index += 1) {
    const angle = random() * TAU;
    const offset = radius * (0.025 + random() * 0.13);
    const lobeX = x + Math.cos(angle) * offset;
    const lobeY = y + Math.sin(angle) * offset;
    const lobeRadius = radius * (0.86 + random() * 0.3);
    const burn = context.createRadialGradient(
      lobeX,
      lobeY,
      lobeRadius * 0.44,
      lobeX,
      lobeY,
      lobeRadius * 1.12,
    );
    burn.addColorStop(0, "rgba(40, 15, 8, 0.48)");
    burn.addColorStop(0.68, "rgba(40, 15, 8, 0.56)");
    burn.addColorStop(1, "rgba(40, 15, 8, 0)");
    context.fillStyle = burn;
    context.beginPath();
    context.arc(lobeX, lobeY, lobeRadius * 1.12, 0, TAU);
    context.fill();
  }

  context.globalCompositeOperation = "destination-out";

  const eraseBubble = (
    bubbleX: number,
    bubbleY: number,
    bubbleRadius: number,
  ) => {
    const erase = context.createRadialGradient(
      bubbleX,
      bubbleY,
      bubbleRadius * 0.08,
      bubbleX,
      bubbleY,
      bubbleRadius,
    );
    erase.addColorStop(0, "rgba(0, 0, 0, 1)");
    erase.addColorStop(0.62, "rgba(0, 0, 0, 0.98)");
    erase.addColorStop(0.84, "rgba(0, 0, 0, 0.72)");
    erase.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = erase;
    context.beginPath();
    context.arc(bubbleX, bubbleY, bubbleRadius, 0, TAU);
    context.fill();
  };

  eraseBubble(x, y, radius * 0.9);

  const bubbleCount = 7;
  for (let index = 0; index < bubbleCount; index += 1) {
    const angle = (index / bubbleCount) * TAU + (random() - 0.5) * 0.7;
    const offset = radius * (0.45 + random() * 0.25);
    eraseBubble(
      x + Math.cos(angle) * offset,
      y + Math.sin(angle) * offset,
      radius * (0.27 + random() * 0.25),
    );
  }

  context.restore();
}

export function HeroImageReveal({
  children,
  className = "",
}: HeroImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    let width = 0;
    let height = 0;
    let seed = 100;
    let marks: RevealMark[] = [];
    let resizeTimer = 0;
    let pointerFrame = 0;
    let autoFrame = 0;
    let pointerIsDown = false;
    let pendingPoint: { x: number; y: number } | null = null;
    let lastPoint: { x: number; y: number } | null = null;

    const addMark = (x: number, y: number, radius: number) => {
      if (!width || !height) return;

      const mark = {
        x: x / width,
        y: y / height,
        radius: radius / Math.min(width, height),
        seed: seed++,
      };
      marks.push(mark);
      drawRevealMark(context, mark, width, height);
    };

    const renderCanvas = () => {
      const bounds = wrapper.getBoundingClientRect();
      if (bounds.width < 1 || bounds.height < 1) return;

      width = bounds.width;
      height = bounds.height;
      const maximumPixelRatio = finePointerQuery.matches ? 2.5 : 1.5;
      const pixelRatio = clamp(
        window.devicePixelRatio || 1,
        1,
        maximumPixelRatio,
      );
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      paintPaperTexture(context, width, height);
      marks.forEach((mark) => drawRevealMark(context, mark, width, height));
    };

    const startAutoReveal = () => {
      const pointCount = 32;
      const duration = 2800;
      const pathRandom = createRandom(7341);
      const path = Array.from({ length: pointCount }, (_, index) => {
        const progress = index / (pointCount - 1);
        const curve = Math.sin(progress * Math.PI * 3.4) * 0.038;
        const wobble = (pathRandom() - 0.5) * 0.026;
        return {
          x: 1.02 - progress * 1.04 + curve + wobble,
          y:
            0.07 +
            progress * 0.87 +
            Math.sin(progress * Math.PI * 2.2 + 0.65) * 0.05 +
            (pathRandom() - 0.5) * 0.022,
          radiusScale: 0.9 + pathRandom() * 0.18,
        };
      });

      let drawnIndex = 0;
      let startTime = 0;

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = clamp((time - startTime) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const targetIndex = Math.min(
          pointCount - 1,
          Math.floor(eased * pointCount),
        );

        while (drawnIndex <= targetIndex) {
          const point = path[drawnIndex];
          const pointProgress = drawnIndex / (pointCount - 1);
          const maximumRadius = Math.min(150, Math.min(width, height) * 0.38);
          const radius =
            (70 + (maximumRadius - 70) * Math.sqrt(pointProgress)) *
            point.radiusScale;
          addMark(point.x * width, point.y * height, radius);
          drawnIndex += 1;
        }

        if (progress < 1) autoFrame = window.requestAnimationFrame(animate);
      };

      autoFrame = window.requestAnimationFrame(animate);
    };

    const initialise = () => {
      if (reducedMotionQuery.matches) {
        canvas.hidden = true;
        return;
      }

      canvas.hidden = false;
      renderCanvas();
      const initialRadius = clamp(Math.min(width, height) * 0.13, 46, 68);
      addMark(width * 0.98, height * 0.16, initialRadius);

      if (!finePointerQuery.matches) startAutoReveal();
    };

    const queuePointerReveal = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pendingPoint = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!pendingPoint) return;

        const radius = clamp(Math.min(width, height) * 0.18, 70, 120);
        const origin = lastPoint ?? pendingPoint;
        const distance = Math.hypot(
          pendingPoint.x - origin.x,
          pendingPoint.y - origin.y,
        );
        const steps = Math.max(1, Math.ceil(distance / (radius * 0.28)));

        for (let index = 1; index <= steps; index += 1) {
          const progress = index / steps;
          addMark(
            origin.x + (pendingPoint.x - origin.x) * progress,
            origin.y + (pendingPoint.y - origin.y) * progress,
            radius * (0.92 + Math.random() * 0.16),
          );
        }

        lastPoint = pendingPoint;
        pendingPoint = null;
      });
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (!finePointerQuery.matches || reducedMotionQuery.matches) return;
      lastPoint = null;
      queuePointerReveal(event);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotionQuery.matches) return;
      if (finePointerQuery.matches || pointerIsDown) queuePointerReveal(event);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (finePointerQuery.matches || reducedMotionQuery.matches) return;
      pointerIsDown = true;
      lastPoint = null;
      queuePointerReveal(event);
    };

    const stopPointerReveal = () => {
      pointerIsDown = false;
      lastPoint = null;
      pendingPoint = null;
    };

    const handleMotionPreference = () => {
      window.cancelAnimationFrame(autoFrame);
      autoFrame = 0;

      if (reducedMotionQuery.matches) {
        canvas.hidden = true;
      } else {
        canvas.hidden = false;
        marks = [];
        initialise();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!reducedMotionQuery.matches) renderCanvas();
      }, 160);
    });

    initialise();
    resizeObserver.observe(wrapper);
    canvas.addEventListener("pointerenter", handlePointerEnter);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", stopPointerReveal);
    canvas.addEventListener("pointercancel", stopPointerReveal);
    canvas.addEventListener("pointerleave", stopPointerReveal);
    reducedMotionQuery.addEventListener("change", handleMotionPreference);

    return () => {
      resizeObserver.disconnect();
      window.clearTimeout(resizeTimer);
      window.cancelAnimationFrame(pointerFrame);
      window.cancelAnimationFrame(autoFrame);
      canvas.removeEventListener("pointerenter", handlePointerEnter);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", stopPointerReveal);
      canvas.removeEventListener("pointercancel", stopPointerReveal);
      canvas.removeEventListener("pointerleave", stopPointerReveal);
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-auto absolute inset-0 z-10 h-full w-full touch-pan-y"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}
