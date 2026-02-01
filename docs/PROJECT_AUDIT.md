# Project Audit - Marshall Weiss Portfolio

**Audit Date**: February 2026
**Project Status**: Production-ready, actively developed

---

## Executive Summary

This is a Next.js 14 portfolio site with Sanity CMS integration. The architecture is solid with a sophisticated modular block system for case studies, while simpler content (thoughts, books, experiments) uses JSON files. The codebase is well-organized but has room for scaling improvements.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      NEXT.JS 14 (APP ROUTER)                │
├─────────────────────────────────────────────────────────────┤
│  CONTENT SOURCES                                            │
│  ┌──────────────────┐    ┌─────────────────────────────┐   │
│  │   SANITY CMS     │    │     JSON FILES (/data)      │   │
│  │  - Case Studies  │    │  - thoughts.json            │   │
│  │  - 11 Block Types│    │  - book-club.json           │   │
│  │  - Mux Video     │    │  - experiments.json         │   │
│  │  - Media Library │    │  - tutorials.json           │   │
│  └──────────────────┘    └─────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  RENDERING                                                  │
│  - Server Components (default)                              │
│  - Client Components for interactivity                      │
│  - Static generation with ISR (revalidate: 60-3600s)       │
├─────────────────────────────────────────────────────────────┤
│  STYLING                                                    │
│  - Tailwind CSS (utility-first)                            │
│  - Minimal custom CSS (animations only)                     │
│  - Inter font family                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Current Routes

| Route | Status | Data Source | Notes |
|-------|--------|-------------|-------|
| `/` | Complete | Hardcoded | Homepage hero |
| `/case-studies` | Complete | Sanity | List view with cards |
| `/case-studies/[slug]` | Complete | Sanity | Full block system |
| `/studio` | Complete | Sanity Studio | Embedded CMS |
| `/thoughts` | Basic | JSON | List only |
| `/thoughts/[slug]` | Basic | JSON + Markdown | Simple rendering |
| `/book-club` | Complete | JSON | Featured + list |
| `/about` | Complete | Hardcoded | Bio page |
| `/contact` | Stub | None | Placeholder only |
| `/experiments` | Basic | JSON | List only |
| `/tutorials` | Basic | JSON | List only |

---

## Block System (11 Types)

The modular block system is the strength of this project:

| Block | Purpose | Features |
|-------|---------|----------|
| `hero` | Page header | Title, subtitle, intro, image |
| `metadata` | Case study info | Role, client, year (auto-pairs with hero) |
| `splitMedia` | 2-column layout | Text + image, reversible |
| `mediaGrid` | Image gallery | 1/2/3 columns |
| `fullWidthMedia` | Full-width media | Image or Mux video |
| `carousel` | Scrolling gallery | Keyboard nav, lightbox |
| `accordion` | Expandable content | Full-width or split layout |
| `contentCards` | Card grid | Bordered or filled style |
| `backgroundVideo` | Video hero | Overlay text, Mux video |
| `comparison` | Before/after | Side-by-side slider |
| `annotatedImage` | Hotspot image | Interactive annotations |

---

## Custom Sanity Features

- **MultipleImageInput**: Bulk upload with folder support
- **HotspotImageInput**: Interactive hotspot placement
- **BlockWithConverter**: Convert any block to any other type
- **GalleryCreationDialog**: Auto-create galleries from image groups

---

## Third-Party Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| Sanity CMS | Content management | Active |
| Mux | Video hosting | Active |
| Amazon S3 | Book cover images | Active |
| Unsplash | Stock images | Configured |

---

## Technical Stack

- **Framework**: Next.js 14.0.4
- **Language**: TypeScript 5.2.2
- **CMS**: Sanity 4.22.0
- **Styling**: Tailwind CSS 3.3.5
- **Video**: Mux Player 3.10.2
- **Markdown**: react-markdown 9.0.1

---

## Strengths

1. **Robust block system** - Flexible, well-documented modular content
2. **Sanity integration** - Embedded studio, custom inputs, media management
3. **Type safety** - TypeScript throughout
4. **Modern architecture** - App Router, Server Components, ISR
5. **Custom tooling** - Block converter, gallery auto-creation

---

## Areas for Growth

1. **Dual CMS pattern** - JSON files feel like afterthoughts vs Sanity
2. **Limited theming** - Styles are hardcoded, no design tokens
3. **Contact page** - Unfinished stub
4. **No authentication** - Studio is publicly accessible
5. **No AI integration** - Manual content creation only
6. **Garden/experiments** - Basic list, no rich display
7. **Writing workflow** - No integration with writing tools

---

## Scaling Considerations

### For AI-Generated Content
- Need consistent content schema
- Writing style dataset required
- Integration point for generation pipeline

### For Theming
- Extract design tokens
- CSS custom properties or Tailwind themes
- Consider component variants

### For Experiments/Garden
- Richer schema for interactive content
- Potential for embedded code/demos
- Different display patterns than case studies

---

## File Counts

- **Components**: ~25 files
- **Block components**: 11 files
- **Sanity schemas**: 1 document type (caseStudy)
- **JSON data files**: 4 files
- **Routes**: 10 unique routes

---

## Environment Requirements

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=required
NEXT_PUBLIC_SANITY_DATASET=required
```

---

*This audit serves as baseline documentation for structured development going forward.*
