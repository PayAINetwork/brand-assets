/* components.js — reusable doodle parts. Each part draws around its own origin.
 * Signature: part(D, x, y, scale, opts). D is a Ctx (see doodle.js).
 * Faces: happy | grin | worried | shock | sad | sly | smug | angry | dizzy | sleep | neutral
 */
const SKIN = '#FFFDF8';

function face(D, mood = 'happy', o = {}) {
  const er = o.er || 30, ex = o.ex || 40, ey = o.ey || 0;
  const blink = !['shock', 'dizzy'].includes(mood) && ((Math.floor(D.T * 30) + (o.phase || 0)) % 97) > 93;   // never blink on frame 0 (cover frame)
  for (const sx of [-1, 1]) {
    const x = sx * ex;
    if (mood === 'dizzy') {
      D.line(x - er * .4, ey - er * .4, x + er * .4, ey + er * .4, { strokeWidth: 5 });
      D.line(x + er * .4, ey - er * .4, x - er * .4, ey + er * .4, { strokeWidth: 5 });
    } else if (blink || mood === 'sleep') {
      D.line(x - er * .5, ey + 2, x + er * .5, ey + 2, { strokeWidth: 5, roughness: .6 });
    } else {
      D.ellipse(x, ey, er, er * 1.3, { fill: '#fff', strokeWidth: 4, roughness: .5 });
      const pd = mood === 'shock' ? er * .32 : er * .55;
      const lx = (o.look || 0) * er * .18, ly = (o.lookY || 0) * er * .2 + ((mood === 'smug' || mood === 'sly') ? er * .14 : 0);
      D.dot(x + lx, ey + ly + 3, pd, o.pupil || C.ink);
      if (mood === 'smug' || mood === 'sly') D.line(x - er * .55, ey - er * .12, x + er * .55, ey - er * .12, { strokeWidth: 5 });
    }
    const inner = x - sx * er * .5, outer = x + sx * er * .55, by = ey - er * 1.0;
    if (mood === 'worried' || mood === 'sad') D.line(outer, by + 5, inner, by - 9, { strokeWidth: 5 });
    if (mood === 'angry' || mood === 'sly') D.line(outer, by - 7, inner, by + 8, { strokeWidth: 5 });
    if (mood === 'shock') D.line(outer, by - 10, inner, by - 12, { strokeWidth: 5 });
  }
  const my = o.my ?? (ey + er * 1.2);
  switch (mood) {
    case 'happy': D.arc(0, my - 8, er * 1.5, er * 1.1, Math.PI * .12, Math.PI * .88, false, { strokeWidth: 5 }); break;
    case 'grin': D.arc(0, my - 10, er * 1.7, er * 1.5, 0, Math.PI, true, { fill: '#fff', strokeWidth: 5 }); break;
    case 'worried': D.curve([[-er * .6, my], [-er * .2, my - 5], [er * .2, my + 5], [er * .6, my]], { strokeWidth: 5 }); break;
    case 'shock': D.ellipse(0, my + 4, er * .7, er * .9, { fill: C.ink, roughness: .5 }); break;
    case 'sad': D.arc(0, my + 10, er * 1.3, er * .9, Math.PI * 1.15, Math.PI * 1.85, false, { strokeWidth: 5 }); break;
    case 'sly': case 'smug': D.curve([[-er * .55, my + 2], [er * .1, my + 6], [er * .65, my - 8]], { strokeWidth: 5 }); break;
    case 'angry': D.line(-er * .5, my + 4, er * .5, my, { strokeWidth: 5 }); break;
    case 'dizzy': D.curve([[-er * .6, my], [-er * .3, my - 6], [0, my + 4], [er * .3, my - 6], [er * .6, my]], { strokeWidth: 5 }); break;
    default: D.line(-er * .45, my, er * .45, my, { strokeWidth: 5 });
  }
}

function laptop(D, x, y, s = 1, o = {}) {
  const L = D.at(x, y, s, o.rot || 0);
  L.rrect(-175, -235, 350, 240, 14, { fill: C.screen, roughness: .8 });
  L.rect(-155, -215, 310, 198, { fill: o.screenFill || C.sky, stroke: 'none', roughness: .6 });
  if (o.screen) o.screen(L);                       // custom screen content, local box x -155..155, y -215..-17
  else if (o.mood !== false) face(L.at(0, -122), o.mood || 'happy', { er: 34, ex: 52, phase: o.phase || 0, look: o.look });
  L.poly([[-210, 8], [210, 8], [245, 58], [-245, 58]], { fill: C.lgray, roughness: .8 });
  L.line(-55, 32, 55, 32, { strokeWidth: 4 });
  return L;
}

function hammer(D, x, y, s = 1, rot = 0) {   // origin = grip
  const H = D.at(x, y, s, rot);
  H.rect(-9, -150, 18, 170, { fill: C.wood });
  H.rrect(-62, -200, 124, 56, 8, { fill: C.dgray });
  return H;
}

function robot(D, x, y, s = 1, o = {}) {      // origin = belly; ~370 tall
  const R = D.at(x, y, s, o.rot || 0);
  R.line(-30, 80, -34, 135, { strokeWidth: 7 }); R.line(30, 80, 34, 135, { strokeWidth: 7 });
  R.rrect(-60, 128, 48, 18, 8, { fill: C.dgray }); R.rrect(12, 128, 48, 18, 8, { fill: C.dgray });
  const armL = o.armL || [[-68, -20], [-112, 30], [-118, 72]];
  const armR = o.armUp ? [[68, -20], [112, -70], [118, -126]] : (o.armR || [[68, -20], [112, 30], [118, 72]]);
  R.curve(armL, { strokeWidth: 7 }); R.curve(armR, { strokeWidth: 7 });
  R.circle(armL[2][0], armL[2][1], 24, { fill: C.lgray }); R.circle(armR[2][0], armR[2][1], 24, { fill: C.lgray });
  R.rrect(-68, -45, 136, 128, 18, { fill: o.body || '#E6E8EC' });
  { const L = o.label || 'CODEX'; R.text(L, 0, 22, { font: 'Marker', size: L.length > 7 ? 21 : L.length > 5 ? 26 : 30, fill: C.ink }); }
  R.rect(-14, -60, 28, 18, { fill: C.lgray });
  R.line(0, -178, 0, -206, { strokeWidth: 5 }); R.circle(0, -214, 22, { fill: C.red });
  R.rrect(-90, -180, 180, 124, 22, { fill: o.head || '#BFC6CF' });
  R.rrect(-70, -164, 140, 92, 14, { fill: '#fff', roughness: .7 });
  face(R.at(0, -122), o.mood || 'happy', { er: 24, ex: 30, phase: o.phase || 11, look: o.look, pupil: o.pupil });
  R.circle(-94, -118, 16, { fill: C.lgray }); R.circle(94, -118, 16, { fill: C.lgray });
  return R;
}

function mascot(D, x, y, s = 1, o = {}) {      // origin = hips; PayAI narrator
  const M = D.at(x, y, s, o.rot || 0);
  M.poly([[-48, -8], [-4, -8], [-12, 150], [-46, 150]], { fill: C.dgray });
  M.poly([[4, -8], [48, -8], [46, 150], [12, 150]], { fill: C.dgray });
  M.ellipse(-34, 158, 64, 26, { fill: C.ink }); M.ellipse(38, 158, 64, 26, { fill: C.ink });
  const arms = {
    idle: [[[-90, -128], [-108, -50], [-100, 15]], [[90, -128], [108, -50], [100, 15]]],
    point: [[[-90, -128], [-108, -50], [-100, 15]], [[90, -128], [170, -150], [240, -165]]],
    scratch: [[[-90, -128], [-108, -50], [-100, 15]], [[90, -128], [130, -215], [62, -300]]],
    wave: [[[-90, -128], [-108, -50], [-100, 15]], [[90, -128], [155, -215], [165, -315]]],
    shrug: [[[-90, -128], [-160, -110], [-175, -180]], [[90, -128], [160, -110], [175, -180]]],
  }[o.pose || 'idle'];
  M.poly([[-62, -185], [62, -185], [100, -140], [80, -116], [58, -134], [56, 0], [-56, 0], [-58, -134], [-80, -116], [-100, -140]], { fill: '#fff' });
  payaiMark(M, 0, -92, 62);
  for (const a of arms) { M.curve(a, { strokeWidth: 7 }); M.circle(a[2][0], a[2][1], 30, { fill: SKIN }); }
  M.line(0, -185, 0, -202, { strokeWidth: 6 });
  M.circle(0, -262, 126, { fill: SKIN });
  M.poly([[-63, -268], [-60, -302], [-42, -312], [-34, -338], [-12, -322], [4, -348], [20, -324], [42, -340], [48, -310], [64, -298], [63, -266], [40, -292], [0, -298], [-40, -292]], { fill: C.ink, roughness: .9 });
  face(M.at(0, -250), o.mood || 'happy', { er: 17, ex: 23, phase: o.phase || 37 });
  return M;
}

function folder(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot || 0);
  G.poly([[-170, -122], [-60, -122], [-36, -96], [170, -96], [170, 110], [-170, 110]], { fill: o.back || '#D9A63A' });
  G.poly([[-176, -66], [176, -66], [170, 110], [-170, 110]], { fill: o.color || C.gold });
  if (o.label) G.text(o.label, 0, 24, { font: 'Marker', size: o.size || 46 });
  return G;
}

function doc(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot || 0);
  G.poly([[-70, -95], [38, -95], [70, -63], [70, 95], [-70, 95]], { fill: o.fill || '#fff' });
  G.poly([[38, -95], [38, -63], [70, -63]], { fill: C.lgray, strokeWidth: 4 });
  for (let i = 0; i < 4; i++) G.line(-45, -38 + i * 30, 44 - (i % 2) * 22, -38 + i * 30, { strokeWidth: 5, stroke: o.lineColor || C.gray });
  if (o.label) G.text(o.label, 0, o.labelY ?? 140, { font: 'Marker', size: o.size || 44, fill: o.labelColor || C.ink });
  return G;
}

function padlock(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot || 0);
  G.arc(o.open ? 22 : 0, -30, 70, 96, Math.PI, Math.PI * 2, false, { strokeWidth: 12, stroke: C.dgray, roughness: .7 });
  G.rrect(-50, -32, 100, 84, 12, { fill: o.color || C.gold });
  G.dot(0, 0, 20); G.line(0, 4, 0, 26, { strokeWidth: 7 });
  return G;
}

