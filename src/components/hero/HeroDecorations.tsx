import React, { forwardRef } from 'react';

interface HeroDecorationsProps {
  className?: string;
}

/**
 * HeroDecorations component.
 * Extremely restrained decorative marks inspired by Indian architectural & tribal geometry:
 * - Stepped diamond reticles
 * - Micro sun-gate chevron alignments
 * - Subtle coordinates and architectural framing accents
 * Implemented 100% in editable inline SVG and CSS.
 */
export const HeroDecorations = forwardRef<HTMLDivElement, HeroDecorationsProps>(
  ({ className = '' }, ref) => {
    return (
      <div
        ref={ref}
        data-hero="decor"
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none select-none z-10 ${className}`}
      >
        {/* Subtle Upper Left Architectural Coordinate Reticle */}
        <div className="absolute top-24 left-6 sm:left-12 flex items-center gap-2 opacity-40 font-mono text-[9px] text-[#fbf7ee] tracking-[0.25em]">
          <span className="w-1.5 h-1.5 border border-[#c42828] rotate-45" />
          <span className="hidden sm:inline">CRUCIBLE GATEWAY // 20.2961° N</span>
        </div>

        {/* Central Gateway Opening Frame Markers (Subtle Geometric Accents) */}
        <div className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2 opacity-35 hidden md:block">
          <svg width="18" height="60" viewBox="0 0 18 60" fill="none" className="stroke-[#fbf7ee]">
            <path d="M9 0V20M9 40V60" strokeWidth="1" strokeOpacity="0.4" />
            <polygon points="9,24 15,30 9,36 3,30" fill="none" strokeWidth="1" stroke="#c42828" />
          </svg>
        </div>

        <div className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 opacity-35 hidden md:block">
          <svg width="18" height="60" viewBox="0 0 18 60" fill="none" className="stroke-[#fbf7ee]">
            <path d="M9 0V20M9 40V60" strokeWidth="1" strokeOpacity="0.4" />
            <polygon points="9,24 15,30 9,36 3,30" fill="none" strokeWidth="1" stroke="#c42828" />
          </svg>
        </div>

        {/* Subtle Bottom Ambient Gradient for Architecture Blend */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#07080a] via-[#07080a]/60 to-transparent pointer-events-none" />
      </div>
    );
  }
);

HeroDecorations.displayName = 'HeroDecorations';
export default HeroDecorations;
