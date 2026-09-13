'use client';

import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCoffeeCupProps {
  className?: string;
  accentColor?: string;
}

export const AnimatedCoffeeCup: React.FC<AnimatedCoffeeCupProps> = ({
  className = 'w-10 h-10 sm:w-14 sm:h-14 inline-block align-middle ml-2.5 -mt-2',
  accentColor = '#FFA266',
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const gradId = `coffeeGrad_${uniqueId}`;
  const steamGradId = `coffeeSteamGrad_${uniqueId}`;
  const glowId = `coffeeGlow_${uniqueId}`;

  return (
    <span className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(255,162,102,0.35)]"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA266" />
            <stop offset="100%" stopColor="#E88053" />
          </linearGradient>

          <linearGradient id={steamGradId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFA266" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFA266" stopOpacity="0.15" />
          </linearGradient>

          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor={accentColor} floodOpacity="0.65" />
          </filter>
        </defs>

        {/* ========================================================================= */}
        {/* ANIMATED STEAM WISPS (Left, Center, Right) */}
        {/* ========================================================================= */}
        <g filter={`url(#${glowId})`}>
          {/* Steam 1: Left */}
          <motion.path
            d="M 23 23 C 20.5 18, 25.5 14, 22.5 9 C 20 5.5, 23 2.5, 22.5 -0.5"
            stroke={`url(#${steamGradId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0.35, y: 1 }}
            animate={{
              opacity: [0.3, 0.9, 0.45, 0.85, 0.3],
              y: [0, -4, -1, -5, 0],
              scaleY: [0.95, 1.05, 0.95, 1.06, 0.95],
            }}
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Steam 2: Center (Taller) */}
          <motion.path
            d="M 31 22 C 28 16, 34 12, 31 6 C 28.5 1.5, 32.5 -2, 31 -5"
            stroke={`url(#${steamGradId})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0.5, y: 1 }}
            animate={{
              opacity: [0.4, 1, 0.55, 0.95, 0.4],
              y: [-1, -6, -2, -7, -1],
              scaleY: [0.92, 1.08, 0.94, 1.1, 0.92],
            }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.35,
            }}
          />

          {/* Steam 3: Right */}
          <motion.path
            d="M 39 23 C 36.5 18, 41.5 14, 38.5 9 C 36 5.5, 39 2.5, 38.5 -0.5"
            stroke={`url(#${steamGradId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0.4, y: 1 }}
            animate={{
              opacity: [0.35, 0.85, 0.4, 0.8, 0.35],
              y: [0, -4.5, -1, -5.5, 0],
              scaleY: [0.96, 1.04, 0.95, 1.05, 0.96],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.7,
            }}
          />
        </g>

        {/* ========================================================================= */}
        {/* CUP BODY & SAUCER */}
        {/* ========================================================================= */}
        {/* Handle */}
        <path
          d="M 45 32 C 54.5 32, 54.5 44, 45 44"
          stroke={`url(#${gradId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Cup Silhouette Body */}
        <path
          d="M 16 28 H 46 V 42 C 46 48.5, 41 50, 31 50 C 21 50, 16 48.5, 16 42 Z"
          fill={`url(#${gradId})`}
        />

        {/* Subtle Modern Coffee Surface Gloss Line */}
        <path
          d="M 18.5 31 Q 31 33.5 43.5 31"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Saucer */}
        <rect
          x="12"
          y="52.5"
          width="38"
          height="3.5"
          rx="1.75"
          fill={`url(#${gradId})`}
        />
      </svg>
    </span>
  );
};

export default AnimatedCoffeeCup;
