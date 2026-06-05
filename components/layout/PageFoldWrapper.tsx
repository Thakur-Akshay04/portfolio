"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/hooks";

interface PageFoldWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function PageFoldWrapper({ children, id, className }: PageFoldWrapperProps) {
  const shouldReduceMotion = useSafeReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  // Safe and high-performance simplified animation for mobile/tablet screens
  const mobileVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Premium clipPath & blur reveal animation for desktop screens
  const containerVariants = {
    hidden: {
      opacity: 0.3,
      clipPath: "inset(0% 0% 100% 0%)",
      filter: "blur(8px)",
      y: 30,
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number], // Premium easeOutQuart
      },
    },
  };

  // Scanline sweep variant synchronized with the clipPath reveal
  const scanLineVariants = {
    hidden: {
      top: "0%",
      opacity: 0,
    },
    visible: {
      top: "100%",
      opacity: [0, 1, 1, 0], // Fades in quickly, stays bright during sweep, fades out at the bottom
      transition: {
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      },
    },
  };

  // Holographic grid overlay variant that dissolves as rendering completes
  const gridVariants = {
    hidden: {
      opacity: 0.25,
    },
    visible: {
      opacity: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      id={id}
      className={`${className || ""} relative overflow-hidden`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.05 : 0.15 }}
      variants={isMobile ? mobileVariants : containerVariants}
      style={{
        willChange: isMobile ? "transform, opacity" : "transform, opacity, clip-path, filter",
      }}
    >
      {/* Laser Scanline rendering sweep (Desktop only) */}
      {!isMobile && (
        <motion.div
          variants={scanLineVariants}
          className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(to right, transparent, var(--accent-purple, #9d4edd), #ffffff, var(--accent-purple, #9d4edd), transparent)",
            boxShadow: "0 0 12px var(--accent-purple, #9d4edd), 0 0 4px #ffffff",
            willChange: "top, opacity",
          }}
        />
      )}

      {/* Grid overlay that fades out as compiling completes (Desktop only) */}
      {!isMobile && (
        <motion.div
          variants={gridVariants}
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(rgba(157,78,221,0.12)_1px,transparent_1px)] bg-[size:16px_16px]"
          style={{
            willChange: "opacity",
          }}
        />
      )}

      {/* Main Content Section */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}


