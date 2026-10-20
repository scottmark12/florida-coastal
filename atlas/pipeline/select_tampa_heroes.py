"""Choose real OSM park or main-road hero points; no invented access points."""
from pathlib import Path
import json,gzip,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'work/30a_finish'))
from geometry import polygons,Point,LineString
rows=json.load(open(P/'tampa-coast-additions.json'));out={}
parks={'oldsmar':179005590,'palm-harbor':597466837,'belleair-beach':32122198,'indian-shores':227084349,'redington-shores':218887857,'holiday':476217523,'port-richey':547113996,'hudson':526290765,'gibsonton':26139347}
reasons={'oldsmar':'R.E. Olds Park puts Old Tampa Bay, the park edge and the small residential center together.','palm-harbor':'Pop Stansell Park frames the Ozona waterfront with historic Palm Harbor streets inland.','belleair-beach':'Bayside Park shows the residential island between the Intracoastal and the Gulf beach.','indian-shores':'Tiki Gardens anchors the narrow beach-and-Intracoastal strip around Gulf Boulevard.','redington-shores':'Constitution Park anchors the local beach neighborhood beside Gulf Boulevard.','north-redington-beach':'Gulf Boulevard frames the beach resort strip and the bayfront neighborhood together.','redington-beach':'Gulf Boulevard puts the low beach homes and Boca Ciega waterfront in the same frame.','tierra-verde':'The central Pinellas Bayway waterfront frames the island canals, docks and connecting road.','holiday':'Anclote River Park frames the river mouth, mangroves and nearby low residential neighborhoods.','port-richey':'Waterfront Park frames the Pithlachascotee river mouth and its working docks.','hudson':'Hudson Beach frames the Gulf edge, canal homes and waterfront boating neighborhood.','gibsonton':'Williams Park frames the Alafia River crossing, boat ramp and low riverfront neighborhoods.'}
for tid,name,rid,lon,lat,*rest in rows:
 d=P/'work/coastal_pipeline/v4'/tid;es={}
 for file in ['geography.json.gz','cover.json.gz','district-'+tid+'.json.gz']:
  for e in json.load(gzip.open(d/file,'rt'))['elements']:es[e['type'],e['id']]=e
 if tid in parks:
  ident=parks[tid];e=next(e for (kind,i),e in es.items() if i==ident);point=polygons(e).representative_point();n=e['tags']['name'];kind='boating' if tid=='gibsonton' else 'park'
 else:
  road='Pinellas Bayway South' if tid=='tierra-verde' else 'Gulf Boulevard';goal=Point(-82.7203,27.6922) if tid=='tierra-verde' else Point(lon,lat)
  roads=[e for e in es.values() if e.get('tags',{}).get('highway') and e['tags'].get('name')==road and len(e.get('geometry',[]))>1]
  e=min(roads,key=lambda e:LineString([(p['lon'],p['lat']) for p in e['geometry']]).distance(goal));line=LineString([(p['lon'],p['lat']) for p in e['geometry']]);point=line.interpolate(line.project(goal));n=road;kind=None
 span=4 if tid in ['belleair-beach','indian-shores','redington-shores','north-redington-beach','redington-beach'] else 5.5;close=1.5 if span==4 else 2.2
 extras=[]
 for other in es.values():
  tags=other.get('tags',{})
  if other['id']==e['id'] or tags.get('leisure')!='park' or not tags.get('name') or tags.get('access') in ['private','no']:continue
  g=polygons(other)
  if g.is_empty:continue
  q=g.representative_point();distance=q.distance(point)
  if distance<.018:extras.append((distance,[tags['name'],'park',q.x,q.y]))
 extras=[v for _,v in sorted(extras,key=lambda v:v[0])[:3]]
 out[tid]=[n,point.x,point.y,reasons[tid],span,close,kind,'https://www.openstreetmap.org/'+e['type']+'/'+str(e['id']),extras]
 print(tid,n,round(point.x,6),round(point.y,6))
(P/'tampa-addition-heroes.json').write_text(json.dumps(out,indent=2)+'\n')
