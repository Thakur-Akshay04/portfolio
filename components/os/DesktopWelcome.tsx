"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useWindowManager } from "@/context/WindowManagerContext";

const ORIGINAL_NAME = "Akshay Singh Thakur";
const GLYPHS = "<>/[]{}—=+*^?#_01~!";

const TECH_PHRASES = [
  "Full-Stack / MERN Developer",
  "Building High-Performance Web Applications",
  "Designing Modern Cloud & API Architectures",
  "Integrating Intelligent AI Workflows (Llama-3, FastAPI)",
  "Specializing in Next.js, React, Node.js & pgvector",
];

const SKILL_TAGS = [
  "Next.js",
  "React",
  "Node.js",
  "FastAPI",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AI & LLMs",
];

export default function DesktopWelcome() {
  const { isDesktopActive } = useWindowManager();

  // Name scramble state
  const [displayText, setDisplayText] = useState(ORIGINAL_NAME);
  const [isScrambling, setIsScrambling] = useState(false);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter phrase state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Interactive Hacker Scramble Decrypt Animation
  const triggerScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

    let iteration = 0;
    const totalIterations = ORIGINAL_NAME.length * 2.5;

    scrambleIntervalRef.current = setInterval(() => {
      setDisplayText(() =>
        ORIGINAL_NAME.split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2.5) {
              return ORIGINAL_NAME[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= totalIterations) {
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        setDisplayText(ORIGINAL_NAME);
        setIsScrambling(false);
      }

      iteration += 1;
    }, 28);
  }, [isScrambling]);

  // Initial scramble on mount
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      triggerScramble();
    }, 400);

    return () => {
      clearTimeout(initialTimer);
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    };
  }, [triggerScramble]);

  // Typewriter effect for terminal subtitle
  useEffect(() => {
    const currentPhrase = TECH_PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 22 : 48;

    if (!isDeleting && displayedPhrase === currentPhrase) {
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2300);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && displayedPhrase === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TECH_PHRASES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedPhrase((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedPhrase, isDeleting, phraseIndex]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center select-none transition-opacity duration-700 ${
        isDesktopActive ? "opacity-100" : "opacity-20 hover:opacity-80"
      } pl-24 sm:pl-32 md:pl-48 lg:pl-0 pb-12`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-4 max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Tech Professional Command Prompt Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.18)] mb-3 font-mono text-[11px] sm:text-xs text-zinc-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-zinc-400">akshay@dev-os</span>
          <span className="text-cyan-400 font-bold">:~#</span>
          <span className="text-emerald-300 font-medium">whoami</span>
          <span className="text-zinc-600">|</span>
          <span className="text-cyan-400/90 hidden sm:inline">FULL-STACK ENGINEER</span>
        </motion.div>

        {/* Interactive Name with Decrypt Scramble Effect */}
        <div
          className="relative group cursor-pointer pointer-events-auto py-2 px-4"
          onMouseEnter={triggerScramble}
          onClick={triggerScramble}
          title="Click or hover to decrypt"
        >
          {/* Ambient Cyber Neon Back-glow */}
          <div className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-cyan-500/20 via-blue-600/25 to-purple-600/20 blur-3xl opacity-40 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none rounded-full" />

          <h1 className="relative font-display font-extrabold tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] whitespace-normal sm:whitespace-nowrap">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-white group-hover:to-cyan-200 transition-all duration-300">
              {displayText.split("").map((char, i) => (
                <span
                  key={i}
                  className={`inline-block transition-transform duration-150 hover:scale-110 hover:-translate-y-1 select-none ${
                    char === " " ? "w-2.5 sm:w-4" : ""
                  }`}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Interactive Micro-hint on hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase block mt-1">
            [ &lt;/&gt; Interactive Decrypt on Hover ]
          </span>
        </div>

        {/* Developer Terminal Subtitle with Syntax-Highlighted Typewriter */}
        <div className="mt-2 sm:mt-3 px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] backdrop-blur-md shadow-inner flex items-center justify-center font-mono text-xs sm:text-sm md:text-base text-zinc-200 max-w-xl w-full">
          <span className="text-emerald-400 font-bold select-none mr-2">➜</span>
          <span className="text-cyan-400 font-medium select-none mr-2 hidden sm:inline">~/portfolio</span>
          <span className="text-purple-400 select-none mr-2 font-semibold">git:(main)</span>
          <span className="text-zinc-500 select-none mr-2">&gt;</span>
          <span className="text-white font-medium truncate">
            {displayedPhrase}
            <span className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-4 ml-1 bg-cyan-400 align-middle animate-pulse" />
          </span>
        </div>

        {/* Minimalist Tech Arsenal Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-lg">
          {SKILL_TAGS.map((skill) => (
            <span
              key={skill}
              className="pointer-events-auto px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-medium bg-white/[0.04] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-400/50 text-zinc-300 hover:text-cyan-200 backdrop-blur-sm transition-all duration-200 cursor-default hover:scale-105"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Subtle Ambient Note */}
        <p className="mt-3 text-[11px] font-mono text-zinc-400/80 tracking-wide drop-shadow-sm">
          Windows 11 Portfolio OS · Double-click any icon to launch
        </p>
      </motion.div>
    </div>
  );
}
