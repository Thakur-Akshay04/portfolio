"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingSphere() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Star Sphere Points
  const starCount = 100;
  const sphereRadius = 4.85;
  const positions = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      pos[i * 3] = sphereRadius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = sphereRadius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = sphereRadius * Math.cos(phi);
    }
    return pos;
  }, []);

  // Connect close stars with thin constellation lines
  const linePositions = useMemo(() => {
    const lines: number[] = [];
    const threshold = 1.05;
    for (let i = 0; i < starCount; i++) {
      const p1 = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      for (let j = i + 1; j < starCount; j++) {
        const p2 = new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        if (p1.distanceTo(p2) < threshold) {
          lines.push(p1.x, p1.y, p1.z);
          lines.push(p2.x, p2.y, p2.z);
        }
      }
    }
    return new Float32Array(lines);
  }, [positions]);

  // Outer orbital circle of stars
  const ringCount = 80;
  const ringPositions = useMemo(() => {
    const pos = new Float32Array(ringCount * 3);
    const ringRadius = 4.4;
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.03;
      pos[i * 3] = (ringRadius + jitter) * Math.cos(angle);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      pos[i * 3 + 2] = (ringRadius + jitter) * Math.sin(angle);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    // Continuous organic rotation
    groupRef.current.rotation.y = time * 0.05;
    groupRef.current.rotation.x = time * 0.025;
  });

  return (
    <group ref={groupRef}>
      {/* 1. Constellation Star Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          color="#9d4edd"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      {/* 2. Constellation Connecting Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#a29bfe"
          opacity={0.2}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      {/* 3. Outer Orbital Circle of Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ringPositions.length / 3}
            array={ringPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color="#61DAFB"
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function ConstellationSphere() {
  return (
    <div className="w-full h-full min-h-[380px] md:min-h-[480px] lg:min-h-[550px] relative flex items-center justify-center select-none">
      {/* Subtle outer neon purple glow */}
      <div className="absolute w-80 h-80 rounded-full bg-accent-purple/5 blur-3xl opacity-60 pointer-events-none animate-pulse" />
      
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <RotatingSphere />
      </Canvas>
    </div>
  );
}
