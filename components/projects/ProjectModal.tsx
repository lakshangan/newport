'use client';

import React from 'react';
import { Project } from '@/lib/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-[#080808]/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#111111] border border-[#242424] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl space-y-8 text-[#E8E5DF]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-sm font-mono text-[#8E8B85] hover:text-[#C75B32] transition-colors p-2"
          data-cursor="CLOSE"
        >
          [ESC / CLOSE ✕]
        </button>

        {/* Modal Header */}
        <div className="space-y-3 border-b border-[#242424] pb-6">
          <div className="text-xs font-mono text-[#C75B32]">
            PROJECT CASE STUDY // {project.number}
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-[#E8E5DF]">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg text-[#8E8B85] font-light">
            {project.tagline}
          </p>
        </div>

        {/* Grid Case Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-mono text-xs text-[#C75B32] uppercase">01 / THE PROBLEM</h3>
            <p className="text-[#8E8B85] font-light">{project.problem}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono text-xs text-[#C75B32] uppercase">02 / ARCHITECTURAL CONCEPT</h3>
            <p className="text-[#8E8B85] font-light">{project.concept}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono text-xs text-[#C75B32] uppercase">03 / IMPLEMENTED SOLUTION</h3>
            <p className="text-[#8E8B85] font-light">{project.solution}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono text-xs text-[#C75B32] uppercase">04 / MY DISCIPLINE & ROLE</h3>
            <p className="text-[#8E8B85] font-light">{project.myRole}</p>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="space-y-3 border-t border-[#242424] pt-6">
          <h3 className="font-mono text-xs text-[#8E8B85] uppercase">TECHNOLOGY STACK</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 font-mono text-xs border border-[#242424] bg-[#080808] text-[#E8E5DF]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 border-t border-[#242424] pt-6">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#C75B32] text-white font-mono text-xs tracking-widest hover:bg-[#E06D43] transition-colors"
            >
              LIVE DEMO ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-[#242424] text-[#E8E5DF] font-mono text-xs tracking-widest hover:border-[#E8E5DF] transition-colors"
            >
              VIEW CODE ON GITHUB ↗
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
