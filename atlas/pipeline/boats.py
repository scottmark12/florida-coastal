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
 pkg=registry[tid];rid=pkg.strip('/').split('/')[-1];m=json.load(open(P/'work/coastal_pipeline/v4'/rid/'manifest.json'))
 if rid not in packages:packages[rid]={'land':project(shape(json.load(open(P/m['inputs']['land']['path'])))),'boats':[],'towns':[],'sources':[],'dock_sources':[],'occupied':[],'seen':set(),'docks':[]}
 pack=packages[rid];land=pack['land'];root=E.parse(entry['path']).getroot();nodes={n.attrib['id']:(float(n.attrib['lon']),float(n.attrib['lat'])) for n in root.findall('node')};piers=[];marinas=[];marina_polygons=[]
 for w in root.findall('way'):
  t={q.attrib['k']:q.attrib['v'] for q in w.findall('tag')};coords=[nodes[n.attrib['ref']] for n in w.findall('nd') if n.attrib['ref'] in nodes]
  if len(coords)<2 or t.get('disused')=='yes' or t.get('abandoned')=='yes' or t.get('construction'):continue
  if t.get('leisure')=='marina' and coords[0]==coords[-1]:
   from shapely.geometry import Polygon
   marina_shape=project(Polygon(coords));marinas.append(marina_shape.buffer(.05));marina_polygons.append((w.attrib['id'],marina_shape))
  if t.get('man_made')=='pier':piers.append((w.attrib['id'],t,project(LineString(coords)),coords[0]==coords[-1]))
 dockAreas=unary_union([Polygon(list(line.coords)) for _,_,line,closed in piers if closed]);marina=unary_union(marinas);before=len(pack['boats']);before_docks=len(pack['docks']);source_ids=[]
 for ident,t,line,closed in piers:
  if ident in pack['seen']:continue
  pack['seen'].add(ident)
  if t.get('fishing')=='yes' or t.get('leisure')=='fishing':continue
  # Long open fishing/observation piers aren't marinas; closed polygons aren't dock centerlines.
  if not closed and line.length>.22 and (marina.is_empty or not marina.intersects(line)):continue
  if any(word in t.get('name','').lower() for word in ['kayak','fishing','observation']):continue
  if line.length<.008:continue
  added=0
  for k in range(1,int(line.length/.010)):
   q=line.interpolate(k*.010);a=line.interpolate(max(0,k*.010-.002));b=line.interpolate(min(line.length,k*.010+.002));dx,dy=b.x-a.x,b.y-a.y;norm=math.hypot(dx,dy)
   if norm==0:continue
   for sign in [-1,1]:
    seed=int(ident)+k*31+(sign+1)*7
    if seed%7==0:continue # Occupied and empty slips, never solid rows.
    length=(7+seed%6)/1000;width=length*.31;nx,ny=-dy/norm*sign,dx/norm*sign;offset=length*.5+.0025;cx,cy=q.x+nx*offset,q.y+ny*offset
    hull=LineString([(cx-nx*length*.4,cy-ny*length*.4),(cx+nx*length*.4,cy+ny*length*.4)]).buffer(width*.55)
    if land.intersects(hull.buffer(.001)) or dockAreas.intersects(hull.buffer(.001)) or any(hull.distance(old)<.002 for old in pack['occupied']):continue
    pack['occupied'].append(hull);pack['boats'].append([round(cx,6),round(cy,6),round(math.atan2(nx,-ny),5),length,width,(1+seed%4 if tid=='destin' else seed%5),tid]);added+=1
  if added:
   source_ids.append('https://www.openstreetmap.org/way/'+ident);pack['docks'].append({'closed':closed,'points':[[round(x,6),round(y,6)] for x,y in line.coords]})
 pack['dock_sources']+=source_ids.copy()
 # Working-waterfront recipes can illustrate shore-side charter berths where slip
 # detail is absent. The coastline remains the OSM source; occupancy is an estimate.
 recipes=json.load(open(P/m['recipes']))
 for harbor in recipes.get('workingHarbors',[]):
  shore=project(shape(json.load(open(P/m['inputs']['shoreline']['path'])))).intersection(project(box(*harbor['bounds'])))
  for line in getattr(shore,'geoms',[shore]):
   if line.geom_type!='LineString':continue
   for k in range(1,int(line.length/(harbor['spacingMeters']/1000))):
    step=harbor['spacingMeters']/1000;q=line.interpolate(k*step);a=line.interpolate(max(0,k*step-.002));b=line.interpolate(min(line.length,k*step+.002));dx,dy=b.x-a.x,b.y-a.y;norm=math.hypot(dx,dy)
    if not norm:continue
    for sign in [-1,1]:
     nx,ny=-dy/norm*sign,dx/norm*sign
     if harbor.get('waterSide')=='south' and ny>-.5:continue
     cx,cy=q.x+nx*harbor['offsetMeters']/1000,q.y+ny*harbor['offsetMeters']/1000;length=(10+k%5)/1000;width=length*.31;hull=LineString([(cx-nx*length*.4,cy-ny*length*.4),(cx+nx*length*.4,cy+ny*length*.4)]).buffer(width*.55)
     if land.intersects(hull.buffer(.002)) or dockAreas.intersects(hull.buffer(.001)) or any(hull.distance(old)<.002 for old in pack['occupied']):continue
     pack['occupied'].append(hull);pack['boats'].append([round(cx,6),round(cy,6),round(math.atan2(nx,-ny),5),length,width,1+k%4,tid]);break
  source_ids.append(harbor['source'])
 # Fill mapped marina water where OSM has an area but no detailed slip centerlines.
 # These are illustrative moorings; no invented dock geometry is added.
 for marina_id,area in marina_polygons:
  water=area.difference(land.buffer(.002)).difference(dockAreas.buffer(.002))
  if water.is_empty or water.area<.00004:continue
  rect=list(area.minimum_rotated_rectangle.exterior.coords);edges=[(a,b) for a,b in zip(rect,rect[1:])];a,b=max(edges,key=lambda ab:math.dist(*ab));angle=math.atan2(b[1]-a[1],b[0]-a[0]);ux,uy=math.cos(angle),math.sin(angle);vx,vy=-uy,ux;c=area.centroid
  extent=max(area.bounds[2]-area.bounds[0],area.bounds[3]-area.bounds[1]);budget=min(160,int(water.area/.00028));added=0
  for ix in range(-int(extent/.012)-1,int(extent/.012)+2):
   for iy in range(-int(extent/.020)-1,int(extent/.020)+2):
    if added>=budget:break
    seed=int(marina_id)+ix*31+iy*73
    if seed%6==0:continue
    cx,cy=c.x+ux*ix*.012+vx*iy*.020,c.y+uy*ix*.012+vy*iy*.020;length=(8+seed%5)/1000;width=length*.31
    hull=LineString([(cx-vx*length*.4,cy-vy*length*.4),(cx+vx*length*.4,cy+vy*length*.4)]).buffer(width*.55)
    if not water.covers(hull.buffer(.001)) or any(hull.distance(old)<.002 for old in pack['occupied']):continue
    pack['occupied'].append(hull);pack['boats'].append([round(cx,6),round(cy,6),round(math.atan2(vx,-vy),5),length,width,(1+seed%4 if tid=='destin' else seed%5),tid]);added+=1
  if added:source_ids.append('https://www.openstreetmap.org/way/'+marina_id)
 pack['sources']+=source_ids;pack['towns'].append(tid);summary.append({'town':tid,'boats':len(pack['boats'])-before,'mapped_docks':len(pack['docks'])-before_docks,'placement_sources':len(source_ids),'mapped_marina_areas':len(marina_polygons)})
