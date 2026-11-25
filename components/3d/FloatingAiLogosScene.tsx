'use client';

import React, { type FC, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

/* -------------------------------------------------------------------------- */
/*  Sculpted 3D Extruded Geometries                                           */
/* -------------------------------------------------------------------------- */

function createStarburstGeometry() {
  const shape = new THREE.Shape();
  const spikes = 10;
  const outerR = 0.56;
  const innerR = 0.16;

  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i / (spikes * 2)) * Math.PI * 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035,
  });
  geo.center();
  return geo;
}

function createGeminiStarGeometry() {
  const shape = new THREE.Shape();
  const r = 0.58;
  const c = 0.14;
  shape.moveTo(0, r);
  shape.quadraticCurveTo(c, c, r, 0);
  shape.quadraticCurveTo(c, -c, 0, -r);
  shape.quadraticCurveTo(-c, -c, -r, 0);
  shape.quadraticCurveTo(-c, c, 0, r);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  geo.center();
  return geo;
}

function createAntigravityDeltaGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.55);
  shape.lineTo(-0.46, -0.42);
  shape.lineTo(0, -0.18);
  shape.lineTo(0.46, -0.42);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035,
  });
  geo.center();
  return geo;
}

function createRoundedPlateGeometry(w = 0.88, h = 0.72, r = 0.18) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  geo.center();
  return geo;
}

/* -------------------------------------------------------------------------- */
/*  Individual 3D Brand Mascots                                               */
/* -------------------------------------------------------------------------- */

const Claude3D: FC<{ position: [number, number, number] }> = ({ position }) => {
  const geo = useMemo(() => createStarburstGeometry(), []);
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.55) * 0.35;
    ref.current.rotation.z = t * 0.14;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.45} position={position}>
      <group ref={ref}>
        <mesh geometry={geo}>
          <meshStandardMaterial color="#D97757" metalness={0.45} roughness={0.25} />
        </mesh>
      </group>
      <Html center position={[0, -0.78, 0]} className="pointer-events-none select-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Claude</span>
      </Html>
    </Float>
  );
};

const Antigravity3D: FC<{ position: [number, number, number] }> = ({ position }) => {
  const geo = useMemo(() => createAntigravityDeltaGeometry(), []);
  const ref = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.6 + 1) * 0.4;
    ref.current.rotation.x = Math.cos(t * 0.45) * 0.15;
    ringRef.current.rotation.z += delta * 0.45;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5} position={position}>
      <group ref={ref}>
        <mesh geometry={geo}>
          <meshStandardMaterial color="#E06D43" metalness={0.55} roughness={0.22} />
        </mesh>
        <mesh ref={ringRef} rotation={[Math.PI * 0.38, 0.25, 0]}>
          <torusGeometry args={[0.64, 0.024, 16, 64]} />
          <meshStandardMaterial color="#F2EFE9" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      <Html center position={[0, -0.82, 0]} className="pointer-events-none select-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Antigravity</span>
      </Html>
    </Float>
  );
};

const Gemini3D: FC<{ position: [number, number, number] }> = ({ position }) => {
  const geo = useMemo(() => createGeminiStarGeometry(), []);
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.5 + 2) * 0.45;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.18;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.45} position={position}>
      <group ref={ref}>
        <mesh geometry={geo}>
          <meshPhysicalMaterial
            color="#7C9BFF"
            emissive="#4F46E5"
            emissiveIntensity={0.18}
            metalness={0.6}
            roughness={0.16}
            clearcoat={0.8}
          />
        </mesh>
      </group>
      <Html center position={[0, -0.82, 0]} className="pointer-events-none select-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Gemini</span>
      </Html>
    </Float>
  );
};

const ChatGPT3D: FC<{ position: [number, number, number] }> = ({ position }) => {
  const ref = useRef<THREE.Group>(null!);
  const petals = useMemo(() => Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2), []);

  useFrame((state, delta) => {
    ref.current.rotation.z -= delta * 0.18;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45 + 3) * 0.35;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.4} position={position}>
      <group ref={ref}>
        {petals.map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.21, Math.sin(angle) * 0.21, 0]}
            rotation={[0, 0, angle]}
          >
            <torusGeometry args={[0.24, 0.042, 16, 48]} />
            <meshStandardMaterial color="#ECE8E1" metalness={0.7} roughness={0.22} />
          </mesh>
        ))}
      </group>
      <Html center position={[0, -0.78, 0]} className="pointer-events-none select-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">ChatGPT</span>
      </Html>
    </Float>
  );
};

const Codex3D: FC<{ position: [number, number, number] }> = ({ position }) => {
  const plateGeo = useMemo(() => createRoundedPlateGeometry(), []);
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.55 + 4) * 0.35 - 0.15;
    ref.current.rotation.x = Math.cos(t * 0.4) * 0.14;
  });

  return (
    <Float speed={1.7} rotationIntensity={0.22} floatIntensity={0.45} position={position}>
      <group ref={ref}>
        <mesh geometry={plateGeo}>
          <meshStandardMaterial color="#181716" metalness={0.75} roughness={0.28} />
        </mesh>
        {/* Embossed emerald terminal chevron >_ */}
        <mesh position={[-0.14, 0.06, 0.13]} rotation={[0, 0, -0.55]}>
          <boxGeometry args={[0.2, 0.05, 0.04]} />
          <meshStandardMaterial color="#34D399" emissive="#10B981" emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[-0.14, -0.06, 0.13]} rotation={[0, 0, 0.55]}>
          <boxGeometry args={[0.2, 0.05, 0.04]} />
          <meshStandardMaterial color="#34D399" emissive="#10B981" emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[0.16, -0.1, 0.13]}>
          <boxGeometry args={[0.22, 0.05, 0.04]} />
          <meshStandardMaterial color="#F2EFE9" />
        </mesh>
      </group>
      <Html center position={[0, -0.78, 0]} className="pointer-events-none select-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Codex</span>
      </Html>
    </Float>
  );
};

/* -------------------------------------------------------------------------- */
/*  Perimeter Rig with Pointer Parallax                                       */
/* -------------------------------------------------------------------------- */

function PerimeterRig() {
  const rigRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  // Scale positions proportionally so logos stay strictly in the outer perimeter
  const xSpan = Math.min(4.8, Math.max(3.4, viewport.width * 0.39));
  const ySpan = Math.min(2.15, Math.max(1.65, viewport.height * 0.34));

  useFrame((state, delta) => {
    if (!rigRef.current) return;
    rigRef.current.rotation.y = THREE.MathUtils.damp(rigRef.current.rotation.y, state.pointer.x * 0.08, 4, delta);
    rigRef.current.rotation.x = THREE.MathUtils.damp(rigRef.current.rotation.x, -state.pointer.y * 0.06, 4, delta);
  });

  return (
    <group ref={rigRef}>
      <Claude3D position={[-xSpan, ySpan, -0.4]} />
      <Antigravity3D position={[xSpan, ySpan * 0.96, -0.3]} />
      <Gemini3D position={[-xSpan * 0.95, -ySpan, -0.4]} />
      <ChatGPT3D position={[xSpan * 1.05, 0.05, -0.7]} />
      <Codex3D position={[xSpan * 0.92, -ySpan, -0.35]} />
    </group>
  );
}

export const FloatingAiLogosScene: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden md:block opacity-90"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 6, 5]} intensity={1.8} color="#F2EFE9" />
        <directionalLight position={[-5, -3, 3]} intensity={1.2} color="#E06D43" />
        <pointLight position={[0, 4, 2]} intensity={0.9} color="#93C5FD" />
        <PerimeterRig />
      </Canvas>
    </div>
  );
};
