import React, { forwardRef } from 'react';
import { heroContent } from '../../config/heroContent';

interface HeroTitleProps {
  className?: string;
  hackRef?: React.Ref<HTMLDivElement>;
  forGoodRef?: React.Ref<HTMLDivElement>;
}

/**
 * HeroTitle component.
 * Dominant foreground hero title rendered as 100% REAL HTML text (not an image).
 * 
 * Layout:
 *   HACK
 *   FOR GOOD
 * 
 * "HACK" is the largest word with heavy condensed block proportions and sharp editorial cuts.
 * "FOR GOOD" sits directly underneath occupying ~75–85% of "HACK"'s width with a hybrid
 * brush/carved character and a crimson accent on "FOR".
 * 
 * Includes subtle SVG micro-roughness filter and restrained crimson brush textures behind letters.
 */
export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ className = '', hackRef, forGoodRef }, ref) => {
    const { primary, secondaryPrefix, secondarySuffix } = heroContent.title;

    return (
      <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
        {/* SVG Filter for Subtle Hand-Painted Distress & Ink Breakup */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="hand-paint-texture" x="-10%" y="-10%" width="120%" height="120%">
              {/* Subtle turbulence simulating dry brush & ink variation */}
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045 0.09"
                numOctaves="2"
                result="brushNoise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="brushNoise"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
            </filter>
          </defs>
        </svg>

        {/* Eyebrow element */}
        <div className="eyebrow inline-flex items-center gap-2 mb-2 font-mono text-[9px] sm:text-[11px] text-[#f59e0b] font-semibold tracking-[0.28em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c42828] animate-pulse" />
          <span>SOA UNIVERSITY // BHUBANESWAR 2026</span>
        </div>

        {/* Main Title Heading Element */}
        <h1
          ref={ref}
          data-hero="title"
          className="hero-title relative flex flex-col items-center text-center font-hero-title leading-none tracking-tight"
          style={{
            maxWidth: '100%',
          }}
        >
          {/* =========================================================
              LINE 1: "HACK"
              Dominant, heavy condensed block construction, sharp corners,
              warm ivory with subtle crimson brush accents.
              ========================================================= */}
          <div
            ref={hackRef}
            data-hero="hack"
            className="relative group flex items-center justify-center"
          >
            {/* Restrained Crimson Brush Texture Behind 'HACK' Letterforms */}
            <div
              className="absolute -inset-x-6 -inset-y-3 pointer-events-none opacity-45 mix-blend-screen"
              aria-hidden="true"
            >
              <svg viewBox="0 0 400 120" className="w-full h-full fill-none" preserveAspectRatio="none">
                {/* Subtle dry-brush streak across the center */}
                <path
                  d="M10 65 Q 120 48, 240 68 T 390 55"
                  stroke="#c42828"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                <path
                  d="M45 78 Q 160 62, 320 72"
                  stroke="#e11d48"
                  strokeWidth="3"
                  strokeDasharray="12 8 4 6"
                  opacity="0.4"
                />
              </svg>
            </div>

            {/* Micro tribal geometric marks framing HACK */}
            <span
              className="absolute -left-5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#c42828]/60 pointer-events-none hidden sm:inline"
              aria-hidden="true"
            >
              ⌜
            </span>
            <span
              className="absolute -right-5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#c42828]/60 pointer-events-none hidden sm:inline"
              aria-hidden="true"
            >
              ⌝
            </span>

            {/* REAL HTML TEXT: "HACK" */}
            <span
              className="hero-text-depth hero-brush-texture relative z-10 block font-extrabold uppercase text-[#fbf7ee]"
              style={{
                fontSize: 'var(--hero-title-size)',
                letterSpacing: 'var(--hero-letter-spacing)',
                lineHeight: '0.86',
              }}
            >
              {primary}
            </span>
          </div>

          {/* =========================================================
              LINE 2: "FOR GOOD"
              Directly underneath HACK, occupying ~75–85% of HACK width.
              Hybrid brush and ancient carved character.
              "FOR" highlighted in subtle crimson; "GOOD" in warm ivory.
              ========================================================= */}
          <div
            ref={forGoodRef}
            data-hero="for-good"
            className="relative flex items-center justify-center gap-[0.25em] font-hero-secondary font-extrabold uppercase mt-1 sm:mt-2"
            style={{
              width: '84%',
            }}
          >
            {/* Background dry brush streak behind 'FOR' */}
            <div
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-28 h-6 pointer-events-none opacity-40"
              aria-hidden="true"
            >
              <div className="w-full h-full bg-gradient-to-r from-[#c42828]/60 to-transparent blur-[3px]" />
            </div>

            {/* "FOR" with Crimson Accent */}
            <span
              className="hero-text-depth hero-brush-texture relative z-10 text-[#d83a3a] inline-block font-extrabold tracking-wider"
              style={{
                fontSize: 'var(--hero-forgood-size)',
                letterSpacing: 'var(--hero-forgood-letter-spacing)',
                textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 8px 20px rgba(196,40,40,0.3)',
              }}
            >
              {secondaryPrefix}
            </span>

            {/* "GOOD" in Warm Ivory / Aged Cream */}
            <span
              className="hero-text-depth hero-brush-texture relative z-10 text-[#fbf7ee] inline-block font-extrabold tracking-wider"
              style={{
                fontSize: 'var(--hero-forgood-size)',
                letterSpacing: 'var(--hero-forgood-letter-spacing)',
              }}
            >
              {secondarySuffix}
            </span>
          </div>
        </h1>
      </div>
    );
  }
);

HeroTitle.displayName = 'HeroTitle';
export default HeroTitle;
