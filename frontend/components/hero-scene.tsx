"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useIsLight } from "./theme-toggle";

// Deterministic PRNG so the network looks the same on every load.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(count: number, maxDist: number) {
  const rand = mulberry32(42);
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const radius = 2.1 + (rand() - 0.5) * 0.7;
    pts.push(new THREE.Vector3(Math.cos(golden * i) * r * radius, y * radius, Math.sin(golden * i) * r * radius));
  }
  const lines: number[] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      if (pts[i].distanceTo(pts[j]) < maxDist) lines.push(...pts[i].toArray(), ...pts[j].toArray());
    }
  }
  return { points: new Float32Array(pts.flatMap((p) => p.toArray())), lines: new Float32Array(lines) };
}

function colorize(positions: Float32Array, a: THREE.Color, b: THREE.Color) {
  const out = new Float32Array(positions.length);
  const c = new THREE.Color();
  for (let i = 0; i < positions.length; i += 3) {
    const t = THREE.MathUtils.clamp((positions[i + 1] + 2.4) / 4.8, 0, 1);
    c.copy(a).lerp(b, t).toArray(out, i);
  }
  return out;
}

function Network({ light, still }: { light: boolean; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { points, lines } = useMemo(() => buildNetwork(170, 0.85), []);
  const [pointColors, lineColors] = useMemo(() => {
    const a = new THREE.Color(light ? "#0891b2" : "#22d3ee");
    const b = new THREE.Color(light ? "#7c3aed" : "#8b5cf6");
    return [colorize(points, a, b), colorize(lines, a, b)];
  }, [points, lines, light]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || still) return;
    g.rotation.y += delta * 0.06;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, state.pointer.y * 0.25, 2, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -state.pointer.x * 0.15, 2, delta);
  });

  return (
    <group ref={group} rotation={[0.15, 0.6, 0]}>
      <lineSegments key={`l-${light}`}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={light ? 0.35 : 0.22} depthWrite={false} />
      </lineSegments>
      <points key={`p-${light}`}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
          <bufferAttribute attach="attributes-color" args={[pointColors, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.055} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
    </group>
  );
}

export default function HeroScene({ still = false }: { still?: boolean }) {
  const light = useIsLight();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering frames while the hero is scrolled out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 50 }}
        dpr={[1, 1.75]}
        frameloop={still ? "demand" : visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <Network light={light} still={still} />
      </Canvas>
    </div>
  );
}
