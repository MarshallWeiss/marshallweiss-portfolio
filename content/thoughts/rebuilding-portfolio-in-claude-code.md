---
title: "What I Learned Rebuilding My Portfolio in Claude Code"
description: "I left Squarespace because my videos looked bad. Along the way I built my own dictation tool and spent hours trying to describe animations in words."
date: "2026-02-20"
slug: "rebuilding-portfolio-in-claude-code"
tags: ["AI", "Claude Code", "Portfolio", "Product Design", "Spec-Driven Development"]
readingTime: "6 min read"
---

# What I Learned Rebuilding My Portfolio in Claude Code

I wanted a portfolio I could experiment with. If I wanted to change the navigation or reorganize a whole section, I wanted to be able to work through that with AI. If I just wanted to upload a photograph, add a video, or change some text, I wanted to do it myself.

I wanted both.

My Squarespace site was fine for static case studies, but it was getting in the way of the motion and interaction work I wanted to show. High-resolution videos meant compression artifacts, limited embed options, and sluggish playback. Moving to another site builder might have solved some of that. I also wanted more freedom to change the site itself.

That's what led me to Claude Code. The question was how to get that freedom without turning every caption edit into a conversation with an agent.

## First, learn how to ask

The terminal was the first obstacle. I'm a designer; I'm used to being able to look around an interface and work out what to do. A blinking cursor didn't give me much to go on. Switching to the Claude Code extension in VS Code helped. File trees and tabs gave the work a shape I recognized, even while much of what happened inside them was new to me.

A few colleagues who were already using these tools pointed me toward the things worth learning first. `CLAUDE.md` was one: a file where I could write down the project's architecture, my preferences, and how I wanted Claude to work. Skills let me save instructions for things I did repeatedly. And I needed enough Git to understand branches, make commits, and push my work without worrying that I'd lose it.

None of it was hard once someone explained it. The hard part was knowing it existed. There are thousands of things you could learn before building a website, and I had no idea which few I needed.

My first question to Claude was what to use for a portfolio with a CMS and good video hosting. It recommended Next.js, Sanity, and Mux. I went with that. I didn't compare every alternative or arrive at an independently researched technical decision. I trusted the recommendation and started building.

## I still wanted to edit things by hand

At the time, I didn't have a good way to select a component in the page and edit it directly with an inspector-style tool. The CMS was my workaround. I could define the kinds of content I needed, then upload images, add videos, and make manual edits through fields I understood.

Because Sanity is headless, that editing interface doesn't dictate how the website has to look. I can change what I build on the frontend while keeping a place to manage the content. I like that split. I control both.

Mux handles the video hosting and gives me the options I wanted for larger videos. I've been able to use the free tiers for this setup, which has made it practical to keep experimenting without adding another site-builder subscription.

## Copy the old site before changing it

I rebuilt the Squarespace site block by block: heroes, media grids, split layouts, carousels. Each became a component. Keeping the design familiar meant I could judge the result without also deciding what the site ought to look like.

That still took a while. Getting everything from Figma into the new portfolio wasn't automatic, and making the mockups was one of the slowest and most frustrating parts. Some of them I'd like to go back and redo.

Some blocks came together in minutes. Others took three rounds of corrections, or ten. I'd describe a layout, look at what appeared, and point out where it was wrong. Spacing and responsive behavior needed attention every time.

Connecting Sanity's MCP server to Claude Code changed the process more than I expected. When I asked for a caption field on media blocks, Claude updated both the frontend component and the CMS schema in the same pass. Until then, those had felt like separate systems I needed to keep in sync. Now I could ask for a content change and see it carried through to the page.

That was when the setup started to feel worth it.

## What stayed hard

Motion was the hardest thing to communicate. A static layout gives you something to point at: two columns, image on the left, this much space between them. An animation asks you to describe a feeling over time.

I kept reaching for phrases like “it should feel like it's settling, not snapping.” The result would be close, but the easing or timing would still be off. In the workflow I was using, I couldn't easily hand over a video reference and expect it to reproduce the feel. I still haven't solved that.

Sanity brought a different frustration. Its flexibility was useful, but the authoring experience was less polished than Squarespace's. I was dealing with fields and schemas, and I kept having to resist polishing the CMS itself. The project was supposed to be my portfolio. It was easy to turn it into a project about the tool I used to edit my portfolio.

Responsive edge cases, image optimization, and deployment configuration took time too, and none of it is interesting to describe.

I'm glad I switched. I also took on a lot of work Squarespace used to do for me.

## Then I built the dictation tool

Somewhere in the middle of all this, I started spending as much time improving my workflow as building the site.

I'd been using Wispr Flow for dictation: hold a key, speak, release it, and get text. It worked. Then I wondered whether I could make my own version.

About ten minutes later I had Hammerspoon connected to a local Whisper model. Hold Right Option to record; release it to transcribe. No dictation subscription, and control over the model and configuration. It was a small tool, but it did exactly what I wanted.

Other bits of friction started looking solvable too. I made an `/idea` skill that takes a thought and files it in the appropriate backlog, whether it's an article, an experiment, or a design concept. A `/link` skill fetches a URL's title and metadata, asks what I want to do with it, and can save a curated article or start a brainstorming session.

I set up research agents to return structured summaries. I made a conversational workflow for developing article ideas into notes and outlines. These weren't things I'd set out to build when I decided the videos on my portfolio looked bad. They came from using the environment long enough to notice what I wanted it to do differently.

## How the pieces fit

These pieces feed each other. Ideas I capture end up in the article workflow, and finished articles go on this site. I don't have to start from scratch each time I want to try something.

I'm particularly interested in the connection between Figma and code: designs informing what gets built, and code changes finding their way back into a design tool. As a designer, I can see how much of my current back-and-forth that could remove. It's a direction I want to explore, rather than something I've finished solving.

The portfolio did get built. But the change I notice most is in how I react to a limitation in a tool. I used to look for a setting, a plugin, or another product. Now I also ask whether I can make the small thing I need myself.

Sometimes that means more maintenance than I planned. Sometimes it's ten minutes and a keyboard shortcut.
