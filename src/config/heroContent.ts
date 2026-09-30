/**
 * Centralized Hero Configuration & Content.
 * Single source of truth for all editable text, navigation links,
 * event metadata, action buttons, and animation constants.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContentConfig {
  navigation: {
    brand: {
      name: string;
      tagline: string;
      mark: string;
      logoUrl: string;
    };
    links: NavLink[];
    cta: {
      label: string;
      action: string;
    };
  };
  eventInfo: {
    dates: string;
    monthYear: string;
    venue: string;
    city: string;
    edition?: string;
  };
  title: {
    primary: string;
    secondaryPrefix: string;
    secondarySuffix: string;
  };
  tagline: string;
  actions: {
    primary: {
      label: string;
      action: string;
    };
    secondary: {
      label: string;
      action: string;
    };
  };
  animation: {
    initialDelay: number;
    staggerNav: number;
    titleDuration: number;
    ease: string;
    mouseParallax: {
      bgStrength: number;
      titleStrength: number;
      decorStrength: number;
    };
    scroll: {
      titleEndScale: number;
      titleEndY: number;
      titleEndOpacity: number;
      meshVisibility: boolean;
      gatewayCameraMovement: boolean;
      modernWorldReveal: boolean;
    };
  };
}

export const heroContent: HeroContentConfig = {
  navigation: {
    brand: {
      name: 'HACK FOR GOOD',
      tagline: 'BHUBANESWAR',
      mark: 'HG',
      logoUrl: '/gta6/hfglogo.png',
    },
    links: [
      { label: 'ABOUT', href: '#manifesto' },
      { label: 'CHALLENGES', href: '#challenge' },
      { label: 'TRACKS', href: '#challenge' },
      { label: 'TIMELINE', href: '#builders' },
      { label: 'PRIZES', href: '#manifesto' },
      { label: 'FAQS', href: '#protocols' },
    ],
    cta: {
      label: 'REGISTER NOW →',
      action: 'register',
    },
  },

  eventInfo: {
    dates: '12 — 14',
    monthYear: 'DEC 2026',
    venue: 'SOA UNIVERSITY',
    city: 'BHUBANESWAR',
    edition: 'ANNUAL EDITION // CRUCIBLE',
  },

  title: {
    primary: 'HACK',
    secondaryPrefix: 'FOR',
    secondarySuffix: 'GOOD',
  },

  tagline: 'IDEAS TODAY. A BRIGHTER TOMORROW.',

  actions: {
    primary: {
      label: 'EXPLORE CHALLENGES →',
      action: 'explore',
    },
    secondary: {
      label: 'REGISTER NOW →',
      action: 'register',
    },
  },

  animation: {
    initialDelay: 0.1,
    staggerNav: 0.05,
    titleDuration: 1.15,
    ease: 'power3.out',
    mouseParallax: {
      bgStrength: 8,
      titleStrength: 0, // Text mouse movement disabled per user request
      decorStrength: 20,
    },
    scroll: {
      titleEndScale: 0.92,
      titleEndY: -140,
      titleEndOpacity: 0,
      meshVisibility: true,
      gatewayCameraMovement: true,
      modernWorldReveal: true,
    },
  },
};

export default heroContent;
