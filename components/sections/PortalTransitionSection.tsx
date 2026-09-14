"use client";

import React from "react";
import Image from "next/image";
import GlyphPortal from "@/components/ui/glyph-portal";

/**
 * Layer 2: Upcoming Section Preview (FlowAboutStorySection - 02 Leadership & Accolades)
 * Sits as the second layer revealed inside the letters of BUILD and expands
 * to 100% full screen upon zoom completion.
 */
function UpcomingSectionBackground() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0C0907] select-none">
      {/* Continuous Panoramic Studio Workspace Panorama */}
      <Image
        src="/images/horizontal-workspace.png"
        alt="Creative Engineering Workspace Studio Panorama"
        fill
        priority
        className="object-cover object-left md:object-center filter brightness-[1.05] contrast-[1.02] saturate-[1.08]"
        sizes="100vw"
      />

      {/* Luminous warm ambient vignette identical to FlowAboutStorySection */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907]/60 via-transparent to-[#0C0907]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(12,9,7,0.4)_100%)] pointer-events-none" />

      {/* Warm Golden Hour Volumetric Glows */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[400px] bg-[#E88053]/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[380px] bg-[#FFA266]/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Section 02 Accolades Header peering cleanly through the letters */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-14 md:px-20 max-w-7xl mx-auto pointer-events-none">
        <div className="space-y-2.5 sm:space-y-3 max-w-3xl my-auto text-left">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#18120D]/85 border border-[#D4BC98]/35 text-[10px] sm:text-xs font-mono text-[#FFA266] tracking-widest uppercase backdrop-blur-xl shadow-lg w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
            <span>02 // LEADERSHIP &amp; ACCOLADES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#FFFDF9] drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)] leading-[1.02]">
            PROVEN ON NATIONAL &amp; GLOBAL STAGES
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-medium text-[#FFFDF9]/90 max-w-2xl bg-[#18120D]/55 backdrop-blur-xl p-3 sm:p-4 rounded-xl border border-[#D4BC98]/25 shadow-lg leading-relaxed">
            Combining competitive hackathon execution, decentralized protocol research, and campus community leadership with unwavering discipline.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Layer 1: Clean Dark Transition Surface
 * Deep obsidian black with warm amber atmosphere and subtle architectural grid.
 * Keeps the transition layer clean, modern, and uncluttered.
 */
function TransitionSurface() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#080808] select-none">
      {/* Subtle Warm Amber Vignette and Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,91,50,0.12)_0%,rgba(8,8,8,0.95)_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E88053]/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
    </div>
  );
}

export function PortalTransitionSection() {
  return (
    <GlyphPortal
      word="BUILD"
      focusChar="U"
      scrollLength={2.0}
      interactive={false}
      strokeOutline={true}
      annotations={false}
      style={{
        "--gp-paper": "#080808",
        "--gp-ink": "#FFA266",
        "--gp-field": "#0C0907",
        "--gp-foreground": "#FFFDF9",
      }}
      layer1={<TransitionSurface />}
      background={<UpcomingSectionBackground />}
      front={
        <div className="absolute top-8 sm:top-12 left-0 right-0 px-6 sm:px-12 flex justify-between items-center pointer-events-none z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-[#D4BC98]/25 text-[10px] sm:text-xs font-mono text-[#FFA266] uppercase tracking-widest backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-pulse" />
            <span>// 01.5 TRANSITION PORTAL</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono text-white/50 tracking-wider">
            <span>SCROLL TO ENTER SECTION 02</span>
            <span className="text-[#FFA266]">↓</span>
          </div>
        </div>
      }
    />
  );
}

export default PortalTransitionSection;
