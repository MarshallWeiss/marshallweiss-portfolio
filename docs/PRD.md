# Product Requirements Document
## Marshall Weiss Portfolio Evolution

**Version**: 1.0
**Created**: February 2026
**Status**: Draft for Review

---

## Vision

A portfolio that serves as both a professional showcase and a personal thinking space — where polished case studies coexist with evolving experiments and AI-assisted articles that capture your ideas in your authentic voice.

---

## Guiding Principles

1. **Quality over speed** — Do it right, not fast
2. **Structure for scale** — Build foundations that support future growth
3. **AI as collaborator** — Extends your capacity, doesn't replace your voice
4. **Progressive complexity** — Simple now, sophisticated later

---

## Phase Overview

| Phase | Focus | Priority | Status |
|-------|-------|----------|--------|
| **1** | Case Study Migration | Highest | Not started |
| **2** | Theming Foundation | Medium | Not started |
| **3** | Experiments Section | Medium | Not started |
| **4** | AI Article System | High | Not started |
| **5** | Writing Style Training | Lower | Not started |
| **Ongoing** | Sanity Studio Refinement | Continuous | In progress |

---

## Ongoing: Sanity Studio Refinement

### Goal
Continuously improve the Sanity Studio experience to make content creation frictionless and leverage AI capabilities.

### Philosophy
Sanity Studio should become the central hub — a personal CMS tailored to your workflow, not generic software you work around.

### Current UX Issues to Address
*(To be documented as encountered)*
- [ ] Issue 1: TBD
- [ ] Issue 2: TBD

### Future Enhancements (As Phases Progress)
- **Ideas Panel**: Capture rough article ideas directly in Studio
- **AI Actions**: "Generate Draft", "Research Topic", "Expand Section" buttons
- **Image Generation**: Leverage Sanity's built-in AI image features
- **Content Transformation**: AI-powered content suggestions and rewrites
- **Custom Dashboards**: Overview of content status, ideas in pipeline, etc.

### Why Sanity as the Hub?
- Already integrated with your site
- Highly customizable (custom tools, inputs, actions)
- Has built-in AI features (image generation, content assist)
- No image/video compression (unlike Notion)
- Can trigger Claude workflows via custom plugins

### Success Criteria
Studio feels like *your* tool, not off-the-shelf software.

---

## Phase 1: Case Study Migration

### Goal
Get all 4 case studies from marshallweiss.com into Sanity CMS, looking perfect.

### Approach
Manual migration with AI assistance:
1. User provides screenshot of each section from existing site
2. Claude creates corresponding Sanity blocks with matching content/layout
3. User reviews and adjusts in Sanity Studio
4. Repeat for each case study

### Why Manual?
- Only 4 case studies (scripts are overkill)
- Previous scripted attempts required extensive block-by-block editing
- Visual-to-block mapping via AI is more accurate for complex layouts

### Deliverables
- [ ] Case Study 1 fully migrated and polished
- [ ] Case Study 2 fully migrated and polished
- [ ] Case Study 3 fully migrated and polished
- [ ] Case Study 4 fully migrated and polished
- [ ] All images optimized and uploaded to Sanity
- [ ] All Mux videos (if any) properly configured

### Success Criteria
Each case study matches or exceeds the quality of marshallweiss.com presentation.

---

## Phase 2: Theming Foundation

### Goal
Extract design tokens so styles can be easily modified later, without changing component code.

### Approach
Keep the current minimal aesthetic but restructure CSS:
1. Define CSS custom properties (variables) for all design values
2. Update Tailwind config to use these variables
3. Document the token system

### Token Categories
```css
:root {
  /* Colors */
  --color-background: ...;
  --color-foreground: ...;
  --color-accent: ...;
  --color-muted: ...;

  /* Typography */
  --font-family-primary: ...;
  --font-size-base: ...;
  --line-height-base: ...;

  /* Spacing */
  --spacing-unit: ...;

  /* Borders & Shadows */
  --border-radius: ...;
  --shadow-sm: ...;
}
```

### Future Capability (Not in scope now)
- User-switchable color schemes
- Dark mode
- Multiple theme presets

### Deliverables
- [ ] Design tokens defined in CSS custom properties
- [ ] Tailwind config updated to reference tokens
- [ ] Documentation of token system
- [ ] Current minimal theme preserved exactly

### Success Criteria
Site looks identical to current, but all visual values are centralized and modifiable.

---

## Phase 3: Experiments Section

### Goal
A simple "Current Projects" section for 1-3 experiments, hosted as subdirectories within the portfolio.

### Approach
- Experiments are pages within the Next.js app (`/experiments/[slug]`)
- Each experiment can have its own code/components
- Listing page shows cards with preview/description
- Experiments can be as simple or complex as needed

