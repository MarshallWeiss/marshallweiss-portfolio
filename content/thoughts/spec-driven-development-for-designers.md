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

What I liked was describing the change in terms of the content I wanted to publish. The agent had enough context to carry it through, so I didn't have to explain the website and the CMS as two separate jobs.

I'd like to work that way on purpose, for features bigger than a caption.

## Something to check against

“Vibe coding” is the term that caught on after Andrej Karpathy coined it in early 2025. By the end of that year it was a dictionary word of the year. It describes a recognizable experience: tell the AI what you want, accept what comes back, and keep going.

Accepting whatever comes back doesn't work for me as a designer. My job is knowing whether the result does what I meant.

Spec-driven development starts by writing that intent down precisely enough to check. The agent builds against the specification. I review what it produces against the same document. If I change my mind halfway through, the specification needs to change too.

That changes which artifact has authority. In the version [described by Thoughtworks](https://thoughtworks.medium.com/spec-driven-development-d85995a81387), the specification is the source of truth; code is generated or verified output that should conform to it. When they disagree, the discrepancy needs resolving rather than quietly becoming undocumented behavior.

Designers already do some of this. An annotated Figma file describes layout, behavior, and intent. The extra work is making explicit the parts that someone familiar with the product might otherwise fill in from memory.

## Saving an article for later

“Let readers save articles for later” sounds like a feature. It leaves most of the feature undecided.

Do saves sync across devices? Where does a reader find them again? Are there folders? What happens offline? What if the save request fails? Before building, I'd want the agent to help surface those questions, then put the answers in one document attached to the ticket.

That document needs the requirements and boundaries, the existing components and architecture it will use, and the data that has to be stored. It also needs test criteria: what would convince us that saving an article works? Empty states, failed requests, and repeated clicks belong there too.

A `spec.md` can hold all of that. The filename matters much less than keeping it current. If the requirements stay scattered across a long conversation, the next person reviewing the feature has to reconstruct the decisions before they can judge the work.

Building is now so easy to start that it's tempting to skip this part, which is the main reason not to.

## The agent needs to know which product it's in

The specification describes the change. It doesn't describe everything around it.

An agent needs to find the components we already have and tell current patterns from legacy ones. It needs the design system's tokens and usage rules. Past decisions, reader complaints, and limits on third-party integrations can all change what a sensible implementation looks like.

MCP, the Model Context Protocol, provides a standard way to connect AI tools to external tools and data. [GitHub](https://github.com/github/github-mcp-server) and [Atlassian](https://github.com/atlassian/atlassian-mcp-server) publish servers for their systems. Figma's MCP support can expose design structure rather than leaving the agent to interpret a screenshot. My Sanity caption change was a small, concrete example of why those connections matter.

For a larger product, connecting a tool is only the beginning. The agent still has to retrieve the relevant parts of a codebase, get up-to-date information about tickets and documentation, and be given business constraints that aren't necessarily written in code. Plugging in a server doesn't give the agent what a senior developer knows after years on the codebase.

What I want is enough context for the agent to tell whether a change fits the product. Producing the code is the easy part.

## The design system's unwritten rules

A Figma library can show an agent what a component looks like. It may not explain when to use it, which variant is appropriate, or which exception everyone on the team already knows about.

An agent needs that written down. Components need usage notes. Tokens need a consistent representation. Accessibility requirements need to be explicit. Figma's [guidance for writing design system guidelines](https://developers.figma.com/docs/code/write-design-system-guidelines/) is a useful reference, and existing Storybook documentation can give an agent material to work from.

Do this before asking an agent to build features, or the same missing spacing rule gets explained again in every session. A design system can be obvious to the people who maintain it and nearly invisible to everyone else.

## Verification is part of the specification

If the document says how we'll know the feature works, those criteria should guide the checks before review. Tests, security scanning, accessibility checks, performance budgets, and checks for approved components all have a role.

I'd want those running before a developer spends time on the pull request. They can remove routine mistakes and give the reviewer better evidence. They can't tell you that every security concern, keyboard interaction, or architectural decision is right.

The developer still has to evaluate things I may not be able to judge: race conditions, behavior at scale, maintainability, and whether the implementation fits the surrounding code.

## What changes for me

I don't think directing an agent requires understanding every line it writes. I do think it requires being able to test what it made. Open the browser tools, read an error, walk through a flow, reload to see whether data persisted, and check the layout on a phone. None of that is hard to learn, but it's more than I used to do.

It also asks for more precise writing. “Make it feel lighter” leaves room for several interpretations. “Reduce the card padding from 24 to 16, remove the border, and keep the shadow” describes a change someone can verify. There is room for exploration, but at some point a decision has to become specific.

An agent can sound certain and still build the wrong thing. A specification doesn't prevent that. It gives us a written account of what the result was supposed to be, so fixing it doesn't depend on anyone remembering the conversation.
