# Hack for Good — Design System

## 1. Design Direction

Hack for Good is designed as a **dark, cinematic, editorial hackathon experience** with a strong visual connection between contemporary technology and Indian visual/cultural motifs.

The website should feel:

- cinematic
- bold
- youthful
- editorial
- immersive
- intentional

It should **not** feel like a generic AI/SaaS landing page.

Avoid:

- excessive neon
- pure-black cyberpunk styling
- generic glassmorphism
- oversized pill UI everywhere
- random gradients
- decorative blobs
- excessive cards
- fake statistics
- fake testimonials
- fake social proof
- unnecessary 3D elements
- text-scrambling or typewriter effects

The artwork should do most of the visual storytelling. Typography, spacing, and motion should support it rather than compete with it.

---

## 2. Core Visual Language

### Base Palette

Use a dark base rather than pure black.

```css
--bg: #111315;
--surface: #171A1D;
--surface-elevated: #1D2125;

--text-primary: #F1EEE7;
--text-secondary: #A9AAA5;
--text-muted: #70736F;

--accent: #D97745;
--accent-light: #E5A06F;

--border: rgba(241, 238, 231, 0.12);
```

The warm orange/terracotta accent should be used selectively for:

- labels
- primary CTAs
- active states
- small visual markers
- important interaction feedback

Do not turn the whole interface orange.

---

## 3. Typography

Use a strong display typeface for major headings and a clean sans-serif for supporting content.

Principles:

- Large display headings
- Tight heading line-height
- Clear hierarchy
- Generous whitespace
- Short paragraphs
- Controlled letter spacing
- Intentional line breaks for major statements

Do not use many different fonts.

Suggested hierarchy:

```text
Display
Large editorial section headings

Heading
Section titles / major UI headings

Body
Descriptions and supporting copy

Label
Small uppercase metadata such as:
01 / ABOUT
```

Major headings may use responsive sizing such as:

```css
font-size: clamp(...);
```

rather than fixed desktop-only sizes.

---

## 4. Layout Principles

### Grid

Use a consistent page grid and align major content to shared vertical guides.

### Whitespace

Negative space is a major part of the visual identity.

Do not fill every area with cards or decorations.

### Borders

Use thin, low-contrast borders to define structure.

### Cards

Cards should be used only when the content benefits from a bounded object.

Avoid turning every section into a grid of rounded cards.

### Buttons

Prefer compact rectangular or subtly rounded buttons.

Avoid oversized capsule/pill buttons unless a specific component requires them.

---

## 5. Hero Design

The Hero is the primary cinematic entry point.

The current visual direction uses a GTA-inspired illustrated cityscape with:

- people
- futuristic car
- sunset
- city skyline
- helicopter
- boats
- water
- palm trees

The artwork acts as the visual environment.

### Background

The image/video must span the complete Hero section.

Use a dedicated background layer:

```text
Hero
├── background media
├── optional subtle readability overlay
└── content
```

Do not place the background artwork inside the content grid.

### Hero Content

The content sits inside the visual safe area of the artwork.

Do not mathematically center everything without considering the artwork composition.

The content should remain clear of dense foreground objects.

### Hero Motion

Use subtle GSAP entrance animation.

The background video itself must not be moved by Lenis or GSAP.

The video frame must remain visually locked.

---

## 6. Hero Video Rules

When an animated background video is used:

The video must:

- be `position: absolute`
- cover the Hero
- use `object-fit: cover`
- remain independent from scroll animation
- autoplay
- be muted
- be inline
- loop
- remain stable during Lenis scrolling

Do not apply scroll-linked transforms to the video.

Do not manipulate `video.currentTime` from scroll callbacks.

Do not add a second smooth-scroll engine.

If a video appears jittery, first isolate it from GSAP/Lenis transforms and verify whether the motion instability is inside the source video itself.

---

## 7. About Section — Visual Journey

The About section uses a large cinematic artwork that acts as a visual narrative.

The intended visual journey is:

```text
CITY
  ↓
ROAD / JOURNEY
  ↓
TREE
  ↓
TRIBAL / FOLK ART
  ↓
TEMPLE
  ↓
NEXT SECTION
```

The artwork should feel like one continuous piece.

Do not turn it into a normal centered image card.

### Layout

The central visual should remain the major visual element.

Text belongs in the dark negative space around the artwork when the composition allows it.

Conceptually:

```text
LEFT TEXT      ARTWORK      RIGHT TEXT
```

Text should never cover important artwork details.

---

## 8. About Scroll Behavior

The About section can be taller than one viewport to create a storytelling journey.

The preferred model is:

```text
Long About Section
        ↓
Sticky Visual Viewport
        ↓
Artwork travels through viewport
        ↓
Text chapters reveal
        ↓
Artwork reaches final scene
        ↓
Next section
```

GSAP + ScrollTrigger should control the relationship between scroll progress and visual movement.

Lenis remains responsible for smooth page scrolling.

Avoid double pinning.

Do not create nested scrolling containers.

---

## 9. About Text Chapters

Use concise chapters rather than one large text wall.

Example structure:

### Chapter 01

```text
01 / ABOUT

ABOUT HACK
FOR GOOD
```

Followed by a short description based on confirmed event information.

### Chapter 02

```text
02 / BUILD

IDEAS INTO
ACTION
```

