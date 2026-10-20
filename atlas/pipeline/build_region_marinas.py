"""Run the existing boat recipe on each nested Town package's mapped OSM marinas.
Usage from pipeline: python build_region_marinas.py REGION [FLORIDA_OSM_PBF]
Without PBF, reuse the ignored extracts acquired with extract_marinas.py.
"""
import sys,json,subprocess,xml.etree.ElementTree as E
from pathlib import Path
P=Path(__file__).resolve().parent;A=P.parent;rid=sys.argv[1];r=P/'work/coastal_pipeline/v4'/rid;ids=json.load(open(r/'catalog-input.json'))['region']['towns']
if len(sys.argv)>2:subprocess.run([sys.executable,str(P/'extract_marinas.py'),sys.argv[2],','.join(ids)],check=True,cwd=P)
raw=P/'work/coastal_pipeline/downloads/marinas';index=[];sources=[];nonboating=set(json.load(open(r/'editorial.json')).get('nonBoatingWays',[]))
for tid in ids:
 m=json.load(open(r/tid/'manifest.json'));w,s,e,n=m['bounds'];xml=E.parse(raw/(tid+'.osm')).getroot();nodes={q.attrib['id']:q for q in xml.findall('node')};selected=[]
 for way in xml.findall('way'):
  if int(way.attrib['id']) in nonboating:continue
  pts=[nodes[q.attrib['ref']] for q in way.findall('nd') if q.attrib['ref'] in nodes]
  if any(w<=float(q.attrib['lon'])<=e and s<=float(q.attrib['lat'])<=n for q in pts):selected.append(way)
 out=E.Element('osm',version='0.6');needed={q.attrib['ref'] for way in selected for q in way.findall('nd')}
 for key in needed:out.append(nodes[key])
 for way in selected:out.append(way)
 path=raw/(rid+'-'+tid+'.osm');E.ElementTree(out).write(path,encoding='utf-8',xml_declaration=True);index.append({'town':tid,'path':str(path),'source':'Geofabrik Florida OSM snapshot 2026-10-17; bounded to Town package','bounds':m['bounds']});sources.append({'town':tid,'source':'https://download.geofabrik.de/north-america/us/florida.html','snapshot':'florida-261017.osm.pbf','bounds':m['bounds'],'mapped_ways':['https://www.openstreetmap.org/way/'+q.attrib['id'] for q in selected]})
f=raw/(rid+'-index.json');f.write_text(json.dumps(index,indent=2));(r/'marina-sources.json').write_text(json.dumps(sources,indent=2)+'\n');subprocess.run([sys.executable,str(P/'boats.py'),str(f)],check=True,cwd=P)
