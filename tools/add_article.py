"""Publish a new guide on floridacoastal.co.

Usage (from the repo root):
  python3 tools/add_article.py path/to/article.json

article.json:
{
  "id": "cheapest-gulf-beach-towns",        # url slug, lowercase and hyphens
  "date": "2026-11-02",                      # publish date (Eastern)
  "cat": "Moving Tips",                      # Moving Tips | Coast Guides | Town vs Town | Outdoors | Hidden Florida
  "img": "img/steinhatchee.jpg",             # an existing image in img/ (with img/w and img/w/m webp versions)
  "title": "…",                              # headline, also the page title
  "dek": "…",                                # one or two sentence summary, also the meta description
  "read": 4,                                 # minutes
  "towns": ["port-charlotte", "ruskin"],     # town ids featured (must exist in towns/)
  "body": "<p>…</p><h2>…</h2>…",             # HTML. Link towns as <a href=\"#town-ID\"> and guides as <a href=\"#article-ID\">
  "faq": [["Question?", "Answer."], …]       # optional, added as FAQPage structured data
}

What it does:
  1. Adds the article to the app's ARTICLES list (assets/app.*.js), rehashes the
     bundle and points every page at the new file.
  2. Creates articles/<id>.html from an existing article page (head, meta,
     canonical, Open Graph, JSON-LD) and prerenders it with the real app.
  3. Re-prerenders articles/index.html, adds the page to sitemap.xml and llms.txt.
Then commit and push; Vercel deploys main in about a minute.
"""
import glob, hashlib, html, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://www.floridacoastal.co/"
os.chdir(ROOT)
sys.path.insert(0, os.path.join(ROOT, "tools"))
import prerender  # noqa: E402


def die(msg):
    raise SystemExit("add_article: " + msg)


def check(a):
    for k in ("id", "date", "cat", "img", "title", "dek", "read", "towns", "body"):
        if k not in a:
            die(f"missing field {k}")
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", a["id"]):
        die("id must be lowercase words joined by hyphens")
    if os.path.exists(f"articles/{a['id']}.html"):
        die(f"articles/{a['id']}.html already exists")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", a["date"]):
        die("date must be YYYY-MM-DD")
    stem = os.path.splitext(os.path.basename(a["img"]))[0]
    for p in (a["img"], f"img/w/{stem}.webp", f"img/w/m/{stem}.webp"):
        if not os.path.exists(p):
            die(f"image file missing: {p}")
    for t in a["towns"]:
        if not os.path.exists(f"towns/{t}.html"):
            die(f"unknown town id: {t}")
    for t in re.findall(r'href="#town-([a-z0-9-]+)"', a["body"]):
        if not os.path.exists(f"towns/{t}.html"):
            die(f"body links to unknown town: {t}")
    for t in re.findall(r'href="#article-([a-z0-9-]+)"', a["body"]):
        if not os.path.exists(f"articles/{t}.html"):
            die(f"body links to unknown article: {t}")
    if re.search(r'href="(?!#|https?://)', a["body"]):
        die("internal links in body must use #town-ID or #article-ID")


