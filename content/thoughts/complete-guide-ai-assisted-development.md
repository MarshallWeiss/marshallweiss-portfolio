---
title: "The Complete Guide to AI-Assisted Development: Best Practices for Vibe Coding"
description: "A comprehensive, documentation-first system for building production-quality software with AI coding assistants. Learn the workflows, tools, and patterns that separate successful AI-assisted projects from failed experiments."
date: "2026-02-09"
slug: "complete-guide-ai-assisted-development"
tags: ["AI", "Vibe Coding", "Development", "Workflow", "Documentation", "Best Practices"]
readingTime: "45 min read"
---

# The Complete Guide to AI-Assisted Development: Best Practices for Vibe Coding

AI-assisted development—often called "vibe coding"—has fundamentally changed how we build software. Tools like Claude Code, Cursor, and GitHub Copilot promise to turn ideas into working code through natural language. Yet many developers find themselves frustrated: broken implementations, inconsistent UI, components that don't connect properly, and apps that work until they don't.

The issue isn't the AI. It's the approach.

AI coding tools need structure, clarity, and foundation. Without proper context and constraints, they produce hallucinated requirements, make unauthorized architectural decisions, and solve problems you never articulated. The solution isn't better prompts—it's better understanding and better systems.

This guide provides everything you need to know: the building blocks, the vocabulary, the workflows, and the documentation patterns that enable successful AI-assisted development. Treat this as a reference manual. Bookmark it. Return to it with each new project.

Let's build the right way.

## Understanding Why AI-Assisted Projects Fail

The most common failure pattern in AI-assisted development stems from skipping fundamentals.

Without understanding core concepts—components, state, responsive design, routing—you can't effectively communicate intent to AI. AI functions as a translator between your requirements and code. When your requirements are unclear or incomplete, the output reflects that ambiguity.

Consider these common knowledge gaps:
- What a component is and how to structure them
- What state means and when it changes
- Why buttons don't respond to clicks
- Why layouts break on different screen sizes
- How data flows through an application

AI can only work with what you give it. Vague requests produce vague results. The fix isn't learning to write better prompts—it's developing a clearer understanding of what you're building.

Once you understand the fundamentals, effective prompting becomes natural. The words flow easily because you finally know what to ask for.

## The Documentation-First System

Most developers approach AI coding assistants the wrong way: they open a chat, describe their app idea, and let AI start generating code immediately. No plan, no specification, no source of truth.

This is why projects fall apart after the first few files.

The correct approach is **documentation first, code second**. Always.

Before writing a single line of code, create your project's canonical documentation as markdown files: clear, specific, unambiguous descriptions of what you're building.

### Why Documentation First?

AI coding tools operate with high capability but low certainty. They can execute complex tasks but lack structural guardrails. Without authoritative documentation defining constraints and requirements, AI will:

- Hallucinate missing requirements
- Make unauthorized architectural decisions
- Solve problems you never articulated
- Drift from your original vision

The failure mode isn't lack of coding ability. It's lack of discipline and context preservation.

### The Six Canonical Documents

Here's the documentation stack you should create before touching code:

#### 1. PRD.md (Product Requirements Document)

Your complete specification: what you're building, who it's for, what features exist, what's in scope, and what's explicitly out of scope. Include:

