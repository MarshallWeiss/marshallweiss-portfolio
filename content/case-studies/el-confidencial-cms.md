# Jarvis: An AI-powered newsroom CMS

**Client:** El Confidencial
**Role:** Lead Product Designer
**Year:** 2023 - present
**Subtitle:** Redesigning the editorial workflow for 200+ journalists around AI content generation, editing, and publishing

## Overview

El Confidencial designs, builds, and maintains its own custom CMS used daily by journalists, columnists, and freelancers. After 15 years on a legacy in-house system, the product, engineering, and design teams undertook a full modernization of the CMS. As lead designer on the project, I drove the end-to-end design effort, focusing on improving writing efficiency, integrating new AI tools to automate repetitive tasks, and resolving significant technical and usability limitations.

## Project Objectives

**Editorial:**
- Provide a smooth, modern writing tool
- Reduce friction and time spent on tedious tasks (linking, tagging, inserting media)
- Create a tool writers want to work inside from start to finish
- Standardize and centralize use of AI tools

**Business:**
- Increase quality of articles published (fewer grammatical errors, more relevant linked articles, more videos)
- Increase quantity of articles published by reducing time to publication
- Improve SEO performance of articles published

**Product:**
- Enable new AI-powered editorial tools
- Improve publishing efficiency
- Modernize the tech stack
- Enhance security
- Increase adoption and satisfaction among journalists

## Previous CMS Problems

The previous CMS had numerous UX issues:
- **Icon only buttons** — Buttons as only icons (no text) made it difficult to determine which feature or attribute a journalist was inserting.
- **Confusing section icons** — The structure and navigation of the legacy CMS was extremely confusing and lacked visual or textual cues to help users.
- **Dual buttons for saving** — Because the text editor was located within the list of articles, there were two buttons, one for applying changes and keeping the window open, and another for saving and closing. This duplicated features and led to user confusion around which to use.

## Research Process

Research was shaped by the diverse needs of newsroom teams — breaking news writers prioritized speed, while interactive journalists needed rich multimedia support. As an internal tool, we had direct access to users for rapid feedback loops, pairing interviews and usability testing with benchmarking and data analysis.

1. **Benchmarking** — We conducted extensive benchmarking across a wide range of CMS and writing platforms, including WordPress, ArcXP, Notion, Substack, Medium, and others. This proved especially valuable in shaping our approach to integrating AI capabilities into the writing experience.

2. **User Story Mapping** — We conducted an in-depth audit of all existing CMS features. From there, we partnered with stakeholders across teams to evaluate usage, determine which capabilities were essential, and identify those that could be deprecated.

3. **Card Sorting** — We conducted a card sorting study to validate whether the existing layout and distribution of fields and features were intuitive and aligned with user expectations.

4. **Product Roadmap** — After defining a master list of CMS features, we collaborated with the development team to assign point estimates based on implementation effort. By evaluating projected impact against estimated complexity, we prioritized confidently and structured the rollout into quarterly releases.

5. **User Testing** — We created wireframes and interactive prototypes to test early design variations with users before development, gathering feedback that directly shaped the direction of the project.

6. **Progressive Rollout** — Rather than a full newsroom launch, we rolled out to a small group of trusted journalists first, then expanded section by section — starting with Culture and Vanity, where writers could afford a more deliberate adoption pace. The breaking news desk stayed on the legacy system longest given their zero-tolerance requirement for friction.

## Key Insights

1. **Need for a clean, modern text editor** — The legacy text editor was too small, lacked autosave, and couldn't display images inline. Many journalists wrote in Google Docs or Word and pasted text in, forcing tedious reformatting.

2. **Enthusiasm for automation of tedious tasks** — Inserting images, quotes, and related articles was a slow, manual process. A key goal was to streamline this workflow and leverage AI to automate repetitive formatting tasks.

3. **Inconsistent AI workflows among writers** — Journalists used AI inconsistently across a range of external tools. The new CMS aimed to centralize AI workflows, positioning the platform as the primary hub for company-wide AI tools.

