import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { GATEWAY_CONFIG } from '../config/gatewayConfig';

// 1. Register GSAP Plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // 2. Register Custom Eases required for cinematic transitions
  try {
    CustomEase.create('softReveal', 'M0,0 C0.25,0.1 0.25,1 1,1');
    CustomEase.create('smoothBlur', 'M0,0 C0.4,0 0.2,1 1,1');
    CustomEase.create('cameraEase', 'M0,0 C0.3,0 0.2,1 1,1');
    CustomEase.create('portalEase', 'M0,0 C0.6,0 0.1,1 1,1');
  } catch {
    // Fallback if already registered
  }
}

export type ScrollSubscriber = (progress: number, rawVelocity?: number) => void;

class GatewayScrollManager {
  private progress: number = 0;
  private subscribers: Set<ScrollSubscriber> = new Set();
  private isReducedMotion: boolean = false;
  private mediaQueryList: MediaQueryList | null = null;
  private boundMediaHandler: ((e: MediaQueryListEvent) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.checkReducedMotion();
    }
  }

  private checkReducedMotion() {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    this.mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = this.mediaQueryList.matches;

    this.boundMediaHandler = (e: MediaQueryListEvent) => {
      this.isReducedMotion = e.matches;
    };
    this.mediaQueryList.addEventListener('change', this.boundMediaHandler);
  }

  public getProgress(): number {
    return this.progress;
  }

  public getIsReducedMotion(): boolean {
    return this.isReducedMotion;
  }

  public setProgress(value: number, velocity?: number) {
    const clamped = Math.max(0, Math.min(1, value));
    this.progress = clamped;
    this.subscribers.forEach((callback) => {
      try {
        callback(clamped, velocity);
      } catch (err) {
        console.error('Error in scroll subscriber:', err);
      }
    });
  }

  public subscribe(callback: ScrollSubscriber): () => void {
    this.subscribers.add(callback);
    callback(this.progress, 0);

    return () => {
      this.subscribers.delete(callback);
    };
  }

  public destroy() {
    this.subscribers.clear();
    if (this.mediaQueryList && this.boundMediaHandler) {
      this.mediaQueryList.removeEventListener('change', this.boundMediaHandler);
    }
  }
}

export const gatewayScroll = new GatewayScrollManager();

export interface GatewayTimelineElements {
  container: HTMLElement;
  stage: HTMLElement;
  gatewayScene: HTMLElement | null;
  gatewayBg: HTMLElement | null;
  letterMesh: HTMLElement | null;
  gatewayOverlay: HTMLElement | null;
  darkOverlay: HTMLElement | null;
  modernWorld?: HTMLElement | null;
  heroNav?: HTMLElement | null;
  heroEventInfo?: HTMLElement | null;
  heroActions?: HTMLElement | null;
  heroTagline?: HTMLElement | null;
  heroTitle?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  hackLine?: HTMLElement | null;
  forGoodLine?: HTMLElement | null;
}

/**
 * Creates the dedicated typography timeline for hero content elements:
 * Staggered exit order:
 * 1. navigation (0.22)
 * 2. event information (0.25)
 * 3. eyebrow (0.30)
 * 4. title (0.35 — remains the visual focus until it exits)
 * 5. tagline (0.42)
 * 6. CTA (0.46)
 * 
 * Each element uses 3D poster pull-away:
 * rotationX (75deg), translateY (-30px), scale (0.76), blur (4px), opacity (0)
 */
