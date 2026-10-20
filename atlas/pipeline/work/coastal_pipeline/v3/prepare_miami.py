"""Source adapter only: Miami data choices, never rendering branches."""
import sys,json
from pathlib import Path
sys.path.insert(0,'work/coastal_pipeline/v2');from pipeline import parse_osm
from geometry import *
from shapely.strtree import STRtree
P=Path('work/coastal_pipeline/miami_source');O=Path('work/coastal_pipeline/v3/miami');O.mkdir(exist_ok=True)
paths=list(P.glob('*.json'))+list(P.glob('map-*.osm'))
es,_=parse_osm([str(p) for p in paths]);print('elements',len(es))
# Keep a compact, attributable OSM snapshot for every reproduced feature.
(O/'osm.json').write_text(json.dumps({'elements':list(es.values())},separators=(',',':')))
bounds=[-80.285,25.71,-80.115,25.82];clip=box(*bounds)
coast=[LineString([(p['lon'],p['lat']) for p in e['geometry']]) for e in es.values() if e.get('tags',{}).get('natural')=='coastline' and len(e.get('geometry',[]))>1]
coast=unary_union(coast).intersection(clip)
# OSM coastline is oriented with land on the left. Use side probes to classify faces.
probes=[]
for e in es.values():
 if e.get('tags',{}).get('natural')!='coastline':continue
 pts=e.get('geometry',[])
 for a,b in zip(pts,pts[1:]):
  dx=b['lon']-a['lon'];dy=b['lat']-a['lat'];l=math.hypot(dx,dy)
  if l:probes.append(Point((a['lon']+b['lon'])/2-dy/l*.000001,(a['lat']+b['lat'])/2+dx/l*.000001))
faces=list(polygonize(unary_union([coast,clip.boundary])))
land=unary_union([f for f in faces if any(f.contains(p) for p in probes)])
waters=[];cover=[];roads=[]
for e in es.values():
 t=e.get('tags',{});g=polygons(e)
 if t.get('natural')=='water' and not g.is_empty:waters.append(g)
 if (t.get('leisure') in ['park','garden','golf_course'] or t.get('natural') in ['wood','scrub','wetland'] or t.get('landuse') in ['forest','grass']) and not g.is_empty:cover.append({'type':'Feature','geometry':mapping(g.intersection(clip)),'properties':{'name':t.get('name',''),'class':t.get('natural',t.get('leisure',t.get('landuse'))),'id':e['id']}})
 if t.get('highway') and e.get('geometry') and len(e['geometry'])>1:
  g=LineString([(p['lon'],p['lat']) for p in e['geometry']]).intersection(clip)
  if not g.is_empty:roads.append({'type':'Feature','geometry':mapping(g),'properties':{'class':t['highway'],'name':t.get('name',''),'id':e['id'],'bridge':t.get('bridge')}})
land=make_valid(land.difference(unary_union(waters)))
(O/'land.json').write_text(json.dumps(mapping(land)));(O/'shoreline.json').write_text(json.dumps(mapping(coast)))
for k,fs in [('landcover',cover),('roads',roads)]: (O/(k+'.json')).write_text(json.dumps({'type':'FeatureCollection','features':fs},separators=(',',':')))
all_ds=json.load(open('work/atlas_regions/districts.json'));all_ds=all_ds.get('districts',[]) if isinstance(all_ds,dict) else all_ds
ds=[d for d in all_ds if d['town']=='miami'];names={'brickell':'Brickell','grove':'Coconut Grove','gables':'Coral Gables','southbeach-district':'South Beach','edgewater':'Edgewater'}
price={
 'brickell':(360000,1490000,'Brickell_Miami_FL',[('801 Brickell Bay Dr Ste 361',360000),('801 S Miami Ave Unit 4508',1490000)]),
 'grove':(715000,1299000,'https://www.redfin.com/neighborhood/219259/FL/Miami/Coconut-Grove/2-bedrooms',[('2987 Bird Ave',715000),('3 Grove Isle Dr Unit C307',1299000)]),
 'gables':(389000,1925000,'Coral-Gables_FL',[('100 Edgewater Dr Apt 309',389000),('1530 Garcia Ave',1925000)]),
 'southbeach-district':(160000,1650000,'South-Beach_Miami-Beach_FL',[('842 Meridian Ave Apt 3D',160000),('1236 Michigan Ave',1650000)]),
 'edgewater':(350000,1495000,'Edgewater_Miami_FL',[('600 NE 36th St Apt 508',350000),('601 NE 36th St Apt 1612',1495000)])}
