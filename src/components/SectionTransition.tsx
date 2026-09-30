import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface SectionTransitionProps {
  actNumber: string;
  title: string;
  tagline?: string;
  coordinates?: string;
  className?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  actNumber,
  title,
  tagline,
  coordinates = '20.2961° N · 85.8245° E',
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
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.3, 0.8, 1]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 select-none ${className}`}
    >
      {/* Top Hairline with Animated Scroll-Driven Expansion */}
      <div className="relative w-full h-[1px] bg-white/10 mb-8 overflow-hidden">
        <motion.div
          style={{ width: lineWidth }}
          className="absolute top-0 left-0 h-full bg-[#f59e0b]"
        />
      </div>

      {/* Chapter Stamp & Metadata Row */}
      <motion.div
        style={{ opacity }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#f59e0b] tracking-[0.2em] mb-2 uppercase">
            <span>{actNumber}</span>
            <span className="text-white/20">/</span>
            <span className="text-neutral-400">{coordinates}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-display uppercase">
            {title}
          </h2>
        </div>

        {tagline && (
          <p className="max-w-md font-sans text-sm md:text-base text-neutral-400 leading-relaxed">
            {tagline}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SectionTransition;
