"""Publish an article on floridacoastal.co (Nov 24 2026; replaces tools/add_article.py for articles).

Usage (from the repo root, after `node tools/site/build.js` so towns/ exists):
  python3 tools/publish_article.py drafts/articles/<id>.json

article.json fields: id, date, cat, img, title, dek, read, towns, body, faq (same as add_article.py)
plus optional: kicker (label above the headline), crumb (breadcrumb topic, default from cat),
alt and cap (lead photo alt text and caption), quiz (the "Find your town" box headline),
related (3 article ids for the "More guides" band), by (byline name).

Body links: <a href="#town-ID"> and <a href="#article-ID"> are turned into page links.

What it does (the same steps as the Nov 23 publish commits, done by hand then):
  1. articles/<id>.html from the newest article page (head, meta, canonical, JSON-LD, page body).
  2. Adds the article to assets/articles-data.<hash>.js (renamed by content hash) and points
     articles/index.html at it, then re-renders the Articles page so it lists the article.
  3. Adds it to assets/search-index.json, sitemap.xml and llms.txt.
Then commit and push; Vercel deploys main in about a minute.
"""
import asyncio, datetime, glob, hashlib, html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://www.floridacoastal.co/"
os.chdir(ROOT)
sys.path.insert(0, os.path.join(ROOT, "tools"))
import prerender  # noqa: E402

TEMPLATE = "articles/florida-beach-erosion-who-pays-for-sand.html"  # newest page in the current layout
CRUMBS = {"Moving Tips": "Moving tips", "Moving tips": "Moving tips", "Coast Guides": "Picking a town",
          "Town vs Town": "Picking a town", "Costs and risks": "Costs and risks", "Florida news": "Florida news"}


def die(msg):
    sys.exit("publish_article: " + msg)


def esc(t):
    return html.escape(t, quote=True)


def stem_of(a):
    return os.path.splitext(os.path.basename(a["img"]))[0]


def check(a):
    for k in ("id", "date", "cat", "img", "title", "dek", "read", "towns", "body"):
        if not a.get(k):
            die(f"missing field: {k}")
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", a["id"]):
        die("id must be lowercase words joined by hyphens")
    st = stem_of(a)
    for p in (a["img"], f"img/w/{st}.webp", f"img/w/m/{st}.webp", f"img/c/s/{st}.webp", f"img/c/m/{st}.webp"):
        if not os.path.exists(p):
            die(f"image file missing: {p}")
    for t in a["towns"] + re.findall(r'href="#town-([a-z0-9-]+)"', a["body"]):
        if not os.path.exists(f"src/towns/{t}.html"):
            die(f"unknown town id: {t}")
    for g in re.findall(r'href="#article-([a-z0-9-]+)"', a["body"]):
        if not os.path.exists(f"articles/{g}.html"):
            die(f"unknown article id: {g}")
    for src in re.findall(r'<img[^>]*src="([^"]+)"', a["body"]):
        if not src.startswith("http") and not os.path.exists(src):
            die(f"body photo missing: {src}")
    if os.path.exists(f"articles/{a['id']}.html"):
        die(f"articles/{a['id']}.html already exists")


def page_body(a):
    b = re.sub(r'href="#town-([a-z0-9-]+)"', r'href="towns/\1.html"', a["body"])
    return re.sub(r'href="#article-([a-z0-9-]+)"', r'href="articles/\1.html"', b)


def load_data():
    f = sorted(glob.glob("assets/articles-data.*.js"), key=os.path.getmtime)
    cur = [p for p in f if os.path.basename(p) in open("articles/index.html", encoding="utf-8").read()]
    if len(cur) != 1:
        die("could not tell which articles-data file the Articles page uses")
    s = open(cur[0], encoding="utf-8").read()
    pre = "var ARTICLES="
    if not (s.startswith(pre) and s.endswith(";")):
        die("articles-data file is not in the expected shape")
    return cur[0], json.loads(s[len(pre):-1])


