---
title: "Focus Is the Tool: Working at an Agent's Pace"
description: "Spec-driven development has a different rhythm from writing code by hand. Most productivity advice assumes you can pause. With an agent running, you can't. Here is the environment I built around that."
date: "2026-02-12"
slug: "focus-the-essential-tool-spec-driven-development"
tags: ["AI", "Productivity", "Spec-Driven Development", "Workflow", "Focus"]
readingTime: "8 min read"
---

# Focus Is the Tool: Working at an Agent's Pace

## The shift nobody talks about

When you write code yourself, you control when you stop.

Need to check Slack? You pause between functions. Want a coffee? You finish the component first. Phone buzzes? You were already context-switching, so what's one more.

None of that works once an agent is doing the building.

Spec-driven development, where you write a detailed specification and direct an AI agent to build against it, has a completely different rhythm. You describe what you want, hit enter, and then you wait. The agent is reading your codebase, working out the context, generating a solution, running tests, opening a pull request.

You can't pause it mid-thought. You can't save your place and pick it up later without losing the thread. You aren't typing. You are observing, guiding, and making decisions at a few key moments.

Traditional coding is stationary and self-paced. This is dynamic and agent-paced. You move around. You think out loud. You watch things happen. And you have to hold your attention for much longer stretches than you are used to.

That changes what focus means.

## Why the usual productivity advice fails here

Most productivity advice assumes you are the one doing the work. Close your email. Use a Pomodoro timer. Take a break every 25 minutes.

But what happens when the agent is 18 minutes into analyzing your codebase and about to propose a solution? You can't take a break. You need to be there when it finishes, to evaluate what it produced, answer its questions, or steer it back if it went the wrong way.

The cost of a distraction is different too. When you're writing code by hand and lose your train of thought, that's annoying, but you can rebuild it. When you step away from a running agent, you miss the moment it needed guidance. You lose track of what it's doing and why. It keeps going in the wrong direction. The session's work is wasted.

I've had this happen. I asked Claude Code to refactor a complex component system, stepped away to check a message, and came back ten minutes later to find the work finished, built on assumptions I would have corrected had I been there. I threw the whole thing away and started over.

Spec-driven development isn't passive delegation. It's a collaboration that needs you present.

## The environment is the tool

If focus is the constraint, the environment is the leverage.

I used to think of environment as comfort. A nice chair, good light, pleasant music. That's part of it. But for this kind of work, environment is about removing every possible source of distraction so you can sustain attention for two to four hours at a time.

Here's what I've found actually matters.

### A door you can close

Open offices, shared spaces, and coffee shops work fine for traditional coding, where you can pause and resume. They're death for agent-paced work. Every nearby conversation is a potential context switch.

During a deep session I close my office door and put a sign on it. Anyone around knows it means I'm genuinely unavailable, not just "focused." If you don't have a door, borrow one. Book a meeting room. Work from home on deep days. This isn't a luxury. It's the baseline requirement for the work.

### A clear desk

Your brain processes everything in your visual field, even peripherally. A cluttered desk means it's working overtime to filter out irrelevant stimulus.

Before every session I spend five minutes clearing the desk down to laptop, monitor, keyboard, mouse, and a notebook, and closing every window I'm not using. Sessions in a cluttered room feel exhausting after ninety minutes. Sessions in a clean one feel sustainable for three or four hours. Same work, very different cognitive load.

### The phone in another room

