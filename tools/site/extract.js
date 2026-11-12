// One time (and repeatable) extraction: takes the deployed redesign pages, which carry their
// styles, code and town data inline, and writes readable sources into src/.
//   node tools/site/extract.js
// Nothing about behaviour changes: inline <style> runs become one stylesheet per run, big
// inline scripts become files, and big data literals (town lists) become shared data files.
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const acorn = require('acorn');
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'src');
const { PAGES, isTownPage } = require('./pages');

const h8 = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const BIG_SCRIPT = 2000, BIG_DATA = 3000;

// Resolve a document relative URL to a site absolute path ("/img/x.webp").
// docBase is the page's own URL, or its <base href> resolved against it.
function absUrl(u, docBase) {
  if (/^(data:|https?:|\/\/|#|\/)/.test(u)) return u;
  const r = new URL(u, docBase);
  return r.pathname + r.search;
}
function cssAbsUrls(css, docDir) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m, q, u) => `url(${q}${absUrl(u.trim(), docDir)}${q})`);
}

// A literal is data if it contains no identifiers, calls or template literals.
function pureLiteral(node) {
  let ok = true;
  (function walk(n, parentKey) {
    if (!ok || !n || typeof n.type !== 'string') return;
    if (n.type === 'Identifier' && parentKey !== 'key') { ok = false; return; }
    if (!['ArrayExpression', 'ObjectExpression', 'Property', 'Literal', 'UnaryExpression', 'Identifier'].includes(n.type)) { ok = false; return; }
    if (n.type === 'Property' && (n.computed || n.method || n.shorthand)) { ok = false; return; }
    for (const k of Object.keys(n)) {
      const v = n[k];
      if (Array.isArray(v)) v.forEach(x => walk(x, k)); else if (v && typeof v.type === 'string') walk(v, k);
    }
  })(node);
  return ok;
}

// Pull big top level data literals out of a script. Returns { code, data: [{name, src}] }.
function splitData(code) {
  const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', ranges: true });
  const edits = [], data = [];
  for (const st of ast.body) {
    if (st.type !== 'VariableDeclaration') continue;
    const keep = [], take = [];
    for (const d of st.declarations) {
      if (d.id.type === 'Identifier' && d.init && d.init.end - d.init.start >= BIG_DATA && pureLiteral(d.init)) take.push(d); else keep.push(d);
    }
    if (!take.length) continue;
    take.forEach(d => data.push({ name: d.id.name, kind: st.kind, src: code.slice(d.init.start, d.init.end) }));
    // The statement may or may not end with a semicolon in the source; keep whatever followed it.
    const hasSemi = code[st.end - 1] === ';';
    const rest = keep.length ? `${st.kind} ${keep.map(d => code.slice(d.start, d.end)).join(',')}${hasSemi ? ';' : ''}` : (hasSemi ? '' : ';');
    edits.push([st.start, st.end, rest]);
  }
  let out = code;
  for (const [a, b, r] of edits.sort((x, y) => y[0] - x[0])) out = out.slice(0, a) + r + out.slice(b);
  return { code: out, data };
}

