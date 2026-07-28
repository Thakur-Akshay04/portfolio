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

// 3D Quantum Neural Reactor Component - Deep Cyber Electric Color Theme
function QuantumNeuralReactor() {
  const mainGroupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const innerPolyRef = useRef<THREE.Mesh>(null);
  const outerPolyRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // 1. Generate Vertices Laser Beams between Geometries
  const laserPositions = useMemo(() => {
    const dGeo = new THREE.DodecahedronGeometry(2.1, 0);
    const iGeo = new THREE.IcosahedronGeometry(3.1, 0);
    const dPos = dGeo.attributes.position;
    const iPos = iGeo.attributes.position;

    const lines: number[] = [];
    const count = Math.min(dPos.count, iPos.count);

    for (let i = 0; i < count; i += 2) {
      lines.push(
        dPos.getX(i), dPos.getY(i), dPos.getZ(i),
        iPos.getX(i), iPos.getY(i), iPos.getZ(i)
      );
    }
    return new Float32Array(lines);
  }, []);

  // 2. Swirling Energy Micro-Particles (Cryptographically Safe Randomization)
  const particleCount = 200;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = secureRandom();
      const v = secureRandom();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const dist = 1.8 + secureRandom() * 2.6;

      pos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = dist * Math.cos(phi);
    }
    return pos;
  }, []);

  // 3. Reactor Pulse & Multi-Axis Rotations
  useFrame((state) => {
    if (!mainGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Core pulsing scale & rotation
    if (coreMeshRef.current) {
      const pulse = 1 + Math.sin(time * 2.5) * 0.06;
      coreMeshRef.current.scale.set(pulse, pulse, pulse);
      coreMeshRef.current.rotation.y = time * 0.2;
    }

    // Inner Dodecahedron Wireframe rotation
    if (innerPolyRef.current) {
      innerPolyRef.current.rotation.x = time * 0.15;
      innerPolyRef.current.rotation.y = time * 0.25;
    }

    // Outer Icosahedron Wireframe counter-rotation
    if (outerPolyRef.current) {
      outerPolyRef.current.rotation.x = -time * 0.12;
      outerPolyRef.current.rotation.z = time * 0.18;
    }

    // Outer Torus Rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.3;
      ring1Ref.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.25;
      ring2Ref.current.rotation.x = Math.cos(time * 0.4) * 0.25;
    }

    // Overall Group Pointer Tilt
    const targetX = state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.35;
    mainGroupRef.current.rotation.x += (targetX - mainGroupRef.current.rotation.x) * 0.05;
    mainGroupRef.current.rotation.y += (targetY - mainGroupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={mainGroupRef}>
      {/* Central Glowing Energy Core (Electric Cyan) */}
      <mesh ref={coreMeshRef}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#0284c7"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Inner Glowing Plasma Shell (Amber Gold) */}
      <mesh>
        <sphereGeometry args={[1.25, 24, 24]} />
        <meshBasicMaterial
          color="#fbbf24"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Layer 1: Inner Dodecahedron Wireframe (Vivid Violet) */}
      <mesh ref={innerPolyRef}>
        <dodecahedronGeometry args={[2.1, 0]} />
        <meshBasicMaterial
          color="#9d4edd"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Layer 2: Outer Icosahedron Wireframe (Bright Cyber Cyan) */}
      <mesh ref={outerPolyRef}>
        <icosahedronGeometry args={[3.1, 0]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Layer 3: Laser Connections between Vertices (Solar Amber Gold) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={laserPositions.length / 3}
            array={laserPositions}
            itemSize={3}
            args={[laserPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </lineSegments>

      {/* Layer 4: Orbital Torus Ring 1 (Cyber Cyan) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.7, 0.018, 16, 100]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Layer 5: Orbital Torus Ring 2 (Vivid Violet) */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[4.2, 0.014, 16, 100]} />
        <meshBasicMaterial
          color="#9d4edd"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Layer 6: Swirling Quantum Micro-Particles (Cyan & Gold) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#67e8f9"
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// CSS/SVG Fallback for Non-WebGL devices
function QuantumReactorFallback() {
  return (
    <div className="w-full h-full min-h-[380px] md:min-h-[480px] lg:min-h-[550px] relative flex items-center justify-center select-none">
      <div className="absolute w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl opacity-80 pointer-events-none animate-pulse" />
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/35 animate-spin" style={{ animationDuration: "12s" }} />
        <div className="absolute inset-4 rounded-full border-2 border-purple-500/30 animate-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }} />
        <div className="absolute inset-10 rounded-full border border-dashed border-amber-400/40 animate-spin" style={{ animationDuration: "16s" }} />
        <div className="w-16 h-16 rounded-full bg-cyan-500/80 blur-md animate-pulse shadow-[0_0_30px_#00f0ff]" />
      </div>
    </div>
  );
}

export default function ConstellationSphere() {
  const [cameraZ, setCameraZ] = useState(6.2);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    setWebGLAvailable(isWebGLSupported());

    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCameraZ(8.8);
      } else if (w < 768) {
        setCameraZ(7.2);
      } else {
        setCameraZ(6.2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!webGLAvailable) {
    return <QuantumReactorFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<QuantumReactorFallback />}>
      <div className="w-full h-full min-h-[380px] md:min-h-[480px] lg:min-h-[550px] relative flex items-center justify-center select-none">
        {/* Deep Cyber Electric Backdrop Glow */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/25 via-purple-600/20 to-amber-500/20 blur-3xl opacity-80 pointer-events-none animate-pulse" />

        <Canvas
          camera={{ position: [0, 0, cameraZ], fov: 55 }}
          gl={{ antialias: true, alpha: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
          className="w-full h-full"
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[0, 0, 0]} intensity={3.0} color="#00f0ff" />
          <directionalLight position={[6, 6, 6]} intensity={1.6} color="#00f0ff" />
          <directionalLight position={[-6, -6, -6]} intensity={1.3} color="#9d4edd" />
          <QuantumNeuralReactor />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
