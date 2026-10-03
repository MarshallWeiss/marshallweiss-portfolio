# AI Atlas: Data Layer Implementation Plan (Part 1 of 3)

> **For Claude:** REQUIRED SUB-SKILL: Use the `executing-plans` skill to implement this plan task-by-task.

**Goal:** Stand up the standalone `ai-atlas` project, whose Obsidian vault is the CMS for a visual map of important AI concepts, people, technologies and open questions, with a tested pipeline that loads the vault, builds the map graph, verifies quotes and support automatically, and a first cluster (Chips and supply) filled with real, sourced content.

**Architecture:** Next.js 15 app (UI comes in Part 3) with an Obsidian vault at `vault/` following Karpathy's LLM-wiki pattern: immutable sources in `vault/raw/`, typed wiki notes with YAML frontmatter, a schema file `vault/CLAUDE.md`, and `index.md` / `log.md`. A TypeScript library in `lib/vault/` parses and validates notes (zod), resolves `[[wikilinks]]`, and builds a serialisable graph with a publish gate. Quotes are verified mechanically against `raw/`; stance support is judged by a separate `support-checker` agent; a lint script reports problems and appends to `log.md`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, gray-matter, zod 3, tsx, jsdom + @mozilla/readability + turndown (for clipping sources).

**The three parts:** (1) this plan: project setup, data layer, first cluster; (2) the `design-directions` skill using that cluster's real content, producing `design/DIRECTION.md`; (3) a separate plan for the site (map, entry pages, classroom view, i18n) written against the chosen direction. Do not build UI in this plan.

---

## Design decisions (from the 2026-09-25 brainstorm)

- **Product:** a visual map of important things in AI. Nodes are **entries** of four kinds: `concept` (attention, stochastic parrots), `person` (Timnit Gebru), `technology` (chip manufacturing), and `question` (what happens to AI if China blockades Taiwan?). Questions are where disagreement lives; concepts, people and technologies are the landmarks around them. Regions contain clusters, clusters contain entries.
- **Regions:** Power and work first (clusters: Chips and supply, The race, Energy and materials, Work, Concentration of power). Philosophy later, as a faint stub region.
- **Edges:** `related` (any entry to any entry, undirected), `depends_on` (question to question: the answer there constrains the answer here), `reframes` (question to question, lighter).
- **Questions only:** uncertainty type (`empirical` | `conceptual` | `moral`), status, indicators.
- **Positions** are paraphrased stances by a person about an entry (usually a question), each pointing to a source in `raw/`. Quotes are optional and published only if they match the source verbatim (normalised). A `support-checker` agent that sees only the source and the stance decides whether the source supports it. Only `support: supported` positions publish. **No manual verification step exists anywhere.**
- **Every entry cites at least one `raw/` source** in its body; lint flags entries that don't.
- **Bilingual:** short fields (`title`, `summary`, `stance`) carry `_es` twins in frontmatter. Long-form body text is English in v1.
- **`publish: false`** keeps any note off the site.
- **Design register:** clean, modern, informative. No themed metaphors.
- **Deferred:** scheduled auto-ingest, forecast-market probabilities, Seminar Room dialogue, support-checking of entry summaries.

## Gotchas the executor must know

- **YAML parses unquoted `[[Link]]` as a nested array** (`[["Link"]]`). The wikilink helpers accept both forms. Obsidian's property editor writes quoted strings; hand-written notes may not.
- **YAML parses `2026-09-25` as a JS `Date`**, and `1980` as a number. The schema coerces both back to strings. `2026-03` stays a string.
- **Obsidian resolves links by file basename**, so note basenames must be unique across the whole vault. The loader errors on duplicates.
- **Filenames can't safely contain `? : / \ | # ^ [ ]`**, so question notes use a short filename as their ID and carry the full question text in `title`.
- **WebFetch returns a model-written summary, not the page text.** Never create a `raw/` note from WebFetch output; verbatim matching would then check a quote against a paraphrase. Use `npm run clip` (Task 10).
- **Never run `npm run build` while `npm run dev` is running** in the same directory; it corrupts `.next`.
- **Everything the project needs lives in the project folder.** Marshall works from two Claude accounts on this Mac; `~/.claude` skills, agents and memory are not shared between them.

---

## Phase 0: Project home

### Task 0: Create the project folder, portable Claude config, and root CLAUDE.md

**Files:**
- Create: `/Users/mweiss/Desktop/ai-atlas/` (git repo)
- Create: `.claude/skills/design-directions/` (copied), `.claude/agents/design-critic.md` (copied)
- Create: `CLAUDE.md`, `.gitignore`
- Create: `docs/plans/2026-09-25-ai-atlas-data-layer.md` (copy of this plan)

**Step 1: Folder and git**

```bash
mkdir /Users/mweiss/Desktop/ai-atlas
cd /Users/mweiss/Desktop/ai-atlas
git init
```

Expected: `Initialized empty Git repository in /Users/mweiss/Desktop/ai-atlas/.git/`

**Step 2: Copy (do not move) the design skill and critic agent**

```bash
mkdir -p .claude/skills .claude/agents
cp -R ~/.claude/skills/design-directions .claude/skills/
cp ~/.claude/agents/design-critic.md .claude/agents/
ls ~/.claude/skills/design-directions/SKILL.md ~/.claude/agents/design-critic.md
```

Expected: the final `ls` still lists both user-level originals.

**Step 3: Copy this plan into the project**

```bash
mkdir -p docs/plans
cp /Users/mweiss/Desktop/Portfolio/docs/plans/2026-09-25-ai-atlas-data-layer.md docs/plans/
```

**Step 4: `.gitignore`**

```gitignore
# dependencies
node_modules/
.pnp
.pnp.*

# next.js
.next/
out/
build/
next-env.d.ts
*.tsbuildinfo
.vercel

# env
.env*

# testing
coverage/

# obsidian per-device state
**/.obsidian/workspace.json
**/.obsidian/workspace-mobile.json
**/.obsidian/cache
**/.trash/

# misc
.DS_Store
npm-debug.log*
```

**Step 5: Root `CLAUDE.md`**

````markdown
# AI Atlas

A visual map of important things in AI: concepts, people, technologies, and the open questions where they collide. Owner: Marshall Weiss, product designer at El Confidencial in Madrid. It is a portfolio piece first, and also teaching material for his master's course at Universidad Europea ("Estructura de la industria digital", on AI and communication, taught in Spanish).

This file is the project's memory. Marshall works from two Claude accounts on this Mac, and user-level skills, agents and memory are not shared between them, so every decision and tool this project depends on lives in this folder.

## Decisions (brainstorm, 2026-09-25)

- **Design register: clean, modern, informative.** Immersive means absorbing and well crafted, not theatrical. No themed metaphors (star charts, card catalogues, control rooms): they were proposed and rejected as over the top. Divergence between design options comes from structure, typography, colour and layout, anchored to real references.
- **Run the `design-directions` skill before building any UI** (`.claude/skills/design-directions/`, critic agent in `.claude/agents/design-critic.md`). Do not write UI code until `design/DIRECTION.md` exists and Marshall has approved it.
- **Nodes are entries of four kinds:** concept, person, technology, question. Questions are where disagreement lives; the others are the landmarks around them.
- **Power and work is the first region** (chips and geopolitics, the US-China race, energy, work, concentration of power). Philosophy comes later as a faint stub region.
- **The Obsidian vault in `vault/` is the CMS**, following Karpathy's LLM-wiki pattern: immutable sources in `vault/raw/`, LLM-maintained wiki notes, the schema in `vault/CLAUDE.md`, plus `index.md` and `log.md`. Read `vault/CLAUDE.md` before touching any note. No Sanity; this is its own build.
- **No manual quote checking, ever.** Positions are paraphrased stances pointing to a `raw/` source. Quotes are optional and published only when they match the source verbatim (checked by code). Whether a source supports a stance is judged by the `support-checker` agent. Only supported positions publish.
- **The course is general context, not a reading list.** Use its themes (how models work, who controls AI, work, what it does to how we think), not its specific readings or names.
- **Bilingual ES/EN:** short fields have `_es` twins; long body text is English in v1.

## Working rules

- **Never run `npm run build` while `npm run dev` is running** in this folder: it overwrites `.next` and breaks the dev server.
- Ask before building: brainstorm and get approval on design before writing new features.
- No em-dashes in any copy that can appear on the site. Keep copy succinct.
- Never fabricate facts, sources, quotes or personal details. Every entry cites a `raw/` source.
- `vault/raw/` holds copyrighted source texts. If this project ever goes to GitHub, the repo must be **private**.

