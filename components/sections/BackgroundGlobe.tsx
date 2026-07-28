"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import WebGLErrorBoundary from "@/components/ui/WebGLErrorBoundary";

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Background Holographic Tech Wireframe Globe
function HolographicBackgroundGlobe() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  const radius = 2.4;

  // Latitude and Longitude Grid Lines
  const gridLines = useMemo(() => {
    const lines: Float32Array[] = [];
    const segments = 64;

    const latCount = 14;
    for (let i = 1; i < latCount; i++) {
      const lat = (i / latCount) * Math.PI - Math.PI / 2;
      const r = radius * Math.cos(lat);
      const y = radius * Math.sin(lat);
      const points: number[] = [];
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(r * Math.cos(theta), y, r * Math.sin(theta));
      }
      lines.push(new Float32Array(points));
    }

    const lonCount = 18;
    for (let i = 0; i < lonCount; i++) {
      const lon = (i / lonCount) * Math.PI;
      const points: number[] = [];
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        const x = radius * Math.sin(theta) * Math.cos(lon);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(lon);
        points.push(x, y, z);
      }
      lines.push(new Float32Array(points));
    }

    return lines;
  }, [radius]);

  // Surface Data Hotspots
  const nodeCount = 42;
  const nodes = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const nodeVectors: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      nodeVectors.push(new THREE.Vector3(x, y, z));
    }
    return { positions: pos, vectors: nodeVectors };
  }, [radius]);

  // Network Connection Arcs
  const arcs = useMemo(() => {
    const arcLines: Float32Array[] = [];
    const maxDist = 2.8;
    const vecCount = nodes.vectors.length;

    for (let i = 0; i < vecCount; i++) {
      for (let j = i + 1; j < vecCount; j++) {
        const p1 = nodes.vectors[i];
        const p2 = nodes.vectors[j];
        const dist = p1.distanceTo(p2);

        if (dist > 0.8 && dist < maxDist && Math.random() > 0.4) {
          const mid = p1.clone().add(p2).multiplyScalar(0.5);
          const midLength = mid.length();
          if (midLength > 0) {
            mid.normalize().multiplyScalar(radius * 1.28);
          }

          const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
          const points = curve.getPoints(24);
          const coords: number[] = [];
          points.forEach((pt) => coords.push(pt.x, pt.y, pt.z));
          arcLines.push(new Float32Array(coords));
        }
      }
    }
    return arcLines;
  }, [nodes, radius]);

  // Orbiting Satellite Rings
  const orbitSatellites = useMemo(() => {
    const count = 50;
    const r1 = radius * 1.38;
    const r2 = radius * 1.58;
    const pos1 = new Float32Array(count * 3);
    const pos2 = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const a1 = (i / count) * Math.PI * 2;
      pos1[i * 3] = r1 * Math.cos(a1);
      pos1[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      pos1[i * 3 + 2] = r1 * Math.sin(a1);

      const a2 = (i / count) * Math.PI * 2;
      pos2[i * 3] = r2 * Math.cos(a2);
      pos2[i * 3 + 1] = r2 * Math.sin(a2);
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    return { ring1: pos1, ring2: pos2 };
  }, [radius]);

  useFrame((state) => {
    if (!globeGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const scrollProgress = scrollY * 0.0012;

    globeGroupRef.current.rotation.y = time * 0.12 + scrollProgress * 1.8;
    globeGroupRef.current.rotation.x = Math.sin(time * 0.08) * 0.15 + Math.sin(scrollProgress) * 0.35;

    const targetPosY = Math.sin(scrollProgress * 0.8) * 0.4;
    const targetPosX = Math.cos(scrollProgress * 0.5) * 0.3;
    globeGroupRef.current.position.y += (targetPosY - globeGroupRef.current.position.y) * 0.05;
    globeGroupRef.current.position.x += (targetPosX - globeGroupRef.current.position.x) * 0.05;

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.y = -time * 0.18 - scrollProgress * 2.2;
      ringGroupRef.current.rotation.z = time * 0.06 + scrollProgress * 0.5;
    }

    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2 + scrollProgress * 3) * 0.04;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={globeGroupRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius * 0.96, 32, 32]} />
        <meshStandardMaterial
          color="#6b21a8"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.25}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {gridLines.map((lineData, idx) => (
        <lineLoop key={idx}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={lineData.length / 3}
              array={lineData}
              itemSize={3}
              args={[lineData, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={idx % 2 === 0 ? "#a855f7" : "#06b6d4"}
            transparent
            opacity={idx % 3 === 0 ? 0.45 : 0.22}
            depthWrite={false}
          />
        </lineLoop>
      ))}

      {arcs.map((arcData, idx) => (
        <line key={idx}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={arcData.length / 3}
              array={arcData}
              itemSize={3}
              args={[arcData, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </line>
      ))}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodes.positions.length / 3}
            array={nodes.positions}
            itemSize={3}
            args={[nodes.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#f43f5e"
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      <group ref={ringGroupRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={orbitSatellites.ring1.length / 3}
              array={orbitSatellites.ring1}
              itemSize={3}
              args={[orbitSatellites.ring1, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color="#38bdf8"
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </points>

        <points rotation={[Math.PI / 4, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={orbitSatellites.ring2.length / 3}
              array={orbitSatellites.ring2}
              itemSize={3}
              args={[orbitSatellites.ring2, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color="#a855f7"
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}

function GlobeFallback() {
  return (
    <div className="w-full h-full min-h-screen relative flex items-center justify-center select-none overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-purple/10 blur-3xl opacity-70 pointer-events-none animate-pulse" />
    </div>
  );
}

export default function BackgroundGlobe() {
  const [cameraZ, setCameraZ] = useState(5.2);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    setWebGLAvailable(isWebGLSupported());

    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCameraZ(7.2);
      } else if (w < 768) {
        setCameraZ(6.0);
      } else {
        setCameraZ(5.2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!webGLAvailable) {
    return <GlobeFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<GlobeFallback />}>
      <div className="w-full h-full min-h-screen relative flex items-center justify-center select-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent-purple/20 to-cyan-500/20 blur-3xl opacity-70 pointer-events-none animate-pulse" />

        <Canvas
          camera={{ position: [0, 0, cameraZ], fov: 55 }}
          gl={{ antialias: true, alpha: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
          className="w-full h-full"
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a855f7" />
          <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#06b6d4" />
          <HolographicBackgroundGlobe />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
