import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { SkillsSection } from "@/sections/skills";
import { ProjectsSection } from "@/sections/projects";
import { JourneySection } from "@/sections/journey";
import { ContactSection } from "@/sections/contact";
import { Footer } from "@/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
