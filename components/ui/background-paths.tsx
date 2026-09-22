"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FloatingPathsProps {
  position: number;
  count?: number;
  className?: string;
}

export function FloatingPaths({ position, count = 36, className = "" }: FloatingPathsProps) {
  const shouldReduceMotion = useReducedMotion();

  // Memoize path definitions with deterministic spread to prevent SSR hydration mismatch
  // and eliminate GC memory churn on re-renders
  const paths = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Deterministic duration between 18s and 28s based on index & position
      const deterministicDuration = 18 + ((i * 7 + (position > 0 ? 3 : 11)) % 11);

      return {
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.8 + i * 0.04,
        duration: deterministicDuration,
        // Increased visibility for dark backgrounds:
        strokeOpacity: 0.2 + (i % 8) * 0.07,
      };
    });
  }, [position, count]);

  return (
    <div className={`absolute inset-0 pointer-events-none transform-gpu overflow-hidden ${className}`}>
      <svg
        className="w-full h-full text-white/60 dark:text-white/70"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.strokeOpacity}
            initial={{ pathLength: 0.3, opacity: 0.7 }}
            animate={
              shouldReduceMotion
                ? { pathLength: 1, opacity: 0.5 }
                : {
                    pathLength: 1,
                    opacity: [0.35, 0.85, 0.35],
                    pathOffset: [0, 1, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: path.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }
            }
          />
        ))}
      </svg>
    </div>
  );
}

export default FloatingPaths;