## Commands (available after Task 1 of the Part 1 plan)

- `npm test`: unit tests (Vitest)
- `npm run vault:lint`: validate the vault and append a report to `vault/log.md` (`-- --dry-run` to skip writing)
- `npm run clip <url>`: clip a web article into `vault/raw/` as verbatim Markdown
- `npm run dev` / `npm run build`

## Map of the code

- `lib/vault/`: wikilinks, schema, loader, graph (publish gate), quotes, lint, clip
- `scripts/`: CLI entry points
- `.claude/agents/`: `design-critic`, `support-checker`
- `docs/plans/`: implementation plans. `design/DIRECTION.md`: the approved visual direction (after Part 2).
````

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: project home with portable Claude config and decisions"
```

### Optional (not now): GitHub

For backup and later Vercel deploys. If added, it **must be private**, because `vault/raw/` holds copyrighted source texts:

```bash
gh repo create ai-atlas --private --source=. --remote=origin --push
```

Only do this when Marshall asks.

---

## Phase A: Scaffold

### Task 1: Next.js app and tooling

create-next-app refuses a folder that already contains `CLAUDE.md` and `.claude/`, so scaffold into a temporary folder and copy it in.

**Step 1: Scaffold and copy**

```bash
SCAFFOLD=$(mktemp -d)
cd "$SCAFFOLD"
npx create-next-app@15 app --ts --eslint --tailwind --app --no-src-dir --import-alias "@/*" --use-npm --skip-install --disable-git --yes
rsync -a --exclude .gitignore --exclude README.md --exclude .git "$SCAFFOLD/app/" /Users/mweiss/Desktop/ai-atlas/
rm -rf "$SCAFFOLD"
cd /Users/mweiss/Desktop/ai-atlas
```

If `--disable-git` or `--skip-install` is not recognised, drop the flag; the `rsync` excludes still keep the scaffold's `.git` out.

**Step 2: Install**

```bash
npm install
npm install gray-matter zod@3
npm install -D vitest tsx jsdom @mozilla/readability turndown @types/jsdom @types/turndown
```

**Step 3: Vitest config** `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next'],
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
});
```

**Step 4: Scripts** in `package.json` `"scripts"` (keep the generated ones):

```json
"test": "vitest run",
"test:watch": "vitest",
"vault:lint": "tsx scripts/lint-vault.ts",
"clip": "tsx scripts/clip.ts"
```

**Step 5: Smoke test.** Create `lib/smoke.test.ts`:

```ts
import { expect, test } from 'vitest';
test('vitest runs', () => expect(1 + 1).toBe(2));
```

Run: `npm test`
Expected: `1 passed`. Delete `lib/smoke.test.ts`.

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 with vitest and vault tooling deps"
```

### Task 2: Vault skeleton, schema file, templates

**Files:**
- Create: `vault/CLAUDE.md`, `vault/index.md`, `vault/log.md`
- Create: `vault/{raw,concepts,people,technologies,questions,positions,works,regions,clusters}/.gitkeep`
- Create: `vault/templates/{Concept,Person,Technology,Question,Position,Work}.md`

**Step 1: Folders**

```bash
mkdir -p vault/{raw,concepts,people,technologies,questions,positions,works,regions,clusters,templates}
for d in raw concepts people technologies questions positions works regions clusters; do touch vault/$d/.gitkeep; done
```

**Step 2: `vault/CLAUDE.md`** (the schema; the heart of the LLM-wiki pattern):

````markdown
# Vault schema

This vault is the content source for AI Atlas. It follows Karpathy's LLM-wiki pattern: the human curates sources and asks questions, the LLM writes and maintains the wiki notes, and the site is built from the notes.

## Layers

- `raw/`: immutable source documents clipped with `npm run clip <url>`. **Never edit a raw note.** Never create one from WebFetch output or from memory: raw notes must be verbatim page text, or quote matching is meaningless.
- Wiki notes: everything else. The LLM owns these.
- `index.md`: catalogue of every entry, grouped by region and cluster, one line each. Update on every ingest.
- `log.md`: append-only. Entries start `## [YYYY-MM-DD] <ingest|query|lint> | <title>`.

## Rules

- Note basenames are unique across the vault (Obsidian links by basename).
- Links in frontmatter are quoted: `"[[Note name]]"`.
- No em-dashes in any text that may appear on the site.
- Never fabricate. Every factual claim must come from a `raw/` source, and every entry's body ends with a `Sources:` line linking the raw notes it rests on.
- `publish: false` keeps a note off the site. Positions only appear once `support: supported`.

## Entries (the nodes on the map)

Four kinds, each in its own folder: `concepts/`, `people/`, `technologies/`, `questions/`. All share these fields:

```yaml
type: concept                  # concept | person | technology | question
title: "Optional display title (defaults to the filename)"
title_es: "Optional Spanish title (defaults to title)"
summary: "One or two sentences, plain language."
summary_es: "..."
region: "[[Power and work]]"
cluster: "[[Chips and supply]]"
related: ["[[Another entry]]"]  # undirected links between any entries
last_reviewed: 2026-09-25
```

Body: a fuller explanation, then `Sources: [[raw-note]], [[raw-note]]`.

**person** adds:
```yaml
affiliation: "Where they work now"
incentives: "Financial or institutional interests relevant to their positions"
```

**question** requires `title` and `title_es` (the full question; the filename is a short ID without punctuation) and adds:
```yaml
uncertainty: empirical        # empirical | conceptual | moral
status: open                  # open | shifting | largely-settled | badly-framed
depends_on: ["[[Other question]]"]   # the answer there constrains the answer here
reframes: []
indicators: ["What to watch that would move the answer"]
```
Question bodies have `## Why it is open` and `## History` (dated bullets of when the question changed shape).

## Positions (`positions/<Person> on <Entry>.md`)

One person's stance on one entry (usually a question), at one date. If they change their mind, add a second position with the new date; never overwrite.

```yaml
type: position
person: "[[Daron Acemoglu]]"
about: "[[Some entry]]"
stance: "Paraphrase in our words, specific, one or two sentences."
stance_es: "..."
date: 2024-05                  # YYYY, YYYY-MM or YYYY-MM-DD of the source
source: "[[2024-the-simple-macroeconomics-of-ai]]"   # must be a raw/ note
quote: "Optional. Copied exactly from the raw note."
support: unchecked             # unchecked | supported | unsupported (set by the support check only)
support_passage: ""            # set by the support check only
```

## Other notes

- **work** (`works/`): `type: work`, `author: ["[[Person]]"]`, `year`, `url`, `es_edition`, `raw: "[[raw note]]"`.
- **region / cluster** (`regions/`, `clusters/`): `type`, `title_es`, `order`; clusters also `region: "[[...]]"`. Body: a short introduction shown when the map is zoomed out.

## Workflows

### Ingest (a new source)
1. `npm run clip <url>` → creates `raw/<year>-<slug>.md`. If it fails (paywall, PDF), pick another source.
2. Read the raw note in full. Tell the user the 3-5 key takeaways in chat.
3. Create or update every entry the source covers (concepts, technologies, people, questions); add the raw note to each one's `Sources:` line; set `last_reviewed`.
4. For each stance a person takes in the source, create a `position` with `support: unchecked`. Add a `quote` only by copying text exactly from the raw note.
5. Create or update `work` notes it touches.
6. Update `index.md`. Append `## [date] ingest | <source title>` to `log.md` listing the notes touched.
7. Run the support check on the new positions, then `npm run vault:lint`.

### Support check
For each position with `support: unchecked`, spawn the `support-checker` agent with ONLY: the raw note path, the person's name, the `stance`, and the `quote` if any. Never pass the position note or the conversation. Write its verdict into `support` and its passage into `support_passage`. If `unsupported`, reword the stance to what the source actually says and re-check once; if still unsupported, set `publish: false` and log it.

### Query
Answer questions from the wiki with links to notes. If the answer is worth keeping (a handout, an outline, a comparison), file it as a note and log `## [date] query | <title>`.

### Lint
`npm run vault:lint` validates every note, resolves links, checks quotes against sources, and appends a report to `log.md`. Fix errors first, then warnings: `stale` (re-review), `thin` (a question with fewer than 2 published positions: ingest a source that disagrees), `unsourced` (entry cites no raw note), `orphan`, `unused source`, `support` (run the support check).
````

**Step 3: `vault/index.md`**

```markdown
# Index

Every entry in the vault, by region and cluster. Updated on every ingest.
```

**Step 4: `vault/log.md`**

```markdown
# Log

Append-only. Newest at the bottom.
```

