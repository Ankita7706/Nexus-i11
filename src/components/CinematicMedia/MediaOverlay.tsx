import React, { forwardRef } from 'react';

interface MediaOverlayProps {
  className?: string;
  isPlaying?: boolean;
}

/**
 * MediaOverlay component.
 * 
 * Provides subtle ambient vignette and gradient shadows so real HTML typography
 * is razor-sharp and legible without boxing it into cards or panels.
 */
export const MediaOverlay = forwardRef<HTMLDivElement, MediaOverlayProps>(
  ({ className = '', isPlaying = false }, ref) => {
    return (
      <div
        ref={ref}
        data-layer="media-atmosphere-overlay"
        className={`absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        {/* Left side text-reading gradient */}
        <div
          className={`absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#07080a]/90 via-[#07080a]/50 to-transparent transition-opacity duration-700 ${
            isPlaying ? 'opacity-40' : 'opacity-85'
          }`}
        />

        {/* Top bar header vignette */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07080a]/80 via-[#07080a]/30 to-transparent" />

        {/* Bottom bar control strip vignette */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#07080a]/95 via-[#07080a]/60 to-transparent" />

        {/* Soft edge radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,8,10,0.7)_100%)]" />

        {/* Subtle crimson warm accent glow near center */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#c42828]/10 rounded-full blur-[140px]" />
      </div>
    );
  }
);

MediaOverlay.displayName = 'MediaOverlay';
export default MediaOverlay;
