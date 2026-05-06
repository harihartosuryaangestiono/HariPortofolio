"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "text-foreground bg-white/10 hover:bg-white/14 border-white/14 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]",
  secondary:
    "text-foreground bg-gradient-to-r from-violet-500/18 to-cyan-400/12 hover:from-violet-500/24 hover:to-cyan-400/18 border-white/14 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]",
  ghost:
    "text-foreground/90 hover:text-foreground bg-transparent hover:bg-white/6 border-white/10",
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  target,
  rel,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full border backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50";

  const Comp = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={onClick}
    >
      {children}
    </motion.span>
  );

  if (!href) return Comp;
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
      >
        {Comp}
      </a>
    );
  }

  return <Link href={href}>{Comp}</Link>;
}