function pencil(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot ?? -35);
  G.poly([[-110, -16], [70, -16], [70, 16], [-110, 16]], { fill: C.yellow });
  G.poly([[70, -16], [112, 0], [70, 16]], { fill: '#F1D2A6' });
  G.poly([[98, -5], [112, 0], [98, 5]], { fill: C.ink, stroke: 'none' });
  G.rect(-136, -16, 26, 32, { fill: C.pink });
  G.rect(-112, -16, 10, 32, { fill: C.lgray });
  return G;
}

function check(D, x, y, s = 1, col = C.green) {
  const G = D.at(x, y, s);
  G.lines([[-42, 0], [-10, 34], [48, -42]], { stroke: col, strokeWidth: 15, roughness: 1.1 });
  return G;
}

function xmark(D, x, y, s = 1, col = C.red) {
  const G = D.at(x, y, s);
  G.line(-40, -40, 40, 40, { stroke: col, strokeWidth: 15 }); G.line(40, -40, -40, 40, { stroke: col, strokeWidth: 15 });
  return G;
}

function globe(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s);
  G.circle(0, 0, 300, { fill: C.ocean, stroke: 'none' });
  G.poly([[-118, -60], [-70, -112], [-20, -96], [6, -58], [-30, -30], [-40, 10], [-92, 18], [-128, -12]], { fill: C.green, stroke: 'none', roughness: 1.6 });
  G.poly([[30, -20], [90, -60], [128, -20], [110, 40], [60, 80], [36, 40]], { fill: C.green, stroke: 'none', roughness: 1.6 });
  G.poly([[-50, 70], [0, 60], [20, 110], [-30, 128]], { fill: C.green, stroke: 'none', roughness: 1.6 });
  G.ellipse(0, 0, 150, 300, { strokeWidth: 3, stroke: C.blue, roughness: .8 });
  G.line(-150, 0, 150, 0, { strokeWidth: 3, stroke: C.blue });
  G.circle(0, 0, 300, { strokeWidth: 6 });
  if (o.mood) face(G.at(0, 10), o.mood, { er: 30, ex: 44 });
  return G;
}

function noSign(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  G.circle(0, 0, 370, { stroke: C.red, strokeWidth: 22, roughness: .9 });
  G.line(-128, -128, 128, 128, { stroke: C.red, strokeWidth: 22, roughness: .9 });
  return G;
}

function stamp(D, x, y, text, o = {}) {
  const size = o.size || 72, col = o.color || C.red;
  const w = measure(text, size, 'Marker') + 64, h = size * 1.5;
  const G = D.at(x, y, 1, o.rot ?? -8);
  G.rect(-w / 2, -h / 2, w, h, { fill: 'rgba(255,253,248,0.9)', stroke: 'none', roughness: .6 });
  G.rect(-w / 2, -h / 2, w, h, { stroke: col, strokeWidth: 8, roughness: 1.5 });
  G.rect(-w / 2 + 11, -h / 2 + 11, w - 22, h - 22, { stroke: col, strokeWidth: 3, roughness: 1.5 });
  G.text(text, 0, 4, { font: 'Marker', size, fill: col });
  return G;
}

function tag(D, x, y, text, o = {}) {
  const size = o.size || 46, font = o.font || 'Hand';
  const T = o.upper === false ? text : text.toUpperCase();
  const w = measure(T, size, font, 1) + (o.padX || 32) * 2, h = size * 1.6;
  const G = D.at(x, y, 1, o.rot ?? -3);
  const r = G.rect(-w / 2, -h / 2, w, h, { fill: o.bg || C.white, stroke: o.border || '#CFC6B3', strokeWidth: 2.5, roughness: .8 });
  r.setAttribute('filter', 'url(#shadow)');
  if (o.tape !== false) G.at(o.tapeX || 0, -h / 2 + 2, 1, o.tapeRot || 4).rect(-36, -13, 72, 26, { fill: '#E8DDBE', stroke: 'none', roughness: .5 }).setAttribute('opacity', .9);
  G.text(T, 0, 3, { font, size, fill: o.color || C.ink, ls: 1 });
  return G;
}

function container(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s);
  G.rect(-280, -140, 560, 280, { fill: o.color || '#E0662F' });
  for (let i = -244; i <= 170; i += 36) G.line(i, -116, i, 116, { stroke: '#A9441C', strokeWidth: 4, roughness: .6 });
  G.rect(196, -140, 84, 280, { fill: '#C9562A' });
  G.line(238, -140, 238, 140, { strokeWidth: 4 });
  G.line(220, -100, 220, 100, { stroke: C.dgray, strokeWidth: 6 }); G.line(256, -100, 256, 100, { stroke: C.dgray, strokeWidth: 6 });
  if (o.label) G.text(o.label, -42, 4, { font: 'Marker', size: o.size || 66, fill: '#fff', stroke: '#7A2C10', strokeWidth: 10 });
  return G;
}

function phone(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot || 0);
  G.rrect(-78, -152, 156, 304, 26, { fill: C.screen });
  G.rrect(-64, -132, 128, 260, 14, { fill: o.screenFill || C.sky, stroke: 'none' });
  G.rrect(-24, -144, 48, 10, 5, { fill: C.ink, stroke: 'none' });
  if (o.mood) face(G.at(0, -10), o.mood, { er: 24, ex: 30, phase: o.phase || 5 });
  return G;
}

function monitor(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s);
  G.rect(-26, 98, 52, 46, { fill: C.lgray });
  G.ellipse(0, 150, 160, 32, { fill: C.lgray });
  G.rrect(-150, -115, 300, 216, 14, { fill: C.screen });
  G.rect(-132, -97, 264, 180, { fill: o.screenFill || C.sky, stroke: 'none' });
  if (o.mood !== false) face(G.at(0, -14), o.mood || 'happy', { er: 28, ex: 42, phase: o.phase || 0 });
  return G;
}

function seatbelt(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  G.poly([[-182, -128], [-148, -160], [182, 128], [148, 160]], { fill: '#5A5753' });
  G.line(-160, -138, 162, 140, { stroke: '#A8A49D', strokeWidth: 3, dash: [12, 9], roughness: .5 });
  G.rrect(-44, -40, 88, 80, 12, { fill: '#C9CDD2' });
  G.rrect(-22, -15, 44, 30, 7, { fill: C.red });
  return G;
}

function bubblewrap(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  G.rrect(-185, -150, 370, 340, 34, { fill: '#CFE6F7', stroke: '#6FA7D3', strokeWidth: 5 }).setAttribute('opacity', .62);
  for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) {
    const px = -150 + c * 50 + (r % 2) * 25, py = -115 + r * 52;
    if (px > 165) continue;
    G.circle(px, py, 36, { stroke: '#6FA7D3', strokeWidth: 3, fill: 'rgba(255,255,255,0.55)', roughness: .5 });
  }
  return G;
}

function crate(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  const wood = { fill: C.wood, strokeWidth: 4 };
  G.rect(-185, -150, 370, 34, wood); G.rect(-185, 158, 370, 34, wood);
  G.rect(-185, -150, 34, 342, wood); G.rect(151, -150, 34, 342, wood);
  G.line(-151, -116, 151, 158, { stroke: '#8B5A2B', strokeWidth: 9 });
  for (const [cx, cy] of [[-168, -133], [168, -133], [-168, 175], [168, 175]]) G.dot(cx, cy, 9, C.dgray);
  return G;
}

function bubble(D, x, y, w, h, text, o = {}) {
  const G = D.at(x, y, 1, o.rot || 0);
  const [tx, ty] = o.tail || [-w * .3, h / 2 + 60];
  const bx = Math.max(-w / 2 + 50, Math.min(w / 2 - 50, tx * .45));
  G.poly([[bx - 22, h / 2 - 10], [tx, ty], [bx + 26, h / 2 - 10]], { fill: '#fff' });
  G.rrect(-w / 2, -h / 2, w, h, 44, { fill: '#fff' });
  G.text(text, 0, 4, { font: o.font || 'Marker', size: o.size || 54, fill: o.color || C.ink });
  return G;
}

function button(D, x, y, text, o = {}) {
  const size = o.size || 54, w = measure(text, size, 'Marker') + 84, h = size * 1.8;
  const G = D.at(x, y, 1, o.rot || 0);
  G.rrect(-w / 2, -h / 2 + 10, w, h, 26, { fill: o.shade || '#1F7A3A' });
  G.rrect(-w / 2, -h / 2, w, h, 26, { fill: o.color || C.green });
  G.text(text, 0, 2, { font: 'Marker', size, fill: '#fff' });
  return G;
}

function bouncer(D, x, y, s = 1, o = {}) {     // origin = belly
  const G = D.at(x, y, s);
  G.poly([[-72, 120], [-10, 120], [-16, 300], [-70, 300]], { fill: C.ink });
  G.poly([[10, 120], [72, 120], [70, 300], [16, 300]], { fill: C.ink });
  G.ellipse(-46, 308, 84, 30, { fill: C.ink }); G.ellipse(46, 308, 84, 30, { fill: C.ink });
  G.rrect(-118, -140, 236, 272, 42, { fill: '#2B2A29' });
  G.text(o.label || 'PROXY', 0, -66, { font: 'Marker', size: 46, fill: '#fff' });
  G.rrect(-124, -8, 248, 54, 27, { fill: '#45423F' }); G.rrect(-112, 34, 224, 50, 25, { fill: '#45423F' });
  G.circle(-112, 58, 42, { fill: SKIN }); G.circle(112, 18, 42, { fill: SKIN });
  G.rect(-24, -164, 48, 32, { fill: SKIN });
  G.circle(0, -226, 142, { fill: SKIN });
  G.rrect(-60, -248, 54, 34, 9, { fill: C.ink }); G.rrect(6, -248, 54, 34, 9, { fill: C.ink }); G.line(-8, -234, 8, -234, { strokeWidth: 5 });
  G.line(-24, -186, 24, -189, { strokeWidth: 6 });
  G.curve([[66, -230], [80, -200], [70, -170]], { strokeWidth: 3, stroke: C.gray });
  return G;
}

