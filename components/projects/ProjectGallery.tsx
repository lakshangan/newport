'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA, Project } from '@/lib/portfolioData';
import ExpandableBentoGrid, { BentoItem } from '@/components/ui/ExpandableBentoGrid';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

// Dynamic imports with SSR false for R3F scenes
const LandVaultScene = dynamic(
  () => import('../3d/LandVaultScene').then((m) => m.LandVaultScene),
  { ssr: false }
);
const TransactionNetworkScene = dynamic(
  () => import('../3d/TransactionNetworkScene').then((m) => m.TransactionNetworkScene),
  { ssr: false }
);
const ProvenanceScene = dynamic(
  () => import('../3d/ProvenanceScene').then((m) => m.ProvenanceScene),
  { ssr: false }
);
const SteganographyScene = dynamic(
  () => import('../3d/SteganographyScene').then((m) => m.SteganographyScene),
  { ssr: false }
);

export const ProjectGallery: React.FC = () => {
  const renderSceneComponent = (sceneType: Project['sceneType']) => {
    switch (sceneType) {
      case 'landvault':
        return <LandVaultScene />;
      case 'anonxpose':
        return <TransactionNetworkScene />;
      case 'genproof':
        return <ProvenanceScene />;
      case 'steganography':
        return <SteganographyScene />;
      case 'rebal':
        return <TransactionNetworkScene />;
      case 'medtech':
        return <ProvenanceScene />;
      default:
        return <LandVaultScene />;
    }
  };

  const bentoItems: BentoItem[] = PORTFOLIO_DATA.projects.map((project) => ({
    id: project.id,
    title: project.title,
    number: project.number,
    category: project.category,
    subtitle: project.tagline,
    description: project.description,
    demoUrl: project.demoUrl,
    githubUrl: project.githubUrl,
    icon: (
      <div className="w-full h-full relative overflow-hidden bg-[#09090b]">
        {renderSceneComponent(project.sceneType)}
      </div>
    ),
    content: (
      <div className="space-y-5 text-left">
        <div className="space-y-1.5">
          <h4 className="font-mono text-xs text-[#C75B32] uppercase font-bold tracking-wider">
            01 / THE PROBLEM
          </h4>
          <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="space-y-1.5">
          <h4 className="font-mono text-xs text-[#C75B32] uppercase font-bold tracking-wider">
            02 / ARCHITECTURAL CONCEPT
          </h4>
          <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed">
            {project.concept}
          </p>
        </div>

        <div className="space-y-1.5">
          <h4 className="font-mono text-xs text-[#C75B32] uppercase font-bold tracking-wider">
            03 / IMPLEMENTED SOLUTION
          </h4>
          <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed">
            {project.solution}
          </p>
        </div>

        <div className="space-y-1.5">
          <h4 className="font-mono text-xs text-[#C75B32] uppercase font-bold tracking-wider">
            04 / MY DISCIPLINE &amp; ROLE
          </h4>
          <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed">
            {project.myRole}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/10">
          <h4 className="font-mono text-[11px] text-white/50 uppercase tracking-widest">
            TECHNOLOGY STACK
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 font-mono text-[11px] border border-white/15 bg-white/5 text-white/80 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section id="work" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#080808] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-[#242424] pb-8 text-left">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 02 SELECTED CASE STUDIES
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            <AsciiGlitchRipple as="span" dur={900}>
              FEATURED PROJECTS
            </AsciiGlitchRipple>
          </h2>
          <p className="text-base font-light text-[#8E8B85] max-w-xl">
            Full-stack web applications, AI provenance engines, smart contract systems, and security tooling. Click any project card to expand case study details.
          </p>
        </div>

        {/* Expandable Bento Grid */}
        <ExpandableBentoGrid items={bentoItems} />

      </div>
    </section>
  );
};

export default ProjectGallery;
