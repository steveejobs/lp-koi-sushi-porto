"use client";

import { type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { KoiMenuPage } from "@/data/koi-menu-pages";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pages: KoiMenuPage[];
  initialPage?: number;
  whatsappUrl: string;
  source: "site" | "instagram";
};
type Point = { x: number; y: number };
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;
const wrap = (index: number, length: number) => length ? ((index % length) + length) % length : 0;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function MenuFullViewer({ open, onOpenChange, pages, initialPage = 0, whatsappUrl, source }: Props) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialPage);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointers = useRef(new Map<number, Point>());
  const dragStart = useRef<Point | null>(null);
  const panStart = useRef<Point>({ x: 0, y: 0 });
  const swipeStart = useRef<Point | null>(null);
  const pinchStart = useRef<number | null>(null);
  const pinchZoom = useRef(MIN_ZOOM);
  const total = pages.length;
  const currentPage = pages[currentIndex] ?? pages[0];

  const resetTransform = useCallback(() => {
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
    pointers.current.clear();
  }, []);

  const constrainPan = useCallback((point: Point, scale: number) => {
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds || scale <= MIN_ZOOM) return { x: 0, y: 0 };
    const maxX = (bounds.width * (scale - 1)) / 2;
    const maxY = (bounds.height * (scale - 1)) / 2;
    return { x: clamp(point.x, -maxX, maxX), y: clamp(point.y, -maxY, maxY) };
  }, []);

  const changeZoom = useCallback((next: number) => {
    const scale = clamp(next, MIN_ZOOM, MAX_ZOOM);
    setZoom(scale);
    setPan((point) => constrainPan(point, scale));
  }, [constrainPan]);

  const goToPage = useCallback((index: number) => {
    setCurrentIndex(wrap(index, total));
    resetTransform();
  }, [resetTransform, total]);

  const leaveFullscreen = useCallback(async () => {
    setIsFullscreen(false);
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch { /* CSS fallback is active. */ }
    }
  }, []);

  const closeViewer = useCallback(async () => {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch { /* Portal close is enough. */ }
    }
    setIsFullscreen(false);
    resetTransform();
    onOpenChange(false);
  }, [onOpenChange, resetTransform]);

  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) return leaveFullscreen();
    setIsFullscreen(true);
    try { await dialogRef.current?.requestFullscreen?.(); } catch {
      // Keep the fixed-position CSS fallback active.
    }
  }, [isFullscreen, leaveFullscreen]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setCurrentIndex(wrap(initialPage, total));
    resetTransform();
  }, [initialPage, open, resetTransform, total]);

  useEffect(() => {
    const sync = () => { if (!document.fullscreenElement) setIsFullscreen(false); };
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const previous = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const scrollY = window.scrollY;
    Object.assign(document.body.style, {
      overflow: "hidden", position: "fixed", top: `-${scrollY}px`, width: "100%",
    });
    requestAnimationFrame(() => closeRef.current?.focus());

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (isFullscreen || document.fullscreenElement) void leaveFullscreen();
        else void closeViewer();
        return;
      }
      if (event.key === "ArrowLeft" && zoom === 1) goToPage(currentIndex - 1);
      if (event.key === "ArrowRight" && zoom === 1) goToPage(currentIndex + 1);
      if (event.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])',
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      Object.assign(document.body.style, previous);
      window.scrollTo(0, scrollY);
      previousActive?.focus();
    };
  }, [closeViewer, currentIndex, goToPage, isFullscreen, leaveFullscreen, open, zoom]);

  const distance = () => {
    const points = [...pointers.current.values()];
    return points.length < 2 ? 0 : Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = { x: event.clientX, y: event.clientY };
    pointers.current.set(event.pointerId, point);
    if (pointers.current.size === 2) {
      pinchStart.current = distance();
      pinchZoom.current = zoom;
      dragStart.current = null;
    } else {
      dragStart.current = point;
      swipeStart.current = point;
      panStart.current = pan;
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    const point = { x: event.clientX, y: event.clientY };
    pointers.current.set(event.pointerId, point);
    if (pointers.current.size === 2 && pinchStart.current) {
      const scale = clamp(pinchZoom.current * distance() / pinchStart.current, MIN_ZOOM, MAX_ZOOM);
      setZoom(scale);
      setPan((current) => constrainPan(current, scale));
    } else if (zoom > 1 && dragStart.current) {
      setPan(constrainPan({
        x: panStart.current.x + point.x - dragStart.current.x,
        y: panStart.current.y + point.y - dragStart.current.y,
      }, zoom));
    }
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const end = pointers.current.get(event.pointerId);
    pointers.current.delete(event.pointerId);
    if (zoom === 1 && end && swipeStart.current) {
      const dx = end.x - swipeStart.current.x;
      const dy = end.y - swipeStart.current.y;
      if (Math.abs(dx) > 54 && Math.abs(dx) > Math.abs(dy) * 1.2)
        goToPage(currentIndex + (dx < 0 ? 1 : -1));
    }
    if (pointers.current.size < 2) pinchStart.current = null;
    dragStart.current = null;
    swipeStart.current = null;
  };

  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    changeZoom(zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
  };

  if (!mounted || !open || !currentPage?.src || !total) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className={`${isFullscreen ? "isFullscreen " : ""}fixed inset-0 z-[100] flex h-[100dvh] w-screen items-stretch justify-center bg-[#080707] text-white md:items-center md:bg-black/80 md:px-5 md:py-5`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu Take Away"
      data-menu-source={source}
    >
      <div className={`grid h-[100dvh] w-screen grid-rows-[auto_minmax(0,1fr)_auto_auto] overflow-hidden bg-[#100d0c] ${isFullscreen ? "" : "md:h-[92vh] md:max-w-[1180px] md:rounded-lg"}`}>
        <header className="z-10 flex items-center justify-between gap-3 border-b border-white/10 px-3 pb-3 pt-[calc(10px+env(safe-area-inset-top))] md:px-5 md:py-3">
          <div className="min-w-0">
            <h2 className="text-sm font-black md:text-lg">Menu Take Away</h2>
            <p className="mt-0.5 text-xs font-bold text-[#d8b66e] md:text-sm">Página {currentIndex + 1} de {total}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" className="hidden min-h-10 rounded-full border border-white/20 px-4 text-sm font-black hover:border-white/50 md:block" onClick={() => void toggleFullscreen()} aria-label={isFullscreen ? "Sair do ecrã inteiro" : "Ativar ecrã inteiro"}>{isFullscreen ? "Sair do ecrã inteiro" : "Ecrã inteiro"}</button>
            <button ref={closeRef} type="button" className="min-h-10 rounded-full bg-white px-4 text-sm font-black text-neutral-950" onClick={() => void closeViewer()} aria-label="Fechar menu completo">Fechar</button>
          </div>
        </header>

        <div className="grid min-h-0 overflow-hidden md:grid-cols-[minmax(0,1fr)_176px] md:gap-3 md:p-3 lg:grid-cols-[minmax(0,1fr)_204px]">
          <div
            ref={stageRef}
            className={`relative flex min-h-0 select-none items-center justify-center overflow-hidden bg-[#070606] md:rounded-lg ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
            style={{ touchAction: "none" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onWheel={onWheel}
            onDoubleClick={() => changeZoom(zoom > 1 ? 1 : 2)}
            aria-label="Imagem do menu com zoom e deslocamento"
          >
            <img
              key={currentPage.id}
              src={currentPage.src}
              alt={currentPage.alt}
              title={currentPage.title}
              draggable={false}
              className="pointer-events-none h-full w-full select-none object-contain"
              style={{ transform: `translate3d(${pan.x}px,${pan.y}px,0) scale(${zoom})`, transformOrigin: "center" }}
            />
          </div>

          <aside className="koi-menu-scroll hidden min-h-0 grid-cols-2 content-start gap-2 overflow-y-auto pr-1 md:grid">
            {pages.map((page, index) => (
              <button
                key={page.id}
                type="button"
                className={`h-[96px] overflow-hidden rounded bg-white p-1 ${index === currentIndex ? "ring-2 ring-[#c9a45c]" : "opacity-55 hover:opacity-90"}`}
                onClick={() => goToPage(index)}
                aria-label={`Abrir ${page.title}`}
                aria-current={index === currentIndex ? "page" : undefined}
              >
                <img src={page.src} alt="" aria-hidden="true" title={page.title} className="h-full w-full object-contain" />
              </button>
            ))}
          </aside>
        </div>

        <div className="koi-menu-scroll flex shrink-0 gap-2 overflow-x-auto border-t border-white/10 px-3 py-2 md:hidden">
          {pages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              className={`h-[54px] w-[40px] shrink-0 overflow-hidden rounded bg-white p-0.5 ${index === currentIndex ? "ring-2 ring-[#c9a45c]" : "opacity-55"}`}
              onClick={() => goToPage(index)}
              aria-label={`Abrir ${page.title}`}
              aria-current={index === currentIndex ? "page" : undefined}
            >
              <img src={page.src} alt="" aria-hidden="true" title={page.title} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>

        <footer className="shrink-0 border-t border-white/10 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2 md:px-5 md:py-3">
          <div className="grid grid-cols-[1fr_1.45fr_1fr] gap-2">
            <button type="button" className="min-h-10 rounded-full border border-white/20 px-2 text-xs font-black md:text-sm" onClick={() => goToPage(currentIndex - 1)} aria-label="Ver página anterior do menu">Anterior</button>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex min-h-10 items-center justify-center rounded-full bg-[var(--chambar-red)] px-2 text-center text-xs font-black md:text-sm">Pedir pelo WhatsApp</a>
            <button type="button" className="min-h-10 rounded-full border border-white/20 px-2 text-xs font-black md:text-sm" onClick={() => goToPage(currentIndex + 1)} aria-label="Ver página seguinte do menu">Seguinte</button>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2" aria-label="Controlos de zoom">
            <button type="button" className="h-9 min-w-11 rounded-full border border-white/20 text-lg font-black disabled:opacity-35" onClick={() => changeZoom(zoom - ZOOM_STEP)} disabled={zoom <= MIN_ZOOM} aria-label="Diminuir zoom">−</button>
            <span className="w-14 text-center text-xs font-black tabular-nums" aria-live="polite">{Math.round(zoom * 100)}%</span>
            <button type="button" className="h-9 min-w-11 rounded-full border border-white/20 text-lg font-black disabled:opacity-35" onClick={() => changeZoom(zoom + ZOOM_STEP)} disabled={zoom >= MAX_ZOOM} aria-label="Aumentar zoom">+</button>
            <button type="button" className="h-9 rounded-full border border-white/20 px-4 text-xs font-black disabled:opacity-35" onClick={resetTransform} disabled={zoom === 1 && pan.x === 0 && pan.y === 0} aria-label="Repor zoom e posição">Repor</button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
