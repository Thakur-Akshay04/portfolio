"use client";

import React, { useState, useEffect } from "react";
import {
  Wifi,
  Volume2,
  VolumeX,
  Battery,
  ChevronUp,
  Moon,
  Sun,
  Bluetooth,
  Laptop,
  Sliders,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";
import { WindowId, useWindowManager, WINDOW_CONFIGS } from "@/context/WindowManagerContext";
import {
  Win11Logo,
  Win11Search,
  Win11Widgets,
  Win11FileExplorer,
  Win11Edge,
  Win11Terminal,
  Win11Mail,
  Win11Notepad,
  Win11Settings,
  Win11ThisPC,
} from "@/components/icons/Win11Icons";

export default function Taskbar() {
  const {
    windows,
    activeWindowId,
    startMenuOpen,
    setStartMenuOpen,
    setSearchOpen,
    toggleWindow,
    wallpaper,
    setWallpaper,
    openWindow,
  } = useWindowManager();

  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [volume, setVolume] = useState(80);
  const [brightness, setBrightness] = useState(100);
  const [nightLight, setNightLight] = useState(false);

  // Live System Clock in IST & Local Time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString([], {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const pinnedApps: { id: WindowId; label: string; icon: React.ReactNode }[] = [
    { id: "about", label: "System Info", icon: <Win11ThisPC className="w-6 h-6" /> },
    { id: "projects", label: "Projects Explorer", icon: <Win11Edge className="w-6 h-6" /> },
    { id: "skills", label: "Skills Directory", icon: <Win11FileExplorer className="w-6 h-6" /> },
    { id: "terminal", label: "Windows Terminal", icon: <Win11Terminal className="w-6 h-6" /> },
    { id: "resume", label: "Notepad (Resume)", icon: <Win11Notepad className="w-6 h-6" /> },
    { id: "contact", label: "Outlook Mail", icon: <Win11Mail className="w-6 h-6" /> },
    { id: "experience", label: "Settings", icon: <Win11Settings className="w-6 h-6" /> },
  ];

  const wallpapersList = [
    { id: "bloom-dark", label: "Windows 11 Bloom Dark" },
    { id: "sun-valley", label: "Sun Valley Glow" },
    { id: "flow", label: "Windows 11 Flow" },
    { id: "obsidian", label: "Dark Obsidian Mica" },
  ];

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 h-12 z-50 win11-taskbar flex items-center justify-between px-2 select-none">
        {/* Left Side: Widgets / Weather */}
        <div className="flex items-center min-w-[120px]">
          <button
            onClick={() => openWindow("about")}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-white/10 text-xs text-zinc-300 transition-colors"
            title="Himachal Pradesh, India · Sunny 22°C"
          >
            <Win11Widgets className="w-4 h-4" />
            <span className="hidden lg:inline-block font-mono text-[11px]">
              Himachal 22°C
            </span>
          </button>
        </div>

        {/* Center Section: Centered Windows 11 Taskbar Icons */}
        <div className="flex items-center gap-1 justify-center">
          {/* Start Menu Button */}
          <button
            id="win11-start-btn"
            onClick={() => {
              setStartMenuOpen((prev) => !prev);
              setQuickSettingsOpen(false);
              setCalendarOpen(false);
            }}
            className={`p-2 rounded-md flex items-center justify-center transition-all ${
              startMenuOpen
                ? "bg-white/15 shadow-inner"
                : "hover:bg-white/10"
            }`}
            title="Start"
          >
            <Win11Logo className="w-6 h-6" />
          </button>

          {/* Search Button */}
          <button
            onClick={() => {
              setSearchOpen(true);
              setStartMenuOpen(false);
            }}
            className="p-2 rounded-md hover:bg-white/10 transition-colors flex items-center justify-center"
            title="Search (Ctrl + K)"
          >
            <Win11Search className="w-5 h-5" />
          </button>

          {/* Pinned & Running Apps */}
          {pinnedApps.map((app) => {
            const win = windows[app.id];
            const isOpen = win?.isOpen;
            const isActive = activeWindowId === app.id && !win?.isMinimized;

            return (
              <button
                key={app.id}
                onClick={() => {
                  toggleWindow(app.id);
                  setStartMenuOpen(false);
                }}
                className={`relative p-2 rounded-md flex items-center justify-center transition-all group ${
                  isActive
                    ? "bg-white/15"
                    : isOpen
                    ? "bg-white/[0.06] hover:bg-white/10"
                    : "hover:bg-white/10"
                }`}
                title={app.label}
              >
                <div className="group-hover:scale-105 transition-transform">
                  {app.icon}
                </div>

                {/* Windows 11 Running Pill Indicator */}
                {isOpen && (
                  <div
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all ${
                      isActive
                        ? "w-4 bg-[#0078D4]"
                        : "w-1.5 bg-zinc-400"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Section: System Tray & Clock */}
        <div className="flex items-center gap-1 min-w-[120px] justify-end text-xs text-zinc-300">
          {/* Quick Settings Plate (Wifi + Volume + Battery) */}
          <button
            onClick={() => {
              setQuickSettingsOpen(!quickSettingsOpen);
              setCalendarOpen(false);
              setStartMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${
              quickSettingsOpen ? "bg-white/15" : "hover:bg-white/10"
            }`}
            title="Quick Settings"
          >
            <Wifi className="w-3.5 h-3.5" />
            {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <Battery className="w-3.5 h-3.5" />
          </button>

          {/* Clock & Date Pill */}
          <button
            onClick={() => {
              setCalendarOpen(!calendarOpen);
              setQuickSettingsOpen(false);
              setStartMenuOpen(false);
            }}
            className={`px-2.5 py-1 rounded-md text-right transition-colors ${
              calendarOpen ? "bg-white/15" : "hover:bg-white/10"
            }`}
            title="Calendar and Notifications"
          >
            <div className="font-mono text-[11px] font-medium leading-tight">
              {time || "12:00 PM"}
            </div>
            <div className="font-mono text-[10px] text-zinc-400 leading-tight">
              {date || "8/31/2026"}
            </div>
          </button>

          {/* Desktop Peek line */}
          <div
            onClick={() => {
              Object.keys(windows).forEach((id) => {
                const wId = id as WindowId;
                if (windows[wId].isOpen) {
                  // minimize all
                }
              });
            }}
            className="w-1 h-6 ml-0.5 hover:bg-white/20 rounded-sm cursor-pointer"
            title="Show Desktop"
          />
        </div>
      </footer>

      {/* Windows 11 Quick Settings Flyout */}
      {quickSettingsOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-14 right-3 z-50 w-80 win11-mica rounded-2xl p-4 space-y-4 shadow-2xl animate-flyout text-xs text-zinc-200 select-none"
        >
          {/* Quick Action Tiles */}
          <div className="grid grid-cols-3 gap-2">
            <button className="p-3 rounded-xl bg-[#0078D4] text-white flex flex-col items-center gap-1.5 font-medium shadow-md">
              <Wifi className="w-4 h-4" />
              <span>Wi-Fi</span>
            </button>
            <button className="p-3 rounded-xl bg-[#0078D4] text-white flex flex-col items-center gap-1.5 font-medium shadow-md">
              <Bluetooth className="w-4 h-4" />
              <span>Bluetooth</span>
            </button>
            <button
              onClick={() => setNightLight(!nightLight)}
              className={`p-3 rounded-xl flex flex-col items-center gap-1.5 font-medium transition-all ${
                nightLight ? "bg-[#0078D4] text-white" : "bg-white/5 hover:bg-white/10 text-zinc-300"
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Night light</span>
            </button>
          </div>

          {/* Sliders: Volume & Brightness */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-3">
              <Sun className="w-4 h-4 text-zinc-400" />
              <input
                type="range"
                min="20"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-[#0078D4] cursor-pointer"
              />
              <span className="font-mono text-[10px] w-6">{brightness}%</span>
            </div>

            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-zinc-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-[#0078D4] cursor-pointer"
              />
              <span className="font-mono text-[10px] w-6">{volume}%</span>
            </div>
          </div>

          {/* Wallpaper Selection */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="text-[11px] font-semibold text-zinc-400 flex items-center justify-between">
              <span>Personalization</span>
              <span className="font-mono text-purple-400">Windows 11</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {wallpapersList.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className={`p-2 rounded-lg text-left text-[11px] transition-all truncate ${
                    wallpaper === wp.id
                      ? "bg-[#0078D4]/30 border border-[#0078D4] text-white font-medium"
                      : "bg-white/5 hover:bg-white/10 text-zinc-300"
                  }`}
                >
                  {wp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Battery Status Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Fully Charged</span>
            </div>
            <button
              onClick={() => {
                openWindow("about");
                setQuickSettingsOpen(false);
              }}
              className="hover:text-white"
            >
              All Settings
            </button>
          </div>
        </div>
      )}

      {/* Windows 11 Calendar & Notification Flyout */}
      {calendarOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-14 right-3 z-50 w-80 win11-mica rounded-2xl p-5 space-y-4 shadow-2xl animate-flyout text-xs text-zinc-200 select-none"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="font-mono text-sm font-bold text-white">{time}</div>
            <span className="text-zinc-400 font-mono text-[11px]">{date}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
            <div className="font-semibold text-white flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-[#0078D4]" />
              <span>Akshay Singh Thakur Portfolio</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Full-Stack Software Engineer. Available for engineering contracts &amp; roles.
            </p>
          </div>

          <div className="flex justify-between items-center text-[11px] text-zinc-500 font-mono">
            <span>Notification Center</span>
            <button onClick={() => setCalendarOpen(false)} className="hover:text-zinc-300">
              Clear all
            </button>
          </div>
        </div>
      )}
    </>
  );
}
