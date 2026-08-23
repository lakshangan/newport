'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

const TARGET_TEXT = 'LAKSHAN';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const SUBTITLE = 'DATA LOADED.';

// WebGL Sobel Edge Dissolve Shader
const coverVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coverFragmentShader = `
  uniform vec2 uResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uEdgeIntensity;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }

  void main() {
    vec2 centeredUv = vUv - uCenter;
    float aspect = uResolution.x / uResolution.y;
    centeredUv.x *= aspect;
    float dist = length(centeredUv);
    
    float angle = atan(centeredUv.y, centeredUv.x);
    
    float noiseScale = 6.0;
    vec2 pixelatedUv = floor(vUv * uResolution / noiseScale) * noiseScale / uResolution;
    float blockNoise = fbm(pixelatedUv * 10.0 + vec2(uTime * 0.2)) * 0.12;
    
    float angularNoise = fbm(vec2(angle * 4.0, uTime * 0.3)) * 0.10;
    
    float totalNoise = blockNoise + angularNoise;
    float noisyDist = dist + totalNoise;
    
    float maxDist = length(vec2(aspect * 0.5, 0.5)) * 1.25;
    float normalizedDist = noisyDist / maxDist;
    
    float dissolveThreshold = uDissolve * 1.4; 
    
    // When uDissolve == 0.0 (Preloader loading phase), dissolveMask = 1.0 (100% solid cover).
    // As uDissolve expands:
    //   inside circle (normalizedDist < dissolveThreshold): dissolveMask = 0.0 (transparent / revealed hero)
    //   outside circle (normalizedDist > dissolveThreshold): dissolveMask = 1.0 (solid dark cover)
    float dissolveMask = uDissolve <= 0.001 
      ? 1.0 
      : smoothstep(dissolveThreshold - 0.05, dissolveThreshold + 0.02, normalizedDist);
    
    // Sobel edge glow effect at the dissolve boundary
    float edgeWidth = 0.08;
    float edgeZone = smoothstep(dissolveThreshold - edgeWidth, dissolveThreshold, normalizedDist) * 
                     smoothstep(dissolveThreshold + edgeWidth, dissolveThreshold, normalizedDist);
    
    vec3 edgeColor = vec3(0.36, 0.88, 0.90); // #5CE1E6 Cyan glow accent
    float sparkle = hash(floor(vUv * uResolution / 4.0) + floor(uTime * 15.0)) * edgeZone;
    
    vec3 baseColor = vec3(0.02, 0.02, 0.02); // Solid dark #050505
    vec3 finalColor = baseColor;
    finalColor += edgeColor * edgeZone * uEdgeIntensity * 4.0;
    finalColor += vec3(sparkle * 5.0 * (1.0 - uDissolve * 0.5));
    
    // Alpha is dissolveMask: 1.0 = dark cover visible, 0.0 = revealed hero section
    float alpha = dissolveMask;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface DissolveSceneProps {
  dissolveProgress: number;
}

const DissolveScene = ({ dissolveProgress }: DissolveSceneProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uEdgeIntensity: { value: 1.0 },
    }),
    [size]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uDissolve.value = dissolveProgress;
      materialRef.current.uniforms.uEdgeIntensity.value = 1.0 + dissolveProgress * 2.5;
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={coverVertexShader}
        fragmentShader={coverFragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export const Preloader: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [dissolveVal, setDissolveVal] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Lock scroll position during preloader animation
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    let frameId: number;
    let exitTimeoutId: NodeJS.Timeout;
    const targetLength = TARGET_TEXT.length;

    const startTime = Date.now();
    const scrambleInterval = 40; // ms between character scramble ticks
    const charDecodeDuration = 160; // ms per character left-to-right decode step
    const initialScrambleDuration = 250; // ms initial delay before first character locks

    let lastScrambleTime = 0;

    const updateAnimation = () => {
      const now = Date.now();
      const elapsed = now - startTime - initialScrambleDuration;

      let currentDecoded = 0;
      if (elapsed > 0) {
        currentDecoded = Math.min(
          targetLength,
          Math.floor(elapsed / charDecodeDuration) + 1
        );
      }

      if (now - lastScrambleTime > scrambleInterval) {
        lastScrambleTime = now;

        let result = '';
        for (let i = 0; i < targetLength; i++) {
          if (i < currentDecoded) {
            result += TARGET_TEXT[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplayText(result);
      }

      if (currentDecoded < targetLength) {
        frameId = requestAnimationFrame(updateAnimation);
      } else {
        // Fully decoded to "LAKSHAN"
        setDisplayText(TARGET_TEXT);

        // Completion State: reveal subtitle "DATA LOADED."
        setShowSubtitle(true);

        // Exit Animation: trigger WebGL Sobel Edge Dissolve transition after ~800ms
        exitTimeoutId = setTimeout(() => {
          let dissolveAnimId: number;
          let dissolveStartTime: number | null = null;
          const dissolveDuration = 1100; // 1.1s WebGL dissolve transition

          const animateDissolve = (timestamp: number) => {
            if (!dissolveStartTime) dissolveStartTime = timestamp;
            const progress = Math.min(1.0, (timestamp - dissolveStartTime) / dissolveDuration);
            setDissolveVal(progress);

            if (progress < 1.0) {
              dissolveAnimId = requestAnimationFrame(animateDissolve);
            } else {
              // Unlock scroll once dissolve transition is complete
              document.documentElement.style.overflow = '';
              document.body.style.overflow = '';
              setIsFinished(true);
            }
          };

          dissolveAnimId = requestAnimationFrame(animateDissolve);
        }, 800);
      }
    };

    frameId = requestAnimationFrame(updateAnimation);

    return () => {
      cancelAnimationFrame(frameId);
      if (exitTimeoutId) clearTimeout(exitTimeoutId);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] text-white flex flex-col items-center justify-center overflow-hidden select-none transition-opacity duration-500 ${
        dissolveVal > 0.95 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        backgroundColor: dissolveVal > 0 ? 'transparent' : '#050505'
      }}
    >
      {/* ScrollDissolveReveal WebGL Sobel Edge Dissolve Shader Canvas */}
      {isMounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas
            gl={{ alpha: true, antialias: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <OrthographicCamera
              makeDefault
              manual
              left={-1}
              right={1}
              top={1}
              bottom={-1}
              near={0.1}
              far={10}
              position={[0, 0, 1]}
            />
            <React.Suspense fallback={null}>
              <DissolveScene dissolveProgress={dissolveVal} />
            </React.Suspense>
          </Canvas>
        </div>
      )}

      {/* Center Stage Minimal Text */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ease-out ${
          dissolveVal > 0.1 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Display word LAKSHAN with bold monospace font */}
        <h1
          className="font-mono font-bold tracking-widest uppercase text-white select-none"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 1.1,
          }}
        >
          {displayText || 'LAKSHAN'}
        </h1>

        {/* Subtitle: DATA LOADED. */}
        <div
          className={`mt-4 sm:mt-6 transition-all duration-500 ease-out transform ${
            showSubtitle
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-sans font-medium text-xs sm:text-sm tracking-[0.25em] text-[#5CE1E6] uppercase">
            {SUBTITLE}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;




