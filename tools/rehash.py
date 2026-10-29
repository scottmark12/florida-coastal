"""After editing assets/app.*.js or assets/site.*.css in place, give each file its
content hash name again and point every HTML page at the new names.

Usage (from the repo root):
  python3 tools/rehash.py

Then re-render any page whose markup changed:
  python3 tools/prerender.py "index.html?hero=a" towns/destin.html ...
"""
import glob, hashlib, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

renames = {}
for pat, ext in (("assets/app.*.js", "js"), ("assets/site.*.css", "css")):
    files = glob.glob(pat)
    if len(files) != 1:
        raise SystemExit(f"expected exactly one {pat}, found {files}")
    old = files[0]
    data = open(old, "rb").read()
    new = f"assets/{'app' if ext == 'js' else 'site'}.{hashlib.sha1(data).hexdigest()[:10]}.{ext}"
    if new != old:
        os.rename(old, new)
        renames[old] = new

n = 0
if renames:
    for f in glob.glob("**/*.html", recursive=True):
        s = open(f, encoding="utf-8").read()
        t = s
        for a, b in renames.items():
            t = t.replace(a, b)
        if t != s:
            open(f, "w", encoding="utf-8").write(t)
            n += 1
print(renames or "names already match content", f"({n} pages updated)")
