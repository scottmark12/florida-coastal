"""Illustrative moored boats beside mapped OSM docks. Run: python boats.py /path/to/source-index.json.
Source index entries: town, path (OSM API XML), bounds, source, retrieved.
No live vessel inventory is implied; existing land/building geometry is never changed.
"""
import gzip,json,sys,math,xml.etree.ElementTree as E,shutil
from pathlib import Path
P=Path(__file__).resolve().parent;A=P.parent
sys.path.insert(0,str(P/'work/florida_atlas/python_pkgs'));sys.path.insert(0,str(P/'work/30a_finish'))
from geometry import project,shape,LineString,Point,Polygon,unary_union,mapping,box
registry=json.load(open(A/'regions/package-registry.json'));packages={};summary=[]
for entry in json.load(open(sys.argv[1])):
 tid=entry['town']
 if 'error' in entry:summary.append(entry);continue
 # Downtown Panama City marina is closed/rebuilding; do not populate it with a working fleet.
 if tid=='panama-city':summary.append({'town':tid,'boats':0,'note':'Downtown marina closure; no illustrative fleet added.'});continue
 pkg=registry[tid];rid=pkg.strip('/').split('/')[-1];m=json.load(open(P/'work/coastal_pipeline/v4'/rid/'manifest.json'))
 if rid not in packages:packages[rid]={'land':project(shape(json.load(open(P/m['inputs']['land']['path'])))),'boats':[],'towns':[],'sources':[],'occupied':[],'seen':set(),'docks':[]}
 pack=packages[rid];land=pack['land'];root=E.parse(entry['path']).getroot();nodes={n.attrib['id']:(float(n.attrib['lon']),float(n.attrib['lat'])) for n in root.findall('node')};piers=[];marinas=[]
 for w in root.findall('way'):
  t={q.attrib['k']:q.attrib['v'] for q in w.findall('tag')};coords=[nodes[n.attrib['ref']] for n in w.findall('nd') if n.attrib['ref'] in nodes]
  if len(coords)<2:continue
  if t.get('leisure')=='marina' and coords[0]==coords[-1]:
   from shapely.geometry import Polygon
   marinas.append(project(Polygon(coords)).buffer(.05))
  if t.get('man_made')=='pier':piers.append((w.attrib['id'],t,project(LineString(coords)),coords[0]==coords[-1]))
 dockAreas=unary_union([Polygon(list(line.coords)) for _,_,line,closed in piers if closed]);marina=unary_union(marinas);before=len(pack['boats']);source_ids=[]
 for ident,t,line,closed in piers:
  if ident in pack['seen']:continue
  pack['seen'].add(ident)
  if t.get('fishing')=='yes' or t.get('leisure')=='fishing':continue
  # Long open fishing/observation piers aren't marinas; closed polygons aren't dock centerlines.
  if not closed and line.length>.22 and (marina.is_empty or not marina.intersects(line)):continue
  if any(word in t.get('name','').lower() for word in ['kayak','fishing','observation']):continue
  if line.length<.008:continue
  added=0
  for k in range(1,int(line.length/.013)):
   q=line.interpolate(k*.013);a=line.interpolate(max(0,k*.013-.002));b=line.interpolate(min(line.length,k*.013+.002));dx,dy=b.x-a.x,b.y-a.y;norm=math.hypot(dx,dy)
   if norm==0:continue
   for sign in [-1,1]:
    seed=int(ident)+k*31+(sign+1)*7
    if seed%7==0:continue # Occupied and empty slips, never solid rows.
    length=(9+seed%6)/1000;width=length*.31;nx,ny=-dy/norm*sign,dx/norm*sign;offset=length*.5+.0025;cx,cy=q.x+nx*offset,q.y+ny*offset
    hull=LineString([(cx-nx*length*.4,cy-ny*length*.4),(cx+nx*length*.4,cy+ny*length*.4)]).buffer(width*.55)
    if land.intersects(hull.buffer(.001)) or dockAreas.intersects(hull.buffer(.001)) or any(hull.distance(old)<.002 for old in pack['occupied']):continue
    pack['occupied'].append(hull);pack['boats'].append([round(cx,6),round(cy,6),round(math.atan2(nx,-ny),5),length,width,seed%5,tid]);added+=1
  if added:
   source_ids.append('https://www.openstreetmap.org/way/'+ident);pack['docks'].append({'closed':closed,'points':[[round(x,6),round(y,6)] for x,y in line.coords]})
 pack['sources']+=source_ids;pack['towns'].append(tid);summary.append({'town':tid,'boats':len(pack['boats'])-before,'mapped_docks':len(source_ids)})
for rid,pack in packages.items():
 if not pack['boats']:continue
 data={'version':1,'description':'Illustrative moored boats, not a live vessel inventory. Dock proximity and land clearance verified against mapped source geometry.','source':'© OpenStreetMap contributors · ODbL 1.0','dock_sources':pack['sources'],'towns':pack['towns'],'boats':pack['boats'],'docks':pack['docks'],'checks':{'land_intersections':sum(pack['land'].intersects(h) for h in pack['occupied']),'minimum_hull_gap_m':2,'maximum_dock_offset_m':9.5}}
 inp=P/'work/coastal_pipeline/v4'/rid/'boats.json';inp.write_text(json.dumps(data,separators=(',',':')))
 for target in [A/'regions/packages'/rid,P/'outputs/coastal_pipeline_v4'/rid]:
  if not target.exists():continue
  shutil.copy2(inp,target/'boats.json');(target/'boats.json.gz').write_bytes(gzip.compress(inp.read_bytes(),mtime=0));s=json.load(open(target/'scene.json'));s['boats']='boats.json.gz';(target/'scene.json').write_text(json.dumps(s,separators=(',',':')))
(A/'regions/boats-report.json').write_text(json.dumps({'description':'Illustrated marina occupancy from mapped dock geometry; not real-time boats.','towns':summary,'total_boats':sum(len(p['boats']) for p in packages.values())},indent=2))
print(json.dumps(summary,indent=2))
