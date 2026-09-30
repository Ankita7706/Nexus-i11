import React, { forwardRef } from 'react';
import { mediaContent } from '../../data/mediaContent';

interface MediaMetadataProps {
  className?: string;
  isPlaying?: boolean;
}

/**
 * MediaMetadata component.
 * 
 * Editorial technical metadata positioned along the top edge:
 * - Upper-Left: ACT 02 // THE MOVEMENT
 * - Upper-Right: Location & Coordinates (BHUBANESWAR, INDIA · 20°17'46"N · 85°49'28"E)
 */
export const MediaMetadata = forwardRef<HTMLDivElement, MediaMetadataProps>(
  ({ className = '', isPlaying = false }, ref) => {
    const { eyebrow, location } = mediaContent;

    return (
      <header
        ref={ref}
        data-layer="media-metadata"
        className={`relative z-20 w-full px-6 sm:px-12 md:px-16 pt-6 sm:pt-8 flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-[0.25em] text-neutral-400 select-none uppercase transition-opacity duration-500 ${
          isPlaying ? 'opacity-30 hover:opacity-100' : 'opacity-100'
        } ${className}`}
      >
        {/* Left: Act & Movement */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
          <span className="text-[#fbf7ee] font-semibold">{eyebrow}</span>
          <span className="text-neutral-600 hidden xs:inline">/</span>
          <span className="text-neutral-500 hidden sm:inline">FIELD RECORDING</span>
        </div>

        {/* Right: Technical Location Telemetry */}
        <div className="flex items-center gap-2 sm:gap-4 text-neutral-400">
          <span className="text-neutral-300 hidden md:inline">{location.city}, {location.country}</span>
          <span className="text-neutral-600 hidden md:inline">·</span>
          <span className="text-[#c42828] font-bold">{location.coordinates}</span>
        </div>
      </header>
    );
  }
);

MediaMetadata.displayName = 'MediaMetadata';
export default MediaMetadata;
