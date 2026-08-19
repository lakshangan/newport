'use client';

import React, { useEffect, useState } from 'react';
import { AsciiGlitchRipple } from '@/components/ui/AsciiGlitchRipple';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const compilationSteps = [
    'INITIALIZING_KERNEL :: V4_NEURAL_ENGINE',
    'CONNECTING_EVM_NODE :: ETH_MAINNET_SYNC',
    'PARSING_C2PA_MEDIA_PROVENANCE_CHAINS',
    'COMPILING_UNISWAP_V4_DYNAMIC_HOOKS',
    'DECRYPTION_KEYS_VERIFIED :: SHA256_OK',
    'MOUNTING_WEBGL_3D_GRAPHICS_PIPELINE',
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
        const next = prev + Math.floor(Math.random() * 14) + 5;
        return next > 100 ? 100 : next;
      });
    }, 80);

    // Step message updates
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < compilationSteps.length - 1 ? prev + 1 : prev));
    }, 280);

    return () => {
      clearInterval(timer);
      clearInterval(stepInterval);
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#08080a] text-[#E8E5DF] font-mono flex flex-col justify-between p-6 sm:p-12 transition-transform duration-700 ease-in-out select-none ${
        progress === 100 ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs text-[#8E8B85] border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-[#C75B32] animate-ping" />
          <AsciiGlitchRipple
            as="span"
            className="text-[#C75B32] font-bold tracking-wider"
            dur={900}
          >
            BOOT_SEQUENCE // LKG_SYS
          </AsciiGlitchRipple>
        </div>
        <span className="hidden xs:inline text-[11px] tracking-widest opacity-70">
          ARCH: ARM64 // NEURAL_V4
        </span>
      </div>

      {/* Center Console Output */}
      <div className="max-w-3xl mx-auto w-full my-auto space-y-8 py-8">
        
        {/* Terminal Line Prompts */}
        <div className="space-y-3 text-sm sm:text-base">
          <div className="text-[#8E8B85]/60 text-xs flex justify-between items-center">
            <span>// SYSTEM BOOT LOG</span>
            <span className="text-[10px] text-[#C75B32]/80 uppercase tracking-widest hidden sm:inline">
              [ HOVER TO RIPPLE ASCII ]
            </span>
          </div>

          <div className="text-[#E8E5DF] flex items-center space-x-3">
            <span className="text-[#C75B32] font-bold">&gt;</span>
            <AsciiGlitchRipple
              as="span"
              className="tracking-wider font-bold text-white text-base sm:text-lg"
              dur={900}
              spread={1.2}
              triggerOnChange={true}
            >
              {compilationSteps[currentStep]}
            </AsciiGlitchRipple>
          </div>

          <div className="text-xs text-[#8E8B85]/80 pl-5 flex items-center space-x-2 font-mono">
            <span>0x7F9A04B1 ::</span>
            <AsciiGlitchRipple as="span" className="text-emerald-400/90 font-semibold" dur={800}>
              SHA256_VERIFIED [MEM_OK]
            </AsciiGlitchRipple>
          </div>
        </div>

        {/* Big Percentage & Progress Bar */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-end">
            <div className="flex items-baseline space-x-2">
              <span className="font-display text-6xl sm:text-8xl font-black text-[#E8E5DF] tracking-tight">
                {progress}
              </span>
              <span className="text-[#C75B32] text-4xl sm:text-6xl font-display font-extrabold">%</span>
            </div>

            <div className="text-right">
              <AsciiGlitchRipple
                as="span"
                className="text-xs font-mono text-[#8E8B85] tracking-widest uppercase"
                dur={800}
              >
                {progress < 100 ? 'COMPILING ASSETS...' : 'EXECUTION READY'}
              </AsciiGlitchRipple>
            </div>
          </div>

          {/* Minimalist Progress Track */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C75B32] via-[#E88053] to-white transition-all duration-150 ease-out shadow-[0_0_12px_#C75B32]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Interactive Code Decor with ASCII Ripple */}
        <div className="text-[11px] text-[#8E8B85]/60 flex flex-col sm:flex-row justify-between gap-1 font-mono pt-2 border-t border-white/5">
          <AsciiGlitchRipple as="span" className="hover:text-white" dur={900}>
            const developer = new CreativeTechnologist(&apos;Lakshan&apos;);
          </AsciiGlitchRipple>
          <AsciiGlitchRipple as="span" className="hover:text-[#C75B32]" dur={900}>
            await developer.init();
          </AsciiGlitchRipple>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center text-[10px] text-[#8E8B85]/70 border-t border-white/10 pt-4 font-mono">
        <AsciiGlitchRipple as="span" className="hover:text-white" dur={800}>
          © 2026 LAKSHAN GANESAN
        </AsciiGlitchRipple>
        <span>LATENCY: 0.2ms // COIMBATORE, IN</span>
      </div>
    </div>
  );
};

export default Preloader;
