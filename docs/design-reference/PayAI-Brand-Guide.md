# PayAI Brand Guide

Public edition 1.1 | Reviewed 20 November 2026 | For designers, partners, and AI agents

**Purpose:** create recognizably PayAI work across social campaigns, website marketing, and supporting product communications.

**Use with:** [PayAI UI/UX Guide](PayAI-UI-UX-Guide.md). This guide covers identity, language, and creative direction; the companion covers interfaces and behavior.

**Start here:** use the supplied PayAI logo, blue palette, and Inter family; choose one of the two active positioning directions per asset; make one message dominant; check every product claim before publication.

<!-- pagebreak -->

## 1. How to use this guide

This public edition translates a review of PayAI marketing designs into reusable guidance. Original design-file links, screenshots, sample identities, draft metrics, partner announcements, and unrelated concepts are omitted. Descriptions of layouts and measured styles remain useful without publishing those drafts.

The repository's [README](../../README.md), [UI design prompt](../../prompts/ui-design-style.md), and [license](../../LICENSE) remain the published baseline. This guide adds scoped marketing observations and recommendations; it does not silently replace that baseline.

### Evidence labels

| Label | Meaning | How to act |
| --- | --- | --- |
| Documented | A rule explicitly written in the marketing brand board | Apply within that profile; published repository rules take precedence |
| Observed | A measured property or visible recurring treatment | Reuse within the relevant design family |
| Recommended | A proposed rule that makes future work consistent | Treat as a working default, not an existing Figma rule |
| Unresolved | Approval, behavior, or provenance was not established | Record the decision before treating it as universal |

### Two active positioning directions

**Supported messaging routes:** both directions below are active. Select the direction that fits the brief, and keep its headline, navigation, proof, illustration, and calls to action coherent.

| Direction | Source expression | Best-fit brief, inferred from the designs |
| --- | --- | --- |
| x402 facilitator | "The x402 Facilitator for AI Agents and Apps" | Explain payment verification, settlement, and integration; help developers start or try a payment flow |
| Merchant layer | "One Integration / All Agentic Payments" | Explain merchant reach, discovery, and connections across agentic catalogs and networks |

These are communication patterns within PayAI, not separate visual brands or a statement of product availability. Choose the route appropriate to the brief, and verify the capabilities described in the final copy.

### Authority and coverage

Follow the repository's published asset rules and license. For product interfaces, follow the existing UI design prompt. For an explicitly selected marketing campaign, use the matching observed marketing profile; recommendations fill gaps but do not override established rules.

The review focused on social and landing-page design. It does not establish a complete paywall, merchant portal, dashboard, or payment-flow specification. Original source references are retained separately from this public edition.

<!-- pagebreak -->

## 2. Verbal identity and messaging

### What the material communicates

**Observed:** PayAI presents payment infrastructure for AI agents, apps, and merchants. Repeated themes are usage-based payments, developer integration, network support, and participation in an agentic ecosystem.

**Recommended brand character:** clear, capable, technical when necessary, and approachable. Let product mechanics and concrete outcomes carry credibility. The friendly robot and soft blue illustration language can add warmth without making payment actions feel casual or ambiguous.

### Message hierarchy

1. State the user outcome: accept payment for a request, enable an agent to pay, or connect a merchant integration to the relevant ecosystem.
2. Name the mechanism when useful: x402, facilitator, or software development kit (SDK).
3. Explain the next action with a specific call to action (CTA).
4. Add evidence only when its source, scope, and date are known.

| Context | Observed language | Recommended use |
| --- | --- | --- |
| Facilitator marketing | Get Started; Try x402; Documentation | Pair an integration action with a trial or documentation action |
| Merchant-layer marketing | Start Building; View Docs | Pair an implementation action with an explanatory resource |
| Ecosystem content | Ecosystem Highlight; Supported networks | Name the participant and what the relationship enables |
| Social update | Weekly Recap; product announcement | Lead with the update; verify dates and availability before reuse |