**Step 5: Templates.** Shared entry header, used by `Concept.md` and `Technology.md` (change `type`):

```markdown
---
type: concept
title_es: ""
summary: ""
summary_es: ""
region: ""
cluster: ""
related: []
last_reviewed: {{date:YYYY-MM-DD}}
---


Sources:
```

`Person.md`: the same with `type: person`, plus `affiliation: ""` and `incentives: ""`.

`Question.md`:

```markdown
---
type: question
title: ""
title_es: ""
summary: ""
summary_es: ""
region: ""
cluster: ""
related: []
uncertainty: empirical
status: open
depends_on: []
reframes: []
indicators: []
last_reviewed: {{date:YYYY-MM-DD}}
---
## Why it is open

## History

Sources:
```

`Position.md`:

```markdown
---
type: position
person: ""
about: ""
stance: ""
stance_es: ""
date:
source: ""
support: unchecked
---
```

`Work.md`:

```markdown
---
type: work
author: []
year:
url: ""
---
```

**Step 6: Open in Obsidian (Marshall, one time).** Obsidian → "Open folder as vault" → `/Users/mweiss/Desktop/ai-atlas/vault`. Settings → Core plugins → enable **Templates**, template folder `templates`. If Obsidian is not installed: `brew install --cask obsidian`.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: vault skeleton, schema, and templates"
```

---

## Phase B: Vault library (TDD)

### Task 3: Wikilinks and slugs

**Files:**
- Create: `lib/vault/wikilinks.ts`, `lib/vault/slug.ts`
- Test: `lib/vault/wikilinks.test.ts`, `lib/vault/slug.test.ts`

**Step 1: Write the failing tests**

`lib/vault/wikilinks.test.ts`:

```ts
import { describe, expect, test } from 'vitest';
import { extractWikilinks, linkTarget, linkTargets, parseWikilinkInner } from './wikilinks';

describe('parseWikilinkInner', () => {
  test('plain', () => expect(parseWikilinkInner('Taiwan blockade')).toEqual({ target: 'Taiwan blockade' }));
  test('alias, heading and folder', () =>
    expect(parseWikilinkInner('questions/Taiwan blockade#History|the blockade')).toEqual({
      target: 'Taiwan blockade',
      heading: 'History',
      alias: 'the blockade',
    }));
});

describe('extractWikilinks', () => {
  test('finds every link in text', () =>
    expect(extractWikilinks('See [[A]] and [[B|bee]].').map((l) => l.target)).toEqual(['A', 'B']));
});

describe('linkTarget', () => {
  test('quoted string', () => expect(linkTarget('[[A]]')).toBe('A'));
  test('unquoted YAML form (nested array)', () => expect(linkTarget([['A']])).toBe('A'));
  test('bare name', () => expect(linkTarget('A')).toBe('A'));
  test('empty or wrong type', () => {
    expect(linkTarget('')).toBeNull();
    expect(linkTarget(3)).toBeNull();
    expect(linkTarget(undefined)).toBeNull();
  });
});

describe('linkTargets', () => {
  test('list of quoted and unquoted links', () => expect(linkTargets(['[[A]]', [['B']]])).toEqual(['A', 'B']));
  test('single unquoted link parsed as nested array', () => expect(linkTargets([['A']])).toEqual(['A']));
  test('missing', () => expect(linkTargets(undefined)).toEqual([]));
  test('single string', () => expect(linkTargets('[[A]]')).toEqual(['A']));
});
```

`lib/vault/slug.test.ts`:

```ts
import { expect, test } from 'vitest';
import { slugify } from './slug';

test('lowercases, strips accents and punctuation', () => expect(slugify('What’s next? Ñandú')).toBe('whats-next-nandu'));
test('collapses separators', () => expect(slugify('  Chips -- and   supply ')).toBe('chips-and-supply'));
```

**Step 2: Run to verify they fail**

Run: `npm test -- lib/vault`
Expected: FAIL, cannot find module `./wikilinks` / `./slug`.

**Step 3: Implement**

`lib/vault/wikilinks.ts`:

```ts
export interface Wikilink {
  target: string;
  alias?: string;
  heading?: string;
}

const WIKILINK = /\[\[([^\]]+)\]\]/g;
const WHOLE_LINK = /^\s*\[\[([^\]]+)\]\]\s*$/;

export function parseWikilinkInner(inner: string): Wikilink {
  const [left, alias] = inner.split('|');
  const [pathPart, heading] = left.split('#');
  const link: Wikilink = { target: pathPart.split('/').pop()!.trim() };
  if (heading?.trim()) link.heading = heading.trim();
  if (alias?.trim()) link.alias = alias.trim();
  return link;
}

export function extractWikilinks(text: string): Wikilink[] {
  return [...text.matchAll(WIKILINK)].map((m) => parseWikilinkInner(m[1]));
}

/** Frontmatter value → link target. Accepts "[[X]]", bare "X", and YAML's unquoted [[X]] (a nested array). */
export function linkTarget(value: unknown): string | null {
  if (typeof value === 'string') {
    const m = value.match(WHOLE_LINK);
    const target = m ? parseWikilinkInner(m[1]).target : value.trim();
    return target || null;
  }
  if (Array.isArray(value) && value.length === 1) return linkTarget(value[0]);
  return null;
}

export function linkTargets(value: unknown): string[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    const t = linkTarget(value);
    return t ? [t] : [];
  }
  return value.map(linkTarget).filter((t): t is string => t !== null);
}
```

`lib/vault/slug.ts`:

```ts
export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

**Step 4: Run to verify they pass**

Run: `npm test -- lib/vault`
Expected: all PASS.

**Step 5: Commit**

```bash
git add lib/vault
git commit -m "feat(vault): wikilink parsing and slugs"
```

### Task 4: Note schemas

**Files:**
- Create: `lib/vault/schema.ts`
- Test: `lib/vault/schema.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, test } from 'vitest';
import { noteSchema } from './schema';

const entry = {
  summary: 's',
  summary_es: 's',
  region: '[[Power and work]]',
  cluster: [['Chips and supply']],
  last_reviewed: new Date('2026-09-25'),
};

describe('entries', () => {
  test('concept: resolves links, coerces dates, applies defaults, title optional', () => {
    expect(noteSchema.parse({ type: 'concept', ...entry })).toMatchObject({
      region: 'Power and work',
      cluster: 'Chips and supply',
      last_reviewed: '2026-09-25',
      related: [],
      publish: true,
    });
  });

  test('person keeps affiliation and incentives', () =>
    expect(noteSchema.parse({ type: 'person', ...entry, incentives: 'x' })).toMatchObject({ incentives: 'x' }));

  test('entries require a summary', () => {
    const { summary, ...rest } = entry;
    expect(noteSchema.safeParse({ type: 'technology', ...rest }).success).toBe(false);
  });
});

describe('question', () => {
  const question = {
    type: 'question',
    ...entry,
    title: 'What happens to AI if China blockades Taiwan?',
    title_es: '¿Qué le pasa a la IA si China bloquea Taiwán?',
    uncertainty: 'empirical',
  };
  test('question defaults', () =>
    expect(noteSchema.parse(question)).toMatchObject({ status: 'open', depends_on: [], reframes: [], indicators: [] }));
  test('rejects unknown uncertainty type', () =>
    expect(noteSchema.safeParse({ ...question, uncertainty: 'vibes' }).success).toBe(false));
  test('questions require the Spanish title', () => {
    const { title_es, ...rest } = question;
    expect(noteSchema.safeParse(rest).success).toBe(false);
  });
});

describe('position', () => {
  const position = {
    type: 'position',
    person: '[[Jane Analyst]]',
    about: '[[Taiwan blockade]]',
    stance: 'x',
    source: '[[2026-report]]',
  };
  test('year-only date from YAML number; support defaults to unchecked', () =>
    expect(noteSchema.parse({ ...position, date: 1980 })).toMatchObject({ date: '1980', support: 'unchecked' }));
  test('year-month date stays a string', () =>
    expect(noteSchema.parse({ ...position, date: '2026-03' })).toMatchObject({ date: '2026-03' }));
  test('rejects a malformed date', () =>
    expect(noteSchema.safeParse({ ...position, date: 'March 2026' }).success).toBe(false));
  test('rejects a missing source link', () =>
    expect(noteSchema.safeParse({ ...position, date: 2026, source: '' }).success).toBe(false));
});

test('unknown type is rejected', () => expect(noteSchema.safeParse({ type: 'essay' }).success).toBe(false));
```

**Step 2: Run to verify it fails**

Run: `npm test -- lib/vault/schema`
Expected: FAIL, cannot find module `./schema`.

