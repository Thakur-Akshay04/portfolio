"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/constants/data";
import { useSafeReducedMotion } from "@/lib/hooks";
import { getFadeIn } from "@/lib/variants";
import PageFoldWrapper from "@/components/layout/PageFoldWrapper";
import SectionHeading from "@/components/layout/SectionHeading";



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

function DeveloperIdentityHUD() {
  return (
    <div className="relative w-full rounded-2xl bg-[#08080c]/85 border border-white/10 p-6 md:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-cyan-500/35 transition-all duration-500">
      {/* Corner Bracket Accents */}
      <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/70 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-accent-purple/70 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-accent-purple/70 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/70 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent-purple/10 blur-3xl pointer-events-none group-hover:bg-accent-purple/20 transition-all duration-500" />

      {/* Header telemetry strip */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300 uppercase">
            SYS.CORE • ACTIVE
          </span>
        </div>
        <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 border border-white/5">
          HP, INDIA
        </span>
      </div>

      {/* Center Radar / Quantum Telemetry Core */}
      <div className="relative w-full py-4 flex flex-col items-center justify-center">
        <div className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
          {/* Outer ring with tick marks */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-spin" style={{ animationDuration: "30s" }} />
          {/* Middle ring */}
          <div className="absolute inset-3 rounded-full border border-accent-purple/30 animate-spin" style={{ animationDuration: "18s", animationDirection: "reverse" }} />
          {/* Inner ring */}
          <div className="absolute inset-7 rounded-full border border-cyan-400/40" />
          {/* Radar sweep beam */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none animate-spin" style={{ animationDuration: "6s" }}>
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/25 to-transparent origin-bottom-right" />
          </div>
          {/* Core Monogram */}
          <div className="relative z-10 w-14 h-14 rounded-xl bg-black/80 border border-cyan-400/50 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.35)]">
            <span className="font-display font-black text-lg text-white tracking-wider">AT</span>
            <span className="font-mono text-[8px] text-cyan-400 tracking-widest">DEV</span>
          </div>

          {/* Orbital Tags */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 border border-cyan-400/30 text-[9px] font-mono text-cyan-300 shadow-sm whitespace-nowrap">
            MERN STACK
          </div>
          <div className="absolute -bottom-1 left-0 px-2 py-0.5 rounded bg-black/80 border border-accent-purple/30 text-[9px] font-mono text-purple-300 shadow-sm whitespace-nowrap">
            NEXT.JS 16
          </div>
          <div className="absolute -bottom-1 right-0 px-2 py-0.5 rounded bg-black/80 border border-amber-400/30 text-[9px] font-mono text-amber-300 shadow-sm whitespace-nowrap">
            AI INTEGRATION
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/5 text-center">
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="text-xl font-bold font-display text-white">5+</div>
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tight mt-0.5">Projects</div>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="text-lg md:text-base lg:text-lg font-bold font-display text-accent-purple truncate">Full-Stack</div>
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tight mt-0.5">MERN Arch</div>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="text-xl font-bold font-display text-cyan-400">100%</div>
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tight mt-0.5">Responsive</div>
        </div>
      </div>

      {/* Console output snippet */}
      <div className="mt-4 p-3 rounded-lg bg-black/70 border border-white/5 font-mono text-[11px] leading-relaxed select-none">
        <div className="text-cyan-400/90 flex items-center gap-2 truncate">
          <span className="text-gray-500">&gt;</span>
          <span>stack: [&quot;React 19&quot;, &quot;Next.js&quot;, &quot;Node&quot;]</span>
        </div>
        <div className="text-purple-300/80 flex items-center gap-2 mt-1 truncate">
          <span className="text-gray-500">&gt;</span>
          <span>cloud: Cloudflare Workers + Serverless</span>
        </div>
        <div className="text-emerald-400/90 flex items-center gap-2 mt-1 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>status: Available for high-impact roles</span>
        </div>
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
      <SectionHeading title="About Me" subtitle="▸ Introduction" />

      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative"
      >
        {/* Left Column - Holographic Tech Identity HUD */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-5 w-full"
        >
          <DeveloperIdentityHUD />
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