Use supporting copy that explains what participants build.

### Chapter 03

```text
03 / IMPACT

BUILD.
SOLVE.
IMPACT.
```

Text should reveal progressively as the artwork reaches different visual moments.

---

## 10. Scroll Reveal System

Use GSAP + ScrollTrigger for intentional reveals.

Preferred reveal:

```text
opacity: 0 → 1
y: 25–55px → 0
ease: power3.out
```

Use staggered motion for groups where appropriate.

Do not animate every element independently just because it can be animated.

Motion should establish hierarchy.

---

## 11. Parallax Rules

Parallax should be subtle.

Preferred hierarchy:

```text
Artwork movement = primary
Text movement    = secondary
Micro-interactions = tertiary
```

Avoid:

- large zooms
- strong perspective warping
- dramatic horizontal movement
- perpetual floating
- excessive scroll effects

The user should notice a sense of depth before noticing the technique.

---

## 12. Tracks / Challenges

Tracks should communicate what teams can build.

Keep content data-driven.

Example structure:

```text
01
AI & DATA
Short description

02
WEB & APP
Short description
```

Use an array/object for track content so adding a track does not require creating new markup.

Avoid unnecessary icons.

---

## 13. Timeline / How It Works

Use a clear sequence.

The current conceptual structure is:

```text
Registration
    ↓
Idea Submission
    ↓
Hackathon
    ↓
Final Demo
```

Use a horizontal timeline on larger screens and a vertical timeline on mobile.

The connector line can animate subtly.

---

## 14. Prizes

Use typography and hierarchy rather than excessive visual effects.

Example:

```text
01 / WINNER
02 / RUNNER UP
03 / BEST INNOVATION
```

Do not invent monetary values.

Keep organizer-supplied prize data separate from presentation logic.

---

## 15. Registration Page

Registration is functional UI, not another visual-effects showcase.

Use:

- clear field labels
- clear validation
- helpful error messages
- accessible controls
- obvious submit action
- loading state
- success state
- clear failure state

Required spam trap:

```text
website
```

Real users should never fill this field.

The form submits to:

```text
POST /api/register
```

---

## 16. Responsive Rules

The layout must be deliberately responsive.

Target widths:

```text
390px
430px
768px
1024px
1280px
1440px
1536px
1920px
```

Do not simply scale desktop down.

At mobile sizes:

- typography wraps intentionally
- navigation becomes compact
- imagery gets a safe crop
- text avoids important artwork
- buttons remain usable
- no horizontal overflow
- no hidden content caused by fixed positioning

Use `clamp()`, responsive grid, percentages, and breakpoint-specific rules where needed.

---

## 17. Accessibility

Always support:

- semantic HTML
- proper heading hierarchy
- keyboard navigation
- visible focus states
- accessible buttons
- descriptive labels
- sufficient contrast
- reduced-motion preference

Respect:

```js
window.matchMedia("(prefers-reduced-motion: reduce)")
```

For reduced motion:

- remove large movement
- reduce parallax
- show important content immediately
- avoid scroll-dependent animation where possible

---

## 18. Performance Rules

Because the site is frontend-heavy:

- Optimize large images.
- Prefer WebP/AVIF where practical.
- Compress background videos.
- Avoid unnecessary animation loops.
- Avoid layout-thrashing JavaScript.
- Use `transform` and `opacity` for animation where appropriate.
- Keep video playback independent from scroll.
- Avoid multiple animation libraries.
- Clean up GSAP contexts and listeners.

Large visual assets should not create avoidable layout shifts.

---

## 19. Content Rules

Never invent event information.

Do not add:

- fake participant numbers
- fake sponsor names
- fake judges
- fake prize amounts
- fake dates
- fake testimonials
- fake achievements

Use confirmed organizer information only.

When information is still undecided, use an explicit placeholder or leave the field empty rather than guessing.

---

## 20. Component Rules

Components should have one clear responsibility.

Recommended areas:

```text
components/
├── Navbar
├── Footer
├── Button
├── SectionLabel
├── Reveal
└── shared UI

sections/
├── Hero
├── About
├── Tracks
├── Timeline
├── Prizes
├── FAQ
└── Registration
```

Keep animation logic separate where it helps readability:

```text
animations/
├── heroAnimations.ts
├── aboutAnimations.ts
└── scrollSetup.ts
```

Do not put the entire site inside one giant component.

---

## 21. Design Anti-Patterns

Avoid the following unless there is a very specific design reason:

- Pure black everywhere
- Neon cyberpunk gradients
- Giant centered containers
- Excessive rounded cards
- Multiple competing accent colors
- Random icons
- Animated particles
- Giant glowing blobs
- Scrollbars used as decoration
- Constant background movement
- Text scrambling
- Typewriter headlines
- Excessive hover transformations
- Unnecessary 3D scenes
- Repeating decorative assets
- Fake data

The site should feel **art-directed, not generated**.

---

## 22. Design Principle

The core Hack for Good design equation is:

```text
STRONG ARTWORK
+
STRONG TYPOGRAPHY
+
NEGATIVE SPACE
+
CONTROLLED MOTION
+
SIMPLE INFORMATION
=
HACK FOR GOOD
```

When deciding between a simple, intentional solution and a flashy effect, prefer the solution that strengthens the story and preserves the visual hierarchy.
