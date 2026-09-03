"use client";

import React, { useState } from "react";
import { WindowId, useWindowManager, WINDOW_CONFIGS } from "@/context/WindowManagerContext";
import Window from "./Window";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import SearchModal from "./SearchModal";
import ContextMenu from "./ContextMenu";
import LiquidBackground from "./LiquidBackground";
import dynamic from "next/dynamic";
import {
  Win11ThisPC,
  Win11FileExplorer,
  Win11Terminal,
  Win11Edge,
  Win11Mail,
  Win11Notepad,
  Win11Settings,
  Win11RecycleBin,
} from "@/components/icons/Win11Icons";

// Dynamic on-demand loading of window components for optimal performance
const AboutWindow = dynamic(() => import("./windows/AboutWindow"), { ssr: false });
const SkillsWindow = dynamic(() => import("./windows/SkillsWindow"), { ssr: false });
const ProjectsWindow = dynamic(() => import("./windows/ProjectsWindow"), { ssr: false });
const ExperienceWindow = dynamic(() => import("./windows/ExperienceWindow"), { ssr: false });
const ContactWindow = dynamic(() => import("./windows/ContactWindow"), { ssr: false });
const ResumeWindow = dynamic(() => import("./windows/ResumeWindow"), { ssr: false });
const TerminalWindow = dynamic(() => import("./windows/TerminalWindow"), { ssr: false });
const RecycleBinWindow = dynamic(() => import("./windows/RecycleBinWindow"), { ssr: false });

interface DesktopIconItem {
  id: WindowId;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
}

