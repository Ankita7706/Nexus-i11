import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface ImageCompositionProps {
  primaryImage: string;
  secondaryImage?: string;
  backdropImage?: string;
  altText: string;
  frameId: string;
  coordinates?: string;
  telemetryTag: string;
  variant?: 'overlap-duo' | 'wide-landscape' | 'tactical-portrait';
  overlapDirection?: 'left' | 'right';
  className?: string;
}

export const ImageComposition: React.FC<ImageCompositionProps> = ({
  primaryImage,
  secondaryImage,
  backdropImage = '/assets/background.webp',
  altText,
  frameId,
  coordinates = '20.2961° N, 85.8245° E',
  telemetryTag,
  variant = 'overlap-duo',
  overlapDirection = 'right',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Layered parallax transforms
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-25, 25]
  );
  const fgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [30, -30]
  );
  const secondaryY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [15, -15]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.98, 1, 1.02]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-full select-none overflow-hidden ${className}`}
    >
      {/* Outer Viewfinder Frame */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] xl:aspect-[5/6] bg-[#090a12] border border-white/15 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        
        {/* =========================================================
            LAYER 1: DEEP BACKDROP HORIZON & VIGNETTE
            ========================================================= */}
        <motion.div
          style={{ y: bgY, scale }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <img
            src={backdropImage}
            alt="Atmospheric Environment Backdrop"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/40 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80" />
        </motion.div>

        {/* Viewfinder Reticles & Field Telemetry */}
        <div className="absolute inset-3 sm:inset-4 pointer-events-none flex flex-col justify-between z-30 font-mono text-[10px] text-white/40">
          <div className="flex justify-between items-start">
            <span className="text-white/60">⌜ {frameId}</span>
            <span className="text-neutral-400">{coordinates} ⌝</span>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
              <span className="text-[#f59e0b] font-semibold">{telemetryTag}</span>
            </div>
            <span>FIELD RUNTIME ⌟</span>
          </div>
        </div>

        {/* Subtle crosshair grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* =========================================================
            LAYER 2: ASYMMETRICAL LAYERED IMAGERY & CROP BEHAVIOR
            ========================================================= */}
        <div className="relative w-full h-full flex items-end justify-center z-10 overflow-hidden">
          {variant === 'overlap-duo' && secondaryImage ? (
            <div className="relative w-full h-full flex items-end justify-center">
              {/* Secondary Layer Plane (Mid-depth) */}
              <motion.img
                style={{ y: secondaryY }}
                src={secondaryImage}
                alt="Lead Systems Architect / Builder"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className={`absolute bottom-0 h-[88%] sm:h-[94%] max-w-none object-contain object-bottom filter contrast-[1.08] brightness-[0.88] drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] ${
                  overlapDirection === 'right' ? '-left-6 sm:-left-8' : '-right-6 sm:-right-8'
                }`}
              />

              {/* Primary Layer Plane (Foreground) */}
              <motion.img
                style={{ y: fgY }}
                src={primaryImage}
                alt={altText}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className={`relative z-20 bottom-0 h-[92%] sm:h-[98%] max-w-none object-contain object-bottom filter contrast-[1.12] brightness-[0.95] drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)] ${
                  overlapDirection === 'right' ? 'translate-x-10 sm:translate-x-14' : '-translate-x-10 sm:-translate-x-14'
                }`}
              />
            </div>
          ) : (
            /* Single Heroic Full-Crop Figure or Tactical Composition */
            <motion.div
              style={{ y: fgY }}
              className="relative w-full h-full flex items-end justify-center"
            >
              <img
                src={primaryImage}
                alt={altText}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-[92%] sm:h-[98%] w-auto max-w-full object-contain object-bottom filter contrast-[1.1] brightness-[0.92] drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)]"
              />
            </motion.div>
          )}

          {/* Bottom Fade to blend seamlessly with dark canvas */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07080a] via-[#07080a]/70 to-transparent pointer-events-none z-25" />
        </div>
      </div>

      {/* Under-Plate Metadata Label */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-neutral-400 px-1">
        <span className="text-white/70">SPECIFICATION · COHORT 2026</span>
        <span className="text-neutral-400">OPEN SOURCE CRUCIBLE</span>
      </div>
    </div>
  );
};

export default ImageComposition;
