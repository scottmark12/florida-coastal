"""Screenshot every redesign page and key interaction state, and compare two runs.

  python3 tools/visual_check.py snap <label> [--port 8811] [--only towns|core]
  python3 tools/visual_check.py diff <labelA> <labelB>

Serves the repo locally, blocks every outside request, freezes the clock, Math.random,
CSS animations and transitions, so two runs of the same code give identical pixels.
Shots go to /tmp/fc-shots/<label>/. Console errors are saved alongside.
"""
import asyncio, json, os, re, sys, glob, subprocess, time, threading, http.server, functools
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = '/tmp/fc-shots'
DESK = {'width': 1366, 'height': 820}
PHONE = {'width': 390, 'height': 844}
FREEZE_CSS = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}'
INIT = "Math.random=(()=>{let s=42;return()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}})();"

def core_scenarios():
    S = []
    def add(name, url, steps=None, full=False, vps=('d', 'p')):
        S.append(dict(name=name, url=url, steps=steps or [], full=full, vps=vps))
    add('home', 'home-v2.html', full=True)
    add('map-regions', 'vibe.html')
    add('map-region-sw', 'vibe.html?mode=regions&region=southwest')
    add('map-vibes', 'vibe.html?mode=vibes', steps=[('run', 1300)])
    add('map-vibes-rot', 'vibe.html?mode=vibes', steps=[('run', 6000)])
    add('map-style', 'vibe.html?mode=vibes&style=oldfl')
    add('map-town', 'vibe.html?mode=vibes&style=dock&open=apalachicola')
    add('map-sliders', 'vibe.html?mode=sliders')
    add('map-sliders-set', 'vibe.html?mode=sliders', steps=[('js', "(()=>{const r=[...document.querySelectorAll('#sl input[type=range]')];[2,4,6].forEach(i=>{const x=r[i];x.value=x.max;x.dispatchEvent(new Event('input',{bubbles:true}))})})()"), ('run', 2500)])
    add('map-list', 'vibe.html?mode=vibes&style=beaches&view=list')
    add('quiz', 'quiz-photo.html')
    add('quiz-step3', 'quiz-photo.html', steps=[('js', 'qPick(1)'), ('run', 600), ('js', 'qPick(2)'), ('run', 600), ('js', 'qPick(0)'), ('run', 800)])
    add('results', 'quiz-results.html?t=naples.92,destin.88,stuart.85,sarasota.84,vero-beach.80', full=True)
    add('compare', 'compare.html?t=destin,sarasota,naples', full=True)
    add('beach-towns', 'towns/index-v2.html', full=True)
    add('beach-towns-q', 'towns/index-v2.html?q=key', full=True)
    return S

def town_scenarios():
    S = []
    for f in sorted(glob.glob(os.path.join(ROOT, 'towns', '*.html'))):
        n = os.path.basename(f)[:-8]
        S.append(dict(name='town-' + n, url='towns/' + os.path.basename(f), steps=[], full=True, vps=('d', 'p')))
    return S

