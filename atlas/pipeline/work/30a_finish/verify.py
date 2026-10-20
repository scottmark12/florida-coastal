from geometry import *
from shapely.geometry import MultiLineString
import struct,collections,csv,hashlib
O=Path('outputs/30a_finish');raw=(O/'assets/30a-finished.glb').read_bytes();assert raw[:4]==b'glTF';jl=struct.unpack_from('<I',raw,12)[0];g=json.loads(raw[20:20+jl]);binary=raw[28+jl:]
def accessor(i):
 a=g['accessors'][i];v=g['bufferViews'][a['bufferView']];dt={5126:'<f4',5125:'<u4',5123:'<u2'}[a['componentType']];n={'SCALAR':1,'VEC3':3,'VEC4':4}[a['type']];return np.frombuffer(binary,dtype=dt,count=a['count']*n,offset=v.get('byteOffset',0)+a.get('byteOffset',0)).reshape(-1,n)
def edges(mesh):
 counts=collections.Counter()
 for prim in mesh['primitives']:
  vs=accessor(prim['attributes']['POSITION']);vs=vs[:,[0,2]]*np.array([1,-1]);fs=accessor(prim['indices']).reshape(-1,3)
  for tri in fs:
   for a,b in zip(tri,np.roll(tri,-1)):
    edge=tuple(sorted((tuple(vs[a]),tuple(vs[b]))));counts[edge]+=1
 return MultiLineString([e for e,n in counts.items() if n==1])
extra=json.loads((O/'30a.json').read_text());G=json.loads((D/'geometry.json').read_text());land=shape(G['land']);waters={w['osmId']:shape(w['geometry']) for w in G['waters']};meshes={m['name']:m for m in g['meshes']};rows=[]
for d in extra['districts']:
 x,y=T.transform(d['lon'],d['lat']);err=math.hypot(x-d['x']*1000,y-d['y']*1000)
 assert land.covers(Point(d['x'],d['y'])),d['name']+' anchor in water'
 assert d['priceEvidence']['min']<d['priceEvidence']['max'],d['name']+' missing verified range'
 rows.append({'name':d['name'],'kind':'town anchor','source':d['positionSource'],'error_m':round(err,4),'method':'Actual viewer JSON anchor versus its OSM place node, same projection'})
for l in extra['lakes']:
 boundary=edges(meshes[l['key']]);err=boundary.hausdorff_distance(waters[l['osmId']].boundary)*1000
 rows.append({'name':l['name'],'kind':'lake boundary','source':l['source'],'error_m':round(err,4),'method':'Boundary extracted from final GLB triangles versus raw OSM polygon boundary, maximum Hausdorff distance'})
assert len(extra['lakes'])==15;assert len(extra['districts'])==12;assert max(r['error_m'] for r in rows)<150
scale=json.loads((O/'scale-checks.json').read_text());assert scale['maxRatio']<=3.00001;assert len(raw)<4000000
folder=Path('outputs/florida_coastal_atlas/30a-review');files=['index.html','app.js','catalog.json','districts.json','features.json','routes.json','roads.json','30a.json','canopy-mask.png','sand.json','assets/30a-finished.glb.gz'];sizes={f:(folder/f).stat().st_size for f in files};assert sum(sizes.values())<4000000
report={'status':'Technical checks passed; local recognition, surveyed heights/density and physical phone timing not certified','glbBytes':len(raw),'glbSha256':hashlib.sha256(raw).hexdigest(),'coldRegionBytes':sum(sizes.values()),'files':sizes,'townAnchorsOnLand':12,'namedLakeShapes':15,'districtPriceSamples':12,'maxActualGlbLakeErrorMeters':max(r['error_m'] for r in rows),'alignmentMeaning':'Faithfulness to the source OSM geometry; not independent absolute geographic accuracy','buildingHeightEvidence':scale['sources'],'scaleMaxRatio':scale['maxRatio'],'rows':rows}
(O/'verification.json').write_text(json.dumps(report,indent=2));(O/'alignment.json').write_text(json.dumps({'metric':report['alignmentMeaning'],'maxErrorMeters':report['maxActualGlbLakeErrorMeters'],'rows':rows},indent=2))
with open(O/'alignment.csv','w') as f:w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
print(json.dumps({k:v for k,v in report.items() if k not in ['rows','files']},indent=2))
