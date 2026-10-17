"""Region-independent release pipeline. Never promote incomplete source inputs."""
from pathlib import Path
import argparse,json,hashlib,csv,sys,subprocess,shutil,gzip
sys.path.insert(0,'work/30a_finish')
from geometry import *
from shapely import constrained_delaunay_triangles
ROOT=Path.cwd();HERE=Path(__file__).parent

def read(path):
 p=ROOT/path
 return json.load(gzip.open(p,'rt') if p.suffix=='.gz' else p.open())
def digest(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def parse_osm(paths):
 elements={};issues=[]
 for path in paths:
  p=ROOT/path
  if p.suffix in ['.xml','.osm']:
   root=ET.parse(p).getroot();nodes={n.get('id'):{'lon':float(n.get('lon')),'lat':float(n.get('lat'))} for n in root.findall('node')};ways={w.get('id'):[nodes[n.get('ref')] for n in w.findall('nd') if n.get('ref') in nodes] for w in root.findall('way')}
   for el in root:
    if el.tag not in ['node','way','relation']:continue
    e={'type':el.tag,'id':int(el.get('id')),'tags':{t.get('k'):t.get('v') for t in el.findall('tag')}}
    if el.tag=='node':e.update(nodes[el.get('id')])
    elif el.tag=='way':e['geometry']=ways[el.get('id')]
    else:e['members']=[{'type':m.get('type'),'ref':int(m.get('ref')),'role':m.get('role',''),'geometry':ways.get(m.get('ref'),[])} for m in el.findall('member')]
    elements[(e['type'],e['id'])]=e
  else:
   try:j=read(path)
   except Exception:issues.append({'code':'invalid_osm','detail':path});continue
   for e in j.get('elements',[]):elements[(e['type'],e['id'])]=e
 return elements,issues

def preflight(m,rules):
 elements,issues=parse_osm(m['inputs']['osm']);buildings=[];memberways=set();center_only=0
 for e in elements.values():
  if not e.get('tags',{}).get('building'):continue
  if e['type']=='relation':memberways.update(x.get('ref') for x in e.get('members',[]) if x.get('type','way')=='way')
 for e in elements.values():
  tags=e.get('tags',{})
  if not tags.get('building') or (e['type']=='way' and e['id'] in memberways):continue
  p=polygons(e)
  if p.is_empty:center_only+=1;continue
  rawheight=tags.get('height');height=None
  try:height=float(rawheight.replace(' m','')) if rawheight and 'ft' not in rawheight else None
  except ValueError:pass
  buildings.append({'type':'Feature','geometry':mapping(p),'properties':{'id':e['id'],'osm_type':e['type'],'height_m':height,'levels':tags.get('building:levels'),'building_type':tags.get('building'),'use':tags.get('shop') or tags.get('amenity') or tags.get('office'),'source':f'https://www.openstreetmap.org/{e["type"]}/{e["id"]}'}})
 if not buildings:issues.append({'code':'building_geometry','detail':f'{center_only} OSM building records have no usable polygon geometry; fetch complete ways and relation members.'})
 districts=read(m['inputs']['districts']);districts=districts.get('districts',[]) if isinstance(districts,dict) else districts;districts=[d for d in districts if d.get('town') in m.get('towns',[m['id']])]
 prices=read(m['inputs']['prices']);prices=prices.get('districts',[]) if isinstance(prices,dict) else prices;prices={d['id']:d for d in prices}
 anchors=[]
 for d in districts:
  node=None;src=d.get('positionSource','')
  if '/node/' in src:node=elements.get(('node',int(src.rsplit('/',1)[-1])))
  if '/way/' in src:
   e=elements.get(('way',int(src.rsplit('/',1)[-1])))
   if e:
    c=polygons(e).centroid;node={'lon':c.x,'lat':c.y}
  err=None;ox=oy=None
  if node:
   ox,oy=T.transform(node['lon'],node['lat']);err=math.hypot(d['x']*1000-ox,d['y']*1000-oy)
   if err>rules['maxAnchorErrorMeters']:issues.append({'code':'anchor_error','district':d['id'],'detail':f'{err:.3f} meters exceeds threshold.'})
  else:issues.append({'code':'anchor_source','district':d['id'],'detail':'Independent OSM node/control is missing. Do not compare a copied guide coordinate against itself.'})
  lon,lat=I.transform(d['x']*1000,d['y']*1000)
  anchors.append({'district':d['name'],'model_x_km':d['x'],'model_y_km':d['y'],'model_lon':lon,'model_lat':lat,'osm_lon':node['lon'] if node else '', 'osm_lat':node['lat'] if node else '', 'distance_m':round(err,6) if err is not None else '', 'source':src})
  recipe=m.get('district_recipes',{}).get(d['id'],d.get('style'))
  if recipe not in rules['recipes']:issues.append({'code':'style_recipe','district':d['id'],'detail':'No explicit approved district recipe. Generic fallback cannot pass.'})
  d['style']=recipe
  p=prices.get(d['id'],{});ev=p.get('priceEvidence',{})
  median=ev.get('kind')=='published median' and isinstance(ev.get('value'),(int,float)) and ev.get('metric') and ev.get('period')
  listing_range=isinstance(ev.get('min'),(int,float)) and isinstance(ev.get('max'),(int,float)) and ev['min']<ev['max'] and len(ev.get('examples',[]))>=10
  if not (p.get('priceSource') and p.get('priceRange') and ev.get('checked') and (median or listing_range)):issues.append({'code':'price_evidence','district':d['id'],'detail':'A dated published median or at least 10 current listings is required.'})
 for kind in ['land','landcover','shoreline','roads']:
  entry=m['inputs'].get(kind)
  if not entry or not (ROOT/entry['path']).exists():issues.append({'code':'source_'+kind,'detail':'Missing normalized source geometry.'});continue
  if not entry.get('source') or not entry.get('license_verified'):issues.append({'code':'source_'+kind,'detail':'Source/licensing has not been verified for this layer.'})
 return buildings,districts,anchors,issues

def run(manifest):
 m=read(manifest);rules=read('work/coastal_pipeline/v2/rules.json');out=ROOT/'outputs/coastal_pipeline_v2'/m['id'];out.mkdir(parents=True,exist_ok=True)
 buildings,districts,anchors,issues=preflight(m,rules)
 with (out/'accuracy.csv').open('w',newline='') as f:w=csv.DictWriter(f,fieldnames=anchors[0]);w.writeheader();w.writerows(anchors)
 report={'region':m['id'],'status':'blocked_input_validation' if issues else 'validated_inputs','engine_sha256':digest(__file__),'exporter_sha256':digest(ROOT/'work/coastal_pipeline/run.py'),'ui_sha256':digest(HERE/'ui-rules.mjs'),'rules_sha256':digest(HERE/'rules.json'),'manifest_sha256':digest(ROOT/manifest),'usable_osm_building_polygons':len(buildings),'manual_fixes':issues,'production_promoted':False}
 (out/'report.json').write_text(json.dumps(report,indent=2))
 if issues:print(json.dumps(report,indent=2));return
 # The same exporter is invoked only after source/style/price gates pass.
 (out/'buildings.geojson').write_text(json.dumps({'type':'FeatureCollection','features':buildings},separators=(',',':')))
 normalized={'id':m['id'],'buildings':str((out/'buildings.geojson').resolve()),'land':str((ROOT/m['inputs']['land']['path']).resolve()),'bounds':m['bounds'],'districts':districts,'manual_review':[],'height_field':'height_m','source':'OpenStreetMap / ODbL','projection':proj,'rules_path':str((HERE/'rules.json').resolve()),'landcover':str((ROOT/m['inputs']['landcover']['path']).resolve()),'roads':str((ROOT/m['inputs']['roads']['path']).resolve()),'shoreline':str((ROOT/m['inputs']['shoreline']['path']).resolve())}
 (out/'normalized-manifest.json').write_text(json.dumps(normalized,indent=2))
 subprocess.run([sys.executable,'work/coastal_pipeline/run.py',str(out/'normalized-manifest.json')],check=True,stdout=(out/'export.log').open('w'))
 build=read('outputs/coastal_pipeline/'+m['id']+'/report.json');report['export']=build;report['status']='candidate_export_requires_visual_QA';report['manual_fixes']+=build['manual_fixes'];(out/'report.json').write_text(json.dumps(report,indent=2))
 print(json.dumps(report,indent=2))
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('manifest');run(ap.parse_args().manifest)
