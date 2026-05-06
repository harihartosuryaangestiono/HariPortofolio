"use client";

import { GitFork, Link, Mail } from "lucide-react";
import { Container } from "@/components/container";
import { SECTIONS } from "@/lib/sections";
import { PROFILE } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-12">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-tight">
              {PROFILE.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-7 text-white/62">
              Web App & System Developer — building premium, fast, and reliable
              digital products.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitFork className="h-4 w-4 text-white/70" />
              </a>
              <a
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Link className="h-4 w-4 text-white/70" />
              </a>
              <a
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
                href={`mailto:${PROFILE.email}`}
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-white/70" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-white/62 hover:text-white/85 transition-colors"
              >
                {s.label}
              </a>
            ))}
            <a
              href={PROFILE.cvUrl}
              className="text-sm text-white/62 hover:text-white/85 transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/45">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind, and motion.</p>
        </div>
      </Container>
    </footer>
  );
}

