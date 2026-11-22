// Make one PayAI bot SVG (and PNG) from the command line. Needs Node 18+ and Playwright (npm i playwright; npx playwright install chromium).
// Usage: node generator/export.mjs out.svg --pose point --face happy --role CODEX [--png out.png] [--head 1] [--emote !]
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const outSvg = args.shift();
if (!outSvg || outSvg.startsWith('--')) { console.error('usage: node export.mjs out.svg --pose point --face happy [--role CODEX] [--png out.png]'); process.exit(1); }
const opts = {}; let png = null;
for (let i = 0; i < args.length; i += 2) {
  const k = args[i].replace(/^--/, ''), v = args[i + 1];
  if (k === 'png') { png = v; continue; }
  opts[k] = /^-?\d+(\.\d+)?$/.test(v) ? +v : (v === 'true' || v === '1') && ['glitch', 'flip', 'head'].includes(k) ? true : v;
}
const dir = path.dirname(new URL(import.meta.url).pathname);
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage();
await page.goto(`file://${dir}/mascot.html`);
await page.waitForFunction(() => window.PAYAI_READY === true);
const svg = await page.evaluate(o => payaiSVG(o), opts);
fs.writeFileSync(outSvg, svg);
if (png) {
  await page.setContent(`<body style="margin:0;background:transparent">${svg}</body>`);
  await page.evaluate(() => document.fonts.ready);
  await (await page.$('svg')).screenshot({ path: png, omitBackground: true });
}
await browser.close();
console.log('wrote', outSvg, png || '');
