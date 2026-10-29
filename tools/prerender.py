"""Render pages with the site's own app and save the result as static HTML for crawlers.

Usage (from the repo root):
  python3 tools/prerender.py articles/my-new-article.html articles/index.html

Each file must already exist with the right <head> and window.FC_PAGE route.
The script serves the repo locally, opens each page in Chromium, waits for the
app to render <main id="app">, and writes that rendered markup back into the file.
Network calls to Supabase are blocked so no analytics are logged.
"""
import asyncio, http.server, os, sys, threading, functools
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve(port=8765):
    h = functools.partial(Quiet, directory=ROOT)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


async def render(files, port=8765):
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1280, "height": 900})
        await ctx.route("**/*supabase*/**", lambda r: r.abort())
        await ctx.route("https://fonts.*/**", lambda r: r.abort())
        for f in files:
            pg = await ctx.new_page()
            errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(f"http://127.0.0.1:{port}/{f}", wait_until="load")
            await pg.wait_for_timeout(1200)
            html = await pg.evaluate("document.getElementById('app').innerHTML")
            title = await pg.title()
            if errs:
                raise SystemExit(f"{f}: page errors {errs[:3]}")
            out[f] = (html, title)
            await pg.close()
        await b.close()
    return out


def main(files):
    srv = serve()
    try:
        res = asyncio.run(render(files))
    finally:
        srv.shutdown()
    for f, (html, title) in res.items():
        path = os.path.join(ROOT, f.split("?")[0])  # "index.html?hero=a" renders that variant
        s = open(path, encoding="utf-8").read()
        a = s.index('<main id="app">') + len('<main id="app">')
        b = s.index("</main>", a)
        s = s[:a] + html + s[b:]
        open(path, "w", encoding="utf-8").write(s)
        print(f"prerendered {f} ({len(html)} chars) title: {title}")


if __name__ == "__main__":
    main(sys.argv[1:])
