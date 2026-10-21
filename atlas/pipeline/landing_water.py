"""One landing-water recipe, clipped to the approved land geometry.
Illustrated shore distance, not bathymetry. Does not change cameras or geometry.
"""
import json,math
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw
from scipy.ndimage import distance_transform_edt
from shapely.geometry import Polygon,LineString,box
from shapely.ops import transform
from fixed_landings import A,OUT,local_land,region_source,elements,xy,project
PALETTE={'shallow':'#8bcfc9','deep':'#3593ae','gradient_width_km':1.2,'source':'Approved Pinellas / Sanibel light teal and mid teal-blue family','version':'uniform-1'}
F=A/'regions/landing-water';F.mkdir(exist_ok=True)
def rgb(h):return np.array(tuple(bytes.fromhex(h.lstrip('#'))),dtype=float)
def build():
 index=json.load(open(OUT/'planned-index.json'));meta={'palette':PALETTE,'towns':{}}
 for t in sorted(index['towns'],key=lambda t:str(region_source(t['town_id']))):
  tid=t['town_id'];cx,cy=t['center']['x'],t['center']['y'];span=t['span'];w=span+3;h=span/1.6*math.sqrt(2)+3;b=(cx-w/2,cy-h/2,cx+w/2,cy+h/2);W=1536;H=round(W*h/w);pixel=w/W
  def pixelxy(x,y):return ((x-b[0])/w*W,(b[3]-y)/h*H)
  land,_=local_land(tid,t['hero']);mask=Image.new('L',(W,H));d=ImageDraw.Draw(mask)
  def drawpoly(g,draw,value):
   if g.is_empty:return
   if g.geom_type=='Polygon':
    draw.polygon([pixelxy(x,y) for x,y in g.exterior.coords],fill=value)
    for ring in g.interiors:draw.polygon([pixelxy(x,y) for x,y in ring.coords],fill=0)
   elif hasattr(g,'geoms'):
    for p in g.geoms:drawpoly(p,draw,value)
  drawpoly(land.intersection(box(*b)),d,255);lm=np.array(mask)>0
  dist=distance_transform_edt(~lm)*pixel
  inland=Image.new('L',(W,H));di=ImageDraw.Draw(inland)
  for e in elements(str(region_source(tid))):
   tags=e.get('tags',{});name=tags.get('name','').lower();water=tags.get('water');geo=e.get('geometry')
   iswater=tags.get('natural')=='water' or tags.get('waterway') in ('riverbank','river','canal','stream') or water in ('bay','lagoon','river','canal','lake','pond','reservoir') or tags.get('natural')=='bay'
   if not iswater:continue
   rings=[geo] if geo else [m.get('geometry') for m in e.get('members',[]) if m.get('role')=='outer' and m.get('geometry')]
   for ring in rings:
    if not ring or len(ring)<2:continue
    pts=[xy(p) for p in ring]
    if not any(b[0]<=x<=b[2] and b[1]<=y<=b[3] for x,y in pts):continue
    try:
     g=Polygon(pts).buffer(0) if pts[0]==pts[-1] and len(pts)>3 else LineString(pts).buffer(.035)
     drawpoly(g.intersection(box(*b)),di,255)
    except ValueError:pass
  u=np.clip(dist/PALETTE['gradient_width_km'],0,1);u=u*u*(3-2*u);u[np.array(inland)>0]=0
  colors=rgb(PALETTE['shallow'])[None,None,:]*(1-u[:,:,None])+rgb(PALETTE['deep'])[None,None,:]*u[:,:,None]
  rgba=np.concatenate([colors.astype('uint8'),np.where(lm,0,255).astype('uint8')[:,:,None]],axis=2)
  Image.fromarray(rgba).save(F/(tid+'.png'),optimize=True)
  meta['towns'][tid]={'bounds':b,'file':tid+'.png'}
  print(tid,flush=True)
 (F/'index.json').write_text(json.dumps(meta,indent=2)+'\n');(A/'pipeline/landing-water-palette.json').write_text(json.dumps(PALETTE,indent=2)+'\n')
if __name__=='__main__':build()
