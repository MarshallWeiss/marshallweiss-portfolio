# Unified Experiments Band Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Demote the four-track recorder from a homepage feature to one of two compact independent experiments, while giving Lapidarium a cleaner, legible specimen artwork.

**Architecture:** Replace the consecutive `experiment-section` and `crystal-section` blocks in `app/page.tsx` with one `experiments-section`. It contains one shared heading and two unequal links: a compact dark recorder card and a larger lavender Lapidarium card. Keep the existing external destinations and `LapidariumArtwork` as the reusable visual primitive, but simplify its feature rendering for the new card.

**Tech Stack:** Next.js App Router, React, `next/image`, scoped CSS in `styles/portfolio.css`.

---

### Task 1: Establish the unified semantic structure

**Files:**
- Modify: `app/page.tsx`

**Step 1: Replace the two standalone experiment sections**

Remove the full-width recorder feature and the following standalone Lapidarium section. Add one `section.experiments-section` containing:

```tsx
<div className="experiments-heading">
  <div>
    <h2>Independent experiments.</h2>
    <p>Small products and systems made away from the newsroom.</p>
  </div>
  <Link className="text-link" href="/current">What I’m making <ArrowUpRight ... /></Link>
</div>
<div className="experiments-grid">
  <a className="experiment-card experiment-card--recorder" ...>...</a>
  <a className="experiment-card experiment-card--lapidarium" ...>...</a>
</div>
```

**Step 2: Keep interactions and destinations intact**

- Recorder uses `recorder?.url || '/current'` with the existing new-tab behavior.
- Lapidarium still targets `https://lapidarium.vercel.app` in a new tab.
- Both have descriptive `aria-label`s.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "Unify homepage experiments into one supporting section"
```

### Task 2: Rework the experiment visual hierarchy

**Files:**
- Modify: `styles/portfolio.css`

**Step 1: Remove obsolete standalone-section rules**

Delete or replace the old `.experiment-section`, `.experiment-grid`, `.experiment-copy`, `.recorder-rings`, `.recorder-caption`, `.crystal-section`, and `.crystal-copy` layout rules. Retain shared `.light-button` and `.primary-button` rules.

**Step 2: Add asymmetric card layout**

```css
.experiments-section { padding-block: 92px; }
.experiments-grid { display: grid; grid-template-columns: .82fr 1.18fr; gap: 24px; }
.experiment-card { min-height: 390px; border-radius: 8px; overflow: hidden; }
```

- Recorder uses dark green only inside its card, with an approximately 300px-wide interface image, no circular rings, no product-manifesto scale headline, and a concise link label.
- Lapidarium uses the existing lavender field, larger composition, and minimal explanatory copy.
- Use only the existing palette and typefaces; no new labels, gradients, shadows, or decorative framing.

**Step 3: Add responsive composition**

At `max-width: 760px`, stack cards, preserve the recorder before Lapidarium, reduce card min-height, and ensure no horizontal overflow at 320px.

**Step 4: Commit**

```bash
git add styles/portfolio.css
git commit -m "Reduce recorder prominence in experiments band"
```

### Task 3: Repair Lapidarium artwork for the compact card

**Files:**
- Modify: `components/LapidariumArtwork.tsx`
- Modify: `styles/portfolio.css`

**Step 1: Make the feature artwork a simple specimen plate**

Keep one amethyst. Preserve the small wordmark and one line-drawing study, but remove any visual ambiguity between the wordmark, caption, and mineral: the line study stays as a faint left-side reference while the mineral occupies the right two-thirds.

**Step 2: Add a card-specific artwork variant**

Use a `variant="card"` prop rather than overloading `compact`. The card treatment has enough room for the wordmark, one clear specimen label, and a proportionate mineral. Continue using `compact` only for the 80px Current thumbnail.

**Step 3: Respect accessibility and motion settings**

- Artwork remains `aria-hidden` because the parent link describes it.
- Hover movement stays limited to a slight mineral rotation/translation.
- `prefers-reduced-motion` restores the resting transform.

**Step 4: Commit**

```bash
git add components/LapidariumArtwork.tsx styles/portfolio.css
git commit -m "Clarify Lapidarium specimen artwork"
```

### Task 4: Verify and ship

**Files:**
- Verify: `app/page.tsx`, `components/LapidariumArtwork.tsx`, `styles/portfolio.css`

**Step 1: Build and lint with no dev server running**

```bash
npm run lint
npm run build
```

Expected: no errors; existing warnings may remain.

**Step 2: Start one development server after the build**

```bash
npm run dev
```

Expected: homepage renders with exactly two experiment links, one shared heading, and no standalone recorder or Lapidarium sections.

**Step 3: Verify desktop and mobile**

- At 1440px: recorder is visibly subordinate to the larger Lapidarium card and neither rivals Selected work.
- At 375px and 320px: cards stack without overflow; CTAs remain tappable.
- Keyboard focus reaches both cards; reduced-motion leaves both in resting state.

**Step 4: Final commit and deploy only with user approval**

```bash
git push origin main
```

