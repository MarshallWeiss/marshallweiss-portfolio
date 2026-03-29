# Checkout Optimization

**Client:** El Confidencial
**Role:** Product Design
**Year:** 2023
**Subtitle:** Reducing drop-off in El Confidencial's subscription funnel through systematic checkout redesign

## Overview

I identified pain points and UX errors in our checkout process and led a redesign of our subscription payment flow, resulting in a cleaner, smoother user experience and a 4.6% increase in conversion rate.

## Context and Design Problem

The checkout flow is the final and most critical step in El Confidencial's subscription funnel. Because a large portion of readers are older and less tech-savvy, the flow needed to be extremely intuitive, accessible, and low-friction. As lead designer, I redesigned the checkout experience with the goal of increasing completion rates and reducing user frustration — while working within the constraints of Piano, the enterprise paywall and subscription platform used by the company.

Piano uses a proprietary templating language that limits what designers can control: button styles, payment method ordering, field localization, and transition states are all partially or fully locked. Some friction points — like the forced payment method selection step and certain loading states — couldn't be eliminated, only mitigated.

### UX Problems Identified (Old Checkout)

**Desktop:**
1. **No default payment method** — Users had to choose between credit card, PayPal, or bank transfer with no default selected, adding an unnecessary decision and extra step at the start of checkout.
2. **Confusing, overly textual pricing** — Three different subscription prices appeared without clear distinction, and the modal didn't specify which plan the user was purchasing or what it included.
3. **Inconsistent credit card fields** — The credit card form lacked autofill and proper focus states. Icons were inconsistent and often wrong — a clock for expiration date, a house labeled 'zip' for codigo postal.
4. **Incorrectly displayed error states** — Validation only triggered after clicking 'Buy' instead of in real time. Errors appeared in an English-language banner at the top of the modal rather than inline beneath each field.

**Mobile:**
1. **Apple Pay selected by default** — Apple Pay was selected by default despite being one of the least-used methods. The alternative payment selector appeared disabled due to its gray styling, discouraging users from switching.
2. **No default payment method adds an extra step** — Requiring users to select a payment method before entering details added unnecessary friction. Button styles were inconsistent and low-contrast. Switching methods cleared previously entered credit card fields, forcing re-entry.
3. **Confusing pricing information** — Three different prices appeared — immediate payment, first-term cost, and recurring rate — without clear hierarchy. Users couldn't tell what they'd actually be charged.
4. **Credit card text fields lack autofill. Buy button obscured below scroll.** — Credit card fields lacked autofill support, icons were inconsistent, and the buy button was pushed below the fold, forcing users to scroll to complete their purchase.

## Research: Benchmarking

Research combined qualitative UX audit, behavioral data, and competitive benchmarking. We analyzed HubSpot rage click data and session recordings to identify drop-off patterns, examined how the flow rendered across device sizes to catch elements falling below the fold, and reviewed customer service logs for recurring payment complaints. We also benchmarked six major publications — NYT, Washington Post, El Mundo, El Pais, The Atlantic, and WSJ — alongside best practices from the Nielsen Norman Group and Baymard Institute.

## Solution: Final Design

The final design required close collaboration with developers to work within Piano's technical constraints. A key early decision was switching the payment provider to Stripe within Piano, which significantly improved the credit card form out of the box — better field styling, autofill support, and smoother mobile interactions — without additional front-end work.

### Key Design Decisions

**Clearer pricing:**
I simplified the pricing to highlight only the discounted introductory price, displaying the original price subtly for context. This reduced decision friction and made the value proposition immediately clear.

**Renewal terms hidden but easily accessible:**
Full subscription terms are accessible via a "Ver detalles" link, with a clear disclaimer about canceling anytime — reinforcing transparency without cluttering the main view.

**Simplified promotional code flow:**
The promo code field is hidden by default and revealed via a checkbox, reducing visual clutter and eliminating unnecessary interaction friction.

**Improved error states and real-time validation:**
Validation now happens in real time as users complete each field. Error messages appear inline in Spanish beneath the relevant input, replacing the previous post-submit English banner.

**Buy button visible for all payment methods on mobile:**
Collapsible sections for subscription and payment details keep the buy button persistently visible on mobile, eliminating the scroll-dependency that previously hid it below the fold.

## Results

These changes resulted in a **4.6% increase in checkout conversion rate**, a meaningful improvement to both product performance and business outcomes.

## Takeaways

1. **Minor UX issues can have a huge impact** — Small friction points — like confusing pricing, disabled-looking buttons, or forms that don't support autofill — compound to create significant drop-off. Addressing these details systematically led to measurable conversion gains.

2. **Working with third-party platforms requires creative problem-solving** — Piano's constraints meant we couldn't rebuild the checkout from scratch. Success came from identifying which elements we could customize and optimizing within those boundaries.

3. **Checkout Optimization requires ongoing iteration** — This redesign established a stronger baseline, but checkout optimization is never truly finished. Continued A/B testing and user feedback will drive future improvements.
