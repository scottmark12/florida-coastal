import sys,json
from pathlib import Path
sys.path.insert(0,'work/30a_finish');from geometry import *
P=Path('work/coastal_pipeline/v3');D=P/'miami';m=json.load(open(P/'miami.json'));es=json.load(open(D/'extension.json'))['elements'];oldclip=box(*m['bounds']);clip=box(-80.20,25.66,-80.10,25.88)
lines=[];probes=[]
for e in es:
 if e.get('tags',{}).get('natural')!='coastline':continue
 pts=e.get('geometry',[])
 if len(pts)<2:continue
 lines.append(LineString([(p['lon'],p['lat']) for p in pts]))
 for a,b in zip(pts,pts[1:]):
  dx=b['lon']-a['lon'];dy=b['lat']-a['lat'];l=math.hypot(dx,dy)
  if l:probes.append(Point((a['lon']+b['lon'])/2-dy/l*1e-7,(a['lat']+b['lat'])/2+dx/l*1e-7))
coast=unary_union(lines).intersection(clip);faces=list(polygonize(unary_union([coast,clip.boundary])));extra=unary_union([f for f in faces if any(f.contains(p) for p in probes)]).difference(oldclip)
old=shape(json.load(open(D/'land.json')));land=unary_union([old,extra]);assert land.intersection(oldclip).symmetric_difference(old).area<1e-12
(D/'land-extended.json').write_text(json.dumps(mapping(land)));(D/'shoreline-extended.json').write_text(json.dumps(mapping(unary_union([shape(json.load(open(D/'shoreline.json'))),coast.difference(oldclip)]))))
context=shape(json.load(open(D/'context.json'))).difference(project(clip));(D/'context-extended.json').write_text(json.dumps(mapping(context)))
roads=json.load(open(D/'roads.json'))
for e in es:
 t=e.get('tags',{});pts=e.get('geometry',[])
 if t.get('highway') and len(pts)>1:
  g=LineString([(p['lon'],p['lat']) for p in pts]).intersection(clip).difference(oldclip)
  if not g.is_empty:roads['features'].append({'type':'Feature','geometry':mapping(g),'properties':{'class':t['highway'],'bridge':t.get('bridge'),'name':t.get('name',''),'id':e['id']}})
(D/'roads-extended.json').write_text(json.dumps(roads,separators=(',',':')))
ds=json.load(open(D/'districts.json'))
for id,name,e in [('mid-beach','Mid Beach',next(e for e in es if e['id']==447042031 and e['type']=='way')),('key-biscayne','Key Biscayne',next(e for e in es if e['id']==154335289 and e['type']=='node'))]:
 if e['type']=='node':lon,lat=e['lon'],e['lat'];meaning='OSM place-label anchor; not a surveyed neighborhood centroid'
 else:c=polygons(e).centroid;lon,lat=c.x,c.y;meaning='Representative Mid Beach anchor: centroid of the mapped Fontainebleau hotel, not a district boundary centroid'
 x,y=T.transform(lon,lat);ds.append({'id':id,'town':'miami','name':name,'lon':lon,'lat':lat,'x':x/1000,'y':y/1000,'style':id,'positionSource':f'https://www.openstreetmap.org/{e["type"]}/{e["id"]}','centerMeaning':meaning,'kind':'coastal','description':'Oceanfront resorts, MiMo architecture and a quieter beachwalk north of South Beach.' if id=='mid-beach' else 'A leafy island village with beach condos, family streets and coastal parks.','source':'https://www.miamiandbeaches.com/neighborhoods/'+('miami-beach/mid-beach' if id=='mid-beach' else 'key-biscayne')})
prices=json.load(open(D/'verified-medians.json'))
for d in ds:
 value,metric,period,url=prices[d['id']];d['priceRange']=f'${value:,.0f} {metric} · {period}';d['priceSource']=url;d['priceEvidence']={'kind':'published median','value':value,'metric':metric,'period':period,'checked':'2026-10-17','source':url};d.pop('priceBenchmark',None);d['priceStatus']='Published market median; property types and reporting periods vary.'
(D/'districts-current.json').write_text(json.dumps(ds,indent=2));m['bounds']=[-80.285,25.66,-80.10,25.88]
m['inputs']['osm'].append(str(D/'extension.json'));m['inputs']['districts']=m['inputs']['prices']=str(D/'districts-current.json')
for k in ['land','shoreline','roads','context']:m['inputs'][k]['path']=str(D/(k+'-extended.json'))
m['district_recipes'].update({'mid-beach':'mid-beach','key-biscayne':'key-biscayne'});(P/'miami-current.json').write_text(json.dumps(m,indent=2))
print('core symmetric difference',land.intersection(oldclip).symmetric_difference(old).area,'new districts',[(d['name'],d['lon'],d['lat']) for d in ds[-2:]])
