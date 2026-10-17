from pathlib import Path
import json,struct,pickle,sys,math
import numpy as np
sys.path.insert(0,str(Path('work/florida_atlas/python_pkgs').resolve()))
import shapely
from pyproj import Transformer
out=Path('outputs/florida_coastal_atlas');registry=json.loads((out/'town_registry.json').read_text());source=json.loads(Path('work/florida_atlas/towns.json').read_text());assert len(registry)==106 and {t['id'] for t in registry}=={t['id'] for t in source}
for t in registry:
 src=next(s for s in source if s['id']==t['id']);assert (t['lat'],t['lon'])==(src['lat'],src['lon']);assert t['landmarks'] and t['objects']>=100
files=list(out.rglob('*.glb'));assert len(list((out/'towns').glob('*.glb')))==106;assert len(list((out/'regions').glob('*.glb')))==15
for file in files:
 b=file.read_bytes();assert struct.unpack_from('<III',b)==(0x46546c67,2,len(b));jl,jt=struct.unpack_from('<II',b,12);assert jt==0x4e4f534a;g=json.loads(b[20:20+jl]);bl,bt=struct.unpack_from('<II',b,20+jl);binary=b[28+jl:];assert bt==0x004e4942 and bl==len(binary)
 def read(ai):
  a=g['accessors'][ai];bv=g['bufferViews'][a['bufferView']];n={'SCALAR':1,'VEC3':3,'VEC4':4}[a['type']];dtype=np.float32 if a['componentType']==5126 else np.uint32;assert bv['byteOffset']%4==0 and bv['byteOffset']+bv['byteLength']<=len(binary);v=np.frombuffer(binary,dtype=dtype,count=a['count']*n,offset=bv['byteOffset']);assert np.isfinite(v).all();return v.reshape(-1,n)
 for m in g['meshes']:
  for pr in m['primitives']:
   v=read(pr['attributes']['POSITION']);f=read(pr['indices']);assert len(f)%3==0 and f.max()<len(v);norm=read(pr['attributes']['NORMAL']);assert np.allclose(np.linalg.norm(norm,axis=1),1,atol=.001)
 for node in g['nodes']:
  if 'mesh' in node:assert node['mesh']<len(g['meshes'])
  if 'extensions' in node:
   attrs=node['extensions']['EXT_mesh_gpu_instancing']['attributes'];pp=read(attrs['TRANSLATION']);sc=read(attrs['SCALE']);rr=read(attrs['ROTATION']);assert len(pp)==len(sc)==len(rr) and (sc>0).all();assert np.allclose(np.linalg.norm(rr,axis=1),1,atol=.0001)
 if file.name=='florida_coastal_complete_atlas.glb':
  anchors=[n for n in g['nodes'] if 'town_id' in n.get('extras',{})];assert len(anchors)==106
  for n in anchors:
   t=next(t for t in registry if t['id']==n['extras']['town_id']);assert np.allclose(n['translation'],[t['x'],.08,-t['y']],atol=1e-8)
data=pickle.load(open('work/florida_atlas/atlas_scene.pkl','rb'));homes=[o for o in data['instances'] if o['layer'] in ['center','suburbs']];assert all(shapely.contains_xy(data['land'],o['p'][0],o['p'][1]) for o in homes)
geo=json.loads((out/'geographic_base.geojson').read_text());bounds=shapely.geometry.shape(geo['features'][0]['geometry']).bounds;assert -88<bounds[0]<-87 and -81<bounds[2]<-79 and 24<bounds[1]<25 and 30<bounds[3]<32
report={'verified_glbs':len(files),'town_files':106,'region_files':15,'source_town_ids_and_coordinates_match':True,'geographic_anchor_count':106,'placed_objects':len(data['instances']),'residential_centers_on_land':len(homes),'valid_triangles_buffers_normals_and_instance_transforms':True,'geojson_wgs84':True}
(out/'verification.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
