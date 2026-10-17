"""Register a validated regional package without changing renderer code."""
import json,os,sys,html,csv
from pathlib import Path
m=json.load(open(sys.argv[1]));out=Path('outputs/coastal_pipeline_v4')/m['id'];meta=json.load(open(out/'scene.json'));live=Path('outputs/florida_coastal_atlas/regions');p=live/'package-registry.json';registry=json.load(open(p));key='packages/'+m['id']+'/'
for town in m['towns']:registry[town]=key
p.write_text(json.dumps(registry,indent=2));link=live/'packages'/m['id'];link.parent.mkdir(exist_ok=True)
if not link.exists():link.symlink_to(os.path.relpath(out,link.parent))
p=live/'districts.json';ds=json.load(open(p));ids={d['id'] for d in meta['districts']};p.write_text(json.dumps([d for d in ds if d['id'] not in ids]+meta['districts'],indent=2))
with (out/'district-price-sources.csv').open('w',newline='') as f:
 w=csv.writer(f);w.writerow(['district','median_usd','metric','period','source'])
 for d in meta['districts']:
  e=d['priceEvidence'];w.writerow([d['name'],e['value'],e['metric'],e['period'],d['priceSource']])
q='?view='+m['towns'][0]+'&level=region';s=f'<!doctype html><meta charset="utf-8"><title>{html.escape(m["name"])} review</title><style>body{{font:16px system-ui;background:#f7f1e5;color:#31544d;margin:32px}}a{{color:#a24d27}}img{{max-width:100%}}iframe{{border:0;width:100%;height:760px}}.phone{{width:390px;height:844px}}</style><h1>{html.escape(m["name"])}</h1><p><a href="/explore_coast.html{q}">Open atlas</a> · <a href="accuracy.csv">Accuracy CSV</a> · <a href="district-price-sources.csv">Sourced medians</a></p>'
s+='<h2>Region</h2><iframe title="Region desktop" src="/explore_coast.html'+q+'"></iframe>'
for d in meta['districts']:
 q='?view='+m['towns'][0]+'&level=town&district='+d['id'];s+='<h2>'+html.escape(d['name'])+'</h2><a href="/explore_coast.html'+q+'">Open district</a><p>'+html.escape(d['description'])+'</p>'
s+='<h2>Source alignment</h2><img src="region-osm-overlay.png" alt="Exported coastline over OpenStreetMap"><h2>Manual fixes</h2><ul>'+''.join('<li>'+html.escape(v)+'</li>' for v in m.get('manual_fixes',[]))+'</ul>'
(out/'atlas-review.html').write_text(s)
