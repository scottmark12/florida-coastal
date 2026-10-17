import sys,pickle,json,numpy as np
sys.path.insert(0,'work/florida_atlas/python_pkgs')
from shapely.geometry import shape,Point
from pyproj import Transformer
s=pickle.load(open('work/coast_curated/scene.pkl','rb'));g=json.load(open('work/coast_geography/geography.json'));t=Transformer.from_crs(4326,g['projection'],always_xy=True);x,y=t.transform(-86.2,30.45);p=np.array([x/1000,y/1000]);print('land?',shape(g['land']).covers(Point(p)))
for k in s['geokeys']:
 for n,v,f,m in s['assets'][k]:
  a=v[f][:,:,:2];v0=a[:,2]-a[:,0];v1=a[:,1]-a[:,0];v2=p-a[:,0];d00=(v0*v0).sum(1);d01=(v0*v1).sum(1);d11=(v1*v1).sum(1);d20=(v2*v0).sum(1);d21=(v2*v1).sum(1);den=d00*d11-d01*d01
  with np.errstate(divide='ignore',invalid='ignore'):u=(d11*d20-d01*d21)/den;w=(d00*d21-d01*d20)/den
  ok=(u>=0)&(w>=0)&(u+w<=1)
  if ok.any():print(k,'z',v[f[ok],2].max())
