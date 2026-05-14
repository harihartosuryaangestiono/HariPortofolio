"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { ProjectDetailPortal } from "@/components/project-detail";
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORIES,
  type GalleryItem,
  type GalleryCategory,
} from "@/lib/gallery";

// ─────────────────────────────────────────────────────────────
// Accent colour map per item slug
// ─────────────────────────────────────────────────────────────
const ACCENT_MAP: Record<string, { glow: string; border: string; text: string }> = {
  "terangi-main":           { glow: "rgba(56,189,248,0.14)",  border: "rgba(56,189,248,0.30)",  text: "text-sky-400" },
  "unpar-scraper-dashboard":{ glow: "rgba(45,212,191,0.14)",  border: "rgba(45,212,191,0.30)",  text: "text-teal-400" },
  "plyledger-system":       { glow: "rgba(52,211,153,0.14)",  border: "rgba(52,211,153,0.30)",  text: "text-emerald-400" },
  "sop-dashboard":          { glow: "rgba(129,140,248,0.14)", border: "rgba(129,140,248,0.30)", text: "text-indigo-400" },
  "pos-interface":          { glow: "rgba(34,211,238,0.14)",  border: "rgba(34,211,238,0.30)",  text: "text-cyan-400" },
  "laundry-dashboard":      { glow: "rgba(74,222,128,0.14)",  border: "rgba(74,222,128,0.30)",  text: "text-green-400" },
  "qr-wedding-system":      { glow: "rgba(244,114,182,0.14)", border: "rgba(244,114,182,0.30)", text: "text-pink-400" },
};

const DEFAULT_ACCENT = { glow: "rgba(139,92,246,0.14)", border: "rgba(139,92,246,0.30)", text: "text-violet-400" };

function getAccent(id: string) {
  return ACCENT_MAP[id] ?? DEFAULT_ACCENT;
}