def add_to_bundle(a):
    old_js = glob.glob("assets/app.*.js")[0]
    js = open(old_js, encoding="utf-8").read()
    marker = "const ARTICLES=["
    if js.count(marker) != 1:
        die("could not find ARTICLES in the bundle")
    if f'{{id:"{a["id"]}"' in js or f'"id":"{a["id"]}"' in js:
        die("article id already in the bundle")
    fields = {k: a[k] for k in ("id", "date", "cat", "img", "title", "dek", "read", "towns", "body")}
    entry = json.dumps(fields, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    js = js.replace(marker, marker + entry + ",", 1)
    h = hashlib.sha1(js.encode()).hexdigest()[:10]
    new_js = f"assets/app.{h}.js"
    os.remove(old_js)
    open(new_js, "w", encoding="utf-8").write(js)
    n = 0
    for f in glob.glob("**/*.html", recursive=True):
        s = open(f, encoding="utf-8").read()
        if old_js in s:
            open(f, "w", encoding="utf-8").write(s.replace(old_js, new_js))
            n += 1
    return new_js, n


def make_page(a):
    tpl = open("articles/affordable-beach-towns.html", encoding="utf-8").read()
    url = f"{BASE}articles/{a['id']}.html"
    title, dek = html.escape(a["title"], quote=True), html.escape(a["dek"], quote=True)
    stem = os.path.splitext(os.path.basename(a["img"]))[0]
    s = tpl
    s = re.sub(r"<title>[^<]*</title>", f"<title>{title}</title>", s, count=1)
    s = re.sub(r'(<meta name="description" content=")[^"]*', lambda m: m.group(1) + dek, s, count=1)
    s = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m.group(1) + title, s, count=1)
    s = re.sub(r'(<meta property="og:description" content=")[^"]*', lambda m: m.group(1) + dek, s, count=1)
    s = re.sub(r'(<meta property="og:url" content=")[^"]*', lambda m: m.group(1) + url, s, count=1)
    s = re.sub(r'(<meta property="og:image" content=")[^"]*', lambda m: m.group(1) + BASE + a["img"], s, count=1)
    s = re.sub(r'(<link rel="canonical" href=")[^"]*', lambda m: m.group(1) + url, s, count=1)
    s = re.sub(
        r'(<link rel="preload" as="image" type="image/webp" imagesrcset=")[^"]*',
        lambda m: m.group(1) + f"img/w/m/{stem}.webp 800w, img/w/{stem}.webp 1600w",
        s, count=1,
    )
    graph = [
        {
            "@type": "Article", "headline": a["title"], "description": a["dek"], "image": BASE + a["img"],
            "datePublished": a["date"], "dateModified": a["date"],
            "author": {"@id": BASE + "#org"}, "publisher": {"@id": BASE + "#org"}, "mainEntityOfPage": url,
            "about": [{"@type": "Place", "name": t.replace("-", " ").title() + ", Florida", "url": f"{BASE}towns/{t}.html"} for t in a["towns"]],
        },
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE},
            {"@type": "ListItem", "position": 2, "name": "Coastal Guides", "item": BASE + "articles/index.html"},
            {"@type": "ListItem", "position": 3, "name": a["title"], "item": url},
        ]},
    ]
    if a.get("faq"):
        graph.append({"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": ans}} for q, ans in a["faq"]
        ]})
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    s = re.sub(r'(<script type="application/ld\+json">).*?(</script>)', lambda m: m.group(1) + ld + m.group(2), s, count=1, flags=re.S)
    s = re.sub(r'window\.FC_PAGE=\{[^}]*\}', f'window.FC_PAGE={{"page":"articles/{a["id"]}.html","route":"article-{a["id"]}"}}', s, count=1)
    if f'"route":"article-{a["id"]}"' not in s:
        die("could not set the page route")
    a0 = s.index('<main id="app">') + len('<main id="app">')
    s = s[:a0] + s[s.index("</main>", a0):]
    path = f"articles/{a['id']}.html"
    open(path, "w", encoding="utf-8").write(s)
    return path


def add_to_sitemap_and_llms(a):
    url = f"{BASE}articles/{a['id']}.html"
    sm = open("sitemap.xml", encoding="utf-8").read()
    if url not in sm:
        sm = sm.replace("</urlset>", f"<url><loc>{url}</loc><lastmod>{a['date']}</lastmod></url>\n</urlset>")
        sm = re.sub(r"(<loc>https://www\.floridacoastal\.co/articles/index\.html</loc><lastmod>)[^<]*", lambda m: m.group(1) + a["date"], sm)
        open("sitemap.xml", "w", encoding="utf-8").write(sm)
    if os.path.exists("llms.txt"):
        L = open("llms.txt", encoding="utf-8").read()
        line = f"- [{a['title']}]({url}): {a['dek']}"
        if url not in L:
            L = L.replace("## Guides\n\n", "## Guides\n\n" + line + "\n", 1)
            open("llms.txt", "w", encoding="utf-8").write(L)


def main(path):
    a = json.load(open(path, encoding="utf-8"))
    check(a)
    new_js, n = add_to_bundle(a)
    page = make_page(a)
    prerender.main([page, "articles/index.html"])
    s = open(page, encoding="utf-8").read()
    if a["title"].split()[0] not in s[s.index('<main id="app">'):]:
        die("prerender did not include the article; check the page in a browser")
    add_to_sitemap_and_llms(a)
    print(f"done: {page}, bundle {new_js} ({n} pages repointed)")
    print("next: git add -A && git commit && git push origin main")


if __name__ == "__main__":
    main(sys.argv[1])