function clipboard(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot || 0);
  const w = o.w || 360, h = o.h || 420;
  G.rrect(-w / 2, -h / 2, w, h, 18, { fill: '#B9814A' });
  G.rect(-w / 2 + 22, -h / 2 + 36, w - 44, h - 58, { fill: '#fff', stroke: 'none' });
  G.rrect(-60, -h / 2 - 16, 120, 42, 10, { fill: C.lgray });
  if (o.title) G.text(o.title, 0, -h / 2 + 80, { font: 'Marker', size: 38 });
  (o.items || []).forEach((it, i) => {
    if (D.t < (it.t || 0)) return;
    const yy = -h / 2 + 150 + i * 80;
    if (it.ok) G.lines([[-w / 2 + 40, yy], [-w / 2 + 52, yy + 14], [-w / 2 + 74, yy - 16]], { stroke: C.green, strokeWidth: 8 });
    else { G.line(-w / 2 + 42, yy - 14, -w / 2 + 70, yy + 14, { stroke: C.red, strokeWidth: 8 }); G.line(-w / 2 + 70, yy - 14, -w / 2 + 42, yy + 14, { stroke: C.red, strokeWidth: 8 }); }
    G.text(it.text, -w / 2 + 92, yy + 2, { anchor: 'start', font: 'Note', size: o.size || 40, fill: it.ok ? C.ink : C.red });
  });
  return G;
}

function door(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s);
  G.rect(-115, -235, 230, 470, { fill: '#6E4325' });
  G.rect(-96, -216, 192, 451, { fill: '#A86A3E' });
  G.rect(-70, -186, 140, 150, { stroke: '#7A4A2A', strokeWidth: 4 });
  G.rect(-70, -6, 140, 200, { stroke: '#7A4A2A', strokeWidth: 4 });
  G.circle(62, 20, 26, { fill: C.gold });
  if (o.sign) tag(G, 0, -292, o.sign, { size: 40, rot: 2, bg: '#FFF2B8' });
  return G;
}

function browserWin(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot || 0);
  G.rrect(-160, -115, 320, 230, 14, { fill: '#fff' });
  G.rect(-160, -115, 320, 46, { fill: C.lgray });
  [C.red, C.yellow, C.green].forEach((c, i) => G.circle(-134 + i * 26, -92, 14, { fill: c, stroke: 'none' }));
  G.text(o.url || 'unknown.site', 30, -91, { font: 'Note', size: 30 });
  if (o.mood) face(G.at(0, 26), o.mood, { er: 26, ex: 38, phase: o.phase || 3 });
  return G;
}

function hourglass(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s);
  const k = clamp(D.t / (o.dur || 2.5));
  G.rect(-54, -86, 108, 16, { fill: C.wood }); G.rect(-54, 70, 108, 16, { fill: C.wood });
  G.poly([[-42, -70], [42, -70], [7, 0], [42, 70], [-42, 70], [-7, 0]], { fill: '#EAF4FB' });
  if (k < 1) G.poly([[-30 * (1 - k), -60 + 50 * k], [30 * (1 - k), -60 + 50 * k], [0, -6]], { fill: C.sand, stroke: 'none' });
  G.poly([[-34, 64], [34, 64], [0, 64 - 50 * k - 4]], { fill: C.sand, stroke: 'none' });
  G.line(0, -6, 0, 60, { stroke: C.sand, strokeWidth: 3 });
  return G;
}

function bug(D, x, y, s = 1, o = {}) {          // the "rogue code" gremlin
  const G = D.at(x, y, s, o.rot || 0);
  const step = o.walking ? Math.sin(D.T * 22) * 10 : 0;
  for (let i = -1; i <= 1; i++) {
    const sw = (i % 2 ? 1 : -1) * step;
    G.lines([[-44, i * 32 + 22], [-88, i * 40 + 10 + sw], [-104, i * 46 + 34 + sw]], { strokeWidth: 6 });
    G.lines([[44, i * 32 + 22], [88, i * 40 + 10 - sw], [104, i * 46 + 34 - sw]], { strokeWidth: 6 });
  }
  G.ellipse(0, 26, 132, 150, { fill: C.green });
  G.line(0, -40, 0, 96, { strokeWidth: 4 });
  G.dot(-30, 10, 18, '#1E6B36'); G.dot(32, 44, 22, '#1E6B36'); G.dot(-22, 66, 14, '#1E6B36');
  G.curve([[-20, -92], [-36, -136], [-58, -146]], { strokeWidth: 5 }); G.curve([[20, -92], [36, -136], [58, -146]], { strokeWidth: 5 });
  G.dot(-58, -146, 16); G.dot(58, -146, 16);
  G.circle(0, -58, 96, { fill: '#2E8B4A' });
  face(G.at(0, -64), o.mood || 'sly', { er: 20, ex: 22, phase: 19 });
  return G;
}

function stars(D, x, y, s = 1) {               // dizzy stars orbiting
  const G = D.at(x, y, s);
  for (let i = 0; i < 3; i++) {
    const a = D.T * 4 + i * 2.1, px = Math.cos(a) * 80, py = Math.sin(a) * 22;
    const pts = []; for (let j = 0; j < 10; j++) { const r = j % 2 ? 9 : 22, b = j * Math.PI / 5 - Math.PI / 2; pts.push([px + Math.cos(b) * r, py + Math.sin(b) * r]); }
    G.poly(pts, { fill: C.yellow, strokeWidth: 3, roughness: .5 });
  }
  return G;
}

function floppy(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  G.rrect(-82, -82, 164, 164, 12, { fill: C.blue });
  G.rect(-46, -82, 92, 56, { fill: C.lgray });
  G.rect(12, -74, 20, 40, { fill: C.blue, stroke: 'none' });
  G.rect(-58, 8, 116, 64, { fill: '#fff' });
  G.text('SAVE', 0, 42, { font: 'Marker', size: 32 });
  return G;
}

function terminal(D, x, y, w, h, lines, o = {}) {
  const G = D.at(x, y, 1, o.rot || 0);
  G.rrect(-w / 2, -h / 2, w, h, 18, { fill: C.term, roughness: .7 });
  G.line(-w / 2 + 6, -h / 2 + 48, w / 2 - 6, -h / 2 + 48, { stroke: '#4A4744', strokeWidth: 3 });
  [C.red, C.yellow, C.green].forEach((c, i) => G.circle(-w / 2 + 34 + i * 32, -h / 2 + 25, 18, { fill: c, stroke: 'none' }));
  const size = o.size || 34;
  let yy = -h / 2 + 48 + size * 1.25, last = null;
  for (const ln of lines) {
    const lt = D.t - (ln.t || 0);
    if (lt < 0) break;
    const n = ln.instant ? ln.text.length : Math.min(ln.text.length, Math.floor(lt * (ln.cps || 45)));
    const sz = ln.size || size;
    if (ln.size) yy += (sz - size) * 0.6;
    G.text(ln.text.slice(0, n), -w / 2 + 30, yy, { font: 'DejaVu Sans Mono', size: sz, anchor: 'start', fill: ln.color || C.termGreen });
    last = { yy, n, ln, sz };
    yy += sz * 1.5;
  }
  if (last && Math.floor(D.T * 2.5) % 2 === 0) {
    const cx = -w / 2 + 30 + measure(last.ln.text.slice(0, last.n), last.sz, 'DejaVu Sans Mono') + 6;
    G.rect(cx, last.yy - last.sz * .5, last.sz * .55, last.sz, { fill: last.ln.color || C.termGreen, stroke: 'none', roughness: 0 });
  }
  return G;
}

function wall(D, x, y, w, h, o = {}) {
  const G = D.at(x, y, 1);
  G.rect(-w / 2, -h / 2, w, h, { fill: o.color || C.brick });
  const bh = 46;
  for (let r = 1; r * bh < h; r++) G.line(-w / 2, -h / 2 + r * bh, w / 2, -h / 2 + r * bh, { stroke: '#8E3A27', strokeWidth: 3, roughness: .6 });
  for (let r = 0; r * bh < h; r++) {
    const xs = r % 2 ? [-w / 6, w / 3] : [-w / 3 + 10, w / 6];
    for (const vx of xs) G.line(vx, -h / 2 + r * bh, vx, Math.min(h / 2, -h / 2 + (r + 1) * bh), { stroke: '#8E3A27', strokeWidth: 3, roughness: .6 });
  }
  if (o.hole) G.ellipse(0, o.hole, w * .8, 120, { fill: C.ink, roughness: 1.6 });
  if (o.label) tag(G, 0, -h / 2 - 54, o.label, { size: o.labelSize || 40, rot: o.labelRot ?? -3, bg: o.labelBg });
  return G;
}

function alertLines(D, x, y, r = 120, o = {}) {
  const G = D.at(x, y, 1);
  const n = o.n || 7, a0 = o.a0 ?? -160, span = o.span ?? 140;
  for (let i = 0; i < n; i++) {
    const a = (a0 + i * span / (n - 1)) * Math.PI / 180;
    G.line(Math.cos(a) * r, Math.sin(a) * r, Math.cos(a) * (r + (o.len || 50)), Math.sin(a) * (r + (o.len || 50)), { stroke: o.color || C.red, strokeWidth: 8 });
  }
  return G;
}

function arrow(D, x1, y1, x2, y2, o = {}) {
  const b = o.bend || 0, col = o.color || C.ink, w = o.w || 7;
  const mx = (x1 + x2) / 2 - (y2 - y1) * b, my = (y1 + y2) / 2 + (x2 - x1) * b;
  D.curve([[x1, y1], [mx, my], [x2, y2]], { stroke: col, strokeWidth: w });
  const a = Math.atan2(y2 - my, x2 - mx), L = o.head || 36;
  D.lines([[x2 - L * Math.cos(a - .5), y2 - L * Math.sin(a - .5)], [x2, y2], [x2 - L * Math.cos(a + .5), y2 - L * Math.sin(a + .5)]], { stroke: col, strokeWidth: w });
}

function sandbox(D, x, y, s = 1, o = {}) {      // part: 'back' (behind actors) or 'front'
  const G = D.at(x, y, s);
  if (o.part !== 'front') {
    G.rect(-400, -70, 800, 46, { fill: '#B97A3E' });
    G.path('M -385 -10 C -260 -60 -120 -40 0 -52 C 130 -64 260 -40 385 -10 L 385 60 L -385 60 Z', { fill: C.sand, stroke: '#B88B4A', strokeWidth: 3 });
  } else {
    G.rect(-425, -14, 850, 116, { fill: C.wood });
    G.line(-425, 44, 425, 44, { stroke: '#8B5A2B', strokeWidth: 4 });
    for (const nx of [-395, -130, 130, 395]) { G.dot(nx, 14, 10, C.dgray); G.dot(nx, 74, 10, C.dgray); }
    // bucket + spade
    G.poly([[250, -92], [338, -92], [326, -12], [262, -12]], { fill: C.red });
    G.arc(294, -92, 86, 70, Math.PI, Math.PI * 2, false, { strokeWidth: 4 });
    G.line(-300, -150, -270, -30, { strokeWidth: 7, stroke: '#8B5A2B' });
    G.poly([[-282, -40], [-250, -48], [-244, -4], [-270, 4]], { fill: C.blue });
  }
  return G;
}

