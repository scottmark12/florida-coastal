"""Final source-verified hero framing; no building/land geometry changes."""
from pathlib import Path
import json,gzip
from shapely.geometry import LineString
P=Path(__file__).resolve().parent;h=json.load(open(P/'coast-addition-heroes.json'))
h['miramar-beach']=['Miramar Beach Regional Beach Access',-86.38752755,30.37819479,'The county’s Gulf beach access frames Miramar’s white-sand shore, beach homes and beachfront buildings.',5.5,2.2,'beach','https://www.visitsouthwalton.com/beach-access/miramar-beach-regional-beach-access-49/',[]]
for tid,reason,name,kind in [('yankeetown','The mapped riverfront center frames Yankeetown’s cottage streets and the Withlacoochee River.','Yankeetown riverfront center','walkable'),('hernando-beach','The mapped town center frames Hernando Beach’s canal homes and their relationship to the Gulf marsh.','Hernando Beach canal neighborhoods',None)]:
 d=json.load(open(P/'work/coastal_pipeline/v4'/tid/'districts.json'))[0];old=h[tid];h[tid]=[name,d['lon'],d['lat'],reason,old[4],old[5],kind,d['positionSource'],[]]
es=json.load(gzip.open(P/'work/coastal_pipeline/v4/hernando-beach/district-hernando-beach.json.gz','rt'))['elements'];e=next(e for e in es if e['id']==10959139);point=LineString([(p['lon'],p['lat']) for p in e['geometry']]).interpolate(.5,normalized=True);h['hernando-beach'][0:4]=['Gulf Coast Drive canal neighborhoods',point.x,point.y,'Gulf Coast Drive frames Hernando Beach’s canal peninsula, waterfront homes and nearby Gulf marsh.'];h['hernando-beach'][7]='https://www.openstreetmap.org/way/10959139'
h['hernando-beach'][-1]=[['Hernando Beach Marina','boating',-82.6507817,28.49008835]]
(P/'coast-addition-heroes.json').write_text(json.dumps(h,indent=2)+'\n')
