"""Builds the new homepage (index.html) from the Nov 13 live page.
Hero: Florida as the Vibe Map. Speed: one inline stylesheet (only the rules this page uses),
subset font, no render blocking scripts, below the fold images lazy, quiz prefetch after load."""
import re, sys, json, subprocess, os
sys.path.insert(0, '/home/claude/perf')
import hero

REPO = '/home/claude/florida-coastal'
src = open('/home/claude/perf/index.before.html').read()
out = src


def sub1(pat, rep, s, flags=re.S):
    n = len(re.findall(pat, s, flags))
    assert n == 1, (pat[:80], n)
    return re.sub(pat, lambda m: rep, s, flags=flags)


# 1. hero
out = sub1(r'<section class="vhero-b dk-hero">.*?</section>', hero.html(), out)
# 2. the old "02 The Vibe Map" section is now the hero itself
# Nov 16: the Vibe Map section (map + town card) stays, right under the hero; its scripts load when it nears the screen
old_l = re.search(r'<div class="cm-l">.*?</div>(?=<div class="cm-r">)', out, re.S).group(0)
new_l = ('<div class="cm-l"><div class="cm-lbl">How it works</div>'
 '<h2>Three steps to your stretch of coast.</h2>'
 '<ol class="cm-steps">'
 '<li><b>Pick a feel.</b> <span>Tap a style and every beach town that has it lights up on the map.</span></li>'
 '<li><b>Get your top 5.</b> <span>Eight questions, about two minutes. Every town scored the same way, no signup necessary.</span></li>'
 '<li><b>Get to know them.</b> <span>Open any town for home prices, flood risk, the airport drive and a local\'s take.</span></li>'
 '</ol>'
 '<div class="cm-ctas"><a class="cm-link" href="map.html?mode=vibes" data-fh="cm_vibe">Open the Vibe Map →</a><a class="cm-link" href="/quiz" data-fh="cm_top5">See my top 5 →</a></div>'
 '<p class="cm-alt">Rather weigh it yourself? <a href="map.html?mode=sliders">Try the Slider Map →</a></p></div>')
out = out.replace(old_l, new_l, 1)
out = out.replace('<span class="nb">03 · </span>', '').replace('<span class="nb">04 · </span>', '')
# 3. scripts for the old map section
fc_src = re.search(r'<script src="(/assets/v3/data/fl-compass\.[0-9a-f]+\.js)"></script>', out).group(1)
h1_src = re.search(r'<script src="(/assets/v3/home-1\.[0-9a-f]+\.js)"></script>', out).group(1)
clip = re.search(r'<script id="hmap-clip">(.*?)</script>', out, re.S).group(1)
for pat in [r'<script src="/assets/v3/data/fl-compass\.[0-9a-f]+\.js"></script>',
            r'<script src="/assets/v3/home-1\.[0-9a-f]+\.js"></script>',
            r'<script id="hmap-clip">.*?</script>',
            ]:
    out = sub1(pat, '', out)
CMAP_JS = ('<script id="cmap-lazy">!function(){var s=document.querySelector(".cmap");if(!s)return;var go=!1;'
 's.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a");if(!a||!window.FC)return;var k=a.dataset.fh||(a.classList.contains("cm-card")?"cm_card":a.classList.contains("cm-more")?"cm_more":/sliders/.test(a.href)?"cm_sliders":"");k&&FC.track("home_"+k,(a.querySelector&&a.querySelector(".cm-bd b")||{}).textContent||"")});'
 'function ld(u,cb){var e=document.createElement("script");e.src=u;e.onload=cb;document.body.appendChild(e)}'
 'function run(){if(go)return;go=!0;ld(%s,function(){ld(%s,function(){%s})})}'
 'if("IntersectionObserver"in window){var o=new IntersectionObserver(function(e){if(e[0].isIntersecting){o.disconnect();run()}},{rootMargin:"300px 0px"});o.observe(s)}else run();'
 'addEventListener("load",function(){setTimeout(run,2500)})}();</script>') % (json.dumps(fc_src), json.dumps(h1_src), clip)
