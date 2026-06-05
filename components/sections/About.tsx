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

function AboutTechStack() {
  const allTech = TECH_CATEGORIES.flatMap(category => category.items);

  return (
    <div className="relative w-full bg-[#050508]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl overflow-hidden group">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-25 pointer-events-none" />

      <h4 className="text-xs font-mono text-accent-purple uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
        {"// Tech Stack"}
      </h4>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-3 relative z-10">
        {allTech.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: idx * 0.02
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(157, 78, 221, 0.4)",
              backgroundColor: "rgba(157, 78, 221, 0.05)",
              boxShadow: "0 0 15px rgba(157, 78, 221, 0.15)"
            }}
            className="flex flex-col items-center justify-center gap-2 p-3 bg-black/40 border border-white/5 rounded-xl transition-colors duration-300 group/item cursor-default"
          >
            <div className="w-7 h-7 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
              <TechIcon name={tech.name} className="w-full h-full" />
            </div>
            <span className="font-mono text-[9px] md:text-[10px] text-gray-400 group-hover/item:text-white transition-colors duration-300 text-center truncate w-full">
              {tech.name}
            </span>
          </motion.div>
        ))}
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

          {/* Responsive Tech Stack Grid */}
          <div className="pt-4">
            <AboutTechStack />
          </div>
        </motion.div>
      </div>
    </PageFoldWrapper>
  );
}
