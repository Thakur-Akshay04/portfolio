"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import WebGLErrorBoundary from "@/components/ui/WebGLErrorBoundary";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Form a spherical/cloud structure
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const distance = 2 + Math.random() * 3;
      
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
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.15}
      />
    </Points>
  );
}

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      {/* Dark overlay grid for high-tech aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_90%)] z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 z-0" />
      
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
        >
          <ParticleField />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
