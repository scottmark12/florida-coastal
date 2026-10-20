"""Re-download excluded inputs. Live OSM can differ from the reviewed snapshot."""
import os,sys,json,gzip,urllib.request,urllib.parse,subprocess,time
from pathlib import Path
P=Path(__file__).resolve().parent;os.chdir(P);id=sys.argv[1];mf=Path('work/coastal_pipeline/v4')/id/'manifest.json';m=json.load(mf.open());ds=json.load(open(m['inputs']['districts']));ds=ds.get('districts',[]) if isinstance(ds,dict) else ds
sys.path.insert(0,'work/30a_finish');from geometry import I
for d in ds:
 if 'lon' not in d:d['lon'],d['lat']=I.transform(d['x']*1000,d['y']*1000)
def download(query):
 for endpoint in ['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter','https://overpass.private.coffee/api/interpreter']:
  try:
   req=urllib.request.Request(endpoint,data=urllib.parse.urlencode({'data':query}).encode(),headers={'User-Agent':'FloridaCoastalAtlas/1.0'});data=urllib.request.urlopen(req,timeout=240).read();j=json.loads(data)
   if j.get('remark') or not j.get('elements'):raise RuntimeError(j.get('remark','Empty response'))
   return data
  except Exception as e:print(endpoint,str(e));time.sleep(2)
 raise RuntimeError('OSM download failed; retry later. No fabricated fallback.')
for filename in m['inputs']['osm']:
 path=Path(filename)
 if id=='palm-beaches' and path.name.startswith('landmarks-') and not path.exists():
  subprocess.run([sys.executable,'fetch_palm_landmarks.py'],check=True)
 if path.exists():continue
 if id=='weeki-wachee' and path.name=='coast-extension.json.gz':
  subprocess.run([sys.executable,'extend_weeki_coast.py'],check=True);continue
 w,s,e,n=m['bounds'];name=path.name.split('.')[0];d=next((d for d in ds if name=='district-'+d['id']),None)
 if d:w,s,e,n=d['lon']-.025,d['lat']-.024,d['lon']+.025,d['lat']+.024
 bbox=f'{s},{w},{n},{e}'
 if name=='cover':selectors=['nwr[natural~"^(wood|wetland|tree|tree_row)$"]','nwr[landuse~"^(forest|orchard)$"]','nwr[leisure~"^(park|garden|golf_course)$"]']
 elif name=='geography':selectors=['way[natural=coastline]','nwr[natural=water]','nwr[natural=beach]','node[place]']
 else:selectors=['way[building]','relation[building]','way[highway]','node[place]','nwr[natural]','nwr[landuse=forest]']
 anchors=''.join('node('+d['positionSource'].rsplit('/',1)[1]+');' for d in ds if '/node/' in d.get('positionSource',''))
 query='[out:json][timeout:180];('+''.join(q+'('+bbox+');' for q in selectors)+anchors+');out geom;'
 data=download(query);path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(gzip.compress(data) if path.suffix=='.gz' else data);print('Fetched',path)
# Raster sidecars contain provenance, not the raster itself. Missing PNG must trigger download.
for r in m['inputs'].get('canopyRasters',[]):
 if 'worldcover' in r['path'] and not Path(r['path']).exists():Path(r['path']).with_suffix('.json').unlink(missing_ok=True)
# Add projected lon/lat only if older district files lack them.
source=json.load(open(m['inputs']['districts']))
if isinstance(source,list) and any('lon' not in d for d in source):Path(m['inputs']['districts']).write_text(json.dumps(ds,indent=2))
subprocess.run([sys.executable,'work/coastal_pipeline/v4/fetch_worldcover.py',id],check=True)
if id=='miramar-beach':subprocess.run([sys.executable,'fetch_coast_hero_canopy.py'],check=True)
if id=='tampa-south-shore':subprocess.run([sys.executable,'work/coastal_pipeline/v4/fetch_tampa_canopy_raster.py'],check=True)
if m['inputs'].get('canopy'):subprocess.run([sys.executable,'work/coastal_pipeline/v4/fetch_forest_cover.py',id],check=True)
print('Inputs restored. Re-downloaded OSM is current, not a bit-for-bit historical snapshot. Run build_region.py and review accuracy gates.')
