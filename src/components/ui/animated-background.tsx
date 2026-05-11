"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleField(props: any) {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => {
    const arr = new Float32Array(5000);
    for (let i = 0; i < 5000; i++) {
      arr[i] = (Math.random() - 0.5) * 3;
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#22D3EE"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function AnimatedBackground() {
  const [status, setStatus] = useState<"checking" | "supported" | "unsupported">("checking");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        setStatus("supported");
      } else {
        setStatus("unsupported");
      }
    } catch (e) {
      setStatus("unsupported");
    }
  }, []);

  if (status === "checking") return null;

  if (status === "unsupported") {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        {/* CSS Fallback Particles */}
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
        <div className="absolute top-[30%] left-[70%] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-ping" />
        <div className="absolute top-[80%] left-[40%] w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
        <div className="absolute top-[50%] left-[80%] w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-ping" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ powerPreference: "default" }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