**Step 3: Implement** `lib/vault/schema.ts`:

```ts
import { z } from 'zod';
import { linkTarget, linkTargets } from './wikilinks';

const link = z.unknown().transform((v, ctx) => {
  const target = linkTarget(v);
  if (!target) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'expected a [[wikilink]]' });
    return z.NEVER;
  }
  return target;
});
const links = z.unknown().transform((v) => linkTargets(v));

const toDateString = (v: unknown) =>
  v instanceof Date ? v.toISOString().slice(0, 10) : typeof v === 'number' ? String(v) : v;
const isoDate = z.preprocess(toDateString, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD'));
const partialDate = z.preprocess(
  toDateString,
  z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'expected YYYY, YYYY-MM or YYYY-MM-DD'),
);
const publish = z.boolean().default(true);

export const ENTRY_TYPES = ['concept', 'person', 'technology', 'question'] as const;
export const UNCERTAINTY = ['empirical', 'conceptual', 'moral'] as const;
export const STATUS = ['open', 'shifting', 'largely-settled', 'badly-framed'] as const;
export const SUPPORT = ['unchecked', 'supported', 'unsupported'] as const;

const entryFields = {
  title: z.string().min(1).optional(),
  title_es: z.string().min(1).optional(),
  summary: z.string().min(1),
  summary_es: z.string().min(1),
  region: link,
  cluster: link,
  related: links,
  last_reviewed: isoDate,
  publish,
};

export const conceptSchema = z.object({ type: z.literal('concept'), ...entryFields });
export const technologySchema = z.object({ type: z.literal('technology'), ...entryFields });
export const personSchema = z.object({
  type: z.literal('person'),
  ...entryFields,
  affiliation: z.string().optional(),
  incentives: z.string().optional(),
});
export const questionSchema = z.object({
  type: z.literal('question'),
  ...entryFields,
  title: z.string().min(1),
  title_es: z.string().min(1),
  uncertainty: z.enum(UNCERTAINTY),
  status: z.enum(STATUS).default('open'),
  depends_on: links,
  reframes: links,
  indicators: z.array(z.string()).default([]),
});

export const positionSchema = z.object({
  type: z.literal('position'),
  person: link,
  about: link,
  stance: z.string().min(1),
  stance_es: z.string().optional(),
  date: partialDate,
  source: link,
  quote: z.string().optional(),
  support: z.enum(SUPPORT).default('unchecked'),
  support_passage: z.string().optional(),
  publish,
});

export const workSchema = z.object({
  type: z.literal('work'),
  author: links,
  year: z.number().int().optional(),
  url: z.string().url().optional(),
  es_edition: z.string().optional(),
  raw: link.optional(),
  publish,
});

export const regionSchema = z.object({ type: z.literal('region'), title_es: z.string().min(1), order: z.number().int(), publish });
export const clusterSchema = z.object({
  type: z.literal('cluster'),
  title_es: z.string().min(1),
  region: link,
  order: z.number().int(),
  publish,
});

export const noteSchema = z.discriminatedUnion('type', [
  conceptSchema,
  technologySchema,
  personSchema,
  questionSchema,
  positionSchema,
  workSchema,
  regionSchema,
  clusterSchema,
]);

export type Note = z.infer<typeof noteSchema>;
export type NoteType = Note['type'];
export type EntryKind = (typeof ENTRY_TYPES)[number];
export type EntryNoteData = Extract<Note, { type: EntryKind }>;
export type Question = z.infer<typeof questionSchema>;
```

**Step 4: Run to verify it passes**

Run: `npm test -- lib/vault/schema`
Expected: all PASS. If `discriminatedUnion` rejects a member, check every member is a plain `z.object` (transforms belong on fields).

**Step 5: Commit**

```bash
git add lib/vault
git commit -m "feat(vault): zod schemas for entries, positions and structure notes"
```

### Task 5: Test fixture vault

**Files:** create under `lib/vault/__fixtures__/vault/`:

`regions/Power and work.md`
```markdown
---
type: region
title_es: Poder y trabajo
order: 1
---
Who controls AI, what it runs on, and what it does to work.
```

`clusters/Chips and supply.md`
```markdown
---
type: cluster
title_es: Chips y suministro
region: "[[Power and work]]"
order: 1
---
```

`questions/Taiwan blockade.md`
```markdown
---
type: question
title: What happens to AI if China blockades Taiwan?
title_es: ¿Qué le pasa a la IA si China bloquea Taiwán?
summary: Most leading-edge chips are made in Taiwan.
summary_es: La mayoría de los chips de vanguardia se fabrican en Taiwán.
region: "[[Power and work]]"
cluster: "[[Chips and supply]]"
related:
  - "[[Chip manufacturing]]"
uncertainty: empirical
depends_on:
  - "[[US chip independence]]"
last_reviewed: 2026-09-25
indicators:
  - TSMC Arizona output
---
## History

Sources: [[2026-analyst-report]]
```

