"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type VideoSlot = "desktop" | "mobile";

type VideoStatus = {
  isVideoReady: boolean;
  isVideoPlaying: boolean;
  hasPlaybackFailed: boolean;
};

type ScrollExpandMediaProps = {
  mediaSrc: string;
  mobileMediaSrc?: string;
  posterSrc?: string;
  mobilePosterSrc?: string;
  bgImageSrc: string;
  title: string;
  date: string;
  scrollToExpand: string;
};

export default function ScrollExpandMedia({
  mediaSrc,
  mobileMediaSrc,
  posterSrc,
  mobilePosterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
}: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoStatus, setVideoStatus] = useState<
    Record<VideoSlot, VideoStatus>
  >({
    desktop: {
      isVideoReady: false,
      isVideoPlaying: false,
      hasPlaybackFailed: false,
    },
    mobile: {
      isVideoReady: false,
      isVideoPlaying: false,
      hasPlaybackFailed: false,
    },
  });

  const setSlotStatus = (slot: VideoSlot, status: Partial<VideoStatus>) => {
    setVideoStatus((current) => ({
      ...current,
      [slot]: {
        ...current[slot],
        ...status,
      },
    }));
  };

  const markVideoReady = (slot: VideoSlot) => {
    setSlotStatus(slot, {
      isVideoReady: true,
    });
  };

  const markVideoPlaying = (slot: VideoSlot) => {
    setSlotStatus(slot, {
      isVideoReady: true,
      isVideoPlaying: true,
      hasPlaybackFailed: false,
    });
  };

  const hideVideo = (slot: VideoSlot, hasPlaybackFailed = false) => {
    setSlotStatus(slot, {
      isVideoPlaying: false,
      hasPlaybackFailed,
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setReducedMotion(reducedQuery.matches);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
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
    const videos: Array<[HTMLVideoElement | null, VideoSlot]> = [
      [desktopVideoRef.current, "desktop"],
      [mobileVideoRef.current, "mobile"],
    ];

    videos.forEach(([video, slot]) => {
      if (!video) return;

      if (isVisible && !reducedMotion) {
        void video.play().catch(() => hideVideo(slot, true));
      } else {
        video.pause();
        hideVideo(slot);
      }
    });
  }, [isVisible, reducedMotion]);

  const desktopPoster = posterSrc ?? bgImageSrc;
  const mobilePoster = mobilePosterSrc ?? desktopPoster;
  const mobileVideoSrc = mobileMediaSrc ?? mediaSrc;
  const shouldShowDesktopVideo =
    videoStatus.desktop.isVideoReady &&
    videoStatus.desktop.isVideoPlaying &&
    !videoStatus.desktop.hasPlaybackFailed;
  const shouldShowMobileVideo =
    videoStatus.mobile.isVideoReady &&
    videoStatus.mobile.isVideoPlaying &&
    !videoStatus.mobile.hasPlaybackFailed;

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f7f2ec] px-4 pb-4 pt-10 md:px-0 md:pb-10 md:pt-14"
      aria-label={title}
    >
      <div className="container-page">
        <div
          className={`relative isolate overflow-hidden rounded-[24px] border border-black/10 bg-neutral-950 shadow-[0_24px_70px_rgba(16,16,16,0.12)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:rounded-lg ${
            isVisible || reducedMotion
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-5 scale-[0.985] opacity-0"
          }`}
        >
          <Image
            src={bgImageSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[54%_50%] opacity-80"
            priority={false}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.54),rgba(0,0,0,0.32)_48%,rgba(0,0,0,0.12))]" />

          <div className="relative z-10 grid gap-5 p-5 md:grid-cols-[1fr_390px] md:items-center md:gap-6 md:p-8 lg:grid-cols-[1fr_430px] lg:p-10">
            <div className="text-white">
              <p className="text-xs font-black uppercase text-white/76">
                {date}
              </p>
              <h2 className="mt-3 max-w-lg text-3xl font-black leading-[1.02] md:text-5xl">
                {title}
              </h2>
              <p className="mt-4 max-w-md text-base font-bold leading-7 text-white/76 md:text-lg">
                {scrollToExpand}
              </p>
            </div>

            <div className="relative hidden aspect-[9/16] w-full max-w-[338px] justify-self-end overflow-hidden rounded-[26px] bg-neutral-950 shadow-[0_28px_75px_rgba(0,0,0,0.24)] md:block">
              <Image
                src={desktopPoster}
                alt=""
                fill
                sizes="338px"
                className="scale-[1.03] object-cover object-center"
              />
              <video
                key={mediaSrc}
                ref={desktopVideoRef}
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 h-full w-full scale-[1.03] object-cover object-center transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  shouldShowDesktopVideo ? "opacity-100" : "opacity-0"
                }`}
                controls={false}
                disablePictureInPicture
                onLoadedData={() => markVideoReady("desktop")}
                onCanPlay={() => markVideoReady("desktop")}
                onPlaying={() => markVideoPlaying("desktop")}
                onPause={() => hideVideo("desktop")}
                onError={() => hideVideo("desktop", true)}
              >
                <source src={mediaSrc} type="video/mp4" />
              </video>
            </div>

            <div className="relative mx-auto aspect-[9/16] w-full max-w-[240px] overflow-hidden rounded-[24px] bg-neutral-950 shadow-[0_18px_46px_rgba(0,0,0,0.2)] md:hidden">
              <Image
                src={mobilePoster}
                alt=""
                fill
                sizes="270px"
                className="scale-[1.03] object-cover object-center"
              />
              <video
                key={mobileVideoSrc}
                ref={mobileVideoRef}
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 h-full w-full scale-[1.03] object-cover object-center transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  shouldShowMobileVideo ? "opacity-100" : "opacity-0"
                }`}
                controls={false}
                disablePictureInPicture
                onLoadedData={() => markVideoReady("mobile")}
                onCanPlay={() => markVideoReady("mobile")}
                onPlaying={() => markVideoPlaying("mobile")}
                onPause={() => hideVideo("mobile")}
                onError={() => hideVideo("mobile", true)}
              >
                <source src={mobileVideoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
