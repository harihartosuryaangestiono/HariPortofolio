"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { X, ExternalLink, GitBranch, ChevronDown, Zap, Layers, Target, Sparkles } from "lucide-react";
import gsap from "gsap";
import { type GalleryItem } from "@/lib/gallery";
import { useLenis } from "@/components/animations/smooth-scroll";
import { IPhoneMockup } from "@/components/ui/iphone-mockup";

const ACCENT: Record<string, { glow: string; border: string; text: string; rgb: string }> = {
  "terangi-main":            { glow: "rgba(56,189,248,0.14)",  border: "rgba(56,189,248,0.35)",  text: "text-sky-400",     rgb: "56,189,248" },
  "unpar-scraper-dashboard": { glow: "rgba(45,212,191,0.14)",  border: "rgba(45,212,191,0.35)",  text: "text-teal-400",    rgb: "45,212,191" },
  "plyledger-system":        { glow: "rgba(52,211,153,0.14)",  border: "rgba(52,211,153,0.35)",  text: "text-emerald-400", rgb: "52,211,153" },
  "sop-dashboard":           { glow: "rgba(129,140,248,0.14)", border: "rgba(129,140,248,0.35)", text: "text-indigo-400",  rgb: "129,140,248" },
  "pos-interface":           { glow: "rgba(34,211,238,0.14)",  border: "rgba(34,211,238,0.35)",  text: "text-cyan-400",    rgb: "34,211,238" },
  "laundry-dashboard":       { glow: "rgba(74,222,128,0.14)",  border: "rgba(74,222,128,0.35)",  text: "text-green-400",   rgb: "74,222,128" },
  "qr-wedding-system":       { glow: "rgba(244,114,182,0.14)", border: "rgba(244,114,182,0.35)", text: "text-pink-400",    rgb: "244,114,182" },
};
const DEF = { glow: "rgba(139,92,246,0.14)", border: "rgba(139,92,246,0.35)", text: "text-violet-400", rgb: "139,92,246" };
function ga(id: string) { return ACCENT[id] ?? DEF; }

/* ── Reusable sub-components ── */
function Divider({ rgb }: { rgb: string }) {
  return (
    <div className="relative my-16 sm:my-20">
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.25), transparent)` }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${rgb},0.6)`, boxShadow: `0 0 10px rgba(${rgb},0.4)` }} />
    </div>
  );
}

function SectionLabel({ num, title, rgb }: { num: string; title: string; rgb: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: `rgba(${rgb},0.4)` }}>{num}</span>
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${rgb},0.5)` }} />
      <h3 className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-semibold" style={{ color: `rgba(${rgb},0.75)` }}>{title}</h3>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, rgba(${rgb},0.2), transparent)` }} />
    </div>
  );
}

function MetaItem({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="py-3.5 border-b border-white/[0.05]">
      <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/25 block mb-1">{label}</span>
      <span className="text-[15px] text-white/90 font-medium leading-snug">{value}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   MODAL CURSOR
   ════════════════════════════════════════════════════ */
function ModalCursor({ rgb }: { rgb: string }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Ring trails behind with spring
  const rx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.5 });
  const ry = useSpring(my, { stiffness: 120, damping: 22, mass: 0.5 });

  const [hoverBtn, setHoverBtn] = useState(false);
  const [scrollHint, setScrollHint] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move);

    // Periodically flash the scroll hint
    const id = setInterval(() => {
      setScrollHint(true);
      setTimeout(() => setScrollHint(false), 1400);
    }, 4500);

    // Detect hovering interactive elements to morph ring
    const over  = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHoverBtn(!!(t.closest("button") || t.closest("a")));
    };
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      clearInterval(id);
    };
  }, [mx, my]);

  return (
    <>
      {/* ── Trailing ring ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999999]"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width:   hoverBtn ? 56 : scrollHint ? 72 : 38,
            height:  hoverBtn ? 56 : scrollHint ? 72 : 38,
            opacity: hoverBtn ? 0.5 : scrollHint ? 0.35 : 0.28,
            borderColor: hoverBtn
              ? `rgba(${rgb},0.9)`
              : `rgba(${rgb},0.55)`,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full border"
          style={{ boxShadow: `0 0 16px rgba(${rgb},0.25)` }}
        />

        {/* SCROLL hint label inside ring */}
        <AnimatePresence>
          {scrollHint && !hoverBtn && (
            <motion.span
              key="scroll-hint"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center text-[7px] font-mono tracking-[0.2em] uppercase pointer-events-none select-none"
              style={{ color: `rgba(${rgb},0.8)` }}
            >
              scroll
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Primary dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999999]"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{ scale: hoverBtn ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-[5px] h-[5px] rounded-full"
          style={{
            background: `rgba(${rgb},1)`,
            boxShadow: `0 0 8px rgba(${rgb},0.8), 0 0 16px rgba(${rgb},0.4)`,
          }}
        />
      </motion.div>
    </>
  );
}

