"use client";

import { useRef } from "react";
import { PROJECTS } from "@/lib/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const THEMES: Record<string, { bg: string, glow: string, particles: string, bgColor: string }> = {
  "terangi": {
    bg: "bg-transparent",
    bgColor: "#020617",
    glow: "drop-shadow-[0_0_80px_rgba(56,189,248,0.2)]",
    particles: "from-sky-400/20 to-transparent",
  },
  "sop-verification": {
    bg: "bg-transparent",
    bgColor: "#0b0a14",
    glow: "drop-shadow-[0_0_80px_rgba(129,140,248,0.2)]",
    particles: "from-indigo-400/20 to-transparent",
  },
  "ai-autocaption": {
    bg: "bg-transparent",
    bgColor: "#0f0717",
    glow: "drop-shadow-[0_0_80px_rgba(167,139,250,0.2)]",
    particles: "from-violet-400/20 to-transparent",
  },
  "plywood-trading": {
    bg: "bg-transparent",
    bgColor: "#020c09",
    glow: "drop-shadow-[0_0_80px_rgba(52,211,153,0.2)]",
    particles: "from-emerald-400/20 to-transparent",
  },
};

function ProjectEnvironment({ project, index }: { project: any, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const theme = THEMES[project.slug] || THEMES["terangi"];
  const isEven = index % 2 === 0;

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      }
    });

    // Simple parallax on scroll
    tl.fromTo(bgRef.current, { scale: 1, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 1 }, 0)
      .fromTo(visualRef.current, { y: 150, opacity: 0, filter: "blur(20px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 }, 0.2)
      .fromTo(contentRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.4);

    // Fade out when leaving
    const leaveTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });
    
    leaveTl.to(visualRef.current, { y: -150, opacity: 0, filter: "blur(20px)", duration: 1 }, 0)
           .to(contentRef.current, { y: -100, opacity: 0, duration: 1 }, 0)
           .to(bgRef.current, { opacity: 0, scale: 0.8, duration: 1 }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative min-h-[100svh] w-full flex items-center justify-center py-32 ${theme.bg}`}>
      <div className="absolute inset-0 w-full h-full">
        {/* Cinematic Environmental Effects */}
        <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform opacity-0">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[150px] bg-gradient-to-br ${theme.particles} mix-blend-screen`} />
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          <div className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Visual Showcase */}
            <div ref={visualRef} className="w-full lg:w-3/5 transform-gpu will-change-transform flex justify-center opacity-0">
              <div className={`relative w-full max-w-2xl aspect-square sm:aspect-video flex items-center justify-center p-8 transition-all duration-700 ${theme.glow} group`}>
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <img 
                  src={project.imageSrc} 
                  alt={project.name} 
                  className="w-full h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-1000 ease-out drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                />
                
                {/* Holographic scanning line */}
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-full h-2 bg-cyan-400/50 blur-[5px] animate-[scanline_3s_linear_infinite]" />
                </div>
              </div>
            </div>

            {/* Holographic Data Panel */}
            <div ref={contentRef} className={`w-full lg:w-2/5 flex flex-col transform-gpu will-change-transform opacity-0 ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
              <div className="inline-flex items-center gap-3 text-[10px] font-mono font-medium uppercase tracking-widest text-cyan-400 mb-8 w-fit opacity-80">
                <span className="h-px w-8 bg-cyan-400" />
                DIMENSION.{project.slug.toUpperCase()}
              </div>

              <h3 className={`text-5xl sm:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9] drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] ${isEven ? 'text-left' : 'text-right'}`}>
                {project.name}
              </h3>

              <p className={`text-xl text-white/50 mb-12 leading-relaxed font-light max-w-lg ${isEven ? 'text-left' : 'text-right'}`}>
                {project.description}
              </p>

              <div className={`grid gap-8 mb-12 w-full ${isEven ? 'justify-items-start text-left' : 'justify-items-end text-right'}`}>
                {project.problemSolved && (
                  <div className="relative max-w-sm">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2 opacity-70">Target Anomaly //</span>
                    <p className="text-base text-white/70 font-light">{project.problemSolved}</p>
                  </div>
                )}
                {project.impact && (
                  <div className="relative max-w-sm">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70 block mb-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">System Resolution //</span>
                    <p className="text-base text-white font-medium">{project.impact}</p>
                  </div>
                )}
              </div>

              <div className={`flex flex-wrap gap-3 mb-12 max-w-md ${isEven ? 'justify-start' : 'justify-end'}`}>
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-white/40 border border-white/10 rounded-full hover:text-cyan-300 hover:border-cyan-400/50 transition-colors duration-300 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-4 text-xs font-mono font-bold tracking-[0.2em] text-cyan-300 overflow-hidden w-fit py-2"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    INITIATE CONNECTION
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseProjects = PROJECTS.slice(0, 4);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline that animates the background color of the entire section
    // based on scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Generate color stops
    const colors = showcaseProjects.map(p => THEMES[p.slug]?.bgColor || "#020617");
    
    // Animate between colors evenly distributed across the scroll height
    colors.forEach((color, i) => {
      if (i === 0) return; // Skip first color as it's the start
      tl.to(sectionRef.current, { backgroundColor: color, duration: 1, ease: "none" });
    });

  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className="relative flex flex-col" style={{ backgroundColor: THEMES[showcaseProjects[0].slug]?.bgColor || "#020617" }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none z-0" />
      <div className="relative z-10">
        {showcaseProjects.map((project, idx) => (
          <ProjectEnvironment key={project.slug} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

