"""Fixed camera landing preflight. Never changes art, geometry, light or tilt.
Requires Pillow, shapely, pyproj, pyshp. Raw input paths stay outside published data.
Use: python fixed_landings.py plan; browser capture queue; python fixed_landings.py finish.
"""
import json,math,gzip,copy,csv,html,sys,re,hashlib,os
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urlencode
from functools import lru_cache
from shapely.geometry import shape,box,Point,Polygon,LineString
from shapely.ops import transform,unary_union
from pyproj import Transformer
from PIL import Image,ImageDraw,ImageFont
import shapefile
P=Path(__file__).resolve().parent; A=P.parent; ROOT=A.parent; WORK=Path(os.environ.get('ATLAS_SOURCE_WORK',str(ROOT.parent.parent/'work')))
OUT=P/'outputs/fixed-landings';OUT.mkdir(parents=True,exist_ok=True)
PROJ='+proj=aea +lat_1=24 +lat_2=31.5 +lat_0=24 +lon_0=-84 +datum=NAD83 +units=m +no_defs'
TR=Transformer.from_crs(4326,PROJ,always_xy=True); INV=Transformer.from_crs(PROJ,4326,always_xy=True)
TOWN=5.;CLOSE=2.;BIG=7.; BIG_IDS={'miami','tampa','jacksonville','st-petersburg','ftl','west-palm-beach','fort-myers','orlando'}
OVERRIDES=json.load(open(P/'fixed-landing-overrides.json'))
CAT=json.load(open(A/'regions/catalog.json')); CATS={t['id']:t for t in CAT['towns']}
REG=json.load(open(A/'regions/package-registry.json'))
KNOWN_ISLANDS={'captiva','sanibel-island','pensacola-beach','navarre-beach','perdido-key','okaloosa-island','islamorada','key-largo','keywest','clearwaterbeach','indian-rocks-beach','indian-shores','belleair-beach','redington-shores','north-redington-beach','redington-beach','madeira-beach','treasure-island','st-pete-beach','tierra-verde','ami','longboat','bradenton-beach','siesta-key','hutchinson-island','st-george-island','marco-island','fort-myers-beach','matlacha','chokoloskee','cedarkey','palm-beach','palm-beach-shores','highland-beach','indian-river-shores','jensen-beach','melbourne-beach','indialantic','satellite-beach','indian-harbour-beach','daytona-beach-shores','vilano-beach','beverly-beach','crescent-beach','ormond-by-the-sea','bal-harbour','sunny-isles-beach','southbeach'}
def project(x,y,z=None):
 x,y=TR.transform(x,y)
 try:return [v/1000 for v in x],[v/1000 for v in y]
 except TypeError:return x/1000,y/1000
def xy(q):return project(q['lon'],q['lat'])
def norm(s):return re.sub('[^a-z0-9]','',s.lower())
@lru_cache(None)
def source_dir(tid):
 if tid=='30a':return WORK/'30a_finish/source'
 pkg=REG.get(tid,'').removeprefix('packages/').strip('/')
 d=P/'work/coastal_pipeline/v4'/pkg
 if pkg=='miami':return P/'work/coastal_pipeline/v3/miami'
 return d
@lru_cache(2)
def raw_land(path):return shape(json.load(open(path)))
def local_land(tid,h):
 d=source_dir(tid);file=d/'land.json'
 if tid=='30a':
  g=json.load(open(d/'geometry.json'));return shape(g['land']),str(d/'geometry.json')
 if (d.parent/'land.json').exists():file=d.parent/'land.json'
 if (d/'land-extended.json').exists():file=d/'land-extended.json'
 if not file.exists():file=d.parent/'land.json'
 if not file.exists():raise RuntimeError('Missing land '+str(d))
 ll=raw_land(str(file));lon,lat=h['lon'],h['lat']
 # Large package geometries are clipped before projected intersection work.
 g=transform(project,ll.intersection(box(lon-.12,lat-.12,lon+.12,lat+.12)))
 return g,str(file)
def region_source(tid):
 d=source_dir(tid)
 if tid!='30a':
  relative=d.relative_to(P/'work')
  original=WORK/relative
  if original.exists():d=original
 if not (d/'geography.json.gz').exists() and (d.parent/'geography.json.gz').exists():d=d.parent
 return d
