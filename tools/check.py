#!/usr/bin/env python3
"""Site check: walks the key flows on phone and desktop and records what renders.

  python3 tools/check.py                 run every flow, print errors only
  python3 tools/check.py save NAME       also save page markup and screenshots as NAME
  python3 tools/check.py compare NAME    run again and list every step that differs from NAME

Saved runs live in ~/.fc-check/NAME (outside the repo, so they never deploy).
Network calls to Supabase are answered locally, so the check never writes leads or events.
"""
import asyncio, os, re, sys, json, socket, subprocess, time, hashlib, difflib
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.expanduser("~/.fc-check")
PHONE = dict(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
DESK = dict(viewport={"width": 1440, "height": 900})


def free_port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p


async def tap(pg, sel, wait=500, nth=0):
    loc = pg.locator(sel)
    if await loc.count() <= nth:
        raise RuntimeError("missing " + sel)
    await loc.nth(nth).click(force=True)
    await pg.wait_for_timeout(wait)


# Each flow: (name, url, device, [steps]); a step is (label, coroutine taking the page)
def flows():
    F = []
    for dev, kw in (("ph", PHONE), ("dk", DESK)):
        for u in ("index.html?hero=a", "index.html?hero=b", "compare.html", "towns/destin.html", "towns/cedarkey.html",
                  "areas/emerald-coast.html", "articles/affordable-beach-towns.html", "about.html", "agents.html",
                  "scoring.html", "404.html"):
            F.append((f"{dev}-{re.sub(r'[^a-z0-9]+', '-', u)}", u, kw, []))
    # home map: tap the first style
    F.append(("dk-home-style", "index.html?hero=a", DESK, [("style", lambda pg: tap(pg, ".dk-map .vp-pc", 900))]))
    # Vibe Map with filters, a style, a town, list
    F.append(("dk-vibemap", "map.html", DESK, [
        ("budget", lambda pg: pg.select_option("[data-nbudsel]", "500")),
        ("school", lambda pg: tap(pg, "[data-need='school']")),
        ("style", lambda pg: tap(pg, ".vm-tile[data-vibe='dock']", 1200)),
        ("town", lambda pg: tap(pg, "[data-vpick]", 2500)),
        ("list", lambda pg: tap(pg, "[data-vlist='1']", 800)),
    ]))
    F.append(("ph-vibemap", "map.html", PHONE, [
        ("open", lambda pg: tap(pg, "[data-nopen]")),
        ("pick", lambda pg: tap(pg, ".nd-pane [data-nbud='500']", 300)),
        ("show", lambda pg: tap(pg, ".nd-go", 700)),
        ("style", lambda pg: tap(pg, ".vm-tile[data-vibe='dock']", 1200)),
        ("town", lambda pg: pg.evaluate("""()=>{const d=[...document.querySelectorAll('.vm-map .dot:not(.dim)')].find(x=>{const r=x.getBoundingClientRect();return r.top>80&&r.top<500});d.dispatchEvent(new MouseEvent('click',{bubbles:true}))}""")),
        ("clear", lambda pg: tap(pg, "[data-vmclose]", 1200)),
    ]))
    F.append(("dk-vibemap-plain", "map.html", DESK, [
        ("style", lambda pg: tap(pg, ".vm-tile[data-vibe='island']", 1200)),
        ("town", lambda pg: tap(pg, "[data-vpick]", 2500)),
    ]))
    # Slider Map
    async def slide(pg):
        r = pg.locator("input[type=range]").first
        await r.evaluate("e=>{e.value=95;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))}")
        await pg.wait_for_timeout(900)
    F.append(("dk-sliders", "priorities.html", DESK, [
        ("slide", slide),
        ("town", lambda pg: tap(pg, "[data-slpick]", 1200, 1)),
        ("reset", lambda pg: tap(pg, "[data-slreset]", 1000)),
    ]))
    F.append(("ph-sliders", "priorities.html", PHONE, [("slide", slide)]))
    # Quiz to results
    async def answer(pg):
        for k in [0, 0, 1, 0, 0, 0, 1, 1]:
            await pg.locator("[data-sv]").nth(k).click(); await pg.wait_for_timeout(300)
        await pg.wait_for_timeout(5500)
    async def quick(pg):
        for k in [0, 0, 1, 0, 0, 0, 1, 1]:
            await pg.locator("[data-sv]").nth(k).click(); await pg.wait_for_timeout(300)
        await pg.wait_for_timeout(1200)
    async def email(pg):
        f = pg.locator(".res-panel form[data-lead] input[type=email]").first
        await f.fill("check@example.com"); await f.press("Enter"); await pg.wait_for_timeout(1500)
    for dev, kw in (("dk", DESK), ("ph", PHONE)):
        F.append((f"{dev}-quiz-scan", "find-your-mile.html", kw, [("scan", quick)]))
        F.append((f"{dev}-quiz-email", "find-your-mile.html", kw, [
            ("answers", answer),
            ("results", lambda pg: tap(pg, '[data-rv="done"]', 1800)),
            ("sent", email),
        ]))
    for dev, kw in (("dk", DESK), ("ph", PHONE)):
        F.append((f"{dev}-quiz", "find-your-mile.html", kw, [
            ("answers", answer),
            ("results", lambda pg: tap(pg, '[data-rv="done"]', 1800)),
        ]))
    return F


def norm(html):
    html = re.sub(r"\s+", " ", html)
    html = re.sub(r"(app|site)\.[0-9a-f]{10}\.(js|css)", r"\1.HASH.\2", html)
    html = re.sub(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", "UUID", html)
    html = re.sub(r'(transform|transition|animation)[^;"]*;?', "", html)  # mid animation values
    return html


async def snap(pg, path, save):
    html = await pg.evaluate("document.body.innerHTML")
    shot = None
    if save:
        shot = path + ".png"
        await pg.screenshot(path=shot)
        open(path + ".html", "w").write(norm(html))
    return norm(html)


async def run(mode, name):
    port = free_port()
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(port)], cwd=ROOT,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.8)
    base = f"http://127.0.0.1:{port}/"
    d = os.path.join(OUT, name) if name else None
    save = mode in ("save", "compare")
    cmpdir = None
    if mode == "compare":
        cmpdir = d; d = os.path.join(OUT, name + "-now")
    if d: os.makedirs(d, exist_ok=True)
    report = {"errors": {}, "diffs": []}
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch()
            for fname, url, kw, steps in flows():
                ctx = await b.new_context(reduced_motion="reduce", **kw)
                pg = await ctx.new_page()
                errs = []
                pg.on("pageerror", lambda e, errs=errs: errs.append(str(e)))
                await pg.route("**/fonts.googleapis.com/**", lambda r: r.fulfill(status=200, content_type="text/css", body=""))
                await pg.route("**/fonts.gstatic.com/**", lambda r: r.abort())
                await pg.route("**/*.supabase.co/**", lambda r: r.fulfill(status=201, content_type="application/json", body="[]"))
                await pg.add_init_script("Math.random=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647})()")
                try:
                    await pg.goto(base + url, wait_until="networkidle")
                    await pg.wait_for_timeout(900)
                    labels = [("load", None)] + steps
                    for label, fn in labels:
                        if fn: await fn(pg)
                        key = f"{fname}--{label}"
                        await snap(pg, os.path.join(d, key) if d else "", save)
                except Exception as e:
                    errs.append("FLOW FAILED: " + str(e).splitlines()[0])
                if errs: report["errors"][fname] = errs
                await ctx.close()
            await b.close()
    finally:
        srv.terminate()
    for k, v in report["errors"].items():
        print("ERROR", k, v[:3])
    if cmpdir:
        diffs = 0
        for f in sorted(os.listdir(d)):
            if not f.endswith(".html"): continue
            a = os.path.join(cmpdir, f)
            if not os.path.exists(a): print("NEW STEP", f); continue
            x, y = norm(open(a).read()), norm(open(os.path.join(d, f)).read())
            if x != y:
                diffs += 1
                sm = difflib.SequenceMatcher(None, x, y, autojunk=False)
                ops = [o for o in sm.get_opcodes() if o[0] != "equal"][:2]
                print("DIFF", f[:-5])
                for t, i1, i2, j1, j2 in ops:
                    print("   was:", x[max(0, i1 - 60):i2 + 60][:220])
                    print("   now:", y[max(0, j1 - 60):j2 + 60][:220])
        steps = len([f for f in os.listdir(d) if f.endswith(".html")])
        print(f"{steps} steps checked, {diffs} differ, {len(report['errors'])} flows with errors")
    else:
        print(f"done, {len(report['errors'])} flows with errors")
    return 1 if report["errors"] else 0


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "run"
    name = sys.argv[2] if len(sys.argv) > 2 else None
    sys.exit(asyncio.run(run(mode, name)))
