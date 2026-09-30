import React, { useRef, useEffect } from 'react';
import { createGatewayScrollTimeline } from '../animation/gatewayScroll';
import GatewayScene from './gateway/GatewayScene';

interface HeroProps {
  onOpenApplyModal?: () => void;
  onOpenChallengeModal?: () => void;
}

/**
 * Main Hero / Gateway Scroll Transition Component.
 * 
 * Structure:
 * <section class="gateway-scroll">
 *   <div class="gateway-stage">
 *     <GatewayScene />
 *   </div>
 * </section>
 * 
 * Pinned using GSAP ScrollTrigger across ~350vh (desktop), ~300vh (tablet), ~260vh (mobile).
 * Controls the cinematic transition zooming through the ancient gateway directly into the continuous heritage journey.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenApplyModal, onOpenChallengeModal }) => {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const eventInfoRef = useRef<HTMLDivElement>(null);
  const letterMeshRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const hackRef = useRef<HTMLDivElement>(null);
  const forGoodRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP Pinned ScrollTrigger Master Timeline
  useEffect(() => {
    if (!scrollContainerRef.current || !stageRef.current) return;

    const { destroy } = createGatewayScrollTimeline({
      container: scrollContainerRef.current,
      stage: stageRef.current,
      gatewayScene: sceneRef.current,
      gatewayBg: bgRef.current,
      letterMesh: letterMeshRef.current,
      gatewayOverlay: overlayRef.current,
      darkOverlay: darkOverlayRef.current,
      heroNav: navRef.current,
      heroEventInfo: eventInfoRef.current,
      heroActions: actionsRef.current,
      heroTagline: taglineRef.current,
      heroTitle: titleRef.current,
      hackLine: hackRef.current,
      forGoodLine: forGoodRef.current,
    });

    return () => {
      destroy();
    };
  }, []);

  return (
    <section
      ref={scrollContainerRef}
      className="gateway-scroll relative w-full h-[260vh] md:h-[300vh] lg:h-[350vh] bg-[#07080a] select-none"
      aria-label="Hack for Good Gateway Experience"
    >
      <div
        ref={stageRef}
        className="gateway-stage relative w-full h-[100svh] min-h-[100svh] overflow-hidden"
      >
        {/* =========================================================
            GATEWAY SCENE (Ancient Architecture & Cinematic Letter Mesh)
            ========================================================= */}
        <GatewayScene
          ref={sceneRef}
          bgRef={bgRef}
          decorRef={decorRef}
          navRef={navRef}
          eventInfoRef={eventInfoRef}
          letterMeshRef={letterMeshRef}
          titleRef={titleRef}
          overlayRef={overlayRef}
          darkOverlayRef={darkOverlayRef}
          hackRef={hackRef}
          forGoodRef={forGoodRef}
          taglineRef={taglineRef}
          actionsRef={actionsRef}
          onOpenApplyModal={onOpenApplyModal}
          onOpenChallengeModal={onOpenChallengeModal}
        />
      </div>
    </section>
  );
};

export default Hero;
