"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInViewReveal } from "@/hooks/useInViewReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.25,
  once = true,
}: RevealProps) {
  const { ref, isInView } = useInViewReveal({ threshold, once });

  return (
    <div
      ref={ref}
      className={`in-view-reveal ${isInView ? "is-visible" : ""} ${className ?? ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as RevealStyle}
    >
      {children}
    </div>
  );
}