def card(x, cats):
    st = os.path.splitext(os.path.basename(x["img"]))[0]
    if not os.path.exists(f"img/w/m/{st}.webp"):
        return None
    read = cats.get(x["id"], {}).get("read")
    label = CRUMBS.get(x.get("cat"), x.get("cat") or "Guide")
    rt = f"{read} min" if read else ""
    return (f'<a class="card" data-aid="{x["id"]}" href="articles/{x["id"]}.html"><div class="ph"><picture>'
            f'<source type="image/webp" srcset="img/w/m/{st}.webp 800w, img/w/{st}.webp 1600w" sizes="(max-width:700px) 92vw, 400px">'
            f'<img src="{x["img"]}" alt="" loading="lazy" decoding="async"></picture></div><div class="bd">'
            f'<span class="cat">{esc(label)}{" · " + rt + " read" if rt else ""}</span><h3>{esc(x["title"])}</h3>'
            f'<div class="foot"><span class="more">Read</span><span class="rt">{rt}</span></div></div></a>')


def read_times():
    out = {}
    for p in glob.glob("articles/*.html"):
        m = re.search(r'<span>(\d+) min read</span>', open(p, encoding="utf-8").read())
        if m:
            out[os.path.basename(p)[:-5]] = {"read": int(m.group(1))}
    return out


