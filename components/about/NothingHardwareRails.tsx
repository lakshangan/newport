'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Moon, Cast, Radio, Sun, Flame, Volume2, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NothingUpperRailProps {
  scrollProgress: number; // 0 to 1
  activeSlide: number;
  onSelectWaypoint: (index: number) => void;
  className?: string;
}

export const NothingUpperRail: React.FC<NothingUpperRailProps> = ({
  scrollProgress,
  activeSlide,
  onSelectWaypoint,
  className,
}) => {
  const [timeStr, setTimeStr] = useState('22:25');
  const [colonVisible, setColonVisible] = useState(true);
  const [dayName, setDayName] = useState('TUESDAY');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hrs}:${mins}`);
      const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      setDayName(days[now.getDay()]);
    };
    updateClock();
    const interval = setInterval(() => {
      setColonVisible((v) => !v);
      updateClock();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compass needle rotation based on horizontal scroll (0° to 180°)
  const compassAngle = scrollProgress * 180;

  return (
    <div
      className={cn(
        'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none pointer-events-none z-30',
        className
      )}
    >
      {/* Upper Nothing Hardware Rail */}
      <div className="flex items-center justify-between gap-3 py-1.5 border-b border-white/[0.1] bg-black/40 backdrop-blur-xl rounded-full px-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Left Side: Nothing Red REC Dot + Dot Clock + Day Name */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Iconic Nothing Red Recording Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E63946]/15 border border-[#E63946]/40 shadow-[0_0_12px_rgba(230,57,70,0.4)]">
            <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
            <span className="font-mono text-[9px] font-bold text-[#E63946] tracking-wider uppercase">
              REC ● 2026
            </span>
          </div>

          {/* Nothing Dot Matrix Clock (22:25) */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white">
            <span className="font-mono text-[10.5px] font-bold tracking-widest">
              {timeStr.split(':')[0]}
              <span className={cn('transition-opacity duration-150', colonVisible ? 'opacity-100' : 'opacity-20')}>
                :
              </span>
              {timeStr.split(':')[1]}
            </span>
          </div>

          {/* Day Name in Nothing Dot Style */}
          <div className="hidden md:inline-flex px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[8.5px] font-mono text-white/70 tracking-widest uppercase">
            {dayName}
          </div>
        </div>

        {/* Center: Nothing Hardware Silkscreen Status */}
        <div className="hidden lg:flex items-center gap-3 text-[8.5px] font-mono text-white/40 tracking-widest uppercase">
          <span>// NOTHING(R) STYLE DEV CORRIDOR</span>
          <span className="text-[#FFA266]">• FPC-CHORD BUS ACTIVE •</span>
          <span>ZONE: 0{activeSlide + 1}/03</span>
        </div>

        {/* Right Side: Nothing Dotted Compass + Weather 34° + Quick Toggles */}
        <div className="flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
          {/* Nothing Weather Dot Indicator (Row 2 in reference image) */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white">
            <Sun className="w-3 h-3 text-[#FFA266] animate-spin-slow" />
            <span className="font-mono text-[9.5px] font-bold">34°</span>
            <span className="hidden sm:inline text-[8px] font-mono text-white/50">CYBER</span>
          </div>

          {/* Nothing Dotted Compass Widget (Rotates with scroll!) */}
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80"
            title="Horizontal Flight Heading"
          >
            <div className="relative w-3.5 h-3.5 flex items-center justify-center">
              <svg
                className="w-full h-full transition-transform duration-200 ease-out"
                style={{ transform: `rotate(${compassAngle}deg)` }}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Dotted Compass Arrow */}
                <circle cx="12" cy="6" r="1.8" fill="#E63946" />
                <circle cx="12" cy="9" r="1.4" fill="#FFFFFF" />
                <circle cx="12" cy="15" r="1.4" fill="#FFFFFF" opacity="0.6" />
                <circle cx="12" cy="18" r="1.4" fill="#FFFFFF" opacity="0.4" />
              </svg>
            </div>
            <span className="font-mono text-[8.5px] text-[#FFA266]">
              {Math.round(compassAngle)}°
            </span>
          </div>

          {/* Quick Toggle Mini Circle Buttons (from reference image) */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
              title="Cast / Stream Display"
            >
              <Cast className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
              title="Glyph Interface"
            >
              <Radio className="w-3 h-3 text-[#FFA266]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NothingBottomRailProps {
  activeSlide: number;
  className?: string;
}

export const NothingBottomRail: React.FC<NothingBottomRailProps> = ({
  activeSlide,
  className,
}) => {
  const [phoneFace, setPhoneFace] = useState<'smile' | 'wink' | 'glyph'>('smile');
  const [glyphActive, setGlyphActive] = useState(true);

  const togglePhoneFace = () => {
    setPhoneFace((prev) => (prev === 'smile' ? 'wink' : prev === 'wink' ? 'glyph' : 'smile'));
  };

  return (
    <div
      className={cn(
        'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none pointer-events-none z-30',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 py-1.5 border-t border-white/[0.08] bg-black/40 backdrop-blur-xl rounded-full px-4 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
        {/* Left Side: Nothing Phone Wireframe with Dot Matrix Face */}
        <div
          onClick={togglePhoneFace}
          className="flex items-center gap-2 pointer-events-auto cursor-pointer group"
          title="Nothing Phone // Click to toggle face"
        >
          {/* Mini Phone Wireframe with Dotted Screen Face */}
          <div className="relative w-5 h-8 rounded-[5px] border border-white/40 group-hover:border-[#FFA266] bg-black/80 p-0.5 flex flex-col justify-between items-center transition-colors">
            {/* Camera Pill Cutout */}
            <div className="w-2 h-0.5 rounded-full bg-white/40" />

            {/* Dotted Matrix Face (Directly inspired by bottom-right widget in reference image) */}
            <div className="font-mono text-[7px] text-white group-hover:text-[#FFA266] font-bold leading-none tracking-tighter">
              {phoneFace === 'smile' && ': )'}
              {phoneFace === 'wink' && '; )'}
              {phoneFace === 'glyph' && '❖'}
            </div>

            {/* Bottom Bar */}
            <div className="w-2.5 h-[1px] bg-white/30" />
          </div>

          <div className="flex flex-col text-left">
            <span className="font-mono text-[8.5px] font-bold text-white group-hover:text-[#FFA266] transition-colors">
              NOTHING (2a)
            </span>
            <span className="font-mono text-[7px] text-white/40 tracking-wider">
              {phoneFace === 'smile' ? 'PIXEL FACE' : phoneFace === 'wink' ? 'WINK MODE' : 'GLYPH LED'}
            </span>
          </div>
        </div>

        {/* Center: Audio Dot-Matrix Equalizer Waveform (Inspired by Blood On Me Sampha in reference image) */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <Volume2 className="w-3 h-3 text-[#FFA266]" />
          <div className="flex items-end gap-0.5 h-3.5">
            {[40, 75, 100, 50, 85, 30, 95, 60, 40].map((val, idx) => (
              <span
                key={idx}
                className="w-0.5 rounded-full bg-gradient-to-t from-white/30 to-[#FFA266] animate-pulse"
                style={{
                  height: `${val}%`,
                  animationDelay: `${idx * 120}ms`,
                  animationDuration: '800ms',
                }}
              />
            ))}
          </div>
          <span className="hidden sm:inline font-mono text-[8px] text-white/50 tracking-wider">
            AUDIO BUS // 60 FPS
          </span>
        </div>

        {/* Right Side: Nothing Quick Toggle Pills (Bedtime, Screen Recorder, Glyph) */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {/* Bedtime Mode Pill (Row 5 in reference) */}
          <div className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[8px] font-mono text-white/60">
            <Moon className="w-2.5 h-2.5 text-white/50" />
            <span>BEDTIME: OFF</span>
          </div>

          {/* Screen Recorder Pill (Row 4 in reference) */}
          <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[8px] font-mono text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span>SCREEN REC</span>
          </div>

          {/* Glyph Active Pill */}
          <button
            type="button"
            onClick={() => setGlyphActive((v) => !v)}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[8.5px] font-mono font-bold transition-all cursor-pointer',
              glyphActive
                ? 'bg-[#FFA266]/15 border-[#FFA266]/60 text-[#FFA266] shadow-[0_0_12px_rgba(255,162,102,0.3)]'
                : 'bg-white/[0.04] border-white/[0.08] text-white/40'
            )}
            title="Toggle Glyph Lighting"
          >
            <span className={cn('w-1.5 h-1.5 rounded-full', glyphActive ? 'bg-[#FFA266] animate-ping' : 'bg-white/20')} />
            <span>GLYPHS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
