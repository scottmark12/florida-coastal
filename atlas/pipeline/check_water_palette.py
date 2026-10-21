"""Sample every export over its approved geographic water mask.
Excludes a 20 m shoreline margin and neutral pixels from boats/bridges/roofs.
For frames with at least 1% geographically sampled open water, 60% must remain
water-like. Cool samples must fit the palette, allowing 5% or three edge pixels.
Compares sRGB pixels to the single shallow-to-deep palette segment, tolerance 22.
Frames with no open-water sample are explicitly recorded, never invented.
"""
import json
from pathlib import Path
import numpy as np
from PIL import Image
from scipy.ndimage import distance_transform_edt
from landing_water import PALETTE,rgb
from fixed_landings import A,OUT

def check(index=None,fail=True,report_path=None):
 index=index or json.load(open(A/'landing/index.json'));meta=json.load(open(A/'regions/landing-water/index.json'));rows=[]
 # The desktop capture transport encodes display-P3 channel values without an
 # ICC tag. Convert the sRGB recipe endpoints to those captured channel values;
 # do not recolor approved land/buildings while auditing water.
 def capture_rgb(color):
  v=rgb(color)/255;linear=np.where(v<=.04045,v/12.92,((v+.055)/1.055)**2.4)
  p3=np.array([[.82259287,.17753395,0],[.03319951,.9667835,0],[.01708535,.07239572,.91030148]])@linear
  return np.where(p3<=.0031308,p3*12.92,1.055*p3**(1/2.4)-.055)*255
 lo=capture_rgb(PALETTE['shallow']);hi=capture_rgb(PALETTE['deep']);delta=hi-lo
 for t in index['towns']:
  m=meta['towns'][t['town_id']];tex=np.array(Image.open(A/'regions/landing-water'/m['file']));x0,y0,x1,y1=m['bounds'];water=tex[:,:,3]>250;safe=distance_transform_edt(water)*(x1-x0)/tex.shape[1]>.02
  for level,v in t['views'].items():
   for frame in ['desktop','mobile']:
    im=np.array(Image.open(A/'landing'/v[frame]).convert('RGB'));H,W=im.shape[:2];cam=v['camera' if frame=='desktop' else 'mobile_camera'];cx=cam['target'][0];cy=-cam['target'][2];w=cam['right']-cam['left'];h=(cam['top']-cam['bottom'])*2**.5
    # Same north-up 45-degree orthographic projection as the captured camera.
    xx=cx+((np.arange(2,W,4)+.5)/W-.5)*w;yy=cy+(.5-(np.arange(2,H,4)+.5)/H)*h
    tx=np.clip(((xx-x0)/(x1-x0)*tex.shape[1]).astype(int),0,tex.shape[1]-1);ty=np.clip(((y1-yy)/(y1-y0)*tex.shape[0]).astype(int),0,tex.shape[0]-1)
    mask=safe[ty[:,None],tx[None,:]];samples=im[2::4,2::4][mask].astype(float);geographic_samples=len(samples)
    cool=(samples[:,1]>samples[:,0]+25)&(samples[:,2]>samples[:,0]+15) if len(samples) else np.array([],dtype=bool)
    samples=samples[cool]
    if len(samples):
     u=np.clip((samples-lo)@delta/(delta@delta),0,1);error=np.max(np.abs(samples-(lo+u[:,None]*delta)),axis=1);outside=float(np.mean(error>22)*100);status='pass' if int(np.sum(error>22))<=max(3,len(samples)*.05) and (geographic_samples<mask.size*.01 or len(samples)>=geographic_samples*.6) else 'FAIL'
    else:outside=0.;status='FAIL' if geographic_samples>=20 else 'no_open_water_samples'
    rows.append({'town_id':t['town_id'],'view':level,'frame':frame,'file':v[frame],'sparse_water_frame':geographic_samples<mask.size*.01,'geographic_samples':geographic_samples,'samples':len(samples),'outside_palette_pct':round(outside,3),'status':status})
 result={'palette':PALETTE,'method':__doc__,'capture_endpoint_rgb':{'shallow':lo.tolist(),'deep':hi.tolist()},'images_checked':len(rows),'flags':[r for r in rows if r['status']=='FAIL'],'rows':rows}
 (report_path or A/'landing/qa/water-palette.json').write_text(json.dumps(result,indent=2)+'\n')
 print('Water palette:',len(rows),'images;',len(result['flags']),'flags',flush=True)
 if fail:assert not result['flags'],[(r['file'],r['outside_palette_pct']) for r in result['flags']]
 return result
if __name__=='__main__':check(fail='--report-only' not in __import__('sys').argv)
