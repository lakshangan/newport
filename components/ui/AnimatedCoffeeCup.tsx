'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCoffeeCupProps {
  className?: string;
  steamColor?: string;
  cupColor?: string;
  accentColor?: string;
  size?: number;
}

export const AnimatedCoffeeCup: React.FC<AnimatedCoffeeCupProps> = ({
  className = 'w-10 h-10 sm:w-14 sm:h-14 inline-block align-middle ml-2.5 -mt-2',
  steamColor = '#38BDF8', // Cyan-teal matching user sketch
  accentColor = '#38BDF8',
  cupColor = '#FFFDF9',
}) => {
  return (
    <span className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(56,189,248,0.35)]"
      >
        <defs>
          <filter id="coffeeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={steamColor} floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ========================================================================= */}
        {/* ANIMATED STEAM WISPS (Left, Center, Right) */}
        {/* ========================================================================= */}
        <g filter="url(#coffeeGlow)">
          {/* Steam 1: Left */}
          <motion.path
            d="M 32 30 C 27 24, 37 18, 31 10 C 27 5, 33 0, 31 -4"
            stroke={steamColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0.35, y: 3 }}
            animate={{
              opacity: [0.25, 0.95, 0.4, 0.85, 0.25],
              y: [-1, -6, -2, -8, -1],
              scaleY: [0.95, 1.05, 0.95, 1.08, 0.95],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Steam 2: Center (Slightly taller) */}
          <motion.path
            d="M 45 28 C 40 21, 50 15, 44 7 C 40 1, 47 -4, 44 -9"
            stroke={steamColor}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0.5, y: 2 }}
            animate={{
              opacity: [0.35, 1, 0.5, 0.9, 0.35],
              y: [-2, -9, -3, -10, -2],
              scaleY: [0.92, 1.08, 0.95, 1.1, 0.92],
            }}
            transition={{
              duration: 2.1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
          />

          {/* Steam 3: Right */}
          <motion.path
            d="M 58 30 C 53 24, 63 18, 57 10 C 53 5, 59 0, 57 -4"
            stroke={steamColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0.4, y: 3 }}
            animate={{
              opacity: [0.3, 0.9, 0.45, 0.8, 0.3],
              y: [-1, -7, -2, -8, -1],
              scaleY: [0.96, 1.04, 0.95, 1.06, 0.96],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
          />
        </g>

        {/* ========================================================================= */}
        {/* CUP BODY & HANDLE */}
        {/* ========================================================================= */}
        {/* Handle */}
        <path
          d="M 67 43 C 82 43, 82 63, 67 65"
          stroke={cupColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Cup Outer & Base */}
        <path
          d="M 22 36 L 68 36 L 66 61 C 66 70, 24 70, 24 61 Z"
          fill="#16110D"
          stroke={cupColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Accent Liquid Stripe */}
        <motion.path
          d="M 23 45 L 67 45"
          stroke={accentColor}
          strokeWidth="3.8"
          strokeLinecap="round"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* ========================================================================= */}
        {/* SAUCER BASE */}
        {/* ========================================================================= */}
        <rect
          x="13"
          y="74"
          width="64"
          height="8.5"
          rx="4.25"
          fill="#16110D"
          stroke={cupColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export default AnimatedCoffeeCup;
