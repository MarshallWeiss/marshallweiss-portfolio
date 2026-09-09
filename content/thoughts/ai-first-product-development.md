---
title: "When the Designer Builds: Rethinking the Handoff at a Newsroom"
description: "Most of my time as a product designer at El Confidencial goes to fixing what got lost between Figma and code. Here is the workflow I'm building toward, where the designer builds and the developer reviews."
date: "2026-02-09"
slug: "ai-first-product-development"
tags: ["AI", "Product Development", "Design Systems", "Workflow", "El Confidencial"]
readingTime: "7 min read"
---

# When the Designer Builds: Rethinking the Handoff at a Newsroom

## We spend our time on the wrong things

At El Confidencial the workflow is standard. A product owner writes requirements in Jira. I design in Figma. Developers build it. We review, we ship. Sprints are organized around funnel metrics, and the design team sits in a digital lab alongside developers, product managers, data analysts, marketing, and the subscriptions team.

Except most of my time isn't spent designing new things. It's spent on fixes. Reviews where what got built doesn't match what I designed. Explaining the same spacing rule for the third time. Chasing down why a component looks slightly off.

Part of this is our design system, which was built years ago and never kept up. We are running MUI components skinned to look like shadcn components, which is exactly as backwards as it sounds.

But most of it is structural. The designer-developer handoff is a bottleneck by design. I make something in Figma. I hand it over. The developer interprets it, asks questions, I clarify, they build something almost right, and we iterate. Meanwhile the design system falls further behind, because who has time to maintain it when we're drowning in tickets.

The fix isn't a better handoff. It's a different shape of work.

## Adding AI is integration. This is transformation.

Most teams are asking which AI tool to add to their workflow. That's the wrong question. Adding Cursor or Claude Code or Copilot to the existing process is integration. The real question is what happens if AI is the workflow.

The paradigm I'm working from is spec-driven development. In the traditional model, code is the source of truth and specs are documentation that falls out of date. Spec-driven development inverts it: the specification is the source of truth, and code is generated or verified output that has to conform to it. I've written a [separate explainer](/thoughts/spec-driven-development-for-designers) on what that means in practice.

For a newsroom product team, it inverts the roles:

- **Designers direct and build.** With an agent, a designer goes from idea to working code.
- **AI handles translation.** Between design intent and implementation, the part that burns all the time today.
- **Developers review and refine.** Architecture, security, performance, edge cases. Not translating Figma pixels to CSS.

This sounds radical. It is. It's also already how I built my own portfolio, so I know the shape of it from the inside.

## The workflow I'm building toward

Today a medium-sized feature takes two to three weeks with several review cycles. The loop looks like this:

```
Product owner writes the PRD
Designer makes Figma mockups
Handoff, developer interprets
Development, code review
Designer review: "that's not quite right"
Fixes, another round
Ship
```

The version I'm building toward:

```
Product owner writes the PRD
Agent gathers context, edge cases, suggestions
Designer + agent produce working code
Automated gates: tests, security, accessibility, performance
Developer reviews architecture and edge cases
Ship
```

The target is three to five days, with fewer review cycles because problems surface early instead of at the end. Here is how a single feature moves through it.

### Requirements, with context

The product owner describes a feature: "Add the ability to save articles for later."

Instead of jumping to design, the agent first reads the situation. Existing bookmark-like features in the codebase. How favorites and reading lists already work. Technical constraints in the database schema and API. Which design system components exist for this. Whether readers already save articles some other way.

Then it asks the questions a good developer would ask on day three, on day one. Should this sync across devices? Where do saved articles live? Folders? Offline support? The output is a spec document that lives in the ticket and becomes the source of truth: requirements, technical approach, design considerations, test criteria, edge cases.

### The design system has to be readable first

Before building anything, the design system has to be legible to an agent. This is the step everyone skips.

For us that means finally documenting the components properly, expressing tokens in a standard format, and writing guidelines that say when to use what. Figma now publishes [guidance on writing design system guidelines](https://developers.figma.com/docs/code/write-design-system-guidelines/) for exactly this purpose, and an agent can convert existing Storybook documentation into that shape. The maintenance we never had time for becomes something the agent can help carry.

### The designer builds

This is where it gets interesting. I build the feature. Not in Figma. In code. But I'm not writing the code by hand. I'm directing.

```
Me: Create a save-article button using our existing bookmark icon component.
On click, save the article ID to the user's saved articles table.
Show a toast confirmation using our notification system.
It needs to work in the article header and on article cards.
```

The agent produces the component in our patterns, the data mutation with error handling, the toast integration, styles from our tokens, and basic tests. I see a live preview and review it the way I'd review a prototype. Does it look right? Does clicking work? Does it match our other bookmark patterns?

```
Me: The toast should appear top-right, not bottom-center.
Add a subtle animation on save.
```

It adjusts. I review again. Repeat until it's right.

I'm not reviewing code quality. I'm reviewing function and design, which is what I'm good at. Code quality gets checked next.

### Automated gates before any human sees it

Before a developer looks at the pull request, automated checks run. Tests must pass. Security scanning must pass. Accessibility checks must pass: labels, keyboard navigation, contrast. Performance produces warnings on bundle size and query cost. And a design system check confirms the code uses approved components and tokens.

Only if all of that passes does the PR reach a person.

### The developer as expert reviewer

The developer reviews what I can't evaluate. Does this fit our architecture, or is there a better approach? Are errors and race conditions handled? Will it hold at scale? What happens offline, or if a reader spam-clicks the button? Is it maintainable?

What they're not reviewing anymore: basic functionality, design accuracy, component usage, simple bugs. I tested the first two, the gates caught the rest. Developer review becomes higher leverage, focused on hard problems.

## The reality check

This workflow requires designers who can tell whether code works. Not understand it deeply, but use browser dev tools, read an error message, test a flow, confirm data persisted, check responsive behavior. Some designers already can. Others would need training. That's a real constraint, not a footnote.

Security is the other one. Designers don't think about injection or cross-site scripting. That's why automated scanning is non-negotiable, and why developer review stays in the loop.

And there's the legacy problem. El Confidencial is a live newspaper. We can't stop and rebuild. We have old code that's fragile to touch, undocumented corners where the original developer left years ago, third-party integrations we don't fully control. That's the reality for most companies, and it means the strategy can't be "rewrite everything." It's "new features use the new workflow, old features get migrated when touched." When we have to change something old, the agent reads and explains it, writes tests before anything moves, refactors while preserving behavior, and documents it for the next person. Untouched legacy stays untouched.

## Where we actually are

I want to be honest about the distance between this article and Monday morning.

We're not there yet. We're in early stages: experimenting with tools, building context, figuring out what works. The design system still needs documenting. Some developers are skeptical. Some designers are excited, others nervous. The biggest risk isn't technical, it's organizational. Developers who feel threatened, designers who don't want to learn new skills, managers who see the whole thing as exposure.

That's why the plan is small. One designer, one feature, a senior developer shadowing. Measure the time, the bugs caught, the review cycles. Show the numbers. Then do it again with less supervision.

The direction is clear, though. This isn't about replacing developers. It's about restructuring where value gets created. Designers get closer to shipping and keep ownership of their work through implementation. Developers spend their time on systems and hard problems instead of "this should be 16px, not 18px." And the translation work that burned so many hours, the "what did the designer mean by this," is handled by the thing that's actually good at it.

The teams that figure this out first won't win because they use AI. Everyone will use AI. They'll win because they rebuilt the workflow around it.
