"use client";

import { useRef } from "react";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { PROFILE } from "@/lib/profile";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function GradientBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="hero-glow absolute top-[20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-[100px]" />
      <div className="hero-grid absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial ambient animations
    gsap.to(".hero-glow", {
      y: 20,
      opacity: 0.8,
      scale: 1.05,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".scroll-dot", {
      y: 24,
      duration: 1.5,
      repeat: -1,
      ease: "power2.inOut",
      yoyo: true
    });

    // Pinned cinematic scroll sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.5,
      }
    });

    // Forward Camera Push Illusion
    tl.to(contentRef.current, {
      scale: 2,
      opacity: 0,
      z: 500,
      filter: "blur(8px)",
      ease: "power2.in"
    }, 0);

    tl.to(".hero-glow", {
      scale: 2,
      opacity: 0,
      ease: "none"
    }, 0);

    tl.to(".hero-grid", {
      z: 500,
      scale: 1.5,
      opacity: 0,
      ease: "none"
    }, 0);

    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: 50,
      ease: "power1.inOut"
    }, 0);

  }, { scope: sectionRef });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-black flex items-center justify-center border-b border-white/5 w-full"
    >
      <div className="absolute inset-0 w-full h-full" style={{ perspective: "1000px" }}>
        <AnimatedBackground />
        <GradientBackdrop />

        <Container className="relative z-10 h-full flex flex-col justify-center">
          <div
            ref={contentRef}
            className="w-full flex flex-col items-center text-center mt-[-5svh] transform-gpu will-change-transform"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 text-xs font-mono font-medium text-cyan-300 backdrop-blur-md mb-8">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
              SYSTEM_ONLINE :: {PROFILE.brand}
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-[1.0] mb-6">
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent drop-shadow-sm">
                {PROFILE.name}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-cyan-50 mb-6 tracking-wide drop-shadow-md">
              {PROFILE.title}
            </p>

            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              {PROFILE.tagline}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:items-center justify-center">
              <Button href={PROFILE.navCtas.projects} variant="primary" className="shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 border-none px-8 py-6 text-sm font-bold tracking-wider">
                INITIALIZE PROJECTS <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
              <Button href={PROFILE.navCtas.contact} variant="secondary" className="border-white/20 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 px-8 py-6 text-sm font-bold tracking-wider bg-black/50 backdrop-blur-md">
                ESTABLISH UPLINK <Mail className="h-4 w-4 ml-2" />
              </Button>
              {/* ── Download CV — holographic glassmorphic button ── */}
              <a
                href={PROFILE.cvUrl}
                download="Hariharto_Surya_CV.pdf"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/22 bg-white/[0.05] px-8 py-[0.875rem] text-sm font-bold tracking-wider text-white/75 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/45 hover:bg-white/[0.09] hover:text-white hover:shadow-[0_0_32px_rgba(34,211,238,0.18)] hover:-translate-y-[2px] active:scale-95 cursor-pointer select-none"
              >
                {/* Shimmer sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)" }}
                />
                {/* Subtle top-edge glow line */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-[20%] right-[20%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent)" }}
                />
                <Download className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-[1px]" />
                <span className="relative z-10">ACCESS RESUME</span>
              </a>
            </div>
          </div>

          <div 
            ref={scrollIndicatorRef}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-1000 delay-1000 fill-mode-both"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-500/80 font-bold">
              SCROLL TO EXPLORE
            </span>
            <div className="flex h-16 w-8 items-start justify-center rounded-full border border-white/20 p-1.5 transition-colors hover:border-cyan-400/80 backdrop-blur-sm">
              <div className="scroll-dot h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