for rid,pack in packages.items():
 if not pack['boats']:continue
 data={'version':1,'description':'Illustrative boats beside mapped docks or inside mapped marina water; slip positions without mapped dock detail are estimates, not live vessel inventory. Dock proximity and land clearance verified against mapped source geometry.','source':'© OpenStreetMap contributors · ODbL 1.0','dock_sources':pack['dock_sources'],'placement_sources':pack['sources'],'checksScope':'Dock offset applies to dock-aligned boats. Other boats are checked inside mapped marina water or an explicit working-harbor shoreline zone; individual berth positions are illustrative.','towns':pack['towns'],'boats':pack['boats'],'docks':pack['docks'],'checks':{'land_intersections':sum(pack['land'].intersects(h) for h in pack['occupied']),'minimum_hull_gap_m':2,'maximum_dock_offset_m':9.5,'working_harbor_shore_offset_m':10,'berth_positions':'Mapped docks, mapped marina polygons, or explicit working-harbor shoreline recipe; occupancy is illustrative'}}
 inp=P/'work/coastal_pipeline/v4'/rid/'boats.json';inp.write_text(json.dumps(data,separators=(',',':')))
 for target in [A/'regions/packages'/rid,P/'outputs/coastal_pipeline_v4'/rid]:
  if not target.exists():continue
  shutil.copy2(inp,target/'boats.json');(target/'boats.json.gz').write_bytes(gzip.compress(inp.read_bytes(),mtime=0));s=json.load(open(target/'scene.json'));s['boats']='boats.json.gz';(target/'scene.json').write_text(json.dumps(s,separators=(',',':')))
report_path=A/'regions/boats-report.json'
previous=json.load(report_path.open()).get('towns',[]) if report_path.exists() else []
summary += [row for row in previous if row.get('town') not in {row.get('town') for row in summary}]
report_path.write_text(json.dumps({'description':'Illustrated marina occupancy from mapped dock geometry; not real-time boats.','towns':summary,'total_boats':sum(row.get('boats',0) for row in summary)},indent=2))
print(json.dumps(summary,indent=2))