### Structure
```
/experiments                    # List page with cards
/experiments/[slug]             # Individual experiment page
/components/experiments/        # Shared experiment components
/components/experiments/[name]/ # Per-experiment components
```

### Experiment Schema (Sanity or JSON)
```typescript
{
  title: string;
  slug: string;
  description: string;
  status: 'active' | 'complete' | 'archived';
  thumbnail?: image;
  technologies?: string[];
  lastUpdated: date;
}
```

### Card Display
- Title and brief description
- Status indicator (subtle)
- Thumbnail or preview if available
- Link to full experiment

### Deliverables
- [ ] Experiments listing page redesigned
- [ ] Experiment page template created
- [ ] At least 1 experiment migrated/created as proof of concept
- [ ] Schema defined (decide: Sanity or keep JSON)

### Success Criteria
Can easily add new experiments as subdirectory pages without touching listing code.

### Future Enhancement: Auto-Documented Process

**Concept**: Since experiments are built with Claude/Cursor, the AI conversation itself becomes documentation. The "making of" writes itself.

**How It Could Work**:
1. **Session Logging Skill**
   - `/experiment start "name"` — begins tracking
   - Key moments auto-logged: problems solved, pivots, breakthroughs
   - `/experiment checkpoint "description"` — manual milestone
   - `/experiment end` — wraps up, triggers summary generation

2. **Transcript → Narrative**
   - Claude summarizes the conversation history
   - Extracts: goal, challenges faced, solutions found, lessons learned
   - Outputs structured "making of" markdown

3. **Live Status on Site** (Optional)
   - Experiment pages show current context
   - "Where we're at", "Recent progress", "Next steps"
   - Pulled from conversation state or checkpoint file
   - Shows the messy middle, not just polished end result

**Why This Is Interesting**:
- Zero-effort documentation (it happens as you work)
- Authentic process visibility (shows real problem-solving, not sanitized)
- Meta-demonstration of AI-assisted development
- Differentiator: most portfolios show outcomes, yours shows process

**Technical Approach** (Future):
- Claude Code skill for session management
- Checkpoint file per experiment (`/content/experiments/[name]/process.md`)
- Component on experiment page that renders process timeline
- Optional: live sync if conversation state is accessible

**Priority**: Lower (interesting but not essential for launch)

---

## Phase 4: AI Article System

### Goal
A structured workflow to go from rough idea to polished article draft, with AI assistance at each stage.

### Key Principle: Write Anywhere, Publish via Sanity
- **Drafting**: Use whatever tool feels natural (Notion, Google Docs, VS Code, AI-generated markdown)
- **Publishing**: Final articles go into Sanity with Portable Text
- **Why Sanity for publishing**: No image compression, Mux video support, consistent with case studies

### User Journey
```
1. CAPTURE    → Jot down idea (CLI, WhatsApp, or Sanity Ideas panel)
2. EXPAND     → AI asks clarifying questions, helps develop angle
3. RESEARCH   → AI searches for sources, summarizes findings
4. OUTLINE    → AI proposes structure, user approves/modifies
5. DRAFT      → AI writes in target style (see Phase 5)
6. EDIT       → User refines draft (in preferred editor)
7. PUBLISH    → Import to Sanity, add images/video, publish
```

### Idea Backlog
Ideas are stored as markdown files that can be worked on over time:
```
/content/ideas/
  claude-code-making-us-dumber.md
  design-systems-are-overrated.md
  why-i-left-figma.md
```

Each idea file tracks its stage:
```markdown
---
title: "Is Claude Code Making Us Dumber?"
stage: expand  # capture | expand | research | outline | draft | edit | ready
created: 2026-02-01
updated: 2026-02-01
---

## Raw Idea
Something about how AI coding tools might be atrophying our skills...

## Expansion Notes
[AI-generated questions and user responses]

## Research
[AI-gathered sources and summaries]

## Outline
[Approved structure]

## Draft
[AI-generated draft in target style]
```

### Input Methods

**Primary: Claude Code CLI**
- Command: `/idea "rough idea text"`
- Starts capture, asks expansion questions
- Saves to ideas folder
- Can continue working on existing ideas: `/idea continue claude-code`

**Future: Sanity Studio Integration**
- Ideas panel in Studio for capture
- AI action buttons: "Expand", "Research", "Generate Outline", "Draft"
- Direct path from idea → published article without leaving Studio

**Future: WhatsApp/Telegram Bot**
- Message bot with idea anytime
- Syncs to same ideas folder
- Notifies when expansion questions are ready

### Article Vision
- **Style**: Long-form, analytical, narrative-driven (Atlantic-inspired)
- **Topics**: Wide-ranging — AI, philosophy, politics, design, technology
- **Tone**: Thoughtful, personal, intellectually curious

