"""New homepage hero: Florida as the Vibe Map. Returns (css, html, js) strings."""
import json

D = json.load(open('/home/claude/perf/hero-data.json'))

NAME = {"oldfl": "Old Florida", "dock": "Dock of the Bay", "island": "Island Life", "sophcalm": "Sophisticated Laid Back",
        "sophhigh": "High Energy", "social": "Social Scene", "active": "Active Outdoors", "bluezone": "Healthy Living",
        "walk": "Walkable", "remote": "Remote Work", "beaches": "Best Beaches", "afford": "Affordable"}
CNT = {}
for t in D['towns']:
    for v in t[2].split():
        CNT[v] = CNT.get(v, 0) + 1
# Gulf heavy styles first, so the opening seconds show full coastlines on phones (Atlantic side is cropped there)
ORDER = ["oldfl", "island", "dock", "beaches", "sophcalm", "active", "bluezone", "walk", "afford", "social", "remote", "sophhigh"]


def css():
    m = D['mask']
    r = D['ratio']
    s_ = """
/* Nov 16 2026: home hero, Florida as the Vibe Map */
.fh{position:relative;overflow:hidden;background:#3E6A86;color:#fff;--hh:max(640px,100svh);height:var(--hh);isolation:isolate}
.fh-ph,.fh-win{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:40% 0;display:block}
.fh-dim,.fh-scr,.fh-bot{position:absolute;inset:0;pointer-events:none}
.fh-dim{background:linear-gradient(180deg,rgba(12,30,35,.16) 0%,rgba(12,30,35,.26) 55%,rgba(12,30,35,.49) 100%)}
.fh-scr{background:radial-gradient(ellipse 85% 32% at 0% 56%,rgba(12,30,35,.5) 0%,rgba(12,30,35,.22) 55%,rgba(12,30,35,0) 100%)}
.fh-bot{top:auto;height:260px;background:linear-gradient(180deg,rgba(12,30,35,0),rgba(12,30,35,.55))}
.fh{--ft:clamp(72px,calc(var(--hh) - 694px),150px);--fhh:min(390px,calc(var(--hh) - 304px - var(--ft)));--fw:calc(var(--fhh) / %(r)s);--fl:12px}
.fh-win{--m:url('%(m)s');filter:brightness(1.02);-webkit-mask-image:var(--m);mask-image:var(--m);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:var(--fw) var(--fhh);mask-size:var(--fw) var(--fhh);-webkit-mask-position:var(--fl) var(--ft);mask-position:var(--fl) var(--ft)}
.fh-map{position:absolute;left:var(--fl);top:var(--ft);width:var(--fw);height:var(--fhh)}
.fh-map svg{position:absolute;inset:0;width:100%%;height:100%%;overflow:visible}
.fh-map path{fill:none;stroke:#fff;stroke-width:1.5;vector-effect:non-scaling-stroke;stroke-linejoin:round}
.fh-d{position:absolute;width:3px;height:3px;margin:-1.5px 0 0 -1.5px;border-radius:50%%;background:rgba(21,42,46,.22);transition:transform .45s ease,background-color .45s ease,box-shadow .45s ease}
.fh-d.on{background:#152A2E;box-shadow:0 0 0 .7px rgba(255,255,255,.95);transform:scale(1.9);z-index:2}
.fh-tx{position:absolute;z-index:3;left:20px;bottom:206px;width:340px;max-width:calc(100%% - 40px);display:flex;flex-direction:column;align-items:flex-start}
.fh-eb{margin:0;display:flex;align-items:center;gap:8px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:rgba(255,255,255,.86)}
.fh-pz{width:28px;height:28px;margin:-10px -6px -10px -8px;padding:0;border:0;background:none;color:inherit;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;opacity:.75}
.fh-pz:hover,.fh-pz:focus-visible{opacity:1}.fh-pz svg{width:10px;height:10px}
.fh h1{margin:0!important;max-width:214px!important;font-size:32px!important;line-height:1.08!important;font-weight:500!important;letter-spacing:-.02em!important;color:#fff!important;text-shadow:0 1px 14px rgba(0,0,0,.25)!important;text-align:left!important;font-family:'DM Sans',system-ui,sans-serif!important}
.fh-sub{margin:12px 0 0;max-width:236px;font-size:14.5px;line-height:1.45;color:rgba(255,255,255,.92)}
.fh-d2,.fh-dk{display:none}
.fh-cta{margin-top:22px;display:flex;align-items:center;gap:14px}
.fh-btn{flex:none;display:inline-flex;align-items:center;justify-content:center;height:50px;padding:0 22px;border-radius:999px;background:#fff;color:#152A2E!important;font-weight:600;font-size:16px;text-decoration:none!important;white-space:nowrap}
.fh-btn:hover{background:#F2EFEA}
.fh-meta{margin:0;white-space:nowrap;font-size:10px;line-height:1.55;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:rgba(255,255,255,.9)}
.fh-alt{margin-top:18px;min-height:22px;display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 14px}
.fh-a{font-size:15px;font-weight:500;color:#fff!important;text-decoration:underline;text-decoration-color:rgba(255,255,255,.45);text-decoration-thickness:1px;text-underline-offset:5px}
.fh-a:hover{text-decoration-color:#fff}
.fh-st{position:absolute;z-index:3;left:0;right:0;bottom:18px;display:flex;flex-direction:column;gap:12px}
.fh-sh{padding:0 20px;display:flex;justify-content:space-between;align-items:baseline;gap:16px}
.fh-sh p{display:flex;align-items:center;gap:10px}.fh-sh p,.fh-sh a{margin:0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:#fff;text-decoration:none}
.fh-sh a{color:rgba(255,255,255,.86)!important}
.fh-sh i{display:none}
.fh-row{display:flex;gap:12px;overflow-x:auto;padding:0 20px 6px;scrollbar-width:none}
.fh-row::-webkit-scrollbar{display:none}
.fh-t{flex:none;width:108px;display:flex;flex-direction:column;gap:8px;padding:0;border:0;background:none;text-align:left;font:inherit;color:#fff;cursor:pointer}
.fh-t img{width:100%%;height:104px;object-fit:cover;display:block;border-radius:6px;box-shadow:0 12px 28px rgba(0,0,0,.35);background:#2a4a5a}
.fh-t img{transition:box-shadow .35s ease,transform .35s ease}.fh-t span{transition:opacity .35s ease}
.fh-t.on img,.fh-t[aria-pressed=true] img{box-shadow:0 0 0 2px #fff,0 12px 28px rgba(0,0,0,.4)}
.fh:not([data-pick]) .fh-t:not(.on) span{opacity:.82}
.fh-t span{font-size:13px;font-weight:500;line-height:1.25;text-shadow:0 1px 8px rgba(0,0,0,.45)}
.fh-t:focus-visible{outline:2px solid #fff;outline-offset:3px;border-radius:6px}
@media (max-width:760px) and (max-height:780px){.fh h1{font-size:28px!important;max-width:210px!important}.fh-sub{font-size:13.5px;max-width:226px}}
@media (min-width:761px){
.fh{--hh:clamp(640px,100svh,980px);--ft:100px;--fw:70vw;--fhh:calc(70vw * %(r)s);--fl:32.64vw}
.fh-ph,.fh-win{object-position:0 55%%}
.fh-dim{background:linear-gradient(180deg,rgba(12,30,35,.13) 0%%,rgba(12,30,35,.22) 55%%,rgba(12,30,35,.42) 100%%)}
.fh-scr{background:linear-gradient(90deg,rgba(12,30,35,.5) 0%%,rgba(12,30,35,.22) 38%%,rgba(12,30,35,0) 55%%)}
.fh-bot{height:280px}
.fh-map{clip-path:inset(0 0 calc(var(--fhh) - var(--hh) + 296px) 0)}
.fh-map path{stroke-width:2.25}
.fh-d{width:5px;height:5px;margin:-2.5px 0 0 -2.5px;background:rgba(21,42,46,.28)}
.fh-d.on{transform:scale(2.6);box-shadow:0 0 0 1.5px #fff}
.fh-tx{left:clamp(24px,4.44vw,80px);bottom:285px;width:min(620px,46vw);max-width:none}
.fh-eb{font-size:12px}
.fh h1{margin-top:0!important;max-width:none!important;font-size:clamp(40px,4.3vw,62px)!important;line-height:1.04!important;letter-spacing:-.025em!important;text-shadow:0 1px 18px rgba(0,0,0,.2)!important}
.fh-sub{margin-top:20px;max-width:470px;font-size:18px;line-height:1.5}
.fh-ph1,.fh-mb{display:none}.fh-d2,.fh-dk{display:inline}
.fh-cta{margin-top:34px;gap:20px}
.fh-btn{height:54px;padding:0 28px;font-size:17px}
.fh-meta{font-size:11.5px}
.fh-alt{margin-top:22px}.fh-a{font-size:16px}
.fh-st{bottom:30px;gap:16px}
.fh-sh{padding:0 clamp(24px,4.44vw,80px);justify-content:flex-start;align-items:center;height:30px;gap:24px}
.fh-sh p,.fh-sh a{font-size:12px}
.fh-sh i{display:block;width:1px;height:14px;background:rgba(255,255,255,.4)}
.fh-row{gap:16px;padding:0 clamp(24px,4.44vw,80px) 8px}
.fh-t{width:150px}.fh-t img{height:104px}.fh-t span{font-size:14px}
}

@media (max-width:760px){
.fh{--fw:min(370px,calc(100vw - 40px));--fhh:calc(var(--fw) * .9644);--fl:calc(100vw - var(--fw) - 20px);--ft:clamp(78px,calc(var(--hh) - 620px),140px)}
.fh .fh-np{display:none}
.fh-alt{margin-top:14px;min-height:0}
.fh-alt{display:none}
.fh h1{margin-top:0!important}
.fh-sub{max-width:250px}
.fh-cta{margin-top:18px}
.fh-tx{bottom:214px}
}

@media (max-width:760px) and (max-height:620px){.fh{--ft:68px;--fhh:calc(var(--hh) - 400px);--fw:calc(var(--fhh) / .9644);--fl:calc(100vw - var(--fw) - 12px)}}
@media (prefers-reduced-motion:reduce){.fh-d{transition:none}}
""".replace('%(m)s', m).replace('%(r)s', str(r)).replace('%%', '%')
    import re as _re

    def pre(sel):
        sel = sel.strip()
        if not sel.startswith('.fh'):
            return sel
        if _re.match(r'\.fh(?![-\w])', sel):
            sel = '#fh' + sel[3:]
        else:
            sel = '#fh ' + sel
        return 'html body ' + sel

    def fix(m):
        sels = m.group(1)
        if sels.strip().startswith('@'):
            return m.group(0)
        lead = _re.match(r'\s*(/\*.*?\*/)?\s*', sels, _re.S).group(0)
        body = sels[len(lead):]
        return lead + ','.join(pre(x) for x in body.split(',')) + '{' + m.group(2) + '}'
    return _re.sub(r'([^{}]+)\{([^{}]*)\}', fix, s_)