function bigText(D, x, y, text, o = {}) {
  return D.text(text, x, y, { font: 'Marker', size: o.size || 120, fill: o.color || C.red, rotate: o.rot || 0, stroke: o.stroke, strokeWidth: o.strokeWidth });
}


/* ---------- PayAI brand (assets used as supplied; see engine/brand/README.md) ---------- */
function payaiMark(D, x, y, w) {                 // gradient mark, w = width in local units
  const h = w * 464 / 484;
  return el('use', { href: '#payai-mark', x: x - w / 2, y: y - h / 2, width: w, height: h }, D.g);
}
function payaiLockup(D, x, y, w) {               // mark + wordmark, for light backgrounds
  const h = w * 146 / 484;
  return el('use', { href: '#payai-lockup', x: x - w / 2, y: y - h / 2, width: w, height: h }, D.g);
}
function endCard(D, x, y, o = {}) {              // closing card: logo + handle on a clean white card
  const w = o.w || 700, h = o.h || 220;
  const G = D.at(x, y, 1, o.rot ?? -1.5);
  G.rrect(-w / 2, -h / 2, w, h, 28, { fill: '#FFFFFF', stroke: C.sky, strokeWidth: 5, roughness: .6 }).setAttribute('filter', 'url(#shadow)');
  payaiLockup(G, 0, -36, 360);
  G.text('Follow ' + (o.handle || '@PayAINetwork'), 0, 58, { font: 'Inter', weight: 600, size: 42, fill: C.blue });
  return G;
}

/* ---------- computer-use parts ---------- */
function cursor(D, x, y, s = 1, o = {}) {        // tip of the arrow at (x, y)
  const G = D.at(x, y, s, o.rot || 0);
  G.poly([[0, 0], [0, 50], [13, 38], [23, 60], [32, 56], [22, 34], [40, 34]], { fill: o.fill || '#fff', strokeWidth: 4.5, roughness: .5 });
  return G;
}
function mouse(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot || 0);
  G.curve([[0, -62], [10, -100], [40, -120], [70, -118]], { strokeWidth: 4, stroke: C.dgray });
  G.ellipse(0, 0, 84, 124, { fill: '#fff' });
  G.line(0, -60, 0, -12, { strokeWidth: 4 }); G.line(-41, -12, 41, -12, { strokeWidth: 4 });
  if (o.click) G.ellipse(-20, -36, 30, 40, { fill: C.blue, stroke: 'none', roughness: .5 });
  return G;
}
function camera(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  G.rrect(-30, -78, 60, 26, 6, { fill: C.dgray });
  G.rrect(-95, -58, 190, 130, 18, { fill: C.dgray });
  G.circle(0, 6, 92, { fill: '#fff' }); G.circle(0, 6, 56, { fill: C.lblue });
  G.circle(62, -34, 18, { fill: C.yellow, stroke: 'none' });
  return G;
}
function polaroid(D, x, y, s = 1, o = {}) {       // a screenshot as a photo
  const G = D.at(x, y, s, o.rot || 0);
  G.rect(-110, -100, 220, 220, { fill: '#fff' });
  G.rect(-92, -84, 184, 150, { fill: C.sky, stroke: 'none' });
  G.rect(-80, -72, 160, 20, { fill: C.lgray, stroke: 'none' });
  G.rect(-70, -38, 90, 12, { fill: C.lblue, stroke: 'none' }); G.rect(-70, -16, 120, 12, { fill: C.lblue, stroke: 'none' });
  G.rrect(18, 20, 56, 30, 8, { fill: C.blue, stroke: 'none' });
  if (o.label) G.text(o.label, 0, 94, { font: 'Hand', size: 26 });
  return G;
}
function keyboard(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s);
  G.rrect(-300, -80, 600, 160, 20, { fill: C.lgray });
  const hot = Math.floor(D.T * 9) % 30;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) {
    const kx = -270 + c * 54 + r * 14, ky = -58 + r * 40;
    const on = o.typing && (r * 10 + c) === hot;
    G.rrect(kx, ky, 44, 32, 6, { fill: on ? C.blue : '#fff', strokeWidth: 3, roughness: .4 });
  }
  return G;
}
function calculator(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  G.rrect(-95, -140, 190, 280, 20, { fill: C.dgray });
  G.rect(-72, -118, 144, 56, { fill: C.lgreen });
  G.text('2+2=4', 62, -90, { font: 'DejaVu Sans Mono', size: 26, anchor: 'end' });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) G.rrect(-72 + c * 50, -44 + r * 44, 42, 36, 6, { fill: c === 2 && r === 3 ? C.orange : '#fff', strokeWidth: 3, roughness: .4 });
  return G;
}
function editorWin(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, o.rot || 0);
  G.rrect(-140, -130, 280, 260, 14, { fill: '#fff' });
  G.rect(-140, -130, 280, 42, { fill: C.lgray });
  G.text(o.title || 'notes.txt', 0, -109, { font: 'Note', size: 28 });
  [200, 160, 210, 120, 180].forEach((w, i) => G.line(-112, -60 + i * 36, -112 + w, -60 + i * 36, { strokeWidth: 5, stroke: C.gray }));
  return G;
}
function lineChart(D, x, y, w, h, o = {}) {      // dashed "expected" vs steep "actual" (drawn over o.dur s)
  const G = D.at(x, y, 1);
  const x0 = -w / 2, y0 = h / 2, x1 = w / 2, y1 = -h / 2;
  G.line(x0, y0, x1, y0, { strokeWidth: 6 }); G.line(x0, y0, x0, y1, { strokeWidth: 6 });
  arrow(G, x1 - 10, y0, x1 + 30, y0, { head: 26, w: 6 }); arrow(G, x0, y1 + 10, x0, y1 - 30, { head: 26, w: 6 });
  G.text(o.xLabel || 'training', x1 - 90, y0 + 40, { font: 'Hand', size: 34, fill: C.gray });
  G.text(o.yLabel || 'skill', x0 + 70, y1 - 20, { font: 'Hand', size: 34, fill: C.gray });
  G.line(x0, y0, x1 - 20, y0 - h * 0.35, { stroke: C.gray, strokeWidth: 6, dash: [18, 14] });
  G.text('expected', x1 - 110, y0 - h * 0.35 + 42, { font: 'Hand', size: 34, fill: C.gray });
  const k = clamp(D.t / (o.dur || 1.2));
  const pts = []; for (let i = 0; i <= 20 * k; i++) { const u = i / 20; pts.push([x0 + u * (w * 0.8), y0 - h * 0.95 * (1 - Math.pow(1 - u, 2.2))]); }
  if (pts.length > 1) G.curve(pts, { stroke: C.blue, strokeWidth: 10, roughness: .6 });
  if (k >= 1) G.text(o.actualLabel || 'actual', x0 + w * 0.8 + 70, y0 - h * 0.95 + 10, { font: 'Marker', size: 40, fill: C.blue });
  return G;
}
function snail(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  const bob = Math.sin(D.T * 3) * 4;
  G.path('M -150 40 C -150 0 -60 10 60 10 C 110 10 140 0 150 -40 C 160 -60 175 -40 165 -10 C 150 40 100 50 60 50 L -140 50 Z', { fill: C.lgreen });
  G.line(140, -30, 150, -95 + bob, { strokeWidth: 5 }); G.line(160, -25, 185, -85 + bob, { strokeWidth: 5 });
  G.dot(150, -98 + bob, 16); G.dot(186, -88 + bob, 16);
  G.circle(-30, -40, 170, { fill: C.orange });
  G.path('M -30 -40 m 0 -60 a 60 60 0 1 1 -50 32 a 40 40 0 1 1 34 -22 a 22 22 0 1 1 -12 20', { strokeWidth: 6 });
  return G;
}
function magnifier(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  G.line(40, 40, 110, 110, { strokeWidth: 22, stroke: C.dgray });
  G.circle(0, 0, 130, { fill: 'rgba(215,227,255,0.6)', strokeWidth: 10 });
  G.line(-28, 0, 28, 0, { strokeWidth: 8 }); G.line(0, -28, 0, 28, { strokeWidth: 8 });
  return G;
}
function dragIcon(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  G.rect(-120, -40, 80, 80, { stroke: C.gray, strokeWidth: 4, dash: [12, 10] });
  G.line(-30, 0, 50, 0, { stroke: C.gray, strokeWidth: 5, dash: [14, 10] });
  G.rect(60, -40, 80, 80, { fill: C.gold });
  cursor(G, 95, 5, 1);
  return G;
}
function flipbook(D, x, y, s = 1) {
  const G = D.at(x, y, s);
  for (let i = 3; i >= 1; i--) G.rect(-120 + i * 12, -100 - i * 10, 240, 200, { fill: '#fff', strokeWidth: 4 });
  G.rect(-120, -100, 240, 200, { fill: '#fff' });
  const f = Math.floor(D.T * 4) % 4;                      // a little stick figure that "jumps" frame by frame
  const lift = [0, 18, 34, 18][f];
  G.circle(0, -20 - lift, 36, { fill: '#fff', strokeWidth: 4 });
  G.line(0, -2 - lift, 0, 40 - lift, { strokeWidth: 4 });
  G.line(0, 40 - lift, -18, 70 - lift * .5, { strokeWidth: 4 }); G.line(0, 40 - lift, 18, 70 - lift * .5, { strokeWidth: 4 });
  G.line(-26, 10 - lift, 26, 10 - lift, { strokeWidth: 4 });
  G.text(String(f + 1), 96, 78, { font: 'Hand', size: 28, fill: C.gray });
  G.line(-120, 100, 120, 100, { strokeWidth: 5 });
  return G;
}
function landscape(D, x0, y0, w, h) {            // generic park scene, drawn inside a box
  const G = D.at(0, 0, 1);
  G.rect(x0, y0, w, h, { fill: '#CFE8FA', stroke: 'none', roughness: .3 });
  G.poly([[x0, y0 + h * .78], [x0 + w * .28, y0 + h * .3], [x0 + w * .52, y0 + h * .78]], { fill: '#8C9AA8', strokeWidth: 3 });
  G.poly([[x0 + w * .36, y0 + h * .78], [x0 + w * .66, y0 + h * .22], [x0 + w, y0 + h * .78]], { fill: '#A2AFBC', strokeWidth: 3 });
  G.poly([[x0 + w * .58, y0 + h * .35], [x0 + w * .66, y0 + h * .22], [x0 + w * .74, y0 + h * .35]], { fill: '#fff', stroke: 'none' });
  G.rect(x0, y0 + h * .78, w, h * .22, { fill: C.lgreen, stroke: 'none', roughness: .3 });
  const gx = x0 + w * .2, gy = y0 + h * .82, puff = Math.sin(D.T * 6) * 4;   // geyser
  G.path(`M ${gx - 10} ${gy} C ${gx - 18} ${gy - 40} ${gx - 30} ${gy - 70 - puff} ${gx} ${gy - 95 - puff} C ${gx + 30} ${gy - 70 - puff} ${gx + 18} ${gy - 40} ${gx + 10} ${gy} Z`, { fill: '#fff', strokeWidth: 3 });
  for (const tx of [.82, .9]) G.poly([[x0 + w * tx, y0 + h * .58], [x0 + w * tx - 16, y0 + h * .82], [x0 + w * tx + 16, y0 + h * .82]], { fill: C.green, strokeWidth: 3 });
  return G;
}
function stickyNote(D, x, y, lines, o = {}) {
  const G = D.at(x, y, 1, o.rot ?? 6);
  const w = o.w || 300, h = o.h || 220;
  G.rect(-w / 2, -h / 2, w, h, { fill: o.bg || '#FFE9A8', strokeWidth: 3 }).setAttribute('filter', 'url(#shadow)');
  lines.forEach((t, i) => G.text(t, 0, -h / 2 + 60 + i * 52, { font: 'Marker', size: o.size || 36, fill: o.color || C.red }));
  return G;
}
function gear(D, x, y, s = 1, o = {}) {
  const G = D.at(x, y, s, (o.spin ? D.T * 40 : 0));
  const pts = []; for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12, r = i % 2 ? 90 : 118; pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
  G.poly(pts, { fill: o.color || C.gray });
  G.circle(0, 0, 70, { fill: C.paper });
  return G;
}
function bars(D, x, y, items, o = {}) {          // simple bar chart; items: {label, value, text, color, at}
  const G = D.at(x, y, 1);
  const H = o.h || 640, bw = o.bw || 170, gap = o.gap || 110;
  const n = items.length, x0 = -((n - 1) * (bw + gap)) / 2;
  G.line(x0 - bw / 2 - 30, 0, -x0 + bw / 2 + 30, 0, { strokeWidth: 6 });
  items.forEach((it, i) => {
    const cx = x0 + i * (bw + gap);
    G.text(it.label, cx, 50, { font: 'Marker', size: o.labelSize || 36 });
    const lt = D.t - (it.at || 0);
    if (lt < 0) return;
    const k = easeOut(clamp(lt / 0.5));
    const bh = Math.max(6, H * it.value / 100 * k);
    G.rect(cx - bw / 2, -bh, bw, bh, { fill: it.color || C.blue, fillStyle: 'hachure', hachureGap: 12, fillWeight: 4, strokeWidth: 5 });
    if (k > .6) G.text(it.text, cx, -bh - 48, { font: 'Marker', size: o.valueSize || 60, fill: it.textColor || C.ink });
  });
  return G;
}