### Writing rules

- Write `PayAI` and `x402` consistently. Preserve official partner and product names.
- Define SDK on first use for mixed audiences. Explain "facilitator" through what it does rather than assuming everyone knows the term.
- Prefer short, specific verbs: build, accept, verify, settle, inspect, try, connect.
- Use sentence case for prose and interface labels. All caps is an observed social headline treatment, not a requirement for every asset.
- Keep one main claim per social graphic. Put context and qualifications in the caption or linked page.
- Avoid absolute promises such as "instant everywhere," "any token," or "no fees" unless the relevant scope is verified.

### Claims that must not become reusable facts

Do not treat example company counts, revenue, uptime, latency, testimonials, network lists, pricing, or availability labels as validated claims. Use a maintained public product source or approved release brief before including them in a deliverable.

**Recommended copy example, not approved marketing text:** "Accept usage-based payments for your API or agent service." Add the supported method and network only after verification. For the merchant-layer direction, explain the integration and discovery outcome without promising universal catalog coverage.

<!-- pagebreak -->

## 3. Logo and color

### Logo

**Observed:** the identity combines a stacked, three-layer blue geometric mark with the PayAI wordmark. The brand board shows a blue wordmark on light backgrounds and a white wordmark with the blue symbol on dark backgrounds. Both square campaign layouts and website navigation use this identity.

**Recommended:** reuse the original vector/logo instance. Preserve proportions, stacking, gradients, and wordmark spacing. Do not typeset a replacement wordmark or generate a lookalike. Avoid stretching, rotating, outlining, recoloring to a partner palette, or placing it over visually busy artwork.

**Published repository rules:** keep clear space equal to the wordmark x-height. The README lists minimum sizes of 16px for favicon, 50px for UI, 250px for product, and 500px for print. Select the appropriate mark, wordmark, or lockup from the repository; preserve its proportions. Prefer SVG when supported. The license prohibits modifying asset colors, proportions, or effects, and implying endorsement without written permission.

### Published palette and observed marketing variants

The repository defines **#4D63F6 as the primary brand blue**. The marketing reference board also names the three additional blues below. The role names are documentation aliases, not an exported Figma variable library.

| Alias | Value | Status and scope |
| --- | --- | --- |
| brand.primary | #4D63F6 | Published repository primary; also on the marketing board |
| marketing.strongBlue | #1D45D8 | Observed stronger blue emphasis in marketing |
| marketing.tint | #8AA3FF | Documented marketing illustration tint |
| marketing.pale | #D7E3FF | Documented marketing background accent |

**Published product UI:** text `#101828`; muted text `#667085`; border `#E5E7EB`; background `#FAFAFA`; surface `#FFFFFF`. The existing prompt uses restrained, light interfaces with #4D63F6 as the sole interactive accent. Keep that default for product UI.

**Observed marketing variation:** selected landing designs use primary text `#09090B`, secondary text `#71717A`, supporting text `#3F3F46`, border `#E4E4E7`, and an FAQ surface of `#FAFAFB`. These values describe a separate marketing sample, not a migration of the published product theme.

A sampled marketing CTA uses a gradient from #4D63F6 at 17.32% to #1D45D8 at 64.8%, with white text. Use this only in a selected marketing style. The published product prompt retains flat blue buttons and no background gradients.

### Contrast and color discipline

Computed solid-color contrast against white is approximately 4.74:1 for the published primary #4D63F6, 7.25:1 for marketing strong blue #1D45D8, 2.40:1 for the tint, and 1.29:1 for pale blue. The two lighter blues are unsuitable for normal-sized text on white. Ratios are calculations from the documented hex values, not a full accessibility audit.

Use restrained blue emphasis on light surfaces. Let partner colors remain within their own marks or campaign illustration. Do not derive new PayAI primary colors from those partners. See the UI/UX guide for accessibility targets and testing.

<!-- pagebreak -->

