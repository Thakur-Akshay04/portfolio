"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type WindowId =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact"
  | "resume"
  | "terminal"
  | "recycle";

export interface WindowConfig {
  id: WindowId;
  title: string;
  icon: string;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

export const WINDOW_CONFIGS: Record<WindowId, WindowConfig> = {
  about: {
    id: "about",
    title: "About Me",
    icon: "user",
    defaultPosition: { x: 80, y: 50 },
    defaultSize: { width: 780, height: 560 },
  },
  skills: {
    id: "skills",
    title: "Skills & Technologies",
    icon: "cpu",
    defaultPosition: { x: 120, y: 70 },
    defaultSize: { width: 840, height: 600 },
  },
  projects: {
    id: "projects",
    title: "Projects Explorer",
    icon: "folder-git",
    defaultPosition: { x: 160, y: 60 },
    defaultSize: { width: 900, height: 640 },
  },
  experience: {
    id: "experience",
    title: "Experience & Timeline",
    icon: "briefcase",
    defaultPosition: { x: 140, y: 80 },
    defaultSize: { width: 760, height: 560 },
  },
  contact: {
    id: "contact",
    title: "Mail / Contact",
    icon: "mail",
    defaultPosition: { x: 200, y: 90 },
    defaultSize: { width: 720, height: 580 },
  },
  resume: {
    id: "resume",
    title: "Resume Viewer (PDF)",
    icon: "file-text",
    defaultPosition: { x: 220, y: 60 },
    defaultSize: { width: 800, height: 620 },
  },
  terminal: {
    id: "terminal",
    title: "PowerShell / Terminal",
    icon: "terminal",
    defaultPosition: { x: 180, y: 110 },
    defaultSize: { width: 700, height: 460 },
  },
  recycle: {
    id: "recycle",
    title: "Recycle Bin",
    icon: "trash-2",
    defaultPosition: { x: 250, y: 120 },
    defaultSize: { width: 620, height: 420 },
  },
};

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  targetHighlightId?: string;
  initialData?: any;
}

interface WindowManagerContextType {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  startMenuOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  wallpaper: string;
  setWallpaper: (wp: string) => void;
  setStartMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setSearchOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setSearchQuery: (q: string) => void;
  openWindow: (id: WindowId, targetHighlightId?: string, initialData?: any) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  toggleWindow: (id: WindowId) => void;
  updatePosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateSize: (id: WindowId, size: { width: number; height: number }) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

const DEFAULT_WINDOWS_STATE: Record<WindowId, WindowState> = Object.keys(WINDOW_CONFIGS).reduce(
  (acc, key) => {
    const wId = key as WindowId;
    const config = WINDOW_CONFIGS[wId];
    acc[wId] = {
      id: wId,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: config.defaultPosition,
      size: config.defaultSize,
    };
    return acc;
  },
  {} as Record<WindowId, WindowState>
);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(DEFAULT_WINDOWS_STATE);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(20);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wallpaper, setWallpaper] = useState("cyber-dark");

  const focusWindow = useCallback(
    (id: WindowId) => {
      setHighestZIndex((prev) => {
        const newZ = prev + 1;
        setWindows((prevWindows) => ({
          ...prevWindows,
          [id]: {
            ...prevWindows[id],
            isMinimized: false,
            zIndex: newZ,
          },
        }));
        return newZ;
      });
      setActiveWindowId(id);
    },
    []
  );

  const openWindow = useCallback(
    (id: WindowId, targetHighlightId?: string, initialData?: any) => {
      setStartMenuOpen(false);
      setSearchOpen(false);
      setHighestZIndex((prev) => {
        const newZ = prev + 1;
        setWindows((prevWindows) => {
          const current = prevWindows[id];
          return {
            ...prevWindows,
            [id]: {
              ...current,
              isOpen: true,
              isMinimized: false,
              zIndex: newZ,
              targetHighlightId: targetHighlightId || current.targetHighlightId,
              initialData: initialData !== undefined ? initialData : current.initialData,
            },
          };
        });
        return newZ;
      });
      setActiveWindowId(id);
    },
    []
  );

  const closeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false,
          targetHighlightId: undefined,
        },
      }));
      setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
    },
    []
  );

  const minimizeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      }));
      setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
    },
    []
  );

  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  }, []);

  const toggleWindow = useCallback(
    (id: WindowId) => {
      const win = windows[id];
      if (!win.isOpen) {
        openWindow(id);
      } else if (win.isMinimized) {
        focusWindow(id);
      } else if (activeWindowId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [windows, activeWindowId, openWindow, focusWindow, minimizeWindow]
  );

  const updatePosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position,
      },
    }));
  }, []);

  const updateSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size,
      },
    }));
  }, []);

  // Keyboard shortcut: Ctrl+K or Cmd+K to open RAG search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setStartMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Automatically open "about" or "projects" on initial first load for immediate engagement
  useEffect(() => {
    const timer = setTimeout(() => {
      openWindow("about");
    }, 450);
    return () => clearTimeout(timer);
  }, [openWindow]);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindowId,
        startMenuOpen,
        searchOpen,
        searchQuery,
        wallpaper,
        setWallpaper,
        setStartMenuOpen,
        setSearchOpen,
        setSearchQuery,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        toggleWindow,
        updatePosition,
        updateSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return context;
}