/* ---------- PayAI mascot (doodle rendition of the PayAI Figma bot; guide: docs/CHARACTER.md) ----------
 * White shell, PayAI-blue visor with white pixel features, round ear discs, chest plate with the real PayAI mark,
 * big white gloves with blue cuffs, navy outlines. Origin = belly. Head top -302·s, boots +182·s.
 * payaiBot(D, x, y, s, { pose, face, look, lookY, tilt, flip, role, roleColor, rolePos, visor, pixel, glitch,
 *                        hat, hatColor, emote, sign, signColor, signBg, screen, shield, propL, propR, seat, view, blink, phase, rot })
 *   returns the bot's Ctx with anchors in D's units: .handL .handR (viewer's left / right glove), .headTop, .head,
 *   .chest, .feet, and all of them in .anchors.
 * payaiHead(D, x, y, s, { face, look, lookY, visor, pixel, glitch, hat, emote, tilt })   head only, origin = head centre.
 * Lists: BOT_FACES, Object.keys(BOT_POSES).
 */
const BOT = { line: '#1E2B7A', shell: '#FFFFFF', shade: '#DCE6FF', plate: '#EAF0FF', visor: '#4D63F6', deep: '#1D45D8', joint: '#8AA3FF', pixel: '#FFFFFF' };
const BOT_FACES = ['happy', 'grin', 'wink', 'proud', 'love', 'neutral', 'think', 'focus', 'shock', 'worried', 'sad', 'angry', 'sly', 'cool', 'dizzy', 'sleep'];
const BOT_FACE_ALIAS = { excited: 'grin', laugh: 'grin', surprised: 'shock', scared: 'shock', mischief: 'sly', smug: 'sly',
  confident: 'cool', sleepy: 'sleep', calm: 'neutral', upset: 'sad', mad: 'angry', heart: 'love', thinking: 'think', determined: 'focus' };
const BOT_BLINKS = new Set(['neutral', 'think', 'focus', 'worried', 'sad']);
const botFaceName = f => { f = BOT_FACE_ALIAS[f] || f; return BOT_FACES.includes(f) ? f : 'happy'; };
const botBlink = (D, o) => o.blink !== false && D.T >= 0.3 && ((Math.floor(D.T * 30) + (o.phase || 0)) % 97) >= 94;   // never on the cover frame

function capsule(D, x1, y1, x2, y2, r, o = {}) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L * r, ny = dx / L * r;
  const d = `M ${x1 + nx} ${y1 + ny} L ${x2 + nx} ${y2 + ny} A ${r} ${r} 0 0 0 ${x2 - nx} ${y2 - ny} L ${x1 - nx} ${y1 - ny} A ${r} ${r} 0 0 0 ${x1 + nx} ${y1 + ny} Z`;
  return D.path(d, Object.assign({ fill: BOT.shell, stroke: BOT.line, strokeWidth: 5, roughness: 0.6 }, o));
}

/* Face on the visor. F = Ctx at the visor centre (visor box x ±98, y ±74). Features are fills or strokes sized in
 * local units, so they shrink with the bot but stay bold: every face reads at s = 0.36. */
