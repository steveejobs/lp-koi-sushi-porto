"use client";

import { useCallback, useEffect, useRef } from "react";

interface InkRevealProps {
  /** RGB color of the mask overlay, e.g. [252, 250, 248] */
  maskColor?: [number, number, number];
  /** Radius of each ink stamp in px */
  brushSize?: number;
  /** How long each stamp lives before fading (ms) */
  lifetime?: number;
  /** Initial radius before the stamp expands */
  rStart?: number;
  /** Random variation factor for stamp radius (0-1) */
  rVary?: number;
  /** Min pixel distance between stamps along a stroke */
  stampStep?: number;
  /** Max stamps alive at once (oldest are pruned) */
  maxStamps?: number;
  /** Number of segments on the wobble circle (higher = smoother) */
  segments?: number;
  /** Wobble amplitude weights [primary, secondary, tertiary] */
  wobble?: [number, number, number];
  /** Gradient inner-radius factor (0-1, relative to stamp radius) */
  gradientInnerRadius?: number;
  /** Gradient opacity stops [center, mid, edge] */
  gradientStops?: [number, number, number];
  /** Extra CSS class for the canvas element */
  className?: string;
  /** Extra inline styles for the canvas element */
  style?: React.CSSProperties;
  /** Enables the mobile viewport-driven automated stroke path */
  autoMobile?: boolean;
  /** Runs an initial stroke and fades the mask away once the image is revealed */
  autoReveal?: boolean;
  /** Delay before the mask starts fading out after the first reveal */
  revealDelay?: number;
  /** Duration of the final mask fade */
  revealFadeDuration?: number;
  /** Direction used by the automatic reveal stroke */
  autoRevealPath?: "horizontal" | "vertical";
}

interface Stamp {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
}

