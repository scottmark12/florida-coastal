"""Lossless GLB export: index overview vertices; retain existing town-tile layout."""
import json,struct,gzip
import numpy as np

def write_mesh(output,name,colors):
 binary=bytearray();views=[];acc=[];mats=[];prims=[]
 def append(a,target,ctype,kind,bounds=False):
  binary.extend(b'\0'*((-len(binary))%4));offset=len(binary);binary.extend(a.tobytes());views.append({'buffer':0,'byteOffset':offset,'byteLength':a.nbytes,'target':target});v={'bufferView':len(views)-1,'componentType':ctype,'count':len(a),'type':kind}
  if bounds:v.update(min=a.min(0).tolist(),max=a.max(0).tolist())
  acc.append(v);return len(acc)-1
 for color,vs in colors.items():
  a=np.asarray(vs,dtype='<f4');indices=None
  if name in ['base','region']:
   unique,first,inverse=np.unique(a,axis=0,return_index=True,return_inverse=True);order=np.argsort(first);remap=np.empty(len(order),dtype=np.uint32);remap[order]=np.arange(len(order));unique=unique[order];indices=remap[inverse].astype('<u2' if len(unique)<65536 else '<u4');assert np.array_equal(unique[indices],a)
   if len(gzip.compress(unique.tobytes()+indices.tobytes(),9))+200<len(gzip.compress(a.tobytes(),9)):a=unique
   else:indices=None
  pos=append(a,34962,5126,'VEC3',True);prim={'attributes':{'POSITION':pos},'material':len(mats)}
  if indices is not None:prim['indices']=append(indices,34963,5123 if indices.dtype.itemsize==2 else 5125,'SCALAR')
  rgb=[int(color[i:i+2],16)/255 for i in [1,3,5]];rgb=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb];mats.append({'name':color,'pbrMetallicRoughness':{'baseColorFactor':rgb+[1],'metallicFactor':0,'roughnessFactor':1},'doubleSided':True});prims.append(prim)
 g={'asset':{'version':'2.0','generator':'Florida Coastal reusable tiled pipeline'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0}],'meshes':[{'primitives':prims}],'materials':mats,'buffers':[{'byteLength':len(binary)}],'bufferViews':views,'accessors':acc};j=json.dumps(g,separators=(',',':')).encode();j+=b' '*((-len(j))%4);binary+=b'\0'*((-len(binary))%4);glb=struct.pack('<4sII',b'glTF',2,28+len(j)+len(binary))+struct.pack('<I4s',len(j),b'JSON')+j+struct.pack('<I4s',len(binary),b'BIN\0')+binary;data=gzip.compress(glb,9);(output/(name+'.glb.gz')).write_bytes(data);return len(data)

def read_triangles(path):
 b=gzip.decompress(path.read_bytes());n=struct.unpack_from('<I',b,12)[0];g=json.loads(b[20:20+n]);data=b[28+n:];colors={}
 def array(index):
  a=g['accessors'][index];v=g['bufferViews'][a['bufferView']];arity=3 if a['type']=='VEC3' else 1;dtype={5126:'<f4',5123:'<u2',5125:'<u4'}[a['componentType']];r=np.frombuffer(data,dtype=dtype,count=a['count']*arity,offset=v.get('byteOffset',0)+a.get('byteOffset',0));return r.reshape(-1,3) if arity==3 else r
 for p in g['meshes'][0]['primitives']:
  a=array(p['attributes']['POSITION'])
  if 'indices' in p:a=a[array(p['indices'])]
  colors[g['materials'][p['material']]['name']]=a
 return colors
