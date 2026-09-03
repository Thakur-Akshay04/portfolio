"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Cpu,
  FolderGit2,
  Briefcase,
  Mail,
  FileText,
  Terminal,
  User,
  X,
  Layers,
} from "lucide-react";
import { useWindowManager } from "@/context/WindowManagerContext";
import { queryRag } from "@/lib/rag/engine";
import {
  Win11ThisPC,
  Win11FileExplorer,
  Win11Terminal,
  Win11Edge,
  Win11Mail,
  Win11Notepad,
  Win11Search,
  Win11Settings,
} from "@/components/icons/Win11Icons";

export default function SearchModal() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, openWindow } = useWindowManager();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    return searchQuery.trim() ? queryRag(searchQuery) : null;
  }, [searchQuery]);

  if (!searchOpen) return null;

  const handleDeepLinkClick = (winId: any, targetId?: string) => {
    openWindow(winId, targetId);
    setSearchOpen(false);
  };

  const getWindowAppIcon = (winId: string) => {
    switch (winId) {
      case "skills":
        return <Win11FileExplorer className="w-5 h-5" />;
      case "projects":
        return <Win11Edge className="w-5 h-5" />;
      case "experience":
        return <Win11Settings className="w-5 h-5" />;
      case "contact":
        return <Win11Mail className="w-5 h-5" />;
      case "resume":
        return <Win11Notepad className="w-5 h-5" />;
      case "terminal":
        return <Win11Terminal className="w-5 h-5" />;
      default:
        return <Win11ThisPC className="w-5 h-5" />;
    }
  };

  const topApps = [
    { id: "projects", label: "Projects Explorer", icon: <Win11Edge className="w-6 h-6" /> },
    { id: "skills", label: "Skills Directory", icon: <Win11FileExplorer className="w-6 h-6" /> },
    { id: "experience", label: "Experience & Settings", icon: <Win11Settings className="w-6 h-6" /> },
    { id: "terminal", label: "Windows Terminal", icon: <Win11Terminal className="w-6 h-6" /> },
    { id: "resume", label: "Notepad (Resume)", icon: <Win11Notepad className="w-6 h-6" /> },
    { id: "contact", label: "Outlook Mail", icon: <Win11Mail className="w-6 h-6" /> },
    { id: "about", label: "This PC (About)", icon: <Win11ThisPC className="w-6 h-6" /> },
  ];

  const quickCategories = [
    { label: "Projects", winId: "projects" },
    { label: "Skills", winId: "skills" },
    { label: "Experience", winId: "experience" },
    { label: "Resume", winId: "resume" },
    { label: "Contact", winId: "contact" },
  ];

  return (
    <AnimatePresence>
      <div
        onClick={() => setSearchOpen(false)}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-20 p-3 select-none"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className="w-full max-w-2xl win11-mica border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
        >
          {/* Windows 11 Search Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.03]">
            <Win11Search className="w-5 h-5 flex-shrink-0 text-[#0078D4]" />

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type here to search apps, projects, skills, and documents..."
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-zinc-400 font-sans"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setSearchOpen(false)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-mono"
            >
              ESC
            </button>
          </div>

          {/* Body Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-os-scrollbar text-xs">
            {/* If no query: Quick Categories & Top Apps */}
            {!searchQuery.trim() && (
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <div className="text-zinc-400 font-semibold text-xs">Quick Access</div>
                  <div className="flex flex-wrap gap-2">
                    {quickCategories.map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => handleDeepLinkClick(cat.winId)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#0078D4]/20 border border-white/5 hover:border-[#0078D4]/40 text-zinc-300 hover:text-white transition-all text-xs font-medium"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="text-zinc-400 font-semibold text-xs">Top Apps &amp; Modules</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {topApps.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => handleDeepLinkClick(app.id)}
                        className="p-3 rounded-xl bg-black/30 hover:bg-white/10 border border-white/5 flex items-center gap-3 transition-all"
                      >
                        {app.icon}
                        <span className="text-zinc-200 font-medium truncate">{app.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Clean Ranked Search Results */}
            {searchResults && (
              <div className="space-y-3">
                <div className="text-zinc-400 font-semibold text-xs">
                  {searchResults.results.length > 0
                    ? `Matching Results (${searchResults.results.length})`
                    : "No matching results"}
                </div>

                {searchResults.results.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500 rounded-xl bg-white/[0.02] border border-white/5">
                    No results found for &quot;{searchQuery}&quot;. Try searching for projects, skills, or experience.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.results.map((res, i) => (
                      <div
                        key={i}
                        onClick={() => handleDeepLinkClick(res.chunk.windowId, res.chunk.targetId)}
                        className="group p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#0078D4]/50 hover:bg-[#0078D4]/10 cursor-pointer transition-all flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            {getWindowAppIcon(res.chunk.windowId)}
                            <span className="font-semibold text-white group-hover:text-[#0078D4] transition-colors">
                              {res.chunk.title}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/5 uppercase">
                              {res.chunk.category}
                            </span>
                          </div>
                          <p className="text-zinc-400 line-clamp-2 leading-relaxed text-[11px]">
                            {res.snippet}
                          </p>
                        </div>

                        <button className="px-2.5 py-1 rounded bg-zinc-900 group-hover:bg-[#0078D4] text-zinc-300 group-hover:text-white text-[11px] font-medium flex items-center gap-1 transition-colors flex-shrink-0 mt-0.5">
                          <span>Open</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>Windows 11 Search Index</span>
            <span>Press ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
