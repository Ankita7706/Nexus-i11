/**
 * Editorial content for the Cinematic Media Section
 */

export interface MediaContent {
  act: string;
  chapter: string;
  eyebrow: string;
  primaryTitle: string;
  secondaryTitle: string;
  description: string;
  location: {
    city: string;
    country: string;
    coordinates: string;
  };
  bottomBar: {
    frameId: string;
    actionLabel: string;
    durationLabel: string;
    tagline: string;
  };
  metrics: Array<{
    label: string;
    value: string;
  }>;
}

export const mediaContent: MediaContent = {
  act: 'ACT 02',
  chapter: 'CHAPTER 02',
  eyebrow: 'ACT 02 // THE MOVEMENT',
  primaryTitle: 'HACK FOR GOOD',
  secondaryTitle: 'IDEAS BECOME ACTION.',
  description: 'Turn bold ideas into technology that creates real-world impact.',
  location: {
    city: 'BHUBANESWAR',
    country: 'INDIA',
    coordinates: '20°17\'46"N · 85°49\'28"E',
  },
  bottomBar: {
    frameId: 'FRAME 02',
    actionLabel: 'PLAY FILM',
    durationLabel: '00:00 / 01:24',
    tagline: 'A BRIGHTER TOMORROW // HACK FOR GOOD',
  },
  metrics: [
    { label: 'SELECTED SQUADS', value: '120 TEAMS' },
    { label: 'CRUCIBLE WINDOW', value: '48 HRS' },
    { label: 'FIELD DIRECT', value: '100% OPEN' },
  ],
};

export default mediaContent;