function pixelFace(F, mood = 'happy', o = {}) {
  mood = botFaceName(mood);
  const W = o.pixel || BOT.pixel, V = o.visor || BOT.visor, p = 13;
  const lx = (o.look || 0) * 9, ly = (o.lookY || 0) * 8, mx = lx * 0.5;
  const u = n => n * F.scale;                                   // local units -> Ctx stroke width
  const round = n => { n.querySelectorAll('path').forEach(e => { e.setAttribute('stroke-linecap', 'round'); e.setAttribute('stroke-linejoin', 'round'); }); return n; };
  const stroke = (d, w = 11, col = W) => round(F.path(d, { stroke: col, strokeWidth: u(w), roughness: 0.3, disableMultiStroke: true }));
  const bar = (x1, y1, x2, y2, w = 10, col = W) => stroke(`M ${x1} ${y1} L ${x2} ${y2}`, w, col);
  const blob = (d, col = W) => F.path(d, { fill: col, stroke: 'none', roughness: 0.25 });
  const sq = (x, y, s = p) => F.rect(x - s * .47, y - s * .47, s * .94, s * .94, { fill: W, stroke: 'none', roughness: 0.12 });
  const pill = (x, y, w = 24, h = 40) => F.rrect(x - w / 2, y - h / 2, w, h, w / 2, { fill: W, stroke: 'none', roughness: 0.25 });
  const arch = (x, y) => [[-.5, -1], [.5, -1], [-1.5, 0], [1.5, 0], [-1.5, 1], [1.5, 1]].forEach(([a, b]) => sq(x + a * p, y + b * p));   // ∩ = closed happy eye
  const wave = (x0, y0, w, a, n = 4) => { let d = `M ${x0} ${y0}`; const st = w / n; for (let i = 0; i < n; i++) d += ` Q ${x0 + st * (i + .5)} ${y0 + (i % 2 ? a : -a)} ${x0 + st * (i + 1)} ${y0}`; return stroke(d, 9); };
  const E = [-1, 1].map(sx => [sx * 44 + lx, -12 + ly]);
  const blink = BOT_BLINKS.has(mood) && botBlink(F, o);
  const eyes = fn => E.forEach(([x, y], i) => blink ? bar(x - 14, y + 6, x + 14, y + 6, 9) : fn(x, y, i));
  switch (mood) {
    case 'happy':
      E.forEach(([x, y]) => arch(x, y + 2));
      stroke(`M ${mx - 33} 20 Q ${mx} 52 ${mx + 33} 20`, 11);
      break;
    case 'grin':
      E.forEach(([x, y]) => arch(x, y - 2));
      blob(`M ${mx - 38} 14 L ${mx + 38} 14 Q ${mx + 36} 58 ${mx} 58 Q ${mx - 36} 58 ${mx - 38} 14 Z`);
      break;
    case 'wink':
      pill(E[0][0], E[0][1], 24, 40); arch(E[1][0], E[1][1] + 2);
      stroke(`M ${mx - 30} 24 Q ${mx + 6} 48 ${mx + 36} 14`, 11);
      break;
    case 'proud':
      E.forEach(([x, y]) => blob(`M ${x - 19} ${y + 9} Q ${x - 19} ${y - 17} ${x} ${y - 17} Q ${x + 19} ${y - 17} ${x + 19} ${y + 9} Z`));
      stroke(`M ${mx - 38} 18 Q ${mx} 50 ${mx + 38} 18`, 12);
      blob(botStar(72, -50, 15, 5));
      break;
    case 'love':
      E.forEach(([x, y]) => blob(`M ${x} ${y + 18} C ${x - 30} ${y - 2} ${x - 22} ${y - 26} ${x} ${y - 10} C ${x + 22} ${y - 26} ${x + 30} ${y - 2} ${x} ${y + 18} Z`, '#FF8FA8'));
      stroke(`M ${mx - 30} 24 Q ${mx} 50 ${mx + 30} 24`, 11);
      break;
    case 'neutral':
      eyes((x, y) => pill(x, y, 24, 40));
      bar(mx - 18, 32, mx + 18, 32, 10);
      break;
    case 'think':
      eyes((x, y, i) => pill(x + 6, y - 6, 22, i ? 40 : 30));
      bar(E[1][0] - 12, -50, E[1][0] + 18, -56, 9);
      bar(mx + 2, 34, mx + 30, 26, 10);
      break;
    case 'focus':                                                // concentrating: eyes down, tongue at the corner
      eyes((x, y) => pill(x, y + 6, 24, 32));
      bar(mx - 18, 32, mx + 16, 32, 9);
      blob(`M ${mx + 4} 33 Q ${mx + 4} 50 ${mx + 14} 50 Q ${mx + 24} 50 ${mx + 24} 33 Z`, '#FF8FA8');
      break;
    case 'shock':
      E.forEach(([x, y]) => { F.circle(x, y - 2, 42, { fill: W, stroke: 'none', roughness: 0.25 }); F.circle(x + lx * .3, y - 2, 13, { fill: V, stroke: 'none', roughness: 0.2 }); });
      E.forEach(([x]) => bar(x - 14, -54, x + 14, -58, 8));
      F.ellipse(mx, 38, 26, 32, { fill: W, stroke: 'none', roughness: 0.25 });
      break;
    case 'worried':
      eyes((x, y) => pill(x, y + 4, 22, 34));
      bar(-64, -36, -28, -50, 9); bar(28, -50, 64, -36, 9);       // inner ends up
      wave(mx - 30, 34, 60, 7);
      break;
    case 'sad':
      eyes((x, y) => pill(x, y + 8, 22, 28));
      bar(-62, -30, -28, -46, 9); bar(28, -46, 62, -30, 9);
      stroke(`M ${mx - 28} 44 Q ${mx} 18 ${mx + 28} 44`, 10);      // frown
      break;
    case 'angry':
      bar(-66, -48, -26, -30, 11); bar(26, -30, 66, -48, 11);    // inner ends down
      E.forEach(([x, y]) => F.rrect(x - 13, y - 4, 26, 20, 6, { fill: W, stroke: 'none', roughness: 0.25 }));
      F.rrect(mx - 28, 24, 56, 20, 6, { fill: W, stroke: 'none', roughness: 0.25 });
      bar(mx - 9, 26, mx - 9, 42, 4, V); bar(mx + 9, 26, mx + 9, 42, 4, V);
      break;
    case 'sly': {
      const k = o.look ? Math.sign(o.look) : 1;
      E.forEach(([x, y]) => { bar(x - 19, y - 4, x + 19, y - 4, 9); blob(`M ${x - 17} ${y - 4} Q ${x - 17} ${y + 16} ${x} ${y + 16} Q ${x + 17} ${y + 16} ${x + 17} ${y - 4} Z`); F.circle(x + k * 6, y + 4, 10, { fill: V, stroke: 'none', roughness: 0.2 }); });
      bar(E[1][0] - 16, -42, E[1][0] + 16, -50, 8);
      stroke(`M ${mx - 26 * k} 30 Q ${mx + 4 * k} 40 ${mx + 32 * k} 16`, 10);
      break;
    }
    case 'cool':
      for (const [x, y] of E) F.rrect(x - 27, y - 15, 54, 32, 10, { fill: '#1A1F4D', stroke: W, strokeWidth: u(4), roughness: 0.3 });
      bar(E[0][0] + 27, E[0][1] - 6, E[1][0] - 27, E[1][1] - 6, 6);
      for (const [x, y] of E) bar(x - 14, y + 6, x - 4, y - 6, 5);
      stroke(`M ${mx - 24} 30 Q ${mx + 6} 40 ${mx + 30} 20`, 10);
      break;
    case 'dizzy':
      E.forEach(([x, y]) => { bar(x - 14, y - 14, x + 14, y + 14, 10); bar(x + 14, y - 14, x - 14, y + 14, 10); });
      wave(mx - 32, 36, 64, 9);
      break;
    case 'sleep':
      E.forEach(([x, y]) => stroke(`M ${x - 16} ${y + 2} Q ${x} ${y + 14} ${x + 16} ${y + 2}`, 9));
      F.ellipse(mx, 34, 14, 12, { fill: W, stroke: 'none', roughness: 0.2 });
      break;
  }
}

function botStar(cx, cy, R, r) {                              // 4-point sparkle path
  let d = '';
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 - Math.PI / 2, rr = i % 2 ? r : R; d += (i ? ' L ' : 'M ') + (cx + Math.cos(a) * rr) + ' ' + (cy + Math.sin(a) * rr); }
  return d + ' Z';
}

/* Head, origin = head centre (= visor centre). Spans x ±122 (ears to ±161), y ±94. */
function drawBotHead(H, o, L) {
  const thin = Object.assign({}, L, { strokeWidth: L.strokeWidth * 0.8 });
  for (const sx of [-1, 1]) {                                   // ear discs
    H.circle(sx * 124, 4, 76, { fill: BOT.shell, ...L });
    H.circle(sx * 126, 4, 42, { fill: BOT.shade, ...thin });
  }
  H.rrect(-122, -94, 244, 188, 60, { fill: BOT.shell, ...L });
  if (o.view === 'back') {
    H.rrect(-74, -56, 148, 104, 30, { fill: BOT.plate, ...thin });
    for (const yy of [-18, 4, 26]) H.line(-40, yy, 40, yy, { stroke: BOT.joint, strokeWidth: L.strokeWidth * .8, roughness: .4 });
  } else {
    H.rrect(-98, -74, 196, 148, 40, { fill: o.visor || BOT.visor, ...thin });
    H.path('M -84 -12 Q -86 -50 -58 -62', { stroke: 'rgba(255,255,255,0.45)', strokeWidth: 7 * H.scale, roughness: .3, disableMultiStroke: true });
    if (o.glitch) for (const [yy, x0, w] of [[-44, -90, 120], [6, -40, 130], [48, -88, 90]]) H.rect(x0, yy, w, 6, { fill: 'rgba(255,255,255,0.35)', stroke: 'none', roughness: .2 });
    pixelFace(H.at(0, 0), o.face || 'happy', o);
  }
  if (o.hat === 'cap') {
    const hc = o.hatColor || BOT.visor;
    H.path('M -126 -60 Q -122 -134 0 -136 Q 122 -134 126 -60 Q 0 -82 -126 -60 Z', { fill: hc, ...L });
    H.path('M -118 -62 Q -196 -70 -206 -46 Q -150 -36 -104 -56 Z', { fill: hc, ...L });
    H.circle(0, -134, 18, { fill: hc, ...thin });
    H.circle(30, -102, 26, { fill: '#fff', stroke: 'none', roughness: .3 }); H.circle(30, -102, 10, { fill: hc, stroke: 'none', roughness: .3 });
  } else if (o.hat === 'hardhat') {
    const hc = o.hatColor || C.yellow;
    H.path('M -110 -62 Q -110 -146 0 -148 Q 110 -146 110 -62 Z', { fill: hc, ...L });
    H.rrect(-148, -72, 296, 22, 11, { fill: hc, ...L });
    H.rrect(-16, -146, 32, 80, 12, { fill: hc, ...thin });
  }
}

function botEmote(B, kind, hx, hy, s = 1) {                    // a sign next to the head that doubles the expression
  if (!kind || kind === 'none') return;
  const G = B.at(hx + 150, hy - 96, s);                        // top-right of the head
  const L = { stroke: BOT.line, strokeWidth: 4, roughness: .5 };
  switch (kind) {
    case '!': G.rrect(-11, -52, 22, 62, 11, { fill: C.red, ...L }); G.circle(0, 34, 24, { fill: C.red, ...L }); break;
    case '?': G.text('?', 0, 0, { font: 'Marker', size: 110, fill: BOT.deep, stroke: '#fff', strokeWidth: 8 }); break;
    case 'sweat': G.path('M -30 30 Q -30 70 0 70 Q 30 70 30 30 Q 30 10 0 -26 Q -30 10 -30 30 Z', { fill: C.sky, stroke: BOT.deep, strokeWidth: 4, roughness: .4 }); break;
    case 'sparkle': G.path(botStar(0, 0, 38, 11), { fill: C.yellow, ...L }); G.path(botStar(44, 40, 20, 6), { fill: C.yellow, ...L }); break;
    case 'heart': G.path('M 0 40 C -60 0 -40 -48 0 -18 C 40 -48 60 0 0 40 Z', { fill: C.red, ...L }); break;
    case 'zzz': [[-20, 30, 44], [18, -10, 56], [60, -56, 70]].forEach(([x, y, sz]) => G.text('z', x, y, { font: 'Marker', size: sz, fill: BOT.deep })); break;
    case 'anger': for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) G.path(`M ${a * 8} ${b * 34} Q ${a * 10} ${b * 10} ${a * 34} ${b * 8}`, { stroke: C.red, strokeWidth: 8, roughness: .4 }); break;
    case 'dots': [-36, 0, 36].forEach((x, i) => G.circle(x, 10 - i * 10, 26, { fill: '#fff', ...L })); break;
    case 'idea':
      G.circle(0, -10, 74, { fill: C.yellow, ...L }); G.rrect(-18, 26, 36, 26, 6, { fill: C.lgray, ...L });
      for (const a of [-2.4, -1.57, -0.74]) G.line(Math.cos(a) * 52, -10 + Math.sin(a) * 52, Math.cos(a) * 74, -10 + Math.sin(a) * 74, { stroke: C.gold, strokeWidth: 5 });
      break;
    case 'stars': stars(B, hx, hy - 120, 1.15); break;
  }
}

/* Arms. Each arm: { sh, el, hand, glove, dir }. glove: fist | point | thumb | thumbDown | open | palm | grip | none.
 * dir (deg) overrides the glove direction (default = forearm direction). Left = viewer's left (x < 0). */
