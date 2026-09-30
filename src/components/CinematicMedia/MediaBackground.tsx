import React, { forwardRef, useEffect, useRef } from 'react';
import { mediaConfig } from '../../config/mediaConfig';

interface MediaBackgroundProps {
  className?: string;
  isPlaying: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onTimeUpdate?: () => void;
  onEnded?: () => void;
  isReducedMotion?: boolean;
}

/**
 * MediaBackground component.
 * 
 * Supports BOTH:
 * 1. Background image (abouthfg.png) as living cinematic still
 * 2. HTML5 <video> element that seamlessly crossfades in when PLAY is activated
 * 
 * Includes:
 * - Slow ambient camera breathing (1.00 → 1.06 over 22s)
 * - Layered mouse parallax
 * - Graceful fallback when videoSrc is empty
 */
export const MediaBackground = forwardRef<HTMLDivElement, MediaBackgroundProps>(
  (
    {
      className = '',
      isPlaying,
      videoRef,
      onTimeUpdate,
      onEnded,
      isReducedMotion = false,
    },
    ref
  ) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Living cinematic still camera animation via CSS / JS
    const hasVideo = Boolean(mediaConfig.videoSrc && mediaConfig.videoSrc.trim() !== '');

    // Fallback dynamic ambient particles/grain canvas if videoSrc is empty
    useEffect(() => {
      if (hasVideo || !isPlaying) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animId: number;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const lines: Array<{ y: number; speed: number; alpha: number }> = Array.from({ length: 18 }, () => ({
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.8 + 0.3,
        alpha: Math.random() * 0.15 + 0.05,
      }));

      const render = () => {
        ctx.fillStyle = 'rgba(7, 8, 10, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        lines.forEach((line) => {
          line.y = (line.y + line.speed) % canvas.height;
          ctx.strokeStyle = `rgba(245, 158, 11, ${line.alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, line.y);
          ctx.lineTo(canvas.width, line.y);
          ctx.stroke();
        });

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);
      return () => cancelAnimationFrame(animId);
    }, [hasVideo, isPlaying]);

    return (
      <div
        ref={ref}
        data-layer="media-background-container"
        className={`media-background absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      >
        {/* =========================================================
            1. LIVING CINEMATIC STILL IMAGE (abouthfg.png)
            ========================================================= */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            ref={imgRef}
            src={mediaConfig.backgroundImage}
            alt="Hack For Good Cinematic Atmosphere"
            className={`w-full h-full object-cover object-center transform-gpu will-change-transform ${
              !isReducedMotion ? 'animate-cinematic-drift' : ''
            }`}
            style={{
              transformOrigin: '50% 50%',
            }}
            loading="eager"
          />
        </div>

        {/* =========================================================
            2. HTML5 VIDEO LAYER (Crossfades in on PLAY)
            ========================================================= */}
        <div
          className={`media-video absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={mediaConfig.videoSrc}
              poster={mediaConfig.videoPoster}
              preload="metadata"
              playsInline
              muted
              className="w-full h-full object-cover object-center"
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
            />
          ) : (
            // Ambient simulated cinematic playback when videoSrc is not yet provided
            <div className="absolute inset-0 w-full h-full bg-[#07080a] flex items-center justify-center">
              <img
                src={mediaConfig.backgroundImage}
                alt="Cinema Mode Backdrop"
                className="w-full h-full object-cover opacity-60 filter brightness-110 contrast-105 scale-105 transition-transform duration-[12000ms]"
              />
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-screen opacity-40" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

MediaBackground.displayName = 'MediaBackground';
export default MediaBackground;
