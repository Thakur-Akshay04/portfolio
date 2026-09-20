"use client";

import React from "react";
import { FloatingPaths } from "./background-paths";

export function GlobalPathsBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient Floating Paths rendered with zero SSR mount delay */}
      <div className="absolute inset-0 opacity-80 dark:opacity-90">
        <FloatingPaths position={1} count={26} />
        <FloatingPaths position={-1} count={26} />
      </div>
    </div>
  );
}

export default GlobalPathsBackground;
