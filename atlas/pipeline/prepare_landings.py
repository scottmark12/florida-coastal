"""Prepare two hero-centered landing views, preserving all original manifest fields.
Run before browser capture; final images are verified with check_landings.py.
"""
import json,copy,math,shutil
from pathlib import Path
from urllib.parse import urlencode
P=Path(__file__).resolve().parent;A=P.parent;path=A/'landing/index.json';index=json.load(path.open());queue=[]
small={'cortez':4,'chokoloskee':3.5,'everglades-city':3.5,'st-marks':3.5,'st-teresa':3.5,'carrabelle':4,'apalachicola':4,'mexico-beach':4,'st-george-island':4,'bradenton-beach':4,'madeira-beach':4,'treasure-island':4,'indian-rocks-beach':4,'keywest':4,'cedar-key':3}
large={'tampa':8,'miami':8,'jacksonville':8,'sarasota':6,'st-petersburg':6,'pensacola':6,'pcb':6,'destin':5.5,'pensacola-beach':5.5,'30a':5}
for t in index['towns']:
 tid=t['town_id'];old=copy.deepcopy(t)
 if 'close_camera' not in t:
  t['close_camera']=old['camera'];t['close_mobile_camera']=old['mobile_camera'];t['close_span']=old['span'];t['close_callouts']=copy.deepcopy(old.get('callouts',[]))
  for key,suffix in [('desktop','-close.webp'),('mobile','-close-m.webp')]:shutil.copy2(A/'landing'/t[key],A/'landing'/(tid+suffix))
 t['close_desktop']=tid+'-close.webp';t['close_mobile']=tid+'-close-m.webp'
 t['span']=small.get(tid,large.get(tid,5.5));t['views']={}
 for key,span,desktop,mobile in [('town',t['span'],t['desktop'],t['mobile']),('street',t['close_span'],t['close_desktop'],t['close_mobile'])]:
  x,y=t['center']['x'],t['center']['y'];height=span/1.6
  camera={'position':[x,height*1.25,-y+height*1.25],'target':[x,0,-y],'left':-span/2,'right':span/2,'top':height/2,'bottom':-height/2,'near':.0001,'far':3500,'projection':'orthographic','mapUnits':'kilometers','tiltDegrees':45}
  phone=copy.deepcopy(camera);phone['left']/=2;phone['right']/=2
  # Existing callouts were verified inside the tighter street crops; widened town views retain them.
  calls=copy.deepcopy(t['close_callouts'])
  url='../explore_coast.html?'+urlencode({'view':tid,'level':'town','district':t.get('district',''),'landing':1,'cx':x,'cy':y,'span':span})
  t['views'][key]={'desktop':desktop,'mobile':mobile,'span':span,'camera':camera,'mobile_camera':phone,'callouts':calls,'mobile_callouts':calls,'render_url':url,'mobile_render_url':url.replace('span='+str(span),'span='+str(span/2))}
  queue.append({'town_id':tid,'view':key,'url':url,'desktop':desktop,'mobile':mobile,'camera':camera})
 t['camera']=t['views']['town']['camera'];t['mobile_camera']=t['views']['town']['mobile_camera'];t['render_url']=t['views']['town']['render_url'];t['callouts']=t['views']['town']['callouts'];t['mobile_render_url']=t['views']['town']['mobile_render_url'];t['close_render_url']=t['views']['street']['render_url'];t['close_mobile_render_url']=t['views']['street']['mobile_render_url']
index['landing_schema_version']=2;index['zoom_description']='Town is the wider hero-centered context view. Street retains the approved close framing. Phone is a centered half-width crop of the same camera.'
path.write_text(json.dumps(index,indent=2)+'\n');(A/'landing/capture-queue.json').write_text(json.dumps(queue,indent=2)+'\n')
print('Prepared',len(index['towns']),'towns;',len(queue),'views')
