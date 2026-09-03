"use client";

import React, { useEffect, useRef } from "react";

interface Droplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
  colorStart: string;
  colorEnd: string;
  specularColor: string;
  wobble: number;
  wobbleSpeed: number;
  aspect: number; // For directional elongation of splashed drops
  angle: number;  // Direction of movement
  active: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  lineWidth: number;
  active: boolean;
}

const MAX_DROPLETS = 300;
const MAX_RIPPLES = 15;

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pre-allocated object pools
    const droplets: Droplet[] = [];
    for (let i = 0; i < MAX_DROPLETS; i++) {
      droplets.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 0,
        maxRadius: 0,
        alpha: 0,
        decay: 0.01,
        colorStart: "rgba(0, 242, 254, 0.9)",
        colorEnd: "rgba(0, 120, 212, 0)",
        specularColor: "rgba(255, 255, 255, 0.8)",
        wobble: 0,
        wobbleSpeed: 0.05,
        aspect: 1,
        angle: 0,
        active: false,
      });
    }

    const ripples: Ripple[] = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
      ripples.push({
        x: 0,
        y: 0,
        radius: 0,
        maxRadius: 0,
        alpha: 0,
        lineWidth: 2,
        active: false,
      });
    }

    // Dynamic Liquid Palettes (Cyan, Azure, Deep Blue, Royal Violet)
    const fluidColors = [
      { start: "rgba(0, 242, 254, 0.85)", mid: "rgba(0, 120, 212, 0.6)", end: "rgba(0, 120, 212, 0)" },
      { start: "rgba(56, 189, 248, 0.85)", mid: "rgba(37, 99, 235, 0.6)", end: "rgba(30, 58, 138, 0)" },
      { start: "rgba(129, 140, 248, 0.85)", mid: "rgba(79, 70, 229, 0.6)", end: "rgba(67, 56, 202, 0)" },
      { start: "rgba(168, 85, 247, 0.8)", mid: "rgba(124, 58, 237, 0.55)", end: "rgba(109, 40, 217, 0)" },
      { start: "rgba(45, 212, 191, 0.85)", mid: "rgba(14, 165, 233, 0.6)", end: "rgba(2, 132, 199, 0)" },
    ];

    const getFreeDroplet = (): Droplet | null => {
      for (let i = 0; i < MAX_DROPLETS; i++) {
        if (!droplets[i].active) return droplets[i];
      }
      return null;
    };

    const getFreeRipple = (): Ripple | null => {
      for (let i = 0; i < MAX_RIPPLES; i++) {
        if (!ripples[i].active) return ripples[i];
      }
      return null;
    };

    // Splash generator in direction of mouse motion
    const createDirectionalSplash = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      speed: number
    ) => {
      const baseAngle = Math.atan2(vy, vx);
      const splashCount = Math.min(Math.floor(speed * 0.4) + 2, 8);

      // Core liquid trail bloblet
      const core = getFreeDroplet();
      if (core) {
        const pal = fluidColors[Math.floor(Math.random() * fluidColors.length)];
        core.x = x;
        core.y = y;
        core.vx = vx * 0.15;
        core.vy = vy * 0.15;
        core.radius = Math.min(speed * 1.2 + 8, 38);
        core.maxRadius = core.radius;
        core.alpha = 0.85;
        core.decay = 0.018 + Math.random() * 0.012;
        core.colorStart = pal.start;
        core.colorEnd = pal.end;
        core.wobble = Math.random() * Math.PI * 2;
        core.wobbleSpeed = 0.08 + Math.random() * 0.06;
        core.aspect = Math.min(1 + speed * 0.03, 2.2);
        core.angle = baseAngle;
        core.active = true;
      }

      // Splashed forward droplets
      for (let i = 0; i < splashCount; i++) {
        const d = getFreeDroplet();
        if (!d) break;

        const pal = fluidColors[Math.floor(Math.random() * fluidColors.length)];
        // Splash cone: within +/- 45 degrees of mouse velocity vector
        const spreadAngle = baseAngle + (Math.random() - 0.5) * 1.3;
        const dropletSpeed = speed * (0.3 + Math.random() * 0.85) + 1.5;

        d.x = x + (Math.random() - 0.5) * 12;
        d.y = y + (Math.random() - 0.5) * 12;
        d.vx = Math.cos(spreadAngle) * dropletSpeed;
        d.vy = Math.sin(spreadAngle) * dropletSpeed;
        d.radius = Math.max(3, Math.min(18, (speed * 0.5 + 4) * (0.5 + Math.random() * 0.6)));
        d.maxRadius = d.radius;
        d.alpha = 0.75 + Math.random() * 0.2;
        d.decay = 0.012 + Math.random() * 0.016;
        d.colorStart = pal.start;
        d.colorEnd = pal.end;
        d.wobble = Math.random() * Math.PI * 2;
        d.wobbleSpeed = 0.1 + Math.random() * 0.1;
        d.aspect = 1 + Math.random() * 0.8;
        d.angle = spreadAngle;
        d.active = true;
      }
    };

    // Burst splash impact on mouse click / tap
    const createBurstSplash = (x: number, y: number, intensity: number = 30) => {
      const count = Math.min(intensity, 45);

      // Radial fluid ripples
      const r = getFreeRipple();
      if (r) {
        r.x = x;
        r.y = y;
        r.radius = 8;
        r.maxRadius = 140 + Math.random() * 40;
        r.alpha = 0.8;
        r.lineWidth = 4;
        r.active = true;
      }

      const r2 = getFreeRipple();
      if (r2) {
        r2.x = x;
        r2.y = y;
        r2.radius = 4;
        r2.maxRadius = 90 + Math.random() * 20;
        r2.alpha = 0.6;
        r2.lineWidth = 2.5;
        r2.active = true;
      }

      // 360-degree explosive splash droplets
      for (let i = 0; i < count; i++) {
        const d = getFreeDroplet();
        if (!d) break;

        const pal = fluidColors[Math.floor(Math.random() * fluidColors.length)];
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const splashSpeed = 4 + Math.random() * 12;

        d.x = x + Math.cos(angle) * (4 + Math.random() * 8);
        d.y = y + Math.sin(angle) * (4 + Math.random() * 8);
        d.vx = Math.cos(angle) * splashSpeed;
        d.vy = Math.sin(angle) * splashSpeed;
        d.radius = 4 + Math.random() * 16;
        d.maxRadius = d.radius;
        d.alpha = 0.85 + Math.random() * 0.15;
        d.decay = 0.01 + Math.random() * 0.015;
        d.colorStart = pal.start;
        d.colorEnd = pal.end;
        d.wobble = Math.random() * Math.PI * 2;
        d.wobbleSpeed = 0.15;
        d.aspect = 1 + Math.random() * 0.6;
        d.angle = angle;
        d.active = true;
      }
    };

    // Tracking mouse velocity
    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();
    let hasMoved = false;

    const handlePointerMove = (e: PointerEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const currentTime = performance.now();
      const dt = Math.max(currentTime - lastTime, 1);

      if (!hasMoved) {
        lastX = currentX;
        lastY = currentY;
        lastTime = currentTime;
        hasMoved = true;
        return;
      }

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        const speed = Math.min((dist / dt) * 16, 45);
        createDirectionalSplash(currentX, currentY, dx, dy, speed);

        lastX = currentX;
        lastY = currentY;
        lastTime = currentTime;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Only trigger if not clicking on an active window header or interactive button
      const target = e.target as HTMLElement | null;
      if (target?.closest(".window-frame") || target?.closest("button") || target?.closest("input")) {
        return;
      }
      createBurstSplash(e.clientX, e.clientY, 32);
    };

    // Ambient liquid relaxation pulse when mouse is idle
    let idleCounter = 0;
    const generateIdleSplash = () => {
      idleCounter++;
      if (idleCounter % 110 === 0 && Math.random() > 0.4) {
        const rx = width * (0.2 + Math.random() * 0.6);
        const ry = height * (0.2 + Math.random() * 0.6);
        createBurstSplash(rx, ry, 12);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initial welcoming splash
    setTimeout(() => {
      createBurstSplash(width * 0.5, height * 0.45, 28);
    }, 300);

    // Main 60fps render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Expanding Liquid Ripples
      for (let i = 0; i < MAX_RIPPLES; i++) {
        const r = ripples[i];
        if (!r.active) continue;

        r.radius += (r.maxRadius - r.radius) * 0.055;
        r.alpha -= 0.016;

        if (r.alpha <= 0.01 || r.radius >= r.maxRadius - 1) {
          r.active = false;
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${r.alpha * 0.5})`;
        ctx.lineWidth = r.lineWidth;
        ctx.stroke();

        // Inner secondary ripple
        if (r.radius > 15) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(99, 102, 241, ${r.alpha * 0.35})`;
          ctx.lineWidth = r.lineWidth * 0.7;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Render Liquid Droplets & Viscous Splash Pools
      for (let i = 0; i < MAX_DROPLETS; i++) {
        const d = droplets[i];
        if (!d.active) continue;

        // Fluid physics: Viscous deceleration and surface spreading
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.93; // Viscosity drag
        d.vy *= 0.93;
        d.wobble += d.wobbleSpeed;

        // Splat expansion as droplet slows down on surface
        const currentSpeed = Math.hypot(d.vx, d.vy);
        if (currentSpeed < 1.5 && d.radius < d.maxRadius * 1.3) {
          d.radius += 0.25;
        }

        d.alpha -= d.decay;
        if (d.alpha <= 0.01 || d.radius <= 1) {
          d.active = false;
          continue;
        }

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.angle);
        ctx.scale(d.aspect, 1 / d.aspect);

        // Fluid blob gradient with glowing surface tension
        const wobbleFactor = 1 + Math.sin(d.wobble) * 0.12;
        const effectiveRadius = Math.max(1, d.radius * wobbleFactor);

        const gradient = ctx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          effectiveRadius
        );

        gradient.addColorStop(0, d.colorStart.replace("0.85", `${d.alpha * 0.9}`));
        gradient.addColorStop(0.5, d.colorStart.replace("0.85", `${d.alpha * 0.5}`));
        gradient.addColorStop(1, "rgba(0, 120, 212, 0)");

        ctx.beginPath();
        ctx.arc(0, 0, effectiveRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 3D Specular Highlight (Wet liquid surface reflection)
        if (effectiveRadius > 4 && d.alpha > 0.25) {
          ctx.beginPath();
          const specRadius = effectiveRadius * 0.35;
          const specOffset = effectiveRadius * 0.28;
          ctx.arc(-specOffset, -specOffset, specRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha * 0.65})`;
          ctx.fill();
        }

        ctx.restore();
      }

      generateIdleSplash();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        mixBlendMode: "screen",
      }}
    />
  );
}
