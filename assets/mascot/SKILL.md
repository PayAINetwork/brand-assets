---
name: payai-mascot
description: "Use the PayAI Network mascot (PayAI bot) in videos, web pages, posts or slides: ready SVG and PNG faces and poses, a generator for new combinations, brand rules and an expression guide."
---

# PayAI bot: mascot kit for coding agents

Status: proposed addition (November 2026). This doodle bot is a hand-drawn rendition of the friendly PayAI robot seen in PayAI social artwork, made for explainer videos and agent-made content. It complements the glossy 3D robot artwork; it does not replace it.

The PayAI bot is the mascot of PayAI Network (@PayAINetwork): a friendly white robot with a blue visor face and the
PayAI mark on its chest. It is drawn in a hand-drawn marker doodle style. Use this kit to put the mascot in videos,
web pages, posts, slides or docs. Personality: helpful, upbeat, competent, a little playful. It is happy by default.

## Start here

1. Read `mascot.json`. It lists every file with its face, pose and when to use it.
2. Need a ready image? Take it from `svg/` (vector, transparent) or `png/` (transparent previews).
   - `svg/faces/` 16 head-only expressions · `svg/poses/` 24 full-body poses · `svg/emotes/` 10 heads with a sign
     (!, ?, sweat, heart ...) · `svg/variants/` role badges, hats, visor states, back view.
3. Need a combination that is not in the kit (any pose × any face × role badge × hat)? Use `generator/` (see below).
4. To see the whole character at once, open `character-sheet/payai-bot-character-sheet.pdf` or
   `character-sheet/*.png`.
5. File names are kebab-case (`svg/poses/point-left.svg`); option names are camelCase (`pose: 'pointLeft'`).
   `mascot.json` gives both.

## Look (do not change)

- Head: rounded TV box (1.3 : 1), about 40% of the height, round ear discs at visor height.
- Visor: blue `#4D63F6` with a white pixel face. The default face is closed ∩ ∩ eyes and a smooth smile.
- Body: white shell, chest plate with the PayAI mark, blue waist ring, short legs, chunky boots.
- Arms: white tubes, blue wrist cuffs, big white mitten gloves.
- Outline navy `#1E2B7A`. Palette: shell `#FFFFFF`, shade `#DCE6FF`, plate `#EAF0FF`, deep `#1D45D8`, joint `#8AA3FF`.

## Brand rules (must)

- The chest logo is the real PayAI mark, embedded unmodified. Never redraw, recolour, stretch, crop or cover it.
- Never mirror an SVG or PNG (CSS `scaleX(-1)`, `transform="scale(-1,1)"`): that flips the logo. To face left, use
  `pointLeft` / `presentLeft`, or the generator option `flip` (it mirrors the body but keeps the logo correct).
- Scale uniformly. Never squash or stretch the bot.
- Keep the bot's colours. Only the visor colour changes, and only for a state: red = rogue or villain, black = off,
  green = OK.
- Never type the word "PayAI" as a logo, and never put another company's logo on the bot. To show that the bot plays
  a product or a role ("CODEX", "AI AGENT"), use a text role badge.
- Follow the repository `LICENSE` (PayAI Brand Assets License) and the logo rules in the repository README: for
  example, do not imply an endorsement or partnership.

## Expressions: the face matches the message

The bot smiles on good news. It looks worried or shocked only on the line that states a risk or a problem, and sad
only on bad news. It never frowns on a happy line.

| The line or moment is ... | Face |
|---|---|
| good news, the solution, "now you can ..." | `happy` |
| a big win, a launch, a number going up | `grin` |
| "we did it", a feature that works | `proud` |
| a tip, an insider detail, a light joke | `wink` |
| something people love | `love` |
| a neutral fact, a setup, listening | `neutral` |
| a question, "how does it work?" | `think` |
| working, building, processing | `focus` |
| a surprise, a reveal | `shock` |
| a risk, a warning, "but there is a catch" | `worried` |
| a loss or failure, bad news | `sad` |
| confidence, "no problem", a gatekeeper | `cool` |
| broken, confused, "it crashed" | `dizzy` |
| waiting, idle, "off" | `sleep` |
| the bad actor attacks / a sneaky trick (villain only) | `angry` / `sly` |

