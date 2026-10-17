import sys,json,math,pickle,struct
from pathlib import Path
import numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
s=pickle.load(open('work/coast_curated/scene.pkl','rb'));assets=s['assets'];colors=s['colors'];instances=s['instances'];geo=json.loads(Path('work/coast_geography/geography.json').read_text())
for o in instances:
 k=o['asset'].lower()
 if ('authored / seaside' in k or 'authored / alys' in k) and not any(w in k for w in ['tree','grass','palm','bridge','pier','dock','stadium','boat','trawler','sail','mangrove','car','bench','umbrella']):
  o['s']=[o['s'][0]*1.18/1.8,o['s'][1]*1.18/1.8,o['s'][2]*1.55/2.4]
# Keep cream roofs light and pastel facades legible under directional daylight.
for i,(n,col) in enumerate(colors):
 if n=='Curated tin roof':colors[i]=(n,'#c8cdbf')
 if n=='Curated foliage':colors[i]=(n,'#668e59')
 if n=='Curated coral':colors[i]=(n,'#e6b2a4')
 if n=='Curated mint':colors[i]=(n,'#bad9c2')
 if n=='Curated sky':colors[i]=(n,'#b2cfdd')
def rgb(c):return [int(c[i:i+2],16)/255 for i in [1,3,5]]
src=Path('work/florida_atlas/build_atlas.py').read_text();exp='def export('+src.split('def export(')[1].split("geokeys=['Geography")[0];exp=exp.replace('US Census 2025 cartographic boundaries 1:500,000; TIGER primary and secondary roads; Natural Earth major lakes','US Census 2025 state polygons and detailed TIGER AREAWATER for seven Panhandle coastal counties; Natural Earth major lakes')
exec(exp);export(Path('outputs/florida_coastal_curated/florida_coastal_curated.glb'),instances,s['geokeys']);pickle.dump(s,open('work/coast_curated/scene.pkl','wb'));print('Refined residential scale and exported')
