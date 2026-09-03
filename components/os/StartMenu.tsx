"use client";

import React, { useState } from "react";
import {
  Search,
  Power,
  ChevronRight,
  FileCode,
  FileText,
  Clock,
  User,
  ShieldCheck,
} from "lucide-react";
import { WindowId, useWindowManager } from "@/context/WindowManagerContext";
import { PORTFOLIO_DATA } from "@/constants/data";
import {
  Win11ThisPC,
  Win11FileExplorer,
  Win11Terminal,
  Win11Edge,
  Win11Mail,
  Win11Notepad,
  Win11Settings,
  Win11RecycleBin,
  Win11VSCode,
  Win11Calculator,
} from "@/components/icons/Win11Icons";

export default function StartMenu() {
  const { startMenuOpen, setStartMenuOpen, openWindow, setSearchOpen, setSearchQuery } = useWindowManager();
  const [filterText, setFilterText] = useState("");

  if (!startMenuOpen) return null;

  const pinnedItems = [
    {
      id: "about" as WindowId,
      name: "About Me",
      icon: <Win11ThisPC className="w-8 h-8" />,
    },
    {
      id: "projects" as WindowId,
      name: "Projects",
      icon: <Win11Edge className="w-8 h-8" />,
    },
    {
      id: "skills" as WindowId,
      name: "Skills",
      icon: <Win11FileExplorer className="w-8 h-8" />,
    },
    {
      id: "experience" as WindowId,
      name: "Experience",
      icon: <Win11Settings className="w-8 h-8" />,
    },
    {
      id: "terminal" as WindowId,
      name: "Terminal",
      icon: <Win11Terminal className="w-8 h-8" />,
    },
    {
      id: "contact" as WindowId,
      name: "Outlook Mail",
      icon: <Win11Mail className="w-8 h-8" />,
    },
    {
      id: "resume" as WindowId,
      name: "Notepad (Resume)",
      icon: <Win11Notepad className="w-8 h-8" />,
    },
    {
      id: "recycle" as WindowId,
      name: "Recycle Bin",
      icon: <Win11RecycleBin className="w-8 h-8" />,
    },
    {
      id: "projects" as WindowId,
      name: "VS Code",
      icon: <Win11VSCode className="w-8 h-8" />,
    },
    {
      id: "skills" as WindowId,
      name: "Calculator",
      icon: <Win11Calculator className="w-8 h-8" />,
    },
  ];

  const recommendedItems = [
    {
      title: "Luminote_pgvector_Architecture.ts",
      time: "Recent project · FastAPI & pgvector",
      windowId: "projects" as WindowId,
      targetId: "project-3",
      icon: <FileCode className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "AI_Resume_Tailor_ATS.tsx",
      time: "Recent project · React 19 & Llama-3",
      windowId: "projects" as WindowId,
      targetId: "project-1",
      icon: <FileCode className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: "CredVault_Verification.sol",
      time: "Recent project · Ethereum & Solidity",
      windowId: "projects" as WindowId,
      targetId: "project-2",
      icon: <FileCode className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Akshay_Singh_Thakur_Resume.pdf",
      time: "Updated 2026 · Ready to download",
      windowId: "resume" as WindowId,
      targetId: "resume-preview",
      icon: <FileText className="w-5 h-5 text-amber-400" />,
    },
  ];

  const filteredPinned = pinnedItems.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-[620px] max-h-[660px] win11-mica rounded-2xl shadow-2xl p-6 flex flex-col justify-between animate-flyout border border-white/15 select-none"
    >
      {/* Top Search Bar */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/40 border border-white/10 focus-within:border-[#0078D4] transition-all">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filterText.trim()) {
                setSearchQuery(filterText);
                setSearchOpen(true);
                setStartMenuOpen(false);
              }
            }}
            placeholder="Search for apps, settings, and documents..."
            className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-400"
          />
          {filterText && (
            <button
              onClick={() => setFilterText("")}
              className="text-[11px] font-mono text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Pinned Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-white tracking-wide">Pinned</span>
            <button
              onClick={() => openWindow("skills")}
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
            >
              <span>All apps</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {filteredPinned.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  openWindow(item.id);
                  setStartMenuOpen(false);
                }}
                className="group p-2 rounded-xl hover:bg-white/10 flex flex-col items-center gap-1.5 transition-all text-center"
              >
                <div className="group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[11px] text-zinc-300 group-hover:text-white truncate w-full">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-white tracking-wide">Recommended</span>
            <span className="text-[11px] font-mono text-zinc-500">Recent Architecture</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {recommendedItems.map((rec, idx) => (
              <button
                key={idx}
                onClick={() => {
                  openWindow(rec.windowId, rec.targetId);
                  setStartMenuOpen(false);
                }}
                className="p-2.5 rounded-xl hover:bg-white/10 flex items-center gap-3 transition-all text-left group"
              >
                <div className="p-2 rounded-lg bg-black/40 border border-white/5 group-hover:border-purple-500/30">
                  {rec.icon}
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <div className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">
                    {rec.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate font-mono">
                    {rec.time}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom User Bar */}
      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-[#09090b] rounded-full flex items-center justify-center font-bold text-xs text-white">
              AT
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">
              {PORTFOLIO_DATA.personal.name}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Full-Stack Engineer</span>
            </div>
          </div>
        </div>

        {/* Power Menu Button */}
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="p-2 rounded-xl hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors"
          title="Restart Portfolio System"
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
