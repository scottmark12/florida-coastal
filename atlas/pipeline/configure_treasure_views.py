"""Curated source hero cameras and district style zones; run after normalization."""
from pathlib import Path
import json,gzip,sys,copy,xml.etree.ElementTree as E
A=Path(__file__).resolve().parent.parent;P=A/'pipeline';root=P/'work/coastal_pipeline/v4/treasure-coast';sys.path.insert(0,str(P/'work/30a_finish'));from geometry import polygons,project,Point,LineString
es={}
for f in root.glob('*.json.gz'):
 for e in json.load(gzip.open(f,'rt'))['elements']:es[e['type'],e['id']]=e
for tid in ['port-salerno']:
 xml=E.parse(P/'work/coastal_pipeline/downloads/marinas'/f'{tid}.osm').getroot();nodes={n.attrib['id']:{'lon':float(n.attrib['lon']),'lat':float(n.attrib['lat'])} for n in xml.findall('node')}
 for w in xml.findall('way'):es['way',int(w.attrib['id'])]={'type':'way','id':int(w.attrib['id']),'geometry':[nodes[n.attrib['ref']] for n in w.findall('nd')],'tags':{t.attrib['k']:t.attrib['v'] for t in w.findall('tag')}}
def center(e):
 if e['type']=='node':return Point(e['lon'],e['lat'])
 p=polygons(e)
 if p.is_empty and len(e.get('geometry',[]))>1:p=LineString([(q['lon'],q['lat']) for q in e['geometry']])
 return p.centroid if not p.is_empty else None
views=json.load(open(A/'regions/town-views.json'));cat=json.load(open(A/'regions/catalog.json'));ds=json.load(open(root/'districts.json'));heroes=[]
features={'stuart':(88313715,'Flagler Park brings Stuart’s historic downtown, riverwalk and St. Lucie River together.'),'jensen-beach':(85234845,'Downtown Indian River Drive frames Jensen Beach’s waterfront shops, low village streets and causeway approach.'),'port-st-lucie':(1548683158,'Rivergate’s Veterans Memorial Park frames the St. Lucie River and the city’s low residential neighborhoods.'),'fortpierce':(988833393,'The downtown waterfront park frames Fort Pierce’s marina, historic blocks and lagoon.'),'vero-beach':(544668216,'Humiston Park anchors Ocean Drive’s beachside village and the Atlantic sand edge.'),'sebastian':(340283292,'Riverview Park frames Sebastian’s Indian River waterfront and low fishing-town streets.'),'port-salerno':(286358372,'Pirate’s Cove marina frames the working Manatee Pocket waterfront and surrounding village.'),'palm-city':(89445431,'Justin Wilson Park anchors Old Palm City’s riverfront neighborhoods and bridge approach.'),'hutchinson-island':(1233381151,'Jensen Beach Park frames Hutchinson Island’s ocean beach, condominium strip and lagoon-side crossing.')}
for d in ds:
 tid=d['town'];c=Point(d['lon'],d['lat']);source=d['positionSource'];reason='The mapped place anchor frames the town’s waterfront neighborhoods and coastal setting.'
 if tid in features:
  wid,reason=features[tid];e=es['way',wid];c=center(e);source='https://www.openstreetmap.org/way/'+str(wid)
 if tid=='hobe-sound':
  matches=[e for e in es.values() if e.get('tags',{}).get('name')=='Southeast Bridge Road'];e=min(matches,key=lambda e:center(e).distance(Point(-80.129,27.064)));c=center(e);source='https://www.openstreetmap.org/way/'+str(e['id']);reason='Bridge Road’s lagoon approach frames Hobe Sound’s village, banyan canopy and route to the beach.'
 pc=project(c);views[tid]=dict(district=d['id'],x=pc.x,y=pc.y,lon=c.x,lat=c.y,desktopSpan=2.8,phoneSpan=1.4,reason=reason,heroSource=source);heroes.append(dict(town=tid,**views[tid]));t=next(t for t in cat['towns'] if t['id']==tid);t.update(**{k:d[k] for k in ['x','y','lon','lat']},price=d['priceRange'])
(A/'regions/town-views.json').write_text(json.dumps(views,indent=2)+'\n');(A/'regions/catalog.json').write_text(json.dumps(cat,indent=2)+'\n');(root/'town-hero-sources.json').write_text(json.dumps(heroes,indent=2)+'\n')
r=json.load(open(root/'recipes.json'));r['recipes']['fort-pierce-downtown']={**copy.deepcopy(r['recipes']['fortpierce']),'roof':'flat','detail':'stucco'};r['styleZones']=[{'bounds':[-80.327,27.443,-80.319,27.451],'recipe':'fort-pierce-downtown'}];(root/'recipes.json').write_text(json.dumps(r,indent=2)+'\n')
print([(h['town'],h['heroSource']) for h in heroes])
