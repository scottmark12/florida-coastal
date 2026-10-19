"""Restore the St. Teresa building-footprint gap from Microsoft's open dataset.
This acquisition adapter does not change the locked renderer or scale rules.
Negative local IDs identify supplemental imagery footprints, never OSM objects.
"""
from pathlib import Path
import urllib.request,gzip,json,hashlib
P=Path(__file__).resolve().parent;d=P/'work/coastal_pipeline/v4/st-teresa'
url='https://bfppub.z5.web.core.windows.net/2026-08-13/global-buildings.geojsonl/RegionName=UnitedStates/quadkey=032020133/part-00025-110f5303-ff85-4c71-a2bf-c6070024fec8.c000.csv.gz'
raw=P/'work/coastal_pipeline/raw/st-teresa-ms.geojsonl.gz';raw.parent.mkdir(parents=True,exist_ok=True)
if not raw.exists():raw.write_bytes(urllib.request.urlopen(url,timeout=90).read())
elements=[];features=[]
for line in gzip.open(raw,'rt'):
 f=json.loads(line);pts=f['geometry']['coordinates'][0];x=sum(p[0] for p in pts)/len(pts);y=sum(p[1] for p in pts)/len(pts)
 if not(-84.48<x<-84.43 and 29.90<y<29.95):continue
 i=-1000000000-len(elements);features.append(dict(f,properties={**f['properties'],'local_id':i,'source':'Microsoft Global ML Building Footprints','source_url':url}))
 elements.append({'type':'way','id':i,'geometry':[{'lon':p[0],'lat':p[1]} for p in pts],'tags':{'building':'house','source':'Microsoft Global ML Building Footprints; imagery-derived; not OpenStreetMap'},'source_url':url,'id_namespace':'local-supplemental'})
metadata={'source':'https://github.com/microsoft/GlobalMLBuildingFootprints','download':url,'release':'2026-08-13','license':'CDLA Permissive 2.0','license_url':'https://github.com/microsoft/GlobalMLBuildingFootprints/blob/main/LICENSE','download_sha256':hashlib.sha256(raw.read_bytes()).hexdigest(),'footprints':len(elements),'notes':['Imagery-derived footprint estimates, not a current field survey.','Height estimates are retained in the source subset but not used as surveyed heights; the unchanged house default of one to two storeys applies.','Negative IDs are local supplemental IDs, never OSM IDs. OSM coast, roads and district anchors are retained.']}
(d/'supplemental-buildings.json').write_text(json.dumps({'metadata':metadata,'elements':elements},separators=(',',':')))
(d/'building-source-subset.geojson').write_text(json.dumps({'type':'FeatureCollection','features':features},separators=(',',':')))
(d/'building-sources.json').write_text(json.dumps(metadata,indent=2)+'\n')
m=json.load(open(d/'manifest.json'));path='work/coastal_pipeline/v4/st-teresa/supplemental-buildings.json'
if path not in m['inputs']['osm']:m['inputs']['osm'].append(path)
m['inputs']['supplementalBuildingSources']=[metadata];note='St. Teresa residential footprints supplemented from Microsoft Global ML Building Footprints (CDLA Permissive 2.0); negative local IDs are not OSM IDs.'
if note not in m['manual_fixes']:m['manual_fixes'].append(note)
(d/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');print('Supplemental footprints:',len(elements))
