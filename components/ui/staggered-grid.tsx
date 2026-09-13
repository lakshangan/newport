'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

gsap.registerPlugin(ScrollTrigger);

export interface GridPhotoItem {
  src: string;
  title?: string;
  subtitle?: string;
}

export interface BentoItem {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
  image?: string;
}

export interface StaggeredGridProps {
  images: (string | GridPhotoItem)[];
  bentoItems?: BentoItem[];
  centerText?: string;
  credits?: {
    madeBy: { text: string; href: string };
    moreDemos: { text: string; href: string };
  };
  className?: string;
  showFooter?: boolean;
  scroller?: string | Element | Window | null;
}

export function StaggeredGrid({
  images,
  centerText = "PROOF OF WORK",
  credits = {
    madeBy: { text: "LAKSHAN GANESAN // 2026", href: "https://github.com/lakshangan" },
    moreDemos: { text: "FEATURED PROJECTS ↗", href: "#work" },
  },
  className,
  showFooter = true,
  scroller,
}: StaggeredGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridFullRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useGSAP(
    () => {
      // Animate Text Element
      if (textRef.current) {
        const chars = textRef.current.querySelectorAll('.char');
        gsap
          .timeline({
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              end: 'bottom center',
              scrub: 1,
            },
          })
          .from(chars, {
            ease: 'sine.out',
            yPercent: 200,
            autoAlpha: 0,
            stagger: {
              each: 0.05,
              from: 'center',
            },
          });
      }

      // Animate Full Grid Columns
      if (gridFullRef.current) {
        const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item');
        const numColumns = 7;
        const middleColumnIndex = Math.floor(numColumns / 2);

        const columns: Element[][] = Array.from({ length: numColumns }, () => []);
        gridFullItems.forEach((item: any) => {
          const colAttr = item.getAttribute('data-col');
          const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
          if (columns[columnIndex]) {
            columns[columnIndex].push(item);
          }
        });

        columns.forEach((columnItems, columnIndex) => {
          const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: gridFullRef.current,
                start: 'top 85%',
                end: 'center center',
                scrub: 1.5,
              },
            })
            .from(columnItems, {
              yPercent: 350,
              autoAlpha: 0,
              delay: delayFactor,
              ease: 'sine.out',
            });
        });
      }

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  const normalizedItems: GridPhotoItem[] = images.map((img) =>
    typeof img === 'string' ? { src: img } : img
  );

  const gridItems: GridPhotoItem[] = Array.from(
    { length: 21 },
    (_, i) => normalizedItems[i % normalizedItems.length]
  );

  return (
    <div
      ref={containerRef}
      className={cn('shadow relative overflow-hidden w-full bg-[#080808]', className)}
      style={
        {
          '--grid-item-translate': '0px',
        } as React.CSSProperties
      }
    >
      {/* Centered Split Text Section */}
      <section className="grid place-items-center w-full relative mt-[6vh]">
        <div
          ref={textRef}
          className="text font-display uppercase flex content-center text-[clamp(2.5rem,9vw,7.5rem)] leading-[0.85] text-white font-black tracking-tight drop-shadow-2xl"
        >
          {splitText(centerText)}
        </div>
      </section>

      {/* Column Staggered Grid Section */}
      <section className="grid place-items-center w-full relative">
        <div
          ref={gridFullRef}
          className="grid--full relative w-full my-[4vh] sm:my-[6vh] h-auto aspect-[1.1] max-w-none p-2 sm:p-4 grid gap-1.5 sm:gap-4 grid-cols-7 grid-rows-5"
        >
          <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-black/80 rounded-lg transition-opacity duration-500" />
          
          {gridItems.map((item, i) => {
            return (
              <figure
                key={`img-${i}`}
                data-col={i % 7}
                className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer"
              >
                <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-zinc-800 bg-zinc-950 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-[#C75B32]/60">
                  <img
                    src={item.src}
                    alt={item.title || `Gallery shot ${i}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-2.5 sm:p-3 pointer-events-none">
                    {item.title && (
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-white tracking-tight line-clamp-1 drop-shadow mb-0.5">
                        {item.title}
                      </span>
                    )}
                    <AsciiGlitchRipple
                      as="span"
                      className="text-[8px] sm:text-[9px] font-mono text-[#C75B32] font-semibold tracking-wider uppercase drop-shadow"
                      dur={800}
                    >
                      {item.subtitle || 'PROOF_OF_WORK'}
                    </AsciiGlitchRipple>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </section>

      {showFooter && (
        <footer className="frame__footer w-full p-6 flex justify-between items-center relative z-50 text-neutral-400 uppercase font-mono text-xs tracking-wider border-t border-white/10">
          <a href={credits.madeBy.href} className="hover:text-[#C75B32] transition-colors">
            {credits.madeBy.text}
          </a>
          <a href={credits.moreDemos.href} className="hover:text-[#C75B32] transition-colors">
            {credits.moreDemos.text}
          </a>
        </footer>
      )}
    </div>
  );
}

export default StaggeredGrid;
