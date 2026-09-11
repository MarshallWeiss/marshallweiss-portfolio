# Portfolio Context

Running log of work sessions. Most recent at top.

---

## Recent Work (2026-09-10/11) — Session 14

### Astra Merge, Sanity Migration, Codex Writing Pass — All Deployed ✅
**Merged the codex/astra-portfolio redesign experiment into main selectively, moved the presentation copy it hardcoded into Sanity, reviewed and shipped Codex's writing/visual pass, and deployed both the portfolio and the music recorder.**

**Astra merge (`2eb6cc1`):**
- Took from `codex/astra-portfolio`: the long-form homepage with visible work, the redesigned footer, a real `/contact` page, split email/copy actions, nav a11y (aria-expanded, Escape + focus return, skip link, nested-route active state, Thoughts→Writing), route metadata with a title template, and `styles/portfolio.css`.
- Deliberately NOT taken: astra's `LazyBlock`/framer-motion removal, its forced `autoPlay={false}` on video blocks, and its `ConfidentialCard`/`ThoughtsFilter` rewrites (the blur + "Sorry, confidential!" tooltip were kept).
- Real bug fixes included: `MediaItem` called `useNextSanityImage` inside a ternary (rules-of-hooks violation); `BlockRenderer` used `Math.random()` for React keys; per-render `console.log`s on the case study page; the Figma capture script was loading on every production page view; Work listing `revalidate` was 5s.
- Kept `CustomCursor` but added a real fallback: it now sets `custom-cursor-ready` on `<html>` and `cursor: none` is scoped to that class, so the native pointer survives pre-hydration and JS failure.

**Sanity as source of truth (KEY DECISION):**
- Astra had hardcoded card copy in `lib/portfolio.ts` and made it *win* over Sanity, so editing a case study in Studio did nothing. Inverted this: Sanity fields win, the TS map is fallback-only (delete once every doc has its fields).
- Added to the `caseStudy` schema: `cardHeadline`, `cardCategory`, `accentColor`, `cardImageFit`, `displayOrder`, `overviewSummary`, `overviewEvidence`, `overviewEvidenceLabel`.
- Added `showInSectionNav` to `headingFields` (shared-fields.ts), replacing astra's regex match on headline text for the "On this page" nav.
- `displayOrder` replaced three duplicated slug-order lists (homepage, Work listing, prev/next).
- Seeded and published all 5 case studies with card + overview copy, and ticked section-nav entries on each.
- `revalidate` set to 60s (astra wanted 3600, which would mean an hour between publishing and seeing it).

**Sanity content published this session:**
- 4 new `workProject` docs for Current → Working (registered users, notification system, design system, UE course); old "Homepage Redesign" marked completed so it drops off.
- Reading: Zuboff marked `finished` (moves to Previously), new `currentlyReading` for **Empire of AI** by Karen Hao, cover uploaded via `npx @sanity/cli assets upload`.
- New `funProject` for **Lapidarium** (verified lapidarium.vercel.app is live, 79 stones) with the amethyst render as thumbnail.

**Codex writing/visual pass (`15fbeb1`, `8f302e8`) — reviewed, then committed:**
- Codex ran out of credits mid-Task-4; its pass report was never written. Verified here: lint + build clean, flag intact.
- All four essays cut back (Focus 1,725→1,023 words); descriptions rewritten in concrete first person.
- `scripts/article-images.mjs` rewritten to draw explicit per-article SVG compositions instead of seeded line art. 8 PNGs regenerated.
- `components/LapidariumArtwork.tsx` replaces the three floating minerals with one amethyst + outline study, shared by Home and Current.
- **Corrections made to the pass:** reverted its rename of "Focus Is the Tool: Working at an Agent's Pace"; fixed article pages appending the site name twice on top of the root title template.
- **KNOWN DEFECT, left by choice:** Codex dropped two citations from the Focus article — the University of Chicago "brain drain" study (`journals.uchicago.edu/doi/10.1086/691462`) and Cold Turkey. The article still makes the claim the study supported. One-line fix when wanted.
- The e-ink phone / Bigme passage is confirmed true (user told Codex), not fabricated.

**Personal essays published:**
- `lib/flags.ts` → `SHOW_PERSONAL_WRITING` gates BOTH the homepage "Thinking out loud" section and the Thoughts "Mine" tab. Previously these were separate, so hiding one still left the other linking to the essays. Currently `true`.

**Design fixes:**
- Working card on Current condensed 775px → 456px (title + company share a baseline row, tighter leading) to match its neighbours.
- All buttons unified at 4px via `--portfolio-button-radius` (header "Say hello" was a 30px pill, About CV buttons were `rounded-lg`).
- About CV buttons use `--portfolio-blue`; the name heading stays gray-900 with the other titles.
- Removed the "From the newsroom to the reader" footnote; it was also the only spacing before the recorder section, so `.selected-section` got explicit bottom padding.
- Bilingual line moved from the intro column to a `.hero-subtitle` under the headline.

