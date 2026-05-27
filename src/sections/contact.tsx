"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { GitFork, Link, Mail, Send } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { PROFILE } from "@/lib/profile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type Status = "idle" | "loading" | "success" | "error";

type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: string };

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-16 text-center relative z-10 contact-header transform-gpu will-change-transform">
      <div className="inline-flex items-center gap-2 rounded text-[10px] font-mono font-medium uppercase tracking-widest text-red-400 mb-6 border border-red-400/20 px-3 py-1 bg-red-400/5">
        <span className="h-1.5 w-1.5 bg-red-400 animate-pulse rounded-full" />
        {eyebrow}
      </div>
      <h3 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
        {title}
      </h3>
      <p className="mt-3 text-white/60 text-lg max-w-xl leading-relaxed mx-auto font-light">
        {description}
      </p>
    </div>
  );
}

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [particles, setParticles] = useState<Array<{left: number, top: number, duration: number}>>([]);
  
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 5
    })));
  }, []);

  useGSAP(() => {
    if (particles.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1,
      }
    });

    // 1. Initial state
    gsap.set(".final-text", { opacity: 0, scale: 0.8, filter: "blur(20px)" });
    gsap.set(".system-terminated", { opacity: 0 });

    // 2. Dissolve the interface
    tl.to(".contact-content", {
      y: -100,
      opacity: 0,
      filter: "blur(10px)",
      duration: 3,
      ease: "power2.inOut"
    }, 0);

    tl.to(".bg-glow", {
      opacity: 0,
      scale: 0.5,
      duration: 3,
      ease: "power2.inOut"
    }, 0);

    // Shut down particles/environment
    tl.to(".system-particle", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 2,
      ease: "power2.in"
    }, 0);

    // 3. Reveal "LET'S BUILD THE FUTURE TOGETHER"
    tl.to(".final-text", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 4,
      ease: "power2.out"
    }, 2);

    // 4. Fade everything to black and show SYSTEM TERMINATED
    tl.to(".final-text", {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      duration: 3,
      ease: "power2.in"
    }, 7);

    tl.to(".system-terminated", {
      opacity: 1,
      duration: 2,
      ease: "power2.out"
    }, 9);

  }, { scope: sectionRef, dependencies: [particles], revertOnUpdate: true });

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
    <section id="contact" ref={sectionRef} className="relative py-32 bg-[#020617] overflow-hidden h-[100svh] flex items-center justify-center">
      {/* Decorative gradient blur */}
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="bg-glow absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent z-0" />

      {/* Floating System Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <div 
            key={i} 
            className="system-particle absolute w-1 h-1 bg-indigo-400/30 rounded-full blur-[1px]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float-up ${p.duration}s linear infinite`
            }}
          />
        ))}
      </div>

      <Container className="relative z-10 w-full h-full flex flex-col justify-center">
        <div className="contact-content w-full">
          <SectionHeader
            eyebrow="FINAL TRANSMISSION"
            title="LET'S BUILD THE FUTURE."
            description="Initiate a secure connection to discuss digital systems, operational solutions, or futuristic web applications."
          />

          <div className="grid gap-8 lg:grid-cols-12 max-w-5xl mx-auto">
            <form
              onSubmit={onSubmit}
              className="lg:col-span-7 rounded-3xl border border-white/5 bg-black/40 p-8 sm:p-10 backdrop-blur-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="grid gap-6 sm:grid-cols-2 relative z-10">
                <label className="grid gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Sender_Identity</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
                    className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-400/50 transition-all font-mono"
                    placeholder="name"
                    autoComplete="name"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Comms_Relay</span>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                    className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-400/50 transition-all font-mono"
                    placeholder="email@network.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <label className="mt-6 grid gap-2 relative z-10">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Encrypted_Payload</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
                  className="min-h-[160px] resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-400/50 transition-all font-mono"
                  placeholder="Enter system requirements..."
                />
              </label>

              <div className="mt-8 relative z-10">
                <button
                  type="submit"
                  disabled={disabled}
                  className="w-full relative group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-2 h-12 w-full rounded-xl bg-black border border-indigo-500/50 text-indigo-300 font-mono text-xs tracking-widest transition-colors hover:bg-indigo-500/10">
                    {status === "loading" ? "TRANSMITTING..." : "TRANSMIT DATA"}
                    <Send className="h-3 w-3" />
                  </div>
                </button>
              </div>

              {status === "success" && (
                <p className="mt-6 text-xs font-mono text-cyan-400 text-center relative z-10">
                  [SYSTEM]: Transmission successful. Awaiting response.
                </p>
              )}
              {status === "error" && (
                <p className="mt-6 text-xs font-mono text-red-400 text-center relative z-10">
                  [ERROR]: {error ?? "Transmission failed. Signal lost."}
                </p>
              )}
            </form>

            <div className="lg:col-span-5 rounded-3xl border border-white/5 bg-white/[0.01] p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[50px] pointer-events-none" />

              <div className="relative z-10">
                <h4 className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase mb-8 border-b border-white/10 pb-2">
                  External Relays
                </h4>
                <div className="grid gap-4">
                  {[
                    { icon: GitFork, label: "GitHub.Node", href: PROFILE.socials.github },
                    { icon: Link, label: "LinkedIn.Net", href: PROFILE.socials.linkedin },
                    { icon: Mail, label: "Direct.Comm", href: `mailto:${PROFILE.email}` },
                    { icon: Send, label: "Secure.Chat", href: PROFILE.socials.whatsapp },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-5 py-4 transition-all hover:bg-white/10 hover:border-indigo-500/30"
                    >
                      <span className="flex items-center gap-4 text-xs font-mono text-white/60 group-hover:text-white transition-colors">
                        <item.icon className="h-4 w-4 text-indigo-400/50 group-hover:text-indigo-400 transition-colors" /> 
                        {item.label}
                      </span>
                      <span className="text-white/20 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">→</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-12 rounded-xl border border-white/5 bg-black/40 p-6 relative z-10">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4">Current Coordinates</p>
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-indigo-500"></span>
                  </div>
                  <p className="text-xs font-mono text-white/80">
                    {PROFILE.location} // ONLINE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Cinematic End Texts */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col z-20">
        <h2 className="final-text opacity-0 scale-90 blur-xl text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter text-white text-center leading-[0.9] w-full max-w-[80vw]">
          LET'S BUILD THE FUTURE TOGETHER
        </h2>
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 bg-black/80 system-terminated opacity-0">
        <div className="text-red-500 font-mono text-sm sm:text-xl tracking-[0.5em] flex items-center gap-4 border border-red-500/20 bg-red-500/10 px-8 py-4 rounded">
          <span className="h-2 w-2 bg-red-500 animate-pulse" />
          HS LABS SYSTEM TERMINATED
        </div>
      </div>
    </section>
  );
}

