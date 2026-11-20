# PayAI UI/UX Guide

Public edition 1.1 | Reviewed 20 November 2026 | For designers, partners, and AI agents

**Purpose:** help teams create consistent PayAI marketing interfaces and extend them into clear, usable product experiences. UI means user interface; UX means user experience.

**Use with:** [PayAI Brand Guide](PayAI-Brand-Guide.md) for identity, imagery, language, and campaign rules.

### Fast-start rules

- Choose one active positioning direction per page: x402 facilitator or merchant layer.
- For product UI, follow the existing repository prompt. For selected marketing pages, use the observed marketing profile; both retain Inter, light surfaces, and clear hierarchy.
- For landing pages, start from the observed 1440px frame with 1280px content; adapt fluidly.
- Separate promotional illustration from controls that perform real actions.
- Design responsive layouts, keyboard behavior, and error/loading states explicitly; static artwork does not establish them.
- Cite references and label every newly proposed pattern.

<!-- pagebreak -->

## 1. Scope, evidence, and design principles

### What this guide establishes

This public edition focuses on social and landing-page patterns. It does not establish a complete paywall, merchant portal, dashboard, or payment implementation. Original draft screenshots, sample identities, and raw design-file references are omitted.

The [repository README](../../README.md), [UI design prompt](../../prompts/ui-design-style.md), and [license](../../LICENSE) remain authoritative for their published rules. This guide labels marketing observations and proposed extensions separately.

**Documented** means an explicit source rule. **Observed** means visible or measured in selected nodes. **Recommended** means a proposed working default. **Unresolved** means the source does not establish the answer. These labels apply throughout both guides.

This is a practical interface guide, not an exhaustive product specification or an accessibility conformance report. Interaction descriptions below are recommendations unless explicitly tied to source text or visuals.

### Principles derived from the material

| Principle | Evidence | Recommended application |
| --- | --- | --- |
| Explain before asking for action | Hero title, body, paired CTAs, workflow visuals | State the outcome and mechanism before the first major decision |
| Make technical work approachable | Plain language, payment cards, familiar icons, friendly imagery | Use concrete examples and progressive disclosure |
| Make hierarchy obvious | Dark headline, muted body, blue primary action | Keep one primary action per local decision area |
| Show the system's work | Verify/settle examples, network lists, integration steps | Show meaningful status, outcomes, and recovery paths |
| Keep the interface calm | White surfaces, pale backgrounds, subtle borders | Reserve decorative grids and three-dimensional artwork for explanatory areas |

### Resolve style differences by context

| Context | Rule |
| --- | --- |
| Product/application UI | Use the existing prompt: #4D63F6 interactive accent, published neutrals, flat surfaces, 12px buttons/cards, 8px fields |
| Selected marketing page | May use observed blue gradients, stronger-blue emphasis, and 8px CTA radii described here |
| Social campaign | May use the brand guide's illustration, grid, and dark-background families |

Do not transfer decorative campaign styling into payment controls by default. Do not turn illustrative cards into working controls merely because they resemble inputs or switches. Dark social artwork does not establish a complete dark UI theme.

Always retain a visible keyboard-focus indicator. The older prompt's "No outlines" wording is a visual preference, not permission to remove focus indication; a clear outline or equivalent indicator must remain.

<!-- pagebreak -->

## 2. Two active landing-page directions

**Supported messaging routes:** both directions are active. They share the PayAI identity but answer different questions. Keep each page's narrative and navigation consistent with its selected purpose.

| Element | x402 facilitator direction | Merchant-layer direction |
| --- | --- | --- |
| Main question | How can my agent or app accept/send payments? | How can one merchant integration connect to agentic payments and discovery? |
| Observed headline | The x402 Facilitator for AI Agents and Apps | One Integration / All Agentic Payments |
| Observed hero actions | Get Started; Try x402 | Start Building; View Docs |
| Observed navigation | Home, Ecosystem, Blogs, Documentation | Home, Products, Docs, Blogs, Community, Pricing |
| Visual explanation | Agent request, budget, payment card, verification metaphor | Revenue, network coverage, catalogs, and latency cards |
| Recommended primary journey | Understand → inspect support/terms → integrate or try → inspect outcome | Understand coverage → inspect integration/docs → start building |

### Keep the page internally coherent

