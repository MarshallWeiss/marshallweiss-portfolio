---
title: "What I Learned Rebuilding My Portfolio in Claude Code"
description: "A product designer's honest retrospective on leaving Squarespace behind and building a portfolio entirely with AI — what worked, what didn't, and the unexpected thing that happened along the way."
date: "2026-02-20"
slug: "rebuilding-portfolio-in-claude-code"
tags: ["AI", "Claude Code", "Portfolio", "Product Design", "Spec-Driven Development"]
readingTime: "10 min read"
---

# What I Learned Rebuilding My Portfolio in Claude Code

## Why I Left Squarespace

My Squarespace portfolio worked fine for static case studies. Then I tried uploading high-resolution video work and hit the ceiling. Compression artifacts, limited embed options, sluggish playback. For a product designer whose work increasingly involved motion and interaction, the platform was becoming the bottleneck.

I could have migrated to Framer or Webflow. Both are capable tools. But switching from one constrained template system to another felt like lateral movement — I'd just be learning a different set of limitations.

Claude Code offered something different: instead of learning what a tool allows, I could specify what I wanted and iterate from there. No template constraints. No feature requests to a platform that may or may not prioritize them. Just describe the thing, review the result, adjust.

That's what got me to try it. What I actually learned was much broader than I expected.

## Getting Started Was the Hardest Part

I'm not going to pretend the beginning was smooth. The terminal was intimidating. I'm a designer — my tools have always had interfaces. Staring at a blinking cursor in a black window felt like showing up to a construction site in dress shoes.

Two things made the difference. First, I switched to the Claude Code VS Code extension, which gave me a familiar environment — file trees, tabs, visual feedback. The terminal was still there, but wrapped in something I could navigate intuitively.

Second, a few colleagues who were already deep into AI-assisted development pointed me toward the concepts that actually matter. Not programming concepts — workflow concepts:

- **CLAUDE.md**: A context file where you define how Claude should work with your project. Your preferences, your architecture decisions, your communication style. It's like onboarding a new team member, except the onboarding document is the team member's brain.
- **Skills**: Reusable prompts for tasks you do repeatedly. Instead of explaining the same thing every session, you build it once.
- **Git basics**: Branches, commits, pushing. Enough to save your work and not lose it. You don't need to understand git deeply — just enough to not be afraid of it.

None of this was particularly hard. But I wouldn't have known to look for it without someone pointing me in the right direction. That's the real barrier to entry — not technical difficulty, but knowing which few things actually matter among the thousands of things you could learn.

## The Approach: Replicate, Then Diverge

My first question to Claude was simple: what's the best way to rebuild a portfolio site that needs a content management system and high-quality video hosting?

The answer was Sanity CMS for content management and Mux for video hosting, running on Next.js. I didn't evaluate alternatives. I didn't spend a week researching. I trusted the recommendation and started building.

The strategy was deliberately boring: replicate my existing Squarespace site block by block. Hero sections, media grids, split layouts, carousels — each one a self-contained component. No redesign, no new features. Just get to parity.

This was methodical, not magical. Each block took iteration. Some came together in minutes. Others required multiple rounds of revision to get spacing, responsiveness, and interactions right. The process looked like: describe what I want, review the output, point out what's wrong, watch it fix it. Sometimes three cycles, sometimes ten.

The step change came when I connected Sanity's MCP (Model Context Protocol) server to Claude Code. Suddenly, when I asked for a new content field — say, a caption option on media blocks — Claude would create both the frontend component update and the CMS schema field simultaneously. The content management system and the website evolved together, in one conversation. That felt qualitatively different from anything I'd experienced with traditional tools.

## What Was Hard

I'm not going to tell you everything was effortless, because it wasn't.

**Animations were the biggest challenge.** Static layouts are straightforward to describe — you can reference screenshots, mockups, or just say "two columns, image left, text right." Motion is a different problem. How do you describe the feel of an easing curve? The timing of a staggered entrance? I found myself reaching for words that don't quite exist — "it should feel like it's settling, not snapping" — and getting results that were close but not right. You can't easily show Claude a video reference and say "like this." This is genuinely hard, and I don't have a clean solution for it yet.

**The CMS UX trade-off was real.** Sanity is powerful and flexible, but it's not Squarespace. The editing experience is more raw. Fields and schemas are developer-oriented. I had to resist the urge to spend time polishing the CMS interface itself — I was supposed to be building a portfolio, not building a content management system. This is a real trade-off: you gain unlimited freedom on the frontend, but you lose the polished authoring experience that template platforms spend years refining.

**Some things just took longer than expected.** Not everything that sounds simple is simple. Edge cases in responsive layouts, image optimization pipelines, deployment configuration — these are the kinds of things that don't appear in anyone's demo but eat real hours.

Worth it? Yes. Squarespace gives you a polished ceiling. This gives you no ceiling at all. But the gap between those two options isn't free.

## You're Not Just Building — You're Building How You Build

This is where the story changes direction.

Somewhere in the middle of building the portfolio, I realized I was spending as much time improving my workflow as I was building the site itself. And that the workflow improvements were the more valuable output.

The clearest example: I'd been using WhisperFlow, a third-party app, for voice dictation while working — hold a key, speak, release, and the transcribed text appears. It worked fine. But one day I thought, could I just build this myself?

Ten minutes later, I had a custom dictation system running through Hammerspoon and a local Whisper model. Hold Right Option to record, release to transcribe. Exactly the behavior I wanted, with no subscription, no external dependency, and full control over the model and configuration. The WhisperFlow app was good. Mine was mine.

That's a small example, but it illustrates something that kept happening. Anything that created friction in my workflow, I could just fix. Not "file a feature request and wait." Not "search for a plugin that kind of does what I need." Just describe the problem, build the solution, move on.

This extended to everything:

- I built a skill that lets me capture ideas by saying `/idea` followed by a thought, and it automatically categorizes and files it in the right backlog — articles, experiments, design concepts, whatever fits.
- I built a `/link` skill that processes any URL I share — fetches the title and metadata, asks what I want to do with it, and either saves it as a curated article or kicks off a brainstorming session.
- I set up research agents that can deep-dive into topics and return structured summaries.
- I created a spitballing workflow where I develop article ideas through conversation, building up notes and outlines iteratively.

The portfolio was supposed to be the project. Instead, it became the catalyst for building something closer to a second brain — a personalized system for capturing, developing, and acting on ideas. The site is almost a side effect.

## Where This Goes

Each thing I build makes the next thing easier. The skills I created for idea capture feed into the article pipeline. The article pipeline uses the same CMS that powers the portfolio. The portfolio showcases the thinking that the whole system helps develop. It compounds.

What I'm most interested in now is the emerging connection between design tools and code. The ability to work in Figma and have those designs inform what Claude Code builds — or the reverse, seeing code changes reflected back in a design tool. That bridge is forming, and for a designer working this way, it could be the next step change.

But the broader point isn't about any specific tool or workflow. It's this: when you build your portfolio in an environment like Claude Code, you're not just making a website. You're establishing a platform — for the portfolio, yes, but also for every idea, project, and tool you'll want to build next. The portfolio becomes the first thing you built, not the only thing you can build.

That's the difference between a template and a foundation. A template does one thing well. A foundation lets you do anything — including things you haven't thought of yet.

For a designer who spent years working within the constraints of other people's tools, that shift is hard to overstate.
