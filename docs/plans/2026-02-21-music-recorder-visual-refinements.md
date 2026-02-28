# Visual Refinements

## Overview

Elevate the skeuomorphic material quality to GarageBand-level polish, staying fully procedural (CSS gradients, shadows, SVG patterns — no texture images). The current foundation is solid but flat. The goal is depth, warmth, and the feeling that these are real physical materials lit by soft overhead light.

## Reference: GarageBand Aesthetic

- Rich, warm walnut wood with visible grain variation and subtle gloss
- Brushed aluminum with fine directional striations and soft highlights
- Deep recessed panels with ambient occlusion (shadow gradients at edges)
- Soft overhead lighting model — brighter at top, darker at bottom
- Controls that feel like they have weight and dimension
- Warm color temperature throughout (no cold grays)

## Material-by-Material Improvements

### Wood Panels (`texture-wood`)

**Current**: Simple vertical gradient with two layers of repeating lines. Reads as "brown stripe" more than wood.

**Target**: Convincing walnut with grain variation, knots suggestion, and clear coat sheen.

**Approach**:
- Add more gradient layers (5-7 total) with varying angles (82°-88°) to simulate natural grain that isn't perfectly vertical
- Introduce subtle color banding — walnut alternates between lighter sapwood and darker heartwood streaks
- Add a top-layer radial gradient for clear coat reflection (soft white highlight at ~30% from top, 5-8% opacity)
- Use CSS `filter: contrast(1.05)` to deepen the grain
- Slightly wider panels (48-56px instead of 40px) to give the grain more room to read
- Inner edge shadow should be softer and deeper — think the shadow where a wood panel meets a recessed metal face

### Brushed Metal (`texture-metal`)

**Current**: Diagonal gradient with faint horizontal lines. Reads as gray rather than metal.

**Target**: Convincing brushed aluminum with directional highlights that shift subtly.

**Approach**:
- Switch brush direction to pure horizontal (0°) — brushed aluminum has perfectly horizontal striations
- Increase the number of fine line layers (3-4 overlapping `repeating-linear-gradient`s at slightly different spacings: 1px, 1.5px, 2.5px)
- Add a broad highlight band using a radial gradient (soft white ellipse at top-center, ~8% opacity) to simulate overhead light reflecting off the curved metal surface
- Subtle warm tint — shift from the current neutral gray toward slightly warm silver (`#c4bdb0` range)
- Add `backdrop-filter: brightness(1.02)` or similar for a slight sheen

### Device Body (`texture-body`)

**Current**: Simple top-to-bottom gradient. Reads as flat beige.

**Target**: Warm cream plastic with the soft sheen of vintage Japanese audio equipment (TASCAM, TEAC).

**Approach**:
- Add a subtle noise texture using an inline SVG `<filter>` with `feTurbulence` — very fine grain, low opacity (2-3%). This breaks up the gradient smoothness and adds that plastic grain feel.
- Refine the lighting gradient — current gradient is too uniform. Add a brighter "shelf" near the top (as if lit from above) that falls off more dramatically.
- Deepen the bottom shadow gradient — the bottom 20% should be noticeably darker, suggesting the device's own shadow on a surface.
- Add a very subtle inner border/bevel where the body meets the wood panels — a 1px lighter line on the body side.

### VU Meters (`vu-face`)

**Current**: Dark radial gradient. Functional but basic.

**Target**: Deep, glassy meter face with the slight convexity of real VU meters.

**Approach**:
- Add a glass highlight — small radial gradient at top-left (~15% from edges), white at 3-5% opacity, simulating glass dome reflection
- Slightly more complex background — add a second radial gradient layer with warm amber tint at the center (very subtle, 2-3%) to simulate the warm glow of an illuminated meter
- The existing amber scale markings and needle are good — focus refinement on the "housing" around the meter
- Deepen the `shadow-vu-recess` — add a third shadow layer for a more convincing dish/recess effect

### Cassette Deck

**Current**: Dark plastic shell with basic tape reels. Decent but the shell could have more depth.

**Target**: Realistic cassette with the glossy-matte contrast of real tape shells.

**Approach**:
- Add a subtle gloss reflection on the top third of the cassette shell (linear gradient, white at 4-6% opacity, sharp falloff)
- The tape window area (between the reels) should have a slightly different material — darker, more transparent-looking, with an inner shadow suggesting depth behind the window
- Screw hole refinement — add a subtle chamfer effect (lighter ring around each screw hole)
- Label area: add a very faint paper texture (CSS noise) to the cream label background