def serve(port):
    class H(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **k): super().__init__(*a, directory=ROOT, **k)
        def log_message(self, *a): pass
    class Q(http.server.ThreadingHTTPServer):
        allow_reuse_address = True
    srv = Q(('127.0.0.1', port), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

async def snap(label, port, only):
    from playwright.async_api import async_playwright
    base = f'http://127.0.0.1:{port}/'
    sc = (core_scenarios() if only in (None, 'core') else []) + (town_scenarios() if only in (None, 'towns') else [])
    d = os.path.join(OUT, label); os.makedirs(d, exist_ok=True)
    errs = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        sem = asyncio.Semaphore(4)
        async def one(s, vk):
            async with sem:
                vp = DESK if vk == 'd' else PHONE
                ctx = await b.new_context(viewport=vp, device_scale_factor=1, is_mobile=(vk == 'p'), has_touch=(vk == 'p'))
                await ctx.route(re.compile(r'^(?!http://127\.0\.0\.1).*'), lambda r: r.abort())
                await ctx.add_init_script(INIT)
                pg = await ctx.new_page()
                inflight = set()
                pg.on('request', lambda r: inflight.add(r))
                pg.on('requestfinished', lambda r: inflight.discard(r))
                pg.on('requestfailed', lambda r: inflight.discard(r))
                await pg.clock.install(time=1794470400000)
                await pg.clock.pause_at(1794470401000)
                e = []
                pg.on('pageerror', lambda x: e.append('pageerror: ' + str(x)[:200]))
                pg.on('console', lambda m: e.append('console: ' + m.text[:200]) if m.type == 'error' else None)
                try:
                    await pg.goto(base + s['url'], wait_until='load', timeout=30000)
                    await pg.add_style_tag(content=FREEZE_CSS)
                    async def quiet():
                        t0 = time.time()
                        while time.time() - t0 < 10:
                            if not inflight:
                                await pg.wait_for_timeout(120)
                                if not inflight: return
                            await pg.wait_for_timeout(50)
                    async def settle(n):
                        for _ in range(n):
                            await quiet(); await pg.clock.run_for(150)
                        await quiet()
                    await settle(8)
                    for kind, arg in s['steps']:
                        if kind == 'js': await pg.evaluate(arg)
                        elif kind == 'run':
                            await pg.clock.run_for(arg); await settle(3)
                    await pg.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')")
                    if s['full']:
                        h = await pg.evaluate('document.documentElement.scrollHeight')
                        for y in range(0, min(h, 30000), 600):
                            await pg.evaluate(f'window.scrollTo(0,{y})'); await settle(1)
                        await pg.evaluate('window.scrollTo(0,0)')
                    await settle(10)
                    await pg.evaluate("Promise.all([...document.images].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,4000)}))).then(()=>document.fonts.ready)")
                    await pg.wait_for_timeout(250)
                    await pg.screenshot(path=os.path.join(d, f"{s['name']}.{vk}.png"), full_page=s['full'])
                except Exception as x:
                    e.append('harness: ' + str(x)[:200])
                if e: errs[f"{s['name']}.{vk}"] = e
                await ctx.close()
        await asyncio.gather(*[one(s, vk) for s in sc for vk in s['vps']])
        await b.close()
    json.dump(errs, open(os.path.join(d, '_errors.json'), 'w'), indent=1)
    print(f'{label}: {len(sc)} scenarios, {sum(len(s["vps"]) for s in sc)} shots, {len(errs)} with console errors')

def diff(a, b):
    import numpy as np
    from PIL import Image
    A, B = os.path.join(OUT, a), os.path.join(OUT, b)
    os.makedirs(os.path.join(OUT, f'diff-{a}-{b}'), exist_ok=True)
    bad = []; same = 0
    names = sorted(set(os.listdir(A)) | set(os.listdir(B)))
    for n in names:
        if not n.endswith('.png'): continue
        pa, pb = os.path.join(A, n), os.path.join(B, n)
        if not (os.path.exists(pa) and os.path.exists(pb)): bad.append((n, 'missing')); continue
        ia, ib = np.asarray(Image.open(pa).convert('RGB')).astype(int), np.asarray(Image.open(pb).convert('RGB')).astype(int)
        if ia.shape != ib.shape: bad.append((n, f'size {ia.shape[:2]} vs {ib.shape[:2]}')); continue
        m = np.abs(ia - ib).max(axis=2) > 16
        frac = m.mean()
        if frac == 0: same += 1; continue
        bad.append((n, f'{frac*100:.3f}% px'))
        o = (ib * 0.35).astype('uint8'); o[m] = [255, 0, 60]
        Image.fromarray(o).save(os.path.join(OUT, f'diff-{a}-{b}', n))
    ea = json.load(open(os.path.join(A, '_errors.json'))); eb = json.load(open(os.path.join(B, '_errors.json')))
    print(f'identical: {same}   different: {len(bad)}')
    for n, w in bad: print('  ', n, w)
    new = {k: v for k, v in eb.items() if v != ea.get(k)}
    print('console error changes:', json.dumps(new, indent=1) if new else 'none')

if __name__ == '__main__':
    cmd = sys.argv[1]
    port = int(sys.argv[sys.argv.index('--port') + 1]) if '--port' in sys.argv else 8811
    only = sys.argv[sys.argv.index('--only') + 1] if '--only' in sys.argv else None
    if cmd == 'snap':
        srv = serve(port); asyncio.run(snap(sys.argv[2], port, only)); srv.shutdown()
    elif cmd == 'diff':
        diff(sys.argv[2], sys.argv[3])
