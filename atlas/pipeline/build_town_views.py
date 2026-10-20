"""Build each town with the locked engine from spatially bounded source inputs.
Usage (pipeline directory): python build_town_views.py SOURCE_REGION [TOWN...]
Only input envelopes vary; coordinates, scale, styles and engine remain unchanged.
"""
from pathlib import Path
import sys,json,subprocess,shutil,copy,gzip
P=Path(__file__).resolve().parent;A=P.parent
sys.path.insert(0,str(P/'work/30a_finish'))
from geometry import shape,mapping,box,project,make_valid,polygons,unary_union
from shapely.strtree import STRtree
rid=sys.argv[1];root=P/'work/coastal_pipeline/v4'/rid;m=json.load(open(root/'manifest.json'));districts=json.load(open(P/m['inputs']['districts']));catalog=json.load(open(root/'catalog-input.json'));towns={t['id']:t for t in catalog['towns']};selected=set(sys.argv[2:]) or set(towns)
land=shape(json.load(open(P/m['inputs']['land']['path'])));coast=shape(json.load(open(P/m['inputs']['shoreline']['path'])));context=shape(json.load(open(P/m['inputs']['context']['path']))) if m['inputs'].get('context') else None
geography=json.load(gzip.open(root/'geography.json.gz','rt'));beaches=unary_union([polygons(e) for e in geography['elements'] if e.get('tags',{}).get('natural')=='beach'])
layers={}
for key in ['landcover','roads']:
 fs=json.load(open(P/m['inputs'][key]['path']))['features'];gs=[make_valid(shape(f['geometry'])) for f in fs];layers[key]=(fs,gs,STRtree(gs))
for tid,t in towns.items():
 if tid not in selected:continue
 d=next(d for d in districts if d['town']==tid);default=[t['lon']-.025,t['lat']-.022,t['lon']+.025,t['lat']+.022];b=t.get('source_bounds',default);b=[min(b[0],d['lon']-.028),min(b[1],d['lat']-.028),max(b[2],d['lon']+.028),max(b[3],d['lat']+.028)];clip=box(*b);local=root/tid;local.mkdir(exist_ok=True);child=copy.deepcopy(m);child.update(id=rid+'/'+tid,name=t['name'],towns=[tid],bounds=b,camera={'center':[d['x'],d['y']],'desktopSpan':8,'phoneSpan':8,'phoneOffsetY':0});child['district_recipes']={d['id']:d['style']};child['inputs']['osm']=[str(root.relative_to(P)/(n+'.json.gz')) for n in ['geography','cover','district-'+tid]];child['inputs']['canopyRasters']=[r for r in m['inputs'].get('canopyRasters',[]) if r.get('district')==d['id']]
 for key,g in [('land',land.intersection(clip)),('shoreline',coast.intersection(clip))]:
  f=local/(key+'.json');f.write_text(json.dumps(mapping(g),separators=(',',':')));child['inputs'][key]['path']=str(f.relative_to(P))
 for key,(fs,gs,tree) in layers.items():
  features=[]
  for ix in tree.query(clip,predicate='intersects'):
   g=gs[ix].intersection(clip)
   if key=='landcover' and not beaches.is_empty:g=g.difference(beaches)
   if not g.is_empty:features.append({**fs[ix],'geometry':mapping(g)})
  f=local/(key+'.json');f.write_text(json.dumps({'type':'FeatureCollection','features':features},separators=(',',':')));child['inputs'][key]['path']=str(f.relative_to(P))
 if context is not None:
  f=local/'context.json';f.write_text(json.dumps(mapping(context.intersection(project(clip).buffer(12)))));child['inputs']['context']['path']=str(f.relative_to(P))
 f=local/'manifest.json';f.write_text(json.dumps(child,indent=2)+'\n');print('BUILD TOWN',tid,flush=True);subprocess.run([sys.executable,'work/coastal_pipeline/v4/run.py',str(f.relative_to(P))],check=True,cwd=P)
 out=P/'outputs/coastal_pipeline_v4'/rid/tid;target=A/'regions/packages'/rid/tid
 if target.is_symlink():target.unlink()
 shutil.copytree(out,target,dirs_exist_ok=True)
 print('PUBLISHED TOWN',tid,flush=True)
