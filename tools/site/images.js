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
const RE = /img\/(c\/vibes|c\/generic|c|atlas|g)\/([A-Za-z0-9_.-]+?)\.(webp|jpe?g|png)\b/g;
const WIDTH = 960, SMALL = 480, TINY = 320, NEEDS = 1000;
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
    const small = out.replace('/m/', '/s/'), tiny = out.replace('/m/', '/t/');
    if (fs.existsSync(out) && fs.existsSync(small) && fs.existsSync(tiny) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) { variants.add(dir + '/' + file.replace(/\.webp$/, '')); continue; }
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
    tiny=out.replace('/m/','/t/');os.makedirs(os.path.dirname(tiny),exist_ok=True)
    im.resize((${TINY},round(im.height*${TINY}/im.width)),Image.LANCZOS).save(tiny,'WEBP',quality=62,method=6)
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
// at the size it is shown (for cover photos, the width it is stretched to), counting at most 2 device pixels per CSS pixel:
// the 320px copy (t/) up to ~340 screen pixels, the 480px copy up to ~500, the 960px copy up to ~1100,
// the full photo above that. So each photo downloads once, at the right size. <img> tags keep the
// size they start at and switch up if shown wider. Nov 13: a held photo more than ~900px off screen waits until
// it scrolls near (IntersectionObserver), and any held photo that isn't on the first screen waits for the page's load
// event, so photos further down the page or in a carousel don't compete with the first screen.
const UPGRADE = `(function(){var T=/img\\/(?:c\\/vibes|c\\/generic|c|atlas|g)\\/[tms]\\//,R=/(img\\/(?:c\\/vibes|c\\/generic|c|atlas|g))\\/[tms]\\/([\\w.-]+\\.webp)/g,K=/url\\([^)]*img\\/(?:c\\/vibes|c\\/generic|c|atlas|g)\\/[tms]\\/[^)]*\\)/g,
held=new WeakMap(),lvl=new WeakMap(),mine=new WeakMap(),wait=new WeakSet(),q=[],ro,io,SZ={t:'$1/t/$2',s:'$1/s/$2',m:'$1/m/$2',f:'$1/$2'},N={t:0,s:1,m:2,f:3};
function px(e){var r=e.getBoundingClientRect(),w=r.width;if(w&&e.tagName!='IMG'&&getComputedStyle(e).backgroundSize.indexOf('cover')>=0)w=Math.max(w,r.height*1.6);return w*Math.min(2,window.devicePixelRatio||1)}
function want(w){return w>1100?'f':w>500?'m':w>340?'s':'t'}
function put(e,a,v){mine.set(e,v);e.setAttribute(a,v)}
function out(e,m){var r=e.getBoundingClientRect();return r.bottom<-m||r.top>=innerHeight+m||r.right<-m||r.left>=innerWidth+m}
function look(l){l.forEach(function(x){if(x.isIntersecting){io.unobserve(x.target);wait.delete(x.target);seen([{target:x.target}])}})}
function obs(e){io=io||new IntersectionObserver(look,{rootMargin:'900px'});io.observe(e)}
function hold(e){if(wait.has(e))return;wait.add(e);if(document.readyState=='complete')obs(e);else{if(!q.length)addEventListener('load',function(){q.forEach(obs);q=[]});q.push(e)}}
function seen(l){l.forEach(function(x){var e=x.target,w=px(e);if(!w)return;var k=want(w),h=held.get(e);
if(h&&(out(e,900)||(document.readyState!='complete'&&out(e,0)))){hold(e);return}
if(h){held.delete(e);if((e.getAttribute('style')||'')===h.out){put(e,'style',h.orig.replace(R,SZ[k]));lvl.set(e,k)}}
else if(N[k]>N[lvl.get(e)||'s']){var s=e.getAttribute('src'),t=e.getAttribute('style');if(s&&T.test(s))put(e,'src',s.replace(R,SZ[k]));if(t&&T.test(t))put(e,'style',t.replace(R,SZ[k]));lvl.set(e,k)}
if(k=='f')ro.unobserve(e)})}
function take(e){ro=ro||new ResizeObserver(seen);var t=e.getAttribute('style');if(e.tagName!='IMG'&&t&&T.test(t)){var o=t.replace(K,'none');held.set(e,{orig:t,out:o});put(e,'style',o)}else lvl.set(e,(e.getAttribute('src')||'').indexOf('/t/')>0?'t':(e.getAttribute('src')||'').indexOf('/s/')>0?'s':'m');ro.observe(e)}
function has(e){return T.test(e.getAttribute('style')||'')||(e.tagName=='IMG'&&T.test(e.getAttribute('src')||''))}
function scan(n){if(n.nodeType!==1)return;if(has(n))take(n);var l=n.querySelectorAll('[style*="img/"],img[src*="img/"]');for(var i=0;i<l.length;i++)if(has(l[i]))take(l[i])}
new MutationObserver(function(ms){ms.forEach(function(m){if(m.type=='attributes'){var e=m.target;if(e.getAttribute(m.attributeName)!==mine.get(e)&&has(e))take(e)}else m.addedNodes.forEach(scan)})}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['style','src']})})();`;


// Town pages: the big hero photo is what people see first (the LCP), so it skips the size picker:
// it points at the full photo from the start and the head preloads it at high priority, instead of
// waiting for the page script to measure it. Applied to the first <div class="b"> on the page.
function heroFirst(html) {
  const m = /<div class="b"([^>]*?)style="background-image:url\('(img\/[^']+?)'\)"/.exec(html);
  if (!m) return html;
  let url = m[2];
  const s = /^img\/(c\/vibes|c|atlas|g)\/[tms]\/([\w.-]+\.webp)$/.exec(url);
  if (s && fs.existsSync(path.join(ROOT, 'img', s[1], s[2]))) url = `img/${s[1]}/${s[2]}`;
  html = html.slice(0, m.index) + m[0].replace(m[2], url) + html.slice(m.index + m[0].length);
  const pre = `<link rel="preload" as="image" href="/${url}" fetchpriority="high">`;
  return html.includes(pre) ? html : html.replace(/<meta charset="utf-8">/, '$&' + pre);
}

const imgTags = html => html.replace(/(<img\b[^>]*\bsrc=["'][^"']*img\/(?:c\/vibes|c|atlas|g)\/)s\//g, '$1m/');
module.exports = { ensure, rewrite, imgTags, heroFirst, UPGRADE };
if (require.main === module) {
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  ensure(walk(path.join(ROOT, 'src')));
}
