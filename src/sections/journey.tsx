"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { Section, SectionHeader } from "@/components/section";
import { JOURNEY } from "@/lib/profile";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

export function JourneySection() {
  return (
    <Section id="journey">
      <Container>
        <SectionHeader
          eyebrow="Experience"
          title="A journey of shipping and learning."
          description="Freelance delivery, product thinking, and leadership—mapped as a timeline."
        />

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent"
          />

          <div className="grid gap-6">
            {JOURNEY.map((item, idx) => (
              <motion.article
                key={`${item.title}-${item.time}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.42, ease: "easeOut", delay: idx * 0.03 }}
                className="relative pl-10 sm:pl-12"
              >
                <div className="absolute left-[8px] sm:left-[12px] top-6 h-3 w-3 rounded-full bg-white/70 shadow-[0_0_0_8px_rgba(139,92,246,0.10)]" />
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 backdrop-blur">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/62">{item.org}</p>
                    </div>
                    <div className="text-xs font-medium text-white/55 tracking-wide">
                      {item.time}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {item.summary}
                  </p>

                  {item.bullets?.length ? (
                    <ul className="mt-4 grid gap-2 text-sm text-white/66">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35" />
                          <span className="leading-7">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {item.tags?.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

