import sys,json
from pathlib import Path
sys.path.insert(0,'work/30a_finish')
from geometry import *
P=Path('work/coastal_pipeline');P.mkdir(exist_ok=True)
# Normalized geographic inputs retain independent source references; no hand positioning.
ds=json.loads(Path('outputs/30a_finish/30a.json').read_text())['districts'];es=json.loads((D/'map-data.json').read_text())['elements'];features=[]
for e in es:
 if e['type']=='way' and e.get('tags',{}).get('building'):
  p=polygons(e)
  if p.is_empty:continue
  features.append({'type':'Feature','geometry':mapping(p),'properties':{'id':e['id'],'height_m':None,'levels':e['tags'].get('building:levels'),'source':'https://www.openstreetmap.org/way/'+str(e['id'])}})
# Include mapped courtyard relations, resolving outer and inner rings.
r=ET.parse('work/30a_districts/alys-current.osm').getroot();nodes={n.get('id'):{'lon':float(n.get('lon')),'lat':float(n.get('lat'))} for n in r.findall('node')};ways={w.get('id'):[nodes[n.get('ref')] for n in w.findall('nd') if n.get('ref') in nodes] for w in r.findall('way')}
for rel in r.findall('relation'):
 tags={t.get('k'):t.get('v') for t in rel.findall('tag')}
 if not tags.get('building'):continue
 poly=polygons({'type':'relation','members':[{'role':m.get('role','outer'),'geometry':ways[m.get('ref')]} for m in rel.findall('member') if m.get('ref') in ways]})
 if not poly.is_empty:features.append({'type':'Feature','geometry':mapping(poly),'properties':{'id':int(rel.get('id')),'source':'https://www.openstreetmap.org/relation/'+rel.get('id')}})
(P/'30a-buildings.geojson').write_text(json.dumps({'type':'FeatureCollection','features':features},separators=(',',':')))
G=json.loads((D/'geometry.json').read_text());inv=lambda g:transform(lambda x,y,z=None:I.transform(np.array(x)*1000,np.array(y)*1000),g)
(P/'30a-land.geojson').write_text(json.dumps(mapping(inv(shape(G['land'])))))
miamid=[d for d in json.loads(Path('work/atlas_regions/districts.json').read_text()) if d['town']=='miami'];print(len(miamid))
# County water remains source-tagged. Commercial reuse and freshness require review.
clip=box(-80.285,25.71,-80.115,25.82);water=unary_union([make_valid(shape(f['geometry'])) for f in json.loads(Path('work/miami_geo/water.json').read_text())['features'] if f.get('geometry')]);(P/'miami-land.geojson').write_text(json.dumps(mapping(clip.difference(water))))
for name,districts,buildings,land,bounds,notes in [('30a',ds,'30a-buildings.geojson','30a-land.geojson',[-86.27,30.26,-85.99,30.36],[]),('miami',miamid,'../miami_geo/buildings.json','miami-land.geojson',[-80.285,25.71,-80.115,25.82],['County building/water data: commercial reuse and freshness must be confirmed.','District guide coordinates lack independently identified OSM place-node controls.','Miami landmark silhouettes need verified per-landmark recipes.'])]:
 manifest={'id':name,'buildings':buildings,'land':land,'bounds':bounds,'districts':districts,'manual_review':notes,'height_field':'height_m' if name=='30a' else None,'source':'OpenStreetMap / ODbL' if name=='30a' else 'Miami-Dade GIS cached county layers; source metadata in work/miami_geo','height_missing':'assume 2 stories; never label verified','projection':proj}
 (P/(name+'.json')).write_text(json.dumps(manifest,indent=2))
rules={'scale':json.loads(Path('work/30a_finish/scale-rule.json').read_text()),'sandWidthMeters':100,'cameraTiltDegrees':45,'phoneBreakpoint':700,'leaderMaxPixels':40,'regionMiles':[20,30],'maxRegionBytes':4000000,'maxAnchorErrorMeters':150,'recipes':{'seaside':{'walls':['#f1dbb4','#e7b7ac','#a7cfce'],'roofs':['#bfd0cb'],'roof':'gable','details':['porches','tin seams','town green']},'rosemary':{'walls':['#ddc7a3','#f2e8d2','#babcb6','#c4a05d','#9b8270'],'roofs':['#50595b','#50595b','#50595b','#899493','#899493','#8e6d59','#8e6d59','#486357'],'roof':'gable','details':['townhouse porches','green shutters','timber trim']},'alys':{'walls':['#fff9e9'],'roofs':['#fffdf6'],'roof':'bermuda','details':['actual multipolygon courtyards','7 roof courses','narrow mapped lanes']},'watercolor':{'walls':['#c7d5ad','#f1dbb4','#a7cfce'],'roofs':['#bfd0cb'],'roof':'gable','details':['lowcountry porches']},'urban':{'walls':['#ddd9c8','#b5ccc5','#eee4d0'],'roofs':['#d0d2c4'],'roof':'flat','details':['verified height metadata needed','landmark recipes needed']},'default':{'walls':['#e8ddc5','#cbd0b6'],'roofs':['#b6c2b8'],'roof':'gable','details':[]}}}
(P/'rules.json').write_text(json.dumps(rules,indent=2))