const botArmR = (el, hand, glove, extra) => Object.assign({ sh: [92, -66], el, hand, glove }, extra || {});
const mirrorArm = a => Object.assign({}, a, { sh: [-a.sh[0], a.sh[1]], el: [-a.el[0], a.el[1]], hand: [-a.hand[0], a.hand[1]], dir: a.dir == null ? null : 180 - a.dir });
const botPair = r => [mirrorArm(r), r];
const BOT_ARM_IDLE_R = botArmR([124, -2], [118, 58], 'fist');
const BOT_ARM_IDLE_L = mirrorArm(BOT_ARM_IDLE_R);
const BOT_POSES = {
  idle: botPair(BOT_ARM_IDLE_R),
  point: [BOT_ARM_IDLE_L, botArmR([154, -56], [212, -78], 'point')],
  pointUp: [BOT_ARM_IDLE_L, botArmR([150, -110], [160, -178], 'point')],
  wave: [BOT_ARM_IDLE_L, botArmR([156, -112], [174, -178], 'palm')],
  present: [BOT_ARM_IDLE_L, botArmR([150, -30], [208, -48], 'open', { dir: -12 })],
  thumbsUp: [BOT_ARM_IDLE_L, botArmR([150, -22], [158, -90], 'thumb')],
  thumbsDown: [BOT_ARM_IDLE_L, botArmR([146, -14], [172, 52], 'thumbDown')],
  think: [{ sh: [-92, -66], el: [-120, 2], hand: [-44, 34], glove: 'fist' }, botArmR([116, -18], [64, -104], 'fist')],
  shrug: botPair(botArmR([152, -34], [194, -96], 'open', { dir: -25 })),
  cheer: botPair(botArmR([140, -128], [150, -198], 'fist')),
  tada: botPair(botArmR([156, -96], [214, -136], 'open', { dir: -40 })),
  facepalm: [BOT_ARM_IDLE_L, botArmR([136, -84], [54, -170], 'palm')],
  scratch: [BOT_ARM_IDLE_L, botArmR([164, -110], [148, -222], 'open', { dir: 200 })],
  armsCrossed: [{ sh: [-92, -66], el: [-112, 14], hand: [44, 42], glove: 'fist' }, botArmR([112, 12], [-44, 32], 'fist')],
  stop: botPair(botArmR([142, -16], [176, -74], 'palm')),
  guard: [{ sh: [-92, -66], el: [-136, -18], hand: [-150, -58], glove: 'fist' }, BOT_ARM_IDLE_R],
  sign: botPair(botArmR([130, -4], [100, 38], 'grip')),
  tablet: botPair(botArmR([132, 2], [110, 80], 'grip')),
  typing: botPair(botArmR([128, -6], [62, 36], 'fist')),
  hold: [BOT_ARM_IDLE_L, botArmR([150, -22], [180, -56], 'grip')],
  walk: botPair(BOT_ARM_IDLE_R),
  sit: botPair(botArmR([128, 8], [66, 96], 'fist')),
};
BOT_POSES.pointLeft = BOT_POSES.point.map(mirrorArm).reverse();
BOT_POSES.presentLeft = BOT_POSES.present.map(mirrorArm).reverse();
const BOT_POSE_META = {
  think: { tilt: 5 }, facepalm: { tilt: 9 }, scratch: { tilt: -6 }, shrug: { tilt: -4 },
  sign: { prop: 'sign' }, tablet: { prop: 'tablet' }, typing: { prop: 'laptop', lookY: 1 }, guard: { prop: 'shield' },
  walk: { legs: 'walk' }, sit: { legs: 'sit' },
};

function botPoseArms(pose, T) {
  const arms = (BOT_POSES[pose] || BOT_POSES.idle).map(a => Object.assign({}, a, { el: [...a.el], hand: [...a.hand] }));
  if (pose === 'wave') {                                         // hand waggles about the elbow
    const a = arms[1], th = Math.sin(T * Math.PI * 4) * 0.22, dx = a.hand[0] - a.el[0], dy = a.hand[1] - a.el[1];
    a.hand = [a.el[0] + dx * Math.cos(th) - dy * Math.sin(th), a.el[1] + dx * Math.sin(th) + dy * Math.cos(th)];
  }
  if (pose === 'typing') arms.forEach((a, i) => { a.hand[1] += Math.sin(T * 22 + i * 2.1) * 5; a.el[1] += Math.sin(T * 22 + i * 2.1) * 2; });
  if (pose === 'walk') { const k = Math.sin(T * Math.PI * 2.8); arms.forEach((a, i) => { const q = i ? k : -k; a.hand[0] += q * 12 * Math.sign(a.hand[0]); a.hand[1] -= Math.abs(q) * 8; }); }
  return arms;
}

function botSleeve(B, a, L) {
  const thin = Object.assign({}, L, { strokeWidth: L.strokeWidth * 0.8 });
  capsule(B, a.sh[0], a.sh[1], a.el[0], a.el[1], 21, L);
  capsule(B, a.el[0], a.el[1], a.hand[0], a.hand[1], 19, L);
  const dx = a.hand[0] - a.el[0], dy = a.hand[1] - a.el[1], n = Math.hypot(dx, dy) || 1;
  capsule(B, a.hand[0] - dx / n * 30, a.hand[1] - dy / n * 30, a.hand[0] - dx / n * 22, a.hand[1] - dy / n * 22, 21, { fill: BOT.joint, ...thin });   // blue wrist cuff
  B.circle(a.sh[0], a.sh[1], 46, { fill: BOT.shell, ...L });    // shoulder ball
}

function botGlove(B, a, L, lod = 'hi') {
  if (a.glove === 'none') return;
  const [hx, hy] = a.hand;
  const ang = a.dir != null ? a.dir * Math.PI / 180 : Math.atan2(hy - a.el[1], hx - a.el[0]);
  const ux = Math.cos(ang), uy = Math.sin(ang);
  let vx = -uy, vy = ux; if (vy > 0 || (vy === 0 && vx * hx > 0)) { vx = -vx; vy = -vy; }   // v = the upper side
  const G = { fill: BOT.shell, ...L };
  const cap = (x1, y1, x2, y2, r) => capsule(B, x1, y1, x2, y2, r, G);
  const fan = (n, spread, len, r) => { for (let i = 0; i < n; i++) { const t = n > 1 ? i / (n - 1) - .5 : 0, c = Math.cos(t * spread), s = Math.sin(t * spread); const fx = ux * c - uy * s, fy = ux * s + uy * c; cap(hx + fx * 14, hy + fy * 14, hx + fx * len, hy + fy * len, r); } };
  const crease = () => { if (lod === 'hi') cap(hx + vx * 17 - ux * 9, hy + vy * 17 - uy * 9, hx + vx * 17 + ux * 9, hy + vy * 17 + uy * 9, 8.5); };   // thumb pressed on the fist
  switch (a.glove) {
    case 'point':
      cap(hx, hy, hx + ux * 60, hy + uy * 60, 12.5);
      B.circle(hx, hy, 60, G);
      cap(hx - ux * 4 + vx * 14, hy - uy * 4 + vy * 14, hx + ux * 14 + vx * 16, hy + uy * 14 + vy * 16, 9);
      break;
    case 'thumb': case 'thumbDown': {
      const sd = a.glove === 'thumb' ? -1 : 1;
      cap(hx - 6, hy, hx - 6, hy + sd * 48, 12);
      B.circle(hx, hy, 60, G);
      if (lod === 'hi') for (const k of [-10, 6]) B.line(hx + 4, hy + k, hx + 24, hy + k, { stroke: BOT.line, strokeWidth: L.strokeWidth * .6, roughness: .3 });
      break;
    }
    case 'open': {                                               // flat mitten, fingers along the glove direction
      const T = (a2, b2) => `${hx + ux * a2 + vx * b2} ${hy + uy * a2 + vy * b2}`;
      cap(hx + ux * 2 + vx * 16, hy + uy * 2 + vy * 16, hx + ux * 16 + vx * 40, hy + uy * 16 + vy * 40, 10.5);   // thumb
      B.path(`M ${T(-22, -26)} L ${T(26, -27)} Q ${T(56, -25)} ${T(56, -2)} Q ${T(56, 22)} ${T(28, 24)} L ${T(-22, 27)} Q ${T(-38, 0)} ${T(-22, -26)} Z`, G);
      if (lod === 'hi') for (const b2 of [-12, 1, 13]) B.line(hx + ux * 28 + vx * b2, hy + uy * 28 + vy * b2, hx + ux * 50 + vx * b2, hy + uy * 50 + vy * b2, { stroke: BOT.line, strokeWidth: L.strokeWidth * .6, roughness: .3 });
      break;
    }
    case 'palm': {                                               // palm to the viewer, fingers up
      const side = hx < 0 ? -1 : 1;
      const fs = lod === 'hi' ? [[-22, 32], [-7.5, 40], [7.5, 40], [22, 32]] : [[-17, 34], [0, 40], [17, 34]];
      for (const [fx, fl] of fs) cap(hx + fx, hy - 8, hx + fx, hy - 8 - fl, lod === 'hi' ? 9 : 11);
      cap(hx - side * 22, hy + 8, hx - side * 46, hy - 14, 10.5);
      B.rrect(hx - 32, hy - 28, 64, 60, 27, G);
      break;
    }
    case 'grip':
      B.circle(hx, hy, 58, G);
      cap(hx - 12, hy - 10, hx + 12, hy - 14, 9);
      break;
    default:                                                      // fist
      B.circle(hx, hy, 60, G);
      crease();
  }
}

function botArm(B, a, L = { stroke: BOT.line, strokeWidth: 5, roughness: 0.6 }) { botSleeve(B, a, L); botGlove(B, a, L); }

function botLegs(B, legs, T, L, seat) {
  const thin = Object.assign({}, L, { strokeWidth: L.strokeWidth * 0.8 });
  if (legs === 'sit') {
    if (seat !== false) {                                         // simple stool; seat: false when the scene draws its own
      B.rrect(-104, 96, 208, 24, 10, { fill: C.wood, ...L });
      for (const sx of [-1, 1]) B.rect(sx * 84 - 9, 118, 18, 66, { fill: '#A8743F', ...L });
    }
    for (const sx of [-1, 1]) {
      capsule(B, sx * 48, 118, sx * 52, 160, 20, L);
      B.rrect(sx * 52 - 36, 152, 72, 34, 15, { fill: BOT.shell, ...L });
      B.line(sx * 52 - 30, 176, sx * 52 + 30, 176, { stroke: BOT.joint, strokeWidth: L.strokeWidth });
    }
    B.rrect(-74, 80, 148, 40, 20, { fill: BOT.shell, ...L });
    for (const sx of [-1, 1]) B.circle(sx * 48, 112, 56, { fill: BOT.shell, ...L });   // knees toward the viewer
    return;
  }
  const k = legs === 'walk' ? Math.sin(T * Math.PI * 2.8) : 0;
  for (const sx of [-1, 1]) {
    const lift = Math.max(0, sx < 0 ? k : -k) * 32;
    capsule(B, sx * 36, 104, sx * 40, 152 - lift, 21, L);
    if (legs !== 'walk') B.line(sx * 36 - 17, 128, sx * 36 + 19, 128, { stroke: BOT.joint, strokeWidth: L.strokeWidth * .7, roughness: .4 });
    B.rrect(sx > 0 ? 6 : -80, 144 - lift, 74, 38, 17, { fill: BOT.shell, ...L });
    B.line(sx > 0 ? 12 : -74, 172 - lift, sx > 0 ? 74 : -12, 172 - lift, { stroke: BOT.joint, strokeWidth: L.strokeWidth });
  }
}

