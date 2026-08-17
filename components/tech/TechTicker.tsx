'use client';

import React from 'react';

export const TechTicker: React.FC = () => {
  const stacks = [
    {
      category: 'BLOCKCHAIN & EVM',
      skills: ['Solidity', 'Ethereum', 'Hardhat', 'Web3.js', 'Ethers.js', 'Uniswap v4 Hooks'],
    },
    {
      category: 'AI & NEURAL NETWORKS',
      skills: ['Python', 'Generative AI', 'LLM Agents', 'C2PA Provenance', 'OpenCV', 'PyTorch'],
    },
    {
      category: 'FRONTEND & GRAPHICS',
      skills: ['React', 'Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
    },
    {
      category: 'SECURITY & TOOLING',
      skills: ['LSB Steganography', 'AES Cryptography', 'Git', 'Linux / Bash', 'REST APIs', 'Node.js'],
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#080808] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-[#242424] pb-8">
          <div className="text-xs font-mono tracking-widest text-[#C75B32]">
            // 03 TECHNICAL STACK & ARSENAL
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#E8E5DF]">
            TECH ARSENAL
          </h2>
          <p className="text-base font-light text-[#8E8B85] max-w-xl">
            Core technologies and frameworks used to build decentralized protocols, AI services, and web apps.
          </p>
        </div>

        {/* Crisp Developer Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stacks.map((stack, idx) => (
            <div
              key={idx}
              className="bg-[#111111] border border-[#242424] p-6 space-y-4 hover:border-[#C75B32]/60 transition-colors"
            >
              <div className="text-xs font-mono text-[#C75B32] font-bold tracking-wider border-b border-[#242424] pb-3">
                {stack.category}
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-[#8E8B85]">
                {stack.skills.map((skill, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-[#C75B32]">›</span>
                    <span className="text-[#E8E5DF]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
