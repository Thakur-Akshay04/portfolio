"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import WebGLErrorBoundary from "@/components/ui/WebGLErrorBoundary";

/**
 * Cryptographically secure random float in range [0, 1) for SonarQube / S2245 compliance.
 */
function secureRandom(): number {
  const gCrypto = typeof window !== "undefined" ? window.crypto : (typeof globalThis !== "undefined" ? globalThis.crypto : null);
  if (gCrypto && typeof gCrypto.getRandomValues === "function") {
    const array = new Uint32Array(1);
    gCrypto.getRandomValues(array);
    return array[0] / 4294967296;
  }
  const t = Date.now();
  return ((t ^ (t >>> 13)) % 1000000) / 1000000;
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const distance = 2 + secureRandom() * 3;
      
      pos[i * 3] = distance * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = distance * Math.cos(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Core slow rotation
    pointsRef.current.rotation.x = time * 0.02;
    pointsRef.current.rotation.y = time * 0.015;
    
    // Parallax following mouse
    const targetX = state.pointer.x * 0.3;
    const targetY = state.pointer.y * 0.3;
    
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.15}
      />
    </points>
  );
}

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      {/* Dark overlay grid for high-tech aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_90%)] z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 z-0" />
      
      <WebGLErrorBoundary>
        <Canvas
          frameloop={isVisible ? "always" : "never"}
          dpr={1}
          camera={{ position: [0, 0, 4.5], fov: 60 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: false,
          }}
        >
          <ParticleField />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