@lru_cache(1)
def elements(path):
 d=Path(path); es={}
 for file in sorted(d.glob('*.json.gz')):
  if not (file.name.startswith(('geography','cover','district-'))):continue
  try:
   data=json.load(gzip.open(file,'rt'))
   for e in data.get('elements',[]):es[e['type'],e['id']]=e
  except (ValueError,AttributeError):pass
 if d.name=='source' or d.name=='miami':
  for name in ['map-data.json','places.json','roads.json','bay-access.json','osm.json','extension.json']:
   try:
    data=json.load(open(d/name))
    for e in data.get('elements',[]):es[e['type'],e['id']]=e
   except (ValueError,FileNotFoundError,AttributeError):pass
 return list(es.values())
def feature(e,h):
 tags=e.get('tags',{});name=tags.get('name') or tags.get('official_name')
 if tags.get('access') in ('no','private','customers'):return
 typ=None;public=False
 if tags.get('leisure') in ('park','nature_reserve') or (tags.get('leisure')=='garden' and tags.get('access') in ('yes','public')):typ='park';public=True
 if tags.get('leisure')=='marina' or tags.get('leisure')=='slipway' or tags.get('amenity')=='boat_ramp':typ='boating';public=tags.get('access') in ('yes','public')
 if tags.get('natural')=='beach' or tags.get('tourism')=='beach_resort' or tags.get('highway')=='beach_access':typ='beach';public=tags.get('access')!='private'
 if tags.get('man_made')=='pier':typ='landmark';public=True
 if tags.get('highway') in ('pedestrian','living_street','residential','tertiary','secondary','primary','unclassified','footway','path'):
  typ='walkable';public=True
 if tags.get('historic') in ('monument','memorial') or tags.get('tourism') in ('attraction','museum','viewpoint'):typ=typ or 'landmark';public=tags.get('access') in ('yes','public')
 if not typ:return
 geo=e.get('geometry') or next((m['geometry'] for m in e.get('members',[]) if m.get('role')=='outer' and m.get('geometry')),[])
 if e['type']=='node':
  if abs(e['lon']-h['lon'])>.12 or abs(e['lat']-h['lat'])>.10:return
 elif geo and not any(abs(p['lon']-h['lon'])<.12 and abs(p['lat']-h['lat'])<.10 for p in geo):return
 if not name:
  if typ=='walkable' or typ=='landmark':return
  name={'park':'Mapped public park','beach':'Mapped beach access','boating':'Mapped marina or boat ramp'}[typ]
 try:
  if e['type']=='node':p=Point(e['lon'],e['lat'])
  else:
   gs=e.get('geometry') or next((m['geometry'] for m in e.get('members',[]) if m.get('role')=='outer' and m.get('geometry')),None)
   if not gs:return
   pts=[(p['lon'],p['lat']) for p in gs]
   if len(pts)<2:return
   line=LineString(pts)
   if typ=='walkable':p=line.interpolate(line.project(Point(h['lon'],h['lat'])))
   elif pts[0]==pts[-1] and len(pts)>3:p=Polygon(pts).buffer(0).representative_point()
   elif typ=='landmark' and tags.get('man_made')=='pier':p=Point(pts[0])
   else:p=line.interpolate(.5,normalized=True)
  q={'name':name,'type':typ,'lon':p.x,'lat':p.y,'source':f'https://www.openstreetmap.org/{e["type"]}/{e["id"]}','public':public}
  return q
 except (ValueError,IndexError):return
@lru_cache(None)
def boundaries():
 file=WORK/'coast_fit/places/cb_2025_12_place_500k.shp';r=shapefile.Reader(str(file));return [(v.record['NAME'],shape(v.shape.__geo_interface__).buffer(0),v.record['GEOID']) for v in r.iterShapeRecords()]
ALIASES={'30a':'Santa Rosa Beach','ami':'Anna Maria','longboat':'Longboat Key','clearwaterbeach':'Clearwater','southbeach':'Miami Beach','ftl':'Fort Lauderdale','delray':'Delray Beach','fortpierce':'Fort Pierce','nsb':'New Smyrna Beach','flagler':'Flagler Beach','staug':'St. Augustine','jaxbeach':'Jacksonville Beach','fernandina':'Fernandina Beach','pcb':'Panama City Beach','keywest':'Key West','cedarkey':'Cedar Key','sanibel-island':'Sanibel','marco-island':'Marco Island','hallandale':'Hallandale Beach','cocoa-village':'Cocoa','everglades-city':'Everglades','captiva':'Captiva','islamorada':'Islamorada, Village of Islands','hutchinson-island':'Hutchinson Island South'}
def town_boundary(t):
 tid=t['town_id'];name=ALIASES.get(tid,t['name'].split('(')[0].strip())
 match=next(((g,n,gid) for n,g,gid in boundaries() if norm(n)==norm(name)),None)
 if match:return match
 return None

