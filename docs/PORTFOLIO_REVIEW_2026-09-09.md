# Portfolio review — September 9, 2026

## Scope

Reviewed the live homepage at desktop and 390px mobile, Work listing, CMS case study, Thoughts, Current, and About route; read the homepage-redesign case study through its live HTML. Checked the contact route and both CV download responses. Reviewed corresponding local routes, navigation, contact components, styling, image delivery, case-study renderer, package configuration, and existing planning documents. This is an editorial/design and source review, not a measured performance benchmark or exhaustive accessibility audit. No application code or CMS content changed.

## Main recommendation

Make the work and your judgment visible earlier. The current homepage is an elegant introduction and directory, but visitors must follow a link or hover before seeing product work. Keep Right Slab, Instrument Sans, restrained spacing, and the section colors. Give the homepage a stronger sequence: introduction, selected work, a working experiment, one piece of writing, contact.

Assumption: professional credibility and opportunities are the primary goal, with the personal garden supporting that goal. If the site is primarily for existing readers, writing should receive greater prominence.

## Highest-impact changes

### 1. Put selected work directly on the homepage

Live evidence: the desktop homepage gives substantial space to three navigation links already represented in the header. Work previews appear only on hover. On mobile, the supporting paragraph is hidden and previews have no touch equivalent. At 390px there was no horizontal overflow, but the page contains no product imagery.

Recommendation: retain a concise typographic introduction, then show two visible project previews. Lead with Jarvis if positioning around AI product design; lead with the homepage redesign if positioning around broader senior product design. Make the other project immediately available. Use real interface details, a short problem statement, your role, and a defensible outcome or scope statement.

Files: `app/page.tsx`, `components/HomeNavigation.tsx`, `components/WorkCard.tsx`.

### 2. Explain what “AI-first” means through evidence

The label is broad. The distinctive material is designing newsroom tools, serving readers, teaching, and building functioning software. Use a first-person introduction naming the domain and the work. Explain spec-driven development through an actual experiment or project detail. A prominent recorder demo and a concise account of a design decision would substantiate “designer and developer.”

Avoid implying that employer audience scale is a personal achievement, or that every team result was solely your contribution.

### 3. Give case studies a short reading path

The CMS study contains valuable detail, but outcomes follow a long sequence of objectives, research, insights, wireframes, and features. Add a short opening summary: problem, ownership, what shipped, and evidence of change. Follow with three consequential decisions, then supporting process detail. Add section navigation for long studies.

The homepage-redesign study already contains a useful account of tradeoffs: approximately 10% higher engagement time, approximately 12% lower recirculation, and broadly flat ad revenue in the first week, week over week. Preserve the observation window and mixed results when summarizing; these are early observations, not causal or durable proof. The CMS study's “measurable” improvement claims need either supporting measurements, research context, or more precise qualitative wording.

Keep specific judgment, such as rolling out to the breaking-news desk last because disruption was unacceptable. Compress generic lists of methods. Fix the published “[Add screenshot of benchmark board]” placeholder and “propostiion” typo in the homepage study.

Files: `app/case-studies/[slug]/page.tsx`, `components/blocks/BlockRenderer.tsx`, Sanity case-study content.

### 4. Reconcile the site's public story

- Live Thoughts shows only Reading, while the local `ThoughtsFilter.tsx` has `SHOW_MINE = true` and renders personal articles. Establish which local articles are publication-ready before deploying the existing changes. Label the tabs “Writing” and “Reading.” The homepage currently promises writing but sends visitors to curation.
- Live Current describes Homepage Redesign as confidential even though the Work section publishes its case study. Update that entry or link to the public study.
- Add an honest last-updated date to Current and refresh its content when needed.
- The About intro says four years of experience, while the listed UX/UI work starts in 2020. Reconcile the scope or use a durable description without a rolling count.
- The live contact route returns a placeholder with HTTP 200. Replace it with real contact options or redirect it to the appropriate section.
- Both English and Spanish CV endpoints returned HTTP 200 with PDF content types; their contents were not audited.

### 5. Make contacting you predictable

“Get in touch” currently copies an email address. Use an email link as the primary action and a separate “Copy email” control. Await clipboard success before confirming it, handle failure, and announce success accessibly. The icon-only LinkedIn link needs an accessible name.

Files: `components/GetInTouchButton.tsx`, `components/Footer.tsx`, `app/contact/page.tsx`.

## Supporting technical work

| Priority | Finding | Recommended change |
|---|---|---|
| High | Global CSS hides the native pointer, regardless of whether the custom cursor is ready | Retain a native fallback; limit the enhancement to supported fine-pointer interactions |
| High | Mobile menu lacks expanded/control attributes; active navigation uses exact path matching | Expose menu state and identify the active section on nested routes; check keyboard dismissal and focus |
| Medium | Work listing has nested main landmarks and no page h1 | Use one main landmark and an appropriate page heading |
| Medium | Work images use quality 95, up to 3000px, and `sizes="100vw"` despite a two-column desktop grid | Supply accurate responsive sizes and compare lower-quality exports visually |
| Medium | Card videos autoplay and reviewed animation paths do not explicitly honor reduced motion | Provide still posters and reduced-motion behavior; defer playback away from the viewport |
| Medium | Main routes and case studies inherit a generic title/description | Add route-specific metadata and project share images; extend existing article metadata work |
| Medium | Figma capture script is included in the production root layout | Remove it from ordinary production delivery or restrict it to a deliberate capture workflow |
| Medium | Case-study ordering is duplicated and differs between homepage, listing, and previous/next links | Store one explicit editorial order instead of maintaining separate slug lists |
| Low | Work listing revalidates every five seconds with a development comment | Choose a publishing-appropriate cache policy |
| Low | Existing audit/PRD describe older fonts, framework versions, and page states | Update the baseline after agreeing on the next release |

Image and script changes are evidence-backed optimization opportunities; no transfer savings or Core Web Vitals improvement is claimed without measurement.

## Suggested first release

1. Correct public placeholders, contact behavior, and inconsistent Current content.
2. Build a homepage with visible selected work and a mobile introduction, using existing assets and fonts.
3. Add a concise summary and navigation to the CMS study; support or qualify outcome claims.
4. Review and publish the already-in-progress personal writing changes as a separate, deliberate content decision.
5. Complete responsive image, metadata, keyboard, cursor fallback, and reduced-motion improvements.

Validate at 390px, tablet, and desktop; navigate by keyboard; verify email/copy behavior; inspect project imagery and reduced-motion behavior; run lint/build against the final changes. Measure media delivery before and after optimization. Existing uncommitted work, especially articles and the recorder experiment, must be preserved.
