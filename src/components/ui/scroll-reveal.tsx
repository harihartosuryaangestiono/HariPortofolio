"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./scroll-reveal.css";

interface ScrollRevealProps {
  children: string;
  className?: string;
  splitType?: "words" | "chars";
  blurStrength?: number;
  baseRotation?: number;
  baseOpacity?: number;
  enableBlur?: boolean;
  duration?: number;
  stagger?: number;
  triggerStart?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  splitType = "words",
  blurStrength = 5,
  baseRotation = 2,
  baseOpacity = 0.2,
  enableBlur = true,
  duration = 1.2,
  stagger = 0.06,
  triggerStart = "top 85%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const segments = useMemo(() => {
    if (splitType === "words") return children.split(/\s+/).filter(Boolean);
    return children.split("").filter(Boolean);
  }, [children, splitType]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".sr-unit");
      if (!elements?.length) return;

      gsap.fromTo(
        elements,
        {
          opacity: baseOpacity,
          y: 16,
          rotation: baseRotation,
          filter: enableBlur ? `blur(${blurStrength}px)` : "none",
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          filter: "blur(0px)",
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [blurStrength, baseRotation, baseOpacity, enableBlur, duration, stagger, triggerStart]);

  return (
    <span
      ref={containerRef}
      className={`sr-container ${className}`}
      aria-label={children}
    >
      {segments.map((segment, i) => (
        <span key={i} className="sr-unit" aria-hidden="true">
          {segment}
          {splitType === "words" && i < segments.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </span>
  );
}
