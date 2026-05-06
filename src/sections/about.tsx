"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { Section, SectionHeader } from "@/components/section";
import { ABOUT } from "@/lib/profile";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/72">
      {children}
    </span>
  );
}

export function AboutSection() {
  return (
    <Section id="about" className="border-t-0">
      <Container>
        <SectionHeader
          eyebrow="About"
          title="Builder mindset, systems clarity."
          description="A short snapshot of how I work and what I focus on."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur"
          >
            <p className="text-sm sm:text-base leading-8 text-white/72">
              {ABOUT.intro}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {ABOUT.focusAreas.map((x) => (
                <Chip key={x}>{x}</Chip>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className="lg:col-span-5 rounded-3xl border border-white/10 bg-gradient-to-b from-white/7 to-white/4 p-6 sm:p-8 backdrop-blur"
          >
            <p className="text-xs tracking-[0.22em] uppercase text-white/55">
              Strengths
            </p>
            <ul className="mt-4 grid gap-3">
              {ABOUT.strengths.map((s) => (
                <li
                  key={s}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/72"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

