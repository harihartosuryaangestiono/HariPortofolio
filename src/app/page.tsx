"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { SkillsSection } from "@/sections/skills";
import { ProjectsSection } from "@/sections/projects";
import { JourneySection } from "@/sections/journey";
import { ContactSection } from "@/sections/contact";
import { Footer } from "@/sections/footer";
import { BootSequence } from "@/components/animations/boot-sequence";
import { HeroAboutTransition, AboutProjectsTransition, BreathingSpace } from "@/sections/transitions";
import { CinematicTransition } from "@/components/transitions/cinematic-transition";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (!bootComplete) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [bootComplete]);

  return (
    <main className="min-h-screen bg-black">
      {!bootComplete && (
        <BootSequence onComplete={() => setBootComplete(true)} />
      )}
      
      {/* 
        Render main content immediately but visually hidden and non-interactive until boot completes.
        This allows GSAP and Lenis to accurately calculate the full layout height.
      */}
      <div className={`transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navbar />
        <HeroSection />
        
        <CinematicTransition type="descent">
          <HeroAboutTransition />
        </CinematicTransition>
        
        <AboutSection />
        
        <CinematicTransition type="hologram">
          <AboutProjectsTransition />
        </CinematicTransition>
        
        <ProjectsSection />
        
        <BreathingSpace text="ACCESSING_CORE_REACTOR" color="cyan" />
        
        <CinematicTransition type="default">
          <SkillsSection />
        </CinematicTransition>
        
        <BreathingSpace text="RETRIEVING_MEMORY_LOGS" color="purple" />
        
        <CinematicTransition type="dissolve">
          <JourneySection />
        </CinematicTransition>
        
        <BreathingSpace text="INITIATING_FINAL_SEQUENCE" color="emerald" />
        
        <ContactSection />
        
        <Footer />
      </div>
    </main>
  );
}
