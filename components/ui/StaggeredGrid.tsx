'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';
import { cn } from '@/lib/utils';
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
    centerText = "Halcyon",
    credits = {
        madeBy: { text: "@lakshangan", href: "https://github.com/lakshangan" },
        moreDemos: { text: "Lakshan Dev", href: "https://lakshan-dev.vercel.app" }
    },
    className,
    showFooter = false,
    scroller
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const gridFullRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // Bento Grid State
    const [activeBento, setActiveBento] = useState<number>(0);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ));
    };

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading');
            setIsLoaded(true);
        };

        const imgLoad = imagesLoaded(document.querySelectorAll('.grid__item-img'), { background: true }, handleLoad);

        return () => {
            // Cleanup
        };
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        // Animate Text Element
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll('.char');
            gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    scroller: scroller || undefined,
                    start: 'top bottom',
                    end: 'center center-=25%',
                    scrub: 1,
                }
            })
                .from(chars, {
                    ease: 'sine.out',
                    yPercent: 300,
                    autoAlpha: 0,
                    stagger: {
                        each: 0.05,
                        from: 'center'
                    }
                });
        }

        // Animate Full Grid
        if (gridFullRef.current) {
            const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item');
            const numColumns = getComputedStyle(gridFullRef.current).getPropertyValue('grid-template-columns').split(' ').length;
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

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1.5,
                    }
                })
                    .from(columnItems, {
                        yPercent: 450,
                        autoAlpha: 0,
                        delay: delayFactor,
                        ease: 'sine.out',
                    })
                    .from(columnItems.map(item => item.querySelector('.grid__item-img')), {
                        transformOrigin: '50% 0%',
                        ease: 'sine.out',
                    }, 0);
            });

            // Specific animation for Bento Container
            const bentoContainer = gridFullRef.current.querySelector('.bento-container');

            if (bentoContainer) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top top+=15%',
                        end: 'bottom center',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                tl.to(bentoContainer, {
                    y: window.innerHeight * 0.1,
                    scale: 1.25,
                    zIndex: 1000,
                    ease: 'power2.out',
                    duration: 1,
                    force3D: true
                }, 0);
            }
        }
    }, [isLoaded]);

    const mixedGridItems: (string | 'BENTO_GROUP')[] = Array.from({ length: 21 }, (_, i) => images[i % images.length]);
    mixedGridItems[16] = 'BENTO_GROUP';

    return (
        <div
            className={cn("shadow relative overflow-hidden w-full bg-[#080808]", className)}
            style={{
                '--grid-item-translate': '0px',
            } as React.CSSProperties}
        >
            <section className="grid place-items-center w-full relative mt-[6vh]">
                <div ref={textRef} className="text font-display uppercase flex content-center text-[clamp(2.5rem,10vw,8rem)] leading-[0.8] text-[#E8E5DF] tracking-tight">
                    {splitText(centerText)}
                </div>
            </section>

            <section className="grid place-items-center w-full relative">
                <div ref={gridFullRef} className="grid--full relative w-full my-[6vh] h-auto aspect-[1.1] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5">
                    <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-black/80 rounded-lg transition-opacity duration-500" />
                    {mixedGridItems.map((item, i) => {
                        if (item === 'BENTO_GROUP') {
                            if (!bentoItems || bentoItems.length === 0) return null;

                            return (
                                <div key="bento-group" data-col={2} className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-2 h-full w-full will-change-transform">
                                    {bentoItems.map((bentoItem, index) => {
                                        const isActive = activeBento === index;
                                        return (
                                            <div
                                                key={bentoItem.id}
                                                className={cn(
                                                    "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                                                    isActive
                                                        ? "bg-[#111111] shadow-2xl"
                                                        : "bg-[#080808]"
                                                )}
                                                style={{ width: isActive ? "60%" : "20%" }}
                                                onMouseEnter={() => setActiveBento(index)}
                                                onClick={() => setActiveBento(index)}
                                            >
                                                <div className={cn(
                                                    "absolute inset-0 rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                                                    isActive
                                                        ? "border-[#C75B32]"
                                                        : "border-[#242424] group-hover:border-[#C75B32]/50"
                                                )} />

                                                <div className="relative z-10 w-full h-full flex flex-col p-0">
                                                    <div className={cn(
                                                        "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                                                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                                                    )}>
                                                        <div className="absolute inset-0 bg-[#111111] overflow-hidden z-0 group/img">
                                                            {bentoItem.image && (
                                                                <>
                                                                    <img
                                                                        src={bentoItem.image}
                                                                        alt={bentoItem.title}
                                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-80 group-hover/img:opacity-100 filter contrast-125"
                                                                    />
                                                                    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent pointer-events-none" />
                                                                </>
                                                            )}
                                                        </div>

                                                        <div className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-between px-5 z-20">
                                                            <div className="flex flex-col relative z-10">
                                                                <h3 className="text-sm font-bold text-[#E8E5DF] drop-shadow-md leading-none tracking-tight">{bentoItem.title}</h3>
                                                            </div>
                                                            <div className="text-[#C75B32] transition-colors hover:text-white drop-shadow-md relative z-10">
                                                                {bentoItem.icon}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={cn(
                                                    "absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                                                    isActive ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                                                )}>
                                                    <div className="text-[#8E8B85] group-hover:text-[#C75B32] transition-colors">
                                                        {bentoItem.icon}
                                                    </div>
                                                    <span className="text-[10px] font-mono font-medium text-[#8E8B85] group-hover:text-[#E8E5DF] transition-colors uppercase tracking-wider">{bentoItem.title}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }

                        if (i === 17 || i === 18) return null;

                        if (typeof item === 'string') {
                            const Icon = i % 3 === 0 ? FaGithub : i % 3 === 1 ? FaSlack : FaTwitter;
                            const label = i % 3 === 0 ? "Github" : i % 3 === 1 ? "Slack" : "Twitter";

                            return (
                                <figure key={`img-${i}`} data-col={i % 7} className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer">
                                    <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-[#242424] bg-[#111111] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-[#C75B32]/50">

                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                                            <Icon className="w-8 h-8 text-[#8E8B85] transition-all duration-300 group-hover:text-[#C75B32] group-hover:scale-110" />

                                            <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                <span className="block text-[10px] font-mono text-[#8E8B85] uppercase tracking-wider mb-0.5">DEV // STACK</span>
                                                <span className="block text-sm font-mono font-bold text-[#E8E5DF] tracking-tight">{label}</span>
                                            </div>
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
                <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-[#8E8B85] uppercase font-mono text-xs tracking-wider">
                    <a href={credits.madeBy.href} className="hover:text-[#C75B32] transition-colors">{credits.madeBy.text}</a>
                    <a href={credits.moreDemos.href} className="hover:text-[#C75B32] transition-colors">{credits.moreDemos.text}</a>
                </footer>
            )}
        </div>
    );
}

export default StaggeredGrid;
