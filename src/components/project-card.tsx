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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  index?: number;
  total?: number;
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
  index = 0,
  total = 1,
}: ProjectCardProps) {
  const live = links.find((l) => l.label === "Live Demo") ?? links[0];
  const stackDepth = Math.max(total - index - 1, 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      style={{
        top: `${88 + index * 20}px`,
        zIndex: index + 1,
      }}
      className={cn(
        "group sticky overflow-hidden rounded-3xl border border-white/15 bg-[#06080f] backdrop-blur",
        "shadow-[0_26px_70px_-40px_rgba(0,0,0,0.95)] ring-1 ring-white/5",
      )}
    >
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
        className="relative z-[2] grid min-h-[320px] md:min-h-[420px] md:grid-cols-[1fr_300px]"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
      >
        <div className="relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 to-transparent" />
        </div>

        <div className="relative flex flex-col justify-between border-t border-white/10 bg-gradient-to-b from-white/[0.10] to-white/[0.06] p-5 md:border-l md:border-t-0 md:p-6">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-white/55">
              PROJECT {(index + 1).toString().padStart(2, "0")}
            </p>
            <h3 className="mt-2 line-clamp-2 text-2xl font-semibold tracking-tight text-white">
              {title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/78">{description}</p>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Stack</p>
            <div className="mt-2 space-y-1">
              {[...techStack, ...(categoryLabel ? [categoryLabel] : [])].slice(0, 6).map((item) => (
                <p key={item} className="text-base leading-6 text-white/92">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-end justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 2).map((f) => {
                const Icon = FEATURE_ICON[f.icon];
                return (
                  <Chip key={f.label} className="bg-white/10">
                    <Icon className="h-3.5 w-3.5 text-white/80" />
                    {f.label}
                  </Chip>
                );
              })}
            </div>
            {live ? (
              <a
                href={live.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex items-center gap-1 whitespace-nowrap text-sm text-white/90 hover:text-white"
              >
                Live Project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl border border-white/20"
        initial={false}
        whileInView={{ opacity: 1 - stackDepth * 0.16 }}
      />
    </motion.article>
  );
}

