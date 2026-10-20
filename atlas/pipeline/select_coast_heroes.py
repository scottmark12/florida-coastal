"""Curated OSM feature choices; coordinates computed from their actual source geometry."""
from pathlib import Path
import json,gzip,xml.etree.ElementTree as E
from shapely.geometry import Polygon,LineString,Point
P=Path(__file__).resolve().parent
choices={
 'perdido-key':('node',153522537,'Johnsons Beach locality','The Johnsons Beach reference frames Perdido Key’s Gulf shore and neighboring condo and dune landscape.',5.5,2.2,'landmark'),
 'gulf-breeze':('relation',3534076,'Shoreline Park South','Shoreline Park frames the wooded Gulf Breeze peninsula and Pensacola Bay waterfront.',5.5,2.2,'park'),
 'navarre':('way',554596477,'Navarre Park','Navarre Park frames the soundside town and the causeway to the beach.',5.5,2.2,'park'),
 'navarre-beach':('way',218192413,'Navarre Beach Fishing Pier','The Gulf fishing pier frames Navarre Beach’s white sand, towers and low beach homes.',5.5,2.2,'landmark'),
 'fort-walton-beach':('way',230074295,'Fort Walton Landing','The Landing frames downtown Fort Walton Beach, Santa Rosa Sound and Brooks Bridge.',6,2.4,'park'),
 'okaloosa-island':('way',83459432,'Okaloosa Island Fishing Pier','The fishing pier frames the island’s Gulf resort strip and the sound behind it.',5.5,2.2,'landmark'),
 'mary-esther':('way',318342121,'Oak Tree Nature Park','Oak Tree Nature Park frames Mary Esther’s low wooded neighborhoods beside Santa Rosa Sound.',5.5,2.2,'park'),
 'shalimar':('way',688807549,'Meigs Park and Boat Ramp','Meigs Park frames Shalimar’s sheltered bayou, boat ramp and neighboring residential streets.',5.5,2.2,'boating'),
 'niceville':('way',617522472,'Niceville Landing','Niceville Landing frames the working waterfront on Boggy Bayou and the old town behind it.',5.5,2.2,'park'),
 'valparaiso':('way',455428842,'Lincoln Park','Lincoln Park frames the bayou waterfront and Valparaiso’s tree-covered historic streets.',5.5,2.2,'park'),
 'miramar-beach':('way',929836172,'Haugen Park','Haugen Park frames Miramar Beach’s Gulf edge, condos and beach-neighborhood streets.',5.5,2.2,'park'),
 'freeport':('way',819631431,'City of Freeport Public Park','The public park anchors Freeport’s low town center, wooded neighborhoods and nearby creek network.',5.5,2.2,'park'),
 'keaton-beach':('way',353272150,'Hodges Park','Hodges Park frames Keaton Beach’s Gulf edge, fishing cottages, marsh and boat access.',3.5,1.6,'park'),
 'horseshoe-beach':('way',659611663,'Butler-Douglas Memorial Park','The waterfront park frames Horseshoe Beach’s low fishing village, canals and Gulf marsh.',3.5,1.6,'park'),
 'suwannee':('way',10867209,'Suwannee River Drive bridge','The mapped riverfront bridge frames Suwannee’s canal homes, docks and river-mouth landscape.',4,1.8,'landmark'),
 'yankeetown':('way',319669510,'Yankeetown Water Resources Park','The river park frames Yankeetown’s cottage streets and the Withlacoochee waterfront.',4,1.8,'park'),
 'inglis':('way',85708601,'Inglis river crossing','The river crossing frames Inglis’s low town streets and the Withlacoochee River.',4,1.8,'landmark'),
 'hernando-beach':('way',1253508548,'Hernando Beach Marina','The marina frames Hernando Beach’s boating basin, canal neighborhoods and open marsh edge.',5.5,2.2,'boating'),
 'weeki-wachee':('way',1148344197,'Weeki Wachee Springs State Park','The springs park frames the source of the Weeki Wachee River, its visitor buildings and wooded setting.',5.5,2.2,'park'),
 'aripeka':('way',119237120,'Aripeka Road creek bridge','The creek bridge frames Aripeka’s old cottages and tidal marsh channels.',3.5,1.6,'landmark')}
heroes={}
for tid,(kind,ident,name,reason,span,close,typ) in choices.items():
 d=P/'work/coastal_pipeline/v4'/tid;elements={}
 for file in [d/'geography.json.gz',d/'cover.json.gz',d/('district-'+tid+'.json.gz')]:
  for e in json.load(gzip.open(file,'rt'))['elements']:elements[(e['type'],e['id'])]=e
 if (kind,ident) not in elements:
  root=E.parse(P/'work/coastal_pipeline/downloads/marinas'/(tid+'.osm')).getroot();nodes={n.get('id'):{'lon':float(n.get('lon')),'lat':float(n.get('lat'))} for n in root.findall('node')}
  for w in root.findall('way'):elements['way',int(w.get('id'))]={'type':'way','geometry':[nodes[n.get('ref')] for n in w.findall('nd')]}
 e=elements[kind,ident]
 if kind=='node':x,y=e['lon'],e['lat']
 else:
  if kind=='relation':pts=next(m['geometry'] for m in e['members'] if m.get('role')=='outer')
  else:pts=e['geometry']
  ps=[(p['lon'],p['lat']) for p in pts];geom=Polygon(ps) if ps[0]==ps[-1] and len(ps)>3 else LineString(ps);c=geom.representative_point() if geom.geom_type=='Polygon' else geom.interpolate(.25,normalized=True);x,y=c.x,c.y
 heroes[tid]=[name,x,y,reason,span,close,typ,'https://www.openstreetmap.org/'+kind+'/'+str(ident),[]]
(P/'coast-addition-heroes.json').write_text(json.dumps(heroes,indent=2)+'\n');print('Selected',len(heroes),'source-positioned hero points')
