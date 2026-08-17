'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA, Project } from '@/lib/portfolioData';
import { ProjectModal } from './ProjectModal';

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  return (
    <section id="work" className="py-24 px-6 bg-[#080808] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-[#242424] pb-8">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 02 SELECTED CASE STUDIES
          </div>
          <h2 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            FEATURED PROJECTS
          </h2>
          <p className="text-base font-light text-[#8E8B85] max-w-xl">
            Smart contract systems, transaction intelligence tools, AI provenance layers, and security tooling.
          </p>
        </div>

        {/* Clean Project Showcase List */}
        <div className="space-y-20">
          {PORTFOLIO_DATA.projects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-[#242424] pb-16 group"
            >
              {/* Left Column: Details */}
              <div className="lg:col-span-5 space-y-5">
                
                <div className="flex justify-between items-center text-xs font-mono text-[#8E8B85]">
                  <span className="text-3xl font-display font-bold text-[#C75B32]">
                    {project.number}
                  </span>
                  <span className="px-2.5 py-1 bg-[#111111] border border-[#242424] text-[#E8E5DF] text-[10px]">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#E8E5DF] group-hover:text-[#C75B32] transition-colors">
                  {project.title}
                </h3>

                <p className="text-base text-[#E8E5DF] font-light">
                  {project.tagline}
                </p>
                
                <p className="text-sm text-[#8E8B85] font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 font-mono text-[11px] border border-[#242424] bg-[#111111] text-[#8E8B85]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Case Study Trigger */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 border border-[#242424] text-[#E8E5DF] font-mono text-xs tracking-widest hover:border-[#C75B32] hover:bg-[#C75B32] hover:text-white transition-colors"
                    data-cursor="CASE STUDY"
                  >
                    <span>CASE STUDY</span>
                    <span>↗</span>
                  </button>
                </div>

              </div>

              {/* Right Column: 3D Scene */}
              <div className="lg:col-span-7">
                <div className="w-full aspect-[16/10] bg-[#111111] border border-[#242424] relative overflow-hidden group-hover:border-[#C75B32]/50 transition-colors shadow-xl">
                  {renderSceneComponent(project.sceneType)}
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#8E8B85] bg-[#080808]/90 px-2 py-1 border border-[#242424]">
                    3D SCENE // {project.number}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
