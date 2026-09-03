"use client";

import React from "react";
import { WindowManagerProvider } from "@/context/WindowManagerContext";
import Desktop from "@/components/os/Desktop";

export default function Home() {
  return (
    <WindowManagerProvider>
      <main className="relative w-screen h-screen overflow-hidden bg-black select-none">
        {/* Authentic Windows 11 OS Desktop Environment */}
        <Desktop />
      </main>
    </WindowManagerProvider>
  );
}
