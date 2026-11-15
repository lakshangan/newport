'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><,./-=';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-[#C75B32]',
  animateOn = 'view',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20px' });
  const hasAnimatedRef = useRef<boolean>(false);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ')
    : characters.split('');

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return char;
          const randomChar = availableChars[Math.floor(Math.random() * availableChars.length)] || char;
          return randomChar;
        })
        .join('');
    },
    [availableChars]
  );

  const getNextIndex = useCallback(
    (revealed: Set<number>, length: number): number => {
      const remaining: number[] = [];
      for (let i = 0; i < length; i++) {
        if (!revealed.has(i) && text[i] !== ' ') {
          remaining.push(i);
        }
      }
      if (remaining.length === 0) return -1;

      if (revealDirection === 'start') {
        return remaining[0];
      }
      if (revealDirection === 'end') {
        return remaining[remaining.length - 1];
      }
      // center
      const middle = length / 2;
      return remaining.reduce((prev, curr) =>
        Math.abs(curr - middle) < Math.abs(prev - middle) ? curr : prev
      );
    },
    [revealDirection, text]
  );

  const triggerAnimation = useCallback(() => {
    setIsScrambling(true);
    let currentIteration = 0;
    const currentRevealed = new Set<number>();
    setRevealedIndices(new Set(currentRevealed));

    const interval = setInterval(() => {
      if (sequential) {
        if (currentRevealed.size < text.replace(/\s/g, '').length) {
          const nextIndex = getNextIndex(currentRevealed, text.length);
          if (nextIndex !== -1) {
            currentRevealed.add(nextIndex);
            setRevealedIndices(new Set(currentRevealed));
          }
          setDisplayText(shuffleText(text, currentRevealed));
        } else {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      } else {
        currentIteration++;
        setDisplayText(shuffleText(text, currentRevealed));
        if (currentIteration >= maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [getNextIndex, maxIterations, sequential, shuffleText, speed, text]);

  useEffect(() => {
    if (animateOn === 'view' && isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      const cleanup = triggerAnimation();
      return cleanup;
    }
  }, [animateOn, isInView, triggerAnimation]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !isScrambling) {
      setIsHovering(true);
      triggerAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      setIsHovering(false);
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${parentClassName}`}
    >
      <span className={className}>
        {displayText.split('').map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isScrambling;
          return (
            <span
              key={index}
              className={!isRevealed ? encryptedClassName : undefined}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default DecryptedText;

