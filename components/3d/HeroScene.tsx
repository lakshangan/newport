'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate atmospheric particles
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 350;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * 0.03;
      pointsRef.current.rotation.y -= delta * 0.02;

      // Mouse parallax response
      const mouseX = state.mouse.x * 0.4;
      const mouseY = state.mouse.y * 0.4;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouseX, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouseY, 0.05);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#C75B32"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.65}
        />
      </Points>
    </group>
  );
}

function AtmosphericLighting() {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = state.mouse.x * 3;
      lightRef.current.position.y = state.mouse.y * 3;
    }
  });

  return (
    <>
      {/* Warm Burnt Orange Key Light */}
      <pointLight ref={lightRef} position={[2, 2, 2]} intensity={2.5} color="#C75B32" distance={8} />
      {/* Deep Shadow Ambient */}
      <ambientLight intensity={0.2} color="#111111" />
      {/* Cool Dark Rim Light */}
      <directionalLight position={[-4, -2, -2]} intensity={0.8} color="#202A36" />
    </>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <AtmosphericLighting />
        <ParticleField />
      </Canvas>
    </div>
  );
};
