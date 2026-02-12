# End Session Skill

Document session work and commit changes when wrapping up a work session.

## Usage

```
/end-session
```

Or naturally in conversation:
```
"end the session"
"wrap up and document what we did"
"commit and close the session"
```

## What This Skill Does

When invoked at the end of a work session:

1. **Read recent work** from git status and recent commits
2. **Update context.md** with a new section documenting:
   - Date of session
   - What was accomplished
   - Key decisions made
   - Files modified
   - Any important notes for future sessions
3. **Commit changes** to git with descriptive message
4. **Confirm** session documented and committed

## Context Entry Format

```markdown
## Recent Work (YYYY-MM-DD)

### [Session Title] ✅
**[Brief description of what was accomplished]:**

**[Category 1]:**
- Bullet points of what was done
- Specific files changed
- Key decisions made

**[Category 2]:**
- More details as needed

**Files Updated:**
- List of modified files

**Build Status:** ✓ Status note if relevant
```

## Process

1. **Gather session info**:
   - Check git status for uncommitted changes
   - Check recent commits from this session
   - Identify what was accomplished

2. **Update context.md**:
   - Read current context.md
   - Add new session section at top of "Recent Work"
   - Include date, accomplishments, files changed

3. **Commit everything**:
   - Stage all changes (context.md + any other uncommitted work)
   - Create descriptive commit message summarizing session
   - Push if needed

4. **Confirm**:
   - Show what was documented
   - Show what was committed
   - Provide summary of session

## Notes

- Always add session info to the **top** of the "Recent Work" section in context.md
- Include enough detail that someone (or Claude in a future session) can understand what was accomplished
- Be specific about files modified and key decisions
- If there are uncommitted changes beyond context.md, ask user if they should be committed