def html():
    W, H, DO = D['W'], D['H'], D['DO']
    dots = ''.join('<i class="fh-d" style="left:%s%%;top:%s%%"></i>' % (t[0], t[1]) for t in D['towns'])
    first = ORDER[0]
    tiles = []
    for i, k in enumerate(ORDER):
        lazy = '' if i < 4 else ' loading="lazy"'
        tiles.append('<button type="button" class="fh-t" data-k="%s" aria-pressed="false"><img src="/img/vibes/s/%s.webp" alt="" width="320" height="264" decoding="async"%s><span>%s</span></button>' % (k, k, lazy, NAME[k]))
    return """<section class="fh" id="fh" aria-label="Find your Florida beach town">
<img class="fh-ph" src="/img/c/grayton-beach.webp" alt="" width="1400" height="934" fetchpriority="high" decoding="async">
<div class="fh-dim"></div><div class="fh-scr"></div>
<img class="fh-win" src="/img/c/grayton-beach.webp" alt="" width="1400" height="934" decoding="async" aria-hidden="true"><div class="fh-bot"></div>
<div class="fh-map" aria-hidden="true"><svg viewBox="0 0 %(W)s %(H)s" preserveAspectRatio="none"><path d="%(DO)s"/></svg>%(dots)s</div>
<div class="fh-tx">
<h1>Moving to the Florida coast? Start here.</h1>
<p class="fh-sub"><span class="fh-ph1">Scored honestly by a family who made the move.</span><span class="fh-d2">Find the beach town that fits your life. 167 towns, scored honestly by a family who made the move.</span></p>
<div class="fh-cta"><a class="fh-btn" href="/quiz" data-fh="top5">See my top 5<span class="fh-dk">&nbsp;towns</span>&nbsp;→</a><p class="fh-meta">Free · 8 questions<br>About 2 minutes</p></div>
<div class="fh-alt"><a class="fh-a fh-np" href="map.html?mode=vibes" data-fh="vibe">Or start with our Vibe Map →</a></div>
</div>
<div class="fh-st">
<div class="fh-sh"><p><button type="button" class="fh-pz" aria-label="Pause the map" aria-pressed="false"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor"/></svg></button>Choose a style</p><i aria-hidden="true"></i><a href="map.html?mode=vibes" data-fh="map"><span class="fh-mb">Full map →</span><span class="fh-dk">Open the full map →</span></a></div>
<div class="fh-row" role="group" aria-label="Styles">%(tiles)s</div>
</div>
</section>""" % {'W': W, 'H': H, 'DO': DO, 'dots': dots, 'tiles': ''.join(tiles),
                   'cap': '%s · %d towns' % (NAME[first], CNT[first])}


