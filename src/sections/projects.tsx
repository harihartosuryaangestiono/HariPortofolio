"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/container";
import { Section, SectionHeader } from "@/components/section";
import { PROJECTS, type ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";

type Filter = "all" | ProjectCategory;

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "web-apps", label: "Web Apps" },
  { id: "systems", label: "Systems" },
];

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          eyebrow="Projects"
          title="Realistic products, engineered for clarity."
          description="Selected work that showcases UI quality, system thinking, and an obsession with performance."
        />

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative h-10 rounded-full px-4 text-xs font-medium tracking-wide",
                  "border border-white/10 bg-white/5 hover:bg-white/8 transition-colors",
                  active ? "text-white" : "text-white/70",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/18 to-cyan-400/12"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : null}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <ProjectCard
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}