export function createHeroContentTimeline(
  stage: HTMLElement,
  elements: Partial<GatewayTimelineElements>
): gsap.core.Timeline {
  const tl = gsap.timeline();
  const cfg = GATEWAY_CONFIG.heroContentExits;
  const seq = cfg.sequence;

  const nav = elements.heroNav || stage.querySelector<HTMLElement>('.hero-navigation') || stage.querySelector<HTMLElement>('header');
  const eventInfo = elements.heroEventInfo || stage.querySelector<HTMLElement>('.hero-event-info') || stage.querySelector<HTMLElement>('aside');
  const eyebrow = elements.eyebrow || stage.querySelector<HTMLElement>('.eyebrow');
  const title = elements.heroTitle || stage.querySelector<HTMLElement>('.hero-title') || stage.querySelector<HTMLElement>('h1');
  const hackLine = elements.hackLine || stage.querySelector<HTMLElement>('[data-hero="hack"]');
  const forGoodLine = elements.forGoodLine || stage.querySelector<HTMLElement>('[data-hero="for-good"]');
  const tagline = elements.heroTagline || stage.querySelector<HTMLElement>('.hero-tagline');
  const actions = elements.heroActions || stage.querySelector<HTMLElement>('.hero-actions');

  const allItems = [nav, eventInfo, eyebrow, title, hackLine, forGoodLine, tagline, actions].filter(Boolean) as HTMLElement[];

  allItems.forEach((el) => {
    gsap.set(el, {
      transformOrigin: cfg.transformOrigin,
      transformPerspective: 1200,
      willChange: 'transform, opacity, filter',
    });
  });

  // 1. Navigation Exit
  if (nav) {
    tl.to(
      nav,
      {
        rotateX: cfg.rotateX,
        y: cfg.translateY,
        scale: cfg.scale,
        opacity: cfg.opacity,
        filter: `blur(${cfg.blur})`,
        ease: cfg.ease,
        duration: seq.nav.duration,
      },
      seq.nav.start
    );
  }

  // 2. Event Info Exit
  if (eventInfo) {
    tl.to(
      eventInfo,
      {
        rotateX: cfg.rotateX,
        y: cfg.translateY,
        scale: cfg.scale,
        opacity: cfg.opacity,
        filter: `blur(${cfg.blur})`,
        ease: cfg.ease,
        duration: seq.eventInfo.duration,
      },
      seq.eventInfo.start
    );
  }

  // 3. Eyebrow Exit
  if (eyebrow) {
    tl.to(
      eyebrow,
      {
        rotateX: cfg.rotateX,
        y: cfg.translateY,
        scale: cfg.scale,
        opacity: cfg.opacity,
        filter: `blur(${cfg.blur})`,
        ease: cfg.ease,
        duration: seq.eyebrow.duration,
      },
      seq.eyebrow.start
    );
  }

  // 4. Main Title (HACK & FOR GOOD) Exit — remains focus until here
  const titleTargets = (hackLine && forGoodLine) ? [hackLine, forGoodLine] : [title].filter(Boolean);
  if (titleTargets.length > 0) {
    tl.to(
      titleTargets,
      {
        rotateX: cfg.rotateX,
        y: cfg.translateY,
        scale: cfg.scale,
        opacity: cfg.opacity,
        filter: `blur(${cfg.blur})`,
        ease: cfg.ease,
        stagger: 0.03,
        duration: seq.title.duration,
      },
      seq.title.start
    );
  }

  // 5. Supporting Tagline Exit
  if (tagline) {
    tl.to(
      tagline,
      {
        rotateX: cfg.rotateX,
        y: cfg.translateY,
        scale: cfg.scale,
        opacity: cfg.opacity,
        filter: `blur(${cfg.blur})`,
        ease: cfg.ease,
        duration: seq.tagline.duration,
      },
      seq.tagline.start
    );
  }

  // 6. Action CTA Buttons Exit
  if (actions) {
    tl.to(
      actions,
      {
        rotateX: cfg.rotateX,
        y: cfg.translateY,
        scale: cfg.scale,
        opacity: cfg.opacity,
        filter: `blur(${cfg.blur})`,
        ease: cfg.ease,
        duration: seq.cta.duration,
      },
      seq.cta.start
    );
  }

  return tl;
}

/**
 * Creates the polished master pinned GSAP ScrollTrigger timeline for the cinematic gateway transition.
 * 
 * Phases:
 * 0.00–0.20 : Arrival (Subtle camera drift breathing 1.00 → 1.015)
 * 0.20–0.45 : Camera Approach (Uniform zoom towards gateway visual center)
 * 0.45–0.65 : Hero Text Exits (Staggered poster pull-away: Nav → Event → Eyebrow → Title → Tagline → CTA)
 * 0.55–0.75 : Gateway Dominates (Arch fills viewport, dark atmospheric overlay peaks at 0.70)
 * 0.70–0.87 : Mesh Transformation (Letter mesh deforms, stretches, glyphs release into sparks)
 * 0.82–1.00 : Modern-World Reveal (Spatial portal expands with clip-path, scale 0.94->1.0, y 24->0, opacity 0->1)
 */
