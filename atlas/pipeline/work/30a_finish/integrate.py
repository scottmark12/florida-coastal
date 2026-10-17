from geometry import *
A=Path('work/atlas_regions');ds=json.loads((A/'districts.json').read_text());ds=[d for d in ds if d['town']!='30a']+json.loads((D/'districts.json').read_text());(A/'districts.json').write_text(json.dumps(ds,indent=2))
fs=json.loads((A/'features.json').read_text());fs=[f for f in fs if f['town']!='30a' or f['kind']=='airport'];md=json.loads((D/'map-data.json').read_text())['elements']
for e in json.loads((D/'bay-access.json').read_text())['elements']:
 if e['type']=='node':c=Point(e['lon'],e['lat'])
 else:c=LineString([(p['lon'],p['lat']) for p in e['geometry']]).centroid
 p=project(c);name=e['tags'].get('name','Mapped bay boat ramp' if e['tags']['leisure']=='slipway' else 'Mapped bay marina')
 fs.append({'id':'osm-'+str(e['id']),'town':'30a','name':name,'kind':'water','x':p.x,'y':p.y,'source':f'https://www.openstreetmap.org/{e["type"]}/{e["id"]}','boundaryNote':'OSM-mapped facility on Choctawhatchee Bay. Confirm launch permissions and operating conditions with the operator.'})
for e in md:
 if e['tags'].get('name') not in ['Public Beach Access','Ed Walline Public Beach Access']:continue
 p=project(LineString([(p['lon'],p['lat']) for p in e['geometry']])).centroid
 fs.append({'id':'beach-'+str(e['id']),'town':'30a','name':e['tags']['name'],'kind':'beach','x':p.x,'y':p.y,'source':f'https://www.openstreetmap.org/way/{e["id"]}','boundaryNote':'Mapped access path. Follow local beach-access signs and rules.'})
extra=json.loads(Path('outputs/30a_finish/30a.json').read_text());p=extra['trail'][0][0]
fs.append({'id':'timpoochee','town':'30a','name':'Timpoochee Trail','kind':'walk','x':p[0],'y':p[1],'paths':extra['trail'],'source':'https://www.visitsouthwalton.com/blog/a-guide-to-the-timpoochee-trail/','boundaryNote':'Mapped multi-use trail following 30A. Cycling and pedestrian access; road crossings require care.'})
(A/'features.json').write_text(json.dumps(fs,separators=(',',':')))
