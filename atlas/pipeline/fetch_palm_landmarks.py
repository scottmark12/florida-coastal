"""Small OSM API source patches for signature Palm Beaches landmarks and piers.
Raw map downloads remain ignored; only source provenance is committed.
"""
from pathlib import Path
import json,gzip,urllib.request,xml.etree.ElementTree as ET
P=Path(__file__).resolve().parent;root=P/'work/coastal_pipeline/v4/palm-beaches';rows=[('jupiter',[-80.087,26.949,-80.077,26.956]),('juno-beach',[-80.062,26.888,-80.048,26.898]),('lake-worth-beach',[-80.038,26.607,-80.025,26.618])];sources=[]
for town,b in rows:
 out=root/('landmarks-'+town+'.json.gz');url='https://api.openstreetmap.org/api/0.6/map?bbox='+','.join(map(str,b))
 if out.exists():
  cached=json.load(gzip.open(out,'rt'));sources.append({'town':town,'source':cached.get('source',url),'bounds':b,'retrieved':cached.get('retrieved','2026-10-20'),'license':'ODbL 1.0'});continue
 raw=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'FloridaCoastalAtlas/1.0'}),timeout=90).read();xml=ET.fromstring(raw);es={}
 for el in xml:
  if el.tag not in ['node','way','relation']:continue
  e={'type':el.tag,'id':int(el.get('id')),'tags':{t.get('k'):t.get('v') for t in el.findall('tag')}}
  if el.tag=='node':e.update(lon=float(el.get('lon')),lat=float(el.get('lat')))
  elif el.tag=='way':e['nodes']=[int(n.get('ref')) for n in el.findall('nd')]
  else:e['members']=[{'type':m.get('type'),'ref':int(m.get('ref')),'role':m.get('role')} for m in el.findall('member')]
  es[e['type'],e['id']]=e
 for e in es.values():
  if e['type']=='way':e['geometry']=[{k:es['node',n][k] for k in ['lon','lat']} for n in e['nodes'] if ('node',n) in es]
 for e in es.values():
  if e['type']=='relation':
   for m in e['members']:
    if (m['type'],m['ref']) in es:m['geometry']=es[m['type'],m['ref']].get('geometry',[])
 out.write_bytes(gzip.compress(json.dumps({'elements':[e for e in es.values() if (e['type']=='node' and any(k in e.get('tags',{}) for k in ['man_made','historic','tourism'])) or (e['type']!='node' and (e.get('tags',{}).get('building') or e.get('tags',{}).get('highway') or e.get('tags',{}).get('man_made') in ['pier','lighthouse']))],'source':url,'retrieved':'2026-10-20','license':'ODbL 1.0'},separators=(',',':')).encode()));sources.append({'town':town,'source':url,'bounds':b,'retrieved':'2026-10-20','license':'ODbL 1.0'});print(town,'source objects',len(es),flush=True)
(root/'landmark-sources.json').write_text(json.dumps(sources,indent=2)+'\n')
