"""Publish only captured repair views; assert locked fields and Dania exception."""
import json,hashlib,copy,html,shutil,subprocess
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
from fixed_landings import A,P
assert not subprocess.check_output(['git','diff','--name-only','HEAD','--','atlas/regions/landing-water','atlas/pipeline/landing-water-palette.json'],cwd=A.parent).strip(),'Protected water assets changed'
O=P/'outputs/landing-fix';old=json.load(open(O/'original-index.json'));index=json.load(open(A/'landing/index.json'));previous={t['town_id']:t for t in old['towns']};changes=[]
for t in index['towns']:
 before=previous[t['town_id']]
 for key in ['hero','span','close_span','callouts','close_callouts']:assert t[key]==before[key],(t['town_id'],key)
 for key,v in t['views'].items():
  for f in ['span','callouts','mobile_callouts']:assert v[f]==before['views'][key][f],(t['town_id'],key,f)
  expected=copy.deepcopy(before['views'][key]['camera'])
  if t['town_id']=='dania-beach':expected['target'][2]+=.5;expected['position'][2]+=.5
  assert v['camera']==expected,(t['town_id'],key)
  file=O/'captures'/(t['town_id']+'-'+key+'.png')
  if not file.exists():continue
  actual=json.load(open(file.with_suffix('.json')));assert not actual['errors'] and actual['viewport']=='1600×1000'
  for f in ['position','target','left','right','top','bottom','tiltDegrees']:
   x,y=actual['camera'][f],v['camera'][f];assert (max(abs(a-b) for a,b in zip(x,y))<1e-7 if isinstance(x,list) else abs(x-y)<1e-7),(t['town_id'],key,f)
  im=Image.open(file).convert('RGB');assert im.size==(1600,1000);im.save(A/'landing'/v['desktop'],'WEBP',quality=92,method=6);im.crop((400,0,1200,1000)).save(A/'landing'/v['mobile'],'WEBP',quality=92,method=6);v['capture_sha256']=hashlib.sha256(file.read_bytes()).hexdigest();v['capture_verified']=True;changes.append({'town_id':t['town_id'],'view':key,'files':[v['desktop'],v['mobile']]})
(A/'landing/index.json').write_text(json.dumps(index,indent=2)+'\n');proof={'towns_checked':167,'heroes_callouts_spans_unchanged':True,'water_palette_unchanged':True,'camera_locked_towns':166,'camera_exceptions':[{'town_id':'dania-beach','shift_south_m':500,'reason':'User-authorized port/airport framing exception; public beach hero unchanged.'}],'captured_views':changes};(A/'landing/qa/fix-invariants.json').write_text(json.dumps(proof,indent=2)+'\n')
focus=[('juno-beach','town','Land and OSM coverage extended west'),('west-palm-beach','town','Land and OSM coverage extended west'),('30a','town','Irregular scattered forest crowns; no repeated grove pattern'),('new-port-richey','street','Sourced homes, canopy and streets restored'),('dania-beach','street','Mangrove canopy restored; port-side framing moved 500 m south')]
font=ImageFont.truetype('Arial.ttf',18);small=ImageFont.truetype('Arial.ttf',14);rows=[];cards=[]
for tid,key,reason in focus:
 t=next(t for t in index['towns'] if t['town_id']==tid);v=t['views'][key];oldfile=O/'before'/v['desktop'];before='fix-before-'+tid+'.webp';shutil.copy(oldfile,A/'landing/qa'/before);row=Image.new('RGB',(1000,400),'#f5f0e3');d=ImageDraw.Draw(row);d.text((10,8),t['name']+' · '+('Town' if key=='town' else 'Close')+f' {v["span"]:g} km',font=font,fill='#294a43')
 for n,f in enumerate([oldfile,A/'landing'/v['desktop']]):row.paste(Image.open(f).convert('RGB').resize((480,300),Image.Resampling.LANCZOS),(10+n*500,35));d.text((10+n*500,340),'BEFORE' if n==0 else 'AFTER',font=small,fill='#294a43')
 d.text((10,367),reason,font=small,fill='#294a43');rows.append(row);cards.append(f'<article id="{tid}"><h2>{html.escape(t["name"])}</h2><p>{html.escape(reason)}</p><div><figure><img src="qa/{before}" alt="Before {tid}"><figcaption>Before</figcaption></figure><figure><img src="{v["desktop"]}" alt="After {tid}"><figcaption>After · <a href="{v["mobile"]}">phone crop</a></figcaption></figure></div></article>')
sheet=Image.new('RGB',(1000,400*len(rows)),'#f5f0e3')
for n,row in enumerate(rows):sheet.paste(row,(0,n*400))
sheet.save(A/'landing/qa/fix-contact.jpg',quality=90,optimize=True)
(A/'landing/fix-review.html').write_text('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Landing fixes · five towns</title><style>body{font:16px system-ui;background:#f5f0e3;color:#294a43;margin:24px}main{max-width:1500px;margin:auto}article{background:#fffdf5;padding:16px;margin:24px 0}article div{display:grid;grid-template-columns:1fr 1fr;gap:12px}figure{margin:0}img{width:100%;aspect-ratio:8/5}a{color:inherit}@media(max-width:650px){body{margin:8px}article{padding:8px}article div{grid-template-columns:1fr}}</style><main><h1>Landing fixes</h1><p>The four numbered fixes include five towns. Heroes, callouts, spans and water palette are unchanged. Only Dania uses the authorized port-side framing exception: 500 m south, at the same zoom.</p><p><a href="qa/fix-contact.jpg">Contact sheet</a> · <a href="qa/data-extents.json">All 167 towns: extent QA</a> · <a href="qa/texture-blocks.json">Canopy pattern QA</a> · <a href="qa/fix-invariants.json">Locked-field proof</a></p><p>The extent audit also found and repaired edges in Jupiter, Lake Park and New Smyrna Beach.</p>'+''.join(cards)+'</main>')
print('Published',len(changes)*2,'images;',len(focus),'towns on contact sheet')
