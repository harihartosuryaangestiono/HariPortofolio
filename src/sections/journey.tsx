"use client";

import { useRef } from "react";
import { Container } from "@/components/container";
import { JOURNEY } from "@/lib/profile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ui/scroll-reveal";

const NODE_ACCENTS = [
  {
    dot: "bg-cyan-400",
    badge: "text-cyan-400 border-cyan-400/40 bg-cyan-400/8",
    glow: "rgba(34,211,238,",
  },
  {
    dot: "bg-indigo-400",
    badge: "text-indigo-400 border-indigo-400/40 bg-indigo-400/8",
    glow: "rgba(129,140,248,",
  },
  {
    dot: "bg-violet-400",
    badge: "text-violet-400 border-violet-400/40 bg-violet-400/8",
    glow: "rgba(167,139,250,",
  },
  {
    dot: "bg-sky-400",
    badge: "text-sky-400 border-sky-400/40 bg-sky-400/8",
    glow: "rgba(56,189,248,",
  },
  {
    dot: "bg-emerald-400",
    badge: "text-emerald-400 border-emerald-400/40 bg-emerald-400/8",
    glow: "rgba(52,211,153,",
  },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const nodes = gsap.utils.toArray<HTMLElement>(".journey-node");

    nodes.forEach((node, i) => {
      const accentGlow = NODE_ACCENTS[i % NODE_ACCENTS.length].glow;
      const card = node.querySelector<HTMLElement>(".journey-card");
      const dot = node.querySelector<HTMLElement>(".journey-dot-inner");
      const spotlight = node.querySelector<HTMLElement>(".journey-spotlight");

      // Entrance animation
      gsap.fromTo(
        node,
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        }
      );

      // Active spotlight when node is in the reading zone
      const activate = () => {
        gsap.to(card, {
          borderColor: `${accentGlow}0.35)`,
          backgroundColor: "rgba(255,255,255,0.055)",
          boxShadow: `0 0 60px ${accentGlow}0.10), 0 0 20px ${accentGlow}0.06), inset 0 1px 0 ${accentGlow}0.15)`,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (dot) gsap.to(dot, { scale: 1.35, duration: 0.4, ease: "back.out(2)" });
        if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.6, ease: "power2.out" });
      };

      const deactivate = () => {
        gsap.to(card, {
          borderColor: "rgba(255,255,255,0.09)",
          backgroundColor: "rgba(255,255,255,0.025)",
          boxShadow: "none",
          duration: 0.5,
          ease: "power2.in",
          overwrite: "auto",
        });
        if (dot) gsap.to(dot, { scale: 1, duration: 0.35 });
        if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.5 });
      };

      ScrollTrigger.create({
        trigger: node,
        start: "top 68%",
        end: "bottom 18%",
        onEnter: activate,
        onLeave: deactivate,
        onEnterBack: activate,
        onLeaveBack: deactivate,
      });
    });

    // Background glow parallax
    gsap.to(".journey-bg-glow", {
      y: 180,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden w-full py-32 lg:py-40 border-b border-white/5"
      style={{ backgroundColor: "#020b1a" }}
    >
      {/* ── Ambient background layers ── */}
      {/* Primary cyan glow */}
      <div className="journey-bg-glow absolute top-[5%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full pointer-events-none will-change-transform"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.10) 0%, transparent 65%)" }} />
      {/* Secondary purple ambient */}
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 60%)" }} />
      {/* Bottom warm fill so section doesn't fall to pure black */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(2,15,40,0.6) 0%, transparent 100%)" }} />
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <Container className="relative z-10">

        {/* ── Section header ── */}
        <div className="text-center mb-24 lg:mb-32">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-medium uppercase tracking-[0.35em] text-cyan-300 mb-6 border border-cyan-400/30 px-3 py-1.5 rounded-full bg-cyan-400/8">
            <span className="h-1.5 w-1.5 bg-cyan-400 animate-pulse rounded-full" />
            004 &nbsp;/&nbsp; Memory Archive
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.0]">
            <ScrollReveal
              blurStrength={5}
              baseRotation={2}
              baseOpacity={0.15}
              stagger={0.08}
              duration={1.1}
              triggerStart="top 84%"
            >
              The Journey
            </ScrollReveal>
          </h2>
          <p className="text-sm text-white/55 mt-5 max-w-xs mx-auto font-light leading-relaxed">
            Every system built. Every problem solved. Every step forward.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative max-w-3xl mx-auto">

          {/* Vertical connector line — brighter */}
          <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.25) 20%, rgba(255,255,255,0.12) 50%, rgba(139,92,246,0.2) 80%, transparent)" }} />

          <div className="flex flex-col gap-12 lg:gap-16">
            {JOURNEY.map((item, idx) => {
              const accent = NODE_ACCENTS[idx % NODE_ACCENTS.length];
              return (
                <div
                  key={idx}
                  className="journey-node relative pl-16 md:pl-24 will-change-transform"
                >
                  {/* Node dot */}
                  <div className="absolute left-[11px] md:left-[20px] top-6">
                    <div className={`journey-dot-outer w-6 h-6 rounded-full border-2 border-current ${accent.dot} bg-[#020b1a] flex items-center justify-center`}
                      style={{ boxShadow: "0 0 14px currentColor" }}>
                      <div className={`journey-dot-inner w-2.5 h-2.5 rounded-full ${accent.dot}`} />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="journey-card group relative rounded-2xl p-7 md:p-8 overflow-hidden"
                    style={{
                      border: "1px solid rgba(255,255,255,0.09)",
                      backgroundColor: "rgba(255,255,255,0.025)",
                    }}
                  >
                    {/* Active spotlight layer — animated by GSAP */}
                    <div
                      className="journey-spotlight absolute inset-0 rounded-2xl pointer-events-none opacity-0"
                      style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent.glow}0.08) 0%, transparent 70%)` }}
                    />

                    {/* Top row: date badge + index */}
                    <div className="relative z-10 flex items-start justify-between gap-4 mb-5">
                      <span className={`inline-flex items-center text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border font-medium ${accent.badge}`}>
                        {item.time}
                      </span>
                      <span className="text-[10px] font-mono text-white/35 tracking-[0.3em] flex-shrink-0">
                        LOG_{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Org */}
                    <p className="relative z-10 text-[11px] font-mono text-white/50 uppercase tracking-[0.25em] mb-3">
                      {item.org}
                    </p>

                    {/* Title */}
                    <h3 className="relative z-10 text-xl md:text-2xl font-bold tracking-tight text-white mb-4 leading-snug">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="relative z-10 text-sm md:text-[0.95rem] text-white/72 leading-relaxed mb-5">
                      {item.summary}
                    </p>

                    {/* Bullets */}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="relative z-10 flex flex-col gap-2.5 mb-5">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-white/30 font-mono text-xs mt-0.5 flex-shrink-0">//</span>
                            <p className="text-sm text-white/75 leading-relaxed">{b}</p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono uppercase tracking-wider text-white/50 border border-white/[0.12] rounded-full px-3 py-1 bg-white/[0.03] hover:text-white/75 hover:border-white/25 transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
}

