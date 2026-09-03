"use client";

import React, { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/constants/data";
import { useWindowManager } from "@/context/WindowManagerContext";
import { Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { Win11Settings } from "@/components/icons/Win11Icons";
import { TechIcon } from "@/components/icons/TechIcons";

export default function ExperienceWindow() {
  const { windows } = useWindowManager();
  const highlightId = windows.experience?.targetHighlightId;
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (highlightId && itemRefs.current[highlightId]) {
      itemRefs.current[highlightId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto select-none text-zinc-300">
      {/* Settings Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center gap-3">
          <Win11Settings className="w-6 h-6" />
          <div>
            <h2 className="text-sm font-semibold text-white">Work Experience &amp; Practical Engineering</h2>
            <p className="text-xs text-zinc-400">Professional internships and hands-on software development logs</p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-emerald-400">
          Verified Logs
        </span>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10">
        {PORTFOLIO_DATA.experience.map((item) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[item.id] = el;
            }}
            className="relative pl-9"
          >
            {/* Timeline marker */}
            <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-[#0078D4] border-4 border-[#09090b] shadow-md shadow-[#0078D4]/50" />

            {/* Card */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0078D4]/40 transition-all space-y-4 shadow-xl">
              {/* Title & Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white font-display">{item.role}</h3>
                  <div className="text-xs font-mono text-[#0078D4] font-semibold">
                    @{item.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{item.period}</span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.description}</p>

              {/* Achievements */}
              {item.achievements && item.achievements.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Key Deliverables &amp; Technical Contributions:
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    {item.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0078D4] mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {item.techStack && item.techStack.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-mono text-zinc-500 mr-1">Stack:</span>
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800/80 border border-white/10 hover:border-[#0078D4]/40 text-zinc-300 transition-all shadow-sm group"
                    >
                      <span className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <TechIcon name={tech} className="w-3.5 h-3.5" />
                      </span>
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
