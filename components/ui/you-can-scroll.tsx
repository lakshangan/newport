"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const WORD_ITEMS = [
  { text: "code.", color: "text-[#5CE1E6]" },
  { text: "build.", color: "text-[#38BDF8]" },
  { text: "learn.", color: "text-[#C084FC]" },
  { text: "ship.", color: "text-[#FF6B35]" },
  { text: "innovate.", color: "text-[#FACC15]" },
  { text: "design.", color: "text-[#FF4D4D]" },
  { text: "prototype.", color: "text-[#E88053]" },
  { text: "solve.", color: "text-[#2DD4BF]" },
];

export default function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const playVideo = () => {
      const video = videoRef.current;
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.currentTime = 0;
        video.play().catch((err) => {
          console.warn("Video playback:", err);
        });
      }
    };

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

    // Create GSAP ScrollTrigger timeline scrubbing on scroll with video playback trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3200",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onEnter: playVideo,
        onEnterBack: playVideo,
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

    // Try playing initial load if already in section view
    playVideo();

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
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter brightness-90 contrast-105"
        />
      </div>

      {/* Ambient Dark Overlays */}
      <div className="absolute inset-0 z-1 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/80 pointer-events-none" />

      {/* Single Straight Line Layout Container */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 relative z-10 flex items-center justify-center md:justify-start">
        <div className="flex items-center font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white">
          
          {/* Prefix "i love to" on a single straight horizontal line */}
          <span className="select-none whitespace-nowrap mr-4 sm:mr-8 shrink-0">
            i love to
          </span>

          {/* In-Place Scroll-Revealed Rotating Text Container */}
          <div className="relative h-[1.4em] inline-flex items-center min-w-[240px] sm:min-w-[440px] overflow-hidden">
            {WORD_ITEMS.map((item, i) => (
              <span
                key={i}
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className={`absolute inset-0 flex items-center ${item.color} font-sans font-black tracking-tight leading-none select-none drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]`}
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
