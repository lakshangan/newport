'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Line } from '@react-three/drei';
import * as THREE from 'three';

function TransactionNodes() {
  const groupRef = useRef<THREE.Group>(null!);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  const nodes = useMemo(() => {
    return [
      { pos: [0, 0, 0] as [number, number, number], scale: 0.34, color: '#E06D43', edge: '#F2EFE9' },
      { pos: [-1.45, 0.88, -0.45] as [number, number, number], scale: 0.18, color: '#181615', edge: '#F2EFE9' },
      { pos: [1.32, 0.78, 0.42] as [number, number, number], scale: 0.2, color: '#181615', edge: '#E06D43' },
      { pos: [-1.18, -0.92, 0.52] as [number, number, number], scale: 0.17, color: '#181615', edge: '#8E8B85' },
      { pos: [1.38, -0.82, -0.38] as [number, number, number], scale: 0.19, color: '#181615', edge: '#E06D43' },
      { pos: [0, 1.48, -0.72] as [number, number, number], scale: 0.15, color: '#181615', edge: '#F2EFE9' },
      { pos: [0, -1.48, 0.72] as [number, number, number], scale: 0.15, color: '#181615', edge: '#F2EFE9' },
    ];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const targetY = state.pointer.x * 0.4 + t * 0.18;
      const targetX = -state.pointer.y * 0.25 + Math.sin(t * 0.45) * 0.1;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 4, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 4, delta);
    }

    // Traveling transaction signal packets along spoke vectors
    nodes.slice(1).forEach((node, i) => {
      const pulse = pulseRefs.current[i];
      if (!pulse) return;
      const phase = (t * 0.65 + i * 0.23) % 1;
      pulse.position.set(
        node.pos[0] * phase,
        node.pos[1] * phase,
        node.pos[2] * phase
      );
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <icosahedronGeometry args={[node.scale, 0]} />
          <meshStandardMaterial color={node.color} metalness={0.8} roughness={0.25} />
          <Edges threshold={15} color={node.edge} />
        </mesh>
      ))}

      {/* Connecting Transaction Vectors */}
      {nodes.slice(1).map((node, i) => (
        <React.Fragment key={`vec-${i}`}>
          <Line
            points={[[0, 0, 0], node.pos]}
            color={i % 2 === 0 ? '#E06D43' : '#8E8B85'}
            lineWidth={1.2}
            transparent
            opacity={0.45}
          />
          <mesh
            ref={(el) => {
              pulseRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshBasicMaterial color="#E06D43" />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

export const TransactionNetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 48 }} dpr={[1, 2]}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[2, 3, 4]} intensity={1.7} color="#E06D43" />
        <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#F2EFE9" />
        <TransactionNodes />
      </Canvas>
    </div>
  );
};
