"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/50 pointer-events-none z-50 flex items-center justify-center mix-blend-screen"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(34, 211, 238, 0.1)" : "rgba(34, 211, 238, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 20 }}
      >
        <motion.div
          className="w-1 h-1 bg-cyan-300 rounded-full"
          animate={{
            scale: isHovered ? 0 : 1,
          }}
        />
      </motion.div>
    </>
  );
}
