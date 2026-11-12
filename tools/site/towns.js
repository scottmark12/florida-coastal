// Town pages: one template (src/templates/town.html) plus one file per town (src/towns/<id>.html)
// holding only what is different for that town: its SEO block, its page content, and the small
// amount of data its mini map and contact form need.
//
//   node tools/site/towns.js split   turns full town pages in src/towns into template + town files
//   require('./towns').render(file)  gives back the full page for one town file
//
// split refuses to write anything unless rendering every town gives back its page byte for byte.
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const DIR = path.join(ROOT, 'src', 'towns'), TPL = path.join(ROOT, 'src', 'templates', 'town.html');

const MAP_HEAD = /^\nconst C=(\{[^}]*\}),P=(\[[\s\S]*?\]);\n/;
const NEAR = /const near=(\[[^\]]*\]);/;
const ME = /const me=t\.id=="([^"]+)"/;
const TOWN = /town:("(?:[^"\\]|\\.)*"),timeline/;

// The town data in the page scripts was written by Python's json.dumps; this writes the same text.
function pyJson(v) {
  if (Array.isArray(v)) return '[' + v.map(pyJson).join(', ') + ']';
  if (v && typeof v === 'object') return '{' + Object.entries(v).map(([k, x]) => JSON.stringify(k) + ': ' + pyJson(x)).join(', ') + '}';
  if (typeof v === 'string') return JSON.stringify(v).replace(/[\u007f-\uffff]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
  return JSON.stringify(v);
}

function render(file, tpl = fs.readFileSync(TPL, 'utf8')) {
  const src = fs.readFileSync(file, 'utf8');
  const meta = JSON.parse(/^<!-- town (.*) -->\n/.exec(src)[1]);
  const seo = src.slice(src.indexOf('<!-- seo -->\n') + 13, src.indexOf('\n<!-- content -->\n'));
  const content = src.slice(src.indexOf('\n<!-- content -->\n') + 18).replace(/\n$/, '');
  const slots = {
    seo, content,
    'map-data': `const C=${pyJson(meta.center)},P=${pyJson(meta.mapTowns)};`,
    'near': pyJson(meta.near), 'id': meta.id, 'town-js': JSON.stringify(meta.name),
  };
  return tpl.replace(/\{\{town:([a-z-]+)\}\}/g, (m, k) => { if (!(k in slots)) throw new Error('unknown slot ' + k); return slots[k]; });
}

function parse(html) {
  const seoAt = html.indexOf('<!--seo-->') + 10, headEnd = html.indexOf('</head>');
  const crumbs = html.indexOf('<div class="wrap"><div class="crumbs">');
  const foot = html.indexOf('\n</div><footer class="fx">');
  const scripts = [...html.matchAll(/<script>\{\{inline-js\}\}([\s\S]*?)\{\{\/inline-js\}\}<\/script>/g)];
  if ([seoAt, headEnd, crumbs, foot].some(i => i < 10) || scripts.length !== 2) throw new Error('unexpected town page shape');
  const [map, form] = scripts.map(m => m[1]);
  const mh = MAP_HEAD.exec(map), near = NEAR.exec(map), me = ME.exec(map), town = TOWN.exec(form);
  if (!mh || !near || !me || !town) throw new Error('town scripts changed shape');
  const tpl = html.slice(0, seoAt) + '{{town:seo}}' + html.slice(headEnd, crumbs) + '{{town:content}}' + html.slice(foot, scripts[0].index)
    + '<script>{{inline-js}}\n{{town:map-data}}\n' + map.slice(mh[0].length).replace(NEAR, 'const near={{town:near}};').replace(ME, 'const me=t.id=="{{town:id}}"')
    + '{{/inline-js}}</script>' + html.slice(scripts[0].index + scripts[0][0].length, scripts[1].index)
    + '<script>{{inline-js}}' + form.replace(TOWN, 'town:{{town:town-js}},timeline') + '{{/inline-js}}</script>' + html.slice(scripts[1].index + scripts[1][0].length);
  const meta = { id: me[1], name: JSON.parse(town[1]), near: JSON.parse(near[1]), center: JSON.parse(mh[1]), mapTowns: JSON.parse(mh[2]) };
  return { tpl, meta, seo: html.slice(seoAt, headEnd), content: html.slice(crumbs, foot) };
}

function split() {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html')).sort();
  let tpl = null; const out = [];
  for (const f of files) {
    const html = fs.readFileSync(path.join(DIR, f), 'utf8');
    if (html.startsWith('<!-- town ')) throw new Error(f + ' is already split');
    const p = parse(html);
    if (tpl === null) tpl = p.tpl; else if (p.tpl !== tpl) throw new Error('template differs on ' + f);
    out.push([f, `<!-- town ${JSON.stringify({ page: 'towns/' + f, ...p.meta })} -->\n<!-- seo -->\n${p.seo}\n<!-- content -->\n${p.content}\n`, html]);
  }
  // Prove it: every page must come back exactly.
  const tmp = path.join(require('os').tmpdir(), 'fc-town-check');
  fs.mkdirSync(tmp, { recursive: true });
  for (const [f, src, html] of out) {
    fs.writeFileSync(path.join(tmp, f), src);
    if (render(path.join(tmp, f), tpl) !== html) throw new Error('round trip failed on ' + f);
  }
  fs.mkdirSync(path.dirname(TPL), { recursive: true });
  fs.writeFileSync(TPL, tpl);
  for (const [f, src] of out) fs.writeFileSync(path.join(DIR, f), src);
  console.log(`split ${out.length} town pages into src/templates/town.html + one file per town, all round trips exact`);
}

module.exports = { render, split };
if (require.main === module && process.argv[2] === 'split') split();
