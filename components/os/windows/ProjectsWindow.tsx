"use client";

import React, { useState, useEffect, useRef } from "react";
import { PORTFOLIO_DATA, Project } from "@/constants/data";
import { useWindowManager } from "@/context/WindowManagerContext";
import {
  ExternalLink,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  ChevronRight,
  Info,
  ShieldCheck,
  Zap,
  ArrowLeft,
  RotateCcw,
  Globe,
  Lock,
  Plus,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

export default function ProjectsWindow() {
  const { windows } = useWindowManager();
  const highlightId = windows.projects?.targetHighlightId;
  const initialProjectId = windows.projects?.initialData?.projectId;

  const [selectedProjectId, setSelectedProjectId] = useState<string>(PORTFOLIO_DATA.projects[0].id);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("" );

  const effectiveProjectId = highlightId || initialProjectId || selectedProjectId;
  const selectedProject = PORTFOLIO_DATA.projects.find((p) => p.id === effectiveProjectId) || PORTFOLIO_DATA.projects[0];

  const categories = ["All", "Full Stack / Productivity", "Full Stack / AI", "Blockchain / Web3"];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    const matchesCat = filterCategory === "All" || p.category.toLowerCase().includes(filterCategory.toLowerCase().replace("full stack / ", ""));
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full space-y-3.5 select-none text-zinc-300">
      {/* Edge Browser Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 pb-2 custom-os-scrollbar">
        {PORTFOLIO_DATA.projects.map((proj) => {
          const isCurrent = selectedProject?.id === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-t-xl text-xs font-medium transition-all max-w-[200px] truncate ${
                isCurrent
                  ? "bg-[#18181f] text-white border-t-2 border-t-[#0078D4] border-x border-white/10 shadow-sm"
                  : "bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
              }`}
            >
              <Globe className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? "text-[#0078D4]" : "text-zinc-500"}`} />
              <span className="truncate">{proj.title}</span>
            </button>
          );
        })}
      </div>

      {/* Edge Browser Navigation & Address Bar */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121217] border border-white/10 text-xs">
        <div className="flex items-center gap-1 text-zinc-400">
          <button className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors" title="Back">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              if (selectedProject) setSelectedProjectId(selectedProject.id);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            title="Reload"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address input */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-zinc-400 font-sans">https://akshay.dev/projects/</span>
          <span className="text-white font-semibold">{selectedProject?.id || "explorer"}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {selectedProject?.githubUrl && (
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 font-sans"
              title="GitHub Source"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline-block">Code</span>
            </a>
          )}
          {selectedProject?.liveUrl && (
            <a
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#0078D4] hover:bg-[#1084D8] text-white font-semibold flex items-center gap-1.5 shadow-md transition-all font-sans"
            >
              <span>Live App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Main Split Layout: Project Selector & Deep-Dive Case Study */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left Side: Projects List */}
        <div className="lg:col-span-4 space-y-2.5 overflow-y-auto pr-1">
          {/* Quick Search */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech (e.g. pgvector)..."
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500"
            />
          </div>

          {filteredProjects.map((project) => {
            const isSelected = selectedProject?.id === project.id;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`p-3.5 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#0078D4]/20 border-[#0078D4] ring-1 ring-[#0078D4]/60 text-white shadow-lg"
                    : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                } border space-y-2`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-white">{project.title}</h3>
                    <span className="text-[10px] font-mono text-purple-300">
                      {project.category}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${isSelected ? "rotate-90 text-[#0078D4]" : ""}`} />
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Active Project Deep Dive */}
        {selectedProject && (
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-mono">
                  <Layers className="w-3 h-3 text-purple-400" />
                  <span>{selectedProject.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight font-display">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#0078D4] hover:bg-[#1084D8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#0078D4]/30 transition-all"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> Detailed Overview
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedProject.fullDescription || selectedProject.description}
              </p>
            </div>

            {/* Challenge & Solution */}
            {(selectedProject.challenge || selectedProject.solution) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {selectedProject.challenge && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                    <span className="font-semibold text-amber-400 uppercase tracking-wider font-mono text-[11px]">The Challenge:</span>
                    <p className="text-zinc-400 leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                )}
                {selectedProject.solution && (
                  <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                    <span className="font-semibold text-emerald-400 uppercase tracking-wider font-mono text-[11px]">Engineered Solution:</span>
                    <p className="text-zinc-300 leading-relaxed">{selectedProject.solution}</p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            {selectedProject.features && (
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Key Capabilities
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0078D4] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2.5 pt-2 border-t border-white/5">
              <div className="text-xs font-semibold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" /> Technologies &amp; Architecture
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
