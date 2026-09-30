/**
 * Central design tokens & constants for Hack for Good.
 * Single source of truth for typography, colors, spacing, and event metadata.
 */

export const EVENT_DETAILS = {
  name: 'HACK FOR GOOD',
  brandMark: 'HG',
  logoUrl: '/gta6/hfglogo.png',
  tagline: 'Technology • Innovation • Impact',
  headline: 'BUILD SOMETHING THAT MATTERS.',
  supportingText:
    'A technology hackathon where bold ideas become working solutions for real-world problems.',
  dates: 'OCTOBER 24–26, 2026',
  location: 'BHUBANESWAR, INDIA',
  campus: 'BHUBANESWAR CAMPUS',
  coordinates: '20.2961° N, 85.8245° E',
  duration: '36–48 HOURS',
  cohort: '500+ BUILDERS · 120 SQUADS',
  grantPool: '$1,200,000 DIRECT',
  primaryCta: 'REGISTER NOW',
  secondaryCta: 'EXPLORE THE CHALLENGES',
} as const;

export const CHALLENGE_TRACKS = [
  {
    id: 'climate-mesh',
    number: '01',
    title: 'Autonomous Climate & Disaster Mesh',
    description:
      'Air-gapped sensor relays, off-grid telemetry, and decentralized humanitarian logistics deployed under real-world constraints.',
    tags: ['Decentralized Networks', 'Hardware Telemetry', 'Zero-WAN'],
  },
  {
    id: 'public-infra',
    number: '02',
    title: 'Open Public Infrastructure',
    description:
      'Verifiable civil compute platforms, transparent resource distribution protocols, and fault-tolerant municipal tooling.',
    tags: ['Public Goods', 'Verifiable Systems', 'Open Source'],
  },
  {
    id: 'health-logistics',
    number: '03',
    title: 'Decentralized Health Logistics',
    description:
      'Zero-knowledge supply custody, localized triage routing, and cold-chain monitoring across volatile physical environments.',
    tags: ['Healthcare Resilience', 'Distributed State', 'Field Deployable'],
  },
  {
    id: 'offline-education',
    number: '04',
    title: 'Resilient Offline Knowledge Networks',
    description:
      'Peer-to-peer educational nodes and localized knowledge repositories engineered for intermittent connectivity.',
    tags: ['P2P Storage', 'Knowledge Preservation', 'Edge Compute'],
  },
] as const;

export const TYPOGRAPHY = {
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Plus Jakarta Sans', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
} as const;

export const COLORS = {
  backgroundDark: '#07080a',
  surfaceDark: '#090a12',
  surfaceElevated: '#111218',
  textPrimary: '#ededed',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',
  accentAmber: '#f59e0b',
  accentPeach: '#ffd3dd',
  accentRose: '#fee2e2',
  borderSubtle: 'rgba(255, 255, 255, 0.1)',
  borderMedium: 'rgba(255, 255, 255, 0.18)',
} as const;
