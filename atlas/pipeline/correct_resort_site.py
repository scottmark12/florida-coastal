"""Exclude a hotel site extrusion while retaining the ten actual OSM roof outlines.
No shared implementation changes. Storey recipes are explicitly sourced/illustrative.
"""
from pathlib import Path
import json,gzip
from shapely.geometry import Polygon
P=Path(__file__).resolve().parent
source='https://www.tripadvisor.co.uk/FAQ_Answers-g34234-d84552-t3657255-Does_this_property_have_interior_corridors_Are.html'
waterscape='https://www.homes.com/building/waterscape-condominiums-fort-walton-beach-fl/b-2j33348hwssgb/'
for tid in ['fort-walton-beach','okaloosa-island']:
 d=P/'work/coastal_pipeline/v4'/tid;es=json.load(gzip.open(d/('district-'+tid+'.json.gz'),'rt'))['elements'];site=next(e for e in es if e['id']==1140724675);poly=Polygon([(p['lon'],p['lat']) for p in site['geometry']]);components=[]
 for e in es:
  if e['id']==site['id'] or not e.get('tags',{}).get('building') or not e.get('geometry'):continue
  g=Polygon([(p['lon'],p['lat']) for p in e['geometry']])
  if poly.covers(g.centroid):components.append(e)
 site['tags'].pop('building',None);site['excludedBuildingReason']='Hotel site outline, not one roof; ten individual OSM building outlines retained.'
 recipes=json.load(open(d/'recipes.json'));recipes['landmarks']={k:v for k,v in recipes.get('landmarks',{}).items() if not k.startswith('way/-1300000')}
 recipes['recipes']['four-points-resort']={'walls':['#fff8e8','#d6e3df'],'roofs':['#b9caca','#d4dbd4'],'roof':'flat','detail':'balconies','source':'https://www.marriott.com/en-us/hotels/vpsfp-four-points-destin-fort-walton-beach/overview/'}
 for e in components:
  storeys=6 if e['id']==758291070 else 2 if e['tags'].get('building')=='hotel' else 1
  recipes['landmarks']['way/'+str(e['id'])]={'illustratedRealHeightMeters':storeys*3,'recipe':'four-points-resort','source':source,'note':'Hotel representative describes six-floor south building and two-floor east/west wings. Existing 3 m/storey illustration convention; ancillary structures use one-storey estimates, not surveyed heights.'}
 recipes['recipes']['waterscape-resort']={'walls':['#dbc3a7','#e8d7bd'],'roofs':['#adbcb7'],'roof':'flat','detail':'balconies','source':waterscape};recipes['landmarks']['way/550565521']={'illustratedRealHeightMeters':18,'recipe':'waterscape-resort','source':waterscape,'note':'Published six-storey complex; existing 3 m/storey illustration convention, not a surveyed roof height.'}
 (d/'building-corrections.json').write_text(json.dumps({'metadata':{'source':'https://www.openstreetmap.org/way/1140724675','license':'ODbL 1.0','height_reference':source,'retained_osm_buildings':[e['id'] for e in components]},'elements':[site]},separators=(',',':')));(d/'recipes.json').write_text(json.dumps(recipes,indent=2)+'\n');m=json.load(open(d/'manifest.json'));path='work/coastal_pipeline/v4/'+tid+'/building-corrections.json'
 if path not in m['inputs']['osm']:m['inputs']['osm'].append(path)
 m['manual_fixes']=[v for v in m['manual_fixes'] if not v.startswith('Four Points hotel site outline')];m['manual_fixes'].append('Four Points site outline (OSM way 1140724675) excluded from extrusion; ten actual OSM roof outlines retained, with a sourced six-floor south/two-floor wing recipe. Waterscape uses its published six-storey count. Metres per storey remain illustrative.');(d/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');print(tid,len(components),'actual OSM roofs retained',flush=True)