def camera(cx,cy,span):
 height=span/1.6
 return {'position':[cx,height*1.25,-cy+height*1.25],'target':[cx,0,-cy],'left':-span/2,'right':span/2,'top':height/2,'bottom':-height/2,'near':.0001,'far':3500,'projection':'orthographic','mapUnits':'kilometers','tiltDegrees':45}
def fraction(land,cx,cy,span,mobile=False):
 w=span*(.5 if mobile else 1);h=span/1.6*math.sqrt(2)
 return land.intersection(box(cx-w/2,cy-h/2,cx+w/2,cy+h/2)).area/(w*h)
def visible(q,cx,cy,span,mobile=False):
 x,y=xy(q);w=span*(.5 if mobile else 1);height=span/1.6*math.sqrt(2)
 vertical_margin=.08*(.8 if mobile else 1.6)
 return abs(x-cx)<=w*.42 and abs(y-cy)<=height*(.5-vertical_margin)

def plan(only=None):
 index=json.load(open((OUT/'planned-index.json') if only else A/'landing/index.json'));queue=[];summary=[]
 (OUT/'original-index.json').write_text(json.dumps(index,indent=2)+'\n') if not (OUT/'original-index.json').exists() else None
 for t in index['towns']:
  if only and t['town_id'] not in only:
   queue.extend(q for q in json.load(open(OUT/'capture-queue.json')) if q['town_id']==t['town_id']);summary.append({'town_id':t['town_id'],'frame_class':t['frame_class'],**t['qa']});continue
  tid=t['town_id'];h=t['hero'];h.update(OVERRIDES['heroes'].get(tid,{}));hx,hy=xy(h);limits=town_boundary(t);land,src=local_land(tid,h)
  es=elements(str(region_source(tid)));features=[]
  for e in es:
   q=feature(e,h)
   if q and abs(q['lon']-h['lon'])<.08 and abs(q['lat']-h['lat'])<.08:features.append(q)
  if tid=='ozello':
   features.append({'name':'Ozello Fishing Pier','type':'landmark','lon':-82.65639344285715,'lat':28.8243675,'source':'https://www.openstreetmap.org/way/1319936816','public':True})
  if tid in OVERRIDES['heroes']:
   features.append({**OVERRIDES['heroes'][tid],'type':'landmark','public':True})
  # Preserve approved public hero if it corresponds to a mapped public place.
  public=[q for q in features if q['public'] and (not limits or limits[0].covers(Point(q['lon'],q['lat'])))]
  if tid in OVERRIDES['heroes']:public=[q for q in public if q['source']==OVERRIDES['heroes'][tid]['source']]
  public.sort(key=lambda q:math.hypot(xy(q)[0]-hx,xy(q)[1]-hy)+(0 if q['type'] in ['park','walkable','beach'] else .08))
  hero_source=None
  if public:
   q=public[0];distance=math.hypot(xy(q)[0]-hx,xy(q)[1]-hy)
   if distance<.8 or not h.get('source') or (limits and not limits[0].covers(Point(h['lon'],h['lat']))):
    h.update(lon=q['lon'],lat=q['lat'],source=q['source'],name=q['name']);hx,hy=xy(h);hero_source=q['source']
  inside=bool(limits and limits[0].covers(Point(h['lon'],h['lat'])))
  # For named unincorporated localities with no Census place boundary, record
  # absence explicitly. Do not present a bounding box as a legal town limit.
  boundary_note=({'name':limits[1],'geoid':limits[2],'source':'https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html'} if limits else {'status':'No matching Census place boundary; source locality verification required'})
  if not limits and tid in OVERRIDES['localities']:
   evidence=copy.deepcopy(OVERRIDES['localities'][tid]);node=next((e for e in es if e['type']=='node' and e['id']==evidence.get('node')),None)
   if node:
    nx,ny=project(node['lon'],node['lat']);distance=math.hypot(hx-nx,hy-ny);assert distance<=evidence['radius_km'],(tid,distance)
    evidence.update(source='https://www.openstreetmap.org/node/'+str(node['id']),hero_distance_km=round(distance,4))
   else:assert evidence.get('public_feature_source')==h.get('source'),tid
   assert hero_source or h.get('source'),tid
   inside=True;boundary_note={'kind':'named_unincorporated_locality','note':'No municipal boundary exists for this named atlas locality. Reviewed public feature and OSM place/official locality reference establish locality membership; this is not polygon containment.',**evidence}
  t['hero_verification']={'boundary':boundary_note,'public_source':hero_source or h.get('source'),'inside_boundary':inside if limits else None,'inside_named_locality':inside if not limits else None}
  townspan=BIG if tid in BIG_IDS else TOWN
  narrow=tid in KNOWN_ISLANDS
  # Search shared target within CLOSE phone hero allowance, so all four
  # frames retain the same center and hero stays central at every zoom.
  search_land=land.simplify(.005,preserve_topology=True)
  def search(narrow):
   allowance=.3 if narrow else .2
   maxdx=CLOSE*.5*allowance;maxdy=CLOSE/1.6*math.sqrt(2)*allowance
   best=None
   for i in range(-6,7):
    for j in range(-6,7):
     cx=hx+i*maxdx/6;cy=hy+j*maxdy/6
     fs=[fraction(search_land,cx,cy,s,m) for s,m in [(townspan,False),(CLOSE,False),(townspan,True),(CLOSE,True)]]
     targets=[.25,.35,.25,.35] if narrow else [.55]*4
     deficit=sum(max(0,a-b) for a,b in zip(targets,fs))
     # Land first; favor the hero below center once land targets are met.
     score=(-deficit,min(fs),sum(fs),j*.001-abs(i)*.0001)
     if best is None or score>best[0]:best=(score,cx,cy,fs)
   return best
  best=search(narrow)
  if not narrow and min(best[3])<.55:
   # Discover comparable island/peninsula constraints using accurate water edges.
   narrow=True;best=search(True)
  _,cx,cy,fs=best;fs=[fraction(land,cx,cy,s,m) for s,m in [(townspan,False),(CLOSE,False),(townspan,True),(CLOSE,True)]];t['frame_class']='narrow_island' if narrow else 'standard'
  lon,lat=INV.transform(cx*1000,cy*1000);t['center'].update(x=cx,y=cy,lon=lon,lat=lat)
  t['span']=townspan;t['close_span']=CLOSE;t['views']={}
  flags=[]
  if not inside:flags.append('hero_boundary_unverified' if not limits else 'hero_outside_limits')
  if not (hero_source or h.get('source')):flags.append('hero_public_source_unverified')
  for key,span,desktop,mobile in [('town',townspan,t['desktop'],t['mobile']),('street',CLOSE,t['close_desktop'],t['close_mobile'])]:
   c=camera(cx,cy,span);phone=copy.deepcopy(c);phone['left']/=2;phone['right']/=2
   # Source-verified candidates only; real positions, no decorative invented POIs.
   choices=[q for q in features if visible(q,cx,cy,span) and visible(q,cx,cy,span,True)]
   choices.sort(key=lambda q:(0 if q['source']==hero_source else 1,0 if q['type'] in ('beach','boating','park') else 1,math.hypot(xy(q)[0]-hx,xy(q)[1]-hy)))
   calls=[];names=set();types=set()
   for q in choices:
    if norm(q['name']) in names:continue
    if q['type'] in types and len(calls)<3:continue
    calls.append({k:v for k,v in q.items() if k!='public'});names.add(norm(q['name']));types.add(q['type'])
    if len(calls)>=(4 if key=='town' else 3):break
   if len(calls)<(2 if key=='town' else 1):
    for q in choices:
     if norm(q['name']) in names:continue
     calls.append({k:v for k,v in q.items() if k!='public'});names.add(norm(q['name']))
     if len(calls)>=(2 if key=='town' else 1):break
   if len(calls)<(2 if key=='town' else 1):flags.append(key+'_callout_shortfall')
   url='../explore_coast.html?'+urlencode({'view':tid,'level':'town','district':t.get('district',''),'landing':1,'cx':cx,'cy':cy,'span':span})
   t['views'][key]={'desktop':desktop,'mobile':mobile,'span':span,'camera':c,'mobile_camera':phone,'callouts':calls,'mobile_callouts':copy.deepcopy(calls),'render_url':url,'mobile_render_url':url.replace('span='+str(span),'span='+str(span/2)),'capture_verified':False}
   queue.append({'town_id':tid,'view':key,'url':url,'camera':c,'desktop':desktop,'mobile':mobile})
  for key,prefix in [('town',''),('street','close_')]:
   v=t['views'][key]
   for f in ['camera','mobile_camera','callouts','render_url','mobile_render_url']:t[prefix+f]=v[f]
  targets=[.25,.35,.25,.35] if narrow else [.55]*4
  for name,f,minimum in zip(['town','close','town_mobile','close_mobile'],fs,targets):
   if f<minimum:flags.append(name+'_land_shortfall')
  t['qa']={'town_span_km':townspan,'close_span_km':CLOSE,'zoom_ratio':townspan/CLOSE,'water_pct_town':round((1-fs[0])*100,2),'water_pct_close':round((1-fs[1])*100,2),'hero_in_limits':inside,'callouts_town':len(t['callouts']),'callouts_close':len(t['close_callouts']),'water_pct_town_mobile':round((1-fs[2])*100,2),'water_pct_close_mobile':round((1-fs[3])*100,2),'flags':flags,'water_measurement':'Projected OSM land polygon fraction; sand included, before building occlusion','land_source':str(Path(src).relative_to(A)) if Path(src).is_relative_to(A) else 'source-work/'+str(Path(src).relative_to(WORK)),'hero_middle_fraction':.6 if narrow else .4,'callout_edge_margin_px':{'desktop':128,'mobile':64}}
  summary.append({'town_id':tid,'frame_class':t['frame_class'],**{k:v for k,v in t['qa'].items() if k not in ('land_source','water_measurement')}})
  (OUT/'checkpoint.json').write_text(json.dumps({'towns':index['towns'][:len(summary)],'queue':queue,'summary':summary}))
  print(tid,t['frame_class'],t['qa']['water_pct_town'],','.join(flags),flush=True)
 index['landing_schema_version']=3
 index['zoom_description']='Fixed desktop Town 5 km (listed big cities 7 km), Close 2 km; centered phone crops half the width. Both zooms share one camera target. Narrow-island water exceptions are explicit in qa.'
 (OUT/'planned-index.json').write_text(json.dumps(index,indent=2)+'\n');(OUT/'capture-queue.json').write_text(json.dumps(queue,indent=2)+'\n');(OUT/'preflight.json').write_text(json.dumps(summary,indent=2)+'\n')
 print('Planned',len(index['towns']),'towns')


