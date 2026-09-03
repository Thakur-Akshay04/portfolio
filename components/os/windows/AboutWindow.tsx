"use client";

import React, { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/constants/data";
import { useWindowManager } from "@/context/WindowManagerContext";
import {
  Laptop,
  Cpu,
  Award,
  Briefcase,
  MapPin,
  Mail,
  ArrowRight,
  ShieldCheck,
  Terminal,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { Win11ThisPC } from "@/components/icons/Win11Icons";

export default function AboutWindow() {
  const { windows, openWindow } = useWindowManager();
  const highlightId = windows.about?.targetHighlightId;
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (highlightId === "about-bio" && bioRef.current) {
      bioRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (highlightId === "about-stats" && statsRef.current) {
      statsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email || "akshaysinghthakur0004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-zinc-300 select-none">
      {/* Windows 11 System Header Banner */}
      <div
        ref={bioRef}
        className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0078D4] to-indigo-600 p-0.5 shadow-lg flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-[#0d0d12] rounded-[14px] flex items-center justify-center font-mono font-bold text-xl text-white">
                AT
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {PORTFOLIO_DATA.personal.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Roles
                </span>
              </div>
              <p className="text-xs font-mono text-[#0078D4] font-semibold">
                {PORTFOLIO_DATA.personal.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-400 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{PORTFOLIO_DATA.personal.location} (GMT+5:30)</span>
              </div>
            </div>
          </div>

          {/* Top Quick Actions */}
          <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={() => openWindow("contact")}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#0078D4] hover:bg-[#1084D8] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#0078D4]/30 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact in Mail</span>
            </button>
            <button
              onClick={() => openWindow("resume")}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>View Resume.pdf</span>
            </button>
          </div>
        </div>

        {/* Bio Narrative */}
        <div className="pt-4 border-t border-white/5 space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {PORTFOLIO_DATA.personal.bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Windows 11 Specifications Grid (Settings App Aesthetic) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Device specifications */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
            <Laptop className="w-4 h-4 text-[#0078D4]" />
            <span>Developer Specifications</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Engineering Focus:</span>
              <span className="text-white text-right">Full-Stack &amp; AI Systems</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Core Runtime:</span>
              <span className="text-emerald-400 text-right">React 19, Next.js, FastAPI</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Vector Storage:</span>
              <span className="text-cyan-400 text-right">PostgreSQL (pgvector), Redis</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">Architecture:</span>
              <span className="text-purple-400 text-right">100% Type-Safe Scalable</span>
            </div>
          </div>
        </div>

        {/* System / Environment specs */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Operating Environment</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Edition:</span>
              <span className="text-white text-right">Windows 11 WebOS Portfolio</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Version:</span>
              <span className="text-white text-right">v3.0.0 (Fluent Pro)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Email:</span>
              <span className="text-zinc-200 text-right truncate max-w-[160px]">akshaysinghthakur0004@gmail.com</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">Status:</span>
              <span className="text-emerald-400 text-right">Ready for Deployment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Stats Bento Grid */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
      >
        {PORTFOLIO_DATA.stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#0078D4]/40 transition-all flex items-center gap-3.5"
          >
            <div className="p-2.5 rounded-lg bg-[#0078D4]/10 text-[#0078D4] border border-[#0078D4]/20">
              {i === 0 ? <Cpu className="w-5 h-5" /> : i === 1 ? <Briefcase className="w-5 h-5" /> : <Award className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">
                {stat.value}
                <span className="text-[#0078D4]">{stat.suffix}</span>
              </div>
              <div className="text-xs text-zinc-400 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick App Launchers */}
      <div className="flex flex-wrap gap-2.5 pt-2">
        <button
          onClick={() => openWindow("projects")}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#0078D4]/20 border border-white/10 hover:border-[#0078D4]/40 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all"
        >
          <Briefcase className="w-4 h-4 text-purple-400" />
          <span>Launch Projects in Edge</span>
          <ArrowRight className="w-3 h-3 text-zinc-500" />
        </button>

        <button
          onClick={() => openWindow("skills")}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#0078D4]/20 border border-white/10 hover:border-[#0078D4]/40 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all"
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Explore Skills Directory</span>
          <ArrowRight className="w-3 h-3 text-zinc-500" />
        </button>

        <button
          onClick={() => openWindow("terminal")}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#0078D4]/20 border border-white/10 hover:border-[#0078D4]/40 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all"
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Open PowerShell CLI</span>
          <ArrowRight className="w-3 h-3 text-zinc-500" />
        </button>
      </div>
    </div>
  );
}
