// Builds the redesign pages from src/ into the deployed files.
//   node tools/site/build.js
// Page specific styles, code and data go to /assets/v3/ with a content hash in the name, so
// browsers can cache them for a year and still always get the newest version. Shared files
// (menu, search, map outline, site wide styles) keep their names inside one versioned folder,
// /assets/v3/s-<hash>/, because fc-menu.js finds fc-search.js by its own file name.
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { minify: terser } = require('terser');
const csso = require('csso');
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'assets', 'v3');
const { PAGES } = require('./pages');
const images = require('./images');

const h10 = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 10);
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const read = p => fs.readFileSync(p, 'utf8');
const TERSER = { ecma: 2020, compress: { passes: 1, keep_fargs: true, keep_infinity: true }, mangle: { toplevel: false }, format: { comments: false } };

function absUrl(u, dir) {
  if (/^(data:|https?:|\/\/|#|\/)/.test(u)) return u;
  return path.posix.normalize('/' + path.posix.join(dir, u));
}
const cssAbs = (css, dir) => css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m, q, u) => `url(${q}${absUrl(u.trim(), dir)}${q})`);
const minCss = css => csso.minify(css, { restructure: false, comments: false }).css;
async function minJs(code, name) {
  const r = await terser(code, TERSER);
  if (!r.code) throw new Error('terser failed on ' + name);
  return r.code;
}

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  const man = JSON.parse(read(path.join(SRC, 'manifest.json')));
  const url = {};   // marker -> served path

  // Shared files, one versioned folder for all of them.
  const shared = {};
  // fc-menu.js and fc-search.js work out the site root and each other from their own address,
  // so they stay where they are (versioned by their ?v= query) instead of moving.
  const STAY = new Set(['/assets/fc-menu.js', '/assets/fc-search.js']);
  for (const q of man.assets) if (STAY.has(q.split('?')[0])) url['asset:' + q] = q;
  const assets = [...new Set(man.assets.map(q => q.split('?')[0]).filter(p => !STAY.has(p)))];
  for (const p of assets) {
    const ext = path.extname(p), file = path.join(ROOT, p);
    let body = read(file);
    body = ext === '.css' ? minCss(cssAbs(body, path.posix.dirname(p))) : await minJs(body, p);
    shared[p] = body;
  }
  const names = Object.keys(shared).map(p => path.basename(p));
  if (new Set(names).size !== names.length) throw new Error('two shared files have the same name');
  const sdir = 's-' + h10(Object.keys(shared).sort().map(p => p + shared[p]).join('\n'));
  for (const [p, body] of Object.entries(shared)) {
    write(path.join(OUT, sdir, path.basename(p)), images.rewrite(body));
    for (const q of man.assets) if (q.split('?')[0] === p) url['asset:' + q] = `/assets/v3/${sdir}/${path.basename(p)}`;
  }

  // Page styles and code.
  for (const f of fs.readdirSync(path.join(SRC, 'css'))) {
    const name = f.replace(/\.css$/, ''), body = images.rewrite(minCss(read(path.join(SRC, 'css', f))));
    const out = `${name}.${h10(body)}.css`; write(path.join(OUT, out), body); url['css:' + name] = '/assets/v3/' + out;
  }
  for (const f of fs.readdirSync(path.join(SRC, 'js'))) {
    const name = f.replace(/\.js$/, ''), body = images.rewrite(await minJs(read(path.join(SRC, 'js', f)), f));
    const out = `${name}.${h10(body)}.js`; write(path.join(OUT, out), body); url['js:' + name] = '/assets/v3/' + out;
  }
  // Data: each file declares one global, exactly as the page script used to.
  for (const [key, d] of Object.entries(man.data)) {
    const file = path.join(SRC, 'data', d.file);
    const lit = d.format === 'json' ? JSON.stringify(JSON.parse(read(file))) : (await minJs(`(${read(file)})`, d.file)).replace(/^\(|\);?$/g, '');
    const body = images.rewrite(`${d.kind} ${d.name}=${lit};`);
    const out = `data/${path.basename(d.file, path.extname(d.file))}.${h10(body)}.js`;
    write(path.join(OUT, out), body); url['data:' + key] = '/assets/v3/' + out;
  }

  // Pages.
  const fill = async (html, where) => {
    const parts = [];
    const re = /\{\{inline-js\}\}([\s\S]*?)\{\{\/inline-js\}\}/g; let m, last = 0;
    while ((m = re.exec(html))) { parts.push(html.slice(last, m.index), images.rewrite(await minJs(m[1], where))); last = re.lastIndex; }
    parts.push(html.slice(last));
    return images.rewrite(parts.join('').replace(/\{\{([a-z]+:[^}]+)\}\}/g, (x, k) => { if (!url[k]) throw new Error(`${where}: nothing built for ${k}`); return url[k]; }));
  };
  let n = 0;
  for (const rel of Object.keys(PAGES)) { write(path.join(ROOT, rel), await fill(read(path.join(SRC, 'pages', rel)), rel)); n++; }
  for (const f of fs.readdirSync(path.join(SRC, 'towns')).sort()) { write(path.join(ROOT, 'towns', f), await fill(read(path.join(SRC, 'towns', f)), f)); n++; }
  console.log(`built ${n} pages, ${Object.keys(url).length} assets into /assets/v3`);
}
main().catch(e => { console.error(e); process.exit(1); });
