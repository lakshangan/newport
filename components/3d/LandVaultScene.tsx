'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

function ArchitecturalLayers() {
  const groupRef = useRef<THREE.Group>(null!);
  const layerRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Smooth damped pointer-reactive architectural inspection angle
      const targetRotY = state.pointer.x * 0.45 + t * 0.14;
      const targetRotX = 0.42 - state.pointer.y * 0.22;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
    }

    // Staggered harmonic elevation between architectural layers
    layerRefs.current.forEach((layer, idx) => {
      if (!layer) return;
      const base = (idx - 1) * 0.72;
      layer.position.y = base + Math.sin(t * 1.4 - idx * 0.65) * 0.08;
      layer.rotation.y = Math.sin(t * 0.5 + idx * 0.4) * 0.04;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Layer 1: Obsidian Foundation Slab */}
      <mesh
        ref={(el) => {
          layerRefs.current[0] = el;
        }}
        position={[0, -0.72, 0]}
      >
        <boxGeometry args={[2.4, 0.06, 2.4]} />
        <meshStandardMaterial color="#141312" metalness={0.75} roughness={0.35} />
        <Edges threshold={15} color="#3a3632" />
      </mesh>

      {/* Layer 2: Fractional Tokenization Plane */}
      <mesh
        ref={(el) => {
          layerRefs.current[1] = el;
        }}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1.95, 0.07, 1.95]} />
        <meshPhysicalMaterial
          color="#C75B32"
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={0.28}
        />
        <Edges threshold={15} color="#E06D43" />
      </mesh>

      {/* Layer 3: Top Deed Vault Monolith */}
      <mesh
        ref={(el) => {
          layerRefs.current[2] = el;
        }}
        position={[0, 0.72, 0]}
      >
        <boxGeometry args={[1.35, 0.12, 1.35]} />
        <meshStandardMaterial color="#ECE8E1" metalness={0.85} roughness={0.18} />
        <Edges threshold={15} color="#C75B32" />
      </mesh>

      {/* Precision Corner Datum Pillars */}
      {[-0.85, 0.85].map((x, i) =>
        [-0.85, 0.85].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0, z]}>
            <cylinderGeometry args={[0.014, 0.014, 1.65, 12]} />
            <meshStandardMaterial color="#E06D43" metalness={0.6} roughness={0.3} transparent opacity={0.55} />
          </mesh>
        ))
      )}
    </group>
  );
}

export const LandVaultScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas camera={{ position: [0, 1.2, 4.6], fov: 44 }} dpr={[1, 2]}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 3]} intensity={1.8} color="#E06D43" />
        <directionalLight position={[-3, 1, -2]} intensity={0.7} color="#F2EFE9" />
        <ArchitecturalLayers />
      </Canvas>
    </div>
  );
};
