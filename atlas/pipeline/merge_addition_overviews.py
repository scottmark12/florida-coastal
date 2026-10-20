"""Append validated new-town overview meshes without changing existing geometry.
Original overview bytes are preserved as an excluded input for repeatable local runs.
No existing town nodes/materials are changed; source coordinates stay unchanged.
"""
from pathlib import Path
import json,gzip,struct,copy,subprocess
P=Path(__file__).resolve().parent;A=P.parent;spec=json.load(open(P/'coast-additions.json'))
def read(p):
 b=p.read_bytes();b=gzip.decompress(b) if b[:2]==b'\x1f\x8b' else b;n=struct.unpack_from('<I',b,12)[0];return json.loads(b[20:20+n]),b[28+n:]
for rid in ['emerald-coast','nature-coast']:
 target=A/'regions/assets'/(rid+'.glb.gz');original=P/'work/coastal_pipeline/raw'/(rid+'-pre-expansion.glb.gz')
 if not original.exists():original.write_bytes(subprocess.check_output(['git','show','c0887e33:atlas/regions/assets/'+rid+'.glb.gz'],cwd=A.parent))
 g,binary=read(original);binary=bytearray(binary)
 for tid,*row in spec:
  if row[1]!=rid:continue
  j,b=read(A/'regions/packages'/tid/'region.glb.gz');offsets={k:len(g.get(k,[])) for k in ['nodes','meshes','materials','bufferViews','accessors']};offset=len(binary);binary.extend(b)
  for v in j['bufferViews']:v['buffer']=0;v['byteOffset']=v.get('byteOffset',0)+offset
  for v in j['accessors']:v['bufferView']+=offsets['bufferViews']
  for mesh in j['meshes']:
   for q in mesh['primitives']:
    q['attributes']={k:v+offsets['accessors'] for k,v in q['attributes'].items()}
    if 'indices' in q:q['indices']+=offsets['accessors']
    if 'material' in q:q['material']+=offsets['materials']
  for n in j['nodes']:
   if 'mesh' in n:n['mesh']+=offsets['meshes']
   if 'children' in n:n['children']=[i+offsets['nodes'] for i in n['children']]
   n['name']='Expansion / '+tid
  g['scenes'][g.get('scene',0)]['nodes'] += [i+offsets['nodes'] for i in j['scenes'][j.get('scene',0)]['nodes']]
  for k in offsets:g.setdefault(k,[]).extend(j[k])
 g.setdefault('extras',{})['coastExpansion']={'sourceBase':'c0887e33','towns':[r[0] for r in spec if r[2]==rid],'method':'Append unchanged shared-exporter overview meshes; prior nodes retained'};g['buffers']=[{'byteLength':len(binary)}];j=json.dumps(g,separators=(',',':')).encode();j+=b' '*((-len(j))%4);binary+=b'\0'*((-len(binary))%4);data=struct.pack('<4sII',b'glTF',2,28+len(j)+len(binary))+struct.pack('<I4s',len(j),b'JSON')+j+struct.pack('<I4s',len(binary),b'BIN\0')+binary;z=gzip.compress(data,9);assert len(z)<4000000,(rid,len(z));target.write_bytes(z);print(rid,len(z),flush=True)