`questions/US chip independence.md` (unsourced, stale, and an unquoted link to a note that doesn't exist)
```markdown
---
type: question
title: Can the US make leading-edge chips without Taiwan?
title_es: ¿Puede EE. UU. fabricar chips de vanguardia sin Taiwán?
summary: Fabs are being built in Arizona.
summary_es: Se están construyendo fábricas en Arizona.
region: "[[Power and work]]"
cluster: "[[Chips and supply]]"
uncertainty: empirical
depends_on:
  - [[Nonexistent question]]
last_reviewed: 2026-01-01
---
```

`questions/Draft question.md`
```markdown
---
type: question
title: A draft
title_es: Un borrador
summary: s
summary_es: s
region: "[[Power and work]]"
cluster: "[[Chips and supply]]"
uncertainty: moral
last_reviewed: 2026-09-25
publish: false
---
```

`technologies/Chip manufacturing.md`
```markdown
---
type: technology
title_es: Fabricación de chips
summary: How leading-edge chips are made.
summary_es: Cómo se fabrican los chips de vanguardia.
region: "[[Power and work]]"
cluster: "[[Chips and supply]]"
related:
  - "[[Taiwan blockade]]"
last_reviewed: 2026-09-25
---
Sources: [[2026-analyst-report]]
```

`people/Jane Analyst.md`
```markdown
---
type: person
summary: Fictional analyst used in tests.
summary_es: Analista ficticia para los tests.
region: "[[Power and work]]"
cluster: "[[Chips and supply]]"
affiliation: Example Institute
incentives: Funded by a chipmaker trade group
last_reviewed: 2026-09-25
---
Sources: [[2026-analyst-report]]
```

`raw/2026-analyst-report.md`
```markdown
---
source: https://example.com/report
title: Analyst report
author: Jane Analyst
published: 2026-03-01
---
In the report she writes that a blockade “would halt the supply of advanced
chips for years, not months.” She adds that *stockpiles* cover about a quarter.
```

`positions/Jane Analyst on Taiwan blockade.md`
```markdown
---
type: position
person: "[[Jane Analyst]]"
about: "[[Taiwan blockade]]"
stance: A blockade would stop advanced chip supply for years.
stance_es: Un bloqueo cortaría el suministro de chips avanzados durante años.
date: 2026-03
source: "[[2026-analyst-report]]"
quote: "Would halt the supply of advanced chips for years, not months."
support: supported
support_passage: a blockade would halt the supply of advanced chips for years, not months
---
```

`positions/Jane Analyst on stockpiles.md`
```markdown
---
type: position
person: "[[Jane Analyst]]"
about: "[[Taiwan blockade]]"
stance: Stockpiles would soften the first months.
date: 2026-03
source: "[[2026-analyst-report]]"
quote: "Stockpiles would last forever."
support: supported
---
```

`positions/Jane Analyst unchecked.md`
```markdown
---
type: position
person: "[[Jane Analyst]]"
about: "[[US chip independence]]"
stance: Not checked yet.
date: 2026
source: "[[2026-analyst-report]]"
---
```

`broken/Broken question.md`
```markdown
---
type: question
title: Missing almost everything
---
```

Commit:

```bash
git add lib/vault/__fixtures__
git commit -m "test(vault): fixture vault"
```

### Task 6: Loader

**Files:**
- Create: `lib/vault/load.ts`
- Test: `lib/vault/load.test.ts`

**Step 1: Write the failing test**

```ts
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { loadVault } from './load';

const FIXTURE = path.join(__dirname, '__fixtures__/vault');

describe('loadVault', () => {
  const result = loadVault(FIXTURE);

  test('loads valid notes with ids, slugs and parsed data', () => {
    const q = result.notes.find((n) => n.id === 'Taiwan blockade');
    expect(q?.slug).toBe('taiwan-blockade');
    expect(q?.data).toMatchObject({ type: 'question', cluster: 'Chips and supply', last_reviewed: '2026-09-25' });
  });

  test('keeps raw sources separate, with their url', () => {
    expect(result.raw.map((r) => r.id)).toEqual(['2026-analyst-report']);
    expect(result.raw[0].url).toBe('https://example.com/report');
    expect(result.raw[0].body).toContain('stockpiles');
  });

  test('collects outlinks from frontmatter and body', () => {
    expect(result.notes.find((n) => n.id === 'US chip independence')?.outlinks).toEqual(
      expect.arrayContaining(['Power and work', 'Chips and supply', 'Nonexistent question']),
    );
    expect(result.notes.find((n) => n.id === 'Taiwan blockade')?.outlinks).toContain('2026-analyst-report');
  });

  test('reports invalid notes as errors instead of throwing', () => {
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].file).toBe(path.join('broken', 'Broken question.md'));
    expect(result.errors[0].message).toMatch(/title_es/);
  });
});
```

**Step 2: Run to verify it fails**

Run: `npm test -- lib/vault/load`
Expected: FAIL, cannot find module `./load`.

**Step 3: Implement** `lib/vault/load.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { noteSchema, type Note } from './schema';
import { slugify } from './slug';
import { extractWikilinks } from './wikilinks';

export interface LoadedNote {
  id: string;
  slug: string;
  file: string;
  data: Note;
  body: string;
  outlinks: string[];
}

export interface RawSource {
  id: string;
  file: string;
  body: string;
  url?: string;
  title?: string;
}

export interface VaultError {
  file: string;
  message: string;
}

export interface LoadResult {
  notes: LoadedNote[];
  raw: RawSource[];
  errors: VaultError[];
}

const SKIP_DIRS = new Set(['templates']);
const ROOT_FILES = new Set(['CLAUDE.md', 'index.md', 'log.md']);

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name.startsWith('.') || SKIP_DIRS.has(entry.name) ? [] : walk(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

const str = (v: unknown) => (typeof v === 'string' ? v : undefined);

export function loadVault(vaultDir: string): LoadResult {
  const result: LoadResult = { notes: [], raw: [], errors: [] };
  const seen = new Map<string, string>();

  for (const full of walk(vaultDir).sort()) {
    const file = path.relative(vaultDir, full);
    if (ROOT_FILES.has(file)) continue;

    const id = path.basename(file, '.md');
    if (seen.has(id)) {
      result.errors.push({ file, message: `duplicate note name "${id}" (also ${seen.get(id)})` });
      continue;
    }
    seen.set(id, file);

    let parsed: matter.GrayMatterFile<string>;
    try {
      parsed = matter(fs.readFileSync(full, 'utf8'));
    } catch (err) {
      result.errors.push({ file, message: `invalid frontmatter: ${(err as Error).message}` });
      continue;
    }

    if (file.split(path.sep)[0] === 'raw') {
      result.raw.push({ id, file, body: parsed.content, url: str(parsed.data.source), title: str(parsed.data.title) });
      continue;
    }

    const check = noteSchema.safeParse(parsed.data);
    if (!check.success) {
      const message = check.error.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`).join('; ');
      result.errors.push({ file, message });
      continue;
    }

    const outlinks = extractWikilinks(`${parsed.matter}\n${parsed.content}`).map((l) => l.target);
    result.notes.push({ id, slug: slugify(id), file, data: check.data, body: parsed.content, outlinks: [...new Set(outlinks)] });
  }

  return result;
}
```

**Step 4: Run to verify it passes**

Run: `npm test -- lib/vault/load`
Expected: all PASS. If the broken-note message doesn't mention `title_es`, print `result.errors` and match any required question field zod actually reports.

**Step 5: Commit**

```bash
git add lib/vault
git commit -m "feat(vault): loader with validation errors and outlinks"
```

### Task 7: Quote matching

**Files:**
- Create: `lib/vault/quotes.ts`
- Test: `lib/vault/quotes.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, test } from 'vitest';
import { matchQuote, normalizeForMatch } from './quotes';

const source = `In the report she writes that a blockade “would halt the supply of advanced
chips for years, not months.” She adds that *stockpiles* cover about a [quarter](https://x.y).`;

describe('normalizeForMatch', () => {
  test('folds quotes, dashes, whitespace, markdown and case', () =>
    expect(normalizeForMatch('“A — *b*   [c](http://d)”')).toBe('"a - b c"'));
});

