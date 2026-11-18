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
// Everything is built into a scratch folder first. Only when every page has built does it replace
// the served files, so a failed build can never leave the site half deleted.
//   node build.js            build, then swap into the site
//   node build.js --out DIR  build into DIR only (used to compare a build with what is live)
//   node build.js --dist DIR the whole public site in DIR: every served file plus the built pages (Vercel runs this)
const arg = k => process.argv.includes(k) ? path.resolve(process.argv[process.argv.indexOf(k) + 1]) : null;
const DIST = arg('--dist');
const OUTARG = arg('--out') || DIST;
// Never served: sources, tools and work files (keep in step with .vercelignore).
const PRIVATE = new Set(['.git', '.github', 'node_modules', 'src', 'tools', 'drafts', 'tests', 'supabase', 'dist', 'SOURCE.md', 'CLAUDE.md', '.vercel', '.vercelignore', '.gitignore']);
function copyPublic(to) {
  fs.mkdirSync(to, { recursive: true });
  for (const top of fs.readdirSync(ROOT)) {
    if (PRIVATE.has(top)) continue;
    fs.cpSync(path.join(ROOT, top), path.join(to, top), { recursive: true, filter: f => { const rel = path.relative(ROOT, f).split(path.sep).join('/'); return !/^mail\/(fc-send\.ts\.txt|render\.js)$/.test(rel) && !rel.endsWith('.DS_Store'); } });
  }
}
const DEST = OUTARG || fs.mkdtempSync(path.join(require('os').tmpdir(), 'fc-build-'));
const OUT = path.join(DEST, 'assets', 'v3');
const { PAGES } = require('./pages');
const images = require('./images');
const towns = require('./towns');

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
  fs.rmSync(DEST, { recursive: true, force: true }); fs.mkdirSync(DEST, { recursive: true });
  if (DIST) { copyPublic(DEST); fs.rmSync(path.join(DEST, 'assets', 'v3'), { recursive: true, force: true }); }
  const man = JSON.parse(read(path.join(SRC, 'manifest.json')));
  // Shared files come from the {{asset:...}} markers in the sources, so a page can't point at one the build skipped.
  const walk0 = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk0(path.join(d, e.name)) : [path.join(d, e.name)]);
  man.assets = [...new Set(walk0(SRC).filter(f => f.endsWith('.html')).flatMap(f => [...read(f).matchAll(/\{\{asset:([^}]+)\}\}/g)].map(m => m[1])))].sort();
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  images.ensure([...walk(SRC), ...man.assets.map(q => path.join(ROOT, q.split('?')[0]))]);
  const upgrade = `<script>${await minJs(images.UPGRADE, 'photo upgrade')}</script>`;
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
    write(path.join(OUT, sdir, path.basename(p)), images.rewrite(body, { css: p.endsWith('.css') }));
    for (const q of man.assets) if (q.split('?')[0] === p) url['asset:' + q] = `/assets/v3/${sdir}/${path.basename(p)}`;
  }

  // Files kept outside the build's folder that pages load by a content hashed name
  // (analytics and lead forms, edited as assets/fc-ga.js and assets/fc-connect.js): the page gets the
  // hashed copy whose bytes match the file, made if missing. The map outline goes into /assets/v3/data.
  const crypto2 = require('crypto');
  for (const q of new Set(walk0(SRC).filter(f => /\.(html|js|css)$/.test(f)).flatMap(f => [...read(f).matchAll(/\{\{static:([^}]+)\}\}/g)].map(m => m[1])))) {
    const file = path.join(ROOT, q), body = fs.readFileSync(file), h = crypto2.createHash('sha1').update(body).digest('hex').slice(0, 10);
    const ext = path.extname(q), base = path.basename(q, ext);
    if (q.startsWith('/img/map/')) { const out = `data/fl-compass.${h}${ext}`; fs.mkdirSync(path.join(OUT, 'data'), { recursive: true }); fs.writeFileSync(path.join(OUT, out), body); url['static:' + q] = '/assets/v3/' + out; continue; }
    const dir = path.dirname(q), twin = fs.readdirSync(path.join(ROOT, dir)).find(f => new RegExp(`^${base}\\.[0-9a-f]{10}\\${ext}$`).test(f) && fs.readFileSync(path.join(ROOT, dir, f)).equals(body));
    const name = twin || `${base}.${h}${ext}`;
    if (!twin) fs.writeFileSync(path.join(DEST, dir.slice(1), name), body, { flag: 'w' });
    url['static:' + q] = `${dir}/${name}`;
  }

  // Page styles and code.
  for (const f of fs.readdirSync(path.join(SRC, 'css'))) {
    const name = f.replace(/\.css$/, ''), body = images.rewrite(minCss(read(path.join(SRC, 'css', f))), { css: true });
    const out = `${name}.${h10(body)}.css`; write(path.join(OUT, out), body); url['css:' + name] = '/assets/v3/' + out;
  }
  // A folder src/js/<name>/ is one page script split into parts: its files are joined in name order.
  const jsSrc = f => { const p = path.join(SRC, 'js', f); return fs.statSync(p).isDirectory() ? fs.readdirSync(p).filter(x => x.endsWith('.js')).sort().map(x => read(path.join(p, x))).join('\n') : read(p) };
  for (const f of fs.readdirSync(path.join(SRC, 'js'))) {
    // A script that starts with // photos as written keeps its photo addresses (the quiz's full screen backgrounds).
    const code = jsSrc(f), asIs = code.startsWith('// photos as written');
    const name = f.replace(/\.js$/, ''), body = asIs ? await minJs(code, f) : images.rewrite(await minJs(code, f));
    const out = `${name}.${h10(body)}.js`; write(path.join(OUT, out), body); url['js:' + name] = '/assets/v3/' + out;
  }
  // Data: each file declares one global, exactly as the page script used to.
  for (const [key, d] of Object.entries(man.data)) {
    const file = path.join(SRC, 'data', d.file);
    const lit = d.format === 'json' ? JSON.stringify(JSON.parse(read(file))) : (await minJs(`(${read(file)})`, d.file)).replace(/^\(|\);?$/g, '');
    // Data keeps its photo addresses as written: the scripts that make it choose full photos for the
    // big quiz and results backgrounds, which the small default copy makes look soft.
    const body = `${d.kind} ${d.name}=${lit};`;
    const out = `data/${path.basename(d.file, path.extname(d.file))}.${h10(body)}.js`;
    write(path.join(OUT, out), body); url['data:' + key] = '/assets/v3/' + out;
  }

  // Pages.
  // A page that starts with <!-- photos as written --> keeps its photo addresses exactly as written
  // (the homepage picks each photo's size by hand); other pages get the build's sizing.
  const fill = async (html, where) => {
    const asIs = html.startsWith('<!-- photos as written -->');
    if (asIs) html = html.slice(html.indexOf('\n') + 1);
    const rw = (x, o) => asIs ? x : images.rewrite(x, o);
    const parts = [];
    const re = /\{\{inline-js\}\}([\s\S]*?)\{\{\/inline-js\}\}/g; let m, last = 0;
    while ((m = re.exec(html))) { parts.push(html.slice(last, m.index), rw(await minJs(m[1], where))); last = re.lastIndex; }
    parts.push(html.slice(last));
    // {{inline-css}}...{{/inline-css}}: a readable stylesheet kept inside the page (the homepage inlines its CSS for speed).
    html = parts.join(''); parts.length = 0;
    html = html.replace(/\{\{inline-css\}\}([\s\S]*?)\{\{\/inline-css\}\}/g, (m, css) => rw(minCss(css), { css: true }));
    parts.push(html);
    const out = (asIs ? (x => x) : images.imgTags)(rw(parts.join('').replace(/<head>(<script src="[^"]*fc-ga[^"]*"><\/script>|<script>\{\{include:[^}]*fc-ga[^}]*\}\}<\/script>)?(<base [^>]*>)?/, (m, ga, base) => '<head>' + (ga || '') + (base || '') + upgrade).replace(/\{\{([a-z]+:[^}]+)\}\}/g, (x, k) => { if (k.startsWith('include:')) return read(path.join(ROOT, k.slice(8))).replace(/\n$/, ''); if (!url[k]) throw new Error(`${where}: nothing built for ${k}`); return url[k]; })));
    return /(^|\/)towns\/[^/]+\.html$/.test(where) || /town/.test(where) ? images.heroFirst(out) : out;
  };
  let n = 0;
  for (const rel of Object.keys(PAGES)) { write(path.join(DEST, rel), await fill(read(path.join(SRC, 'pages', rel)), rel)); n++; }
  const townTpl = read(path.join(SRC, 'templates', 'town.html'));
  for (const f of fs.readdirSync(path.join(SRC, 'towns')).sort()) { write(path.join(DEST, 'towns', f), await fill(towns.render(path.join(SRC, 'towns', f), townTpl), 'towns/' + f)); n++; }
  if (n !== Object.keys(PAGES).length + 167) throw new Error(`built ${n} pages, expected ${Object.keys(PAGES).length + 167}`);
  if (OUTARG) { console.log(`built ${n} pages into ${DEST}${DIST ? ' with the rest of the public site' : ''} (repo not touched)`); return; }
  // Swap: new assets/v3 in, then every page. Nothing in the site was touched before this point.
  const live = path.join(ROOT, 'assets', 'v3'), old = live + '.old';
  fs.rmSync(old, { recursive: true, force: true });
  if (fs.existsSync(live)) fs.renameSync(live, old);
  fs.cpSync(OUT, live, { recursive: true });
  fs.rmSync(OUT, { recursive: true });
  fs.cpSync(DEST, ROOT, { recursive: true });
  fs.rmSync(old, { recursive: true, force: true }); fs.rmSync(DEST, { recursive: true, force: true });
  console.log(`built ${n} pages, ${Object.keys(url).length} assets into /assets/v3`);
}
main().catch(e => { console.error(e); process.exit(1); });
