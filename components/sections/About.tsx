"use client";

import { useRef, useState, useEffect } from "react";
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

  let parts: (string | JSX.Element)[] = [text];
  
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

import { TechLogo } from "@/components/sections/Projects";

// Static terminal lines definition to avoid useEffect dependency warnings
const ALL_STACK = [
  "React 19",
  "Next.js 14",
  "Node.js",
  "MongoDB",
  "TypeScript",
  "Tailwind CSS",
  "Docker",
  "Git & GitHub",
  "Express.js",
  "Nginx",
  "Jest Testing",
  "Supabase"
];

// Infinite scrolling marquee for a butter-smooth, seamless tech stack presentation with organic float wave
function FloatingTechDock() {
  return (
    <div className="relative w-full h-24 bg-[#050508]/80 border border-white/10 rounded-xl flex items-center overflow-hidden shadow-2xl">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.2rem_1.2rem] opacity-35 pointer-events-none" />

      {/* Fade masks for visual polish */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max shrink-0 overflow-hidden">
        {/* Track 1 */}
        <motion.div
          className="flex gap-8 items-center shrink-0 pr-8"
          animate={{ x: [0, "-100%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {ALL_STACK.map((name, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.25,
              }}
              className="flex items-center gap-3 select-none z-10 group cursor-default px-4 py-2 bg-black/40 border border-white/5 rounded-xl hover:border-accent-purple/45 transition-colors duration-300 shadow-md shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-black/60 border border-white/5 group-hover:border-accent-purple/30 flex items-center justify-center transition-all duration-300 shrink-0">
                <TechLogo name={name} className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors duration-300 font-medium whitespace-nowrap">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Track 2 (Duplicate for Seamless Loop) */}
        <motion.div
          className="flex gap-8 items-center shrink-0 pr-8"
          animate={{ x: [0, "-100%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {ALL_STACK.map((name, idx) => (
            <motion.div
              key={`dup-${idx}`}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.25,
              }}
              className="flex items-center gap-3 select-none z-10 group cursor-default px-4 py-2 bg-black/40 border border-white/5 rounded-xl hover:border-accent-purple/45 transition-colors duration-300 shadow-md shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-black/60 border border-white/5 group-hover:border-accent-purple/30 flex items-center justify-center transition-all duration-300 shrink-0">
                <TechLogo name={name} className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors duration-300 font-medium whitespace-nowrap">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
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
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
      >
        {/* Left Column - 3D Animated Star Sphere */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-5 flex justify-center lg:justify-start w-full relative"
        >
          <div className="w-full flex items-center justify-center select-none">
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