/* ════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════ */
export function ProjectDetailView({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const a = ga(item.id);
  const contentRef = useRef<HTMLDivElement>(null);
  const { pause, resume, getScrollY } = useLenis();
  const savedScrollY = useRef<number>(0);

  useEffect(() => {
    // Save position BEFORE locking so we can restore it on close
    savedScrollY.current = getScrollY();

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);

    // Lock page body scroll and stop Lenis animation
    document.body.style.overflow = "hidden";
    pause();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restore Lenis to the exact position it was at before modal opened
      resume(savedScrollY.current);
    };
  }, [onClose, pause, resume, getScrollY]);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll(".da");
    gsap.fromTo(els, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.055, ease: "power3.out", delay: 0.25 });
  }, []);

  // Stop wheel & touch events from bubbling up to window where Lenis listens.
  // This is the KEY fix: native overflow-y-scroll works once Lenis can't intercept.
  const stopProp = useCallback((e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[99999] cursor-none"
      onWheel={stopProp}
      onTouchMove={stopProp}
    >
      {/* Custom cursor */}
      <ModalCursor rgb={a.rgb} />

      {/* BG */}
      <div className="absolute inset-0 bg-[#020810]/[0.98] backdrop-blur-2xl" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[30%] w-[700px] h-[700px] rounded-full blur-[200px] opacity-25" style={{ background: `rgba(${a.rgb},0.12)` }} />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-15" style={{ background: `rgba(${a.rgb},0.08)` }} />
      </div>
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)" }} />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-10 py-4" style={{ background: "linear-gradient(to bottom, rgba(2,8,16,0.95), transparent)" }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: `rgba(${a.rgb},0.8)` }} />
          <span className={`text-[9px] font-mono tracking-[0.3em] uppercase ${a.text}`}>{item.title} · Case Study</span>
        </div>
        <div className="flex items-center gap-3">
          {item.liveUrl && (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-mono tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full border transition-all hover:bg-white/5" style={{ borderColor: `rgba(${a.rgb},0.3)`, color: `rgba(${a.rgb},0.8)` }}>
              Visit Site <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/10 border border-white/10 cursor-pointer">
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>

      {/* SCROLLABLE — native overflow scroll; Lenis is stopped + events blocked by stopProp above */}
      <div
        className="modal-scroll absolute inset-0 overflow-y-scroll overflow-x-hidden"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: `rgba(${a.rgb},0.35) rgba(255,255,255,0.03)`,
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          // @ts-expect-error CSS custom property
          "--modal-accent": `rgba(${a.rgb},0.5)`,
        }}
      >
        <div ref={contentRef} className="relative z-10">

          {/* ═══════════ HERO SPLIT ═══════════ */}
          <div className="min-h-[85vh] flex items-center pt-20 pb-12">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* LEFT — Title & Meta */}
                <div className="da">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${a.rgb},0.7)` }} />
                    <span className="text-[10px] font-mono tracking-[0.35em] uppercase" style={{ color: `rgba(${a.rgb},0.5)` }}>{item.category.replace(/-/g, " ")}</span>
                  </div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.95] mb-3">{item.title}</h1>
                  {item.subtitle && <p className="text-lg sm:text-xl font-light tracking-wide mb-6" style={{ color: `rgba(${a.rgb},0.6)` }}>{item.subtitle}</p>}
                  {item.shortDescription && <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 max-w-lg">{item.shortDescription}</p>}

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-0 mb-8 max-w-md border-t border-white/[0.05]">
                    {item.client && <MetaItem label="Client" value={item.client} rgb={a.rgb} />}
                    {item.year && <MetaItem label="Year" value={item.year} rgb={a.rgb} />}
                    {item.role && <MetaItem label="Role" value={item.role} rgb={a.rgb} />}
                    <MetaItem label="Category" value={item.category.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} rgb={a.rgb} />
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-3">
                    {item.liveUrl && (
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-mono font-semibold px-5 py-2.5 rounded-full border transition-all hover:brightness-125" style={{ background: `rgba(${a.rgb},0.1)`, borderColor: `rgba(${a.rgb},0.3)`, color: `rgba(${a.rgb},0.9)` }}>
                        View Live <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {item.githubUrl && (
                      <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-full border border-white/10 text-white/40 hover:bg-white/[0.04] transition-all">
                        Source <GitBranch className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* RIGHT — Hero Media */}
                <motion.div className="da" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
                  <div className="relative rounded-2xl overflow-hidden group" style={{ border: `1px solid rgba(${a.rgb},0.15)`, boxShadow: `0 0 60px rgba(${a.rgb},0.06), 0 25px 60px rgba(0,0,0,0.4)` }}>
                    {item.videoSrc ? (
                      <video autoPlay muted loop playsInline className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.02]">
                        <source src={item.videoSrc} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={item.imageSrc} alt={item.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                    )}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, transparent 60%, rgba(2,8,16,0.5) 100%), radial-gradient(ellipse 50% 30% at 50% 90%, rgba(${a.rgb},0.06), transparent)` }} />
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${a.rgb},0.35), transparent)` }} />
                    {/* Corner brackets */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t border-l pointer-events-none" style={{ borderColor: `rgba(${a.rgb},0.3)` }} />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t border-r pointer-events-none" style={{ borderColor: `rgba(${a.rgb},0.3)` }} />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l pointer-events-none" style={{ borderColor: `rgba(${a.rgb},0.2)` }} />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r pointer-events-none" style={{ borderColor: `rgba(${a.rgb},0.2)` }} />
                  </div>
                </motion.div>
              </div>

              {/* Scroll hint */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col items-center mt-12 gap-2">
                <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-white/15">Scroll to explore</span>
                <ChevronDown className="w-4 h-4 text-white/10 animate-bounce" />
              </motion.div>
            </div>
          </div>

          {/* ═══════════ CONTENT SECTIONS ═══════════ */}
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-10 pb-20">

            {/* 01 — ABOUT */}
            {item.detailedDescription && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="01" title="About The Project" rgb={a.rgb} />
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
                  <p className="text-lg sm:text-xl text-white/65 leading-[1.85] font-light">{item.detailedDescription}</p>
                  {/* Tech pills sidebar */}
                  {(item.technologies ?? item.tags) && (
                    <div>
                      <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/20 block mb-4">Tech Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {(item.technologies ?? item.tags ?? []).map(t => (
                          <span key={t} className="text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full border transition-all hover:scale-105 cursor-default" style={{ borderColor: `rgba(${a.rgb},0.18)`, color: `rgba(${a.rgb},0.7)`, background: `rgba(${a.rgb},0.04)` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 02 — ARCHITECTURE */}
            {item.architecture && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="02" title="System Architecture" rgb={a.rgb} />
                <div className="relative p-6 sm:p-8 rounded-2xl border bg-white/[0.01]" style={{ borderColor: `rgba(${a.rgb},0.08)` }}>
                  <Layers className="w-5 h-5 mb-4" style={{ color: `rgba(${a.rgb},0.4)` }} />
                  <p className="text-[15px] text-white/60 leading-[1.9]">{item.architecture}</p>
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${a.rgb},0.15), transparent)` }} />
                </div>
              </div>
            )}

            {/* 03 — CHALLENGES & SOLUTIONS */}
            {item.challenges && item.challenges.length > 0 && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="03" title="Challenges & Solutions" rgb={a.rgb} />
                <div className="space-y-6">
                  {item.challenges.map((ch, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 sm:p-6 rounded-2xl border bg-white/[0.008]" style={{ borderColor: `rgba(${a.rgb},0.06)` }}>
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <Target className="w-3.5 h-3.5" style={{ color: `rgba(${a.rgb},0.45)` }} />
                          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/30">Challenge {String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="text-sm text-white/65 leading-relaxed">{ch}</p>
                      </div>
                      {item.solutions?.[i] && (
                        <div className="md:border-l md:pl-4" style={{ borderColor: `rgba(${a.rgb},0.1)` }}>
                          <div className="flex items-center gap-2 mb-2.5">
                            <Zap className="w-3.5 h-3.5" style={{ color: `rgba(${a.rgb},0.6)` }} />
                            <span className="text-[9px] font-mono tracking-[0.25em] uppercase" style={{ color: `rgba(${a.rgb},0.45)` }}>Solution</span>
                          </div>
                          <p className="text-sm text-white/80 leading-relaxed">{item.solutions[i]}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 04 — FEATURES */}
            {item.features && item.features.length > 0 && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="04" title="Key Features" rgb={a.rgb} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.features.map((f, i) => (
                    <div key={i} className="group relative p-5 rounded-xl border transition-all duration-300 hover:border-opacity-50 cursor-default" style={{ borderColor: `rgba(${a.rgb},0.08)`, background: `rgba(${a.rgb},0.01)` }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `rgba(${a.rgb},0.08)`, border: `1px solid rgba(${a.rgb},0.12)` }}>
                        <Sparkles className="w-3.5 h-3.5" style={{ color: `rgba(${a.rgb},0.6)` }} />
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">{f}</p>
                      <div className="absolute bottom-0 left-[10%] right-[10%] h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, rgba(${a.rgb},0.2), transparent)` }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 05 — PROCESS */}
            {item.developmentProcess && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="05" title="Development Process" rgb={a.rgb} />
                <div className="flex gap-4 items-start">
                  <div className="w-px min-h-[60px] flex-shrink-0 mt-1" style={{ background: `linear-gradient(180deg, rgba(${a.rgb},0.3), rgba(${a.rgb},0.05))` }} />
                  <p className="text-[15px] text-white/55 leading-[1.85] italic">{item.developmentProcess}</p>
                </div>
              </div>
            )}

            {/* 06 — RESULTS */}
            {item.results && item.results.length > 0 && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="06" title="Results & Impact" rgb={a.rgb} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl border" style={{ borderColor: `rgba(${a.rgb},0.06)`, background: `linear-gradient(135deg, rgba(${a.rgb},0.02), transparent)` }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold" style={{ background: `rgba(${a.rgb},0.1)`, color: `rgba(${a.rgb},0.8)`, border: `1px solid rgba(${a.rgb},0.15)` }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed pt-1">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 07 — GALLERY */}
            {item.screenshots && item.screenshots.length > 0 && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="07" title="Visual Showcase" rgb={a.rgb} />
                <div className="space-y-6">
                  {item.screenshots.map((src, i) => (
                    <div key={i} className="group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:border-opacity-60" style={{ borderColor: `rgba(${a.rgb},0.1)`, boxShadow: `0 0 30px rgba(${a.rgb},0.03)` }}>
                      <img src={src} alt={`${item.title} screenshot ${i + 1}`} className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]" loading="lazy" />
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at center, rgba(${a.rgb},0.03), transparent)` }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 08 — DEVICE MOCKUP SHOWCASE */}
            {item.mockupImages && item.mockupImages.length > 0 && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="08" title="Device Showcase" rgb={a.rgb} />
                <div className="space-y-8">
                  {item.mockupImages.map((m, i) => (
                    <div key={i} className="group relative">
                      {/* Device label */}
                      {m.label && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: `rgba(${a.rgb},0.45)` }}>
                            {m.device ?? "view"} · {m.label}
                          </span>
                        </div>
                      )}
                      <div
                        className="relative rounded-2xl overflow-hidden border transition-all duration-500"
                        style={{
                          borderColor: `rgba(${a.rgb},0.1)`,
                          boxShadow: `0 0 40px rgba(${a.rgb},0.04), 0 20px 60px rgba(0,0,0,0.35)`,
                        }}
                      >
                        <img
                          src={m.src}
                          alt={m.label ?? `${item.title} mockup ${i + 1}`}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `radial-gradient(ellipse at center, rgba(${a.rgb},0.04), transparent)` }}
                        />
                        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${a.rgb},0.2), transparent)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 09 — MOBILE SHOWCASE (SOP only) */}
            {item.id === "sop-dashboard" && (
              <div className="da">
                <Divider rgb={a.rgb} />
                <SectionLabel num="09" title="Mobile Experience" rgb={a.rgb} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left — cinematic iPhone frame */}
                  <div className="flex justify-center">
                    <IPhoneMockup
                      videoSrc="/projects/sop-mobile.mp4"
                      imageSrc="/projects/sop-mockup.png"
                      accent={a.rgb}
                      className="w-full max-w-[320px]"
                    />
                  </div>

                  {/* Right — copy */}
                  <div className="space-y-6">
                    <div>
                      <p
                        className="text-[9px] font-mono tracking-[0.35em] uppercase mb-3"
                        style={{ color: `rgba(${a.rgb},0.45)` }}
                      >
                        Staff Interface · Mobile-First
                      </p>
                      <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug mb-4">
                        Built for the floor,<br />not the office.
                      </h4>
                      <p className="text-[15px] text-white/55 leading-relaxed">
                        Every café employee interacts through a streamlined mobile-first interface.
                        Upload photo evidence, mark tasks complete, and log compliance checks — all in seconds, directly from the shop floor.
                      </p>
                    </div>

                    {/* Mobile feature chips */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Photo Evidence Upload",
                        "Task Checklist",
                        "Real-time Status",
                        "Shift Logs",
                        "Offline Ready",
                      ].map((f) => (
                        <span
                          key={f}
                          className="text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-full border"
                          style={{
                            borderColor: `rgba(${a.rgb},0.2)`,
                            background: `rgba(${a.rgb},0.05)`,
                            color: `rgba(${a.rgb},0.7)`,
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Stat row */}
                    <div
                      className="grid grid-cols-3 gap-4 pt-4 border-t"
                      style={{ borderColor: `rgba(${a.rgb},0.08)` }}
                    >
                      {[
                        { n: "<30s", l: "Task completion" },
                        { n: "100%", l: "Photo audit trail" },
                        { n: "Real-time", l: "Manager dashboard" },
                      ].map((s) => (
                        <div key={s.l}>
                          <p
                            className="text-lg font-bold tracking-tight"
                            style={{ color: `rgba(${a.rgb},0.85)` }}
                          >
                            {s.n}
                          </p>
                          <p className="text-[10px] text-white/35 leading-snug mt-0.5">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CLOSE */}
            <div className="flex justify-center mt-20 mb-16">
              <button onClick={onClose} className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/8 text-white/30 hover:text-white/50 hover:border-white/15 transition-all cursor-pointer">
                Close Case Study <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Portal wrapper ── */
export function ProjectDetailPortal({ item, onClose }: { item: GalleryItem | null; onClose: () => void }) {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  if (!m) return null;
  return createPortal(<AnimatePresence>{item && <ProjectDetailView item={item} onClose={onClose} />}</AnimatePresence>, document.body);
}
