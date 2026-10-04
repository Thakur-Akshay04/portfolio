"use client";

import { motion } from "framer-motion";
import { Calendar, Briefcase, MapPin } from "lucide-react";
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
        className="mb-4 sm:mb-6"
      />

      {/* Experience Showcase */}
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center w-full">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="w-full p-5 sm:p-6 lg:p-7 rounded-2xl border border-white/[0.08] bg-[#0d0d11]/85 hover:border-white/[0.14] transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur-sm group relative cursor-default text-left"
            >
              <div className="flex flex-col space-y-5">
                {/* 1. Header: Role, Company & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0 text-accent-purple">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-white tracking-tight leading-snug">
                        {item.role}
                      </h3>
                      <div className="text-xs sm:text-sm font-sans text-accent-purple font-medium">
                        {item.company}
                      </div>
                    </div>
                  </div>

                  {/* Period & Location Badges */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/[0.08] bg-white/[0.03] rounded-lg text-neutral-300">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{item.period}</span>
                    </div>
                    {item.location && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/[0.08] bg-white/[0.03] rounded-lg text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Role Overview */}
                {item.description && (
                  <div className="space-y-1.5">
                    <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-neutral-400">
                      Role Overview
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}

                {/* 3. Key Achievements */}
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-neutral-400">
                    Key Achievements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="p-3 sm:p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                      >
                        <p className="text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Technologies & Tools */}
                <div className="pt-3 border-t border-white/[0.06]">
                  <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-neutral-400 mb-2.5">
                    Technologies &amp; Tools
                  </h4>
                  <div className="flex items-center flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <div
                        key={tech}
                        title={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-accent-purple/30 transition-colors"
                      >
                        <TechLogo name={tech} className="w-3.5 h-3.5 shrink-0 opacity-90" />
                        <span className="text-[11px] sm:text-xs font-sans text-neutral-300 font-medium">
                          {tech}
                        </span>
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

