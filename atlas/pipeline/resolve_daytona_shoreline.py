"""Use OSM river banks in place of Ponce Inlet's open-water sea/river seam.
Run after normalization, before building. Preserves the complete land mask.
"""
from pathlib import Path
import json,gzip,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'work/30a_finish'));from geometry import *
r=P/'work/coastal_pipeline/v4/daytona-flagler';es=json.load(gzip.open(r/'geography.json.gz','rt'))['elements'];land=shape(json.load(open(r/'land.json')));clip=box(*json.load(open(r/'manifest.json'))['bounds']);coast=unary_union([LineString([(p['lon'],p['lat']) for p in e['geometry']]) for e in es if e.get('tags',{}).get('natural')=='coastline']).intersection(clip)
e=next(e for e in es if e['type']=='way' and e['id']==80146691);seam=LineString([(p['lon'],p['lat']) for p in e['geometry']]);river=polygons(next(e for e in es if e['type']=='relation' and e['id']==1204546));banks=river.boundary.intersection(land.boundary.buffer(1e-8));shore=unary_union([coast.difference(seam),banks]);(r/'shoreline.json').write_text(json.dumps(mapping(shore)))
report={'source':'https://www.openstreetmap.org/relation/1204546','sea_river_seam_source':'https://www.openstreetmap.org/way/80146691','method':'Replace the mapped open-water sea/river transition seam with mapped river banks coincident with the existing land boundary. Land mask unchanged; no invented positions or relaxed threshold.','sea_river_seam_length_m':project(seam).length*1000,'failed_input_vertex_error_m':171.61303994399734}
(r/'shoreline-resolution.json').write_text(json.dumps(report,indent=2)+'\n');print(report)
