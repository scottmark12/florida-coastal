"""Publish inspected screenshots and evidence without altering locked geometry."""
import json,sys,html
from pathlib import Path
from PIL import Image
id=sys.argv[1];O=Path('outputs/coastal_pipeline_v4')/id;m=json.load(open(Path('work/coastal_pipeline/v4')/id/'manifest.json'));meta=json.load(open(O/'scene.json'));r=json.load(open(O/'report.json'));qa=json.load(open(O/'visual-checks.json'))
assert qa['console_errors']==[]
for row in qa['views']:
 assert Image.open(O/row['file']).width==row['width']
r.update(visual_qa='Saved and inspected screenshots at '+', '.join(str(w)+'px' for w in sorted({v['width'] for v in qa['views']}))+'; no observed console errors',physical_phone_tested=False,status='review candidate; physical phone timing unverified')
(O/'report.json').write_text(json.dumps(r,indent=2))
E=html.escape;links=f'<a href="/explore_coast.html?view={m["towns"][0]}&level=region">Open atlas</a> · <a href="accuracy.csv">Accuracy CSV</a> · <a href="district-price-sources.csv">Price sources</a> · <a href="report.json">Validation</a>'
s=f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{E(m["name"])} · review</title><style>body{{background:#f7f1e5;color:#344e44;font:16px system-ui;max-width:1500px;margin:32px auto;padding:0 24px}}a{{color:#a34f28}}img{{width:100%;height:auto;border-radius:12px}}.pair{{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:24px;align-items:start}}figure{{margin:0}}figcaption{{margin:10px 0 24px}}.districts{{display:flex;gap:12px;flex-wrap:wrap}}@media(max-width:700px){{.pair{{display:block}}.phone{{max-width:390px;margin:auto}}}}</style><h1>{E(m["name"])}</h1><p>{links}</p><p>{r["region_bytes"]/1e6:.2f} MB region geometry · {r["exported_boundary_source_error_m"]:.2f} m maximum coastline-to-source difference · {r["max_anchor_error_m"]:.4f} m maximum district-anchor serialization difference.</p><p>These are OpenStreetMap source-alignment checks, not a survey. Physical-phone loading time remains unverified.</p>'
for view in dict.fromkeys(row['name'] for row in qa['views']):
 s+=f'<h2>{E(view)}</h2><div class="pair">'
 for row in sorted([row for row in qa['views'] if row['name']==view],key=lambda row:-row['width']):s+=f'<figure class="{"phone" if row["width"]==390 else "desktop"}"><a href="{E(row["url"])}"><img src="{E(row["file"])}" alt="{E(view)} at {row["width"]} pixels"></a><figcaption>{row["width"]} px · <a href="{E(row["url"])}">Explore this view</a></figcaption></figure>'
 s+='</div>'
s+='<style>.pair:has(figure:only-child){grid-template-columns:1fr}</style><h2>All districts</h2><div class="districts">'
for d in meta['districts']:s+=f'<a href="/explore_coast.html?view={d["town"]}&level=town&district={d["id"]}">{E(d["name"])}</a>'
s+='</div><h2>OpenStreetMap overlay</h2><a href="region-osm-overlay.png"><img src="region-osm-overlay.png" alt="Serialized land edges over OpenStreetMap"></a><h2>Manual fixes</h2><ul>'+''.join('<li>'+E(x)+'</li>' for x in m.get('manual_fixes',[]))+'</ul></html>'
(O/'atlas-review.html').write_text(s)
