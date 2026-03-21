# Portfolio Context

Running log of work sessions. Most recent at top.

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
