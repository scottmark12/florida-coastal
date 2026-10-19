"""Acquire the existing input schema from a coherent local Geofabrik OSM snapshot.
Run from pipeline: python extract_osm_snapshot.py REGION[,REGION...] /path/to/florida.osm.pbf
Requires optional `pip install osmium`. No renderer, style, or scale changes.
The PBF and generated *.json.gz downloads are excluded from Git.
"""
import sys,json,gzip,hashlib
from pathlib import Path
sys.path.insert(0,'work/coastal_pipeline/deps')
import osmium
regions=sys.argv[1].split(',');source=Path(sys.argv[2]);packages={}
for region in regions:
 root=Path('work/coastal_pipeline/v4')/region;catalog=json.load(open(root/'catalog-input.json'));towns=catalog['towns']
 packages[region]={'root':root,'bounds':catalog['bounds'],'boxes':{t['id']:[t['lon']-.025,t['lat']-.022,t['lon']+.025,t['lat']+.022] for t in towns},'groups':{'geography':{},'cover':{},**{'district-'+t['id']:{} for t in towns}}}
bounds=[min(p['bounds'][0] for p in packages.values()),min(p['bounds'][1] for p in packages.values()),max(p['bounds'][2] for p in packages.values()),max(p['bounds'][3] for p in packages.values())]
def intersects(a,b):return a[0]<=b[2] and a[2]>=b[0] and a[1]<=b[3] and a[3]>=b[1]
def flags(t):
 return t.get('natural') in ['coastline','water','beach'], t.get('leisure') in ['park','garden','golf_course'] or t.get('landuse')=='forest' or t.get('natural') in ['wood','wetland','tree','tree_row']
def boxof(points):return [min(p['lon'] for p in points),min(p['lat'] for p in points),max(p['lon'] for p in points),max(p['lat'] for p in points)]
def add(e,b):
 key=(e['type'],e['id']);t=e['tags'];geo,cover=flags(t)
 for package in packages.values():
  if not intersects(b,package['bounds']):continue
  groups=package['groups']
  if geo or e['type']=='node' and t.get('place'):groups['geography'][key]=e
  if cover:groups['cover'][key]=e
  if e['type']!='node' and (t.get('building') or e['type']=='way' and t.get('highway')):
   for tid,bb in package['boxes'].items():
    if intersects(b,bb):groups['district-'+tid][key]=e

class Extract(osmium.SimpleHandler):
 def __init__(self):super().__init__();self.members={};self.count=0
 def node(self,n):
  if len(n.tags)==0:return
  lon,lat=n.location.lon,n.location.lat
  if not intersects([lon,lat,lon,lat],bounds):return
  t={tag.k:tag.v for tag in n.tags};geo,cover=flags(t)
  if not (geo or cover or t.get('place')):return
  if intersects([lon,lat,lon,lat],bounds):add({'type':'node','id':n.id,'lon':lon,'lat':lat,'tags':t},[lon,lat,lon,lat])
 def way(self,w):
  t={tag.k:tag.v for tag in w.tags};geo,cover=flags(t)
  if not (geo or cover or t.get('building') or t.get('highway')):return
  if not geo and not cover and w.nodes:
   first=w.nodes[0].location
   # A generous region envelope rejects far-away local buildings/roads cheaply.
   if first.valid() and not intersects([first.lon,first.lat,first.lon,first.lat],[bounds[0]-.1,bounds[1]-.1,bounds[2]+.1,bounds[3]+.1]):return
  pts=[{'lon':n.location.lon,'lat':n.location.lat} for n in w.nodes if n.location.valid()]
  if len(pts)!=len(w.nodes):raise RuntimeError('Incomplete way geometry in snapshot: '+str(w.id))
  if len(pts)>1:add({'type':'way','id':w.id,'geometry':pts,'tags':t},boxof(pts))
 def relation(self,r):
  if r.tags.get('building'):self.members[r.id]=[{'type':'way','ref':m.ref,'role':m.role} for m in r.members if m.type=='w']
 def area(self,a):
  if a.from_way():return
  t={tag.k:tag.v for tag in a.tags};geo,cover=flags(t)
  if not (geo or cover or t.get('building')):return
  members=[];points=[]
  for outer in a.outer_rings():
   for role,ring in [('outer',outer)]+[('inner',r) for r in a.inner_rings(outer)]:
    pts=[{'lon':n.location.lon,'lat':n.location.lat} for n in ring]
    members.append({'type':'way','ref':-(len(members)+1),'role':role,'geometry':pts});points+=pts
  if points:add({'type':'relation','id':a.orig_id(),'tags':t,'members':members,'geometryEncoding':'Original OSM area rings assembled by libosmium; negative refs are local ring identifiers.'},boxof(points))
handler=Extract();handler.apply_file(str(source),locations=True,idx='flex_mem')
for region,package in packages.items():
 root=package['root'];groups=package['groups']
 for name,data in groups.items():
  for e in data.values():
   if e['type']=='relation' and e['id'] in handler.members:e['members']=[m for m in e['members'] if m.get('geometry')]+handler.members[e['id']]
  payload={'generator':'Florida Coastal input adapter / pyosmium','source':'https://download.geofabrik.de/north-america/us/florida.html','snapshot':source.name,'copyright':'© OpenStreetMap contributors, ODbL 1.0','elements':list(data.values())}
  (root/(name+'.json.gz')).write_bytes(gzip.compress(json.dumps(payload,separators=(',',':')).encode()));print(name,len(data),flush=True)
 (root/'snapshot-source.json').write_text(json.dumps({'source':'https://download.geofabrik.de/north-america/us/florida.html','snapshot':source.name,'license':'ODbL 1.0','method':'Same geography/cover/building/highway tag selectors and district bounding boxes as fetch_region.py; complete OSM area rings assembled by libosmium.'},indent=2))
