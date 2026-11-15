'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, Terminal, Activity, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const LakshanAvatarShowcase: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalX = (x / rect.width) * 2 - 1;
    const normalY = (y / rect.height) * 2 - 1;

    setTransform({
      rotateX: -normalY * 7.5,
      rotateY: normalX * 7.5,
      scale: 1.015,
    });

    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ x, y, active: true });
    setTimeout(() => {
      setRipple((prev) => ({ ...prev, active: false }));
    }, 800);
  }, []);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient Cyber Backlight Glow */}
      <div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#E88053]/25 via-[#FFA266]/15 to-transparent blur-2xl opacity-60 pointer-events-none transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Main Interactive 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          transform: `perspective(1200px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, 1)`,
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full rounded-2xl bg-[#090a0b]/90 border border-white/15 p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(232,128,83,0.12)] cursor-crosshair overflow-hidden group backdrop-blur-xl"
      >
        {/* Dynamic Cursor Spotlight Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          style={{
            opacity: glow.opacity,
            background: `radial-gradient(circle 280px at ${glow.x}% ${glow.y}%, rgba(255, 162, 102, 0.18), transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* High-Tech Corner HUD Brackets */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none text-white/40 group-hover:text-[#FFA266] transition-colors font-mono text-[10px] tracking-widest flex items-center gap-1">
          <span>┌</span>
          <span className="opacity-70">LKG // 001</span>
        </div>
        <div className="absolute top-3 right-3 z-20 pointer-events-none text-white/40 group-hover:text-[#FFA266] transition-colors font-mono text-[10px] tracking-widest flex items-center gap-1">
          <span className="opacity-70">SYS.ONLINE</span>
          <span>┐</span>
        </div>
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none text-white/40 group-hover:text-[#FFA266] transition-colors font-mono text-[10px] tracking-widest flex items-center gap-1">
          <span>└</span>
          <span className="opacity-70">11.0168° N</span>
        </div>
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none text-white/40 group-hover:text-[#FFA266] transition-colors font-mono text-[10px] tracking-widest flex items-center gap-1">
          <span className="opacity-70">AI &amp; WEB3</span>
          <span>┘</span>
        </div>

        {/* Click Shockwave Ripple */}
        {ripple.active && (
          <span
            className="absolute rounded-full pointer-events-none z-30 animate-ping border border-[#FFA266]/80 bg-[#FFA266]/20"
            style={{
              left: ripple.x - 35,
              top: ripple.y - 35,
              width: 70,
              height: 70,
            }}
          />
        )}

        {/* Image Frame with Aspect Ratio 16:9 */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#050505]">
          <Image
            src="/images/best.png"
            alt="Lakshan Ganesan - Full-Stack Developer, AI & Web3 Systems Architect"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            priority
            className="object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Subtle Cyber Scanline Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px]"
            aria-hidden="true"
          />

          {/* Soft Edge Vignette */}
          <div
            className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(5,5,5,0.7)]"
            aria-hidden="true"
          />

          {/* Bottom Live HUD Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-[10.5px] font-mono text-white/70 backdrop-blur-[2px] z-20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFA266] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFA266]" />
              </span>
              <span className="text-white/90 font-medium">NEURAL // SYSTEM AVATAR</span>
            </div>

            <div className="flex items-center gap-3 text-white/50 text-[10px]">
              <span className="hidden sm:inline">1672 × 941 UHD</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-[#FFA266]/90 font-medium">CLICK TO PULSE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LakshanAvatarShowcase;