## 4. Typography, backgrounds, and illustration

### Typography

**Published repository typography:** Inter, weights 300-700; JetBrains Mono for code, weights 400-600. **Marketing board reference:** Inter Regular, Medium, Semi Bold, and Bold; minimum font size 16px; line height 1.3; letter spacing -2%. The board values describe a general marketing reference rather than a replacement for role-specific typography.

**Observed differences:** the facilitator hero uses Inter Medium 56/66px at -1% tracking; its body uses Inter Regular 16/28px at -1%; CTA labels use Inter Medium 14/20px at 0%. Social banner and recap headings use Inter Bold 80/92px at -4%. A sampled announcement uses Inter Tight Bold 80/90px at 0%.

| Need | Recommended decision |
| --- | --- |
| Core UI or new general brand asset | Start with Inter |
| Continuation of the sampled announcement campaign | Inter Tight Bold is an observed option; match that campaign deliberately |
| Body copy | Prefer 16px or larger; use comfortable leading rather than forcing 1.3 everywhere |
| Large campaign headline | Match the selected template, then check the exported graphic at actual viewing size |
| Small UI label | The source uses 12-14px in places; treat these as exceptions requiring a readability check |

Do not apply -4% tracking to paragraphs. Do not make Inter Tight the universal UI family based on one campaign. Reuse established design-system dependencies rather than treating these documentation aliases as existing variables.

### Background families

**Observed:** light blue-white surfaces, faint grids, blue construction lines/crosshairs, diagonal hatch accents, pale geometric tiles, and deep blue diagonal light streaks. The brand board includes both light and dark background examples. The reviewed landing heroes use light surfaces.

**Recommended:** use the background family that belongs to the chosen template. Keep lines and texture subordinate to type. Avoid mixing every motif in one composition. Dark campaign artwork does not establish a complete dark UI theme.

### Illustration vocabulary

**Observed:** friendly blue-white robots; glossy, softly rounded three-dimensional objects; stacked layers; browser and payment cards; shields and locks; network/partner symbols; subtle shadows; pale perspective grids. An announcement composition may use a partner-colored object within otherwise blue-white artwork, subject to approved partner usage.

**Recommended:** keep one dominant subject, a clear silhouette, consistent lighting, and generous space for the headline. Reuse existing illustration assets first. If generating new art, add logos and text separately from verified assets. A shield is a visual metaphor, not evidence of a security guarantee. A token illustration must not imply unsupported payment methods.

<!-- pagebreak -->

## 5. Social design recipes

### Recap or recurring update

**Observed recipe:** light background; logo near the top; oversized blue/gradient heading; a friendly central character; recurring grid/hatch framing. This family makes a series recognizable even when the date changes.

**Recommended workflow:** duplicate an approved template; update the date everywhere, including text baked into images; retain the headline hierarchy; check the thumbnail crop. Inspect the rendered output and underlying content for stale dates. Do not trust layer names alone.

### Ecosystem highlight

**Observed recipe:** logo at upper left, a robot holding a spotlight, a large centered two-line heading, technical grid details, and a bottom URL pill. Choose one visible label for the series and keep it consistent.

**Recommended:** preserve the structural relationship between subject, light beam, headline, and destination. For a partner-specific asset, add one clear partner message and use the partner's actual logo.

## 6. Announcements and format choices

### Announcement or launch

**Observed recipe:** centered logo; a bold, two-line headline with black and blue emphasis; a large central product/partner metaphor; smaller supporting symbols; pale tiled or gridded background. The sampled headline is Inter Tight Bold 80/90px. A partner accent can add focus without replacing PayAI blue; use it only with appropriate permission.

**Recommended:** state the change first and the customer outcome second. Keep logos legible and avoid invented partner lockups. Verify the release status, product name, date, and destination before publishing.

### Source canvas sizes

