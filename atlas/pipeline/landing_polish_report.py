"""Camera-lock proof and one contact-sheet row per town after landing polish."""
import json,hashlib,math
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
from fixed_landings import A,OUT

def camera_record(t):
 return {**{k:t[k] for k in ['town_id','hero','center','span','close_span','camera','mobile_camera','close_camera','close_mobile_camera']},'views':{k:{f:v[f] for f in ['camera','mobile_camera','span']} for k,v in t['views'].items()}}
def run():
 before=json.load(open(OUT/'polish-original-index.json'));after=json.load(open(A/'landing/index.json'));water=json.load(open(A/'landing/qa/water-palette.json'));w={r['file']:r for r in water['rows']};rows=[]
 old=[camera_record(t) for t in before['towns']];new=[camera_record(t) for t in after['towns']];assert old==new,'Camera, span or hero changed'
 digest=lambda v:hashlib.sha256(json.dumps(v,sort_keys=True,separators=(',',':')).encode()).hexdigest()
 proof={'towns':len(new),'camera_views':len(new)*2,'unchanged':True,'before_sha256':digest(old),'after_sha256':digest(new),'fields':['hero','center','span','close_span','views.*.camera','views.*.mobile_camera','views.*.span']}
 (A/'landing/qa/camera-lock.json').write_text(json.dumps(proof,indent=2)+'\n')
 try:font=ImageFont.truetype('Arial.ttf',16);small=ImageFont.truetype('Arial.ttf',13)
 except OSError:font=small=ImageFont.load_default()
 for t in after['towns']:
  row=Image.new('RGB',(1000,410),'#f5f0e3');d=ImageDraw.Draw(row);d.text((12,8),t['name']+' | cameras + hero unchanged',font=font,fill='#294a43')
  for n,k in enumerate(['town','street']):
   v=t['views'][k];im=Image.open(A/'landing'/v['desktop']).convert('RGB');row.paste(im.resize((480,300),Image.Resampling.LANCZOS),(10+n*500,35));q=w[v['desktop']];m=w[v['mobile']];status='PASS' if all(z['status']!='FAIL' for z in [q,m]) else 'FAIL';x=10+n*500
   d.text((x,340),f'{"Town" if k=="town" else "Close"} {v["span"]:g} km / phone {v["span"]/2:g} | {len(v["callouts"])} named callouts',font=small,fill='#294a43')
   d.text((x,359),f'Water palette {status}: outside {q["outside_palette_pct"]:.2f}% / phone {m["outside_palette_pct"]:.2f}%',font=small,fill='#294a43' if status=='PASS' else '#a13d20')
   if not v['callouts']:d.text((x,378),'No named OSM callout in fixed frame; omitted',font=small,fill='#a13d20')
  if t['qa']['flags']:d.text((10,396),'Land coverage exception: '+', '.join(t['qa']['flags']),font=small,fill='#a13d20')
  rows.append(row)
 folder=A/'landing/qa';links=[]
 for start in range(0,len(rows),12):
  group=rows[start:start+12];page=Image.new('RGB',(1000,410*len(group)),'#f5f0e3')
  for n,row in enumerate(group):page.paste(row,(0,n*410))
  name=f'contact-{start//12+1:02}.jpg';page.save(folder/name,quality=88,optimize=True);links.append(f'<a href="qa/{name}">Rows {start+1}–{start+len(group)}</a>')
 full=Image.new('RGB',(900,369*len(rows)),'#f5f0e3')
 for n,row in enumerate(rows):full.paste(row.resize((900,369),Image.Resampling.LANCZOS),(0,n*369))
 full.save(folder/'all-towns.jpg',quality=84,optimize=True)
 for file in ['fixed-camera-review.html','review.html']:
  p=A/'landing'/file;s=p.read_text();
  if '<strong>Polish pass:</strong>' in s:continue
  pos=s.index('<p>167 towns');s=s[:pos]+'<p><strong>Polish pass:</strong> 668 images re-rendered. Cameras, spans and heroes unchanged. One teal water recipe; no generic callout names. <a href="qa/water-palette.json">Water samples</a> · <a href="qa/callout-name-audit.json">Callout audit</a> · <a href="qa/camera-lock.json">Camera lock proof</a></p>'+s[pos:];p.write_text(s)
 print(json.dumps(proof))
if __name__=='__main__':run()
