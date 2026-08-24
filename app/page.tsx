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
import ScrollAnimation from '@/components/ui/you-can-scroll';
import { AboutSection } from '@/components/about/AboutSection';
import { TextRevealByWord } from '@/components/ui/text-reveal';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { PlaygroundSection } from '@/components/playground/PlaygroundSection';
import { TechTicker } from '@/components/tech/TechTicker';
import { DevLabBentoSection } from '@/components/sections/DevLabBentoSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/footer/Footer';

import { Preloader } from '@/components/ui/Preloader';

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis smooth scroll with GSAP ScrollTrigger ticker
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#E8E5DF] overflow-x-hidden">
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
      <TextRevealByWord text="When I'm not pushing smart contracts to mainnet or debugging WebGL shaders at 3 AM, I'm building autonomous AI agents, brewing double-shot espresso, and turning wild ideas into production reality." />

      {/* GSAP ScrollTrigger Word Dimmer Timeline */}
      <ScrollAnimation />

      {/* About & Core Disciplines */}
      <AboutSection />

      {/* Professional Experience Timeline */}
      <ExperienceSection />

      {/* Playground Experiments */}
      <PlaygroundSection />

      {/* Moving Tech Arsenal Ticker */}
      <TechTicker />

      {/* Dev Lab & Interactive Deployment Stack Bento Grid */}
      <DevLabBentoSection />

      {/* Dramatic Contact CTA */}
      <ContactSection />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