4. **Performance issues and instability caused lost work and frustration** — Frequent system instability led to lost work and widespread frustration. Improving reliability and performance was an essential priority alongside the UX redesign.

5. **Multimedia workflow friction was a productivity killer** — Uploading and embedding multimedia was slow and unintuitive, creating friction as the organization pushed to expand video-driven storytelling.

6. **Workflow Continuity vs. UX Evolution** — We balanced meaningful UX improvements with familiar interaction patterns, minimizing the learning curve and ensuring smoother adoption across editorial teams.

7. **Speed is non-negotiable for breaking news** — The last-minute desk's zero tolerance for friction directly shaped the rollout strategy. Any disruption to their workflow risked missing breaking stories.

8. **Proximity to users is a rare advantage** — Having journalists in the same building enabled informal, continuous feedback that most product teams never get. Problems surfaced quickly and fixes could be validated just as fast.

9. **Workarounds were symptoms, not preferences** — Writers weren't avoiding the CMS by choice. The old editor made in-editor writing genuinely painful, and the real design goal was making the native experience good enough that external tools became unnecessary.

## Early Sketches and Wireframes

Early designs prioritized replicating the existing CMS fields to evaluate whether their distribution and hierarchy were effective. One of the main challenges was fitting the fields and multimedia selection intuitively within the available screen space, balancing clarity with functionality.

## Final Design

The editor combined shadcn styling with a WYSIWYG interface that mirrored the final published layout, while AI-powered features accelerated the entire content workflow from drafting to publication.

### Key Features

**Editing interface matches the structure of published articles:**
The new layout mirrors the published article, placing fields, multimedia, and the text editor in the same positions as the live page.

**More intuitive multimedia selection and editing flows:**
Users can browse images with metadata, select single or multiple assets, and visually choose article layouts — all from one streamlined interface.

**Automated insertion of related news articles using AI suggestions:**
A vector-based RAG suggests related articles based on content, reducing manual search time and improving recirculation.

**Card-based spelling, style and grammar checker:**
A custom style and grammar checker ensures adherence to El Confidencial's stylebook, with a card-based system for accepting or rejecting each suggestion.

**In-line AI commands:**
Smart inline commands let users rewrite, shorten, or adjust tone — all guided by El Confidencial's stylebook.

**Precise and well-documented Design System:**
Tokenized styles and reusable components ensure consistency across features. A hybrid MUI/Shadcn approach pairs MUI's feature depth with Shadcn's simplicity, while Figma Make integration enables instant prototype creation.

## Outcomes

1. **Phased adoption across the newsroom** — Rollout began with a small group of trusted journalists, then expanded section by section.
2. **Significant reduction in style and spelling errors** — Since Argos became a required step before every publication, measurable decreases in style and spelling errors have been recorded.
3. **Positive reception across the newsroom** — Journalists described the new CMS as noticeably more modern and a smoother writing experience.
4. **Built for continuous improvement** — An integrated bug reporting system and direct access to journalists enabled fast iteration cycles post-launch.
5. **Key editorial workflows noticeably faster** — Multimedia insertion, related article linking, formatting, and spell checking all became measurably quicker.
6. **A scalable foundation for what comes next** — The design system and modular CMS architecture established a platform for future feature development.

## Takeaways

1. **Complex projects require understanding the needs of multiple stakeholders** — I learned to navigate differing perspectives, align goals, and make design decisions that address both business objectives and user needs.

2. **Clarity and communication are crucial for a successful handoff** — Clear, detailed communication with developers during handoff was of paramount importance in ensuring designs were implemented accurately.

3. **Small details can make or break usability** — Seemingly minor decisions — spacing, labeling, affordances, feedback states — often determine whether an interface feels intuitive or frustrating.

4. **AI adoption in the newsroom is a delicate balance** — It's a delicate balance between enabling innovation and maintaining workflows that feel natural and supportive rather than disruptive.
