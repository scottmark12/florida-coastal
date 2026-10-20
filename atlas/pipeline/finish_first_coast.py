"""Package First Coast marinas and retain the approved Jacksonville model.
Same bounded OSM marina inputs and boat exporter; Jacksonville is reused unchanged.
"""
from pathlib import Path
import sys,json,subprocess,xml.etree.ElementTree as E,shutil
P=Path(__file__).resolve().parent;A=P.parent;r=P/'work/coastal_pipeline/v4/first-coast';raw=P/'work/coastal_pipeline/downloads/marinas';ids=[t for t in json.load(open(r/'catalog-input.json'))['region']['towns'] if t!='jacksonville'];ed=json.load(open(r/'editorial.json'));excluded=set(ed.get('nonBoatingWays',[]));index=[];sources=[]
for tid in ids:
 m=json.load(open(r/tid/'manifest.json'));w,s,e,n=m['bounds'];xml=E.parse(raw/(tid+'.osm')).getroot();nodes={q.attrib['id']:q for q in xml.findall('node')};ways=[]
 for way in xml.findall('way'):
  if int(way.attrib['id']) in excluded:continue
  pts=[nodes[q.attrib['ref']] for q in way.findall('nd') if q.attrib['ref'] in nodes]
  if any(w<=float(q.attrib['lon'])<=e and s<=float(q.attrib['lat'])<=n for q in pts):ways.append(way)
 out=E.Element('osm',version='0.6');needed={q.attrib['ref'] for way in ways for q in way.findall('nd')}
 for key in needed:out.append(nodes[key])
 for way in ways:out.append(way)
 f=raw/('first-coast-'+tid+'.osm');E.ElementTree(out).write(f,encoding='utf-8',xml_declaration=True);index.append({'town':tid,'path':str(f),'source':'Geofabrik Florida OSM snapshot 2026-10-17; bounded to Town package','bounds':m['bounds']});sources.append({'town':tid,'source':'https://download.geofabrik.de/north-america/us/florida.html','snapshot':'florida-261017.osm.pbf','bounds':m['bounds'],'mapped_ways':['https://www.openstreetmap.org/way/'+q.attrib['id'] for q in ways]})
f=raw/'first-coast-index.json';f.write_text(json.dumps(index,indent=2));(r/'marina-sources.json').write_text(json.dumps(sources,indent=2)+'\n');subprocess.run([sys.executable,str(P/'boats.py'),str(f)],check=True,cwd=P)
s=A/'regions/packages/jacksonville';d=A/'regions/packages/first-coast/jacksonville';shutil.copytree(s,d,dirs_exist_ok=True);(r/'jacksonville-reuse.json').write_text(json.dumps({'town':'jacksonville','sourcePackage':'regions/packages/jacksonville','method':'Byte-identical copy of approved model/runtime assets for the regional review; live package registry remains on its approved original package. Review-only diagnostics may be refreshed.'},indent=2)+'\n')

h=d/'atlas-review.html';h.write_text(h.read_text().replace('../../../landing/','../../../../landing/'))
