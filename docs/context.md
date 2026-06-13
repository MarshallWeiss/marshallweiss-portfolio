# Portfolio Context

Running log of work sessions. Most recent at top.

---

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