| Format in the file | Observed dimensions | Use |
| --- | --- | --- |
| Square recap, supported-on, spotlight | 675 × 675px | Matching square campaign family |
| Twitter/X post template | 1200 × 675px | Landscape campaign graphic |
| Twitter/X banner | 1500 × 500px | Wide profile/header composition |
| Blog thumbnail | 1440 × 810px | Landscape editorial illustration |
| Taller editorial/announcement example | 1440 × 1137px | Source-specific campaign layout |

These are Figma canvas sizes, not verified current platform specifications. Confirm destination requirements before export. Recompose for a new ratio; do not distort the artwork. Keep key text and the logo away from crop-prone edges, and check a phone-sized preview.

<!-- pagebreak -->

## 7. Working instructions for people and agents

### Before designing

1. Read this guide and the UI/UX guide if the deliverable is interactive.
2. Select the brief's audience, channel, objective, and positioning direction.
3. Open the relevant source frame. Record its reference name and whether the work continues an existing campaign or introduces a new one.
4. Reuse the approved logo and appropriate illustration assets. Preserve partner marks.
5. Separate supplied facts from sample copy, statistics, and proposed language.

### During design

- Establish logo, headline, supporting message, visual subject, and CTA/destination in that order.
- Use one dominant headline and a limited number of blue emphasis areas.
- Keep the selected typography and background family consistent.
- Keep important words editable. Do not bake new copy or logos into generated art.
- If a decision has no source support, label it as a recommendation and explain the reason.

### Reusable agent brief

> Create a PayAI [asset type] for [audience] to achieve [outcome]. Use the [x402 facilitator / merchant-layer] direction. Follow PayAI-Brand-Guide.md and use approved reference [name]. Reuse the supplied PayAI logo, documented blue palette, and the typography of the chosen template. Use only these verified facts: [facts]. Mark missing claims for review. Deliver editable text, the required export sizes, reference names, and a short list of deviations from the reference.

### Review before handoff

- Identity: correct logo, proportions, brand spelling, and source asset.
- Message: one clear purpose, coherent positioning route, and a meaningful next step.
- Evidence: claims, quotations, product status, dates, networks, and partner relationships verified by the task owner.
- Visual quality: readable at final size; deliberate crop; coherent lighting; no accidental distortion or clipping.
- Reuse: editable text, named layers, asset source, final dimensions, and export intent recorded.
- Accessibility: readable contrast, captions/alt text for informative artwork, and no essential message carried only by color or an image.

### Handoff record

Recommended fields: asset name; campaign; direction; audience; reference names; verified copy and evidence date; fonts; export dimensions; deviations; reviewer; approval date. These are proposed governance fields, not existing Figma metadata.

<!-- pagebreak -->

## 8. Public references and maintenance

| Public reference | Authority |
| --- | --- |
| [Repository README](../../README.md) | Published colors, typography, logo clear space and size guidance |
| [UI design prompt](../../prompts/ui-design-style.md) | Default product UI appearance and CSS variables |
| [Asset inventory](../../assets/README.md) | Mark, wordmark, and lockup organization |
| [Brand Assets License](../../LICENSE) | Permitted usage and restrictions |
| [Design tokens](PayAI-design-tokens.json) | Separate published product, observed marketing, and proposed values |
| [UI/UX guide](PayAI-UI-UX-Guide.md) | Layout, state, responsive, and accessibility guidance |

### Governance

- Maintain one approved reference per campaign or product surface.
- Both messaging routes remain available; select the one appropriate to the brief.
- The existing product prompt remains the default for application interfaces. Marketing profiles apply only when deliberately selected.
- Inter Tight is an observed campaign option, not the default product family.
- Record proposed decisions separately from approved rules. A public example does not establish a capability, statistic, endorsement, or partnership.
- Review changes to product behavior, claims, partner usage, and availability against maintained sources before publishing.

### Public-edition boundary

Original draft screenshots, sample personal details, raw design-file identifiers, and audit-specific comments are not included. Use the repository's published assets for new work. This edition supplies reusable design guidance without distributing the original working file.
