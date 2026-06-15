"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { PORTFOLIO_DATA } from "@/constants/data";
import { useSafeReducedMotion } from "@/lib/hooks";
import { getFadeIn } from "@/lib/variants";
import PageFoldWrapper from "@/components/layout/PageFoldWrapper";
import SectionHeading from "@/components/layout/SectionHeading";

const ConstellationSphere = dynamic(() => import("./ConstellationSphere"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[320px] md:min-h-[420px]" />,
});

// Text highlighter decorator helper
function renderHighlightedText(text: string) {
  const highlights = [
    "React, TypeScript, Node.js, and modern web technologies",
    "secure verification systems",
    "web performance and accessibility (a11y)",
    "pixel-perfect user interfaces",
    "scalable cloud-based solutions",
    "Full-stack / MERN developer",
    "highly efficient API architectures",
    "Agile team environments",
    "AI Resume Tailor",
    "CredVault"
  ];

  let parts: (string | React.ReactElement)[] = [text];
  
  highlights.forEach((phrase) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const index = part.indexOf(phrase);
      if (index === -1) return [part];
      
      const before = part.substring(0, index);
      const after = part.substring(index + phrase.length);
      return [
        before,
        <span key={phrase} className="text-white font-semibold drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]">{phrase}</span>,
        after
      ];
    });
  });

  return parts;
}

import { TECH_CATEGORIES, TechIcon } from "@/components/sections/Skills";

function FloatingTechDock() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allTech = TECH_CATEGORIES.flatMap(category => category.items);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 4) % allTech.length);
    }, 4500); // cycle every 4.5 seconds
    return () => clearInterval(timer);
  }, [allTech.length]);

  const currentItems = [
    allTech[currentIndex % allTech.length],
    allTech[(currentIndex + 1) % allTech.length],
    allTech[(currentIndex + 2) % allTech.length],
    allTech[(currentIndex + 3) % allTech.length]
  ];

  return (
    <div className="relative w-full h-28 md:h-32 lg:h-40 bg-[#050508]/80 border border-white/10 rounded-xl flex items-center justify-around px-6 overflow-hidden shadow-2xl">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.2rem_1.2rem] opacity-35 pointer-events-none" />

      {/* Vertical fade masks */}
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#050508] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#050508] to-transparent z-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full flex items-center justify-around shrink-0 z-10"
        >
          {currentItems.map((tech, idx) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1], // premium easeOutQuart
                    delay: idx * 0.08,
                  },
                },
                exit: {
                  opacity: 0,
                  y: -35,
                  transition: {
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: idx * 0.04,
                  },
                },
              }}
              className="flex flex-col items-center gap-2.5 select-none"
            >
              <div className="flex flex-col items-center gap-2.5 group cursor-default">
                {/* Glowing hover backdrop */}
                <div className="absolute w-12 h-12 rounded-full bg-accent-purple/5 group-hover:bg-accent-purple/15 blur-md transition-all duration-300 pointer-events-none -z-10" />

                {/* Interactive Logo container with 3D flip hover and physical tap feedback */}
                <motion.div
                  whileHover={{ scale: 1.15, rotateY: 360 }}
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  transition={{
                    rotateY: { duration: 0.65, ease: "easeInOut" },
                    scale: { type: "spring", stiffness: 400, damping: 15 }
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: 600 }}
                  className="w-14 h-14 rounded-xl bg-black/60 border border-white/5 hover:border-accent-purple/45 flex items-center justify-center shadow-lg transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-7 h-7">
                    <TechIcon name={tech.name} />
                  </div>
                </motion.div>
                <span className="hidden lg:block font-mono text-xs text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useSafeReducedMotion();

  const fadeIn = getFadeIn("up", 40)(shouldReduceMotion);
  const fadeInRight = getFadeIn("right", 40)(shouldReduceMotion);
  const fadeInLeft = getFadeIn("left", 40)(shouldReduceMotion);

  return (
    <PageFoldWrapper id="about" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
      {/* Reusable Section Heading with blur-to-clear entrance */}
      <SectionHeading title="About Me" subtitle="// Introduction" />

      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative"
      >
        {/* Left Column - 3D Animated Star Sphere */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute lg:relative inset-0 lg:inset-auto lg:col-span-5 flex justify-center lg:justify-start w-full h-full lg:h-auto -z-10 lg:z-0 opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
        >
          <div className="w-full h-full lg:h-auto flex items-center justify-center select-none">
            <ConstellationSphere />
          </div>
        </motion.div>

        {/* Right Column - Biography & Interactive Console */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col justify-between space-y-8"
        >
          <div className="space-y-6">
            {PORTFOLIO_DATA.personal.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeIn}
                className="text-gray-300 text-base md:text-lg leading-relaxed font-sans text-left"
              >
                {renderHighlightedText(paragraph)}
              </motion.p>
            ))}
          </div>

          {/* Floating animated tech stack dock */}
          <div className="pt-4">
            <FloatingTechDock />
          </div>
        </motion.div>
      </div>
    </PageFoldWrapper>
  );
}
