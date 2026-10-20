"""Publish all verified landing exports to the static site's walkthrough.
Run after finalize_landings.py. No geometry, camera or style changes.
Missing images, unverified cameras and unexpected dimensions fail the build.
"""
from pathlib import Path
import json, hashlib, re, shutil, html
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
A=ROOT/'atlas'

def sync():
 index=json.loads((A/'landing/index.json').read_text())
 catalog=json.loads((A/'regions/catalog.json').read_text())
 towns={t['town_id']:t for t in index['towns']}
 assert {t['id'] for t in catalog['towns']} <= towns.keys(), 'Catalog towns missing landing entries'
 manifest={};images=[]
 for tid,t in towns.items():
  views=t['views'];town=views['town'];street=views['street']
  for v in [town,street]:
   assert v.get('capture_verified'),(tid,'unverified capture')
   for key,size in [('desktop',(1600,1000)),('mobile',(800,1000))]:
    source=A/'landing'/v[key]
    with Image.open(source) as im:assert im.size==size,(source,im.size)
    dest=ROOT/'img/atlas'/v[key]
    if not dest.exists() or source.read_bytes()!=dest.read_bytes():shutil.copyfile(source,dest)
    images.append(str(dest.relative_to(ROOT)))
  h=t['hero'];c=town['camera'];m=town['mobile_camera'];cc=street['camera'];cm=street['mobile_camera']
  manifest[tid]={'lon':h['lon'],'lat':h['lat'],'hw':c['right'],'hh':c['top'],'mhw':m['right'],'mhh':m['top'],'d':[[d['name'],d['lon'],d['lat']] for d in t['districts']],'c':[[d['name'],d['type'],d['lon'],d['lat']] for d in town.get('callouts',[])],'chw':cc['right'],'chh':cc['top'],'cmhw':cm['right'],'cmhh':cm['top'],'cc':[[d['name'],d['type'],d['lon'],d['lat']] for d in street.get('callouts',[])]}
 entry_page=ROOT/'find-your-mile.html';old=re.search(r'assets/(app\.[a-f0-9]+\.js)',entry_page.read_text())[1]
 source=(ROOT/'assets'/old).read_text();start=source.index('const LANDING=')+len('const LANDING=')
 # The following declaration starts after the literal; retain its comma/semicolon.
 depth=0;quote=None;escape=False;end=None
 for i in range(start,len(source)):
  ch=source[i]
  if quote:
   if escape:escape=False
   elif ch=='\\':escape=True
   elif ch==quote:quote=None
  elif ch in ['"',"'",'`']:quote=ch
  elif ch=='{':depth+=1
  elif ch=='}':
   depth-=1
   if depth==0:end=i+1;break
 assert end
 source=source[:start]+json.dumps(manifest,separators=(',',':'))+source[end:]
 name='app.'+hashlib.sha256(source.encode()).hexdigest()[:10]+'.js'
 (ROOT/'assets'/name).write_text(source)
 for p in ROOT.rglob('*.html'):
  if A in p.parents or '.git' in p.parts:continue
  text=p.read_text();updated=text.replace(old,name)
  if text!=updated:p.write_text(updated)
 report={'towns':len(manifest),'catalog_towns':len(catalog['towns']),'missing':[],'images':len(images),'asset':name,'town_ids':sorted(manifest),'total_image_bytes':sum((ROOT/f).stat().st_size for f in images)}
 (A/'landing/walkthrough-coverage.json').write_text(json.dumps(report,indent=2)+'\n')
 figures=[]
 for tid,t in towns.items():
  name=html.escape(t['name'])
  figures.append(f'<article id="{tid}"><h2>{name}</h2><p>{html.escape(t["hero"]["reason"])}</p><div><a href="{t["desktop"]}"><img loading="lazy" src="{t["desktop"]}" alt="{name} town aerial"></a><a href="{t["close_desktop"]}"><img loading="lazy" src="{t["close_desktop"]}" alt="{name} close aerial"></a></div><p><a href="{t["mobile"]}">Town phone</a> · <a href="{t["close_mobile"]}">Close phone</a></p></article>')
 (A/'landing/walkthrough-review.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>All town aerials</title><style>body{font:16px system-ui;background:#f3eddc;color:#345047;margin:24px}main{max-width:1500px;margin:auto}article{padding:20px;background:#fffaf0;margin:24px 0}article div{display:grid;grid-template-columns:1fr 1fr;gap:12px}img{width:100%;display:block}a{color:inherit}@media(max-width:700px){article div{grid-template-columns:1fr}}</style><main><h1>'+str(len(towns))+' connected town aerials</h1><p>Town and close views, with desktop and phone exports. © OpenStreetMap contributors, ODbL. Canopy: ESA WorldCover 2021 CC BY 4.0 and Tampa/USF 2021 where used. Geometry and style are unchanged.</p>'+''.join(figures)+'</main></html>')
 print(json.dumps(report,indent=2))
if __name__=='__main__':sync()
