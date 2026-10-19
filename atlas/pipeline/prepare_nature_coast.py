"""Prepare five Nature Coast town packages from a saved, coherent OSM snapshot.
Usage: python prepare_nature_coast.py /path/to/saved/nature-coast
Uses the shared normalizer; no renderer, geography-engine or scale changes.
"""
import sys,json,gzip,shutil,subprocess
from pathlib import Path
P=Path(__file__).resolve().parent;A=P.parent;source=Path(sys.argv[1]).resolve();import os;os.chdir(P)
catalog=json.load(open(source/'catalog-input.json'));editorial=json.load(open(source/'editorial.json'));region=catalog['region'];root=P/'work/coastal_pipeline/v4';parent=root/'nature-coast';parent.mkdir(exist_ok=True)
for name in ['editorial.json','verified-prices.json','ozello-price-evidence.json','ozello-listing-sample.csv','snapshot-source.json']:
 if (source/name).exists():shutil.copy2(source/name,parent/name)
styles={
 'steinhatchee':(['#e8d9b9','#c2d1bc','#c9dfe0','#e4bca0','#eee9d8'],['#9faeaa','#c4cecb','#9b8c7c'],'Riverfront fishing camps, modest raised cottages and working marina sheds; open tidal river and docks.'),
 'cedarkey':(['#d6c3a5','#b4c9c3','#e5b8a8','#d7d9cd','#f2e7ca'],['#b9c9c8','#a4aaa0','#a77966'],'Compact island cottages and weathered Dock Street fish-house buildings, clustered beside tidal keys and marsh.'),
 'crystal-river':(['#f0e2bf','#c3d7cf','#e3bca9','#e4d4af','#f6eddb'],['#b8cac8','#a2b7af','#b4aaa0'],'Small historic downtown blocks and leafy spring-water neighborhoods around Kings Bay; low resort and marina buildings.'),
 'homosassa':(['#d2bf9d','#e7dabd','#b7c9b3','#d8bca2','#eee6d1'],['#aabbb1','#c3cbc7','#8d998b'],'Old Florida river cottages and fish-camp buildings tucked into broad live oaks, docks and wooded river islands.'),
 'ozello':(['#d7c3a2','#d4ded0','#bbcec8','#e4bcab','#f3e9d0'],['#b8c8c4','#d0d4ca','#a6aca3'],'Very sparse fishing homes on tiny marsh islands, reached by winding Ozello Trail; creeks and salt marsh dominate.')}
def points(e):
 for q in e.get('geometry',[]):
  if isinstance(q,dict) and 'lon' in q:yield q['lon'],q['lat']
 for m in e.get('members',[]):
  for q in m.get('geometry',[]):
   if 'lon' in q:yield q['lon'],q['lat']
 if 'lon' in e:yield e['lon'],e['lat']
def intersects(e,b):
 pts=list(points(e))
 if not pts:return False
 xs,ys=zip(*pts);return min(xs)<=b[2] and max(xs)>=b[0] and min(ys)<=b[3] and max(ys)>=b[1]
raw={name:json.load(gzip.open(source/(name+'.json.gz'),'rt'))['elements'] for name in ['geography','cover']}
for town in catalog['towns']:
 tid=town['id'];d=root/tid;d.mkdir(exist_ok=True);x,y=town['lon'],town['lat'];b=[x-.065,y-.055,x+.065,y+.055]
 ed={'prices':{tid:editorial['prices'][tid]},'recipes':{tid:{'walls':styles[tid][0],'roofs':styles[tid][1],'roof':'gable','detail':'painted-wood-porches','source':town['source_url'],'character':styles[tid][2],'trim':['#f7eed9','#b3cbbd']}},'manual_fixes':['Recipes curated from Florida Coastal town profiles; facade colors are editorial, not per-building surveys.','Town-wide published medians and the dated Ozello listing sample are labeled with their source and period.']}
 if tid=='ozello':ed['priceEvidence']={tid:editorial['priceEvidence'][tid]}
 (d/'catalog-input.json').write_text(json.dumps({'region':{**region,'name':town['name'],'towns':[tid]},'towns':[town],'bounds':b},indent=2));(d/'editorial.json').write_text(json.dumps(ed,indent=2))
 for name in ['geography','cover']:
  es=[e for e in raw[name] if intersects(e,b)];(d/(name+'.json.gz')).write_bytes(gzip.compress(json.dumps({'elements':es},separators=(',',':')).encode(),mtime=0))
 shutil.copy2(source/('district-'+tid+'.json.gz'),d/('district-'+tid+'.json.gz'));shutil.copy2(source/'snapshot-source.json',d/'snapshot-source.json')
 subprocess.run([sys.executable,'work/coastal_pipeline/v4/normalize_region.py',tid],check=True)
 recipes=json.load(open(d/'recipes.json'));recipes['coastalHeightZones']=[];
 if tid=='steinhatchee':
  recipes['workingHarbors']=json.load(open(P/'nature-working-harbors.json'))
 (d/'recipes.json').write_text(json.dumps(recipes,indent=2)+'\n')
 subprocess.run([sys.executable,'work/coastal_pipeline/v4/prepare_context.py',tid],check=True)
 print('PREPARED',tid,flush=True)
