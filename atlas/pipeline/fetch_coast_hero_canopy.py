"""Extend measured canopy to a hero frame beyond its place-label raster window."""
from pathlib import Path
import os,json,math
import rasterio,numpy as np
from rasterio.windows import from_bounds,bounds
from PIL import Image
P=Path(__file__).resolve().parent;os.chdir(P);tid='miramar-beach';d=P/'work/coastal_pipeline/v4'/tid;m=json.load(open(d/'manifest.json'));h=json.load(open(P/'coast-addition-heroes.json'))[tid];lon,lat=h[1:3];west=math.floor(lon/3)*3;south=math.floor(lat/3)*3;tile=f'N{south:02d}W{abs(west):03d}';url=f'https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/ESA_WorldCover_10m_2021_v200_{tile}_Map.tif';out=d/(tid+'-hero-worldcover-2021.png');side=out.with_suffix('.json')
if not out.exists():
 with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR',CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tif',GDAL_HTTP_TIMEOUT='60'):
  with rasterio.open(url) as src:
   win=from_bounds(lon-.031,lat-.029,lon+.031,lat+.029,src.transform).round_offsets().round_lengths();data=src.read(1,window=win);b=list(bounds(win,src.transform))
 mask=np.isin(data,[10,95]);rgb=np.zeros((*data.shape,3),dtype='uint8');rgb[mask]=[38,115,0];Image.fromarray(rgb).save(out);item={'path':str(out.relative_to(P)),'bounds':b,'canopyRGB':[38,115,0],'source':url,'surveyYear':2021,'district':tid+'-center','license':'CC BY 4.0','attribution':'ESA WorldCover 10 m 2021 v200 · https://doi.org/10.5281/zenodo.7254221','classes':[10,95],'resolutionMeters':10};side.write_text(json.dumps(item,indent=2)+'\n')
item=json.load(open(side));m['inputs']['canopyRasters']=[r for r in m['inputs'].get('canopyRasters',[]) if r['path']!=item['path']]+[item];(d/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');print('Hero-frame WorldCover extent restored')
