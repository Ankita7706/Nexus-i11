import React, { forwardRef } from 'react';
import HeroBackground from '../hero/HeroBackground';
import HeroDecorations from '../hero/HeroDecorations';
import HeroNavigation from '../hero/HeroNavigation';
import HeroEventInfo from '../hero/HeroEventInfo';
import GatewayOverlay from './GatewayOverlay';
import LetterMesh from './LetterMesh';

interface GatewaySceneProps {
  className?: string;
  bgRef?: React.Ref<HTMLDivElement>;
  decorRef?: React.Ref<HTMLDivElement>;
  navRef?: React.Ref<HTMLElement>;
  eventInfoRef?: React.Ref<HTMLDivElement>;
  letterMeshRef?: React.Ref<HTMLDivElement>;
  titleRef?: React.Ref<HTMLHeadingElement>;
  overlayRef?: React.Ref<HTMLDivElement>;
  darkOverlayRef?: React.Ref<HTMLDivElement>;
  hackRef?: React.Ref<HTMLDivElement>;
  forGoodRef?: React.Ref<HTMLDivElement>;
  taglineRef?: React.Ref<HTMLParagraphElement>;
  actionsRef?: React.Ref<HTMLDivElement>;
  onOpenApplyModal?: () => void;
  onOpenChallengeModal?: () => void;
}

/**
 * GatewayScene component.
 * 
 * Preserves the complete gateway architecture and atmosphere.
 * Scaled uniformly during the cinematic scroll approach without stretching or distortion.
 */
export const GatewayScene = forwardRef<HTMLDivElement, GatewaySceneProps>(
  (
    {
      className = '',
      bgRef,
      decorRef,
      navRef,
      eventInfoRef,
      letterMeshRef,
      titleRef,
      overlayRef,
      darkOverlayRef,
      hackRef,
      forGoodRef,
      taglineRef,
      actionsRef,
      onOpenApplyModal,
      onOpenChallengeModal,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-scene="gateway"
        className={`absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden ${className}`}
      >
        {/* 1. Preserved Gateway Artwork Foundation */}
        <HeroBackground ref={bgRef} />

        {/* 2. Atmospheric & Fire Bowl Flickering Overlay */}
        <GatewayOverlay ref={overlayRef} darkOverlayRef={darkOverlayRef} />

        {/* 3. Indian Geometric & Tribal Motifs */}
        <HeroDecorations ref={decorRef} />

        {/* 4. Understated Cinematic Navigation */}
        <HeroNavigation ref={navRef} onRegisterClick={onOpenApplyModal} />

        {/* 5. Independent Event Info (Upper-Right) */}
        <div className="absolute top-18 sm:top-20 md:top-24 right-4 sm:right-8 md:right-12 z-30 pointer-events-auto">
          <HeroEventInfo ref={eventInfoRef} />
        </div>

        {/* 6. Optical Center Typography Mesh */}
        <LetterMesh
          ref={letterMeshRef}
          titleRef={titleRef}
          hackRef={hackRef}
          forGoodRef={forGoodRef}
          taglineRef={taglineRef}
          actionsRef={actionsRef}
          onExploreClick={onOpenChallengeModal}
          onRegisterClick={onOpenApplyModal}
        />

        {/* 7. Bottom Spacer for Steps & Fire Bowls Visibility */}
        <div className="h-10 sm:h-14 md:h-16 w-full pointer-events-none" />
      </div>
    );
  }
);

GatewayScene.displayName = 'GatewayScene';
export default GatewayScene;
