import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mediaConfig } from '../../config/mediaConfig';
import { mediaContent } from '../../data/mediaContent';
import MediaBackground from './MediaBackground';
import MediaOverlay from './MediaOverlay';
import MediaMetadata from './MediaMetadata';
import MediaPlayButton from './MediaPlayButton';
import MediaControls from './MediaControls';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicMediaSectionProps {
  id?: string;
  onOpenApplyModal?: () => void;
}

/**
 * CinematicMediaSection Component.
 * 
 * Single full-width cinematic media composition inspired by premium GTA promotional layouts.
 * - Entire section is one unified visual canvas (min-h: 100svh, width: 100%)
 * - 100% Real HTML typography directly overlaid on media
 * - Supports living cinematic image still (abouthfg.png) + seamless HTML5 video crossfade
 * - Layered mouse parallax & scroll-triggered reveal
 */
export const CinematicMediaSection: React.FC<CinematicMediaSectionProps> = ({
  id = 'about-movement',
  onOpenApplyModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const primaryTitleRef = useRef<HTMLHeadingElement>(null);
  const secondaryTitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Playback & Interaction States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(mediaConfig.defaultDurationSeconds);
  const [controlsVisible, setControlsVisible] = useState(true);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const parallaxPos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isReducedMotion = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // 1. GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      });

      if (!isReducedMotion.current) {
        // Step 1: Background settles from scale 1.05 to 1.0
        if (bgContainerRef.current) {
          tl.fromTo(
            bgContainerRef.current,
            { scale: 1.06, filter: 'brightness(0.85)' },
            { scale: 1.0, filter: 'brightness(1)', duration: 1.4, ease: 'power2.out' },
            0
          );
        }

        // Step 2: Metadata fades in
        if (metadataRef.current) {
          tl.fromTo(
            metadataRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            0.2
          );
        }

        // Step 3: Headline reveals upward with Indian distressed depth
        if (headlineRef.current) {
          tl.fromTo(
            headlineRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
            0.3
          );
        }

        // Step 4: Description paragraph follows
        if (descRef.current) {
          tl.fromTo(
            descRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            0.5
          );
        }

        // Step 5: Play button scales in last with subtle glow
        if (playButtonRef.current) {
          tl.fromTo(
            playButtonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1.0, duration: 0.9, ease: 'back.out(1.5)' },
            0.6
          );
        }
      } else {
        // Simple clean fade for reduced motion
        tl.fromTo(
          [metadataRef.current, headlineRef.current, descRef.current, playButtonRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 0.8, stagger: 0.15 }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // 2. Mouse Parallax Depth Tracking (Running via requestAnimationFrame for performance)
  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (isReducedMotion.current) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      parallaxPos.current.targetX = nx;
      parallaxPos.current.targetY = ny;

      // Reset controls inactivity timer when mouse moves
      setControlsVisible(true);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (isPlaying) {
        inactivityTimerRef.current = setTimeout(() => {
          setControlsVisible(false);
        }, 3200);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateParallax = () => {
      const p = parallaxPos.current;
      p.x += (p.targetX - p.x) * 0.06;
      p.y += (p.targetY - p.y) * 0.06;

      const pCfg = mediaConfig.parallax;

      if (bgContainerRef.current) {
        bgContainerRef.current.style.transform = `translate3d(${(-p.x * pCfg.background.x).toFixed(
          2
        )}px, ${(-p.y * pCfg.background.y).toFixed(2)}px, 0)`;
      }

      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate3d(${(p.x * pCfg.headline.x).toFixed(
          2
        )}px, ${(p.y * pCfg.headline.y).toFixed(2)}px, 0)`;
      }

      if (metadataRef.current) {
        metadataRef.current.style.transform = `translate3d(${(p.x * pCfg.metadata.x).toFixed(
          2
        )}px, ${(p.y * pCfg.metadata.y).toFixed(2)}px, 0)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [isPlaying]);

  // 3. Video Playback Triggers
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setControlsVisible(true);

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay policy fallback: mute and retry
        video.muted = true;
        setIsMuted(true);
        video.play();
      });
    }

    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3200);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setControlsVisible(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePause, handlePlay]);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!document.fullscreenElement) {
      section.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Time & Seeking Handlers
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  }, []);

  const handleSeek = useCallback(
    (percent: number) => {
      const targetTime = (percent / 100) * duration;
      setCurrentTime(targetTime);
      if (videoRef.current) {
        videoRef.current.currentTime = targetTime;
      }
    },
    [duration]
  );

  // Simulated timer for fallback mode if videoSrc is empty
  useEffect(() => {
    if (!isPlaying || (mediaConfig.videoSrc && mediaConfig.videoSrc.trim() !== '')) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      id={id}
      data-section="cinematic-media"
      aria-label="Hack For Good Cinematic Movement & Film"
      className="relative w-full min-h-[100svh] bg-[#07080a] text-white flex flex-col justify-between select-none overflow-hidden"
    >
      {/* =========================================================
          1. FULL-WIDTH MEDIA BACKGROUND (Image + HTML5 Video)
          ========================================================= */}
      <MediaBackground
        ref={bgContainerRef}
        isPlaying={isPlaying}
        videoRef={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        isReducedMotion={isReducedMotion.current}
      />

      {/* =========================================================
          2. ATMOSPHERE & CINEMATIC VIGNETTE OVERLAYS
          ========================================================= */}
      <MediaOverlay isPlaying={isPlaying} />

      {/* =========================================================
          3. TOP EDITORIAL METADATA
          ========================================================= */}
      <MediaMetadata ref={metadataRef} isPlaying={isPlaying} />

      {/* =========================================================
          4. CENTRAL EDITORIAL CONTENT & HEADLINE COMPOSITION
          Directly overlaid on media — NO boxed cards, NO two columns
          ========================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 my-auto flex flex-col items-center sm:items-start text-center sm:text-left pt-8 pb-12">
        <div
          ref={headlineRef}
          className={`max-w-3xl flex flex-col items-center sm:items-start transition-all duration-700 ${
            isPlaying ? 'opacity-35 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {/* ACT 02 // THE MOVEMENT Eyebrow */}
          <div className="eyebrow inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1 rounded bg-[#c42828]/20 border border-[#c42828]/40 font-mono text-[10px] sm:text-xs text-[#fbf7ee] font-semibold tracking-[0.26em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
            <span>{mediaContent.eyebrow}</span>
          </div>

          {/* Primary Dominant Title: HACK FOR GOOD */}
          <h2
            ref={primaryTitleRef}
            className="font-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-[#fbf7ee] tracking-tight leading-[0.88] hero-text-depth drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            {mediaContent.primaryTitle}
          </h2>

          {/* Secondary Cinematic Headline: IDEAS BECOME ACTION. */}
          <p
            ref={secondaryTitleRef}
            className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#ef4444] to-[#fbf7ee] mt-2 sm:mt-3 drop-shadow-[0_2px_12px_rgba(196,40,40,0.5)]"
          >
            {mediaContent.secondaryTitle}
          </p>

          {/* Supporting Description Paragraph */}
          <p
            ref={descRef}
            className="mt-4 sm:mt-5 max-w-xl font-sans text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            {mediaContent.description}
          </p>

          {/* Action Row */}
          {onOpenApplyModal && (
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenApplyModal}
                className="px-6 py-2.5 bg-[#c42828] hover:bg-[#d93232] text-white font-mono text-xs font-bold tracking-[0.2em] uppercase rounded shadow-[0_4px_20px_rgba(196,40,40,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                REGISTER SQUAD →
              </button>
            </div>
          )}
        </div>

        {/* =========================================================
            5. PROMINENT CIRCULAR PLAY BUTTON (Near Optical Center)
            ========================================================= */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          <MediaPlayButton
            ref={playButtonRef}
            isPlaying={isPlaying}
            onClick={handleTogglePlay}
          />
        </div>
      </div>

      {/* =========================================================
          6. BOTTOM MEDIA CONTROL STRIP (FRAME 02 / Controls)
          ========================================================= */}
      <MediaControls
        ref={controlsRef}
        isPlaying={isPlaying}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        currentTime={currentTime}
        duration={duration}
        progressPercent={progressPercent}
        isVisible={controlsVisible}
        onTogglePlay={handleTogglePlay}
        onToggleMute={handleToggleMute}
        onToggleFullscreen={handleToggleFullscreen}
        onSeek={handleSeek}
      />
    </section>
  );
};

export default CinematicMediaSection;
