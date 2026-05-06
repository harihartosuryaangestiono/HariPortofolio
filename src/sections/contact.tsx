"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Link, Mail, Send } from "lucide-react";
import { Container } from "@/components/container";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/button";
import { PROFILE } from "@/lib/profile";

type Status = "idle" | "loading" | "success" | "error";

type ContactApiResponse = { ok: true } | { ok: false; error?: string };

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const disabled = useMemo(() => {
    return (
      status === "loading" ||
      form.name.trim().length < 2 ||
      !form.email.includes("@") ||
      form.message.trim().length < 10
    );
  }, [form, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as
        | ContactApiResponse
        | null;

      if (!res.ok || !data || data.ok !== true) {
        throw new Error(
          (data && "error" in data ? data.error : undefined) ??
            "Something went wrong.",
        );
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message.");
    }
  }

  return (
    <Section id="contact">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build something that ships."
          description="Tell me what you're working on—I'll reply with clear next steps."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            onSubmit={onSubmit}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
                  className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/20"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-medium text-white/70">Email</span>
                <input
                  value={form.email}
                  onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                  className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/20"
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2">
              <span className="text-xs font-medium text-white/70">Message</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
                className="min-h-[140px] resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/18"
                placeholder="Tell me about the product, timeline, and constraints."
              />
            </label>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="submit"
                disabled={disabled}
                className="disabled:opacity-55 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                <Button variant="secondary" className="w-full sm:w-auto">
                  Send Message <Send className="h-4 w-4 text-white/70" />
                </Button>
              </button>

              <p className="text-xs text-white/55">
                Or email me at{" "}
                <a
                  className="text-white/75 hover:text-white underline decoration-white/20 underline-offset-4"
                  href={`mailto:${PROFILE.email}`}
                >
                  {PROFILE.email}
                </a>
              </p>
            </div>

            {status === "success" ? (
              <p className="mt-4 text-sm text-cyan-200/85">
                Message sent. I’ll reply soon.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 text-sm text-red-200/90">
                {error ?? "Failed to send message."}
              </p>
            ) : null}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.42, ease: "easeOut", delay: 0.05 }}
            className="lg:col-span-5 rounded-3xl border border-white/10 bg-gradient-to-b from-white/7 to-white/4 p-6 sm:p-8 backdrop-blur"
          >
            <p className="text-xs tracking-[0.22em] uppercase text-white/55">
              Social
            </p>
            <div className="mt-4 grid gap-3">
              <a
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/72 hover:bg-white/8 transition-colors"
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-3">
                  <GitFork className="h-4 w-4 text-white/70" /> GitHub
                </span>
                <span className="text-white/45">→</span>
              </a>
              <a
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/72 hover:bg-white/8 transition-colors"
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-3">
                  <Link className="h-4 w-4 text-white/70" /> LinkedIn
                </span>
                <span className="text-white/45">→</span>
              </a>
              <a
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/72 hover:bg-white/8 transition-colors"
                href={`mailto:${PROFILE.email}`}
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/70" /> Email
                </span>
                <span className="text-white/45">→</span>
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/55">Quick details</p>
              <p className="mt-2 text-sm text-white/75">
                {PROFILE.location}
              </p>
              <p className="mt-1 text-sm text-white/75">{PROFILE.phone}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

