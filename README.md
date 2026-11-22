# Pay AI Brand Assets

Official Pay AI brand assets for press, partners, and community use.

## Structure
- `assets/mark/` — Standalone mark at sizes `16`, `50`, `250`, `500` with `png/` and `svg/`.
- `assets/wordmark/` — Wordmark variants in `png/` and `svg/`.
- `assets/lockups/` — Combined mark + wordmark organized by orientation:
  - `horizontal/` and `vertical/`, each with `png/` and `svg/`.
- `assets/mascot/` — The PayAI bot as a hand-drawn doodle mascot: faces, poses, emotes and role variants in `svg/` and
  `png/`, a character sheet, `mascot.json`, an agent guide and a generator for new combinations.
- `source/` — Editable originals.

## File formats
- Prefer SVG for web and print when supported; use PNG otherwise.

## Quick usage
- Use transparent variants on colored backgrounds.
- Use `white-bg` when you need a solid background.
- Keep clear space equal to the wordmark x-height.
- Minimum sizes: 16px (favicon), 50px (UI), 250px (product), 500px (print).

## Don’ts
- Don’t recolor, distort, add effects, or modify proportions.
- Don’t place on low-contrast backgrounds.
- Don’t use as part of another logo.

## Colors
- **Primary (Pay AI Blue)**: #4D63F6
- **Text**: #101828
- **Text Muted**: #667085
- **Border**: #e5e7eb
- **Background**: #fafafa
- **Surface**: #ffffff
- **Error**: #DC2626
- **Success**: #059669
- **Warning**: #D97706

## Typography
- **Sans**: Inter (weights 300–700)
- **Mono**: JetBrains Mono (weights 400–600)

## Design guides

- [Brand and UI/UX guides](docs/design-reference/README.md) — Markdown, PDF, and an agent-readable token reference.
- The guides preserve the published product UI rules in this README and in the existing prompt. Observed marketing variants and recommendations are labeled separately.

## Prompts
- `prompts/ui-design-style.md` — Reusable prompt for LLMs/AI coding assistants to build web UIs in the PayAI brand style. Includes CSS variables and font imports.
- `prompts/mascot.md` — Reusable prompt for LLMs/AI coding assistants to use the PayAI bot mascot (files, role, expression and logo rules).

## Licensing
Use of these assets is governed by the Brand Assets License in `LICENSE`.
For permissions and press inquiries: info@payai.network
