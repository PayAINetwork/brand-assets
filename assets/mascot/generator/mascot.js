/* PayAI bot generator. Uses the reel engine's drawing code (lib/doodle.js, lib/components.js) and rough.js.
 * payaiSVG(opts) returns a standalone SVG string (logo and font embedded). Options: see AGENTS.md "Generator". */
(function () {
  const MARK_SYMBOL = `<symbol id="payai-mark" viewBox="8 18 484 464"><image href="data:image/svg+xml;base64,${PAYAI_ASSETS.mark}" x="0" y="0" width="500" height="500"/></symbol>`;
  const FONT_CSS = `@font-face{font-family:'Permanent Marker';src:url(data:font/woff2;base64,${PAYAI_ASSETS.marker}) format('woff2');}`;
  document.getElementById('defs').innerHTML = MARK_SYMBOL;
  const style = document.createElement('style');
  style.textContent = FONT_CSS + `@font-face{font-family:'Marker';src:url(data:font/woff2;base64,${PAYAI_ASSETS.marker}) format('woff2');}`;
  document.head.appendChild(style);
  // globals declared in lib/doodle.js
  svg = document.getElementById('stage');
  sceneG = document.getElementById('scene');
  rc = rough.svg(svg);
  mctx = document.createElement('canvas').getContext('2d');

  const NUM = ['s', 'look', 'lookY', 'tilt', 'rot', 'seed', 't'];
  const BOOL = ['glitch', 'flip', 'head', 'blink'];
  function fromQuery() {
    const o = {};
    for (const [k, v] of new URLSearchParams(location.search)) {
      if (NUM.includes(k)) o[k] = +v;
      else if (BOOL.includes(k)) o[k] = v === '1' || v === 'true';
      else o[k] = v;
    }
    return o;
  }

  function draw(opts = {}) {
    const o = Object.assign({ face: 'happy', blink: false }, opts);
    const s = o.s || 1, seed = o.seed || 1234, T = o.t || 0.5;
    const g = el('g', {}, sceneG);
    const D = new Ctx(g, seed, 1, T, T);
    if (o.head) payaiHead(D, 0, 0, s, o); else payaiBot(D, 0, 0, s, o);
    return g;
  }

  function toSVG(g, pad = 24) {
    const bb = g.getBBox();
    const x = bb.x - pad, y = bb.y - pad, w = bb.width + pad * 2, h = bb.height + pad * 2;
    const inner = g.innerHTML.replace(/font-family="Marker"/g, `font-family="'Permanent Marker', cursive"`);
    const defs = (inner.includes('#payai-mark') ? MARK_SYMBOL : '') + (inner.includes('<text') ? `<style>${FONT_CSS}</style>` : '');
    const r = v => Math.round(v * 10) / 10;
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${r(x)} ${r(y)} ${r(w)} ${r(h)}" width="${Math.round(w)}" height="${Math.round(h)}">\n<title>PayAI bot</title>\n<defs>${defs}</defs>\n<g>${inner}</g>\n</svg>\n`;
  }

  window.payaiSVG = function (opts) {
    const g = draw(opts);
    const out = toSVG(g);
    g.remove();
    return out;
  };

  document.fonts.load('60px Marker').then(() => {
    const o = fromQuery();
    const g = draw(o);
    const out = toSVG(g);
    document.getElementById('dl').href = URL.createObjectURL(new Blob([out], { type: 'image/svg+xml' }));
    window.PAYAI_READY = true;
  });
})();