Use a single primary CTA label for the same destination. If "Get Started" and "Start Building" lead to different tasks, explain the difference. Verify link destinations; they were not tested in this review. Only include navigation items with real destinations and useful content.

The older 375px mobile landing sample uses "The Fastest Way for AI Agents and Apps to Transact." Treat it as evidence of responsive composition, not as the approved mobile copy for either desktop direction. Synchronize copy, availability, and navigation when adapting an active desktop page.

<!-- pagebreak -->

## 3. Visual foundations and measured tokens

The following table describes the **observed marketing profile**. Product UI retains the published neutrals: text #101828, muted text #667085, border #E5E7EB, background #FAFAFA, and surface #FFFFFF. All dimensions below are design pixels. Names are documentation aliases, and measurements apply to the sample, not every screen.

| Alias or role | Observed/documented value | Evidence |
| --- | --- | --- |
| marketing.strongBlue | #1D45D8 | Marketing board label; hero eyebrow fill |
| brand.primary | #4D63F6 | Published repository primary; marketing gradient stop |
| marketing.tint / marketing.pale | #8AA3FF / #D7E3FF | Marketing board labels |
| text.primary | #09090B | Hero heading and secondary CTA label |
| text.secondary | #71717A | Hero body and address label |
| text.supporting | #3F3F46 | Payment illustration labels |
| surface.base | #FFFFFF | Header and secondary CTA |
| surface.subtle | #FAFAFB | FAQ section |
| border.default | #E4E4E7 | Secondary CTA and section borders |

### Measured typography

| Role | Family/weight | Size / line height | Tracking |
| --- | --- | --- | --- |
| Desktop hero title | Inter Medium | 56 / 66px | -1% |
| Hero eyebrow | Inter Medium | 20 / 32px | -1% |
| Hero body | Inter Regular | 16 / 28px | -1% |
| Hero CTA | Inter Medium | 14 / 20px | 0% |
| Illustration label | Inter Regular | 12 / 16px | 0% |
| Illustration value | Inter Semi Bold | 14 / 20px | 0% |

Evidence: sampled facilitator marketing hero. The brand board instead gives a general 16px minimum, 1.3 line height, and -2% tracking. Preserve the distinction. Recommended body default is at least 16px; smaller metadata is an intentional exception, not the default.

### Proposed extensions, not measured source tokens

Use a compact spacing scale of 4, 8, 12, 16, 24, 32, 48, 64, and 80px. The source confirms some of these values but does not establish this full scale. Start section headings at 36/44px and mobile hero headings at 32/40px, then check wrapping and hierarchy. For selected marketing profiles, 8px buttons and proposed 12-16px cards are starting points. Product UI retains its published 12px button/card radii.

Use published semantic colors for product UI: error #DC2626, success #059669, and warning #D97706. Verify contrast in the actual context and pair colors with words/icons. Partner logos are not a source of semantic UI colors.

<!-- pagebreak -->

## 4. Layout and responsive behavior

### Observed geometry

| Sample | Measurement | Consequence |
| --- | --- | --- |
| Desktop canvas | 1440px wide | Reference composition, not a fixed browser width |
| Header V2 | 68px high; 80px side padding; 1280px inner width | Align header and main content on a common container |
| Facilitator hero | 696px including 68px header | Text-led left side, explanatory artwork on right |
| What PayAI Do section | 80px side frames; 1280px center | Confirms the desktop content width |
| FAQ section | 80px top/bottom padding; 60px section gap; 800px FAQ width | Use a narrower reading measure for questions |
| Mobile landing | 375px wide; 64px header | Dedicated mobile composition exists |

### Recommended responsive contract

- Use a fluid container capped at 1280px; reproduce 80px margins at a 1440px viewport. Use 24-32px intermediate gutters and 16-24px small-screen gutters as content allows.
- Collapse a two-column hero when text and illustration no longer fit comfortably. Choose the breakpoint from content testing; no canonical breakpoint was established.
- Preserve reading order: headline → explanation → actions → proof → illustration. The sampled mobile hero follows this order.
- Stack card grids as space decreases. Wrap or stack CTAs without clipping labels. Use horizontal scrolling only where the content genuinely needs it.
- Replace desktop navigation with an accessible menu when it no longer fits. The menu interaction was not audited.
- Use content-driven heights. Do not carry the long desktop frame height into implementation.
- Reflow at 320px CSS width; verify 375px, a tablet-sized viewport, and desktop. Test long copy and enlarged text.

