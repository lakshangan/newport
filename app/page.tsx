'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { DeveloperDecorations } from '@/components/ui/DeveloperDecorations';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { TextRevealByWord } from '@/components/ui/text-reveal';
import ScrollAnimation from '@/components/ui/you-can-scroll';
import { FlowAboutStorySection } from '@/components/about/FlowAboutStorySection';
import { AchievementsShowcaseSection } from '@/components/sections/AchievementsShowcaseSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { TechTicker } from '@/components/tech/TechTicker';
import { DecryptChallengeSection } from '@/components/cipher/DecryptChallengeSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/footer/Footer';

import { Preloader } from '@/components/ui/Preloader';
import { MobilePortfolio } from '@/components/mobile/MobilePortfolio';

export default function Home() {
  useEffect(() => {
    // Only initialize desktop Lenis smooth scroll and ScrollTrigger if desktop viewport
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Record arrival timestamp for the 5-minute hint reveal timer
    try {
      if (!sessionStorage.getItem('portfolio_stay_start')) {
        sessionStorage.setItem('portfolio_stay_start', String(Date.now()));
      }
    } catch {
      // Ignore storage error
    }

    // Initialize Lenis Smooth Scroll with high-performance linear interpolation (lerp)
    const isTouchOnly = window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    const lenis = new Lenis({
      lerp: isTouchOnly ? 0.12 : 0.085,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoRaf: false,
    });

    // Synchronize Lenis smooth scroll with GSAP ScrollTrigger ticker
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once DOM layout finishes initializing
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 500);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#E8E5DF] overflow-x-clip">
      {/* ──────────────────────────────────────────────────────────────────────────
          1. DEDICATED MINIMAL MOBILE VIEW (Visible strictly on screens < 768px)
          Inspired by pareekshithpalat.vercel.app with our custom theme & brand
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="block md:hidden">
        <MobilePortfolio />
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. FULL FEATURED DESKTOP VIEW (Visible strictly on screens >= 768px)
          Preserves 100% of all existing 3D scenes, GSAP animations & layout
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
        {/* Developer Terminal Preloader */}
        <Preloader />

        {/* Subtle Developer Background Ambient Elements */}
        <DeveloperDecorations />

        {/* Custom Subtle Dot Cursor */}
        <CustomCursor />

        {/* Modern Cylinder Floating Navigation */}
        <Navbar />

        {/* Full-Screen Hero Section */}
        <HeroSection />

        {/* Fun & Relatable Word-by-Word Scroll Reveal Manifesto */}
        <TextRevealByWord text="<\ I build software, design systems, and turn ideas into products. I work across web, blockchain, AI, and interactive technology, constantly exploring new tools, solving complex problems. >" />

        {/* Section 01: Creative Passion & Engineering (I Love To Code / Build / Learn / Ship) */}
        <ScrollAnimation />

        {/* Flow Art Story Scroll Showcase (with integrated live BUILD camera zoom transition) */}
        <FlowAboutStorySection />

        {/* Floating Milestone Showcase (25+ Hackathons, 20+ Finalists, Intl Silambam Bronze) */}
        <AchievementsShowcaseSection />

        {/* Professional Experience Timeline */}
        <ExperienceSection />

        {/* Proof of Work & Community Staggered Grid */}
        <TechTicker />

        {/* Interactive Cryptographic Decrypt Challenge */}
        <DecryptChallengeSection />

        {/* Dramatic Contact CTA */}
        <ContactSection />

        {/* Minimal Footer */}
        <Footer />
      </div>
    </main>
  );
}
