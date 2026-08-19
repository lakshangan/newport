'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from '@/components/ui/Preloader';
import { DeveloperDecorations } from '@/components/ui/DeveloperDecorations';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import ScrollAnimation from '@/components/ui/you-can-scroll';
import { AboutSection } from '@/components/about/AboutSection';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { SectionDissolveTransition } from '@/components/sections/SectionDissolveTransition';
import { PhotoGallerySection } from '@/components/gallery/PhotoGallerySection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { AchievementsSection } from '@/components/achievements/AchievementsSection';
import { PlaygroundSection } from '@/components/playground/PlaygroundSection';
import { TechTicker } from '@/components/tech/TechTicker';
import { DevLabBentoSection } from '@/components/sections/DevLabBentoSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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

      {/* GSAP ScrollTrigger Word Dimmer Timeline */}
      <ScrollAnimation />

      {/* About & Core Disciplines */}
      <AboutSection />

      {/* Selected Work & Case Studies with R3F Scenes */}
      <ProjectGallery />

      {/* WebGL Shader Section Dissolve Transition */}
      <SectionDissolveTransition />

      {/* Proof of Work: Polaroid Photo Gallery & Community Memories */}
      <PhotoGallerySection />

      {/* Professional Experience Timeline */}
      <ExperienceSection />

      {/* Honors & Hackathon Achievements */}
      <AchievementsSection />

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
