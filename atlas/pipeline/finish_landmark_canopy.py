"""Thin only illustrative crown overlaps around explicitly configured landmarks.
Source positions and building meshes are retained. Run on an exported manifest.
"""
from pathlib import Path
import json,gzip,sys,hashlib,math
P=Path(__file__).resolve().parent;m=json.load(open(P/sys.argv[1]));recipes=json.load(open(P/m['recipes']));rules=recipes.get('landmarks',{});out=P/'outputs/coastal_pipeline_v4'/m['id'];inventory=json.load(open(out/'inventory.json'));inventory=inventory if isinstance(inventory,list) else inventory['buildings'];clear=[]
for b in inventory:
 key=str(b['osm_type'])+'/'+str(b['id']);radius=rules.get(key,{}).get('canopyClearanceMeters')
 if radius:clear.append((b['x'],b['y'],radius/1000,key))
if not clear:sys.exit(0)
meta=json.load(open(out/'scene.json'));removed=0
for tile in meta.get('treeTiles',{}):
 path=out/(tile+'.trees.json.gz');points=json.load(gzip.open(path,'rt'));kept=[p for p in points if not any(math.hypot(p[0]-x,p[1]-y)<r for x,y,r,_ in clear)];removed+=len(points)-len(kept);path.write_bytes(gzip.compress(json.dumps(kept,separators=(',',':')).encode(),mtime=0));meta['treeTiles'][tile]=len(kept)
# Reserved metadata entry invalidates the existing crown-data cache without changing any district crown profile.
meta.setdefault('crownProfiles',{})['_landmarkInput']={'revision':hashlib.sha256(json.dumps(clear).encode()).hexdigest()[:12]};(out/'scene.json').write_text(json.dumps(meta,separators=(',',':')));p=out/'report.json';report=json.load(open(p));report['tree_count']-=removed;report['landmark_canopy_clearance']={'removed_illustrative_crowns':removed,'clearances':clear,'building_meshes_changed':False};p.write_text(json.dumps(report,indent=2)+'\n');print('Landmark canopy overlaps removed:',removed)
