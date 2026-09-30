import React, { forwardRef } from 'react';
import { Play } from 'lucide-react';

interface MediaPlayButtonProps {
  className?: string;
  isPlaying: boolean;
  onClick: () => void;
  onHoverStateChange?: (hovered: boolean) => void;
}

/**
 * MediaPlayButton component.
 * 
 * Prominent circular cinematic play button near optical center.
 * - Circular, thin light border, translucent dark center
 * - Small white triangular play icon with crimson aura
 * - Scale 1.06x on hover with brighter edge
 * - Scale 0.92x on click and minimizes when playing
 */
export const MediaPlayButton = forwardRef<HTMLButtonElement, MediaPlayButtonProps>(
  ({ className = '', isPlaying, onClick, onHoverStateChange }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        onMouseEnter={() => onHoverStateChange?.(true)}
        onMouseLeave={() => onHoverStateChange?.(false)}
        aria-label={isPlaying ? 'Pause film' : 'Play cinematic film'}
        data-action="play-film"
        className={`group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] select-none transition-all duration-500 ease-out transform-gpu ${
          isPlaying
            ? 'opacity-0 scale-75 pointer-events-none'
            : 'opacity-100 scale-100 hover:scale-106 active:scale-92'
        } ${className}`}
      >
        {/* Outer subtle glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c42828]/25 to-[#f59e0b]/25 blur-xl group-hover:blur-2xl group-hover:opacity-100 opacity-60 transition-all duration-300 pointer-events-none" />

        {/* Thin light border with glassmorphism center */}
        <div className="absolute inset-0 rounded-full border border-white/30 group-hover:border-white/70 bg-[#07080a]/60 group-hover:bg-[#07080a]/85 backdrop-blur-md transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)]" />

        {/* Subtle decorative concentric dashed ring */}
        <div className="absolute inset-1.5 rounded-full border border-dashed border-white/15 group-hover:border-white/30 transition-colors duration-300" />

        {/* White triangular play icon */}
        <div className="relative z-10 flex items-center justify-center pl-1 text-white group-hover:text-[#fbf7ee] transition-colors duration-200">
          <Play className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 fill-white group-hover:fill-[#fbf7ee] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]" />
        </div>

        {/* Play Film Label Tag underneath button */}
        <div className="absolute -bottom-8 whitespace-nowrap font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-[#fbf7ee]/75 uppercase group-hover:text-white transition-colors duration-200 pointer-events-none">
          PLAY FILM
        </div>
      </button>
    );
  }
);

MediaPlayButton.displayName = 'MediaPlayButton';
export default MediaPlayButton;
