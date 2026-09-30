/**
 * Central motion configurations and easing curves for Hack for Good.
 * Enforces restrained, cinematic scroll interpolation and reduced-motion compliance.
 */

export const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export const HERO_TRANSFORMS = {
  // Keyframe points for the 180vh scroll track
  scrollPoints: [0, 0.4, 0.85] as number[],
  scaleFull: [1, 1.05, 1.12] as number[],
  scaleReduced: [1, 1, 1] as number[],
  yFull: [0, 30, 85] as number[],
  yReduced: [0, 0, 0] as number[],
  overlayOpacity: [0.4, 0.55, 0.9] as number[],
  contentYFull: [0, -40, -180] as number[],
  contentYReduced: [0, 0, 0] as number[],
  contentPoints: [0, 0.4, 0.7, 0.85] as number[],
  contentOpacity: [1, 0.92, 0.35, 0] as number[],
  titleScaleFull: [1, 0.98, 0.94] as number[],
  titleScaleReduced: [1, 1, 1] as number[],
};

export const TRANSITION_CONFIG = {
  duration: 0.7,
  ease: CINEMATIC_EASE,
} as const;
