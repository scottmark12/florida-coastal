# Real geographic ground replaces the old generalized state surfaces.
print('Building geographic ground',flush=True)
context=shape(geo['context'])
mainland=unary_union([land,context]).simplify(.025,preserve_topology=True)
geokeys[:]=[k for k in geokeys if k not in basekeys]
cream=material('Warm cream geographic land','#f4e7cb');white=material('Sugar white shoreline','#fff8e7')
flat('Geography / Florida and northern mainland',mainland,-.015,cream)
# Continuous offshore bands follow the real coastline, including bay mouths.
print('Building coastal water',flush=True)
for j,(distance,col) in enumerate([(16,'#459fad'),(11,'#43adba'),(7,'#3cbcc5'),(4,'#37cbd0'),(2,'#5adbd2'),(.8,'#91e4d5')]):
 band=mainland.buffer(distance,resolution=3).difference(mainland).simplify(.045,preserve_topology=True)
 flat('Geography / Emerald shore '+str(j),band,-.20+j*.018,material('Emerald shore '+str(j),col))
# Fine beach fringe; broad inland areas keep the warm cream.
flat('Geography / White coastal sand',mainland.difference(mainland.buffer(-.23)).simplify(.018,preserve_topology=True),.01,white)
# Enlarge architecture rather than the state's shape. Neighborhood footprints remain anchored.
for o in instances:
 if o.get('city') in ['landscape','pilot-preserves'] or 'vegetation' in o.get('layer',''):continue
 key=o['asset'].lower()
 if any(w in key for w in ['bridge','pier','dock','stadium','boat','trawler','sail','grass','tree','pine','mangrove','palm','car','bench','umbrella']):continue
 # Broad floor area x3.2, expressive vertical silhouettes x2.4.
 residential=('curated /' in key or 'courtyard' in key or 'authored / seaside' in key or 'authored / alys' in key)
 xy,h=(1.18,1.55) if residential else (1.8,2.4)
 o['s']=[o['s'][0]*xy,o['s'][1]*xy,o['s'][2]*h]
 # Geographic correction can expose locations previously hidden under filled bays.
 p=Point(o['p'][:2])
 if not land.covers(p):
  q=nearest_points(land,p)[0];o['p'][0]=q.x;o['p'][1]=q.y

for i,(n,col) in enumerate(colors):
 updates={"Curated tin roof":"#c8cdbf","Curated foliage":"#668e59","Curated coral":"#e6b2a4","Curated mint":"#bad9c2","Curated sky":"#b2cfdd"}
 if n in updates:colors[i]=(n,updates[n])
