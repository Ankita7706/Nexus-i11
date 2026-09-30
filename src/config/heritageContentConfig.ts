/**
 * Centralized Configuration for the Continuous Heritage Journey Story Experience
 * 
 * Defines the editorial copy, positioning, and scroll progress ranges
 * across the 5 chronological narrative states.
 * 
 * Artwork: /gta6/abthfg.png
 */

export interface HeritageStoryState {
  id: string;
  number: string;
  title: string;
  quote: string;
  side: 'left' | 'right' | 'center';
  section: 'section-one' | 'section-two';
  range: {
    start: number;
    active: number;
    end: number;
  };
}

export interface HeritageContentConfig {
  artwork: {
    src: string;
    altText: string;
  };
  artworkScroll: {
    startYPercent: number; // Top (Modern City)
    endYPercent: number;   // Bottom (Odisha Temple Roots)
  };
  states: HeritageStoryState[];
}

export const heritageContentConfig: HeritageContentConfig = {
  artwork: {
    src: '/gta6/abthfg.png',
    altText: 'Continuous vertical illustration of the visual bridge from modern technology to Odisha temple roots',
  },
  artworkScroll: {
    startYPercent: 0,
    endYPercent: -48,
  },
  states: [
    {
      id: 'state-01',
      number: '01',
      title: 'THE FUTURE',
      quote: 'Technology moves forward.',
      side: 'left',
      section: 'section-one',
      range: {
        start: 0.00,
        active: 0.10,
        end: 0.20,
      },
    },
    {
      id: 'state-02',
      number: '02',
      title: 'THE CONNECTION',
      quote: 'Progress carries the stories that made us.',
      side: 'right',
      section: 'section-one',
      range: {
        start: 0.20,
        active: 0.30,
        end: 0.40,
      },
    },
    {
      id: 'state-03',
      number: '03',
      title: 'THE ROOTS',
      quote: 'Progress should remember where it came from.',
      side: 'left',
      section: 'section-two',
      range: {
        start: 0.40,
        active: 0.50,
        end: 0.60,
      },
    },
    {
      id: 'state-04',
      number: '04',
      title: 'THE BRIDGE',
      quote: 'Old foundations. New possibilities.',
      side: 'right',
      section: 'section-two',
      range: {
        start: 0.60,
        active: 0.70,
        end: 0.80,
      },
    },
    {
      id: 'state-05',
      number: '05',
      title: 'BUILD WHAT MATTERS.',
      quote: 'Carry the past forward. Build what comes next.',
      side: 'center',
      section: 'section-two',
      range: {
        start: 0.80,
        active: 0.90,
        end: 1.00,
      },
    },
  ],
};

export default heritageContentConfig;
