'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ArchitecturalLayers() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      const t = state.clock.getElapsedTime();
      // Floating motion between layers
      groupRef.current.children.forEach((child, idx) => {
        child.position.y = (idx - 1) * 0.8 + Math.sin(t * 1.5 + idx) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.4, 0, 0]}>
      {/* Layer 1: Ground Base Grid */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[2.5, 0.05, 2.5]} />
        <meshStandardMaterial color="#161616" wireframe />
      </mesh>

      {/* Layer 2: Fractional Token Mesh */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.08, 2]} />
        <meshStandardMaterial color="#C75B32" wireframe roughness={0.2} />
      </mesh>

      {/* Layer 3: Top Deed Vault */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.4, 0.1, 1.4]} />
        <meshStandardMaterial color="#E8E5DF" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Vertical Connecting Nodes */}
      {[-0.8, 0.8].map((x, i) =>
        [-0.8, 0.8].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0, z]}>
            <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
            <meshBasicMaterial color="#C75B32" transparent opacity={0.5} />
          </mesh>
        ))
      )}
    </group>
  );
}

export const LandVaultScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas camera={{ position: [0, 1.5, 4.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 3]} intensity={1.8} color="#C75B32" />
        <pointLight position={[-3, -2, -2]} intensity={0.6} color="#E8E5DF" />
        <ArchitecturalLayers />
      </Canvas>
    </div>
  );
};
