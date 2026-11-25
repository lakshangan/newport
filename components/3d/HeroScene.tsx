'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Structured Fibonacci spherical lattice — calibrated spatial depth without random noise
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 320;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const shell = 3.2 + (i % 3) * 0.85;
      pos[i * 3] = Math.cos(theta) * radiusAtY * shell;
      pos[i * 3 + 1] = y * shell;
      pos[i * 3 + 2] = Math.sin(theta) * radiusAtY * shell - 1.5;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = THREE.MathUtils.damp(
      pointsRef.current.rotation.y,
      state.pointer.x * 0.25 + t * 0.035,
      3.5,
      delta
    );
    pointsRef.current.rotation.x = THREE.MathUtils.damp(
      pointsRef.current.rotation.x,
      -state.pointer.y * 0.2,
      3.5,
      delta
    );
  });

  return (
    <group rotation={[0, 0, Math.PI / 8]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#E06D43"
          size={0.032}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.55}
        />
      </Points>
    </group>
  );
}

function AtmosphericLighting() {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state, delta) => {
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.damp(lightRef.current.position.x, state.pointer.x * 3, 5, delta);
      lightRef.current.position.y = THREE.MathUtils.damp(lightRef.current.position.y, state.pointer.y * 3, 5, delta);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} position={[2, 2, 2]} intensity={2.2} color="#E06D43" distance={9} />
      <ambientLight intensity={0.2} color="#111111" />
      <directionalLight position={[-4, -2, -2]} intensity={0.7} color="#202A36" />
    </>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 56 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <AtmosphericLighting />
        <ParticleField />
      </Canvas>
    </div>
  );
};
