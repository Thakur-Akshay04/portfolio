"use client";

import React, { useState } from "react";
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
      className="relative w-full h-[370px] sm:h-[410px] md:h-[450px] lg:h-[475px] xl:h-[480px] rounded-2xl bg-[#0d0d11]/90 border border-white/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.06)] overflow-hidden flex flex-col select-none backdrop-blur-sm"
    >
      {/* Top Header Strip */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.01] z-30">
        <div className="flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-accent-purple" />

          <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-medium">
            Tech Stack
          </span>
        </div>
        <span className="font-mono text-[11px] text-neutral-400">
          Tools &amp; Frameworks
        </span>
      </div>

      {/* Top & Bottom Gradient Fade Masks */}
      <div className="absolute inset-x-0 top-[45px] h-12 bg-gradient-to-b from-[#0d0d11] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d0d11] to-transparent z-20 pointer-events-none" />

      {/* Dual Column Streaming Tracks */}
      <div className="flex-1 grid grid-cols-2 gap-3.5 px-3.5 py-3 overflow-hidden relative">
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
            className="flex flex-col gap-2.5 sm:gap-3"
          >
            {col1Items.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="group p-2.5 sm:p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-accent-purple/40 transition-all duration-300 flex items-center gap-2.5 cursor-default shadow-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center shrink-0 p-1 group-hover:scale-105 transition-transform duration-200">
                  <TechIcon name={tech.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-[13px] font-display font-medium text-white group-hover:text-white truncate">
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
            className="flex flex-col gap-2.5 sm:gap-3"
          >
            {col2Items.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="group p-2.5 sm:p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-accent-purple/40 transition-all duration-300 flex items-center gap-2.5 cursor-default shadow-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center shrink-0 p-1 group-hover:scale-105 transition-transform duration-200">
                  <TechIcon name={tech.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-[13px] font-display font-medium text-white group-hover:text-white truncate">
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
  const shouldReduceMotion = useSafeReducedMotion();

  const fadeInLeft = getFadeIn("left", 30)(shouldReduceMotion);
  const fadeInRight = getFadeIn("right", 30)(shouldReduceMotion);

  return (
    <PageFoldWrapper
      id="about"
      className="flex flex-col justify-center flex-1 py-3 sm:py-5 lg:py-6 px-6 sm:px-10 lg:px-16 w-full max-w-7xl mx-auto my-auto"
    >
      {/* Reusable Section Heading - shifted slightly up for optimal vertical balance */}
      <SectionHeading
        title="About Me"
        subtitle="Introduction & Core Focus"
        className="-translate-y-1.5 sm:-translate-y-2.5 lg:-translate-y-3 mb-3 sm:mb-4 lg:mb-4"
      />

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full"
      >
        {/* Left Column: Shifted Text (Bio, Highlights, Status, Actions) */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 text-left"
        >
          {/* Confident, Human Editorial Headline */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight leading-[1.2]">
            Engineering high-performance web systems with clean architecture and refined interfaces.
          </h3>

          {/* Narrative Paragraphs */}
          <div className="space-y-3 text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              I am a Full-stack / MERN developer focused on crafting clean user interfaces and highly efficient API architectures. I build responsive, modern web applications that prioritize performance, code clarity, and accessibility.
            </p>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              I am passionate about creating high-performance digital experiences, experimenting with modern web standards, and integrating intelligent AI features into full-stack systems. From low-latency backend services to intuitive client interactions, I strive for reliability and craft.
            </p>
          </div>

          {/* Direct page links */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1 sm:pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-colors"
            >
              <span>Explore Projects</span>
            </Link>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-white/[0.04] text-white font-medium text-xs sm:text-sm border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
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