### Mobile adaptation checklist

The reviewed 375px composition places explanatory content before the illustration. Preserve this order when adapting a selected desktop direction:

1. Headline and value proposition.
2. Supporting explanation.
3. Primary and secondary actions.
4. Verified proof or supporting context.
5. Optional explanatory illustration.

**Recommended:** synchronize copy and navigation with the chosen desktop direction, enlarge touch targets where needed, and keep illustrative payment text separate from actionable controls. Preserve the meaning of the hero in real text so decorative artwork can be omitted without losing essential information.

Test long headings, translated copy, wrapped button labels, enlarged text, missing images, and narrow widths. A phone layout is a composition in its own right, not a scaled screenshot of the desktop page.

<!-- pagebreak -->

## 5. Components and visual contracts

### Primary and secondary actions

These are **observed marketing CTA measurements**. Product UI keeps the existing prompt's 12px button radius and flat #4D63F6 primary surface. Build controlled component sets for the chosen context; do not mix their styles accidentally.

| Property | Primary CTA | Secondary CTA |
| --- | --- | --- |
| Observed height / radius | 40px / 8px | 40px / 8px |
| Observed padding | 10px vertical, 16px horizontal | 10px vertical, 16px horizontal |
| Label | Inter Medium 14/20px, white | Inter Medium 14/20px, #09090B |
| Icon / internal gap | 20px / 8px | 20px / 8px |
| Surface | Blue gradient: #4D63F6 to #1D45D8 | White, #E4E4E7 1px border |
| Shadow | None in sampled node | Black 10%, x0 y1 blur2 spread0 |

The pair has a measured 12px gap. Button widths are content-driven in intent: the samples are 138px and 121px. Avoid turning those specific widths into universal tokens. For touch-focused flows, use at least a 44px target as a recommended design target; the measured 40px visual is not automatically an accessibility failure.

### Other recurring patterns

| Pattern | Observed structure | Recommended component contract |
| --- | --- | --- |
| Header | Logo, navigation, action area; active Home underline | Current-page state, menu expansion, keyboard focus, responsive collapse |
| Product/service block | Title, status badge, explanation, paired actions, illustration | Separate content, availability, primary destination, and optional secondary action |
| Network/partner display | Logos and labels; lists or cards | Preserve brand assets; explain support scope; distinguish partner from supported network |
| FAQ | Question list with one answer shown in source copy | Heading + button; expanded state; programmatic relationship to answer |
| Article card | Category, title, excerpt, author, date | One clear destination; avoid duplicated nested links; real publication metadata |
| Newsletter | Email field, subscribe action, success copy | Persistent label; validation; submitting, success, and failure states |
| Footer | Grouped links, status, copyright | Remove duplicate/dead links; use actual status data and current approved legal copy |

Recommended Figma properties: button kind, state, label, icon visibility; service status, title, body, actions; FAQ expanded state and content. These are proposed component APIs, not extracted property definitions.

<!-- pagebreak -->

## 6. Page structure and content design

### Facilitator landing narrative

The reviewed facilitator-style composition provides this narrative pattern:

1. Hero: positioning, explanation, paired CTAs, payment illustration.
2. What PayAI Do: verification/settlement explanation and supporting features.
3. Ecosystem & Partners: supported-network content.
4. Product/service explanations with appropriate availability labels.
5. Optional integration or ecosystem example, when approved for publication.
6. Community story heading, testimonial/metric area, and trust band.
7. Articles.
8. Frequently asked questions.
9. Closing CTA, partner invitation, newsletter, and footer.

This is an observed sequence, not a requirement to include every section in every page. A focused product page should include only material needed to understand the offer, evaluate it, and act.

### Recommended page recipes

| Page | Recommended information order |
| --- | --- |
| Product/facilitator | Outcome → mechanism → support/constraints → setup → proof → questions → start |
| Merchant-layer | Integration value → coverage/discovery model → setup → verified ecosystem evidence → docs/start |
| Ecosystem | Relationship types → filters/categories if needed → partner/merchant detail → relevant next action |
| Article | Title → description and metadata → readable body → supporting media → related next step |
| Pricing | Billing unit → inclusions/limits → conditions → comparison → suitable action |

