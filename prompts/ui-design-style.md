# PayAI UI Design Style Prompt

Use this prompt when asking an LLM or AI coding assistant to build a web UI that matches the PayAI brand.

For page patterns, responsive behavior, accessibility, and deliberately selected marketing variants, see the [design guides](../docs/design-reference/README.md). This prompt remains the default product UI style. Always retain a visible keyboard-focus indicator; "No outlines" below does not mean removing focus indication.

---

## Prompt

Design this UI to match the PayAI brand style:

- **Theme**: Light and minimal. Clean white (#ffffff) surfaces on a near-white (#fafafa) background. No dark mode, no gradients on backgrounds.
- **Colors**: Use blue (#4D63F6) as the sole accent color, sparingly — only for interactive elements (active tabs, links, buttons, focus rings). Everything else is grayscale. Text is near-black (#101828), secondary text is medium gray (#667085), borders are light gray (#e5e7eb).
- **Typography**: Inter for all text, JetBrains Mono for code. Clean weights — 400 for body, 500 for labels/buttons, 600-700 for headings.
- **Cards/Surfaces**: White background, 1px solid light gray border, 12px border radius, subtle box-shadow (0 1px 2px rgba(0,0,0,0.04)). No heavy shadows or elevation.
- **Buttons**: Primary is blue bg with white text, 12px radius. Secondary/ghost buttons have a 1px gray border on white. No glow effects.
- **Inputs**: White background, 1px gray border, 8px radius. On focus, border turns accent blue. No outlines.
- **Tabs/Navigation**: Text-only with a 2px bottom border on active (accent blue). No filled tab backgrounds.
- **Spacing**: Generous whitespace. Let elements breathe.
- **Overall vibe**: Professional, restrained, modern SaaS. Think Stripe or Linear — not flashy, not playful. The design should feel invisible and let the content do the work.

---

## CSS Variables Reference

```css
:root {
  --bg: #fafafa;
  --surface: #ffffff;
  --surface-hover: #f5f5f5;
  --border: #e5e7eb;
  --text: #101828;
  --text-muted: #667085;
  --accent: #4D63F6;
  --accent-hover: #2F47E8;
  --accent-dim: rgba(77, 99, 246, 0.08);
  --error: #DC2626;
  --success: #059669;
  --warning: #D97706;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

## Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```
