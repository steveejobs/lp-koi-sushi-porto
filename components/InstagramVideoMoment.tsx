"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type InstagramVideoMomentProps = {
  videoSrc: string;
  posterSrc: string;
};

export function InstagramVideoMoment({
  videoSrc,
  posterSrc,
}: InstagramVideoMomentProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasPlaybackFailed, setHasPlaybackFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setReducedMotion(reducedQuery.matches);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.42 },
    );

    observer.observe(section);
    reducedQuery.addEventListener("change", syncReducedMotion);
    syncReducedMotion();

    return () => {
      observer.disconnect();
      reducedQuery.removeEventListener("change", syncReducedMotion);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible && !reducedMotion) {
      void video.play().catch(() => {
        setIsVideoPlaying(false);
        setHasPlaybackFailed(true);
      });
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  }, [isVisible, reducedMotion]);

  const shouldShowVideo = isVideoReady && isVideoPlaying && !hasPlaybackFailed;

  return (
    <section
      ref={sectionRef}
      className={`ig-video-reveal mt-6 rounded-[26px] border border-black/10 bg-white p-3 shadow-[0_14px_34px_rgba(16,16,16,0.07)] ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="grid grid-cols-[0.82fr_1.18fr] items-center gap-3">
        <div className="px-1">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-[var(--chambar-red)]">
            KOI SUSHI PORTO
          </p>
          <h2 className="mt-2 text-xl font-black leading-[1.04] text-neutral-950">
            Antes do primeiro pedido.
          </h2>
          <p className="mt-2 text-sm font-bold leading-5 text-neutral-600">
            Veja os pratos, confirme o menu e fale connosco pelo WhatsApp.
          </p>
          <div className="mt-4 h-px w-14 bg-[var(--chambar-red)]" />
        </div>
        <div className="relative ml-auto aspect-[9/16] w-full max-w-[192px] overflow-hidden rounded-[24px] bg-neutral-950 shadow-[0_16px_36px_rgba(16,16,16,0.16)]">
          <Image
            src={posterSrc}
            alt=""
            fill
            sizes="192px"
            quality={75}
            loading="lazy"
            decoding="async"
            className="scale-[1.03] object-cover object-center"
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full scale-[1.03] object-cover object-center transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              shouldShowVideo ? "opacity-100" : "opacity-0"
            }`}
            controls={false}
            disablePictureInPicture
            onLoadedData={() => setIsVideoReady(true)}
            onCanPlay={() => setIsVideoReady(true)}
            onPlaying={() => {
              setIsVideoReady(true);
              setIsVideoPlaying(true);
              setHasPlaybackFailed(false);
            }}
            onPause={() => setIsVideoPlaying(false)}
            onError={() => {
              setIsVideoPlaying(false);
              setHasPlaybackFailed(true);
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/24 to-transparent" />
        </div>
      </div>
    </section>
  );
}
