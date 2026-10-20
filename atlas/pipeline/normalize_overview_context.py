"""Normalize existing Census/TIGER mainland context (never replaces local OSM coast)."""
import json,sys
from pathlib import Path
from shapely.geometry import shape,mapping
source=Path(sys.argv[1]);destination=Path(__file__).resolve().parent/'work/coastal_pipeline/overview-context.json'
g=json.load(open(source));out={k:mapping(shape(g[k]).simplify(.02,preserve_topology=True)) for k in ['land','context']};out['projection']=g['projection'];out['notes']='Census/TIGER fallback context simplified to 20m, projected kilometers. Approved local OSM land overrides fallback.'
destination.write_text(json.dumps(out,separators=(',',':'))+'\n')
