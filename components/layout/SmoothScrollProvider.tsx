"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "lenis/dist/lenis.css";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-accent-purple to-cyan-400 origin-left z-[100] pointer-events-none shadow-[0_0_12px_rgba(0,240,255,0.7)]"
    />
  );
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09, // Silky 60fps inertial momentum damping
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
        autoRaf: true,
      }}
    >
      <ScrollProgressBar />
      {children}
    </ReactLenis>
  );
}

