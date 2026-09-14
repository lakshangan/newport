'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Send,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  Cpu,
  RefreshCw,
  Zap,
  Bot,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';
import { AnimatedCoffeeCup } from '@/components/ui/AnimatedCoffeeCup';

// =========================================================================
// CONFIGURATION
// =========================================================================
// Set your preferred contact email here. Defaults to portfolio data email.
export const CONTACT_EMAIL = PORTFOLIO_DATA.personal.email || 'lakshanganesan@gmail.com';

// =========================================================================
// ENCRYPTED PAYLOAD & CRYPTOGRAPHIC METADATA (AES-256-GCM + PBKDF2)
// =========================================================================
// The secret plaintext is NOT present in this source code.
// It can only be derived and authenticated using the correct 3-clue sequence.
const CIPHERTEXT_B64 =
  'ssLTEP6PGAvPWwua7BwN1ibrLYFVnxw7nYB1SSd9+X/GPWXyaUe2whObwtDzDFldzGy+QM0tZLBGzyce9M1VHQF54eJ9i5Ohflc7bSq2axnllml84qJacmJsmaQKg0EbS+Q=';
const SALT_B64 = 'YQJxqSJeq67JzLgiZN4AmA==';
const IV_B64 = 'yctUJBZGK+/eF4G8';
const PBKDF2_ITERATIONS = 100000;

// Helper: Base64 to Uint8Array with non-shared ArrayBuffer (TypeScript & Web Crypto compatible)
function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Key normalization: tolerates various delimiter formats (hyphens, spaces, colons, underscores)
function normalizeKey(input: string): string {
  const trimmed = input.trim().toUpperCase();
  if (trimmed === 'PROOFPASSIONDISCIPLINE') {
    return 'PROOF-PASSION-DISCIPLINE';
  }
  return trimmed.replace(/[^A-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Web Crypto API Decryption (AES-256-GCM with PBKDF2 Key Derivation)
async function attemptWebCryptoDecrypt(rawKeyInput: string): Promise<string> {
  const normalizedKey = normalizeKey(rawKeyInput);
  if (!normalizedKey) {
    throw new Error('Key cannot be empty');
  }

  const salt = base64ToBytes(SALT_B64);
  const iv = base64ToBytes(IV_B64);
  const encryptedBytes = base64ToBytes(CIPHERTEXT_B64);

  // 1. Import raw passphrase as PBKDF2 key material
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(normalizedKey),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // 2. Derive 256-bit AES-GCM decryption key
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  // 3. Decrypt payload (AES-256-GCM verifies the 16-byte authentication tag automatically)
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as unknown as BufferSource },
    derivedKey,
    encryptedBytes as unknown as BufferSource
  );

  return new TextDecoder().decode(decryptedBuffer);
}

// Global audio helper for kinetic tap interaction
let tapAudioCtxInstance: AudioContext | null = null;
function getTapAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!tapAudioCtxInstance) {
    tapAudioCtxInstance = new AudioCtx();
  }
  if (tapAudioCtxInstance.state === 'suspended') {
    tapAudioCtxInstance.resume().catch(() => { });
  }
  return tapAudioCtxInstance;
}

// Escalating pitch pip for each tap (320Hz up to 1100Hz)
function playTapAscend(currentTap: number, maxTaps: number) {
  try {
    const ctx = getTapAudioContext();
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = 320 + (currentTap / maxTaps) * 780;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.06, now + 0.05);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  } catch {
    // Ignore audio failures silently
  }
}

// Triumph fanfare on reaching 25 taps (C5, E5, G5, C6 arpeggio)
function playUnlockFanfare() {
  try {
    const ctx = getTapAudioContext();
    if (!ctx || ctx.state !== 'running') return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const startTime = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const noteTime = startTime + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime(0.08, noteTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.18);
    });
  } catch {
    // Ignore audio failures silently
  }
}

const SCRAMBLE_CHARS = '0123456789ABCDEF!@#$%&*<>[]{}~';

