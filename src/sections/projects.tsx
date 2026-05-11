"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PROJECTS, type Project } from "@/lib/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, X } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { CardContainer, CardItem } from "@/components/ui/3d-card";

// ─────────────────────────────────────────────────────────────
// Theme map — accent per project
// ─────────────────────────────────────────────────────────────
type Theme = {
  text: string;
  border: string;
  dot: string;
  glowColor: string;
  bg: string;
  bgColor: string;
  ctaBg: string;
};

const THEMES: Record<string, Theme> = {
  terangi: {
    text: "text-sky-400",
    border: "border-sky-400/25",
    dot: "bg-sky-400",
    glowColor: "rgba(56,189,248,0.12)",
    bg: "bg-[#010e1c]",
    bgColor: "#010e1c",
    ctaBg: "bg-sky-400/10 hover:bg-sky-400/20 border-sky-400/40 text-sky-300",
  },
  "sop-verification": {
    text: "text-indigo-400",
    border: "border-indigo-400/25",
    dot: "bg-indigo-400",
    glowColor: "rgba(129,140,248,0.12)",
    bg: "bg-[#06061a]",
    bgColor: "#06061a",
    ctaBg: "bg-indigo-400/10 hover:bg-indigo-400/20 border-indigo-400/40 text-indigo-300",
  },
  "unpar-scraper": {
    text: "text-teal-400",
    border: "border-teal-400/25",
    dot: "bg-teal-400",
    glowColor: "rgba(45,212,191,0.13)",
    bg: "bg-[#010c15]",
    bgColor: "#010c15",
    ctaBg: "bg-teal-400/10 hover:bg-teal-400/20 border-teal-400/40 text-teal-300",
  },
  "plywood-trading": {
    text: "text-emerald-400",
    border: "border-emerald-400/25",
    dot: "bg-emerald-400",
    glowColor: "rgba(52,211,153,0.12)",
    bg: "bg-[#01120b]",
    bgColor: "#01120b",
    ctaBg: "bg-emerald-400/10 hover:bg-emerald-400/20 border-emerald-400/40 text-emerald-300",
  },
};

const DEFAULT_THEME: Theme = {
  text: "text-cyan-400",
  border: "border-cyan-400/25",
  dot: "bg-cyan-400",
  glowColor: "rgba(34,211,238,0.12)",
  bg: "bg-[#020a0f]",
  bgColor: "#020a0f",
  ctaBg: "bg-cyan-400/10 hover:bg-cyan-400/20 border-cyan-400/40 text-cyan-300",
};

