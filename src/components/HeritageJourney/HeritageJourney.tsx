import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { heritageContentConfig } from '../../config/heritageContentConfig';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeritageJourneyProps {
  onOpenApplyModal?: () => void;
  onExploreClick?: () => void;
}

/**
 * HeritageJourney Component.
 * 
 * Features /gta6/abthfg.png as the prominent, continuous background artwork connecting
 * both the Expedition (Section 1) and the Roots/Builders (Section 2) without any blacked-out gaps.
 */
export const HeritageJourney: React.FC<HeritageJourneyProps> = ({
  onOpenApplyModal,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualLayerRef = useRef<HTMLDivElement>(null);
  const artworkImgRef = useRef<HTMLImageElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);

  const [activeStateIndex, setActiveStateIndex] = useState<number>(0);
  const { artworkScroll, states } = heritageContentConfig;

  // Ultra-fluid GSAP ScrollTrigger hardware-accelerated translation
  useEffect(() => {
    const container = containerRef.current;
    const img = artworkImgRef.current;
    if (!container || !img) return;

    const ctx = gsap.context(() => {
      // Smooth vertical scroll translation connecting modern city to Odisha temple roots
      gsap.fromTo(
        img,
        {
          yPercent: artworkScroll.startYPercent,
          force3D: true,
        },
        {
          yPercent: artworkScroll.endYPercent,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const p = self.progress;

              // Determine active editorial state
              let matchedIndex = 0;
              for (let i = 0; i < states.length; i++) {
                const s = states[i];
                if (p >= s.range.start && p <= s.range.end) {
                  matchedIndex = i;
                  break;
                }
              }
              if (p >= 1.0) {
                matchedIndex = states.length - 1;
              }
              setActiveStateIndex(matchedIndex);
            },
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [artworkScroll, states]);

  const currentState = states[activeStateIndex] || states[0];

  return (
    <div
      ref={containerRef}
      className="heritage-journey relative w-full bg-[#07080a] text-white select-none min-h-[220vh] md:min-h-[240vh]"
      aria-label="Heritage Journey - The Future to Cultural Roots"
    >
      {/* =========================================================
          STICKY FULL-VIEWPORT STAGE
          ========================================================= */}
      <div
        ref={stickyStageRef}
        className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex items-center justify-center"
      >
        {/* =========================================================
            HERITAGE BACKGROUND IMAGE LAYER (/gta6/abthfg.png)
            Connecting background artwork spanning the entire journey
            ========================================================= */}
        <div
          ref={visualLayerRef}
          className="heritage-visual-layer absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Base Background */}
          <div className="absolute inset-0 bg-[#07080a] pointer-events-none" />

          {/* Full-width continuous connecting artwork container */}
          <div className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-[1300px] h-[190%] top-0 flex items-start justify-center">
              <img
                ref={artworkImgRef}
                src="/gta6/abthfg.png"
                alt="Hack for Good continuous connecting heritage artwork"
                className="heritage-artwork w-full h-full object-contain md:object-cover md:object-top will-change-transform filter brightness-[1.10] contrast-[1.08] saturate-[1.08]"
                loading="eager"
              />
            </div>

            {/* Delicate contrast gradient masks so typography is readable while artwork remains fully visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/60 via-transparent to-[#07080a]/60 opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/70 via-transparent to-[#07080a]/70 opacity-50 pointer-events-none" />
          </div>
        </div>

        {/* =========================================================
            SPACIOUS 3-COLUMN EDITORIAL TEXT LAYER
            ========================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 h-full flex items-center pointer-events-none">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center relative">
            {/* LEFT CONTENT COLUMN (States 01 & 03) */}
            <div className="w-full lg:w-[32%] xl:w-[30%] max-w-md pointer-events-auto flex flex-col justify-center text-left">
              {currentState.side === 'left' && (
                <div
                  key={currentState.id}
                  className="space-y-4 transition-all duration-700 ease-out animate-in fade-in slide-in-from-left-4"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-[#f59e0b] tracking-[0.25em] uppercase">
                    <span>{currentState.number}</span>
                    <span className="text-white/30">/</span>
                    <span>EXPEDITION</span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white uppercase tracking-tight leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    {currentState.title}
                  </h2>

                  <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 font-light italic leading-snug border-l-2 border-[#f59e0b] pl-4 my-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    “{currentState.quote}”
                  </p>
                </div>
              )}
            </div>

            {/* CENTER CORRIDOR (Space for Artwork Center Spine / Culmination Card) */}
            <div className="hidden lg:block lg:w-[36%] xl:w-[40%] pointer-events-none flex justify-center items-center">
              {currentState.side === 'center' && (
                <div
                  key={currentState.id}
                  className="space-y-5 transition-all duration-700 ease-out animate-in fade-in zoom-in-95 bg-black/80 p-7 sm:p-9 rounded-2xl border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-md pointer-events-auto text-center"
                >
                  <div className="font-mono text-[11px] text-[#f59e0b] tracking-widest uppercase font-semibold">
                    <span>THE MANIFESTO CULMINATION</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white uppercase tracking-tight leading-[1.0]">
                    {currentState.title}
                  </h2>

                  <p className="text-base sm:text-lg text-neutral-200 font-light italic leading-relaxed">
                    “{currentState.quote}”
                  </p>

                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={onOpenApplyModal}
                      className="px-6 py-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-black font-mono text-xs font-bold uppercase tracking-widest rounded shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>APPLY NOW</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {onExploreClick && (
                      <button
                        type="button"
                        onClick={onExploreClick}
                        className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest rounded border border-white/15 transition-colors cursor-pointer"
                      >
                        EXPLORE TRACKS
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT CONTENT COLUMN (States 02 & 04) */}
            <div className="w-full lg:w-[32%] xl:w-[30%] max-w-md pointer-events-auto flex flex-col justify-center text-right ml-auto">
              {currentState.side === 'right' && (
                <div
                  key={currentState.id}
                  className="space-y-4 transition-all duration-700 ease-out animate-in fade-in slide-in-from-right-4 ml-auto"
                >
                  <div className="flex items-center justify-end gap-2 font-mono text-xs text-[#f59e0b] tracking-[0.25em] uppercase">
                    <span>{currentState.number}</span>
                    <span className="text-white/30">/</span>
                    <span>EXPEDITION</span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white uppercase tracking-tight leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    {currentState.title}
                  </h2>

                  <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 font-light italic leading-snug border-r-2 border-[#f59e0b] pr-4 my-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    “{currentState.quote}”
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          ACCESSIBLE SEMANTIC CONTENT PANELS
          ========================================================= */}
      <section
        id="section-future"
        className="heritage-panel heritage-panel--future sr-only"
        aria-label="Section 01: The Future and Connection"
      >
        <h2>THE FUTURE</h2>
        <p>Technology moves forward.</p>
        <h2>THE CONNECTION</h2>
        <p>Progress carries the stories that made us.</p>
      </section>

      <section
        id="section-roots"
        className="heritage-panel heritage-panel--roots sr-only"
        aria-label="Section 02: Roots, Bridge, and Building What Matters"
      >
        <h2>THE ROOTS</h2>
        <p>Progress should remember where it came from.</p>
        <h2>THE BRIDGE</h2>
        <p>Old foundations. New possibilities.</p>
        <h2>BUILD WHAT MATTERS.</h2>
        <p>Carry the past forward. Build what comes next.</p>
      </section>
    </div>
  );
};

export default HeritageJourney;
