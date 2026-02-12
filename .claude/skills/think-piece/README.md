# Think Piece Writing Skill

A comprehensive skill for writing Atlantic-style philosophical essays and cultural analysis pieces.

## Purpose

This skill teaches how to write **think pieces** - exploratory, multi-perspectival journalism that raises questions and reveals complexity - as opposed to how-to guides or opinion pieces.

Think pieces:
- Explore questions rather than provide answers
- Report outward (discovering what's happening) rather than inward (sharing expertise)
- Reveal contradictions rather than resolve them
- Use character-based reporting with multiple expert voices
- Connect specific phenomena to broader cultural/societal implications
- Leave readers thinking differently, not telling them what to do

## What's Included

### 1. `STYLE_GUIDE.md`
**Detailed pattern analysis extracted from actual Atlantic articles:**
- "Counting" by Franklin Foer (AI and labor economics)
- "Moltbook" by Charlie Warzel (AI social platforms)

**Contains:**
- Voice & tone patterns (conversational intellectualism, skeptical but not cynical)
- Structural patterns (opening hooks, section breaks, development)
- Narrative techniques (character-based reporting, strategic asides)
- Sentence-level rhythms (short punch, long complexity, lists)
- Point of view strategies (when to use first/second/third person)
- Opening hook patterns with real examples
- Development patterns (concrete → abstract → concrete)
- How to integrate expert sources as characters
- Closing strategies that avoid simple conclusions
- Key differences from how-to writing
- Practical pattern checklists

**This is your reference manual** - actual patterns from actual Atlantic essays, not guesses about "what Atlantic style is like."

### 2. `prompt.md`
**The complete 6-phase workflow for writing think pieces:**

**Phase 1: Idea Development**
- Finding the real question (not "how to fix X" but "what does X reveal")
- Testing for think-piece viability
- Identifying broader stakes

**Phase 2: Research & Reporting**
- Mapping 6-8 expert perspectives
- Finding characters (experts with personality)
- Gathering concrete examples
- Research layers (current state, history, analysis, contradictions)

**Phase 3: Voice Calibration**
- Understanding Atlantic voice patterns
- Checking user's existing work
- Setting voice guidelines for the piece

**Phase 4: Structure & Outline**
- Opening hook strategies
- Context establishment
- Expert perspective journey
- Visual section breaks
- Closing strategies
- Detailed outline format

**Phase 5: Writing**
- Writing in passes (material → character → rhythm → specificity → transitions)
- Maintaining concrete-abstract rhythm
- Quote integration techniques
- Section-by-section review
- Self-editing questions

**Phase 6: Polish & Refinement**
- Opening test
- Expert character check
- Rhythm audit
- Metaphor review
- Closing strength
- Fact-checking
- Final voice pass

**Plus:**
- Output format specifications
- Quality checklist
- Critical guidelines
- Starting questions

### 3. `skill.json`
**Metadata for skill activation:**
- Triggers: `/think-piece`, `/essay`, `/analysis`

### 4. Reference Articles
**Located in `references/` directory:**
- `counting.md` - Franklin Foer's essay on AI and labor statistics
- `moltbook.md` - Charlie Warzel's essay on AI bot social platform

These are the source material for the style analysis.

## How to Use

### Invoking the Skill

Use any of these triggers:
```
/think-piece
/essay
/analysis
```

### The Process

1. **Claude will ask clarifying questions:**
   - What's the phenomenon or question?
   - What sparked this?
   - What's the tension or contradiction?
   - What are the broader stakes?
   - Access to experts or secondary sources?
   - Initial angle?

2. **Work through the 6 phases:**
   - Idea development and angle refinement
   - Research planning and execution
   - Voice calibration
   - Structural outlining
   - Writing in passes
   - Polish and refinement

3. **Reference the style guide throughout**
   Claude has access to `STYLE_GUIDE.md` and will use it to ensure patterns match Atlantic quality.

4. **Output will be saved to:**
   `/content/articles/[slug].md` with proper frontmatter

## Key Differences from `/write-article`

| Think Piece | How-To Article |
|-------------|----------------|
| Explores question | Solves problem |
| Multiple expert perspectives | You as expert |
| Raises complexity | Provides clarity |
| Ends with implications | Ends with action steps |
| Reporting-based | Experience-based |
| Character-driven | Technique-driven |
| "What's happening?" | "What should you do?" |

## Quality Standards

Think pieces require:
- ✓ Real reporting (6-8 expert voices with distinct perspectives)
- ✓ Character-based writing (experts as people, not citations)
- ✓ Historical context and parallels
- ✓ Concrete examples throughout
- ✓ Specific data and dates (not "recently" or "many experts")
- ✓ Surprising metaphors that illuminate
- ✓ Varied sentence rhythm
- ✓ Section breaks for readability
- ✓ Contradictions held in tension
- ✓ Systemic implications (democracy, society, future)
- ✓ Open-ended closing (question, image, echo)

Think pieces are NOT:
- ✗ Blog posts with opinions
- ✗ How-to guides with narrative flavor
- ✗ Simple pro/con analysis
- ✗ Your personal take with some quotes
- ✗ Quick content

## Examples of Good Think Piece Questions

**Good:**
- "What does the rise of AI-only social platforms reveal about the future of online discourse?"
- "Why are economists unable to measure AI's impact on jobs, and what does that tell us about our tools for understanding economic change?"
- "What happens when the tools we use to count labor can't keep up with the rate of change?"

**Bad (these are how-to articles):**
- "How to prepare your career for AI disruption"
- "What developers should know about AI agents"
- "5 ways to use AI ethically"

## Voice Characteristics

The Atlantic sound:
- **Conversational but intellectual** - like a smart friend explaining over dinner
- **Skeptical but not cynical** - questions conventional wisdom fairly
- **Willing to complicate** - resists simple narratives
- **Specific, never abstract** - "wire-frame glasses" not "thoughtful appearance"
- **Surprising metaphors** - "Mainframes are like Christopher Walken"
- **Short sentences for punch** - "Still, the machines pressed on."
- **Parenthetical asides** - "(Humans: They mean humans.)"

## Reference While Writing

**Stuck on openings?** → See STYLE_GUIDE.md "Opening Hook Patterns"

**Need expert integration?** → See STYLE_GUIDE.md "Use of Sources"

**Closing feeling weak?** → See STYLE_GUIDE.md "Closing Patterns"

**Voice sounds off?** → See STYLE_GUIDE.md "Core Voice & Tone"

**Too abstract?** → See STYLE_GUIDE.md "Development Patterns: Concrete → Abstract → Concrete"

## Tips for Success

1. **Do real research** - You need actual expert voices, data, examples. This isn't something you can write from memory.

2. **Find the characters** - Boring experts = boring essay. Look for personality, contradictions, unexpected details.

3. **Embrace tension** - If all your experts agree, find more experts. The contradictions ARE the piece.

4. **Be specific** - Replace every "recently" with a date, every "many" with a number, every "experts say" with a name and detail.

5. **Don't resolve** - Leave the reader productively unsettled. The point is to help them think, not tell them what to think.

6. **Trust the reader** - You don't need to spell everything out. Let implications hang.

7. **Take your time** - These are hard to write. The research alone is substantial. Don't rush.

## Output Example

See the reference articles in `references/` for complete examples of the finished product.

Your output will be structured markdown with:
- Frontmatter (title, description, date, slug, tags, type)
- Opening hook (3 paragraphs, specific detail)
- Context section
- Expert perspectives with section breaks
- Implications section
- Closing (question/image/echo)
- Sources section with interviews, research, articles

## Getting Started

Simply invoke with `/think-piece` and Claude will guide you through the process, asking clarifying questions and working through each phase systematically.

The skill enforces quality standards from actual Atlantic essays - you'll write something genuinely good, not just ChatGPT-flavored content.
