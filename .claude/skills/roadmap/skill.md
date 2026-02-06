# Roadmap Skill

Quickly add items to the portfolio project roadmap for later prioritization and implementation.

## Usage

```
/roadmap <item description>
```

Or naturally mention "add to roadmap: <item>" in conversation.

## Examples

```
/roadmap Fix overlapping text in Sanity Studio image uploader
/roadmap Add dark mode support to the portfolio
add to roadmap: Improve mobile navigation menu
add to roadmap: Add analytics to track case study views
```

## What This Skill Does

When invoked with a roadmap item:

1. Read the current roadmap at `content/roadmap/backlog.md`
2. Add the new item to the Backlog section with:
   - The item description
   - Today's date
   - Priority: TBD (to be determined)
3. Confirm the item was added

## Backlog Entry Format

```markdown
- **[Item description]** - Added YYYY-MM-DD (Priority: TBD)
```

## Priorities (to be assigned later)

- `High` - Critical or blocking issues
- `Medium` - Important improvements
- `Low` - Nice-to-have enhancements
- `TBD` - Needs prioritization

## Categories (optional tags)

- `[UX]` - User experience improvements
- `[Performance]` - Speed/optimization
- `[Content]` - Content-related tasks
- `[Design]` - Visual design updates
- `[Tech Debt]` - Code cleanup/refactoring
- `[Feature]` - New functionality
