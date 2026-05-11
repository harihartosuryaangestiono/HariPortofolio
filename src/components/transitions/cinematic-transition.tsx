"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function CinematicTransition({
  children,
  type = "default",
}: {
  children: React.ReactNode;
  type?: "default" | "descent" | "hologram" | "digital-storm" | "dissolve";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !triggerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    switch (type) {
      case "descent":
        // Simulated depth: scales down and fades out, pushing user "deeper"
        tl.fromTo(
          containerRef.current,
          { y: 100, scale: 1.1, opacity: 0, filter: "blur(20px)" },
          { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" }
        ).to(
          containerRef.current,
          { y: -100, scale: 0.9, opacity: 0, filter: "blur(20px)", duration: 1, ease: "power2.in" },
          "+=0.5"
        );
        break;

      case "hologram":
        // Digital assembly effect
        tl.fromTo(
          containerRef.current,
          {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "bottom",
            filter: "hue-rotate(90deg) blur(10px)",
          },
          {
            opacity: 1,
            scaleY: 1,
            filter: "hue-rotate(0deg) blur(0px)",
            duration: 1.5,
            ease: "expo.out",
          }
        );
        break;

      case "digital-storm":
        // Chaotic data stream settling down
        tl.fromTo(
          containerRef.current,
          {
            opacity: 0,
            x: () => gsap.utils.random(-100, 100),
            skewX: 20,
            filter: "brightness(2) contrast(1.5)",
          },
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            filter: "brightness(1) contrast(1)",
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          }
        );
        break;

      case "dissolve":
        // Slow atmospheric fade
        tl.fromTo(
          containerRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 2, ease: "sine.inOut" }
        );
        break;

      default:
        // Subtle environmental shift
        tl.fromTo(
          containerRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
        break;
    }
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="relative w-full h-full flex flex-col">
      <div ref={containerRef} className="w-full h-full transform-gpu will-change-transform flex flex-col">
        {children}
      </div>
    </div>
  );
}
