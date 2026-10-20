from shapely.geometry import Polygon,box as panel_box
import shapely
whiteidx=len(colors);colors.append(('Seaside white clapboard','#faf8ee'))
seamidx=len(colors);colors.append(('Seaside siding shadow','#aeb9b6'))
capidx=len(colors);colors.append(('Seaside weathered copper cap','#a48b77'))
parts=[]
def part(n,v,f,m):parts.append((n,np.asarray(v,np.float32),np.asarray(f,np.uint32),m))
def half(z):return .5-(z-.04)/.9*.34
# Broad square truncated pyramid, with genuine arch openings through its four walls.
outer=Polygon([(-.5,.04),(.5,.04),(.16,.94),(-.16,.94)])
xs=np.linspace(-.31,.31,33)
arch=Polygon([(-.31,0),(.31,0),(.31,.13)]+[(float(x),.13+.16*math.sqrt(max(0,1-(x/.31)**2))) for x in xs[::-1]]+[(-.31,0)])
face=outer.difference(arch)
def facade(poly,name,mat,offset=0):
 for side in range(4):
  vv=[];ff=[];a=side*math.pi/2;c,sn=math.cos(a),math.sin(a)
  for tri in shapely.constrained_delaunay_triangles(poly).geoms:
   k=len(vv)
   for x,z in list(tri.exterior.coords)[:3]:
    y=-half(z)-offset;vv.append([x*c-y*sn,x*sn+y*c,z])
   ff.append([k,k+1,k+2])
  if vv:part(name+' '+str(side),vv,ff,mat)
facade(face,'Continuous tapered wall with open arch',seamidx)
for i in range(39):
 z=.04+i*.9/39
 p=face.intersection(panel_box(-1,z,1,z+.9/39-.0015))
 facade(p,'White horizontal clapboard '+str(i),whiteidx,.001)
# Recessed inner wall surfaces give the arched base thickness.
for side in range(4):
 a=side*math.pi/2;c,sn=math.cos(a),math.sin(a);coords=list(face.exterior.coords);v=[];f=[]
 for (x,z),(xx,zz) in zip(coords,coords[1:]):
  k=len(v)
  for X,Z,inset in [(x,z,0),(xx,zz,0),(xx,zz,.035),(x,z,.035)]:
   Y=-half(Z)+inset;v.append([X*c-Y*sn,X*sn+Y*c,Z])
  f.extend([(k,k+1,k+2),(k,k+2,k+3)])
 part('Arch reveals and wall returns',v,f,whiteidx)
part('Small pyramidal weathered cap',[[-.16,-.16,.94],[.16,-.16,.94],[.16,.16,.94],[-.16,.16,.94],[0,0,1]],[(0,1,4),(1,2,4),(2,3,4),(3,0,4)],capidx)
part('Low square tower foundation',[[-.54,-.54,0],[.54,-.54,0],[.54,.54,0],[-.54,.54,0],[-.54,-.54,.04],[.54,-.54,.04],[.54,.54,.04],[-.54,.54,.04]],[(0,1,5),(0,5,4),(1,2,6),(1,6,5),(2,3,7),(2,7,6),(3,0,4),(3,4,7),(4,5,6),(4,6,7)],whiteidx)
assets['Signature / Seaside Coleman Pavilion']=parts
assets.pop('Composed / Signature / Seaside Coleman Pavilion',None)
# Normalized version used in the existing atlas.
assets['Composed / Signature / Seaside Coleman Pavilion']=[(n,v/np.array([1.08,1.08,1]),f,m) for n,v,f,m in parts]
