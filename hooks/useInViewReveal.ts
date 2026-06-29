"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewRevealOptions = {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
};

export function useInViewReveal({
  threshold = 0.25,
  once = true,
  rootMargin = "0px 0px -8% 0px",
}: UseInViewRevealOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, isInView };
}
