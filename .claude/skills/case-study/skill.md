Base directory for this skill: /Users/mweiss/Desktop/Portfolio/.claude/skills/case-study

# Case Study Builder Skill

Build comprehensive, visually rich case studies for the portfolio by conducting a structured interview, generating Sanity blocks, and creating actionable media checklists.

## Usage

```
/case-study [optional project name]
```

## What This Skill Does

Guides you through creating a complete case study by:
1. Asking structured discovery questions
2. Generating a Sanity document with appropriate blocks
3. Creating the document directly in Sanity
4. Providing a detailed media checklist

## Workflow

### Phase 1: Discovery Interview

Ask questions in these categories. **Don't ask all at once** - go category by category, let the user answer, then move to the next category.

**Critical probing rule:** Never accept vague answers. If the user says something was "complex" or "difficult", ask for a specific example. If they mention a challenge, ask what actually happened. If they give a number, ask what it means in context. Good case studies are built on specific stories and concrete details — keep pushing until you have them.

**Context:**
- What was this project? What does/did it do, and who used it?
- What company/org was this for, and what's the broader context of the product?
- What triggered this project? Was there a specific breaking point, business decision, or external pressure?
- When did it start, and when did major phases ship? (approximate dates are fine)
- How long did the full project take?

**Team & Constraints:**
- What was your role? Were you the only designer?
- Who else was on the team? (number of devs, PMs, stakeholders — approximate is fine)
- What were the main constraints? (timeline, budget, tech stack, ROI limits, organizational politics)
- Were any decisions made above your level that shaped what you could design?

**Problem:**
- What specifically was broken or missing before your work? Give me the most painful example.
- Who was most affected, and what did that pain look like day-to-day?
- What were users doing as workarounds because the existing system didn't work?
- What was the business cost of these problems — lost time, errors, missed opportunities?
- What had prevented this from being fixed earlier?

**Process:**
- Walk me through the research you did — what methods, how many people, what you were trying to learn.
- What were the most surprising or counterintuitive things you found in research?
- What were the hardest design decisions? What alternatives did you seriously consider and reject?
- How did you involve stakeholders? Where were the biggest tensions or disagreements?
- What was the rollout or adoption strategy? Did you phase it, pilot it, launch all at once?
- What was the hardest part of the whole project — the thing that took the most time or caused the most stress?

**What Got Cut:**
- What did you design or prototype that never shipped? Why didn't it make it?
- What features were descoped due to ROI, politics, or technical constraints?
- Is there anything you wanted to do that you still think should happen eventually?

**Solution:**
- What did you actually ship? Walk me through the key features or changes.
- What were the most important design decisions — the ones that really defined the experience?
- What design system or component decisions did you make, and why?
- How did the final solution differ from what you originally imagined?

**Outcomes:**
- What metrics improved? Give me numbers if you have them — even rough ranges work.
- What did users say when they first saw or used it? Any specific quotes or reactions that stuck with you?
- What surprised you about how people responded — things they loved that you didn't expect, or problems you missed?
- Is the rollout complete, or still in progress? What does "done" look like for this project?

**Learnings:**
- What would you do differently if you started this today?
- What's the one thing you're proudest of on this project?
- What did this project teach you that you've carried into your work since?
- What's the most interesting or unusual aspect of this project — the thing that makes it different from typical design work?

**Personal angle:**
- Why were you the right person for this? What did you specifically bring to it?
- What was your personal relationship to this work — did you find it interesting, frustrating, energizing?

**Visuals:**
- What screenshots, videos, or recordings do you have access to?
- Are there before/after comparisons available?
- Process artifacts: wireframes, Figma files, workshop photos, research documents, spreadsheets, Miro boards?
- Note: images don't have to be polished designs — process screenshots, Excel docs, interview screencaps, and blurred internal tools all work.

### Phase 2: Structure Generation

Based on the answers, determine which Sanity blocks to use:

**Block Types Available:**
- `hero` - Opening visual with title overlay
- `metadata` - Role, timeline, tools, team info
- `splitMedia` - Text + image side-by-side
- `mediaGrid` - Grid of 2-4 images
- `fullWidthMedia` - Full-width image or video
- `carousel` - Slideshow of images
- `accordion` - Collapsible sections (good for detailed process)
- `contentCards` - Cards with icons/images
- `backgroundVideo` - Video with text overlay
- `comparison` - Before/after slider
- `annotatedImage` - Image with numbered hotspots
- `audioPlayer` - Audio with transcript (if applicable)