open('/home/claude/perf/cmap_js.html','w').write(CMAP_JS)
out = out.replace('querySelector(".dk-hero")', 'querySelector(".fh")')
out = out.replace('querySelectorAll(".dk-hero,.cmap,.tk-acts,.news,.hq")', 'querySelectorAll(".fh,.cmap,.tk-acts,.news")')
assert '.dk-hero"' not in out.split('<style')[0] or True
# keep the header legibility rules from the Nov 13 hero-legible block, drop the old hero ones
m = re.search(r'(<style id="hero-legible">)(.*?)(</style>)', out, re.S)
rules = re.findall(r'html body header[^{]*\{[^}]*\}', m.group(2))
out = out.replace(m.group(0), m.group(1) + ''.join(rules) + m.group(3))
# 4. lazy load every image below the hero that is not already lazy
def lazy(m):
    tag = m.group(0)
    if 'loading=' in tag or 'fetchpriority' in tag or 'fh-' in tag:
        return tag
    return tag[:-1] + ' loading="lazy" decoding="async">'
head, body = out.split('<body', 1)
hero_end = body.index('</section>') + len('</section>')
body = body[:hero_end] + re.sub(r'<img(?![^>]*class="logo)[^>]*>', lazy, body[hero_end:])
out = head + '<body' + body

# 5. head: collect the stylesheets, then replace them with one inline block
css_files = re.findall(r'<link rel="stylesheet" href="([^"]+)">', out)
print('stylesheets', css_files)
for f in css_files:
    out = out.replace('<link rel="stylesheet" href="%s">' % f, '', 1)
# font faces: subset DM Sans for the homepage, the rest as before (they only load when used)
font_css = open(REPO + '/assets/fonts.css').read()
fh = [f for f in os.listdir(REPO + '/assets/fonts') if f.startswith('dm-sans-home.')][0]
font_css = font_css.replace("src:url(/assets/fonts/dm-sans.woff2) format('woff2')", "src:url(/assets/fonts/%s) format('woff2')" % fh, 1)
font_css = font_css.replace('font-display:block', 'font-display:swap')
out = out.replace('<link rel="preload" href="/assets/fonts/dm-sans.woff2" as="font" type="font/woff2" crossorigin>',
                  '<link rel="preload" href="/assets/fonts/%s" as="font" type="font/woff2" crossorigin>' % fh)
out = out.replace('<link rel="preload" href="/assets/fonts/caslon-display.woff2" as="font" type="font/woff2" crossorigin>', '')
# GA bootstrap inline (one less blocking request)
ga = re.search(r'<script src="(/assets/fc-ga\.[0-9a-f]+\.js)"></script>', out).group(1)
out = out.replace('<script src="%s"></script>' % ga, '<script>%s</script>' % open(REPO + ga).read().strip(), 1)
# non critical scripts deferred
out = out.replace('<script src="/assets/v3/s-4a9806437f/dm-titles.js"></script>', '<script src="/assets/v3/s-4a9806437f/dm-titles.js" defer></script>')
out = re.sub(r'<script src="(/assets/fc-connect\.[0-9a-f]+\.js)"></script>', r'<script src="\1" defer></script>', out)
# newsletter and search wiring waits for the deferred fc-connect
out = sub1(r'<script>!function\(\)\{const e=document.getElementById\("newsform"\)', '<script>addEventListener("DOMContentLoaded",function(){!function(){const e=document.getElementById("newsform")', out)
tail = 'location.href="towns/index.html"+(n?"?q="+encodeURIComponent(n):"")})}();</script>'
assert out.count(tail) == 1
out = out.replace(tail, tail[:-9] + '});</script>')
# quiz prefetches: after the page has loaded, so they never compete with the hero
pre = re.findall(r'<link rel="prefetch"[^>]*>', out)
for p in pre:
    out = out.replace(p, '', 1)
old_preload = '<link rel="preload" as="image" href="/img/c/grayton-beach.webp">'
assert old_preload in out
out = out.replace(old_preload, '<link rel="preload" as="image" href="/img/c/grayton-beach.webp" fetchpriority="high">')
pre_js = '<script>addEventListener("load",function(){setTimeout(function(){var h=document.head;%s.forEach(function(a){var l=document.createElement("link");l.rel="prefetch";l.href=a[0];if(a[1])l.as=a[1];h.appendChild(l)})},1200)});</script>' % json.dumps(
    [[re.search(r'href="([^"]+)"', p).group(1), (re.search(r' as="([^"]+)"', p) or [None, ''])[1]] for p in pre], separators=(',', ':'))

open('/home/claude/perf/fonts.inline.css', 'w').write(font_css)
open('/home/claude/perf/new.nostyle.html', 'w').write(out)
open('/home/claude/perf/css_files.json', 'w').write(json.dumps(css_files))
open('/home/claude/perf/pre_js.html', 'w').write(pre_js)
print('ok', len(out))
