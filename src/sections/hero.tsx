"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { PROFILE } from "@/lib/profile";

function GradientBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/22 via-fuchsia-400/10 to-cyan-300/18 blur-3xl"
        animate={{ y: [0, 16, 0], opacity: [0.9, 0.75, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-36 right-[10%] h-[420px] w-[680px] rounded-full bg-gradient-to-r from-cyan-400/14 to-violet-500/12 blur-3xl"
        animate={{ y: [0, -14, 0], opacity: [0.85, 0.7, 0.85] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_35%)] opacity-70" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative border-b border-white/8"
    >
      <GradientBackdrop />

      <Container className="relative">
        <div className="min-h-[88svh] pt-20 sm:pt-24 pb-14 md:pb-16 flex items-center">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_0_6px_rgba(34,211,238,0.08)]" />
                Available for freelance & collaborations
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.06]">
                <span className="text-white/70">Hi, I’m</span>{" "}
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  {PROFILE.name}
                </span>
                <span className="text-white/70">.</span>
              </h1>

              <p className="mt-4 text-lg sm:text-xl text-white/70 leading-8">
                <span className="text-white/88 font-medium">
                  {PROFILE.title}
                </span>{" "}
                — {PROFILE.tagline}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <Button href={PROFILE.navCtas.projects} variant="secondary">
                  View Projects <ArrowUpRight className="h-4 w-4 text-white/70" />
                </Button>
                <Button href={PROFILE.navCtas.contact} variant="primary">
                  Contact Me <Mail className="h-4 w-4 text-white/70" />
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl">
                {[
                  { k: "Focus", v: "Web Apps & Systems" },
                  { k: "Location", v: PROFILE.location },
                  { k: "Strength", v: "Fast, clean delivery" },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:bg-white/7 transition-colors"
                  >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/55">
                      {item.k}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/82">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-14 flex justify-center sm:justify-start">
              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-xs text-white/60 hover:text-white/80 transition-colors"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white/8 transition-colors">
                  <ArrowDown className="h-4 w-4" />
                </span>
                Scroll to explore
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

