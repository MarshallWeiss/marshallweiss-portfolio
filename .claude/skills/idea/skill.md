# Idea Skill

Quickly capture article ideas to the backlog.

## Usage

```
/idea <your idea>
```

## Examples

```
/idea Is Claude Code making us dumber?
/idea The death of the designer as we know it
/idea Why I think AI will democratize creativity
```

## What This Skill Does

When invoked with an idea:

1. Read the current backlog at `content/ideas/backlog.md`
2. Add the new idea at the top of the Backlog section with:
   - The idea text
   - Today's date
   - Status: captured
3. Confirm the idea was added
4. Optionally ask if you want to expand on it now or save for later

## Backlog Entry Format

```markdown
### [Idea title]
- **Added**: YYYY-MM-DD
- **Status**: captured
- **Notes**: [Any additional context provided]
```

## Statuses

- `captured` - Just an idea, not developed
- `expanding` - Currently being fleshed out
- `researching` - Research in progress
- `outlining` - Outline being created
- `drafting` - Draft in progress
- `ready` - Ready for publishing
