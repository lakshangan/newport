'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';
import { FaGithub, FaSlack, FaTwitter } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

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
  images: string[];
  bentoItems: BentoItem[];
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
  bentoItems,
  centerText = "TECH ARSENAL",
  credits = {
    madeBy: { text: "LAKSHAN GANESAN // 2026", href: "https://github.com/lakshangan" },
    moreDemos: { text: "FEATURED PROJECTS ↗", href: "#work" },
  },
  className,
  showFooter = true,
  scroller,
}: StaggeredGridProps) {
  const gridFullRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [activeBento, setActiveBento] = useState<number>(0);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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

        // Specific animation for Bento Container
        const bentoContainer = gridFullRef.current.querySelector('.bento-container');
        if (bentoContainer) {
          gsap.timeline({
            scrollTrigger: {
              trigger: gridFullRef.current,
              start: 'top top+=20%',
              end: 'bottom center',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }).to(bentoContainer, {
            y: window.innerHeight * 0.08,
            scale: 1.15,
            zIndex: 100,
            ease: 'power2.out',
            duration: 1,
          });
        }
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const mixedGridItems: (string | 'BENTO_GROUP')[] = Array.from(
    { length: 21 },
    (_, i) => images[i % images.length]
  );
  mixedGridItems[16] = 'BENTO_GROUP';

  return (
    <div
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
          
          {mixedGridItems.map((item, i) => {
            if (item === 'BENTO_GROUP') {
              if (!bentoItems || bentoItems.length === 0) return null;

              return (
                <div
                  key="bento-group"
                  data-col={2}
                  className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-1 sm:gap-2 h-full w-full will-change-transform"
                >
                  {bentoItems.map((bentoItem, index) => {
                    const isActive = activeBento === index;
                    return (
                      <div
                        key={bentoItem.id}
                        className={cn(
                          'relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
                          isActive
                            ? 'bg-zinc-900/60 shadow-2xl border border-[#C75B32]/70'
                            : 'bg-zinc-950 border border-white/10 hover:border-white/30'
                        )}
                        style={{ width: isActive ? '60%' : '20%' }}
                        onMouseEnter={() => setActiveBento(index)}
                        onClick={() => setActiveBento(index)}
                      >
                        <div
                          className={cn(
                            'absolute inset-0 rounded-xl sm:rounded-2xl border z-50 pointer-events-none transition-colors duration-700',
                            isActive ? 'border-[#C75B32]/50' : 'border-zinc-800/50'
                          )}
                        />

                        <div className="relative z-10 w-full h-full flex flex-col p-0">
                          <div
                            className={cn(
                              'absolute inset-0 flex flex-col transition-all duration-500 ease-in-out',
                              isActive
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4 pointer-events-none'
                            )}
                          >
                            <div className="absolute inset-0 bg-zinc-900 overflow-hidden z-0 group/img">
                              {bentoItem.image && (
                                <>
                                  <img
                                    src={bentoItem.image}
                                    alt={bentoItem.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-85 group-hover/img:opacity-100"
                                  />
                                  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
                                </>
                              )}
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 flex items-center justify-between px-2 sm:px-5 z-20">
                              <div className="flex flex-col relative z-10 space-y-0.5 max-w-[80%]">
                                <h3 className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-none tracking-tight truncate">
                                  {bentoItem.title}
                                </h3>
                                <p className="text-[9px] sm:text-[10px] font-mono text-[#C75B32] truncate">
                                  {bentoItem.subtitle}
                                </p>
                              </div>
                              <div className="text-[#C75B32] transition-colors hover:text-white drop-shadow-md relative z-10 text-base sm:text-xl">
                                {bentoItem.icon}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={cn(
                            'absolute inset-0 flex flex-col items-center justify-center gap-1 sm:gap-2 transition-all duration-500 p-0.5',
                            isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
                          )}
                        >
                          <div className="text-[#C75B32] group-hover:text-white transition-colors text-sm sm:text-lg">
                            {bentoItem.icon}
                          </div>
                          <span className="text-[8px] sm:text-[9px] font-mono font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase tracking-wider text-center px-0.5 truncate max-w-full">
                            {bentoItem.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }

            if (i === 17 || i === 18) return null;

            if (typeof item === 'string') {
              return (
                <figure
                  key={`img-${i}`}
                  data-col={i % 7}
                  className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer"
                >
                  <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-zinc-800 bg-zinc-950 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-[#C75B32]/60">
                    <img
                      src={item}
                      alt={`Gallery shot ${i}`}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-2">
                      <AsciiGlitchRipple
                        as="span"
                        className="text-[9px] font-mono text-white font-bold tracking-wider uppercase drop-shadow"
                        dur={800}
                      >
                        PROOF_OF_WORK
                      </AsciiGlitchRipple>
                    </div>
                  </div>
                </figure>
              );
            }
            return null;
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
