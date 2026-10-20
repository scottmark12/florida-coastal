"""Publish local Town packages from a validated full export; retain source triangles.
Run after engine.py/water_wash.py/proof.py: python split_town_packages.py REGION.
No simplification, displacement, or style changes. Initial loads must stay <4 MB.
"""
from pathlib import Path
import json,sys,shutil,re
import numpy as np
P=Path(__file__).resolve().parent;A=P.parent
sys.path.insert(0,str(P/'work/coastal_pipeline/v4'))
from mesh_export import read_triangles,write_mesh
rid=sys.argv[1];source=P/'outputs/coastal_pipeline_v4'/rid;dest=A/'regions/packages'/rid;dest.mkdir(parents=True,exist_ok=True)
meta=json.load(open(source/'scene.json'));views=json.load(open(A/'regions/town-views.json'));registry=json.load(open(A/'regions/package-registry.json'));meshes={n:read_triangles(source/(n+'.glb.gz')) for n in ['base','region']};checks=[]
for d in meta['districts']:
 town=d['town'];v=views.get(town,d);x,y=v['x'],v['y'];radius=4.5;out=dest/town;out.mkdir(exist_ok=True)
 for name,colors in meshes.items():
  local={}
  for color,a in colors.items():
   t=a.reshape(-1,3,3);tx=t[:,:,0];ty=-t[:,:,2];mask=(tx.max(1)>=x-radius)&(tx.min(1)<=x+radius)&(ty.max(1)>=y-radius)&(ty.min(1)<=y+radius)
   if mask.any():local[color]=t[mask].reshape(-1,3)
  write_mesh(out,name,local);actual=read_triangles(out/(name+'.glb.gz'));assert all(np.array_equal(a,actual[k]) for k,a in local.items())
 def nearby(k):
  ix,iy=map(int,re.fullmatch(r'tile-(-?\d+)-(-?\d+)',k).groups());return abs(ix+.5-x)<radius+1 and abs(iy+.5-y)<radius+1
 m={**meta,'districts':[d],'tiles':{k:v for k,v in meta['tiles'].items() if nearby(k)},'treeTiles':{k:v for k,v in meta.get('treeTiles',{}).items() if nearby(k)}}
 for k in m['tiles']:shutil.copy2(source/(k+'.glb.gz'),out/(k+'.glb.gz'))
 for k in m['treeTiles']:shutil.copy2(source/(k+'.trees.json.gz'),out/(k+'.trees.json.gz'))
 for f in ['shore-wash.png','shore-wash.json']:shutil.copy2(source/f,out/f)
 (out/'scene.json').write_text(json.dumps(m,separators=(',',':')))
 initial=sum((out/f).stat().st_size for f in ['base.glb.gz','region.glb.gz','scene.json','shore-wash.png','shore-wash.json']);assert initial<4000000,(town,initial)
 checks.append({'town':town,'initial_bytes':initial,'source_triangle_positions_identical':True,'radius_km':radius});registry[town]='packages/'+rid+'/'+town+'/'
for f in ['accuracy.csv','region-osm-overlay.png','district-price-sources.csv','canopy-sources.json']:
 if (source/f).exists():shutil.copy2(source/f,dest/f)
r=json.load(open(source/'report.json'));assert r['exported_boundary_source_error_m']<=150 and r['max_height_width_ratio']<=3.000001;r['delivery']='Spatial Town packages; full-region export retained as local build input';r['town_packages']=checks;(dest/'report.json').write_text(json.dumps(r,indent=2)+'\n');(A/'regions/package-registry.json').write_text(json.dumps(registry,indent=2)+'\n')
p=A/'regions/districts.json';ds=json.load(open(p));ids={d['id'] for d in meta['districts']};p.write_text(json.dumps([d for d in ds if d['id'] not in ids]+meta['districts'],indent=2)+'\n')
print(json.dumps(checks,indent=2))
