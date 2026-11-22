/* doodle.js — engine for "doodle notebook" reels.
 * Frame-exact: the page draws one frame per renderAt(t) call. Nothing runs on its own clock.
 * Scenes are plain JS (videos/<id>/scenes.js): scene('beatId', S => { S.add(at, draw, opts) }).
 */
const NS = 'http://www.w3.org/2000/svg';
const FPS = 30;
const BOIL = 6;                 // new rough seed every 6 frames = 5 fps line "boil"
const CAP_Y = 372;              // caption label centre
const C = {
  ink: '#1f1d1b', paper: '#F5F1E6', white: '#FFFDF8', red: '#D9412E',
  // PayAI blues (brand-assets: primary #4D63F6, strong #1D45D8, tint #8AA3FF, pale #D7E3FF)
  blue: '#4D63F6', strongBlue: '#1D45D8', lblue: '#8AA3FF', sky: '#D7E3FF', ocean: '#9CC4EE', yellow: '#F6D34A', green: '#35A457', lgreen: '#9FD9A6',
  orange: '#EE8A2A', gray: '#8E8A84', lgray: '#D3CEC4', dgray: '#3A3836', purple: '#7B4FD0',
  pink: '#F2A7B5', sand: '#EBCB8B', wood: '#C98A4B', brick: '#C4553D', gold: '#E7B83C',
  screen: '#2D2C2B', term: '#232220', termGreen: '#7CE38B', termRed: '#FF6B5E',
};

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const easeOut = x => 1 - Math.pow(1 - x, 3);
const easeIn = x => x * x * x;
const easeInOut = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const easeOutBack = x => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const easeOutBounce = x => { const n1 = 7.5625, d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x; if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + .75;
  if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + .9375; return n1 * (x -= 2.625 / d1) * x + .984375; };
const norm = w => w.toLowerCase().replace(/[^a-z0-9.]/g, '').replace(/^\.+|\.+$/g, '');
const hash = s => { let h = 7; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 100003; return h; };

let svg, sceneG, camG, capG, brandG, rc, mctx, TL, COMPILED = [], F = 0;
const WATERMARK = { x: 540, y: 196, w: 210 };   // PayAI lockup, top centre, below the Instagram top bar

function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

function measure(text, size, font = 'Hand', ls = 0) {
  mctx.font = `${size}px ${font}`;
  return mctx.measureText(text).width + ls * text.length;
}

/* Drawing context. All sizes are in the component's local units; stroke widths are
 * given in screen px and divided by the current scale so lines look the same everywhere. */
class Ctx {
  constructor(g, seed, scale = 1, T = 0, t = 0) { this.g = g; this.seed = seed; this.scale = scale; this.T = T; this.t = t; this.n = 0; }
  o(opts) {
    const o = Object.assign({ roughness: 1.1, bowing: 0.9, stroke: C.ink, strokeWidth: 5, seed: (this.seed + (this.n++) * 7) % 2147483 + 1 }, opts || {});
    o.strokeWidth = o.strokeWidth / this.scale;
    if (o.fill && !o.fillStyle) o.fillStyle = 'solid';
    if (o.fillStyle && o.fillStyle !== 'solid') {
      o.fillWeight = (o.fillWeight || 3) / this.scale;
      o.hachureGap = (o.hachureGap || 11) / this.scale;
    }
    if (o.dash) { o.strokeLineDash = o.dash.map(d => d / this.scale); delete o.dash; }
    return o;
  }
  add(n) { this.g.appendChild(n); return n; }
  line(x1, y1, x2, y2, o) { return this.add(rc.line(x1, y1, x2, y2, this.o(o))); }
  rect(x, y, w, h, o) { return this.add(rc.rectangle(x, y, w, h, this.o(o))); }
  rrect(x, y, w, h, r, o) {   // rounded rectangle
    r = Math.min(r, w / 2, h / 2);
    const d = `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;
    return this.add(rc.path(d, this.o(o)));
  }
  ellipse(cx, cy, w, h, o) { return this.add(rc.ellipse(cx, cy, w, h, this.o(o))); }
  circle(cx, cy, d, o) { return this.add(rc.circle(cx, cy, d, this.o(o))); }
  poly(pts, o) { return this.add(rc.polygon(pts, this.o(o))); }
  lines(pts, o) { return this.add(rc.linearPath(pts, this.o(o))); }
  curve(pts, o) { return this.add(rc.curve(pts, this.o(o))); }
  path(d, o) { return this.add(rc.path(d, this.o(o))); }
  arc(cx, cy, w, h, a1, a2, closed, o) { return this.add(rc.arc(cx, cy, w, h, a1, a2, !!closed, this.o(o))); }
  dot(cx, cy, d, fill = C.ink) { return this.add(rc.circle(cx, cy, d, this.o({ fill, stroke: 'none', roughness: 0.3 }))); }
  text(str, x, y, o = {}) {
    const t = el('text', {
      x, y, 'font-family': o.font || 'Hand', 'font-size': o.size || 44, fill: o.fill || C.ink,
      'text-anchor': o.anchor || 'middle', 'dominant-baseline': 'central', 'letter-spacing': o.ls || 0,
      'font-weight': o.weight || 'normal',
    }, this.g);
    if (o.stroke) { t.setAttribute('stroke', o.stroke); t.setAttribute('stroke-width', o.strokeWidth || 6); t.setAttribute('paint-order', 'stroke'); t.setAttribute('stroke-linejoin', 'round'); }
    if (o.rotate) t.setAttribute('transform', `rotate(${o.rotate} ${x} ${y})`);
    if (o.opacity != null) t.setAttribute('opacity', o.opacity);
    t.textContent = str;
    t.dataset.kind = 'text';
    return t;
  }
  /* child context at (x,y), scale s, rotation r (deg) */
  at(x, y, s = 1, r = 0) {
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${r}) scale(${s})` }, this.g);
    const c = new Ctx(g, this.seed + (this.n++) * 17, this.scale * s, this.T, this.t);
    return c;
  }
  opacity(v) { this.g.setAttribute('opacity', v); return this; }
}

