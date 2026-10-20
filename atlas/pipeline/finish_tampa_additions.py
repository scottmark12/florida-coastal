"""Finalize only visually captured new packages; preserve approved regional packages."""
from pathlib import Path
import json,shutil,html,hashlib
P=Path(__file__).resolve().parent;A=P.parent
for row in json.load(open(P/'tampa-coast-additions.json')):
 tid,name,*_=row;root=P/'work/coastal_pipeline/v4'/tid;pkg=A/'regions/packages'/tid
 if not(pkg/'report.json').exists():continue
 for view in ['town','street']:
  capture=json.load(open(P/'outputs/landing-captures'/(tid+'-'+view+'.json')))
  assert capture['viewport']=='1600×1000' and not capture['errors'],tid
 r=json.load(open(pkg/'report.json'));boats=json.load(open(pkg/'boats.json')) if (pkg/'boats.json').exists() else {'boats':[],'checks':{'land_intersections':0}}
 r.update(status='review candidate; physical phone timing unverified',visual_qa='Both landing zooms captured at 1600×1000; phone crops exported; no observed console errors.',illustrative_boats=len(boats['boats']),boat_land_intersections=boats.get('checks',{}).get('land_intersections',0))
 names=['base.glb.gz','region.glb.gz','scene.json','shore-wash.png','shore-wash.json']+(['boats.json.gz'] if (pkg/'boats.json.gz').exists() else [])
 r['initial_asset_bytes_with_boats']=sum((pkg/n).stat().st_size for n in names);assert r['initial_asset_bytes_with_boats']<4000000,(tid,r['initial_asset_bytes_with_boats']);assert r['exported_boundary_source_error_m']<=150
 (pkg/'report.json').write_text(json.dumps(r,indent=2)+'\n');shutil.copy2(root/'recipes.json',pkg/'district-style-recipes.json')
 d=json.load(open(root/'districts.json'))[0];m=json.load(open(root/'manifest.json'));hero=json.load(open(P/'tampa-addition-heroes.json'))[tid]
 s='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(name)+' · atlas review</title><style>body{font:16px system-ui;background:#f5eedf;color:#345047;margin:24px}main{max-width:1400px;margin:auto}img{width:100%;display:block}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}figure{margin:0}a{color:#a34f28}p{line-height:1.5}@media(max-width:700px){.pair{grid-template-columns:1fr}}</style><main><h1>'+html.escape(name)+'</h1><p>'+html.escape(d['description'])+'</p><p><a href="../../../explore_coast.html?view='+tid+'&amp;level=town">Explore town</a> · <a href="../../../explore_coast.html?view='+tid+'&amp;level=region">Whole coastal region</a> · <a href="district-style-recipes.json">Style recipe</a> · <a href="accuracy.csv">Accuracy CSV</a> · <a href="district-price-sources.csv">Price CSV</a> · <a href="report.json">Checks</a></p><p>'+html.escape(d['priceRange'])+' · <a href="'+html.escape(d['priceSource'],quote=True)+'">Published source</a></p><p>'+html.escape(hero[3])+' · <a href="'+hero[7]+'">Hero coordinate source</a></p><div class="pair">'
 for suffix,caption in [('', 'Town'),('-close','Street')]:s+='<figure><img src="../../../landing/'+tid+suffix+'.webp" alt="'+html.escape(name)+' '+caption+'"><figcaption>'+caption+' · <a href="../../../landing/'+tid+suffix+'-m.webp">Phone crop</a></figcaption></figure>'
 s+='</div><h2>OpenStreetMap source alignment</h2><p>'+str(round(r['exported_boundary_source_error_m'],2))+' m maximum coastline-to-source difference; '+str(r['max_anchor_error_m'])+' m maximum anchor serialization difference. This compares the exported model to the source, not to an independent survey.</p><a href="region-osm-overlay.png"><img src="region-osm-overlay.png" alt="Serialized model shoreline over OpenStreetMap"></a><h2>Manual input choices</h2><ul>'+''.join('<li>'+html.escape(n)+'</li>' for n in m['manual_fixes'])+'</ul><p>© OpenStreetMap contributors, ODbL · ESA WorldCover 2021 CC BY 4.0 · Microsoft footprints, CDLA Permissive 2.0. Individual facade colors, untagged heights, canopy crowns and vessel occupancy are illustrative. Physical-phone speed is unverified.</p></main></html>'
 (pkg/'atlas-review.html').write_text(s)
 for csvfile in pkg.glob('*.csv'):csvfile.write_bytes(csvfile.read_bytes().replace(b'\r\n',b'\n'))
 print(tid,r['initial_asset_bytes_with_boats'],r['illustrative_boats'],flush=True)
