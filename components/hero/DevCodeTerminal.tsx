'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Terminal as TerminalIcon, 
  FileCode, 
  FileJson, 
  Trophy, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

type TabKey = 'developer' | 'architecture' | 'telemetry';

export const DevCodeTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('developer');
  const [copied, setCopied] = useState(false);

  const codeSnippets: Record<TabKey, string> = {
    developer: `// Lakshan Ganesan — Full Stack & Systems Engineer
interface DeveloperProfile {
  name: string;
  role: string;
  location: string;
  specialization: string[];
  trackRecord: {
    hackathons: number;
    finalists: number;
    silambam: string;
  };
  mission: string;
}

export const lakshan: DeveloperProfile = {
  name: "Lakshan Ganesan",
  role: "Full Stack • AI & Blockchain",
  location: "Coimbatore & Bengaluru, IN",
  specialization: [
    "Scalable Web Architectures",
    "Autonomous AI Workflows",
    "DeFi & Uniswap v4 Protocols"
  ],
  trackRecord: {
    hackathons: 25,
    finalists: 20,
    silambam: "International Bronze Medalist"
  },
  mission: "Crafting zero-to-one digital products at the edge of code and intelligence."
};`,

    architecture: `{
  "system": "Lakshan Portfolio Redesign",
  "version": "2026.1",
  "engine": "Next.js 14 (App Router) + TypeScript",
  "corePrinciples": [
    "Deterministic Performance (<50ms Interaction Latency)",
    "Modular Component Architecture",
    "Uncompromising Visual Craft & Fluid Motion"
  ],
  "featuredDeployments": [
    {
      "name": "Mochi Desktop Companion",
      "stack": ["Electron", "React", "Three.js"],
      "status": "LIVE_DESKTOP"
    },
    {
      "name": "LandVault Protocol",
      "stack": ["Solidity", "Next.js", "Ethers.js"],
      "status": "MAINNET_READY"
    }
  ]
}`,

    telemetry: `$ npx lakshan-stats --all
[SYSTEM] Initializing engineering telemetry query...
[200 OK] Identity verified: Lakshan Ganesan
--------------------------------------------------
✔ Hackathons Participated : 25+
✔ Top Finalist Finishes   : 20+ (80% Placement Rate)
✔ Sports Discipline       : International Silambam Medalist
✔ Recent Release          : Mochi Desktop Companion
✔ Primary Code Languages   : TypeScript, Python, Rust, Solidity
✔ Status                  : Available for High-Impact Projects
--------------------------------------------------
$ ping -c 1 production.lakshan.dev
64 bytes from lakshan.dev: icmp_seq=1 ttl=64 time=12.4 ms
$ ▋`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-xl xl:max-w-2xl mx-auto lg:ml-auto">
      {/* Volumetric Back Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#E88053]/25 via-[#FFA266]/15 to-[#C75B32]/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Floating Holographic Badge 1: Top-Right (Hackathons) */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden sm:flex absolute -top-4 -right-4 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121216]/95 border border-[#FFA266]/40 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
      >
        <span className="p-1 rounded-lg bg-[#FFA266]/15 text-[#FFA266]">
          <Trophy className="w-3.5 h-3.5" />
        </span>
        <div className="text-left font-mono">
          <p className="text-[10px] font-bold text-white tracking-wider leading-tight">25+ HACKATHONS</p>
          <p className="text-[8.5px] text-[#FFA266] uppercase tracking-widest">20 Finalist Placements</p>
        </div>
      </motion.div>

      {/* Floating Holographic Badge 2: Bottom-Left (Mochi Desktop Companion) */}
      <motion.a
        href="https://mochidesktoppet.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="hidden sm:flex absolute -bottom-4 -left-4 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121216]/95 border border-[#E88053]/40 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:border-[#FFA266] transition-colors group cursor-pointer"
      >
        <span className="p-1 rounded-lg bg-[#E88053]/15 text-[#E88053] group-hover:scale-110 transition-transform">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        </span>
        <div className="text-left font-mono">
          <p className="text-[10px] font-bold text-white tracking-wider leading-tight flex items-center gap-1">
            MOCHI COMPANION <ExternalLink className="w-2.5 h-2.5 text-[#FFA266] opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-[8.5px] text-[#E88053] uppercase tracking-widest">3D Desktop Pet Live ↗</p>
        </div>
      </motion.a>

      {/* Main Glassmorphic Terminal Container */}
      <div className="relative rounded-2xl bg-[#09090C]/90 border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden transition-all duration-300">
        
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111116]/90 border-b border-white/[0.08] select-none">
          {/* macOS Traffic Lights */}
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors border border-black/20" />
            <span className="ml-2 text-[10px] font-mono text-white/40 tracking-wider">
              lakshan@workspace:~
            </span>
          </div>

          {/* Window Action: Copy Code Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[10.5px] font-mono text-white/80 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#FFA266]" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex items-center px-2 pt-1.5 bg-[#0C0C10]/80 border-b border-white/[0.06] overflow-x-auto no-scrollbar">
          {/* Tab 1: developer.ts */}
          <button
            onClick={() => setActiveTab('developer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-mono text-xs transition-all border-t border-x cursor-pointer ${
              activeTab === 'developer'
                ? 'bg-[#09090C] text-[#FFA266] border-white/[0.12] font-semibold border-b-transparent translate-y-[1px]'
                : 'text-white/50 hover:text-white/80 border-transparent hover:bg-white/[0.03]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-[#E88053]" />
            <span>developer.ts</span>
          </button>

          {/* Tab 2: architecture.json */}
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-mono text-xs transition-all border-t border-x cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-[#09090C] text-[#FFA266] border-white/[0.12] font-semibold border-b-transparent translate-y-[1px]'
                : 'text-white/50 hover:text-white/80 border-transparent hover:bg-white/[0.03]'
            }`}
          >
            <FileJson className="w-3.5 h-3.5 text-[#FFA266]" />
            <span>architecture.json</span>
          </button>

          {/* Tab 3: telemetry.sh */}
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-mono text-xs transition-all border-t border-x cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-[#09090C] text-[#FFA266] border-white/[0.12] font-semibold border-b-transparent translate-y-[1px]'
                : 'text-white/50 hover:text-white/80 border-transparent hover:bg-white/[0.03]'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>telemetry.sh</span>
          </button>
        </div>

        {/* Code Editor Body */}
        <div className="relative p-4 sm:p-5 font-mono text-[11.5px] sm:text-[12.5px] leading-relaxed overflow-x-auto min-h-[310px] max-h-[380px] bg-[#09090C]/95">
          <AnimatePresence mode="wait">
            {activeTab === 'developer' && (
              <motion.div
                key="developer"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 font-mono text-white/90"
              >
                <div className="text-white/40 italic">// Lakshan Ganesan — Full Stack &amp; Systems Engineer</div>
                <div>
                  <span className="text-[#C084FC]">interface</span> <span className="text-[#38BDF8]">DeveloperProfile</span> &#123;
                </div>
                <div className="pl-4">
                  <span className="text-[#E8E5DF]">name</span>: <span className="text-[#FBBF24]">string</span>;
                </div>
                <div className="pl-4">
                  <span className="text-[#E8E5DF]">role</span>: <span className="text-[#FBBF24]">string</span>;
                </div>
                <div className="pl-4">
                  <span className="text-[#E8E5DF]">specialization</span>: <span className="text-[#FBBF24]">string</span>[];
                </div>
                <div className="pl-4">
                  <span className="text-[#E8E5DF]">trackRecord</span>: &#123; <span className="text-[#E8E5DF]">hackathons</span>: <span className="text-[#FBBF24]">number</span>; <span className="text-[#E8E5DF]">silambam</span>: <span className="text-[#FBBF24]">string</span> &#125;;
                </div>
                <div>&#125;</div>
                <div className="pt-2">
                  <span className="text-[#C084FC]">export const</span> <span className="text-[#38BDF8]">lakshan</span>: <span className="text-[#38BDF8]">DeveloperProfile</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-[#E88053]">name</span>: <span className="text-[#34D399]">&quot;Lakshan Ganesan&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-[#E88053]">role</span>: <span className="text-[#34D399]">&quot;Full Stack • AI &amp; Blockchain&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-[#E88053]">specialization</span>: [
                </div>
                <div className="pl-8 text-[#34D399]">
                  &quot;Scalable Web Architectures&quot;,
                </div>
                <div className="pl-8 text-[#34D399]">
                  &quot;Autonomous AI Workflows&quot;,
                </div>
                <div className="pl-8 text-[#34D399]">
                  &quot;DeFi &amp; Uniswap v4 Protocols&quot;
                </div>
                <div className="pl-4">],</div>
                <div className="pl-4">
                  <span className="text-[#E88053]">trackRecord</span>: &#123;
                </div>
                <div className="pl-8">
                  <span className="text-[#FFA266]">hackathons</span>: <span className="text-[#F59E0B]">25</span>, <span className="text-white/40">// 20 Finalist Placements</span>
                </div>
                <div className="pl-8">
                  <span className="text-[#FFA266]">silambam</span>: <span className="text-[#34D399]">&quot;International Bronze Medalist&quot;</span>
                </div>
                <div className="pl-4">&#125;,</div>
                <div className="pl-4">
                  <span className="text-[#E88053]">status</span>: <span className="text-[#34D399]">&quot;Shipping zero-to-one digital products&quot;</span>
                </div>
                <div>&#125;;</div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 font-mono text-white/90"
              >
                <div>&#123;</div>
                <div className="pl-4">
                  <span className="text-[#38BDF8]">&quot;system&quot;</span>: <span className="text-[#34D399]">&quot;Lakshan Portfolio 2026&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-[#38BDF8]">&quot;coreStack&quot;</span>: &#123;
                </div>
                <div className="pl-8">
                  <span className="text-[#E88053]">&quot;frontend&quot;</span>: [<span className="text-[#34D399]">&quot;Next.js 14&quot;</span>, <span className="text-[#34D399]">&quot;React&quot;</span>, <span className="text-[#34D399]">&quot;TypeScript&quot;</span>, <span className="text-[#34D399]">&quot;Tailwind&quot;</span>],
                </div>
                <div className="pl-8">
                  <span className="text-[#E88053]">&quot;ai_backend&quot;</span>: [<span className="text-[#34D399]">&quot;Python&quot;</span>, <span className="text-[#34D399]">&quot;PyTorch&quot;</span>, <span className="text-[#34D399]">&quot;FastAPI&quot;</span>, <span className="text-[#34D399]">&quot;LangChain&quot;</span>],
                </div>
                <div className="pl-8">
                  <span className="text-[#E88053]">&quot;blockchain&quot;</span>: [<span className="text-[#34D399]">&quot;Solidity&quot;</span>, <span className="text-[#34D399]">&quot;Uniswap v4 Hooks&quot;</span>, <span className="text-[#34D399]">&quot;Ethers&quot;</span>]
                </div>
                <div className="pl-4">&#125;,</div>
                <div className="pl-4">
                  <span className="text-[#38BDF8]">&quot;featuredDeployments&quot;</span>: [
                </div>
                <div className="pl-8 text-white/80">
                  &#123; <span className="text-[#FFA266]">&quot;project&quot;</span>: <span className="text-[#34D399]">&quot;Mochi Desktop Companion&quot;</span>, <span className="text-[#FFA266]">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;LIVE&quot;</span> &#125;,
                </div>
                <div className="pl-8 text-white/80">
                  &#123; <span className="text-[#FFA266]">&quot;project&quot;</span>: <span className="text-[#34D399]">&quot;LandVault Protocol&quot;</span>, <span className="text-[#FFA266]">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;READY&quot;</span> &#125;
                </div>
                <div className="pl-4">],</div>
                <div className="pl-4">
                  <span className="text-[#38BDF8]">&quot;engineeringMindset&quot;</span>: <span className="text-[#34D399]">&quot;High concurrency, zero bloat, tactile UI&quot;</span>
                </div>
                <div>&#125;</div>
              </motion.div>
            )}

            {activeTab === 'telemetry' && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 font-mono text-xs"
              >
                <div className="text-white/60">
                  <span className="text-emerald-400">$</span> npx lakshan-stats --latest
                </div>
                <div className="text-white/50 text-[11px] pt-1">
                  [SYSTEM] Initializing engineering telemetry query...
                </div>
                <div className="text-emerald-400 text-[11px]">
                  [200 OK] Identity verified: Lakshan Ganesan
                </div>
                <div className="text-white/30 text-[11px]">--------------------------------------------------</div>
                <div className="text-white/90">
                  <span className="text-emerald-400">✔</span> Hackathons Participated : <span className="text-[#FFA266] font-bold">25+</span>
                </div>
                <div className="text-white/90">
                  <span className="text-emerald-400">✔</span> Top Finalist Finishes   : <span className="text-[#FFA266] font-bold">20+</span> (80% Finalist Rate)
                </div>
                <div className="text-white/90">
                  <span className="text-emerald-400">✔</span> Sports Stamina          : <span className="text-white font-bold">International Silambam Medalist</span>
                </div>
                <div className="text-white/90">
                  <span className="text-emerald-400">✔</span> Primary Project          : <span className="text-[#38BDF8]">Mochi Desktop Pet (Electron + 3D)</span>
                </div>
                <div className="text-white/90">
                  <span className="text-emerald-400">✔</span> Current Status           : <span className="text-emerald-400 font-bold">Available for Select Roles</span>
                </div>
                <div className="text-white/30 text-[11px]">--------------------------------------------------</div>
                <div className="text-white/60 pt-1">
                  <span className="text-emerald-400">$</span> ready --all-systems
                </div>
                <div className="flex items-center text-white/90">
                  <span className="text-emerald-400 mr-2">$</span>
                  <span className="inline-block w-2 h-4 bg-[#FFA266] animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Footer Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0C0C10] border-t border-white/[0.06] text-[10px] font-mono text-white/40 select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
            <span>TypeScript 5.7</span>
            <span className="hidden sm:inline">UTF-8</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Ln 18, Col 2</span>
            <span className="text-[#FFA266]">100% CLEAN</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DevCodeTerminal;
