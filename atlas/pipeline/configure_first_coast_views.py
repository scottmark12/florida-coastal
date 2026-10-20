"""First Coast source recipes and waterfront cameras; keeps approved Jacksonville."""
from pathlib import Path
import json,gzip,sys,copy,xml.etree.ElementTree as E
P=Path(__file__).resolve().parent;A=P.parent;r=P/'work/coastal_pipeline/v4/first-coast';sys.path.insert(0,str(P/'work/30a_finish'));from geometry import polygons,project,Point,LineString
es={}
for f in r.glob('*.json.gz'):
 for e in json.load(gzip.open(f,'rt'))['elements']:es[e['type'],e['id']]=e
for tid in ['staug','st-augustine-beach','jaxbeach','fernandina','vilano-beach']:
 xml=E.parse(P/'work/coastal_pipeline/downloads/marinas'/f'{tid}.osm').getroot();nodes={n.attrib['id']:{'lon':float(n.attrib['lon']),'lat':float(n.attrib['lat'])} for n in xml.findall('node')}
 for w in xml.findall('way'):es['way',int(w.attrib['id'])]={'type':'way','id':int(w.attrib['id']),'tags':{t.attrib['k']:t.attrib['v'] for t in w.findall('tag')},'geometry':[nodes[q.attrib['ref']] for q in w.findall('nd')]}
def center(e):
 if e['type']=='node':return Point(e['lon'],e['lat'])
 p=polygons(e)
 if p.is_empty and len(e.get('geometry',[]))>1:p=LineString([(q['lon'],q['lat']) for q in e['geometry']])
 return p.centroid if not p.is_empty else None
spec=json.load(open(r/'hero-selection.json'));views=json.load(open(A/'regions/town-views.json'));cat=json.load(open(A/'regions/catalog.json'));ds=json.load(open(r/'districts.json'));ed=json.load(open(r/'editorial.json'));heroes=[]
for d in ds:
 tid=d['town']
 if tid=='jacksonville':continue
 e=es['way',spec[tid]['way']];c=center(e);assert c is not None;pc=project(c);source='https://www.openstreetmap.org/way/'+str(e['id']);d['source']=ed['recipes'][d['style']]['source'];views[tid]={'district':d['id'],'x':pc.x,'y':pc.y,'lon':c.x,'lat':c.y,'desktopSpan':2.8,'phoneSpan':1.4,'reason':spec[tid]['reason'],'heroSource':source};heroes.append({'town':tid,**views[tid]});t=next(t for t in cat['towns'] if t['id']==tid);t.update(**{k:d[k] for k in ['x','y','lon','lat']},price=d['priceRange'])
(A/'regions/town-views.json').write_text(json.dumps(views,indent=2)+'\n');(A/'regions/catalog.json').write_text(json.dumps(cat,indent=2)+'\n');(r/'districts.json').write_text(json.dumps(ds,indent=2)+'\n');(r/'town-hero-sources.json').write_text(json.dumps(heroes,indent=2)+'\n')
x=json.load(open(r/'recipes.json'));x['recipes']['first-coast-condos']={**copy.deepcopy(x['recipes']['jaxbeach']),'roof':'flat','detail':'balconies','walls':['#f7f0e3','#c7ded9','#ebdad4','#d6e5df'],'roofs':['#c4d1ca','#e3dfd1']};x['towerRecipe']='first-coast-condos';x['recipes']['fernandina-brick']={**copy.deepcopy(x['recipes']['fernandina']),'roof':'flat','detail':'stucco','walls':['#bc8067','#e4c39e','#f2e3ca','#d6bf9e']};x['styleZones']=[{'bounds':[-81.467,30.669,-81.458,30.674],'recipe':'fernandina-brick'}];x['landmarks']=ed.get('landmarks',{});(r/'recipes.json').write_text(json.dumps(x,indent=2)+'\n');print(heroes)
