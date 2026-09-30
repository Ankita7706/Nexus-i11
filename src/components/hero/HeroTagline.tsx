import React, { forwardRef } from 'react';
import { heroContent } from '../../config/heroContent';

interface HeroTaglineProps {
  className?: string;
}

/**
 * HeroTagline component.
 * Supporting tagline under the main title: "IDEAS TODAY. A BRIGHTER TOMORROW."
 * Real HTML text, uppercase, small size, warm ivory with generous tracking (~0.22em).
 */
export const HeroTagline = forwardRef<HTMLParagraphElement, HeroTaglineProps>(
  ({ className = '' }, ref) => {
    return (
      <div className={`hero-tagline relative flex items-center justify-center gap-3 select-none ${className}`}>
        {/* Left Restrained Hairline */}
        <div className="w-5 sm:w-8 h-[1px] bg-gradient-to-r from-transparent via-[#c42828]/50 to-white/30" />

        {/* Real HTML Tagline */}
        <p
          ref={ref}
          data-hero="tagline"
          className="font-mono text-center uppercase text-[#fbf7ee]/90 font-medium tracking-[0.22em] text-shadow"
          style={{
            fontSize: 'var(--hero-tagline-size)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
          }}
        >
          {heroContent.tagline}
        </p>

        {/* Right Restrained Hairline */}
        <div className="w-5 sm:w-8 h-[1px] bg-gradient-to-l from-transparent via-[#c42828]/50 to-white/30" />
      </div>
    );
  }
);

HeroTagline.displayName = 'HeroTagline';
export default HeroTagline;