export default function Desktop() {
  const { openWindow, wallpaper, setStartMenuOpen } = useWindowManager();

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);

  // Selection marquee box state
  const [selectionBox, setSelectionBox] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    isSelecting: boolean;
  } | null>(null);

  const desktopIcons: DesktopIconItem[] = [
    {
      id: "about",
      label: "This PC",
      sublabel: "About Akshay",
      icon: <Win11ThisPC className="w-11 h-11 drop-shadow-lg" />,
    },
    {
      id: "projects",
      label: "Projects",
      sublabel: "Edge Explorer",
      icon: <Win11Edge className="w-11 h-11 drop-shadow-lg" />,
    },
    {
      id: "skills",
      label: "Skills.dir",
      sublabel: "Tech Arsenal",
      icon: <Win11FileExplorer className="w-11 h-11 drop-shadow-lg" />,
    },
    {
      id: "terminal",
      label: "Terminal",
      sublabel: "PowerShell CLI",
      icon: <Win11Terminal className="w-11 h-11 drop-shadow-lg" />,
    },
    {
      id: "resume",
      label: "Resume.pdf",
      sublabel: "Notepad Viewer",
      icon: <Win11Notepad className="w-11 h-11 drop-shadow-lg" />,
    },
    {
      id: "contact",
      label: "Outlook",
      sublabel: "Mail Client",
      icon: <Win11Mail className="w-11 h-11 drop-shadow-lg" />,
    },
    {
      id: "experience",
      label: "Settings",
      sublabel: "Experience Log",
      icon: <Win11Settings className="w-11 h-11 drop-shadow-lg" />,
    },
    {
      id: "recycle",
      label: "Recycle Bin",
      sublabel: "Squashed Bugs",
      icon: <Win11RecycleBin className="w-11 h-11 drop-shadow-lg" isFull={false} />,
    },
  ];

  // Right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Drag selection marquee
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".desktop-item") || (e.target as HTMLElement).closest("button")) {
      return;
    }
    setStartMenuOpen(false);
    setSelectedIcon(null);
    if (contextMenu) setContextMenu(null);

    setSelectionBox({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isSelecting: true,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectionBox || !selectionBox.isSelecting) return;
    setSelectionBox((prev) => (prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null));
  };

  const handleMouseUp = () => {
    setSelectionBox(null);
  };

  // Wallpaper Class Resolver
  const getWallpaperClass = () => {
    switch (wallpaper) {
      case "sun-valley":
        return "bg-wallpaper-sun-valley";
      case "flow":
        return "bg-wallpaper-flow";
      case "obsidian":
        return "bg-wallpaper-obsidian";
      default:
        return "bg-wallpaper-bloom-dark";
    }
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-screen h-screen overflow-hidden select-none ${getWallpaperClass()} text-white font-sans`}
    >
      {/* Interactive Splashy Liquid Effect */}
      <LiquidBackground />

      {/* Subtle Desktop Ambient Lighting */}
      <div className="absolute inset-0 bg-desktop-grid opacity-30 pointer-events-none z-0" />

      {/* Windows 11 Watermark */}
      <div className="absolute bottom-16 right-6 text-right pointer-events-none opacity-30 select-none hidden md:block">
        <div className="text-xl font-bold tracking-tight text-white font-sans">
          Windows 11 Pro
        </div>
        <div className="text-xs font-mono text-zinc-300">
          Akshay Singh Thakur Edition · Build 22631.3007
        </div>
      </div>

      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-5 grid grid-flow-col grid-rows-6 auto-cols-max gap-4 sm:gap-6 w-fit h-[calc(100vh-60px)]">
        {desktopIcons.map((item) => {
          const isSelected = selectedIcon === item.id;

          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(item.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                openWindow(item.id);
              }}
              onTouchEnd={() => {
                openWindow(item.id);
              }}
              className={`desktop-item group w-20 sm:w-24 p-2 rounded-xl flex flex-col items-center gap-1.5 cursor-pointer text-center transition-all ${
                isSelected
                  ? "bg-[#0078D4]/25 ring-1 ring-[#0078D4]/70 border border-[#0078D4]/50 shadow-md shadow-black/40"
                  : "hover:bg-white/10 hover:border hover:border-white/10"
              }`}
            >
              <div className="group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <span className="text-xs font-medium text-white drop-shadow-md truncate w-full leading-tight">
                {item.label}
              </span>
              {item.sublabel && (
                <span className="text-[10px] text-zinc-300 font-mono -mt-1 truncate w-full hidden sm:block drop-shadow-sm opacity-80">
                  {item.sublabel}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Box Marquee */}
      {selectionBox && selectionBox.isSelecting && (
        <div
          style={{
            position: "fixed",
            left: Math.min(selectionBox.startX, selectionBox.currentX),
            top: Math.min(selectionBox.startY, selectionBox.currentY),
            width: Math.abs(selectionBox.currentX - selectionBox.startX),
            height: Math.abs(selectionBox.currentY - selectionBox.startY),
          }}
          className="bg-[#0078D4]/20 border border-[#0078D4]/70 pointer-events-none z-40 rounded-sm backdrop-blur-[0.5px]"
        />
      )}

      {/* Render All Open Windows */}
      <Window id="about" title="About Me - System Specifications">
        <AboutWindow />
      </Window>

      <Window id="skills" title="Skills & Technologies - File Explorer">
        <SkillsWindow />
      </Window>

      <Window id="projects" title="Projects Explorer - Microsoft Edge">
        <ProjectsWindow />
      </Window>

      <Window id="experience" title="Work Experience & Internships - Settings">
        <ExperienceWindow />
      </Window>

      <Window id="contact" title="Outlook - New Message to Akshay">
        <ContactWindow />
      </Window>

      <Window id="resume" title="Akshay_Singh_Thakur_Resume.pdf - Notepad">
        <ResumeWindow />
      </Window>

      <Window id="terminal" title="Windows Terminal (PowerShell / WSL)">
        <TerminalWindow />
      </Window>

      <Window id="recycle" title="Recycle Bin">
        <RecycleBinWindow />
      </Window>

      {/* Right Click Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Windows 11 Start Menu */}
      <StartMenu />

      {/* Windows 11 Search Modal */}
      <SearchModal />

      {/* Windows 11 Taskbar */}
      <Taskbar />
    </div>
  );
}