Article, use-case, facilitator, ecosystem, and SDK pages exist in the page inventory. Their complete visuals and interaction behavior were not audited. The recipes above are recommendations, not a specification extracted from those screens.

### Content quality rules

- Do not copy source metrics, unverified testimonials, supported-network lists, prices, or availability badges into production without validation.
- Keep "Live Now" and "Coming Soon" behavior coherent. A coming-soon item should not imply an immediately usable product.
- Distinguish verification from settlement and settlement from granting access. The revised facilitator source explicitly says to inspect results and reconcile unresolved outcomes.
- Show currency, network, amount, and relevant conditions consistently. Format money for the product's locale and precision requirements.
- Review footer wording, duplicates, destination accuracy, and consistent terminology before publication.

<!-- pagebreak -->

## 7. Interaction and state requirements

**Recommended:** static frames do not establish keyboard behavior, navigation destinations, timing, backend semantics, or completed user journeys. Define these before shipping or handing a design to implementation.

| Element | Minimum states and behavior to specify |
| --- | --- |
| Button/link | Default, hover, focus-visible, pressed; loading/disabled when applicable; destination or action |
| Navigation/menu | Current location, collapsed/expanded, keyboard access, close behavior, focus return |
| Accordion | Collapsed/expanded, Enter/Space activation, visible focus; decide single vs multiple open |
| Form field | Empty, focused, filled, invalid, submitting, success; persistent label and actionable error |
| Data card/list | Loading, populated, empty, stale/unavailable, error; units and time period |
| Copy control | Default, copied confirmation, failure; copy the intended value, not decorative truncation |
| Modal | Initial focus, focus containment, dismiss rules, return focus, small-screen fit |

### Payment-related experiences

The source has payment illustrations and facilitator copy, but this review did not establish a complete paywall or wallet flow. The following is a proposed design checklist, not an implementation of PayAI's payment protocol.

| Stage | Recommended user-facing information |
| --- | --- |
| Review | What is being purchased, amount/currency, recipient, network, fees if applicable, and environment |
| Authorization | What action is required from the user or wallet; preserve context while waiting |
| Verification/processing | Specific current stage; prevent unintended duplicate submission |
| Confirmed outcome | Actual result, amount, reference/receipt where available, and next action |
| Declined or failed | Clear cause when known; preserve inputs; offer the appropriate recovery |
| Unknown or delayed | Say the outcome is unresolved; provide status/receipt checking before a repeat payment |

Do not show "Payment Settled" merely because a signature is valid. Do not make a retry look harmless if the previous outcome is unknown. Collaborate with engineering on actual states and allowed transitions.

### Motion

No complete motion specification is established by this guide. Recommended: use brief state transitions, support reduced motion, and keep essential information available without animation. Decorative hero movement should not impede reading or resemble a live payment status.

<!-- pagebreak -->

## 8. Accessibility and validation

Accessibility recommendations here extend the source; they are not proof that the Figma designs or an implementation conform to a standard.

### Contrast

