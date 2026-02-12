# AI News Research Agent

An intelligent research and writing agent that monitors AI news, conducts deep research, and writes high-quality articles in your established voice.

## Overview

This agent helps you publish one in-depth, well-researched article per week on AI topics that matter to designers, product people, and technical audiences. It combines AI news monitoring with your own ideas backlog to suggest relevant topics, then conducts thorough research and writes articles that are authoritative, educational, and predictive.

## Quick Start

### Weekly Article Creation Workflow

```bash
# Start a new research session
node agents/ai-news-research/start.js

# Or invoke directly through Claude Code
"Start a new AI news research session"
```

The agent will guide you through 6 stages:

1. **Monitoring** - Scans last 7 days of AI news
2. **Selection** - You pick a topic from proposals
3. **Research** - Deep dive (technical, cultural, predictive)
4. **Synthesis** - Creates 2-3 article outlines
5. **Style** - You choose writing style
6. **Writing** - Generates complete article

## The Six Stages

### Stage 1: News Monitoring & Topic Discovery

**What happens:**
- Scans configured sources (arXiv, HN, NYT, The Atlantic, etc.)
- Identifies trending topics from last 7 days
- Cross-references with your ideas in `content/ideas/backlog.md`
- Scores topics by diversity, recency, and depth

**Agent presents:**
- 3-5 topic proposals
- Each with: summary, significance, idea connections, potential angles

**You do:**
- Select one topic to research

### Stage 2: Topic Selection & Focus

**What happens:**
- Agent confirms your selection
- Shows available angles (comprehensive guide, philosophical, predictive, technical, quick take)

**You do:**
- Choose angle or let agent decide

### Stage 3: Deep Research (30-90 minutes)

**What happens:**
- **Technical research**: Papers, models, techniques, code examples
- **Thoughtful perspectives**: Atlantic, NYT, Wired, cultural critics
- **Community signals**: HN, forums, expert discussions
- **Predictive analysis**: Weak signals, trend combinations, forecasts

**Agent creates:**
- Organized research database with insights, quotes, examples, predictions
- Source list for citations

