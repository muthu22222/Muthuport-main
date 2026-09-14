import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto mb-16 max-w-3xl text-center"
    >
      {/* Eyebrow Capsule */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#881144]/25 dark:border-[#881144]/40 bg-[#881144]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#881144] dark:text-[#ec8298] shadow-[0_0_15px_rgba(136,17,68,0.15)] dark:shadow-[0_0_15px_rgba(136,17,68,0.2)] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#881144] dark:bg-[#ec8298] shadow-[0_0_6px_rgba(136,17,68,0.8)] dark:shadow-[0_0_6px_rgba(236,130,152,0.9)] animate-pulse" />
        <span>{eyebrow}</span>
      </div>

      {/* Main Section Title */}
      <h2 className="font-display text-3xl font-bold tracking-tight text-[#22060f] dark:text-white sm:text-4xl lg:text-5xl leading-[1.15]">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {/* Subtle Ambient Section Glow Center */}
      <div className="absolute left-1/2 -top-8 -translate-x-1/2 h-20 w-48 rounded-full bg-[#881144]/10 dark:bg-[#881144]/20 blur-3xl pointer-events-none -z-10" />
    </motion.div>
  );
}