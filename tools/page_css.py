"""Hash assets/fc-page.css and link it last on every page that uses the shared page start (Nov 16 2026).
Edit assets/fc-page.css, then run:  python3 tools/page_css.py
"""
import glob, hashlib, os, re, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
src = 'assets/fc-page.css'
h = hashlib.md5(open(src, 'rb').read()).hexdigest()[:10]
name = 'fc-page.%s.css' % h
for old in glob.glob('assets/fc-page.*.css'):
    if old != 'assets/' + name:
        os.remove(old)
shutil.copy(src, 'assets/' + name)
pages = (glob.glob('articles/*.html') + glob.glob('areas/*.html') +
         ['about.html', 'scoring.html', 'agents.html', 'privacy.html', 'terms.html', 'accessibility.html', '404.html', 'compare.html'])
pages = [p for p in pages if p != 'articles/index.html']
tag = '<link rel="stylesheet" href="/assets/%s">' % name
n = 0
for p in pages:
    s = open(p).read()
    t = re.sub(r'<link rel="stylesheet" href="/assets/fc-page\.[0-9a-f]+\.css">', '', s)
    t = t.replace('</head>', tag + '</head>', 1)
    if t != s:
        open(p, 'w').write(t)
        n += 1
print(name, 'linked on', n, 'of', len(pages), 'pages')
