# context.md

Session context for continuing work on this project.

## Current Branch

`antigravity-sanity-work` - Building out Sanity CMS integration for case studies

## Recent Work (2026-02-14)

### Portfolio Redesign & Content Management Improvements ✅
**Major updates to portfolio UI, content organization, and Sanity CMS integration:**

**Thoughts Page Redesign:**
- Removed tabbed filtering, switched to minimal list view with all thoughts visible
- Added garden-themed stage indicators: 🌱 Planting, 🌿 Growing, 🌾 Harvesting
- Replaced card layout with clean link rows showing title, description, and stage chip
- Updated thoughts.json to include stage metadata for all entries

**About Page Overhaul:**
- Complete redesign with gradient hero section and enhanced typography
- Updated bio to reflect accurate background: Psychology → Philosophy → Graphic Design → UX → Product Design
- Added interactive contact cards with email and phone (marshallweiss94@gmail.com, +34 691 608 000)
- Photo styling with shadow, rounded corners, and hover scale effect
- Removed separate Contact page, consolidated into About

**Current Page (formerly "These Days"):**
- Renamed from "These Days" to "Current" throughout navigation and URLs
- Moved from `/these-days` to `/current` directory
- Added Sanity CMS schemas for dynamic content management:
  - `currentlyReading.ts` - Book tracking with cover, status, author, description
  - `workProject.ts` - Work projects with company, priority, status
  - `funProject.ts` - Personal projects with tags, URL, status
- Created `lib/sanity-these-days.ts` with data fetching functions
- Deployed Music Recorder app to GitHub Pages and added as Fun Project

**Music Recorder Deployment:**
- Built browser-based recording app with React + Web Audio API
- Deployed to https://marshallweiss.github.io/music-recorder/
- Added to Sanity as Fun Project with live URL
- Configured GitHub Pages deployment with gh-pages package

**Experiment Ideas Added:**
- Real-Time Sunlight Map - Interactive visualization showing where sun hits cities like Madrid, Paris in real-time
- Article Thumbnail Generator Agent (already in backlog)

**Communication Style:**
- Updated CLAUDE.md with direct, intellectual communication guidelines
- Removed enthusiastic/validating language in favor of straightforward engagement

**Files Updated:**
- `app/about/page.tsx` - Complete redesign with gradient hero and contact cards
- `app/thoughts/page.tsx` - Simplified to use ThoughtsFilter component
- `components/ThoughtsFilter.tsx` - New minimal list view with stage chips
- `components/Navigation.tsx` - Updated to "Current" and removed Contact link
- `data/thoughts.json` - Added stage field to all thoughts
- `app/current/page.tsx` - Renamed from these-days, updated title
- `sanity/schemas/currentlyReading.ts` - New schema for book tracking
- `sanity/schemas/workProject.ts` - New schema for work projects
- `sanity/schemas/funProject.ts` - New schema for fun projects
- `sanity/schema.ts` - Registered new schemas
- `lib/sanity-these-days.ts` - Data fetching for Current page
- `experiments/music-recorder/` - Complete app with deployment config
- `content/experiments/backlog.md` - Added Real-Time Sunlight Map idea
- `CLAUDE.md` - Added communication style guidelines
- `docs/LOCAL_DICTATION.md` - Documented local Whisper transcription setup

**Build Status:** ✓ All pages compiling, Music Recorder deployed live

## Recent Work (2026-02-13)

### AI News Research Agent - Quality Improvements ✅
**Major refactor of article writing workflow with comprehensive quality controls:**

**New Article Published:**
- "Focus: The Most Important Tool in Vibe Coding" - Published article on creating deep work environment for AI-assisted development

**Article Draft Completed:**
- "We've Built This God Before" - ~5,000 word philosophical essay on AGI as repeating pattern of technological messianism (in drafts/)

**Agent Improvements:**
1. **High-Quality Source Requirements** (Stage 3):
   - Only primary sources, peer-reviewed research, quality journalism (Atlantic, NYT, Wired, New Yorker, Bloomberg)
   - Explicit avoidance of listicles, aggregators, crypto news sites, random blogs
   - Added to `agents/ai-news-research/AGENT_PROMPT.md`

2. **Stage 4.5: Collaborative Refinement** (NEW):
   - Ask for desired length (Short/Medium/Long)
   - Ask for focus type (Single thesis vs exploring tensions)
   - **Ask for primary angle: "Which ONE argument is THE spine?"**
   - Ensures article makes ONE clear point, not "all over the map"
   - Prevents writing unwanted articles

3. **Avoid AI Writing Tells** (Stage 7):
   - NO "It's not X. It's Y." construction (dead giveaway pattern)
   - NO cite-insight-cite-insight structure (reads like research paper)
   - Build coherent arguments that synthesize sources naturally
   - Write like human thinking, not assembling notes

4. **Philosophical Essay Style Skill**:
   - Created `.claude/skills/think-piece/` - analytical, idea-driven essay writing
   - Style reference: Dario Amodei's "Machines of Loving Grace"
   - Synthesis of published sources, not character-based reporting
   - Includes Atlantic article references for pattern learning
   - NO invented details or scenes

5. **Strict Accuracy Requirements**:
   - Inline citations for every claim
   - Footnotes for detailed sources
   - No invented narrative details
   - Verification tags for uncertainty

6. **End Session Skill** (NEW):
   - Created `.claude/skills/end-session/` - workflow automation for session closure
   - Automatically updates context.md with session summary
   - Commits all changes with descriptive message
   - Ensures work is documented for future sessions

**Files Updated:**
- `agents/ai-news-research/AGENT_PROMPT.md` - Added source quality, Stage 4.5, AI tell avoidance
- `agents/ai-news-research/README.md` - Updated to 7-stage workflow with quality standards
- `agents/ai-news-research/state/context.md` - Complete session documentation
- `.claude/skills/think-piece/prompt.md` - New philosophical essay workflow
- `.claude/skills/end-session/skill.md` - New session closure workflow
- `context.md` - Updated with complete session summary

**New Ideas Added to Backlog:**
- "Build Workflows as Agents, Not Conversations"
- "The Copyright Fiction: Why Stealing Is Easier Than Ever"
- "How to Save Money on AI Tools: Strategic Free-Tier Playbook"

**Build Status:** ✓ Agent workflow improved for better first drafts

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
