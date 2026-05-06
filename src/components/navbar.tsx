"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { PROFILE } from "@/lib/profile";

function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const top = visible[0]?.target?.id as SectionId | undefined;
        if (top) setActive(top);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const current = (theme === "system" ? resolvedTheme : theme) ?? "dark";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "h-10 w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur",
        "hover:bg-white/8 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50",
      )}
      aria-label="Toggle theme"
    >
      <span className="grid place-items-center text-white/85">
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
    </button>
  );
}

export function Navbar() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b border-white/8",
          "bg-[rgba(7,10,16,0.72)] backdrop-blur-xl",
        )}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="h-16 flex items-center justify-between gap-3">
            <Link href="#home" className="group flex items-center gap-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/6">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-500/18 to-cyan-300/12 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-sm font-semibold tracking-tight">
                  HS
                </span>
              </span>
              <span className="hidden sm:block text-sm font-medium text-white/85 group-hover:text-white transition-colors">
                {PROFILE.name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                  <Link
                    key={s.id}
                    href={`#${s.id}`}
                    className={cn(
                      "relative px-3 py-2 text-xs font-medium tracking-wide rounded-full transition-colors",
                      isActive ? "text-white" : "text-white/62 hover:text-white",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/8 border border-white/10"
                        transition={{ type: "spring", stiffness: 450, damping: 40 }}
                      />
                    ) : null}
                    <span className="relative">{s.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={PROFILE.cvUrl}
                className={cn(
                  "hidden sm:inline-flex h-10 items-center gap-2 rounded-full px-4 text-xs font-medium",
                  "border border-white/10 bg-white/6 hover:bg-white/9 transition-colors",
                )}
              >
                Download CV <ArrowUpRight className="h-4 w-4 text-white/70" />
              </a>
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "md:hidden h-10 w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur",
                  "hover:bg-white/8 transition-colors",
                )}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span className="grid place-items-center text-white/85">
                  {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-b border-white/10 bg-[rgba(7,10,16,0.92)] backdrop-blur-xl"
          >
            <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4">
              <div className="grid gap-1">
                {SECTIONS.map((s) => (
                  <Link
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors",
                      active === s.id ? "text-white" : "text-white/75",
                    )}
                  >
                    {s.label}
                  </Link>
                ))}
                <a
                  href={PROFILE.cvUrl}
                  className="mt-2 px-4 py-3 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/16 to-cyan-400/10 hover:from-violet-500/22 hover:to-cyan-400/14 transition-colors"
                >
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

