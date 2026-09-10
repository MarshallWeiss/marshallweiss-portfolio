# Writing and Visual Identity Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Edit the four published essays, create subject-specific covers, simplify Lapidarium artwork, and restore the bilingual homepage line.

**Architecture:** Keep Markdown and `data/thoughts.json` as the article sources. Draw the covers as reproducible SVG compositions rendered to the existing square and wide PNG paths. Share a code-native Lapidarium artwork component between Home and Current, using the existing mineral render and retaining Sanity as the source for project copy.

**Tech Stack:** Next.js, React, Tailwind/CSS, SVG, Sharp, Markdown, Sanity.

---

User instructions explicitly override the skill's worktree and approval handoffs: implement autonomously on `main`, verify, and commit the focused changes. Preserve `.claude/launch.json` and the music-recorder submodule's uncommitted artifacts. No deployment requested.

## Design direction

- Palette: paper `#F7F5F2`, ink `#303936`, blue `#354F70`, lavender `#D4D8E8`, green `#D6E4DE`, ochre `#E8E0C4`. Keep the current section backgrounds.
- Type: retain Right Slab for display and Instrument Sans for body copy. No text embedded in article illustrations.
- Covers: an editorial family of constructed objects. Specification: a drawing and its assembled form. Portfolio: a folded, modular website. Focus: a pendulum held inside a crowded field. Handoff: newspaper plates moving into registration. Shared ink, flat color, and fine hatching; each subject has its own silhouette. Compose square and wide variants independently so a listing crop never loses the concept.
- Lapidarium: one large amethyst, a restrained outline study, and an encyclopedia caption. The compact version keeps the same mineral and lavender ground, without miniature interface text.
- Alignment: preserve current page grids and left alignment. Hero art: `[title / outline / caption | mineral]`; Current entry: `[80px artwork | title, description, tags, link]`.
- Review against brief: reject another random-line cover seed and a three-mineral collage. Use illustration to describe the specific article and let the amethyst be the single focal point. Existing assets and SVG are better suited than generated photos for this pass.

## Task 1: Published writing

1. Read all four Markdown files named by `data/thoughts.json` and preserve their source links and recorded experiences.
2. Edit each article around its strongest concrete observation. Reduce repeated headings, generic admonitions, and unsupported certainty. Keep the newsroom workflow explicitly proposed.
3. Verify questionable source claims; record material corrections in `docs/WRITING_VISUAL_PASS_2026-09-10.md`.
4. Update descriptions in Markdown and JSON together. Calculate reading times consistently at 220 words/minute, rounded up.
5. Verify all original Markdown links remain, article identifiers/dates remain unchanged, and no unsupported personal experiences were introduced.

## Task 2: Article artwork

1. Replace `scripts/article-images.mjs` with explicit per-article SVG compositions, preserving the existing regeneration command.
2. Generate the eight existing `public/images/thoughts/*.png` files at 800×800 and 1200×630.
3. Use the wide asset for the homepage feature in `app/page.tsx`; keep square assets for listing thumbnails and wide assets for article heroes/OG.
4. Inspect all eight images at intended sizes, including the mobile listing's near-square crop.

## Task 3: Homepage and Current

1. Add `components/LapidariumArtwork.tsx` and replace the three-mineral composition in `app/page.tsx`.
2. Update `styles/portfolio.css` for responsive artwork, compact specimen rendering, focus and reduced-motion behavior.
3. Add the compact artwork in `app/current/page.tsx`, retaining the CMS image with a local fallback. Move the experiment link below copy if needed to prevent phone-width collisions.
4. Restore the exact earlier phrase, “Fully bilingual in English and Spanish.” (from `2eb6cc1^:app/page.tsx`) within the homepage introduction.
5. Review the four Working entries against repository evidence. Document concrete suggested CMS copy and unresolved personal details rather than inventing motivation, progress, or outcomes.

## Task 4: Verify and commit

1. Inspect Home, Thoughts, Current, and all four articles at desktop, tablet, and phone widths; include 320px for dense cards. Confirm image loads, crops, metadata, no horizontal overflow, and readable titles/actions.
2. Run `npm run lint` and `npm run build`. Stop the task-owned development server before the build to avoid Next.js output conflicts.
3. Record exact changed files, source boundaries, verification results, and remaining personal input in the pass report.
4. Review `git diff --check`, selectively stage only task files, and commit writing and visual changes with focused messages on `main`.