for d in ds:
 node=next(e for e in es.values() if e['type']=='node' and e.get('tags',{}).get('name')==names[d['id']] and e.get('tags',{}).get('place'))
 d['previousGuideCenter']=[d['lon'],d['lat']];d['lon']=node['lon'];d['lat']=node['lat'];d['x'],d['y']=[v/1000 for v in T.transform(d['lon'],d['lat'])];d['positionSource']=f'https://www.openstreetmap.org/node/{node["id"]}';d['style']=d['id'];d['centerMeaning']='OSM place-label anchor; not a surveyed neighborhood centroid'
 lo,hi,url,examples=price[d['id']];url=url if url.startswith('http') else 'https://www.realtor.com/realestateandhomes-search/'+url
 d['priceSource']=url;d['priceRange']=f'Observed asking examples: ${lo:,.0f}–${hi:,.0f}';d['priceEvidence']={'checked':'2026-10-16','min':lo,'max':hi,'kind':'two listing examples, not a representative market range','examples':[{'address':a,'askingUSD':v,'source':url} for a,v in examples]}
 d['source']='https://www.miamiandbeaches.com/neighborhoods';d['priceStatus']='Dated asking examples; excludes fees, taxes, and insurance. Availability can change.'
(O/'districts.json').write_text(json.dumps(ds,indent=2))
r=json.load(open('work/coastal_pipeline/v2/rules.json'))
for key,wall,roof,shape_,detail in [
 ('brickell',['#c7dcd6','#a9c8c5','#e5e5d7'],['#e7e4d3'],'flat','glass-bands'),
 ('edgewater',['#dde5d8','#c3d7d2','#f0e8d8'],['#e5dfcd'],'flat','balconies'),
 ('southbeach-district',['#f3d7be','#eed3cb','#c9dfd5','#f5ecd6'],['#e6ddc7'],'flat','deco'),
 ('gables',['#eddbbf','#e2c5a2','#f2e5cf'],['#b67a59','#c8936b','#aa7154'],'gable','stucco'),
 ('grove',['#e4dfc2','#f2e5c9','#c7d4ba'],['#aebfba','#b6a591','#a67d61'],'gable','porches')]:r['recipes'][key]={'walls':wall,'roofs':roof,'roof':shape_,'detail':detail,'source':'https://www.miamiandbeaches.com/things-to-do/history-and-heritage/miami-s-architectural-guide'}
Path('work/coastal_pipeline/v3/rules.json').write_text(json.dumps(r,indent=2))
m={'id':'miami','bounds':bounds,'district_recipes':{d['id']:d['style'] for d in ds},'inputs':{'osm':[str(O/'osm.json')],'districts':str(O/'districts.json'),'prices':str(O/'districts.json')}}
for k,file in [('land','land.json'),('landcover','landcover.json'),('shoreline','shoreline.json'),('roads','roads.json')]:m['inputs'][k]={'path':str(O/file),'source':'https://www.openstreetmap.org/copyright','license':'ODbL 1.0','license_verified':True}
Path('work/coastal_pipeline/v3/miami.json').write_text(json.dumps(m,indent=2));print('land faces',len(parts(land)),'cover',len(cover),'roads',len(roads))
