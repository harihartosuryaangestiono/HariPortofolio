"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { Section, SectionHeader } from "@/components/section";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection() {
  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          eyebrow="Projects"
          title="Built products, stacked in motion."
          description="Scroll untuk melihat project berikutnya dengan efek stack yang menumpuk, seperti showcase premium."
        />

        <motion.div className="mt-8 space-y-8 pb-20">
          {PROJECTS.map((p, index) => (
            <ProjectCard
              key={p.slug}
              index={index}
              total={PROJECTS.length}
              imageSrc={p.imageSrc}
              imageAlt={`${p.name} preview`}
              title={p.name}
              description={p.description}
              categoryLabel={p.category === "systems" ? "System" : "Web App"}
              features={
                p.features ?? [
                  { label: "Production UX", icon: "dashboard" },
                  { label: "Scalable data", icon: "realtime-calc" },
                  { label: "Role-ready", icon: "rbac" },
                ]
              }
              techStack={p.tags}
              links={[
                { label: "Live Demo", href: p.liveUrl },
                ...(p.githubUrl ? [{ label: "View Code" as const, href: p.githubUrl }] : []),
                ...(p.caseStudyUrl ? [{ label: "Case Study" as const, href: p.caseStudyUrl }] : []),
              ]}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

