# Experiment Skill

Quickly capture experiment/side project ideas to the backlog.

## Usage

```
/experiment <your idea>
```

## Examples

```
/experiment Interactive 3D portfolio navigation
/experiment AI-powered color palette generator
/experiment Generative art using Claude's API
```

## What This Skill Does

When invoked with an idea:

1. Read the current backlog at `content/experiments/backlog.md`
2. Add the new idea at the top of the Backlog section with:
   - The idea text
   - Today's date
   - Status: idea
3. Confirm the idea was added
4. Optionally ask if you want to start working on it now

## Backlog Entry Format

```markdown
### [Experiment title]
- **Added**: YYYY-MM-DD
- **Status**: idea
- **Technologies**: [If mentioned]
- **Notes**: [Any additional context provided]
```

## Statuses

- `idea` - Just a concept
- `planning` - Figuring out approach
- `building` - Actively working on it
- `complete` - Finished
- `archived` - Shelved for now