def js():
    towns = [t[2] for t in D['towns']]
    sty = [[k, NAME[k], CNT[k]] for k in ORDER]
    return """!function(){var h=document.querySelector(".fh");if(!h)return;
var V=%s,S=%s,dots=h.querySelectorAll(".fh-d"),tiles=h.querySelectorAll(".fh-t"),row=h.querySelector(".fh-row"),pzs=h.querySelectorAll(".fh-pz"),
rm=matchMedia("(prefers-reduced-motion: reduce)").matches,i=0,pick=null,stop=rm,hold=0,vis=!0,seen=0;
function T(e,d){var f=function(){window.FC&&FC.track(e,d)};window.FC?f():addEventListener("DOMContentLoaded",f)}
function show(k){var s;for(var j=0;j<S.length;j++)if(S[j][0]==k)s=S[j];if(!s)return;
for(var n=0;n<dots.length;n++)dots[n].classList.toggle("on",(" "+V[n]+" ").indexOf(" "+k+" ")>=0);
var at;for(var t=0;t<tiles.length;t++){var on=tiles[t].dataset.k==k;tiles[t].classList.toggle("on",on);if(on)at=tiles[t];tiles[t].setAttribute("aria-pressed",pick&&on?"true":"false")}if(at&&!pick&&!rm&&hold<Date.now()){var rr=row.getBoundingClientRect(),tr=at.getBoundingClientRect();if(tr.left<rr.left||tr.right>rr.right)row.scrollTo({left:at.offsetLeft-row.offsetLeft-(parseFloat(getComputedStyle(row).paddingLeft)||0),behavior:"smooth"})}
}
function tick(){if(stop||pick||hold>Date.now()||!vis||document.hidden)return;i=(i+1)%%S.length;show(S[i][0])}
show(S[0][0]);setInterval(tick,2200);
function pause(ms){hold=Date.now()+ms}
h.addEventListener("pointerenter",function(){pause(864e5)});h.addEventListener("pointerleave",function(){hold=0});
h.addEventListener("touchstart",function(){pause(5e3)},{passive:!0});
if("IntersectionObserver"in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(h);
function setStop(v){stop=v;for(var q=0;q<pzs.length;q++){var pz=pzs[q];pz.setAttribute("aria-pressed",v?"true":"false");pz.setAttribute("aria-label",v?"Play the map":"Pause the map");pz.querySelector("path").setAttribute("d",v?"M2 1l7 4-7 4z":"M2 1h2v8H2zM6 1h2v8H6z")}}
setStop(stop);for(var q=0;q<pzs.length;q++)pzs[q].onclick=function(){setStop(!stop);T("hero_pause",stop?"pause":"play")};
for(var t=0;t<tiles.length;t++)tiles[t].onclick=function(){var k=this.dataset.k;
if(pick==k){T("hero_style_open",k);location.href="map.html?mode=vibes&style="+k;return}
pick=k;h.setAttribute("data-pick",k);for(var j=0;j<S.length;j++)if(S[j][0]==k)i=j;show(k);T("hero_style",k)};

h.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[data-fh]");if(!a)return;var w=a.dataset.fh;
T("hero_"+w,pick||"");if(w=="top5"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&window.qExpand){e.preventDefault();qExpand(a)}});
row.addEventListener("touchstart",function(){pause(8e3);if(seen&1)return;seen|=1;T("hero_tiles_scroll","")},{passive:!0});row.addEventListener("wheel",function(){pause(8e3)},{passive:!0});
addEventListener("load",function(){var r=row.getBoundingClientRect();T("hero_seen","fl-map-1|tiles:"+(r.top<innerHeight-40?1:0)+"|h:"+innerHeight)});
}();""" % (json.dumps(towns, separators=(',', ':')), json.dumps(sty, separators=(',', ':')))
