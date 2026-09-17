"use client";

import { useEffect, useState } from "react";
import { BackgroundRippleEffect } from "./background-ripple-effect";

export default function GlobalRippleBackground() {
  const [dimensions, setDimensions] = useState<{ rows: number; cols: number }>({
    rows: 14,
    cols: 28,
  });

  useEffect(() => {
    const updateSize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cellSize = 56;
      const cols = Math.min(45, Math.max(12, Math.ceil(w / cellSize) + 2));
      const rows = Math.min(30, Math.max(8, Math.ceil(h / cellSize) + 2));
      setDimensions({ rows, cols });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden select-none pointer-events-none">
      {/* Radial fade mask to keep it cinematic and subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_20%,#070709_90%)] z-10 pointer-events-none" />

      {/* Ripple Grid with pointer events enabled for background clicks */}
      <div className="absolute inset-0 pointer-events-auto [touch-action:pan-y] opacity-40 hover:opacity-60 transition-opacity duration-500">
        <BackgroundRippleEffect
          rows={dimensions.rows}
          cols={dimensions.cols}
          cellSize={56}
        />
      </div>
    </div>
  );
}
