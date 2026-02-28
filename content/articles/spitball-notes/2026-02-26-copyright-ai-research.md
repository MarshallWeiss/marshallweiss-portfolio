# Deep Research: Copyright in the Age of AI

**Research Date:** 2026-02-26
**Topic:** The collapse of intellectual property protection when AI makes instant replication trivially easy
**Status:** Research complete, ready for synthesis/outline stage

---

## Related Ideas from Backlog

Three existing threads connect directly:

1. **"The Copyright Paradox: When Every Web Product Looks the Same, What's Left to Protect?"** — Design homogenization means original work is increasingly indistinguishable. What does copyright protect when everything converges?
2. **"The Self-Cannibalizing Software Economy: When AI Makes Every Feature Instantly Replicable"** — AI lets anyone replicate any feature; SaaS moats disappear. What happens to software businesses?
3. **"The Copyright Fiction: Why Stealing Is Easier Than Ever (And the Law Pretends Not to Notice)"** — Style, voice, and approach can be extracted without copying a single sentence. Copyright was built for photocopiers, not neural networks.

Also tangentially related:
- "The Golden Age of Web Design" — the window before AI homogenizes everything
- "AI and the End of the Handmade" — parallels to Arts and Crafts movement response to industrialization

---

## I. Key Legal Cases and Their Status

### A. The Three Landmark 2025 Rulings

