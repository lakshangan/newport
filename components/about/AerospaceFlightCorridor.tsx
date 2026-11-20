'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Navigation, Radio, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AerospaceFlightCorridorProps {
  activeSlide: number;
  scrollProgress: number; // 0 to 1
  onSelectWaypoint: (index: number) => void;
  className?: string;
}

export const AerospaceFlightCorridor: React.FC<AerospaceFlightCorridorProps> = ({
  activeSlide,
  scrollProgress,
  onSelectWaypoint,
  className,
}) => {
  const [isBoosting, setIsBoosting] = useState(false);
  const [machSpeed, setMachSpeed] = useState<number>(2.2);
  const lastProgressRef = useRef(scrollProgress);
  const lastTimeRef = useRef(Date.now());

  // Dynamic Mach speed calculation based on scroll velocity
  useEffect(() => {
    const now = Date.now();
    const dt = Math.max(16, now - lastTimeRef.current);
    const dProgress = Math.abs(scrollProgress - lastProgressRef.current);
    const velocity = (dProgress / dt) * 1000; // progress per second

    // Base Mach is 2.2, spikes up to Mach 3.4 when scrolling actively
    const targetMach = Math.min(3.6, 2.2 + velocity * 1.8);
    setMachSpeed(parseFloat(targetMach.toFixed(1)));

    lastProgressRef.current = scrollProgress;
    lastTimeRef.current = now;
  }, [scrollProgress]);

  const handleJetClick = () => {
    setIsBoosting(true);
    setMachSpeed(3.8);
    setTimeout(() => {
      setIsBoosting(false);
      setMachSpeed(2.2);
    }, 1200);
  };

  // Jet position across the corridor:
  // Starts at ~12% on Slide 0, glides to ~50% on Slide 1, reaches ~88% on Slide 2
  // We clamp progress between 0 and 1
  const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
  const jetLeftPercent = 10 + clampedProgress * 78;

  // Parabolic altitude arc: jet climbs slightly in mid-flight
  const altitudeOffset = Math.sin(clampedProgress * Math.PI) * -12;

  // Aerodynamic pitch angle: slight upward angle when advancing
  const pitchAngle = (clampedProgress - 0.5) * 4 + (isBoosting ? -6 : 0);

  const waypoints = [
    { id: 0, code: 'WP-01', label: 'ACCOLADES', alt: '36,000 FT', pos: 12 },
    { id: 1, code: 'WP-02', label: 'DEPLOYMENTS', alt: '38,500 FT', pos: 50 },
    { id: 2, code: 'WP-03', label: 'CAPABILITIES', alt: '41,000 FT', pos: 88 },
  ];

  return (
    <div
      className={cn(
        'relative w-full select-none pointer-events-none z-20 px-4 sm:px-8 lg:px-12',
        className
      )}
      aria-label="Aerospace Supersonic Flight Parallax Corridor"
    >
      {/* Top Apple Glass Telemetry HUD Island */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 pb-2 pt-1 border-b border-white/[0.08]">
        {/* Left Flight Callsign & Status */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/[0.12] backdrop-blur-xl shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFA266] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E88053]" />
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white tracking-wider uppercase">
              FLIGHT // AGY-004
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[9px] font-mono text-white/50">
            <span>•</span>
            <span className="text-[#FFA266] font-semibold">AIRSPACE: SECURED</span>
            <span>•</span>
            <span>BEARING: 092° E</span>
          </div>
        </div>

        {/* Center Live Mach Speed & Altitude Telemetry */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Mach Speed Pill */}
          <div
            onClick={handleJetClick}
            className={cn(
              'flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border backdrop-blur-xl transition-all cursor-pointer shadow-sm',
              isBoosting
                ? 'bg-[#E88053] border-[#FFA266] text-white shadow-[0_0_20px_rgba(232,128,83,0.8)]'
                : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.12] text-white'
            )}
            title="Click for Afterburner Boost"
          >
            <Zap
              className={cn(
                'w-3 h-3 text-[#FFA266] transition-transform',
                isBoosting && 'text-white animate-bounce'
              )}
            />
            <span className="font-mono text-[9px] sm:text-[10.5px] font-bold tracking-tight">
              MACH {machSpeed}
            </span>
            {isBoosting && (
              <span className="hidden xs:inline text-[8px] font-mono uppercase tracking-widest font-bold bg-white/20 px-1 rounded">
                BURST
              </span>
            )}
          </div>

          {/* Altitude Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-white/80">
            <Compass className="w-3 h-3 text-white/40" />
            <span className="font-mono text-[9.5px]">
              ALT {waypoints[activeSlide]?.alt || '36,000 FT'}
            </span>
          </div>
        </div>

        {/* Right Waypoint Navigators (Clickable Apple Glass Buttons) */}
        <div className="flex items-center gap-1 sm:gap-1.5 pointer-events-auto">
          {waypoints.map((wp) => {
            const isActive = activeSlide === wp.id;
            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => onSelectWaypoint(wp.id)}
                className={cn(
                  'px-2 sm:px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono tracking-tight transition-all duration-200 cursor-pointer flex items-center gap-1',
                  isActive
                    ? 'bg-[#E88053]/20 border border-[#FFA266]/70 text-[#FFA266] font-bold shadow-[0_0_12px_rgba(232,128,83,0.3)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-white/60 hover:text-white'
                )}
                title={`Jump to ${wp.label}`}
              >
                <span>{wp.code}</span>
                <span className="hidden lg:inline text-[8.5px] text-white/40">//</span>
                <span className="hidden lg:inline">{wp.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flight Corridor Track (The Sky Altitude Corridor) */}
      <div className="relative w-full max-w-7xl mx-auto h-12 sm:h-14 mt-1 overflow-visible">
        {/* Technical Navigational Flight Vector Path */}
        <div className="absolute top-1/2 inset-x-0 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        {/* Radar Distance Tick Marks along Flight Path */}
        <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 flex justify-between px-2 text-[7.5px] font-mono text-white/20 select-none">
          <span>000 KM</span>
          <span className="hidden sm:inline">050 KM</span>
          <span>100 KM</span>
          <span className="hidden sm:inline">150 KM</span>
          <span>200 KM</span>
        </div>

        {/* Waypoint Radar Ping Beacons along Path */}
        {waypoints.map((wp) => {
          const isActive = activeSlide === wp.id;
          return (
            <div
              key={wp.id}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 pointer-events-auto cursor-pointer group"
              style={{ left: `${wp.pos}%` }}
              onClick={() => onSelectWaypoint(wp.id)}
            >
              {/* Radar Pulsing Rings */}
              {isActive && (
                <div className="absolute -inset-2 rounded-full border border-[#FFA266]/40 animate-ping opacity-60" />
              )}
              <div
                className={cn(
                  'w-3 h-3 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm',
                  isActive
                    ? 'bg-[#E88053] border-white shadow-[0_0_15px_rgba(232,128,83,0.9)] scale-110'
                    : 'bg-[#15161E] border-white/20 group-hover:border-[#FFA266]/70'
                )}
              >
                <div
                  className={cn(
                    'w-1 h-1 rounded-full',
                    isActive ? 'bg-white' : 'bg-white/40 group-hover:bg-[#FFA266]'
                  )}
                />
              </div>

              {/* Waypoint Label Tag */}
              <div
                className={cn(
                  'absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono tracking-wider transition-colors',
                  isActive
                    ? 'text-[#FFA266] font-bold'
                    : 'text-white/40 group-hover:text-white/80'
                )}
              >
                {wp.code}
              </div>
            </div>
          );
        })}

        {/* Continuous Contrail Vapor Trail (Extends back from Jet position) */}
        <div
          className="absolute top-1/2 h-[2px] -translate-y-1/2 pointer-events-none transition-all duration-150"
          style={{
            left: '5%',
            width: `${Math.max(0, jetLeftPercent - 8)}%`,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,162,102,0.05) 30%, rgba(255,162,102,0.35) 85%, rgba(255,255,255,0.7) 100%)',
            boxShadow: '0 0 10px rgba(232,128,83,0.4)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* Supersonic Vector Stealth Jet (Glides dynamically with scroll & mouse hover) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-30 pointer-events-auto cursor-pointer transition-all duration-150 ease-out will-change-transform"
          style={{
            left: `${jetLeftPercent}%`,
            transform: `translate(-50%, calc(-50% + ${altitudeOffset}px)) rotate(${pitchAngle}deg)`,
          }}
          onClick={handleJetClick}
          title="Supersonic Vector Jet // Click for Afterburner Surge"
        >
          {/* Sonic Shockwave Vapor Ring (Expands on Boost) */}
          {isBoosting && (
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-cyan-400/80 animate-ping pointer-events-none" />
          )}

          {/* Sleek Supersonic Jet Vector Graphic (150px x 48px) */}
          <div className="relative group/jet">
            <svg
              className="w-24 sm:w-28 md:w-32 h-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] filter"
              viewBox="0 0 150 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dynamic Afterburner Flame Gradient */}
                <linearGradient id="afterburnerFlame" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#EA580C" stopOpacity="0" />
                  <stop offset="35%" stopColor="#FB923C" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#FFA266" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#E0F2FE" stopOpacity="1" />
                </linearGradient>

                {/* Jet Fuselage Stealth Gradient */}
                <linearGradient id="stealthBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E202A" />
                  <stop offset="60%" stopColor="#2D303E" />
                  <stop offset="100%" stopColor="#4B5166" />
                </linearGradient>

                {/* Cockpit Canopy Glass Glow */}
                <linearGradient id="canopyGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA266" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#E88053" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Twin Vector Afterburner Flames with Shock Diamonds */}
              <g className="origin-right">
                {/* Upper Afterburner Cone */}
                <path
                  d="M38 21 L10 21.5 L38 22 Z"
                  fill="url(#afterburnerFlame)"
                  className={cn(
                    'transition-all duration-150',
                    isBoosting ? 'scale-x-150 origin-right' : 'animate-pulse'
                  )}
                />
                <circle cx="28" cy="21.5" r="1.5" fill="#FFFFFF" opacity="0.9" />
                <circle cx="20" cy="21.5" r="1.2" fill="#38BDF8" opacity="0.8" />

                {/* Lower Afterburner Cone */}
                <path
                  d="M38 26 L10 25.5 L38 27 Z"
                  fill="url(#afterburnerFlame)"
                  className={cn(
                    'transition-all duration-150',
                    isBoosting ? 'scale-x-150 origin-right' : 'animate-pulse'
                  )}
                />
                <circle cx="28" cy="26" r="1.5" fill="#FFFFFF" opacity="0.9" />
                <circle cx="20" cy="26" r="1.2" fill="#38BDF8" opacity="0.8" />
              </g>

              {/* Jet Stealth Fuselage Airframe */}
              {/* Main Fuselage Body: Sharp Needle Nose (145, 24) pointing right */}
              <path
                d="M38 18 
                   L55 18 
                   L75 14 
                   L105 18 
                   L132 22 
                   L146 24 
                   L132 26 
                   L105 30 
                   L75 34 
                   L55 30 
                   L38 30 
                   L35 24 Z"
                fill="url(#stealthBody)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
                strokeLinejoin="round"
              />

              {/* Delta Wings with Slanted Camber */}
              <path
                d="M60 21 L42 8 L68 18 Z"
                fill="#272A38"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
              />
              <path
                d="M60 27 L42 40 L68 30 Z"
                fill="#1E202B"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
              />

              {/* Stealth Cockpit Canopy with Amber Specular Glass */}
              <path
                d="M102 21 Q116 19 126 23 L106 24 Z"
                fill="url(#canopyGlass)"
                stroke="#FFA266"
                strokeWidth="0.8"
                className="drop-shadow-[0_0_8px_rgba(255,162,102,0.8)]"
              />

              {/* Twin Canted Stealth Tail Fins */}
              <path
                d="M40 18 L34 11 L48 18 Z"
                fill="#373B4D"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.7"
              />
              <path
                d="M40 30 L34 37 L48 30 Z"
                fill="#2A2D3C"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.7"
              />

              {/* Wingtip Navigation Strobes: Port (Red/Amber) & Starboard (Cyan) */}
              <circle cx="42" cy="8" r="1.5" fill="#FFA266" className="animate-ping" />
              <circle cx="42" cy="40" r="1.5" fill="#38BDF8" className="animate-ping" />

              {/* Technical Panel Seam Line along Dorsal Spine */}
              <line
                x1="52"
                y1="24"
                x2="135"
                y2="24"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.7"
                strokeDasharray="3 2"
              />
            </svg>

            {/* Dynamic Altitude / Callsign Floating Tag */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/80 border border-white/20 text-[8px] font-mono text-white/90 opacity-0 group-hover/jet:opacity-100 transition-opacity pointer-events-none shadow-md">
              <span>AGY-004</span> <span className="text-[#FFA266]">▲ {waypoints[activeSlide]?.alt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AerospaceFlightCorridor;
