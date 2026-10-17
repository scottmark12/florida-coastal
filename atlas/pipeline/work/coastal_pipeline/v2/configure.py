import sys,json,copy
from pathlib import Path
sys.path.insert(0,'work/30a_finish')
from geometry import *
P=Path('work/coastal_pipeline/v2');rules=json.loads(Path('work/coastal_pipeline/rules.json').read_text())
for style in ['cottage','grayton','inlet','seacrest','seagrove','watersound']:
 r=copy.deepcopy(rules['recipes']['watercolor']);r['details']={'grayton':['small historic cottages','irregular village lanes'],'watersound':['shingle cottages','dune boardwalks'],'seacrest':['pastel cottages','shared greens'],'seagrove':['mixed coastal cottages','tree canopy'],'inlet':['low-rise beach cottages'],'cottage':['small detached cottages']}[style];rules['recipes'][style]=r
rules['palette']={'land':'#f1e3c8','sand':'#fffdf1','canopy':['#bdcba5','#b3c896','#91ad72'],'shallows':['#91e1d0','#64cfc9','#44aebc'],'deepWater':'#3593ae'}
rules['labels']={'maxLeaderPx':40,'alternateSides':True,'hideLowerPriorityCollisions':True,'rotate':False,'moveBuildings':False};rules['phone']={'breakpoint':700,'regionBuildings':False,'truePositionDots':True,'cardControlsHeightPx':42,'cardGapPx':10,'canvas':'full-viewport'}
(P/'rules.json').write_text(json.dumps(rules,indent=2))
G=json.loads((D/'geometry.json').read_text());inv=lambda g:transform(lambda x,y,z=None:I.transform(np.array(x)*1000,np.array(y)*1000),g)
(P/'30a-shoreline.geojson').write_text(json.dumps(mapping(inv(shape(G['coast'])))))
(P/'30a-landcover.geojson').write_text(json.dumps({'type':'FeatureCollection','features':[{'type':'Feature','geometry':mapping(inv(shape(G['forest']))),'properties':{'class':'forest'}}]}))
roads=[]
for e in json.loads((D/'map-data.json').read_text())['elements']:
 if e.get('tags',{}).get('highway') and len(e.get('geometry',[]))>1:roads.append({'type':'Feature','geometry':{'type':'LineString','coordinates':[[p['lon'],p['lat']] for p in e['geometry']]},'properties':{'class':e['tags']['highway'],'name':e['tags'].get('name')}})
(P/'30a-roads.geojson').write_text(json.dumps({'type':'FeatureCollection','features':roads},separators=(',',':')))
for region in ['30a','miami']:
 prev=json.loads(Path('work/coastal_pipeline/'+region+'.json').read_text())
 def entry(path,source,verified):return {'path':path,'source':source,'license_verified':verified}
 m={'id':region,'bounds':prev['bounds'],'district_recipes':{},'inputs':{'osm':['work/30a_finish/source/map-data.json','work/30a_districts/alys-current.osm'] if region=='30a' else ['work/miami_geo/osm_core.json','work/miami_geo/osm_beach.json'],'districts':'outputs/30a_finish/30a.json' if region=='30a' else 'work/atlas_regions/districts.json','prices':'outputs/30a_finish/30a.json' if region=='30a' else 'work/atlas_regions/districts.json','land':entry('work/coastal_pipeline/'+region+'-land.geojson','OSM / ODbL' if region=='30a' else 'Miami-Dade cached GIS',region=='30a'),'landcover':entry('work/coastal_pipeline/v2/30a-landcover.geojson' if region=='30a' else 'work/miami_geo/parks.json','OSM / ODbL' if region=='30a' else 'Miami-Dade cached GIS',region=='30a'),'shoreline':entry('work/coastal_pipeline/v2/30a-shoreline.geojson' if region=='30a' else 'work/miami_geo/water.json','OSM / ODbL' if region=='30a' else 'Miami-Dade cached GIS',region=='30a'),'roads':entry('work/coastal_pipeline/v2/30a-roads.geojson' if region=='30a' else 'work/miami_geo/streets.json','OSM / ODbL' if region=='30a' else 'Miami-Dade cached GIS',region=='30a')}}
 (P/(region+'.json')).write_text(json.dumps(m,indent=2))
