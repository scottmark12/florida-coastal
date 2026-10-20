exec(open('work/atlas_regions/districts.py').read().split('rows=')[0])
rows=[('miami','beach','Lummus Park beach access',-80.130,25.777),('miami','water','Miami Beach Marina',-80.140,25.770),('miami','water','Dinner Key Marina',-80.234,25.728),('miami','walk','Brickell urban core',-80.193,25.765),('miami','airport','Miami International',-80.290,25.793),('tampa','water','Marjorie Park Yacht Basin',-82.456,27.934),('tampa','walk','Tampa Riverwalk',-82.458,27.950),('tampa','airport','Tampa International',-82.534,27.977),('30a','beach','Grayton Beach State Park access',-86.160,30.324),('30a','walk','Seaside town center',-86.137,30.320),('30a','airport','Northwest Florida Beaches International',-85.795,30.358),('st-petersburg','water','St. Petersburg Municipal Marina',-82.633,27.771),('st-petersburg','walk','Downtown St. Pete',-82.638,27.773)]
a=[]
for town,kind,name,lon,lat in rows:
 x,y=tr.transform(lon,lat);a.append(dict(town=town,kind=kind,name=name,x=x/1000,y=y/1000))
Path('work/atlas_regions/features.json').write_text(json.dumps(a))
