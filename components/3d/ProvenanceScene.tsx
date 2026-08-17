'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ProvenanceMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current && ringRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
      ringRef.current.rotation.z -= delta * 0.6;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Provenance Cube */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#C75B32" wireframe metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Outer Verification Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.03, 16, 100]} />
        <meshBasicMaterial color="#E8E5DF" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export const ProvenanceScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={1.8} color="#C75B32" />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#E8E5DF" />
        <ProvenanceMesh />
      </Canvas>
    </div>
  );
};
