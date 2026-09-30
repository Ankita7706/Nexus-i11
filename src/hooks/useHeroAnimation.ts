import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroContent } from '../config/heroContent';

// Initialize and register GSAP ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseHeroAnimationRefs {
  containerRef: React.RefObject<HTMLDivElement | null>;
  bgRef?: React.RefObject<HTMLDivElement | null>;
  navRef?: React.RefObject<HTMLElement | null>;
  eventInfoRef?: React.RefObject<HTMLDivElement | null>;
  titleContainerRef?: React.RefObject<HTMLDivElement | null>;
  hackRef?: React.RefObject<HTMLDivElement | null>;
  forGoodRef?: React.RefObject<HTMLDivElement | null>;
  taglineRef?: React.RefObject<HTMLParagraphElement | null>;
  actionsRef?: React.RefObject<HTMLDivElement | null>;
  decorRef?: React.RefObject<HTMLDivElement | null>;
}

export interface UseHeroAnimationReturn {
  isReady: boolean;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  timeline: React.MutableRefObject<gsap.core.Timeline | null>;
  scrollTriggerInstance: React.MutableRefObject<ScrollTrigger | null>;
}

/**
 * Custom hook to initialize GSAP and ScrollTrigger for the Hack for Good hero.
 * 
 * Implements:
 * 1. Staggered cinematic entrance using GSAP's fromTo methods:
 *    - Navigation
 *    - Event info block (upper-right)
 *    - Tribal decorations
 *    - 'HACK' (heavy block display)
 *    - 'FOR GOOD' (hybrid brush display)
 *    - Tagline ('IDEAS TODAY. A BRIGHTER TOMORROW.')
 *    - Hero CTA actions (buttons with stagger)
 * 2. GSAP ScrollTrigger integration:
 *    - Scrubbed camera depth and title lift transition during scroll
 * 3. Mouse Parallax:
 *    - Independent multi-plane depth
 * 4. Full cleanup on unmount via gsap.context()
 */
