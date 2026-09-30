import React, { forwardRef } from 'react';

interface GatewayOverlayProps {
  className?: string;
  darkOverlayRef?: React.Ref<HTMLDivElement>;
}

/**
 * GatewayOverlay component.
 * 
 * - Fire Bowls: Continuous, independent ambient flicker (subtle opacity 0.75–1.0, scale 0.97–1.03).
 * - Cinematic Darkening: Controlled by ScrollTrigger during 0.40 → 0.85 (peaks at ~0.68 opacity around 0.70).
 * - Arch Rim Light & Atmospheric Depth.
 */
export const GatewayOverlay = forwardRef<HTMLDivElement, GatewayOverlayProps>(
  ({ className = '', darkOverlayRef }, ref) => {
    return (
      <div
        ref={ref}
        data-layer="gateway-overlay"
        className={`absolute inset-0 w-full h-full pointer-events-none z-15 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        {/* =========================================================
            1. INDEPENDENT FIRE GLOW FLICKER (Left & Right Bowls)
            Completely decoupled from ScrollTrigger, runs on independent CSS clock
            ========================================================= */}
        <div
          className="absolute bottom-[27%] left-[21%] sm:left-[27%] w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-gradient-to-t from-amber-600/35 via-red-600/25 to-transparent blur-2xl animate-pulse transform-gpu"
          style={{
            animationDuration: '2.8s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />

        <div
          className="absolute bottom-[27%] right-[21%] sm:right-[27%] w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-gradient-to-t from-amber-600/35 via-red-600/25 to-transparent blur-2xl animate-pulse transform-gpu"
          style={{
            animationDuration: '3.4s',
            animationDelay: '0.6s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />

        {/* Ambient Archway Sunset Rim & Haze */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] sm:w-[50vw] max-w-2xl h-72 bg-gradient-to-b from-amber-400/12 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

        {/* Soft Edge Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/90 via-transparent to-black/45 pointer-events-none" />

        {/* =========================================================
            2. SCROLL-DRIVEN CINEMATIC DARKENING OVERLAY (0.40 → 0.85)
            Controlled by gatewayScroll timeline, peaks at ~0.68 opacity
            ========================================================= */}
        <div
          ref={darkOverlayRef}
          data-layer="cinematic-darkening"
          className="absolute inset-0 w-full h-full bg-[#050608] opacity-0 transition-opacity pointer-events-none will-change-[opacity]"
        />
      </div>
    );
  }
);

GatewayOverlay.displayName = 'GatewayOverlay';
export default GatewayOverlay;
