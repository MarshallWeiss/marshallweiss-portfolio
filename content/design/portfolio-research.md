# Portfolio Research — Mid/Senior UX Portfolios

Researched March 2026. Sites reviewed: arsenkolyba.com, vilinskyy.com, janlosert.com, eikedrescher.com, daneden.me, isaacblankensmith.com, francescofagioli.me, hansonwu.com (down), konch.net (SSL expired), katesyuma.com (gated).

---

## Site-by-Site Notes

### arsenkolyba.com
- **Layout**: Single page scroll, grid of 13 project cards
- **Nav**: Footer-only (Work, About, Lab) — no top bar
- **Work**: Cards with thumbnail, type tag (Product/Feature/Website), title, one-liner
- **Notable**: R-key easter egg reveals contact info. Ukraine donation banner as values signal. Opens with "Hello, visitor..." — warm and human.
- **Tone**: Casual and personal. Leads with work, not identity.

### vilinskyy.com
- **Layout**: Vertical editorial scroll — intro → logos → projects → testimonials → interest map → predictions/newsletter
- **Work**: No case studies. Just brand logos: "Contributed to [Grammarly] [Spark] [Mistral]..." — pure name-drop signaling
- **Notable**: D3-based interest map visualization — radial orbital diagram showing personal interests across categories (Tech, Economy, Design, Culture, Geopolitics). This is a portfolio piece within the portfolio. Video triggers full dark mode on play.
- **Tone**: Persona-first. Sells an identity more than a body of work.

### janlosert.com
- **Layout**: Standard nav + hero + project list
- **Work**: Multi-CTA per project (Live Site, Behance, Webflow) — smart, meets different viewer intents
- **Notable**: Site openly says it's outdated and redirects to current work elsewhere. Dual identity: client work + 5000+ Dashboard UI Kit licenses sold.
- **Tone**: Warm, community-building. Newsletter + "Let's Connect" CTAs.

### eikedrescher.com
- **Layout**: Single-page with anchor nav. Full case studies embedded on page, not linked out.
- **Work**: In-depth narrative format — team member credits with linked profiles, GIFs and screenshots in narrative, first-person lessons learned
- **Notable**: One of the few portfolios that credits collaborators by name. Framing: "software that makes you feel something."
- **Tone**: Personal, collaborative, emotionally grounded.

### daneden.me
- **Layout**: Clean, accessibility-first. Cards, writing section, career timeline.
- **Typography**: Tiempos Headline + Tiempos Text (serif editorial) + Söhne (geometric sans) — considered and distinctive
- **Notable**: Career timeline as a table (2015→2025) — low noise, high information. Design systems specialization stated clearly and shapes the whole site framing.
- **Tone**: Specific POV. "Design Systems: how they scale, how they break, and the people that maintain them."

### isaacblankensmith.com (Google Creative Lab)
- **Layout**: Square-grid project gallery (white) + black About page — the contrast between pages creates visual rhythm
- **Typography**: Neue Haas Grotesk. Swiss sensibility, doesn't call attention to itself.
- **Work**: Grid with project subtitles that do heavy lifting — e.g., "Margaret by Moonlight – Creating the world's-largest image by hacking a solar facility." Each subtitle is a mini-pitch: concept + interesting constraint in one line.
- **Nav**: Minimal, "↳About" arrow glyph as UI element
- **About page**: CV-format. Experience → Awards (Cannes Lions, Webbys, D&AD) → Education → Teaching. Horizontal marquee dividers between sections.
- **Tone**: Direct. Technical specificity without jargon.

### francescofagioli.me
- **Layout**: Dark single-page scroll. Fixed navbar. Marquee hero → carousel works → skills marquees → philosophy → contact.
- **Typography**: PP Neue Montreal (body) + Druk Cond Super (display). High contrast pairing — elegant + aggressive.
- **Color**: Dark (#0d0d11), purple accent (#7c68fd), red interactive (#ff3c31)
- **Work**: Flickity carousel — visual drama over scannability
- **Notable**: Custom cursor, scroll-triggered transforms, parallax. The full design-agency aesthetic tier.
- **Tone**: Confident. "ONE APPROACH TO RULE THEM ALL." Contact CTA: "LET'S CREATE VALUE" — more agency than personal.

---

## Cross-Site Patterns Worth Noting

**Typography clusters:**
- Editorial serif stacks (Dan Eden: Tiempos + Söhne) — sophisticated, calm
- Grotesque stacks (Blankensmith: Neue Haas Grotesk; Fagioli: PP Neue Montreal + Druk) — functional to aggressive
- Generic stacks (Losert: Roboto) — reads less considered

**Work presentation spectrum:**
- Logo-recognition shorthand → Vilinskyy (no process, just brands)
- Project cards + linked case studies → most common middle ground
- Full embedded narrative → Drescher (process, team credits, lessons learned)

**Differentiation strategies:**
- Vilinskyy: Skip work entirely, sell a persona
- Blankensmith: Tight project subtitles + pedigree density
- Drescher: Credit collaborators, emotional framing
- Fagioli: Visual drama, dark aesthetic
- Dan Eden: Typography + stated domain expertise
- Kolyba: Human voice + values signals + easter egg

**Nav minimalism**: Universal. Nobody has more than 3–4 nav links. This is now expected.

**Dark vs. light**: Dark portfolios signal a certain aesthetic tier but are harder to execute well. Light/neutral portfolios are safer but need stronger typography or content to differentiate.

---

## Ideas for Marshall's Portfolio

### Content & Structure
- **Project subtitles** (Blankensmith): Add a one-line "concept + interesting constraint" subtitle to each case study card. Currently the cards just show title + role. A tight subtitle does the selling before the click.
- **Interest/context section** (Vilinskyy): Some version of the interest map or a written equivalent — connecting design practice to broader interests in AI and philosophy. Could be a short section on the homepage or About page rather than a visualization.
- **Career timeline** (Dan Eden): A simple table showing role → company → year from start to now. Low effort, high signal for seniority.
- **Crediting collaborators** (Drescher): Inside case studies, name the PMs, engineers, researchers you worked with. Signals collaborative maturity.
- **Easter egg / discoverable interaction** (Kolyba): R-key contact reveal or similar. Low-effort, high-personality touch.

### Visual & Typography
- **Typography upgrade**: The current Instrument Sans + Right Slab stack is functional but the sans is fairly neutral. PP Neue Montreal (already downloaded) or Neue Haas Grotesk would push the typographic personality further — more editorial, more considered. Worth revisiting once a weight that works is found.
- **Inverted About page** (Blankensmith): Consider a dark background for the About page — creates visual rhythm when navigating from the light work pages. Doesn't require redesigning the whole site.
- **Project type tags** (Kolyba): Small categorical tags on case study cards (Product / System / Concept etc.) help scanners orient quickly.

### Writing & Tone
- **State a POV** (Dan Eden): "Exploring the intersection of design, AI, and philosophy" is currently in the subtitle but could be made more specific — what's the actual belief or thesis? Dan Eden's "Design Systems: how they scale, how they break..." is specific enough to be memorable.
- **Human opening** (Kolyba): "Hello, visitor..." style opener on homepage or About. Currently the site is slightly more formal in tone.

### Interactions
- **Custom cursor**: Already implemented. On par with Fagioli tier.
- **Hover previews on nav**: Already implemented. Distinctive.
- **Scroll-triggered subtle transforms**: The Blankensmith/Fagioli tier uses these lightly. Could add entrance animations to case study cards if they don't already have them.
