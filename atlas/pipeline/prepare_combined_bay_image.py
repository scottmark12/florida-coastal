"""Reuse the approved Sarasota/full-bay image for the unified 37-town region.
Extend only the distant image margins for wide screens; town pixels retain their
geographic projection. No Town models, coastlines or building rules are changed.
Input: the calibrated Sarasota/full-bay PNG and JSON in outputs/region-images.
"""
from pathlib import Path
import json,copy
from PIL import Image
P=Path(__file__).resolve().parent;D=P/'outputs/region-images'
im=Image.open(D/'sarasota-bradenton.png').convert('RGB');im=im.resize((2048,2048),Image.Resampling.LANCZOS);out=Image.new('RGB',(4096,4096))
# Clamp the background at distant margins, outside the towns' source frame.
out.paste(im.crop((0,0,2048,1)).resize((2048,1024)),(1024,0))
out.paste(im.crop((0,2047,2048,2048)).resize((2048,1024)),(1024,3072));out.paste(im,(1024,1024))
sea=max(im.crop((0,0,1,2048)).getcolors(4096),key=lambda item:item[0])[1];land=max(im.crop((2047,0,2048,2048)).getcolors(4096),key=lambda item:item[0])[1];out.paste(sea,(0,0,1024,4096));out.paste(land,(3072,0,4096,4096));out.save(D/'tampa-bay.png')
m=copy.deepcopy(json.load(open(D/'sarasota-bradenton.json')));c=m['camera']
for k in ['left','right','top','bottom','near','far']:c[k]*=2
h=c['top']-c['bottom'];c['position']=[c['target'][0],h*1.25,c['target'][2]+h*1.25];m['responsive_background_margin']=True;(D/'tampa-bay.json').write_text(json.dumps(m,indent=2)+'\n')
