"""Input-only context adapter. No changes to the locked renderer."""
import sys,json
from pathlib import Path
sys.path.insert(0,'work/30a_finish');from geometry import *
p=Path('work/coastal_pipeline/v4')/sys.argv[1];m=json.load(open(p/'manifest.json'));clip=project(box(*m['bounds']));context=shape(json.load(open('work/florida_atlas/geography.json'))['land']).intersection(clip.buffer(12)).difference(clip)
(p/'context.json').write_text(json.dumps(mapping(context)));m['inputs']['context']={'path':str(p/'context.json'),'source':'Existing US Census TIGER/Line state and lake context outside the detailed OSM rectangle','license':'US government public-domain data','projection':'atlas kilometers'};note='Existing Census land context continues beyond the OSM data rectangle, avoiding artificial water edges at the package boundary.'
if note not in m['manual_fixes']:m['manual_fixes'].append(note)
(p/'manifest.json').write_text(json.dumps(m,indent=2))
# Remove obsolete draft price labels after verified price evidence is applied.
dp=Path(m['inputs']['districts']);ds=json.load(open(dp))
for d in ds:
 if d.get('priceEvidence'):
  d.pop('priceBenchmark',None);d['priceStatus']='Published market median; reporting period shown on card.'
dp.write_text(json.dumps(ds,indent=2));print('Context area km2',context.area,'Districts',len(ds))