export const DecryptChallengeSection: React.FC = () => {
  const [keyInput, setKeyInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'decrypting' | 'scrambling' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [revealedMessage, setRevealedMessage] = useState('');
  const [scrambleDisplay, setScrambleDisplay] = useState(CIPHERTEXT_B64);
  const [copied, setCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUnlocked, setHintUnlocked] = useState(false);
  const [isBypassing, setIsBypassing] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const REQUIRED_TAPS = 25;
  const [copiedAiPrompt, setCopiedAiPrompt] = useState(false);
  const [showAiPromptText, setShowAiPromptText] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const AI_SOLVER_PROMPT = `I am solving an interactive encrypted payload challenge on a developer's portfolio website.

Here is the exact technical data and discovered contextual clues from the website:

1. CRYPTOGRAPHIC SPECIFICATION:
- Algorithm: AES-256-GCM
- Key Derivation Function (KDF): PBKDF2 with HMAC-SHA256
- Iteration Rounds: 100,000
- Derived Key Length: 256 bits (32 bytes)
- Encrypted Ciphertext (Base64): ${CIPHERTEXT_B64}
- Salt (Base64): ${SALT_B64}
- IV / Nonce (Base64): ${IV_B64}

2. THREE DISCOVERED KEYWORDS:
I searched through the creator's portfolio and found three hidden words:
- Word 1: "PROOF" (From the GenProof AI project showcase)
- Word 2: "PASSION" (From the 25+ Hackathons milestone)
- Word 3: "DISCIPLINE" (From the International Silambam martial arts championship)

3. KEY DERIVATION ORDER:
The creator specified that these three keywords must be ordered correctly and joined:
Candidate Passphrase: "PROOF-PASSION-DISCIPLINE" (also accepts "proof passion discipline")

4. YOUR OBJECTIVE:
With the help of this decoding key and the parameters above, please derive the AES-256-GCM key using PBKDF2, decrypt the ciphertext payload, and tell me the secret plaintext message!`;

  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up scramble timer
  useEffect(() => {
    return () => {
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(CIPHERTEXT_B64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAiPrompt = () => {
    navigator.clipboard.writeText(AI_SOLVER_PROMPT);
    setCopiedAiPrompt(true);
    setTimeout(() => setCopiedAiPrompt(false), 2500);
  };

  // Smooth Scramble & Character Resolve Animation
  const startScrambleAnimation = (targetText: string) => {
    setStatus('scrambling');
    const totalDuration = 1800; // 1.8 seconds
    const intervalMs = 35;
    const totalSteps = Math.floor(totalDuration / intervalMs);
    let step = 0;

    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

    scrambleIntervalRef.current = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      const lockedChars = Math.floor(progress * targetText.length);

      let currentScramble = '';
      for (let i = 0; i < targetText.length; i++) {
        if (i < lockedChars) {
          currentScramble += targetText[i];
        } else {
          currentScramble += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }

      setScrambleDisplay(currentScramble);

      if (progress >= 1) {
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        setRevealedMessage(targetText);
        setScrambleDisplay(targetText);
        setStatus('success');
      }
    }, intervalMs);
  };

  const handleAttemptDecryption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim() || status === 'decrypting' || status === 'scrambling') return;

    setStatus('decrypting');
    setErrorMessage('');

    try {
      const plaintext = await attemptWebCryptoDecrypt(keyInput);
      // Decryption succeeded! Trigger reveal animation
      startScrambleAnimation(plaintext);
    } catch {
      setStatus('error');
      setErrorMessage('Invalid key. Try looking deeper.');
    }
  };

  const handleReset = () => {
    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    setStatus('idle');
    setKeyInput('');
    setErrorMessage('');
    setRevealedMessage('');
    setScrambleDisplay(CIPHERTEXT_B64);
  };

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "I cracked your encrypted message (Coffee's on you!)"
  )}&body=${encodeURIComponent(
    `Hey Lakshan,\n\nI successfully decrypted your message!\n\nHere’s how I found the clues and cracked it:\n\n[Write your approach here]\n\nBest,\n[Your Name]`
  )}`;

  return (
    <section
      id="decrypt-this"
      className="relative py-20 sm:py-28 bg-[#090706] border-t border-white/10 overflow-hidden select-none"
    >
      {/* Volumetric Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#E88053]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D4BC98_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        {/* Section Header - Casual & Engaging */}
        <div className="space-y-3 text-center">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FFFDF9] flex items-center justify-center flex-wrap gap-x-2.5">
            <span>IF YOU CRACK THIS,</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA266] via-[#E88053] to-[#FF7A45] drop-shadow-[0_0_30px_rgba(232,128,83,0.35)]">
              COFFEE&apos;S ON ME
            </span>
            <AnimatedCoffeeCup className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 inline-block shrink-0 -mt-1.5 sm:-mt-3" />
          </h2>

          <p className="text-xs sm:text-sm text-[#F5EBD9]/70 max-w-xl mx-auto font-sans font-medium leading-relaxed">
            I locked a secret message behind real AES-256 encryption. There are 3 clues scattered across this portfolio—hunt
            them down, piece them together, and let&apos;s see if you can break it.
          </p>
        </div>

        {/* Cryptographic Console Container */}
        <div
          onMouseMove={handleMouseMove}
          className="relative rounded-3xl border border-[#D4BC98]/25 bg-[#120D09]/90 backdrop-blur-2xl p-5 sm:p-7 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.08)_inset] hover:border-[#FFA266]/50 transition-all duration-300 overflow-hidden group"
        >
          {/* Cursor Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 128, 83, 0.14), transparent 80%)`,
            }}
          />

          {/* Telemetry Status Bar */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
            <div className="px-3 py-2 rounded-xl bg-black/50 border border-[#D4BC98]/15 space-y-0.5">
              <span className="text-[9px] text-[#F5EBD9]/50 block">STATUS</span>
              <span
                className={`font-bold flex items-center gap-1.5 ${status === 'success' ? 'text-emerald-400' : 'text-[#FFA266]'
                  }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-emerald-400' : 'bg-[#FFA266] animate-pulse'
                    }`}
                />
                {status === 'success' ? 'DECRYPTED' : 'ENCRYPTED'}
              </span>
            </div>

            <div className="px-3 py-2 rounded-xl bg-black/50 border border-[#D4BC98]/15 space-y-0.5">
              <span className="text-[9px] text-[#F5EBD9]/50 block">ALGORITHM</span>
              <span className="font-bold text-[#FFFDF9] truncate">AES-256-GCM</span>
            </div>

            <div className="px-3 py-2 rounded-xl bg-black/50 border border-[#D4BC98]/15 space-y-0.5">
              <span className="text-[9px] text-[#F5EBD9]/50 block">KEY</span>
              <span
                className={`font-bold ${status === 'success' ? 'text-emerald-400' : 'text-[#F5EBD9]/70'
                  }`}
              >
                {status === 'success' ? 'VERIFIED' : 'UNKNOWN'}
              </span>
            </div>

            <div className="px-3 py-2 rounded-xl bg-black/50 border border-[#D4BC98]/15 space-y-0.5">
              <span className="text-[9px] text-[#F5EBD9]/50 block">SALT / IV</span>
              <span className="font-bold text-[#FFFDF9] truncate">DETECTED</span>
            </div>
          </div>

          {/* Encrypted Payload Window */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-[#F5EBD9]/85 font-semibold">
                <span className="p-1 rounded-md bg-[#24170F] border border-[#D4BC98]/20 text-[#FFA266]">
                  {status === 'success' ? (
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </span>
                <span>[ ENCRYPTED PAYLOAD ]</span>
              </div>

              <button
                type="button"
                onClick={handleCopyPayload}
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

            {/* Ciphertext / Revealed Text Block */}
            <div
              className={`relative rounded-2xl bg-black/65 border p-4 sm:p-5 font-mono text-xs sm:text-sm break-all leading-relaxed select-all shadow-inner tracking-wider transition-colors duration-300 ${status === 'success'
                ? 'border-emerald-500/40 text-emerald-300 bg-[#0c1611]/80'
                : 'border-[#D4BC98]/20 text-[#F5EBD9]'
                }`}
            >
              <span className="text-[#FFA266] select-none font-bold mr-2">&gt;</span>
              <span className={status === 'scrambling' ? 'text-[#FFA266]' : ''}>
                {scrambleDisplay}
              </span>
            </div>
          </div>

          {/* Key Input & Decryption Action */}
          <div className="relative z-10">
            {status === 'success' ? (
              /* Success Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 sm:p-6 rounded-2xl bg-[#1C130D] border border-emerald-500/40 space-y-5 shadow-[0_15px_30px_rgba(16,185,129,0.1)] text-center sm:text-left"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <Check className="w-3.5 h-3.5" />
                      <span className="flex items-center gap-1">
                        CIPHER CRACKED &bull; COFFEE UNLOCKED
                        <AnimatedCoffeeCup className="w-4 h-4 inline-block shrink-0 -mt-0.5" />
                      </span>
                    </div>
                    <p className="text-base sm:text-lg font-mono font-bold text-white tracking-wide">
                      &ldquo;{revealedMessage}&rdquo;
                    </p>
                    <p className="text-sm font-sans font-semibold text-[#FFA266]">
                      Now I’m curious.
                    </p>
                    <p className="text-xs text-[#F5EBD9]/70 font-sans leading-relaxed">
                      You actually hunted down the clues and solved it. Send me your breakdown and let&apos;s talk shop.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#D4BC98]/15">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E88053] to-[#C75B32] hover:from-[#FFA266] hover:to-[#E88053] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
                  >
                    <span>TELL ME HOW YOU CRACKED IT</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#F5EBD9]/60 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Input Form with Shake on Error */
              <motion.form
                onSubmit={handleAttemptDecryption}
                animate={
                  status === 'error'
                    ? { x: [-6, 6, -4, 4, -2, 2, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#F5EBD9]/80 px-1">
                  <span>YOUR KEY</span>
                  <span className="text-[10px] text-[#FFA266]/70">
                    [PBKDF2 SHA-256 &bull; 100K ROUNDS]
                  </span>
                </div>

                <div className="relative flex items-center rounded-2xl bg-black/70 border border-[#D4BC98]/20 focus-within:border-[#FFA266] focus-within:ring-1 focus-within:ring-[#FFA266]/40 transition-all p-1.5 shadow-inner">
                  <div className="pl-3.5 pr-2 font-mono text-[#FFA266] select-none text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0">
                    <Terminal className="w-3.5 h-3.5 opacity-80" />
                    <span>&gt;</span>
                  </div>

                  <input
                    type="text"
                    value={keyInput}
                    onChange={(e) => {
                      setKeyInput(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    disabled={status === 'decrypting' || status === 'scrambling'}
                    placeholder="Enter the combined key (e.g. clue1-clue2-clue3)"
                    className="flex-1 bg-transparent px-2 py-2 font-mono text-xs sm:text-sm text-white placeholder:text-[#F5EBD9]/30 focus:outline-none tracking-wide"
                  />

                  <button
                    type="submit"
                    disabled={
                      !keyInput.trim() ||
                      status === 'decrypting' ||
                      status === 'scrambling'
                    }
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E88053] to-[#C75B32] hover:from-[#FFA266] hover:to-[#E88053] disabled:opacity-30 disabled:cursor-not-allowed text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shrink-0 active:scale-95"
                  >
                    {status === 'decrypting' || status === 'scrambling' ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Checking</span>
                      </>
                    ) : (
                      <>
                        <span>ATTEMPT DECRYPTION</span>
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
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage || 'Invalid key. Try looking deeper.'}</span>
                  </motion.p>
                )}
              </motion.form>
            )}
          </div>

          {/* Hint & Security Override Protocol Area */}
          <div className="relative z-10 pt-2 border-t border-[#D4BC98]/15 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs font-sans italic text-[#F5EBD9]/60">
                &ldquo;Everything you need is already here.&rdquo;
              </p>

              <button
                type="button"
                onClick={() => {
                  if (!hintUnlocked) {
                    setIsBypassing(!isBypassing);
                    setShowHint(false);
                  } else {
                    setShowHint(!showHint);
                  }
                }}
                className={`inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all cursor-pointer self-start sm:self-auto shadow-sm active:scale-95 select-none ${hintUnlocked
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/15'
                  : 'border-[#FFA266]/40 text-[#FFA266] bg-[#24170F]/90 hover:bg-[#2F1D13]'
                  }`}
              >
                {hintUnlocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{showHint ? '[ Hide Clue Guide ]' : '[ Clue Guide Unlocked 🔓 ]'}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-[#FFA266] animate-pulse" />
                    <span>{isBypassing ? '[ Close Bypass Terminal ]' : '[ Unlock Clue Guide ⚡ ]'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Kinetic 25-Tap Bypass Mini-Game (Before Unlocked) */}
            <AnimatePresence>
              {isBypassing && !hintUnlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-2xl bg-black/80 border border-[#E88053]/40 p-5 text-center space-y-4 shadow-[0_15px_35px_rgba(232,128,83,0.12)] overflow-hidden"
                >
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24170F] border border-[#FFA266]/30 text-[10px] font-mono font-bold text-[#FFA266] uppercase tracking-widest">
                      <Zap className="w-3.5 h-3.5 animate-pulse" />
                      <span>KINETIC FIREWALL BYPASS PROTOCOL</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white tracking-wide">
                      HINT VAULT IS ENCRYPTED
                    </h3>
                    <p className="text-xs text-[#F5EBD9]/70 font-sans max-w-md mx-auto leading-relaxed">
                      Hints aren&apos;t free! Rapid-tap the capacitor to generate kinetic energy and override the firewall.
                    </p>
                  </div>

                  {/* Dynamic Progress Gauge */}
                  <div className="max-w-md mx-auto space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#FFA266] font-bold">
                        {tapCount === 0 && 'STATUS: CAPACITOR IDLE [0%]'}
                        {tapCount > 0 &&
                          tapCount < 10 &&
                          `STATUS: INJECTING POWER [${Math.round((tapCount / REQUIRED_TAPS) * 100)}%]`}
                        {tapCount >= 10 &&
                          tapCount < 20 &&
                          `STATUS: OVERCLOCKING CORE! [${Math.round((tapCount / REQUIRED_TAPS) * 100)}%]`}
                        {tapCount >= 20 &&
                          `STATUS: SYSTEM OVERLOAD IMMINENT! [${Math.round((tapCount / REQUIRED_TAPS) * 100)}%]`}
                      </span>
                      <span className="text-white font-bold">
                        {tapCount} / {REQUIRED_TAPS} TAPS
                      </span>
                    </div>

                    <div className="h-3.5 w-full rounded-full bg-white/10 overflow-hidden p-0.5 border border-[#D4BC98]/20">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#E88053] via-[#FFA266] to-[#FF7A45] shadow-[0_0_14px_rgba(255,162,102,0.85)]"
                        style={{ width: `${(tapCount / REQUIRED_TAPS) * 100}%` }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                      />
                    </div>
                  </div>

                  {/* Tactile 25-Tap Arcade Button */}
                  <div className="pt-1">
                    <motion.button
                      type="button"
                      onClick={() => {
                        const nextCount = tapCount + 1;
                        setTapCount(nextCount);
                        playTapAscend(nextCount, REQUIRED_TAPS);

                        if (nextCount >= REQUIRED_TAPS) {
                          playUnlockFanfare();
                          setHintUnlocked(true);
                          setIsBypassing(false);
                          setShowHint(true);
                        }
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.92 }}
                      className="relative px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#E88053] via-[#FF7A45] to-[#C75B32] hover:from-[#FFA266] hover:to-[#E88053] text-white font-mono text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-[0_10px_25px_rgba(232,128,83,0.4)] active:shadow-none cursor-pointer inline-flex items-center gap-2.5 border border-white/20 select-none"
                    >
                      <Zap className="w-4 h-4 fill-white animate-bounce" />
                      <span>TAP RAPIDLY! ({REQUIRED_TAPS - tapCount} TAPS LEFT)</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unlocked Clue Guide (Only After 25 Taps) */}
            <AnimatePresence>
              {showHint && hintUnlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl bg-black/60 border border-[#D4BC98]/20 p-4 text-xs font-mono text-[#F5EBD9]/85 space-y-2.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-[#D4BC98]/15 pb-2">
                    <div className="text-emerald-400 font-bold text-[11px] tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>// FIREWALL OVERRIDDEN &bull; CLUE GUIDE UNLOCKED</span>
                    </div>
                    <span className="text-[10px] text-[#F5EBD9]/50 font-mono hidden sm:inline">
                      [ORDER: PROJECT &rarr; HACKATHONS &rarr; MARTIAL ART]
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {/* Card 1: Direct Location Clues */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-[#D4BC98]/15 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#FFA266] font-bold tracking-wider uppercase">
                          01. THE 3 WORDS
                        </span>
                        <span className="text-[9px] text-[#F5EBD9]/40 font-mono">LOCATIONS</span>
                      </div>
                      <div className="space-y-1.5 text-[11px] text-[#F5EBD9]/85 font-sans leading-relaxed">
                        <p>
                          <strong className="text-white font-mono font-bold">Word 1: </strong>
                          In the <span className="text-[#FFA266] font-semibold">GenProof AI</span> card title &amp; description &rarr; <code className="text-[#FFA266] font-mono bg-black/40 px-1 py-0.5 rounded">PROOF</code>
                        </p>
                        <p>
                          <strong className="text-white font-mono font-bold">Word 2: </strong>
                          In the <span className="text-[#FFA266] font-semibold">25+ Hackathons</span> milestone card &rarr; <code className="text-[#FFA266] font-mono bg-black/40 px-1 py-0.5 rounded">PASSION</code>
                        </p>
                        <p>
                          <strong className="text-white font-mono font-bold">Word 3: </strong>
                          In the <span className="text-[#FFA266] font-semibold">Silambam Medalist</span> milestone &rarr; <code className="text-[#FFA266] font-mono bg-black/40 px-1 py-0.5 rounded">DISCIPLINE</code>
                        </p>
                      </div>
                      <div className="text-[9px] font-mono text-[#F5EBD9]/50 pt-1 border-t border-white/5">
                        *Tip: Hovering these words on desktop plays a subtle chime &amp; flicker!
                      </div>
                    </div>

                    {/* Card 2: Combination & Format */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-[#D4BC98]/15 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#FFA266] font-bold tracking-wider uppercase">
                          02. COMBINE THEM
                        </span>
                        <span className="text-[9px] text-[#F5EBD9]/40 font-mono">KEY FORMAT</span>
                      </div>
                      <p className="text-[11px] text-[#F5EBD9]/85 font-sans leading-relaxed">
                        Chain the three words together with hyphens or spaces:
                      </p>
                      <div className="p-2 rounded-lg bg-black/60 border border-[#FFA266]/30 font-mono text-center text-xs text-[#FFA266] font-bold select-all tracking-wider">
                        PROOF-PASSION-DISCIPLINE
                      </div>
                      <p className="text-[10px] text-[#F5EBD9]/60 font-sans leading-relaxed">
                        Flexible format: lowercase, uppercase, spaces (<code className="text-zinc-300">proof passion discipline</code>) or dashes all work!
                      </p>
                    </div>

                    {/* Card 3: Decrypt & Claim Coffee */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-[#D4BC98]/15 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#FFA266] font-bold tracking-wider uppercase">
                          03. DECRYPT &amp; WIN
                        </span>
                        <span className="text-[9px] text-[#F5EBD9]/40 font-mono">UNLOCK</span>
                      </div>
                      <p className="text-[11px] text-[#F5EBD9]/85 font-sans leading-relaxed">
                        Paste the combined key into the input above and click <span className="text-white font-mono font-bold">[ATTEMPT DECRYPTION]</span>.
                      </p>
                      <p className="text-[11px] text-[#F5EBD9]/70 font-sans leading-relaxed">
                        Once the message scrambler unlocks the secret payload, hit the coffee button to send me your solve!
                      </p>
                    </div>
                  </div>

                  {/* AI Assistant Solver Prompt Bar */}
                  <div className="pt-2 border-t border-[#D4BC98]/15 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-black/75 border border-[#FFA266]/30 shadow-inner">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                          <Bot className="w-4 h-4 text-[#FFA266]" />
                          <span>WANT AI TO HELP CRACK IT?</span>
                        </div>
                        <p className="text-[11px] text-[#F5EBD9]/70 font-sans leading-relaxed">
                          Copy this pre-structured prompt with the ciphertext, parameters, and 3 discovered clue words to ChatGPT, Claude, or Gemini.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setShowAiPromptText(!showAiPromptText)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-[#F5EBD9]/70 hover:text-white transition-colors cursor-pointer"
                        >
                          {showAiPromptText ? 'Hide Prompt' : 'Preview Prompt'}
                        </button>

                        <button
                          type="button"
                          onClick={handleCopyAiPrompt}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#E88053] to-[#C75B32] hover:from-[#FFA266] hover:to-[#E88053] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          {copiedAiPrompt ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-300" />
                              <span className="text-emerald-300">Copied for AI!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-white" />
                              <span>Copy Prompt for AI</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Prompt Preview */}
                    <AnimatePresence>
                      {showAiPromptText && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="rounded-xl bg-black/90 border border-[#D4BC98]/20 p-3.5 font-mono text-[10px] sm:text-[11px] text-zinc-300 whitespace-pre-wrap select-all leading-relaxed max-h-52 overflow-y-auto shadow-inner"
                        >
                          {AI_SOLVER_PROMPT}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
