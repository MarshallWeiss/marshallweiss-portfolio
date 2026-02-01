# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
```

Sanity Studio is embedded at `/studio` route - no separate command needed.

## Architecture

This is a Next.js 14 portfolio site with Sanity CMS integration using the App Router.

### Content Sources

- **Sanity CMS**: Case studies with modular block-based content (`caseStudy` document type)
- **JSON files** (`data/`): Static content for thoughts, book-club, experiments, tutorials

### Key Patterns

**Modular Block System**: Case studies use a `modules` array containing different block types (hero, metadata, splitMedia, mediaGrid, fullWidthMedia, carousel, accordion, contentCards, backgroundVideo, comparison, annotatedImage). Each block type maps to a component in `components/blocks/`.

**BlockRenderer** (`components/blocks/BlockRenderer.tsx`): Routes block types to their React components. Handles special case of combining consecutive hero + metadata blocks into side-by-side layout.

**Sanity Schema**: Single document type defined in `sanity/schemas/caseStudy.tsx` with inline block type definitions. Uses custom input components for multi-image upload (`MultipleImageInput`), hotspot annotation (`HotspotImageInput`), and block conversion (`BlockWithConverter`).

**Video**: Uses Mux for video hosting via `mux.video` field type and `@mux/mux-player-react` for playback.

### Path Aliases

`@/*` maps to project root (e.g., `@/components`, `@/sanity/lib/client`)

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
```

### Styling

Tailwind CSS with custom Inter font. Global styles in `styles/globals.css`.

## Skills

Quick-capture commands for ideas:

- `/idea <text>` - Add an article idea to `content/ideas/backlog.md`
- `/experiment <text>` - Add an experiment idea to `content/experiments/backlog.md`

## Content Backlogs

- `content/ideas/backlog.md` - Article ideas for future AI-assisted writing
- `content/experiments/backlog.md` - Experiment/side project ideas

## Documentation

- `docs/PROJECT_AUDIT.md` - Current state audit of the project
- `docs/PRD.md` - Product requirements document for portfolio evolution