Even on silent, even face-down, the mere presence of your phone reduces the cognitive capacity you have available. Researchers at the University of Chicago [call this "brain drain"](https://www.journals.uchicago.edu/doi/10.1086/691462): part of your brain is occupied with not checking it.

The fix is simple and almost nobody does it. Put the phone in a different room. Not your pocket, not a drawer. Mine goes in the kitchen, on the charger, with Do Not Disturb on. If someone genuinely needs me, a second call gets through.

What you're doing is adding friction. To check the phone you'd have to stop, stand up, walk to another room, and pick it up. By the time you've stood up, you've usually realized you didn't need to.

### Blockers with teeth

The phone handles mobile distraction. The computer needs its own defenses.

I use [Cold Turkey](https://getcoldturkey.com/) to block Slack, email, and social apps for the length of the session. The important part is that you can't just click disable on a whim. It requires a restart or waiting out the timer. That friction is the whole point.

On top of that: system notifications fully off, not just Do Not Disturb, and a separate browser profile for development with only documentation bookmarked and no social accounts logged in.

This sounds extreme. It is. But when Claude Code is halfway through refactoring your component system and you need to judge whether its approach fits your architecture, you can't have Slack pinging about lunch. The recovery from that context switch costs ten to twenty minutes.

### Distance from the screen

This one I discovered by accident. I work with the laptop closed and a 27-inch monitor at arm's length, top edge at eye level, wireless keyboard and mouse I can push aside.

Agent-paced work is mostly reading. The output is verbose. You're reviewing code, error messages, and documentation for hours. Hunched over a laptop, your neck and shoulders are tense within the hour, and tension destroys focus.

The distance also encourages movement. You can't lean in, so you sit back. When the agent is working, I often stand up, walk to the window, and think about the problem. When it finishes, I sit down and review. Sit to direct, stand to think, sit to evaluate. That rhythm felt forced when I was bent over a laptop. With the monitor at a distance it's natural.

### One small ritual

Have a drink within arm's reach. Not for the caffeine, for the ritual.

While I'm deciding whether a proposed refactor makes sense, I take a sip. It's a micro-pause that keeps me present without breaking the session. The same mug, in the same spot, prepared before I start. It signals that a working session has begun.

### The pre-session checklist

None of this works unless you actually do it every time. Mine is taped to the monitor:

```
□ Door closed, sign up
□ Desk cleared, windows closed
□ Phone to kitchen, Do Not Disturb on
□ Blocker on for the session length
□ System notifications off
□ Development browser profile
□ Monitor and chair position check
□ Drink ready
□ Editor in fullscreen
□ Three deep breaths
```

Five to seven minutes. The return is the difference between a fragmented, frustrating session where I ship little and a focused one where I ship something that matters.

## The hidden cost of half-focus

You might be thinking this is overkill and you can just be more disciplined. Consider the math.

Say you do a three-hour session with "good" focus: five quick Slack checks, three glances at the phone, a couple of breaks without closing the laptop, some background music you occasionally skip. Actively distracted time is maybe 25 minutes. Fourteen percent. Not terrible.

That isn't the real cost. The real cost is attention residue, the time it takes your brain to fully re-engage after each interruption. Gloria Mark's research at UC Irvine puts it at [around 23 minutes to fully refocus](https://www.ics.uci.edu/~gmark/chi08-mark.pdf) after an interruption. Even brief checks create long recovery.

Your three-hour session with "good" focus might give you 60 to 90 minutes of actual deep work. A properly protected session gives you close to the full three hours. The difference isn't 14 percent. It's two to three times the effective output.

## What a good session feels like

When everything is right, this work enters a flow state that is different from any other kind I know.

You forget time, not in a "where did the day go" way but in a fully present way. Ninety minutes pass and it feels like twenty. The agent stops feeling like a tool and starts feeling like a collaborator. When it suggests an approach, you know immediately whether it's right, no second-guessing. Each response sparks the next question naturally. When the session ends you're tired from depth, not from friction.

That's what the environment buys you. Not occasionally. Consistently.

## The hard part is doing it every time

Everything I've described is simple. None of it is difficult to understand. The hard part is implementing it every single time.

You'll be tempted to skip the checklist for "just a quick session." Do it anyway. You'll want to keep the phone nearby just in case. Other room anyway. You'll want to check Slack real quick mid-session. Use the blocker. Respect the session.

The setup feels like a tax on the work. It isn't. Try three sessions without it and three with, and measure what you ship. Once you see the difference, you won't want to work any other way.

## The broader shift

Spec-driven development is forcing a rethink of what productivity means. We're moving from "how much code can I type" to "how well can I direct an agent to build what I envision." That requires different skills: sustained attention over fragmented time, systems thinking over implementation detail, evaluation over creation.

And it requires a different environment. One optimized for attention, not just comfort.

Productivity used to be about output per hour. Now it's about the quality of your attention while collaborating with an agent. Your environment is how you control that.
