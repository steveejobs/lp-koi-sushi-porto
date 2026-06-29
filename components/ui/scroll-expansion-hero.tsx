"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ScrollExpandMediaProps = {
  mediaSrc: string;
  mobileMediaSrc?: string;
  bgImageSrc: string;
  title: string;
  date: string;
  scrollToExpand: string;
};

export default function ScrollExpandMedia({
  mediaSrc,
  mobileMediaSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
}: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const displayImage = mobileMediaSrc ?? mediaSrc;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f7f2ec] px-4 pb-4 pt-10 md:px-0 md:pb-10 md:pt-14"
      aria-label={title}
    >
      <div className="container-page">
        <div
          className={`relative isolate overflow-hidden rounded-[24px] border border-black/10 bg-neutral-950 shadow-[0_24px_70px_rgba(16,16,16,0.12)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:rounded-lg ${
            isVisible
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
                src={mediaSrc}
                alt=""
                fill
                sizes="338px"
                loading="lazy"
                className="scale-[1.03] object-cover object-center"
              />
            </div>

            <div className="relative mx-auto aspect-[9/16] w-full max-w-[240px] overflow-hidden rounded-[24px] bg-neutral-950 shadow-[0_18px_46px_rgba(0,0,0,0.2)] md:hidden">
              <Image
                src={displayImage}
                alt=""
                fill
                sizes="270px"
                loading="lazy"
                className="scale-[1.03] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
