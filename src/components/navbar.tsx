"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { PROFILE } from "@/lib/profile";

// ─── Active section tracker ────────────────────────────────────
function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>("home");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const top = visible[0]?.target?.id as SectionId | undefined;
        if (top) setActive(top);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

// ─── Mouse-reactive liquid highlight on the nav pill ──────────
function LiquidNavItem({
  section,
  isActive,
  onClick,
}: {
  section: { id: SectionId; label: string };
  isActive: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const highlightLeft = useTransform(springX, [0, 1], ["10%", "80%"]);
  const highlightTop  = useTransform(springY, [0, 1], ["10%", "80%"]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top)  / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <Link
      ref={ref}
      href={`#${section.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group px-3.5 py-2 rounded-full text-[11px] font-medium tracking-[0.06em] uppercase transition-colors duration-200 overflow-hidden"
      style={{ color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)" }}
    >
      {/* Active liquid glass pill */}
      {isActive && (
        <motion.span
          layoutId="nav-liquid-pill"
          className="absolute inset-0 rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px rgba(200,210,255,0.08)",
          }}
        />
      )}

      {/* Hover glass surface */}
      <motion.span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />

      {/* Mouse-reactive specular highlight */}
      <motion.span
        className="absolute w-8 h-8 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: highlightLeft,
          top: highlightTop,
          background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />

      <span className="relative z-10">{section.label}</span>
    </Link>
  );
}

// ─── Mobile menu sheet ─────────────────────────────────────────
function MobileSheet({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: SectionId;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[998]"
            style={{ background: "rgba(2,6,14,0.55)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Glass sheet */}
          <motion.div
            key="sheet"
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.8 }}
            className="fixed top-4 left-4 right-4 z-[999] rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(180,200,255,0.06) 50%, rgba(120,140,255,0.08) 100%)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,10,0.55), 0 0 60px rgba(130,160,255,0.06)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
            }}
          >
            {/* Inner top highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
            />

            {/* Header row */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <Link
                href="#home"
                onClick={onClose}
                className="flex items-center gap-2.5"
              >
                <span
                  className="w-8 h-8 rounded-xl grid place-items-center text-xs font-bold tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(180,200,255,0.1))",
                    border: "1px solid rgba(255,255,255,0.22)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                    color: "rgba(255,255,255,0.95)",
                  }}
                >
                  HS
                </span>
                <span className="text-sm font-medium text-white/80">Menu</span>
              </Link>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full grid place-items-center transition-colors"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
                aria-label="Close menu"
              >
                <X className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>

            {/* Nav links */}
            <div className="px-3 pb-3 grid grid-cols-2 gap-2">
              {SECTIONS.map((s, i) => {
                const isActive = active === s.id;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.28, ease: "easeOut" }}
                  >
                    <Link
                      href={`#${s.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(180,200,255,0.1) 100%)"
                          : "rgba(255,255,255,0.04)",
                        border: isActive
                          ? "1px solid rgba(255,255,255,0.22)"
                          : "1px solid rgba(255,255,255,0.07)",
                        boxShadow: isActive
                          ? "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 16px rgba(0,0,0,0.2)"
                          : "none",
                        color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                      }}
                    >
                      <span className="text-sm font-medium tracking-wide">{s.label}</span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "rgba(180,200,255,0.9)", boxShadow: "0 0 6px rgba(180,200,255,0.8)" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CV CTA */}
            <div className="px-3 pb-5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: SECTIONS.length * 0.04 + 0.06, duration: 0.28 }}
              >
                <a
                  href={PROFILE.cvUrl}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(34,211,238,0.15) 100%)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 0 30px rgba(139,92,246,0.08)",
                    color: "rgba(220,210,255,0.95)",
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </a>
              </motion.div>
            </div>

            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-[0.025]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundRepeat: "repeat",
                backgroundSize: "128px",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────
export function Navbar() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* ── Floating liquid-glass bar ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3.5"
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          animate={{
            boxShadow: scrolled
              ? "0 0 0 1px rgba(255,255,255,0.14) inset, 0 24px 60px rgba(0,0,16,0.5), 0 0 80px rgba(130,160,255,0.04)"
              : "0 0 0 1px rgba(255,255,255,0.1) inset, 0 12px 40px rgba(0,0,16,0.35)",
          }}
          transition={{ duration: 0.4 }}
          className="relative flex items-center gap-2 px-2.5 py-2 rounded-full w-full max-w-2xl"
          style={{
            pointerEvents: "auto",
            background: scrolled
              ? "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(180,200,255,0.06) 60%, rgba(120,140,255,0.08) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(180,200,255,0.04) 60%, rgba(120,140,255,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.16)",
            backdropFilter: "blur(32px) saturate(160%)",
            WebkitBackdropFilter: "blur(32px) saturate(160%)",
          }}
        >
          {/* Top edge highlight */}
          <div
            className="absolute top-0 left-6 right-6 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            }}
          />

          {/* ── Logo ── */}
          <Link
            href="#home"
            className="group relative flex items-center gap-2 flex-shrink-0 rounded-full px-2.5 py-1.5 transition-all duration-200"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative w-8 h-8 rounded-xl grid place-items-center text-xs font-bold tracking-tight overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(180,200,255,0.12) 100%)",
                border: "1px solid rgba(255,255,255,0.26)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 0 16px rgba(139,92,246,0.15)",
                color: "rgba(255,255,255,0.95)",
              }}
            >
              {/* Specular sheen */}
              <span
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
                }}
              />
              <span className="relative z-10">HS</span>
            </motion.span>
          </Link>

          {/* ── Thin separator ── */}
          <div
            className="h-5 w-px flex-shrink-0 hidden sm:block"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />

          {/* ── Desktop nav items ── */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {SECTIONS.map((s) => (
              <LiquidNavItem
                key={s.id}
                section={s}
                isActive={active === s.id}
              />
            ))}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
            {/* CV button — desktop */}
            <motion.a
              href={PROFILE.cvUrl}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase px-3.5 py-2 rounded-full transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.22) 0%, rgba(34,211,238,0.12) 100%)",
                border: "1px solid rgba(139,92,246,0.28)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 0 20px rgba(139,92,246,0.06)",
                color: "rgba(210,200,255,0.9)",
              }}
            >
              <Download className="w-3 h-3" />
              CV
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              className="md:hidden w-9 h-9 rounded-full grid place-items-center transition-all duration-200"
              style={{
                background: open
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: open ? "inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                color: "rgba(255,255,255,0.8)",
              }}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Noise texture */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "64px",
            }}
          />
        </motion.div>
      </motion.header>

      {/* ── Mobile sheet ── */}
      <MobileSheet open={open} active={active} onClose={() => setOpen(false)} />
    </>
  );
}