export default function InkReveal({
  maskColor = [252, 250, 248],
  brushSize = 128,
  lifetime = 600,
  rStart = 10,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 200,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
  autoMobile = true,
  autoReveal = false,
  revealDelay = 1200,
  revealFadeDuration = 900,
  autoRevealPath = "horizontal",
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const runningRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const canvasRectRef = useRef<DOMRect | null>(null);
  const revealedRef = useRef(false);
  const revealTimeoutRef = useRef<number | null>(null);

  const mc = maskColor;

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    dimsRef.current = { w, h };
    canvasRectRef.current = canvas.getBoundingClientRect();
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
    ctx.fillRect(0, 0, w, h);
    if (revealedRef.current) {
      canvas.style.opacity = "0";
    }
  }, [mc]);

  const carveInk = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      seed: number,
      alpha: number,
    ) => {
      const g = ctx.createRadialGradient(
        x,
        y,
        r * gradientInnerRadius,
        x,
        y,
        r,
      );
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      ctx.fillStyle = g;

      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob;
        const py = y + Math.sin(a) * r * wob;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    },
    [segments, wobble, gradientInnerRadius, gradientStops],
  );

  const addStamp = useCallback(
    (x: number, y: number) => {
      const stamps = stampsRef.current;
      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, rVary, maxStamps],
  );

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const last = lastPosRef.current;
      if (!last) {
        addStamp(x, y);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / stampStep));
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      }
      lastPosRef.current = { x, y };
    },
    [addStamp, stampStep],
  );

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    const now = performance.now();
    const stamps = stampsRef.current;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "destination-out";

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = rStart + (stamps[i].rmax - rStart) * ease;
      const alpha = 1 - t * t;
      carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha);
    }

    if (stamps.length && !revealedRef.current) {
      requestAnimationFrame(loop);
    } else {
      runningRef.current = false;
    }
  }, [carveInk, mc, lifetime, rStart]);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(loop);
    }
  }, [loop]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !autoReveal) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = 0;

    const completeReveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      canvas.style.opacity = "0";
      canvas.style.pointerEvents = "none";
    };

    if (reducedQuery.matches) {
      completeReveal();
      return;
    }

    const run = (time: number) => {
      if (!started) started = time;
      const elapsed = time - started;
      const { w, h } = dimsRef.current;
      const t = elapsed / 1000;
      const progress = Math.min(elapsed / revealDelay, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const horizontal = autoRevealPath === "horizontal";
      const x = horizontal
        ? -brushSize + (w + brushSize * 2) * eased
        : w * (0.34 + 0.32 * eased + Math.sin(t * 3.4) * 0.04);
      const y = horizontal
        ? h * (0.2 + 0.56 * progress + Math.sin(t * 3.6) * 0.055)
        : -brushSize + (h + brushSize * 2) * eased;

      stampAlong(x, y);
      addStamp(
        horizontal ? x - brushSize * 0.28 : x + brushSize * 0.42,
        horizontal ? y + brushSize * 0.42 : y - brushSize * 0.24,
      );
      addStamp(
        horizontal ? x + brushSize * 0.22 : x - brushSize * 0.38,
        horizontal ? y - brushSize * 0.36 : y + brushSize * 0.22,
      );
      startLoop();

      if (elapsed < revealDelay) {
        frame = requestAnimationFrame(run);
      } else {
        revealTimeoutRef.current = window.setTimeout(completeReveal, 80);
      }
    };

    frame = requestAnimationFrame(run);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (revealTimeoutRef.current !== null) {
        window.clearTimeout(revealTimeoutRef.current);
      }
    };
  }, [
    addStamp,
    autoReveal,
    autoRevealPath,
    brushSize,
    revealDelay,
    stampAlong,
    startLoop,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !autoMobile) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let started = 0;

    const drawStatic = () => {
      const { w, h } = dimsRef.current;
      lastPosRef.current = null;
      stampAlong(w * 0.52, h * 0.45);
      stampAlong(w * 0.68, h * 0.4);
      startLoop();
    };

    const run = (time: number) => {
      if (
        revealedRef.current ||
        !visible ||
        !mobileQuery.matches ||
        reducedQuery.matches
      ) {
        frame = 0;
        return;
      }
      if (!started) started = time;
      const { w, h } = dimsRef.current;
      const t = (time - started) / 1000;
      const x = w * (0.28 + 0.46 * ((Math.sin(t * 0.8 - 1.1) + 1) / 2));
      const y = h * (0.38 + 0.2 * ((Math.sin(t * 1.15) + 1) / 2));
      stampAlong(x, y);
      startLoop();
      frame = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (reducedQuery.matches) {
          drawStatic();
          return;
        }
        if (visible && mobileQuery.matches && !frame) {
          started = 0;
          frame = requestAnimationFrame(run);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [autoMobile, stampAlong, startLoop]);

  const flushPointer = useCallback(() => {
    pointerFrameRef.current = null;
    const pos = pointerRef.current;
    if (!pos) return;
    stampAlong(pos.x, pos.y);
    startLoop();
  }, [stampAlong, startLoop]);

  const queuePointer = useCallback(
    (x: number, y: number) => {
      pointerRef.current = { x, y };
      if (pointerFrameRef.current === null) {
        pointerFrameRef.current = requestAnimationFrame(flushPointer);
      }
    },
    [flushPointer],
  );

  const getRelativePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect =
      canvasRectRef.current ?? e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        cursor: "none",
        opacity: 1,
        transition: `opacity ${revealFadeDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (revealedRef.current) return;
        canvasRectRef.current = e.currentTarget.getBoundingClientRect();
        const pos = getRelativePos(e);
        lastPosRef.current = pos;
        queuePointer(pos.x, pos.y);
      }}
      onMouseMove={(e) => {
        if (revealedRef.current) return;
        const pos = getRelativePos(e);
        queuePointer(pos.x, pos.y);
      }}
      onMouseLeave={() => {
        lastPosRef.current = null;
        pointerRef.current = null;
      }}
    />
  );
}