// ─────────────────────────────────────────────────────────────
// Gallery Filter Tabs
// ─────────────────────────────────────────────────────────────
function FilterTabs({
  active,
  onChange,
}: {
  active: GalleryCategory;
  onChange: (c: GalleryCategory) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14 sm:mb-16">
      {GALLERY_CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`
              relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-mono
              uppercase tracking-[0.22em] transition-all duration-400 border
              backdrop-blur-sm cursor-pointer
              ${
                isActive
                  ? "bg-white/[0.08] border-violet-400/40 text-white shadow-[0_0_24px_rgba(139,92,246,0.12)]"
                  : "bg-white/[0.02] border-white/8 text-white/35 hover:text-white/60 hover:border-white/18 hover:bg-white/[0.04]"
              }
            `}
          >
            {isActive && (
              <motion.span
                layoutId="gallery-filter-pill"
                className="absolute inset-0 rounded-full bg-violet-500/8 border border-violet-400/20"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Single Gallery Card
// ─────────────────────────────────────────────────────────────
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const accent = getAccent(item.id);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`
        gallery-card group relative rounded-2xl overflow-hidden cursor-pointer
        transform-gpu will-change-transform
        ${item.span === 2 ? "sm:col-span-2" : "col-span-1"}
      `}
      style={{
        border: `1px solid rgba(255,255,255,0.06)`,
      }}
      onClick={onClick}
    >
      {/* ── Image container ── */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#060a12]">
        <img
          src={item.imageSrc}
          alt={item.title}
          loading="lazy"
          className="
            w-full h-full object-cover
            transition-all duration-700 ease-out
            group-hover:scale-[1.06]
            group-hover:brightness-110
          "
        />

        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `
              linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65) 100%),
              radial-gradient(ellipse 70% 50% at 50% 80%, ${accent.glow} 0%, transparent 70%)
            `,
          }}
        />

        {/* Holographic scan line on hover */}
        <div
          className="
            absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 6px)",
          }}
        />

        {/* Border glow on hover */}
        <div
          className="
            absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
          style={{
            boxShadow: `inset 0 0 0 1px ${accent.border}, 0 0 40px ${accent.glow}`,
          }}
        />

        {/* Top edge light */}
        <div
          className="
            absolute top-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)`,
          }}
        />

        {/* Expand icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 z-20">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: `1px solid ${accent.border}`,
            }}
          >
            <Maximize2 className="w-3.5 h-3.5 text-white/80" />
          </div>
        </div>

        {/* Category tag */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`
              text-[8px] font-mono tracking-[0.3em] uppercase px-2.5 py-1
              rounded-full border bg-black/60 backdrop-blur-sm ${accent.text}
            `}
            style={{ borderColor: accent.border }}
          >
            {item.category.replace("-", " ")}
          </span>
        </div>

        {/* Corner brackets */}
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ borderColor: accent.border }} />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ borderColor: accent.border }} />
      </div>

      {/* ── Info bar ── */}
      <div
        className="
          relative px-5 py-4 bg-[#060a12]/90 backdrop-blur-sm
          border-t border-white/[0.04]
        "
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white/90 tracking-tight leading-tight group-hover:text-white transition-colors">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-[11px] text-white/35 mt-1 font-light">
                {item.subtitle}
              </p>
            )}
          </div>
          {/* Status dot */}
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: accent.border }}
            />
            <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">
              SYS
            </span>
          </div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[8px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border border-white/6 text-white/25 bg-white/[0.02]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}


// ─────────────────────────────────────────────────────────────
// Floating Particles (ambient effect)
// ─────────────────────────────────────────────────────────────
function GalleryParticles() {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 8,
        duration: Math.random() * 12 + 8,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-violet-400/15 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float-up ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Gallery Section (exported)
// ─────────────────────────────────────────────────────────────
export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [detailItem, setDetailItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger entrance
      const cards = gsap.utils.toArray(".gallery-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 44, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Background parallax glow
      gsap.to(".gallery-bg-glow", {
        y: 180,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative overflow-hidden py-28 sm:py-36 bg-[#020810] min-h-screen"
      >
        {/* Background environment */}
        <div className="absolute inset-0">
          {/* Atmospheric glow */}
          <div className="gallery-bg-glow absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-violet-600/[0.06] rounded-full blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,92,246,0.08) 2px, rgba(139,92,246,0.08) 4px)",
            }}
          />
        </div>

        <GalleryParticles />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* ── Header ── */}
          <div ref={headerRef} className="text-center mb-12 sm:mb-14 will-change-transform">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="h-1.5 w-1.5 bg-violet-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.45em] text-violet-400/60 uppercase">
                004 &nbsp;/&nbsp; Visual Archive
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.0] mb-5">
              <ScrollReveal
                blurStrength={5}
                baseRotation={2}
                baseOpacity={0.12}
                stagger={0.09}
                duration={1.1}
                triggerStart="top 84%"
              >
                The Exhibition.
              </ScrollReveal>
            </h2>

            <p className="text-sm text-white/30 max-w-md mx-auto font-light leading-relaxed">
              A curated archive of real systems, dashboards, and interfaces &mdash;
              each built to solve real problems.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-mono text-white/18 uppercase tracking-widest">
              <span className="w-4 h-px bg-white/12" />
              Explore the archive
              <span className="w-4 h-px bg-white/12" />
            </div>
          </div>

          {/* ── Filter Tabs ── */}
          <FilterTabs active={activeCategory} onChange={setActiveCategory} />

          {/* ── Gallery Grid ── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => setDetailItem(item)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sm font-mono text-white/20 uppercase tracking-widest">
                No entries found in this archive.
              </p>
            </div>
          )}
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020810] to-transparent pointer-events-none z-10" />
      </section>

      {/* ── Cinematic Project Detail Portal ── */}
      <ProjectDetailPortal
        item={detailItem}
        onClose={() => setDetailItem(null)}
      />
    </>
  );
}
