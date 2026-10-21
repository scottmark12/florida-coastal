"""Audit every fixed landing frame against its package's declared source extent.
Land outside the detailed source rectangle fails; offshore water is covered by
the separate georeferenced water layer. Census context is not detailed OSM data. --report-only writes the audit without a failing exit.
"""
import json,sys,math
from pathlib import Path
from shapely.geometry import box,Polygon,mapping
from shapely.ops import transform
from fixed_landings import A,source_dir,project,local_land

def audit(fail=True):
 index=json.load(open(A/'landing/index.json'));rows=[]
 for t in index['towns']:
  d=source_dir(t['town_id'])
  if t['town_id']=='30a':
   g=json.load(open(d/'geometry.json'));extent=box(*g['bounds']) if 'bounds' in g else box(-230.79795,689.5187,-168.2478,733.60156);evidence='Approved 30A geographic source envelope'
  else:
   from fixed_landings import REG
   scene=A/'regions'/REG[t['town_id']]/'scene.json'
   metadata=json.load(open(scene));extent=box(*metadata['bounds']);evidence=str(scene.relative_to(A))+'#bounds (declared acquisition/export envelope)'
  land,_=local_land(t['town_id'],t['hero'])
  water_meta=json.load(open(A/'regions/landing-water/index.json'))['towns'][t['town_id']]
  water_extent=box(*water_meta['bounds'])
  for key,v in t['views'].items():
   for crop in ['desktop','mobile']:
    c=v['camera' if crop=='desktop' else 'mobile_camera'];x=c['target'][0];y=-c['target'][2];w=c['right']-c['left'];h=(c['top']-c['bottom'])*math.sqrt(2);frame=box(x-w/2,y-h/2,x+w/2,y+h/2);missing=frame.difference(extent.buffer(.001));pct=missing.area/frame.area*100;missing_land=missing.intersection(land).area/frame.area*100;missing_water=frame.difference(water_extent).area/frame.area*100
    rows.append({'town_id':t['town_id'],'view':key,'crop':crop,'uncovered_source_rect_pct':round(pct,4),'uncovered_land_pct':round(missing_land,4),'uncovered_water_extent_pct':round(missing_water,4),'status':'FAIL' if max(missing_land,missing_water)>.001 else 'pass','source':evidence,'frame_bounds_km':list(frame.bounds)})
 report={'towns':len(index['towns']),'frames':len(rows),'failures':[r for r in rows if r['status']=='FAIL'],'rows':rows};out=A/'landing/qa/data-extents.json';out.write_text(json.dumps(report,indent=2)+'\n');print('Extent audit:',len(report['failures']),'frames outside declared source extent;',len(set(r['town_id'] for r in report['failures'])),'towns')
 if fail:assert not report['failures'],[(r['town_id'],r['view'],r['crop'],r['uncovered_land_pct']) for r in report['failures']]
 return report
if __name__=='__main__':audit('--report-only' not in sys.argv)
