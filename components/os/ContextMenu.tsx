"use client";

import React, { useEffect, useRef } from "react";
import { useWindowManager } from "@/context/WindowManagerContext";
import {
  RotateCcw,
  Terminal,
  FolderGit2,
  Cpu,
  Sliders,
  Monitor,
  Paintbrush,
  Info,
} from "lucide-react";
import {
  Win11Terminal,
  Win11Settings,
  Win11FileExplorer,
  Win11ThisPC,
  Win11Search,
} from "@/components/icons/Win11Icons";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { openWindow, wallpaper, setWallpaper, setSearchOpen } = useWindowManager();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const wallpapers = [
    { id: "bloom-dark", name: "Windows 11 Bloom Dark" },
    { id: "sun-valley", name: "Sun Valley Glow" },
    { id: "flow", name: "Windows 11 Flow" },
    { id: "obsidian", name: "Dark Obsidian Mica" },
  ];

  const cycleWallpaper = () => {
    const currentIdx = wallpapers.findIndex((w) => w.id === wallpaper);
    const nextIdx = (currentIdx + 1) % wallpapers.length;
    setWallpaper(wallpapers[nextIdx].id);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        top: Math.min(y, window.innerHeight - 320),
        left: Math.min(x, window.innerWidth - 240),
        zIndex: 9999,
      }}
      className="w-60 p-1.5 rounded-xl win11-mica shadow-2xl text-xs text-zinc-200 select-none animate-flyout border border-white/15"
    >
      <button
        onClick={() => {
          window.location.reload();
          onClose();
        }}
        className="w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center gap-2.5 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
        <span>Refresh Desktop</span>
      </button>

      <button
        onClick={() => {
          openWindow("terminal");
          onClose();
        }}
        className="w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center gap-2.5 transition-colors"
      >
        <Win11Terminal className="w-4 h-4" />
        <span>Open in Windows Terminal</span>
      </button>

      <button
        onClick={() => {
          setSearchOpen(true);
          onClose();
        }}
        className="w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center gap-2.5 transition-colors"
      >
        <Win11Search className="w-3.5 h-3.5 text-zinc-300" />
        <span>Search Portfolio (Ctrl + K)</span>
      </button>

      <div className="my-1 border-t border-white/10" />

      <button
        onClick={() => {
          openWindow("projects");
          onClose();
        }}
        className="w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center gap-2.5 transition-colors"
      >
        <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
        <span>Browse Projects</span>
      </button>

      <button
        onClick={() => {
          openWindow("skills");
          onClose();
        }}
        className="w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center gap-2.5 transition-colors"
      >
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <span>Skills &amp; Technologies</span>
      </button>

      <div className="my-1 border-t border-white/10" />

      <button
        onClick={cycleWallpaper}
        className="w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Paintbrush className="w-3.5 h-3.5 text-amber-400" />
          <span>Next Wallpaper Theme</span>
        </div>
        <span className="text-[10px] text-zinc-400 font-mono">Personalize</span>
      </button>

      <button
        onClick={() => {
          openWindow("about");
          onClose();
        }}
        className="w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center gap-2.5 transition-colors"
      >
        <Info className="w-3.5 h-3.5 text-blue-400" />
        <span>System Properties</span>
      </button>
    </div>
  );
}
