'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

function TransactionNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = React.useMemo(() => {
    return [
      { pos: [0, 0, 0] as [number, number, number], scale: 0.35, color: '#C75B32' },
      { pos: [-1.4, 0.9, -0.5] as [number, number, number], scale: 0.2, color: '#E8E5DF' },
      { pos: [1.3, 0.8, 0.4] as [number, number, number], scale: 0.22, color: '#E8E5DF' },
      { pos: [-1.2, -0.9, 0.5] as [number, number, number], scale: 0.18, color: '#8E8B85' },
      { pos: [1.4, -0.8, -0.4] as [number, number, number], scale: 0.2, color: '#C75B32' },
      { pos: [0, 1.5, -0.8] as [number, number, number], scale: 0.15, color: '#E8E5DF' },
      { pos: [0, -1.5, 0.8] as [number, number, number], scale: 0.15, color: '#E8E5DF' },
    ];
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <octahedronGeometry args={[node.scale, 0]} />
          <meshStandardMaterial color={node.color} wireframe metalness={0.6} />
        </mesh>
      ))}

      {/* Connecting Transaction Beams using Drei Line */}
      {nodes.slice(1).map((node, i) => (
        <Line
          key={`line-${i}`}
          points={[[0, 0, 0], node.pos]}
          color={i % 2 === 0 ? '#C75B32' : '#8E8B85'}
          lineWidth={1.5}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}

export const TransactionNetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 4]} intensity={1.5} color="#C75B32" />
        <TransactionNodes />
      </Canvas>
    </div>
  );
};
