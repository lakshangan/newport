'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollDissolveRevealProps {
  children: React.ReactNode;
  className?: string;
  start?: string;
  end?: string;
  blurAmount?: number;
}

export const ScrollDissolveReveal: React.FC<ScrollDissolveRevealProps> = ({
  children,
  className,
  start = 'top 85%',
  end = 'top 30%',
  blurAmount = 16,
}) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          filter: `blur(${blurAmount}px)`,
          transform: 'translateY(40px)',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          transform: 'translateY(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [start, end, blurAmount]);

  return (
    <div ref={containerRef} className={cn('will-change-[filter,opacity,transform]', className)}>
      {children}
    </div>
  );
};

export default ScrollDissolveReveal;
