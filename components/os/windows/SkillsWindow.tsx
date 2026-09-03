"use client";

import React, { useState, useEffect, useRef } from "react";
import { TECH_CATEGORIES } from "@/constants/skills";
import { TechIcon } from "@/components/icons/TechIcons";
import { useWindowManager } from "@/context/WindowManagerContext";
import {
  Search,
  Folder,
  Layers,
  Cpu,
  Server,
  Database,
  Terminal,
  Code2,
  ChevronRight,
  HardDrive,
  FolderTree,
} from "lucide-react";
import { Win11FileExplorer } from "@/components/icons/Win11Icons";

export default function SkillsWindow() {
  const { windows } = useWindowManager();
  const highlightId = windows.skills?.targetHighlightId;
  const [userSelectedCategory, setUserSelectedCategory] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const targetCategoryTitle = React.useMemo(() => {
    if (highlightId && highlightId.startsWith("cat-")) {
      const catKey = highlightId.replace("cat-", "");
      const matched = TECH_CATEGORIES.find(
        (c) => c.title.replace(/\s+/g, "-").toLowerCase() === catKey
      );
      if (matched) return matched.title;
    }
    return null;
  }, [highlightId]);

  const selectedCategory = targetCategoryTitle || userSelectedCategory;

  const getCategoryIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("language")) return <Code2 className="w-4 h-4 text-amber-400" />;
    if (t.includes("frontend")) return <Layers className="w-4 h-4 text-cyan-400" />;
    if (t.includes("backend")) return <Server className="w-4 h-4 text-emerald-400" />;
    if (t.includes("database")) return <Database className="w-4 h-4 text-purple-400" />;
    if (t.includes("devops")) return <Terminal className="w-4 h-4 text-orange-400" />;
    if (t.includes("ai") || t.includes("api")) return <Cpu className="w-4 h-4 text-pink-400" />;
    return <Folder className="w-4 h-4 text-zinc-400" />;
  };

  const filteredCategories = TECH_CATEGORIES.map((cat) => {
    const matchesCategory = selectedCategory === "all" || selectedCategory === cat.title;
    const filteredItems = cat.items.filter((item) =>
      item.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
    return {
      ...cat,
      items: filteredItems,
      isVisible: matchesCategory && filteredItems.length > 0,
    };
  }).filter((cat) => cat.isVisible);

  return (
    <div className="flex flex-col h-full min-h-[460px] space-y-3 select-none text-zinc-300">
      {/* File Explorer Address Bar */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121217] border border-white/10 text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-zinc-400 font-mono flex-1 truncate">
          <HardDrive className="w-3.5 h-3.5 text-[#0078D4]" />
          <span className="text-zinc-500 font-sans">This PC &gt; Local Disk (C:) &gt; Akshay &gt; Skills &gt;</span>
          <span className="text-white font-semibold">{selectedCategory === "all" ? "All Directories" : selectedCategory}</span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 w-48 sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search technologies..."
            className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Split Explorer: Navigation Tree & Content Grid */}
      <div className="flex flex-col md:flex-row flex-1 gap-4 overflow-hidden">
        {/* Left Tree Navigation Pane */}
        <div className="w-full md:w-56 flex-shrink-0 flex flex-col gap-1 p-3 rounded-2xl bg-white/[0.02] border border-white/10 overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 px-2 py-1 flex items-center gap-1.5 font-mono">
            <FolderTree className="w-3.5 h-3.5 text-[#0078D4]" />
            <span>Navigation Pane</span>
          </div>

          <button
            onClick={() => setUserSelectedCategory("all")}
            className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between transition-all ${
              selectedCategory === "all"
                ? "bg-[#0078D4]/20 text-white border border-[#0078D4]/40 font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>All Skills</span>
            </div>
            <span className="text-[10px] font-mono opacity-70">
              {TECH_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0)}
            </span>
          </button>

          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setUserSelectedCategory(cat.title)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between whitespace-nowrap transition-all ${
                selectedCategory === cat.title
                  ? "bg-[#0078D4]/20 text-white border border-[#0078D4]/40 font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {getCategoryIcon(cat.title)}
                <span className="truncate">{cat.title}</span>
              </div>
              <span className="text-[10px] font-mono opacity-70">{cat.items.length}</span>
            </button>
          ))}
        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-xs rounded-2xl bg-white/[0.02] border border-white/5">
              No matching technologies found for &quot;{searchFilter}&quot;
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div
                key={cat.title}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
              >
                <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                  {getCategoryIcon(cat.title)}
                  <h3 className="text-xs font-bold tracking-wide text-white uppercase font-display">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 ml-auto">
                    {cat.items.length} items
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="group p-3 rounded-xl bg-black/40 border border-white/5 hover:border-[#0078D4]/50 hover:bg-white/[0.04] transition-all flex items-center gap-3"
                    >
                      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <TechIcon name={item.name} className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
