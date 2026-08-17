'use client';

import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const compilationSteps = [
    'LOADING_KERNEL_MODULES...',
    'INITIALIZING_WEB3_AI_STACK...',
    'INSPECTING_EVM_SMART_CONTRACTS...',
    'ENCRYPTING_NEURAL_WEIGHTS...',
    'MOUNTING_GRAPHICS_PIPELINE...',
    'SYSTEM_READY // LAKSHAN_GANESAN',
  ];

  useEffect(() => {
    // Progress counter
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 4;
        return next > 100 ? 100 : next;
      });
    }, 90);

    // Step message updates
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < compilationSteps.length - 1 ? prev + 1 : prev));
    }, 320);

    return () => {
      clearInterval(timer);
      clearInterval(stepInterval);
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#080808] text-[#E8E5DF] font-mono flex flex-col justify-between p-8 sm:p-12 transition-transform duration-700 ease-in-out ${
        progress === 100 ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs text-[#8E8B85] border-b border-[#242424] pb-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-ping" />
          <span className="text-[#C75B32] font-bold">BOOT_SEQUENCE // LKG_SYS</span>
        </div>
        <span>ARCH: ARM64 // NEURAL_V4</span>
      </div>

      {/* Center Console Output */}
      <div className="max-w-3xl mx-auto w-full my-auto space-y-8">
        
        {/* Terminal Line Prompts */}
        <div className="space-y-2 text-sm sm:text-base">
          <div className="text-[#8E8B85]/60 text-xs">// SYSTEM BOOT LOG</div>
          <div className="text-[#E8E5DF] flex items-center space-x-3">
            <span className="text-[#C75B32] font-bold">&gt;</span>
            <span className="tracking-wider">{compilationSteps[currentStep]}</span>
          </div>
          <div className="text-xs text-[#8E8B85] pl-5">
            0x7F9A04B1 :: SHA256_VERIFIED [MEM_OK]
          </div>
        </div>

        {/* Big Percentage & Progress Bar */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="font-display text-6xl sm:text-8xl font-extrabold text-[#E8E5DF]">
              {progress}<span className="text-[#C75B32] text-4xl sm:text-6xl">%</span>
            </span>
            <span className="text-xs text-[#8E8B85]">
              {progress < 100 ? 'COMPILING ASSETS' : 'EXECUTION READY'}
            </span>
          </div>

          {/* Minimalist Progress Track */}
          <div className="w-full h-1 bg-[#161616] overflow-hidden">
            <div
              className="h-full bg-[#C75B32] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Code Snippet Decor */}
        <div className="text-[11px] text-[#8E8B85]/40 flex justify-between font-mono pt-2">
          <span>const developer = new CreativeTechnologist(&apos;Lakshan&apos;);</span>
          <span>await developer.init();</span>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-[10px] text-[#8E8B85]/60 border-t border-[#242424] pt-4">
        <span>© 2026 LAKSHAN GANESAN</span>
        <span>LATENCY: 0.2ms // COIMBATORE, IN</span>
      </div>
    </div>
  );
};
