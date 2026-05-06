"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { Section, SectionHeader } from "@/components/section";
import { SKILLS } from "@/lib/profile";
import { cn } from "@/lib/utils";

function LevelDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i < level ? "bg-white/70" : "bg-white/18",
          )}
        />
      ))}
    </div>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeader
          eyebrow="Skills"
          title="Modern stack, production habits."
          description="A practical toolbox built from shipping real work—optimized for quality, speed, and reliability."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((g, idx) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.04 }}
              className={cn(
                "group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur",
                "hover:bg-white/7 transition-colors",
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold tracking-tight">
                  {g.group}
                </p>
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400/70 to-cyan-300/60 shadow-[0_0_0_8px_rgba(139,92,246,0.08)] opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="mt-5 grid gap-3">
                {g.items.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-white/78">{s.name}</p>
                      <LevelDots level={s.level} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

