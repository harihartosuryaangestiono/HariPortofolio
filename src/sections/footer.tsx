"use client";

import { GitFork, Link, Mail } from "lucide-react";
import { Container } from "@/components/container";
import { SECTIONS } from "@/lib/sections";
import { PROFILE } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-12 relative bg-background overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-[300px] bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight text-white mb-2">
              {PROFILE.brand}
            </p>
            <p className="max-w-sm text-sm leading-7 text-white/60 font-light">
              Digital Systems Architect — building premium, scalable, and resilient
              digital products for real-world solutions.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-white/70 hover:text-cyan-400"
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitFork className="h-4 w-4" />
              </a>
              <a
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-white/70 hover:text-cyan-400"
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Link className="h-4 w-4" />
              </a>
              <a
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-white/70 hover:text-cyan-400"
                href={`mailto:${PROFILE.email}`}
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm font-medium text-white/60 hover:text-cyan-400 transition-colors"
              >
                {s.label}
              </a>
            ))}
            <a
              href={PROFILE.cvUrl}
              className="text-sm font-medium text-white/60 hover:text-cyan-400 transition-colors col-span-2"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {PROFILE.name} ({PROFILE.brand}). All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed & Built with 
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Next.js & Motion
          </p>
        </div>
      </Container>
    </footer>
  );
}

