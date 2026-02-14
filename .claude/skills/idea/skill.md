# Idea Skill

Universal capture system - dump any thought and it gets intelligently categorized into the right backlog.

## Usage

```
/idea <anything on your mind>
```

## Examples

```
/idea Is Claude Code making us dumber?
/idea Build a music lesson planning app with AI
/idea Add dark mode to portfolio
/idea Learn "Wonderwall" on guitar
/idea Redesign the case study grid layout
```

## What This Skill Does

When invoked with an idea:

1. **Analyze** the idea to determine its category
2. **Route** it to the appropriate backlog(s)
3. **Cross-post** article-worthy ideas to both ideas and articles backlogs
4. **Create** new backlogs as needed
5. **Confirm** where the idea was saved

## Categories & Backlogs

- **Ideas** (`content/ideas/backlog.md`) - Raw thoughts, observations, insights
- **Articles** (`content/articles/backlog.md`) - Structured article projects
- **Experiments** (`content/experiments/backlog.md`) - Things to build/try
- **Roadmap** (`content/roadmap/backlog.md`) - Portfolio improvements
- **Music** (`content/music/backlog.md`) - Songs to learn, music ideas
- **Design** (`content/design/backlog.md`) - Design concepts/explorations

## Smart Categorization

The skill analyzes your idea and determines:

- **Ideas**: Observations, questions, philosophical thoughts, "what if" scenarios
- **Articles**: If an idea has clear article potential, it goes to both Ideas AND Articles
- **Experiments**: "Build X", "Try Y", "Make a Z app", technical explorations
- **Roadmap**: Portfolio features, site improvements, "add X to portfolio"
- **Music**: Songs, instruments, music theory, practice ideas
- **Design**: Visual concepts, UI/UX explorations, design patterns

## Entry Format

```markdown
### [Idea title]
- **Added**: YYYY-MM-DD
- **Category**: [category]
- **Status**: captured
- **Notes**: [Context from your original idea]
```

## Statuses

- `captured` - Just an idea, not developed
- `expanding` - Currently being fleshed out
- `researching` - Research in progress
- `outlining` - Outline being created (articles)
- `drafting` - Draft in progress (articles)
- `building` - In development (experiments)
- `ready` - Ready for publishing/launch
- `done` - Completed

## Workflow

1. Dump thoughts freely - don't worry about categorization
2. Skill automatically routes to correct backlog(s)
3. Article-worthy ideas get flagged and cross-posted
4. Review backlogs periodically to distill ideas into articles/projects
