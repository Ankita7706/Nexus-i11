import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Eye, Layers } from 'lucide-react';

interface ImageLayerProps {
  aspectRatio?: '16:9' | '21:9' | '4:3' | '1:1' | 'auto' | 'poster';
  imageUrl?: string;
  midgroundImageUrl?: string;
  foregroundImageUrl?: string;
  altText?: string;
  label?: string;
  subLabel?: string;
  frameId?: string;
  coordinates?: string;
  depth?: 'shallow' | 'standard' | 'deep';
  variant?: 'viewfinder' | 'dossier' | 'cinematic';
  backgroundContent?: React.ReactNode;
  midgroundContent?: React.ReactNode;
  foregroundContent?: React.ReactNode;
  className?: string;
  showInspectControls?: boolean;
}

export const ImageLayer: React.FC<ImageLayerProps> = ({
  aspectRatio = '16:9',
  imageUrl,
  midgroundImageUrl,
  foregroundImageUrl,
  altText = 'Cinematic composition plate',
  label = 'CINEMATIC COMPOSITION',
  subLabel = '35MM SPATIAL VIEWPORT',
  frameId = '01. Manifesto Frame',
  coordinates = '20.2961° N · 85.8245° E',
  depth = 'standard',
  variant = 'viewfinder',
  backgroundContent,
  midgroundContent,
  foregroundContent,
  className = '',
  showInspectControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'bg' | 'mid' | 'fg'>('all');
  const [isInspecting, setIsInspecting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scroll-driven parallax offsets for multi-plane depth
  const bgMultiplier = depth === 'deep' ? -40 : depth === 'shallow' ? -12 : -25;
  const fgMultiplier = depth === 'deep' ? 30 : depth === 'shallow' ? 10 : 20;

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [bgMultiplier, -bgMultiplier]);
  const midScale = useTransform(scrollYProgress, [0, 0.5, 1], prefersReducedMotion ? [1, 1, 1] : [0.98, 1, 1.02]);
  const fgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [fgMultiplier, -fgMultiplier]);

  const aspectClass = {
    '16:9': 'aspect-[16/9]',
    '21:9': 'aspect-[21/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    'poster': 'aspect-[3/4]',
    'auto': 'h-full min-h-[420px]',
  }[aspectRatio];

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-none border border-white/10 bg-[#07080a] overflow-hidden select-none group ${className}`}
    >
      {/* Top Technical Metadata Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#09090c]/90 border-b border-white/10 text-[11px] font-mono tracking-wider text-neutral-400 z-20 relative">
        <div className="flex items-center gap-3">
          <span className="text-[#f59e0b] font-semibold">{frameId}</span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline truncate max-w-[220px]">{label}</span>
        </div>

        {/* Interactive Layer Filter Selector */}
        {showInspectControls && (
          <div className="flex items-center gap-1.5">
            <span className="hidden md:inline text-neutral-500 mr-1 text-[10px]">PLANE:</span>
            {(['all', 'bg', 'mid', 'fg'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-2 py-0.5 text-[10px] uppercase font-mono transition-colors ${
                  activeLayer === layer
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title={`Switch focus to ${layer} plane`}
              >
                {layer}
              </button>
            ))}
            <button
              onClick={() => setIsInspecting(!isInspecting)}
              className={`ml-2 p-1 text-neutral-400 hover:text-white transition-colors ${isInspecting ? 'text-[#f59e0b]' : ''}`}
              title="Toggle HUD reticle overlay"
              aria-label="Toggle HUD reticle overlay"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Viewport Container */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-[#07080a]`}>
        {/* =========================================
            PLANE 1: BACKGROUND LAYER (Slow Parallax)
            ========================================= */}
        <motion.div
          style={{ y: bgY }}
          className={`absolute inset-0 transition-opacity duration-300 ${
            activeLayer === 'mid' || activeLayer === 'fg' ? 'opacity-20' : 'opacity-100'
          }`}
        >
          {imageUrl ? (
            <div className="w-full h-full relative overflow-hidden">
              <img
                src={imageUrl}
                alt={altText}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-105"
              />
              {/* Atmospheric Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/30 to-black/50" />
            </div>
          ) : backgroundContent ? (
            backgroundContent
          ) : (
            <div className="w-full h-full relative bg-gradient-to-b from-[#13141b] via-[#0b0c10] to-[#07080a] flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                  backgroundSize: '48px 48px',
                }}
              />
              <div className="text-center font-mono text-neutral-600 text-xs tracking-widest px-4">
                <p className="text-neutral-500 mb-1">[BACKGROUND PLATE // DEPTH FACTOR -1.0]</p>
                <p className="text-[10px] text-neutral-700">AMBIENT ENVIRONMENT BUFFER</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* =========================================
            PLANE 2: MIDGROUND LAYER (Subject / Focus)
            ========================================= */}
        <motion.div
          style={{ scale: midScale }}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            activeLayer === 'bg' || activeLayer === 'fg' ? 'opacity-20' : 'opacity-100'
          }`}
        >
          {midgroundImageUrl ? (
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
              <img
                src={midgroundImageUrl}
                alt={subLabel}
                referrerPolicy="no-referrer"
                className="h-full max-w-full object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          ) : midgroundContent ? (
            midgroundContent
          ) : (
            <div className="w-4/5 h-4/5 border border-white/10 bg-white/[0.02] relative flex flex-col items-center justify-center p-6 backdrop-blur-[1px]">
              <div className="w-full h-full border border-dashed border-white/15 relative flex items-center justify-center">
                <div className="w-24 h-24 border border-[#f59e0b]/30 flex items-center justify-center relative">
                  <div className="w-1.5 h-1.5 bg-[#f59e0b]" />
                  <span className="absolute -top-4 font-mono text-[9px] text-[#f59e0b]/70 tracking-widest">
                    TARGET FOCUS
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 text-left font-mono text-[10px] text-neutral-500">
                  <p className="text-neutral-300 font-semibold">{subLabel}</p>
                  <p className="text-neutral-600">SUBJECT VECTOR PLANE // FOCAL LENGTH 50MM</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* =========================================
            PLANE 3: FOREGROUND LAYER (Fast Parallax)
            ========================================= */}
        <motion.div
          style={{ y: fgY }}
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            activeLayer === 'bg' || activeLayer === 'mid' ? 'opacity-10' : 'opacity-100'
          }`}
        >
          {foregroundImageUrl && (
            <img
              src={foregroundImageUrl}
              alt="Foreground layer"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-contain object-center z-10"
            />
          )}

          {foregroundContent}

          {/* Viewfinder Overlay Markings (Corner Brackets & Film Registration) */}
          <div className="absolute inset-4 pointer-events-none flex flex-col justify-between z-20">
            {/* Top Corners */}
            <div className="flex justify-between items-start">
              <span className="font-mono text-white/40 text-xs">⌜</span>
              <span className="font-mono text-[10px] text-neutral-400 tracking-wider">
                {coordinates}
              </span>
              <span className="font-mono text-white/40 text-xs">⌝</span>
            </div>

            {/* Center Reticle (When Inspecting or Default Viewfinder) */}
            {(isInspecting || variant === 'viewfinder') && (
              <div className="self-center flex items-center justify-center w-8 h-8 text-white/20 font-mono text-base">
                +
              </div>
            )}

            {/* Bottom Corners */}
            <div className="flex justify-between items-end">
              <span className="font-mono text-white/40 text-xs">⌞</span>
              <div className="flex items-center gap-2 font-mono text-[9px] text-neutral-400">
                <span>FPS: 24.00</span>
                <span>·</span>
                <span>SHUTTER: 180°</span>
                <span>·</span>
                <span className="text-[#f59e0b] font-medium">CALIBRATED</span>
              </div>
              <span className="font-mono text-white/40 text-xs">⌟</span>
            </div>
          </div>
        </motion.div>

        {/* Top/Bottom Cinematic Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/50 pointer-events-none" />
      </div>

      {/* Footer Info Bar */}
      <div className="px-4 py-2 bg-[#09090c] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <Layers className="w-3 h-3 text-[#f59e0b]" />
          <span>LAYER COMPOSITION: {activeLayer.toUpperCase()}</span>
        </div>
        <span className="text-neutral-500 font-mono tracking-wider">35MM ASPECT RATIO // SENSOR RAW</span>
      </div>
    </div>
  );
};

export default ImageLayer;