**Music recorder (`f24e722` + submodule `21fc9ce`):**
- Codex's polish pass: waveform traces per channel strip, keyboard shortcuts + legend, mic init/error recovery, responsive layout, focus + reduced-motion. 15 source files, +904 lines.
- Deployed via `npm run deploy` (gh-pages, own repo `MarshallWeiss/music-recorder`, base `/music-recorder/`). This also published 4 earlier unpushed passes.

**Files Updated:** `app/page.tsx`, `app/about/page.tsx`, `app/current/page.tsx`, `app/contact/page.tsx`, `app/layout.tsx`, `app/thoughts/page.tsx`, `app/thoughts/[slug]/page.tsx`, `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx`, `components/Navigation.tsx`, `components/Footer.tsx`, `components/GetInTouchButton.tsx`, `components/PortfolioProject.tsx`, `components/LapidariumArtwork.tsx`, `components/CustomCursor.tsx`, `components/ThoughtsFilter.tsx`, `components/blocks/{BlockRenderer,LazyBlock,MediaItem}.tsx`, `lib/portfolio.ts`, `lib/flags.ts`, `sanity/schemas/{caseStudy.tsx,shared-fields.ts}`, `styles/{globals,portfolio}.css`, `scripts/article-images.mjs`, `content/thoughts/*.md`, `data/thoughts.json`, `public/images/thoughts/*.png`

**Build Status:** ✓ lint + build clean, 22 static pages. Both marshallweiss.com and marshallweiss.github.io/music-recorder deployed and verified live.

**Gotchas for next session:**
- **Do not run `npm run build` while a dev server is running** — it overwrites `.next` and the dev server 500s on every route until restarted. Cost real time twice this session. Stop the server first.
- Codex had a dev server on port 3002 against this same directory, fighting over `.next`. If work is split between Codex and Claude Code, give Codex its own worktree.
- `components/HomeNavigation.tsx` and `components/WorkCard.tsx` are now dead code (homepage and Work listing replaced). Left in place in case the hover-preview nav is wanted back.
- Several pieces of published copy are in a neutral assistant voice, not Marshall's: the Empire of AI description, the Lapidarium description, and the four Working entries. All Sanity fields, editable in Studio.

**Next up:** brainstorm/spitball sessions on philosophical topics in AI and AI research topics, then develop those into articles. Use the `spitballing` / `brainstorm` skills to explore, then `think-piece` or `write-article` to draft.

## Recent Work (2026-06-13) — Session 13

### Home Page Redesign Case Study + Figma Diagram Restyle + CV PDFs Live ✅
**Continued the El Confidencial home page redesign case study, restyled its architecture diagram in Figma to match the portfolio, and pushed updated CV PDFs to production.**

**Home Page Redesign Case Study (Sanity — DRAFT, not yet published):**
- Confirmed the in-flight draft `el-confidencial-home-page-redesign` (id `f792e4fd-...`, 20 modules) is saved server-side. Copy is essentially complete and follows voice rules (context-first framing, no em-dashes).
- Still TODO: ~20 media placeholders (`[Add screenshot/diagram…]`) need real assets; a screen-recording video upload in the draft's `images` field is stuck at `progress: 2` (never finished uploading).
- New article/idea backlog entries captured from this session: "What Google's Changes Mean for Publishers", "NYT Home Page Teardown", "EC brand design system" (in `content/articles/backlog.md`, `content/ideas/backlog.md`).

**Figma — Home Page Architecture Diagram (file `gLOcDHMNZt41pReZ5FwLvv`, node `30:7848`):**
- Frame is rotated −90° (authored horizontally); useful relationship: `visual_x = 1200 − local_y`, `visual_y = local_x`.
- Recolored the saturated rainbow palette into a muted warm-stone register matching the portfolio (`#F7F5F2` bg / `#3C3A37` ink). Each block category kept its own hue (e.g. Apertura→terracotta `#BE7257`, Issues→dusty blue `#AAC1CB`, branded→warm taupe `#8A7D6D`, ads→warm stone `#D7D0C4`, pills→ink `#3C3A37`). 114 fills remapped + frame bg. No text content changed.
- Applied uniform `cornerRadius: 6` to all 72 rectangles.
- Aligned the BALCÓN pill column to a single left edge (local y=810); shifted each pill's matching label by the same delta so labels stayed locked to pills.
- Left alone (would change meaning): ragged block right edges, slightly uneven row gaps.

**CV PDFs — pushed live (commit `eb26a09`):**
- Committed only `public/Marshall-Weiss-CV.pdf` + `public/Marshall-Weiss-CV-ES.pdf` (validated: PDF 1.7, single page, real EN/ES text). Deploys to production via Vercel on main.

**Preview hack — kept LOCAL, deliberately NOT committed:**
- `app/case-studies/[slug]/page.tsx` swaps to `previewClient.fetch` and `sanity/lib/previewClient.ts` (drafts perspective) so the unpublished draft can be previewed locally. Committing these would leak draft case studies to production.
- **Before the home page case study ships publicly: publish the Sanity draft, then revert the page.tsx hack and delete `previewClient.ts`.**

