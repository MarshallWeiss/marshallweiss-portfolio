---
title: "Spec-Driven Development, Explained for Designers"
description: "A caption field on my portfolio made the idea click: write down the change, give the agent enough context, and check what it builds against what you asked for."
date: "2026-09-01"
slug: "spec-driven-development-for-designers"
tags: ["AI", "Spec-Driven Development", "Design Systems", "MCP", "Workflow"]
readingTime: "6 min read"
---

# Spec-Driven Development, Explained for Designers

I asked Claude Code to add a caption field to the media blocks on my portfolio. Because I'd connected it to Sanity through MCP, it could read both sides of the change. It updated the CMS schema and the frontend component in one pass.

The satisfying part wasn't just that it wrote the code quickly. It was that I could describe a change in terms of the content I wanted to publish, and the agent had enough context to carry it through the system. I didn't have to explain the website and the CMS as two unrelated jobs.

That's a small example of the way I want to work with these tools: make the intent explicit, give the agent access to the relevant system, then check the result.

## A specification gives you something to check

“Vibe coding” is the term that caught on after Andrej Karpathy coined it in early 2025. By the end of that year it was a dictionary word of the year. It describes a recognizable experience: tell the AI what you want, accept what comes back, and keep going.

But accepting whatever comes back isn't a useful description of my responsibility as a designer. I still need to know whether the result does what I meant.

Spec-driven development starts by writing that intent down precisely enough to check. The agent builds against the specification. I review what it produces against the same document. If I change my mind halfway through, the specification needs to change too.

That changes which artifact has authority. In the version [described by Thoughtworks](https://thoughtworks.medium.com/spec-driven-development-d85995a81387), the specification is the source of truth; code is generated or verified output that should conform to it. When they disagree, the discrepancy needs resolving rather than quietly becoming undocumented behavior.

Designers already do some of this. An annotated Figma file describes layout, behavior, and intent. The extra work is making explicit the parts that someone familiar with the product might otherwise fill in from memory.

## Start with the questions you'd rather skip

“Let readers save articles for later” sounds like a feature. It leaves most of the feature undecided.

Do saves sync across devices? Where does a reader find them again? Are there folders? What happens offline? What if the save request fails? Before building, I'd want the agent to help surface those questions, then put the answers in one document attached to the ticket.

That document needs the requirements and boundaries, the existing components and architecture it will use, and the data that has to be stored. It also needs test criteria: what would convince us that saving an article works? Empty states, failed requests, and repeated clicks belong there too.

A `spec.md` can hold all of that. The filename matters much less than keeping it current. If the requirements stay scattered across a long conversation, the next person reviewing the feature has to reconstruct the decisions before they can judge the work.

The temptation is to start building immediately because now you can. I think the planning deserves more patience precisely because implementation has become so easy to start.

## The agent needs to know which product it's in

The specification describes the change. It doesn't describe everything around it.

An agent needs to find the components we already have, understand which services they use, and distinguish current patterns from legacy ones. It needs the design system's tokens and usage rules. Tickets, past decisions, reader complaints, and constraints on third-party integrations can all change what a sensible implementation looks like.

MCP, the Model Context Protocol, provides a standard way to connect AI tools to external tools and data. [GitHub](https://github.com/github/github-mcp-server) and [Atlassian](https://github.com/atlassian/atlassian-mcp-server) publish servers for their systems. Figma's MCP support can expose design structure rather than leaving the agent to interpret a screenshot. My Sanity caption change was a small, concrete example of why those connections matter.

For a larger product, connecting a tool is only the beginning. The agent still has to retrieve the relevant parts of a codebase, get up-to-date information about tickets and documentation, and be given business constraints that aren't necessarily written in code. A server connection doesn't automatically supply the judgment a senior developer has accumulated over years.

That's the standard I'd like to work toward: enough context for the agent to consider whether a change fits the product, as well as whether it can produce code for it.

## Write down the design system's unwritten rules

A Figma library can show an agent what a component looks like. It may not explain when to use it, which variant is appropriate, or which exception everyone on the team already knows about.

For this way of working, that guidance has to be readable. Components need usage notes. Tokens need a consistent representation. Accessibility requirements need to be explicit. Figma's [guidance for writing design system guidelines](https://developers.figma.com/docs/code/write-design-system-guidelines/) is a useful reference, and existing Storybook documentation can give an agent material to work from.

I see this as preparation worth doing before asking an agent to build features. Otherwise, the same missing spacing rule turns into a fresh explanation in every session. The system may be obvious to the three people who maintain it and almost invisible to anyone else.

## Verification is part of the specification

If the document says how we'll know the feature works, those criteria should guide the checks before review. Tests, security scanning, accessibility checks, performance budgets, and checks for approved components all have a role.

I'd want those running before a developer spends time on the pull request. They can remove routine mistakes and give the reviewer better evidence. They can't establish that every security concern, keyboard interaction, or architectural decision is correct. Passing a check is useful information, not a reason to stop looking.

The developer still has to evaluate things I may not be able to judge: race conditions, behavior at scale, maintainability, and whether the implementation fits the surrounding code. The aim is to give that review a better starting point.

## What this asks of the designer

I don't think directing an agent requires understanding every line it writes. I do think it requires being able to test what it made. Open the browser tools, read an error, walk through a flow, reload to see whether data persisted, and check the layout on a phone. Those are learnable skills, but they are additional responsibilities.

It also asks for more precise writing. “Make it feel lighter” leaves room for several interpretations. “Reduce the card padding from 24 to 16, remove the border, and keep the shadow” describes a change someone can verify. There is room for exploration, but at some point a decision has to become specific.

An agent can sound certain and still build the wrong thing. A specification doesn't prevent that. It gives us a shared account of what the result was supposed to be, so correcting it doesn't depend on remembering the conversation.

That's what interests me about spec-driven development. The caption field was a small request, but I could follow it from intent to content model to page. I want the same clarity when the feature is bigger and someone else has to maintain it.
