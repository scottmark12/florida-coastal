"""Input acquisition only; does not modify or publish the frozen renderer."""
import json,gzip,urllib.request,urllib.parse,sys,time
from pathlib import Path
id=sys.argv[1];c=json.load(open('outputs/florida_coastal_atlas/regions/catalog.json'));r=next(r for r in c['regions'] if r['id']==('miami-fort-lauderdale' if id=='fort-lauderdale' else id));r=dict(r)
if id=='fort-lauderdale':r.update(id=id,name='Fort Lauderdale and the northern Miami coast',towns=[t for t in r['towns'] if t not in ['miami','southbeach']])
ts=[t for t in c['towns'] if t['id'] in r['towns']];p=Path('work/coastal_pipeline/v4')/id;p.mkdir(exist_ok=True)
bounds=[min(t['lon'] for t in ts)-.12,min(t['lat'] for t in ts)-.12,max(t['lon'] for t in ts)+.12,max(t['lat'] for t in ts)+.12];w,s,e,n=bounds;b=f'{s},{w},{n},{e}'
(p/'catalog-input.json').write_text(json.dumps({'region':r,'towns':ts,'bounds':bounds},indent=2))
queries={'geography':f'[out:json][timeout:180];(way[natural=coastline]({b});nwr[natural=water]({b});nwr[natural=beach]({b});node[place]({b}););out geom;','cover':f'[out:json][timeout:180];(nwr[leisure~"^(park|garden|golf_course)$"]({b});nwr[landuse=forest]({b});nwr[natural~"^(wood|wetland|tree|tree_row)$"]({b}););out geom;'}
for t in ts:queries['district-'+t['id']]=f'[out:json][timeout:120];(way[building](around:1800,{t["lat"]},{t["lon"]});relation[building](around:1800,{t["lat"]},{t["lon"]});way[highway](around:2300,{t["lat"]},{t["lon"]}););out geom;'
# Bounded box avoids expensive Overpass around-way searches on overloaded servers.
for t in ts:
 lat,lon=t['lat'],t['lon'];b=f'{lat-.022},{lon-.025},{lat+.022},{lon+.025}'
 queries['district-'+t['id']]=f'[out:json][timeout:120];(way[building]({b});relation[building]({b});way[highway]({b}););out geom;'
for name,q in queries.items():
 path=p/(name+'.json.gz')
 if path.exists():
  try:json.load(gzip.open(path,'rt'));continue
  except (ValueError,EOFError,gzip.BadGzipFile):path.unlink()
 for host in ['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter','https://overpass.private.coffee/api/interpreter']*2:
  try:
   req=urllib.request.Request(host,data=urllib.parse.urlencode({'data':q}).encode(),headers={'User-Agent':'FloridaCoastalAtlas/1.0'});data=urllib.request.urlopen(req,timeout=200).read();j=json.loads(data)
   if j.get('remark') or not j.get('elements'):raise RuntimeError(j.get('remark','Empty source'))
   path.write_bytes(gzip.compress(data));print(name,len(j['elements']),flush=True);break
  except Exception as ex:
   print(name,host,str(ex),flush=True)
   if isinstance(ex,OSError) and ex.errno==28:raise
   time.sleep(3)
 else:raise RuntimeError('OSM source failed: '+name)
