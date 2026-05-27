"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ==========================================
// 1. HERO -> ABOUT TRANSITION
// "Descending deeper into the HS Labs system"
// ==========================================
export function HeroAboutTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [debris, setDebris] = useState<Array<{left: number, top: number, width: number, height: number}>>([]);

  useEffect(() => {
    setDebris([...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1
    })));
  }, []);

  useGSAP(() => {
    if (debris.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Environmental fog thickens & world darkens
    tl.fromTo(".fog-layer", { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
    tl.fromTo(".darkness-layer", { opacity: 0 }, { opacity: 0.8, duration: 1 }, 0);
    
    // Floating objects drift upward
    tl.fromTo(".floating-debris", 
      { y: 100, opacity: 0 }, 
      { y: -200, opacity: 0.5, stagger: 0.1, duration: 1 }, 0
    );

    // Distant holographic structures emerge
    tl.fromTo(".holo-structure", 
      { scale: 0.8, opacity: 0, y: 50 }, 
      { scale: 1, opacity: 0.3, duration: 1, ease: "power2.out" }, 0.2
    );

  }, { scope: containerRef, dependencies: [debris], revertOnUpdate: true });

  return (
    <div ref={containerRef} className="relative h-[60svh] w-full bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="darkness-layer absolute inset-0 bg-black z-10" />
      <div className="fog-layer absolute inset-0 bg-gradient-to-b from-transparent via-[#020617] to-[#030712] z-20" />
      
      {/* Floating debris */}
      {debris.map((d, i) => (
        <div 
          key={i} 
          className="floating-debris absolute w-1 h-1 bg-cyan-400/40 rounded-full blur-[1px] z-30"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.width}px`,
            height: `${d.height}px`
          }}
        />
      ))}

      {/* Holographic Structures */}
      <div className="holo-structure absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border border-cyan-500/10 rounded-full rotate-45 z-0" />
      <div className="holo-structure absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] border border-blue-500/10 rounded-full -rotate-45 z-0" />

      <div className="relative z-40 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-24 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
        <span className="text-[9px] font-mono tracking-[0.5em] text-cyan-400 uppercase">Descending_Deeper</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
      </div>
    </div>
  );
}

// ==========================================
// 2. ABOUT -> PROJECTS TRANSITION
// "Unlocking the systems you have built"
// ==========================================
export function AboutProjectsTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Massive digital doors opening
    tl.to(".digital-door-left", { xPercent: -100, duration: 1, ease: "power2.inOut" }, 0);
    tl.to(".digital-door-right", { xPercent: 100, duration: 1, ease: "power2.inOut" }, 0);
    
    // Archive systems activating (light bursts)
    tl.fromTo(".archive-light", { scale: 0, opacity: 0 }, { scale: 2, opacity: 0.5, duration: 0.8 }, 0.2);
    
    // Data streams
    tl.fromTo(".data-stream", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 1 }, 0.3);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[80svh] w-full bg-[#030712] overflow-hidden flex items-center justify-center">
      {/* Doors */}
      <div className="digital-door-left absolute left-0 top-0 w-1/2 h-full bg-[#02040a] border-r border-cyan-500/20 z-30 flex items-center justify-end pr-4">
        <div className="h-32 w-[1px] bg-cyan-500/50" />
      </div>
      <div className="digital-door-right absolute right-0 top-0 w-1/2 h-full bg-[#02040a] border-l border-cyan-500/20 z-30 flex items-center justify-start pl-4">
        <div className="h-32 w-[1px] bg-cyan-500/50" />
      </div>

      {/* Internal Environment */}
      <div className="absolute inset-0 flex items-center justify-center z-10 flex-col gap-12">
        <div className="archive-light w-[400px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full absolute" />
        
        <div className="text-center relative z-20">
          <div className="inline-flex items-center gap-3 text-[10px] font-mono tracking-widest text-cyan-400 mb-4 opacity-70">
            <span className="w-4 h-[1px] bg-cyan-400" />
            SYSTEM_UNLOCK
            <span className="w-4 h-[1px] bg-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white/90">
            ARCHIVE_ACTIVATION
          </h2>
        </div>

        {/* Data Streams */}
        <div className="absolute inset-0 flex justify-evenly opacity-20 pointer-events-none z-0">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="data-stream w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. BREATHING SPACE (SCENE MOMENT)
// "Quiet moments before dramatic shifts"
// ==========================================
export function BreathingSpace({ text = "CALIBRATING...", color = "cyan" }: { text?: string, color?: "cyan" | "purple" | "emerald" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = {
    cyan: "text-cyan-500/30",
    purple: "text-purple-500/30",
    emerald: "text-emerald-500/30",
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".breathing-text", 
      { letterSpacing: "0.1em", opacity: 0 },
      { 
        letterSpacing: "0.5em", 
        opacity: 1, 
        duration: 2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[40svh] w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000_0%,transparent_50%,#000_100%)] z-10 pointer-events-none" />
      <span className={`breathing-text text-xs md:text-sm font-mono uppercase ${colors[color]} z-20`}>
        {text}
      </span>
    </div>
  );
}