### Knobs (`knob-body`)

**Current**: Radial gradient with off-center highlight. Good foundation.

**Target**: More convincing 3D sphere with edge definition.

**Approach**:
- Add a rim highlight — a thin bright ring (1px) at the edge of the knob, simulating edge-lit metal
- Darken the bottom-right quadrant more aggressively for stronger 3D modeling
- The indicator line should have a slight shadow beneath it (as if it's a groove, not a painted line)
- Add a very subtle inner ring gradient to suggest the knurled edge that real knobs have

### Transport Buttons

**Current**: Flat gradient buttons with basic shadows.

**Target**: Chunky, tactile buttons with clear pressed/released states and more physical presence.

**Approach**:
- More pronounced bevel — brighter top edge, darker bottom edge
- Add a subtle inner gradient (darker at top when "up", darker at bottom when pressed) to reinforce the 3D tilt
- The record button specifically should have a richer red — more depth in the gradient, almost like a ruby
- Button surface should have a very slight convex feel (radial gradient, lighter at center)

### Faders (`fader-slot`, `fader-thumb-texture`)

**Current**: Dark groove with ridged thumb. Functional.

**Target**: More defined groove with the metallic sheen of real fader caps.

**Approach**:
- Fader slot: add subtle side-wall highlights (thin lighter lines at edges of the groove)
- Fader thumb: add a brighter center stripe and darken the edges more — real fader caps have a pronounced center ridge
- Scale marks should be slightly more visible — currently very subtle

## Global Refinements

### Lighting Model

Apply a consistent overhead lighting assumption across all components:
- Top surfaces: brighter
- Bottom surfaces: darker
- Left edges: slightly lit (assuming light from top-left)
- Right edges: slightly shadowed
- This should be subtle but consistent — currently some components have different light directions

### Shadow Depth

The current shadows are functional but could be more layered. Real objects cast:
- A tight, dark contact shadow (small blur, high opacity)
- A broader ambient shadow (large blur, low opacity)
- Currently most elements use single-layer shadows. Adding a second layer to key elements (knobs, buttons, meter recesses) would add significant depth.

### Color Temperature

Warm everything slightly. The current palette has some elements that skew too neutral/cool. Target a cohesive warm temperature across:
- Metals: warm silver, not cool gray
- Shadows: warm dark brown (`rgba(20,15,5,0.x)`), not pure black (`rgba(0,0,0,0.x)`)
- Highlights: warm white (`rgba(255,250,240,0.x)`), not pure white

### Spacing & Proportions

- Increase padding around the mixer section slightly — currently feels a bit cramped
- The cassette deck could use a touch more vertical breathing room
- Transport buttons could be slightly larger for more physical presence

## Implementation Strategy

This is iterative visual work — not a single PR. Approach:

1. **Pass 1: Global** — Update shadow colors to warm, add consistent lighting direction, refine color temperature
2. **Pass 2: Wood + Metal** — The two largest surface areas. Getting these right sets the tone.
3. **Pass 3: Controls** — Knobs, faders, buttons. These benefit from the improved surfaces behind them.
4. **Pass 4: Details** — VU meters, cassette, LEDs, labels. Polish pass.

Each pass should be visually reviewed before moving to the next.

## Future: Tape Customization

Not MVP, but a natural evolution of the visual work:

- **Cassette shell styles**: Selectable tape designs modeled after real cassettes — TDK SA (white shell, blue label), Maxell XLII (clear shell, gold label), Sony HF (dark gray, red label), etc. Each would be a different set of CSS gradients for the shell, label color, and window tint.
- **Reel-to-reel mode**: An alternate visual mode where the cassette deck is replaced by a reel-to-reel tape transport. Larger spinning reels, visible tape path between them, different form factor. This would be a significant UI variant but the audio engine stays the same.
- **Tape type affects aesthetic only** — no audio processing differences. Purely visual personality.

These build naturally on the cassette deck refinements in the MVP pass.

## Files to modify

- `src/styles/index.css` — All texture classes, shadow refinements, new CSS patterns
- `tailwind.config.js` — Updated shadow definitions, color temperature shifts
- Individual component files — Inline style adjustments where gradients are defined in JSX rather than CSS classes
