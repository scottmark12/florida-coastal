"""Read licensed WorldCover tree/mangrove classes over the complete fixed frame."""
import os,json,math,sys
from pathlib import Path
import rasterio,numpy as np
from rasterio.windows import from_bounds,bounds
from PIL import Image
P=Path(__file__).resolve().parent;os.chdir(P)
for tid in sys.argv[1:] or ['juno-beach','west-palm-beach','new-port-richey','dania-beach']:
 d=P/'work/coastal_pipeline/v4/landing-repair'/tid;m=json.load(open(d/'manifest.json'));b=m['bounds'];ds=json.load(open(m['inputs']['districts']));lon=(b[0]+b[2])/2;lat=(b[1]+b[3])/2;west=math.floor(lon/3)*3;south=math.floor(lat/3)*3;tile=f'N{south:02d}W{abs(west):03d}';url=f'https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/ESA_WorldCover_10m_2021_v200_{tile}_Map.tif';out=d/'frame-worldcover-2021.png';side=out.with_suffix('.json')
 if not side.exists():
  with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR',CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tif',GDAL_HTTP_TIMEOUT='60'):
   with rasterio.open(url) as src:
    win=from_bounds(*b,src.transform).round_offsets().round_lengths();data=src.read(1,window=win);rb=list(bounds(win,src.transform))
  rgb=np.zeros((*data.shape,3),dtype='uint8');rgb[np.isin(data,[10,95])]=[38,115,0];Image.fromarray(rgb).save(out);side.write_text(json.dumps({'path':str(out.relative_to(P)),'bounds':rb,'canopyRGB':[38,115,0],'source':url,'surveyYear':2021,'district':ds[0]['id'],'license':'CC BY 4.0','attribution':'ESA WorldCover 10 m 2021 v200','classes':[10,95],'resolutionMeters':10},indent=2)+'\n')
 m['inputs']['canopyRasters']=[json.load(open(side))];(d/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');print('CANOPY',tid,flush=True)
