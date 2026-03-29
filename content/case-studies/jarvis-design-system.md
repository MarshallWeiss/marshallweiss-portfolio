# Jarvis Design System

**Client:** El Confidencial
**Role:** Lead Product Designer
**Year:** 2023 - present
**Subtitle:** Building the component library and design language that unifies El Confidencial's product team

## Overview

As design lead on the CMS redesign for El Confidencial, I built, documented, and continue to maintain an extensive design system to ensure consistency across the project and a seamless developer handoff.

## Context and Design Problem

As the lead designer of the new CMS, used by El Confidencial's team of over 200 journalists, I needed to develop a design system to ensure consistency when designing new features and streamline handoff with development teams.

## Technical Requirements and Constraints

The CMS integrated three frameworks: Plate.js (a Notion-style text editor using shadcn/Tailwind), existing MUI components, and shadcn as the primary design framework. Since converting MUI to shadcn wasn't feasible, I adapted MUI components to reflect shadcn's style, keeping the design cohesive without requiring a full rewrite.

## Foundation Tokens

**Colors:** Colors were kept simple, building upon Shadcn's color palette of blacks and grays while adding other colors for information, error, and success states.

**Typography:** Typography also built off of shadcn styles, utilizing Inter for all cases. We adapted this to the MUI nomenclature and added other use cases not covered in the Shadcn design system.

**Border Radius:** Numerical values, like border radii, were specified in t-shirt sizes (lg, md, sm), and reflected in the tokens used in the components.

**Spacing:** Spacing also used the t-shirt sized variable approach, allowing for fast and consistent adding and margin variations.

**Elevation:** Elevation was simplified to only four options, eliminating unnecessary complexity.

## Design System Architecture

### Atoms
With styles established as design tokens, I built the atomic layer first — buttons, dialogs, modals, and other building blocks that would form the foundation for more complex components.

### Molecules
Using these atoms, I constructed more complex "molecules" — components specific to the CMS that weren't native to MUI or Shadcn. Each component was documented on its own Figma page with base components and usage examples.

### Templates and Variables
I built templates for frequently used screens from the previously created molecules. Because they relied entirely on components and tokens, elements could be modified without breaking the structure.

### User Flows
Since the CMS and design system were developed concurrently, I incorporated components into user flows to communicate requirements to developers and enable screen reuse across iterations.

## Final Design System

A fully scalable design system with reusable components and variables across all hierarchy levels, enabling designers and developers to work efficiently.

## Takeaways

1. **Connecting the design system to AI tools via MCP** — Integration with Figma Make, Cursor, and Claude MCP for realistic prototypes and potentially even production-ready code in minutes, dramatically accelerating the design-to-development workflow.

2. **Continuous iteration and maintenance** — Ongoing documentation and component updates as the CMS evolves, ensuring the design system remains current and useful for both designers and developers.

3. **User testing for new features** — Testing new components and patterns before implementation within the design system, validating usability before committing to development resources.
