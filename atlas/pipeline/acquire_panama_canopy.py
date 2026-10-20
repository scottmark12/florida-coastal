"""Read small COG windows of ESA WorldCover 2021. Never invent urban canopy."""
import sys,json,math,os
from pathlib import Path
sys.path.insert(0,'work/coastal_pipeline/deps')
import rasterio
from rasterio.windows import from_bounds,bounds
import numpy as np
from PIL import Image
P=Path('work/coastal_pipeline/v4')/sys.argv[1];m=json.load(open(P/'manifest.json'));ds=[{'id':'pcb-west','lon':-85.877,'lat':30.216} if sys.argv[1]=='pcb' else {'id':'panama-west','lon':-85.704,'lat':30.176}];rasters=m['inputs'].get('canopyRasters',[])
with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR',CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tif',GDAL_HTTP_TIMEOUT='60'):
 for d in ds:
  lon,lat=d['lon'],d['lat'];west=math.floor(lon/3)*3;south=math.floor(lat/3)*3;tile=f'N{south:02d}W{abs(west):03d}';url=f'https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/ESA_WorldCover_10m_2021_v200_{tile}_Map.tif';out=P/(d['id']+'-worldcover-2021.png');meta=out.with_suffix('.json')
  if meta.exists():rasters.append(json.load(meta.open()));continue
  with rasterio.open(url) as src:
   win=from_bounds(lon-.024,lat-.024,lon+.024,lat+.024,src.transform).round_offsets().round_lengths();data=src.read(1,window=win);b=list(bounds(win,src.transform))
  mask=np.isin(data,[10,95]);rgb=np.zeros((*data.shape,3),dtype='uint8');rgb[mask]=[38,115,0];Image.fromarray(rgb).save(out)
  item={'path':str(out),'bounds':b,'canopyRGB':[38,115,0],'source':url,'surveyYear':2021,'district':d['id'],'license':'CC BY 4.0','attribution':'ESA WorldCover 10 m 2021 v200 · https://doi.org/10.5281/zenodo.7254221','classes':[10,95],'resolutionMeters':10};meta.write_text(json.dumps(item,indent=2));rasters.append(item);print(d['id'],round(mask.mean(),3),flush=True)
# Higher-resolution local measured canopy is applied last and supersedes WorldCover.
m['inputs']['canopyRasters']=rasters+[r for r in m['inputs'].get('canopyRasters',[]) if 'worldcover' not in r['path']];(P/'manifest.json').write_text(json.dumps(m,indent=2))
