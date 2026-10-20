import json,urllib.request,urllib.parse,gzip,time
from pathlib import Path
p=Path('work/coastal_pipeline/v4/tampa-south-shore')
for id,lat,lon in [('apollo-beach',27.7741547,-82.4062097),('ruskin',27.7206448,-82.4340374),('sun-city-center',27.7123035,-82.3519192)]:
 f=p/('district-'+id+'.json.gz')
 if f.exists():continue
 b=f'{lat-.022},{lon-.025},{lat+.022},{lon+.025}'
 q=f'[out:json][timeout:120];(way[building]({b});relation[building]({b});way[highway]({b}););out geom;'
 for host in ['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter','https://overpass.private.coffee/api/interpreter']*2:
  try:
   req=urllib.request.Request(host,data=urllib.parse.urlencode({'data':q}).encode(),headers={'User-Agent':'FloridaCoastalAtlas/1.0'});data=urllib.request.urlopen(req,timeout=200).read();j=json.loads(data)
   if j.get('remark') or not j.get('elements'):raise RuntimeError(j.get('remark','Empty source'))
   f.write_bytes(gzip.compress(data));print(id,len(j['elements']),flush=True);break
  except Exception as ex:print(id,str(ex),flush=True);time.sleep(3)
 else:raise RuntimeError('Source failed: '+id)
