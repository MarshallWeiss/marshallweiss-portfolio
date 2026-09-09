---
title: "Spec-Driven Development, Explained for Designers"
description: "Vibe coding is the cultural term. Spec-driven development is the discipline. What it is, what an agent needs to know about your product before it can build, and what has to be true of you."
date: "2026-09-01"
slug: "spec-driven-development-for-designers"
tags: ["AI", "Spec-Driven Development", "Design Systems", "MCP", "Workflow"]
readingTime: "7 min read"
---

# Spec-Driven Development, Explained for Designers

## The term you've heard is the wrong one

You've probably heard "vibe coding." Andrej Karpathy coined it in early 2025 to describe talking to an AI and accepting whatever code comes back, and it stuck well enough to become a dictionary word of the year. It's a good name for a mood. It's a bad name for a way of working.

What I do, and what I think designers who build should aim for, is closer to spec-driven development. You write down what you want with enough precision that the outcome is checkable. The agent builds against that. You review the result against the spec, not against your vibe.

The distinction matters because of what becomes the source of truth. In traditional development, code is the truth and documentation is the thing that falls out of date. Spec-driven development [inverts that](https://thoughtworks.medium.com/spec-driven-development-d85995a81387): the specification is the truth, and code is generated or verified output that has to conform to it. If the code and the spec disagree, the spec wins and the code changes.

For a designer, this should feel familiar. A good Figma file with annotations already is a spec. The difference is that now the spec goes to a thing that reads all of it, asks questions about the gaps, and builds.

## What a spec actually contains

The planning phase is where most of the value lives, and it's the part people skip when they're vibing.

Before any code, the agent should ask iterative questions until the requirements and edge cases are understood. A feature request like "let readers save articles for later" turns into a conversation: should saves sync across devices, where do they appear, are there folders, what happens offline, how many do we expect per reader. The answers get compiled into a single document, usually a `spec.md`, that holds:

- **Requirements.** What the feature does and doesn't do, in plain language.
- **Architecture decisions.** Which existing patterns and components it uses, and why.
- **Data model.** What gets stored, where, and how it relates to what already exists.
- **Test criteria.** How you'll know it works, written before it exists.
- **Edge cases.** The offline, the empty state, the double-click, the failed request.

This lives in the ticket. Every later step points back to it. When I ask for a change mid-build, I'm amending the spec, not improvising.

## The context layer: what the agent needs to know

A spec describes one feature. But for the agent to build it in your product, rather than in a generic product, it needs to know your world.

Your codebase and dependencies: every component, every service, what's legacy and what's current, where the technical debt lives. Your design system: components, tokens, patterns, when to use which, the accessibility rules and the exceptions. Your backlog: current priorities, past decisions and their reasoning, what users have complained about. Your constraints: the systems that can't be touched, the third-party integrations, the performance budget.

Two years ago this was aspirational. Now it's plumbing, mostly through the Model Context Protocol, a standard for connecting AI systems to external tools and data. Think of it as API endpoints designed for AI context. [GitHub](https://github.com/github/github-mcp-server) and [Atlassian](https://github.com/atlassian/atlassian-mcp-server) publish official servers, so an agent can read your repository, your issues, and your Jira tickets directly. Figma has MCP support that lets an agent understand your components structurally rather than as pictures.

The moment this clicked for me was on my own portfolio. I connected the Sanity CMS server to Claude Code, and when I asked for a new caption field on media blocks, the agent updated the frontend component and the CMS schema in one pass. The content model and the site evolved together, in one conversation. That's what a context layer feels like from the inside: the agent stops guessing about your system because it can read it.

For a larger product, the context layer has roughly three parts. Continuous ingestion, where MCP servers keep the agent current on tickets, pull requests, and design documentation. A retrieval layer, so a codebase too big for a context window can be queried in relevant pieces instead of loaded whole. And business context: the roadmap, the deprecation plans, the compliance rules, the constraints that a senior developer carries in their head and a new hire doesn't.

The goal is an agent that knows your product the way your senior developers do. When you ask it to build something, it considers not only how to write the code but whether it fits the architecture, uses the right components, and respects the constraints.

## The design system has to be legible first

This is the step I'd put in bold if I were allowed one.

An agent can only use your design system if it can read it. That means documented components with clear usage guidance, tokens expressed in a standard format, and written rules about when to use what. Figma now publishes [guidance on writing exactly these guidelines](https://developers.figma.com/docs/code/write-design-system-guidelines/), and an agent can convert existing Storybook docs into that form.

If your design system is a Figma library and a shared understanding among three people, the agent has nothing to build with, and you'll spend every session re-explaining spacing rules. Documenting the system is the highest-leverage preparation you can do, and it's also the maintenance work that never got done because there was always a ticket.

## Gates, not gatekeepers

The other half of spec-driven development is verification. If the spec says how you'll know it works, the pipeline should check it.

Before any human reviews an agent-built feature, automated gates run. Tests, written from the spec's criteria. Security scanning for the vulnerabilities designers don't think about, like injection and cross-site scripting. Accessibility checks for labels, keyboard navigation, and contrast. Performance budgets for bundle size and query cost. And a design system check confirming the code uses approved components and tokens rather than reinventing them.

Only after those pass does a developer look at it, and what they look at changes. They're no longer catching a missing label or a wrong padding value. They're evaluating architecture, race conditions, behavior at scale, maintainability. The hard problems. Everything below that has already been checked by something that doesn't get tired.

## What has to be true of you

Spec-driven development asks more of the designer than a Figma handoff does, and it's worth being honest about what.

You need to be able to tell whether code works. Not understand it line by line, but open the browser dev tools, read an error message, walk through a user flow, confirm that data actually persisted, and check the responsive behavior. That's a learnable set of skills, and I'd argue it's now part of the job, but it's not nothing.

You need to write with precision. A spec that says "make it feel lighter" produces a guess. A spec that says "reduce the card padding from 24 to 16, drop the border, and keep the shadow" produces the thing. Designers are good at this when they decide to be.

You need patience for the planning phase. The temptation is to start building because building is fun and the agent makes it fast. The teams that get burned are the ones that skip the questions and discover the edge cases in production.

And you need to accept that the agent will be confidently wrong sometimes. The spec is your protection. When the output diverges from it, you don't argue with the code. You point at the spec.

## Why this and not vibe coding

Vibe coding is fine for a prototype you'll throw away. For anything that has to live in a real product, alongside other people's work, the spec is what makes agent-built code reviewable, testable, and maintainable by someone who wasn't in the conversation.

Two years ago the argument against designers building was that we'd produce unmaintainable code. Spec-driven development is the answer to that argument. The code is checked against a document everyone can read, by gates that don't bend, before a developer ever sees it.

That's not vibes. That's the discipline that makes the vibes safe.
