"""Extend selected landing input envelopes without changing landing cameras.
Uses the reviewed parent land/coast plus a fresh extraction from the same local
OSM snapshot; real source coverage is recorded separately from rendered context.
Run --seed, extract_osm_snapshot.py for the printed IDs, then --prepare.
"""
import sys,json,copy,gzip
from pathlib import Path
from shapely.geometry import shape,box,mapping,LineString
from shapely.ops import transform
from fixed_landings import A,P,OUT,INV,source_dir,project
FIX=['juno-beach','west-palm-beach','new-port-richey','dania-beach','jupiter','lake-park','nsb']
INDEX=json.load(open(A/'landing/index.json'))
def ll(g):return transform(lambda x,y,z=None:INV.transform(__import__('numpy').array(x)*1000,__import__('numpy').array(y)*1000),g)
selected=[a for a in sys.argv[1:] if not a.startswith('--')]
SOURCES={'juno-beach':'palm-beaches/juno-beach','west-palm-beach':'palm-beaches/west-palm-beach','new-port-richey':'st-pete-clearwater','dania-beach':'fort-lauderdale/dania-beach','jupiter':'palm-beaches/jupiter','lake-park':'palm-beaches/lake-park','nsb':'daytona-flagler/nsb'}
for tid in FIX:
 if selected and tid not in selected:continue
 t=next(t for t in INDEX['towns'] if t['town_id']==tid);old=P/'work/coastal_pipeline/v4'/SOURCES[tid];m=json.load(open(old/'manifest.json'));root=P/'work/coastal_pipeline/v4/landing-repair'/tid;root.mkdir(parents=True,exist_ok=True)
 x,y=t['center']['x'],t['center']['y'];w=t['span']/2;h=t['span']/1.6*2**.5/2;frame=box(x-w-.6,y-h-.6,x+w+.6,y+h+.6);b=list(ll(frame).bounds)
 cat=json.load(open(A/'regions/catalog.json'));town=next(q for q in cat['towns'] if q['id']==tid);town={**town,'source_bounds':b};(root/'catalog-input.json').write_text(json.dumps({'region':{'id':'landing-repair/'+tid,'name':town['name']},'towns':[town],'bounds':b},indent=2)+'\n')
 if '--seed' in sys.argv:continue
 child=copy.deepcopy(m);child['id']='landing-repair/'+tid;child['towns']=[tid];child['bounds']=b;ds=json.load(open(P/m['inputs']['districts']));ds=[d for d in ds if d['town']==tid];(root/'districts.json').write_text(json.dumps(ds,indent=2)+'\n');child['inputs']['districts']=child['inputs']['prices']=str((root/'districts.json').relative_to(P));child['district_recipes']={d['id']:d['style'] for d in ds};child['inputs']['osm']=[str((root/(name+'.json.gz')).relative_to(P)) for name in ['geography','cover','district-'+tid]]
 # Keep anchor/landmark controls from existing inputs as well as the extended data.
 child['inputs']['osm'] += [p for p in m['inputs']['osm'] if (P/p).exists() and (not Path(p).name.startswith('district-') or Path(p).name=='district-'+tid+'.json.gz')];clip=box(*b)
 parent=old.parent if (old.parent/'land.json').exists() else old
 for key in ['land','shoreline']:
  f=parent/(key+'.json');g=shape(json.load(open(f))).intersection(clip);dest=root/(key+'.json');dest.write_text(json.dumps(mapping(g),separators=(',',':')));child['inputs'][key]={**m['inputs'][key],'path':str(dest.relative_to(P))}
 # Complete ways preserve streets and park paths outside the former town window.
 es={}
 for path in child['inputs']['osm']:
  p=P/path
  for e in json.load(gzip.open(p,'rt') if p.suffix=='.gz' else p.open()).get('elements',[]):es[e['type'],e['id']]=e
 sys.path.insert(0,str(P/'work/30a_finish'));from geometry import polygons
 covers=[];roads=[]
 for e in es.values():
  tags=e.get('tags',{});g=e.get('geometry')
  if tags.get('highway') and g and len(g)>1:
   geom=LineString([(p['lon'],p['lat']) for p in g]).intersection(clip)
   if not geom.is_empty:roads.append({'type':'Feature','geometry':mapping(geom),'properties':{'class':tags['highway'],'bridge':tags.get('bridge'),'name':tags.get('name','')}})
  if tags.get('leisure') in ['park','garden','golf_course'] or tags.get('natural') in ['wood','wetland'] or tags.get('landuse')=='forest':
   geom=polygons(e).intersection(clip)
   if not geom.is_empty:covers.append({'type':'Feature','geometry':mapping(geom),'properties':{'name':tags.get('name',''),'id':e['id']}})
 for key,fs in [('roads',roads),('landcover',covers)]:
  dest=root/(key+'.json');dest.write_text(json.dumps({'type':'FeatureCollection','features':fs},separators=(',',':')));child['inputs'][key]={**m['inputs'][key],'path':str(dest.relative_to(P))}
 # Existing parent ground is already continuous; no rectangular context cutout.
 child['inputs'].pop('context',None)
 child['inputs']['canopyRasters']=[]
 child['manual_fixes']+=['Landing source envelope extended to the fixed frame plus 600 m; original camera, hero, palette and district styles retained.']
 child['coverage']={'bounds_lonlat':b,'frame_bounds_km':list(frame.buffer(-.6).bounds),'source':'OSM full-frame extraction/query, approved parent coastline and ESA WorldCover 2021.'}
 (root/'manifest.json').write_text(json.dumps(child,indent=2)+'\n')
 print(tid,b,flush=True)
