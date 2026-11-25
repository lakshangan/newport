'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

function ProvenanceMesh() {
  const rigRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (rigRef.current) {
      rigRef.current.rotation.y = THREE.MathUtils.damp(rigRef.current.rotation.y, state.pointer.x * 0.45, 4, delta);
      rigRef.current.rotation.x = THREE.MathUtils.damp(rigRef.current.rotation.x, -state.pointer.y * 0.35, 4, delta);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.28;
      coreRef.current.rotation.x = Math.sin(t * 0.8) * 0.18;
      coreRef.current.position.y = Math.sin(t * 1.4) * 0.06;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.35;
      outerRingRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.08;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.48;
    }
  });

  return (
    <group ref={rigRef} position={[0, 0, 0]}>
      {/* Central C2PA Verification Prism */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial color="#181615" metalness={0.85} roughness={0.2} />
        <Edges threshold={12} color="#E06D43" />
      </mesh>

      {/* Outer Gimbal Verification Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.75, 0.022, 16, 120]} />
        <meshStandardMaterial color="#ECE8E1" metalness={0.7} roughness={0.25} transparent opacity={0.75} />
      </mesh>

      {/* Inner Precision Calibration Ring */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[1.38, 0.015, 16, 100]} />
        <meshStandardMaterial color="#E06D43" metalness={0.6} roughness={0.3} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export const ProvenanceScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas camera={{ position: [0, 0, 4.4], fov: 48 }} dpr={[1, 2]}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 3, 3]} intensity={1.9} color="#E06D43" />
        <pointLight position={[-2.5, -2, -2]} intensity={0.8} color="#F2EFE9" />
        <ProvenanceMesh />
      </Canvas>
    </div>
  );
};