- User stories with acceptance criteria
- Success metrics
- Non-goals (what you're explicitly NOT building)
- Feature specifications with detailed criteria

This is your contract. AI reads this and knows exactly what "done" looks like. Without this, you're building based on assumptions rather than requirements.

#### 2. APP_FLOW.md

Every page and user navigation path documented in plain English:

- Step-by-step user flows with decision points
- What happens on success
- What happens on error
- Complete screen inventory with routes
- State changes and transitions

This prevents AI from guessing how users navigate through your application.

#### 3. TECH_STACK.md

Every package, dependency, API, and tool locked to exact versions. No ambiguity.

When AI sees "use React," it might choose any version. When it sees "Next.js 14.1.0, React 18.2.0, TypeScript 5.3.3," it builds exactly what you specified. This document eliminates hallucinated dependencies and random technology choices.

#### 4. FRONTEND_GUIDELINES.md

Your complete design system:

- Font families and sizes
- Color palette with exact hex codes
- Spacing scale (e.g., 4px, 8px, 12px, 16px...)
- Layout rules and patterns
- Component styles and variants
- Responsive breakpoints
- UI library preferences

AI references this for every component it creates, ensuring visual consistency throughout your application.

#### 5. BACKEND_STRUCTURE.md

Complete backend specification:

- Database schema (tables, columns, types, relationships)
- Authentication and authorization logic
- API endpoint contracts
- Storage rules
- Data validation rules
- Edge cases and error handling

If you're using Supabase or similar services, this document contains the exact SQL structure. AI builds your backend against this blueprint, not its own assumptions.

#### 6. IMPLEMENTATION_PLAN.md

A step-by-step build sequence with granular tasks:

Not "build the app." More like:
- Step 1.1: Initialize project with Next.js 14.1.0
- Step 1.2: Install dependencies from TECH_STACK.md
- Step 1.3: Create folder structure per project conventions
- Step 2.1: Build navbar component per FRONTEND_GUIDELINES.md
- Step 2.2: Implement routing per APP_FLOW.md
- And so on...

The more specific your steps, the less AI guesses. Less guessing means fewer hallucinations and better results.

These documents cross-reference each other: PRD defines features, APP_FLOW defines user experience, TECH_STACK defines implementation tools, FRONTEND_GUIDELINES define appearance, BACKEND_STRUCTURE defines data layer, and IMPLEMENTATION_PLAN defines build order.

This becomes your knowledge base. AI reads these documents and has everything needed to build correctly.

### The Two Session Files

Beyond the six canonical documents, two additional files maintain context across sessions:

#### CLAUDE.md

This file sits in your project root and AI reads it automatically at the start of every session. It contains:

- Rules and constraints
- Patterns and conventions
- Context that every session must follow
- Tech stack summary
- File naming conventions
- Component patterns
- Design system tokens
- Forbidden actions

Think of it as the operating system manual AI loads before doing anything.

**Key insight**: CLAUDE.md should be a living document. Every time AI makes a mistake and you correct it, update CLAUDE.md with: "Edit CLAUDE.md so you don't make that mistake again." Over time, your CLAUDE.md becomes a self-improving rulebook. The error rate drops because AI is encoding its own corrections.

Consider adding a **lessons.md** file: After every correction, PR, or debugging session, document the pattern that caused the issue and the rule that prevents it. Reference this in CLAUDE.md: "Review lessons.md at session start." Now AI learns from its own history on your project.

#### progress.txt

This file tracks what's been done, what's in progress, and what's next. Update it after every completed feature.

Why this matters: AI has no memory between sessions. When you close a terminal, start a new chat, or switch branches, context is lost. progress.txt serves as external memory, bridging sessions.

Example format:

```
COMPLETED:
- User authentication via Clerk (login, signup, Google OAuth)
- Dashboard layout with sidebar navigation
- Products API endpoint (GET /api/products)

IN PROGRESS:
- Product detail page (/products/[id])
- Connecting frontend to API

NEXT:
- Shopping cart functionality
- Checkout with Stripe integration

KNOWN BUGS:
- Mobile navigation doesn't close after clicking link
```

When you start a new session, AI reads this and knows exactly where you are. No rebuilding context from scratch.

## The Interrogation System

Before writing documentation, use AI to thoroughly examine your idea.

This prompt changes everything:

> "Before writing any code, interrogate my idea in Planning mode only. Assume nothing. Ask questions until there are no assumptions left."

AI hallucinates when your clarity ends. By extending your clarity through systematic interrogation, you force AI to find gaps in your thinking before building begins.

### Questions AI Should Ask

Who is this for? What's the core user action? What happens when they complete that action? What data needs to be saved? What data needs to be displayed? What happens on error? What happens on success? Does this need authentication? Does this need a database? Does this need to work on mobile? What are the edge cases?

If you can't answer these questions, you're not ready to build. Answer them first.

### Example: Recipe Sharing App

**Who is this for?** Home cooks who want to save and share recipes.

**Core action?** User creates a recipe with title, ingredients, steps, and photo.

**What happens after?** Recipe saves to their profile and appears on public feed.

**Data saved?** Recipe title, ingredients (array), steps (array), photo URL, author ID, timestamp.

**Data displayed?** Feed of recent recipes, individual recipe detail page, user's own recipe collection.

**Error states?** Upload fails, missing required fields, unauthorized edit attempt.

**Login required?** Yes for creating recipes. Browsing is public.

**Database?** Yes, users table and recipes table with foreign key relationship.

**Mobile?** Yes, most users will add recipes from their phone while cooking.

These answers aren't just answers—they're raw material for your canonical documentation. User description feeds your PRD. Data structure feeds BACKEND_STRUCTURE. Flows feed APP_FLOW. Mobile requirement feeds FRONTEND_GUIDELINES.

### Generating Documentation from Interrogation

Once interrogation is complete, use this prompt:

> "Based on our interrogation, generate my canonical documentation files: PRD.md, APP_FLOW.md, TECH_STACK.md, FRONTEND_GUIDELINES.md, BACKEND_STRUCTURE.md, IMPLEMENTATION_PLAN.md. Use the answers from our conversation as source material. Be specific and exhaustive. No ambiguity."

AI drafts all documents from interrogation output. You review, correct anything vague, add anything missing, and lock them as your source of truth.

The sequence is always: **Interrogation → Documentation → Code**. Never skip steps.

## UI vs UX: Understanding the Difference

Two terms frequently confused but fundamentally different:

**UI (User Interface)** is what it looks like: colors, fonts, button shapes, spacing—the visual layer.

**UX (User Experience)** is how it feels to use: Can someone figure out what to do? Is the flow intuitive? Do people get stuck? Are they frustrated or delighted?

You can have beautiful UI with terrible UX: pretty buttons nobody knows how to click.

You can have basic UI with great UX: functional and clear, people know exactly what to do, but visually unpolished.

When communicating with AI, be specific about which you mean:
- "Make it look better" addresses UI
- "Make it easier to use" addresses UX
- "Make the button more obvious" addresses both

### Using Visual References

Screenshots eliminate ambiguity faster than verbal descriptions. Find an app or site you like (Dribbble, Awwwards, similar products), screenshot it, and feed it directly to Claude Code or Cursor.

Effective prompts with screenshots:
- "Match this layout"
- "Use this exact UI structure"
- "Use this as inspiration for color and spacing"

AI can analyze images and extract design patterns, spacing, color palettes, typography, and component structures from screenshots. This is infinitely better than trying to describe design with words.

You can also screenshot your work in progress and say "here's what it looks like now, here's what's wrong, fix it."

**Cursor's browser sidebar** allows simultaneous design and coding: see your app rendered live, click elements, adjust spacing, update colors, test layouts, experiment with CSS in real-time, then apply changes directly to your codebase through Agent mode.

### Current Design Styles

These visual languages dominate modern web design. Reference them in FRONTEND_GUIDELINES.md or prompts to unlock specific, recognizable aesthetics:

**Glassmorphism**: Frosted glass effect with translucent elements, background blur, subtle borders, soft shadows floating over colorful backgrounds. Creates depth and hierarchy. Works well for cards, modals, navigation bars, dashboards. CSS: `backdrop-filter: blur()`. Risk: transparency can reduce readability—maintain high text contrast.

**Neobrutalism**: Raw, bold, intentionally unpolished. High-contrast colors, thick black borders, flat shadows, clashing palettes, quirky fonts. Minimalism with attitude. Stands out because everything else looks the same. Works well for creative brands, portfolios, indie tools.

**Neumorphism (Soft UI)**: Elements appear extruded from or pressed into the background. Soft, diffused shadows create tactile, 3D feel. Elegant but accessibility-challenging due to low contrast. Best for small UI elements: toggles, sliders, cards. Not recommended as entire design language.

**Bento grid**: Modular layouts with content arranged in blocks of different sizes, like Japanese bento boxes. Cards of varying dimensions create visual rhythm and hierarchy. Responsive by nature—grid rearranges on mobile. Perfect for dashboards, product pages, feature showcases, portfolios. Solves real layout problems.

**Dark mode**: Not just a preference toggle—it's a design system. Dark backgrounds with light text, careful contrast ratios, muted accent colors. Reduces eye strain, saves battery on OLED screens, looks premium. Plan for both light and dark mode from the start. Define both palettes in FRONTEND_GUIDELINES.md.

**Micro-interactions**: Small animations responding to user actions. Button scales on hover. Checkbox bounces when clicked. Loading spinner feels alive. These details separate polished products from amateur ones. Libraries like Framer Motion and CSS transitions handle these easily.

When prompting AI, don't say "make it look modern." Say "glassmorphism cards with bento grid layout, dark mode, and micro-interactions on hover states." That's specific and buildable.

Lock design decisions in FRONTEND_GUIDELINES.md before coding starts. Pick one or two styles, define color palette, spacing scale, border radius, shadow values, animation timing. With documented guidelines, AI follows them consistently. Without documentation, every component looks different.

## Core Concepts: Components

A component is a reusable piece of interface. Think LEGO bricks—each brick is a component. You combine them to build something larger.

Examples:
- A button is a component
- A navigation bar is a component
- A product card is a component
- A form is a component made of smaller components (inputs, labels, buttons)

### Why This Matters for AI-Assisted Development

When you say "build me a landing page," AI must decide what components to create. Without specification, it guesses—possibly building everything as one giant mess instead of clean, reusable pieces.

Better prompt:

> "Build a landing page with these components: navbar, hero section, features grid (3 cards), testimonial carousel, CTA section, footer."

Now AI knows exactly what pieces to create. Each piece is isolated. Each piece can be edited independently. That's the power of thinking in components.

## Core Concepts: Layout

Layout determines where things go on the page.

Every website is boxes inside boxes. Master this mental model and you'll understand 90% of web design.

Main boxes:
- Header/navbar at the top
- Main content in the middle
- Optional sidebar beside content
- Footer at the bottom

Inside main content, more boxes:
- Sections dividing the page
- Containers controlling width
- Grids organizing items into rows and columns
- Cards grouping related content

When describing layout to AI:

> "Two-column layout. Sidebar on the left, 250px wide. Main content takes remaining space. Sidebar is fixed position, doesn't scroll."

That's complete layout instruction. AI knows exactly what to build.

## Core Concepts: State

State is data that changes.

When you click a button and something happens, state changed. When you type in a form and see text appear, state changed. When you toggle dark mode and colors flip, state changed.

State makes your app feel alive. Without state, everything is static and non-responsive.

Common state examples:
- Is the menu open or closed?
- Is the user logged in or logged out?
- What items are in the shopping cart?
- What text is in the input field?
- Is this loading or done loading?
- Did this succeed or fail?

When your button doesn't do anything, it's usually a state problem. The click happened, but nothing told the app to update.

When communicating state to AI:

> "When the user clicks this button, set the modal state to open. When they click outside the modal, set it to closed."

Now AI knows what state to track and when to change it.

## Core Concepts: Styling

Styling controls appearance: colors, spacing, fonts, sizes, positions.

**CSS** is the language that controls styling.

**Tailwind** is a utility-first system. Instead of writing CSS files, you add classes directly to elements:
- `bg-blue-500` makes background blue
- `text-xl` makes text larger
- `p-4` adds padding

**Design tokens** are consistent values you reuse. Your brand blue isn't just any blue—it's the same hex code everywhere. Your spacing isn't random—it's always multiples of 4px. Your border radius is identical on every card. Your shadow values are consistent on every elevated element.

This separates amateur apps from polished ones. When every component uses the same design tokens, your app feels cohesive. When each component invents its own values, it looks like five different people built it.

Lock everything in FRONTEND_GUIDELINES.md before coding:
- Color palette with exact hex codes for primary, secondary, background, surface, text, borders, success, error, warning
- Spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- Font stack with sizes for headings, body, small text
- Border radius values
- Shadow definitions
- Transition timing

When AI has this document, every component it generates matches. Without it, you'll spend hours manually fixing inconsistencies.

Specific styling instructions beat vague ones every time: "Make the background #3B82F6 with 16px padding and 8px border radius" versus "make it blue with some padding."

## Core Concepts: Responsive Design

Responsive means your site works on all screen sizes.

Your laptop is wide. Your phone is narrow. Same site, different layouts.

On large screens, show more columns. On small screens, stack vertically. On large screens, show full navigation. On small screens, show hamburger menu.

**Breakpoints** are screen widths where design changes:
- Mobile: 0-640px
- Tablet: 640-1024px
- Desktop: 1024px and up

**Mobile-first** means designing for the smallest screen first, then adding complexity for larger screens. This is how Tailwind works by default. Styles without a prefix apply to all screens. Prefixed styles (`md:`, `lg:`) only activate at those breakpoints.

Example: `flex flex-col md:flex-row` means stacked on mobile, side-by-side on tablet and up.

This isn't preference—it's strategy. Building mobile-first forces you to prioritize content and minimize clutter. What absolutely must be on the small screen? That's your core. Everything else is progressive enhancement for bigger screens.

Define breakpoints and responsive patterns in FRONTEND_GUIDELINES.md:
- "Navigation: hamburger menu below 768px, full horizontal nav above"
- "Grid: single column mobile, two columns tablet, three columns desktop"
- "Font sizes: scale up 15% at each breakpoint"

With documented rules, AI builds responsive components correctly without repeating instructions.

Always think mobile first. Over 50% of users are likely on phones. If you only test on your laptop, you'll ship a broken experience for most people.

## Core Concepts: Pages vs Routes

A **page** is what the user sees. A **route** is the URL that shows that page.

- `yoursite.com/` shows the home page
- `yoursite.com/about` shows the about page
- `yoursite.com/products/123` shows product 123

Routes can be:
- **Static**: `/about` always shows the same page
- **Dynamic**: `/products/[id]` shows different products based on the id

When describing your app structure to AI:

> "I need 4 pages: home (/), about (/about), all products (/products), single product (/products/[id])"

Now AI knows the full structure, builds navigation that links correctly, and creates files in the right places.

## Core Concepts: Frontend vs Backend

**Frontend** is what users see and interact with—the interface running in their browser.

**Backend** is what happens behind the scenes—databases, user accounts, processing, servers.

Example flow when submitting a form:
1. Frontend collects input
2. Frontend sends to server
3. Server validates and saves
4. Server sends back confirmation
5. Frontend shows success message

For simple sites, you might not need a backend: static pages, no database, no accounts. For apps with users, saved data, or complex logic, you need both.

Tell AI which you need upfront:
- "This is frontend only, just a landing page"
- "This needs a backend with user accounts and a database"

These produce completely different outputs.

## Core Concepts: APIs

An API is how two systems communicate.

Your frontend needs data from your backend—it requests via API. Your app needs weather data—it requests from weather service API. Your app needs to process payments—it communicates with Stripe API.

Think of an API as a waiter: you tell the waiter what you want, they go to the kitchen, they bring back your order.

Common patterns:
- **GET**: Retrieve data
- **POST**: Send data
- **PUT**: Update data
- **DELETE**: Remove data

When communicating with AI:

> "When the page loads, make a GET request to /api/products and display the results in a grid."

Now AI knows exactly what to build.

## Core Concepts: Databases

A database stores data permanently. Without a database, everything resets on refresh. User signs up, refresh, gone. Item added to cart, refresh, gone.

**When you need a database:**
- Users can create accounts
- Users can save their own content
- You need to store form submissions
- You have data that grows over time

**When you don't need one:**
- Static site with same content for everyone
- Portfolio with no user interaction
- Landing page collecting emails through form service

**Supabase** is the easiest starting point: free tier, good documentation, handles auth. If you're unsure what to use, use Supabase.

When talking to AI:

> "Use Supabase. I need a users table with email and password, and a posts table with title, content, and user_id."

Now AI knows your data structure and can build everything to match.

## Core Concepts: Authentication

Authentication is login/logout—proving who someone is.

This is harder than it looks. Passwords need encryption, sessions need management, tokens need handling. It's easy to make security mistakes.

Don't build auth from scratch. Use a service:
- **Clerk**: Simplest with great UI out of the box
- **Supabase Auth**: Works well if you're already using Supabase for database

Example prompt:

> "Use Clerk for authentication. Users can sign up with email or Google. After login, redirect to dashboard."

Let the service handle the hard parts.

## Understanding File Types

You'll see many files in your codebase:

- `.html`: Structure of a webpage
- `.css`: Styling rules
- `.js`: JavaScript that makes things interactive
- `.jsx`: JavaScript with HTML-like syntax for React
- `.ts`: TypeScript (JavaScript with types that catch errors)
- `.tsx`: TypeScript with React
- `.json`: Structured data
- `.md`: Markdown, formatted text
- `.env`: Environment variables and secrets
- `.gitignore`: Tells git which files to skip

**Most important: `.env`**

This is where you put API keys, secrets, passwords. Never share this file. Never commit it to git. Never screenshot it. If you leak your .env, you leak access to everything.

## Project Folder Structure

Where files go matters. A messy project confuses AI.

Standard structure:

```
my-app/
├── src/
│   ├── app/           → pages and routes
│   ├── components/    → reusable UI pieces
│   ├── lib/           → utilities, helpers
│   └── styles/        → CSS files
├── public/            → images, static files
├── .env               → secrets (never share)
├── CLAUDE.md          → AI rules and context
├── progress.txt       → session tracking
├── PRD.md             → product requirements
├── APP_FLOW.md        → user flows
├── TECH_STACK.md      → dependencies
├── FRONTEND_GUIDELINES.md → design system
├── BACKEND_STRUCTURE.md   → database spec
├── IMPLEMENTATION_PLAN.md → build order
├── package.json       → dependencies
└── README.md          → project overview
```

When AI generates code, tell it where to put files:

> "Create the button component in src/components/Button.tsx."

Without specification, AI might place files anywhere and nothing may connect properly.

## Using Documentation in Practice

Markdown is not optional. It's the language AI thinks in.

Every .md file you write becomes a reference document AI can read, understand, and follow. This is why documentation-first works—you're not writing docs for humans, you're writing constraints for AI.

### How Each Document Gets Used

**PRD.md** is your source of truth for scope. When AI tries to add an unapproved feature, point back to the PRD: "Only build what's in PRD.md." When deciding what to build next, check the PRD. It prevents scope creep before it starts.

**APP_FLOW.md** gets referenced when building page transitions and user journeys: "Build the login flow exactly as documented in APP_FLOW.md section 3." AI now knows every screen, redirect, and error state in that flow.

**TECH_STACK.md** gets referenced at initialization and whenever AI tries introducing new dependencies: "Use only packages listed in TECH_STACK.md. Do not add new dependencies without asking." This prevents randomly imported libraries you didn't approve.

**FRONTEND_GUIDELINES.md** is the doc AI references for every component: colors, spacing, typography, component patterns, responsive rules. "Style this component per FRONTEND_GUIDELINES.md section 2." Consistent design across every file.

**BACKEND_STRUCTURE.md** defines your data layer: "Create the users table as defined in BACKEND_STRUCTURE.md section 2.1." AI builds exactly the schema you specified, not its own interpretation.

**IMPLEMENTATION_PLAN.md** is your execution sequence: "We're on step 4.2 of IMPLEMENTATION_PLAN.md. Build this step only." This prevents AI from jumping ahead or building out of order.

**CLAUDE.md** is the master configuration. It sits in project root and Claude Code reads it automatically every session. Contains condensed rules from all six docs: tech stack summary, naming conventions, file structure, component patterns, forbidden actions. Think of it as the operating system manual AI loads before doing anything.

### The Living Document Pattern

CLAUDE.md should evolve. Every time AI makes a mistake and you correct it, end with: "Edit CLAUDE.md so you don't make that mistake again."

Over time, CLAUDE.md becomes a self-improving rulebook. Error rates drop because AI is encoding its own corrections.

Take this further with **lessons.md**: After every correction, PR, or debugging session, update lessons.md with the pattern that caused the issue and the rule that prevents it. Reference in CLAUDE.md: "Review lessons.md at session start."

Now AI learns from its own history on your project. This self-improvement loop separates good CLAUDE.md files from great ones.

### Example CLAUDE.md

```
Tech stack: Next.js 14, TypeScript, Tailwind CSS, Supabase
All components go in src/components/
Use functional components with hooks
All API routes go in src/app/api/
Never use inline styles. Always use Tailwind.
Design tokens: primary blue #3B82F6, background #F9FAFB
Mobile-first responsive approach
Reference docs: PRD.md, APP_FLOW.md, TECH_STACK.md,
  FRONTEND_GUIDELINES.md, BACKEND_STRUCTURE.md, IMPLEMENTATION_PLAN.md
Read progress.txt at start of every session
Update progress.txt after completing any feature
Review lessons.md at session start
Update it after every correction
```

When Claude Code reads this, it follows these rules across every file with no drift and no random decisions.

**Cursor users**: Cursor has `.cursor/rules` files—same concept, different tool. Put project rules in `.cursor/rules/` and Cursor reads them automatically across all modes. If using both Cursor and Claude Code on the same project, keep CLAUDE.md and Cursor rules aligned.

### Progress.txt as Session Bridge

Update after every feature:

```
COMPLETED:
- User auth via Clerk (login, signup, Google OAuth)
- Dashboard layout with sidebar navigation
- Products API endpoint (GET /api/products)

IN PROGRESS:
- Product detail page (/products/[id])
- Need to connect frontend to API

NEXT:
- Shopping cart functionality
- Checkout with Stripe

KNOWN BUGS:
- Mobile nav doesn't close after clicking link
```

When you open a new terminal, start a new session, switch branches, or return after time away, AI reads this and knows exactly where you are. No rebuilding context from scratch.

**This is the system**: Canonical docs define what to build. CLAUDE.md enforces rules. Progress.txt preserves state between sessions. Together they give AI everything needed to build without hallucinating.

The more markdown documentation you have, the less AI guesses. The less AI guesses, the better your results.

## Tools and How to Use Them

You don't need 50 tools. You need these, used correctly for different phases.

### Cursor - Your AI-Native Editor

Cursor sees your entire project, understands file relationships, and edits across multiple files. It has four modes most people don't fully utilize:

**Ask mode**: Read-only. AI reads your codebase and answers questions without changing anything. Use when exploring unfamiliar code, understanding how something works, or planning your next move. Think of it as your code consultant.

**Plan mode**: Architecture before code. Describe what you want and Cursor creates detailed implementation plans with steps, asks clarifying questions, can generate visual diagrams. Use at the start of every new feature. Review the plan, adjust it, approve steps, then send to Agent mode.

**Agent mode**: The workhorse. AI autonomously writes code, edits files, runs terminal commands, installs packages, fixes errors. Reads your entire project, follows rules files, implements features end-to-end. Most vibe coding happens here.

**Debug mode**: Structured debugging loop. When you hit stubborn bugs, Debug mode instruments your code with runtime logs, generates hypotheses, asks you to reproduce the bug, tests its fix, asks you to verify.

**Workflow**: Ask to understand → Plan to architect → Agent to build → Debug when it breaks.

### Claude - Your Thinking Partner

Use Claude (via Claude.ai or Claude Code) for heavy thinking: interrogating your idea, writing canonical docs, planning architecture, working through complex product decisions, drafting CLAUDE.md.

Claude Code runs in terminal and automatically reads CLAUDE.md from project root. Follows your rules without repeating them. Best for larger refactors, documentation-heavy tasks, multi-file architectural changes.

### Kimi K2.5 - Visual Frontend Specialist

Open-source visual coding model from Moonshot AI. Native multimodal model trained on vision and text together. Feed it screenshots, videos, or design mockups and it generates functional frontend code that closely matches visuals.

Where other models approximate your design, K2.5 replicates it. Use when translating designs into code. You have FRONTEND_GUIDELINES.md defining the system, screenshots for reference, and need pixel-accurate implementation.

### Codex - Your Debugger and Finalizer

OpenAI's coding agent. Runs in cloud, terminal via Codex CLI, or directly in IDE. Each task gets isolated sandbox preloaded with your repo.

What makes Codex different: it reads your codebase, traces dependencies, reviews configuration, proposes fixes across files. Can run tests, fix failures, iterate until everything passes.

Use after files and architecture are built. When structure is in place but things are breaking, when you need code review before shipping, when you want to refactor without breaking functionality. Codex is the closer.

Can run multiple Codex tasks in parallel on different bugs or features. Works asynchronously. Start tasks, do something else, come back to review results.

### Multi-Tool Workflow

**Claude does thinking**: Writes docs, plans architecture, makes product decisions.

**Cursor/Claude Code/Kimi K2.5 does building**: Implements features from plan, generates components, connects frontend to backend. Choose based on task:
- K2.5 for visual-heavy frontend work
- Claude Code for architecture and documentation-heavy work
- Cursor Agent for general implementation

**Codex does debugging and finishing**: Runs against built codebase. Finds bugs, traces failures, reviews code, proposes fixes. Runs tests until they pass.

### Supporting Tools

**GitHub**: Code lives in cloud with version control. Every change tracked. Can go back to any previous version. Non-negotiable.

**Vercel**: Deployment. Push to GitHub, Vercel automatically builds and deploys. Get live URL. Free tier is generous.

**Supabase**: Database and auth. Free tier, easy setup. Handles backend so you focus on product.

Master these tools. Understand when to use each. The difference between someone who ships and someone who's stuck isn't which AI model they use—it's knowing which tool to use when.

## Git and Version Control

Git tracks every change you make.

**Without git**: You break something and can't undo it. You lose track of what changed. One mistake can destroy everything.

**With git**: Every change is saved. You can go back to any previous version. Your code lives on GitHub, not just your computer.

Basics:
- `git add .` stages your changes
- `git commit -m "message"` saves them with description
- `git push` uploads to GitHub
- `git pull` downloads latest changes

When vibe coding, commit often. After every major working feature: "Added user login", "Added product grid", "Fixed checkout bug." If you break something, you can always go back.

Connect to progress.txt system: Commit code, update progress.txt, push both. Now GitHub has your code and your context file. Next session: pull down, read progress.txt, keep building.

## Environment Variables and Secrets

API keys, database passwords, and secrets should never be in your codebase.

They go in `.env` file. In code, access them through `process.env.YOUR_KEY_NAME`.

**Rules:**
- Never commit .env to git (add to .gitignore)
- Never paste API keys in chat or screenshots
- If you leak a key, assume it's compromised
- Never put secrets in frontend code, only backend
- Use different keys for development and production

When deploying to Vercel, add environment variables in Vercel's dashboard settings. They won't transfer from local .env automatically.

If you leak a key, immediately revoke it at the service and create a new one.

## Deployment

Your code works on your computer. Now it needs to work on the internet.

Process with Vercel:
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Vercel automatically builds and deploys
4. You get URL like your-app.vercel.app
5. Add environment variables in Vercel's dashboard

When something works locally but breaks when deployed, give AI the Vercel error logs: "It works on localhost but breaks on Vercel. Here's the error from Vercel's logs:" and paste the error.

99% of deploy bugs are missing environment variables or wrong build settings.

## Reading Error Messages

Errors are not failures—they're instructions.

An error message tells you exactly what went wrong. Don't panic and ignore them. Read them carefully.

Anatomy of an error:

```
TypeError: Cannot read property 'map' of undefined
    at ProductList (src/components/ProductList.tsx:15:23)
```

**Translation**: TypeError means you're using something incorrectly. "Cannot read property 'map' of undefined" means you tried to use `.map()` on something that doesn't exist. `ProductList.tsx:15:23` tells you exact file and line number.

When you get an error, give AI everything:

> "I'm getting this error: [full error message]. Here's the code at that line: [paste relevant code]"

More context produces faster fixes.

## The Debugging Loop

When something breaks:

1. **Read the error** carefully
2. **Find the location**: What file, what line
3. **Understand the claim**: What does error say is wrong
4. **Check obvious issues**: Typos, missing imports, wrong variable names
5. **Give AI context**: Error + code + what you expected

The loop: AI gives code → you try it → it breaks → paste error → AI fixes → repeat until it works.

For stubborn bugs surviving two or three rounds, **switch tools**. Use Cursor's Debug mode: generates multiple hypotheses, instruments code with runtime logs, walks through bug methodically. Or use Codex: give it bug description, let it trace through codebase, identify root cause across files, iterate until tests pass.

Iteration is normal. The skill is iterating quickly and knowing which tool to use when, not avoiding iteration entirely.

## Verifying Before You Ship

Before shipping, check:

- Does it work on mobile? (Open on your actual phone)
- Does it work in different browsers?
- What happens with no data? (Empty states handled?)
- What happens with wrong data? (Error states handled?)
- What happens with slow internet? (Loading states exist?)
- Can you break it by clicking fast?
- Are secrets hidden from browser dev tools?

Don't ship until you've answered these. Your users will find every bug you missed.

## Effective Communication with AI

Now that you have vocabulary, use it.

**Vague prompt:**
> "Build me an app where users can post things"

**Specific prompt backed by documentation:**
> "Read CLAUDE.md and progress.txt first. Then build step 4.2 from IMPLEMENTATION_PLAN.md. The login flow is defined in APP_FLOW.md section 3. Use auth setup from BACKEND_STRUCTURE.md section 5. Style everything per FRONTEND_GUIDELINES.md. Match UI to the screenshot attached."

Same idea. Completely different output quality.

The specificity isn't extra work—it *is* the work. The more you define upfront, the less you debug later.

## Reading AI's Output

AI generated code. Do you understand what you're looking at?

You don't need to understand every line. But you need to understand the structure: What files were created? What do they do? How do they connect?

When AI generates code, ask:

> "Explain what you just built in plain English. What does each file do? How do they connect?"

Over time, you'll start recognizing patterns. You'll see an import statement and know it's pulling in another file. You'll see useState and know it's tracking something that changes. You'll see an API call and know it's fetching data.

This is how you go from vibe coder to builder. Not by memorizing syntax, but by understanding patterns.

## Iteration Strategy

Everyone's first output is rarely perfect. That's expected.

The iteration system:
1. AI builds version 1
2. You test it, find issues
3. You describe issues specifically (not "it's broken," but "the submit button doesn't save to database, here's the error")
4. AI fixes
5. You test again
6. Repeat

**Effective iteration:**
> "The product grid shows 4 columns on desktop but I need 3. The card images are stretched, they should be object-cover. And there's no loading state when data is fetching."

**Ineffective iteration:**
> "It doesn't look right, fix it."

Be specific. Always.

## Breaking Big Ideas into Manageable Pieces

AI struggles with large, vague requests. "Build me a full e-commerce site" produces poor results.

Break it down:
1. Set up project scaffold and install dependencies
2. Build navbar component
3. Build product card component
4. Build product grid page
5. Connect to database and fetch products
6. Build single product page
7. Add to cart functionality
8. Build cart page
9. Checkout with Stripe

Each piece is one conversation or task. Each builds on the last and can be tested independently.

This is literally what IMPLEMENTATION_PLAN.md is. That numbered, sequenced list is your implementation plan. If you did the interrogation and documentation work, you already have this breakdown.

You don't create it while coding. You created it before starting. Now you're just executing step by step.

Tell AI: "Build step 5 from IMPLEMENTATION_PLAN.md." Not "build the next thing." Precision compounds.

Connects to progress.txt: After each piece, update progress. Start next piece with fresh context.

## When Not to Use AI

Sometimes you need to learn the thing yourself.

**Use AI for:**
- Generating boilerplate code
- Writing repetitive logic
- Exploring approaches quickly
- Debugging with context
- Translating your intent into code

**Learn yourself:**
- Core concepts (everything in this guide)
- How to read code AI generates
- How to spot when AI is wrong
- How to debug when AI can't help
- How your chosen stack works fundamentally

If you rely on AI for everything, you're building on quicksand. One weird bug and you're stuck. If AI explains something incorrectly and you believe it, you'll compound errors.

Also: Official documentation is often better than AI info. Stack Overflow has exact answers to exact errors. Documentation sites have authoritative information. AI is great for synthesis and generation, but when it fails, knowing how to search official docs is the critical fallback skill.

## Scope and Knowing When to Stop

Endless feature lists kill more projects than bad code.

**You're done when:**
- Core feature works
- Users can complete main action
- It doesn't break on common paths
- It's deployed and accessible

**You're NOT done when:**
- It's "perfect"
- Every edge case is handled
- It has every feature you imagined
- It looks exactly like Dribbble designs

Ship the simple version. Get feedback. Improve based on real usage.

The best app you never ship is worse than the average app that's live.

## Maintaining What You Built

You built it. Now you'll need to change it.

Future you (or AI) needs to understand the code. This is where your documentation system pays off.

README explains what the project is. CLAUDE.md enforces rules. progress.txt shows what was built and what's next. Canonical markdown docs define every aspect from requirements to implementation sequence.

When returning to code after time away:

> "Read CLAUDE.md, progress.txt, and PRD.md. I'm returning to this project after a break. Summarize where things stand against IMPLEMENTATION_PLAN.md and what needs attention."

Good documentation makes future sessions 10x faster. Bad documentation means starting over from scratch.

Keep dependencies updated, write comments on confusing parts, use consistent naming, and treat your codebase like a home that others will visit and need to navigate.

## Cost Awareness

API calls cost money. Databases cost money. Hosting can cost money. AI tools cost money.

Free tiers exist and are generous: Vercel, Supabase, Clerk all have free tiers up to reasonable limits.

For AI tools: Cursor Pro covers most model access. Claude Code usage comes through Anthropic or Claude plan. Codex is included with ChatGPT Plus, Pro, and higher tiers. Kimi K2.5 is open-source with free access through Kimi.com and generous API pricing.

You don't need every paid tier on day one. Start with Cursor Pro and Claude or Gemini Pro. Add others when your workflow demands it.

Know what's free versus what adds up. AI API calls (OpenAI, Anthropic) cost per token. Database storage costs past free tiers. Image hosting costs at scale.

Start free. Scale when you need to. Don't architect for millions of users on day one.

## Security Basics

The bare minimum:
- Never expose API keys in frontend code
- Always validate inputs on backend (don't trust browser)
- Use HTTPS (Vercel does this automatically)
- Keep dependencies updated (outdated packages have vulnerabilities)
- Use auth services instead of rolling your own

You don't need bank-level security, but you should understand basics so you don't ship with obvious vulnerabilities.

## Third-Party Services

You don't build everything from scratch. Plug in services for the hard parts.

- **Auth**: Clerk, Supabase Auth (login, signup, sessions)
- **Payments**: Stripe (handles money)
- **Database**: Supabase, Firebase (handles storage)
- **Email**: Resend, SendGrid (transactional email)
- **File uploads**: Uploadthing, Supabase Storage (handles media)

**When to use a service**: Whenever the feature isn't your core product. Your core product is the unique thing you're building. Everything else is infrastructure. Use existing services for infrastructure.

## Assets, Media, and Component Libraries

Where to get images, fonts, icons, and pre-built components:

- **Icons**: Lucide React (free, consistent, easy)
- **Fonts**: Google Fonts (import in layout, use everywhere)
- **Images**: Unsplash for stock, your own for product shots, AI-generated for custom
- **File sizes matter**: Large images slow your site. Compress before uploading. Use Next.js Image component for automatic optimization.

### Component Libraries

Component libraries are underutilized shortcuts. Instead of building every button, modal, dropdown, and form element from scratch, use a library that gives you polished, accessible, customizable components.

**shadcn/ui** is the dominant choice in Next.js and Tailwind ecosystem. Not a traditional library you install as dependency—it copies component source code directly into your project. You own the code and can customize everything. Buttons, dialogs, dropdowns, tabs, forms, data tables, all built on Radix UI primitives with Tailwind styling.

Tell AI: "Use shadcn/ui components. Initialize with npx shadcn@latest init and add components we need."

This saves hours of building basic UI elements and gives you accessible, production-quality components from the start.

Note your component library choice in TECH_STACK.md and FRONTEND_GUIDELINES.md so AI uses it consistently.

## The Complete System Summary

You now have everything.

### Before Building

- Run interrogation prompt: Let AI thoroughly examine your idea
- Answer every question AI asks
- Use doc generation prompt to create six canonical docs: PRD.md, APP_FLOW.md, TECH_STACK.md, FRONTEND_GUIDELINES.md, BACKEND_STRUCTURE.md, IMPLEMENTATION_PLAN.md
- Write CLAUDE.md with project rules, references to all six docs, lessons.md self-improvement loop
- Create progress.txt with starting state
- Gather UI screenshots for reference
- Initialize git and push to GitHub

### While Building

- AI reads CLAUDE.md, progress.txt, and lessons.md first, every session
- Use Ask and Plan modes in Cursor (or Claude) to architect before coding
- Use Agent mode, Claude Code, or Kimi K2.5 to implement (match tool to task)
- Work in small pieces, one feature at a time
- Give specific, vocabulary-rich prompts referencing canonical docs
- Use screenshot references for UI work
- Commit to git after each working feature
- Update progress.txt after each feature
- After every correction, update CLAUDE.md and lessons.md so AI never makes same mistake twice
- Use Codex to debug, review, and finalize once architecture is in place
- Test on mobile regularly
- Read errors carefully

### Before Shipping

- Check mobile
- Check error states and empty states
- Verify secrets are hidden
- Test main user flow end-to-end
- Check performance (is anything slow?)

### After Shipping

- Update docs to reflect what was built
- Update dependencies periodically
- Iterate based on real user feedback
- Keep progress.txt and lessons.md current for future sessions
- Turn repeated workflows into reusable skills and slash commands

## Conclusion

AI-assisted development works. But it requires meticulous planning, systems, documentation, vocabulary, and iteration.

The sequence is always: Interrogate your idea. Write your markdown docs. Set up CLAUDE.md, progress.txt, and lessons.md for persistence and self-improvement.

Use the right tool for each phase: Claude for thinking and planning, Cursor modes for building, Kimi K2.5 for visual implementations, Codex for debugging and finishing.

Describe work in specific terms. Track progress between sessions. Commit your code. Ship.

AI does the typing. You do the thinking.

Now build something remarkable.
