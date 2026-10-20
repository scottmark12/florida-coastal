"""Extend real WorldCover canopy to hero frames beyond a district anchor's window.
Run after configuring hero cameras; repeat town builds listed in the output.
"""
import sys,json,math
from pathlib import Path
P=Path(__file__).resolve().parent;r=P/'work/coastal_pipeline/v4'/sys.argv[1];m=json.load(open(r/'manifest.json'));ds={d['town']:d for d in json.load(open(r/'districts.json'))};heroes=json.load(open(r/'town-hero-sources.json'));sys.path.insert(0,str(P/'work/coastal_pipeline/deps'));import rasterio;import numpy as np
from rasterio.windows import from_bounds,bounds
from PIL import Image
changed=[]
with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR',CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tif',GDAL_HTTP_TIMEOUT='60'):
 for h in heroes:
  d=ds[h['town']]
  if math.hypot(h['x']-d['x'],h['y']-d['y'])<1.5:continue
  lon,lat=h['lon'],h['lat'];tile=f'N{math.floor(lat/3)*3:02d}W{abs(math.floor(lon/3)*3):03d}';url=f'https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/ESA_WorldCover_10m_2021_v200_{tile}_Map.tif';f=r/(h['town']+'-hero-canopy.png');meta=f.with_suffix('.json')
  if not f.exists():
   with rasterio.open(url) as src:win=from_bounds(lon-.024,lat-.024,lon+.024,lat+.024,src.transform).round_offsets().round_lengths();data=src.read(1,window=win);b=list(bounds(win,src.transform))
   mask=np.isin(data,[10,95]);rgb=np.zeros((*data.shape,3),dtype='uint8');rgb[mask]=[38,115,0];Image.fromarray(rgb).save(f);entry={'path':str(f.relative_to(P)),'bounds':b,'canopyRGB':[38,115,0],'source':url,'surveyYear':2021,'district':d['id'],'license':'CC BY 4.0','attribution':'ESA WorldCover 10 m 2021 v200 · https://doi.org/10.5281/zenodo.7254221','classes':[10,95],'resolutionMeters':10,'scope':'Additional real canopy coverage centered on the curated hero, not an inferred default.'};meta.write_text(json.dumps(entry,indent=2)+'\n')
  entry=json.load(open(meta));m['inputs']['canopyRasters']=[x for x in m['inputs'].get('canopyRasters',[]) if x['path']!=entry['path']]+[entry];changed.append(h['town'])
(r/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(r/'hero-canopy-towns.json').write_text(json.dumps(changed,indent=2)+'\n');print('Hero canopy:',changed)
