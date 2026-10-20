"""Stitch approved regional raster exports into the walkthrough travel backdrop.
Reuses their exact orthographic cameras; no geometry or town styles are rebuilt.
"""
from pathlib import Path
import json,math,hashlib
from collections import Counter
from PIL import Image,ImageChops
ROOT=Path(__file__).resolve().parents[2];A=ROOT/'atlas';D=ROOT/'img/atlas'
back=json.load(open(A/'regions/region-backdrop.json'));regions=json.load(open(A/'regions/region-images.json'));landings=json.load(open(A/'landing/index.json'))
b=back['camera'];cx=b['target'][0];cy=b['target'][2]/math.sqrt(2);bounds=[cx+b['left'],cy-b['top'],cx+b['right'],cy-b['bottom']]
width=8192;height=round(width*(bounds[3]-bounds[1])/(bounds[2]-bounds[0]));scale=width/(bounds[2]-bounds[0]);canvas=Image.open(A/'regions'/back['file']).convert('RGB').resize((width,height),Image.Resampling.LANCZOS)
used=[]
for rid,m in regions.items():
 for layer in [m]+m.get('layers',[]):
  c=layer['camera'];assert c['tiltDegrees']==45 and c['mapUnits']=='kilometers'
  x=c['target'][0]+c['left'];y=c['target'][2]/math.sqrt(2)-c['top'];w=round((c['right']-c['left'])*scale);h=round((c['top']-c['bottom'])*scale)
  image=Image.open(A/'regions'/layer['file']).convert('RGB').resize((w,h),Image.Resampling.LANCZOS)
  colors=Counter(image.resize((200,200)).getdata()).most_common(20)
  water=next(color for color,count in colors if color[1]>color[0]*1.2 and color[2]>color[0]*1.2)
  def matches(color,tolerance):
   channels=ImageChops.difference(image,Image.new('RGB',image.size,color)).split()
   distance=ImageChops.lighter(ImageChops.lighter(channels[0],channels[1]),channels[2])
   return distance.point(lambda d:round(255*max(0,1-d/tolerance)))
  # Offshore tones share the context's water; retain colored coastal shallows.
  image=Image.composite(Image.new('RGB',image.size,back['waterColor']),image,matches(water,32))
  # Fade only the outer 12% into the approved context, avoiding rectangular seams.
  def edge(n):
   v=Image.new('L',(n,1));v.putdata([round(255*min(1,i/(n*.12),(n-1-i)/(n*.12))) for i in range(n)]);return v
  alpha=ImageChops.multiply(edge(w).resize((w,h)),edge(h).transpose(Image.Transpose.ROTATE_90).resize((w,h)))
  # The approved Tampa capture has an untextured paper extension; let the
  # sourced context show through that fill while retaining all drawn details.
  if rid=='tampa-bay':alpha=ImageChops.multiply(alpha,ImageChops.invert(matches((228,215,185),24)))
  canvas.paste(image,(round((x-bounds[0])*scale),round((y-bounds[1])*scale)),alpha);used.append(layer['file'])
canvas.save(D/'flight-regions.webp','WEBP',quality=88,method=6)
canvas.resize((4096,round(height/2)),Image.Resampling.LANCZOS).save(D/'flight-regions-m.webp','WEBP',quality=86,method=6)
meta={'desktop':'img/atlas/flight-regions.webp?v='+hashlib.sha256((D/'flight-regions.webp').read_bytes()).hexdigest()[:10],'mobile':'img/atlas/flight-regions-m.webp?v='+hashlib.sha256((D/'flight-regions-m.webp').read_bytes()).hexdigest()[:10],'bounds':bounds,'projection':'Atlas Albers, x and -y/sqrt(2), kilometers','towns':{t['town_id']:[t['center']['x'],-t['center']['y']/math.sqrt(2)] for t in landings['towns']},'sources':used,'attribution':back['attribution']}
(D/'flight-regions.json').write_text(json.dumps(meta,indent=2)+'\n')
print('Exported',width,height,'desktop bytes',(D/'flight-regions.webp').stat().st_size,'phone bytes',(D/'flight-regions-m.webp').stat().st_size)
