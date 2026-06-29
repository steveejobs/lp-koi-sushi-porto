"use client";

import { useEffect, useRef } from "react";

type ViewportVideoProps = {
  src: string;
  mobileSrc?: string;
  poster?: string;
  label: string;
  className?: string;
  decorative?: boolean;
};

export function ViewportVideo({
  src,
  mobileSrc,
  poster,
  label,
  className,
  decorative = false,
}: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const updatePlayback = () => {
      if (reducedMotion.matches || !isVisible) {
        video.pause();
        return;
      }

      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        updatePlayback();
      },
      { rootMargin: "120px 0px", threshold: 0.18 },
    );

    observer.observe(video);
    reducedMotion.addEventListener("change", updatePlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : label}
      title={decorative ? undefined : label}
    >
      {mobileSrc ? (
        <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />
      ) : null}
      <source src={src} type="video/mp4" />
    </video>
  );
}
