import React, { forwardRef } from 'react';

interface HeroBackgroundProps {
  className?: string;
  imageAlt?: string;
}

/**
 * HeroBackground component.
 * Renders the existing gateway artwork (/gta6/heroimg.png) as the independent visual foundation.
 * Preserves the original artwork uncropped, unflattened, and ready for parallax and camera motion.
 */
export const HeroBackground = forwardRef<HTMLDivElement, HeroBackgroundProps>(
  ({ className = '', imageAlt = 'Ancient gateway overlooking sunset horizon' }, ref) => {
    return (
      <div
        ref={ref}
        data-hero="bg"
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}
        aria-hidden="true"
      >
        {/* Foundation Gateway Artwork */}
        <img
          src="/gta6/heroimg.png"
          alt={imageAlt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center filter contrast-[1.03] select-none"
        />

        {/* Soft edge darkening for maximum text legibility without altering the gateway sunset */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-black/35 pointer-events-none" />
      </div>
    );
  }
);

HeroBackground.displayName = 'HeroBackground';
export default HeroBackground;
