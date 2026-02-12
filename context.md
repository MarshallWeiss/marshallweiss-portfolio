# context.md

Session context for continuing work on this project.

## Current Branch

`antigravity-sanity-work` - Building out Sanity CMS integration for case studies

## Recent Work (2026-02-04)

### Carousel Component Enhancements ✅
**Added extensive customization options to the Carousel block:**

**New Features:**
1. **Slides Per View** - Control how many slides display at once:
   - 1 (Lightbox Style - Largest) - Full-width single images
   - 2 (Large) - Default 500px slides
   - 3 (Medium) - 350px slides
   - 4 (Compact) - 280px slides

2. **Vertical Alignment** - Control image vertical positioning:
   - Top
   - Center (default)
   - Bottom

3. **Arrow Position** - Choose arrow placement:
   - Overlapping Images (default) - Arrows positioned over images with shadow
   - Outside Images - Arrows in flex layout, best with contained/wide widths

4. **Infinite Loop** - Continuous scrolling behavior:
   - When enabled: arrows loop back to start/end instead of disabling
   - When disabled (default): arrows disable at boundaries

**Schema Updates (sanity/schemas/caseStudy.tsx):**
- Added `slidesPerView` field with 4 radio options
- Added `verticalAlign` field (top/center/bottom)
- Added `arrowPosition` field (overlapping/outside)
- Added `infiniteLoop` boolean field

**Component Updates (components/blocks/Carousel.tsx):**
- Dynamic slide width calculation based on slidesPerView
- Conditional arrow positioning (absolute vs flex layout)
- Vertical alignment classes applied to slides container
- Infinite loop logic in scroll handler and button state
- Improved scroll calculation accounting for gap between slides

**Build Status:** ✓ Compiled successfully

## Recent Work (2026-02-01 - Continued)

### Universal Block System Migration Complete ✅
**Migrated all remaining 9 blocks to use shared fields and components:**

**Schema Updates (sanity/schemas/caseStudy.tsx):**
- Added shared fields to all 9 blocks:
  - MediaGrid: headingFields, typographyFields, aspectRatioField, objectFitField, layoutFields
  - Carousel: headingFields, typographyFields, aspectRatioField, objectFitField, layoutFields
  - ContentCards: headingFields, typographyFields, layoutFields
  - Comparison: headingFields, typographyFields, aspectRatioField, objectFitField, layoutFields
  - SideBySideImages: headingFields, typographyFields, aspectRatioField, objectFitField, layoutFields
  - Accordion: headingFields, typographyFields, layoutFields
  - Hero: aspectRatioField, objectFitField, layoutFields
  - BackgroundVideo: headingFields, typographyFields, aspectRatioField, layoutFields
  - AnnotatedImage: headingFields, typographyFields, aspectRatioField, objectFitField, layoutFields

**Component Updates:**
- All 9 blocks now use BlockWrapper for consistent layout control
- All blocks with headlines now use BlockHeading component
- Image/video blocks now use MediaItem component for consistent media rendering
- Added TypeScript interfaces with full universal field support
- Fixed aspect ratio type definitions (using colon format: '4:3', '16:9')

**Benefits Achieved:**
- 100% consistency across all block types
- Authors can now control layout, spacing, background, typography, and media properties on all blocks
- Reduced code duplication - shared rendering logic in reusable components
- Type-safe implementations throughout
- Build verified successful ✓

**New Ideas Captured:**
- Music lesson planning app - AI-assisted lesson planning for music teachers
- CBT app prototype - Cognitive behavioral therapy app proof of concept

## Earlier Work (2026-02-01)

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

### Universal Block System (Major Refactor)
**Created systematic architecture for consistent block capabilities across all blocks:**

**New Shared System:**
- `sanity/schemas/shared-fields.ts` - Universal field definitions:
  - Layout fields: width (contained/wide/full), background (none/white/gray), spacing (compact/default/spacious)
  - Typography fields: text alignment, heading sizes (small/medium/large)
  - Media controls: aspect ratio (6 presets), object fit (cover/contain), media type (image/video)
- `components/blocks/BlockWrapper.tsx` - Universal layout wrapper component
- `components/blocks/BlockHeading.tsx` - Consistent heading rendering
- `components/blocks/MediaItem.tsx` - Universal media component (supports images/videos, aspect ratios, object fit)
- `components/blocks/TextBlock.tsx` - New text-only block with full controls
- `docs/UNIVERSAL_BLOCK_SYSTEM.md` - Complete system documentation

**Updated Blocks:**
- **SplitMedia**: Added headline, subheading, video support, aspect ratios, all layout/typography controls
- **FullWidthMedia**: Added aspect ratio selector and layout options
- **BlockRenderer**: Added TextBlock support and new component imports

**Benefits:**
- All blocks can now have consistent controls for layout, typography, and media handling
- Prevents image cropping issues with aspect ratio control
- Universal video/image support across blocks
- Consistent authoring experience in Sanity Studio

**Status:** ✅ COMPLETE - All 12 blocks fully migrated to universal system (hero, metadata, splitMedia, mediaGrid, fullWidthMedia, carousel, accordion, contentCards, backgroundVideo, comparison, sideBySideImages, annotatedImage, textBlock).

### TypeScript Build Fixes
Fixed 7 compilation errors:
- Added `downlevelIteration` flag to tsconfig.json for Map iteration
- Fixed MuxPlayer CSS properties typing (4 files)
- Fixed image props spread typing in SideBySideImages
- Fixed nullable array access in GalleryCreationDialog
- Fixed Sanity PreviewProps typing in ImagePreview
- Fixed ArrayInputProps removal in MultipleImageInput (Sanity v4 API change)
- Fixed non-standard folder input attributes in MultipleImageInput
- Build verified successful ✓

### Sanity Schema & Blocks (Earlier Work)
- Added new block types:
  - **SideBySideImages** (`sideBySideImages`) - Two images side by side with optional labels
  - **ContentCards** - Added to Checkout case study
  - **Comparison** - Added to Checkout case study
- Updated **SplitMedia** block:
  - Now supports multiple images side by side via `images` array field
  - Backward compatible with single `image` field
  - Multiple images display in 2-column grid on media side

### Case Study Migration
- Working on "Checkout Optimization" case study migration
- Added missing blocks via Sanity API:
  - Comparison block for Before/After
  - 2 additional splitMedia blocks for Key Changes
  - ContentCards block for Takeaways (3 cards)
- Structure complete, needs images to be uploaded in Studio

## Recent Commits

- `1c03198` (HEAD) Implement universal block system with shared fields and components
- `bda21b5` Add Sanity components, new block components, and gallery utilities
- `47e151f` Update case study schema and add BackgroundVideo block component
- `06ff49b` Initial commit: Portfolio with Sanity CMS integration

## Uncommitted Changes

**Modified:**
- `context.md` - Updated with universal block system work (this file)

All other changes from the universal block system refactor have been committed.

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

1. ✅ ~~**Universal Block System**: Migrate remaining 9 blocks~~ - COMPLETE
2. **Phase 1 continuation**:
   - User to add images to Checkout case study in Sanity Studio
   - Migrate remaining 2-3 case studies from marshallweiss.com
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
