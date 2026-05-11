"use client";

import { useRef } from "react";
import { Container } from "@/components/container";
import { JOURNEY } from "@/lib/profile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const memories = gsap.utils.toArray<HTMLElement>(".memory-node");
    
    // Fade in and float up each memory as user naturally scrolls
    memories.forEach((memory) => {
      gsap.fromTo(memory, 
        { opacity: 0, y: 100, filter: "blur(20px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: memory,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section id="journey" ref={sectionRef} className="relative bg-[#020617] overflow-hidden w-full py-40 border-b border-white/5">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-40">
          <div className="inline-flex items-center justify-center gap-2 rounded text-[10px] font-mono font-medium uppercase tracking-widest text-cyan-400 mb-6 border border-cyan-400/20 px-3 py-1 bg-cyan-400/5">
            <span className="h-2 w-2 bg-cyan-400 animate-pulse rounded-full" />
            SYSTEM_EVOLUTION.LOG
          </div>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Digital Archive
          </h3>
        </div>

        <div className="flex flex-col gap-40 relative">
          {/* Subtle vertical connection line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent md:-translate-x-1/2" />

          {JOURNEY.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className="memory-node relative w-full flex items-center justify-center transform-gpu will-change-transform group">
                <div className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 w-full ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Holographic Datapoint */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                     <div className={`relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full flex items-center justify-center ${isLeft ? 'md:mr-10' : 'md:ml-10'}`}>
                       {/* Floating UI elements instead of a solid border */}
                       <div className="absolute w-full h-full rounded-full border-[1px] border-cyan-400/20 border-dashed animate-[spin_30s_linear_infinite]" />
                       <div className="absolute w-[80%] h-[80%] rounded-full border-[2px] border-blue-500/10 border-dotted animate-[spin_20s_linear_infinite_reverse]" />
                       <div className="absolute w-[60%] h-[60%] rounded-full bg-cyan-500/5 blur-[30px] group-hover:bg-cyan-400/10 transition-colors duration-1000" />
                       
                       <div className="absolute inset-0 flex items-center justify-center flex-col text-center z-10 transform transition-transform duration-1000 group-hover:scale-110">
                         <span className="block text-5xl md:text-7xl font-mono text-white font-bold mb-2 tracking-tighter group-hover:text-cyan-300 transition-colors">{item.time.split(' ')[0]}</span>
                         <span className="block text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-cyan-500/80">{item.org}</span>
                       </div>
                       
                       {/* Center glowing connection point */}
                       <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-cyan-400 rounded-full z-20 ${isLeft ? 'right-[-4.5rem] md:-right-[3.5rem]' : 'left-[-4.5rem] md:-left-[3.5rem]'} hidden md:block shadow-[0_0_15px_rgba(34,211,238,0.5)]`}>
                          <div className="absolute inset-1 rounded-full bg-cyan-400 animate-pulse" />
                       </div>
                     </div>
                  </div>

                  {/* Text Information */}
                  <div className={`w-full md:w-1/2 flex flex-col pl-[60px] md:pl-0 ${isLeft ? 'items-start text-left' : 'items-end text-right'}`}>
                    <div className="inline-flex items-center gap-4 mb-6">
                      <span className="h-px w-12 bg-cyan-400/50" />
                      <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-cyan-400/80">MEMORY_LOG_{idx.toString().padStart(2, '0')}</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight group-hover:text-cyan-50 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-base md:text-lg text-white/50 font-light leading-relaxed mb-8">
                      {item.summary}
                    </p>
                    
                    {item.bullets && (
                      <div className={`flex flex-col gap-4 mb-8 w-full ${isLeft ? 'items-start text-left' : 'items-end text-right'}`}>
                        {item.bullets.map((b, i) => (
                          <div key={i} className={`flex items-start gap-4 ${isLeft ? '' : 'flex-row-reverse'}`}>
                            <span className="text-cyan-500 font-mono text-sm mt-1 opacity-60">{'//'}</span>
                            <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">{b}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-start' : 'justify-end'}`}>
                      {item.tags?.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono uppercase tracking-widest text-white/40 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

