"""Input acquisition fallback only; run from pipeline: python osm_api_fallback.py REGION TOWN.
Uses the same district bounding box as fetch_region.py; does not change locked rules.
"""
import json,urllib.request,xml.etree.ElementTree as ET,gzip,time,sys
from pathlib import Path
p=Path('work/coastal_pipeline/v4')/sys.argv[1];cat=json.load(open(p/'catalog-input.json'));t=next(t for t in cat['towns'] if t['id']==sys.argv[2]);lon,lat=t['lon'],t['lat'];elements={}
for i in range(2):
 for j in range(2):
  b=[lon-.025+i*.025,lat-.022+j*.022,lon+i*.025,lat+j*.022];u='https://api.openstreetmap.org/api/0.6/map?bbox='+','.join(map(str,b));raw=urllib.request.urlopen(u,timeout=90).read();root=ET.fromstring(raw);print(i,j,len(raw),flush=True)
  for n in root:
   if n.tag not in ['node','way','relation']:continue
   a=n.attrib;e={'type':n.tag,'id':int(a['id']),'tags':{x.attrib['k']:x.attrib['v'] for x in n.findall('tag')}}
   if n.tag=='node':e.update(lon=float(a['lon']),lat=float(a['lat']))
   if n.tag=='way':e['nodes']=[int(x.attrib['ref']) for x in n.findall('nd')]
   if n.tag=='relation':e['members']=[{'type':x.attrib['type'],'ref':int(x.attrib['ref']),'role':x.attrib['role']} for x in n.findall('member')]
   elements[e['type'],e['id']]=e
for e in elements.values():
 if e['type']=='way':e['geometry']=[{'lon':elements['node',n]['lon'],'lat':elements['node',n]['lat']} for n in e['nodes'] if ('node',n) in elements]
for e in elements.values():
 if e['type']=='relation':
  for m in e['members']:
   if m['type']=='way' and ('way',m['ref']) in elements:m['geometry']=elements['way',m['ref']].get('geometry',[])
(p/('district-'+t['id']+'.json.gz')).write_bytes(gzip.compress(json.dumps({'elements':[e for e in elements.values() if (e['type']=='way' and (e.get('tags',{}).get('building') or e.get('tags',{}).get('highway'))) or (e['type']=='relation' and e.get('tags',{}).get('building'))],'source':'OSM API 0.6 map endpoint; four bounded tiles; Overpass unavailable'}).encode()));print('saved',len(elements))
