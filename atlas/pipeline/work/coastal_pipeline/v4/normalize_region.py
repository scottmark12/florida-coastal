import sys,json,gzip,re
from pathlib import Path
sys.path.insert(0,'work/30a_finish');from geometry import *
from shapely.strtree import STRtree
ID=sys.argv[1];P=Path('work/coastal_pipeline/v4')/ID;catalog=json.load(open(P/'catalog-input.json'));ed=json.load(open(P/'editorial.json'));paths=list(P.glob('*.json.gz'));elements={}
required=['geography.json.gz','cover.json.gz']+['district-'+t['id']+'.json.gz' for t in catalog['towns']]
missing=[name for name in required if not (P/name).exists()]
if missing:raise RuntimeError('Incomplete OSM input package: '+', '.join(missing))
for p in paths:
 for e in json.load(gzip.open(p,'rt'))['elements']:elements[(e['type'],e['id'])]=e
es=list(elements.values());bounds=catalog["bounds"];clip=box(*bounds);lines=[];probes=[]
for e in es:
 if e.get('tags',{}).get('natural')!='coastline':continue
 pts=e.get('geometry',[])
 if len(pts)<2:continue
 lines.append(LineString([(p['lon'],p['lat']) for p in pts]))
 for a,b in zip(pts,pts[1:]):
  dx=b['lon']-a['lon'];dy=b['lat']-a['lat'];l=math.hypot(dx,dy)
  if l:probes.append(Point((a['lon']+b['lon'])/2-dy/l*1e-7,(a['lat']+b['lat'])/2+dx/l*1e-7))
coast=unary_union(lines).intersection(clip);faces=list(polygonize(unary_union([coast,clip.boundary])));tree=STRtree(probes);land=unary_union([f for f in faces if len(tree.query(f,predicate='contains'))]);water=[];cover=[];roads=[]
for e in es:
 t=e.get('tags',{});p=polygons(e)
 if t.get('natural')=='water' and not p.is_empty:water.append(p.intersection(clip))
 if not p.is_empty and (t.get('leisure') in ['park','garden','golf_course'] or t.get('natural') in ['wood','wetland'] or t.get('landuse')=='forest'):
  g=p.intersection(clip)
  if not g.is_empty:cover.append({'type':'Feature','geometry':mapping(g),'properties':{'name':t.get('name',''),'id':e['id']}})
 if t.get('highway') and len(e.get('geometry',[]))>1:
  g=LineString([(q['lon'],q['lat']) for q in e['geometry']]).intersection(clip)
  if not g.is_empty:roads.append({'type':'Feature','geometry':mapping(g),'properties':{'class':t['highway'],'bridge':t.get('bridge'),'name':t.get('name','')}})
land=make_valid(land.difference(unary_union(water)))
for k,g in [('land',land),('shoreline',coast)]: (P/(k+'.json')).write_text(json.dumps(mapping(g)))
for k,fs in [('landcover',cover),('roads',roads)]: (P/(k+'.json')).write_text(json.dumps({'type':'FeatureCollection','features':fs},separators=(',',':')))
def canonical(name):
 return re.sub('[^a-z0-9]','',name.lower().replace('saint ','st ').replace(' island',''))
ds=[]
for town in catalog['towns']:
 if town['id'] in ed.get('skip_town_centers',[]):continue
 d={'town':town['id'],'id':town['id']+'-center','name':town['name'],'kind':'walk' if 'walk' in town['vibes'] else 'beach','description':town['blurb'],'style':town['id']}
 names={town['name'].lower(),town['id'].replace('-',' ').lower()}
 if town['id']=='ami':names={'anna maria','anna maria island'}
 if town['id']=='longboat':names={'longboat key'}
 nodes=[e for e in es if e['type']=='node' and canonical(e.get('tags',{}).get('name','')) in {canonical(n) for n in names} and e.get('tags',{}).get('place')]
 if not nodes:raise RuntimeError('Missing named OSM anchor: '+town['id'])
 node=min(nodes,key=lambda e:(e['tags']['place']=='island',(e['lon']-town['lon'])**2+(e['lat']-town['lat'])**2))
 d['lon']=node['lon'];d['lat']=node['lat'];d['x'],d['y']=[v/1000 for v in T.transform(d['lon'],d['lat'])];d['positionSource']='https://www.openstreetmap.org/node/'+str(node['id']);d['centerMeaning']='Representative OSM town place-label anchor: '+node['tags']['name']
 value,metric,period,url=ed['prices'][town['id']];d['priceRange']=f'${value:,.0f} {metric} · {period}';d['priceSource']=url;d['priceEvidence']={'kind':'published median','value':value,'metric':metric,'period':period,'checked':'2026-10-17','source':url};d['source']=ed['recipes'][town['id']]['source'];d['priceEvidence'].update(ed.get('priceEvidence',{}).get(town['id'],{}));ds.append(d)
for original in ed.get('extraDistricts',[]):
 d=dict(original);node=elements['node',ed['osmAnchors'][d['id']]];d['lon']=node['lon'];d['lat']=node['lat'];d['x'],d['y']=[v/1000 for v in T.transform(d['lon'],d['lat'])];d['positionSource']='https://www.openstreetmap.org/node/'+str(node['id']);d['centerMeaning']='Representative OSM place-label anchor: '+node['tags']['name'];d['style']=d['id']
 value,metric,period,url=ed['prices'][d['id']];d['priceRange']=f'${value:,.0f} {metric} · {period}';d['priceSource']=url;d['priceEvidence']={'kind':'published median','value':value,'metric':metric,'period':period,'checked':'2026-10-17','source':url};d['source']=ed['recipes'][d['id']]['source'];ds.append(d)
(P/'districts.json').write_text(json.dumps(ds,indent=2));(P/'recipes.json').write_text(json.dumps({'recipes':ed['recipes']},indent=2));cx=sum(d['x'] for d in ds)/len(ds);cy=sum(d['y'] for d in ds)/len(ds)
m={'id':ID,'name':catalog['region']['name'],'towns':[t['id'] for t in catalog['towns']],'bounds':bounds,'recipes':str(P/'recipes.json'),'camera':{'center':[cx,cy],'desktopSpan':max(30,(max(d['y'] for d in ds)-min(d['y'] for d in ds))*1.3),'phoneSpan':max(25,(max(d['y'] for d in ds)-min(d['y'] for d in ds))*.8),'phoneOffsetY':4},'district_recipes':{d['id']:d['style'] for d in ds},'manual_fixes':ed['manual_fixes'],'inputs':{'osm':[str(p) for p in paths],'districts':str(P/'districts.json'),'prices':str(P/'districts.json')}}
for k in ['land','shoreline','landcover','roads']:m['inputs'][k]={'path':str(P/(k+'.json')),'source':'https://www.openstreetmap.org/copyright','license':'ODbL 1.0','license_verified':True}
(P/'manifest.json').write_text(json.dumps(m,indent=2));print('faces',len(faces),'land',land.area,'cover',len(cover),'roads',len(roads),'sources',len(es))
