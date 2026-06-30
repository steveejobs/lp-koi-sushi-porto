"use client";

import {
  type HTMLAttributes,
  type KeyboardEvent,
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
  radius?: number;
  autoRotateSpeed?: number;
  onSelect?: (item: GalleryItem) => void;
  onViewItems?: (item: GalleryItem) => void;
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

export function CircularGallery({
  items,
  className,
  radius = 430,
  autoRotateSpeed = 0.035,
  onSelect,
  onViewItems,
  selectLabel = "Escolher",
  viewLabel = "Ver itens",
  ...props
}: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const anglePerItem = useMemo(() => 360 / Math.max(items.length, 1), [items.length]);

  useEffect(() => {
    if (reducedMotion || items.length < 2) return;

    const rotate = () => {
      setRotation((current) => current + autoRotateSpeed);
      animationFrameRef.current = requestAnimationFrame(rotate);
    };

    animationFrameRef.current = requestAnimationFrame(rotate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRotateSpeed, items.length, reducedMotion]);

  const handleKeySelect = (event: KeyboardEvent<HTMLButtonElement>, item: GalleryItem) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.(item);
    }
  };

  return (
    <div
      role="region"
      aria-label="Categorias do menu Take Away"
      className={cn("relative w-full", className)}
      {...props}
    >
      <div className="flex gap-4 overflow-x-auto pb-3 md:hidden">
        {items.map((item) => (
          <article
            key={item.id}
            className="relative min-h-[260px] w-[82vw] max-w-[340px] shrink-0 overflow-hidden rounded-[28px] border border-black/10 bg-neutral-950 shadow-[0_18px_44px_rgba(16,16,16,0.14)]"
          >
            <img
              src={item.image.src}
              alt={item.image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-72"
              style={{ objectPosition: item.image.position ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/28 to-transparent" />
            <div className="relative flex min-h-[260px] flex-col justify-end p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-white/70">
                {item.meta}
              </p>
              <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-white/78">
                {item.description}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-sm font-black text-neutral-950"
                  aria-label={`Escolher categoria ${item.title}`}
                  onClick={() => onSelect?.(item)}
                  onKeyDown={(event) => handleKeySelect(event, item)}
                >
                  {selectLabel}
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/45 px-4 py-2 text-sm font-black text-white"
                  onClick={() => onViewItems?.(item)}
                >
                  {viewLabel}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="relative hidden h-[520px] items-center justify-center overflow-hidden rounded-[34px] border border-black/10 bg-[radial-gradient(circle_at_center,rgba(196,30,47,0.14),transparent_38%),#130f0f] md:flex"
        style={{ perspective: "1600px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${reducedMotion ? 0 : rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, index) => {
            const angle = index * anglePerItem;
            const relative = (angle + rotation + 360) % 360;
            const normalized = Math.abs(relative > 180 ? 360 - relative : relative);
            const opacity = reducedMotion ? 1 : Math.max(0.35, 1 - normalized / 210);

            return (
              <article
                key={item.id}
                className="absolute left-1/2 top-1/2 h-[350px] w-[255px] overflow-hidden rounded-[26px] border border-white/15 bg-neutral-950 shadow-[0_28px_70px_rgba(0,0,0,0.36)]"
                style={{
                  marginLeft: "-127.5px",
                  marginTop: "-175px",
                  opacity,
                  transform: reducedMotion
                    ? `translateX(${(index - (items.length - 1) / 2) * 84}px) translateZ(0) scale(0.92)`
                    : `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: item.image.position ?? "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-5 text-white">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/68">
                    {item.meta}
                  </p>
                  <h3 className="mt-2 text-2xl font-black leading-tight">{item.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm font-bold leading-6 text-white/76">
                    {item.description}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="rounded-full bg-white px-3 py-2 text-sm font-black text-neutral-950 transition hover:bg-[#fff4ec]"
                      aria-label={`Escolher categoria ${item.title}`}
                      onClick={() => onSelect?.(item)}
                      onKeyDown={(event) => handleKeySelect(event, item)}
                    >
                      {selectLabel}
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-white/35 px-3 py-2 text-sm font-black text-white transition hover:border-white"
                      onClick={() => onViewItems?.(item)}
                    >
                      {viewLabel}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
