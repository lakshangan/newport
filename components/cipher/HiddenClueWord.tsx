'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface HiddenClueWordProps {
  children?: React.ReactNode;
  word?: string;
  clueIndex?: 0 | 1 | 2; // 0: PROOF (880Hz), 1: PASSION (1108Hz), 2: DISCIPLINE (1320Hz)
  className?: string;
}

// Global AudioContext singleton unlocked upon first user interaction
let globalAudioCtx: AudioContext | null = null;
let audioUnlocked = false;

function initAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      globalAudioCtx = new AudioCtx();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
}

// Unlock audio on first user gesture anywhere on the page
if (typeof window !== 'undefined') {
  const unlock = () => {
    if (!audioUnlocked) {
      const ctx = initAudioContext();
      if (ctx) audioUnlocked = true;
    }
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock, { once: true, passive: true });
  window.addEventListener('keydown', unlock, { once: true, passive: true });
}

// Harmonic frequencies for the three clues: A5 (880Hz), C#6 (1108.7Hz), E6 (1318.5Hz)
const CLUE_FREQUENCIES = [880, 1108.73, 1318.51];

function playSubtleClueSignal(clueIndex: number) {
  try {
    const ctx = initAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // High-tech bandpass filter for a delicate, subtle digital pip
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(CLUE_FREQUENCIES[clueIndex] ?? 1000, now);
    filter.Q.setValueAtTime(4, now);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(CLUE_FREQUENCIES[clueIndex] ?? 1000, now);
    osc.frequency.exponentialRampToValueAtTime(
      (CLUE_FREQUENCIES[clueIndex] ?? 1000) * 1.04,
      now + 0.08
    );

    // Ultra-gentle volume envelope (max gain 0.045)
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.095);
  } catch {
    // Fail silently without disrupting UI
  }
}

// Periodic Blink Interval: 20 minutes (in milliseconds)
const TWENTY_MINUTES_MS = 20 * 60 * 1000;

export const HiddenClueWord: React.FC<HiddenClueWordProps> = ({
  children,
  word,
  clueIndex = 0,
  className = '',
}) => {
  const [isFlickering, setIsFlickering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const lastSoundPlayedRef = useRef<number>(0);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect desktop hover capability
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Trigger transient subtle signal animation
  const triggerSignal = useCallback(
    (playSound: boolean) => {
      setIsFlickering(true);

      if (playSound && isDesktop) {
        const now = Date.now();
        // Throttle audio: min 350ms between trigger sounds
        if (now - lastSoundPlayedRef.current > 350) {
          playSubtleClueSignal(clueIndex);
          lastSoundPlayedRef.current = now;
        }
      }

      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      // Return cleanly to normal after 420ms
      resetTimeoutRef.current = setTimeout(() => {
        setIsFlickering(false);
      }, 420);
    },
    [clueIndex, isDesktop]
  );

  // Periodic signal: flicker automatically once every 20 minutes
  useEffect(() => {
    // Stagger slightly by clueIndex so all 3 don't blink in the exact same millisecond
    const initialDelay = 1000 + clueIndex * 1500;
    let periodicTimer: NodeJS.Timeout | null = null;

    const firstTimer = setTimeout(() => {
      periodicTimer = setInterval(() => {
        triggerSignal(false); // Visual-only periodic signal, no unexpected autoplay audio
      }, TWENTY_MINUTES_MS);
    }, initialDelay);

    return () => {
      clearTimeout(firstTimer);
      if (periodicTimer) clearInterval(periodicTimer);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, [clueIndex, triggerSignal]);

  const handleMouseEnter = () => {
    if (!isDesktop) return;
    triggerSignal(true);
  };

  const content = children || word || '';

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`relative inline transition-all duration-150 select-text ${className} ${
        isFlickering
          ? 'text-[#FFA266] drop-shadow-[0_0_8px_rgba(255,162,102,0.65)] opacity-95 [animation:clueSignal_0.42s_ease-in-out]'
          : ''
      }`}
      style={{
        display: 'inline',
      }}
    >
      {content}
    </span>
  );
};

export default HiddenClueWord;
