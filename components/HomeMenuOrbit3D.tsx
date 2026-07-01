"use client";

import { type PointerEvent, useEffect, useRef, useState } from "react";
import type { KoiMenuPage } from "@/data/koi-menu-pages";

type Props = {
  pages: KoiMenuPage[];
  onPageClick: (index: number) => void;
  onActiveIndexChange?: (index: number) => void;
};

const AUTO_ROTATE_SPEED = 0.004;
const wrap = (index: number, length: number) => ((index % length) + length) % length;
const normalizeAngle = (angle: number) => ((angle + 180) % 360 + 360) % 360 - 180;

export function HomeMenuOrbit3D({ pages, onPageClick, onActiveIndexChange }: Props) {
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [mobile, setMobile] = useState(false);
  const frame = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerId = useRef<number | null>(null);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const moved = useRef(false);
  const reducedMotion = useRef(false);
  const count = pages.length;
  const itemAngle = count ? 360 / count : 0;
  const activeIndex = count ? wrap(Math.round(-rotation / itemAngle), count) : 0;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMobile(media.matches);
      reducedMotion.current = motion.matches;
    };
    update();
    media.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => onActiveIndexChange?.(activeIndex), [activeIndex, onActiveIndexChange]);

  useEffect(() => {
    if (paused || dragging || reducedMotion.current || count < 2) return;
    const tick = (time: number) => {
      const delta = lastTime.current === null ? 0 : Math.min(32, time - lastTime.current);
      lastTime.current = time;
      setRotation((value) => value - delta * AUTO_ROTATE_SPEED);
      frame.current = requestAnimationFrame(tick);
    };
    lastTime.current = null;
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [count, dragging, paused]);

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const pause = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const resumeSoon = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 1000);
  };

  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerId.current = event.pointerId;
    startX.current = event.clientX;
    startRotation.current = rotation;
    moved.current = false;
    setDragging(true);
    pause();
  };

  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) return;
    const delta = event.clientX - startX.current;
    if (Math.abs(delta) > 6 && !moved.current) {
      moved.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setRotation(startRotation.current + delta * (mobile ? 0.18 : 0.13));
  };

  const pointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== event.pointerId) return;
    pointerId.current = null;
    setDragging(false);
    resumeSoon();
    if (moved.current) window.setTimeout(() => { moved.current = false; }, 160);
  };

  if (!count) return null;
  const radius = mobile ? 250 : 420;

  return (
    <div
      className="relative mx-auto h-[430px] w-full max-w-[1180px] touch-pan-y overflow-hidden md:h-[590px]"
      style={{ perspective: mobile ? "1200px" : "1800px", perspectiveOrigin: "50% 48%" }}
      role="region"
      aria-label="Menu Take Away em roda 3D"
      onPointerEnter={pause}
      onPointerLeave={resumeSoon}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerEnd}
      onPointerCancel={pointerEnd}
    >
      <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d", transform: `rotateY(${rotation}deg)` }}>
        {pages.map((page, index) => {
          const angle = normalizeAngle(index * itemAngle + rotation);
          const distance = Math.abs(angle);
          const active = index === activeIndex;
          const visible = active || distance <= itemAngle * 1.55;
          return (
            <button
              key={page.id}
              type="button"
              className="absolute left-1/2 top-1/2 block overflow-hidden border-0 bg-transparent p-0 outline-none focus-visible:ring-4 focus-visible:ring-[#9f1623]/60"
              style={{
                width: mobile ? "210px" : "280px",
                height: mobile ? "315px" : "420px",
                marginLeft: mobile ? "-105px" : "-140px",
                marginTop: mobile ? "-157.5px" : "-210px",
                transform: `rotateY(${index * itemAngle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
                opacity: active ? 1 : visible ? 0.12 : 0,
                visibility: visible ? "visible" : "hidden",
                pointerEvents: "none",
                zIndex: active ? 100 : 1,
              }}
              aria-label={`Abrir ${page.title}`}
              aria-hidden="true"
              tabIndex={-1}
            >
              <img src={page.src} alt={page.alt} draggable={false} className="h-full w-full select-none object-contain" loading={active ? "eager" : "lazy"} />
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="pointer-events-auto absolute left-1/2 top-1/2 z-[120] -translate-x-1/2 -translate-y-1/2 bg-transparent p-0 outline-none focus-visible:ring-4 focus-visible:ring-[#9f1623]/60"
        style={{ width: mobile ? "270px" : "370px", height: mobile ? "400px" : "550px" }}
        aria-label={`Abrir ${pages[activeIndex].title}`}
        onClick={() => { if (!moved.current) onPageClick(activeIndex); }}
      />
    </div>
  );
}
