'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NothingHardwareBackgroundProps {
  className?: string;
  scrollProgress?: number; // 0 to 1
}

export const NothingHardwareBackground: React.FC<NothingHardwareBackgroundProps> = ({
  className,
  scrollProgress = 0,
}) => {
  return (
    <div
      className={cn(
        'absolute inset-y-0 left-0 h-full w-[266.67vh] min-w-full pointer-events-none select-none z-0 overflow-hidden will-change-transform bg-[#080808]',
        className
      )}
      style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {/* Base Matte Obsidian Background */}
        <div className="absolute inset-0 bg-[#080808]" />

        {/* 1. Nothing OS Signature Dot Grid (20px pitch) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1.2px,transparent_1.2px)] bg-[size:20px_20px] opacity-70" />

        {/* 2. Micro Dot Secondary Accent Matrix (40px pitch with faint red/amber points) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(230,57,70,0.18)_1.5px,transparent_1.5px)] bg-[size:60px_60px] opacity-40" />

        {/* 3. Transparent Motherboard Circuit Architecture (SVG Vector Bus Traces & Flexible Ribbon Chords) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-65"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 3000 1000"
        >
          <defs>
            {/* Glowing Bus Pulse Gradient */}
            <linearGradient id="nothingTraceGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#FFA266" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#E63946" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#FFA266" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
            </linearGradient>

            {/* Copper Ribbon Cable Pattern */}
            <pattern id="fpcRibbonPattern" width="12" height="12" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(255,162,102,0.15)" strokeWidth="1" />
            </pattern>

            {/* Glyph LED Strip Glow Filter */}
            <filter id="glyphLedGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ========================================================================= */}
          {/* HORIZONTAL COPPER BUS TRACES & FLEXIBLE RIBBON CHORDS */}
          {/* ========================================================================= */}
          {/* Upper Primary Data Bus (Y = 85px) */}
          <line x1="0" y1="85" x2="3000" y2="85" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="8 4" />
          <line x1="0" y1="90" x2="3000" y2="90" stroke="rgba(255,162,102,0.12)" strokeWidth="1" />
          <line x1="0" y1="95" x2="3000" y2="95" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* Lower Primary Hardware Ground Bus (Y = 915px) */}
          <line x1="0" y1="915" x2="3000" y2="915" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="0" y1="920" x2="3000" y2="920" stroke="rgba(255,162,102,0.14)" strokeWidth="1.5" strokeDasharray="12 4" />
          <line x1="0" y1="925" x2="3000" y2="925" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* ========================================================================= */}
          {/* VERTICAL FLEXIBLE RIBBON CHORDS (Connecting Top & Bottom into Panels) */}
          {/* ========================================================================= */}
          {/* Ribbon Chord Set 1: Panel 1 Accolades (X = 250 to 300) */}
          <path
            d="M 280 85 L 280 200 L 320 240 L 320 780 L 280 820 L 280 915"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 280 85 L 280 200 L 320 240 L 320 780 L 280 820 L 280 915"
            fill="none"
            stroke="url(#nothingTraceGlow)"
            strokeWidth="2"
            strokeDasharray="100 200"
            className="animate-pulse"
          />

          {/* Ribbon Chord Set 2: Panel 1 to Panel 2 Transition (X = 980 to 1020) */}
          <path
            d="M 1000 85 L 1000 350 L 1040 390 L 1040 680 L 1000 720 L 1000 915"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Ribbon Chord Set 3: Panel 2 Deployments (X = 1450 to 1550) */}
          <path
            d="M 1500 85 L 1500 180 L 1460 220 L 1460 760 L 1500 800 L 1500 915"
            fill="none"
            stroke="rgba(255,162,102,0.15)"
            strokeWidth="6"
          />

          {/* Ribbon Chord Set 4: Panel 2 to Panel 3 Transition (X = 1980 to 2020) */}
          <path
            d="M 2000 85 L 2000 300 L 1960 340 L 1960 720 L 2000 760 L 2000 915"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="12"
          />

          {/* Ribbon Chord Set 5: Panel 3 Architecture (X = 2650 to 2700) */}
          <path
            d="M 2680 85 L 2680 220 L 2720 260 L 2720 760 L 2680 800 L 2680 915"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="8"
          />

          {/* ========================================================================= */}
          {/* ICONIC NOTHING PHONE GLYPH INTERFACE SILHOUETTES */}
          {/* ========================================================================= */}
          {/* GLYPH 1: Upper Camera C-Glyph (Panel 1 - X = 450, Y = 180) */}
          <g filter="url(#glyphLedGlow)" opacity="0.6">
            <path
              d="M 520 130 A 70 70 0 0 0 380 200 A 70 70 0 0 0 520 270"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="6 3"
            />
            {/* Red Accent Recording Dot */}
            <circle cx="535" cy="130" r="4" fill="#E63946" />
          </g>

          {/* GLYPH 2: Diagonal Slash Glyph (Panel 1 to 2 - X = 880, Y = 220) */}
          <g filter="url(#glyphLedGlow)" opacity="0.55">
            <line x1="850" y1="180" x2="930" y2="280" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 4" />
          </g>

          {/* GLYPH 3: Central Wireless Charging Coil Halo (Panel 2 Center - X = 1500, Y = 500) */}
          <g filter="url(#glyphLedGlow)" opacity="0.45">
            {/* Outer Segmented Coil Ring */}
            <circle
              cx="1500"
              cy="500"
              r="220"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="40 15 80 15 60 15 120 15"
              className="animate-pulse-slow"
            />
            {/* Inner Concentric Alignment Ring */}
            <circle
              cx="1500"
              cy="500"
              r="170"
              fill="none"
              stroke="rgba(255,162,102,0.3)"
              strokeWidth="2"
              strokeDasharray="10 5"
            />
            {/* Core Center Dot Cluster (19 Hexagonal Dots) */}
            <circle cx="1500" cy="500" r="5" fill="#FFA266" />
            <circle cx="1485" cy="500" r="3" fill="#FFFFFF" />
            <circle cx="1515" cy="500" r="3" fill="#FFFFFF" />
            <circle cx="1492" cy="485" r="3" fill="#FFFFFF" />
            <circle cx="1508" cy="485" r="3" fill="#FFFFFF" />
            <circle cx="1492" cy="515" r="3" fill="#FFFFFF" />
            <circle cx="1508" cy="515" r="3" fill="#FFFFFF" />
          </g>

          {/* GLYPH 4: Lower Exclamation Mark Glyph (Panel 2/3 - X = 1500, Y = 780 to 860) */}
          <g filter="url(#glyphLedGlow)" opacity="0.65">
            <line x1="1500" y1="760" x2="1500" y2="840" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 4" />
            <circle cx="1500" cy="865" r="5" fill="#E63946" />
          </g>

          {/* GLYPH 5: Capability Architecture Dual Rail Glyphs (Panel 3 - X = 2350, Y = 320) */}
          <g filter="url(#glyphLedGlow)" opacity="0.55">
            <path
              d="M 2300 240 Q 2350 240 2400 290 T 2500 340"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="12 4"
            />
            <circle cx="2300" cy="240" r="4" fill="#FFA266" />
          </g>

          {/* ========================================================================= */}
          {/* INDUSTRIAL SILKSCREEN HARDWARE ANNOTATIONS & CORDS LABELS */}
          {/* ========================================================================= */}
          {/* Panel 1 Annotations */}
          <text x="120" y="70" fill="rgba(255,255,255,0.35)" fontFamily="monospace" fontSize="9" letterSpacing="2">
            NOTHING (R) // FPC-CHORD-01 [TRACE IMPEDANCE: 50Ω]
          </text>
          <text x="120" y="115" fill="rgba(255,162,102,0.4)" fontFamily="monospace" fontSize="8" letterSpacing="1.5">
            BUS: 64-BIT // SIGNAL REF: 0x9AF4
          </text>

          {/* Panel 2 Annotations */}
          <text x="1150" y="70" fill="rgba(255,255,255,0.35)" fontFamily="monospace" fontSize="9" letterSpacing="2">
            NOTHING (R) // FPC-CHORD-02 [TRANSPARENT BACKPLATE COIL]
          </text>
          <text x="1150" y="115" fill="rgba(230,57,70,0.5)" fontFamily="monospace" fontSize="8" letterSpacing="1.5">
            ● GLYPH INTERFACE: 33 ADDRESSABLE ZONES
          </text>

          {/* Panel 3 Annotations */}
          <text x="2150" y="70" fill="rgba(255,255,255,0.35)" fontFamily="monospace" fontSize="9" letterSpacing="2">
            NOTHING (R) // FPC-CHORD-03 [SYSTEM ARCHITECTURE BUS]
          </text>
          <text x="2150" y="115" fill="rgba(255,162,102,0.4)" fontFamily="monospace" fontSize="8" letterSpacing="1.5">
            GPU ACCELERATED // 60-120 FPS NATIVE
          </text>

          {/* Bottom Rail Annotations */}
          <text x="280" y="945" fill="rgba(255,255,255,0.25)" fontFamily="monospace" fontSize="8" letterSpacing="2">
            DEV // HARDWARE SPEC: REV 4.2.0 • TEENAGE ENGINEERING INFLUENCE • CHORD BUS: ACTIVE
          </text>
          <text x="1500" y="945" fill="rgba(255,255,255,0.25)" fontFamily="monospace" fontSize="8" letterSpacing="2">
            LAKSHAN.DEV // SIGNAL PROVENANCE ENGINE • ZERO LATENCY BUS
          </text>

          {/* Torx Screws & Grounding Pads */}
          {[
            { cx: 80, cy: 85 },
            { cx: 950, cy: 85 },
            { cx: 1050, cy: 85 },
            { cx: 1950, cy: 85 },
            { cx: 2050, cy: 85 },
            { cx: 2920, cy: 85 },
            { cx: 80, cy: 920 },
            { cx: 1000, cy: 920 },
            { cx: 2000, cy: 920 },
            { cx: 2920, cy: 920 },
          ].map((pt, idx) => (
            <g key={idx}>
              <circle cx={pt.cx} cy={pt.cy} r="6" fill="#16181F" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <line x1={pt.cx - 3} y1={pt.cy} x2={pt.cx + 3} y2={pt.cy} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={pt.cx} y1={pt.cy - 3} x2={pt.cx} y2={pt.cy + 3} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            </g>
          ))}
        </svg>

        {/* 4. Ambient Studio Glows (Precomputed Radial Gradients for zero FPS lag) */}
        <div className="absolute top-1/4 left-[10%] w-[650px] h-[500px] bg-[radial-gradient(circle,rgba(232,128,83,0.14)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/3 left-[48%] w-[700px] h-[550px] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-1/4 left-[80%] w-[650px] h-[500px] bg-[radial-gradient(circle,rgba(230,57,70,0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* 5. Edge Vignettes */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080808] via-[#080808]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default NothingHardwareBackground;
