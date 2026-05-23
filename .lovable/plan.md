

## Advanced Neo-Brutalist Scroll Animations for Homepage

### Overview

This plan assigns a distinct, high-impact animation style to each homepage section (top to bottom), plus a complete hero text animation overhaul using typewriter, text scramble, and mask reveal effects -- all following the neo-brutalist theme.

---

### Homepage Section Map (Top to Bottom)

```text
1. HeroSection         -> Typewriter + Text Scramble + Text Reveal Mask + Word Stagger + Letter Stagger
2. StatsBar            -> Staggered Reveal (items animate sequentially)
3. Selected Work       -> Cascade Animation (header + cards cascade in with offset delays)
4. BentoSkillGrid      -> Text Line Reveal (section title) + directional slide (cards - already exists)
5. ProcessTimeline     -> Scroll-Linked Timeline (progress line tied to scroll position)
6. Testimonial         -> Character-by-Character Reveal (already exists, enhance with scramble effect)
7. CTA Section         -> Pinned Section Animation (scale up + text reveal on scroll entry)
8. Footer              -> Scroll Scrubbing (opacity + translateY tied to scroll progress)
```

---

### Part 1: Hero Section Text Animations

Create new animation components and rework the HeroSection:

**New component: `TypewriterText.tsx`**
- Types out text character by character with a blinking neo-brutalist cursor (a thick block cursor with border)
- Used for the badge text "Software Architect x IoT Innovator"
- Configurable speed, delay, and cursor style

**New component: `TextScramble.tsx`**
- Scrambles random characters before resolving to final text
- Characters cycle through uppercase symbols/letters before settling
- Used for the subtitle/description paragraph
- Neo-brutalist feel: uses monospace-style scramble characters

**New component: `TextRevealMask.tsx`**
- Text slides up from behind a clipping mask (overflow hidden container)
- Each line reveals independently with staggered timing
- Used for the main H1 heading ("Building the / Future, One / Line at a Time.")
- 3 lines, each sliding up with 0.15s stagger

**Word Stagger for CTA buttons**
- Buttons appear with word-level stagger (View + Work animate separately)

**Letter Stagger for Stats**
- Stat values ("50+", "3+", "20+") use letter-by-letter stagger entrance
- Labels use word stagger

**Files to create:**
- `src/components/TypewriterText.tsx`
- `src/components/TextScramble.tsx`
- `src/components/TextRevealMask.tsx`

**Files to modify:**
- `src/components/HeroSection.tsx` - Integrate all new hero text animations

---

### Part 2: Section Animations (Top to Bottom)

#### Section 2: StatsBar - Staggered Reveal
**File: `src/components/StatsBar.tsx`**
- Already has staggered count-up, enhance with:
- Each stat box slides up from different starting Y offsets (first: 60px, second: 40px, third: 20px)
- Add a horizontal line that draws across connecting stats
- Stat labels use text-line-reveal (clip mask slide up)

#### Section 3: Selected Work - Cascade Animation
**File: `src/pages/Index.tsx`** (Selected Work section)
- Section title cascades in from the left with clip-path reveal
- "View all" button cascades from right with delay
- FeaturedProject scales up from 0.85 with rotation correction
- ProjectCards cascade diagonally: each card offsets by (i * 30px) X and (i * 50px) Y with staggered timing
- Create a wrapper `CascadeContainer` and `CascadeItem` in a new component

**New file: `src/components/CascadeAnimation.tsx`**
- Reusable cascade wrapper with configurable direction and stagger

**File: `src/components/FeaturedProject.tsx`**
- Update entrance: scale from 0.85 + slight rotate(-1deg) + fade

**File: `src/components/ProjectCard.tsx`**
- Update entrance: cascade from bottom-right with increasing delays

#### Section 4: BentoSkillGrid - Text Line Reveal
**File: `src/components/BentoSkillGrid.tsx`**
- Section title "What I Build" uses TextRevealMask (line-by-line clip mask reveal)
- Keep existing directional slide animations for cards (already working well)

#### Section 5: ProcessTimeline - Scroll-Linked Timeline
**File: `src/components/ProcessTimeline.tsx`**
- The connecting line between steps becomes scroll-linked: its scaleX maps to scroll progress through the section (0% at section top, 100% at section bottom)
- Uses `useScrollSync` hook to get element-relative scroll progress
- Step nodes "pop" at specific scroll thresholds (step 1 at 25%, step 2 at 50%, step 3 at 75%)
- Each step's content fades in when its node activates
- The step number badge rotates in with a spring animation at its threshold

#### Section 6: Testimonial - Enhanced Character Reveal
**File: `src/components/Testimonial.tsx`**
- Keep existing CharacterReveal but add a subtle scramble effect before each character resolves
- Quote mark bounces in with spring physics
- Attribution slides up from mask

#### Section 7: CTA Section - Pinned Section Animation
**File: `src/pages/Index.tsx`** (CTA section)
- On scroll entry, the section scales from 0.9 to 1.0
- Text "Ready to build something?" uses TextRevealMask (lines slide up from mask)
- Button pulses once after text reveal completes
- Background gets a subtle parallax offset

#### Section 8: Footer - Scroll Scrubbing
**File: `src/components/Footer.tsx`**
- Footer opacity and Y position tied to scroll progress through the section
- Brand name letters stagger in
- Social icons cascade from right to left
- Copyright line draws in (border scaleX tied to scroll)

---

### Technical Details

**Animation timing guidelines (neo-brutalist feel):**
- Use sharp easing: `[0.22, 1, 0.36, 1]` for snappy reveals
- Keep `once: false` on all viewport triggers for bi-directional animation
- Durations: 0.3-0.6s for entrances, never slow/floaty
- Stagger delays: 0.05-0.15s between items

**Scroll-linked animations use:**
- `useSmoothScroll()` context for Lenis-synced `scrollY` MotionValue
- `useScrollSync()` hook for element-relative scroll progress
- `useTransform()` from framer-motion to map scroll to animation values

**New components summary:**
1. `src/components/TypewriterText.tsx` - Typewriter effect with block cursor
2. `src/components/TextScramble.tsx` - Character scramble resolve effect
3. `src/components/TextRevealMask.tsx` - Line-by-line clip mask reveal
4. `src/components/CascadeAnimation.tsx` - Cascade container + items

**Modified components:**
1. `src/components/HeroSection.tsx` - Full hero text animation overhaul
2. `src/components/StatsBar.tsx` - Enhanced staggered reveal
3. `src/pages/Index.tsx` - Cascade for Selected Work + Pinned CTA
4. `src/components/BentoSkillGrid.tsx` - TextRevealMask title
5. `src/components/ProcessTimeline.tsx` - Scroll-linked timeline
6. `src/components/Testimonial.tsx` - Enhanced character reveal
7. `src/components/FeaturedProject.tsx` - Cascade entrance
8. `src/components/ProjectCard.tsx` - Cascade entrance
9. `src/components/Footer.tsx` - Scroll scrubbing

