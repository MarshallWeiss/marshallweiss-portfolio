# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Style

- **Be direct and intellectual.** Skip the enthusiasm and validation.
- **Don't praise every idea.** Not everything is "fascinating" or "perfect." Respond naturally.
- **Be straightforward.** Say what needs to be said without sugarcoating.
- **Engage intellectually, not emotionally.** Analysis over excitement.
- **Skip phrases like:** "This is really compelling!", "I love this!", "Perfect!", "Great observation!"
- **Default tone:** Professional colleague, not cheerleader.

## Core Rules

- When I reference a specific skill, agent, or tool by name (e.g., 'use the article writing agent', 'use the /idea skill'), use that exact workflow. Do not start doing the work directly or substitute your own approach.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
```

Sanity Studio is embedded at `/studio` route - no separate command needed.

## Architecture

This is a Next.js 15 portfolio site with Sanity CMS integration using the App Router.

### Routes

- `/` — Home page with hero and 3-section navigation
- `/case-studies` — Lists all Sanity case studies; `/case-studies/[slug]` for individual
- `/thoughts` — Articles list with Mine/Others tabs; `/thoughts/[slug]` for individual
- `/current` — "What I'm up to now" page (reading, work, fun projects, hobbies)
- `/experiments` — Side projects list
- `/about`, `/book-club`, `/contact`, `/tutorials`
- `/studio` — Embedded Sanity Studio

### Content Sources

- **Sanity CMS**: Case studies (`caseStudy`), current page data (`currentlyReading`, `workProject`, `funProject`, `doingItem`), curated articles (`curatedArticle`)
- **JSON files** (`data/`): Static content for thoughts, book-club, experiments, tutorials
- **Markdown files** (`content/thoughts/`): Article drafts and published articles. Published articles are referenced in `data/thoughts.json`.

### Key Patterns

**Modular Block System**: Case studies use a `modules` array containing different block types (hero, metadata, splitMedia, mediaGrid, fullWidthMedia, carousel, accordion, contentCards, backgroundVideo, comparison, annotatedImage). Each block type maps to a component in `components/blocks/`.

**BlockRenderer** (`components/blocks/BlockRenderer.tsx`): Routes block types to their React components. Handles special case of combining consecutive hero + metadata blocks into side-by-side layout. First 2 blocks render eagerly; remaining blocks lazy-load via `LazyBlock` (Intersection Observer wrapper).

**Sanity Schema**: Document types defined in `sanity/schemas/`. The main `caseStudy` type uses inline block type definitions with shared fields from `sanity/schemas/shared-fields.ts` (layout, typography, aspect ratio, image styles). Custom input components: `MultipleImageInput`, `HotspotImageInput`, `BlockWithConverter`.

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

Tailwind CSS with global styles in `styles/globals.css`. Two font families:
- **Instrument Sans** (Google Font) → `font-sans` — body text
- **Right Slab** (local, `public/fonts/`) → `font-display` — headings

### Experiments

The `experiments/` directory contains standalone apps (e.g., `experiments/music-recorder` is a Vite + React app) that are excluded from the Next.js build via webpack config and tsconfig. They have their own `package.json` and build pipelines.

### Agents

- `agents/ai-news-research/` — 7-stage article generation workflow (monitoring → selection → research → synthesis → refinement → style → writing). Outputs drafts to `content/thoughts/drafts/`. Invoke with: "Start a new AI news research session".

## Skills

**Universal Capture:**

- `/idea <anything>` - Smart capture system that intelligently categorizes ideas into the right backlog:
  - **Ideas** - Raw thoughts, observations, insights
  - **Articles** - Structured article projects (auto-cross-posted from article-worthy ideas)
  - **Experiments** - Things to build/try
  - **Roadmap** - Portfolio improvements
  - **Music** - Songs to learn, music ideas
  - **Design** - Design concepts/explorations

The skill analyzes your idea and routes it automatically. Article-worthy ideas get cross-posted to both ideas and articles backlogs.

**Legacy commands** (still work):

- `/experiment <text>` - Add directly to experiments backlog
- `/roadmap <text>` - Add directly to roadmap backlog

## Content Backlogs

- `content/ideas/backlog.md` - Raw thoughts, observations, insights
- `content/articles/backlog.md` - Structured article projects for AI-assisted writing
- `content/experiments/backlog.md` - Experiment/side project ideas
- `content/roadmap/backlog.md` - Portfolio project roadmap items
- `content/music/backlog.md` - Songs to learn, music practice goals
- `content/design/backlog.md` - Design concepts and UI/UX explorations
- `content/ai-news/sources.md` - AI news sources for aggregation into a curated newsletter

## Content Voice & Framing

- **Use "spec-driven development" not "vibe coding"** when describing AI-assisted development workflows. Vibe coding can be referenced as a cultural term others use, but our framing is spec-driven: documentation first, specifications as source of truth, AI builds against specs.
- **Articles must have a personal voice.** No generic listicle content. Every article should include specific experiences, opinions, or anecdotes. If it could have been written by anyone, it shouldn't be published.
- **Never fabricate personal details.** Do not invent biographical facts, family situations, or experiences. Marshall is a 31-year-old product designer living and working in Madrid, Spain, for El Confidencial (a major Spanish newspaper). When writing articles that reference personal context, ask rather than assume.

## Documentation

- `docs/PROJECT_AUDIT.md` - Current state audit of the project
- `docs/PRD.md` - Product requirements document for portfolio evolution
