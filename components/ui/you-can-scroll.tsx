"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const WORD_ITEMS = [
  { text: "code.", color: "text-[#5CE1E6]" },
  { text: "build.", color: "text-[#E88053]" },
  { text: "learn.", color: "text-[#C084FC]" },
  { text: "ship.", color: "text-[#FF6B35]" },
  { text: "innovate.", color: "text-[#FACC15]" },
  { text: "design.", color: "text-[#FF4D4D]" },
  { text: "prototype.", color: "text-[#F4A261]" },
  { text: "solve.", color: "text-[#2DD4BF]" },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Guaranteed video playback
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Video playback:", error);
        });
      }
    }

    const section = sectionRef.current;
    if (!section) return;

    const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!words.length) return;

    // Set initial word positions: first word at y:0%, opacity:1; others at y:100%, opacity:0
    words.forEach((word, idx) => {
      if (idx === 0) {
        gsap.set(word, { opacity: 1, y: "0%" });
      } else {
        gsap.set(word, { opacity: 0, y: "100%" });
      }
    });

    // Create GSAP ScrollTrigger timeline scrubbing on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3200",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
      },
    });

    // Scrub through each word: fade/slide out previous up, fade/slide in current up
    for (let i = 1; i < words.length; i++) {
      const prevWord = words[i - 1];
      const currWord = words[i];

      tl.to(prevWord, { opacity: 0, y: "-100%", duration: 1 }, `step-${i}`)
        .fromTo(
          currWord,
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 1 },
          `step-${i}`
        );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-[#080808] overflow-hidden select-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          src="/images/grok-video-977e7e29-8a81-4998-a90a-b71e113b8fd3.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter brightness-90 contrast-105"
        />
      </div>

      {/* Fallback Artwork Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/images/about section .png"
          alt="Artistic Section Background"
          fill
          priority
          className="object-cover object-[20%_center] filter contrast-105 brightness-95"
          sizes="100vw"
        />
      </div>

      {/* Film Overlay & Cinematic Vignette */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/70 via-black/35 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/85 pointer-events-none" />

      {/* Ambient Volumetric Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#C75B32]/15 rounded-full blur-[180px] pointer-events-none z-2" />

      {/* Cinematic Placement Layout Container (Pushed to Open Right Sky Space) */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 relative z-10 flex items-center justify-end">
        <div className="w-full lg:w-8/12 lg:ml-auto flex items-baseline justify-start">
          
          {/* Prefix "i love to" in Artistic Serif Typography */}
          <span className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#E8E5DF] select-none whitespace-nowrap mr-4 sm:mr-8 shrink-0 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            i love to
          </span>

          {/* In-Place Scroll-Revealed Rotating Text in Art Serif Bold Typography */}
          <div className="relative h-[1.3em] inline-flex items-center min-w-[260px] sm:min-w-[480px] overflow-hidden">
            {WORD_ITEMS.map((item, i) => (
              <span
                key={i}
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className={`absolute inset-0 flex items-center ${item.color} font-serif font-black italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]`}
              >
                {item.text}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
