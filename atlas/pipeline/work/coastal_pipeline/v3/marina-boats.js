import * as T from 'three';
// Shared decorative fleet: positions are source-checked, occupancy is illustrative.
export async function createMarinaBoats(url){
 const data=await fetch(url).then(r=>{if(!r.ok)throw Error('Missing marina boat data');return url.endsWith('.gz')?new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).json():r.json()}),root=new T.Group();root.name='Illustrated moored boats';
 const outline=[[0,.5],[.4,.24],[.5,-.32],[.33,-.5],[-.33,-.5],[-.5,-.32],[-.4,.24]],vs=[];
 for(let i=0;i<outline.length;i++){const a=outline[i],b=outline[(i+1)%outline.length];vs.push(0,.12,0,a[0],.12,a[1],b[0],.12,b[1],a[0],.12,a[1],a[0]*.65,0,a[1]*.9,b[0],.12,b[1],b[0],.12,b[1],a[0]*.65,0,a[1]*.9,b[0]*.65,0,b[1]*.9)}
 const hull=new T.BufferGeometry();hull.setAttribute('position',new T.Float32BufferAttribute(vs,3));hull.computeVertexNormals();
 const deck=new T.BoxGeometry(.58,.10,.31);deck.translate(0,.18,-.02);const roof=new T.BoxGeometry(.64,.025,.35);roof.translate(0,.245,-.02);const glass=new T.BoxGeometry(.59,.04,.22);glass.translate(0,.20,.05);const mast=new T.CylinderGeometry(.009,.009,.72,4);mast.translate(0,.48,0);
 const mat=new T.Matrix4(),q=new T.Quaternion(),pos=new T.Vector3(),scale=new T.Vector3();
 for(const [geo,color,filter] of [[hull,'#fff8e7',()=>true],[deck,'#e3dfcd',()=>true],[roof,'#fdfbed',()=>true],[glass,'#709c9c',()=>true],[mast,'#ded6c3',b=>b[5]===0]]){
  const boats=data.boats.filter(filter),mesh=new T.InstancedMesh(geo,new T.MeshStandardMaterial({color,roughness:.8,side:T.DoubleSide}),boats.length);
  boats.forEach((b,i)=>{pos.set(b[0],.0004,-b[1]);q.setFromAxisAngle(new T.Vector3(0,1,0),b[2]);scale.set(b[4],b[3],b[3]);mat.compose(pos,q,scale);mesh.setMatrixAt(i,mat)});mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh)
 }
 const dockVertices=[];
 for(const dock of data.docks||[]){
  if(dock.closed){const shape=new T.Shape();dock.points.forEach((p,i)=>i?shape.lineTo(p[0],p[1]):shape.moveTo(p[0],p[1]));const g=new T.ShapeGeometry(shape).toNonIndexed(),a=g.getAttribute('position');for(let i=0;i<a.count;i++)dockVertices.push(a.getX(i),.0003,-a.getY(i));g.dispose()}
  else for(let i=1;i<dock.points.length;i++){const a=dock.points[i-1],b=dock.points[i],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);if(!l)continue;const nx=-dy/l*.0012,ny=dx/l*.0012;for(const p of [[a[0]+nx,a[1]+ny],[a[0]-nx,a[1]-ny],[b[0]+nx,b[1]+ny],[b[0]+nx,b[1]+ny],[a[0]-nx,a[1]-ny],[b[0]-nx,b[1]-ny]])dockVertices.push(p[0],.0003,-p[1])}
 }
 const dg=new T.BufferGeometry();dg.setAttribute('position',new T.Float32BufferAttribute(dockVertices,3));dg.computeVertexNormals();root.add(new T.Mesh(dg,new T.MeshStandardMaterial({color:'#bba789',roughness:1,side:T.DoubleSide})));root.userData.boatCount=data.boats.length;return root;
}