def finish():
 index=json.load(open(OUT/'planned-index.json')); captures=OUT/'captures';rows=[];articles=[];sheets=[]
 def encode(item):
  t,key=item;v=t['views'][key];stem=t['town_id']+'-'+key
  actual=json.load(open(captures/(stem+'.json')))
  assert not actual['errors'] and actual['viewport']=='1600×1000',stem
  im=Image.open(captures/(stem+'.png')).convert('RGB');assert im.size==(1600,1000)
  im.save(A/'landing'/v['desktop'],'WEBP',quality=92,method=6)
  im.crop((400,0,1200,1000)).save(A/'landing'/v['mobile'],'WEBP',quality=92,method=6)
 with ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(encode,[(t,k) for t in index['towns'] for k in ['town','street']]))
 print('Encoded all images',flush=True)
 try:
  font=ImageFont.truetype('Arial.ttf',16);small=ImageFont.truetype('Arial.ttf',13)
 except OSError:
  try:font=ImageFont.truetype('DejaVuSans.ttf',16);small=ImageFont.truetype('DejaVuSans.ttf',13)
  except OSError:font=small=ImageFont.load_default()
 for t in index['towns']:
  tid=t['town_id'];qa=t['qa'];pair=Image.new('RGB',(1000,390),'#f5f0e3');draw=ImageDraw.Draw(pair)
  draw.text((12,8),t['name']+'  |  '+t['frame_class'],font=font,fill='#294a43')
  for n,key in enumerate(['town','street']):
   v=t['views'][key];stem=tid+'-'+key;actual=json.load(open(captures/(stem+'.json')))
   assert actual['viewport']=='1600×1000',(stem,actual['viewport'])
   assert not actual['errors'],(stem,actual['errors'])
   for k in ['left','right','top','bottom','position','target','tiltDegrees']:
    value=actual['camera'][k];expected=v['camera'][k]
    assert (all(abs(a-b)<1e-7 for a,b in zip(value,expected)) if isinstance(value,list) else abs(value-expected)<1e-7),(stem,k,value,expected)
   im=Image.open(captures/(stem+'.png')).convert('RGB');assert im.size==(1600,1000)
   v['capture_verified']=True;v['capture_sha256']=hashlib.sha256((captures/(stem+'.png')).read_bytes()).hexdigest()
   pair.paste(im.resize((480,300),Image.Resampling.LANCZOS),(10+n*500,35))
   name='town' if key=='town' else 'close';water=qa['water_pct_'+name];mw=qa['water_pct_'+name+'_mobile'];calls=qa['callouts_'+name]
   draw.text((10+n*500,341),f'{name.title()}: {v["span"]:.1f} km / phone {v["span"]/2:.1f} km | water {water:.1f}% / {mw:.1f}% phone',font=small,fill='#294a43')
   draw.text((10+n*500,359),f'{calls} callouts | hero in limits: {qa["hero_in_limits"]} | zoom {qa["zoom_ratio"]:g}×',font=small,fill='#294a43')
  if qa['flags']:draw.text((10,376),'FLAG: '+', '.join(qa['flags']),font=small,fill='#a13d20')
  sheets.append(pair)
  t['status']='Fixed camera Town/Close exports verified; see qa for explicit island water exceptions and boundary/source flags.'
  rows.append({'town_id':tid,'frame_class':t['frame_class'],**{k:v for k,v in qa.items() if k not in ['land_source','water_measurement']}})
  note=html.escape(json.dumps(qa,ensure_ascii=False))
  articles.append(f'<article id="{tid}"><h2>{html.escape(t["name"])}</h2><div class="pair"><figure><img loading="lazy" src="{t["desktop"]}"><figcaption>Town {t["span"]:g} km · water {qa["water_pct_town"]}% · {qa["callouts_town"]} callouts</figcaption></figure><figure><img loading="lazy" src="{t["close_desktop"]}"><figcaption>Close 2 km · water {qa["water_pct_close"]}% · {qa["callouts_close"]} callouts</figcaption></figure></div><p>{html.escape(t["frame_class"])} · hero in limits: {qa["hero_in_limits"]} · zoom {qa["zoom_ratio"]:g}×</p><p class="flag">{html.escape(", ".join(qa["flags"]))}</p><details><summary>QA and phone numbers</summary><pre>{note}</pre></details><p><a href="{t["mobile"]}">Town phone</a> · <a href="{t["close_mobile"]}">Close phone</a></p></article>')
 # One row per town. Full sheet is split into 12-row image pages to stay usable
 # on phones and avoid image dimension/memory limits; HTML includes every row.
 folder=A/'landing/qa';folder.mkdir(exist_ok=True);links=[]
 for start in range(0,len(sheets),12):
  group=sheets[start:start+12];sheet=Image.new('RGB',(1000,390*len(group)),'#f5f0e3')
  for i,row in enumerate(group):sheet.paste(row,(0,i*390))
  name=f'contact-{start//12+1:02}.jpg';sheet.save(folder/name,quality=88,optimize=True);links.append(f'<a href="qa/{name}">Rows {start+1}–{start+len(group)}</a>')
 sheet=Image.new('RGB',(900,350*len(sheets)),'#f5f0e3')
 for i,row in enumerate(sheets):sheet.paste(row.resize((900,350),Image.Resampling.LANCZOS),(0,i*350))
 sheet.save(folder/'all-towns.jpg',quality=84,optimize=True)
 (folder/'report.json').write_text(json.dumps({'towns':len(rows),'images':len(rows)*4,'width_exceptions':[],'flagged':[r for r in rows if r['flags']],'rows':rows},indent=2)+'\n')
 with open(folder/'report.csv','w') as f:
  writer=csv.DictWriter(f,fieldnames=rows[0].keys());writer.writeheader();writer.writerows(rows)
 (A/'landing/index.json').write_text(json.dumps(index,indent=2)+'\n')
 (A/'landing/capture-queue.json').write_text((OUT/'capture-queue.json').read_text())
 page='<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Fixed camera landing QA · 167 towns</title><style>body{background:#f5f0e3;color:#294a43;font:16px system-ui;margin:24px}main{max-width:1400px;margin:auto}article{padding:18px;background:#fffcf5;margin:24px 0}.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}figure{margin:0}img{width:100%;display:block}figcaption{padding:8px 0}a{color:inherit}.flag{color:#a13d20}pre{white-space:pre-wrap;font-size:12px}@media(max-width:600px){body{margin:8px}.pair{gap:6px}article{padding:8px}}</style><main><h1>Fixed camera landing QA</h1><p>167 towns · 668 images · 45° orthographic · fixed Town 5 km (listed big cities 7 km), Close 2 km. Phone crops halve width. Both zooms share a camera target. Land percentages use approved OSM-derived coastline polygons, including sand.</p><p><a href="qa/report.csv">QA CSV</a> · <a href="qa/report.json">QA JSON</a> · <a href="qa/all-towns.jpg">Full contact sheet</a></p><p>'+ ' · '.join(links)+'</p>'+''.join(articles)+'</main>'
 (A/'landing/fixed-camera-review.html').write_text(page)
 (A/'landing/review.html').write_text(page)
 print('Exported',len(rows)*4,'images;',sum(bool(r['flags']) for r in rows),'flagged towns')

