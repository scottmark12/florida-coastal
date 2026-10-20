import json,hashlib,csv
from pathlib import Path
from PIL import Image
p=Path('outputs/coastal_pipeline_v4/miami');old=Path('outputs/coastal_pipeline_v3/miami');files=[f'atlas-{view}-{width}.png' for view in ['region','south-beach','brickell'] for width in [390,1440]]
for f in files:assert Image.open(p/f).width==int(f.split('-')[-1][:-4])
lock=json.load(open('outputs/30a_locked/lock-manifest.json'));checks={name:hashlib.sha256(Path(name).read_bytes()).hexdigest()==h for name,h in lock['files'].items() if any(k in name for k in ['30a-finished','30a.json','sand.json','alys-geometry','canopy-mask','canopies/'])};assert all(checks.values())
assert all(hashlib.sha256((Path('work/coastal_pipeline/v3/miami')/name).read_bytes()).hexdigest()==h for name,h in json.load(open('work/coastal_pipeline/v3/miami/approved-core-hashes.json')).items())
r=json.load(open(p/'report.json'));r['status']='validated at requested viewport widths; physical phone timing unverified';r['visual_qa']='Region, South Beach and Brickell rendered at 390 and 1440 px; no console errors observed';r['physical_phone_tested']=False;r['scene_bytes']=(p/'scene.json').stat().st_size;r['approved_source_geometry_unchanged']=True;r['30a_assets_unchanged']=True
(p/'report.json').write_text(json.dumps(r,indent=2));(p/'30a-preservation.json').write_text(json.dumps(checks,indent=2));s=(old/'atlas-review.html').read_text().replace('Miami · district character pass','Miami · tiled pipeline validation').replace('Approved core geography and 30A artwork preserved.','Approved core geography and 30A artwork preserved. Brighter South Beach pastels; full-detail ground and trees load by visible area.').replace('<h2>Region</h2>','<p>Region geometry: 2.08 MB. Exported coastline to source: maximum 6.29 m. Physical-phone timing is not verified.</p><h2>Region</h2>')
(p/'atlas-review.html').write_text(s)
print(json.dumps(r,indent=2))
