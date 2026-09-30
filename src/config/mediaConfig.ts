/**
 * Configuration for the Cinematic Media Section
 * 
 * Supports:
 * - Background artwork & HTML5 video source
 * - Camera motion & drift timing
 * - Mouse parallax multipliers
 * - Play button & control bar settings
 */

export interface MediaConfig {
  backgroundImage: string;
  videoSrc: string;
  videoPoster?: string;
  aspectRatio: string;
  cameraAnimation: {
    initialScale: number;
    endScale: number;
    duration: number; // seconds
    ease: string;
    driftX: number; // max px
    driftY: number; // max px
  };
  parallax: {
    background: { x: number; y: number };
    headline: { x: number; y: number };
    metadata: { x: number; y: number };
    playButton: { x: number; y: number };
  };
  transitionDuration: {
    playPress: number;
    fadeImage: number;
    revealVideo: number;
  };
  defaultDurationSeconds: number; // 84 seconds (01:24)
}

export const mediaConfig: MediaConfig = {
  backgroundImage: '/gta6/abouthfg.png',
  videoSrc: '', // Empty initially as requested; gracefully handled
  videoPoster: '/gta6/abouthfg.png',
  aspectRatio: '16/9',
  cameraAnimation: {
    initialScale: 1.0,
    endScale: 1.06,
    duration: 22,
    ease: 'power1.inOut',
    driftX: 8,
    driftY: 5,
  },
  parallax: {
    background: { x: 10, y: 7 },
    headline: { x: 5, y: 3 },
    metadata: { x: 12, y: 8 },
    playButton: { x: 8, y: 5 },
  },
  transitionDuration: {
    playPress: 0.15,
    fadeImage: 0.7,
    revealVideo: 0.8,
  },
  defaultDurationSeconds: 84, // 01:24
};

export default mediaConfig;
