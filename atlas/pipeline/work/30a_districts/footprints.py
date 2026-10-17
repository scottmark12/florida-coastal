import sys
sys.path.insert(0,'work/30a_finish')
from geometry import *
root=ET.parse('work/30a_districts/alys-current.osm').getroot();nodes={n.get('id'):(float(n.get('lon')),float(n.get('lat'))) for n in root.findall('node')};old={e['id'] for e in json.loads((D/'map-data.json').read_text())['elements'] if e.get('tags',{}).get('building')};buildings=[]
for w in root.findall('way'):
 tags={t.get('k'):t.get('v') for t in w.findall('tag')}
 if 'building' not in tags:continue
 pts=[nodes[n.get('ref')] for n in w.findall('nd') if n.get('ref') in nodes]
 if len(pts)<4 or pts[0]!=pts[-1]:continue
 poly=make_valid(Polygon(pts));c=poly.centroid
 if not (-86.0378<c.x<-86.0235 and 30.280<c.y<30.291):continue
 buildings.append((int(w.get('id')),poly,tags))
print('buildings',len(buildings),'not in prior source',sum(w not in old for w,p,t in buildings))
print('new ids',[w for w,p,t in buildings if w not in old][:20])
# Retain mapped Alys buildings beyond the fresh request's edge too.
known={w for w,p,t in buildings}
for e in json.loads((D/'map-data.json').read_text())['elements']:
 if e['type']=='way' and 'building' in e.get('tags',{}) and e['id'] not in known:
  poly=polygons(e)
  if not poly.is_empty:buildings.append((e['id'],poly,e['tags']))
# Courtyard blocks are often relations, not standalone building ways.
ways={w.get('id'):[{'lon':nodes[n.get('ref')][0],'lat':nodes[n.get('ref')][1]} for n in w.findall('nd') if n.get('ref') in nodes] for w in root.findall('way')}
for r in root.findall('relation'):
 tags={t.get('k'):t.get('v') for t in r.findall('tag')}
 if 'building' not in tags:continue
 e={'type':'relation','members':[{'role':m.get('role','outer'),'geometry':ways[m.get('ref')]} for m in r.findall('member') if m.get('ref') in ways]}
 poly=polygons(e)
 if not poly.is_empty:buildings.append((-int(r.get('id')),poly,tags))
from shapely import constrained_delaunay_triangles
extra=json.loads(Path('outputs/30a_finish/30a.json').read_text());ds=extra['districts'];data={'walls':[],'roofs':[],'lanes':[]};records=[];occupied=set()
def tri(key,points):data[key].extend([round(v,7) for x,y,z in points for v in [x,z,-y]])
def surface(key,p,z):
 for part in parts(p):
  for t in constrained_delaunay_triangles(part).geoms:tri(key,[(x,y,z) for x,y in list(t.exterior.coords)[:3]])
def sides(key,p,z0,z1):
 for part in parts(p):
  for ring in [part.exterior,*part.interiors]:
   for a,b in zip(ring.coords,list(ring.coords)[1:]):
    tri(key,[(*a,z0),(*b,z0),(*b,z1)]);tri(key,[(*a,z0),(*b,z1),(*a,z1)])
for wid,poly,tags in buildings:
 p=project(poly);c=p.centroid;nearest=min(ds,key=lambda d:(d['x']-c.x)**2+(d['y']-c.y)**2)
 if nearest['id']!='alys':continue
 cs=list(p.minimum_rotated_rectangle.exterior.coords);width=min(math.dist(cs[0],cs[1]),math.dist(cs[1],cs[2]));
 if width<.003:continue
 real=min(9,max(6,float(tags.get('building:levels',2))*3));h=min(real*.003,width*3)
 
 padded=p.buffer(.004);x0,y0,x1,y1=padded.bounds
 for ix in range(math.floor(x0/.004),math.ceil(x1/.004)+1):
  for iz in range(math.floor(-y1/.004),math.ceil(-y0/.004)+1):
   if padded.covers(Point((ix+.5)*.004,-(iz+.5)*.004)):occupied.add(str(ix)+','+str(iz))
 # Stepped Bermudian limestone courses stay within the existing height envelope.
 walltop=.003+h*.76;sides('walls',p,.003,walltop)
 current=p;z=walltop
 for course in range(7):
  inset=p.buffer(-width*.045*(course+1),join_style=2)
  if inset.is_empty:surface('roofs',current,z);break
  surface('roofs',current.difference(inset),z)
  nz=walltop+h*.24*(course+1)/7;sides('walls',inset,z,nz);current=inset;z=nz
 else:surface('roofs',current,z)
 records.append({'osm_id':abs(wid),'osm_type':'relation' if wid<0 else 'way','footprint_m2':round(p.area*1e6,2),'height_m':round(h*1000,2)})
for w in root.findall('way'):
 tags={t.get('k'):t.get('v') for t in w.findall('tag')}
 if tags.get('highway') not in ['footway','pedestrian','path','steps']:continue
 pts=[nodes[n.get('ref')] for n in w.findall('nd') if n.get('ref') in nodes]
 if len(pts)<2:continue
 line=project(LineString(pts));c=line.centroid;nearest=min(ds,key=lambda d:(d['x']-c.x)**2+(d['y']-c.y)**2)
 if nearest['id']=='alys':surface('lanes',line.buffer(.0012,cap_style=2),.0065)
data['occupied']=sorted(occupied)
Path('outputs/30a_districts/alys-geometry.json').write_text(json.dumps(data,separators=(',',':')))
Path('outputs/30a_districts/alys-footprints.json').write_text(json.dumps({'source':'https://api.openstreetmap.org/api/0.6/map?bbox=-86.038,30.279,-86.022,30.293','buildings':records,'note':'Exact OSM polygon outlines, unscaled in plan. Height 3× estimated 2–3 stories capped at 3× footprint width. No invented infill.'},indent=2))
print('Alys exact outlines:',len(records),'roof area',sum(r['footprint_m2'] for r in records))

import gzip
path=Path('outputs/30a_districts/alys-geometry.json');path.with_suffix('.json.gz').write_bytes(gzip.compress(path.read_bytes(),compresslevel=9))
