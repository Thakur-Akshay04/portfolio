"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/hooks";
import { getFadeIn } from "@/lib/variants";
import PageFoldWrapper from "@/components/layout/PageFoldWrapper";
import SectionHeading from "@/components/layout/SectionHeading";
import { TechIcon } from "@/components/sections/Skills";

interface TechCardItem {
  name: string;
  category: string;
}

const COLUMN_ONE_TECHS: TechCardItem[] = [
  { name: "React 19", category: "Frontend" },
  { name: "Next.js 16", category: "Full-Stack" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "FastAPI", category: "Backend" },
  { name: "Meta Llama-3", category: "AI Models" },
  { name: "HTML5", category: "Core Web" },
  { name: "CSS3", category: "Core Web" },
  { name: "JavaScript", category: "Language" },
];

const COLUMN_TWO_TECHS: TechCardItem[] = [
  { name: "Node.js", category: "Runtime" },
  { name: "Express.js", category: "Backend" },
  { name: "Spring Boot", category: "Architecture" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Cache / Queue" },
  { name: "MongoDB", category: "NoSQL" },
  { name: "Docker", category: "Containers" },
  { name: "AWS", category: "Cloud" },
  { name: "Git", category: "VCS" },
];

function FloatingTechStack() {
  const shouldReduceMotion = useSafeReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Duplicated arrays for seamless infinite vertical looping
  const col1Items = [...COLUMN_ONE_TECHS, ...COLUMN_ONE_TECHS];
  const col2Items = [...COLUMN_TWO_TECHS, ...COLUMN_TWO_TECHS];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[480px] sm:h-[540px] md:h-[580px] rounded-2xl bg-[#0d0d11]/90 border border-white/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.06)] overflow-hidden flex flex-col select-none backdrop-blur-sm"
    >
      {/* Top Header Strip */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.01] z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-purple" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-medium">
            Core Ecosystem
          </span>
        </div>
        <span className="font-mono text-[11px] text-neutral-400">
          Production Stack
        </span>
      </div>

      {/* Top & Bottom Gradient Fade Masks */}
      <div className="absolute inset-x-0 top-[53px] h-16 bg-gradient-to-b from-[#0d0d11] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0d11] to-transparent z-20 pointer-events-none" />

      {/* Dual Column Streaming Tracks */}
      <div className="flex-1 grid grid-cols-2 gap-4 px-5 py-4 overflow-hidden relative">
        {/* Column 1: Drifts Upwards */}
        <div className="relative overflow-hidden h-full">
          <motion.div
            animate={
              shouldReduceMotion || isHovered
                ? {}
                : { y: ["0%", "-50%"] }
            }
            transition={{
              ease: "linear",
              duration: 26,
              repeat: Infinity,
            }}
            className="flex flex-col gap-3.5"
          >
            {col1Items.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="group p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-accent-purple/40 transition-all duration-300 flex items-center gap-3 cursor-default shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform duration-200">
                  <TechIcon name={tech.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-display font-medium text-white group-hover:text-white truncate">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 truncate">
                    {tech.category}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 2: Drifts Downwards */}
        <div className="relative overflow-hidden h-full">
          <motion.div
            animate={
              shouldReduceMotion || isHovered
                ? {}
                : { y: ["-50%", "0%"] }
            }
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
            className="flex flex-col gap-3.5"
          >
            {col2Items.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="group p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-accent-purple/40 transition-all duration-300 flex items-center gap-3 cursor-default shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform duration-200">
                  <TechIcon name={tech.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-display font-medium text-white group-hover:text-white truncate">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 truncate">
                    {tech.category}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useSafeReducedMotion();

  const fadeInLeft = getFadeIn("left", 30)(shouldReduceMotion);
  const fadeInRight = getFadeIn("right", 30)(shouldReduceMotion);

  return (
    <PageFoldWrapper
      id="about"
      className="min-h-screen flex flex-col justify-center py-20 md:py-28 px-6 sm:px-10 lg:px-16 w-full max-w-7xl mx-auto"
    >
      {/* Reusable Section Heading */}
      <SectionHeading title="About Me" subtitle="▸ Introduction" />

      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full my-auto"
      >
        {/* Left Column: Shifted Text (Bio, Highlights, Status, Actions) */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col justify-center space-y-7 text-left"
        >
          {/* Confident, Human Editorial Headline */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-[1.2]">
            Engineering high-performance web systems with clean architecture and refined interfaces.
          </h3>

          {/* Narrative Paragraphs */}
          <div className="space-y-5 text-neutral-300 text-base sm:text-lg leading-relaxed font-sans">
            <p>
              I am a Full-stack / MERN developer focused on crafting clean user interfaces and highly efficient API architectures. I build responsive, modern web applications that prioritize performance, code clarity, and accessibility.
            </p>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              I am passionate about creating high-performance digital experiences, experimenting with modern web standards, and integrating intelligent AI features into full-stack systems. From low-latency backend services to intuitive client interactions, I strive for reliability and craft.
            </p>
          </div>

          {/* Direct page links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors"
            >
              <span>Explore Projects</span>
            </Link>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] text-white font-medium text-sm border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
            >
              <span>View Technical Skills</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Floating Techstack Occupying View-Height */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-5 w-full flex flex-col justify-center"
        >
          <FloatingTechStack />
        </motion.div>
      </div>
    </PageFoldWrapper>
  );
}
