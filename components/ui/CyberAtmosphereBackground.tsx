"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  phase: number;
}

export default function CyberAtmosphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const colors = ["#00f0ff", "#a855f7", "#38bdf8", "#c084fc"];
    const particleCount = Math.min(Math.floor(width / 24), 60);

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.35 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let isTabActive = true;
    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isTabActive) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw connecting constellation lines
      const maxDistance = 120;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += dt * 1.5;
        p.alpha = p.baseAlpha + Math.sin(p.phase) * 0.12;

        // Mouse avoidance/repulsion
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160 && mDist > 0) {
          const force = (160 - mDist) / 160;
          p.x += (mdx / mDist) * force * 1.2;
          p.y += (mdy / mDist) * force * 1.2;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Top Cyber Horizon Transition - Ethereal Laser Threshold */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_#00f0ff]" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-accent-purple/10 to-transparent pointer-events-none" />

      {/* 2. Precision Cyber Blueprint Dot-Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(0, 240, 255, 0.35) 1px, transparent 1px),
            radial-gradient(circle at center, rgba(168, 85, 247, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px, 72px 72px",
          backgroundPosition: "0 0, 18px 18px",
          maskImage: "radial-gradient(ellipse 85% 95% at 50% 50%, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 95% at 50% 50%, black 40%, transparent 95%)",
        }}
      />

      {/* 3. Multi-Section Chromatic Nebula & Energy Blooms */}
      {/* About Section Bloom (Top Right Electric Cyan & Violet Glow) */}
      <div className="absolute top-[3%] -left-32 w-[550px] h-[550px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: "9s" }} />
      <div className="absolute top-[8%] -right-24 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />

      {/* Skills Section Bloom (Mid Left Neon Violet Energy Field) */}
      <div className="absolute top-[26%] right-0 w-[650px] h-[650px] rounded-full bg-accent-purple/15 blur-[160px] pointer-events-none" />
      <div className="absolute top-[32%] -left-20 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

      {/* Projects Section Bloom (Center Cyber Amber & Emerald Subtle Spotlights) */}
      <div className="absolute top-[52%] left-1/4 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-amber-500/10 blur-[170px] pointer-events-none" />
      <div className="absolute top-[60%] right-10 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[160px] pointer-events-none" />

      {/* Experience Section Bloom (Lower Left Cyber Violet Stream) */}
      <div className="absolute top-[75%] -left-16 w-[550px] h-[550px] rounded-full bg-cyan-400/12 blur-[150px] pointer-events-none" />

      {/* Contact Section Bloom (Bottom Center Converging Energy Core) */}
      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[850px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/15 via-purple-600/20 to-amber-500/10 blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />

      {/* 4. Interactive Stardust & Constellation Stream Canvas (Fixed Overlay) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* 5. Precision Architectural Telemetry Watermarks */}
      <div className="hidden 2xl:flex flex-col fixed left-4 top-1/3 text-[9px] font-mono text-cyan-400/25 tracking-[0.3em] uppercase gap-2 select-none -rotate-90 origin-left">
        <span>SYS_TELEMETRY // V3.8</span>
        <span className="text-purple-400/25">BUFFER // NOMINAL</span>
      </div>
      <div className="hidden 2xl:flex flex-col fixed right-4 top-2/3 text-[9px] font-mono text-purple-400/25 tracking-[0.3em] uppercase gap-2 select-none rotate-90 origin-right">
        <span>CORE_GRID // ACTIVE</span>
        <span className="text-cyan-400/25">STACK // FULL_STACK_DEV</span>
      </div>
    </div>
  );
}
