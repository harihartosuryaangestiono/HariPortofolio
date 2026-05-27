"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/*
 * IPhoneMockup — iOS 26 / iPhone 16 Pro cinematic frame
 *
 * Props:
 *   videoSrc   — URL of the video to embed in the screen
 *   imageSrc   — fallback image if no video
 *   accent     — CSS rgb string e.g. "129,140,248" for glow color
 *   className  — extra wrapper classes
 */
interface IPhoneMockupProps {
  videoSrc?: string;
  imageSrc?: string;
  accent?: string;
  className?: string;
}

export function IPhoneMockup({
  videoSrc,
  imageSrc,
  accent = "129,140,248",
  className = "",
}: IPhoneMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);

  // ── Mouse-reactive 3-D tilt ─────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.6 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  // Ensure video plays (some browsers block autoPlay programmatically)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {/* silently ignore AbortError */});
    return () => { video.pause(); };
  }, [videoSrc]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center ${className}`}
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/*
       * Floating wrapper — Framer-motion idle float + 3-D tilt
       */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
        className="relative"
      >
        {/* ── Ambient ground shadow ────────────────────────── */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[65%] h-6 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, rgba(${accent},0.35) 0%, transparent 75%)`,
            filter: "blur(12px)",
            transform: "translateX(-50%) scaleY(0.4)",
          }}
        />

        {/* ── Outer frame glow (atmospheric) ───────────────── */}
        <motion.div
          className="absolute -inset-3 rounded-[52px] pointer-events-none"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(${accent},0.18) 0%, transparent 70%)`,
            filter: "blur(24px)",
          }}
        />

        {/* ══════════════════════════════════════════════════
            DEVICE OUTER SHELL — titanium-finish frame
            ══════════════════════════════════════════════════ */}
        <div
          className="relative"
          style={{
            width: "280px",
            /* iPhone 15 Pro aspect ≈ 393×852 logical px → ~1:2.17 */
            height: "568px",
            borderRadius: "52px",
            /* Titanium multi-stop gradient */
            background: `
              linear-gradient(
                165deg,
                #8a8a9a 0%,
                #5a5a6e 18%,
                #3a3a4a 35%,
                #2c2c3c 50%,
                #3e3e52 68%,
                #6a6a80 82%,
                #9090a8 100%
              )
            `,
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.12),
              0 30px 80px rgba(0,0,0,0.7),
              0 8px 24px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.22),
              inset 0 -1px 0 rgba(0,0,0,0.4),
              0 0 60px rgba(${accent},0.12)
            `,
          }}
        >
          {/* ── Side buttons — LEFT ─────────────────────────── */}
          {/* Mute switch */}
          <div
            className="absolute"
            style={{
              left: "-3px",
              top: "120px",
              width: "3px",
              height: "32px",
              borderRadius: "2px 0 0 2px",
              background: "linear-gradient(180deg,#666,#444,#666)",
              boxShadow: "-2px 0 4px rgba(0,0,0,0.5)",
            }}
          />
          {/* Volume Up */}
          <div
            className="absolute"
            style={{
              left: "-3px",
              top: "175px",
              width: "3px",
              height: "52px",
              borderRadius: "2px 0 0 2px",
              background: "linear-gradient(180deg,#666,#444,#666)",
              boxShadow: "-2px 0 4px rgba(0,0,0,0.5)",
            }}
          />
          {/* Volume Down */}
          <div
            className="absolute"
            style={{
              left: "-3px",
              top: "240px",
              width: "3px",
              height: "52px",
              borderRadius: "2px 0 0 2px",
              background: "linear-gradient(180deg,#666,#444,#666)",
              boxShadow: "-2px 0 4px rgba(0,0,0,0.5)",
            }}
          />

          {/* ── Side button — RIGHT (power) ─────────────────── */}
          <div
            className="absolute"
            style={{
              right: "-3px",
              top: "190px",
              width: "3px",
              height: "72px",
              borderRadius: "0 2px 2px 0",
              background: "linear-gradient(180deg,#666,#444,#666)",
              boxShadow: "2px 0 4px rgba(0,0,0,0.5)",
            }}
          />

          {/* ══════════════════════════════════════════════
              INNER BEZEL — inset frame
              ══════════════════════════════════════════════ */}
          <div
            className="absolute"
            style={{
              inset: "8px",
              borderRadius: "46px",
              background: "#0a0a0f",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 2px 6px rgba(0,0,0,0.8)",
            }}
          >
            {/* ══════════════════════════════════════════
                SCREEN AREA — video/image fills here
                ══════════════════════════════════════════ */}
            <div
              className="absolute overflow-hidden"
              style={{
                inset: "3px",
                borderRadius: "44px",
                background: "#000",
              }}
            >
              {/* ── Content (video or image) ──────────── */}
              {videoSrc ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius: "44px" }}
                />
              ) : imageSrc ? (
                <img
                  src={imageSrc}
                  alt="App preview"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius: "44px" }}
                />
              ) : (
                /* Placeholder when no media provided */
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(ellipse at 50% 40%, rgba(${accent},0.15), #050508)`,
                  }}
                >
                  <div className="text-center space-y-2 opacity-40">
                    <div
                      className="w-8 h-8 rounded-xl mx-auto"
                      style={{ background: `rgba(${accent},0.3)` }}
                    />
                    <p className="text-[9px] font-mono text-white/40 tracking-widest uppercase">
                      No video
                    </p>
                  </div>
                </div>
              )}

              {/* ── Screen edge vignette ─────────────── */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "44px",
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.55)",
                }}
              />

              {/* ── Screen reflection sweep ──────────── */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "44px",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.01) 40%, transparent 60%)",
                }}
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ── Dynamic Island ───────────────────── */}
              <div
                className="absolute top-[14px] left-1/2 -translate-x-1/2 z-20"
                style={{
                  width: "104px",
                  height: "30px",
                  borderRadius: "20px",
                  background: "#000",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Front camera dot */}
                <div
                  className="absolute right-[18px] top-1/2 -translate-y-1/2"
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(40,60,80,0.9) 30%, #111 70%)",
                    boxShadow: "0 0 0 1.5px rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Camera lens gleam */}
                  <div
                    className="absolute top-[2px] left-[2px] rounded-full"
                    style={{
                      width: "4px",
                      height: "4px",
                      background:
                        "radial-gradient(circle, rgba(160,200,255,0.5), transparent)",
                    }}
                  />
                </div>
              </div>

              {/* ── Status bar ───────────────────────── */}
              <div
                className="absolute top-[52px] left-0 right-0 flex items-center justify-between px-7 z-10 pointer-events-none"
              >
                <span
                  className="text-[9px] font-semibold text-white/70"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  9:41
                </span>
                <div className="flex items-center gap-1.5">
                  {/* Signal bars */}
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                    <rect x="0"  y="6" width="2.5" height="4" rx="0.5" fill="white" fillOpacity="0.7"/>
                    <rect x="4"  y="4" width="2.5" height="6" rx="0.5" fill="white" fillOpacity="0.7"/>
                    <rect x="8"  y="2" width="2.5" height="8" rx="0.5" fill="white" fillOpacity="0.7"/>
                    <rect x="12" y="0" width="2.5" height="10" rx="0.5" fill="white" fillOpacity="0.7"/>
                  </svg>
                  {/* Battery */}
                  <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                    <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="white" strokeOpacity="0.5"/>
                    <rect x="2" y="2" width="12" height="7" rx="1.5" fill="white" fillOpacity="0.8"/>
                    <path d="M19.5 3.5v4a1.5 1.5 0 000-4z" fill="white" fillOpacity="0.5"/>
                  </svg>
                </div>
              </div>

              {/* ── Home indicator ────────────────────── */}
              <div
                className="absolute bottom-[10px] left-1/2 -translate-x-1/2 rounded-full z-10"
                style={{
                  width: "120px",
                  height: "4px",
                  background: "rgba(255,255,255,0.35)",
                  boxShadow: "0 0 8px rgba(255,255,255,0.1)",
                }}
              />
            </div>
          </div>

          {/* ── Outer frame glass highlight ──────────────────── */}
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(255,255,255,0.04) 100%)",
            }}
          />

          {/* ── Outer edge specular rim ───────────────────────── */}
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.5)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
