"""Curated, source-positioned coastal expansion heroes; shared landing schema/cameras unchanged."""
from pathlib import Path
import json,copy,math
from urllib.parse import urlencode
from pyproj import Transformer
A=Path(__file__).resolve().parent.parent;P=A/'pipeline';idx=json.load(open(A/'landing/index.json'));T=Transformer.from_crs('EPSG:4326','+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs',always_xy=True)
# Coordinates are representative points of the named OSM way geometries.
spec=json.load(open(P/'coast-addition-heroes.json'))
views=json.load(open(A/'regions/town-views.json'));new=[]
for tid,(name,lon,lat,reason,span,close,kind,source,extras) in spec.items():
 d=json.load(open(P/'work/coastal_pipeline/v4'/tid/'districts.json'))[0];x,y=[v/1000 for v in T.transform(lon,lat)];calls=([{'name':name,'type':kind,'lon':lon,'lat':lat}] if kind else [])+[dict(zip(['name','type','lon','lat'],e)) for e in extras];t={'town_id':tid,'name':d['name'],'desktop':tid+'.webp','mobile':tid+'-m.webp','center':{'x':x,'y':y,'lon':lon,'lat':lat},'districts':[{k:d[k] for k in ['id','name','lon','lat']}],'district':d['id'],'span':span,'close_span':close,'hero':{'lon':lon,'lat':lat,'reason':reason,'source':source},'callouts':calls,'close_callouts':calls,'close_desktop':tid+'-close.webp','close_mobile':tid+'-close-m.webp','views':{}}
 for key,s,desktop,mobile in [('town',span,t['desktop'],t['mobile']),('street',close,t['close_desktop'],t['close_mobile'])]:
  h=s/1.6;c={'position':[x,h*1.25,-y+h*1.25],'target':[x,0,-y],'left':-s/2,'right':s/2,'top':h/2,'bottom':-h/2,'near':.0001,'far':3500,'projection':'orthographic','mapUnits':'kilometers','tiltDegrees':45};phone=copy.deepcopy(c);phone['left']/=2;phone['right']/=2
  def visible(q,cam):
   a,b=[v/1000 for v in T.transform(q['lon'],q['lat'])];u=.5+(a-x)/(cam['right']-cam['left']);v=.5-(b-y)/math.sqrt(2)/(cam['top']-cam['bottom']);return .03<=u<=.97 and .03<=v<=.97
  params={'view':tid,'level':'town','district':d['id'],'landing':1,'cx':x,'cy':y,'span':s};url='../explore_coast.html?'+urlencode(params);params['span']=s/2
  t['views'][key]={'desktop':desktop,'mobile':mobile,'span':s,'camera':c,'mobile_camera':phone,'callouts':[q for q in calls if visible(q,c)],'mobile_callouts':[q for q in calls if visible(q,phone)],'render_url':url,'mobile_render_url':'../explore_coast.html?'+urlencode(params)}
 for prefix,key in [('', 'town'),('close_','street')]:
  for k in ['camera','mobile_camera','render_url','mobile_render_url']:t[prefix+k]=t['views'][key][k]
 t['callouts']=t['views']['town']['callouts'];t['close_callouts']=t['views']['street']['callouts']
 views[tid]={'district':d['id'],'x':x,'y':y,'lon':lon,'lat':lat,'desktopSpan':close,'phoneSpan':close/2,'reason':reason};new.append(t)
idx['towns']=[t for t in idx['towns'] if t['town_id'] not in spec]+new;(A/'landing/index.json').write_text(json.dumps(idx,indent=2)+'\n');(A/'regions/town-views.json').write_text(json.dumps(views,indent=2)+'\n');queue=[{'town_id':t['town_id'],'view':k,'url':v['render_url'],'desktop':v['desktop'],'mobile':v['mobile'],'camera':v['camera']} for t in idx['towns'] for k,v in t['views'].items()];(A/'landing/capture-queue.json').write_text(json.dumps(queue,indent=2)+'\n');print('Prepared',len(new),'coastal expansion hero pairs')
