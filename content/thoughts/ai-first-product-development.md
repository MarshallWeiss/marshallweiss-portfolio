---
title: "Rebuilding Product Development with AI at the Center"
description: "How we're transforming design-to-development workflows at El Confidencial by making AI the operating system, not just another tool."
date: "2026-02-09"
slug: "ai-first-product-development"
tags: ["AI", "Product Development", "Design Systems", "Workflow", "DevOps"]
readingTime: "18 min read"
---

# Rebuilding Product Development with AI at the Center

## The Problem: Why Traditional Workflows Are Breaking

We're wasting time on the wrong things.

At El Confidencial, we have about 150 journalists, plus everyone in our digital lab - designers, developers, product managers, data analysts, marketing, subscriptions. I'm one of nine people on the design team, working in an agile framework with sprints organized around funnel metrics. The workflow is standard: product owner writes requirements in Jira, I design in Figma, developers build it, we review, we ship.

Except most of my time isn't spent designing new features. It's spent on fixes. Reviews where what got built doesn't match what I designed. Explaining the same spacing requirements for the third time. Chasing down why a component looks slightly off. Our design system is outdated - we had one built years ago but never got around to updating it. We're literally running MUI components skinned to look like shadcn components, which is as backwards as it sounds.

And we're not alone. [Enterprises lose $370 million per year on average to technical debt](https://www.effectivesoft.com/blog/ai-legacy-code-modernization-migration.html). Nearly [40% of IT budgets go to servicing technical debt](https://www.itconvergence.com/blog/strategies-for-managing-technical-debt-in-legacy-software-systems/) instead of building new things. Development teams [waste 23-42% of their time](https://devoxsoftware.com/blog/the-2026-legacy-modernization-report-research-insights-and-strategic-roadmap/) dealing with the consequences of old decisions.

The traditional designer-developer handoff is a bottleneck by design. I make something in Figma. I hand it off. The developer interprets it. They ask questions. I clarify. They build something that's almost right but not quite. We iterate. Meanwhile, the design system falls further behind because who has time to maintain it when we're drowning in tickets?