export function createGatewayScrollTimeline(elements: GatewayTimelineElements): {
  timeline: gsap.core.Timeline;
  heroContentTimeline: gsap.core.Timeline;
  destroy: () => void;
} {
  const {
    container,
    stage,
    gatewayScene,
    gatewayBg,
    letterMesh,
    gatewayOverlay,
    darkOverlay,
    modernWorld,
  } = elements;

  const isReducedMotion = gatewayScroll.getIsReducedMotion();
  const cfg = GATEWAY_CONFIG;

  // Set transform origins precisely on visual center of the gateway opening
  const origin = `${cfg.gatewayCenter.x} ${cfg.gatewayCenter.y}`;
  if (gatewayScene) gsap.set(gatewayScene, { transformOrigin: origin, willChange: 'transform, opacity' });
  if (gatewayBg) gsap.set(gatewayBg, { transformOrigin: origin, willChange: 'transform' });
  if (letterMesh) gsap.set(letterMesh, { transformOrigin: '50% 50%', willChange: 'transform, opacity' });
  if (modernWorld) {
    gsap.set(modernWorld, {
      transformOrigin: '50% 50%',
      scale: cfg.modernWorld.scale.initial,
      y: cfg.modernWorld.y.initial,
      opacity: 0,
      clipPath: cfg.modernWorld.clip.initial,
      willChange: 'transform, opacity, clip-path',
    });
  }

  // Camera breathing loop (active at scroll progress ~0, smooth continuous organic feel)
  let breathingTween: gsap.core.Tween | null = null;
  if (!isReducedMotion && gatewayBg) {
    breathingTween = gsap.to(gatewayBg, {
      scale: cfg.camera.breathingScale, // 1.015
      duration: 6.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  // Create the pinned Master Timeline
  const master = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: stage,
      scrub: isReducedMotion ? 0.2 : cfg.scrubSpeed,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      markers: false,
      onUpdate: (self) => {
        gatewayScroll.setProgress(self.progress, self.getVelocity());

        // Pause/resume breathing tween based on scroll position
        if (breathingTween) {
          if (self.progress > 0.05 && breathingTween.isActive()) {
            breathingTween.pause();
          } else if (self.progress <= 0.02 && breathingTween.paused()) {
            breathingTween.resume();
          }
        }
      },
    },
  });

  // Master timeline duration normalized to 1.0
  master.duration(1.0);

  // Synchronized Hero Content Typography Timeline
  const heroContentTimeline = createHeroContentTimeline(stage, elements);
  master.add(heroContentTimeline, 0);

  if (isReducedMotion) {
    // Reduced motion fallback: gentle crossfade without extreme camera zoom
    master.to(gatewayScene, { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, 0.2);
    if (modernWorld) {
      master.fromTo(
        modernWorld,
        { opacity: 0, scale: 1, y: 0, clipPath: 'circle(150% at 50% 50%)' },
        { opacity: 1, duration: 0.6, ease: 'power1.inOut' },
        0.4
      );
    }
  } else {
    // =========================================================================
    // 1. ARRIVAL (0.00 → 0.20)
    // Gateway subtle drift & breathing seamlessly transitions into scroll camera
    // =========================================================================
    master.to(
      gatewayScene,
      {
        scale: cfg.camera.arrivalEnd, // 1.03
        yPercent: -0.5,
        ease: 'power1.out',
        duration: 0.20,
      },
      0.0
    );

    // =========================================================================
    // 2. CAMERA APPROACH (0.20 → 0.45)
    // Gradually zooms into gateway opening without wall stretching
    // =========================================================================
    master.to(
      gatewayScene,
      {
        scale: cfg.camera.approachEnd, // 1.48
        yPercent: cfg.camera.y.approachEnd, // -3.0%
        ease: 'power1.inOut',
        duration: 0.25,
      },
      0.20
    );

    if (letterMesh) {
      master.to(
        letterMesh,
        {
          scale: cfg.mesh.scale.approachEnd, // 1.3
          ease: 'power1.inOut',
          duration: 0.25,
        },
        0.20
      );
    }

    // =========================================================================
    // 3. ATMOSPHERIC DARKENING OVERLAY (0.40 → 0.88, Peaks at 0.70)
    // Max darkness around 0.70 (~0.68 opacity, never completely black)
    // =========================================================================
    if (darkOverlay) {
      // Darkening rises to peak
      master.to(
        darkOverlay,
        {
          opacity: cfg.atmosphere.peakOpacity, // 0.68
          ease: 'power2.in',
          duration: cfg.atmosphere.peak - cfg.atmosphere.start, // 0.30
        },
        cfg.atmosphere.start // 0.40
      );

      // Darkening dissipates as modern world emerges
      master.to(
        darkOverlay,
        {
          opacity: 0,
          ease: 'power2.out',
          duration: cfg.atmosphere.end - cfg.atmosphere.peak, // 0.18
        },
        cfg.atmosphere.peak // 0.70
      );
    }

    // =========================================================================
    // 4. GATEWAY DOMINATES (0.55 → 0.75)
    // Blue arch fills viewport, red walls expand to screen edges
    // =========================================================================
    master.to(
      gatewayScene,
      {
        scale: cfg.camera.dominatesEnd, // 2.75
        yPercent: cfg.camera.y.dominatesEnd, // -6.5%
        ease: 'power1.in',
        duration: 0.20,
      },
      0.55
    );

    if (letterMesh) {
      master.to(
        letterMesh,
        {
          scale: cfg.mesh.scale.dominatesEnd, // 1.9
          opacity: cfg.mesh.opacity.dominates, // 0.9
          filter: `blur(${cfg.mesh.blur.dominatesEnd}px)`,
          ease: 'power1.inOut',
          duration: 0.20,
        },
        0.55
      );
    }

    // =========================================================================
    // 5. MESH TRANSFORMATION & CROSSING (0.70 → 0.87)
    // Camera crosses gate opening. Ancient scene moves beyond viewport.
    // Letter mesh deforms, stretches subtly, and dissolves.
    // =========================================================================
    master.to(
      gatewayScene,
      {
        scale: cfg.camera.crossingEnd, // 5.2
        yPercent: cfg.camera.y.crossingEnd, // -11.0%
        opacity: 0,
        ease: 'power2.in',
        duration: 0.17,
      },
      0.70
    );

    if (letterMesh) {
      master.to(
        letterMesh,
        {
          scale: cfg.mesh.scale.crossingEnd, // 3.4
          opacity: 0,
          filter: `blur(${cfg.mesh.blur.crossingEnd}px)`,
          skewY: 2.5,
          ease: 'power2.in',
          duration: 0.17,
        },
        0.70
      );
    }

    if (gatewayOverlay) {
      master.to(
        gatewayOverlay,
        {
          opacity: 0,
          ease: 'power2.in',
          duration: 0.15,
        },
        0.72
      );
    }

    // =========================================================================
    // 6. MODERN-WORLD REVEAL (0.82 → 1.00)
    // Multi-property reveal: clip-path, scale 0.94->1.0, y 24->0, opacity 0->1
    // =========================================================================
    if (modernWorld) {
      // Step A: Portal opens through gate center
      master.fromTo(
        modernWorld,
        {
          opacity: 0,
          scale: cfg.modernWorld.scale.initial, // 0.94
          y: cfg.modernWorld.y.initial, // 24px
          clipPath: cfg.modernWorld.clip.initial, // circle(0% at 50% 48%)
        },
        {
          opacity: 1,
          scale: cfg.modernWorld.scale.mid, // 0.98
          y: 8,
          clipPath: cfg.modernWorld.clip.mid, // circle(60% at 50% 48%)
          ease: 'power2.out',
          duration: 0.08,
        },
        0.82
      );

      // Step B: Portal expands to full viewport with settling y
      master.to(
        modernWorld,
        {
          scale: cfg.modernWorld.scale.final, // 1.0
          y: cfg.modernWorld.y.final, // 0px
          clipPath: cfg.modernWorld.clip.final, // circle(150% at 50% 50%)
          ease: 'power2.inOut',
          duration: 0.10,
        },
        0.90
      );
    }
  }

  return {
    timeline: master,
    heroContentTimeline,
    destroy: () => {
      if (breathingTween) {
        breathingTween.kill();
        breathingTween = null;
      }
      master.scrollTrigger?.kill();
      master.kill();
    },
  };
}

export { gsap, ScrollTrigger, CustomEase };