**1. Thomson Reuters v. ROSS Intelligence (February 2025)**
- **Court:** U.S. District Court, District of Delaware (Judge Bibas, 3rd Circuit sitting by designation)
- **What happened:** First U.S. court decision on fair use applied to AI training data. ROSS used Westlaw headnotes to train an AI legal research tool. Court granted partial summary judgment to Thomson Reuters, rejecting ROSS's fair use defense.
- **Key reasoning:** The use was NOT transformative because ROSS used the material "to make it easier to develop a competing legal research tool" — not for a fundamentally different purpose. Two of four fair use factors weighed against ROSS: commercial/competitive purpose and market harm.
- **Critical caveat:** Judge Bibas explicitly noted that "only non-generative AI is before me today" — limiting the precedent to non-generative AI contexts.
- **Status:** On interlocutory appeal in the 3rd Circuit.
- **Why it matters for the article:** Sets a potentially hostile precedent for AI companies, but the non-generative limitation means the biggest cases are still open.
- **Sources:** [Jenner & Block analysis](https://www.jenner.com/en/news-insights/publications/client-alert-court-decides-that-use-of-copyrighted-works-in-ai-training-is-not-fair-use-thomson-reuters-enterprise-centre-gmbh-v-ross-intelligence-inc), [Reed Smith analysis](https://www.reedsmith.com/en/perspectives/2025/03/court-ai-fair-use-thomson-reuters-enterprise-gmbh-ross-intelligence), [Davis Wright Tremaine analysis](https://www.dwt.com/blogs/artificial-intelligence-law-advisor/2025/02/reuters-ross-court-ruling-ai-copyright-fair-use)

**2. Bartz v. Anthropic (June 2025) — THE BIG ONE**
- **Court:** U.S. District Court, Northern District of California (Judge William Alsup)
- **What happened:** Split decision. Three parts:
  - **Training = Fair Use:** Alsup called AI training "quintessentially transformative" and "spectacularly so." He ruled that copyright law "seeks to advance original works of authorship, not to protect authors against competition." Using lawfully acquired books for AI training is protected fair use.
  - **Digitization = Fair Use:** Converting print books to digital for the training pipeline was fine because Anthropic discarded the print copies.
  - **Piracy = Infringement:** Anthropic maintained a "central library" of millions of pirated books downloaded from shadow libraries (Library Genesis, Pirate Library Mirror). This was NOT connected to training but was a separate infringement. This exposed Anthropic to potentially $70+ billion in theoretical liability.
- **Key quote from Alsup:** Authors "cannot exclude others from using their works to learn." For centuries, people have read and re-read books. Training was "for the purpose of creating something different, not to supplant the works."
- **Market harm ruling:** Alsup rejected the argument that authors are entitled to exploit a licensing market for AI training purposes — the Copyright Act doesn't create that right.
- **Settlement:** Anthropic agreed to pay **$1.5 billion** in August 2025 — the largest copyright settlement in U.S. history. Roughly $3,000 per title for ~500,000 books. Settlement has preliminary approval; fairness hearing set for April 2026.
- **Why it matters for the article:** The split creates a paradox. Training on lawfully acquired material = fair use. But the piracy angle created massive liability. The settlement doesn't create licensing precedent — it only releases Anthropic from past conduct.
- **Sources:** [ArentFox Schiff analysis](https://www.afslaw.com/perspectives/alerts/landmark-ruling-ai-copyright-fair-use-vs-infringement-bartz-v-anthropic), [NPR reporting](https://www.npr.org/2025/06/25/nx-s1-5445242/federal-rules-in-ai-companys-favor-in-landmark-copyright-infringement-lawsuit-authors-bartz-graeber-wallace-johnson-anthropic), [Copyright Alliance settlement details](https://copyrightalliance.org/participating-bartz-v-anthropic-settlement/), [Authors Guild response](https://authorsguild.org/advocacy/artificial-intelligence/what-authors-need-to-know-about-the-anthropic-settlement/), [Kluwer Copyright Blog](https://legalblogs.wolterskluwer.com/copyright-blog/the-bartz-v-anthropic-settlement-understanding-americas-largest-copyright-settlement/)

**3. New York Times v. OpenAI/Microsoft (ongoing)**
- **Court:** U.S. District Court, Southern District of New York (Judge Sidney Stein)
- **Status:** Case allowed to proceed on main copyright infringement claims. Judge rejected OpenAI's motion to dismiss.
- **Discovery fight:** NYT demanded 1.4 billion ChatGPT conversations. Reduced to 20 million-log sample. In January 2026, Judge Stein affirmed the order compelling OpenAI to produce the full 20M-log sample — not just cherry-picked conversations. OpenAI's privacy argument was rejected.
- **Timeline:** Summary judgment expected April 2026.
- **Additional plaintiff:** A NYT reporter separately sued Google, xAI, and OpenAI over chatbot training in December 2025.
- **Sources:** [NPR on case proceeding](https://www.npr.org/2025/03/26/nx-s1-5288157/new-york-times-openai-copyright-case-goes-forward), [Bloomberg Law on ChatGPT logs](https://news.bloomberglaw.com/ip-law/openai-must-turn-over-20-million-chatgpt-logs-judge-affirms)

### B. The Publisher Wave

**Cohere Lawsuit (February 2025)**
- 14 major publishers — including Conde Nast, Forbes, The Atlantic, The Guardian — sued Cohere for "massive, systematic" copyright infringement, alleging unauthorized use of 4,000+ copyrighted works to train AI.
- Also alleged trademark violations: Cohere's AI generated "inaccurate, substandard" articles attributed to the publishers. Example: confused the Nova Music Festival massacre (Oct 7, 2023) with a mass shooting in Nova Scotia, Canada — and manufactured quotes from a murder victim.
- November 2025: Federal judge denied Cohere's motion to dismiss. Ruled that "substituted summaries" may constitute copyright violations.
- **Sources:** [Deadline](https://deadline.com/2025/02/major-publishers-sue-ai-firm-cohere-copyright-infringement-1236288113/), [TechCrunch](https://techcrunch.com/2025/02/13/publishers-sue-ai-startup-cohere-over-alleged-copyright-infringement/)

**NYT v. Perplexity (December 2025)**
- Separate lawsuit targeting AI search/summarization.
- **Source:** [CNBC](https://www.cnbc.com/2025/12/05/the-new-york-times-perplexity-copyright.html)

### C. The Entertainment Industry Strikes

**Disney/Universal v. Midjourney (June 2025)**
- First time major Hollywood studios directly sued a generative AI company.
- Key allegation: Midjourney functions as "a virtual vending machine, generating endless unauthorized copies" of copyrighted characters.
- **Critical detail:** Midjourney generates recognizable copyrighted characters even from generic prompts. "Animated toys" or "popular movie screencap" produces specific Disney/Universal characters. This is the strongest evidence that training on copyrighted work creates outputs that compete with originals.
- Disney/Universal seek injunctive relief that would effectively force a temporary shutdown of the entire Midjourney service.
- Warner Bros. Discovery sued Midjourney separately in September; cases consolidated in November.
- Disney, Universal, and Warner Bros. also sued China-based Minimax (Hailuo AI) — first AI copyright case targeting a foreign company.
- **Why it matters for the article:** This case shifts the litigation from "was training fair use?" to "are the outputs infringing?" — a much harder question for AI companies.
- **Sources:** [NPR](https://www.npr.org/2025/06/12/nx-s1-5431684/ai-disney-universal-midjourney-copyright-infringement-lawsuit), [TIME analysis](https://time.com/7293362/disney-universal-midjourney-lawsuit-ai/), [CNBC](https://www.cnbc.com/2025/06/11/disney-universal-midjourney-ai-copyright.html), [Georgetown Law Institute](https://www.law.georgetown.edu/tech-institute/insights/disney-nbc-universal-and-dreamworks-file-major-ip-lawsuit-against-ai-image-generator-midjourney/)

### D. Music Industry: From War to Licensing

**RIAA v. Suno and Udio (filed June 2024)**
- Major labels (UMG, Sony, Warner) sued AI music generators for training on copyrighted recordings without permission. RIAA seeking up to $150,000 per infringing song.
- Suno's defense: "None of the millions of tracks made on its platform contain anything like a sample." Even if AI learned from copyrighted songs, the outputs are "entirely new sounds."
- **Plot twist — settlements and licensing:** Warner Music settled with Suno in November 2025, dropped its lawsuit, and partnered on a licensed AI music platform launching 2026. Universal settled with Udio in October 2025. This signals the music industry is pivoting from litigation to licensing.
- Independent musicians filed separate class actions in October 2025.
- **Why it matters for the article:** The music industry is showing one possible future — litigation leads to licensing deals, not legal precedent. Big players get deals; independents may get nothing.
- **Sources:** [RIAA announcement](https://www.riaa.com/record-companies-bring-landmark-cases-for-responsible-ai-againstsuno-and-udio-in-boston-and-new-york-federal-courts-respectively/), [Music Business Worldwide](https://www.musicbusinessworldwide.com/suno-argues-none-of-the-millions-of-tracks-made-on-its-platform-contain-anything-like-a-sample/)

### E. The Figma Lawsuit

**Khan v. Figma Inc. (November 2025)**
- Class action filed in Northern District of California.
- Alleges Figma secretly trained AI models on millions of customer design files — including layer properties, text, images — without consent.
- Users were unknowingly opted in to AI training programs.
- This isn't a standard copyright case — it alleges **trade secret misappropriation** and unauthorized data access. The design files contain proprietary business IP.
- Figma's defense: "Our training is focused on general patterns — not on customers' unique content, concepts and ideas."
- Figma's IPO valued the company at figures boosted, plaintiffs claim, by AI capabilities trained on customer data.
- **Why it matters for the article:** This is the design industry's canary in the coal mine. The tool designers use every day was training AI on their work. Figma's defense — "we learn patterns, not your specific designs" — is exactly the copyright gap this article explores. Style and patterns aren't protected. But they're exactly what has value.
- **Sources:** [OECD.AI](https://oecd.ai/en/incidents/2025-11-20-1814), [MLex](https://www.mlex.com/mlex/articles/2414454/figma-misused-users-data-for-ai-training-us-lawsuit-alleges), [Kronenberger Rosenfeld analysis](https://kr.law/news/article-detail/figma-lawsuit-opens-door-to-new-damages-claims)

---

## II. The Style/Voice Gap — What Copyright Can't Protect

### The Fundamental Problem

Copyright protects **expression**, not **ideas, styles, or approaches.** This distinction — the idea-expression dichotomy, established in *Harper & Row v. Nation Enterprises* — made sense when copying expression was the primary threat. But AI extracts exactly what copyright doesn't cover:

- **Style** — An artist's visual signature, a writer's voice, a designer's aesthetic approach
- **Patterns** — Layout conventions, interaction design patterns, compositional approaches
- **Voice** — Tone, cadence, argument structure, the "feel" of someone's work

These are the things that actually have value. And they are precisely what AI models are designed to extract and reproduce.

### Legal Confirmation

- **Crowell & Moring analysis:** "Voice attributes are not protectable" under copyright law. Voice and likeness are not copyrightable unless part of a larger copyrighted work (film, song).
- **Lehrman v. Lovo, Inc.:** Federal court dismissed copyright claims against an AI voice-cloning company because the outputs "were not direct reproductions." However, right of publicity claims survived under New York state law.
- **The right of publicity gap:** Protection for voice/likeness comes from state-level right of publicity laws, NOT copyright. These vary dramatically by state and don't cover design style at all.

### The Practical Reality

You can:
1. Feed The Atlantic's last 100 articles into Claude
2. Ask it to "write in this style" about a new topic
3. Get output that captures the voice, structure, and approach
4. Publish it without infringing a single copyright

This is not a hypothetical. It's happening constantly. The law considers this legal because you haven't copied any specific expression — you've absorbed a pattern. Copyright was designed for photocopiers. Neural networks extract the signal and discard the artifact.

### Proposed Solutions

**Federal Right of Publicity (NO FAKES Act)**
- Bipartisan legislation creating the first federal right of publicity in the U.S.
- Protects voice and likeness from unauthorized AI recreation.
- Supported by SAG-AFTRA, RIAA, Recording Academy, Warner Music, UMG, Sony Music, Authors Guild.
- Still doesn't cover design style or written voice — only actual voice and physical likeness.
- **Source:** [Congress.gov](https://www.congress.gov/crs-product/LSB11052)

**"Learnright" Proposal**
- Academic proposal by Frank Pasquale (Cornell), Thomas W. Malone (MIT), and Andrew Ting.
- Published in Northwestern's Journal of Technology and Intellectual Property (2025).
- Proposes a new exclusive right — separate from copyright — giving creators the right to license their work specifically for AI training.
- Would enable copyright holders to "claim some share in the revenues arising out of automated systems that learn from covered material."
- Designed as a middle ground: "neither bans training nor leaves creators uncompensated."
- **Sources:** [Cornell Chronicle](https://news.cornell.edu/stories/2025/12/who-should-get-paid-when-ai-learns-creative-work-0), [Northwestern JTIP](https://jtip.law.northwestern.edu/issues/copyright-learnright-and-fair-use-rethinking-compensation-for-ai-model-training/)

**Brookings Framework (Mark MacCarthy)**
- Copyright alone is insufficient — the real conflict isn't between tech companies and content owners, but between employers and creative workers (outside copyright's reach).
- Proposes three-tier approach: (1) allow copyright for human-authored AI-generated content; (2) create federal publicity rights for style/voice protection; (3) address employment disruption through labor policy and negotiated workplace standards rather than copyright expansion.
- Key quote: "No one is going to Llama 3 to obtain my book rather than buying it online."
- References the 2023 Writers Guild contract as a model for labor-based protection.
- **Source:** [Brookings](https://www.brookings.edu/articles/copyright-alone-cannot-protect-the-future-of-creative-work/)

---

## III. The Copyright Paradox for AI-Generated Works

### The Copyrightability Problem

The U.S. Copyright Office (January 2025, Part 2 report) established:
- AI-generated works can be protected **only where a human author has determined sufficient expressive elements.**
- The mere provision of prompts is NOT sufficient for copyrightability.
- A human-authored work must be "perceptible" in the AI output, OR the human must make "creative arrangements or modifications."
- Using AI to assist in creation doesn't bar copyrightability, but the work must embody "meaningful human authorship."

### The Perverse Incentive

As Brookings' MacCarthy argues, denying copyright to AI-generated works creates a self-defeating loop:
- Companies won't invest in AI content generation if competitors can freely copy the output.
- But granting copyright to AI outputs would effectively give machines authorship rights.
- The current position — "it depends on how much human control was involved" — is inherently unstable and impossible to enforce at scale.

### The "Vibe Coding" Problem (Software-Specific)

The Vorys legal analysis of AI-generated code identifies a specific vulnerability:
- In AI-assisted development, human contribution consists primarily of "conveying unprotectable ideas and high-level directives rather than protectable expression."
- When prompts remain at the "vibe" level — "create a modern, intuitive dashboard with clean animations" — the AI performs the detailed expressive work. The human provides the idea; the AI provides the expression.
- **Result:** AI-generated code may fail to satisfy originality and human authorship requirements for copyright.
- **Business implication:** "Economic value of any static copyright in the code's expression diminishes sharply." Companies should shift to trade secret protection over proprietary prompting strategies and internal fine-tuning data.
- **Source:** [Vorys](https://www.vorys.com/publication-vibe-coding-the-diminishing-role-of-copyright-in-ai-generated-software)

---

## IV. The Instant Replication Problem

### SaaS Moat Erosion

AI is compressing the time and cost to replicate any software feature to near-zero:
- A "chat with your data" feature that was once a competitive moat can now be built by two engineers in under a month for ~$45K using standard AI components.
- If a core value proposition can be replicated by an LLM with "90% of the quality at 1% of the cost," the business model is broken.
- Most vulnerable: narrow, task-specific SaaS (legal doc review, basic analytics, simple automation), high per-seat pricing models, and anything without proprietary data moats.
- **Source:** [Bain & Company](https://www.bain.com/insights/will-agentic-ai-disrupt-saas-technology-report-2025/)

### Design Homogenization — The "Visual Elevator Music" Study

A 2025 study published in Patterns (Cell Press) by researchers at Dalarna University and Michigan State provides hard evidence for the convergence problem:
- Researchers linked Stable Diffusion XL and LLaVA in an image generation loop (visual telephone game). Across 700 trajectories with diverse prompts over 100 iterations, **all runs converged to nearly identical visuals.**
- Only **12 dominant motifs** emerged — "commercially safe aesthetics" like stormy lighthouses and palatial interiors.
- They called this **"visual elevator music"** — pleasant, generic, culturally dead.
- **Critical finding:** This convergence happens BEFORE retraining on AI data. It's structural to how these systems work. The "default behavior of these systems is to compress meaning toward what is most familiar, recognizable and easy to regenerate."
- **Implication:** AI doesn't just make copying easier — it actively pushes everything toward sameness. The very tool that makes replication trivial also eliminates the distinctiveness worth protecting.
- **Sources:** [Fortune](https://fortune.com/2026/01/22/visual-elevator-music-why-generative-ai-trained-on-centuries-of-human-genius-produces-intellectual-muzak/), [Science/AAAS](https://www.science.org/content/article/when-creating-images-ai-keeps-remixing-same-12-stock-photo-cliches), [PetaPixel](https://petapixel.com/2025/12/23/ai-image-generators-resort-back-to-the-same-12-photo-styles-study-calls-it-visual-elevator-music/), [Patterns (Cell Press)](https://www.cell.com/patterns/fulltext/S2666-3899(25)00299-5)

### The Double Bind for Creators

1. Your style isn't protected by copyright (it's an "idea," not "expression")
2. AI extracts and replicates style more easily than expression
3. AI then homogenizes everything toward generic patterns
4. So your original style gets absorbed into the machine, reproduced without attribution, and then washed into a sea of sameness
5. Even if you created something distinctive, the AI-mediated culture around you is converging toward generic — making your distinctiveness invisible

---

## V. Impact on Independent Creators and Small Businesses

### The Asymmetry Problem

- Smaller creators, artists, studios, and brands — "especially those without a huge legal team" — are most likely to have their copyright infringed, often without knowing it.
- The music industry shows the pattern: major labels get licensing deals (Warner/Suno, Universal/Udio), independent artists get class action lawsuits with uncertain outcomes.
- The "substantially similar" standard doesn't protect creators when AI mimics their identifiable style — which is "extraordinarily damaging to their livelihood" because competitors can produce "vast amounts of mimicking content."
- The majority of independent artists make their living through commissioned works — exactly the kind of work AI is most capable of replicating.

### The Copyright Office's Half-Measure

The Copyright Office concluded (May 2025) that AI developers going beyond fair use when models generate "expressive content that competes with" original works in their existing markets. But this only covers expressive content — not style, not patterns, not approach.

### Creator Organizing

- January 2026: Creators launched a campaign to counter "Big Tech's alleged AI copyright theft" (IPWatchdog).
- But creator coalitions face the same problem individual creators do: copyright doesn't protect what AI actually takes.

---

## VI. Divergent Perspectives

### The "Fair Use Is Correct" Camp (EFF, Some Legal Scholars)

- EFF argues that expanding copyright to restrict AI training would "do more harm than good" — entrenching Big Tech's dominance by making licensing costs prohibitive for small developers.
- Overbroad licensing requirements risk shutting out open-source and small AI projects while well-funded companies simply pay up.
- Judge Alsup's framing: people have read and learned from books for centuries. Training is learning. You can't copyright the act of learning.
- Mark Lemley (Stanford, most-cited IP law scholar): Questions whether copyright is even necessary anymore. "We need copyright only if we think we won't get enough creation without it. That may no longer be a worry."
- **Sources:** [EFF 2025 Review](https://www.eff.org/deeplinks/2025/12/artificial-intelligence-copyright-and-fight-user-rights-2025-review), [EFF on expanding copyright](https://www.eff.org/deeplinks/2025/02/ai-and-copyright-expanding-copyright-hurts-everyone-heres-what-do-instead)

### The "Creators Must Be Protected" Camp (Authors Guild, Copyright Alliance, RIAA)

- Training on copyrighted works without permission is theft, full stop.
- Fair use was never meant to cover wholesale ingestion of entire creative catalogs.
- The "transformative use" argument is a legal fiction — the models produce direct competitors to the original works.
- Licensing markets must be created and enforced.
- **Source:** [Authors Guild on Anthropic settlement](https://authorsguild.org/advocacy/artificial-intelligence/what-authors-need-to-know-about-the-anthropic-settlement/)

### The "Copyright Is Obsolete" Camp (Some Academics)

- Mark Lemley's provocation: if AI can create endlessly, maybe we don't need copyright incentives for creation anymore.
- The constitutional purpose of copyright — "to promote the progress of science and useful arts" — may be better served by unrestricted AI training.
- Counter-argument: this ignores that human creators need to eat.

### The "Middle Ground" Camp (Brookings, Learnright Proponents, EU)

- Copyright alone won't work, but creators shouldn't be left uncompensated.
- New legal frameworks needed: learnright, federal right of publicity, licensing regimes.
- Labor-based solutions (union contracts, employment protections) may matter more than IP law.

---

## VII. Where This Is Heading: Predictions for 2026 and Beyond

### Near-Term (2026)

1. **Litigation peaks but doesn't resolve.** Morrison Foerster predicts 2026 as the peak year for AI copyright lawsuits. Additional fair use decisions expected, but no final answers. Summary judgment in NYT v. OpenAI expected April 2026.

2. **The litigation focus shifts from training to outputs.** The Disney v. Midjourney case signals a new front: instead of arguing about whether training was fair use, plaintiffs will argue that AI outputs themselves are infringing. This is harder for AI companies to defend — especially when generic prompts produce specific copyrighted characters.

3. **EU moves toward mandatory licensing.** The European Parliament (January 2026 vote) is pushing for:
   - A licensing regime enabling GenAI providers to obtain licenses for copyrighted works
   - Creator opt-out via machine-readable signal recorded in a centralized EUIPO register
   - Full transparency about copyrighted content used in training
   - Remuneration obligations for AI providers that aggregate press publisher content
   - EU copyright law applied to all GenAI systems available in the EU market, regardless of where training occurs
   - Full Parliament vote expected March 2026.
   - **Source:** [European Parliament press release](https://www.europarl.europa.eu/news/en/press-room/20260126IPR32636/protect-copyrighted-work-used-by-generative-ai-say-legal-affairs-meps)

4. **UK moves toward licensing framework.** The Copyright Licensing Agency is developing a gen-AI training licence, expected Q3 2026. Government established four technical working groups and must report to Parliament by end of 2026.

5. **Music industry fully pivots to licensing.** With Warner/Suno and Universal/Udio deals done, the remaining holdouts will likely follow. Music becomes the first creative industry to have a functioning AI licensing market.

### Medium-Term (2026-2027)

6. **The "resolution" pattern emerges: settlements + licensing + micropayments.** The AI copyright issue around mass-scale data scraping is expected to be "effectively resolved through a combination of private settlements, licensing deals, and micropayments" rather than through definitive court rulings. (This benefits large rightsholders; independents get crumbs.)

7. **Federal legislation in the U.S. — maybe.** National Law Review predicts Congress may actually pass AI legislation at the federal level. The NO FAKES Act for voice/likeness protection has bipartisan support and powerful industry backing. Broader copyright reform is less likely.

8. **The copyrightability question remains unstable.** Works generated primarily by AI will continue to exist in a legal gray zone. The practical effect: companies will protect AI-generated work through trade secrets, speed, and network effects rather than copyright.

### Structural Predictions

9. **Copyright becomes a weapon of the powerful.** Large companies with legal teams can enforce rights, negotiate licensing deals, and litigate AI companies. Independent creators cannot. The asymmetry will widen. This is the key tension for the article: copyright "protection" primarily protects those who can afford to enforce it.

10. **Style, not expression, becomes the real battleground.** The thing people most want to protect (their distinctive voice, aesthetic, approach) is exactly what copyright doesn't cover. New legal frameworks (learnright, federal publicity rights) may eventually fill this gap, but not before significant damage is done to independent creators.

11. **Speed replaces IP as the primary competitive advantage.** When anyone can replicate anything, the moat becomes: proprietary data, network effects, embedded workflows, speed of iteration, and brand trust. Copyright becomes a rearguard action rather than a competitive strategy.

12. **AI-mediated culture converges toward generic.** The "visual elevator music" finding suggests that even without copying, AI structurally pushes creative output toward sameness. The copyright conversation may become moot if everything AI touches looks and sounds the same — there's nothing distinctive left to protect.

---

## VIII. Notable Quotes and Positions

**Judge William Alsup (Bartz v. Anthropic):**
- AI training is "quintessentially transformative" and "spectacularly so."
- Copyright law "seeks to advance original works of authorship, not to protect authors against competition."
- Authors "cannot exclude others from using their works to learn."

**Mark Lemley (Stanford Law School):**
- "We need copyright only if we think we won't get enough creation without it. That may no longer be a worry."
- AI fundamentally strains copyright's "two most fundamental legal doctrines: the idea-expression dichotomy and the substantial similarity test for infringement."

**Mark MacCarthy (Brookings):**
- "No one is going to Llama 3 to obtain my book rather than buying it online."
- The real conflict isn't between tech companies and content owners, but between employers and creative workers — terrain outside copyright's reach.
- "AI will not replace creative workers, but creative workers who use AI will replace those who do not."

**Figma spokesperson:**
- "Our training is focused on general patterns — not on customers' unique content, concepts and ideas."

**Pasquale, Malone & Ting (Learnright authors):**
- "Tech companies vigorously protect their own intellectual property while dismissing the value of those whose work powers the models."
- "Flourishing creative communities depend on norms of attribution and respect."

**EFF:**
- Expanding copyright to restrict AI training would "do more harm than good" — entrenching Big Tech's dominance by making licensing costs prohibitive for small developers.

**"Visual Elevator Music" researchers:**
- "The default behavior of these systems is to compress meaning toward what is most familiar, recognizable and easy to regenerate."
- Homogenization happens BEFORE retraining — it's structural to how AI image generation works.

---

## IX. Potential Article Angles

### Angle 1: The Copyright Phantom
Copyright gives creators the illusion of protection while AI extracts exactly what it can't cover. The law protects the text; AI takes the voice. The law protects the image; AI takes the style. The law protects the code; AI takes the architecture. Everything of actual value exists in the gap between what copyright covers and what AI absorbs.

### Angle 2: The Great Convergence
AI doesn't just enable copying — it actively pushes everything toward sameness ("visual elevator music"). So copyright becomes doubly irrelevant: first, because AI can replicate anything instantly; second, because the things worth protecting are being homogenized out of existence. What's left to steal when everything looks the same?

### Angle 3: The Two-Tier Protection System
Copyright is becoming a tool of the powerful. Major labels get licensing deals (Warner/Suno). Hollywood sues Midjourney. The NYT has a legal team. But independent designers, artists, and small software companies get nothing. The practical question isn't "does copyright apply?" but "can you afford to enforce it?" For most creators, the answer is no.

### Angle 4: The Self-Cannibalizing System
The SaaS moat erosion + design homogenization + copyright gap creates a self-reinforcing cycle: AI replicates your work, your work becomes indistinguishable from everyone else's, and then copyright can't help because there's nothing distinctive left to protect. The system eats itself.

### Angle 5: What Comes After Copyright?
If copyright can't protect what matters in the AI age, what does? Explore the proposed alternatives: learnright, federal right of publicity, EU licensing regimes, labor-based solutions (union contracts), speed/brand as protection. The pragmatic question for designers and creators in 2026.

---

## X. Source Index

### Court Cases
- Thomson Reuters v. ROSS Intelligence, D. Del. (Feb 2025)
- Bartz v. Anthropic, N.D. Cal. (June 2025, settled Aug 2025)
- New York Times v. OpenAI/Microsoft, S.D.N.Y. (ongoing, summary judgment April 2026)
- Khan v. Figma Inc., N.D. Cal. (Nov 2025)
- Disney/Universal v. Midjourney, C.D. Cal. (June 2025)
- Warner Bros. v. Midjourney (Sept 2025, consolidated with Disney)
- RIAA v. Suno, D. Mass. (June 2024, Warner settled Nov 2025)
- RIAA v. Udio, S.D.N.Y. (June 2024, Universal settled Oct 2025)
- Publishers v. Cohere, S.D.N.Y. (Feb 2025)
- NYT v. Perplexity (Dec 2025)
- Lehrman v. Lovo, Inc. (voice cloning)
- Disney/Universal/Warner v. Minimax (Hailuo AI) (Sept 2025)

### Copyright Office Reports
- Part 2: Copyrightability (January 2025) — [Copyright Office](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf)
- Part 3: Generative AI Training (May 2025, pre-publication) — [Copyright Office](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf)

### Academic/Institutional
- Pasquale, Malone & Ting, "Copyright, Learnright, and Fair Use" — [Northwestern JTIP](https://jtip.law.northwestern.edu/issues/copyright-learnright-and-fair-use-rethinking-compensation-for-ai-model-training/)
- MacCarthy, "Copyright alone cannot protect..." — [Brookings](https://www.brookings.edu/articles/copyright-alone-cannot-protect-the-future-of-creative-work/)
- Lemley, "How Generative AI Turns Copyright Upside Down" — [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4517702)
- "Visual Elevator Music" study — [Patterns/Cell Press](https://www.cell.com/patterns/fulltext/S2666-3899(25)00299-5)

### Legal Analysis
- Vorys, "Vibe Coding & The Diminishing Role of Copyright in AI-Generated Software" — [Vorys](https://www.vorys.com/publication-vibe-coding-the-diminishing-role-of-copyright-in-ai-generated-software)
- Morrison Foerster, "AI Trends for 2026" — [MoFo](https://www.mofo.com/resources/insights/260210-ai-trends-for-2026-copyright-litigation)
- Crowell & Moring, "Voice Attributes Are Not Protectable" — [Crowell](https://www.crowell.com/en/insights/client-alerts/fundamental-copyright-principles-underscored-in-ai-context-voice-attributes-are-not-protectable)
- EFF, "2025 in Review" — [EFF](https://www.eff.org/deeplinks/2025/12/artificial-intelligence-copyright-and-fight-user-rights-2025-review)

### Legislation
- NO FAKES Act — [Congress.gov](https://www.congress.gov/crs-product/LSB11052)
- EU Parliament copyright proposals (Jan 2026) — [European Parliament](https://www.europarl.europa.eu/news/en/press-room/20260126IPR32636/protect-copyrighted-work-used-by-generative-ai-say-legal-affairs-meps)

### Industry Reporting
- [Copyright Alliance, 2025 Year in Review](https://copyrightalliance.org/ai-copyright-lawsuit-developments-2025/)
- [IPWatchdog, Three Key Decisions of 2025](https://ipwatchdog.com/2025/12/23/copyright-ai-collide-three-key-decisions-ai-training-copyrighted-content-2025/)
- [National Law Review, 85 Predictions for AI and the Law in 2026](https://natlawreview.com/article/85-predictions-ai-and-law-2026)