`sly` and `angry` are for a villain (use the `rogue` variant: red visor, red badge). One expression per moment;
change it on the word that turns the meaning ("but", "blocked", "now"). Use at most one emote per scene.

## Poses

`idle` standing by · `wave` hello · `point` / `pointLeft` look at this · `pointUp` next, a heading above ·
`present` / `presentLeft` "here is ..." (palm up beside the object, the signature pose) · `thumbsUp` / `thumbsDown`
approve, reject · `think` pondering · `shrug` it depends · `cheer` / `tada` win, reveal · `facepalm` oops ·
`scratch` hmm · `stop` halt, blocked · `armsCrossed` firm, bouncer · `guard` shield, security · `sign` blank card to
write on · `tablet` screen to fill · `typing` at a laptop · `hold` holds a prop · `walk` · `sit`.

## The bot as the main character

When your content has a character (the product, "the AI agent", the model, a gatekeeper, the user's helper), let the
PayAI bot play it and add a role badge with the part's name. When there is no character, the bot is the guide: it
points at, presents and reacts to the main object. Use one bot per scene unless the story needs two parts (then give
each a badge, and give the villain the red visor).

- Role badge text: in `svg/variants/role-badge.svg` the badge is a `<text>` element (Permanent Marker, embedded).
  Change the text in the file, up to 9 characters, upper case. For longer text, use the generator.
- `sign` and `tablet` poses: place your own text or picture on the card or screen. Keep the chest logo visible.

## Size and placement

- Whole bot at least 175 px tall in a 1080 px wide frame (head-only images at least 70 px tall), so the face reads
  on a phone.
- Put the bot at a free edge or under the main object. It must not cover text or a label.
- Point and look toward the object it talks about.
- On a dark background, the navy outline still works; on busy backgrounds, add a soft white glow or a card behind it.

## Generator (any combination)

`generator/` holds the drawing code (rough.js and the PayAI reel engine). It runs in a browser; no server.
Run the commands below from `assets/mascot/`.

- Browser: open `generator/mascot.html?pose=point&face=happy&role=CODEX` and click "Download SVG".
- Command line (Node 18+, `npm i playwright`, `npx playwright install chromium`):
  `node generator/export.mjs bot.svg --pose wave --face grin --role "AI AGENT" --png bot.png`
- From your own Playwright script: open `mascot.html`, wait for `window.PAYAI_READY`, then
  `await page.evaluate(o => payaiSVG(o), { pose: 'guard', face: 'proud', shield: 'lock' })`.

Options: `pose`, `face` (as above) · `head: true` (head only) · `role`, `roleColor`, `rolePos` (`lanyard` | `top`) ·
`visor` (colour), `glitch` (true) · `hat` (`cap` | `hardhat`), `hatColor` · `emote` (`!` `?` `sweat` `sparkle`
`heart` `zzz` `anger` `dots` `idea` `stars`) · `sign` (text) · `shield` (`check` | `lock`) · `look`, `lookY` (−1…1,
eyes toward an object) · `tilt` (degrees) · `flip` (true) · `view: 'back'` · `s` (scale) · `seed` (a new number
gives a new hand-drawn wobble).

## Files

| Path | What |
|---|---|
| `mascot.json` | palette, proportions, every face, pose, emote and variant with its use and files |
| `svg/` | standalone vector files (logo and font embedded, transparent background) |
| `png/` | transparent PNG previews of the same files |
| `character-sheet/` | the character sheet (6-page PDF and PNG pages) |
| `generator/` | make new combinations |
| `THIRD_PARTY_NOTICES.md` | font and library licenses |
