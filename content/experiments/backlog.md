# Experiment Ideas Backlog

Ideas for future experiments and side projects. Add new ideas at the top.

---

## Backlog

### AI Atlas (was: Thinkers Library)

- **Added**: 2026-09-24
- **Status**: planning
- **Technologies**: Next.js, Wikipedia API, Stanford Encyclopedia of Philosophy (SEP) scraping, Claude API (for dialogue mode)
- **Decisions (2026-09-25 brainstorm)**: now **AI Atlas**, a standalone project at `~/Desktop/ai-atlas`. A visual map of entries (concepts, people, technologies, open questions) in a clean, modern, informative register; Obsidian vault as CMS following Karpathy's LLM-wiki pattern; positions are paraphrases auto-checked against clipped sources; Power and work region first (Chips and supply cluster), Philosophy later. Portfolio piece first, also material for the Universidad Europea course. Plan: `docs/plans/2026-09-25-ai-atlas-data-layer.md` (Part 1 of 3; then design-directions, then site plan). Full decisions live in the project's own CLAUDE.md.
- **Notes**: A digital "library" for exploring perspectives on AI. Two possible directions:
  - **AI thinkers library**: profiles of key AI thinkers with bios, the books and articles they've written, and the ones they recommend. Browse by thinker and compare positions on shared questions (alignment, consciousness, labor, creativity, risk).
  - **Philosophers library**: same structure, built by scraping Wikipedia and SEP. Adds a dialogue mode where philosophers debate each other on a chosen question, grounded in their sourced positions.
  - Could merge: AI thinkers and philosophers in the same library, so a contemporary AI researcher can be put in conversation with Kant or Wittgenstein. Ties into the AI philosophy topics from spitballing and the thoughts section.
  - **Auto-updating (essential for the AI version)**: the field moves too fast for a static library. Needs a scheduled agent that checks for each thinker's new books, essays, interviews, and shifts in position, then proposes updates for review rather than publishing directly. Could reuse `content/ai-news/sources.md` and the ai-news-research monitoring stage.
  - **Timeline of AI thinking**: how thinking on AI has evolved, with quotes from key moments (e.g. Turing 1950, Dartmouth 1956, the AI winters, Deep Blue, AlphaGo, GPT-3, ChatGPT). Show how individual thinkers' positions changed over time, not just the field's milestones. New entries from the auto-update agent feed into it.
  - **Teaching use**: could serve as course material for the Universidad Europea course: students explore perspectives, follow the timeline, or stage debates between thinkers.
  - Open questions: how to keep generated dialogue faithful to sources (cite SEP passages inline), SEP's terms of use for scraping, how to verify quotes are real and correctly dated, and whether the site needs a Spanish version for the course.

### Real-Time Sunlight Map

- **Added**: 2026-02-14
- **Status**: idea
- **Technologies**: React/Next.js, WebGL or Three.js, Sun position calculation library (SunCalc), Maps API
- **Notes**: An interactive map showing real-time sunlight coverage across cities like Madrid, Paris, etc. Visualize where the sun is currently hitting, shadow zones, golden hour timing. Could display sun path throughout the day with a timeline scrubber. Beautiful data visualization that combines astronomy, geography, and time. Useful for photographers, travelers, or anyone curious about daylight patterns. Could expand to show seasonal variations, twilight zones, or compare multiple cities simultaneously.

### Article Thumbnail Generator Agent

- **Added**: 2026-02-14
- **Status**: idea
- **Technologies**: Claude API, Image generation API (DALL-E/Midjourney/Stable Diffusion), Next.js
- **Notes**: Build an agent that generates consistent thumbnail images for articles. Analyzes article title/content and generates images with unified visual style. Define design rules: color palette (maybe brand colors), composition patterns, typography treatment, aspect ratio. Could be a Claude Code skill that reads article content and generates thumbnails automatically. Saves time and creates visual consistency across the portfolio. Much better than stock images.

### Simple Music Recording Software (Four-Track Recorder)

- **Added**: 2026-02-14
- **Status**: idea
- **Technologies**: Web Audio API, MediaRecorder API, React/Next.js
- **Notes**: Build a simple browser-based multi-track recorder for recording music. Four tracks (or expandable), record each independently, playback all together, basic mixing controls (volume, pan). Fun project that would also be genuinely useful. Showcase as portfolio experiment. Reference classic four-track recorders (Tascam, Portastudio) for UX/aesthetic inspiration. Key features: waveform visualization, simple transport controls (record, play, stop), track muting/soloing, export mixed audio.

### Political Indie Games Series

- **Added**: 2026-02-14
- **Status**: idea
- **Technologies**: Browser-based (Phaser.js, canvas, simple HTML/CSS/JS), varies per game
- **Notes**: Create a series of satirical political indie games—each one explores a complex issue through simple gameplay mechanics. Games as commentary. Potential topics: privacy erosion over time, attention economy, copyright/IP theft, software feature replication, design homogenization. Keep them simple, browser-based, shareable. Games communicate differently than articles—you feel the problem by playing it. Could become a signature format.

### Better Ultimate Guitar Alternative

- **Added**: 2026-02-06
- **Status**: idea
- **Technologies**: React/Next.js, TypeScript, Database (PostgreSQL), Guitar tab rendering library
- **Notes**: A cleaner, faster alternative to Ultimate Guitar with better UX. Key features: modern interface, better search/filtering, tab player with playback, transposition tools, print-friendly views. **Legal considerations**: Scraping Ultimate Guitar's tabs would violate their ToS and potentially copyright law. Better approach: (1) User-generated content with proper licensing, (2) Partner with existing legal tab databases, or (3) Focus on public domain/creative commons songs. Could also differentiate with features like AI-assisted tab transcription from audio, collaborative editing, or integration with guitar learning tools.

### Visual Poetry Generator

- **Added**: 2026-02-01
- **Status**: idea
- **Technologies**: Claude API, Image generation (DALL-E/Midjourney), React
- **Notes**: An app where you input a concept (e.g., an article headline like "Trump taking over Greenland") and it extracts metaphors/associations from both elements (Trump: orange, loud, bold; Greenland: ice, isolation, vast). It then generates creative prompts that combine these concepts into visual poetry — unexpected image ideas that capture the essence of both. User can select a prompt and generate an image, or copy the prompt for use elsewhere.

<!-- New ideas go here -->

---

*Use `/experiment` to quickly add new ideas to this backlog.*

- Beautiful guitar tuning app - Free tuner with vintage tuner skins and elegant design
- AI Font analyzer
- suggest lyrics from music or suggest other parts based on one part of a song like a riff1
