"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/hooks";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const shouldReduceMotion = useSafeReducedMotion();

  // Clean any legacy bullet or arrow prefixes from subtitle
  const cleanSubtitle = subtitle ? subtitle.replace(/^[▸•\s\-_/]+/, "").trim() : "";

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-8 sm:mb-10 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
        {title}
      </h2>
      {cleanSubtitle && (
        <p className={`text-neutral-400 text-sm sm:text-base font-sans mt-3 max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>
          {cleanSubtitle}
        </p>
      )}
    </motion.div>
  );
}
