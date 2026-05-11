"use client";

import { useState, useEffect } from "react";
import BubbleMenu, { type BubbleMenuItem } from "@/components/ui/bubble-menu";
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
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const NAV_ITEMS: BubbleMenuItem[] = [
  {
    label: "home",
    href: "#home",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#22d3ee", textColor: "#000000" },
  },
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
  {
    label: "skills",
    href: "#skills",
    ariaLabel: "Skills",
    rotation: -8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#000000" },
  },
  {
    label: "journey",
    href: "#journey",
    ariaLabel: "Journey",
    rotation: -8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: 8,
    hoverStyles: { bgColor: "#ec4899", textColor: "#ffffff" },
  },
];

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
        <BubbleMenu
          logo={
            <Image
              src="/logo.png"
              alt="HS Lab"
              width={36}
              height={36}
              className="rounded-md object-contain"
              priority
            />
          }
          items={NAV_ITEMS}
          menuAriaLabel="Toggle navigation"
          menuBg="#111111"
          menuContentColor="#ffffff"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
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
        
        <JourneySection />
        
        <BreathingSpace text="INITIATING_FINAL_SEQUENCE" color="emerald" />
        
        <ContactSection />
        
        <Footer />
      </div>
    </main>
  );
}
