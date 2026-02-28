# What I Learned Rebuilding My Portfolio in Claude Code

## Status: First spitball — raw brain dump organized into outline

## Core Thesis
A product designer rebuilt his portfolio entirely in Claude Code — from Squarespace clone to something far more ambitious. The lessons aren't about code. They're about what happens when the barrier between having an idea and building it effectively disappears.

## The Arc (chronological, which is also the emotional arc)
1. Intimidation → orientation → momentum → expansion → new way of working

## Key Threads from Brain Dump

### The On-Ramp
- Terminal was intimidating at first — switched to VS Code extension, much easier
- A few basic tips from colleagues made a huge difference: CLAUDE.md, skills, context files
- Basic git concepts (branches, pushing) were helpful to learn upfront
- The barrier to entry is lower than it looks, but having someone point you in the right direction matters

### The Motivation
- Squarespace was limiting — specifically video quality/resolution
- Could have learned Framer or Webflow, but that's just learning another constrained tool
- With Claude Code: specify what you want, then revise. No learning curve for the tool itself, just for the workflow.

### The Strategy: Block by Block
- Asked Claude how to approach it → suggested Sanity CMS + Mux for videos
- Replicated the Squarespace block system one block at a time
- Methodical, not magical — each block took iteration and refinement
- Key moment: connecting Sanity MCP. Creating new fields that auto-populated both frontend components AND the CMS simultaneously. That felt like a step change.

### The Trade-offs (honest accounting)
- Sanity CMS UX wasn't as polished as Squarespace — you're not getting a finished product, you're getting raw materials
- Didn't want to fall into "building a CMS" instead of building a portfolio
- Animations were genuinely hard — movement is much harder to specify than static layouts. Can't easily show Claude a video of what you want.
- Worth it for the freedom. Squarespace gives you a ceiling; this gives you none.

### The Unexpected Evolution
- Started as: "rebuild my portfolio site"
- Became: a system for capturing and developing ideas
- Skills for thought capture (/idea, /link, /spitballing)
- Agents for research processes
- Backlogs organized by category
- Went from using Claude as a code generator → using it as a second brain
- This is where the real value lives — the portfolio is almost a side effect of building the infrastructure

### The Dictation Story (key example — shows the "invent your workflow" point)
- Was using WhisperFlow (third-party app) for dictation while working in Claude Code
- Decided to just replicate it locally — Hammerspoon + Whisper, push-to-talk with Right Option key
- Had it working in ~10 minutes
- The point isn't "I saved money on an app." The point is: anything that slows down your workflow, you can just *build the fix* on the spot. You're not just building a project — you're perfecting the environment you build in, while you're building in it.
- Side-by-side visual: WhisperFlow (before) → custom Hammerspoon dictation (after)
- This is maybe the single best illustration of the feedback loop in the whole piece

### What's Next
- Figma → Claude Code connection (editing designs that become code)
- The possibilities compound — each thing you build makes the next thing easier
- A "differential portfolio" — one that can do things no template-based portfolio can

## Proposed Outline

### Title options
- "What I Learned Rebuilding My Portfolio in Claude Code"
- "From Squarespace to Claude Code: A Designer's Retrospective"
- "Building a Portfolio With No Engineering Background" (provocative but maybe oversells)

### Structure

**1. Why I Left Squarespace** (short)
- The limitation that triggered the move (video quality)
- Could have gone to Framer/Webflow — why I didn't
- The appeal: specify what you want instead of learning what a tool allows

**2. Getting Started Was the Hardest Part**
- Terminal intimidation → VS Code extension
- The few tips that actually mattered (CLAUDE.md, skills, git basics)
- Having someone point you in the right direction vs. figuring it out alone
- [Screenshot: the VS Code setup / first session]

**3. The Approach: Replicate, Then Diverge**
- Block-by-block replication of the existing site
- Claude suggested the architecture (Sanity + Mux)
- The Sanity MCP moment — fields auto-populating both sides
- [Screenshot: Sanity Studio / block system]

**4. What Was Hard (Honest Version)**
- Animations — specifying movement is a different problem than specifying layout
- CMS UX trade-off — Sanity vs. Squarespace polish
- Resisting the urge to build infrastructure instead of the actual portfolio
- Things that took longer than expected

**5. You're Not Just Building — You're Building How You Build**
- The dictation story: was using WhisperFlow, replicated it in ~10 minutes with Hammerspoon + Whisper. Anything that slows you down, you just fix it on the spot.
- [Visual: side-by-side WhisperFlow → custom dictation setup]
- This extends to everything — skill system for capturing ideas, research agents, spitballing sessions
- Started building tools for the portfolio, ended up building tools for thinking
- The portfolio became a side effect of a larger system
- [Screenshot: skills / idea capture in action]

**6. Where This Goes**
- Figma connection on the horizon
- Each capability compounds — the system gets more useful over time
- What a "differential portfolio" means — doing things templates can't

## Tone
Practical, honest, personal. Not a tutorial. Not a sales pitch for Claude Code. "Here's what actually happened when a designer tried this." Show the messy parts.

## Audience
Designers and other non-engineers curious about AI-assisted development. People who've been intimidated by the terminal. People stuck on template platforms who want more freedom but aren't sure the jump is worth it.

## Visuals to Include
- Before/after: Squarespace vs. Claude Code version
- VS Code / Claude Code interface
- Sanity Studio with the block system
- The skill/idea capture workflow
- Maybe a short screen recording of a Claude Code session (specify → result)
