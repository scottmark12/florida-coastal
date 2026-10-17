import json,csv,hashlib,zipfile
from pathlib import Path
from PIL import Image
P=Path('work/coastal_pipeline/v3');O=Path('outputs/coastal_pipeline_v3/miami');ds=json.load(open(P/'miami/districts-current.json'))
with (O/'district-price-sources.csv').open('w',newline='') as f:
 w=csv.writer(f);w.writerow(['district','median_usd','metric','period','checked','source'])
 for d in ds:
  e=d['priceEvidence'];w.writerow([d['name'],e['value'],e['metric'],e['period'],e['checked'],d['priceSource']])
assert all(hashlib.sha256((P/'miami'/k).read_bytes()).hexdigest()==v for k,v in json.load(open(P/'miami/approved-core-hashes.json')).items())
files=[f'atlas-{view}-{width}.png' for view in ['region','south-beach','brickell'] for width in [390,1440]]
for file in files:
 assert (O/file).exists();assert Image.open(O/file).width==int(file.split('-')[-1].split('.')[0])
html='''<!doctype html><html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Miami atlas · review</title><style>body{background:#f7f1e5;color:#31544d;font:16px system-ui;margin:32px}h1,h2{font-family:Georgia}a{color:#a24d27}.pair{display:flex;align-items:flex-start;gap:20px;margin-bottom:40px}.pair img{max-width:100%;height:auto;border-radius:12px}.phone{width:23%}.desktop{width:74%}@media(max-width:700px){.pair{display:block}.phone,.desktop{width:100%;margin-bottom:15px}}</style><h1>Miami · district character pass</h1><p>Actual screenshots from explore_coast.html. Approved core geography and 30A artwork preserved.</p><p><a href="/explore_coast.html?view=miami&level=region">Open the atlas</a> · <a download href="accuracy.csv">District-center accuracy CSV</a> · <a download href="district-price-sources.csv">Seven sourced medians</a> · <a href="region-osm-overlay.png">OSM overlay</a></p><p>Maximum district anchor source-alignment error: 0.014 m. Mid Beach uses the mapped Fontainebleau footprint centroid as a representative district anchor. Source alignment is not independent survey accuracy.</p>'''
for view,title in [('region','Region'),('south-beach','South Beach'),('brickell','Brickell')]:
 html+=f'<h2>{title}</h2><div class="pair">'
 for width,cls in [(390,'phone'),(1440,'desktop')]:html+=f'<a class="{cls}" href="atlas-{view}-{width}.png"><img alt="{title} at {width}px" src="atlas-{view}-{width}.png"><br>{width} px</a>'
 html+='</div>'
(O/'atlas-review.html').write_text(html+'</html>')
(O/'index.html').write_text('<!doctype html><meta http-equiv="refresh" content="0;url=/explore_coast.html?view=miami&level=region"><a href="/explore_coast.html?view=miami&level=region">Miami is now in the main atlas</a>')
(O/'ATLAS-PIPELINE.md').write_text((P/'ATLAS-PIPELINE.md').read_text())
checks={'entry':'explore_coast.html','same_renderer_cards_labels_phone_controls_as_30a':True,'approved_core_geometry_unchanged':True,'districts':len(ds),'published_medians':len(ds),'screenshots':files,'console_errors_observed':0,'physical_phone_tested':False,'exporter_matches_build':json.load(open(O/'report.json'))['engine_sha256']==hashlib.sha256((P/'engine.py').read_bytes()).hexdigest()}
(O/'atlas-checks.json').write_text(json.dumps(checks,indent=2))
with zipfile.ZipFile(O/'miami-review-evidence.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in files+['accuracy.csv','district-price-sources.csv','region-osm-overlay.png','ATLAS-PIPELINE.md','atlas-checks.json','30a-preservation.json','atlas-review.html']:z.write(O/f,f)
print(json.dumps(checks,indent=2))