/* Hand-drawn "draw on": stroke paths draw in order, fills and text fade in after. */
function applyDraw(g, p) {
  if (p >= 1) return;
  const paths = [...g.querySelectorAll('path')];
  const strokes = paths.filter(e => e.getAttribute('stroke') && e.getAttribute('stroke') !== 'none');
  const fills = paths.filter(e => !strokes.includes(e));
  const N = strokes.length;
  strokes.forEach((e, i) => {
    const start = N > 1 ? (i / (N - 1)) * 0.65 : 0;
    const k = clamp((p - start) / 0.35);
    e.setAttribute('pathLength', '1');
    e.setAttribute('stroke-dasharray', '1 1');
    e.setAttribute('stroke-dashoffset', String(1 - k));
  });
  const fk = clamp((p - 0.35) / 0.5);
  fills.forEach(e => e.setAttribute('opacity', fk));
  g.querySelectorAll('text').forEach(e => e.setAttribute('opacity', clamp((p - 0.45) / 0.45)));
  g.querySelectorAll('image, use').forEach(e => e.setAttribute('opacity', fk));
}

/* ---------- scenes ---------- */
window.SCENES = {};
function scene(id, fn) { window.SCENES[id] = fn; }

function resolveAt(at, beat) {
  if (at == null) return 0;
  if (typeof at === 'number') return at;
  if (typeof at === 'function') return at(beat);
  let m = /^(w|we):(.+?)(?:#(\d+))?([+-][\d.]+)?$/.exec(at);
  if (m) {
    const key = norm(m[2]); let nth = +(m[3] || 1);
    for (const w of beat.words) {
      if (norm(w.text) === key && --nth === 0) return (m[1] === 'w' ? w.start : w.end) - beat.start + (+(m[4] || 0));
    }
    console.warn('word not found:', at, 'in beat', beat.id);
    return 0;
  }
  m = /^end([+-][\d.]+)?$/.exec(at);
  if (m) return (beat.end - beat.start) + (+(m[1] || 0));
  return +at || 0;
}

const SFX_BY_ANIM = { draw: 'scribble', pop: 'pop', slam: 'stamp', drop: 'thud', slide: 'whoosh', type: 'type' };

function compile() {
  COMPILED = TL.beats.map(beat => {
    const S = {
      beat, els: [], zoom: [1, 1.035], focus: [540, 1050],
      add(at, draw, o = {}) { const E = Object.assign({ at, draw }, o); this.els.push(E); return E; },
      w(k, off = 0) { return resolveAt('w:' + k, beat) + off; },     // time of a spoken word in this beat
      end(off = 0) { return beat.end - beat.start + off; },
    };
    const fn = window.SCENES[beat.scene];
    if (fn) fn(S, beat); else console.warn('no scene for', beat.scene);
    S.els.forEach((E, i) => {
      E.anim = E.anim || 'draw';
      E.dur = E.dur || (E.anim === 'draw' ? 0.5 : E.anim === 'slam' ? 0.22 : E.anim === 'drop' ? 0.55 : 0.32);
      E._at = resolveAt(E.at, beat);
      E._until = E.until != null ? resolveAt(E.until, beat) : null;
      E.seed = E.seed || ((i + 1) * 1009 + hash(beat.id)) % 99991;
      E.sfx = E.sfx === undefined ? (SFX_BY_ANIM[E.anim] || null) : E.sfx;
    });
    return S;
  });
}

function renderEl(E, tb) {
  if (tb < E._at) return;
  const exitDur = E.exitDur ?? 0.15;
  if (E._until != null && tb >= E._until + exitDur) return;
  const lt = tb - E._at;
  const outer = el('g', {}, sceneG);
  const g = el('g', {}, outer);
  const boil = E.boil === false ? 0 : Math.floor(F / BOIL) * 101;
  const D = new Ctx(g, E.seed + boil, 1, tb, lt);
  E.draw(D, lt, tb);
  let p = 1, s = 1, op = 1, dx = 0, dy = 0, rot = 0;
  const k = clamp(lt / E.dur);
  switch (E.anim) {
    case 'draw': p = k; break;
    case 'pop': s = 0.35 + 0.65 * easeOutBack(k); op = clamp(lt / 0.06); break;
    case 'fade': op = k; break;
    case 'slam': s = 1 + 1.3 * (1 - easeOut(k)); op = clamp(lt / 0.05); break;
    case 'drop': dy = -320 * (1 - easeOutBounce(k)); break;
    case 'slide': { const [fx, fy] = E.from || [-400, 0]; dx = fx * (1 - easeOut(k)); dy = fy * (1 - easeOut(k)); break; }
  }
  if (E._until != null && tb >= E._until) { const ek = clamp((tb - E._until) / exitDur); op *= 1 - ek; s *= 1 - 0.25 * ek; }
  if (E.wiggle) rot += Math.sin((tb + (E.seed % 13) * 0.1) * E.wiggle[1] * 2 * Math.PI) * E.wiggle[0];
  if (E.move) { const m = E.move(lt, tb) || []; dx += m[0] || 0; dy += m[1] || 0; rot += m[2] || 0; }
  applyDraw(g, p);
  const cx = E.cx ?? 540, cy = E.cy ?? 1050;
  outer.setAttribute('transform', `translate(${dx} ${dy}) translate(${cx} ${cy}) rotate(${rot}) scale(${s}) translate(${-cx} ${-cy})`);
  if (op < 1) outer.setAttribute('opacity', op.toFixed(3));
}

/* ---------- captions ---------- */
const CAP = { size: 68, lh: 86, maxW: 860, padX: 40, padY: 26, font: 'Hand', ls: 1 };
const capCache = new Map();

function layoutChunk(ch) {
  if (capCache.has(ch)) return capCache.get(ch);
  const space = measure(' ', CAP.size, CAP.font) + 4;
  const words = ch.words.map(w => ({ w, txt: w.text.toUpperCase(), width: measure(w.text.toUpperCase(), CAP.size, CAP.font, CAP.ls) }));
  const lines = [[]]; let lw = 0;
  for (const it of words) {
    const add = (lines[lines.length - 1].length ? space : 0) + it.width;
    if (lines[lines.length - 1].length && lw + add > CAP.maxW) { lines.push([]); lw = 0; }
    lw += (lines[lines.length - 1].length ? space : 0) + it.width;
    lines[lines.length - 1].push(it);
  }
  const widths = lines.map(l => l.reduce((a, it, i) => a + it.width + (i ? space : 0), 0));
  const boxW = Math.max(...widths) + CAP.padX * 2;
  const boxH = lines.length * CAP.lh + CAP.padY * 2;
  lines.forEach((l, li) => {
    let x = 540 - widths[li] / 2;
    const y = CAP_Y - boxH / 2 + CAP.padY + CAP.lh * (li + 0.5);
    l.forEach(it => { it.x = x; it.y = y; x += it.width + space; });
  });
  const L = { lines, boxW, boxH };
  capCache.set(ch, L);
  return L;
}

function renderCaption(t, beat) {
  capG.replaceChildren();
  if (!beat.chunks.length) return;
  let ci = 0;
  beat.chunks.forEach((c, i) => { if (t >= c.start - 0.06) ci = i; });
  const ch = beat.chunks[ci];
  const L = layoutChunk(ch);
  const idx = TL.beats.indexOf(beat) * 10 + ci;
  const rot = (idx % 2 ? 1 : -1) * 1.1;
  const g = el('g', { transform: `rotate(${rot} 540 ${CAP_Y})` }, capG);
  const D = new Ctx(g, 4242 + idx * 31);
  const x0 = 540 - L.boxW / 2, y0 = CAP_Y - L.boxH / 2;
  const box = D.rect(x0, y0, L.boxW, L.boxH, { fill: C.white, stroke: '#CFC6B3', strokeWidth: 2.5, roughness: 0.8 });
  box.setAttribute('filter', 'url(#shadow)');
  // tape
  D.at(x0 + 18, y0 + 4, 1, -32).rect(-34, -14, 68, 28, { fill: '#E8DDBE', stroke: 'none', roughness: 0.5 }).setAttribute('opacity', .9);
  D.at(x0 + L.boxW - 18, y0 + 4, 1, 32).rect(-34, -14, 68, 28, { fill: '#E8DDBE', stroke: 'none', roughness: 0.5 }).setAttribute('opacity', .9);
  for (const line of L.lines) for (const it of line) {
    if (t < it.w.start - 0.06) continue;
    if (it.w.hi) {
      const k = clamp((t - (it.w.start - 0.06)) / 0.12);
      D.rect(it.x - 8, it.y - CAP.size * 0.5, (it.width + 16) * easeOut(k), CAP.size * 1.0,
        { fill: C.yellow, stroke: 'none', roughness: 1.4, fillStyle: 'solid' });
    }
    D.text(it.txt, it.x, it.y + 3, { size: CAP.size, font: CAP.font, anchor: 'start', ls: CAP.ls, fill: C.ink });
  }
}

/* ---------- public API ---------- */
function beatAt(t) {
  let bi = TL.beats.findIndex(b => t >= b.start && t < b.end);
  if (bi < 0) bi = t < 0 ? 0 : TL.beats.length - 1;
  return bi;
}

function renderAt(t) {
  F = Math.round(t * FPS);
  const bi = beatAt(t), beat = TL.beats[bi], S = COMPILED[bi];
  const tb = t - beat.start;
  sceneG.replaceChildren();
  const k = easeInOut(clamp(tb / (beat.end - beat.start)));
  const z = lerp(S.zoom[0], S.zoom[1], k);
  const [fx, fy] = S.focus;
  camG.setAttribute('transform', `translate(${fx} ${fy}) scale(${z}) translate(${-fx} ${-fy})`);
  for (const E of S.els) renderEl(E, tb);
  renderCaption(t, beat);
  return bi;
}

function cues() {
  const out = [];
  COMPILED.forEach(S => S.els.forEach(E => { if (E.sfx) out.push({ t: +(S.beat.start + E._at).toFixed(3), sfx: E.sfx, beat: S.beat.id }); }));
  return out.sort((a, b) => a.t - b.t);
}

async function init() {
  svg = document.getElementById('stage');
  sceneG = document.getElementById('scene');
  camG = document.getElementById('cam');
  capG = document.getElementById('caption');
  brandG = document.getElementById('brandmark');
  rc = rough.svg(svg);
  mctx = document.createElement('canvas').getContext('2d');
  await Promise.all([document.fonts.load(`${CAP.size}px Hand`), document.fonts.load('60px Marker'), document.fonts.load('40px Note'),
    document.fonts.load('600 44px Inter'), document.fonts.load('700 44px Inter')]);
  await document.fonts.ready;
  // preload the brand files so <use> of the symbols paints on the very first frame
  await Promise.all(['brand/mark.svg', 'brand/lockup.svg'].map(src => new Promise(r => { const im = new Image(); im.onload = im.onerror = r; im.src = src; })));
  TL = window.TIMELINE;
  if ((TL.brand || {}).watermark !== false) {
    const h = WATERMARK.w * 146 / 484;
    el('use', { href: '#payai-lockup', x: WATERMARK.x - WATERMARK.w / 2, y: WATERMARK.y - h / 2, width: WATERMARK.w, height: h }, brandG);
  }
  await new Promise(r => setTimeout(r, 150));
  compile();
  const t0 = +(new URLSearchParams(location.search).get('t') || 0);
  renderAt(t0);
  window.DOODLE_READY = true;
}

window.DOODLE = { init, renderAt, cues, get timeline() { return TL; } };
