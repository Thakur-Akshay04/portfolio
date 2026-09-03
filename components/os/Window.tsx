"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Square, Copy, X, LucideIcon } from "lucide-react";
import { WindowId, useWindowManager } from "@/context/WindowManagerContext";
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

interface WindowProps {
  id: WindowId;
  title: string;
  iconName?: string;
  children: React.ReactNode;
}

export default function Window({ id, title, children }: WindowProps) {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updatePosition,
    updateSize,
  } = useWindowManager();

  const state = windows[id];
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showSnapFlyout, setShowSnapFlyout] = useState(false);

  // Handle header dragging manually for pixel-perfect smooth OS feel
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.isMaximized) return;
    focusWindow(id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - state.position.x,
      y: e.clientY - state.position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || state.isMaximized) return;
      const newX = Math.max(10, Math.min(window.innerWidth - 120, e.clientX - dragOffset.x));
      const newY = Math.max(10, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
      updatePosition(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, id, state.isMaximized, updatePosition]);

  if (!state.isOpen) return null;

  const isActive = activeWindowId === id;

  const getWindowIcon = () => {
    switch (id) {
      case "about":
        return <Win11ThisPC className="w-4 h-4" />;
      case "projects":
        return <Win11Edge className="w-4 h-4" />;
      case "skills":
        return <Win11FileExplorer className="w-4 h-4" />;
      case "terminal":
        return <Win11Terminal className="w-4 h-4" />;
      case "contact":
        return <Win11Mail className="w-4 h-4" />;
      case "resume":
        return <Win11Notepad className="w-4 h-4" />;
      case "experience":
        return <Win11Settings className="w-4 h-4" />;
      case "recycle":
        return <Win11RecycleBin className="w-4 h-4" />;
      default:
        return <Win11FileExplorer className="w-4 h-4" />;
    }
  };

  const handleSnap = (type: "left" | "right" | "top-left" | "top-right") => {
    setShowSnapFlyout(false);
    const screenW = window.innerWidth;
    const screenH = window.innerHeight - 48;

    if (type === "left") {
      updatePosition(id, { x: 0, y: 0 });
      updateSize(id, { width: screenW / 2, height: screenH });
    } else if (type === "right") {
      updatePosition(id, { x: screenW / 2, y: 0 });
      updateSize(id, { width: screenW / 2, height: screenH });
    } else if (type === "top-left") {
      updatePosition(id, { x: 0, y: 0 });
      updateSize(id, { width: screenW / 2, height: screenH / 2 });
    } else if (type === "top-right") {
      updatePosition(id, { x: screenW / 2, y: 0 });
      updateSize(id, { width: screenW / 2, height: screenH / 2 });
    }
  };

  return (
    <AnimatePresence>
      {!state.isMinimized && (
        <motion.div
          ref={windowRef}
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 350, damping: 28 },
          }}
          exit={{ scale: 0.92, opacity: 0, y: 20, transition: { duration: 0.15 } }}
          onMouseDown={() => focusWindow(id)}
          style={{
            zIndex: state.zIndex,
            ...(state.isMaximized
              ? {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "calc(100vh - 48px)", // Above Windows 11 taskbar
                  borderRadius: 0,
                }
              : {
                  position: "fixed",
                  top: `${state.position.y}px`,
                  left: `${state.position.x}px`,
                  width: `min(${state.size.width}px, 94vw)`,
                  height: `min(${state.size.height}px, 84vh)`,
                }),
          }}
          className={`flex flex-col overflow-hidden transition-shadow duration-200 ${
            state.isMaximized ? "rounded-none" : "rounded-xl"
          } ${
            isActive
              ? "win11-mica ring-1 ring-white/15 shadow-2xl"
              : "win11-acrylic opacity-95 shadow-xl border border-white/5"
          }`}
        >
          {/* Windows 11 Fluent Titlebar */}
          <div
            onMouseDown={handleMouseDown}
            onDoubleClick={() => toggleMaximizeWindow(id)}
            className={`flex items-center justify-between px-3.5 py-2 select-none cursor-move transition-colors ${
              isActive ? "bg-white/[0.04] border-b border-white/10" : "bg-black/30 border-b border-white/5"
            }`}
          >
            {/* Title & Icon */}
            <div className="flex items-center gap-2.5 text-xs text-zinc-200 font-sans">
              <div className="flex items-center justify-center">
                {getWindowIcon()}
              </div>
              <span className="font-semibold tracking-tight truncate max-w-[280px] sm:max-w-[450px]">
                {title}
              </span>
            </div>

            {/* Windows 11 Controls: Minimize, Maximize, Close */}
            <div className="relative flex items-center -mr-1" onMouseDown={(e) => e.stopPropagation()}>
              <button
                onClick={() => minimizeWindow(id)}
                aria-label="Minimize"
                className="w-11 h-8 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div
                className="relative"
                onMouseEnter={() => setShowSnapFlyout(true)}
                onMouseLeave={() => setShowSnapFlyout(false)}
              >
                <button
                  onClick={() => toggleMaximizeWindow(id)}
                  aria-label="Maximize"
                  className="w-11 h-8 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  {state.isMaximized ? (
                    <Copy className="w-3 h-3" />
                  ) : (
                    <Square className="w-3 h-3" />
                  )}
                </button>

                {/* Windows 11 Snap Layouts Flyout on Hover */}
                {showSnapFlyout && (
                  <div className="absolute top-8 right-0 z-50 p-3 bg-[#1e1e24] border border-white/20 rounded-xl shadow-2xl win11-mica w-52 space-y-2 select-none animate-flyout">
                    <div className="text-[10px] font-mono text-zinc-400">Snap Layouts</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        onClick={() => handleSnap("left")}
                        className="h-14 border border-white/20 rounded-lg p-1 hover:border-[#0078D4] hover:bg-[#0078D4]/20 cursor-pointer flex gap-1 transition-all"
                      >
                        <div className="w-1/2 h-full bg-white/20 rounded-sm" />
                        <div className="w-1/2 h-full bg-white/5 rounded-sm" />
                      </div>
                      <div
                        onClick={() => handleSnap("right")}
                        className="h-14 border border-white/20 rounded-lg p-1 hover:border-[#0078D4] hover:bg-[#0078D4]/20 cursor-pointer flex gap-1 transition-all"
                      >
                        <div className="w-1/2 h-full bg-white/5 rounded-sm" />
                        <div className="w-1/2 h-full bg-white/20 rounded-sm" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => closeWindow(id)}
                aria-label="Close"
                className="w-11 h-8 flex items-center justify-center hover:bg-[#E81123] text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Window Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 text-zinc-300 font-sans custom-os-scrollbar bg-black/20">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
