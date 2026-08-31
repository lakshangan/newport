'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { DeveloperDecorations } from '@/components/ui/DeveloperDecorations';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { TextRevealByWord } from '@/components/ui/text-reveal';
import { Preloader } from '@/components/ui/Preloader';
import { Footer } from '@/components/footer/Footer';

// Dynamic Code-Splitting for Below-the-Fold Heavy Interactive Components
const ScrollAnimation = dynamic(() => import('@/components/ui/you-can-scroll'), { ssr: false });
const FlowAboutStorySection = dynamic(
  () => import('@/components/about/FlowAboutStorySection').then((m) => m.FlowAboutStorySection),
  { ssr: false }
);
const AchievementsShowcaseSection = dynamic(
  () => import('@/components/sections/AchievementsShowcaseSection').then((m) => m.AchievementsShowcaseSection),
  { ssr: false }
);
const ExperienceSection = dynamic(
  () => import('@/components/experience/ExperienceSection').then((m) => m.ExperienceSection),
  { ssr: false }
);
const TechTicker = dynamic(() => import('@/components/tech/TechTicker').then((m) => m.TechTicker), { ssr: false });
const DevLabBentoSection = dynamic(
  () => import('@/components/sections/DevLabBentoSection').then((m) => m.DevLabBentoSection),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import('@/components/contact/ContactSection').then((m) => m.ContactSection),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Optimized Lenis Smooth Scroll Physics Engine
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    // Synchronize Lenis smooth scroll with GSAP ScrollTrigger ticker
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

    // Refresh ScrollTrigger once DOM layout finishes initializing
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#E8E5DF] overflow-x-clip gpu-accelerate">
      {/* Developer Terminal Preloader */}
      <Preloader />

      {/* Subtle Developer Background Ambient Elements */}
      <DeveloperDecorations />

      {/* Custom Velocity-Physics Smooth Cursor */}
      <CustomCursor />

      {/* Modern Cylinder Floating Navigation */}
      <Navbar />

      {/* Full-Screen Hero Section */}
      <HeroSection />

      {/* Word-by-Word Scroll Reveal Manifesto */}
      <TextRevealByWord text="<\ I build software, design systems, and turn ideas into products. I work across web, blockchain, AI, and interactive technology, constantly exploring new tools, solving complex problems. >" />

      {/* GSAP ScrollTrigger Word Dimmer Timeline */}
      <ScrollAnimation />

      {/* Flow Art Story Scroll Showcase */}
      <FlowAboutStorySection />

      {/* Pinned Scroll Expansion Milestones Showcase */}
      <AchievementsShowcaseSection />

      {/* Professional Experience Timeline */}
      <ExperienceSection />

      {/* Moving Tech Arsenal Ticker */}
      <TechTicker />

      {/* Dev Lab & Interactive Deployment Stack Bento Grid */}
      <DevLabBentoSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
