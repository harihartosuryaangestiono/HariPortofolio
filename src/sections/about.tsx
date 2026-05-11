"use client";

import { useRef } from "react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ABOUT } from "@/lib/profile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ui/scroll-reveal";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".about-card");

    // Reveal Text
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        }
      }
    );

    // Reveal Cards
    gsap.fromTo(cards,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    // Background Parallax
    gsap.to(".about-bg-glow", {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-32 border-b border-white/5 bg-[#030712] flex items-center w-full min-h-[100svh]">
      <div className="absolute inset-0 w-full h-full">
        {/* Decorative gradient blur & Grid */}
        <div className="about-bg-glow absolute top-0 left-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <Container className="h-full flex items-center justify-center pt-20 pb-20">
          <div className="grid gap-16 lg:grid-cols-12 items-center relative z-10 w-full">
            <div
              ref={textRef}
              className="lg:col-span-5 transform-gpu will-change-transform"
            >
              <div className="inline-flex items-center gap-2 rounded text-[10px] font-mono font-medium uppercase tracking-widest text-cyan-400 mb-6">
                <span className="h-2 w-2 bg-cyan-400 animate-pulse" />
                IDENTITY_CHAMBER.SYS
              </div>
              
              <h3 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
                <ScrollReveal
                  blurStrength={4}
                  baseRotation={2}
                  baseOpacity={0.18}
                  stagger={0.07}
                  duration={1.0}
                  triggerStart="top 78%"
                >
                  Engineering with
                </ScrollReveal>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                  Precision.
                </span>
              </h3>
              
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/50 to-transparent mb-8" />
              
              <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
                {ABOUT.intro}
              </p>

              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 inline-block w-fit">Core Strengths</span>
                {ABOUT.strengths.map((str, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-[1px] w-6 bg-cyan-500/50" />
                    <span className="text-sm font-medium text-white/80">{str}</span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={cardsRef} className="lg:col-span-7 grid gap-4 sm:grid-cols-2 relative z-10">
              {ABOUT.focusAreas.map((area, idx) => (
                <div
                  key={area}
                  className="about-card group relative rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl hover:bg-black/60 hover:border-cyan-400/40 transition-all duration-500 overflow-hidden transform-gpu will-change-transform"
                >
                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent translate-y-[-100%] group-hover:animate-[scanline_2s_linear_infinite]" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]">
                        <span className="text-cyan-400 text-xs font-mono font-bold">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                      <span className="text-[10px] text-white/20 font-mono tracking-widest">OK</span>
                    </div>
                    <h4 className="text-white font-medium text-lg leading-snug group-hover:text-cyan-300 transition-colors">{area}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

