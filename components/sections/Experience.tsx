"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Briefcase, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/data";
import { useSafeReducedMotion } from "@/lib/hooks";
import PageFoldWrapper from "@/components/layout/PageFoldWrapper";
import SectionHeading from "@/components/layout/SectionHeading";
import { TechLogo } from "@/components/sections/Projects";

export default function Experience() {
  const shouldReduceMotion = useSafeReducedMotion();
  const containerRef = useRef(null);

  // Track scroll of timeline container for active line drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Buttery-smooth spring physics for drawing line
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35 });

  const getLeftPosition = (index: number) => {
    const N = PORTFOLIO_DATA.experience.length;
    if (N <= 1) return "50%";
    return `${(index / (N - 1)) * 80 + 10}%`; // Spaced between 10% and 90%
  };

  return (
    <PageFoldWrapper id="experience" className="py-24 md:py-32 px-6 max-w-5xl mx-auto">
      {/* Reusable Section Heading with blur-to-clear entrance */}
      <SectionHeading title="Work Experience" subtitle="// Journey" />

      {/* Horizontal Timeline Section */}
      <div ref={containerRef} className="relative mt-16 md:mt-24 w-full flex flex-col items-center">
        
        {/* Horizontal Line Container */}
        <div className="relative w-full h-[2px] bg-white/5 rounded-full my-16">
          <div className="absolute inset-0 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: shouldReduceMotion ? 1 : scaleX }}
              className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-accent-purple to-accent-purple/20 origin-left shadow-[0_0_12px_var(--accent-neon-glow)]"
            />
          </div>
          
          {/* Timeline Dots & Markers */}
          {PORTFOLIO_DATA.experience.map((item, index) => {
            const leftPos = getLeftPosition(index);
            return (
              <div
                key={item.id}
                style={{ left: leftPos }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
              >
                {/* Glowing core dot */}
                <div className="relative w-4 h-4 rounded-full bg-black border-2 border-accent-purple flex items-center justify-center shadow-[0_0_10px_var(--accent-neon-glow)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping absolute" />
                </div>
                
                {/* Date / Company Text Label above the line */}
                <span className="absolute bottom-6 whitespace-nowrap text-m font-mono text-accent-purple font-semibold tracking-wider">
                  {item.company}
                </span>
              </div>
            );
          })}
        </div>

        {/* Experience Cards Container */}
        <div className="flex flex-col items-center w-full gap-8">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="w-full max-w-3xl glass-panel p-8 rounded-2xl border border-white/10 bg-[#0a0a0a]/75 hover-glow-purple group relative cursor-default text-left"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-accent-purple drop-shadow-[0_0_6px_var(--accent-neon-glow)]" />
                <div>
                  <h4 className="text-xl font-bold font-sans text-white leading-tight">
                    {item.role}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    {item.techStack.map((tech) => (
                      <TechLogo key={tech} name={tech} className="w-[22px] h-[22px] shrink-0 opacity-80 hover:opacity-100 hover:scale-110 hover:-rotate-6 transition-all duration-200 cursor-default" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Period & Location Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-white/5 bg-black/60 rounded-full font-mono text-xs text-accent-purple">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
                {item.location && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-white/5 bg-black/60 rounded-full font-mono text-xs text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              {/* Bullet Description */}
              <ul className="space-y-3 pt-2 text-left">
                {item.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 items-start text-xs md:text-sm text-gray-300 font-sans leading-relaxed"
                  >
                    <span className="text-accent-purple font-mono text-xs mt-0.5 select-none">
                      {"//"}
                    </span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </PageFoldWrapper>
  );
}
