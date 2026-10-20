"""Refresh regional terrain only; do not rebuild or change approved town geometry."""
from pathlib import Path
import sys,os,json
P=Path(__file__).resolve().parent;A=P.parent;os.chdir(P);sys.path[:0]=[str(P/'work/30a_finish'),str(P/'work/coastal_pipeline/v4')]
from geometry import *
from overview_geometry import continuous_land,write_base,write_water,asset_revision,coverage_bounds,COVERAGE
from PIL import Image,ImageDraw,ImageFilter
geo=json.load(open(P/'work/coastal_pipeline/overview-context.json'));fallback=unary_union([shape(geo['land']),shape(geo['context'])]);selected=set(sys.argv[1:])
for path in sorted((A/'regions/overviews').glob('*/manifest.json')):
 m=json.load(open(path));rid=m['id']
 if selected and rid not in selected:continue
 packs=[]
 for name in m['sourcePackages']:
  src=P/'work/coastal_pipeline/v4'/name;manifest=json.load(open(src/'manifest.json'));packs.append({'path':A/'regions/packages'/name,'clip':project(box(*manifest['bounds'])),'land':project(shape(json.load(open(P/manifest['inputs']['land']['path']))))})
 land=continuous_land(fallback,packs,rid,P/'work/30a_finish/source/geometry.json');size=write_base(path.parent,land,packs)
 write_water(land,m['bounds'],path.parent,rid)
 m['initial_bytes']=size+sum((path.parent/f).stat().st_size for f in [m['canopy'],m['water'],m['trees']]);assert m['initial_bytes']<4_000_000,(rid,m['initial_bytes']);m['coverageBounds']=coverage_bounds(packs,rid);m['continuousCoverage']=rid in COVERAGE;m['revision']=asset_revision(path.parent,m);path.write_text(json.dumps(m,indent=2)+'\n');print(rid,size,m['initial_bytes'],flush=True)