// ─────────────────────────────────────────────────────────────
// Inline CSS command-center dashboard for UNPAR Scraper
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// Expanded interactive video modal (renders via portal)
// ─────────────────────────────────────────────────────────────
function ExpandedVideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
    const onTime = () => {
      setCurrentTime(v.currentTime);
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    const onMeta = () => setDuration(v.duration);
    const onEnded = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) { v.play(); setPlaying(true); }
        else { v.pause(); setPlaying(false); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const pct = Number(e.target.value);
    v.currentTime = (pct / 100) * v.duration;
    setProgress(pct);
  };

  const fmt = (t: number) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/88 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.8 }}
        className="relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(45,212,191,0.28)",
          boxShadow: "0 0 90px rgba(45,212,191,0.14), 0 40px 100px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Video area ── */}
        <div className="relative bg-black aspect-video cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-cover"
            playsInline
          />

          {/* Paused play overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
            style={{ opacity: playing ? 0 : 1, pointerEvents: playing ? "none" : "auto" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(45,212,191,0.5)",
                boxShadow: "0 0 30px rgba(45,212,191,0.25)",
              }}
            >
              <Play className="w-7 h-7 text-teal-300 ml-1" />
            </div>
          </div>

          {/* Top HUD */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)" }}
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.28em] text-teal-300 uppercase">
                UNPAR Scraper · Live Demo
              </span>
            </div>
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
              <X className="w-3.5 h-3.5 text-white/55" />
            </button>
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: "#010c15", borderTop: "1px solid rgba(45,212,191,0.12)" }}
        >
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-teal-400/10"
            style={{ border: "1px solid rgba(45,212,191,0.25)" }}
          >
            {playing
              ? <Pause className="w-3.5 h-3.5 text-teal-300" />
              : <Play className="w-3.5 h-3.5 text-teal-300 ml-0.5" />}
          </button>

          {/* Time */}
          <span className="text-[10px] font-mono text-white/30 flex-shrink-0 tabular-nums">
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          {/* Seek bar */}
          <div
            className="relative flex-1 h-1.5 rounded-full cursor-pointer"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%`, background: "rgba(45,212,191,0.75)" }}
            />
            <input
              type="range" min="0" max="100" step="0.1"
              value={progress}
              onChange={seek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Mute */}
          <button
            onClick={toggleMute}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-teal-400/10"
            style={{ border: "1px solid rgba(45,212,191,0.25)" }}
          >
            {muted
              ? <VolumeX className="w-3.5 h-3.5 text-white/40" />
              : <Volume2 className="w-3.5 h-3.5 text-teal-300" />}
          </button>

          {/* ESC hint */}
          <span className="flex-shrink-0 text-[9px] font-mono tracking-[0.22em] text-white/22 ml-1 hidden sm:block">
            ESC
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// UNPAR Scraper — clean video card + expand-to-play modal
// ─────────────────────────────────────────────────────────────
function ScraperShowcase() {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* ── Autoplay muted preview card ── */}
      <div
        className="absolute inset-0 overflow-hidden bg-[#010c15] group/scraper cursor-pointer"
        onClick={() => setExpanded(true)}
      >
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/scraper:scale-[1.04]"
          style={{ opacity: 0.9 }}
        >
          <source src="/projects/unpar-scraper.mp4" type="video/mp4" />
        </video>

        {/* Teal atmospheric bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(45,212,191,0.055) 0%, transparent 65%)" }}
        />
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(45,212,191,0.01) 2px, rgba(45,212,191,0.01) 4px)" }}
        />

        {/* Hover overlay + open button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/scraper:bg-black/28 transition-all duration-400">
          <div className="flex flex-col items-center gap-3 opacity-0 group-hover/scraper:opacity-100 transition-all duration-300 translate-y-3 group-hover/scraper:translate-y-0">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(45,212,191,0.55)",
                boxShadow: "0 0 35px rgba(45,212,191,0.28)",
              }}
            >
              <Play className="w-6 h-6 text-teal-300 ml-0.5" />
            </div>
            <span className="text-[8px] font-mono tracking-[0.38em] text-teal-300 uppercase">Open System</span>
          </div>
        </div>

        {/* HUD top bar */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(1,12,21,0.7), transparent)" }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[7px] font-mono tracking-[0.32em] text-teal-300 uppercase">Live Preview</span>
          </div>
          <span className="text-[7px] font-mono text-teal-400/35 tracking-[0.18em]">UNPAR_SYS v2.1</span>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-teal-400/45 pointer-events-none" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-teal-400/45 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-teal-400/25 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-teal-400/25 pointer-events-none" />
      </div>

      {/* ── Expanded video modal via portal ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {expanded && (
              <ExpandedVideoModal
                src="/projects/unpar-scraper.mp4"
                onClose={() => setExpanded(false)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Single project panel (one full-viewport slide)
// ─────────────────────────────────────────────────────────────
function ProjectPanel({
  project,
  index,
  isActive,
  activeIndex,
  total,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  activeIndex: number;
  total: number;
}) {
  const theme = THEMES[project.slug] ?? DEFAULT_THEME;
  const nameParts = project.name.split("—").map((s) => s.trim());
  const displayTitle = nameParts[0];
  const displaySubtitle = nameParts[1] ?? null;

  return (
    <div
      className={`relative flex-shrink-0 w-[100vw] h-full flex items-center justify-center ${theme.bg} overflow-hidden`}
      aria-hidden={!isActive}
    >
      {/* Background atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${theme.glowColor} 0%, transparent 65%)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Panel content */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14 flex flex-col lg:flex-row items-center gap-14 lg:gap-20"
        style={{
          opacity: isActive ? 1 : 0.3,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* ── 3D Card Image ── */}
        <div className="w-full lg:w-[54%] flex-shrink-0">
          <CardContainer
            containerClassName={`w-full relative aspect-[4/3] rounded-2xl border ${theme.border} bg-black/60 overflow-hidden`}
            className="w-full h-full"
            maxTilt={12}
          >
            <CardItem translateZ={40} className="absolute inset-0">
              {project.videoSrc ? (
                <video
                  src={project.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : project.slug === "unpar-scraper" ? (
                <ScraperShowcase />
              ) : (
                <img
                  src={project.imageSrc}
                  alt={project.name}
                  className={`w-full h-full ${
                    project.imageSrc.endsWith(".png")
                      ? "object-contain"
                      : "object-contain p-8"
                  }`}
                  loading="lazy"
                />
              )}
            </CardItem>

            {/* Holographic overlay layer */}
            <CardItem
              translateZ={20}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${theme.glowColor} 0%, transparent 60%)`,
              }}
            />

            {/* Top edge light */}
            <CardItem
              translateZ={60}
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${theme.glowColor.replace("0.12", "0.6")}, transparent)`,
              }}
            />

            {/* Corner badge */}
            <CardItem
              translateZ={80}
              className={`absolute top-4 right-4 text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border ${theme.border} ${theme.text} bg-black/70`}
            >
              {project.category}
            </CardItem>
          </CardContainer>
        </div>

        {/* ── Content ── */}
        <div className="w-full lg:w-[46%] flex flex-col">
          {/* Index + category */}
          <div className={`flex items-center gap-2.5 mb-6 ${theme.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${theme.dot}`} />
            <span className="text-[10px] font-mono tracking-[0.32em] uppercase opacity-70">
              {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; Selected Work
            </span>
          </div>

          {/* Title */}
          <h3 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tighter text-white leading-[1.05] mb-2">
            {displayTitle}
          </h3>

          {/* Subtitle */}
          {displaySubtitle && (
            <p className={`text-sm font-mono tracking-wide mb-5 ${theme.text} opacity-55`}>
              {displaySubtitle}
            </p>
          )}

          {/* Rule */}
          <div
            className="h-px w-10 mb-6 opacity-35"
            style={{ background: "currentColor" }}
          />

          {/* Description */}
          <p className="text-[0.95rem] text-white/62 leading-relaxed mb-7 max-w-sm">
            {project.description}
          </p>

          {/* Challenge / Outcome */}
          <div className="space-y-4 mb-7">
            {project.problemSolved && (
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.28em] block mb-1">
                  Challenge
                </span>
                <p className="text-sm text-white/55 leading-relaxed">{project.problemSolved}</p>
              </div>
            )}
            {project.impact && (
              <div>
                <span className={`text-[10px] font-mono ${theme.text} uppercase tracking-[0.28em] block mb-1 opacity-65`}>
                  Outcome
                </span>
                <p className="text-sm text-white/78 leading-relaxed font-medium">{project.impact}</p>
              </div>
            )}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full border ${theme.border} text-white/40 bg-white/[0.02] cursor-default`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2.5 text-sm font-mono font-semibold border rounded-full px-5 py-2.5 transition-colors duration-250 w-fit ${theme.ctaBg}`}
            >
              View Project
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          ) : (
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              In Portfolio
            </span>
          )}
        </div>
      </div>

      {/* Progress indicator — shows global active state across all panels */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-500 ${
              i === activeIndex
                ? `h-1.5 w-7 ${theme.dot}`
                : "h-1.5 w-1.5 bg-white/18"
            }`}
          />
        ))}
      </div>
      {/* Slide counter */}
      <div className={`absolute bottom-8 right-8 text-[10px] font-mono tracking-[0.3em] ${theme.text} opacity-40 z-20`}>
        {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ProjectsSection — pinned horizontal scroll
// ─────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const showcaseProjects = PROJECTS.slice(0, 4);
  const NUM = showcaseProjects.length;

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header entrance
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );

    // Horizontal cinematic scroll — pin only the viewport, not the header.
    // Use pixel-based x so the final panel aligns exactly with the viewport.
    gsap.to(containerRef.current, {
      x: () => -(containerRef.current!.offsetWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: showcaseRef.current,
        start: "top top",
        // 160 vh per project gives each scene adequate dwell time
        end: `+=${NUM * 160}vh`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (NUM - 1));
          setActiveIndex(idx);
        },
      },
    });
  });

  return (
    <>
      {/* ── Section header — normal vertical scroll, not pinned ── */}
      <div
        id="projects"
        ref={headerRef}
        className="relative bg-black text-center px-6 pt-24 pb-16 border-b border-white/[0.05] will-change-transform"
      >
        <p className="text-[10px] font-mono tracking-[0.45em] text-white/25 uppercase mb-5">
          003 &nbsp;/&nbsp; Selected Work
        </p>
        <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.0]">
          <ScrollReveal
            blurStrength={5}
            baseRotation={2}
            baseOpacity={0.12}
            stagger={0.09}
            duration={1.1}
            triggerStart="top 84%"
          >
            Built. Shipped. Delivered.
          </ScrollReveal>
        </h2>
        <p className="text-sm text-white/35 mt-5 max-w-sm mx-auto font-light">
          Scroll through the exhibition &mdash; {NUM} real systems built for real problems.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 text-[10px] font-mono text-white/22 uppercase tracking-widest">
          <span className="w-4 h-px bg-white/15" />
          Scroll to explore
          <span className="w-4 h-px bg-white/15" />
        </div>
      </div>

      {/* ── Horizontal cinematic viewport — this element gets pinned ── */}
      <div
        ref={showcaseRef}
        className="relative h-screen overflow-hidden bg-black"
      >
        <div
          ref={containerRef}
          className="absolute inset-0 flex will-change-transform"
          style={{ width: `${NUM * 100}vw` }}
        >
          {showcaseProjects.map((project, idx) => (
            <ProjectPanel
              key={project.slug}
              project={project}
              index={idx}
              isActive={activeIndex === idx}
              activeIndex={activeIndex}
              total={NUM}
            />
          ))}
        </div>
      </div>
    </>
  );
}