describe('matchQuote', () => {
  test('matches across line breaks, case and curly quotes', () =>
    expect(matchQuote('Would halt the supply of advanced chips for years, not months.', source)).toBe(true));
  test('ignores markdown emphasis and links in the source', () =>
    expect(matchQuote('stockpiles cover about a quarter', source)).toBe(true));
  test('supports elided quotes in order', () =>
    expect(matchQuote('would halt the supply … for years, not months', source)).toBe(true));
  test('rejects elided segments out of order', () =>
    expect(matchQuote('for years, not months ... would halt the supply', source)).toBe(false));
  test('rejects a changed word', () =>
    expect(matchQuote('would halt the supply of advanced chips for decades', source)).toBe(false));
  test('rejects fragments too short to mean anything', () => expect(matchQuote('years', source)).toBe(false));
});
```

**Step 2: Run to verify it fails**

Run: `npm test -- lib/vault/quotes`
Expected: FAIL, cannot find module `./quotes`.

**Step 3: Implement** `lib/vault/quotes.ts`:

```ts
/** Normalise text so a quote copied from a page matches its clipped Markdown. */
export function normalizeForMatch(s: string): string {
  return s
    .normalize('NFKC') // also turns … into ...
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // markdown links → their text
    .replace(/[‘’‚‛′]/g, "'")
    .replace(/[“”„‟″«»]/g, '"')
    .replace(/[‐-―−]/g, '-')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const MIN_SEGMENT_CHARS = 12;
const EDGE_PUNCTUATION = /^[\s"'.,;:]+|[\s"'.,;:]+$/g;

/** True if every segment of the quote (split on ellipses) appears in the source, in order. */
export function matchQuote(quote: string, source: string): boolean {
  const haystack = normalizeForMatch(source);
  const segments = normalizeForMatch(quote)
    .split('...')
    .map((s) => s.replace(EDGE_PUNCTUATION, ''))
    .filter(Boolean);

  if (segments.length === 0 || segments.some((s) => s.length < MIN_SEGMENT_CHARS)) return false;

  let from = 0;
  for (const segment of segments) {
    const at = haystack.indexOf(segment, from);
    if (at === -1) return false;
    from = at + segment.length;
  }
  return true;
}
```

**Step 4: Run to verify it passes**

Run: `npm test -- lib/vault/quotes`
Expected: all PASS.

**Step 5: Commit**

```bash
git add lib/vault
git commit -m "feat(vault): verbatim quote matching against raw sources"
```

### Task 8: Graph with publish gate

**Files:**
- Create: `lib/vault/graph.ts`
- Test: `lib/vault/graph.test.ts`

**Step 1: Write the failing test**

```ts
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { buildGraph } from './graph';
import { loadVault } from './load';

const graph = buildGraph(loadVault(path.join(__dirname, '__fixtures__/vault')));
const entry = (id: string) => graph.entries.find((e) => e.id === id)!;

describe('buildGraph', () => {
  test('publishes entries of every kind, but not drafts', () => {
    expect(graph.entries.map((e) => e.id).sort()).toEqual([
      'Chip manufacturing',
      'Jane Analyst',
      'Taiwan blockade',
      'US chip independence',
    ]);
    expect(entry('Chip manufacturing').kind).toBe('technology');
    expect(entry('Jane Analyst').kind).toBe('person');
  });

  test('titles default to the filename; Spanish titles default to the title', () => {
    expect(entry('Chip manufacturing')).toMatchObject({ title: 'Chip manufacturing', title_es: 'Fabricación de chips' });
    expect(entry('Jane Analyst')).toMatchObject({ title: 'Jane Analyst', title_es: 'Jane Analyst' });
  });

  test('kind-specific fields only where they belong', () => {
    expect(entry('Taiwan blockade')).toMatchObject({ uncertainty: 'empirical', status: 'open' });
    expect(entry('Chip manufacturing').uncertainty).toBeUndefined();
    expect(entry('Jane Analyst').incentives).toBe('Funded by a chipmaker trade group');
  });

  test('regions and clusters are resolved and ordered', () => {
    expect(graph.regions.map((r) => r.id)).toEqual(['Power and work']);
    expect(graph.clusters[0]).toMatchObject({ id: 'Chips and supply', region: 'Power and work' });
  });

  test('only supported positions publish', () => {
    expect(entry('Taiwan blockade').positions).toHaveLength(2);
    expect(entry('US chip independence').positions).toHaveLength(0);
  });

  test('verified quotes are kept, unmatched quotes are dropped with a warning', () => {
    const positions = entry('Taiwan blockade').positions;
    const withQuote = positions.find((p) => p.id === 'Jane Analyst on Taiwan blockade')!;
    const withoutQuote = positions.find((p) => p.id === 'Jane Analyst on stockpiles')!;
    expect(withQuote.quote).toMatch(/years, not months/);
    expect(withQuote.source).toMatchObject({ id: '2026-analyst-report', url: 'https://example.com/report' });
    expect(withoutQuote.quote).toBeUndefined();
    expect(graph.warnings.some((w) => w.includes('quote not found'))).toBe(true);
  });

  test('edges: related is undirected and deduplicated; depends_on is directed', () => {
    expect(graph.edges).toHaveLength(2);
    expect(graph.edges).toContainEqual({ from: 'Taiwan blockade', to: 'US chip independence', kind: 'depends_on' });
    expect(graph.edges.filter((e) => e.kind === 'related')).toHaveLength(1);
  });

  test('unresolved links become warnings', () =>
    expect(graph.warnings.some((w) => w.includes('[[Nonexistent question]]'))).toBe(true));

  test('graph is JSON-serialisable', () => expect(() => JSON.parse(JSON.stringify(graph))).not.toThrow());
});
```

**Step 2: Run to verify it fails**

Run: `npm test -- lib/vault/graph`
Expected: FAIL, cannot find module `./graph`.

**Step 3: Implement** `lib/vault/graph.ts`:

```ts
import type { LoadedNote, LoadResult } from './load';
import { ENTRY_TYPES, type EntryKind, type EntryNoteData, type Note, type NoteType, type Question } from './schema';
import { matchQuote } from './quotes';

export interface RegionView { id: string; slug: string; title_es: string; order: number; body: string }
export interface ClusterView extends RegionView { region: string }

export interface PositionView {
  id: string;
  person: string;
  stance: string;
  stance_es?: string;
  date: string;
  quote?: string;
  source: { id: string; url?: string; title?: string };
  support_passage?: string;
}

export interface EntryView {
  id: string;
  slug: string;
  kind: EntryKind;
  title: string;
  title_es: string;
  summary: string;
  summary_es: string;
  region: string;
  cluster: string;
  last_reviewed: string;
  related: string[];
  positions: PositionView[];
  body: string;
  // questions only
  uncertainty?: Question['uncertainty'];
  status?: Question['status'];
  indicators?: string[];
  depends_on?: string[];
  reframes?: string[];
  // people only
  affiliation?: string;
  incentives?: string;
}

export interface Edge { from: string; to: string; kind: 'related' | 'depends_on' | 'reframes' }

export interface Graph {
  regions: RegionView[];
  clusters: ClusterView[];
  entries: EntryView[];
  edges: Edge[];
  warnings: string[];
}

type NoteOf<T extends NoteType> = LoadedNote & { data: Extract<Note, { type: T }> };
type EntryNote = LoadedNote & { data: EntryNoteData };

function ofType<T extends NoteType>(notes: LoadedNote[], type: T): NoteOf<T>[] {
  return notes.filter((n): n is NoteOf<T> => n.data.type === type);
}
const isEntry = (n: LoadedNote): n is EntryNote => (ENTRY_TYPES as readonly string[]).includes(n.data.type);
const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order;

export function buildGraph({ notes, raw }: LoadResult): Graph {
  const warnings: string[] = [];
  const live = notes.filter((n) => n.data.publish);
  const knownIds = new Set([...notes.map((n) => n.id), ...raw.map((r) => r.id)]);
  const rawById = new Map(raw.map((r) => [r.id, r]));

  /** Keep a link only if its target is in `allowed`. Links to unpublished notes drop silently; links to nothing warn. */
  const keep = (from: LoadedNote, target: string, allowed: Set<string>) => {
    if (allowed.has(target)) return true;
    if (!knownIds.has(target)) warnings.push(`${from.file}: unresolved link [[${target}]]`);
    return false;
  };

  const regions = ofType(live, 'region')
    .map((n) => ({ id: n.id, slug: n.slug, title_es: n.data.title_es, order: n.data.order, body: n.body }))
    .sort(byOrder);
  const regionIds = new Set(regions.map((r) => r.id));

  const clusters = ofType(live, 'cluster')
    .filter((n) => keep(n, n.data.region, regionIds))
    .map((n) => ({ id: n.id, slug: n.slug, title_es: n.data.title_es, order: n.data.order, body: n.body, region: n.data.region }))
    .sort(byOrder);
  const clusterIds = new Set(clusters.map((c) => c.id));

  const entryNotes = live.filter(isEntry).filter((n) => keep(n, n.data.cluster, clusterIds));
  const entryIds = new Set(entryNotes.map((n) => n.id));
  const questionIds = new Set(entryNotes.filter((n) => n.data.type === 'question').map((n) => n.id));

  const entries: EntryView[] = entryNotes.map((n) => {
    const d = n.data;
    const title = d.title ?? n.id;
    const view: EntryView = {
      id: n.id,
      slug: n.slug,
      kind: d.type,
      title,
      title_es: d.title_es ?? title,
      summary: d.summary,
      summary_es: d.summary_es,
      region: d.region,
      cluster: d.cluster,
      last_reviewed: d.last_reviewed,
      related: d.related.filter((t) => keep(n, t, entryIds)),
      positions: [],
      body: n.body,
    };
    if (d.type === 'question') {
      view.uncertainty = d.uncertainty;
      view.status = d.status;
      view.indicators = d.indicators;
      view.depends_on = d.depends_on.filter((t) => keep(n, t, questionIds));
      view.reframes = d.reframes.filter((t) => keep(n, t, questionIds));
    }
    if (d.type === 'person') {
      view.affiliation = d.affiliation;
      view.incentives = d.incentives;
    }
    return view;
  });
  const entryById = new Map(entries.map((e) => [e.id, e]));
  const personIds = new Set(entries.filter((e) => e.kind === 'person').map((e) => e.id));

  for (const n of ofType(live, 'position')) {
    const d = n.data;
    if (d.support !== 'supported') continue;
    const source = rawById.get(d.source);
    if (!source) {
      warnings.push(`${n.file}: source [[${d.source}]] is not a raw/ note`);
      continue;
    }
    if (!keep(n, d.about, entryIds) || !keep(n, d.person, personIds)) continue;

    const quoteOk = d.quote !== undefined && matchQuote(d.quote, source.body);
    if (d.quote !== undefined && !quoteOk) warnings.push(`${n.file}: quote not found verbatim in [[${source.id}]], dropped`);

    entryById.get(d.about)!.positions.push({
      id: n.id,
      person: d.person,
      stance: d.stance,
      stance_es: d.stance_es,
      date: d.date,
      quote: quoteOk ? d.quote : undefined,
      source: { id: source.id, url: source.url, title: source.title },
      support_passage: d.support_passage,
    });
  }
  for (const e of entries) e.positions.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

  const edges: Edge[] = [];
  const seenRelated = new Set<string>();
  for (const e of entries) {
    for (const to of e.related) {
      const key = [e.id, to].sort().join('\u0000');
      if (seenRelated.has(key)) continue;
      seenRelated.add(key);
      edges.push({ from: e.id, to, kind: 'related' });
    }
    for (const to of e.depends_on ?? []) edges.push({ from: e.id, to, kind: 'depends_on' });
    for (const to of e.reframes ?? []) edges.push({ from: e.id, to, kind: 'reframes' });
  }

  return { regions, clusters, entries, edges, warnings };
}
```

`undefined` fields vanish on JSON serialisation, which is fine; the test only checks the round trip.

**Step 4: Run to verify it passes**

Run: `npm test -- lib/vault/graph`
Expected: all PASS.

**Step 5: Commit**

```bash
git add lib/vault
git commit -m "feat(vault): graph builder with entry kinds, publish gate and quote verification"
```

### Task 9: Lint and log

**Files:**
- Create: `lib/vault/lint.ts`, `scripts/lint-vault.ts`
- Test: `lib/vault/lint.test.ts`

**Step 1: Write the failing test**

```ts
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { buildGraph } from './graph';
import { formatLogEntry, lintVault } from './lint';
import { loadVault } from './load';

const load = loadVault(path.join(__dirname, '__fixtures__/vault'));
const report = lintVault(load, buildGraph(load), '2026-09-25');
const has = (text: string) => report.warnings.some((w) => w.includes(text));

describe('lintVault', () => {
  test('schema errors are errors', () => expect(report.errors).toHaveLength(1));
  test('stale entries', () => {
    expect(has('stale: "US chip independence"')).toBe(true);
    expect(has('stale: "Taiwan blockade"')).toBe(false);
  });
  test('thin applies to questions only', () => {
    expect(has('thin: "US chip independence"')).toBe(true);
    expect(has('thin: "Chip manufacturing"')).toBe(false);
  });
  test('unsourced entries', () => {
    expect(has('unsourced: "US chip independence"')).toBe(true);
    expect(has('unsourced: "Taiwan blockade"')).toBe(false);
    expect(has('unsourced: "Chip manufacturing"')).toBe(false);
  });
  test('orphans: no inbound links and no related links; positions and regions exempt', () => {
    expect(has('orphan: "Draft question"')).toBe(true);
    expect(has('orphan: "Chip manufacturing"')).toBe(false);
    expect(has('orphan: "Power and work"')).toBe(false);
    expect(has('orphan: "Jane Analyst on')).toBe(false);
  });
  test('unchecked positions are counted', () => {
    expect(report.stats.unchecked).toBe(1);
    expect(has('awaiting the support checker')).toBe(true);
  });
  test('graph warnings are included', () => expect(has('quote not found')).toBe(true));
});

test('formatLogEntry uses the log prefix', () => {
  const entry = formatLogEntry(report, '2026-09-25');
  expect(entry.startsWith('## [2026-09-25] lint | 1 errors,')).toBe(true);
  expect(entry).toContain('- ERROR ');
});
```

**Step 2: Run to verify it fails**

Run: `npm test -- lib/vault/lint`
Expected: FAIL, cannot find module `./lint`.

**Step 3: Implement** `lib/vault/lint.ts`:

```ts
import type { Graph } from './graph';
import type { LoadResult } from './load';

export interface LintReport {
  errors: string[];
  warnings: string[];
  stats: { entries: number; positions: number; unchecked: number };
}

const STALE_DAYS = 90;
const MIN_POSITIONS = 2;
const DAY_MS = 86_400_000;

export function lintVault(load: LoadResult, graph: Graph, today: string): LintReport {
  const errors = load.errors.map((e) => `${e.file}: ${e.message}`);
  const warnings = [...graph.warnings];
  const now = Date.parse(today);
  const rawIds = new Set(load.raw.map((r) => r.id));
  const outlinksById = new Map(load.notes.map((n) => [n.id, n.outlinks]));

  for (const e of graph.entries) {
    const age = Math.floor((now - Date.parse(e.last_reviewed)) / DAY_MS);
    if (age > STALE_DAYS) warnings.push(`stale: "${e.id}" last reviewed ${age} days ago`);
    if (!(outlinksById.get(e.id) ?? []).some((t) => rawIds.has(t))) warnings.push(`unsourced: "${e.id}" cites no raw/ source`);
    if (e.kind === 'question' && e.positions.length < MIN_POSITIONS)
      warnings.push(`thin: "${e.id}" has ${e.positions.length} published position(s), needs ${MIN_POSITIONS}`);
  }

  const inbound = new Set(load.notes.flatMap((n) => n.outlinks));
  const hasRelated = new Set(graph.entries.filter((e) => e.related.length > 0).map((e) => e.id));
  for (const n of load.notes) {
    if (n.data.type === 'position' || n.data.type === 'region') continue;
    if (!inbound.has(n.id) && !hasRelated.has(n.id)) warnings.push(`orphan: "${n.id}" has no inbound links`);
  }
  for (const r of load.raw) if (!inbound.has(r.id)) warnings.push(`unused source: "${r.id}"`);

  const unchecked = load.notes.filter((n) => n.data.type === 'position' && n.data.support === 'unchecked').length;
  if (unchecked) warnings.push(`support: ${unchecked} position(s) awaiting the support checker`);

  const positions = graph.entries.reduce((sum, e) => sum + e.positions.length, 0);
  return { errors, warnings, stats: { entries: graph.entries.length, positions, unchecked } };
}

export function formatLogEntry(report: LintReport, today: string): string {
  const { errors, warnings, stats } = report;
  return [
    `## [${today}] lint | ${errors.length} errors, ${warnings.length} warnings`,
    '',
    `${stats.entries} entries, ${stats.positions} published positions, ${stats.unchecked} unchecked.`,
    '',
    ...errors.map((e) => `- ERROR ${e}`),
    ...warnings.map((w) => `- ${w}`),
    '',
  ].join('\n');
}
```

**Step 4: Run to verify it passes**

Run: `npm test -- lib/vault/lint`
Expected: all PASS.

**Step 5: CLI** `scripts/lint-vault.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import { buildGraph } from '../lib/vault/graph';
import { formatLogEntry, lintVault } from '../lib/vault/lint';
import { loadVault } from '../lib/vault/load';

const args = process.argv.slice(2);
const vaultDir = path.resolve(args.find((a) => !a.startsWith('--')) ?? 'vault');
const today = new Date().toISOString().slice(0, 10);

const load = loadVault(vaultDir);
const report = lintVault(load, buildGraph(load), today);
const entry = formatLogEntry(report, today);

process.stdout.write(entry);
if (!args.includes('--dry-run')) fs.appendFileSync(path.join(vaultDir, 'log.md'), `\n${entry}`);
process.exit(report.errors.length ? 1 : 0);
```

Run: `npm run vault:lint -- lib/vault/__fixtures__/vault --dry-run`
Expected: prints `## [<today>] lint | 1 errors, …` and exits 1 (the broken fixture). Then `npm run vault:lint -- --dry-run` on the real, still-empty vault: `0 errors`, exit 0.

**Step 6: Commit**

```bash
git add lib/vault scripts
git commit -m "feat(vault): lint report and log entries"
```

### Task 10: Source clipper

**Files:**
- Create: `lib/vault/clip.ts`, `scripts/clip.ts`, `lib/vault/__fixtures__/article.html`
- Test: `lib/vault/clip.test.ts`

**Step 1: Fixture** `lib/vault/__fixtures__/article.html` (Readability needs a real-looking article):

```html
<!doctype html>
<html>
<head>
  <title>Chips and the Strait | Example News</title>
  <meta property="article:published_time" content="2026-03-01T09:00:00Z">
</head>
<body>
  <nav>Home · World · Tech</nav>
  <article>
    <h1>Chips and the Strait</h1>
    <p class="byline">By Jane Analyst</p>
    <p>A blockade would halt the supply of advanced chips for years, not months, according to the analysis published this week by the institute, which modelled several scenarios for the Taiwan Strait.</p>
    <p>The report argues that stockpiles held by the largest cloud providers cover about a quarter of annual demand, and that rebuilding comparable capacity elsewhere would take the better part of a decade.</p>
    <p>Officials in Washington dispute the timeline, pointing to new fabrication plants under construction in Arizona and to the subsidies that have accelerated them over the past two years.</p>
    <p>The institute responds that the plants depend on equipment, chemicals and engineers that are still concentrated in a handful of places, and that capacity is not the same as independence.</p>
  </article>
  <footer>© Example News</footer>
</body>
</html>
```

**Step 2: Write the failing test** `lib/vault/clip.test.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';
import { htmlToRawNote } from './clip';

const html = fs.readFileSync(path.join(__dirname, '__fixtures__/article.html'), 'utf8');
const note = htmlToRawNote(html, 'https://example.com/chips', '2026-09-25');

test('filename from publish year and title', () => expect(note.filename).toMatch(/^2026-chips-and-the-strait/));
test('frontmatter has source, published and clipped dates', () => {
  expect(note.content).toContain('source: "https://example.com/chips"');
  expect(note.content).toContain('published: 2026-03-01');
  expect(note.content).toContain('clipped: 2026-09-25');
});
test('body keeps article text verbatim and drops page chrome', () => {
  expect(note.content).toContain('capacity is not the same as independence');
  expect(note.content).not.toContain('Home · World · Tech');
});
```

**Step 3: Run to verify it fails**

Run: `npm test -- lib/vault/clip`
Expected: FAIL, cannot find module `./clip`.

**Step 4: Implement** `lib/vault/clip.ts`:

```ts
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { slugify } from './slug';

export function htmlToRawNote(html: string, url: string, today: string): { filename: string; content: string } {
  const doc = new JSDOM(html, { url }).window.document;
  // Read metadata before Readability, which mutates the document.
  const published = doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content')?.slice(0, 10);
  const article = new Readability(doc).parse();
  if (!article?.content) throw new Error(`Could not extract article text from ${url}`);

  const markdown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' }).turndown(article.content);
  const title = article.title?.trim() || url;
  const year = (published ?? today).slice(0, 4);

  const frontmatter = [
    '---',
    `source: ${JSON.stringify(url)}`,
    `title: ${JSON.stringify(title)}`,
    article.byline ? `author: ${JSON.stringify(article.byline.trim())}` : null,
    published ? `published: ${published}` : null,
    `clipped: ${today}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n');

  return { filename: `${year}-${slugify(title).slice(0, 60)}.md`, content: `${frontmatter}\n\n${markdown}\n` };
}
```

**Step 5: Run to verify it passes**

Run: `npm test -- lib/vault/clip`
Expected: all PASS. If Readability returns null for the fixture, add paragraphs to the fixture rather than lowering thresholds in the code.

**Step 6: CLI** `scripts/clip.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import { htmlToRawNote } from '../lib/vault/clip';

async function main(url: string | undefined) {
  if (!url) throw new Error('Usage: npm run clip <url>');

  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (ai-atlas clipper)' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const type = res.headers.get('content-type') ?? '';
  if (!type.includes('html')) throw new Error(`Not an HTML page (${type}). PDFs are not supported yet; find an HTML version.`);

  const today = new Date().toISOString().slice(0, 10);
  const { filename, content } = htmlToRawNote(await res.text(), url, today);
  const out = path.join('vault', 'raw', filename);
  if (fs.existsSync(out)) throw new Error(`Already clipped: ${out}`);
  fs.writeFileSync(out, content);
  console.log(`Clipped → ${out} (${content.length} chars). Check it is the full article, not a paywall stub.`);
}

main(process.argv[2]).catch((err: Error) => {
  console.error(err.message);
  process.exit(1);
});
```

Manual check: `npm run clip https://en.wikipedia.org/wiki/Moravec%27s_paradox` → a file in `vault/raw/`. Open it, confirm it is real article text, then delete that file; it was only a smoke test.

**Step 7: Commit**

```bash
git add lib/vault scripts
git commit -m "feat(vault): clip web articles into raw/ as verbatim markdown"
```

### Task 11: Support-checker agent

**Files:**
- Create: `.claude/agents/support-checker.md`

**Step 1: Write the agent**

```markdown
---
name: support-checker
description: "Judges whether a clipped source supports a paraphrased stance attributed to a person (and contains a quote). Sees only the source file and the claim. Use from the vault's support-check workflow."
tools: Read
model: opus
---

# Support checker

You are a strict fact-checker. You are given a path to a source document and a claim (a paraphrased stance attributed to a named person), sometimes with a quote. You have not seen how the claim was written and must not assume it is right.

1. Read the whole source file.
2. Decide whether the source, on its own, supports the claim:
   - **supported**: the source states this, or states something that plainly entails it, and attributes it to the same person.
   - **unsupported**: the source does not say this, says something weaker or stronger, attributes it to someone else, or the claim adds numbers, dates or certainty the source lacks.
   When in doubt, it is unsupported. Paraphrase is fine; changed meaning is not.
3. If a quote is given, say whether it appears in the source word for word (ignoring typography like curly quotes and line breaks).

Reply with only this JSON:

{"support": "supported" | "unsupported", "passage": "<the shortest exact passage from the source that supports the claim, or empty>", "quote_found": true | false | null, "reason": "<one sentence>"}
```

**Step 2: Dry run** (in a Claude session in this project): spawn `support-checker` with the path `lib/vault/__fixtures__/vault/raw/2026-analyst-report.md` and the claim "Jane Analyst says a blockade would stop advanced chip supply for years." Expected: `supported`, with the "would halt…" passage. Then "Jane Analyst says a blockade would stop chip supply for a decade." Expected: `unsupported`.

**Step 3: Commit**

```bash
git add .claude
git commit -m "feat: support-checker agent for stance verification"
```

---

## Phase C: First cluster (Chips and supply)

Content, not code. The acceptance criteria at the end are the tests.

### Task 12: Structure and seed entries

**Files:**
- `vault/regions/Power and work.md` (`order: 1`, `title_es: Poder y trabajo`)
- `vault/regions/Philosophy.md` (`order: 2`, `title_es: Filosofía`; faint stub, no clusters yet)
- `vault/clusters/Chips and supply.md` (`order: 1`, `Chips y suministro`) and stub clusters with no entries yet: `The race` (`2`, `La carrera`), `Energy and materials` (`3`, `Energía y materiales`), `Work` (`4`, `Trabajo`), `Concentration of power` (`5`, `Concentración de poder`). All `region: "[[Power and work]]"`.
- Seed entries in the Chips and supply cluster, from the templates, all with `publish: false` until Task 14:

| Kind | File (id) | title_es / question text | Links |
|---|---|---|---|
| technology | `Chip manufacturing` | Fabricación de chips | related: EUV lithography, Chip independence |
| technology | `EUV lithography` | Litografía EUV | related: Chip manufacturing |
| concept | `Silicon shield` | Escudo de silicio | related: Taiwan blockade |
| concept | `Export controls` | Controles de exportación | related: Export controls effect |
| concept | `Compute` | Capacidad de cómputo | related: Compute as the constraint |
| question | `Taiwan blockade` | What happens to AI if China blockades or invades Taiwan? / ¿Qué le pasa a la IA si China bloquea o invade Taiwán? | depends_on: Chip independence, Compute as the constraint |
| question | `Chip independence` | Can the US or Europe make leading-edge chips without Taiwan? / ¿Pueden EE. UU. o Europa fabricar chips de vanguardia sin Taiwán? | |
| question | `Export controls effect` | Do export controls slow China's AI, or speed up its own chip industry? / ¿Frenan los controles de exportación la IA china o aceleran su propia industria de chips? | depends_on: Compute as the constraint |
| question | `Compute as the constraint` | Is access to compute what decides who leads in AI? / ¿Es el acceso a la capacidad de cómputo lo que decide quién lidera la IA? | |

All four questions are `uncertainty: empirical`. Put "TBD after ingest" in `summary` / `summary_es`: summaries must come from sources, not memory. **People are not seeded**: they are created during ingest, only for people who take a published position or are central to an entry.

Update `vault/index.md`. Run `npm run vault:lint -- --dry-run`: expect 0 errors.

```bash
git add vault
git commit -m "content: power and work region, chips cluster seed entries"
```

### Task 13: Ingest sources

For each of the four questions, find **3 to 4 sources that disagree with each other** (one-sided questions defeat the point of the map). Also make sure every concept and technology entry is covered by at least one source. Prefer primary sources (think-tank reports, officials' speeches, company statements), quality journalism, and researchers' own essays. Mix US, Chinese, Taiwanese and European perspectives where they exist in English or Spanish.

For each source, follow the **Ingest** workflow in `vault/CLAUDE.md` exactly: `npm run clip <url>`, read it fully, update entries and their `Sources:` lines, create people and positions (`support: unchecked`), works, `index.md`, `log.md`.

Share each source's 3-5 takeaways with Marshall in chat as you go, but don't wait for approval between sources.

Commit after each question: `git add vault && git commit -m "content: ingest sources for <entry id>"`.

### Task 14: Support check and publish

1. Run the **Support check** workflow on every `unchecked` position (one `support-checker` spawn per position; source path, person, stance, quote only).
2. Apply verdicts; reword and re-check unsupported ones once; unpublish what still fails.
3. Replace every "TBD" summary with a sourced one and set `publish: true` on the seeded entries.
4. `npm run vault:lint` (not dry-run, so it logs).

**Acceptance criteria (Part 1 is done when all hold):**
- `npm test` passes.
- `npm run vault:lint` reports **0 errors**, and no `thin`, `unsourced` or `support` warnings on the cluster's entries.
- Every published position's source is a `raw/` note created by `npm run clip`.
- On at least 3 of the 4 questions, published positions genuinely disagree.
- At least 3 person entries exist, each with `affiliation` and, where the sources show one, `incentives`.
- `vault/index.md` lists every entry; `vault/log.md` has an ingest entry per source and a final lint entry.

```bash
git add vault
git commit -m "content: support-check and publish chips cluster"
```

---

## After this plan

Stop and report to Marshall: entries, positions and sources added; sources that failed to clip; positions unpublished by the checker. Then run the `design-directions` skill (Part 2) using the Chips and supply cluster as the constant content in every sketch. The site plan (Part 3) is written only after `design/DIRECTION.md` is approved.
