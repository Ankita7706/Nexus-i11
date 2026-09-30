/**
 * Gateway Animation & Camera Configuration
 * 
 * Central configuration for all phases of the polished cinematic gateway scroll:
 * - 0.00–0.20: Arrival (Gateway breathing 1.00 → 1.015, subtle atmosphere, letter mesh idle)
 * - 0.20–0.45: Camera Approach (Uniform zoom towards the gateway opening)
 * - 0.45–0.65: Hero Text Exits (Staggered poster pull-away: Nav → Event → Eyebrow → Title → Tagline → CTA)
 * - 0.55–0.75: Gateway Dominates (Arch fills viewport, walls expand outwards, dark atmospheric overlay peaks)
 * - 0.70–0.87: Mesh Transformation (Letter mesh deforms, stretches, glyphs release into sparks)
 * - 0.82–1.00: Modern-World Reveal (Spatial portal expands with clip-path, scale 0.94->1.0, y 24->0, opacity 0->1)
 */

export interface CameraTransform {
  scale: number;
  y: number;
  x: number;
}

export interface MeshTransform {
  opacity: number;
  scale: number;
  y: number;
  letterSpacing: number;
  blur: number;
  dispersion: number;
  skewY: number;
}

export interface ModernWorldState {
  scale: number;
  opacity: number;
  clipProgress: number;
  clipPath: string;
}

export const GATEWAY_CONFIG = {
  // Scroll height per viewport tier
  scrollHeight: {
    desktop: '350vh', // 320vh - 380vh
    tablet: '300vh',  // 280vh - 320vh
    mobile: '260vh',  // 240vh - 280vh
  },

  // Optical center of the architectural gateway opening (transform origin)
  gatewayCenter: {
    x: '50%',
    y: '48%',
  },

  // Exact configurable timeline phases (0.00 → 1.00)
  timings: {
    arrival: { start: 0.00, end: 0.20 },
    cameraApproach: { start: 0.20, end: 0.45 },
    heroTextExits: { start: 0.45, end: 0.65 },
    gatewayDominates: { start: 0.55, end: 0.75 },
    meshTransformation: { start: 0.70, end: 0.87 },
    modernWorldReveal: { start: 0.82, end: 1.00 },
  },

  // Atmosphere dark overlay (0.40 → 0.85, peak at 0.70, max opacity 0.68)
  atmosphere: {
    start: 0.40,
    peak: 0.70,
    end: 0.88,
    peakOpacity: 0.68, // never completely black
  },

  // Camera Zoom (Scale) configuration - restrained & cinematic
  camera: {
    breathingScale: 1.015,
    arrivalEnd: 1.03,
    approachEnd: 1.48,
    dominatesEnd: 2.75,
    crossingEnd: 5.2,
    y: {
      arrival: 0,
      approachEnd: -3.0, // %
      dominatesEnd: -6.5, // %
      crossingEnd: -11.0, // %
    },
    x: 0,
  },

  // Gateway scene opacity
  gatewayOpacity: {
    arrival: 1.0,
    approach: 1.0,
    dominates: 1.0,
    crossingFadeStart: 0.76,
    crossingFadeEnd: 0.90,
  },

  // Letter Mesh & Foreground Title values
  mesh: {
    opacity: {
      arrival: 1.0,
      approach: 1.0,
      dominates: 0.9,
      crossingFadeStart: 0.70,
      crossingEnd: 0.0,
    },
    deformation: {
      idle: 0.0,
      approach: 0.08,
      dominates: 0.35,
      crossing: 1.0,
    },
    scale: {
      arrival: 1.0,
      approachEnd: 1.3,
      dominatesEnd: 1.9,
      crossingEnd: 3.4,
    },
    blur: {
      arrival: 0,
      approachEnd: 0,
      dominatesEnd: 1.5,
      crossingEnd: 12,
    },
    particles: {
      desktopCount: 28,
      tabletCount: 16,
      mobileCount: 8,
    },
  },

  // Hero Content Exit Properties (Film-roll / 3D Poster Pull-Away)
  heroContentExits: {
    rotateX: 75, // approx 70–90deg
    translateY: -30, // approx -30px
    scale: 0.76, // approx 0.72–0.82
    blur: '4px',
    opacity: 0,
    transformOrigin: 'center top',
    ease: 'power3.inOut',
    // Staggered order: 1. Nav, 2. Event Info, 3. Eyebrow, 4. Title, 5. Tagline, 6. CTA
    sequence: {
      nav: { start: 0.22, duration: 0.18 },
      eventInfo: { start: 0.25, duration: 0.18 },
      eyebrow: { start: 0.30, duration: 0.18 },
      title: { start: 0.35, duration: 0.22 },
      tagline: { start: 0.42, duration: 0.18 },
      cta: { start: 0.46, duration: 0.18 },
    },
  },

  // Modern World Reveal configuration (Multi-property cinematic reveal)
  modernWorld: {
    scale: {
      initial: 0.94,
      mid: 0.98,
      final: 1.0,
    },
    y: {
      initial: 24, // px
      final: 0,
    },
    opacity: {
      initial: 0.0,
      start: 0.82,
      mid: 0.92,
      full: 1.0,
    },
    clip: {
      initial: 'circle(0% at 50% 48%)',
      mid: 'circle(60% at 50% 48%)',
      final: 'circle(150% at 50% 50%)',
    },
  },

  // Lenis & ScrollTrigger Tuning
  scrubSpeed: 1.2,
} as const;

export default GATEWAY_CONFIG;
