import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface SectionMarkerProps {
  actNumber: string;
  chapterNumber: string;
  eyebrow: string;
  coordinates?: string;
  className?: string;
}

export const SectionMarker: React.FC<SectionMarkerProps> = ({
  actNumber,
  chapterNumber,
  eyebrow,
  coordinates = '20.2961° N, 85.8245° E',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const lineWidth = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['100%', '100%'] : ['0%', '100%']
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none mb-10 md:mb-16 ${className}`}
    >
      {/* Scroll-reactive hairline divider */}
      <div className="relative w-full h-[1px] bg-white/10 mb-6 overflow-hidden">
        <motion.div
          style={{ width: lineWidth }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#f59e0b] via-[#ff5e3a] to-transparent"
        />
      </div>

      {/* Editorial Marker Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-neutral-400 tracking-[0.25em] uppercase">
        <div className="flex items-center gap-3">
          <span className="text-[#f59e0b] font-bold">{chapterNumber}</span>
          <span className="text-white/20">/</span>
          <span className="text-white">{actNumber}</span>
          <span className="text-white/20">·</span>
          <span className="text-neutral-400">{eyebrow}</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-neutral-400 text-[10px]">
          <span>{coordinates}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SectionMarker;
