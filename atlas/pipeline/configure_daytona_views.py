"""Curated Daytona/Flagler input recipes and mapped waterfront hero cameras.
Run after source normalization. Does not change the approved engine or scale rules.
"""
from pathlib import Path
import json,gzip,sys,copy,xml.etree.ElementTree as E
P=Path(__file__).resolve().parent;A=P.parent;r=P/'work/coastal_pipeline/v4/daytona-flagler';sys.path.insert(0,str(P/'work/30a_finish'));from geometry import polygons,project,Point,LineString
es={}
for f in r.glob('*.json.gz'):
 for e in json.load(gzip.open(f,'rt'))['elements']:es[e['type'],e['id']]=e
for tid in ['daytona','flagler']:
 xml=E.parse(P/'work/coastal_pipeline/downloads/marinas'/f'{tid}.osm').getroot();nodes={n.attrib['id']:{'lon':float(n.attrib['lon']),'lat':float(n.attrib['lat'])} for n in xml.findall('node')}
 for w in xml.findall('way'):es['way',int(w.attrib['id'])]={'type':'way','id':int(w.attrib['id']),'tags':{t.attrib['k']:t.attrib['v'] for t in w.findall('tag')},'geometry':[nodes[q.attrib['ref']] for q in w.findall('nd')]}
def center(e):
 if e['type']=='node':return Point(e['lon'],e['lat'])
 p=polygons(e)
 if p.is_empty and len(e.get('geometry',[]))>1:p=LineString([(q['lon'],q['lat']) for q in e['geometry']])
 if p.is_empty:raise ValueError(e['id'])
 return p.centroid
features={'daytona':(333300755,'Daytona Beach Pier frames the boardwalk, oceanfront hotels and the beachside entertainment center.'),'flagler':(350952077,'The mapped Flagler Beach pier anchors the A1A downtown, low beach cottages and Atlantic shore; the pier is under reconstruction.'),'nsb':(469251001,'Detwiler Park frames Flagler Avenue’s beachside streets, cottages and public Atlantic access.'),'port-orange':(710073634,'Riverwalk Park frames the Dunlawton Bridge approach, Halifax waterfront and historic river district.'),'south-daytona':(677139121,'Riverfront Veterans Memorial Park anchors the Halifax shore and low residential neighborhoods.'),'daytona-beach-shores':(964676992,'Frank Rendon Park frames the public beach and the Shores’ oceanfront condominium corridor.'),'ormond-beach':(543887720,'Fortunato Park frames Granada Bridge, riverfront gardens and the route toward Ormond’s beach.'),'palm-coast':(148252322,'The mapped European Village loop frames the walkable village, Intracoastal waterfront and adjacent canal neighborhoods.'),'ponce-inlet':(318263235,'The red Ponce de Leon Inlet Lighthouse frames the inlet, working marinas and quiet beach neighborhoods.'),'edgewater':(553154504,'George R. Kennedy Memorial Park frames Edgewater’s public boat ramp, riverfront streets and lagoon islands.'),'holly-hill':(948784772,'Riverside Park frames Holly Hill’s Halifax waterfront and shaded, low residential streets.'),'ormond-by-the-sea':(964715597,'Tom Renick Park frames public beach access and the low cottage streets between the Atlantic and Halifax basin.')}
views=json.load(open(A/'regions/town-views.json'));cat=json.load(open(A/'regions/catalog.json'));ds=json.load(open(r/'districts.json'));heroes=[];ed=json.load(open(r/'editorial.json'))
for d in ds:
 tid=d['town'];d['source']=ed['recipes'][d['style']]['source'];c=Point(d['lon'],d['lat']);source=d['positionSource'];reason='The true mapped Beverly Beach town anchor frames its narrow A1A beachside neighborhood and Atlantic edge.'
 if tid in features:wid,reason=features[tid];c=center(es['way',wid]);source='https://www.openstreetmap.org/way/'+str(wid)
 pc=project(c);views[tid]=dict(district=d['id'],x=pc.x,y=pc.y,lon=c.x,lat=c.y,desktopSpan=2.8,phoneSpan=1.4,reason=reason,heroSource=source);heroes.append(dict(town=tid,**views[tid]));t=next(t for t in cat['towns'] if t['id']==tid);t.update(**{k:d[k] for k in ['x','y','lon','lat']},price=d['priceRange'])
(A/'regions/town-views.json').write_text(json.dumps(views,indent=2)+'\n');(A/'regions/catalog.json').write_text(json.dumps(cat,indent=2)+'\n');(r/'districts.json').write_text(json.dumps(ds,indent=2)+'\n');(r/'town-hero-sources.json').write_text(json.dumps(heroes,indent=2)+'\n')
x=json.load(open(r/'recipes.json'));x['recipes']['daytona-oceanfront']={**copy.deepcopy(x['recipes']['daytona-beach-shores']),'walls':['#f6f0e1','#cbdedb','#efd9d2','#e1e5df','#e8dbbc'],'roofs':['#c2d1ce','#e4dfd2'],'roof':'flat','detail':'balconies'};x['towerRecipe']='daytona-oceanfront';x['recipes']['daytona-historic-blocks']={**copy.deepcopy(x['recipes']['nsb']),'walls':['#bc8b72','#e4cfa9','#f3e9d6','#bdd1c3'],'roof':'flat','detail':'stucco'};x['styleZones']=[{'bounds':[-81.029,29.201,-81.017,29.218],'recipe':'daytona-historic-blocks'},{'bounds':[-80.926,29.020,-80.915,29.030],'recipe':'daytona-historic-blocks'}];x['recipes']['ponce-red-lighthouse']={'walls':['#b85436'],'roofs':['#5b6257'],'roof':'flat','detail':'stucco','source':'https://www.ponceinlet.org/tour-explore/explore-the-museum/explore-the-ponce-inlet-light-station/lighthouse-tower/'};x['landmarks']={'way/318263235':{'recipe':'ponce-red-lighthouse','illustratedRealHeightMeters':53.34,'canopyClearanceMeters':12,'profile':[[0,0]],'source':'https://www.ponceinlet.org/tour-explore/explore-the-museum/explore-the-ponce-inlet-light-station/lighthouse-tower/','note':'175-foot source height, mapped footprint, unchanged 3x width cap.'},'way/350943720':{'recipe':'daytona-historic-blocks','walls':['#e9e5d8'],'profile':[[0,0]],'source':'https://www.openstreetmap.org/way/350943720','note':'Mapped Speedway grandstand footprint and tagged 42.6m height.'}}

for tid in ['daytona','daytona-beach-shores']:
 x['recipes'][tid]={**copy.deepcopy(x['recipes']['nsb']),'source':ed['recipes'][tid]['source'],'detail':'painted-wood-porches','walls':['#f5edda','#d0e3d7','#e7d6c2','#f1d4cb'],'roof':'gable'}

x['styleZones'].insert(0,{'bounds':list(polygons(es['way',318263235]).bounds),'recipe':'ponce-red-lighthouse'})
(r/'recipes.json').write_text(json.dumps(x,indent=2)+'\n');print([(h['town'],h['heroSource']) for h in heroes])
