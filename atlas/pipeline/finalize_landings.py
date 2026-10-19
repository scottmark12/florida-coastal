"""Convert verified browser PNG captures into the four landing WebPs and build the gallery.
Capture queue comes from prepare_landings.py. PNGs and actual DOM cameras must be
saved in pipeline/outputs/landing-captures/<id>-<view>.png/.json using the shared viewer.
"""
from pathlib import Path
from PIL import Image
import json,html
from urllib.parse import urlsplit,urlunsplit,parse_qsl,urlencode
P=Path(__file__).resolve().parent;A=P.parent;index=json.load(open(A/'landing/index.json'));captures=P/'outputs/landing-captures';figures=[]
for t in index['towns']:
 for key,v in t['views'].items():
  stem=t['town_id']+'-'+key
  with Image.open(captures/(stem+'.png')) as im:
   assert im.size==(1600,1000),(stem,im.size)
   im.convert('RGB').save(A/'landing'/v['desktop'],'WEBP',quality=92,method=6)
   im.crop((400,0,1200,1000)).convert('RGB').save(A/'landing'/v['mobile'],'WEBP',quality=92,method=6)
  actual=json.load(open(captures/(stem+'.json')))
  assert not actual['errors'],(stem,actual['errors'])
  assert actual['viewport']=='1600×1000',(stem,actual['viewport'])
  v['camera']=actual['camera'];phone=dict(v['camera']);phone['left']/=2;phone['right']/=2;v['mobile_camera']=phone
  parts=urlsplit(v['render_url']);params=dict(parse_qsl(parts.query));params['span']=str(v['span']/2);v['mobile_render_url']=urlunsplit((parts.scheme,parts.netloc,parts.path,urlencode(params),parts.fragment))
  v['capture_verified']=True
 t['camera']=t['views']['town']['camera'];t['mobile_camera']=t['views']['town']['mobile_camera'];t['close_camera']=t['views']['street']['camera'];t['close_mobile_camera']=t['views']['street']['mobile_camera']
 t['mobile_render_url']=t['views']['town']['mobile_render_url'];t['close_render_url']=t['views']['street']['render_url'];t['close_mobile_render_url']=t['views']['street']['mobile_render_url']
 t['status']='Both landing zooms rendered and camera/size/callout checked; physical-phone speed unverified'
 name=html.escape(t['name']);reason=html.escape(t['hero']['reason']);tid=t['town_id']
 figures.append(f'<article id="{tid}"><h2>{name}</h2><p>{reason}</p><div class="pair"><figure><a href="{t["desktop"]}"><img loading="lazy" src="{t["desktop"]}" alt="{name} town context"></a><figcaption>Town · {t["span"]:g} km · <a href="{t["mobile"]}">phone</a></figcaption></figure><figure><a href="{t["close_desktop"]}"><img loading="lazy" src="{t["close_desktop"]}" alt="{name} close street view"></a><figcaption>Street · {t["close_span"]:g} km · <a href="{t["close_mobile"]}">phone</a></figcaption></figure></div></article>')
(A/'landing/index.json').write_text(json.dumps(index,indent=2)+'\n')
(A/'landing/review.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Florida Coastal · town and street landing exports</title><style>body{font:16px system-ui;background:#f3eddc;color:#345047;margin:24px}main{max-width:1500px;margin:auto}article{background:#fffaf0;padding:20px;margin:24px 0}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}img{width:100%;display:block;aspect-ratio:8/5;object-fit:contain}figure{margin:0}a{color:inherit}figcaption{padding:12px 0}@media(max-width:700px){.pair{grid-template-columns:1fr}}</style><main><h1>Town & street landing exports</h1><p>'+str(len(index['towns']))+' towns · two hero-centered zooms · 1600×1000 desktop and 800×1000 phone crops.</p><p><a href="index.json">Cameras, hero points and visible callouts</a> · <a href="validation.json">Validation</a> · <a href="../regions/bridges-report.json">OSM bridge coverage</a></p>'+''.join(figures)+'<p>© OpenStreetMap contributors, ODbL. Canopy: ESA WorldCover 2021 CC BY 4.0 and Tampa/USF 2021 where used. Illustrated bridge piers and untagged building heights are estimates.</p></main></html>')
gallery=(A/'landing/review.html').read_text();catalog=json.load(open(A/'regions/catalog.json'));emerald=set(next(r['towns'] for r in catalog['regions'] if r['id']=='emerald-coast'));start=gallery.index('<article');end=gallery.rindex('</article>')+len('</article>');focused=''.join(fig for t,fig in zip(index['towns'],figures) if t['town_id'] in emerald);(A/'landing/emerald-review.html').write_text((gallery[:start]+focused+gallery[end:]).replace(str(len(index['towns']))+' towns · two hero-centered zooms','Emerald Coast · '+str(len(emerald))+' towns · two hero-centered zooms'))
print('Wrote',len(index['towns'])*4,'WebP images')

nature=set(next(r['towns'] for r in catalog['regions'] if r['id']=='nature-coast'));focused=''.join(fig for t,fig in zip(index['towns'],figures) if t['town_id'] in nature);(A/'landing/nature-review.html').write_text((gallery[:start]+focused+gallery[end:]).replace(str(len(index['towns']))+' towns · two hero-centered zooms','Nature Coast · '+str(len(nature))+' towns · two hero-centered zooms'))
