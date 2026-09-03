"use client";

import React from "react";
import { Download, ExternalLink, Award, GraduationCap, Briefcase, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/data";
import { Win11Notepad } from "@/components/icons/Win11Icons";

export default function ResumeWindow() {
  const resumeUrl =
    PORTFOLIO_DATA.socials.find((s) => s.name === "Resume")?.url ||
    "https://drive.google.com/file/d/1lh0gWPiYjK5YSNiuLNUXh3iPYDHob-e-/view?usp=sharing";

  return (
    <div className="flex flex-col h-full space-y-3 select-none text-zinc-300">
      {/* Windows 11 Notepad Menu Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
        <div className="flex items-center gap-4 text-zinc-400">
          <button className="hover:text-white transition-colors">File</button>
          <button className="hover:text-white transition-colors">Edit</button>
          <button className="hover:text-white transition-colors">View</button>
        </div>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[#0078D4] hover:bg-[#1084D8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      </div>

      {/* Notepad Document Text Body */}
      <div className="flex-1 overflow-y-auto p-6 rounded-2xl bg-[#0e0e13] border border-white/10 font-mono text-xs space-y-6 text-zinc-200 select-text leading-relaxed">
        {/* Header */}
        <div className="border-b border-white/10 pb-4 space-y-1">
          <h1 className="text-lg font-bold text-white tracking-tight">{PORTFOLIO_DATA.personal.name}</h1>
          <p className="text-[#0078D4] font-semibold">{PORTFOLIO_DATA.personal.title}</p>
          <div className="text-zinc-400 text-[11px] pt-1">
            Location: {PORTFOLIO_DATA.personal.location} | Email: akshaysinghthakur0004@gmail.com | GitHub: github.com/Thakur-Akshay04
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-1.5">
          <h2 className="font-bold text-white uppercase text-[11px] text-[#0078D4]">== SUMMARY ==</h2>
          <p className="text-zinc-300">
            {PORTFOLIO_DATA.personal.bio.join(" ")}
          </p>
        </div>

        {/* Experience */}
        <div className="space-y-3">
          <h2 className="font-bold text-white uppercase text-[11px] text-[#0078D4]">== WORK EXPERIENCE ==</h2>
          {PORTFOLIO_DATA.experience.map((exp) => (
            <div key={exp.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white">
                <span>{exp.role} — {exp.company}</span>
                <span className="text-zinc-400 text-[11px] font-normal">{exp.period}</span>
              </div>
              <p className="text-zinc-400">{exp.description}</p>
              <ul className="space-y-1 text-zinc-400 pl-3 list-disc">
                {exp.achievements?.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="space-y-3">
          <h2 className="font-bold text-white uppercase text-[11px] text-[#0078D4]">== FEATURED PROJECTS ==</h2>
          {PORTFOLIO_DATA.projects.map((proj) => (
            <div key={proj.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <div className="font-bold text-white flex justify-between">
                <span>{proj.title}</span>
                <span className="text-[#0078D4] text-[11px] font-normal">{proj.category}</span>
              </div>
              <p className="text-zinc-300">{proj.description}</p>
              <p className="text-purple-300 text-[11px]">Stack: {proj.techStack?.join(", ")}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="space-y-1.5 pt-2 border-t border-white/10">
          <h2 className="font-bold text-white uppercase text-[11px] text-[#0078D4]">== EDUCATION &amp; CERTIFICATIONS ==</h2>
          <p className="text-zinc-400">
            Bachelor of Technology in Computer Science &amp; Engineering | Full-Stack &amp; AI Integration Certified.
          </p>
        </div>
      </div>

      {/* Notepad Status Bar */}
      <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-white/10 px-1">
        <div className="flex items-center gap-4">
          <span>Ln 42, Col 1</span>
          <span>100%</span>
          <span>Windows (CRLF)</span>
          <span>UTF-8</span>
        </div>
        <span>Notepad v11.23</span>
      </div>
    </div>
  );
}
