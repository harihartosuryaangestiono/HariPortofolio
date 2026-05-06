"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  LayoutDashboard,
  Receipt,
  CreditCard,
  ScanSearch,
  Sigma,
  Code,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

export type ProjectCardLink = {
  label: "Live Demo" | "View Code" | "Case Study";
  href: string;
};

export type ProjectCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  features: Array<{
    label: string;
    icon:
      | "rbac"
      | "dashboard"
      | "sales"
      | "payments"
      | "smart-input"
      | "realtime-calc";
  }>;
  techStack: string[];
  links: ProjectCardLink[];
  categoryLabel?: string;
};

const FEATURE_ICON: Record<
  NonNullable<ProjectCardProps["features"]>[number]["icon"],
  React.ComponentType<{ className?: string }>
> = {
  rbac: ShieldCheck,
  dashboard: LayoutDashboard,
  sales: Receipt,
  payments: CreditCard,
  "smart-input": ScanSearch,
  "realtime-calc": Sigma,
};

function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/72",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ProjectCard({
  imageSrc,
  imageAlt,
  title,
  description,
  features,
  techStack,
  links,
  categoryLabel,
}: ProjectCardProps) {
  const live = links.find((l) => l.label === "Live Demo") ?? links[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
        "shadow-[0_14px_50px_-34px_rgba(0,0,0,0.65)]",
        "hover:shadow-[0_26px_70px_-40px_rgba(139,92,246,0.55)]",
      )}
    >
      {/* Click-anywhere live demo */}
      {live ? (
        <a
          href={live.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-[1]"
          aria-label={`Open ${title} live demo`}
        />
      ) : null}

      <motion.div
        className="relative z-[2]"
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority={false}
          />

          {/* Premium overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,10,16,0.92)] via-[rgba(7,10,16,0.22)] to-[rgba(7,10,16,0.10)]" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.22),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.16),transparent_40%)]"
          />

          <div className="absolute left-4 top-4 flex gap-2">
            {categoryLabel ? <Chip>{categoryLabel}</Chip> : null}
            <Chip className="hidden sm:inline-flex">
              <Code className="h-3.5 w-3.5 text-white/70" />
              Production-grade
            </Chip>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white">
              {title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-white/70 line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Key features */}
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 6).map((f) => {
              const Icon = FEATURE_ICON[f.icon];
              return (
                <Chip key={f.label}>
                  <Icon className="h-3.5 w-3.5 text-white/68" />
                  <span className="leading-5">{f.label}</span>
                </Chip>
              );
            })}
          </div>

          {/* Tech stack */}
          <div className="mt-4 rounded-xl border border-white/10 bg-white/4 p-3">
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/55">
              Tech stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {techStack.slice(0, 8).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/72"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div
            className={cn(
              "mt-5 flex flex-wrap items-center gap-2",
              "opacity-100 sm:opacity-80 sm:group-hover:opacity-100 transition-opacity",
            )}
          >
            {links.map((l) => (
              <div key={l.label} className="relative z-[3]">
                <Button
                  href={l.href}
                  variant={l.label === "Live Demo" ? "secondary" : "ghost"}
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto"
                >
                  {l.label}
                  {l.label === "Case Study" ? (
                    <FileText className="h-4 w-4 text-white/70" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-white/70" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

