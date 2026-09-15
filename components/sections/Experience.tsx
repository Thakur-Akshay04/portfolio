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
    <PageFoldWrapper id="experience" className="py-20 md:py-28 px-6 sm:px-10 max-w-5xl mx-auto">
      {/* Reusable Section Heading */}
      <SectionHeading
        title="Work Experience"
        subtitle="Professional software engineering internships, contributions, and system impact."
      />

      {/* Horizontal Timeline Section */}
      <div ref={containerRef} className="relative mt-12 md:mt-20 w-full flex flex-col items-center">
        
        {/* Horizontal Line Container */}
        <div className="hidden md:block relative w-full h-[2px] bg-white/[0.06] rounded-full my-14">
          <div className="absolute inset-0 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: shouldReduceMotion ? 1 : scaleX }}
              className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-accent-purple to-accent-purple/20 origin-left"
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
                <div className="relative w-4 h-4 rounded-full bg-black border-2 border-accent-purple flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping absolute opacity-75" />
                </div>
                
                {/* Date / Company Text Label above the line */}
                <span className="absolute bottom-6 whitespace-nowrap text-sm font-mono text-accent-purple font-medium tracking-wider">
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
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="w-full max-w-3xl p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-[#0d0d11]/80 hover:border-white/[0.16] transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] group relative cursor-default text-left"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                  <Briefcase className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-sans text-white leading-tight">
                    {item.role}
                  </h3>
                  <div className="flex items-center flex-wrap gap-2.5 mt-3">
                    {item.techStack.map((tech) => (
                      <span key={tech} title={tech} className="inline-flex">
                        <TechLogo name={tech} className="w-[20px] h-[20px] shrink-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200 cursor-default" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Period & Location Badges */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-white/[0.08] bg-white/[0.02] rounded-full font-mono text-xs text-accent-purple">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
                {item.location && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-white/[0.08] bg-white/[0.02] rounded-full font-mono text-xs text-neutral-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              {/* Role Summary / Description */}
              {item.description && (
                <p className="text-sm md:text-base text-neutral-300 font-sans leading-relaxed mb-7">
                  {item.description}
                </p>
              )}

              {/* Key Achievements */}
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                Key achievements
              </div>
              <ul className="space-y-4 pt-1 text-left">
                {item.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-start text-sm text-neutral-300 font-sans leading-relaxed"
                  >
                    <span className="text-accent-purple font-mono text-sm mt-0.5 select-none shrink-0">
                      {"•"}
                    </span>
                    <span className="leading-relaxed">{achievement}</span>
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
