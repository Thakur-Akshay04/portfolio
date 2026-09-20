"use client";

import { motion } from "framer-motion";
import { Calendar, Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/data";
import { useSafeReducedMotion } from "@/lib/hooks";
import PageFoldWrapper from "@/components/layout/PageFoldWrapper";
import SectionHeading from "@/components/layout/SectionHeading";
import { TechLogo } from "@/components/sections/Projects";

export default function Experience() {
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <PageFoldWrapper
      id="experience"
      className="py-3 sm:py-5 lg:py-6 px-6 sm:px-10 max-w-6xl mx-auto flex-1 flex flex-col justify-center w-full my-auto"
    >
      {/* Reusable Section Heading */}
      <SectionHeading
        title="Work Experience"
        subtitle="Professional software engineering internships, contributions, and system impact."
        className="mb-2 sm:mb-4"
      />

      {/* Experience Showcase */}
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
        {/* Animated Horizontal Timeline Bar */}
        <div className="relative w-full mb-3 sm:mb-4 flex items-center">
          <div className="relative w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-accent-purple via-accent-purple/60 to-accent-purple/10 origin-left"
            />
          </div>

          {/* Glowing timeline node indicator */}
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#070709] px-2.5 py-0.5 rounded-full border border-white/[0.08] shadow-sm">
            <div className="relative w-2 h-2 rounded-full bg-accent-purple flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
              <div className="absolute inset-0 rounded-full bg-accent-purple animate-ping opacity-60" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-medium text-accent-purple tracking-wider">
              {PORTFOLIO_DATA.experience[0]?.company || "Worisgo"}
            </span>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col items-center w-full">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="w-full p-4 sm:p-5 lg:p-6 rounded-2xl border border-white/[0.08] bg-[#0d0d11]/85 hover:border-white/[0.16] transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur-sm group relative cursor-default text-left"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-7 items-start">
                {/* Left Column: Role Details, Badges, Summary, Tech Stack */}
                <div className="lg:col-span-5 flex flex-col space-y-2.5 sm:space-y-3">
                  {/* Role & Company */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-purple" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold font-display text-white leading-tight">
                        {item.role}
                      </h3>
                      <div className="text-xs sm:text-sm font-mono text-accent-purple font-medium mt-0.5">
                        @{item.company}
                      </div>
                    </div>
                  </div>

                  {/* Period & Location Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-white/[0.08] bg-white/[0.02] rounded-full font-mono text-[10px] sm:text-[11px] text-accent-purple">
                      <Calendar className="w-3 h-3" />
                      <span>{item.period}</span>
                    </div>
                    {item.location && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-white/[0.08] bg-white/[0.02] rounded-full font-mono text-[10px] sm:text-[11px] text-neutral-400">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {item.description && (
                    <p className="text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed line-clamp-3 lg:line-clamp-none">
                      {item.description}
                    </p>
                  )}

                  {/* Tech Stack Icons */}
                  <div className="pt-0.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Technologies &amp; Tools
                    </div>
                    <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                      {item.techStack.map((tech) => (
                        <div
                          key={tech}
                          title={tech}
                          className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-accent-purple/40 hover:bg-white/[0.06] transition-all duration-200"
                        >
                          <TechLogo name={tech} className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-90" />
                          <span className="text-[10px] sm:text-[11px] font-sans text-neutral-300 font-medium">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Achievements */}
                <div className="lg:col-span-7 flex flex-col space-y-2 pt-1 lg:pt-0 lg:border-l lg:border-white/[0.08] lg:pl-6">
                  <div className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    <span>Key Engineering Achievements</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {item.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="p-2.5 sm:p-3 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200 flex flex-col justify-start group/card"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-purple shrink-0 mt-0.5 group-hover/card:scale-110 transition-transform" />
                          <span className="text-[11px] sm:text-xs text-neutral-300 font-sans leading-relaxed">
                            {achievement}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageFoldWrapper>
  );
}
