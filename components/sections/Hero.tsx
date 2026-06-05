"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/data";
import { useSafeReducedMotion } from "@/lib/hooks";
import { useLenis } from "lenis/react";

// Dynamically import 3D background to prevent hydration/SSR mismatch
const HeroParticles = dynamic(() => import("./HeroParticles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black -z-10" />,
});

const ConstellationSphere = dynamic(() => import("./ConstellationSphere"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[320px] md:min-h-[420px]" />,
});

export default function Hero() {
  const shouldReduceMotion = useSafeReducedMotion();
  const lenis = useLenis();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Custom typewriter taglines
  const words = PORTFOLIO_DATA.personal.taglineWords;

  // Track scroll for background parallax drift
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 180]);

  // Typewriter effect loop
  useEffect(() => {
    if (taglineIndex >= words.length) {
      setTaglineIndex(0);
      setCurrentText("");
      setIsDeleting(false);
      return;
    }

    const activeWord = words[taglineIndex];
    if (!activeWord) return;

    let typingSpeed = isDeleting ? 25 : 60;

    if (!isDeleting && currentText === activeWord) {
      typingSpeed = 2000; // Pause after typing
    } else if (isDeleting && currentText === "") {
      typingSpeed = 150; // Pause before starting next word
    }

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(activeWord.slice(0, currentText.length + 1));
        if (currentText.length + 1 === activeWord.length) {
          setIsDeleting(true);
        }
      } else {
        setCurrentText(activeWord.slice(0, currentText.length - 1));
        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, taglineIndex, words]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -80 });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-black border-b border-white/10"
    >
      {/* Cinematic noise/grain texture */}
      <div className="noise-overlay" />

      {/* Floating background particles with parallax drift scroll */}
      <motion.div style={{ y: shouldReduceMotion ? 0 : backgroundY }} className="absolute inset-0 -z-10">
        <HeroParticles />
      </motion.div>

      <div className="w-full max-w-6xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-24 pb-16">
        {/* Left Side: Name and details */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Heading Name: Character Staggered Entrance Reveal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-4 select-none uppercase text-white flex flex-wrap leading-[1.05]">
            {PORTFOLIO_DATA.personal.name.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap mr-3 md:mr-5">
                {Array.from(word).map((char, cIdx) => {
                  const charIndex =
                    PORTFOLIO_DATA.personal.name.split(" ").slice(0, wIdx).join(" ").length +
                    wIdx +
                    cIdx;
                  return (
                    <motion.span
                      key={cIdx}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: charIndex * 0.03,
                        ease: [0.16, 1, 0.3, 1], // easeOutQuart
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Dynamic Typewriter Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="h-8 mb-8 text-base sm:text-lg md:text-2xl font-mono text-gray-300 font-medium"
          >
            <span className="text-accent-purple pr-1 border-r-2 border-accent-purple animate-pulse font-semibold drop-shadow-[0_0_10px_var(--accent-neon-glow)]">
              {currentText}
            </span>
          </motion.div>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed font-sans"
          >
            {PORTFOLIO_DATA.personal.subtitle}
          </motion.p>
        </div>

        {/* Right Side: Animated 3D Star Constellation */}
        <div className="absolute lg:relative inset-0 lg:inset-auto lg:col-span-5 w-full h-full lg:h-auto -z-10 lg:z-0 opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto flex items-center justify-center lg:translate-x-12">
          <ConstellationSphere />
        </div>
      </div>

      {/* Parallax scroll indicator at bottom */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest">Scroll Down</span>
        <ArrowDown className="w-4 h-4 text-accent-purple" />
      </motion.div>
    </section>
  );
}