def refine_mainland():
 """Try nearby public core streets before granting an island-style exception."""
 index=json.load(open(OUT/'planned-index.json'));changed=[]
 for t in index['towns']:
  tid=t['town_id']
  if t['frame_class']!='narrow_island' or tid in KNOWN_ISLANDS:continue
  h=t['hero'];land,_=local_land(tid,h);land_search=land.simplify(.005,preserve_topology=True)
  cx,cy=t['center']['x'],t['center']['y'];limit=town_boundary(t)
  # Only verified public core features inside the same place, no private gardens.
  all_features=[feature(e,h) for e in elements(str(region_source(tid)))];all_features=[q for q in all_features if q];qs=[q for q in all_features if q and q['public'] and q['type'] in ('park','walkable') and (not limit or limit[0].covers(Point(q['lon'],q['lat'])))]
  qs.sort(key=lambda q:math.hypot(xy(q)[0]-cx,xy(q)[1]-cy));selected=[];cells=set()
  for q in qs:
   xq,yq=xy(q);cell=(round((xq-cx)/.18),round((yq-cy)/.18))
   if math.hypot(xq-cx,yq-cy)<1.2 and cell not in cells:selected.append(q);cells.add(cell)
   if len(selected)>=18:break
  qs=selected
  chosen=None
  for q in qs:
   hx,hy=xy(q)
   for i in range(-3,4):
    for j in range(-3,4):
     xx=hx+i*.2/3;yy=hy+j*(CLOSE/1.6*math.sqrt(2)*.2)/3
     if math.hypot(xx-cx,yy-cy)>1.2:continue
     fs=[fraction(land_search,xx,yy,span,m) for span,m in [(t['span'],False),(CLOSE,False),(t['span'],True),(CLOSE,True)]]
     if min(fs)<.552:continue
     candidates=all_features
     calls={}
     for key,span in [('town',t['span']),('street',CLOSE)]:
      pool=[v for v in candidates if visible(v,xx,yy,span) and visible(v,xx,yy,span,True)]
      pool.sort(key=lambda v:math.hypot(xy(v)[0]-hx,xy(v)[1]-hy))
      found=[];seen=set()
      for v in pool:
       if norm(v['name']) in seen:continue
       found.append({k:a for k,a in v.items() if k!='public'});seen.add(norm(v['name']))
       if len(found)>=(4 if key=='town' else 3):break
      calls[key]=found
     if len(calls['town'])<2 or len(calls['street'])<1:continue
     score=math.hypot(xx-cx,yy-cy)+math.hypot(hx-cx,hy-cy)*.3
     if chosen is None or score<chosen[0]:chosen=(score,q,xx,yy,fs,calls)
   # A close feasible public-core choice is enough; do not drift farther inland.
   if chosen is not None and chosen[0]<.5:break
  if chosen is None:
   t['frame_reason']='Narrow or fragmented waterfront land around the public core; normal land coverage could not be attained within the shared hero/phone constraints.'
   continue
  _,q,cx,cy,fs,calls=chosen
  fs=[fraction(land,cx,cy,span,m) for span,m in [(t['span'],False),(CLOSE,False),(t['span'],True),(CLOSE,True)]]
  if min(fs)<.55:continue
  t['hero'].update({k:v for k,v in q.items() if k not in ('public','type')});t['hero']['reason']=f'Public {q["name"]} anchors {t["name"]} with its main waterfront and town context in frame.'
  t['hero_verification']['public_source']=q['source']
  if not limit:
   evidence=t['hero_verification']['boundary'];nodeid=evidence.get('node')
   if nodeid:
    node=next(e for e in elements(str(region_source(tid))) if e['type']=='node' and e['id']==nodeid);nx,ny=project(node['lon'],node['lat']);hx,hy=xy(q);distance=math.hypot(nx-hx,ny-hy)
    if distance>evidence['radius_km']:raise AssertionError((tid,'new hero outside reviewed locality',distance))
    evidence['hero_distance_km']=round(distance,4)
  lon,lat=INV.transform(cx*1000,cy*1000);t['center'].update(x=cx,y=cy,lon=lon,lat=lat);t['frame_class']='standard';t['frame_reason']='Nearby public town-center feature meets the normal land target in all four frames.'
  for key,v in t['views'].items():
   c=camera(cx,cy,v['span']);m=copy.deepcopy(c);m['left']/=2;m['right']/=2;v.update(camera=c,mobile_camera=m,callouts=calls[key],mobile_callouts=copy.deepcopy(calls[key]),capture_verified=False)
   url='../explore_coast.html?'+urlencode({'view':tid,'level':'town','district':t.get('district',''),'landing':1,'cx':cx,'cy':cy,'span':v['span']});v['render_url']=url;v['mobile_render_url']=url.replace('span='+str(v['span']),'span='+str(v['span']/2))
   prefix='' if key=='town' else 'close_'
   for f in ['camera','mobile_camera','callouts','render_url','mobile_render_url']:t[prefix+f]=v[f]
  for name,f in zip(['town','close','town_mobile','close_mobile'],fs):t['qa']['water_pct_'+name]=round((1-f)*100,2)
  t['qa'].update(hero_middle_fraction=.4,flags=[],callouts_town=len(calls['town']),callouts_close=len(calls['street']))
  changed.append(tid);print('Normal mainland framing:',tid,flush=True)
 queue=[{'town_id':t['town_id'],'view':key,'url':v['render_url'],'camera':v['camera'],'desktop':v['desktop'],'mobile':v['mobile']} for t in index['towns'] for key,v in t['views'].items()]
 (OUT/'planned-index.json').write_text(json.dumps(index,indent=2)+'\n');(OUT/'capture-queue.json').write_text(json.dumps(queue,indent=2)+'\n');(OUT/'mainland-refinements.json').write_text(json.dumps(changed,indent=2)+'\n')
 print('Refined',len(changed),'mainland towns')
