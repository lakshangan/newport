'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

const coverVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coverFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uGrayscale;
  uniform float uEdgeIntensity;
  uniform float uEdgeBrightness;
  varying vec2 vUv;

  mat3 sobelX = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
  );

  mat3 sobelY = mat3(
    -1.0, -2.0, -1.0,
     0.0,  0.0,  0.0,
     1.0,  2.0,  1.0
  );

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
    float gx = 0.0;
    float gy = 0.0;

    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * texelSize;
        float lum = getLuminance(texture2D(tex, uv + offset).rgb);
        gx += lum * sobelX[i + 1][j + 1];
        gy += lum * sobelY[i + 1][j + 1];
      }
    }

    return sqrt(gx * gx + gy * gy);
  }

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
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 texColor = texture2D(uTexture, uv);
    
    float gray = getLuminance(texColor.rgb);
    vec3 grayscaleColor = vec3(gray);
    texColor.rgb = mix(texColor.rgb, grayscaleColor, uGrayscale);
    
    vec2 centeredUv = vUv - uCenter;
    float aspect = uResolution.x / uResolution.y;
    centeredUv.x *= aspect;
    float dist = length(centeredUv);
    
    float angle = atan(centeredUv.y, centeredUv.x);
    
    float noiseScale = 6.0;
    vec2 pixelatedUv = floor(vUv * uResolution / noiseScale) * noiseScale / uResolution;
    float blockNoise = fbm(pixelatedUv * 100.0) * 0.15;
    
    float angularNoise = fbm(vec2(angle * 5.0, 0.0)) * 0.15;
    
    float totalNoise = blockNoise + angularNoise;
    float noisyDist = dist + totalNoise;
    
    float maxDist = length(vec2(aspect * 0.5, 0.5));
    float normalizedDist = noisyDist / maxDist;
    
    float dissolveThreshold = uDissolve * 1.5; 
    
    vec2 texelSize = 1.0 / uResolution;
    float edge = sobel(uTexture, uv, texelSize);
    
    edge = pow(edge, 0.7) * 2.0;
    edge = clamp(edge, 0.0, 1.0);
    
    float dissolveMask = smoothstep(dissolveThreshold - 0.03, dissolveThreshold, normalizedDist);
    
    vec3 edgeColor = vec3(1.0, 0.36, 0.2);
    
    vec3 baseColor = mix(texColor.rgb, vec3(0.03, 0.03, 0.05), uGrayscale * 0.6);
    vec3 finalColor = baseColor;
    
    float edgeGlowIntensity = uEdgeIntensity * 2.5;
    float edgeGlow = edge * edgeGlowIntensity * (1.0 + uGrayscale * 2.0);
    finalColor += edgeColor * edgeGlow * uEdgeBrightness;
    
    float edgeZoneWidth = 0.15 * (1.0 - uDissolve) + 0.02;
    float edgeZone = smoothstep(dissolveThreshold - edgeZoneWidth, dissolveThreshold - edgeZoneWidth + 0.04, normalizedDist) * 
                     smoothstep(dissolveThreshold + 0.02, dissolveThreshold - 0.02, normalizedDist);
    float sparkle = hash(floor(vUv * uResolution / 4.0)) * edgeZone;
    
    float edgeBrightness = (1.0 - uDissolve) * uEdgeBrightness * (1.0 + uGrayscale * 2.0);
    finalColor += vec3(sparkle * 3.0 * edgeBrightness);
    
    float alpha = (1.0 - dissolveMask) * texColor.a;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface PreloaderSceneProps {
  image: string;
  dissolveProgress: number;
}