def make_page(a, data):
    tpl = open(TEMPLATE, encoding="utf-8").read()
    old_id = os.path.basename(TEMPLATE)[:-5]
    url = f"{BASE}articles/{a['id']}"
    st = stem_of(a)
    og_img = BASE + (f"img/c/{st}.jpg" if os.path.exists(f"img/c/{st}.jpg") else a["img"])
    title, dek = esc(a["title"]), esc(a["dek"])
    s = tpl
    subs = [
        (r"<title>[^<]*</title>", f"<title>{title}</title>"),
        (r'(<meta name="description" content=")[^"]*', r"\g<1>" + dek.replace("\\", "\\\\")),
        (r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + title.replace("\\", "\\\\")),
        (r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + dek.replace("\\", "\\\\")),
        (r'(<meta property="og:url" content=")[^"]*', r"\g<1>" + url),
        (r'(<meta property="og:image" content=")[^"]*', r"\g<1>" + og_img),
        (r'(<link rel="canonical" href=")[^"]*', r"\g<1>" + url),
        (r'(<link rel="preload" as="image" type="image/webp" imagesrcset=")[^"]*', rf"\g<1>img/w/m/{st}.webp 800w, img/w/{st}.webp 1600w"),
    ]
    for pat, rep in subs:
        s, n = re.subn(pat, lambda m, rep=rep: m.expand(rep), s, count=1)
        if not n:
            die(f"template is missing: {pat}")
    for extra in re.findall(r'<meta (?:name|property)="twitter:[^"]*" content="[^"]*"', s):
        if old_id in extra or "Washing" in extra:
            die("template has twitter tags this script does not update: " + extra)
    graph = [
        {"@type": "Article", "headline": a["title"], "description": a["dek"], "image": og_img,
         "datePublished": a["date"], "dateModified": a["date"],
         "author": ({"@type": "Person", "name": a["by"]} if a.get("by") else {"@id": BASE + "#org"}),
         "publisher": {"@id": BASE + "#org"}, "mainEntityOfPage": url,
         "about": [{"@type": "Place", "name": town_name(t) + ", Florida", "url": f"{BASE}towns/{t}"} for t in a["towns"]]},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE},
            {"@type": "ListItem", "position": 2, "name": "Coastal Guides", "item": BASE + "articles/index.html"},
            {"@type": "ListItem", "position": 3, "name": a["title"], "item": url}]},
    ]
    if a.get("faq"):
        graph.append({"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": ans}} for q, ans in a["faq"]]})
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("</", "<\\/")
    s = re.sub(r'(<script type="application/ld\+json">).*?(</script>)', lambda m: m.group(1) + " " + ld + " " + m.group(2), s, count=1, flags=re.S)
    s, n = re.subn(r'window\.FC_PAGE=\{[^}]*\}', lambda m: f'window.FC_PAGE={{"page": "articles/{a["id"]}.html", "route": "article-{a["id"]}"}}', s, count=1)
    if not n:
        die("could not set the page route")

    # page body
    a0 = s.index('<main id="app">') + len('<main id="app">')
    a1 = s.index("</main>", a0)
    m = s[a0:a1]
    d = datetime.date.fromisoformat(a["date"])
    crumb = a.get("crumb") or CRUMBS.get(a["cat"], a["cat"])
    head = (f'<header class="nyt-head"><div class="crumbs"><a href="index.html">Home</a> / <a href="articles/index.html">Articles</a> / {esc(crumb)}</div>'
            f'<p class="nyt-kick">{esc(a.get("kicker") or a["cat"])}</p><h1>{title}</h1><p class="nyt-dek">{dek}</p>'
            f'<div class="nyt-by"><span>By <b>{esc(a.get("by") or "Mark and Betsy Scott")}</b></span>'
            f'<time datetime="{a["date"]}">{d.strftime("%b")} {d.day}, {d.year}</time><span>{int(a["read"])} min read</span></div></header>')
    m = re.sub(r'<header class="nyt-head">.*?</header>', lambda _: head, m, count=1, flags=re.S)
    cap = f'<figcaption>{esc(a["cap"])}</figcaption>' if a.get("cap") else ""
    fig = (f'<figure class="nyt-lead"><picture><source type="image/webp" srcset="img/w/m/{st}.webp 800w, img/w/{st}.webp 1600w" '
           f'sizes="(max-width:760px) 260px, 100vw"><img src="{a["img"]}" alt="{esc(a.get("alt") or a["title"])}" fetchpriority="high" decoding="async"></picture>{cap}</figure>')
    m = re.sub(r'<figure class="nyt-lead">.*?</figure>', lambda _: fig, m, count=1, flags=re.S)
    asides = re.findall(r'<aside class="fq-box.*?</aside>', m, flags=re.S)
    if len(asides) != 2:
        die("template should have two quiz boxes")
    q = esc(a.get("quiz") or "Answer 8 quick questions and get the 5 towns that fit how you want to live.")
    top, end = (re.sub(r'(<p class="fq3-h">)[^<]*', lambda mm: mm.group(1) + q, x, count=1) for x in asides)
    body = page_body(a)
    i = body.find("<h2")
    if i < 0:
        die("body needs at least one <h2> section")
    prose = body[:i].rstrip() + "\n\n" + top + "\n" + body[i:]
    if a.get("faq"):
        prose += "<h2>Common questions</h2>" + "".join(f"<h3>{esc(qq)}</h3><p>{esc(aa)}</p>" for qq, aa in a["faq"])
    prose += end
    m = re.sub(r'(<article class="prose">).*?(</article>)', lambda mm: mm.group(1) + prose + mm.group(2), m, count=1, flags=re.S)
    # More guides band
    rt = read_times()
    by_id = {x["id"]: x for x in data}
    rel = [by_id[r] for r in a.get("related", []) if r in by_id]
    for x in data:
        if len(rel) >= 3:
            break
        if x["id"] != a["id"] and x not in rel and not x["id"].startswith("best-florida-beach-towns-for-"):
            rel.append(x)
    cards = "".join(c for c in (card(x, rt) for x in rel) if c)
    m, n = re.subn(r'(<div class="label">More guides</div><div class="grid3">).*?(</div></div></section>)',
                   lambda mm: mm.group(1) + cards + mm.group(2), m, count=1, flags=re.S)
    if not n:
        die("could not find the More guides band")
    s = s[:a0] + m + s[a1:]
    unbanded = re.sub(r'<div class="label">More guides</div>.*?</div></div></section>', '', s, flags=re.S)
    leftover = [w for w in (old_id, "water-dunes", "Washing Away") if w in unbanded]
    if leftover:
        die(f"template text left in the new page: {leftover}")
    path = f"articles/{a['id']}.html"
    open(path, "w", encoding="utf-8").write(s)
    return path, body


def town_name(t):
    s = open(f"src/towns/{t}.html", encoding="utf-8").read()
    m = re.search(r"<h1[^>]*>([^<]+)</h1>", s) or re.search(r"<title>([^<|·]+)", s)
    return html.unescape(m.group(1).strip()) if m else t.replace("-", " ").title()


