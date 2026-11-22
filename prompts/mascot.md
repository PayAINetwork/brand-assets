# PayAI Mascot Prompt

Use this prompt when asking an LLM or AI coding assistant to put the PayAI bot (the mascot) into a video, web page,
social post, slide or doc.

For the full guide, files and generator, see [assets/mascot/AGENTS.md](../assets/mascot/AGENTS.md).

---

## Prompt

Use the PayAI bot mascot from `assets/mascot/` in the PayAI brand-assets repo:

- **Read first**: `assets/mascot/AGENTS.md` (rules and expression guide) and `assets/mascot/mascot.json` (every face,
  pose, emote and variant with when to use it and its files).
- **Files**: take ready images from `assets/mascot/svg/` (vector, transparent) or `assets/mascot/png/`. For any other
  pose × face × role combination, use `assets/mascot/generator/`.
- **Role**: when the content has a character (the product, "the AI agent", a gatekeeper), the bot plays it with a text
  role badge. Otherwise it is the guide that points at and reacts to the main object. One bot per scene.
- **Face matches the message**: happy, grin or proud on good news; worried or shocked only on the line that states a
  risk; sad only on bad news; sly and angry only for a villain (red visor). Never a frown on a happy line.
- **Logo**: the chest logo is the real PayAI mark. Never redraw, recolour, stretch, cover or mirror it. Never mirror
  the images; use the left-facing poses or the generator's `flip` option.
- **Look**: keep the bot's colours and proportions; scale uniformly. Only the visor colour changes for a state
  (red = rogue, black = off, green = OK). Never put another company's logo on the bot.
- **Size**: the whole bot at least 175 px tall in a 1080 px wide frame; keep it off text and labels.