def refresh_callouts():
 index=json.load(open(OUT/'planned-index.json'))
 for t in sorted(index['towns'],key=lambda t:str(region_source(t['town_id']))):
  tid=t['town_id'];h=t['hero'];hx,hy=xy(h);cx,cy=t['center']['x'],t['center']['y']
  features=[feature(e,h) for e in elements(str(region_source(tid)))];features=[q for q in features if q]
  for key,v in t['views'].items():
   pool=[q for q in features+v['callouts'] if visible(q,cx,cy,v['span']) and visible(q,cx,cy,v['span'],True)]
   pool.sort(key=lambda q:math.hypot(xy(q)[0]-hx,xy(q)[1]-hy))
   selected=[];seen=set();maximum=4 if key=='town' else 3
   for typ in ['beach','boating','walkable','park','landmark']:
    q=next((q for q in pool if q['type']==typ and norm(q['name']) not in seen),None)
    if q:selected.append({k:a for k,a in q.items() if k!='public'});seen.add(norm(q['name']))
    if len(selected)>=maximum:break
   minimum=2 if key=='town' else 1
   for q in pool:
    if len(selected)>=minimum:break
    if norm(q['name']) not in seen:selected.append({k:a for k,a in q.items() if k!='public'});seen.add(norm(q['name']))
   assert minimum<=len(selected)<=maximum,(tid,key)
   v['callouts']=selected;v['mobile_callouts']=copy.deepcopy(selected)
   prefix='' if key=='town' else 'close_';t[prefix+'callouts']=selected
   t['qa']['callouts_'+('town' if key=='town' else 'close')]=len(selected)
 (OUT/'planned-index.json').write_text(json.dumps(index,indent=2)+'\n')
 print('Refreshed distinct, source-positioned callout types for 167 towns')

if __name__=='__main__':
 if sys.argv[1]=='plan':plan(set(sys.argv[2].split(',')) if len(sys.argv)>2 else None)
 elif sys.argv[1]=='refine':refine_mainland()
 elif sys.argv[1]=='calls':refresh_callouts()
 elif sys.argv[1]=='finish':finish()
