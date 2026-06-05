"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/hooks";

interface PageFoldWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function PageFoldWrapper({ children, id, className }: PageFoldWrapperProps) {
  const shouldReduceMotion = useSafeReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  // Robust, hardware-accelerated entry animation compatible with all devices (laptops, mobile, tablets)
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number], // Premium easeOutQuart
      },
    },
  };

  return (
    <motion.div
      id={id}
      className={className || ""}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {/* Main Content Section */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