**Typical Structure:**
1. `hero` - Project hero image
2. `metadata` - Role, timeline, tools
3. `splitMedia` or paragraph - Context/overview
4. `annotatedImage` or `comparison` - Problems in old system
5. `splitMedia` - Research insights
6. `mediaGrid` or `carousel` - Design process
7. `fullWidthMedia` or `carousel` - Final solution
8. `comparison` - Before/after results
9. `accordion` or `contentCards` - Key learnings

**Critical: Think visually, not just textually**

For every major moment in the story, ask: *what does this look like?* Don't just add text — propose blocks that show the work. Before finalizing the structure:

1. **Identify story chapters with no visual** — if there's a section of the narrative (e.g. research, a key decision, a feature that got cut) that has no image or video, propose a block and specify what media to capture or create.

2. **Look for interactive opportunities** — Figma prototypes, live iframes, screen recordings, and demos are often better than static screenshots. Ask if these exist.

3. **Process artifacts are valid media** — workshop photos, blurred spreadsheets, Miro boards, annotated research printouts, even messy sketches. These add authenticity and show real work.

4. **Think about "what almost shipped"** — features that got cut, pivots in direction, prototypes that were abandoned. These make great `splitMedia` or `fullWidthMedia` blocks with a "what we explored" framing.

5. **Before/after is almost always available** — if the project replaced something, there should be a `comparison` block. Push for screenshots of the old state.

6. **Scale and context** — if there are impressive numbers (users, features, team size, time), consider a `contentCards` block that surfaces these as stats.

**Generate:**
- Complete block structure with appropriate types
- Draft content for each block based on interview answers
- For every block, specify exactly what media is needed — be precise about what to screenshot, record, or export from Figma

### Phase 3: Sanity Creation

**CRITICAL - Before creating the document:**
1. Check which Sanity resource (project ID + dataset) to use
2. If multiple resources available, ask the user which one
3. Use `create_documents_from_json` to create the case study document
4. Set the document `_type` to `"caseStudy"`
5. Include all blocks in the `modules` array

**Document structure:**
```json
{
  "_type": "caseStudy",
  "title": "Project Name",
  "slug": {
    "_type": "slug",
    "current": "project-slug"
  },
  "modules": [
    // Array of block objects
  ]
}
```

**Important:**
- Leave image/video fields empty or undefined (user will add them in Studio)
- Include placeholder text like `"[Add screenshot of X]"` where media is needed
- Use realistic content based on the interview

### Phase 4: Media Checklist

After creating the document, provide a numbered checklist:

```
📸 Media Checklist for [Project Name]

Block 1 (Hero):
- [ ] Hero image: Wide shot of the final product/interface
      Suggested: Dashboard overview or key screen
      Dimensions: 1920x1080 or wider

Block 3 (Annotated Image - "Old System Problems"):
- [ ] Screenshot: Old interface showing main issues
      Hotspots to mark:
      1. Confusing navigation
      2. Cluttered sidebar
      3. Outdated visual design

Block 5 (Comparison - "Before/After Dashboard"):
- [ ] Before: Old dashboard screenshot
- [ ] After: New dashboard screenshot
      Keep same view/angle for fair comparison

Block 7 (Carousel - "Design Process"):
- [ ] Image 1: Early wireframes or sketches
- [ ] Image 2: User research artifacts (if available)
- [ ] Image 3: High-fidelity mockups
- [ ] Image 4: Final designs

...etc for each block
```

**Instructions:**
1. Open Sanity Studio at /studio
2. Find the case study document
3. Add images/videos to the blocks as specified
4. Publish when ready

### Phase 5: Polish

Remind user:
- Review and refine the writing in Sanity Studio
- Check that all images are added
- Preview the case study page
- Publish when satisfied

## Important Notes

- **Use actual answers**: Don't make up project details - base everything on what the user tells you
- **Be specific about media**: Give exact guidance on what screenshot/video to capture
- **Block choice matters**: Choose blocks that showcase the work effectively (e.g., use `annotatedImage` for showing problems, `comparison` for before/after)
- **Keep it visual**: Case studies should be image-heavy with concise text
- **Sanity schema**: Follow the existing caseStudy schema structure in the codebase

## Reference Files

- Sanity schemas: `sanity/schemas/`
- Existing case study for reference: Query Sanity for El Confidencial CMS case study
- Block components: `components/blocks/`
