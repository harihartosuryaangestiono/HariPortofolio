"use client";

import { ReactNode, useEffect, useRef, createContext, useContext, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ─── Context ──────────────────────────────────────────────────
interface LenisContextValue {
  pause: () => void;
  /** Resume and optionally restore scroll position (in px) */
  resume: (restoreY?: number) => void;
  /** Get current scroll position */
  getScrollY: () => number;
}

const LenisContext = createContext<LenisContextValue>({
  pause: () => {},
  resume: () => {},
  getScrollY: () => 0,
});

export function useLenis() {
  return useContext(LenisContext);
}

// ─── Provider ─────────────────────────────────────────────────
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  const pause = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const resume = useCallback((restoreY?: number) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.start();
    // If a saved position is provided, jump there instantly (no animation)
    if (restoreY !== undefined) {
      lenis.scrollTo(restoreY, { immediate: true, force: true });
    }
  }, []);

  const getScrollY = useCallback(() => {
    return lenisRef.current?.scroll ?? window.scrollY;
  }, []);

  return (
    <LenisContext.Provider value={{ pause, resume, getScrollY }}>
      {children}
    </LenisContext.Provider>
  );
}