### AI Capabilities Required
1. **Expansion**: Ask good clarifying questions about the idea
2. **Research**: Web search, summarize sources, find data
3. **Outlining**: Propose article structure with sections
4. **Drafting**: Write in target style (see Phase 5)
5. **File Management**: Create/update idea markdown files

### Deliverables
- [ ] Ideas folder structure created
- [ ] Idea file template defined
- [ ] Claude Code `/idea` skill created
- [ ] Capture → Expand workflow working
- [ ] Research workflow working
- [ ] Outline workflow working
- [ ] Draft workflow working (integrates with Phase 5)
- [ ] Article document type in Sanity with Portable Text
- [ ] Markdown → Sanity import workflow

### Success Criteria
Can take a rough idea from capture to publishable draft with AI assistance at each stage.

---

## Phase 5: Writing Style Training

### Goal
AI writes drafts in a distinctive, intentional voice — not generic AI output.

### Approach: Aspirational Style (No Existing Samples)
Since there aren't existing writing samples to analyze, we'll take an aspirational approach:

1. **Define target style characteristics** — What do you want to sound like?
2. **Reference exemplars** — Publications/writers whose style resonates (e.g., The Atlantic)
3. **Create a style guide prompt** — Detailed instructions Claude follows when drafting
4. **Iterate through feedback** — Your edits teach the system your preferences
5. **Evolve over time** — As you write more, your actual voice emerges and refines the guide

### Target Style Characteristics
*(To be defined — initial suggestions based on aspirations)*

**Structure & Pacing**
- Long-form, narrative-driven
- Arguments build progressively
- Comfortable with complexity and nuance

**Tone & Voice**
- Intellectually curious, not academic
- Personal but not confessional
- Direct without being aggressive
- Comfortable with uncertainty ("I think..." vs. false confidence)

**Technique**
- Strong openings that hook
- Concrete examples ground abstract ideas
- Questions used to advance thinking
- Conclusions that open rather than close

### Style Guide Prompt (Draft)
```
Write in a style that is:
- Thoughtful and analytical, like The Atlantic's long-form pieces
- Personal but not overly casual
- Willing to explore complexity without oversimplifying
- Uses concrete examples to illustrate abstract points
- Builds arguments progressively rather than stating conclusions upfront
- Avoids jargon, buzzwords, and AI-typical phrases
- Comfortable acknowledging uncertainty or competing perspectives
```

### Iteration Process
1. AI generates draft with style guide
2. User edits draft (these edits = style feedback)
3. Notable edits get captured: "Changed X to Y because..."
4. Style guide gets refined based on patterns
5. Repeat until drafts need minimal editing

### Deliverables
- [ ] Target style characteristics defined
- [ ] Exemplar articles/writers identified
- [ ] Initial style guide prompt created
- [ ] Tested on 2-3 sample drafts
- [ ] Feedback loop established for iteration

### Success Criteria
Drafts feel like "you could have written this" rather than "obviously AI."

---

## Technical Considerations

### Current Stack (Keep)
- Next.js 14 with App Router
- Sanity CMS for case studies
- Tailwind CSS
- TypeScript
- Mux for video

### Additions Needed
- CSS custom properties for theming
- Ideas folder and file management
- Claude Code skills for article workflow
- Potentially: WhatsApp Business API or Telegram Bot API

### Data Sources After Evolution
| Content Type | Source | CMS |
|--------------|--------|-----|
| Case Studies | Sanity | Yes |
| Experiments | JSON or Sanity | Optional |
| Articles | Ideas folder → Sanity | Yes |
| Thoughts | Keep JSON for now | No |
| Books | Keep JSON | No |

---

## Resolved Decisions

| Question | Decision | Rationale |
|----------|----------|-----------|
| Articles CMS | Sanity | No compression, video support, unified with case studies |
| Writing environment | Write anywhere | Comfort matters; convert to Sanity for publishing |
| Writing style | Aspirational | No existing samples; define target style, iterate over time |
| Case study migration | Manual with AI | Only 4 studies; scripts didn't map well previously |

## Open Questions

1. **Experiments data**: Move to Sanity or keep as JSON?
2. **WhatsApp bot**: Build custom or use existing service? (Future phase)
3. **Sanity Studio UX issues**: Document specific pain points as encountered

---

## Next Steps

1. Review and approve this PRD
2. Begin Phase 1: Case Study Migration
   - User provides first case study screenshots
   - Claude creates Sanity blocks
3. Document Sanity Studio UX issues as encountered (Ongoing)
4. Continue phases sequentially or parallelize where possible

---

*This is a living document. Update as decisions are made and scope evolves.*