**Build Status:** ✓ CV PDFs pushed to main (Vercel redeploy). Case study draft still unpublished.

---

## Recent Work (2026-03-29) — Session 12

### Case Study Polish, CV Redesign, Resume PDFs ✅
**Improved checkout optimization case study in Sanity, created HTML resume templates, updated portfolio CV downloads:**

**Checkout Optimization Case Study (Sanity patches — draft, needs publish):**
- Found and recovered previous interview session from session logs (session 8b0d70fb, March 1-15)
- Fixed Apple Pay slide copy — was incorrectly labeled "least-used," corrected to "surprisingly popular among older users"
- Rewrote takeaways cards to be specific: buy button visibility, Stripe switch, Piano constraints
- Merged outcomes + takeaways into single "Outcomes & Takeaways" block with 6 cards
- Updated hero intro with team context (~3 months, 2 designers, 2 devs)
- Added 4.6% conversion stat as prominent card instead of buried in description
- Published draft during session

**Case Study Markdown Exports:**
- Created `content/case-studies/` directory with markdown exports of all 4 case studies
- Files: `checkout-optimization.md`, `el-confidencial-cms.md`, `paywall-redesign.md`, `jarvis-design-system.md`
- Purpose: uploadable to Claude Cowork for job search tooling

**HTML Resume Redesign:**
- Built new CV in HTML at `/Users/mweiss/Desktop/Job Search/cv/`
- Explored two layout variants (A: minimal changes, B: structural rearrangement) — chose A
- Final design: Instrument Sans body font, PP Right Slab for name, warm stone color palette matching portfolio
- Tools/Skills as chip/pill layout, Languages moved to header, About full-width at bottom
- A4 page size, print-optimized with `@page` styles
- Created English (`marshall-weiss-cv-en.html`) and Spanish (`marshall-weiss-cv-es.html`) versions
- Updated tagline to remove journalism-specific framing for broader job search

**Portfolio CV Downloads Updated:**
- Replaced English PDF in `public/Marshall-Weiss-CV.pdf`
- Added new Spanish PDF at `public/Marshall-Weiss-CV-ES.pdf`
- Updated about page download link for Spanish CV (fixed space-in-filename issue)
- Removed old `public/Marshall Weiss CV_ES.pdf`

**Files Modified:**
- `app/about/page.tsx` — Spanish CV download link updated
- `public/Marshall-Weiss-CV.pdf` — replaced with new English CV
- `public/Marshall-Weiss-CV-ES.pdf` — new Spanish CV
- `content/case-studies/*.md` — 4 new markdown exports

**Future TODO:**
- Sync about page work experience content with new CV descriptions
- Continue case study improvements (Paywall, Design System still need depth)

**Build Status:** ✓ Deployed to Vercel on main

---

## Recent Work (2026-03-21)

### Typography, Homepage, About, Footer, and UI Polish ✅

**Font exploration:**
- Attempted swap from Instrument Sans → Neue Montreal (local OTF files added to `public/fonts/`)
- Reverted back to Instrument Sans — Neue Montreal felt too thin at Book/400, Medium (500) felt too heavy; no good intermediate weight
- Neue Montreal font files remain in `public/fonts/` for future use

**Homepage:**
- Updated tagline to sans-serif font, removed colored spans from keywords
- Renamed "Case Studies" → "Work" in nav and homepage navigation
- Updated tagline copy: "Designing, building, and shipping thoughtful products."
- Removed period from main h1 title

**About page:**
- Work experience items now use card layout (bg-white/40, border, rounded-lg)
- Period/date moved inline (right-aligned), separator changed from `|` to `·`
- Added bilingual CV download buttons with flag emojis (🇺🇸 / 🇪🇸)
- Spanish CV file: `public/Marshall Weiss CV_ES.pdf`
- Bumped "About Me" body text from text-sm → text-base

**Navigation & Footer:**
- Darkened inactive nav links: stone-400 → stone-500
- Nav border changed to border-stone-900/10 (works better on colored backgrounds)
- Work experience dates darkened: gray-400 → gray-500
- Footer extracted to client component (`components/Footer.tsx`)
- Footer border/text matches nav (border-stone-900/10, text-stone-500)
- Email in footer now copies to clipboard with toast on click
- LinkedIn text replaced with LinkedIn isotype SVG

**Thoughts page:**
- Added "Thoughts" h1 above the Mine/Others tabs
- Tab border updated to match nav style (border-stone-900/10)

**Files Modified:**
- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `components/Navigation.tsx`
- `components/Footer.tsx` (new)
- `components/ThoughtsFilter.tsx`
- `components/PageBackground.tsx`
- `styles/globals.css`
- `public/fonts/PPNeueMontreal-*.otf` (6 files, unused but retained)
- `public/Marshall Weiss CV_ES.pdf` (new)
- `content/design/portfolio-research.md` (new — portfolio inspiration notes)

**Build Status:** ✓ Deployed to Vercel on main