function botProp(B, kind, o, L) {
  if (kind === 'sign') {
    B.rrect(-136, 24, 272, 124, 14, { fill: o.signBg || '#fff', ...L });
    const lines = [].concat(o.sign || '').filter(Boolean);
    if (lines.length) {
      const base = lines.length > 1 ? 44 : 58;
      const fs = Math.min(base, ...lines.map(t => base * 236 / Math.max(1, measure(t, base, 'Marker'))));
      lines.forEach((t, i) => B.text(t, 0, 88 + (i - (lines.length - 1) / 2) * fs * 1.05, { font: 'Marker', size: fs, fill: o.signColor || BOT.line }));
    }
  } else if (kind === 'tablet') {
    B.rrect(-118, 18, 236, 152, 20, { fill: C.screen, ...L });
    B.rrect(-104, 32, 208, 124, 10, { fill: o.screenFill || C.sky, stroke: 'none', roughness: .3 });
    if (o.screen) o.screen(B.at(0, 94), 208, 124);
    else { [[-80, 56, 120], [-80, 84, 90], [-80, 112, 140]].forEach(([x, y, w]) => B.line(x, y, x + w, y, { stroke: C.lblue, strokeWidth: 6 })); B.circle(66, 120, 34, { fill: C.green, stroke: 'none' }); }
  } else if (kind === 'laptop') {                                // lid seen from behind, the bot types on the far side
    B.rrect(-146, 122, 292, 18, 8, { fill: C.lgray, ...L });     // base edge
    B.rrect(-124, 14, 248, 112, 14, { fill: '#E9EEF9', ...L });
    B.line(-110, 22, 110, 22, { stroke: C.lblue, strokeWidth: L.strokeWidth * .9, roughness: .3 });
    payaiMark(B, 0, 72, 46);
    const tap = Math.floor(B.T * 8) % 2;
    for (const sx of [-1, 1]) if ((sx > 0) === !!tap) for (const a of [-0.6, 0, 0.6]) B.line(sx * 120 + Math.sin(a + sx * .5) * 22, 2 - Math.cos(a + sx * .5) * 22, sx * 120 + Math.sin(a + sx * .5) * 36, 2 - Math.cos(a + sx * .5) * 36, { stroke: BOT.deep, strokeWidth: L.strokeWidth * .8 });
  } else if (kind === 'shield') {
    const S = B.at(o.flip ? 150 : -150, -46, 1);
    S.path('M -66 -76 Q 0 -96 66 -76 L 66 -10 Q 62 54 0 86 Q -62 54 -66 -10 Z', { fill: BOT.deep, ...L });
    S.path('M -50 -62 Q 0 -78 50 -62 L 50 -12 Q 46 40 0 66 Q -46 40 -50 -12 Z', { fill: BOT.visor, stroke: '#fff', strokeWidth: 4, roughness: .4 });
    if ((o.shield || 'check') === 'lock') { S.arc(0, -14, 44, 52, Math.PI, Math.PI * 2, false, { stroke: '#fff', strokeWidth: 7, roughness: .4 }); S.rrect(-28, -14, 56, 46, 8, { fill: '#fff', stroke: 'none' }); }
    else S.lines([[-26, -2], [-6, 20], [28, -24]], { stroke: '#fff', strokeWidth: 12, roughness: .5 });
  }
}

function botBadge(B, o, L, pos, hatOn, part) {                      // role name tag; never covers the chest mark
  const T = String(o.role).toUpperCase(), col = o.roleColor || BOT.deep;
  let fs = 50, tw = measure(T, fs, 'Marker');
  if (tw > 220) { fs *= 220 / tw; tw = 220; }
  const bw = Math.max(130, tw + 44), bh = 92;
  if (pos === 'top') {
    const G = B.at(0, hatOn ? -400 : -360, 1, -3);
    G.rrect(-bw / 2, -bh / 2, bw, bh, 14, { fill: '#fff', ...L });
    G.rect(-bw / 2 + 4, -bh / 2 + 4, bw - 8, 14, { fill: col, stroke: 'none', roughness: .3 });
    G.text(T, 0, 10, { font: 'Marker', size: fs, fill: BOT.line });
    return;
  }
  if (part !== 'card') for (const sx of [-1, 1]) B.lines([[sx * 22, -116], [sx * 66, -88], [sx * 64, 12], [sx * 36, 34]], { stroke: col, strokeWidth: 9 * B.scale, roughness: .4 });
  if (part === 'straps') return;
  B.rrect(-bw / 2, 30, bw, bh, 14, { fill: '#fff', ...L });
  B.rect(-bw / 2 + 4, 34, bw - 8, 14, { fill: col, stroke: 'none', roughness: .3 });
  B.rrect(-16, 22, 32, 16, 6, { fill: BOT.joint, ...L, strokeWidth: L.strokeWidth * .8 });
  B.text(T, 0, 82, { font: 'Marker', size: fs, fill: BOT.line });
}

function payaiHead(D, x, y, s = 1, o = {}) {
  const H = D.at(x, y, s, o.tilt || 0);
  const sw = 5 * clamp(0.6 + 0.4 * H.scale, 0.78, 1);
  const L = { stroke: BOT.line, strokeWidth: sw, roughness: 0.55 };
  drawBotHead(H, Object.assign({ phase: 23 }, o), L);
  botEmote(H, o.emote, 0, 0, 1);
  H.headTop = [x, y - 94 * s];
  return H;
}

function payaiBot(D, x, y, s = 1, o = {}) {
  const pose = BOT_POSES[o.pose] ? o.pose : 'idle';
  const meta = BOT_POSE_META[pose] || {};
  const T = D.T || 0;
  if (meta.legs === 'walk') y -= Math.abs(Math.sin(T * Math.PI * 2.8)) * 8 * s;
  const rot = o.rot || 0;
  const B = D.at(x, y, s, rot);
  const sw = 5 * clamp(0.6 + 0.4 * B.scale, 0.78, 1);            // a little thinner when small, so it stays clean
  const L = { stroke: BOT.line, strokeWidth: sw, roughness: 0.55 };
  const thin = Object.assign({}, L, { strokeWidth: sw * 0.8 });
  const lod = B.scale < 0.5 ? 'lo' : 'hi';
  let arms = botPoseArms(pose, T);
  if (o.flip) arms = arms.map(mirrorArm).reverse();
  const prop = meta.prop;
  const tilt = o.tilt ?? meta.tilt ?? 0;
  const ho = Object.assign({ phase: 23, lookY: meta.lookY }, o, { face: o.face || 'happy' });
  const back = o.view === 'back';

  botLegs(B, meta.legs, T, L, o.seat);
  if (meta.legs !== 'sit') {
    B.rrect(-70, 78, 140, 40, 20, { fill: BOT.shell, ...L });                       // hips
  }
  B.rrect(-64, 60, 128, 26, 13, { fill: BOT.joint, ...thin });                       // waist ring
  B.rect(-24, -124, 48, 26, { fill: BOT.shade, ...thin });                           // neck
  B.path('M -58 -104 H 58 Q 98 -104 98 -64 L 86 30 Q 80 70 44 70 H -44 Q -80 70 -86 30 L -98 -64 Q -98 -104 -58 -104 Z', { fill: BOT.shell, ...L });
  if (!back) {
    B.rrect(-60, -80, 120, 88, 22, { fill: BOT.plate, ...thin });
    payaiMark(B, 0, -36, 58);
  } else B.rrect(-40, -70, 80, 50, 14, { fill: BOT.plate, ...thin });
  const badgePos = o.role ? (o.rolePos || (prop && prop !== 'shield' ? 'top' : 'lanyard')) : null;
  if (badgePos === 'lanyard' && !back) botBadge(B, o, L, 'lanyard', false, 'straps');
  const N = B.at(0, -112, 1, tilt), H = N.at(0, -96);
  drawBotHead(H, ho, L);
  if (badgePos === 'top') botBadge(B, o, L, 'top', !!o.hat);
  if (o.emote) botEmote(B, o.emote, 0, -208);
  const front = prop === 'sign' || prop === 'tablet' || o.propL || o.propR;
  if (prop === 'laptop') { arms.forEach(a => botSleeve(B, a, L)); botProp(B, 'laptop', o, L); }
  else if (front) {
    arms.forEach(a => botSleeve(B, a, L));
    if (prop) botProp(B, prop, o, L);
    if (o.propL) o.propL(B.at(arms[0].hand[0], arms[0].hand[1]));
    if (o.propR) o.propR(B.at(arms[1].hand[0], arms[1].hand[1]));
    arms.forEach(a => botGlove(B, a, L, lod));
  } else {
    arms.forEach(a => { botSleeve(B, a, L); botGlove(B, a, L, lod); });
    if (prop === 'shield') botProp(B, 'shield', o, L);
  }
  if (badgePos === 'lanyard' && !back) botBadge(B, o, L, 'lanyard', false, 'card');
  // anchors in D's units
  const r = rot * Math.PI / 180, c = Math.cos(r), sn = Math.sin(r);
  const P = (px, py) => [x + s * (px * c - py * sn), y + s * (px * sn + py * c)];
  const tr = tilt * Math.PI / 180, hp = (px, py) => P(px * Math.cos(tr) - (py + 112) * Math.sin(tr), -112 + px * Math.sin(tr) + (py + 112) * Math.cos(tr));
  B.anchors = { handL: P(...arms[0].hand), handR: P(...arms[1].hand), headTop: hp(0, -302), head: hp(0, -208), chest: P(0, -36), belly: P(0, 0), feet: P(0, 182) };
  Object.assign(B, B.anchors);
  return B;
}
