"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORD_ITEMS = [
  { text: "code.", color: "text-[#C75B32]" },
  { text: "build.", color: "text-[#E88053]" },
  { text: "learn.", color: "text-[#C084FC]" },
  { text: "ship.", color: "text-[#FF6B35]" },
];

export default function ScrollAnimation() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % WORD_ITEMS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Use IntersectionObserver to pause decoding when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const currentWord = WORD_ITEMS[index];

  return (
    <section className="relative w-full h-screen min-h-screen flex items-center justify-center bg-[#080808] overflow-hidden select-none">
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
          className="w-full h-full object-cover filter brightness-105 contrast-100"
        />
      </div>

      {/* Reduced Light Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/40 via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#080808]/70 via-transparent to-[#080808]/50 pointer-events-none" />

      {/* Ambient Volumetric Warm Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#C75B32]/20 rounded-full blur-[160px] pointer-events-none z-2" />

      {/* Cinematic Layout Container */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 relative z-10 flex items-center justify-end">
        <div className="w-full lg:w-8/12 lg:ml-auto flex items-center justify-start text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold uppercase tracking-tight leading-none">

          {/* Prefix "I LOVE TO" */}
          <span className="text-[#E8E5DF] select-none whitespace-nowrap mr-3 sm:mr-6 shrink-0 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            I LOVE TO
          </span>

          {/* In-Place Auto-Cycling Text Wrapper */}
          <div className="relative h-[1.3em] font-mono font-bold uppercase tracking-tight inline-flex items-center min-w-[260px] sm:min-w-[450px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -35 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className={`absolute left-0 top-0 w-full h-full flex items-center ${currentWord.color} font-mono font-bold uppercase tracking-tight select-none`}
              >
                {currentWord.text}
              </motion.span>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
