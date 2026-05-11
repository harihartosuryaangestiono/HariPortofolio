"use client";

import { useRef } from "react";
import { Container } from "@/components/container";
import { SKILLS } from "@/lib/profile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".skill-card");

    // Reveal Content
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Reveal Cards
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, stagger: 0.1, duration: 1.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );

    // Background Parallax
    gsap.to(reactorRef.current, {
      y: 150,
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
    <section id="skills" ref={sectionRef} className="relative py-32 border-b border-white/5 bg-black overflow-hidden flex items-center justify-center min-h-[100svh] w-full">
      <div className="absolute inset-0 w-full h-full">
        {/* Reactor Room Effects */}
        <div ref={reactorRef} className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none transform-gpu will-change-transform z-0">
          <div className="reactor-ring-1 absolute w-full max-w-[1000px] aspect-square rounded-full border-[1px] border-cyan-500/10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] animate-[spin_60s_linear_infinite]" />
          <div className="reactor-ring-2 absolute w-full max-w-[800px] aspect-square rounded-full border-[1px] border-purple-500/10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] animate-[spin_40s_linear_infinite_reverse]" />
          <div className="reactor-glow absolute w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        </div>

        <Container className="relative z-10 h-full flex flex-col justify-center pt-20 pb-20">
          <div ref={contentRef} className="transform-gpu will-change-transform flex flex-col h-full justify-center">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center gap-2 rounded text-[10px] font-mono font-medium uppercase tracking-widest text-cyan-400 mb-6">
                <span className="h-2 w-2 bg-cyan-400 animate-pulse" />
                CORE_REACTOR.SYS
              </div>
              <h3 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
                Technology Engine
              </h3>
              <p className="text-lg text-white/50 font-light max-w-xl mx-auto">
                The processing units and architectural tools powering the HS Labs ecosystem.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-6xl mx-auto">
              {SKILLS.map((group, groupIdx) => (
                <div
                  key={group.group}
                  className="skill-card relative group rounded-3xl border border-white/10 bg-white/[0.01] p-8 hover:bg-white/[0.03] transition-all duration-500 overflow-hidden backdrop-blur-md transform-gpu will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Holographic label */}
                  <div className="text-[10px] font-mono tracking-widest text-cyan-500/50 mb-6 uppercase border-b border-white/5 pb-2 inline-block relative z-10">
                    MODULE :: {group.group}
                  </div>
                  
                  <ul className="flex flex-col gap-6 relative z-10">
                    {group.items.map((item, i) => (
                      <li
                        key={item.name}
                        className="flex flex-col gap-2 group/item"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white/70 group-hover/item:text-cyan-300 transition-colors drop-shadow-md">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-white/30 font-mono">
                            LVL {(item.level * 20).toString().padStart(2, '0')}
                          </span>
                        </div>
                        {/* Energy bar */}
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out"
                            style={{ width: `${item.level * 20}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

