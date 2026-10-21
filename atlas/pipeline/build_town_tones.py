"""Measure selective display color recipes against the georeferenced flight map.
Reads original images without changing approved landing exports or geometry.
"""
from pathlib import Path
from collections import Counter
import json,math,statistics
from PIL import Image
R=Path(__file__).resolve().parents[2];A=R/'atlas';meta=json.load(open(R/'img/atlas/flight-regions.json'));bounds=meta['bounds'];regional=Image.open(R/meta['desktop'].split('?')[0]).convert('RGB');index=json.load(open(A/'landing/index.json'));recipes={}
def water(im,mode=False):
 pixels=[p for p in im.convert('RGB').resize((160,100)).getdata() if p[1]>p[0]*1.15 and p[2]>p[0]*1.2 and 55<p[1]<220]
 if len(pixels)<320:return None
 if mode:return list(Counter(pixels).most_common(1)[0][0])
 return [round(statistics.median(p[c] for p in pixels)) for c in range(3)]
for t in index['towns']:
 for v in t['views'].values():
  cx=t['center']['x'];cy=-t['center']['y']/math.sqrt(2);c=v['camera']
  def x(v):return (v-bounds[0])/(bounds[2]-bounds[0])*regional.width
  def y(v):return (v-bounds[1])/(bounds[3]-bounds[1])*regional.height
  target=water(regional.crop((x(cx+c['left']),y(cy-c['top']),x(cx+c['right']),y(cy-c['bottom']))))
  for frame in ['desktop','mobile']:
   source=water(Image.open(A/'landing'/v[frame]),True)
   if source and target:
    shift=[max(-48,min(48,b-a)) for a,b in zip(source,target)]
    if max(abs(d) for d in shift)>=3:recipes[v[frame].removesuffix('.webp')]={'water':source,'shift':shift,'target':target}
(R/'img/atlas/town-tones.json').write_text(json.dumps({'method':'Selective water-color display transfer, matched to each landing camera footprint on the regional raster. RGB shifts capped at 48; colors outside the source water family retain their original values.','recipes':recipes},indent=2)+'\n')
print('Measured',len(recipes),'display recipes')
