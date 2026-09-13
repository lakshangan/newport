'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Send, ArrowRight, HelpCircle, Terminal, Coffee, Lock, Unlock, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

// Secret Plaintext: "PROOF OF PASSION OVER NOISE"
// 1. Reverse -> 2. Caesar Shift (+7) -> 3. Base64 -> 4. Hex
const CIPHERTEXT = '54467051566C55675755784456694256566C4261576B68584945315749453157566C6C58';
const TARGET_HASH = '9d075daf067ac322417d021195ae108efa11ce20428e73523e9288fa212f85e3';

const PIPELINE_STEPS = [
  { id: '01', name: 'HEX', desc: 'Base-16 Decode' },
  { id: '02', name: 'BASE64', desc: 'ASCII Unpack' },
  { id: '03', name: 'ROT -7', desc: 'Caesar Shift' },
  { id: '04', name: 'REVERSE', desc: 'String Inversion' },
];

async function computeSHA256(text: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return '';
}

export const DecryptChallengeSection: React.FC = () => {
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CIPHERTEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = guess.trim().toUpperCase().replace(/\s+/g, ' ');
    if (!clean) return;

    setStatus('verifying');
    const hash = await computeSHA256(clean);

    if (hash === TARGET_HASH || clean === 'PROOF OF PASSION OVER NOISE') {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
    '☕ Coffee on you: Decrypted PROOF OF PASSION OVER NOISE'
  )}&body=${encodeURIComponent(
    `Hey Lakshan,\n\nI cracked your portfolio decryption challenge — coffee is on you!\n\nSolution: PROOF OF PASSION OVER NOISE\n\nHere is how I decrypted the message:\n[Describe your method or tools here!]\n\nCheers,\n[Your Name]`
  )}`;

  return (
    <section
      id="cipher-challenge"
      className="relative py-20 sm:py-28 bg-[#090706] border-t border-white/10 overflow-hidden select-none"
    >
      {/* Volumetric Atmosphere & Radial Dot Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-[#E88053]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4BC98_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        {/* Minimal Header */}
        <div className="space-y-2.5 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#D4BC98]/20 text-[11px] font-mono text-[#FFA266] uppercase tracking-[0.2em] backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E88053] animate-ping" />
            <span>05 // CRYPTOGRAPHIC CHALLENGE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FFFDF9]">
            IF YOU CAN DECRYPT THIS,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA266] via-[#E88053] to-[#FF7A45] drop-shadow-[0_0_30px_rgba(232,128,83,0.4)]">
              COFFEE&apos;S ON ME.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#F5EBD9]/65 max-w-lg mx-auto font-sans font-medium leading-relaxed">
            A secret plaintext is locked under 4 layers of encoding. Decode the string, verify your solution, and claim coffee with how you cracked it.
          </p>
        </div>

        {/* Creative & Minimal Cryptographic Console */}
        <div
          onMouseMove={handleMouseMove}
          className="relative rounded-3xl border border-[#D4BC98]/25 bg-[#120D09]/85 backdrop-blur-2xl p-5 sm:p-7 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.08)_inset] hover:border-[#FFA266]/60 transition-all duration-300 overflow-hidden group"
        >
          {/* Subtle Dynamic Cursor Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 128, 83, 0.15), transparent 80%)`,
            }}
          />

          {/* Cipher Window Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#D4BC98]/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#24170F] border border-[#D4BC98]/20 text-[#FFA266]">
                {status === 'success' ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5" />}
              </span>
              <div className="font-mono text-xs text-[#F5EBD9]/85 font-semibold flex items-center gap-2">
                <span>ENCRYPTED PAYLOAD</span>
                <span className="text-[10px] text-[#FFA266]/70 hidden sm:inline">[SHA-256 HASH LOCKED]</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F140D] hover:bg-[#2F1D13] border border-[#D4BC98]/25 hover:border-[#FFA266]/50 text-xs font-mono text-[#F5EBD9] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#FFA266]" />
                  <span>Copy Payload</span>
                </>
              )}
            </button>
          </div>

          {/* Cipher Text Area */}
          <div className="relative z-10 rounded-2xl bg-black/60 border border-[#D4BC98]/20 p-4 sm:p-5 font-mono text-xs sm:text-sm text-[#F5EBD9] break-all leading-relaxed select-all shadow-inner tracking-wider">
            <span className="text-[#FFA266] select-none font-bold mr-2">&gt;</span>
            <span className="text-zinc-300 hover:text-white transition-colors">{CIPHERTEXT}</span>
          </div>

          {/* Interactive Decrypt Console / Success Result */}
          <div className="relative z-10">
            {status === 'success' ? (
              /* Success Unlocked State */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 sm:p-6 rounded-2xl bg-[#1C130D] border border-emerald-500/40 space-y-4 shadow-[0_15px_30px_rgba(16,185,129,0.1)] text-center sm:text-left"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Coffee className="w-6 h-6 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>CIPHER CRACKED &bull; COFFEE UNLOCKED ☕</span>
                    </div>
                    <p className="text-lg sm:text-xl font-mono font-black text-white tracking-wide">
                      &ldquo;PROOF OF PASSION OVER NOISE&rdquo;
                    </p>
                    <p className="text-xs text-[#F5EBD9]/70 font-sans leading-relaxed">
                      Brilliant work! Send me how you decoded it, and your coffee is on me.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-[#D4BC98]/15">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E88053] to-[#C75B32] hover:from-[#FFA266] hover:to-[#E88053] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Claim Coffee &bull; Send Solution ↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setGuess('');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#F5EBD9]/60 hover:text-white transition-colors"
                  >
                    Reset Challenge
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Sleek Command Input Form */
              <form onSubmit={handleVerify} className="space-y-3">
                <div className="relative flex items-center rounded-2xl bg-black/70 border border-[#D4BC98]/20 focus-within:border-[#FFA266] focus-within:ring-1 focus-within:ring-[#FFA266]/40 transition-all p-1.5 shadow-inner">
                  <div className="pl-3.5 pr-2 font-mono text-[#FFA266] select-none text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0">
                    <Terminal className="w-3.5 h-3.5 opacity-80" />
                    <span>&gt;</span>
                  </div>

                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => {
                      setGuess(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter decrypted plaintext (e.g. PROOF OF...)"
                    className="flex-1 bg-transparent px-2 py-2 font-mono text-xs sm:text-sm text-white placeholder:text-[#F5EBD9]/30 focus:outline-none tracking-wide"
                  />

                  <button
                    type="submit"
                    disabled={status === 'verifying' || !guess.trim()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E88053] to-[#C75B32] hover:from-[#FFA266] hover:to-[#E88053] disabled:opacity-30 disabled:cursor-not-allowed text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shrink-0 active:scale-95"
                  >
                    {status === 'verifying' ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Hashing</span>
                      </>
                    ) : (
                      <>
                        <span>Decode</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-mono text-red-400 pl-2 flex items-center gap-1.5"
                  >
                    <span>✕ Incorrect message. Try again or inspect the pipeline hint below.</span>
                  </motion.p>
                )}
              </form>
            )}
          </div>

          {/* Creative Pipeline Stepper & Hint Drawer */}
          <div className="relative z-10 pt-2 border-t border-[#D4BC98]/15 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F5EBD9]/60">
                <HelpCircle className="w-3.5 h-3.5 text-[#FFA266]" />
                <span>DECRYPTION PIPELINE:</span>
              </div>

              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-mono text-[#FFA266]/80 hover:text-[#FFA266] transition-colors cursor-pointer"
              >
                {showHint ? '[ Hide Details ]' : '[ Reveal Hint ]'}
              </button>
            </div>

            {/* Creative Segmented Pipeline Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PIPELINE_STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  className="px-3 py-2 rounded-xl bg-black/40 border border-[#D4BC98]/15 hover:border-[#FFA266]/40 transition-colors font-mono space-y-0.5"
                >
                  <div className="flex items-center justify-between text-[9px] text-[#FFA266]">
                    <span>STEP {step.id}</span>
                    {idx < 3 && <span className="text-[#D4BC98]/40">➔</span>}
                  </div>
                  <div className="text-xs font-bold text-white tracking-wide">{step.name}</div>
                  <div className="text-[9px] text-[#F5EBD9]/60">{step.desc}</div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl bg-black/50 border border-[#D4BC98]/20 p-3.5 text-xs font-mono text-[#F5EBD9]/85 space-y-1.5"
                >
                  <div className="text-[#FFA266] font-bold text-[11px]">// DECRYPTION PROCEDURE</div>
                  <p className="leading-relaxed">
                    1. Convert Hex bytes to Base64 string.
                    <br />
                    2. Decode Base64 to ASCII cipher text.
                    <br />
                    3. Apply Caesar Shift (-7 letters backwards).
                    <br />
                    4. Reverse the character order to obtain the secret plaintext.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecryptChallengeSection;
