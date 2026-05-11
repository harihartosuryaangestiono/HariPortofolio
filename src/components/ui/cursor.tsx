"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "framer-motion";

const DOT_SIZE = 6;
const RING_SIZE = 36;
const RING_SIZE_HOVER = 52;

const RING_SPRING: SpringOptions = {
  damping: 22,
  stiffness: 380,
  mass: 0.6,
};

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  // Raw mouse position — updated without re-renders
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Ring lags behind with a spring
  const ringX = useSpring(rawX, RING_SPRING);
  const ringY = useSpring(rawY, RING_SPRING);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(
        !!(
          t.tagName === "BUTTON" ||
          t.tagName === "A" ||
          t.closest("button") ||
          t.closest("a")
        )
      );
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY, visible]);

  const ringSize = hovered ? RING_SIZE_HOVER : RING_SIZE;

  return (
    <>
      {/* Hide system cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* ── Ring — outer div tracks position, inner div handles visuals ── */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ position: "fixed", top: 0, left: 0 }}
      >
        {/* Position layer — moves with spring */}
        <motion.div style={{ x: ringX, y: ringY }}>
          {/* Visual layer — centered at the position point */}
          <motion.div
            className="rounded-full"
            style={{
              translateX: "-50%",
              translateY: "-50%",
              border: "1px solid rgba(34,211,238,0.55)",
            }}
            animate={{
              width: ringSize,
              height: ringSize,
              opacity: visible ? 1 : 0,
              borderColor: hovered
                ? "rgba(34,211,238,0.9)"
                : "rgba(34,211,238,0.55)",
              backgroundColor: hovered
                ? "rgba(34,211,238,0.07)"
                : "rgba(34,211,238,0)",
              scale: clicked ? 0.82 : 1,
              boxShadow: hovered
                ? "0 0 14px rgba(34,211,238,0.25), inset 0 0 8px rgba(34,211,238,0.08)"
                : "0 0 6px rgba(34,211,238,0.12)",
            }}
            transition={{
              width: { type: "spring", stiffness: 300, damping: 22 },
              height: { type: "spring", stiffness: 300, damping: 22 },
              opacity: { duration: 0.2 },
              borderColor: { duration: 0.2 },
              backgroundColor: { duration: 0.2 },
              boxShadow: { duration: 0.25 },
              scale: { type: "spring", stiffness: 600, damping: 18 },
            }}
          />
        </motion.div>
      </div>

      {/* ── Dot — snaps instantly to cursor ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: rawX,
          y: rawY,
          translateX: `-${DOT_SIZE / 2}px`,
          translateY: `-${DOT_SIZE / 2}px`,
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: "rgb(34,211,238)",
          boxShadow: "0 0 8px rgba(34,211,238,0.8)",
        }}
        animate={{
          opacity: visible ? (hovered ? 0 : 1) : 0,
          scale: clicked ? 0.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: "spring", stiffness: 700, damping: 18 },
        }}
      />
    </>
  );
}