**You do:**
- Nothing (but you're notified when complete)

### Stage 4: Synthesis & Outline Proposals

**What happens:**
- Agent synthesizes research findings
- Creates 2-3 different article outlines
- Each outline has: title, hook, sections, examples, predictions, conclusion

**You do:**
- Select one outline

### Stage 5: Style Selection

**Available styles:**
- **Comprehensive guide**: Long, exhaustive, reference-quality (20-45 min read)
- **Philosophical exploration**: Cultural/ethical/spiritual analysis (15-25 min)
- **Predictive analysis**: Forward-looking, what's next (15-25 min)
- **Technical deep-dive**: How it works, educational (20-35 min)
- **Quick take**: Focused, opinionated piece (5-10 min)

**You do:**
- Choose style or let agent decide

### Stage 6: Article Writing

**What happens:**
- Agent writes complete article in selected style
- Matches your established voice and structure
- Includes proper citations and sources
- Generates frontmatter
- Saves to `content/thoughts/drafts/[slug].md`

**You do:**
- Review, edit if needed, publish

## Configuration

### News Sources

Edit `config/sources.json` to customize:
- **Technical sources**: Research papers, model releases
- **Thoughtful sources**: Cultural analysis, long-form journalism
- **Community sources**: Forums, discussions, aggregators
- **Industry sources**: Newsletters, company blogs

### Research Depth

Three modes in `config/sources.json`:
- **Quick**: 15 minutes, 2 sources per category
- **Standard**: 30 minutes, 3 sources per category (default)
- **Deep**: 60 minutes, 5 sources per category

### Topic Discovery Settings

Adjust in `config/sources.json`:
- `look_back_days`: How far back to scan (default: 7)
- `min_mentions_threshold`: Minimum mentions across sources (default: 3)
- Score weights for diversity, recency, depth

## State Management

Each session tracked in `state/current_session.json`:
- Current stage
- Selected topic and angle
- Research findings
- Outline choices
- Draft location
- Session status

Resume interrupted sessions: agent reads state and continues from last stage.

## Writing Quality Standards

Every article must:
- ✅ Take a real position or make predictions
- ✅ Teach something genuinely useful
- ✅ Include diverse sources (technical + cultural + community)
- ✅ Match established voice and structure
- ✅ Include actionable takeaways
- ✅ Cite all sources properly
- ✅ Read like a reference piece, not a news summary

## Voice & Style Guidelines

Based on your existing article "The Complete Guide to AI-Assisted Development":

**Tone:**
- Authoritative but educational
- Direct, not condescending
- Prescriptive when appropriate

**Structure:**
- Extensive use of headers and subheaders
- Bullet lists for concepts
- Numbered lists for steps
- Code blocks where relevant
- Bold for key terms

**Flow:**
- Hook → Problem → Why it matters → Core concepts → Deep dive → Application → Predictions → Conclusion

**Audience:**
- Designers, product people, technical beginners
- Smart generalists, not ML researchers
- Explain jargon, use analogies, show practical implications

## Integration with Ideas Backlog

Agent automatically reads `content/ideas/backlog.md` during topic discovery:
- Looks for keyword matches between news and your ideas
- Flags potential combinations
- Suggests angles that connect trending news with your interests

Keep your backlog updated for better topic suggestions.

## Output

Completed articles saved to:
- **Draft**: `content/thoughts/drafts/[slug].md`
- **Metadata**: `data/thoughts.json` (after you publish)

## Example Session

```
You: "Start new AI news research session"

Agent: [Scans news sources...]
Agent: "I found 5 trending topics this week:

1. Multimodal reasoning breakthroughs - GPT-4V, Gemini improvements
2. AI regulation debates - EU AI Act implementation
3. Open source model surge - Mixtral 8x7B, LLaMA updates
4. AI in creative tools - Figma AI, Canva updates
5. AI safety research - New alignment techniques

Topic #2 connects with your idea: 'AI as a Handoff Filter'
Topic #4 connects with your idea: 'Design Systems for AI Context'

Which topic interests you?"

You: "Let's do topic #1"

Agent: "Great choice. Multimodal reasoning is hot right now.
Potential angles:
- Comprehensive guide: How multimodal AI actually works
- Philosophical: What multimodal AI means for human creativity
- Predictive: Where multimodal reasoning leads in 2026-2027

Which angle, or should I pick?"

You: "Philosophical"

Agent: "Perfect. Starting deep research on multimodal AI and human creativity.
This will take about 45 minutes. I'll:
- Read recent papers on GPT-4V, Gemini, multimodal architectures
- Find cultural analysis from The Atlantic, NYT
- Check HN discussions and designer perspectives
- Identify predictions about creative work transformation

I'll notify you when research is complete..."

[45 minutes later]

Agent: "Research complete. I synthesized findings into 3 outlines:

Outline A: 'The End of Visual Literacy? What Multimodal AI Means for Designers'
Outline B: 'Beyond Seeing: How Multimodal AI Changes Human-Computer Collaboration'
Outline C: 'The New Creative Stack: Working Alongside Vision-Language Models'

Which outline?"

You: "B"

Agent: "Excellent. Writing comprehensive guide style (~25 min read).
Generating article..."

[15 minutes later]

Agent: "Draft complete! Saved to:
content/thoughts/drafts/beyond-seeing-multimodal-ai-collaboration.md

4,500 words, 25 min read, 18 sources cited.
Review and publish when ready."
```

## Advanced Usage

### Manual Stage Control

Skip to specific stage if needed:

```bash
# Resume from research stage
node agents/ai-news-research/start.js --stage=research

# Regenerate outlines
node agents/ai-news-research/start.js --stage=synthesis
```

### Custom Research Focus

Provide custom research directions:

```
"Research this topic but focus heavily on ethical implications and include perspectives from philosophy and religion"
```

### Multiple Drafts

Generate variations:

```
"Write this in both comprehensive guide and quick take styles so I can compare"
```

## Files & Structure

```
agents/ai-news-research/
├── README.md (this file)
├── AGENT_PROMPT.md (agent system prompt)
├── start.js (session orchestrator)
├── config/
│   └── sources.json (news sources, settings)
├── state/
│   ├── session_template.json (state schema)
│   └── current_session.json (active session)
├── tools/
│   ├── monitor.js (Stage 1: topic discovery)
│   ├── research.js (Stage 3: deep research)
│   ├── synthesize.js (Stage 4: outlines)
│   └── write.js (Stage 6: article generation)
└── archive/
    └── [past sessions]
```

## Maintenance

### Review Past Sessions

Archived sessions saved to `archive/` directory with timestamp.
Review to improve topic selection and research quality.

### Update Sources

As new AI publications emerge, add to `config/sources.json`.

### Refine Voice

If writing style drifts, update examples in `AGENT_PROMPT.md`.

## Troubleshooting

**"Agent seems to hallucinate sources"**
- Check that research stage completed
- Verify actual source links in draft
- Regenerate with "cite only verified sources"

**"Writing doesn't match my voice"**
- Provide feedback: "Make this more direct" or "Less technical"
- Agent learns from corrections

**"Topics seem generic"**
- Update ideas backlog with specific interests
- Adjust diversity weight in config

**"Research too shallow"**
- Use "deep" research mode in config
- Manually request specific sources

## Next Steps

1. **Run your first session**: `node agents/ai-news-research/start.js`
2. **Review the draft**: Edit for your voice
3. **Publish**: Move from drafts to published, update thoughts.json
4. **Refine**: Provide feedback to improve future articles

## Philosophy

This agent doesn't replace your expertise—it amplifies it. You provide:
- Topic selection (editorial judgment)
- Angle choice (creative direction)
- Final review (quality control)

Agent provides:
- Comprehensive research (breadth and depth)
- Synthesis (pattern recognition)
- First draft (speed and structure)

Together: high-quality, well-researched articles published consistently.
