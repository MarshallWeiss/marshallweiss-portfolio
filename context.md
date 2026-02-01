# context.md

Session context for continuing work on this project.

## Current Branch

`antigravity-sanity-work` - Building out Sanity CMS integration for case studies

## Recent Work (2026-02-01)

### Documentation & Planning
- Created comprehensive project audit (`docs/PROJECT_AUDIT.md`)
- Created PRD for portfolio evolution (`docs/PRD.md`) with 5 phases:
  1. Case Study Migration (current focus)
  2. Theming Foundation
  3. Experiments Section
  4. AI Article System
  5. Writing Style Training
- Updated `CLAUDE.md` with architecture overview and skills documentation

### Content Workflow
- Set up idea backlogs:
  - `content/ideas/backlog.md` - Article ideas
  - `content/experiments/backlog.md` - Experiment ideas
- Created skills for quick capture:
  - `/idea <text>` - Add article idea to backlog
  - `/experiment <text>` - Add experiment idea to backlog
- First experiment idea captured: "Visual Poetry Generator"

### Sanity Schema & Blocks
- Added new block types:
  - **SideBySideImages** (`sideBySideImages`) - Two images side by side with optional labels, gray/white background, stacks on mobile
  - **ContentCards** - Already existed, added to Checkout case study
  - **Comparison** - Already existed, added to Checkout case study
- Updated **SplitMedia** block:
  - Now supports multiple images side by side via `images` array field
  - Backward compatible with single `image` field
  - Multiple images display in 2-column grid on media side
- Deployed schema updates to Sanity cloud

### Case Study Migration
- Working on "Checkout Optimization" case study migration
- Added missing blocks via Sanity API:
  - Comparison block for Before/After
  - 2 additional splitMedia blocks for Key Changes
  - ContentCards block for Takeaways (3 cards)
- Structure complete, needs images to be uploaded in Studio

## Recent Commits

- `bda21b5` Add Sanity components, new block components, and gallery utilities
- `47e151f` Update case study schema and add BackgroundVideo block component
- `06ff49b` Initial commit: Portfolio with Sanity CMS integration

## Uncommitted Changes

**Modified:**
- `app/case-studies/[slug]/page.tsx` - Case study detail page
- `components/blocks/BlockRenderer.tsx` - Added SideBySideImages routing
- `components/blocks/SplitMedia.tsx` - Updated to support multiple images
- `components/blocks/Carousel.tsx`, `Comparison.tsx`, `FullWidthMedia.tsx`, `Hero.tsx`, `Metadata.tsx` - Block components
- `sanity/schemas/caseStudy.tsx` - Added sideBySideImages block, updated splitMedia with images array
- `styles/globals.css` - Global styles

**New (untracked):**
- `docs/` - PROJECT_AUDIT.md and PRD.md
- `content/ideas/` - Article ideas backlog
- `content/experiments/` - Experiment ideas backlog
- `.claude/skills/idea/` and `.claude/skills/experiment/` - Quick capture skills
- `CLAUDE.md` - Project guidance for Claude Code
- `components/blocks/AnnotatedImage.tsx` - Hotspot annotation block
- `components/blocks/SideBySideImages.tsx` - Two-image side-by-side block
- `sanity/components/BlockConverter.tsx` - Block type conversion utility
- `sanity/components/HotspotImageInput.tsx` - Custom hotspot placement input
- `dist/static/` - Sanity manifest files

**Deleted:**
- `sanity/schemas/caseStudy.ts` - Replaced by `.tsx` version

## Current State

### Block System (12 types)
1. hero - Page header with image
2. metadata - Case study info (role, client, year)
3. splitMedia - Text + image(s), now supports multiple images
4. mediaGrid - 1/2/3 column image gallery
5. fullWidthMedia - Full-width image or Mux video
6. carousel - Scrolling gallery with lightbox
7. accordion - Expandable content sections
8. contentCards - Card grid with text/bullets
9. backgroundVideo - Video background with overlay
10. comparison - Side-by-side image comparison slider
11. annotatedImage - Interactive hotspot annotations
12. sideBySideImages - Two images side by side (NEW)

### Case Studies
- **El Confidencial CMS** - Complete (17 modules)
- **Checkout Optimization** - Structure complete, needs images (16 modules)
- 2 more case studies to migrate from marshallweiss.com

## Next Steps

1. **Immediate**: User to add images to Checkout case study in Sanity Studio
2. **Phase 1 continuation**: Migrate remaining 2-3 case studies from marshallweiss.com
3. **Phase 2**: Extract design tokens (theming foundation)
4. **Phase 3**: Redesign experiments section
5. **Phase 4**: Build AI article pipeline with /idea skill integration

## Architecture Notes

- Next.js 14 with App Router
- Sanity CMS (project: uy7uyx0x, dataset: production)
- TypeScript throughout
- Tailwind CSS for styling
- Mux for video hosting
- Block-based content system with custom Sanity inputs
- Skills system for workflow automation (idea capture, etc.)
