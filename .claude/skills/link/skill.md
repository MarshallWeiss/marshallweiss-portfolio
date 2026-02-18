---
name: link
description: "Process a shared link — curate it, spitball from it, or something else. Use when the user pastes a URL."
---

# Link

When the user pastes a URL (article, essay, paper, video, etc.), figure out what they want to do with it.

## Step 1: Fetch the link and extract OG metadata

Use Bash with curl to extract OG tags from raw HTML. WebFetch strips `<head>` tags so it can't see OG metadata.

**Try with Twitterbot user agent first** (many paywalled sites like NYT serve OG tags to social bots):

```bash
curl -sL -A "Twitterbot/1.0" "URL" 2>/dev/null | tr '>' '\n' | grep -E 'og:(title|description|image)' | sed 's/.*content="\([^"]*\)".*/\1/' | head -5
```

If that returns nothing, try with a standard user agent:

```bash
curl -sL -A "Mozilla/5.0" "URL" 2>/dev/null | tr '>' '\n' | grep -E 'og:(title|description|image)' | sed 's/.*content="\([^"]*\)".*/\1/' | head -5
```

If both return nothing, fall back to WebFetch for title/description. If that also fails, ask the user for the title. Skip the OG image if curl can't get it.

## Step 2: Ask what to do

Present options using AskUserQuestion:

- **Add to Others** — Save as a curated article on the Thoughts page ("Others" tab)
- **Spitball from this** — Use as a jumping-off point for a `/spitballing` session
- **Save to ideas backlog** — Capture as an idea in `content/ideas/backlog.md`
- (User can always type something else)

## Actions

### Add to Others
1. Create a `curatedArticle` document in Sanity (project: `uy7uyx0x`, dataset: `production`)
2. Required fields: `title`, `url`, `addedAt` (today's date)
3. Set `title` from og:title (or page title). Ask user to confirm/edit if it looks wrong.
4. Set `source` to the publication name (e.g., "The New York Times", "The Atlantic", "Wired")
5. Set `ogImage` to the og:image URL if one was found
6. Ask user for `category` if not obvious from context. Options: AI, Design, Philosophy, Technology, Culture, Product
7. Optionally ask for a `description` (brief note on why it's worth reading) — or use og:description as a starting point. Skip if user seems in a hurry.
8. Publish the document immediately after creation

### Spitball from this
1. Fetch and summarize the article's key arguments
2. Hand off to the spitballing skill flow — engage with the ideas, find tensions, ask questions
3. Reference the article as source material throughout

### Save to ideas backlog
1. Add an entry to `content/ideas/backlog.md` with the link, title, source, and today's date
2. Use the standard idea entry format from the `/idea` skill

## Notes
- Always try to fetch the actual title — don't guess or fabricate it
- If the URL is clearly an article/essay, default suggestion should be "Add to Others"
- If the URL is more of a tool/product/repo, default to "Save to ideas backlog"
- Keep the interaction quick — this should feel lightweight, not bureaucratic
