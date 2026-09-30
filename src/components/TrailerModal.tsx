import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { EVENT_DETAILS } from '../config/tokens';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(24);
  const [isMuted, setIsMuted] = useState(false);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.35));
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-5xl bg-[#07080a] border border-white/20 overflow-hidden shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0a0b0e] border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[#f59e0b] font-bold">{EVENT_DETAILS.name} // CHALLENGE PREVIEW</span>
            <span className="text-neutral-500 hidden sm:inline" aria-hidden="true">|</span>
            <span className="text-neutral-400 hidden sm:inline">{EVENT_DETAILS.location} // {EVENT_DETAILS.duration}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cinematic Widescreen Canvas */}
        <div className="relative aspect-[21/9] w-full bg-[#050608] flex items-center justify-center overflow-hidden">
          <img
            src="/assets/background.webp"
            alt="Challenge Overview"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.2] transition-transform duration-1000 scale-105"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07080a]/50 to-[#07080a]/90 pointer-events-none" />

          {/* Center Graphic */}
          <div className="text-center font-mono space-y-2 select-none z-10 px-4">
            <div className="text-[10px] text-[#f59e0b] tracking-[0.35em] uppercase font-bold">
              {EVENT_DETAILS.tagline}
            </div>
            <h4 id="challenge-modal-title" className="text-2xl sm:text-4xl md:text-5xl font-bold text-white font-display uppercase tracking-tight">
              {EVENT_DETAILS.headline}
            </h4>
            <p className="text-xs text-neutral-300 max-w-md mx-auto font-sans leading-relaxed">
              Explore the four core challenge tracks: Autonomous Climate Logistics, Open Public Infrastructure, Decentralized Health Logistics, and Offline Knowledge Networks.
            </p>
          </div>

          {/* Viewfinder Registration Reticles with Bhubaneswar Coordinates */}
          <div className="absolute inset-6 pointer-events-none flex flex-col justify-between text-white/40 font-mono text-xs">
            <div className="flex justify-between">
              <span>⌜ {EVENT_DETAILS.coordinates.split(',')[0]}</span>
              <span>{EVENT_DETAILS.coordinates.split(',')[1]} ⌝</span>
            </div>
            <div className="flex justify-between items-end">
              <span>⌞ {EVENT_DETAILS.campus}</span>
              <div className="text-[10px] text-neutral-400">
                TIMELINE: {(progress * 24).toFixed(0)} / 2400
              </div>
              <span>{EVENT_DETAILS.dates} ⌟</span>
            </div>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="px-6 py-4 bg-[#0a0b0e] border-t border-white/10 font-mono text-xs space-y-3">
          {/* Timeline Bar */}
          <div
            className="w-full h-1.5 bg-white/10 relative cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}
          >
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-[#f59e0b] relative transition-all duration-75"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white shadow-md" />
            </div>
          </div>

          {/* Controls Strip */}
          <div className="flex items-center justify-between text-neutral-400">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 hover:text-white transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
                aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 hover:text-white transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-[#f59e0b] focus-visible:outline-none"
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
              <span className="text-[11px] text-neutral-400 tabular-nums">
                00:{Math.floor((progress / 100) * 102).toString().padStart(2, '0')} / 01:42
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-neutral-400 hidden sm:inline">CHALLENGE BRIEFING</span>
              <Maximize className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