def update_data(a, path, data, body):
    entry = {"id": a["id"], "date": a["date"], "cat": a["cat"], "img": a["img"], "title": a["title"],
             "dek": a["dek"], "kicker": a.get("kicker") or a["cat"], "body": body}
    data = [x for x in data if x["id"] != a["id"]]
    data.insert(0, entry)
    out = "var ARTICLES=" + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";"
    new = f"assets/articles-data.{hashlib.md5(out.encode()).hexdigest()[:10]}.js"
    open(new, "w", encoding="utf-8").write(out)
    os.remove(path)
    idx = open("articles/index.html", encoding="utf-8").read()
    idx = idx.replace("/" + path, "/" + new)
    open("articles/index.html", "w", encoding="utf-8").write(idx)
    return new


def update_search(a):
    t = open("assets/search-index.json", encoding="utf-8").read()
    d = json.loads(t)
    st = stem_of(a)
    img = f"img/c/{st}.jpg" if os.path.exists(f"img/c/{st}.jpg") else a["img"]
    d["a"] = [x for x in d["a"] if x["u"] != f"articles/{a['id']}.html"]
    d["a"].insert(0, {"u": f"articles/{a['id']}.html", "n": a["title"], "img": img})
    open("assets/search-index.json", "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, separators=(",", ":")))


def update_sitemap_llms(a):
    sm = open("sitemap.xml", encoding="utf-8").read()
    loc = f"{BASE}articles/{a['id']}"
    if loc + "<" not in sm:
        sm = sm.replace("</urlset>", f"<url><loc>{loc}</loc><lastmod>{a['date']}</lastmod></url>\n</urlset>", 1)
        open("sitemap.xml", "w", encoding="utf-8").write(sm)
    ll = open("llms.txt", encoding="utf-8").read()
    line = f"- [{a['title']}]({BASE}articles/{a['id']}.html): {a['dek']}"
    if f"articles/{a['id']}.html)" not in ll:
        i = ll.rfind("\n", 0, ll.index(f"]({BASE}articles/")) + 1
        ll = ll[:i] + line + "\n" + ll[i:]
        open("llms.txt", "w", encoding="utf-8").write(ll)


async def render_index():
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1280, "height": 900})
        await ctx.route("**/*supabase*/**", lambda r: r.abort())
        await ctx.route("https://fonts.*/**", lambda r: r.abort())
        pg = await ctx.new_page()
        await pg.goto(f"http://127.0.0.1:{PORT}/articles/index.html", wait_until="load")
        await pg.evaluate("document.getElementById('axq').dispatchEvent(new FocusEvent('focusin',{bubbles:true}))")  # loads ARTICLES now
        await pg.wait_for_function("typeof ARTICLES!=='undefined'", timeout=15000)
        await pg.evaluate("document.body.appendChild(document.createElement('i')).remove()")  # the page rebuilds on the next DOM change
        await pg.wait_for_function("document.querySelector('#app .ax').dataset.n==String(ARTICLES.length)", timeout=15000)
        h = await pg.evaluate("(()=>{var a=document.querySelector('#app .ax');delete a.dataset.w;return document.getElementById('app').innerHTML})()")
        await b.close()
        return h


PORT = None


def rerender_index():
    global PORT
    srv = prerender.serve()
    PORT = srv.server_address[1]
    try:
        h = asyncio.run(render_index())
    finally:
        srv.shutdown()
    s = open("articles/index.html", encoding="utf-8").read()
    a0 = s.index('<main id="app">') + len('<main id="app">')
    s = s[:a0] + h + s[s.index("</main>", a0):]
    open("articles/index.html", "w", encoding="utf-8").write(s)


def main(path):
    a = json.load(open(path, encoding="utf-8"))
    check(a)
    data_path, data = load_data()
    page, body = make_page(a, data)
    new = update_data(a, data_path, data, body)
    update_search(a)
    update_sitemap_llms(a)
    rerender_index()
    idx = open("articles/index.html", encoding="utf-8").read()
    if f"articles/{a['id']}.html" not in idx:
        die("the Articles page did not pick up the new article")
    print(f"done: {page}, data {new}")
    print("next: git add -A && git commit && git push")


if __name__ == "__main__":
    main(sys.argv[1])
