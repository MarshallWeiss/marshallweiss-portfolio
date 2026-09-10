---
title: "When the Designer Builds: Rethinking the Handoff at a Newsroom"
description: "At El Confidencial, I spend too much time correcting the gap between Figma and production. I want to test a workflow where I build with an agent and a developer reviews the result."
date: "2026-02-09"
slug: "ai-first-product-development"
tags: ["AI", "Product Development", "Design Systems", "Workflow", "El Confidencial"]
readingTime: "6 min read"
---

# When the Designer Builds: Rethinking the Handoff at a Newsroom

At El Confidencial, a product owner writes requirements in Jira, I design in Figma, and developers build. Then we review, fix things, and ship. Our digital lab brings together design, development, product, data, marketing, and subscriptions. Sprints are organized around funnel metrics.

On paper, it's a familiar process. In practice, most of my time goes into fixes. I review something and find that it doesn't quite match the design. I explain a spacing rule again. We track down why a component looks slightly wrong. These are small things, but there are a lot of them.

Our design system is part of the problem. It was built years ago and hasn't kept pace with the work. We have MUI components styled to look like shadcn components. That arrangement reflects a real constraint: converting everything wasn't feasible. But keeping the two aligned adds work, and maintenance competes with the next ticket.

I keep coming back to the same frustration: I know what I'm trying to make, but getting it into production means someone else has to interpret it before I can see whether it works.

## What building my portfolio changed

I built my own portfolio by directing an agent, looking at the result, and correcting it. That put design decisions much closer to the thing they changed. I could try something in the working site, instead of waiting for a handoff and another review cycle.

A portfolio isn't a newspaper. I don't mistake that experience for proof that the same process will work across our codebase. But it gave me a concrete version of a question I'd like to test at work: what if the designer brought working code to review?

The approach I'm interested in is spec-driven development. The specification records what the feature should do and how we'll check it. The agent builds against that document, and changes have to stay consistent with it. I've written a [separate explainer](/thoughts/spec-driven-development-for-designers) about the preparation this requires.

In the workflow I'm proposing, I would direct the implementation as well as the design. The agent would do much of the translation into code. A developer would review the result for architecture, security, performance, and the problems I don't know how to spot.

That changes my responsibilities too. I would need to bring something tested and reviewable, rather than assuming the developer will finish working out its behavior.

## A feature I'd use to test it

Today, a medium-sized feature takes us two to three weeks, with several rounds of review. I'd like to test whether we can get that down to three to five days. That's a target, not a result we've achieved.

Take a hypothetical save-article feature. The product owner asks for readers to be able to save stories for later. Before making screens, I'd want the agent to examine what's already there: any favorites or reading-list behavior, the database and API constraints, and the available design system components.

Then we'd work through the questions. Do saves sync across devices? Where do readers find them? Are there folders? What should happen offline or when a request fails?

The answers belong in a specification attached to the ticket, along with the technical approach, design decisions, test criteria, and edge cases. I want those questions settled while changing the answer is still cheap.

There's preparation we'd have to do before this could work reliably. Our components need proper documentation, the tokens need a consistent format, and the agent needs written guidance on when to use what. Figma's [design system guidelines documentation](https://developers.figma.com/docs/code/write-design-system-guidelines/) offers one reference for that. Existing Storybook documentation could help us get started. Connecting the agent to an undocumented library wouldn't, by itself, solve the problem.

## Review the thing as it takes shape

With that context in place, I could ask for a save button using our existing bookmark icon, persisting the article ID to the reader's saved articles, and confirming it through our notification system. It would need to work in both the article header and article cards.

I'd expect the agent to produce the component, the data change, error handling, token-based styles, and tests. Then I'd use the live preview. Does the action work? Does the saved state survive a reload? Does it behave consistently in both places? Does it match the rest of the product?

I could correct the toast position or the save animation while looking at the implementation. That's the part of my portfolio workflow I want to bring into the newsroom: shorter distance between seeing a problem and trying a correction.

The proposed sequence is straightforward:

1. Agree the requirements and specification.
2. Build and review the feature with the agent.
3. Run tests and security, accessibility, performance, and design system checks.
4. Have a developer review the implementation.
5. Ship when the reviews are resolved.

The checks should happen before the developer picks up the pull request. They won't catch everything, and neither will I. But the reviewer should have more to work with than an untested patch and an assurance that it looks right on my screen.

## The developer's review still matters

I can evaluate the design and test the reader's flow. I can't reliably judge every architectural choice, race condition, or security problem in the code an agent produces.

A developer would still need to ask whether the change fits our systems, handles errors properly, and will hold up at scale. What happens if a reader clicks repeatedly? What if requests finish out of order? Can someone else maintain it?

I want fewer review cycles spent correcting routine visual mismatches. I don't expect a passing test suite to remove the need for someone to understand the code.

There's also the codebase we actually have. El Confidencial is a live newspaper. We can't stop publishing to rebuild it. There is fragile old code, undocumented work whose original developer has left, and third-party integrations outside our control.

The approach would have to be incremental: try the workflow on new features, and migrate older ones when we need to touch them. Before changing an old component, have the agent explain its behavior, write tests, and preserve that behavior through the refactor. Then document what changed. A wholesale rewrite isn't a credible starting point.

## Where we actually are

We're still experimenting with tools and building context. The design system needs work. Some developers are skeptical; some designers are interested, and others are nervous. There are reasonable concerns about code quality, responsibilities, and how much new technical knowledge a designer would need.

Using browser tools, reading errors, testing persistence, and checking responsive behavior would have to become part of the job. Security scanning and developer review would remain necessary. None of that disappears because generating a component is fast.

The pilot I have in mind is one designer, one feature, and a senior developer shadowing the work. We'd measure the time, the bugs caught, and the number of review cycles. Then try it again with less supervision.

I'd like to spend more of my week making the product better and less of it explaining the same gap between Figma and production. Building my portfolio showed me a different way to work through that gap. The next step is to find out how much of it survives contact with a newsroom.
