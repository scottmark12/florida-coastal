"""Source hero cameras and style recipes for Space Coast; run after normalization."""
from pathlib import Path
import json,gzip,sys,copy,xml.etree.ElementTree as E
P=Path(__file__).resolve().parent;A=P.parent;r=P/'work/coastal_pipeline/v4/space-coast';sys.path.insert(0,str(P/'work/30a_finish'));from geometry import polygons,project,Point,LineString
es={}
for f in r.glob('*.json.gz'):
 for e in json.load(gzip.open(f,'rt'))['elements']:es[e['type'],e['id']]=e
for tid in ['cocoa','melbourne-beach']:
 xml=E.parse(P/'work/coastal_pipeline/downloads/marinas'/f'{tid}.osm').getroot();nodes={n.attrib['id']:{'lon':float(n.attrib['lon']),'lat':float(n.attrib['lat'])} for n in xml.findall('node')}
 for w in xml.findall('way'):es['way',int(w.attrib['id'])]={'type':'way','id':int(w.attrib['id']),'tags':{t.attrib['k']:t.attrib['v'] for t in w.findall('tag')},'geometry':[nodes[q.attrib['ref']] for q in w.findall('nd')]}
def center(e):
 if e['type']=='node':return Point(e['lon'],e['lat'])
 p=polygons(e)
 if p.is_empty and len(e.get('geometry',[]))>1:p=LineString([(q['lon'],q['lat']) for q in e['geometry']])
 return p.centroid if not p.is_empty else None
features={'cocoa':(50841564,'Cocoa Beach Pier anchors the surf beach, beachfront hotels and nearby canal neighborhoods.'),'indialantic':(470403748,'Nance Park anchors Fifth Avenue’s ocean end, the public beach and the route to Melbourne Causeway.'),'melbourne-beach':(470411692,'Ryckman Park frames historic Melbourne Beach, its lagoon fishing pier and the narrow island to the Atlantic.'),'palm-bay':(469529165,'Castaway Point Park frames Palm Bay’s Turkey Creek mouth, riverfront homes and lagoon shore.'),'satellite-beach':(225761189,'Pelican Beach Park anchors Satellite Beach’s oceanfront strip and low beachside neighborhoods.'),'titusville':(143515404,'Space View Park frames historic Titusville, the Indian River and the bridge toward Merritt Island.'),'melbourne':(469557144,'Front Street Park frames historic downtown Melbourne, Crane Creek harbor and the Melbourne Causeway approach.'),'cape-canaveral':(296954741,'Jetty Park frames Cape Canaveral’s public beach, harbor entrance and port waterfront.'),'merritt-island':(296946649,'Kiwanis Island Park frames Sykes Creek, the canal neighborhoods and the causeway across Merritt Island.'),'cocoa-village':(218166570,'Riverfront Park anchors historic Cocoa Village’s shopping streets and lagoon waterfront.')}
views=json.load(open(A/'regions/town-views.json'));cat=json.load(open(A/'regions/catalog.json'));ds=json.load(open(r/'districts.json'));heroes=[]
editorial=json.load(open(r/'editorial.json'))
for d in ds:
 d['source']=editorial['recipes'][d['style']]['source']
 tid=d['town'];c=Point(d['lon'],d['lat']);source=d['positionSource'];reason='The true mapped town anchor frames its residential neighborhoods and local streets.'
 if tid in features:wid,reason=features[tid];c=center(es['way',wid]);source='https://www.openstreetmap.org/way/'+str(wid)
 if tid=='indian-harbour-beach':c=center(es['way',486694379]);source='https://www.openstreetmap.org/way/486694379';reason='Gleason Park anchors Indian Harbour Beach’s park-centered neighborhoods between the ocean and lagoon.'
 if tid=='rockledge':
  matches=[e for e in es.values() if e.get('tags',{}).get('name')=='Rockledge Drive' and center(e) is not None];e=min(matches,key=lambda e:center(e).distance(Point(-80.720,28.326)));c=center(e);source='https://www.openstreetmap.org/way/'+str(e['id']);reason='Historic Rockledge Drive frames the oak-shaded riverfront homes and Indian River shoreline.'
 pc=project(c);views[tid]=dict(district=d['id'],x=pc.x,y=pc.y,lon=c.x,lat=c.y,desktopSpan=2.8,phoneSpan=1.4,reason=reason,heroSource=source);heroes.append(dict(town=tid,**views[tid]));t=next(t for t in cat['towns'] if t['id']==tid);t.update(**{k:d[k] for k in ['x','y','lon','lat']},price=d['priceRange'])
 if tid=='cocoa-village':
  t['name']='Cocoa Village';d['name']='Cocoa Village';d['priceRange']='$323,750 median listing price (Cocoa city) · September 2026';t['price']=d['priceRange'];d['priceEvidence']['scope']='City of Cocoa median; not a separate Cocoa Village neighborhood median.'
(A/'regions/town-views.json').write_text(json.dumps(views,indent=2)+'\n');(A/'regions/catalog.json').write_text(json.dumps(cat,indent=2)+'\n');(r/'districts.json').write_text(json.dumps(ds,indent=2)+'\n');(r/'town-hero-sources.json').write_text(json.dumps(heroes,indent=2)+'\n')
x=json.load(open(r/'recipes.json'));x['recipes']['space-beach-condos']={**copy.deepcopy(x['recipes']['satellite-beach']),'roof':'flat','detail':'balconies','walls':['#f7f1e3','#d4e7e2','#e6dad7','#e4ece8'],'roofs':['#d0dbd5','#e9e3d3']};x['towerRecipe']='space-beach-condos';x['recipes']['space-historic-mainstreet']={**copy.deepcopy(x['recipes']['cocoa-village']),'roof':'flat','detail':'stucco','walls':['#edd7b0','#c69276','#f6e7ce','#b9d0c2']};x['styleZones']=[{'bounds':[-80.731,28.348,-80.723,28.359],'recipe':'space-historic-mainstreet'},{'bounds':[-80.614,28.075,-80.600,28.082],'recipe':'space-historic-mainstreet'}];x['recipes']['space-vab']={'roof':'flat','detail':'stucco','walls':['#f4f2e7'],'roofs':['#d1d6d2'],'source':'https://www.nasa.gov/kennedy/partnerships/vehicleassemblybuilding/'};x['landmarks']={'way/26929904':{'recipe':'space-vab','profile':[[0,0]],'source':'https://www.nasa.gov/kennedy/partnerships/vehicleassemblybuilding/','note':'Use mapped footprint and OSM 160 m height, under the unchanged atlas scale cap.'}}
(r/'recipes.json').write_text(json.dumps(x,indent=2)+'\n');print([(h['town'],h['heroSource']) for h in heroes])
