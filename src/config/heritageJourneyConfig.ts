/**
 * Centralized Configuration for the Continuous Heritage Journey Experience
 * 
 * Artwork: /assets/heritage-bridge.webp (865 x 1818 vertical illustration)
 * Visual journey progression across TWO PANELS:
 * 1. .heritage-panel--future: "ACT 01 / THE MANIFESTO" (Modern City & Movement Bridge at top)
 * 2. .heritage-panel--roots: "ACT 01 / THE CHALLENGE" (Indian Tribal Mural & Odisha Temple Roots at bottom)
 */

export interface HeritageJourneyConfig {
  artwork: {
    src: string;
    altText: string;
    aspectRatio: string;
    desktopWidth: string;
    tabletWidth: string;
    mobileWidth: string;
  };
  translation: {
    sectionOneStart: number; // yPercent
    transitionMid: number;   // yPercent
    sectionTwoEnd: number;   // yPercent
  };
  sectionHeights: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  masks: {
    topFade: string;
    bottomFade: string;
    sideFade: string;
  };
  mobileOverrides: {
    reduceParallax: boolean;
    artworkWidth: string;
  };
}

export const heritageJourneyConfig: HeritageJourneyConfig = {
  artwork: {
    src: '/assets/heritage-bridge.webp',
    altText: 'Hack For Good Continuous Heritage Journey - From Modern City through Tribal Murals to Odisha Temple Roots',
    aspectRatio: '865/1818',
    desktopWidth: '54vw',
    tabletWidth: '72vw',
    mobileWidth: '92vw',
  },
  translation: {
    sectionOneStart: 0,     // Top of artwork (Modern City)
    transitionMid: -22,     // Middle of artwork (Mural & Tribal region)
    sectionTwoEnd: -42,     // Bottom of artwork (Odisha Temple & Heritage)
  },
  sectionHeights: {
    desktop: 'min-h-[100svh]',
    tablet: 'min-h-[100svh]',
    mobile: 'min-h-[90svh]',
  },
  masks: {
    topFade: 'linear-gradient(to bottom, #07080a 0%, transparent 16%)',
    bottomFade: 'linear-gradient(to top, #07080a 0%, transparent 16%)',
    sideFade: 'linear-gradient(to right, #07080a 0%, transparent 8%, transparent 92%, #07080a 100%)',
  },
  mobileOverrides: {
    reduceParallax: true,
    artworkWidth: '92vw',
  },
};

export default heritageJourneyConfig;
