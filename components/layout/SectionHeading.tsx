"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/hooks";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 md:mb-20 text-center"
    >
      <h2 className="text-xs font-mono tracking-[0.25em] text-accent-purple uppercase mb-3 drop-shadow-[0_0_8px_var(--accent-neon-glow)]">
        {subtitle}
      </h2>
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
        {title}
      </h3>
      <div className="w-16 h-[2px] bg-accent-purple mx-auto mt-4 shadow-[0_0_10px_var(--accent-neon-glow)]" />
    </motion.div>
  );
}