const TOKEN = /<style\b([^>]*)>([\s\S]*?)<\/style>|<script\b([^>]*)>([\s\S]*?)<\/script>|<link\b([^>]*)>/gi;
const attr = (a, n) => { const m = new RegExp(`\\b${n}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(a || ''); return m ? (m[2] ?? m[3] ?? m[4]) : null; };

function extractPage(rel, key, shared) {
  const file = path.join(ROOT, rel);
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('/assets/v3/')) throw new Error(`${rel} is already a built page. Extract only runs on pages with inline styles and code (git checkout the page first).`);
  const baseHref = (/<base\s+href="([^"]*)"/i.exec(html) || [])[1];
  const docDir = new URL(baseHref || '', new URL(rel, 'http://site/')).href;
  const bodyAt = html.search(/<body\b/i);
  const out = []; let last = 0, m;
  const runs = { head: null, body: null };
  let cssN = 0, jsN = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(html))) {
    out.push(html.slice(last, m.index)); last = TOKEN.lastIndex;
    const zone = m.index < bodyAt ? 'head' : 'body';
    if (m[2] !== undefined && m[0].startsWith('<style')) {           // inline <style>
      const a = m[1] || '', id = attr(a, 'id'), media = attr(a, 'media');
      let css = cssAbsUrls(m[2], docDir);
      if (media) css = `@media ${media}{${css}}`;
      css = `/* ${id ? '#' + id : 'style'} */\n${css.trim()}\n`;
      if (runs[zone]) { runs[zone].css.push(css); out.push(''); continue; }
      const name = shared.townCss ? 'town' : `${key}-${++cssN}`;
      runs[zone] = { name, css: [css] };
      if (!shared.townCss || !shared.cssDone) shared.cssRuns.push(runs[zone]);
      out.push(`<link rel="stylesheet" href="{{css:${name}}}">`);
      continue;
    }
    if (m[0].toLowerCase().startsWith('<link')) {                    // <link>
      const a = m[5] || '', rels = (attr(a, 'rel') || '').toLowerCase(), href = attr(a, 'href');
      if (rels === 'stylesheet') runs[zone] = null;                    // a stylesheet link ends the run
      if (rels === 'stylesheet' && href && !/^https?:|fonts\.css/.test(href)) {
        const p = absUrl(href, docDir);
        shared.assets.add(p);
        out.push(m[0].replace(/href=("[^"]*"|'[^']*'|[^\s>]+)/, `href="{{asset:${p}}}"`));
        continue;
      }
      out.push(m[0]); continue;
    }
    // <script>
    const a = m[3] || '', code = m[4] || '', src = attr(a, 'src'), type = (attr(a, 'type') || '').toLowerCase();
    if (src) {
      if (!/^https?:/.test(src)) {
        const p = absUrl(src, docDir);
        shared.assets.add(p);
        out.push(m[0].replace(/src=("[^"]*"|'[^']*'|[^\s>]+)/, `src="{{asset:${p}}}"`));
      } else out.push(m[0]);
      continue;
    }
    if (type && type !== 'text/javascript') { out.push(m[0]); continue; }
    if (code.length < BIG_SCRIPT || shared.townCss) {                 // small or per town: stays inline, minified at build
      out.push(`<script${a}>{{inline-js}}${code}{{/inline-js}}</script>`); continue;
    }
    const sp = splitData(code);
    const tags = [];
    for (const d of sp.data) {
      const dk = `${d.name.toLowerCase()}-${h8(d.src)}`;
      if (!shared.data[dk]) {
        let json = null; try { JSON.parse(d.src); json = d.src; } catch (e) {}
        shared.data[dk] = { name: d.name, kind: d.kind, json, src: d.src, pages: [] };
      }
      shared.data[dk].pages.push(key);
      tags.push(`<script src="{{data:${dk}}}"></script>`);
    }
    const jn = `${key}-${++jsN}`;
    write(path.join(SRC, 'js', jn + '.js'), sp.code.trim() + '\n');
    out.push(tags.join('') + `<script${a} src="{{js:${jn}}}"></script>`);
  }
  out.push(html.slice(last));
  return out.join('');
}

function main() {
  fs.rmSync(path.join(SRC, 'css'), { recursive: true, force: true });
  fs.rmSync(path.join(SRC, 'js'), { recursive: true, force: true });
  fs.rmSync(path.join(SRC, 'data'), { recursive: true, force: true });
  const shared = { assets: new Set(), data: {}, cssRuns: [], townJs: {} };
  for (const [rel, key] of Object.entries(PAGES)) {
    shared.townCss = false; shared.cssRuns = [];
    const html = extractPage(rel, key, shared);
    write(path.join(SRC, 'pages', rel), html);
    for (const r of shared.cssRuns) write(path.join(SRC, 'css', r.name + '.css'), r.css.join('\n'));
  }
  // Town pages share one stylesheet; check every page really has the same one.
  const towns = fs.readdirSync(path.join(ROOT, 'towns')).filter(isTownPage).sort();
  let townCss = null;
  for (const f of towns) {
    shared.townCss = true; shared.cssRuns = [];
    const html = extractPage('towns/' + f, 'town', shared);
    const css = shared.cssRuns.map(r => r.css.join('\n')).join('\n');
    if (townCss === null) townCss = css; else if (css !== townCss) throw new Error('town styles differ on ' + f);
    write(path.join(SRC, 'towns', f), html);
  }
  write(path.join(SRC, 'css', 'town.css'), townCss);
  for (const [k, d] of Object.entries(shared.data)) {
    const pages = [...new Set(d.pages)];
    const base = pages.length > 1 ? (d.name === 'T' ? 'towns' : d.name.toLowerCase()) : `${pages[0]}-${d.name.toLowerCase()}`;
    d.file = base + (d.json ? '.json' : '.js');
    write(path.join(SRC, 'data', d.file), d.json ? JSON.stringify(JSON.parse(d.json), null, 1) + '\n' : d.src + '\n');
  }
  write(path.join(SRC, 'manifest.json'), JSON.stringify({
    data: Object.fromEntries(Object.entries(shared.data).map(([k, d]) => [k, { name: d.name, kind: d.kind, format: d.json ? 'json' : 'js', file: d.file, pages: [...new Set(d.pages)] }])),
    assets: [...shared.assets].sort(),
  }, null, 1) + '\n');
  console.log('pages', Object.keys(PAGES).length, 'towns', towns.length, 'data', Object.keys(shared.data).length, 'shared assets', shared.assets.size);
  for (const [k, d] of Object.entries(shared.data)) console.log('  data', k, (d.src.length / 1024 | 0) + 'K', [...new Set(d.pages)].join(','));
}
main();
