// Web sized photos.
//
// Every photo the redesign pages use from img/c, img/c/vibes, img/atlas and img/g that is wider
// than 1000px gets a 960px wide webp copy in an m/ folder next to it (img/c/m/naples.webp).
// Pages ask for the 960px copy; the small script below (UPGRADE) swaps in the full photo only for
// the few places that show it wider than ~1100 screen pixels (full width heroes, retina screens).
// JPG/PNG references are pointed at their webp twin when one exists.
//
//   node tools/site/images.js       make any missing 960px copies (build runs this too)
'use strict';
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '../..');
const RE = /img\/(c\/vibes|c|atlas|g)\/([A-Za-z0-9_.-]+?)\.(webp|jpe?g|png)\b/g;
const WIDTH = 960, SMALL = 480, NEEDS = 1000;
let variants = null;   // Set of "dir/name" that have an m/ copy

const twin = (dir, name, ext) => ext !== 'webp' && fs.existsSync(path.join(ROOT, 'img', dir, name + '.webp')) ? 'webp' : ext;

function scanText(s, found) { for (const m of s.matchAll(RE)) found.add(m[1] + '/' + m[2] + '.' + twin(m[1], m[2], m[3])); }

// Make the 960px copies for every photo referenced in the given text files.
function ensure(files) {
  const found = new Set();
  for (const f of files) scanText(fs.readFileSync(f, 'utf8'), found);
  const todo = [];
  variants = new Set();
  for (const ref of found) {
    const [dir, file] = [path.dirname(ref), path.basename(ref)];
    const src = path.join(ROOT, 'img', dir, file);
    if (!file.endsWith('.webp') || !fs.existsSync(src)) continue;
    const out = path.join(ROOT, 'img', dir, 'm', file);
    const small = out.replace('/m/', '/s/');
    if (fs.existsSync(out) && fs.existsSync(small) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) { variants.add(dir + '/' + file.replace(/\.webp$/, '')); continue; }
    todo.push([src, out, dir + '/' + file.replace(/\.webp$/, '')]);
  }
  if (todo.length) {
    const py = `
import sys,json,os
from PIL import Image
done=[]
for src,out,key in json.loads(sys.stdin.read()):
    im=Image.open(src)
    if im.width<=${NEEDS}: continue
    os.makedirs(os.path.dirname(out),exist_ok=True)
    im=im.convert('RGB') if im.mode not in ('RGB','RGBA') else im
    im.resize((${WIDTH},round(im.height*${WIDTH}/im.width)),Image.LANCZOS).save(out,'WEBP',quality=80,method=6)
    small=out.replace('/m/','/s/');os.makedirs(os.path.dirname(small),exist_ok=True)
    im.resize((${SMALL},round(im.height*${SMALL}/im.width)),Image.LANCZOS).save(small,'WEBP',quality=78,method=6)
    done.append(key)
print(json.dumps(done))`;
    const done = JSON.parse(execFileSync('python3', ['-c', py], { input: JSON.stringify(todo), encoding: 'utf8', maxBuffer: 1 << 26 }));
    done.forEach(k => variants.add(k));
    console.log(`made ${done.length} web sized photos (${todo.length - done.length} were already small)`);
  }
  return variants;
}

// Point photo references at their webp twin, and (outside stylesheets) at the 480px copy, which the
// page script below swaps for a bigger one where the photo shows bigger. <img> tags written in the
// page HTML start at the 960px copy instead, so a big photo never flashes blurry.
function rewrite(s, { css = false } = {}) {
  return s.replace(RE, (m, dir, name, ext) => {
    const e = twin(dir, name, ext);
    if (!css && e === 'webp' && variants && variants.has(dir + '/' + name)) return `img/${dir}/s/${name}.webp`;
    return `img/${dir}/${name}.${e}`;
  });
}

// Runs first thing in <head> on every redesign page. Background photos in style="" attributes are
// held back for one frame: as soon as an element appears its photo is set aside, and once the
// browser has laid it out (same frame, before anything is painted) the right size goes back in,
// at the size it is shown (for cover photos, the width it is stretched to): the 480px copy up to ~500 screen pixels wide, the 960px copy up to ~1100,
// the full photo above that. So each photo downloads once, at the right size. <img> tags keep the
// size they start at and switch up if shown wider.
const UPGRADE = `(function(){var T=/img\\/(?:c\\/vibes|c|atlas|g)\\/[ms]\\//,R=/(img\\/(?:c\\/vibes|c|atlas|g))\\/[ms]\\/([\\w.-]+\\.webp)/g,K=/url\\([^)]*img\\/(?:c\\/vibes|c|atlas|g)\\/[ms]\\/[^)]*\\)/g,
held=new WeakMap(),lvl=new WeakMap(),mine=new WeakMap(),ro,SZ={s:'$1/s/$2',m:'$1/m/$2',f:'$1/$2'},N={s:1,m:2,f:3};
function px(e){var r=e.getBoundingClientRect(),w=r.width;if(w&&e.tagName!='IMG'&&getComputedStyle(e).backgroundSize.indexOf('cover')>=0)w=Math.max(w,r.height*1.6);return w*(window.devicePixelRatio||1)}
function want(w){return w>1100?'f':w>500?'m':'s'}
function put(e,a,v){mine.set(e,v);e.setAttribute(a,v)}
function seen(l){l.forEach(function(x){var e=x.target,w=px(e);if(!w)return;var k=want(w),h=held.get(e);
if(h){held.delete(e);if((e.getAttribute('style')||'')===h.out){put(e,'style',h.orig.replace(R,SZ[k]));lvl.set(e,k)}}
else if(N[k]>N[lvl.get(e)||'s']){var s=e.getAttribute('src'),t=e.getAttribute('style');if(s&&T.test(s))put(e,'src',s.replace(R,SZ[k]));if(t&&T.test(t))put(e,'style',t.replace(R,SZ[k]));lvl.set(e,k)}
if(k=='f')ro.unobserve(e)})}
function take(e){ro=ro||new ResizeObserver(seen);var t=e.getAttribute('style');if(e.tagName!='IMG'&&t&&T.test(t)){var o=t.replace(K,'none');held.set(e,{orig:t,out:o});put(e,'style',o)}else lvl.set(e,(e.getAttribute('src')||'').indexOf('/s/')>0?'s':'m');ro.observe(e)}
function has(e){return T.test(e.getAttribute('style')||'')||(e.tagName=='IMG'&&T.test(e.getAttribute('src')||''))}
function scan(n){if(n.nodeType!==1)return;if(has(n))take(n);var l=n.querySelectorAll('[style*="img/"],img[src*="img/"]');for(var i=0;i<l.length;i++)if(has(l[i]))take(l[i])}
new MutationObserver(function(ms){ms.forEach(function(m){if(m.type=='attributes'){var e=m.target;if(e.getAttribute(m.attributeName)!==mine.get(e)&&has(e))take(e)}else m.addedNodes.forEach(scan)})}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['style','src']})})();`;

const imgTags = html => html.replace(/(<img\b[^>]*\bsrc=["'][^"']*img\/(?:c\/vibes|c|atlas|g)\/)s\//g, '$1m/');
module.exports = { ensure, rewrite, imgTags, UPGRADE };
if (require.main === module) {
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  ensure(walk(path.join(ROOT, 'src')));
}