export const useHeroAnimation = ({
  containerRef,
  bgRef,
  navRef,
  eventInfoRef,
  titleContainerRef,
  hackRef,
  forGoodRef,
  taglineRef,
  actionsRef,
  decorRef,
}: UseHeroAnimationRefs): UseHeroAnimationReturn => {
  const [isReady, setIsReady] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Initial Entrance Animation with GSAP & fromTo methods
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Find DOM elements via refs or fallback to data-hero selectors
      const nav = navRef?.current || container.querySelector<HTMLElement>('[data-hero="nav"]');
      const eventInfo = eventInfoRef?.current || container.querySelector<HTMLElement>('[data-hero="event-info"]');
      const decor = decorRef?.current || container.querySelector<HTMLElement>('[data-hero="decor"]');
      const hack = hackRef?.current || container.querySelector<HTMLElement>('[data-hero="hack"]');
      const forGood = forGoodRef?.current || container.querySelector<HTMLElement>('[data-hero="for-good"]');
      const tagline = taglineRef?.current || container.querySelector<HTMLElement>('[data-hero="tagline"]');
      const actions = actionsRef?.current || container.querySelector<HTMLElement>('[data-hero="actions"]');
      const actionButtons = actions ? actions.querySelectorAll<HTMLElement>('[data-hero="action-btn"]') : [];
      const bg = bgRef?.current || container.querySelector<HTMLElement>('[data-hero="bg"]');
      const titleContainer = titleContainerRef?.current;

      // Keep title container strictly static without mouse hover offsets
      if (titleContainer) {
        gsap.set(titleContainer, { x: 0, y: 0 });
      }

      if (prefersReducedMotion) {
        // Immediate presentation for reduced motion users
        if (nav) gsap.set(nav, { opacity: 1, y: 0 });
        if (eventInfo) gsap.set(eventInfo, { opacity: 1, x: 0 });
        if (decor) gsap.set(decor, { opacity: 1 });
        if (hack) gsap.set(hack, { opacity: 1, y: 0, scale: 1 });
        if (forGood) gsap.set(forGood, { opacity: 1, y: 0, scale: 1 });
        if (tagline) gsap.set(tagline, { opacity: 1, y: 0 });
        if (actions) gsap.set(actions, { opacity: 1, y: 0 });
        setIsReady(true);
        return;
      }

      // -------------------------------------------------------------
      // 1. CINEMATIC STAGGERED ENTRANCE TIMELINE USING fromTo
      // -------------------------------------------------------------
      const tl = gsap.timeline({
        defaults: { ease: heroContent.animation.ease },
        onComplete: () => setIsReady(true),
      });

      timelineRef.current = tl;

      // 1. Navigation fades in from top
      if (nav) {
        tl.fromTo(
          nav,
          { opacity: 0, y: -24 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: heroContent.animation.initialDelay }
        );
      }

      // 2. Date / Event info block fades in from the right
      if (eventInfo) {
        tl.fromTo(
          eventInfo,
          { opacity: 0, x: 28 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' },
          '-=0.55'
        );
      }

      // 3. Indian tribal & geometric decorations reveal
      if (decor) {
        tl.fromTo(
          decor,
          { opacity: 0 },
          { opacity: 1, duration: 1.1, ease: 'power2.out' },
          '-=0.6'
        );
      }

      // 4. 'HACK' (dominant heavy block display word) rises upward with subtle blur-clear
      if (hack) {
        tl.fromTo(
          hack,
          {
            opacity: 0,
            y: 42,
            scale: 0.94,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.15,
            ease: 'power3.out',
          },
          '-=0.55'
        );
      }

      // 5. 'FOR GOOD' (hybrid brush display) follows with slight stagger and crimson accent glow
      if (forGood) {
        tl.fromTo(
          forGood,
          {
            opacity: 0,
            y: 32,
            scale: 0.96,
            filter: 'blur(4px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
          },
          '-=0.75'
        );
      }

      // 6. Supporting Tagline appears with tracked letter spacing
      if (tagline) {
        tl.fromTo(
          tagline,
          {
            opacity: 0,
            y: 18,
            letterSpacing: '0.34em',
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0.22em',
            duration: 0.85,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }

      // 7. Hero Actions (Buttons) appear with staggered pop
      if (actionButtons.length > 0) {
        tl.fromTo(
          actionButtons,
          {
            opacity: 0,
            y: 22,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: 'back.out(1.5)',
          },
          '-=0.45'
        );
      } else if (actions) {
        tl.fromTo(
          actions,
          {
            opacity: 0,
            y: 20,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'back.out(1.5)',
          },
          '-=0.45'
        );
      }

      // -------------------------------------------------------------
      // 2. SCROLLTRIGGER: GATEWAY DEPTH & CAMERA SCROLL TRANSITION
      // -------------------------------------------------------------
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true,
        animation: gsap
          .timeline()
          // Gateway background parallax & zoom
          .fromTo(
            bg || [],
            { scale: 1, y: 0 },
            { scale: 1.1, y: 70, ease: 'none' },
            0
          )
          // Title container lifts and dissolves into the gateway architecture
          .fromTo(
            [hack, forGood, tagline, actions].filter(Boolean),
            { y: 0, opacity: 1, scale: 1 },
            {
              y: -110,
              opacity: 0,
              scale: 0.92,
              stagger: 0.04,
              ease: 'power1.in',
            },
            0
          ),
      });

      scrollTriggerRef.current = scrollTriggerInstance;
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [
    containerRef,
    bgRef,
    navRef,
    eventInfoRef,
    titleContainerRef,
    hackRef,
    forGoodRef,
    taglineRef,
    actionsRef,
    decorRef,
  ]);

  // Subtle Parallax Mouse Movement Handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const { bgStrength, decorStrength } = heroContent.animation.mouseParallax;

      const bg = bgRef?.current;
      const decor = decorRef?.current;

      // Note: Mouse hovering movement has been removed from the text (titleContainer)
      // to keep the hero title ('HACK', 'FOR GOOD', tagline, CTA buttons) rock-steady
      // in the optical center of the gateway, preserving only the GSAP animations.

      if (bg) {
        gsap.to(bg, {
          x: nx * bgStrength,
          y: ny * bgStrength,
          duration: 1.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      if (decor) {
        gsap.to(decor, {
          x: nx * decorStrength,
          y: ny * decorStrength,
          duration: 1.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    },
    [containerRef, bgRef, decorRef]
  );

  return {
    isReady,
    handleMouseMove,
    timeline: timelineRef,
    scrollTriggerInstance: scrollTriggerRef,
  };
};

export default useHeroAnimation;
