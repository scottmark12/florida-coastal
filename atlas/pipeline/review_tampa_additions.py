"""Build shared-region review galleries without touching approved regional packages."""
from pathlib import Path
import json,csv,html,hashlib
P=Path(__file__).resolve().parent;A=P.parent;c=json.load(open(A/'regions/catalog.json'));reg=json.load(open(A/'regions/package-registry.json'));idx={t['town_id']:t for t in json.load(open(A/'landing/index.json'))['towns']};new={r[0] for r in json.load(open(P/'tampa-coast-additions.json'))};reports={};accuracy=[];prices=[]
for tid in sorted(new):
 pkg=A/'regions'/reg[tid];reports[tid]=json.load(open(pkg/'report.json'));accuracy+=list(csv.DictReader(open(pkg/'accuracy.csv')));prices+=list(csv.DictReader(open(pkg/'district-price-sources.csv')))
for name,rows in [('tampa-additions-accuracy.csv',accuracy),('tampa-additions-prices.csv',prices)]:
 with (A/'landing'/name).open('w',newline='') as f:
  w=csv.DictWriter(f,fieldnames=rows[0].keys(),lineterminator='\n');w.writeheader();w.writerows(rows)
for rid,filename in [('tampa-south-shore','tampa-review.html'),('st-pete-clearwater','st-pete-review.html')]:
 region=next(r for r in c['regions'] if r['id']==rid);parts=[]
 for tid in region['towns']:
  t=idx[tid];name=html.escape(t['name']);pkg=reg[tid];parts.append(f'<article id="{tid}"><h2>{name}'+(' · added' if tid in new else '')+f'</h2><p>{html.escape(t["hero"]["reason"])}</p><p><a href="../explore_coast.html?view={tid}&amp;level=town">Explore town</a> · <a href="../regions/{pkg}atlas-review.html">District recipe, OSM overlay and sources</a></p><div class="pair"><figure><img loading="lazy" src="{tid}.webp" alt="{name} town view"><figcaption>Town · <a href="{tid}-m.webp">Phone crop</a></figcaption></figure><figure><img loading="lazy" src="{tid}-close.webp" alt="{name} street view"><figcaption>Street · <a href="{tid}-close-m.webp">Phone crop</a></figcaption></figure></div></article>')
 page='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(region['map'])+' · atlas review</title><style>body{font:16px system-ui;background:#f4eedf;color:#345047;margin:24px}main{max-width:1500px;margin:auto}article{background:#fffaf0;padding:20px;margin:24px 0}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}img{width:100%;display:block}figure{margin:0}figcaption{padding:10px 0}a{color:#a34e27}p{line-height:1.5}@media(max-width:700px){.pair{grid-template-columns:1fr}}</style><main><h1>'+html.escape(region['map'])+'</h1><p>'+str(len(region['towns']))+' towns · two hero-centered landing zooms.</p><p><a href="../explore_coast.html?view='+region['towns'][0]+'&amp;level=region">Explore the region</a> · <a href="tampa-additions-accuracy.csv">New-town accuracy CSV</a> · <a href="tampa-additions-prices.csv">Sourced medians</a> · <a href="tampa-expansion-report.json">Expansion report</a></p>'+''.join(parts)+'<p>© OpenStreetMap contributors, ODbL · ESA WorldCover 2021 CC BY 4.0 · Microsoft supplemental footprints, CDLA Permissive 2.0. Measured source alignment is not an independent ground survey. Physical-phone speed unverified.</p></main></html>'
 (A/'landing'/filename).write_text(page)
preserved={}
for name,before in json.load(open(P/'tampa-approved-package-hashes.json')).items():
 root=A/'regions/packages'/name;files=sorted(f for f in root.rglob('*') if f.is_file());h=hashlib.sha256()
 for f in files:h.update(str(f.relative_to(root)).encode()+b'\0'+hashlib.sha256(f.read_bytes()).digest())
 preserved[name]={**before,'after_sha256':h.hexdigest(),'unchanged':before['sha256']==h.hexdigest()};assert preserved[name]['unchanged'],name
(A/'landing/tampa-expansion-report.json').write_text(json.dumps({'towns_added':sorted(new),'reports':reports,'existing_packages':preserved,'pipeline_rules_changed':False,'phone_hardware_verified':False},indent=2)+'\n')
print('Reviewed',len(new),'new towns; existing packages unchanged')
