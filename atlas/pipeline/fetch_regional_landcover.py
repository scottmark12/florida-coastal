"""Cache downsampled ESA WorldCover 2021 classes for regional illustration.
Official CC BY 4.0 COGs; source caches stay under ignored raw/. No satellite imagery.
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json
import rasterio
from PIL import Image
P=Path(__file__).resolve().parent;out=P/'work/coastal_pipeline/raw/regional-landcover';out.mkdir(parents=True,exist_ok=True)
def fetch(pair):
 west,south=pair;name=f'N{south:02d}W{abs(west):03d}';p=out/(name+'.png');url=f'https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/ESA_WorldCover_10m_2021_v200_{name}_Map.tif'
 if p.exists():return {'tile':name,'bounds':[west,south,west+3,south+3],'file':p.name,'source':url}
 with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR',CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tif',GDAL_HTTP_TIMEOUT='60'):
  try:
   with rasterio.open(url) as s:a=s.read(1,out_shape=(3072,3072),resampling=rasterio.enums.Resampling.nearest)
  except rasterio.errors.RasterioIOError as error:
   if '404' in str(error):return {'tile':name,'source':url,'absent':True}
   raise
 Image.fromarray(a).save(p,optimize=True);print('FETCHED',name,flush=True);return {'tile':name,'bounds':[west,south,west+3,south+3],'file':p.name,'source':url}
with ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(fetch,[(w,s) for s in [24,27,30,33] for w in [-90,-87,-84,-81]]))
(out/'index.json').write_text(json.dumps({'license':'CC BY 4.0','surveyYear':2021,'attribution':'ESA WorldCover 2021 v200; DOI 10.5281/zenodo.7254221','tiles':rows},indent=2)+'\n')