There's a deeper issue emerging: by 2026, there's an estimated [40% quality deficit](https://www.qodo.ai/blog/best-ai-code-review-tools-2026/) - more code entering the pipeline than reviewers can validate with confidence. Code review automation has exploded from $550 million to $4 billion in 2025 because teams literally can't keep up.

Something has to change. Not optimization - transformation.

## The Shift: From AI Tools to AI-First Architecture

Most teams are thinking about AI wrong. They're asking "which AI tool should we add to our workflow?" The real question is: what if AI *is* the workflow?

The difference matters. Adding Cursor or Claude Code or Copilot to your existing process is integration. Making AI the central operating system that orchestrates how designers, developers, and product managers work together - that's transformation.

[Spec-Driven Development](https://thoughtworks.medium.com/spec-driven-development-d85995a81387) is emerging as the paradigm for this shift. The traditional approach treats code as the source of truth and specs as documentation that falls out of date. Spec-driven development inverts this: the specification becomes the source of truth, and code becomes generated or verified output that must conform to that spec.

This isn't just semantics. It changes who does what. In a spec-driven world, the planning phase involves AI asking iterative questions until requirements and edge cases are fully understood. Teams compile this into a comprehensive spec.md containing requirements, architecture decisions, data models, and testing strategy. Then AI generates code according to that blueprint.

Consider what happened at Azure: [a team completed a cross-platform feature initially estimated at two weeks in just two days](https://addyosmani.com/blog/ai-coding-workflow/) using an AI-augmented workflow. This isn't a 10% improvement from better tooling - it's a 7x improvement from a fundamentally different approach.

The workflow I'm proposing for El Confidencial inverts the roles entirely:
- **Designers direct and build**: Using AI, designers go from idea to working code
- **AI handles translation**: Between design intent and implementation
- **Developers review and refine**: Focus on architecture, security, performance - not translating Figma pixels to CSS

This sounds radical. It is. But it's also already happening.

## The Context Layer: Teaching AI Your Entire Product

For AI to work as the operating system, it needs to understand your entire product context. Not just syntax and general patterns, but *your* codebase, *your* design system, *your* business constraints.

Here's what AI needs access to:

**Your codebase and all dependencies**
- Every component, every utility, every service
- How things connect and why
- What's legacy and what's current
- Technical debt and where it lives

**Your design system**
- Components, tokens, patterns
- When to use what and why
- Brand guidelines and accessibility requirements
- The exceptions and edge cases

**Your backlog and requirements**
- Current tickets and priorities
- Past decisions and their rationale
- User feedback and support patterns
- Business metrics and what moves them

**Your constraints**
- Legacy systems that can't be touched
- Third-party integrations
- Team skill levels
- Performance requirements

Building this context layer is now technically feasible thanks to the Model Context Protocol (MCP). MCP is a standard for connecting AI systems to external data sources and tools. Think of it as API endpoints specifically designed for AI context.

### Available MCP Servers (Now)

**Atlassian's official MCP** connects [Jira, Confluence, and Compass](https://github.com/atlassian/atlassian-mcp-server). AI can read tickets, create issues from natural language, summarize discussions, and update documentation without you switching tools.

**GitHub's official MCP** provides access to [repositories, issues, pull requests, and code files](https://github.com/github/github-mcp-server). The remote version means you don't install anything locally - new updates apply automatically. AI can analyze code, review PRs, manage issues, and understand your entire Git history.

**Community Jira MCPs** offer [production-ready alternatives](https://github.com/Warzuponus/mcp-jira) with features tailored for different team sizes and workflows.

For design systems, [Figma has MCP support](https://lobehub.com/mcp/boraalapgh-figma-vue-design-system) that lets AI understand your components at a structural level. One designer wrote about [building an AI-ready workflow using Claude Code and Figma MCP](https://uxdesign.cc/designing-with-claude-code-and-codex-cli-building-ai-driven-workflows-powered-by-code-connect-ui-f10c136ec11f) to turn high-level prompts into production code that directly reflects their design system.

### The Architecture

At El Confidencial, here's what our context layer could look like:

**Layer 1: Continuous Ingestion**
- MCP servers syncing Jira, GitHub, Supabase
- Automated pipelines capturing every ticket update, PR merge, support request
- Design system documentation feeding into Claude Projects
- Analytics data showing what users actually do

**Layer 2: Vector Database**
- For massive codebases too large for context windows
- [Pinecone](https://www.pinecone.io/), [Weaviate](https://weaviate.io/), or [Milvus](https://medium.com/vector-database/frustrated-with-new-data-our-vector-database-can-help-e5c430b29be7) storing embeddings of code, docs, and historical decisions
- AI queries relevant sections instead of loading everything
- RAG (Retrieval Augmented Generation) for up-to-date, accurate responses

**Layer 3: Business Context**
- Financial constraints (which we can actually include - controversial but valuable)
- Team capabilities and current workload
- Technical roadmap and deprecation plans
- Compliance requirements and security policies

The goal: AI that knows your business as well as your senior developers do. When you ask it to build something, it considers not just how to write the code, but whether it fits your architecture, uses the right components, and respects your constraints.

<!-- IMAGE: Diagram showing MCP servers connecting Jira, GitHub, Figma, Supabase to Claude Projects/Vector DB, with arrows showing continuous data flow -->

## The Designer-Led Development Workflow

Here's the workflow I'm building toward at El Confidencial:

### Old Workflow
```
Product Owner → PRD in Jira
    ↓
Designer → Figma mockups
    ↓
Handoff → Developer interprets
    ↓
Development → Code review
    ↓
Designer Review → "That's not quite right"
    ↓
Fixes → Another round
    ↓
Ship
```

Average time for a medium feature: 2-3 weeks with multiple review cycles.

### New Workflow
```
Product Owner → PRD in Jira
    ↓
AI Research → Context + edge cases + suggestions
    ↓
Designer + AI → Working code
    ↓
Automated Quality Gates → Tests, security, a11y, performance
    ↓
Developer Review → Architecture, edge cases, optimization
    ↓
Ship
```

Target time: 3-5 days with fewer review cycles because AI catches issues early.

### How It Works: Step by Step

**Phase 1: Requirements + Context**

Product owner describes a feature in Jira: "Add ability to save articles for later reading."

Instead of immediately jumping to design, AI accesses the full context:
- Existing bookmark features in the codebase
- How similar features work (favorites, reading list)
- Technical constraints (Supabase schema, API rate limits)
- Design system components available (bookmark icons, list patterns)
- User data (do people currently bookmark articles in other ways?)

AI asks clarifying questions:
- Should this sync across devices?
- Where should saved articles appear?
- Should there be folders/categories?
- What's the expected usage volume?
- Do we need offline support?

Output: A comprehensive spec document that includes requirements, technical approach, design considerations, testing criteria, and edge cases. This lives in the ticket and becomes the source of truth.

**Phase 2: Design System First**

Before building anything, we ensure the design system is AI-readable. This is critical and often overlooked.

[Figma Make can inspect design system packages](https://developers.figma.com/docs/code/write-design-system-guidelines/) to understand available components and tokens, but it needs guidelines. [Claude Code can convert existing Storybook documentation](https://developers.figma.com/docs/code/write-design-system-guidelines/) into Guidelines files that teach AI about your system.

For El Confidencial, this means:
1. Documenting our shadcn components properly (finally)
2. Creating design tokens in a standard format (DTCG)
3. Writing guidelines that explain when to use what
4. Setting up [automated token synchronization](https://www.supernova.io/blog/the-future-of-enterprise-design-systems-2026-trends-and-tools-for-success): Figma update → GitHub PR → Storybook update → Slack notification

[In 2026, AI-powered linting](https://www.designsystemscollective.com/design-system-mastery-with-figma-variables-the-2025-2026-best-practice-playbook-da0500ca0e66) scans Figma files for naming errors, type mismatches, accessibility failures, and duplicate tokens. This maintenance that we never had time for becomes automated.

**Phase 3: Designer Builds**

This is where it gets interesting. I, the designer, build the feature.

Not in Figma. In code. But I'm not writing code manually - I'm directing AI.

Using Claude Code or Cursor:
```
Me: "Create a save article button using our existing bookmark icon component.
When clicked, save the article ID to Supabase user_saved_articles table.
Show a toast confirmation using our notification system.
The button should work in the article header and article cards."
```

AI generates:
- Component code following our patterns
- Supabase mutation with error handling
- Toast notification integration
- Styles using our design tokens
- Basic tests

I see a live preview (Cursor's composer or browser window). I review:
- Does it look right?
- Does clicking work?
- Does the toast appear correctly?
- Does it match our other bookmark patterns?

I iterate with natural language:
```
Me: "The toast should appear in the top-right, not bottom-center.
And add a subtle animation when saving."
```

AI adjusts. I review again. Repeat until it's right.

Some call this "[vibe coding](https://blog.replit.com/what-is-vibe-coding)" - a term coined by AI researcher Andrej Karpathy in February 2025 that became [Collins Dictionary's Word of the Year for 2026](https://www.knack.com/blog/vibe-coding-tools-guide/). But that undersells it. What we're doing is closer to spec-driven development: writing detailed specifications, directing AI to build against them, and reviewing the output. One designer [built 3 apps and shipped them in 2 weeks](https://adplist.substack.com/p/claude-code-guide-for-designers) using this approach.

I'm not reviewing code quality. I'm reviewing functionality and design. This is what I'm good at. The code quality gets checked next.

**Phase 4: Automated Quality Gates**

Before any human developer sees this code, automated systems check it.

The PR triggers GitHub Actions that run:

**Tests** (must pass)
- Unit tests for the component
- Integration tests for Supabase connection
- E2E test for the save flow

**Security** (must pass)
- Dependency vulnerability scanning
- SQL injection checks
- Authentication/authorization verification

**Accessibility** (must pass)
- ARIA labels present
- Keyboard navigation works
- Screen reader compatibility
- Color contrast meets WCAG AA

**Performance** (must warn)
- Bundle size impact
- Lighthouse scores
- Database query efficiency

**Design System Compliance** (must pass)
- Uses approved components
- Follows token system
- Matches spacing patterns

Tools like [Qodo](https://www.qodo.ai/), [CodeScene](https://zencoder.ai/blog/ai-code-review-tools), and [SonarQube](https://zencoder.ai/blog/ai-code-review-tools) automate this. [High-performing teams using AI code review see 42-48% improvement in bug detection accuracy](https://www.augmentcode.com/guides/autonomous-quality-gates-ai-powered-code-review).

Only if everything passes does the PR reach a developer.

**Phase 5: Developer as Expert Reviewer**

The developer reviews for things I can't evaluate:

**Architecture**: Does this fit our patterns? Is there a better approach?

**Backend Integration**: Are we handling errors correctly? What about race conditions?

**Performance**: Could this cause issues at scale? Are we caching appropriately?

**Edge Cases**: What happens if the user is offline? If Supabase is down? If they spam-click?

**Code Quality**: Is this maintainable? Are there hidden bugs?

But they're NOT reviewing:
- Basic functionality (I tested that)
- Design accuracy (I verified that)
- Component usage (automated checks confirmed that)
- Simple bugs (tests caught those)

Developer review becomes higher-leverage: focus on the hard problems, not translating Figma to CSS.

<!-- IMAGE: Flowchart showing automated quality gates - what gets checked automatically before human review -->

### The Reality Check

This workflow requires designers who can evaluate if code works. Not deeply understand it - I don't need to know implementation details. But I need to:
- Use browser dev tools
- Read error messages
- Test user flows
- Verify data persistence
- Check responsive behavior

Some designers can do this already. Others would need training. That's a real constraint.

Security is another concern. Designers don't think about SQL injection or XSS vulnerabilities. That's why automated security scanning is non-negotiable, and why developer review remains essential.

## Component Library & Tool Selection

Your choice of component library matters more in an AI-first workflow than traditional development.

**shadcn/ui**: AI's favorite. Copy-paste components mean full code access. AI can modify anything. No abstraction layers. At El Confidencial, we should've built on shadcn from the start instead of skinning it with MUI.

**Material UI (MUI)**: Large API surface. AI needs extensive context about props and patterns. Our MUI-skinned-shadcn situation is the worst of both worlds - abstraction without benefits.

**Chakra UI**: Component-based with clear prop APIs. AI generates it well. Good middle ground between control and convenience.

**Headless UI**: Maximum flexibility, but requires more design decisions. AI needs more guidance on styling and behavior.

**Recommendation**: Start with shadcn/ui if possible. If you're locked into something else, document it extensively for AI context.

### Tool Stack for 2026

Based on research and testing, here's what I recommend:

**For Designers:**
- **Claude Code**: [Called "the highest leverage skill designers can learn"](https://adplist.substack.com/p/claude-code-guide-for-designers). Terminal-based but powerful. Best for complex features.
- **Cursor**: Best live preview. Composer mode shows changes in real-time. More intuitive UI than Claude Code.
- **Lovable**: [Built specifically for designers who want to build without code](https://www.knack.com/blog/vibe-coding-tools-guide/). Fastest for simple prototypes.

**For Developers:**
- **Claude Code CLI**: Workflow automation, custom agent configuration, CI/CD integration
- **GitHub Copilot**: Strong for in-line suggestions and completions
- **Cursor**: When you need visual feedback

**For Context:**
- **Claude Projects**: Best for ongoing context management
- **ChatGPT Teams**: Alternative with different strengths
- **MCP Servers**: Atlassian, GitHub, custom integrations

**For Quality:**
- **Qodo**: Full SDLC coverage with Git, IDE, and CLI integration
- **CodeScene**: AI-powered with proprietary CodeHealth metric
- **SonarQube**: Industry standard for code quality and security

### The Gemini Constraint

At El Confidencial, we use Google Workspace, which includes Gemini. This doesn't mean we're locked in - company would pay for team licenses if there's clear ROI. The key is proving value.

Start with free/trial versions of Claude Code and Cursor for one feature. Document time saved, bugs caught, quality improvements. Present that data. Get budget approval.

Gemini is fine for research and general questions. For building features, Claude and GPT-4 are demonstrably better at code generation and following design systems.

## The Legacy System Problem

El Confidencial is a live newspaper. We can't shut down and rebuild. We have:
- Old code that's fragile and scary to touch
- Undocumented parts where the original developer left years ago
- Third-party integrations we don't fully control
- Features that work but nobody knows how

This is the reality for most companies. Pure greenfield is a fantasy.

[Airbnb completed its first large-scale LLM-driven code migration](https://devoxsoftware.com/blog/the-2026-legacy-modernization-report-research-insights-and-strategic-roadmap/) updating around 3,500 React component test files in six weeks, compared with an earlier estimate of 1.5 years to do it manually. [AI-augmented modernization can accelerate timelines by 40-50%](https://www.sphereinc.com/blogs/ai-powered-legacy-odernization/).

The strategy isn't "rewrite everything." It's "new features use the new workflow, old features get migrated when touched."

**New Features**: Built with AI-first workflow from day one. Clean, tested, documented.

**Old Features Touched**: When we need to modify something old, we use AI to:
1. Understand what the code does (AI reads and explains)
2. Write tests before changing anything (AI generates test coverage)
3. Refactor to modern patterns (AI migrates while preserving behavior)
4. Document for the next person (AI generates clear documentation)

**Untouched Legacy**: Leave it alone unless it breaks or needs changes.

**Code Documentation**: AI can analyze legacy code and generate documentation as it learns. Every interaction makes the system smarter about your codebase.

The 2026 vision includes [self-healing architecture](https://www.publicissapient.com/sapient-ai/legacy-application-modernization-roadmap): AI agents continuously scan the codebase to identify bugs and fix emerging technical debt. This isn't autonomous deployment - it's agents creating PRs for human review. But it shifts from reactive ("shit broke") to proactive ("this might break soon").

<!-- IMAGE: Strategy diagram showing new features built with new workflow, old features migrated when touched, and untouched legacy left alone -->

## Agentic Workflows: The Next Level

Everything described so far is AI as a tool: you ask, it responds. The next evolution is agentic AI - autonomous agents that work in the background without constant prompting.

[2026 is positioned as the inflection point for agentic AI](https://futurumgroup.com/press-release/will-vendors-enable-more-complex-agentic-workflows-in-2026/). [IDC expects AI copilots to be embedded in nearly 80% of enterprise workplace applications by 2026](https://www.salesmate.io/blog/future-of-ai-agents/). The [AI agent market crossed $7.6 billion in 2025 and is projected to exceed $50 billion by 2030](https://machinelearningmastery.com/7-agentic-ai-trends-to-watch-in-2026/).

What does this look like practically?

**Background Monitoring Agents:**
- Continuously scan codebase for quality degradation
- Identify design system drift (components used incorrectly)
- Detect performance regressions before users notice
- Find security vulnerabilities in dependencies
- Track technical debt accumulation

**Proactive Suggestion Agents:**
- "Three features now use similar logic - extract shared pattern?"
- "This component is getting complex - consider splitting?"
- "Token usage inconsistent across these files - standardize?"
- "Database query could be optimized - suggested approach?"

**Workflow Automation Agents:**
- Create Jira tickets from support patterns
- Generate test cases from user behavior
- Update documentation when code changes
- Notify relevant people when dependencies update

Frameworks enabling this include [CrewAI, LangGraph, AutoGen, LlamaIndex, and AutoAgent](https://www.instaclustr.com/education/agentic-ai/agentic-ai-frameworks-top-8-options-in-2026/). These provide pre-built components for perception, reasoning, action, and memory management.

The key is "bounded autonomy" - agents operate within clear limits with escalation paths to humans for high-stakes decisions. Most CISOs express concern about AI agent risks, but [leading organizations implement comprehensive audit trails and operational boundaries](https://thenewstack.io/5-key-trends-shaping-agentic-development-in-2026/).

For El Confidencial, this might mean:
1. **Phase 1 (Now)**: AI as tool - designers use Claude Code/Cursor manually
2. **Phase 2 (6 months)**: Background monitoring - agents watch for issues
3. **Phase 3 (12 months)**: Proactive suggestions - agents create improvement PRs
4. **Phase 4 (18+ months)**: Autonomous workflows - agents handle routine tasks end-to-end

Each phase proves value before expanding autonomy.

## What Could Go Wrong & How to Mitigate

Being realistic about risks:

**Risk: Designers building insecure code**
They don't understand SQL injection, XSS, CSRF, authentication bypasses.

*Mitigation*:
- Automated security scanning (non-negotiable, blocks merge)
- Security-focused code review from developers
- Templates and patterns for common secure operations
- Regular security training for designers who build

**Risk: AI generating technical debt faster than you can clean it**
Fast iteration can mean sloppy code if not careful.

*Mitigation*:
- Quality gates that check code complexity and patterns
- Regular architecture reviews by senior developers
- Refactoring time built into sprints (not just new features)
- Code ownership: designer responsible for maintaining what they built

**Risk: Loss of developer expertise and motivation**
Developers might feel reduced to code reviewers, lose skills, or leave.

*Mitigation*:
- Developers focus on complex backend, AI safety, performance optimization
- Architecture and system design becomes more important, not less
- Pairing: designers and developers collaborate on complex features
- Clear career path: senior developers become system architects

**Risk: Context overload - AI knows too much, makes bad assumptions**
More context isn't always better if AI misinterprets or over-applies patterns.

*Mitigation*:
- Clear boundaries: document when to use what patterns
- Versioning: context should reflect current, not historical decisions
- Regular audits: check what AI learned and correct misconceptions
- Explicit overrides: ability to tell AI "ignore the usual pattern here"

**Risk: Cost**
MCP servers, API usage, tool subscriptions, training time.

*Mitigation*:
- Start small: one team, one feature type
- Measure ROI: time saved, bugs prevented, quality improved
- Scale based on results, not assumptions
- Choose tools strategically (Claude Code CLI is free, Cursor has reasonable pricing)

**Risk: Over-reliance on AI, loss of fundamental skills**
If designers never learn how things actually work, they can't debug or make good decisions.

*Mitigation*:
- Onboarding still includes fundamentals (HTML, CSS, React basics)
- Regular "how does this work" sessions where AI explains generated code
- Pairing with developers on complex features
- Expectation: designers should understand what code does, even if they don't write it manually

The biggest risk isn't technical - it's organizational resistance. Developers who feel threatened. Designers who don't want to learn new skills. Management who sees this as risky. That's why starting small and proving value is critical.

## Implementation Roadmap

Here's how to actually do this at a company like El Confidencial:

### Phase 1: Foundation (4-8 weeks)

**Week 1-2: Audit**
- Document current design system (components, tokens, patterns)
- Map codebase architecture (what's where, what connects to what)
- Identify bottlenecks in current workflow
- Choose pilot team and feature type

**Week 3-4: Documentation for AI**
- Create Figma Make guidelines
- Set up Storybook if you don't have it
- Document design tokens in standard format (DTCG)
- Write patterns doc: when to use what and why

**Week 5-6: Context Layer**
- Set up MCP servers (Jira, GitHub)
- Configure Claude Projects or ChatGPT Teams
- Test: can AI correctly answer questions about your system?
- Iterate: add missing context, correct misunderstandings

**Week 7-8: Tool Selection & Training**
- Choose primary tools (recommend Claude Code + Cursor)
- Set up accounts and access
- Training session: designers learn tool basics
- Practice: small non-critical tasks to build confidence

### Phase 2: Pilot Feature (2-4 weeks)

**Week 1: Small feature with new workflow**
- One designer builds one feature start-to-finish
- Senior developer shadows (watches but doesn't intervene unless critical)
- Document everything: what worked, what didn't, what confused you
- Measure: time spent, confidence level, blockers encountered

**Week 2: Review and iterate**
- Demo to team: show the feature and the process
- Developer reviews code: what issues were caught, what was missed
- Adjust workflow based on learnings
- Update documentation and guidelines

**Week 3-4: Second feature, less hand-holding**
- Same designer does another feature with less supervision
- Or different designer does similar feature
- Compare: is it getting faster? Easier? Better quality?
- Identify patterns: what types of features work well, which don't

### Phase 3: Automated Gates (2-3 weeks)

**Week 1: Set up CI/CD**
- Configure GitHub Actions or GitLab CI
- Add test runners, linters, security scanners
- Set up quality checks (Qodo, SonarQube, or similar)
- Define pass/fail criteria clearly

**Week 2: Run parallel to old workflow**
- Features go through both old review and automated gates
- Compare: what do automated gates catch vs miss
- Tune thresholds: too strict blocks good code, too loose lets bugs through
- Developer review focuses on what automation doesn't catch

**Week 3: Switch primary to automated**
- Automated gates become primary check
- Developer review happens after gates pass
- Monitor: are we catching issues early enough?
- Adjust: gates are never perfect, continuous improvement

### Phase 4: Scale (Ongoing)

**Months 2-3: Expand to team**
- Add more designers to pilot
- Cover more feature types
- Build library of examples and patterns
- Regular retros: what's working, what's not

**Months 4-6: Optimize quality gates**
- Reduce false positives
- Add checks for issues you're actually seeing
- Remove checks that don't add value
- Improve error messages and fix suggestions

**Months 7-9: Start legacy modernization**
- Identify high-value legacy code to improve
- Use AI to add tests and documentation
- Refactor when touching old code
- Track: technical debt decreasing?

**Months 10-12: Agentic monitoring**
- Implement background agents watching for issues
- Start proactive suggestions (as PRs for review)
- Build feedback loops: AI learns from review comments
- Expand: more types of automation, more autonomy where proven

**Ongoing: Continuous improvement**
- Context layer gets smarter
- Design system stays maintained (finally)
- Workflow friction points get identified and fixed
- Measure: cycle time, bug rates, developer satisfaction, designer confidence

### Metrics to Track

Don't just assume it's working - measure:

**Speed:**
- Time from PRD to production (before vs after)
- Designer time per feature (but quality matters too)
- Developer review time (should decrease)
- Number of review cycles (should decrease)

**Quality:**
- Bugs caught pre-developer review (should increase)
- Bugs found in production (should decrease)
- Design system consistency (should improve)
- Accessibility issues (should decrease)

**Team:**
- Designer confidence building features (should increase)
- Developer satisfaction with review quality (should increase)
- Time spent on new features vs fixes (should shift toward new)
- Design system maintenance burden (should decrease)

**Business:**
- Features shipped per sprint (should increase)
- Cost per feature (should decrease)
- User-reported issues (should decrease)
- Team velocity (should increase after initial learning curve)

Track these monthly. Be honest about what's not working. Adjust continuously.

<!-- IMAGE: Timeline showing 4 phases with key milestones and decision points -->

## The Future: 2027 and Beyond

If this works - and early evidence suggests it will - what comes next?

**Role Convergence**
Design and development roles start merging. "Product builder" emerges as the title for people who can take an idea from concept to production. Not everyone - specialists still matter. But the line blurs.

**AI as Continuous Collaborator**
Instead of "use AI to build this feature," it's AI actively involved in all discussions. Product planning? AI suggests features based on user data. Design review? AI identifies accessibility issues in real-time. Retrospective? AI analyzes patterns across sprints.

**Self-Improving Systems**
AI that improves AI-generated code. Agents analyze what passed review and what got rejected, learning your team's preferences. The system gets better at generating what you actually want, not just what's technically correct.

**Organizational Divergence**
Companies that adopt this workflow and those that don't will increasingly look like different species. The adapted companies ship faster, maintain quality better, and attract talent who want to work this way. The ones stuck in old workflows fall further behind.

**Education Shifts**
Design education starts including terminal basics, code reading, system thinking. Development education emphasizes architecture and AI collaboration. Both converge on product thinking.

**What This Means for Hiring**
Less "can you code" and more "can you direct AI to build what you envision while maintaining quality?" Different skill: taste, judgment, system thinking, debugging, collaboration.

## Closing Thoughts

This isn't about replacing developers. It's about restructuring how value gets created.

Designers get closer to shipping. They can validate ideas in production rather than waiting weeks for a developer to have capacity. They maintain ownership of their designs through implementation.

Developers focus on hard problems: architecture, performance, security, complex backend logic. They're not translating CSS values from Figma to code. They're designing systems, catching subtle bugs, and making the platform better.

AI handles the translation work that burned so much time. The repetitive stuff. The "this button should be 16px not 18px" stuff. The "what did the designer mean by this?" stuff.

At El Confidencial, we're not there yet. We're in early stages: experimenting with tools, building context, figuring out what works. The design system still needs documentation. Developers are skeptical. Some designers are excited, others nervous.

But the direction is clear. The teams that figure this out first will have an enormous advantage. Not because they're using AI - everyone will be using AI. Because they rebuilt their workflows from the ground up with AI as the foundation.

The question isn't whether this happens. It's whether you're part of the first wave or playing catch-up two years from now.

---

## Sources

- [AddyOsmani.com - My LLM coding workflow going into 2026](https://addyosmani.com/blog/ai-coding-workflow/)
- [Spec-Driven Development - ThoughtWorks](https://thoughtworks.medium.com/spec-driven-development-d85995a81387)
- [Building AI-driven workflows powered by Claude Code - UX Collective](https://uxdesign.cc/designing-with-claude-code-and-codex-cli-building-ai-driven-workflows-powered-by-code-connect-ui-f10c136ec11f)
- [Claude Code guide for designers - Felix Lee](https://adplist.substack.com/p/claude-code-guide-for-designers)
- [Atlassian MCP Server - GitHub](https://github.com/atlassian/atlassian-mcp-server)
- [GitHub MCP Server - GitHub](https://github.com/github/github-mcp-server)
- [JIRA MCP Server - GitHub](https://github.com/Warzuponus/mcp-jira)
- [10 Best AI Code Review Tools - ZenCoder](https://zencoder.ai/blog/ai-code-review-tools)
- [Autonomous Quality Gates: AI-Powered Code Review - Augment Code](https://www.augmentcode.com/guides/autonomous-quality-gates-ai-powered-code-review)
- [Best AI Code Review Tools 2026 - Qodo](https://www.qodo.ai/blog/best-ai-code-review-tools-2026/)
- [Write design system guidelines for Figma Make - Figma Developers](https://developers.figma.com/docs/code/write-design-system-guidelines/)
- [The Future of Enterprise Design Systems: 2026 Trends - Supernova](https://www.supernova.io/blog/the-future-of-enterprise-design-systems-2026-trends-and-tools-for-success)
- [Design System Mastery with Figma Variables 2025/2026 - Design Systems Collective](https://www.designsystemscollective.com/design-system-mastery-with-figma-variables-the-2025-2026-best-practice-playbook-da0500ca0e66)
- [Figma → Vue Design System MCP - LobeHub](https://lobehub.com/mcp/boraalapgh-figma-vue-design-system)
- [AI-Powered Legacy System Modernization - Sphere Inc](https://www.sphereinc.com/blogs/ai-powered-legacy-odernization/)
- [AI-Powered Legacy Code Modernization - EffectiveSoft](https://www.effectivesoft.com/blog/ai-legacy-code-modernization-migration.html)
- [The 2026 Legacy Modernization Report - Devox Software](https://devoxsoftware.com/blog/the-2026-legacy-modernization-report-research-insights-and-strategic-roadmap/)
- [Managing Technical Debt in 2025 - IT Convergence](https://www.itconvergence.com/blog/strategies-for-managing-technical-debt-in-legacy-software-systems/)
- [Legacy Application Modernization Roadmap - Publicis Sapient](https://www.publicissapient.com/sapient-ai/legacy-application-modernization-roadmap)
- [Will Vendors Enable More Complex Agentic Workflows in 2026 - Futurum](https://futurumgroup.com/press-release/will-vendors-enable-more-complex-agentic-workflows-in-2026/)
- [The future of AI agents: Key trends to watch in 2026 - Salesmate](https://www.salesmate.io/blog/future-of-ai-agents/)
- [Agentic AI Frameworks: Top 8 Options in 2026 - Instaclustr](https://www.instaclustr.com/education/agentic-ai/agentic-ai-frameworks-top-8-options-in-2026/)
- [7 Agentic AI Trends to Watch in 2026 - Machine Learning Mastery](https://machinelearningmastery.com/7-agentic-ai-trends-to-watch-in-2026/)
- [5 Key Trends Shaping Agentic Development in 2026 - The New Stack](https://thenewstack.io/5-key-trends-shaping-agentic-development-in-2026/)
- [What is vibe coding - Replit](https://blog.replit.com/what-is-vibe-coding)
- [Best Vibe Coding Tools for App Building in 2026 - Knack](https://www.knack.com/blog/vibe-coding-tools-guide/)
- [Weaviate - Vector Database](https://weaviate.io/)
- [Pinecone - Vector Database](https://www.pinecone.io/)
- [Milvus - AI Vector Database](https://medium.com/vector-database/frustrated-with-new-data-our-vector-database-can-help-e5c430b29be7)