const PreloaderScene = ({ image, dissolveProgress }: PreloaderSceneProps) => {
  const texture = useTexture(image);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2(
          (texture.image as any)?.width || 1200,
          (texture.image as any)?.height || 1600
        ),
      },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uGrayscale: { value: 0.4 },
      uEdgeIntensity: { value: 0.8 },
      uEdgeBrightness: { value: 1.2 },
    }),
    [texture, size]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uDissolve.value = dissolveProgress;
      materialRef.current.uniforms.uEdgeIntensity.value = 0.8 + dissolveProgress * 2.0;
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
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [dissolveVal, setDissolveVal] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const lakshanSteps = [
    '01 // LOADING CREATIVE DIRECTION // LAKSHAN GANESAN',
    '02 // ASSEMBLING SELECTED WORKS // 06 CASE STUDIES',
    '03 // INITIALIZING 3D WEBGL GRAPHICS PIPELINE',
    '04 // SYNCHRONIZING RESEARCH & HACKATHON RECORDS',
    '05 // PREPARING DECENTRALIZED PROTOCOL SUITE',
    '06 // PORTFOLIO UNLOCKED // WELCOME',
  ];

  useEffect(() => {
    setIsMounted(true);

    // Progress counter
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 10) + 5;
        return next > 100 ? 100 : next;
      });
    }, 70);

    // Step updates
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < lakshanSteps.length - 1 ? prev + 1 : prev));
    }, 340);

    return () => {
      clearInterval(timer);
      clearInterval(stepInterval);
    };
  }, []);

  // WebGL Dissolve Transition on 100% complete
  useEffect(() => {
    if (progress < 100) return;

    let animId: number;
    let startTime: number | null = null;
    const duration = 1200; // 1.2s dissolve transition

    const animateDissolve = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const p = Math.min(1.0, elapsed / duration);
      
      setDissolveVal(p);

      if (p < 1.0) {
        animId = requestAnimationFrame(animateDissolve);
      } else {
        setTimeout(() => setIsComplete(true), 200);
      }
    };

    animId = requestAnimationFrame(animateDissolve);

    return () => cancelAnimationFrame(animId);
  }, [progress]);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#08080a] text-[#E8E5DF] font-mono flex flex-col justify-between overflow-hidden select-none pointer-events-auto transition-opacity duration-700 ${
        dissolveVal > 0.8 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Full-Screen WebGL R3F Sobel Edge Dissolve Shader Background */}
      {isMounted && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
          <Canvas>
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
              <PreloaderScene
                image="/images/hero_portrait.jpg"
                dissolveProgress={dissolveVal}
              />
            </React.Suspense>
          </Canvas>
        </div>
      )}

      {/* Warm Volumetric Ambient Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-gradient-to-tr from-[#C75B32]/30 via-amber-800/10 to-transparent rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Cinematic Viewport Framing Corner Brackets */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-4 h-4 border-l border-t border-white/30 pointer-events-none z-20" />
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-4 h-4 border-r border-t border-white/30 pointer-events-none z-20" />
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-4 h-4 border-l border-b border-white/30 pointer-events-none z-20" />
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-4 h-4 border-r border-b border-white/30 pointer-events-none z-20" />

      {/* Top Cinematic Navigation Header */}
      <div
        className={`relative z-20 flex justify-between items-center text-xs text-[#8E8B85] border-b border-white/10 p-6 sm:p-10 pb-4 transition-opacity duration-500 ${
          dissolveVal > 0.2 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C75B32] animate-ping" />
          <AsciiGlitchRipple
            as="span"
            className="text-[11px] text-white font-bold tracking-widest uppercase"
            dur={900}
            autoRippleInterval={2800}
          >
            LAKSHAN GANESAN // PORTFOLIO &apos;26
          </AsciiGlitchRipple>
        </div>

        <div className="flex items-center space-x-4">
          <AsciiGlitchRipple
            as="span"
            className="text-[11px] text-[#C75B32] font-bold tracking-widest uppercase"
            dur={900}
            autoRippleInterval={3200}
          >
            WEB3 // AI // 3D GRAPHICS
          </AsciiGlitchRipple>
          <span className="hidden sm:inline text-[11px] tracking-widest text-white/40">
            COIMBATORE, IN
          </span>
        </div>
      </div>

      {/* Center Stage: Cinematic Narrative & ASCII Glitch Ripple Text */}
      <div
        className={`relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center text-center px-6 transition-all duration-500 ${
          dissolveVal > 0.2 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Subtitle Role Tag */}
        <AsciiGlitchRipple
          as="div"
          className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#C75B32] uppercase font-bold text-center mb-2"
          dur={800}
          autoRippleInterval={2500}
          triggerOnChange={true}
        >
          CREATIVE DEVELOPER & WEB3 RESEARCH ANALYST
        </AsciiGlitchRipple>

        {/* Display Title with ASCII Glitch Ripple */}
        <AsciiGlitchRipple
          as="h1"
          className="font-display font-black text-5xl xs:text-7xl sm:text-8xl md:text-[7.5rem] lg:text-[8.5rem] leading-none tracking-tight text-white uppercase text-center my-3 sm:my-5 cursor-pointer"
          dur={1100}
          spread={1.6}
          autoRippleInterval={2000}
          triggerOnChange={true}
        >
          LAKSHAN GANESAN
        </AsciiGlitchRipple>

        {/* Tagline / Bio Statement */}
        <AsciiGlitchRipple
          as="p"
          className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#8E8B85] uppercase text-center max-w-2xl mx-auto mb-8 sm:mb-12"
          dur={900}
          autoRippleInterval={3000}
        >
          BUILDING AT THE EDGE OF CODE, BLOCKCHAIN & INTELLIGENCE
        </AsciiGlitchRipple>

        {/* Lakshan Data Loading Progress Box */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-4 pt-2">
          {/* Active Step Indicator */}
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#E8E5DF] tracking-wider font-mono">
            <span className="text-[#C75B32] font-bold">&gt;</span>
            <AsciiGlitchRipple
              as="span"
              className="text-white font-semibold tracking-wider"
              dur={900}
              spread={1.2}
              triggerOnChange={true}
            >
              {lakshanSteps[currentStep]}
            </AsciiGlitchRipple>
          </div>

          {/* Minimalist Hairline Progress Bar */}
          <div className="w-full max-w-md h-[1px] bg-white/10 relative overflow-hidden my-3">
            <div
              className="h-full bg-gradient-to-r from-[#C75B32] via-[#E88053] to-white transition-all duration-150 ease-out shadow-[0_0_15px_#C75B32]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bottom Counter & Status */}
          <div className="flex justify-between items-center w-full max-w-md text-[11px] font-mono text-[#8E8B85] pt-1">
            <AsciiGlitchRipple
              as="span"
              className="tracking-widest uppercase text-[#8E8B85]/90"
              dur={800}
              triggerOnChange={true}
            >
              {progress < 100 ? 'LOADING PORTFOLIO DATA...' : 'DISSOLVING PRELOADER...'}
            </AsciiGlitchRipple>

            <div className="flex items-baseline space-x-1 font-mono">
              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                {String(progress).padStart(3, '0')}
              </span>
              <span className="text-[#C75B32] text-xs font-bold">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div
        className={`relative z-20 flex justify-between items-center text-[10px] text-[#8E8B85]/70 border-t border-white/10 p-6 sm:p-10 pt-4 font-mono transition-opacity duration-500 ${
          dissolveVal > 0.2 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <AsciiGlitchRipple as="span" className="hover:text-white" dur={800} autoRippleInterval={4000}>
          © 2026 LAKSHAN GANESAN // ALL RIGHTS RESERVED
        </AsciiGlitchRipple>
        <span className="tracking-widest uppercase">
          AVAILABLE FOR SELECT PROJECTS
        </span>
      </div>
    </div>
  );
};

export default Preloader;
