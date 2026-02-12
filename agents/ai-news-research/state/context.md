# AI News Research Agent - Session Context

## 2026-02-13: Article Quality Improvements & Agent Refinements

### Session Overview
Continued work on article writing agent after previous session crash. Completed the AGI/religion article and made significant improvements to agent workflow based on feedback.

### Work Completed

#### 1. Article: "We've Built This God Before"
- **Topic:** Silicon Valley's AGI worship as repeating historical pattern of technological messianism
- **Primary Thesis (C):** Historical pattern - we've built this technological god before, it always fails the same way
- **Supporting Angle (A):** Spiritual crisis explains WHY pattern keeps repeating
- **Style:** Philosophical/analytical essay (idea-driven, not character-based)
- **Status:** Draft complete at `content/thoughts/drafts/silicon-valley-ai-god.md`
- **Length:** ~5,000 words, 22 min read

#### 2. Major Agent Improvements

**Problem identified:** Articles were:
- All over the map (not focused on single thesis)
- Citing too many random people without clear purpose
- Using low-quality sources (listicles, aggregators)
- Sounding like AI (corny patterns, cite-insight-cite-insight structure)
- Trying to do too much instead of making ONE clear argument

**Solutions implemented:**

##### A. High-Quality Sources Requirement
Added to `agents/ai-news-research/AGENT_PROMPT.md` Stage 3:

**Use only:**
- ✅ Primary sources (tech leaders' essays, company blogs, official statements)
- ✅ Peer-reviewed research (academic papers, university studies)
- ✅ Quality journalism (The Atlantic, NYT, Wired, New Yorker, Bloomberg)
- ✅ Expert writings (recognized thinkers, established institutions)

**Avoid:**
- ❌ Listicles, quote aggregators, content farms
- ❌ Random blogs or crypto news sites
- ❌ Secondary sources quoting other secondary sources
- ❌ Any source that wouldn't be cited in serious academic or journalistic work

##### B. Philosophical Essay Style (Not Character-Based Reporting)
Updated `.claude/skills/think-piece/prompt.md`:
- Changed from "Atlantic-style character-based reporting" to "philosophical essay writing"
- Removed all emphasis on "experts as characters" with physical descriptions
- Shifted to idea-driven synthesis from published sources
- No invented character details, scenes, or narratives
- Style reference: Dario Amodei's "Machines of Loving Grace" (analytical, idea-focused)

##### C. Avoid AI Writing Tells
Added to `agents/ai-news-research/AGENT_PROMPT.md`:

**1. NO "It's not X. It's Y." CONSTRUCTION**
Dead giveaway AI pattern. Examples to avoid:
- "It's not engineering talk. It's theological language."
- "Not most problems. Everything else."
- "This isn't a technical project. It's a religious one."

**2. NO CITE-INSIGHT-CITE-INSIGHT PATTERN**
Don't structure as: citation → analysis → citation → analysis.
This reads like a research paper, not an essay.

Instead: Build arguments that synthesize multiple sources into coherent points.

**3. WRITE LIKE A HUMAN THINKING**
- Let arguments build and develop
- Use natural transitions
- Don't state obvious structure
- Trust the reader to follow logic

##### D. Focus and Primary Thesis Requirement
Updated Stage 4.5 (Collaborative Refinement):
- Must ask: "Which ONE argument should be the spine of the article?"
- Other angles become supporting evidence, not equal sections
- Article should make ONE clear point, not try to do everything
- Ask user for primary angle explicitly before writing

#### 3. Updated Documentation

**README.md updates:**
- Added "Source Quality Standards" section
- Changed "Atlantic-style think piece" to "Philosophical essay"
- Updated style descriptions

**AGENT_PROMPT.md updates:**
- Stage 3: High-quality sources requirement
- Stage 4.5: Primary angle selection emphasis
- Stage 5: Changed style description
- Stage 7: Added "Avoid AI Writing Tells" section

**Think-piece skill updates:**
- Renamed to "Philosophical Essay Writing Workflow"
- Removed character-based reporting guidance
- Added strict source quality requirements
- Emphasized synthesis over reporting
- Added NO INVENTED DETAILS as critical guideline

### Key Lessons Learned

1. **Style references vs. content sources:** When user mentions Amodei's essay, it's a style reference (analytical, idea-driven), not a content source to cite in the argument

2. **High-quality sources:** Don't just avoid obvious spam - be selective. Wikipedia for historical context is fine, but "28 Best Quotes About AI" listicle is not

3. **Focus is everything:** One clear thesis that everything supports is better than multiple competing arguments, even if they're all interesting

4. **AI tells are subtle:** The "It's not X. It's Y." pattern feels dramatic but is a dead giveaway. Same with cite-insight-cite-insight structure.

5. **Philosophical essays ≠ character-based reporting:** Character-based Atlantic pieces require actual reporting (interviews, scenes, details). Without that, stick to idea-driven analytical essays.

### Agent Workflow Summary

The agent now follows this improved 7-stage workflow:

1. **Monitoring** - Scan AI news (last 7 days)
2. **Selection** - User picks topic from proposals
3. **Research** - Deep dive with HIGH-QUALITY SOURCES ONLY
4. **Synthesis** - Create 2-3 article outlines
5. **Refinement** - Collaborate with user:
   - Ask length (Short/Medium/Long)
   - Ask focus type (Single thesis vs exploring tensions)
   - **Ask primary angle (which ONE argument is the spine)**
6. **Style** - User chooses: Philosophical essay, Guide, Predictive, Technical, Quick take
7. **Writing** - Generate with STRICT ACCURACY + NO AI TELLS

### Files Modified

**Agent Core:**
- `agents/ai-news-research/AGENT_PROMPT.md` - Added source quality, AI tell avoidance
- `agents/ai-news-research/README.md` - Updated with source standards

**Think-Piece Skill:**
- `.claude/skills/think-piece/prompt.md` - Converted to philosophical essay style
- `.claude/skills/think-piece/STYLE_GUIDE.md` - (unchanged, still has Atlantic patterns for reference)

**Article Draft:**
- `content/thoughts/drafts/silicon-valley-ai-god.md` - Completed philosophical essay on AGI messianism

### User Feedback Incorporated

All feedback from this session has been added to agent instructions:

✅ **Focus on ONE primary thesis** - Added emphasis to Stage 4.5 that article must make ONE clear point
✅ **Use only high-quality, reputable sources** - Added comprehensive requirements in Stage 3
✅ **Avoid AI writing tells** - Added section forbidding "It's not X, It's Y" and cite-insight pattern
✅ **Build coherent arguments** - Not research paper structure, synthesize sources into flowing ideas
✅ **Philosophical/analytical style** - Not character-based reporting (changed think-piece skill)
✅ **No invented details or narratives** - Strict accuracy requirements
✅ **Inline citations with proper attribution** - Every claim must link to source
✅ **Ask for primary angle explicitly** - Stage 4.5 now emphasizes "Which ONE is THE spine?"
✅ **Prevent "all over the map" articles** - Primary thesis selection prevents scattered focus
✅ **No listicles or aggregators** - Explicitly forbidden in source quality section
✅ **Quality journalism only** - Atlantic, NYT, Wired, New Yorker, Bloomberg (not random blogs)

### Specific Agent Changes Made

**AGENT_PROMPT.md:**
- Line ~50: Added HIGH-QUALITY SOURCES ONLY section with what to use/avoid
- Line ~160: Updated Stage 4.5 to emphasize "Which ONE is THE spine?"
- Line ~180: Added "Avoid AI Writing Tells" section with specific patterns to avoid

**README.md:**
- Added "Source Quality Standards" section
- Updated Stage 3 description to mention quality requirements
- Updated Stage 4.5 to emphasize ONE clear point
- Updated Stage 6 style descriptions

**think-piece/prompt.md:**
- Changed title to "Philosophical Essay Writing Workflow"
- Removed all character-based reporting guidance
- Added source quality requirements throughout
- Changed from "experts as characters" to "ideas from published sources"
- Added NO INVENTED DETAILS as critical guideline

### Next Steps

- User to review article draft
- Potentially publish to `content/thoughts/`
- Test improved workflow on next article topic
- Continue refining based on user feedback

### Related Ideas Added to Backlog

During this session, user added these ideas:
- "Build Workflows as Agents, Not Conversations"
- "The Copyright Fiction: Why Stealing Is Easier Than Ever"
- "How to Save Money on AI Tools: Strategic Free-Tier Playbook"

---

## Session History

### Previous Session (Lost to Terminal Crash)
- Built initial think-piece skill
- Analyzed Atlantic articles for patterns
- Started AGI article but lost work when terminal crashed

### This Session
- Recovered and completed AGI article
- Major agent improvements based on quality feedback
- Documentation updates across all agent files
