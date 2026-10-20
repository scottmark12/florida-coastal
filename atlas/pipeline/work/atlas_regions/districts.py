import json,sys
from pathlib import Path
sys.path.insert(0,'work/florida_atlas/python_pkgs')
from pyproj import Transformer
geo=json.loads(Path('work/coast_geography/geography.json').read_text());tr=Transformer.from_crs(4326,geo['projection'],always_xy=True)
rows=[
('miami','brickell','Brickell',-80.193,25.759,'walk','High-rise condo living with restaurants, transit and a busy urban waterfront.'),
('miami','grove','Coconut Grove',-80.240,25.728,'water','Leafy streets, bayfront parks and sailing around a compact village center.'),
('miami','gables','Coral Gables',-80.268,25.750,'outdoors','A separate city of Mediterranean homes, shaded streets and Miracle Mile shops.'),
('miami','southbeach-district','South Beach',-80.135,25.781,'beach','Art Deco condos and apartments, beach access and lively walkable streets.'),
('miami','edgewater','Edgewater',-80.187,25.801,'water','Waterfront condominium towers and parks just north of downtown.'),
('tampa','downtown-tampa','Downtown & Water Street',-82.451,27.945,'walk','Urban apartments and condos beside the Riverwalk, restaurants and waterfront parks.'),
('tampa','hydepark','Hyde Park',-82.467,27.937,'walk','Porches, older homes and a walkable shopping village near Bayshore.'),
('tampa','ybor','Ybor City',-82.439,27.960,'walk','Historic brick blocks, restaurants and nightlife with a lively evening scene.'),
('tampa','davis','Davis Islands',-82.454,27.921,'water','Island streets, boating access and mostly low-rise residential living.'),
('tampa','westchase','Westchase',-82.609,28.047,'golf','Planned neighborhoods, golf and community amenities northwest of central Tampa.'),
('tampa','seminole','Seminole Heights',-82.454,28.002,'outdoors','Older bungalows, mature trees and independent restaurants north of downtown.'),
('30a','seaside','Seaside',-86.137,30.320,'walk','Compact cottage lanes around a town square, food stands and beach pavilions.'),
('30a','alys','Alys Beach',-86.030,30.285,'beach','White courtyard homes, formal lanes and a carefully designed beach community.'),
('30a','grayton','Grayton Beach',-86.166,30.329,'outdoors','An informal beach village beside Western Lake and state-park dunes.'),
('30a','watercolor','WaterColor',-86.143,30.327,'outdoors','Porch homes, trails and community amenities beside Seaside and Western Lake.'),
('30a','rosemary','Rosemary Beach',-86.015,30.279,'walk','Closely spaced homes, pedestrian lanes and a small coastal town center.'),
('st-petersburg','dtsp','Downtown St. Pete',-82.638,27.773,'walk','Condos and walkable city blocks along museums, parks and the bayfront.'),
('st-petersburg','old-ne','Historic Old Northeast',-82.636,27.794,'outdoors','Older houses and leafy residential blocks close to downtown and the waterfront.')]
data=[]
for town,id,name,lon,lat,kind,description in rows:
 x,y=tr.transform(lon,lat);source='https://www.floridacoastal.co/towns/'+('southbeach' if town=='miami' else town)+'.html'
 data.append(dict(town=town,id=id,name=name,x=x/1000,y=y/1000,lon=lon,lat=lat,kind=kind,description=description,priceRange=None,priceStatus='Neighborhood price range not yet verified',source=source))
# A reported median is not represented as a listing range.
for d in data:
 if d['id']=='grove':d.update(priceBenchmark='$1.89M median sale price · recent 3-month period',priceSource='https://www.redfin.com/neighborhood/219259/FL/Miami/Coconut-Grove/housing-market')
 if d['id']=='southbeach-district':d.update(airport='MIA',airportMinutes='20–25 min in light traffic',airportSource='https://www.floridacoastal.co/towns/southbeach.html')
Path('work/atlas_regions/districts.json').write_text(json.dumps(data,indent=2))
