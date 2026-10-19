"""Split the statewide bridge mesh into compact, visible-area runtime tiles."""
from pathlib import Path
import sys,json,shutil
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'work/coastal_pipeline/v4'))
from mesh_export import read_triangles,write_mesh
import numpy as np
A=P.parent;src=A/'regions/assets/bridges.glb.gz';tiles={}
for color,vs in read_triangles(src).items():
 tri=vs.reshape(-1,3,3);centers=tri.mean(axis=1);keys=np.floor(centers[:,[0,2]]/10).astype(int)
 for key in np.unique(keys,axis=0):
  mask=(keys==key).all(axis=1);name='bridge-'+str(key[0])+'-'+str(key[1]);tiles.setdefault(name,{})[color]=tri[mask].reshape(-1,3)
index=[];O=A/'regions/assets'
for name,colors in sorted(tiles.items()):
 size=write_mesh(O,name,colors);allvs=np.concatenate(list(colors.values()));index.append({'name':name,'bytes':size,'bounds':[float(allvs[:,0].min()),float(-allvs[:,2].max()),float(allvs[:,0].max()),float(-allvs[:,2].min())]})
(A/'regions/bridge-index.json').write_text(json.dumps({'tile_km':10,'source':'Geofabrik Florida 2026-10-17 · OSM / ODbL','tiles':index},separators=(',',':')))
archive=P/'outputs/bridge-source-mesh';archive.mkdir(exist_ok=True,parents=True);shutil.move(src,archive/'bridges.glb.gz')
report=json.load(open(A/'regions/bridges-report.json'));report.update(runtime_tile_count=len(index),max_runtime_tile_bytes=max(t['bytes'] for t in index),runtime_total_bytes=sum(t['bytes'] for t in index),runtime='Only bridge tiles intersecting the current town frame are loaded. Statewide intermediate mesh is excluded from Git.');(A/'regions/bridges-report.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='notes'},indent=2))
