'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ArchitecturalDepthCanvasProps {
  progressRef: React.MutableRefObject<number>;
  velocityRef: React.MutableRefObject<number>;
}

function SpatialRig({ progressRef, velocityRef }: ArchitecturalDepthCanvasProps) {
  const rigRef = useRef<THREE.Group>(null!);
  const floorGridRef = useRef<THREE.LineSegments>(null!);
  const ceilingGridRef = useRef<THREE.LineSegments>(null!);
  const outerArcRef = useRef<THREE.Mesh>(null!);
  const innerArcRef = useRef<THREE.Mesh>(null!);
  const smoothVel = useRef(0);

  // Calibrated architectural perspective tick-grid geometry (zero clutter)
  const gridGeometry = useMemo(() => {
    const positions: number[] = [];
    const cols = 28;
    const rows = 10;
    const width = 42;
    const depth = 16;

    // Longitudinal depth rails
    for (let i = 0; i <= cols; i++) {
      const x = (i / cols - 0.5) * width;
      positions.push(x, 0, -depth / 2, x, 0, depth / 2);
    }
    // Cross-section ribs
    for (let j = 0; j <= rows; j++) {
      const z = (j / rows - 0.5) * depth;
      positions.push(-width / 2, 0, z, width / 2, 0, z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    const progress = progressRef.current;
    const targetVel = THREE.MathUtils.clamp(velocityRef.current, -1.5, 1.5);
    smoothVel.current = THREE.MathUtils.damp(smoothVel.current, targetVel, 5, delta);

    if (rigRef.current) {
      // Smooth damped pointer parallax + subtle scroll banking
      const targetRotY = state.pointer.x * 0.055 - (progress - 0.5) * 0.16;
      const targetRotX = -state.pointer.y * 0.04;
      const targetRotZ = smoothVel.current * -0.025;

      rigRef.current.rotation.y = THREE.MathUtils.damp(rigRef.current.rotation.y, targetRotY, 4, delta);
      rigRef.current.rotation.x = THREE.MathUtils.damp(rigRef.current.rotation.x, targetRotX, 4, delta);
      rigRef.current.rotation.z = THREE.MathUtils.damp(rigRef.current.rotation.z, targetRotZ, 5, delta);
    }

    // Parallax grid translation tied to horizontal scroll progress
    const gridOffsetX = -(progress * 6) % 1.5;
    if (floorGridRef.current) {
      floorGridRef.current.position.x = gridOffsetX;
    }
    if (ceilingGridRef.current) {
      ceilingGridRef.current.position.x = gridOffsetX * 0.85;
    }

    // Precision architectural calibration rings
    if (outerArcRef.current) {
      outerArcRef.current.rotation.z = THREE.MathUtils.damp(
        outerArcRef.current.rotation.z,
        progress * Math.PI * 0.65 + state.clock.elapsedTime * 0.03,
        3.5,
        delta
      );
      outerArcRef.current.rotation.x = Math.PI * 0.36 + Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
    }
    if (innerArcRef.current) {
      innerArcRef.current.rotation.z = THREE.MathUtils.damp(
        innerArcRef.current.rotation.z,
        -progress * Math.PI * 0.9 - state.clock.elapsedTime * 0.045,
        3.5,
        delta
      );
      innerArcRef.current.rotation.y = Math.PI * 0.12 + state.pointer.x * 0.08;
    }
  });

  return (
    <group ref={rigRef} position={[0, 0, -4.5]}>
      {/* Lower architectural horizon plane */}
      <lineSegments ref={floorGridRef} geometry={gridGeometry} position={[0, -3.4, 0]}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.045} depthWrite={false} />
      </lineSegments>

      {/* Upper architectural datum plane */}
      <lineSegments ref={ceilingGridRef} geometry={gridGeometry} position={[0, 3.6, -1]}>
        <lineBasicMaterial color="#E06D43" transparent opacity={0.035} depthWrite={false} />
      </lineSegments>

      {/* Primary architectural calibration ring */}
      <mesh ref={outerArcRef} position={[0, 0, -2.5]}>
        <torusGeometry args={[4.6, 0.012, 8, 128]} />
        <meshBasicMaterial color="#E06D43" transparent opacity={0.14} depthWrite={false} />
      </mesh>

      {/* Secondary fine datum ring */}
      <mesh ref={innerArcRef} position={[0, 0, -1.8]} rotation={[Math.PI * 0.42, 0.2, 0]}>
        <torusGeometry args={[3.4, 0.008, 8, 128]} />
        <meshBasicMaterial color="#F2EFE9" transparent opacity={0.07} depthWrite={false} />
      </mesh>
    </group>
  );
}

export const ArchitecturalDepthCanvas: React.FC<ArchitecturalDepthCanvasProps> = ({
  progressRef,
  velocityRef,
}) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-85"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={['#080808', 6, 18]} />
        <SpatialRig progressRef={progressRef} velocityRef={velocityRef} />
      </Canvas>
    </div>
  );
};