Target at least 4.5:1 for normal text and 3:1 for qualifying large text. Test the actual rendered background, including gradients and image overlays. [W3C: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

| Solid foreground on white | Computed ratio | Practical implication |
| --- | --- | --- |
| #09090B | 19.90:1 | Strong primary text |
| #71717A | 4.83:1 | Passes normal-text threshold on white; check other backgrounds |
| #1D45D8 | 7.25:1 | Suitable blue text/white-text pairing |
| #4D63F6 | 4.74:1 | Narrower margin; check opacity and gradient treatment |
| #8AA3FF | 2.40:1 | Do not use as normal or qualifying large text on white |
| #D7E3FF | 1.29:1 | Use as a surface/accent, not readable text on white |

Ratios were calculated from opaque sRGB colors. They do not certify the gradient headings, illustrations, focus indicators, or every point of a gradient button. The 1px pale border is not automatically sufficient as the sole visual identifier of an input.

### Targets, reflow, and semantics

- WCAG 2.2's AA minimum target criterion is 24 × 24 CSS pixels, with specified exceptions. The guide recommends 44px targets for important touch controls; this is a stronger design target. [W3C: Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Support vertical content at 320 CSS pixels without two-dimensional scrolling, except where intrinsically necessary. [W3C: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- Use semantic headings, buttons, links, form labels, and lists. Keep keyboard focus visible and logical.
- Pair status colors with words and, where useful, icons. Announce meaningful asynchronous results without repeatedly interrupting users.
- Provide useful text alternatives for informative illustrations. Mark purely decorative grids and objects as decorative. Keep critical content in text.

### Practical QA pass

Check at 320, 375, tablet, and 1440px widths; zoom/enlarged text; keyboard-only use; long titles and localized numbers; loading/empty/error data; high and low data values; slow or unresolved payment responses; and reduced motion. Confirm that the interface remains usable when decorative images fail to load.

Test a working implementation for behavior. A screenshot review can confirm appearance and obvious clipping, but cannot establish keyboard, assistive-technology, or payment-flow correctness.

<!-- pagebreak -->

## 9. Agent workflow and handoff

### Design workflow

1. State the page's audience, task, conversion goal, and active positioning direction.
2. Open the matching Figma reference and read both guides. Do not infer approval from a frame name.
3. Reuse source assets and components. Resolve external styles/variables where possible.
4. Map layout, typography, color, and spacing to semantic roles. Label new tokens and components as proposed.
5. Design the normal flow and meaningful exceptional states together.
6. Adapt content for mobile; do not just shrink the desktop composition.
7. Validate visuals, interaction behavior, copy, accessibility, and actual product constraints.
8. Provide reference names, deviations, unresolved decisions, and a complete handoff.

### Reusable agent brief

> Design a PayAI [page/flow] for [audience and task] using the [facilitator / merchant-layer] direction. Follow PayAI-Brand-Guide.md and PayAI-UI-UX-Guide.md. Start from references [IDs]. Reuse the logo, Inter typography, documented palette, and measured component patterns. Treat metrics and product claims as unverified unless supplied here: [facts]. Define responsive behavior and normal, loading, empty, error, and success states as applicable. Label all new design decisions as proposed. Deliver the designs, interaction notes, reference names, validation results, and remaining questions.

### Required handoff information

| Area | Record |
| --- | --- |
| Intent | Audience, problem, primary task, positioning route |
| Sources | Public reference paths, source date, reused assets/components |
| Layout | Container behavior, spacing, responsive rules, overflow cases |
| Components | Anatomy, editable content, variants, interaction states |
| Content | Verified copy, units, dates, availability, actual destinations |
| Behavior | State transitions, focus behavior, validation, loading and recovery |
| Quality | Viewports tested, contrast checks, interaction/accessibility results |
| Decisions | Proposed deviations, missing evidence, owner, approval status |

### Done means

The selected brand direction is coherent; the source references are traceable; controls do what their labels promise; important content survives mobile reflow; non-happy states are specified; claims are verified; accessibility has been tested at the appropriate level; and the recipient can continue without guessing which decisions were established versus proposed.

<!-- pagebreak -->

## 10. Public references and governance

| Public reference | Purpose |
| --- | --- |
| [Repository README](../../README.md) | Published identity and product palette |
| [UI design prompt](../../prompts/ui-design-style.md) | Product UI baseline and CSS variables |
| [Brand guide](PayAI-Brand-Guide.md) | Identity, messaging, social and illustration guidance |
| [Design tokens](PayAI-design-tokens.json) | Published, observed, and recommended values kept separate |
| [Brand Assets License](../../LICENSE) | Permitted uses and restrictions |

### Maintenance priorities

**First:** select the product or marketing style appropriate to the task. Maintain approved copy, synchronize mobile and desktop, and verify product and partner claims.

**Next:** establish reusable components with explicit states. Preserve published product defaults while keeping any selected marketing variants separate.

**Then:** validate detailed payment flows with engineering. Treat dashboard, paywall, and merchant-portal patterns as requiring their own review. Define responsive behavior and accessibility requirements with implementation evidence.

**Maintain:** record public references, evidence dates, owners, approvals, and deviations. Revalidate affected rules after substantive changes. Do not silently promote an observed sample or a recommendation into a published product standard.

This public edition omits original screenshots, design-file identifiers, sample personal details, and draft product claims. It describes reusable patterns; it is not a product availability or performance statement.
