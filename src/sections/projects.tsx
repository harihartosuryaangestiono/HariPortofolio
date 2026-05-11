"use client";

import { useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
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
function ScraperDashboard() {
  const bars = [22, 38, 28, 52, 35, 64, 45, 72, 38, 58, 80, 55, 90, 68, 75];
  return (
    <div className="absolute inset-0 flex flex-col bg-[#020f14] font-mono overflow-hidden select-none">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(45,212,191,0.018) 2px,rgba(45,212,191,0.018) 4px)" }} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-teal-400/15 bg-teal-400/[0.03]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] tracking-[0.32em] uppercase text-teal-300">SCRAPER ENGINE · ACTIVE</span>
        </div>
        <span className="text-[8px] text-teal-400/35 tracking-[0.2em]">UNPAR PUB SYS v2.1</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-0 border-b border-teal-400/10">
        {[
          { val: "1,247", label: "PUBLICATIONS", col: "text-white" },
          { val: "48", label: "LECTURERS", col: "text-teal-300" },
          { val: "12", label: "SOURCES", col: "text-emerald-400" },
        ].map(({ val, label, col }, i) => (
          <div key={label} className={`text-center py-3 ${i < 2 ? "border-r border-teal-400/10" : ""}`}>
            <div className={`text-sm font-bold ${col}`}>{val}</div>
            <div className="text-[7px] text-white/28 tracking-widest mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="flex-1 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[7px] text-teal-400/45 tracking-widest">PUBLICATION VOLUME</span>
          <span className="text-[7px] text-emerald-400/65">▲ 23% THIS MONTH</span>
        </div>
        <div className="flex items-end gap-[2px] h-14">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[1px] transition-all duration-700"
              style={{ height: `${h}%`, background: i >= 12 ? "rgba(45,212,191,0.75)" : "rgba(45,212,191,0.22)" }}
            />
          ))}
        </div>
      </div>

      {/* Data table */}
      <div className="px-4 pb-3">
        <div className="rounded-lg overflow-hidden border border-teal-400/12">
          <div className="grid grid-cols-3 bg-teal-400/[0.06] px-3 py-1.5">
            {["DOSEN", "PUBLIKASI", "STATUS"].map((h) => (
              <span key={h} className="text-[6.5px] text-teal-400/45 tracking-widest">{h}</span>
            ))}
          </div>
          {[
            ["Dr. Ahmad S.", "24 papers", "SYNCED"],
            ["Prof. Santoso", "18 papers", "SYNCED"],
            ["Dr. Lestari", "31 papers", "SYNC..."],
          ].map(([name, count, status]) => (
            <div key={name} className="grid grid-cols-3 px-3 py-1.5 border-t border-teal-400/8">
              <span className="text-[7px] text-white/55">{name}</span>
              <span className="text-[7px] text-teal-300/65">{count}</span>
              <span className={`text-[7px] ${
                status === "SYNC..." ? "text-amber-400 animate-pulse" : "text-emerald-400"
              }`}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-teal-400/10 bg-black/20">
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-teal-400 animate-ping" />
          <span className="text-[7px] text-white/28 tracking-wider">SYNC IN PROGRESS</span>
        </div>
        <span className="text-[7px] text-white/18 tracking-wider">LAST_UPDATE: NOW</span>
      </div>
    </div>
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
                <ScraperDashboard />
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
