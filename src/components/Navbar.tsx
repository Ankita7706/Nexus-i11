import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X, ArrowUpRight } from 'lucide-react';
import { EVENT_DETAILS } from '../config/tokens';

interface NavbarProps {
  onOpenApplyModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplyModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  // Track scroll position for sticky styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Web Audio API ambient synthesizer
  const toggleAmbientAudio = () => {
    try {
      if (!isAudioActive) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Cinematic drone frequencies (Low D minor triad)
        const freqs = [73.42, 110.0, 146.83];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO modulation for cinematic breathing sound
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(masterGain);
          osc.start();
          oscs.push(osc);
        });

        oscNodesRef.current = oscs;
        setIsAudioActive(true);
      } else {
        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
          setTimeout(() => {
            audioCtxRef.current?.close();
            audioCtxRef.current = null;
            setIsAudioActive(false);
          }, 500);
        } else {
          setIsAudioActive(false);
        }
      }
    } catch {
      setIsAudioActive(!isAudioActive);
    }
  };

  const navLinks = [
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'The Challenge', href: '#challenge' },
    { label: 'The Builders', href: '#builders' },
    { label: 'Registration', href: '#protocols' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080a]/92 backdrop-blur-md border-b border-white/10 py-3 opacity-100 pointer-events-auto translate-y-0'
          : 'opacity-0 pointer-events-none -translate-y-4 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Hack for Good Brand Mark & Positioning */}
        <a
          href="#"
          aria-label="Hack for Good Home"
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none rounded-sm"
        >
          {/* Exact Logo from gta6 folder */}
          <img
            src="/gta6/hfglogo.png"
            alt="Hack For Good Logo"
            className="h-9 sm:h-10 w-auto object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)] transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-white font-display uppercase group-hover:text-neutral-200 transition-colors leading-tight">
              {EVENT_DETAILS.name}
            </span>
            <span className="hidden sm:inline-block text-[8px] sm:text-[9px] font-mono tracking-wider text-[#f59e0b]">
              {EVENT_DETAILS.tagline}
            </span>
          </div>
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono uppercase tracking-widest text-neutral-400"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#f59e0b] hover:after:w-full after:transition-all after:duration-200 focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Audio Ambient Visualizer Toggle */}
          <button
            onClick={toggleAmbientAudio}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 text-neutral-400 hover:text-white transition-colors font-mono text-[10px] sm:text-[11px] tracking-wider cursor-pointer focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
            title={isAudioActive ? 'Mute cinematic ambient audio' : 'Play cinematic ambient audio'}
            aria-label="Toggle ambient audio"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span className="hidden sm:inline">AUDIO ON</span>
                <div className="flex items-end gap-[2px] h-3 ml-0.5" aria-hidden="true">
                  <span className="w-[2px] h-2 bg-[#f59e0b] animate-pulse" />
                  <span className="w-[2px] h-3 bg-[#f59e0b] animate-ping" />
                  <span className="w-[2px] h-1.5 bg-[#f59e0b] animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline">AUDIO OFF</span>
              </>
            )}
          </button>

          {/* Primary Action Button: REGISTER NOW */}
          <button
            onClick={onOpenApplyModal}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#ffd3dd] to-[#fee2e2] text-[#0f1016] hover:brightness-105 transition-all font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap cursor-pointer rounded-full focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
          >
            <span>REGISTER NOW</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          {/* Accessible Menu Toggle Button using uploaded menu.svg */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" aria-hidden="true" />
            ) : (
              <img
                src="/assets/menu.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-4 opacity-95 hover:opacity-100 transition-opacity"
              />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Campaign Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-x-0 top-full bg-[#07080a]/98 border-b border-white/10 px-6 py-6 flex flex-col gap-5 backdrop-blur-xl shadow-2xl"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 text-xs font-mono uppercase tracking-widest text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#f59e0b] transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenApplyModal?.();
              }}
              className="w-full py-3 bg-gradient-to-r from-[#ffd3dd] via-[#fee2e2] to-[#ffedd5] text-[#0f1016] font-mono text-xs font-bold uppercase tracking-wider text-center cursor-pointer rounded-sm"
            >
              REGISTER FOR SQUAD CANDIDACY
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
